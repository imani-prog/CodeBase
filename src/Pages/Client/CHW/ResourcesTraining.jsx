import { useState } from 'react';
import {
  BookOpen,
  Video,
  FileText,
  Download,
  Play,
  CheckCircle,
  Clock,
  Award,
  Search,
  Filter,
  Star,
  Users,
  TrendingUp
} from 'lucide-react';
import ConfirmationModal from '../../../Components/Admin/ConfirmationModal';

const ResourcesTraining = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample training courses
  const [courses, setCourses] = useState(() => [
    {
      id: 1,
      title: 'Community Health Worker Fundamentals',
      description: 'Essential skills and knowledge for community health workers',
      duration: '4 hours',
      modules: 8,
      progress: 75,
      category: 'Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      enrolled: 342,
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Maternal & Child Health Care',
      description: 'Comprehensive training on prenatal and postnatal care',
      duration: '6 hours',
      modules: 12,
      progress: 100,
      category: 'Specialized',
      instructor: 'Dr. Mary Wanjiru',
      rating: 4.9,
      enrolled: 256,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Chronic Disease Management',
      description: 'Managing diabetes, hypertension, and other chronic conditions',
      duration: '5 hours',
      modules: 10,
      progress: 0,
      category: 'Specialized',
      instructor: 'Dr. John Kamau',
      rating: 4.7,
      enrolled: 189,
      status: 'not-started'
    },
    {
      id: 4,
      title: 'Mental Health First Aid',
      description: 'Recognizing and responding to mental health crises',
      duration: '3 hours',
      modules: 6,
      progress: 45,
      category: 'Specialized',
      instructor: 'Dr. Grace Akinyi',
      rating: 4.9,
      enrolled: 412,
      status: 'in-progress'
    }
  ]);

  // Sample resources
  const [resources] = useState([
    {
      id: 1,
      title: 'WHO Community Health Worker Guidelines',
      type: 'PDF',
      category: 'Guidelines',
      size: '2.4 MB',
      downloads: 1234,
      date: '2024-10-15'
    },
    {
      id: 2,
      title: 'Patient Assessment Checklist',
      type: 'PDF',
      category: 'Forms',
      size: '345 KB',
      downloads: 2156,
      date: '2024-10-12'
    },
    {
      id: 3,
      title: 'Medication Administration Guide',
      type: 'PDF',
      category: 'Reference',
      size: '1.8 MB',
      downloads: 987,
      date: '2024-10-10'
    },
    {
      id: 4,
      title: 'Emergency Protocols Video',
      type: 'Video',
      category: 'Training',
      size: '125 MB',
      downloads: 543,
      date: '2024-10-08'
    },
    {
      id: 5,
      title: 'Nutrition Counseling Templates',
      type: 'PDF',
      category: 'Forms',
      size: '512 KB',
      downloads: 765,
      date: '2024-10-05'
    }
  ]);

  // Sample certifications
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      title: 'Community Health Worker Certification',
      issueDate: '2024-03-15',
      expiryDate: '2026-03-15',
      status: 'active',
      credentialId: 'CHW-2024-001234'
    },
    {
      id: 2,
      title: 'First Aid & CPR',
      issueDate: '2024-01-20',
      expiryDate: '2025-01-20',
      status: 'active',
      credentialId: 'FA-2024-005678'
    },
    {
      id: 3,
      title: 'Maternal Health Specialist',
      issueDate: '2023-11-10',
      expiryDate: '2025-11-10',
      status: 'active',
      credentialId: 'MHS-2023-009012'
    }
  ]);

  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState({
    title: '',
    message: '',
    type: 'warning',
    onConfirm: null
  });

  const completedCourses = courses.filter((course) => course.status === 'completed').length;
  const inProgressCourses = courses.filter((course) => course.status === 'in-progress').length;
  const learningHours = courses.reduce((total, course) => {
    const match = course.duration?.match(/(\d+)/);
    if (!match) return total;
    return total + parseInt(match[1], 10);
  }, 0);

  const stats = [
    { label: 'Courses Completed', value: completedCourses.toString(), color: 'blue', icon: CheckCircle },
    { label: 'In Progress', value: inProgressCourses.toString(), color: 'blue', icon: Clock },
    { label: 'Certificates Earned', value: certifications.length.toString(), color: 'blue', icon: Award },
    { label: 'Learning Hours', value: learningHours.toString(), color: 'blue', icon: TrendingUp }
  ];

  const tabs = [
    { id: 'courses', label: 'Training Courses', count: courses.length },
    { id: 'resources', label: 'Resources', count: resources.length },
    { id: 'certificates', label: 'My Certificates', count: certifications.length }
  ];

  const openActionModal = ({ title, message, type = 'warning', onConfirm }) => {
    setActionModalConfig({ title, message, type, onConfirm });
    setShowActionModal(true);
  };

  const handleStartCourse = (course) => {
    openActionModal({
      title: 'Start Course',
      message: `Start "${course.title}" and begin tracking your progress?`,
      type: 'success',
      onConfirm: () => {
        setCourses((prevCourses) =>
          prevCourses.map((item) =>
            item.id === course.id
              ? {
                  ...item,
                  status: 'in-progress',
                  progress: item.progress && item.progress > 0 ? item.progress : 5
                }
              : item
          )
        );
      }
    });
  };

  const handleContinueCourse = (course) => {
    const nextProgress = Math.min(100, (course.progress || 0) + 25);
    const willComplete = nextProgress >= 100;

    openActionModal({
      title: willComplete ? 'Complete Course' : 'Continue Course',
      message: willComplete
        ? `Mark "${course.title}" as completed? This will update your certificates.`
        : `Continue learning "${course.title}"? Your progress will be updated to ${nextProgress}%.`,
      type: 'success',
      onConfirm: () => {
        setCourses((prevCourses) =>
          prevCourses.map((item) =>
            item.id === course.id
              ? {
                  ...item,
                  status: willComplete ? 'completed' : 'in-progress',
                  progress: nextProgress
                }
              : item
          )
        );

        if (willComplete) {
          setCertifications((prevCertifications) => {
            const exists = prevCertifications.some((cert) => cert.title === course.title);
            if (exists) return prevCertifications;

            const issueDate = new Date();
            const expiryDate = new Date(issueDate);
            expiryDate.setFullYear(issueDate.getFullYear() + 2);

            const newCertification = {
              id: prevCertifications.length + 1,
              title: course.title,
              issueDate: issueDate.toISOString().slice(0, 10),
              expiryDate: expiryDate.toISOString().slice(0, 10),
              status: 'active',
              credentialId: `CHW-${issueDate.getFullYear()}-${String(prevCertifications.length + 1).padStart(4, '0')}`
            };

            return [...prevCertifications, newCertification];
          });
        }
      }
    });
  };

  const handleViewCertificate = (course) => {
    openActionModal({
      title: 'View Certificate',
      message:
        `Your certificate for "${course.title}" is available under the "My Certificates" tab. You can download or verify it from there.`,
      type: 'success'
    });
  };

  const handleReviewCourse = (course) => {
    openActionModal({
      title: 'Review Course',
      message:
        `Course review for "${course.title}" will open in a dedicated learning view in a future update. Your completion status and certificates are already tracked here.`,
      type: 'warning'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-800';
      case 'in-progress':
        return 'text-blue-800';
      case 'not-started':
        return 'text-gray-800';
      default:
        return 'text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Fundamentals':
        return 'text-blue-800';
      case 'Specialized':
        return 'text-blue-800';
      case 'Guidelines':
        return 'text-blue-800';
      case 'Forms':
        return 'text-blue-800';
      case 'Reference':
        return 'text-blue-800';
      case 'Training':
        return 'text-blue-800';
      default:
        return 'text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Resources &amp; Training</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-500">
            Access training materials and professional resources
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white shadow-sm p-4 sm:p-6 border border-gray-200">
              <Icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${stat.color}-600 mb-2`} />
              <p className={`text-2xl sm:text-3xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</p>
              <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
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
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
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
              <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Training Courses */}
      {activeTab === 'courses' && (
        <>
          {/* Table — large screens */}
          <div className="hidden lg:block bg-white border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Instructor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Duration</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Modules</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Enrolled</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide w-36">Progress</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courses.map((course) => (
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
                        {course.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-xs text-gray-700">
                        <Clock className="w-3 h-3 mr-1 text-blue-600 shrink-0" />{course.duration}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-xs text-gray-700">
                        <BookOpen className="w-3 h-3 mr-1 text-blue-600 shrink-0" />{course.modules}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-xs text-gray-700">
                        <Users className="w-3 h-3 mr-1 text-blue-600 shrink-0" />{course.enrolled}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-blue-500 fill-blue-500 shrink-0" />
                        <span className="text-sm font-semibold text-gray-800">{course.rating}</span>
                      </div>
                    </td>
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
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {course.status === 'completed' ? (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleViewCertificate(course)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-colors"
                          >
                            <Award className="w-3 h-3" /><span>Certificate</span>
                          </button>
                          <button
                            onClick={() => handleReviewCourse(course)}
                            className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors"
                          >
                            <Play className="w-3 h-3" /><span>Review</span>
                          </button>
                        </div>
                      ) : course.status === 'in-progress' ? (
                        <button
                          onClick={() => handleContinueCourse(course)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                        >
                          <Play className="w-3 h-3" /><span>Continue</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartCourse(course)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                        >
                          <Play className="w-3 h-3" /><span>Start</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — small / medium screens */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(course.status)}`}>
                    {course.status.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(course.category)}`}>
                    {course.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{course.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{course.description}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
                  <div className="flex items-center text-xs text-gray-700">
                    <Clock className="w-3 h-3 mr-1 text-blue-600" />{course.duration}
                  </div>
                  <div className="flex items-center text-xs text-gray-700">
                    <BookOpen className="w-3 h-3 mr-1 text-blue-600" />{course.modules} modules
                  </div>
                  <div className="flex items-center text-xs text-gray-700">
                    <Users className="w-3 h-3 mr-1 text-blue-600" />{course.enrolled} enrolled
                  </div>
                  <div className="flex items-center text-xs text-gray-700">
                    <Star className="w-3 h-3 mr-1 text-blue-500 fill-blue-500" />
                    <span className="font-semibold">{course.rating}</span>
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
                        <Award className="w-3 h-3" /><span>Certificate</span>
                      </button>
                      <button
                        onClick={() => handleReviewCourse(course)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors"
                      >
                        <Play className="w-3 h-3" /><span>Review</span>
                      </button>
                    </>
                  ) : course.status === 'in-progress' ? (
                    <button
                      onClick={() => handleContinueCourse(course)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                    >
                      <Play className="w-3 h-3" /><span>Continue Learning</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartCourse(course)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                    >
                      <Play className="w-3 h-3" /><span>Start Course</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Resources */}
      {activeTab === 'resources' && (
        <>
          {/* Table — large screens */}
          <div className="hidden lg:block bg-white border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50 border-b border-gray-200">
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
                {resources.map((resource) => (
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
                          <p className="text-xs text-gray-400">Added {new Date(resource.date).toLocaleDateString()}</p>
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
                      <span className="text-sm text-gray-700">{resource.downloads.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                        <Download className="w-3 h-3" /><span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — small / medium screens */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-start gap-3 mb-3">
                  {resource.type === 'Video' ? (
                    <Video className="w-8 h-8 text-blue-600 shrink-0 mt-0.5" />
                  ) : (
                    <FileText className="w-8 h-8 text-blue-600 shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{resource.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Added {new Date(resource.date).toLocaleDateString()}</p>
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
                    <p className="font-semibold text-gray-800">{resource.downloads.toLocaleString()}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                  <Download className="w-3 h-3" /><span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Certificates */}
      {activeTab === 'certificates' && (
        <>
          {/* Table — large screens */}
          <div className="hidden lg:block bg-white border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50 border-b border-gray-200">
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
                {certifications.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50 transition-colors align-middle">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="font-semibold text-gray-900 text-sm">{cert.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold text-blue-800 bg-blue-50">Active</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{new Date(cert.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-xs font-mono text-gray-600">{cert.credentialId}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-1.5">
                        <button className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                          <Download className="w-3 h-3" /><span>Download</span>
                        </button>
                        <button className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors">
                          <FileText className="w-3 h-3" /><span>Verify</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — small / medium screens */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-blue-600 shrink-0" />
                  <h3 className="font-bold text-gray-900 text-sm">{cert.title}</h3>
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-blue-800 bg-blue-50 mb-3">Active</span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Issue Date</p>
                    <p className="text-sm font-semibold text-gray-900">{new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expiry Date</p>
                    <p className="text-sm font-semibold text-gray-900">{new Date(cert.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Credential ID</p>
                    <p className="text-xs font-mono font-semibold text-gray-900">{cert.credentialId}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                    <Download className="w-3 h-3" /><span>Download</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors">
                    <FileText className="w-3 h-3" /><span>Verify</span>
                  </button>
                </div>
              </div>
            ))}
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
