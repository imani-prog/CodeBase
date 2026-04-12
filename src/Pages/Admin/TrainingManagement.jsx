import React, { useState, useEffect, useMemo } from 'react';
import { trainingApi } from '../../API/endpoints/trainingApi.js';
import { chwApi } from '../../API/endpoints/chwApi.js';
import { LoadingSpinner, ErrorMessage } from '../../Components/Admin/DataState.jsx';
import { 
  BookOpen, 
  Users, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Plus, 
  Eye, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Clock,
  Award,
  Star,
  UserPlus,
  Download,
  Upload,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Target,
  CheckCircle,
  AlertCircle,
  XCircle,
  Settings,
  RefreshCw,
  FileText,
  Video,
  Headphones,
  Monitor,
  Globe,
  GraduationCap,
  BookMarked,
  Activity,
  Zap,
  ShoppingCart,
  CreditCard,
  TrendingDown,
  UserCheck,
  User,
  Building
} from 'lucide-react';
import CreateCourseModal from '../../Components/Admin/CreateCourseModal';
import BulkEnrollmentModal from '../../Components/Admin/BulkEnrollmentModal';
import IssueCertificatesModal from '../../Components/Admin/IssueCertificatesModal';
import ExportReportsModal from '../../Components/Admin/ExportReportsModal';
import CourseDetailsModal from '../../Components/Admin/CourseDetailsModal';
import EditCourseModal from '../../Components/Admin/EditCourseModal';
import ConfirmationModal from '../../Components/Admin/ConfirmationModal';
import StudentDetailsModal from '../../Components/Admin/StudentDetailsModal';
import ViewInstructorModal from '../../Components/Admin/ViewInstructorModal';
import EditInstructorModal from '../../Components/Admin/EditInstructorModal';
import AddInstructorModal from '../../Components/Admin/AddInstructorModal';


const TrainingManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [_selectedPeriod, _setSelectedPeriod] = useState('this-month');
  const [searchTerm, setSearchTerm] = useState('');  const [courseFilter, setCourseFilter] = useState('all');
  const [actionFeedback, setActionFeedback] = useState({ show: false, message: '', type: '' });

  // Modal states
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showBulkEnrollmentModal, setShowBulkEnrollmentModal] = useState(false);
  const [showIssueCertificatesModal, setShowIssueCertificatesModal] = useState(false);
  const [showExportReportsModal, setShowExportReportsModal] = useState(false);
  const [showCourseDetailsModal, setShowCourseDetailsModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showStudentDetailsModal, setShowStudentDetailsModal] = useState(false);
  const [showViewInstructorModal, setShowViewInstructorModal] = useState(false);
  const [showEditInstructorModal, setShowEditInstructorModal] = useState(false);
  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [confirmationTitle, setConfirmationTitle] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationType, setConfirmationType] = useState('warning');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const [trainingCourses, setTrainingCourses] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [enrollmentTrends, setEnrollmentTrends] = useState([]);
  const [revenueByCategory, setRevenueByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const normalizeArrayPayload = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.content)) return payload.content;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
  };

  const toNumber = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const toLabel = (value, fallback = 'Unknown') => {
    if (!value || String(value).trim() === '') return fallback;
    const text = String(value).trim();
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const buildCategoryRevenue = (courses) => {
    const categoryMap = new Map();

    courses.forEach((course) => {
      const category = course.category || 'General';
      if (!categoryMap.has(category)) {
        categoryMap.set(category, { category, courses: 0, students: 0, revenue: 0 });
      }

      const row = categoryMap.get(category);
      row.courses += 1;
      row.students += toNumber(course.enrolledStudents, 0);
      row.revenue += toNumber(course.revenue, 0);
    });

    return Array.from(categoryMap.values()).sort((a, b) => b.revenue - a.revenue);
  };

  const buildInstructorSummary = (courses) => {
    const byName = new Map();

    courses.forEach((course) => {
      const key = course.instructor || 'Unassigned';
      if (!byName.has(key)) {
        byName.set(key, {
          id: course.instructorId || key,
          name: key,
          specialization: course.category || 'General',
          qualification: course._raw?.instructorQualification || 'Not provided',
          experience: course._raw?.instructorExperience || 'N/A',
          coursesTeaching: 0,
          totalStudents: 0,
          avgRating: 0,
          email: course._raw?.instructorEmail || '-',
          phone: course._raw?.instructorPhone || '-',
          status: 'Inactive',
          joinDate: course.createdDate || '',
          completedCourses: 0,
          salary: toNumber(course._raw?.instructorSalary, 0),
          _ratingsTotal: 0,
          _ratingsCount: 0,
        });
      }

      const row = byName.get(key);
      row.coursesTeaching += 1;
      row.totalStudents += toNumber(course.enrolledStudents, 0);
      row.completedCourses += course.completionRate >= 100 ? 1 : 0;
      row.status = course.status === 'active' ? 'Active' : row.status;

      const rating = toNumber(course.rating, 0);
      if (rating > 0) {
        row._ratingsTotal += rating;
        row._ratingsCount += 1;
      }
    });

    return Array.from(byName.values()).map((row) => ({
      ...row,
      avgRating: row._ratingsCount > 0 ? Number((row._ratingsTotal / row._ratingsCount).toFixed(1)) : 0,
    }));
  };

  const buildEnrollmentTrends = (enrollments, priceByCourseId) => {
    const byMonth = new Map();

    enrollments.forEach((enrollment) => {
      const sourceDate = enrollment.enrollmentDate || enrollment.lastActivity;
      const date = sourceDate ? new Date(sourceDate) : null;
      if (!date || Number.isNaN(date.getTime())) return;

      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!byMonth.has(monthKey)) {
        byMonth.set(monthKey, { monthKey, enrollments: 0, revenue: 0 });
      }

      const row = byMonth.get(monthKey);
      row.enrollments += 1;
      row.revenue += toNumber(priceByCourseId.get(enrollment.courseId), 0);
    });

    return Array.from(byMonth.values())
      .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
      .slice(-6)
      .map((row) => {
        const [year, month] = row.monthKey.split('-').map(Number);
        const labelDate = new Date(year, month - 1, 1);
        return {
          ...row,
          month: labelDate.toLocaleString('en-KE', { month: 'short', year: 'numeric' }),
        };
      });
  };

  const fetchModules = async () => {
    try {
      setLoading(true);
      setFetchError(null);

      const modulesPayload = await trainingApi.list();
      const rawModules = normalizeArrayPayload(modulesPayload);

      let normalizedModules = rawModules.map((module) => ({
        id: module.id,
        title: module.courseName,
        duration: module.duration,
        level: module.courseLevel,
        difficulty: toLabel(module.courseLevel, 'Beginner'),
        description: module.description || '',
        modules: module.courseModules || [],
        certification: module.certification ? `${module.courseName} Certificate` : null,
        participants: toNumber(module.enrolledCount, 0),
        rating: toNumber(module.rating, 0),
        status: module.isActive ? 'active' : 'inactive',
        price: toNumber(module.price, 0),
        revenue: toNumber(module.price, 0) * toNumber(module.enrolledCount, 0),
        completionRate: toNumber(module.completionRate, 0),
        instructor: module.instructorName || 'Unassigned',
        instructorId: module.instructorId || null,
        createdDate: module.createdAt || '',
        lastUpdated: module.updatedAt || '',
        category: module.primaryCategory || module.tags?.[0] || 'General',
        enrolledStudents: toNumber(module.enrolledCount, 0),
        maxStudents: toNumber(module.maxEnrollment, 0),
        passRate: toNumber(module.passRate, 0),
        certificateFee: toNumber(module.certificateFee, 0),
        issuedCertificates: toNumber(module.issuedCertificates, 0),
        pendingCertificates: toNumber(module.pendingCertificates, 0),
        eligibleCertificates: toNumber(module.eligibleCertificates, 0),
        tags: module.tags || [],
        courseModules: module.courseModules || [],
        isActive: Boolean(module.isActive),
        enrollNowAvailable: Boolean(module.enrollNowAvailable),
        _raw: module,
      }));

      const enrollmentResults = await Promise.allSettled(
        normalizedModules.map((course) => trainingApi.getEnrollments(course.id))
      );

      const enrollmentsByCourse = new Map();
      const normalizedEnrollments = [];

      normalizedModules.forEach((course, index) => {
        const result = enrollmentResults[index];
        const rows = result?.status === 'fulfilled' ? normalizeArrayPayload(result.value) : [];

        const mappedRows = rows.map((enrollment, rowIndex) => {
          const rawStatus = String(enrollment.status || 'ACTIVE').toUpperCase();
          const progress = toNumber(
            enrollment.progressPercentage ?? enrollment.progress,
            rawStatus === 'COMPLETED' ? 100 : 0
          );

          const mapped = {
            id: enrollment.id || enrollment.enrollmentId || `${course.id}-${rowIndex}`,
            name:
              enrollment.fullName ||
              enrollment.studentName ||
              enrollment.chwName ||
              enrollment.chwFullName ||
              enrollment.name ||
              enrollment.chw?.fullName ||
              'Unknown Learner',
            email: enrollment.email || enrollment.studentEmail || enrollment.chwEmail || enrollment.chw?.email || '-',
            phone: enrollment.phone || enrollment.studentPhone || enrollment.chwPhone || enrollment.chw?.phone || '-',
            courseId: course.id,
            enrollmentDate: enrollment.enrollmentDate || enrollment.enrolledAt || enrollment.createdAt || '',
            progress,
            score: toNumber(enrollment.score ?? enrollment.assessmentScore ?? enrollment.finalScore, 0),
            status:
              rawStatus === 'COMPLETED'
                ? 'Completed'
                : rawStatus === 'ACTIVE' || rawStatus === 'ENROLLED'
                  ? 'Active'
                  : toLabel(rawStatus, 'Active'),
            lastActivity:
              enrollment.lastActivity ||
              enrollment.lastAccessedAt ||
              enrollment.updatedAt ||
              enrollment.completedAt ||
              enrollment.enrollmentDate ||
              '',
            _raw: enrollment,
          };
          return mapped;
        });

        enrollmentsByCourse.set(course.id, mappedRows);
        normalizedEnrollments.push(...mappedRows);
      });

      normalizedModules = normalizedModules.map((course) => {
        const courseEnrollments = enrollmentsByCourse.get(course.id) || [];
        const completedRows = courseEnrollments.filter((row) => row.status === 'Completed');
        const completionRate =
          courseEnrollments.length > 0
            ? Number(((completedRows.length / courseEnrollments.length) * 100).toFixed(1))
            : course.completionRate;
        const passingRows = completedRows.filter((row) => row.score >= 50);
        const passRate =
          completedRows.length > 0
            ? Number(((passingRows.length / completedRows.length) * 100).toFixed(1))
            : course.passRate;

        const enrolledCount = courseEnrollments.length > 0 ? courseEnrollments.length : course.enrolledStudents;
        return {
          ...course,
          participants: enrolledCount,
          enrolledStudents: enrolledCount,
          completionRate,
          passRate,
          revenue: toNumber(course.price, 0) * enrolledCount,
        };
      });

      const priceByCourseId = new Map(normalizedModules.map((course) => [course.id, course.price]));

      setTrainingCourses(normalizedModules);
      setEnrolledStudents(normalizedEnrollments);
      setRevenueByCategory(buildCategoryRevenue(normalizedModules));
      setInstructors(buildInstructorSummary(normalizedModules));
      setEnrollmentTrends(buildEnrollmentTrends(normalizedEnrollments, priceByCourseId));
    } catch (error) {
      setFetchError(error.message || 'Failed to load training modules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
    // Initial bootstrap only; manual refresh uses fetchModules directly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trainingOverview = useMemo(() => {
    const totalCourses = trainingCourses.length;
    const activeCourses = trainingCourses.filter((course) => course.status === 'active').length;
    const totalStudents =
      enrolledStudents.length > 0
        ? enrolledStudents.length
        : trainingCourses.reduce((sum, course) => sum + toNumber(course.participants, 0), 0);
    const totalRevenue = trainingCourses.reduce((sum, course) => sum + toNumber(course.revenue, 0), 0);
    const avgCompletionRate =
      trainingCourses.length > 0
        ? trainingCourses.reduce((sum, course) => sum + toNumber(course.completionRate, 0), 0) / trainingCourses.length
        : 0;
    const avgRating =
      trainingCourses.length > 0
        ? trainingCourses.reduce((sum, course) => sum + toNumber(course.rating, 0), 0) / trainingCourses.length
        : 0;
    const certificatesIssued = enrolledStudents.filter((row) => row.status === 'Completed').length;
    const currentMonth = enrollmentTrends[enrollmentTrends.length - 1]?.enrollments || 0;
    const previousMonth = enrollmentTrends[enrollmentTrends.length - 2]?.enrollments || 0;
    const monthlyGrowth = previousMonth > 0 ? ((currentMonth - previousMonth) / previousMonth) * 100 : 0;

    return {
      totalCourses,
      activeCourses,
      totalStudents,
      totalRevenue,
      avgCompletionRate,
      avgRating,
      monthlyGrowth,
      certificatesIssued,
    };
  }, [trainingCourses, enrolledStudents, enrollmentTrends]);

  const filteredCourses = useMemo(() => {
    const searchValue = searchTerm.trim().toLowerCase();
    return trainingCourses.filter((course) => {
      const matchesFilter = courseFilter === 'all' ? true : course.status === courseFilter;
      const matchesSearch =
        searchValue === '' ||
        String(course.title || '').toLowerCase().includes(searchValue) ||
        String(course.instructor || '').toLowerCase().includes(searchValue) ||
        String(course.category || '').toLowerCase().includes(searchValue);
      return matchesFilter && matchesSearch;
    });
  }, [trainingCourses, searchTerm, courseFilter]);

  const tabs = [
    { id: 'overview', label: 'Training Overview', icon: BarChart3 },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'students', label: 'Student Enrollment', icon: Users },
    { id: 'revenue', label: 'Revenue Analytics', icon: DollarSign },
    { id: 'certificates', label: 'Certifications', icon: Award },
    { id: 'instructors', label: 'Instructors', icon: UserCheck }

    // { id: 'reports', label: 'Training Reports', icon: FileText }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-800';
      case 'inactive':
        return 'text-gray-800';
      case 'paused':
        return 'text-yellow-800';
      case 'draft':
        return 'text-gray-800';
      case 'completed':
        return 'text-blue-800';
      case 'cancelled':
        return 'text-red-800';
      default:
        return 'text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-800';
      case 'Intermediate':
        return 'text-yellow-800';
      case 'Advanced':
        return 'text-red-800';
      default:
        return 'text-gray-800';
    }
  };

  const showFeedback = (message, type) => {
    setActionFeedback({ show: true, message, type });
    setTimeout(() => {
      setActionFeedback({ show: false, message: '', type: '' });
    }, 3000);
  };

 const handleActivateCourse = (courseId) => {
  const course = trainingCourses.find(c => c.id === courseId);
  setSelectedCourse(course);
  setConfirmationTitle('Activate Course');
  setConfirmationMessage(`Activate "${course?.title}"? It will become visible to students.`);
  setConfirmationType('success');
  setConfirmationAction(() => async () => {
    try {
      await trainingApi.activate(courseId);
      fetchModules();
      showFeedback('Course activated successfully!', 'success');
    } catch (err) {
      showFeedback(err.message || 'Failed to activate', 'error');
    }
  });
  setShowConfirmationModal(true);
};

  const handlePauseCourse = (courseId) => {
  const course = trainingCourses.find(c => c.id === courseId);
  setSelectedCourse(course);
  setConfirmationTitle('Deactivate Course');
  setConfirmationMessage(`Deactivate "${course?.title}"? Students won't be able to access it.`);
  setConfirmationType('warning');
  setConfirmationAction(() => async () => {
    try {
      await trainingApi.deactivate(courseId);
      fetchModules();
      showFeedback('Course deactivated successfully!', 'warning');
    } catch (err) {
      showFeedback(err.message || 'Failed to deactivate', 'error');
    }
  });
  setShowConfirmationModal(true);
};


const [enrollTargetCourse, setEnrollTargetCourse] = useState(null);
const [showEnrollCHWModal, setShowEnrollCHWModal] = useState(false);

const handleEnrollStudent = (courseId) => {
  const course = trainingCourses.find(c => c.id === courseId);
  setEnrollTargetCourse(course);
  setShowEnrollCHWModal(true);
};



  const handleUpdateCourse = (courseId) => {
    const course = trainingCourses.find(c => c.id === courseId);
    setSelectedCourse(course);
    setShowEditCourseModal(true);
  };

  const handleSaveEditedCourse = async (updatedCourse) => {
  try {
    await trainingApi.update(updatedCourse.id, {
      courseName:         updatedCourse.title ?? updatedCourse.courseName,
      courseLevel:        (updatedCourse.level ?? updatedCourse.courseLevel ?? 'BEGINNER').toUpperCase(),
      duration:           updatedCourse.duration,
      description:        updatedCourse.description,
      instructorName:     updatedCourse.instructor ?? updatedCourse.instructorName,
      certification:      !!updatedCourse.certification,
      enrollNowAvailable: updatedCourse.enrollNowAvailable ?? true,
      maxEnrollment:      updatedCourse.maxStudents ?? updatedCourse.maxEnrollment ?? null,
      price:              updatedCourse.price ?? null,
      prerequisites:      updatedCourse.prerequisites ?? '',
      courseModules:      updatedCourse.modules ?? updatedCourse.courseModules ?? [],
      tags:               updatedCourse.tags ?? [],
      isActive:           updatedCourse.isActive ?? true,
    });
    fetchModules();
    showFeedback('Course updated successfully!', 'success');
  } catch (err) {
    showFeedback(err.message || 'Failed to update course', 'error');
  }
};

  const handleViewCourse = (courseId) => {
    const course = trainingCourses.find(c => c.id === courseId);
    setSelectedCourse(course);
    setShowCourseDetailsModal(true);
  };

  const handleViewStudent = (student, course) => {
    setSelectedStudent(student);
    setSelectedCourse(course);
    setShowStudentDetailsModal(true);
  };

  const _handleDeleteCourse = async (courseId) => {
  const course = trainingCourses.find(c => c.id === courseId);
  setSelectedCourse(course);
  setConfirmationTitle('Delete Course');
  setConfirmationMessage(`Permanently delete "${course?.title}"? This cannot be undone.`);
  setConfirmationType('danger');
  setConfirmationAction(() => async () => {
    try {
      await trainingApi.delete(courseId);
      fetchModules();
      showFeedback('Course deleted successfully!', 'success');
    } catch (err) {
      showFeedback(err.message || 'Failed to delete', 'error');
    }
  });
  setShowConfirmationModal(true);
};

  // Instructor handlers
  const handleViewInstructor = (instructor) => {
    setSelectedInstructor(instructor);
    setShowViewInstructorModal(true);
  };

  const handleEditInstructor = (instructor) => {
    setSelectedInstructor(instructor);
    setShowEditInstructorModal(true);
  };

  const handleSaveEditedInstructor = (updatedInstructor) => {
    showFeedback('Instructor updates require a backend endpoint and were not saved.', 'warning');
    setShowEditInstructorModal(false);
    setSelectedInstructor(updatedInstructor || null);
  };

  const handleAddInstructor = (newInstructor) => {
    showFeedback('Instructor creation requires a backend endpoint and was not saved.', 'warning');
    setShowAddInstructorModal(false);
    setSelectedInstructor(newInstructor || null);
  };

  const handleDeleteInstructor = (instructor) => {
    setSelectedInstructor(instructor);
    showFeedback('Instructor deletion requires a backend endpoint and was not performed.', 'warning');
  };

  const renderOverview = () => (
    <div className="space-y-4">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold ">Training Overview</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowCreateCourseModal(true)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create Course
          </button>
          <button 
            onClick={() => setShowBulkEnrollmentModal(true)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            Bulk Enrollment
          </button>
          <button 
            onClick={() => setShowIssueCertificatesModal(true)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Award className="w-4 h-4 mr-1.5" />
            Issue Certificates
          </button>
          <button 
            onClick={() => setShowExportReportsModal(true)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-1.5" />
            Export Reports
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Total Courses</p>
              <p className="text-2xl font-bold">{trainingOverview.totalCourses}</p>
              <div className="flex items-center mt-1">
                <BookOpen className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm">{trainingOverview.activeCourses} active</span>
              </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <GraduationCap className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Total Students</p>
              <p className="text-2xl font-bold">{trainingOverview.totalStudents}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm ">+{trainingOverview.monthlyGrowth}% this month</span>
              </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(trainingOverview.totalRevenue)}</p>
              <div className="flex items-center mt-1">
                <DollarSign className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm">From training programs</span>
              </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Certificates Issued</p>
              <p className="text-2xl font-bold">{trainingOverview.certificatesIssued}</p>
              <div className="flex items-center mt-1">
                <Award className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm">{trainingOverview.avgCompletionRate.toFixed(1)}% completion</span>
              </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 p-4">
          <h3 className="text-base font-semibold mb-3">Enrollment Trends</h3>
          <div className="space-y-3">
            {enrollmentTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium ">{trend.month}</p>
                  <p className="text-sm text-gray-600">{trend.enrollments} new students</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(trend.revenue)}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
            {enrollmentTrends.length === 0 && (
              <p className="text-sm text-gray-500">No enrollment trend data available.</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <h3 className="text-base font-semibold mb-3">Revenue by Category</h3>
          <div className="space-y-3">
            {revenueByCategory.slice(0, 5).map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                  <span className="text-sm text-gray-700">{category.category}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatCurrency(category.revenue)}</p>
                  <p className="text-xs text-gray-600">{category.students} students</p>
                </div>
              </div>
            ))}
            {revenueByCategory.length === 0 && (
              <p className="text-sm text-gray-500">No category revenue data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Course Management</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
            />
          </div>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
          >
            <option value="all">All Courses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button 
            onClick={() => setShowCreateCourseModal(true)}
            className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Course
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Course Title</th>
              <th className="px-4 py-3 text-center">Duration</th>
              <th className="px-4 py-3 text-center">Level</th>
              <th className="px-4 py-3 text-center">Students</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-center">Revenue</th>
              <th className="px-4 py-3 text-center">Completion</th>
              <th className="px-4 py-3 text-center">Rating</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCourses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-xs mt-1">Instructor: {course.instructor}</p>
                    <p className="text-xs">Category: {course.category}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-medium">{course.duration}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-2 py-1 text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div>
                    <p className="font-semibold">{course.enrolledStudents}/{course.maxStudents}</p>
                    <p className="text-xs">Pass Rate: {course.passRate}%</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center font-semibold">
                  {formatCurrency(course.price)}
                </td>
                  <td className="px-4 py-4 text-center font-semibold">
                    {formatCurrency(course.revenue)}
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium mb-1">{course.completionRate}%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${course.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    {course.status !== 'active' && (
                      <button
                        onClick={() => handleActivateCourse(course.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 hover:scale-110"
                        title="Activate Course"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    {course.status === 'active' && (
                      <button
                        onClick={() => handlePauseCourse(course.id)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200 hover:scale-110"
                        title="Pause Course"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleUpdateCourse(course.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Edit Course"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleViewCourse(course.id)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 hover:scale-110" 
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEnrollStudent(course.id)}
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-md"
                      title="Enroll Students"
                    >
                      Enroll
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredCourses.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={10}>
                  No courses returned by backend data for the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Student Enrollment Management</h3>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowBulkEnrollmentModal(true)}
            className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Bulk Enrollment
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Import Students
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-gray-200 bg-white p-4">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-blue-600 mr-2" />
            <div>
              <p className="">Total Students</p>
              <p className="text-xl font-bold ">{trainingOverview.totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 bg-white p-4">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-blue-600 mr-2" />
            <div>
              <p className="">Active Enrollments</p>
              <p className="text-xl font-bold ">
                {enrolledStudents.filter((row) => row.status !== 'Completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 bg-white p-4">
          <div className="flex items-center">
            <Award className="w-6 h-6 text-blue-600 mr-2" />
            <div>
              <p className="">Completed Courses</p>
              <p className="text-xl font-bold ">{trainingOverview.certificatesIssued}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-center">Enrolled Course</th>
              <th className="px-4 py-3 text-center">Enrollment Date</th>
              <th className="px-4 py-3 text-center">Progress</th>
              <th className="px-4 py-3 text-center">Score</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {enrolledStudents.map((student) => {
                const course = trainingCourses.find(c => c.id === student.courseId);
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        {/* <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-blue-600" />
                        </div> */}
                        <div>
                          <p className="font-semibold">{student.name}</p>
                          <p className="text-xs text-gray-500">ID: STU-{student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-gray-700">{student.email}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-gray-700">{student.phone}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div>
                        <p className="font-medium text-gray-900">{course?.title}</p>
                        <p className="text-xs text-gray-500">{course?.category}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-gray-700">
                          {student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : '-'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium mb-1">{student.progress}%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="font-semibold text-gray-900">{student.score}%</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === 'Completed' 
                          ? 'text-green-800' 
                          : 'text-blue-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => handleViewStudent(student, course)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Student Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleViewCourse(course?.id)}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          title="View Course"
                        >
                          <BookOpen className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            {enrolledStudents.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={9}>
                  No enrollment records returned by the backend.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Total Revenue</p>
              <p className="text-xl font-bold">{formatCurrency(trainingOverview.totalRevenue)}</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Avg Revenue per Course</p>
              <p className="text-xl font-bold">
                {formatCurrency(
                  trainingOverview.totalCourses > 0
                    ? trainingOverview.totalRevenue / trainingOverview.totalCourses
                    : 0
                )}
              </p>
            </div>
            <div className="w-10 h-10  flex items-center justify-center">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Avg Revenue per Student</p>
              <p className="text-xl font-bold">
                {formatCurrency(
                  trainingOverview.totalStudents > 0
                    ? trainingOverview.totalRevenue / trainingOverview.totalStudents
                    : 0
                )}
              </p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Monthly Growth</p>
              <p className="text-xl font-bold">{trainingOverview.monthlyGrowth}%</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-semibold">Revenue by Category</h3>
        <div className="bg-white border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-center">Courses</th>
                <th className="px-4 py-3 text-center">Students</th>
                <th className="px-4 py-3 text-right">Total Revenue</th>
                <th className="px-4 py-3 text-right">Avg per Student</th>
                <th className="px-4 py-3 text-center">% of Total</th>
                <th className="px-4 py-3 text-left">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {revenueByCategory.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <span className="font-semibold">{category.category}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-medium">{category.courses}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-semibold">{category.students}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-semibold">{formatCurrency(category.revenue)}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-semibold">
                      {formatCurrency(category.students > 0 ? category.revenue / category.students : 0)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-semibold">
                      {trainingOverview.totalRevenue > 0
                        ? ((category.revenue / trainingOverview.totalRevenue) * 100).toFixed(1)
                        : '0.0'}%
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{
                          width: `${
                            trainingOverview.totalRevenue > 0
                              ? (category.revenue / trainingOverview.totalRevenue) * 100
                              : 0
                          }%`
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
              {revenueByCategory.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={7}>
                    No revenue categories available from backend data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Certificate Management</h3>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Award className="w-4 h-4 mr-2" />
            Issue Certificates
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Download Templates
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <Award className="w-6 h-6 text-blue-600 mr-2" />
            <div>
              <p className="">Certificates Issued</p>
              <p className="text-xl font-bold">{trainingOverview.certificatesIssued}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-blue-600 mr-2" />
            <div>
              <p className="">Pass Rate</p>
              <p className="text-xl font-bold">
                {trainingCourses.length > 0
                  ? (trainingCourses.reduce((sum, course) => sum + course.passRate, 0) / trainingCourses.length).toFixed(1)
                  : '0.0'}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-blue-600 mr-2" />
            <div>
              <p className="">Avg Rating</p>
              <p className="text-xl font-bold">{trainingOverview.avgRating.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Certification</th>
              <th className="px-4 py-3 text-center">Completed Students</th>
              <th className="px-4 py-3 text-center">Pass Rate</th>
              <th className="px-4 py-3 text-center">Eligible</th>
              <th className="px-4 py-3 text-center">Issued</th>
              <th className="px-4 py-3 text-center">Pending</th>
              <th className="px-4 py-3 text-right">Certificate Fee</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trainingCourses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-xs text-gray-600">Certification: {course.certification}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-semibold">
                    {Math.floor(course.enrolledStudents * (course.completionRate / 100))}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-semibold">{course.passRate}%</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-medium">
                    {course.eligibleCertificates > 0
                      ? course.eligibleCertificates
                      : Math.floor(course.enrolledStudents * (course.completionRate / 100) * (course.passRate / 100))}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-medium">
                    {course.issuedCertificates > 0
                      ? course.issuedCertificates
                      : Math.floor(course.enrolledStudents * (course.completionRate / 100) * (course.passRate / 100))}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-medium">
                    {course.pendingCertificates > 0
                      ? course.pendingCertificates
                      : Math.max(
                          Math.floor(course.enrolledStudents * (course.completionRate / 100) * (course.passRate / 100)) -
                            (course.issuedCertificates > 0
                              ? course.issuedCertificates
                              : Math.floor(course.enrolledStudents * (course.completionRate / 100) * (course.passRate / 100))),
                          0
                        )}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold">{formatCurrency(course.certificateFee || 0)}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button 
                    onClick={() => setShowIssueCertificatesModal(true)}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Issue Certificates
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInstructors = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Instructor Management</h3>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowExportReportsModal(true)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button 
            onClick={() => setShowAddInstructorModal(true)}
            className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Instructor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-blue-600 mr-2" />
            <div>
              <p className="">Total Instructors</p>
              <p className="text-xl font-bold ">{instructors.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
            <div>
              <p className="">Total Courses</p>
              <p className="text-xl font-bold ">
                {instructors.reduce((sum, instructor) => sum + instructor.coursesTeaching, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-blue-600 mr-2" />
            <div>
              <p className="">Avg Rating</p>
              <p className="text-xl font-bold ">
                {instructors.length > 0
                  ? (instructors.reduce((sum, instructor) => sum + instructor.avgRating, 0) / instructors.length).toFixed(1)
                  : '0.0'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <DollarSign className="w-6 h-6 text-blue-600 mr-2" />
            <div>
              <p className="">Total Monthly Salaries</p>
              <p className="text-xl font-bold ">
                {formatCurrency(instructors.reduce((sum, instructor) => sum + instructor.salary, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Instructor</th>
              <th className="px-4 py-3 text-left">Specialization</th>
              <th className="px-4 py-3 text-center">Experience</th>
              <th className="px-4 py-3 text-center">Courses</th>
              <th className="px-4 py-3 text-center">Students</th>
              <th className="px-4 py-3 text-center">Rating</th>
              <th className="px-4 py-3 text-right">Monthly Salary</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {instructors.map((instructor) => (
              <tr key={instructor.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">{instructor.name}</p>
                    <p className="text-xs text-gray-600">{instructor.qualification}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-semibold">{instructor.specialization}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-medium text-gray-900">{instructor.experience}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div>
                    <p className="font-semibold text-gray-900">{instructor.coursesTeaching}</p>
                    <p className="text-xs text-gray-500">{instructor.completedCourses} completed</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-semibold text-gray-900">{instructor.totalStudents}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="font-medium text-gray-900">{instructor.avgRating}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold text-gray-900">{formatCurrency(instructor.salary)}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="px-2 py-1 text-xs font-medium  text-green-600">
                    {instructor.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      onClick={() => handleViewInstructor(instructor)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditInstructor(instructor)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      title="Edit Instructor"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteInstructor(instructor)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Instructor"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {instructors.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={9}>
                  No instructors returned by backend data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => {
    const reports = enrollmentTrends.map((trend, index) => ({
      id: `${trend.monthKey || trend.month}-${index}`,
      reportName: `Enrollment and Revenue Report - ${trend.month}`,
      category: 'Enrollment',
      period: trend.month,
      generatedDate: new Date().toISOString().slice(0, 10),
      totalStudents: trend.enrollments,
      totalRevenue: trend.revenue,
      completionRate: Number(trainingOverview.avgCompletionRate.toFixed(1)),
      status: 'Generated',
    }));

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Training Reports</h3>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filter Reports
            </button>
            <button className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-blue-600 mr-2" />
              <div>
                <p className="">Total Reports</p>
                <p className="text-xl font-bold">{reports.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <div>
                <p className="">Students Tracked</p>
                <p className="text-xl font-bold">
                  {reports.reduce((sum, report) => sum + report.totalStudents, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex items-center">
              <DollarSign className="w-6 h-6 text-blue-600 mr-2" />
              <div>
                <p className="">Total Revenue</p>
                <p className="text-xl font-bold">
                  {formatCurrency(reports.reduce((sum, report) => sum + report.totalRevenue, 0))}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-blue-600 mr-2" />
              <div>
                <p className="">Avg Completion</p>
                <p className="text-xl font-bold">
                  {reports.length > 0
                    ? (reports.reduce((sum, report) => sum + report.completionRate, 0) / reports.length).toFixed(1)
                    : '0.0'}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Report Name</th>
                <th className="px-4 py-3 text-center">Category</th>
                <th className="px-4 py-3 text-center">Period</th>
                <th className="px-4 py-3 text-center">Generated Date</th>
                <th className="px-4 py-3 text-center">Students</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 text-center">Completion</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <span className="font-semibold ">{report.reportName}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-2 py-1 text-xs font-medium rounded-full border text-blue-800">
                      {report.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-gray-700">{report.period}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-gray-700">{report.generatedDate}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-semibold text-gray-900">{report.totalStudents}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-semibold text-gray-900">{formatCurrency(report.totalRevenue)}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-semibold text-gray-900">{report.completionRate}%</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-2 py-1 text-xs font-medium rounded-full border text-green-800">
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={9}>
                    No report data available from backend trends.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Modal handlers
  const handleSaveCourse = async (courseData) => {
  try {
    await trainingApi.create({
      courseName:         courseData.title ?? courseData.courseName,
      courseLevel:        (courseData.level ?? courseData.courseLevel ?? 'BEGINNER').toUpperCase(),
      duration:           courseData.duration,
      description:        courseData.description,
      instructorName:     courseData.instructor ?? courseData.instructorName,
      certification:      !!courseData.certification,
      enrollNowAvailable: true,
      maxEnrollment:      courseData.maxStudents ?? courseData.maxEnrollment ?? null,
      price:              courseData.price ?? null,
      prerequisites:      courseData.prerequisites ?? '',
      courseModules:      courseData.modules ?? courseData.courseModules ?? [],
      tags:               courseData.tags ?? [],
      isActive:           true,
    });
    fetchModules();
    showFeedback('Course created successfully!', 'success');
  } catch (err) {
    showFeedback(err.message || 'Failed to create course', 'error');
  }
};

// const handleSaveEditedCourse = (updatedCourse) => {
//   setTrainingCourses(prevCourses =>
//     prevCourses.map(course =>
//       course.id === updatedCourse.id ? updatedCourse : course
//     )
//   );
//   showFeedback('Course updated successfully!', 'success');
// };

  const handleBulkEnroll = (enrollmentData) => {
    console.log('Bulk enrollment:', enrollmentData);
    
  };

  const handleIssueCertificates = (certificateData) => {
    console.log('Certificates issued:', certificateData);
    
  };

  const handleExportReport = (reportData) => {
    console.log('Report exported:', reportData);
  
  };

  const EnrollCHWModal = ({ course, onClose, onSaved }) => {
  const [chws, setChws]             = useState([]);
  const [search, setSearch]         = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [notes, setNotes]           = useState('');
  const [chwLoading, setChwLoading] = useState(true);
  const [saving, setSaving]         = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  useEffect(() => {
    chwApi.list()
      .then(data => setChws(Array.isArray(data) ? data : data?.content ?? []))
      .catch(() => setEnrollError('Failed to load CHWs'))
      .finally(() => setChwLoading(false));
  }, []);

  const filtered = chws.filter(c => {
    const q = search.toLowerCase();
    const name = `${c.firstName ?? ''} ${c.lastName ?? ''}`.toLowerCase();
    return name.includes(q) || (c.code ?? '').toLowerCase().includes(q) || (c.region ?? '').toLowerCase().includes(q);
  });

  const handleSubmit = async () => {
    if (!selectedId) { setEnrollError('Please select a CHW'); return; }
    setSaving(true); setEnrollError(null);
    try {
      await trainingApi.enroll(course._raw?.id ?? course.id, {
        chwId: Number(selectedId),
        notes,
      });
      showFeedback(`CHW enrolled in "${course.title}" successfully!`, 'success');
      onSaved();
    } catch (err) {
      setEnrollError(err.message || 'Enrollment failed');
    } finally {
      setSaving(false);
    }
  };

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-lg border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Enroll CHW</h2>
            <p className="text-xs text-gray-500 mt-0.5">{course.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">✕</button>
        </div>

        <div className="p-6 space-y-4">
          {enrollError && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {enrollError}
            </div>
          )}

          <input type="text" placeholder="Search CHW by name, code or region..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

          {chwLoading ? <LoadingSpinner /> : (
            <div className="max-h-52 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
              {filtered.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-6">No CHWs found.</p>
              )}
              {filtered.map(c => {
                const name = `${c.firstName ?? ''} ${c.lastName ?? ''}`.trim() || c.code;
                return (
                  <label key={c.id}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 ${selectedId == c.id ? 'bg-blue-50' : ''}`}>
                    <input type="radio" name="chw" value={c.id}
                      checked={selectedId == c.id}
                      onChange={() => setSelectedId(c.id)}
                      className="w-4 h-4 text-blue-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{name}</p>
                      <p className="text-xs text-gray-500">{c.code} · {c.region}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      c.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>{c.status}</span>
                  </label>
                );
              })}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Notes (optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
              placeholder="e.g. Part of Q2 2026 training cohort"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving || !selectedId}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Enrolling...' : 'Enroll CHW'}
          </button>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-5">
      {/* Feedback Notification */}
      {actionFeedback.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`flex items-center px-6 py-3 rounded-lg shadow-lg ${
            actionFeedback.type === 'success' ? 'bg-green-500' :
            actionFeedback.type === 'warning' ? 'bg-yellow-500' :
            actionFeedback.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}>
            {actionFeedback.type === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
            {actionFeedback.type === 'warning' && <AlertCircle className="w-5 h-5 mr-2" />}
            {actionFeedback.type === 'error' && <XCircle className="w-5 h-5 mr-2" />}
            {actionFeedback.type === 'info' && <AlertCircle className="w-5 h-5 mr-2" />}
            <span className="font-medium">{actionFeedback.message}</span>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateCourseModal 
        showModal={showCreateCourseModal}
        setShowModal={setShowCreateCourseModal}
        onSaveCourse={handleSaveCourse}
      />
      <BulkEnrollmentModal 
        showModal={showBulkEnrollmentModal}
        setShowModal={setShowBulkEnrollmentModal}
        courses={trainingCourses}
        onBulkEnroll={handleBulkEnroll}
      />
      <IssueCertificatesModal 
        showModal={showIssueCertificatesModal}
        setShowModal={setShowIssueCertificatesModal}
        courses={trainingCourses}
        students={[]} 
        onIssueCertificates={handleIssueCertificates}
      />
      <ExportReportsModal 
        showModal={showExportReportsModal}
        setShowModal={setShowExportReportsModal}
        courses={trainingCourses}
        onExportReport={handleExportReport}
      />
      <CourseDetailsModal 
        showModal={showCourseDetailsModal}
        setShowModal={setShowCourseDetailsModal}
        course={selectedCourse}
        students={enrolledStudents.filter(s => s.courseId === selectedCourse?.id)}
      />
      <EditCourseModal 
        showModal={showEditCourseModal}
        setShowModal={setShowEditCourseModal}
        course={selectedCourse}
        onUpdateCourse={handleSaveEditedCourse}
      />
      <ConfirmationModal 
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        title={confirmationTitle || (selectedCourse?.status === 'active' ? 'Pause Course' : 'Activate Course')}
        message={
          confirmationMessage || (
            selectedCourse?.status === 'active' 
              ? `Are you sure you want to pause "${selectedCourse?.title}"? Students will not be able to access this course until it is activated again.`
              : `Are you sure you want to activate "${selectedCourse?.title}"? This course will be visible and accessible to students.`
          )
        }
        type={confirmationType || (selectedCourse?.status === 'active' ? 'warning' : 'success')}
        onConfirm={confirmationAction}
      />
      <StudentDetailsModal 
        showModal={showStudentDetailsModal}
        setShowModal={setShowStudentDetailsModal}
        student={selectedStudent}
        course={selectedCourse}
      />
      <ViewInstructorModal 
        showModal={showViewInstructorModal}
        setShowModal={setShowViewInstructorModal}
        instructor={selectedInstructor}
      />
      <EditInstructorModal 
        showModal={showEditInstructorModal}
        setShowModal={setShowEditInstructorModal}
        instructor={selectedInstructor}
        onUpdateInstructor={handleSaveEditedInstructor}
      />
      <AddInstructorModal 
        showModal={showAddInstructorModal}
        setShowModal={setShowAddInstructorModal}
        onAddInstructor={handleAddInstructor}
      />

      {showEnrollCHWModal && enrollTargetCourse && (
  <EnrollCHWModal
    course={enrollTargetCourse}
    onClose={() => { setShowEnrollCHWModal(false); setEnrollTargetCourse(null); }}
    onSaved={() => { setShowEnrollCHWModal(false); setEnrollTargetCourse(null); fetchModules(); }}
  />
)}

      <div>
        <div>
          {/* Header Section */}
          <div className="mb-4">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Training Management</h1>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-4">
            <div className="flex overflow-x-auto border-b border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[560px] [&_table]:text-sm [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-gray-600 [&_th]:font-semibold [&_th]:py-2.5 [&_th]:px-3 [&_td]:py-2.5 [&_td]:px-3">
            {loading && <LoadingSpinner />}
            {fetchError && <ErrorMessage message={fetchError} onRetry={fetchModules} />}
            {!loading && !fetchError && activeTab === 'overview'          && renderOverview()}
            {!loading && !fetchError && activeTab === 'courses'           && renderCourses()}
            {!loading && !fetchError && activeTab === 'students'          && renderStudents()}
            {!loading && !fetchError && activeTab === 'revenue'           && renderRevenue()}
            {!loading && !fetchError && activeTab === 'certificates'      && renderCertificates()}
            {!loading && !fetchError && activeTab === 'instructors'       && renderInstructors()}
            {!loading && !fetchError && activeTab === 'reports'           && renderReports()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingManagement;