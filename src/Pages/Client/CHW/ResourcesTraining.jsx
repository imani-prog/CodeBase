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
    { label: 'Courses Completed', value: '8', color: 'blue', icon: CheckCircle },
    { label: 'In Progress', value: '3', color: 'blue', icon: Clock },
    { label: 'Certificates Earned', value: '5', color: 'blue', icon: Award },
    { label: 'Learning Hours', value: '42', color: 'blue', icon: TrendingUp }
  ];

  const tabs = [
    { id: 'courses', label: 'Training Courses', count: courses.length },
    { id: 'resources', label: 'Resources', count: resources.length },
    { id: 'certificates', label: 'My Certificates', count: certifications.length }
  ];

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
          <h1 className="text-3xl font-bold">Resources & Training</h1>
          <p className="mt-2">
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
              <p className="">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="p-6">
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
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-sm p-4 border-gray-200 hover:shadow-md transition-shadow max-w-md"
            >
              <div className="flex flex-col mb-3">
                <div className="flex-1">
                  <div className="mb-2">
                    <h3 className="font-bold mb-2">{course.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${getStatusColor(course.status)}`}>
                        {course.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${getCategoryColor(course.category)}`}>
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <p className="mb-3">{course.description}</p>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-xs">
                      <Clock className="w-3 h-3 mr-1 text-blue-600" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-xs">
                      <BookOpen className="w-3 h-3 mr-1 text-blue-600" />
                      <span>{course.modules} modules</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-xs">
                      <Users className="w-3 h-3 mr-1 text-blue-600" />
                      <span>{course.enrolled} enrolled</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Star className="w-3 h-3 mr-1 text-blue-500 fill-blue-500" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                    <div className="">
                      <p>By {course.instructor}</p>
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-700">Progress</span>
                        <span className="text-xs font-semibold text-blue-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {course.status === 'completed' ? (
                      <>
                        <button className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-colors">
                          <Award className="w-3 h-3" />
                          <span>Certificate</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors">
                          <Play className="w-3 h-3" />
                          <span>Review</span>
                        </button>
                      </>
                    ) : course.status === 'in-progress' ? (
                      <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                        <Play className="w-3 h-3" />
                        <span>Continue Learning</span>
                      </button>
                    ) : (
                      <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                        <Play className="w-3 h-3" />
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
        <div className="bg-white shadow-md">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Resource</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Size</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Downloads</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {resources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {resource.type === 'Video' ? (
                        <Video className="w-8 h-8 text-blue-600" />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 max-w-md"
            >
              <div className="flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-6 h-6 text-blue-600" />
                    <h3 className="text-base font-bold text-gray-900">{cert.title}</h3>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-blue-800 mb-3">
                    Active
                  </span>

                  <div className="space-y-2 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Issue Date</p>
                      <p className="text-sm font-semibold text-gray-900">{new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Expiry Date</p>
                      <p className="text-sm font-semibold text-gray-900">{new Date(cert.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Credential ID</p>
                      <p className="text-sm font-semibold text-gray-900">{cert.credentialId}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors">
                      <FileText className="w-3 h-3" />
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
