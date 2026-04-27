import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Filter,
  Play,
  Search,
  Star,
  TrendingUp,
  Users,
  Video,
} from 'lucide-react';
import ConfirmationModal from '../../../Components/Admin/ConfirmationModal';
import { trainingApi } from '../../../API/endpoints/trainingApi.js';
import { chwService } from '../../../Services/domain/chwService.js';
import { useAuth } from '../../../hooks/useAuth.jsx';

const normalizeArrayPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toNumericId = (value) => {
  if (value == null) return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  const text = String(value).trim();
  if (!text) return null;
  if (/^\d+$/.test(text)) return Number(text);

  const prefixedMatch = text.match(/^[A-Za-z]{1,10}[-_#](\d+)$/);
  if (prefixedMatch) {
    const parsedPrefixed = Number(prefixedMatch[1]);
    return Number.isFinite(parsedPrefixed) ? parsedPrefixed : null;
  }

  const urlMatch = text.match(/\/(\d+)$/);
  if (!urlMatch) return null;
  const parsed = Number(urlMatch[1]);
  return Number.isFinite(parsed) ? parsed : null;
};

const toLabel = (value, fallback = 'Unknown') => {
  const text = String(value || '').trim();
  if (!text) return fallback;
  const normalized = text.replace(/_/g, ' ').toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const toCourseStatus = (enrollment) => {
  if (!enrollment) return 'not-enrolled';

  const raw = String(enrollment.rawStatus || '').toUpperCase();
  const progress = toNumber(enrollment.progress, 0);

  if (raw === 'COMPLETED' || progress >= 100) return 'completed';
  if (progress > 0) return 'in-progress';
  return 'enrolled';
};

const extractHours = (durationText) => {
  const text = String(durationText || '');
  const match = text.match(/(\d+(?:\.\d+)?)\s*(hour|hours|hr|hrs)/i);
  if (!match) return 0;
  return Math.round(Number(match[1]));
};

const inferResourceType = (value) => {
  const text = String(value || '').toLowerCase();
  if (text.includes('video') || text.includes('.mp4') || text.includes('.mov')) return 'Video';
  if (text.includes('pdf') || text.includes('.pdf')) return 'PDF';
  if (text.includes('doc') || text.includes('slide') || text.includes('ppt')) return 'Document';
  return 'Material';
};

const getCourseResources = (course) => {
  const modules = Array.isArray(course?.courseModules) ? course.courseModules : [];

  return modules
    .map((moduleItem, index) => {
      if (typeof moduleItem === 'string') {
        return {
          id: `${course.id}-module-${index}`,
          title: moduleItem,
          type: inferResourceType(moduleItem),
          category: course.category || 'General',
          size: 'N/A',
          downloads: 0,
          date: course.lastUpdated || course.createdDate || '',
          contentUrl: '',
          hasContent: false,
          courseId: course.id,
          courseTitle: course.title,
        };
      }

      const moduleObject = moduleItem && typeof moduleItem === 'object' ? moduleItem : {};
      const contentUrl =
        moduleObject.url ||
        moduleObject.fileUrl ||
        moduleObject.contentUrl ||
        moduleObject.materialUrl ||
        moduleObject.documentUrl ||
        moduleObject.videoUrl ||
        moduleObject.link ||
        '';

      return {
        id: `${course.id}-module-${moduleObject.id ?? index}`,
        title:
          moduleObject.title ||
          moduleObject.moduleName ||
          moduleObject.name ||
          moduleObject.topic ||
          `Module ${index + 1}`,
        type: inferResourceType(moduleObject.contentType || moduleObject.fileType || moduleObject.type || contentUrl),
        category: moduleObject.category || course.category || 'General',
        size: moduleObject.fileSize || moduleObject.size || 'N/A',
        downloads: toNumber(moduleObject.downloadCount ?? moduleObject.downloads, 0),
        date: moduleObject.updatedAt || moduleObject.createdAt || course.lastUpdated || course.createdDate || '',
        contentUrl,
        hasContent: Boolean(String(contentUrl).trim()),
        courseId: course.id,
        courseTitle: course.title,
      };
    })
    .filter((item) => item.title);
};

const hasLearningMaterials = (course) => {
  return getCourseResources(course).some((resource) => resource.hasContent);
};

const formatDateText = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const ResourcesTraining = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');

  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([]);
  const [certifications, setCertifications] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [resolvedChwId, setResolvedChwId] = useState(null);

  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState({
    title: '',
    message: '',
    type: 'warning',
    onConfirm: null,
  });

  const activeChwId = useMemo(
    () => resolvedChwId ?? toNumericId(user?.chwId) ?? toNumericId(user?.providerId) ?? null,
    [resolvedChwId, user?.chwId, user?.providerId]
  );

  const openActionModal = useCallback(({ title, message, type = 'warning', onConfirm = null }) => {
    setActionModalConfig({ title, message, type, onConfirm });
    setShowActionModal(true);
  }, []);

  const fetchTrainingData = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const modulesResult = await Promise.allSettled([
        trainingApi.listAvailable(),
        trainingApi.listActive(),
        trainingApi.list(),
      ]);

      let moduleRows = [];
      for (const result of modulesResult) {
        if (result.status !== 'fulfilled') continue;
        const rows = normalizeArrayPayload(result.value);
        if (rows.length > 0) {
          moduleRows = rows;
          break;
        }
      }

      const normalizedModules = moduleRows.map((module) => {
        const mapped = {
          id: module.id,
          title: module.courseName || module.title || module.name || 'Untitled Course',
          description: module.description || '',
          duration: module.duration || 'N/A',
          modules: Array.isArray(module.courseModules) ? module.courseModules.length : 0,
          category: module.primaryCategory || module.tags?.[0] || 'General',
          instructor: module.instructorName || 'Unassigned',
          rating: toNumber(module.rating, 0),
          enrolled: toNumber(module.enrolledCount, 0),
          progress: 0,
          status: 'not-enrolled',
          enrollmentId: null,
          rawEnrollmentStatus: null,
          courseModules: Array.isArray(module.courseModules) ? module.courseModules : [],
          createdDate: module.createdAt || '',
          lastUpdated: module.updatedAt || '',
          _raw: module,
        };

        return {
          ...mapped,
          learningMaterialsUploaded: hasLearningMaterials(mapped),
        };
      });

      let enrollmentRows = [];
      if (activeChwId != null) {
        try {
          const enrollmentsPayload = await trainingApi.getChwEnrollments(activeChwId);
          enrollmentRows = normalizeArrayPayload(enrollmentsPayload);
        } catch (enrollmentsError) {
          if (![404].includes(enrollmentsError?.status)) throw enrollmentsError;
        }
      }

      const normalizedEnrollments = enrollmentRows.map((row, index) => ({
        id: row.id || row.enrollmentId || `enrollment-${index}`,
        courseId:
          row.moduleId ||
          row.courseId ||
          row.trainingModuleId ||
          row.module?.id ||
          row.trainingModule?.id ||
          null,
        courseName:
          row.courseName ||
          row.moduleName ||
          row.trainingModuleName ||
          row.module?.courseName ||
          row.trainingModule?.courseName ||
          '',
        progress: toNumber(row.progressPercentage ?? row.progress, 0),
        rawStatus: String(row.status || 'ENROLLED').toUpperCase(),
        enrolledAt: row.enrollmentDate || row.enrolledAt || row.createdAt || null,
        updatedAt: row.updatedAt || row.lastAccessedAt || row.completedAt || row.createdAt || null,
        certificateId: row.certificateId || row.credentialId || row.certificateCode || row.certificateNumber || '',
        certificateIssuedAt: row.certificateIssuedAt || row.completedAt || row.updatedAt || null,
        certificateExpiryAt: row.certificateExpiryAt || null,
        _raw: row,
      }));

      const enrollmentByCourse = new Map();
      normalizedEnrollments.forEach((enrollment) => {
        const idKey = enrollment.courseId != null ? String(enrollment.courseId) : '';
        const nameKey = String(enrollment.courseName || '').trim().toLowerCase();

        const currentForId = idKey ? enrollmentByCourse.get(idKey) : null;
        const currentForName = nameKey ? enrollmentByCourse.get(nameKey) : null;
        const current = currentForId || currentForName || null;

        if (!current) {
          if (idKey) enrollmentByCourse.set(idKey, enrollment);
          if (nameKey) enrollmentByCourse.set(nameKey, enrollment);
          return;
        }

        const currentUpdatedAt = Date.parse(current.updatedAt || current.enrolledAt || 0);
        const candidateUpdatedAt = Date.parse(enrollment.updatedAt || enrollment.enrolledAt || 0);
        if (candidateUpdatedAt >= currentUpdatedAt) {
          if (idKey) enrollmentByCourse.set(idKey, enrollment);
          if (nameKey) enrollmentByCourse.set(nameKey, enrollment);
        }
      });

      const normalizedCourses = normalizedModules.map((course) => {
        const byId = enrollmentByCourse.get(String(course.id));
        const byName = enrollmentByCourse.get(String(course.title || '').trim().toLowerCase());
        const enrollment = byId || byName || null;

        const status = toCourseStatus(enrollment);
        const progress =
          status === 'completed'
            ? 100
            : status === 'in-progress'
              ? Math.min(99, Math.max(1, toNumber(enrollment?.progress, 0)))
              : 0;

        return {
          ...course,
          status,
          progress,
          enrollmentId: enrollment?.id || null,
          rawEnrollmentStatus: enrollment?.rawStatus || null,
          enrollment,
        };
      });

      const courseResources = normalizedCourses.flatMap((course) => getCourseResources(course));

      const computedCertifications = normalizedCourses
        .filter((course) => course.status === 'completed')
        .map((course, index) => {
          const enrollment = course.enrollment;
          const issueDate = enrollment?.certificateIssuedAt || enrollment?.updatedAt || enrollment?.enrolledAt || null;
          const issue = issueDate ? new Date(issueDate) : new Date();
          const expiry = enrollment?.certificateExpiryAt ? new Date(enrollment.certificateExpiryAt) : new Date(issue);
          if (!enrollment?.certificateExpiryAt) {
            expiry.setFullYear(issue.getFullYear() + 2);
          }

          const credentialId =
            enrollment?.certificateId ||
            `CHW-${issue.getFullYear()}-${String(index + 1).padStart(4, '0')}`;

          return {
            id: enrollment?.id || `cert-${course.id}`,
            title: `${course.title} Certificate`,
            issueDate: issue.toISOString(),
            expiryDate: expiry.toISOString(),
            status: expiry < new Date() ? 'expired' : 'active',
            credentialId,
          };
        });

      setCourses(normalizedCourses.sort((a, b) => String(a.title).localeCompare(String(b.title))));
      setResources(courseResources);
      setCertifications(computedCertifications);
    } catch (fetchError) {
      setError(fetchError?.message || 'Failed to load training data from backend.');
      setCourses([]);
      setResources([]);
      setCertifications([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeChwId]);

  useEffect(() => {
    let active = true;

    const resolveBackendChwId = async () => {
      try {
        const profile = await chwService.getMe();
        const id = toNumericId(
          profile?.id ??
          profile?.raw?.id ??
          profile?.raw?.chwId ??
          profile?.raw?.providerId ??
          profile?.raw?.user?.id
        );

        if (active && id != null) {
          setResolvedChwId(id);
        }
      } catch {
        // Continue with auth-derived ids.
      }
    };

    resolveBackendChwId();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    fetchTrainingData();
  }, [fetchTrainingData]);

  const completedCourses = useMemo(
    () => courses.filter((course) => course.status === 'completed').length,
    [courses]
  );

  const inProgressCourses = useMemo(
    () => courses.filter((course) => course.status === 'in-progress').length,
    [courses]
  );

  const learningHours = useMemo(
    () => courses
      .filter((course) => course.status !== 'not-enrolled')
      .reduce((total, course) => total + extractHours(course.duration), 0),
    [courses]
  );

  const stats = useMemo(
    () => [
      { label: 'Courses Completed', value: String(completedCourses), icon: CheckCircle },
      { label: 'In Progress', value: String(inProgressCourses), icon: Clock },
      { label: 'Certificates Earned', value: String(certifications.length), icon: Award },
      { label: 'Learning Hours', value: String(learningHours), icon: TrendingUp },
    ],
    [completedCourses, inProgressCourses, certifications.length, learningHours]
  );

  const tabs = useMemo(
    () => [
      { id: 'courses', label: 'Training Courses', count: courses.length },
      { id: 'resources', label: 'Resources', count: resources.length },
      { id: 'certificates', label: 'My Certificates', count: certifications.length },
    ],
    [courses.length, resources.length, certifications.length]
  );

  const filteredCourses = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return courses;

    return courses.filter((course) => {
      const haystack = [
        course.title,
        course.description,
        course.instructor,
        course.category,
        course.status,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [courses, searchTerm]);

  const filteredResources = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return resources;

    return resources.filter((resource) => {
      const haystack = [resource.title, resource.category, resource.type, resource.courseTitle]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [resources, searchTerm]);

  const filteredCertifications = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return certifications;

    return certifications.filter((cert) => {
      const haystack = [cert.title, cert.credentialId, cert.status].join(' ').toLowerCase();
      return haystack.includes(term);
    });
  }, [certifications, searchTerm]);

  const handleEnrollCourse = (course) => {
    openActionModal({
      title: 'Enroll in Course',
      message: `Enroll in "${course.title}" now?`,
      type: 'success',
      onConfirm: () => {
        (async () => {
          if (!activeChwId) {
            openActionModal({
              title: 'Unable to Enroll',
              message: 'Unable to resolve your CHW profile. Please re-login and try again.',
              type: 'warning',
            });
            return;
          }

          try {
            await trainingApi.enroll(course.id, { chwId: activeChwId });
            await fetchTrainingData();
            openActionModal({
              title: 'Enrollment Successful',
              message: `You are now enrolled in "${course.title}".`,
              type: 'success',
            });
          } catch (enrollError) {
            openActionModal({
              title: 'Enrollment Failed',
              message: enrollError?.message || 'Could not enroll at this time. Please try again.',
              type: 'warning',
            });
          }
        })();
      },
    });
  };

  const handleStartCourse = (course) => {
    if (!course.learningMaterialsUploaded) {
      openActionModal({
        title: 'Learning Materials Pending',
        message:
          'Learning materials not uploaded by admin. Please wait; you will be notified once the learning materials are available.',
        type: 'warning',
      });
      return;
    }

    openActionModal({
      title: 'Start Course',
      message: `Start "${course.title}" now?`,
      type: 'success',
      onConfirm: () => {
        (async () => {
          if (!course.enrollmentId) {
            openActionModal({
              title: 'Enrollment Missing',
              message: 'This course is not yet linked to an enrollment record. Please enroll again.',
              type: 'warning',
            });
            return;
          }

          try {
            await trainingApi.updateStatus(course.enrollmentId, 'ACTIVE');
            if (toNumber(course.progress, 0) < 1) {
              await trainingApi.updateProgress(course.enrollmentId, 5);
            }
            await fetchTrainingData();
            openActionModal({
              title: 'Course Started',
              message: `"${course.title}" has been started successfully.`,
              type: 'success',
            });
          } catch (startError) {
            openActionModal({
              title: 'Unable to Start',
              message: startError?.message || 'Could not update course status. Please try again.',
              type: 'warning',
            });
          }
        })();
      },
    });
  };

  const handleContinueCourse = (course) => {
    if (!course.learningMaterialsUploaded) {
      openActionModal({
        title: 'Learning Materials Pending',
        message:
          'Learning materials not uploaded by admin. Please wait; you will be notified once the learning materials are available.',
        type: 'warning',
      });
      return;
    }

    const nextProgress = Math.min(100, Math.max(5, toNumber(course.progress, 0) + 25));
    const willComplete = nextProgress >= 100;

    openActionModal({
      title: willComplete ? 'Complete Course' : 'Continue Course',
      message: willComplete
        ? `Mark "${course.title}" as completed?`
        : `Continue "${course.title}" and update progress to ${nextProgress}%?`,
      type: 'success',
      onConfirm: () => {
        (async () => {
          if (!course.enrollmentId) {
            openActionModal({
              title: 'Enrollment Missing',
              message: 'This course is not yet linked to an enrollment record. Please enroll again.',
              type: 'warning',
            });
            return;
          }

          try {
            await trainingApi.updateProgress(course.enrollmentId, nextProgress);
            if (willComplete) {
              await trainingApi.updateStatus(course.enrollmentId, 'COMPLETED');
            }
            await fetchTrainingData();
          } catch (progressError) {
            openActionModal({
              title: 'Unable to Update Progress',
              message: progressError?.message || 'Could not update learning progress. Please try again.',
              type: 'warning',
            });
          }
        })();
      },
    });
  };

  const handleViewCertificate = (course) => {
    const cert = certifications.find((item) => item.title.startsWith(course.title));
    if (!cert) {
      openActionModal({
        title: 'Certificate Not Found',
        message: 'Certificate record is not available yet. Please refresh after completion sync.',
        type: 'warning',
      });
      return;
    }

    openActionModal({
      title: 'Certificate Ready',
      message: `Your certificate for "${course.title}" is available under the My Certificates tab.`,
      type: 'success',
    });
  };

  const handleReviewCourse = (course) => {
    if (!course.learningMaterialsUploaded) {
      openActionModal({
        title: 'Learning Materials Pending',
        message:
          'Learning materials not uploaded by admin. Please wait; you will be notified once the learning materials are available.',
        type: 'warning',
      });
      return;
    }

    openActionModal({
      title: 'Course Review',
      message: `Review workspace for "${course.title}" will open when learner playback is enabled.`,
      type: 'success',
    });
  };

  const handleResourceAction = (resource) => {
    if (!resource.hasContent) {
      openActionModal({
        title: 'Material Pending',
        message:
          'Learning materials not uploaded by admin. Please wait; you will be notified once the learning materials are available.',
        type: 'warning',
      });
      return;
    }

    const isVideo = String(resource.type || '').toLowerCase() === 'video';
    const actionVerb = isVideo ? 'open' : 'download';

    openActionModal({
      title: isVideo ? 'Open Video Material' : 'Download Material',
      message: `Do you want to ${actionVerb} "${resource.title}"?`,
      type: 'success',
      onConfirm: () => {
        const url = String(resource.contentUrl || '').trim();
        if (!url) return;

        if (isVideo) {
          window.open(url, '_blank', 'noopener,noreferrer');
          return;
        }

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    });
  };

  const handleCertificateDownload = (cert) => {
    openActionModal({
      title: 'Download Certificate',
      message: `Download certificate "${cert.title}"?`,
      type: 'success',
      onConfirm: () => {
        const safeFileName = cert.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') || 'certificate';

        const content = [
          `Certificate: ${cert.title}`,
          `Credential ID: ${cert.credentialId}`,
          `Issue Date: ${formatDateText(cert.issueDate)}`,
          `Expiry Date: ${formatDateText(cert.expiryDate)}`,
          `Status: ${toLabel(cert.status, 'Active')}`,
        ].join('\n');

        const blob = new Blob([content], { type: 'application/pdf' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = downloadUrl;
        link.download = `${safeFileName}-certificate.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      },
    });
  };

  const handleCertificateVerify = (cert) => {
    const expiryDate = new Date(cert.expiryDate);
    const isExpired = !Number.isNaN(expiryDate.getTime()) && expiryDate < new Date();

    openActionModal({
      title: 'Certificate Verification',
      message: isExpired
        ? `"${cert.title}" with credential ID ${cert.credentialId} is expired. Please contact admin for renewal.`
        : `"${cert.title}" is valid. Credential ID ${cert.credentialId} is active.`,
      type: isExpired ? 'warning' : 'success',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-800';
      case 'in-progress':
        return 'text-blue-800';
      case 'enrolled':
        return 'text-yellow-800';
      case 'not-enrolled':
        return 'text-gray-800';
      default:
        return 'text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (String(category || '').toLowerCase()) {
      case 'fundamentals':
        return 'text-blue-800';
      case 'specialized':
        return 'text-blue-800';
      case 'guidelines':
        return 'text-blue-800';
      case 'forms':
        return 'text-blue-800';
      case 'reference':
        return 'text-blue-800';
      case 'training':
        return 'text-blue-800';
      default:
        return 'text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Resources &amp; Training</h1>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-4 sm:p-6 border border-gray-200">
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2" />
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-white">
        <div className="flex items-left gap-3">
          <div className="relative flex items-center w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses and resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-700 whitespace-nowrap shrink-0">
            <Filter className="w-4 h-4" />
            <span>Filter</span>e
          </button>
        </div>
      </div>

      <div className="bg-white overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 py-2.5 px-3 sm:px-5 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-800 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <span className="sm:hidden">
                {tab.id === 'courses' ? 'Courses' : tab.id === 'certificates' ? 'Certs' : tab.label}
              </span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Loading training content from backend...
        </div>
      ) : null}

      {activeTab === 'courses' && !isLoading && (
        <>
          <div className="hidden lg:block bg-white border border-gray-200 overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Instructor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Duration</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Modules</th>
                  {/* <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Enrolled</th> */}
                  {/* <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Rating</th> */}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide w-36">Progress</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors align-middle">
                    <td className="px-4 py-3 max-w-[200px]">
                      <p className="font-semibold text-gray-900 text-sm truncate">{course.title}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-800">{course.instructor}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(course.category)}`}>
                        {course.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(course.status)}`}>
                        {toLabel(course.status, 'Not enrolled')}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-xs text-gray-700">
                        <Clock className="w-3 h-3 mr-1 text-blue-600 shrink-0" />
                        {course.duration}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-xs text-gray-700">
                        <BookOpen className="w-3 h-3 mr-1 text-blue-600 shrink-0" />
                        {course.modules}
                      </div>
                    </td>
                    {/* <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-xs text-gray-700">
                        <Users className="w-3 h-3 mr-1 text-blue-600 shrink-0" />
                        {course.enrolled}
                      </div>
                    </td> */}
                    {/* <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-blue-500 fill-blue-500 shrink-0" />
                        <span className="text-sm font-semibold text-gray-800">{course.rating.toFixed(1)}</span>
                      </div>
                    </td> */}
                    <td className="px-4 py-3 w-36">
                      {course.progress > 0 ? (
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-semibold text-blue-600">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {course.status === 'completed' ? (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleViewCertificate(course)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-colors"
                          >
                            <Award className="w-3 h-3" />
                            <span>Certificate</span>
                          </button>
                          <button
                            onClick={() => handleReviewCourse(course)}
                            className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors"
                          >
                            <Play className="w-3 h-3" />
                            <span>Review</span>
                          </button>
                        </div>
                      ) : course.status === 'in-progress' ? (
                        <button
                          onClick={() => handleContinueCourse(course)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                        >
                          <Play className="w-3 h-3" />
                          <span>Continue</span>
                        </button>
                      ) : course.status === 'enrolled' ? (
                        <button
                          onClick={() => handleStartCourse(course)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                        >
                          <Play className="w-3 h-3" />
                          <span>Start</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnrollCourse(course)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                        >
                          <Users className="w-3 h-3" />
                          <span>Enroll</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td className="px-4 py-8 text-center text-sm text-gray-500" colSpan={10}>
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(course.status)}`}>
                    {toLabel(course.status, 'Not enrolled')}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(course.category)}`}>
                    {course.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{course.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{course.description || 'No course description available.'}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
                  <div className="flex items-center text-xs text-gray-700">
                    <Clock className="w-3 h-3 mr-1 text-blue-600" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-xs text-gray-700">
                    <BookOpen className="w-3 h-3 mr-1 text-blue-600" />
                    {course.modules} modules
                  </div>
                  <div className="flex items-center text-xs text-gray-700">
                    <Users className="w-3 h-3 mr-1 text-blue-600" />
                    {course.enrolled} enrolled
                  </div>
                  <div className="flex items-center text-xs text-gray-700">
                    <Star className="w-3 h-3 mr-1 text-blue-500 fill-blue-500" />
                    <span className="font-semibold">{course.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-3">By {course.instructor}</p>
                {course.progress > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600">Progress</span>
                      <span className="text-xs font-semibold text-blue-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {course.status === 'completed' ? (
                    <>
                      <button
                        onClick={() => handleViewCertificate(course)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-colors"
                      >
                        <Award className="w-3 h-3" />
                        <span>Certificate</span>
                      </button>
                      <button
                        onClick={() => handleReviewCourse(course)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors"
                      >
                        <Play className="w-3 h-3" />
                        <span>Review</span>
                      </button>
                    </>
                  ) : course.status === 'in-progress' ? (
                    <button
                      onClick={() => handleContinueCourse(course)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                    >
                      <Play className="w-3 h-3" />
                      <span>Continue Learning</span>
                    </button>
                  ) : course.status === 'enrolled' ? (
                    <button
                      onClick={() => handleStartCourse(course)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                    >
                      <Play className="w-3 h-3" />
                      <span>Start Course</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnrollCourse(course)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                    >
                      <Users className="w-3 h-3" />
                      <span>Enroll</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <div className="col-span-full bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-500">
                No courses found.
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'resources' && !isLoading && (
        <>
          <div className="hidden lg:block bg-white border border-gray-200 overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-200 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Resource</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Downloads</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50 transition-colors align-middle">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {resource.type === 'Video' ? (
                          <Video className="w-5 h-5 text-blue-600 shrink-0" />
                        ) : (
                          <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{resource.title}</p>
                          <p className="text-xs text-gray-400">Added {formatDateText(resource.date)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(resource.category)}`}>
                        {resource.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{resource.type}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{resource.size}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{toNumber(resource.downloads, 0).toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => handleResourceAction(resource)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                      >
                        {resource.type === 'Video' ? <Play className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                        <span>{resource.type === 'Video' ? 'Watch' : 'Download'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredResources.length === 0 && (
                  <tr>
                    <td className="px-4 py-8 text-center text-sm text-gray-500" colSpan={6}>
                      No resources found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-start gap-3 mb-3">
                  {resource.type === 'Video' ? (
                    <Video className="w-8 h-8 text-blue-600 shrink-0 mt-0.5" />
                  ) : (
                    <FileText className="w-8 h-8 text-blue-600 shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{resource.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Added {formatDateText(resource.date)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3 text-xs">
                  <div>
                    <p className="text-gray-500">Category</p>
                    <span className={`font-semibold ${getCategoryColor(resource.category)}`}>{resource.category}</span>
                  </div>
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-semibold text-gray-800">{resource.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Size</p>
                    <p className="font-semibold text-gray-800">{resource.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Downloads</p>
                    <p className="font-semibold text-gray-800">{toNumber(resource.downloads, 0).toLocaleString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleResourceAction(resource)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                >
                  {resource.type === 'Video' ? <Play className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                  <span>{resource.type === 'Video' ? 'Watch' : 'Download'}</span>
                </button>
              </div>
            ))}
            {filteredResources.length === 0 && (
              <div className="col-span-full bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-500">
                No resources found.
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'certificates' && !isLoading && (
        <>
          <div className="hidden lg:block bg-white border border-gray-200 overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Certificate</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Issue Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Expiry Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Credential ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCertifications.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50 transition-colors align-middle">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="font-semibold text-gray-900 text-sm">{cert.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 text-xs font-semibold text-blue-800">{toLabel(cert.status, 'Active')}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{formatDateText(cert.issueDate)}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{formatDateText(cert.expiryDate)}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-xs font-mono text-gray-600">{cert.credentialId}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleCertificateDownload(cert)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={() => handleCertificateVerify(cert)}
                          className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Verify</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCertifications.length === 0 && (
                  <tr>
                    <td className="px-4 py-8 text-center text-sm text-gray-500" colSpan={6}>
                      No certificates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCertifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-blue-600 shrink-0" />
                  <h3 className="font-bold text-gray-900 text-sm">{cert.title}</h3>
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-blue-800 bg-blue-50 mb-3">
                  {toLabel(cert.status, 'Active')}
                </span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Issue Date</p>
                    <p className="text-sm font-semibold text-gray-900">{formatDateText(cert.issueDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expiry Date</p>
                    <p className="text-sm font-semibold text-gray-900">{formatDateText(cert.expiryDate)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Credential ID</p>
                    <p className="text-xs font-mono font-semibold text-gray-900">{cert.credentialId}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCertificateDownload(cert)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => handleCertificateVerify(cert)}
                    className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Verify</span>
                  </button>
                </div>
              </div>
            ))}
            {filteredCertifications.length === 0 && (
              <div className="col-span-full bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-500">
                No certificates found.
              </div>
            )}
          </div>
        </>
      )}

      <ConfirmationModal
        showModal={showActionModal}
        setShowModal={setShowActionModal}
        title={actionModalConfig.title}
        message={actionModalConfig.message}
        onConfirm={actionModalConfig.onConfirm}
        type={actionModalConfig.type}
      />
    </div>
  );
};

export default ResourcesTraining;
