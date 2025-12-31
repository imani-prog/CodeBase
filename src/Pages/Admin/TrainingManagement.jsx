import React, { useState } from 'react';
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
  Building
} from 'lucide-react';


const TrainingManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [_selectedPeriod, _setSelectedPeriod] = useState('this-month');
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  // Sample training courses data with your provided structure
  const trainingCourses = [
    {
      id: 1,
      title: "Community Health Worker Certification",
      duration: "6 weeks",
      level: "Beginner to Intermediate",
      image: "/src/assets/CommunityHealthWorker.jpeg",
      description: "Comprehensive training for Community Health Workers covering patient care, health education, and community outreach.",
      modules: [
        "Basic Health Assessment",
        "Community Health Education",
        "Patient Referral Systems",
        "Health Data Collection",
        "Emergency Response",
        "Communication Skills",
      ],
      certification: "MediLink Certified CHW",
      participants: 250,
      rating: 4.8,
      status: 'active',
      price: 15000,
      revenue: 3750000,
      completionRate: 85,
      instructor: 'Dr. Grace Achieng',
      createdDate: '2024-06-15',
      lastUpdated: '2024-10-01',
      category: 'Community Health',
      difficulty: 'Beginner',
      enrolledStudents: 250,
      maxStudents: 300,
      passRate: 92
    },
    {
      id: 2,
      title: "Digital Health Technology Training",
      duration: "4 weeks",
      level: "Intermediate",
      image: "/src/assets/ComponentsTechnology.jpeg",
      description: "Learn to use modern healthcare technology, electronic health records, and telemedicine platforms.",
      modules: [
        "Electronic Health Records",
        "Telemedicine Platforms",
        "Mobile Health Apps",
        "Data Security & Privacy",
        "Technology Troubleshooting",
        "Digital Communication",
      ],
      certification: "Digital Health Specialist",
      participants: 180,
      rating: 4.9,
      status: 'active',
      price: 12000,
      revenue: 2160000,
      completionRate: 78,
      instructor: 'Dr. James Mwangi',
      createdDate: '2024-07-20',
      lastUpdated: '2024-09-28',
      category: 'Technology',
      difficulty: 'Intermediate',
      enrolledStudents: 180,
      maxStudents: 200,
      passRate: 88
    },
    {
      id: 3,
      title: "Healthcare System Administration",
      duration: "8 weeks",
      level: "Advanced",
      image: "/src/assets/SmartHealthcare.png",
      description: "Advanced training for healthcare administrators and system managers.",
      modules: [
        "Healthcare Management",
        "Quality Assurance",
        "Budget Management",
        "Staff Coordination",
        "Compliance & Regulations",
        "Strategic Planning",
      ],
      certification: "Healthcare Administrator",
      participants: 95,
      rating: 4.7,
      status: 'active',
      price: 25000,
      revenue: 2375000,
      completionRate: 72,
      instructor: 'Dr. Sarah Mitchell',
      createdDate: '2024-05-10',
      lastUpdated: '2024-09-15',
      category: 'Administration',
      difficulty: 'Advanced',
      enrolledStudents: 95,
      maxStudents: 120,
      passRate: 95
    },
    {
      id: 4,
      title: "Telemedicine & Remote Care",
      duration: "5 weeks",
      level: "Intermediate",
      image: "/src/assets/TelemedicinePatients.jpeg",
      description: "Master remote patient care, teleconsultation, and virtual health services with comprehensive hands-on training.",
      modules: [
        "Teleconsultation Techniques",
        "Remote Monitoring",
        "Virtual Triage",
        "Patient Communication",
        "Technology Setup",
        "Emergency Protocols",
      ],
      certification: "Telemedicine Specialist",
      participants: 140,
      rating: 4.6,
      status: 'paused',
      price: 18000,
      revenue: 2520000,
      completionRate: 80,
      instructor: 'Dr. Linda Chen',
      createdDate: '2024-08-05',
      lastUpdated: '2024-10-05',
      category: 'Telemedicine',
      difficulty: 'Intermediate',
      enrolledStudents: 140,
      maxStudents: 150,
      passRate: 86
    },
    {
      id: 5,
      title: "Healthcare Data Analytics",
      duration: "7 weeks",
      level: "Advanced",
      image: "/src/assets/HealthTechTraining.jpg",
      description: "Learn to analyze healthcare data, create meaningful reports, and drive data-driven decisions in healthcare settings.",
      modules: [
        "Healthcare Data Fundamentals",
        "Statistical Analysis in Healthcare",
        "Data Visualization Tools",
        "Predictive Analytics",
        "Healthcare Metrics & KPIs",
        "Regulatory Compliance",
      ],
      certification: "Healthcare Data Analyst",
      participants: 85,
      rating: 4.7,
      status: 'draft',
      price: 22000,
      revenue: 1870000,
      completionRate: 0,
      instructor: 'Dr. Peter Njoroge',
      createdDate: '2024-09-01',
      lastUpdated: '2024-10-10',
      category: 'Data Analytics',
      difficulty: 'Advanced',
      enrolledStudents: 85,
      maxStudents: 100,
      passRate: 0
    },
    {
      id: 6,
      title: "Maternal & Child Health Specialist",
      duration: "8 weeks",
      level: "Intermediate to Advanced",
      image: "/src/assets/CommunityWorkerOutreach.jpeg",
      description: "Specialized training focused on maternal and child health, including prenatal care, child development, and family planning.",
      modules: [
        "Prenatal & Postnatal Care",
        "Child Development Milestones",
        "Nutrition for Mothers & Children",
        "Immunization Programs",
        "Family Planning Counseling",
        "Emergency Obstetric Care",
      ],
      certification: "Maternal & Child Health Specialist",
      participants: 120,
      rating: 4.9,
      status: 'active',
      price: 20000,
      revenue: 2400000,
      completionRate: 88,
      instructor: 'Dr. Esther Nyambura',
      createdDate: '2024-06-01',
      lastUpdated: '2024-09-20',
      category: 'Maternal Health',
      difficulty: 'Advanced',
      enrolledStudents: 120,
      maxStudents: 150,
      passRate: 94
    },
    {
      id: 7,
      title: "Healthcare Quality Improvement",
      duration: "6 weeks",
      level: "Intermediate",
      image: "/src/assets/SmartHealthcare.png",
      description: "Learn quality improvement methodologies, patient safety protocols, and healthcare accreditation standards.",
      modules: [
        "Quality Management Systems",
        "Patient Safety Protocols",
        "Healthcare Accreditation",
        "Performance Measurement",
        "Process Improvement",
        "Risk Management",
      ],
      certification: "Healthcare Quality Specialist",
      participants: 95,
      rating: 4.6,
      status: 'active',
      price: 16000,
      revenue: 1520000,
      completionRate: 75,
      instructor: 'Dr. Joseph Otieno',
      createdDate: '2024-07-15',
      lastUpdated: '2024-09-30',
      category: 'Quality Management',
      difficulty: 'Intermediate',
      enrolledStudents: 95,
      maxStudents: 120,
      passRate: 89
    },
    {
      id: 8,
      title: "Mental Health First Aid",
      duration: "3 weeks",
      level: "Beginner",
      image: "/src/assets/Workers.jpg",
      description: "Essential mental health awareness and first aid skills for healthcare workers and community volunteers.",
      modules: [
        "Mental Health Awareness",
        "Crisis Intervention",
        "De-escalation Techniques",
        "Referral Pathways",
        "Self-Care for Caregivers",
        "Community Mental Health",
      ],
      certification: "Mental Health First Aid Certificate",
      participants: 180,
      rating: 4.8,
      status: 'active',
      price: 8000,
      revenue: 1440000,
      completionRate: 90,
      instructor: 'Dr. Susan Mwangi',
      createdDate: '2024-08-20',
      lastUpdated: '2024-10-08',
      category: 'Mental Health',
      difficulty: 'Beginner',
      enrolledStudents: 180,
      maxStudents: 200,
      passRate: 96
    }
  ];

    const trainingOverview = {
      totalCourses: trainingCourses.length,
      activeCourses: trainingCourses.filter(c => c.status === 'active').length,
      totalStudents: trainingCourses.reduce((sum, course) => sum + course.participants, 0),
      totalRevenue: trainingCourses.reduce((sum, course) => sum + course.revenue, 0),
      avgCompletionRate: trainingCourses.reduce((sum, course) => sum + course.completionRate, 0) / trainingCourses.length,
      avgRating: trainingCourses.reduce((sum, course) => sum + course.rating, 0) / trainingCourses.length,
    monthlyGrowth: 24.5,
    certificatesIssued: 856
  };

  const revenueByCategory = [
    { category: 'Community Health', revenue: 3750000, courses: 1, students: 250 },
    { category: 'Technology', revenue: 2160000, courses: 1, students: 180 },
    { category: 'Administration', revenue: 2375000, courses: 1, students: 95 },
    { category: 'Telemedicine', revenue: 2520000, courses: 1, students: 140 },
    { category: 'Data Analytics', revenue: 1870000, courses: 1, students: 85 },
    { category: 'Maternal Health', revenue: 2400000, courses: 1, students: 120 },
    { category: 'Quality Management', revenue: 1520000, courses: 1, students: 95 },
    { category: 'Mental Health', revenue: 1440000, courses: 1, students: 180 }
  ];

  const enrollmentTrends = [
    { month: 'Jun', enrollments: 180, revenue: 2850000 },
    { month: 'Jul', enrollments: 220, revenue: 3640000 },
    { month: 'Aug', enrollments: 280, revenue: 4320000 },
    { month: 'Sep', enrollments: 310, revenue: 4980000 },
    { month: 'Oct', enrollments: 145, revenue: 2450000 }
  ];

  const tabs = [
    { id: 'overview', label: 'Training Overview', icon: BarChart3 },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'students', label: 'Student Enrollment', icon: Users },
    { id: 'revenue', label: 'Revenue Analytics', icon: DollarSign },
    { id: 'certificates', label: 'Certifications', icon: Award },
    { id: 'instructors', label: 'Instructors', icon: UserCheck },
    { id: 'reports', label: 'Training Reports', icon: FileText }
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

  const handleActivateCourse = (courseId) => {
    console.log('Activating course:', courseId);
    // Implement course activation logic
  };

  const handlePauseCourse = (courseId) => {
    console.log('Pausing course:', courseId);
    // Implement course pause logic
  };

  const handleEnrollStudent = (courseId) => {
    console.log('Enrolling student to course:', courseId);
    // Implement student enrollment logic
  };

  const handleUpdateCourse = (courseId) => {
    console.log('Updating course:', courseId);
    // Implement course update logic
  };

  const _handleDeleteCourse = (courseId) => {
    console.log('Deleting course:', courseId);
    // Implement course deletion logic
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold ">Training Overview</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="w-4 h-4 mr-1.5" />
            Create Course
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <UserPlus className="w-4 h-4 mr-1.5" />
            Bulk Enrollment
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Award className="w-4 h-4 mr-1.5" />
            Issue Certificates
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-1.5" />
            Export Reports
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Total Courses</p>
              <p className="text-3xl font-bold">{trainingOverview.totalCourses}</p>
              <div className="flex items-center mt-2">
                <BookOpen className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">{trainingOverview.activeCourses} active</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm  mb-1">Total Students</p>
              <p className="text-3xl font-bold">{trainingOverview.totalStudents}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">+{trainingOverview.monthlyGrowth}% this month</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-bold">{formatCurrency(trainingOverview.totalRevenue)}</p>
              <div className="flex items-center mt-2">
                <DollarSign className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">From training programs</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm  mb-1">Certificates Issued</p>
              <p className="text-3xl font-bold">{trainingOverview.certificatesIssued}</p>
              <div className="flex items-center mt-2">
                <Award className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">{trainingOverview.avgCompletionRate.toFixed(1)}% completion</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Award className="w-10 h-10  text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Enrollment Trends</h3>
          <div className="space-y-4">
            {enrollmentTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium ">{trend.month} 2024</p>
                  <p className="text-sm text-gray-600">{trend.enrollments} new students</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(trend.revenue)}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
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
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Course Management</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
            />
          </div>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
          >
            <option value="all">All Courses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            New Course
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 uppercase text-xs">
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
            {trainingCourses.map((course) => (
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
                  <div className="flex items-center justify-end space-x-1">
                    <button
                      onClick={() => handleActivateCourse(course.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Activate"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePauseCourse(course.id)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                      title="Pause"
                    >
                      <Pause className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleUpdateCourse(course.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEnrollStudent(course.id)}
                      className="px-2 py-1 text-sm border text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      title="Enroll"
                    >
                      Enroll
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Student Enrollment Management</h3>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <UserPlus className="w-4 h-4 mr-2" />
            Bulk Enrollment
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Import Students
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border border-gray-100 shadow-md p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm ">Total Students</p>
              <p className="text-2xl font-bold ">{trainingOverview.totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 shadow-md p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm ">Active Enrollments</p>
              <p className="text-2xl font-bold ">1,245</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 shadow-md  p-6">
          <div className="flex items-center">
            <Award className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm ">Completed Courses</p>
              <p className="text-2xl font-bold ">856</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Course</th>
              <th className="px-4 py-3 text-center">Category</th>
              <th className="px-4 py-3 text-center">Duration</th>
              <th className="px-4 py-3 text-center">Enrolled</th>
              <th className="px-4 py-3 text-center">Completion Rate</th>
              <th className="px-4 py-3 text-center">Pass Rate</th>
              <th className="px-4 py-3 text-center">Avg Rating</th>
              <th className="px-4 py-3 text-right">Revenue</th>
              <th className="px-4 py-3 text-right">Revenue/Student</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trainingCourses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <p className="font-semibold">{course.title}</p>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className=" font-semibold">{course.category}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="">{course.duration}</span>
                </td>
                <td className="px-4 py-4 text-center">
                    <div>
                      <p className="font-semibold ">{course.enrolledStudents}/{course.maxStudents}</p>
                    <p className="text-xs text-gray-500">
                      {Math.round((course.enrolledStudents / course.maxStudents) * 100)}% capacity
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium  mb-1">{course.completionRate}%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${course.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-semibold ">{course.passRate}%</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="font-medium ">{course.rating}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold ">{formatCurrency(course.revenue)}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold">{formatCurrency(course.price)}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() => handleEnrollStudent(course.id)}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Students
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(trainingOverview.totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Revenue per Course</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(trainingOverview.totalRevenue / trainingOverview.totalCourses)}
              </p>
            </div>
            <div className="w-12 h-12  flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Revenue per Student</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(trainingOverview.totalRevenue / trainingOverview.totalStudents)}
              </p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Growth</p>
              <p className="text-2xl font-bold text-gray-900">{trainingOverview.monthlyGrowth}%</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue by Category</h3>
        <div className="space-y-4">
          {revenueByCategory.map((category, index) => (
            <div key={index} className="border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{category.category}</h4>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(category.revenue)}</p>
                  <p className="text-sm text-gray-600">{category.students} students</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Courses</p>
                  <p className="font-medium text-gray-900">{category.courses}</p>
                </div>
                <div>
                  <p className="text-gray-600">Avg per Student</p>
                  <p className="font-medium text-gray-900">{formatCurrency(category.revenue / category.students)}</p>
                </div>
                <div>
                  <p className="text-gray-600">% of Total</p>
                  <p className="font-medium text-gray-900">
                    {((category.revenue / trainingOverview.totalRevenue) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(category.revenue / trainingOverview.totalRevenue) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold ">Certificate Management</h3>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Award className="w-4 h-4 mr-2" />
              Issue Certificates
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download Templates
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="shadow-md border border-gray-200 p-6">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-purple-600">Certificates Issued</p>
                <p className="text-2xl font-bold text-purple-900">{trainingOverview.certificatesIssued}</p>
              </div>
            </div>
          </div>
          <div className="shadow-md border border-gray-200 p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-green-600">Pass Rate</p>
                <p className="text-2xl font-bold text-green-900">
                  {(trainingCourses.reduce((sum, course) => sum + course.passRate, 0) / trainingCourses.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="shadow-md border border-gray-200 p-6">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-blue-600">Avg Rating</p>
                <p className="text-2xl font-bold text-blue-900">{trainingOverview.avgRating.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {trainingCourses.map((course) => (
            <div key={course.id} className="border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">{course.title}</h4>
                  <p className="text-sm text-gray-600">Certification: {course.certification}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Completed Students</p>
                    <p className="font-semibold text-gray-900">
                      {Math.floor(course.enrolledStudents * (course.completionRate / 100))}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Pass Rate</p>
                    <p className="font-semibold text-gray-900">{course.passRate}%</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Issue Certificates
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Eligible for Certification</p>
                  <p className="text-sm font-medium text-gray-900">
                    {Math.floor(course.enrolledStudents * (course.completionRate / 100) * (course.passRate / 100))}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Certificates Issued</p>
                  <p className="text-sm font-medium text-gray-900">
                    {Math.floor(course.enrolledStudents * (course.completionRate / 100) * (course.passRate / 100) * 0.95)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pending Certificates</p>
                  <p className="text-sm font-medium text-gray-900">
                    {Math.floor(course.enrolledStudents * (course.completionRate / 100) * (course.passRate / 100) * 0.05)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Certificate Fee</p>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(500)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <div className="">
          {/* Header Section */}
          <div className="mb-8">
            <div className="">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Training Management</h1>
                  <p className=" text-lg">
                    Comprehensive management of healthcare training programs and certifications
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border border-gray-200 mb-6">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
          <div className="min-h-[600px]">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'courses' && renderCourses()}
            {activeTab === 'students' && renderStudents()}
            {activeTab === 'revenue' && renderRevenue()}
            {activeTab === 'certificates' && renderCertificates()}
            
            {/* Placeholder for other tabs */}
            {['instructors', 'reports'].includes(activeTab) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h3>
                <p className="text-gray-600">
                  This section is under development. Advanced {activeTab.replace('-', ' ')} features will be available soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingManagement;