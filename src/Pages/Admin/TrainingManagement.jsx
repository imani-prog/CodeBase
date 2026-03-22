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

  // Sample training courses data with your provided structure
  const [trainingCourses, setTrainingCourses] = useState([
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
  ]);

  // Student enrollment data
  const [enrolledStudents, _setEnrolledStudents] = useState([
    { id: 1, name: 'Sarah Wanjiru', email: 'sarah.w@example.com', phone: '+254 712 345 678', courseId: 1, enrollmentDate: '2024-06-20', progress: 85, score: 92, status: 'Active', lastActivity: '2024-10-15' },
    { id: 2, name: 'John Kamau', email: 'john.k@example.com', phone: '+254 723 456 789', courseId: 2, enrollmentDate: '2024-07-05', progress: 72, score: 88, status: 'Active', lastActivity: '2024-10-14' },
    { id: 3, name: 'Mary Akinyi', email: 'mary.a@example.com', phone: '+254 734 567 890', courseId: 1, enrollmentDate: '2024-06-15', progress: 100, score: 95, status: 'Completed', lastActivity: '2024-09-30' },
    { id: 4, name: 'Peter Omondi', email: 'peter.o@example.com', phone: '+254 745 678 901', courseId: 3, enrollmentDate: '2024-08-01', progress: 45, score: 78, status: 'Active', lastActivity: '2024-10-10' },
    { id: 5, name: 'Grace Njeri', email: 'grace.n@example.com', phone: '+254 756 789 012', courseId: 2, enrollmentDate: '2024-07-20', progress: 90, score: 91, status: 'Active', lastActivity: '2024-10-16' },
    { id: 6, name: 'David Mwangi', email: 'david.m@example.com', phone: '+254 767 890 123', courseId: 4, enrollmentDate: '2024-08-15', progress: 65, score: 82, status: 'Active', lastActivity: '2024-10-12' },
    { id: 7, name: 'Lucy Nyambura', email: 'lucy.n@example.com', phone: '+254 778 901 234', courseId: 1, enrollmentDate: '2024-06-25', progress: 95, score: 94, status: 'Active', lastActivity: '2024-10-17' },
    { id: 8, name: 'James Otieno', email: 'james.o@example.com', phone: '+254 789 012 345', courseId: 5, enrollmentDate: '2024-09-01', progress: 30, score: 75, status: 'Active', lastActivity: '2024-10-08' }
  ]);

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

  // Instructors data
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: 'Dr. Grace Achieng',
      specialization: 'Community Health',
      qualification: 'PhD in Public Health',
      experience: '12 years',
      coursesTeaching: 2,
      totalStudents: 430,
      avgRating: 4.8,
      email: 'grace.achieng@medilink.com',
      phone: '+254 712 345 678',
      status: 'Active',
      joinDate: '2020-03-15',
      completedCourses: 24,
      salary: 250000
    },
    {
      id: 2,
      name: 'Dr. James Kimani',
      specialization: 'Digital Health Technology',
      qualification: 'MSc in Health Informatics',
      experience: '8 years',
      coursesTeaching: 1,
      totalStudents: 180,
      avgRating: 4.7,
      email: 'james.kimani@medilink.com',
      phone: '+254 723 456 789',
      status: 'Active',
      joinDate: '2021-06-20',
      completedCourses: 12,
      salary: 180000
    },
    {
      id: 3,
      name: 'Dr. Mary Wanjiru',
      specialization: 'Healthcare Administration',
      qualification: 'MBA Healthcare Management',
      experience: '15 years',
      coursesTeaching: 1,
      totalStudents: 95,
      avgRating: 4.5,
      email: 'mary.wanjiru@medilink.com',
      phone: '+254 734 567 890',
      status: 'Active',
      joinDate: '2019-09-10',
      completedCourses: 18,
      salary: 220000
    },
    {
      id: 4,
      name: 'Dr. David Omondi',
      specialization: 'Clinical Skills',
      qualification: 'MD, MMED (Internal Medicine)',
      experience: '18 years',
      coursesTeaching: 1,
      totalStudents: 160,
      avgRating: 4.9,
      email: 'david.omondi@medilink.com',
      phone: '+254 745 678 901',
      status: 'Active',
      joinDate: '2018-01-05',
      completedCourses: 32,
      salary: 280000
    },
    {
      id: 5,
      name: 'Dr. Peter Njoroge',
      specialization: 'Data Analytics',
      qualification: 'PhD in Biostatistics',
      experience: '10 years',
      coursesTeaching: 1,
      totalStudents: 85,
      avgRating: 4.6,
      email: 'peter.njoroge@medilink.com',
      phone: '+254 756 789 012',
      status: 'Active',
      joinDate: '2020-11-12',
      completedCourses: 8,
      salary: 200000
    },
    {
      id: 6,
      name: 'Dr. Esther Nyambura',
      specialization: 'Maternal & Child Health',
      qualification: 'MD, MMED (Obstetrics)',
      experience: '14 years',
      coursesTeaching: 1,
      totalStudents: 120,
      avgRating: 4.9,
      email: 'esther.nyambura@medilink.com',
      phone: '+254 767 890 123',
      status: 'Active',
      joinDate: '2019-04-22',
      completedCourses: 22,
      salary: 240000
    },
    {
      id: 7,
      name: 'Dr. Joseph Otieno',
      specialization: 'Quality Management',
      qualification: 'MPH, Six Sigma Black Belt',
      experience: '11 years',
      coursesTeaching: 1,
      totalStudents: 95,
      avgRating: 4.6,
      email: 'joseph.otieno@medilink.com',
      phone: '+254 778 901 234',
      status: 'Active',
      joinDate: '2020-08-17',
      completedCourses: 15,
      salary: 190000
    },
    {
      id: 8,
      name: 'Dr. Susan Mwangi',
      specialization: 'Mental Health',
      qualification: 'MD, Psychiatry',
      experience: '16 years',
      coursesTeaching: 1,
      totalStudents: 180,
      avgRating: 4.8,
      email: 'susan.mwangi@medilink.com',
      phone: '+254 789 012 345',
      status: 'Active',
      joinDate: '2018-05-30',
      completedCourses: 28,
      salary: 260000
    }
  ]);

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
    setConfirmationTitle('');
    setConfirmationMessage('');
    setConfirmationType('');
    setConfirmationAction(() => () => {
      setTrainingCourses(prevCourses => 
        prevCourses.map(c => 
          c.id === courseId ? { ...c, status: 'active' } : c
        )
      );
      showFeedback('Course activated successfully!', 'success');
    });
    setShowConfirmationModal(true);
  };

  const handlePauseCourse = (courseId) => {
    const course = trainingCourses.find(c => c.id === courseId);
    setSelectedCourse(course);
    setConfirmationTitle('');
    setConfirmationMessage('');
    setConfirmationType('');
    setConfirmationAction(() => () => {
      setTrainingCourses(prevCourses => 
        prevCourses.map(c => 
          c.id === courseId ? { ...c, status: 'paused' } : c
        )
      );
      showFeedback('Course paused successfully!', 'warning');
    });
    setShowConfirmationModal(true);
  };

  const handleEnrollStudent = (courseId) => {
    console.log('Enrolling student to course:', courseId);
    setShowBulkEnrollmentModal(true);
  };

  const handleUpdateCourse = (courseId) => {
    const course = trainingCourses.find(c => c.id === courseId);
    setSelectedCourse(course);
    setShowEditCourseModal(true);
  };

  const handleSaveEditedCourse = (updatedCourse) => {
    setTrainingCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
    showFeedback('Course updated successfully!', 'success');
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

  const _handleDeleteCourse = (courseId) => {
    console.log('Deleting course:', courseId);
    // Implement course deletion logic
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
    setInstructors(prevInstructors => 
      prevInstructors.map(instructor => 
        instructor.id === updatedInstructor.id ? updatedInstructor : instructor
      )
    );
    showFeedback('Instructor updated successfully!', 'success');
  };

  const handleAddInstructor = (newInstructor) => {
    setInstructors(prevInstructors => [...prevInstructors, newInstructor]);
    showFeedback('Instructor added successfully!', 'success');
  };

  const handleDeleteInstructor = (instructor) => {
    setSelectedInstructor(instructor);
    setConfirmationTitle('Delete Instructor');
    setConfirmationMessage(`Are you sure you want to delete "${instructor.name}"? This action cannot be undone.`);
    setConfirmationType('danger');
    setConfirmationAction(() => () => {
      setInstructors(prevInstructors => 
        prevInstructors.filter(i => i.id !== instructor.id)
      );
      showFeedback('Instructor deleted successfully!', 'success');
    });
    setShowConfirmationModal(true);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold ">Training Overview</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1">Total Courses</p>
              <p className="text-3xl font-bold">{trainingOverview.totalCourses}</p>
              <div className="flex items-center mt-2">
                <BookOpen className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm">{trainingOverview.activeCourses} active</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <GraduationCap className="w-10 h-10" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1">Total Students</p>
              <p className="text-3xl font-bold">{trainingOverview.totalStudents}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm ">+{trainingOverview.monthlyGrowth}% this month</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1">Total Revenue</p>
              <p className="text-3xl font-bold">{formatCurrency(trainingOverview.totalRevenue)}</p>
              <div className="flex items-center mt-2">
                <DollarSign className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm">From training programs</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1">Certificates Issued</p>
              <p className="text-3xl font-bold">{trainingOverview.certificatesIssued}</p>
              <div className="flex items-center mt-2">
                <Award className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm">{trainingOverview.avgCompletionRate.toFixed(1)}% completion</span>
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
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Enrollment Trends</h3>
          <div className="space-y-4">
            {enrollmentTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium ">{trend.month} 2025</p>
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

        <div className="bg-white border border-gray-200 p-6">
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
          <button 
            onClick={() => setShowCreateCourseModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
          <button 
            onClick={() => setShowBulkEnrollmentModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Bulk Enrollment
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Import Students
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="border border-gray-200 bg-white p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Total Students</p>
              <p className="text-2xl font-bold ">{trainingOverview.totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 bg-white p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Active Enrollments</p>
              <p className="text-2xl font-bold ">1,245</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 bg-white p-6">
          <div className="flex items-center">
            <Award className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Completed Courses</p>
              <p className="text-2xl font-bold ">856</p>
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
                        <span className="text-gray-700">{new Date(student.enrollmentDate).toLocaleDateString()}</span>
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
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1">Total Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(trainingOverview.totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <DollarSign className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1">Avg Revenue per Course</p>
              <p className="text-2xl font-bold">
                {formatCurrency(trainingOverview.totalRevenue / trainingOverview.totalCourses)}
              </p>
            </div>
            <div className="w-12 h-12  flex items-center justify-center">
              <Target className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1">Avg Revenue per Student</p>
              <p className="text-2xl font-bold">
                {formatCurrency(trainingOverview.totalRevenue / trainingOverview.totalStudents)}
              </p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1">Monthly Growth</p>
              <p className="text-2xl font-bold">{trainingOverview.monthlyGrowth}%</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Revenue by Category</h3>
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
                    <span className="font-semibold">{formatCurrency(category.revenue / category.students)}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-semibold">
                      {((category.revenue / trainingOverview.totalRevenue) * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(category.revenue / trainingOverview.totalRevenue) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Certificate Management</h3>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Award className="w-4 h-4 mr-2" />
            Issue Certificates
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Download Templates
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <Award className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Certificates Issued</p>
              <p className="text-2xl font-bold">{trainingOverview.certificatesIssued}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Pass Rate</p>
              <p className="text-2xl font-bold">
                {(trainingCourses.reduce((sum, course) => sum + course.passRate, 0) / trainingCourses.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Avg Rating</p>
              <p className="text-2xl font-bold">{trainingOverview.avgRating.toFixed(1)}</p>
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
                    {Math.floor(course.enrolledStudents * (course.completionRate / 100) * (course.passRate / 100))}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-medium">
                    {Math.floor(course.enrolledStudents * (course.completionRate / 100) * (course.passRate / 100) * 0.95)}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-medium">
                    {Math.floor(course.enrolledStudents * (course.completionRate / 100) * (course.passRate / 100) * 0.05)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold">{formatCurrency(500)}</span>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Instructor Management</h3>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowExportReportsModal(true)}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button 
            onClick={() => setShowAddInstructorModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Instructor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Total Instructors</p>
              <p className="text-2xl font-bold ">{instructors.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Total Courses</p>
              <p className="text-2xl font-bold ">
                {instructors.reduce((sum, instructor) => sum + instructor.coursesTeaching, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Avg Rating</p>
              <p className="text-2xl font-bold ">
                {(instructors.reduce((sum, instructor) => sum + instructor.avgRating, 0) / instructors.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Total Monthly Salaries</p>
              <p className="text-2xl font-bold ">
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
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => {
    const reports = [
      {
        id: 1,
        reportName: 'Monthly Course Enrollment Report',
        category: 'Enrollment',
        period: 'October 2025',
        generatedDate: '2025-10-31',
        totalStudents: 310,
        totalRevenue: 4980000,
        completionRate: 82,
        status: 'Completed'
      },
      {
        id: 2,
        reportName: 'Instructor Performance Report',
        category: 'Performance',
        period: 'Q3 2025',
        generatedDate: '2025-09-30',
        totalStudents: 870,
        totalRevenue: 14250000,
        completionRate: 85,
        status: 'Completed'
      },
      {
        id: 3,
        reportName: 'Certificate Issuance Report',
        category: 'Certifications',
        period: 'September 2025',
        generatedDate: '2025-09-30',
        totalStudents: 245,
        totalRevenue: 122500,
        completionRate: 94,
        status: 'Completed'
      },
      {
        id: 4,
        reportName: 'Course Revenue Analysis',
        category: 'Revenue',
        period: 'August 2025',
        generatedDate: '2025-08-31',
        totalStudents: 280,
        totalRevenue: 4320000,
        completionRate: 78,
        status: 'Completed'
      },
      {
        id: 5,
        reportName: 'Student Progress Report',
        category: 'Progress',
        period: 'July 2025',
        generatedDate: '2025-07-31',
        totalStudents: 220,
        totalRevenue: 3640000,
        completionRate: 88,
        status: 'Completed'
      },
      {
        id: 6,
        reportName: 'Training Quality Assessment',
        category: 'Quality',
        period: 'Q2 2025',
        generatedDate: '2025-06-30',
        totalStudents: 650,
        totalRevenue: 10850000,
        completionRate: 86,
        status: 'Completed'
      }
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Training Reports</h3>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filter Reports
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="shadow-md border border-gray-200 p-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="">Total Reports</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
            </div>
          </div>
          <div className="shadow-md border border-gray-200 p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="">Students Tracked</p>
                <p className="text-2xl font-bold">
                  {reports.reduce((sum, report) => sum + report.totalStudents, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="shadow-md border border-gray-200 p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="">Total Revenue</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(reports.reduce((sum, report) => sum + report.totalRevenue, 0))}
                </p>
              </div>
            </div>
          </div>
          <div className="shadow-md border border-gray-200 p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="">Avg Completion</p>
                <p className="text-2xl font-bold">
                  {(reports.reduce((sum, report) => sum + report.completionRate, 0) / reports.length).toFixed(1)}%
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
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Modal handlers
  const handleSaveCourse = (courseData) => {
    console.log('New course created:', courseData);
   
  };

  const handleBulkEnroll = (enrollmentData) => {
    console.log('Bulk enrollment:', enrollmentData);
    
  };

  const handleIssueCertificates = (certificateData) => {
    console.log('Certificates issued:', certificateData);
    
  };

  const handleExportReport = (reportData) => {
    console.log('Report exported:', reportData);
  
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <div className=" mb-6">
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
                        : 'border-transparent  hover:text-gray-700 hover:border-gray-300'
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
            {activeTab === 'instructors' && renderInstructors()}


            {activeTab === 'reports' && renderReports()}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingManagement;