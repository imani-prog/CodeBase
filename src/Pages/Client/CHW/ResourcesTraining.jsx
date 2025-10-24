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

const ResourcesTraining = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample training courses
  const courses = [
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
  ];

  // Sample resources
  const resources = [
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
  ];

  // Sample certifications
  const certifications = [
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
  ];

  const stats = [
    { label: 'Courses Completed', value: '8', color: 'green', icon: CheckCircle },
    { label: 'In Progress', value: '3', color: 'blue', icon: Clock },
    { label: 'Certificates Earned', value: '5', color: 'purple', icon: Award },
    { label: 'Learning Hours', value: '42', color: 'yellow', icon: TrendingUp }
  ];

  const tabs = [
    { id: 'courses', label: 'Training Courses', count: courses.length },
    { id: 'resources', label: 'Resources', count: resources.length },
    { id: 'certificates', label: 'My Certificates', count: certifications.length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Fundamentals':
        return 'bg-blue-100 text-blue-800';
      case 'Specialized':
        return 'bg-purple-100 text-purple-800';
      case 'Guidelines':
        return 'bg-green-100 text-green-800';
      case 'Forms':
        return 'bg-yellow-100 text-yellow-800';
      case 'Reference':
        return 'bg-indigo-100 text-indigo-800';
      case 'Training':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resources & Training</h1>
          <p className="text-gray-600 mt-2">
            Access training materials and professional resources
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
              <p className={`text-3xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses and resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md p-2">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Training Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(course.status)}`}>
                      {course.status.replace('-', ' ')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(course.category)}`}>
                      {course.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{course.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-sm">{course.modules} modules</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-sm">{course.enrolled} enrolled</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Star className="w-5 h-5 mr-2 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">{course.rating}</span>
                    </div>
                    <div className="text-gray-700">
                      <p className="text-sm font-semibold">By {course.instructor}</p>
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Progress</span>
                        <span className="text-sm font-semibold text-blue-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    {course.status === 'completed' ? (
                      <>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                          <Award className="w-4 h-4" />
                          <span>View Certificate</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors">
                          <Play className="w-4 h-4" />
                          <span>Review Course</span>
                        </button>
                      </>
                    ) : course.status === 'in-progress' ? (
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                        <Play className="w-4 h-4" />
                        <span>Continue Learning</span>
                      </button>
                    ) : (
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                        <Play className="w-4 h-4" />
                        <span>Start Course</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resources */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Resource</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Size</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Downloads</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {resources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {resource.type === 'Video' ? (
                        <Video className="w-8 h-8 text-purple-600" />
                      ) : (
                        <FileText className="w-8 h-8 text-blue-600" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{resource.title}</p>
                        <p className="text-sm text-gray-500">Added {new Date(resource.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(resource.category)}`}>
                      {resource.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{resource.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{resource.size}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{resource.downloads.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Certificates */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Award className="w-8 h-8 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-900">{cert.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Issue Date</p>
                      <p className="font-semibold text-gray-900">{new Date(cert.issueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expiry Date</p>
                      <p className="font-semibold text-gray-900">{new Date(cert.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Credential ID</p>
                      <p className="font-semibold text-gray-900">{cert.credentialId}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download Certificate</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors">
                      <FileText className="w-4 h-4" />
                      <span>Verify</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesTraining;
