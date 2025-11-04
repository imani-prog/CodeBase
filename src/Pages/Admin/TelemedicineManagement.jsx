import React, { useState } from 'react';
import { 
  Video, 
  Users, 
  Activity, 
  Calendar, 
  Clock, 
  DollarSign,
  TrendingUp,
  Monitor,
  Phone,
  MessageSquare,
  FileText,
  Download,
  Plus,
  Play,
  Pause,
  Square,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  XCircle,
  UserCheck,
  Stethoscope,
  HeartPulse,
  Brain,
  Bone,
  Eye as EyeIcon,
  Heart,
  Zap,
  Star,
  MapPin,
  Globe,
  Wifi,
  WifiOff,
  Timer,
  BarChart3,
  PieChart,
  Target,
  Award,
  Settings,
  RefreshCw
} from 'lucide-react';
import AdminNavbar from '../../Components/AdminNavbar';
import AdminSidebar from '../../Components/AdminSidebar';

const TelemedicineManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [sessionFilter, setSessionFilter] = useState('all');

  // Sample telemedicine data
  const platformOverview = {
    totalSessions: 1247,
    activeSessions: 23,
    totalDoctors: 45,
    onlineDoctors: 18,
    totalRevenue: 432500,
    monthlyGrowth: 18.5,
    avgSessionDuration: 28.5,
    patientSatisfaction: 4.6
  };

  const activeSessions = [
    {
      id: 'TM-001',
      patient: 'Mary Wanjiku',
      patientId: 'PAT-12345',
      doctor: 'Dr. Sarah Mitchell',
      doctorId: 'DOC-001',
      specialty: 'General Medicine',
      startTime: '2024-10-12T10:30:00',
      duration: 18,
      platform: 'Video Call',
      status: 'active',
      sessionType: 'consultation',
      priority: 'normal',
      symptoms: ['Headache', 'Fatigue'],
      cost: 500
    },
    {
      id: 'TM-002',
      patient: 'John Kiprotich',
      patientId: 'PAT-12346',
      doctor: 'Dr. James Mwangi',
      doctorId: 'DOC-002',
      specialty: 'Cardiology',
      startTime: '2024-10-12T11:15:00',
      duration: 25,
      platform: 'Video Call',
      status: 'active',
      sessionType: 'follow-up',
      priority: 'high',
      symptoms: ['Chest Pain', 'Shortness of Breath'],
      cost: 800
    },
    {
      id: 'TM-003',
      patient: 'Grace Achieng',
      patientId: 'PAT-12347',
      doctor: 'Dr. Linda Chen',
      doctorId: 'DOC-003',
      specialty: 'Pediatrics',
      startTime: '2024-10-12T09:45:00',
      duration: 35,
      platform: 'Audio Call',
      status: 'active',
      sessionType: 'consultation',
      priority: 'normal',
      symptoms: ['Fever', 'Cough'],
      cost: 400
    }
  ];

  const onlineDoctors = [
    {
      id: 'DOC-001',
      name: 'Dr. Sarah Mitchell',
      photo: '/src/assets/Timothy Imani.jpeg',
      specialty: 'General Medicine',
      experience: 8,
      rating: 4.8,
      sessionsToday: 6,
      totalSessions: 234,
      currentStatus: 'available',
      nextAppointment: '2024-10-12T14:30:00',
      avgSessionDuration: 25,
      earnings: 15600,
      languages: ['English', 'Swahili'],
      location: 'Nairobi'
    },
    {
      id: 'DOC-002',
      name: 'Dr. James Mwangi',
      photo: '/src/assets/Joseph Otieno.jpeg',
      specialty: 'Cardiology',
      experience: 12,
      rating: 4.9,
      sessionsToday: 4,
      totalSessions: 189,
      currentStatus: 'busy',
      nextAppointment: '2024-10-12T12:00:00',
      avgSessionDuration: 35,
      earnings: 28400,
      languages: ['English', 'Swahili', 'Kikuyu'],
      location: 'Kisumu'
    },
    {
      id: 'DOC-003',
      name: 'Dr. Linda Chen',
      photo: '/src/assets/Grace Achieng.jpeg',
      specialty: 'Pediatrics',
      experience: 6,
      rating: 4.7,
      sessionsToday: 8,
      totalSessions: 156,
      currentStatus: 'available',
      nextAppointment: '2024-10-12T15:00:00',
      avgSessionDuration: 20,
      earnings: 12800,
      languages: ['English', 'Mandarin'],
      location: 'Mombasa'
    },
    {
      id: 'DOC-004',
      name: 'Dr. Peter Njoroge',
      photo: '/src/assets/PeterNjoroge.jpeg',
      specialty: 'Dermatology',
      experience: 10,
      rating: 4.6,
      sessionsToday: 3,
      totalSessions: 198,
      currentStatus: 'offline',
      nextAppointment: '2024-10-13T09:00:00',
      avgSessionDuration: 30,
      earnings: 22100,
      languages: ['English', 'Swahili'],
      location: 'Eldoret'
    }
  ];

  const sessionHistory = [
    {
      id: 'TM-H001',
      patient: 'Susan Mwangi',
      doctor: 'Dr. Sarah Mitchell',
      date: '2024-10-12',
      duration: 22,
      status: 'completed',
      rating: 5,
      cost: 500,
      diagnosis: 'Mild Hypertension',
      followUpRequired: true,
      prescription: 'Prescribed medication and lifestyle changes'
    },
    {
      id: 'TM-H002',
      patient: 'Michael Ochieng',
      doctor: 'Dr. James Mwangi',
      date: '2024-10-12',
      duration: 18,
      status: 'completed',
      rating: 4,
      cost: 800,
      diagnosis: 'Chest Pain - Non-cardiac',
      followUpRequired: false,
      prescription: 'Pain relief medication'
    },
    {
      id: 'TM-H003',
      patient: 'Alice Njeri',
      doctor: 'Dr. Linda Chen',
      date: '2024-10-11',
      duration: 0,
      status: 'cancelled',
      rating: null,
      cost: 0,
      diagnosis: null,
      followUpRequired: false,
      prescription: null
    }
  ];

  const revenueData = {
    daily: 15400,
    weekly: 89600,
    monthly: 432500,
    bySpecialty: [
      { specialty: 'General Medicine', revenue: 125000, sessions: 342, avgCost: 365 },
      { specialty: 'Cardiology', revenue: 98000, sessions: 134, avgCost: 731 },
      { specialty: 'Pediatrics', revenue: 76000, sessions: 195, avgCost: 390 },
      { specialty: 'Dermatology', revenue: 65000, sessions: 98, avgCost: 663 },
      { specialty: 'Psychiatry', revenue: 68500, sessions: 112, avgCost: 612 }
    ]
  };

  const platformStats = {
    videoCall: { sessions: 856, percentage: 68.7, avgDuration: 32 },
    audioCall: { sessions: 284, percentage: 22.8, avgDuration: 18 },
    messaging: { sessions: 107, percentage: 8.5, avgDuration: 45 }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Monitor },
    { id: 'active-sessions', label: 'Active Sessions', icon: Video },
    { id: 'doctors', label: 'Online Doctors', icon: UserCheck },
    { id: 'session-history', label: 'Session History', icon: Calendar },
    { id: 'revenue', label: 'Revenue Analytics', icon: DollarSign },
    { id: 'platform-stats', label: 'Platform Statistics', icon: BarChart3 },
    { id: 'settings', label: 'Platform Settings', icon: Settings }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'available':
      case 'completed':
        return 'text-green-800';
      case 'busy':
      case 'paused':
        return 'text-yellow-800';
      case 'offline':
      case 'cancelled':
      case 'terminated':
        return 'text-red-800';
      case 'scheduled':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-800';
      case 'medium':
        return 'text-yellow-800';
      case 'normal':
      case 'low':
        return 'text-green-800';
      default:
        return 'text-gray-800';
    }
  };

  const handleTerminateSession = (sessionId) => {
    console.log('Terminating session:', sessionId);
    // Implement session termination logic
  };

  const handleDeleteSession = (sessionId) => {
    console.log('Deleting session:', sessionId);
    // Implement session deletion logic
  };

  const handleScheduleSession = () => {
    console.log('Scheduling new session');
    // Implement session scheduling logic
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Sessions</p>
              <p className="text-3xl font-bold text-gray-900">{platformOverview.activeSessions}</p>
              <div className="flex items-center mt-2">
                <Activity className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">Live now</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Video className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Online Doctors</p>
              <p className="text-3xl font-bold text-gray-900">{platformOverview.onlineDoctors}</p>
              <div className="flex items-center mt-2">
                <UserCheck className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">of {platformOverview.totalDoctors} total</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Today's Revenue</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(revenueData.daily)}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{platformOverview.monthlyGrowth}%</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Session Time</p>
              <p className="text-3xl font-bold text-gray-900">{formatDuration(platformOverview.avgSessionDuration)}</p>
              <div className="flex items-center mt-2">
                <Clock className="w-4 h-4 text-purple-500 mr-1" />
                <span className="text-sm text-purple-600">Per session</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Timer className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Usage Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Usage Distribution</h3>
          <div className="space-y-4">
            {Object.entries(platformStats).map(([platform, stats]) => (
              <div key={platform} className="flex items-center justify-between">
                <div className="flex items-center">
                  {platform === 'videoCall' && <Video className="w-5 h-5 text-blue-600 mr-3" />}
                  {platform === 'audioCall' && <Phone className="w-5 h-5 text-blue-600 mr-3" />}
                  {platform === 'messaging' && <MessageSquare className="w-5 h-5 text-blue-600 mr-3" />}
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {platform.replace('Call', ' Call')}
                    </p>
                    <p className="text-sm text-gray-600">{stats.sessions} sessions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{stats.percentage}%</p>
                  <p className="text-sm text-gray-600">{formatDuration(stats.avgDuration)} avg</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Session Completed</p>
                  <p className="text-xs text-gray-600">Dr. Sarah Mitchell - Mary Wanjiku</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 ">
              <div className="flex items-center">
                <UserCheck className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Doctor Joined</p>
                  <p className="text-xs text-gray-600">Dr. James Mwangi is now online</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">5 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Session Scheduled</p>
                  <p className="text-xs text-gray-600">New appointment for 2:30 PM</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">8 min ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <button
            onClick={handleScheduleSession}
            className="flex items-center justify-center px-1 ml-50 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Schedule New Session
          </button>
          <button className="flex items-center justify-center ml-30 mr-30 p1-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Export Reports
          </button>
          <button className="flex items-center justify-center mr-50 px-1 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Settings className="w-5 h-5 mr-2" />
            Platform Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderActiveSessions = () => (
    <div className="space-y-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Active Telemedicine Sessions</h3>
          <div className="flex items-center space-x-3">
            <select
              value={sessionFilter}
              onChange={(e) => setSessionFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
            >
              <option value="all">All Sessions</option>
              <option value="video">Video Calls</option>
              <option value="audio">Audio Calls</option>
              <option value="high-priority">High Priority</option>
            </select>
            <button
              onClick={handleScheduleSession}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeSessions.map((session) => (
            <div key={session.id} className="border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">LIVE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(session.priority)}`}>
                    {session.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">{session.patient}</p>
                  <p className="text-sm text-gray-600">Patient ID: {session.patientId}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900">{session.doctor}</p>
                  <p className="text-sm text-gray-600">{session.specialty}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {session.platform === 'Video Call' ? (
                      <Video className="w-4 h-4 text-blue-600 mr-2" />
                    ) : (
                      <Phone className="w-4 h-4 text-green-600 mr-2" />
                    )}
                    <span className="text-sm text-gray-600">{session.platform}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{formatDuration(session.duration)}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Symptoms:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {session.symptoms.map((symptom, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{formatCurrency(session.cost)}</span>
                  <span className="text-sm text-gray-600">{session.sessionType}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                    <Pause className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTerminateSession(session.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    End Session
                  </button>
                  <button
                    onClick={() => handleDeleteSession(session.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOnlineDoctors = () => (
    <div className="space-y-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Online Doctors</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent">
              <option>All Specialties</option>
              <option>General Medicine</option>
              <option>Cardiology</option>
              <option>Pediatrics</option>
              <option>Dermatology</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {onlineDoctors.map((doctor) => (
            <div key={doctor.id} className="border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                      doctor.currentStatus === 'available' ? 'bg-green-500' :
                      doctor.currentStatus === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold ">{doctor.name}</h4>
                    <p className="text-sm ">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">{doctor.rating} ({doctor.totalSessions} sessions)</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doctor.currentStatus)}`}>
                  {doctor.currentStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-medium text-gray-900">{doctor.experience} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Today's Sessions</p>
                  <p className="font-medium text-gray-900">{doctor.sessionsToday}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Duration</p>
                  <p className="font-medium text-gray-900">{formatDuration(doctor.avgSessionDuration)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Earnings</p>
                  <p className="font-medium text-gray-900">{formatCurrency(doctor.earnings)}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Languages</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.languages.map((language, index) => (
                    <span key={index} className="px-2 py-1 text-blue-700 text-xs rounded">
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{doctor.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSessionHistory = () => (
    <div className="space-y-6">
      <div className="border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold ">Session History</h3>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold">Session</th>
                <th className="text-left py-3 px-4 font-bold">Patient</th>
                <th className="text-left py-3 px-4 font-bold">Doctor</th>
                <th className="text-left py-3 px-4 font-bold">Duration</th>
                <th className="text-left py-3 px-4 font-bold">Cost</th>
                <th className="text-left py-3 px-4 font-bold">Rating</th>
                <th className="text-left py-3 px-4 font-bold">Status</th>
                <th className="text-left py-3 px-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessionHistory.map((session) => (
                <tr key={session.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{session.id}</p>
                      <p className="text-sm text-gray-600">{session.date}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{session.patient}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{session.doctor}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{session.duration > 0 ? formatDuration(session.duration) : '-'}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{formatCurrency(session.cost)}</p>
                  </td>
                  <td className="py-4 px-4">
                    {session.rating ? (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-gray-900">{session.rating}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <FileText className="w-4 h-4" />
                      </button>
                      {session.status === 'completed' && (
                        <button className="text-purple-600 hover:text-purple-800">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
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

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Daily Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenueData.daily)}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Weekly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenueData.weekly)}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenueData.monthly)}</p>
            </div>
            <div className="w-12 h-12  flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue by Specialty</h3>
        <div className="space-y-4">
          {revenueData.bySpecialty.map((specialty, index) => (
            <div key={index} className="border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{specialty.specialty}</h4>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(specialty.revenue)}</p>
                  <p className="text-sm text-gray-600">{specialty.sessions} sessions</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Sessions</p>
                  <p className="font-medium text-gray-900">{specialty.sessions}</p>
                </div>
                <div>
                  <p className="text-gray-600">Avg Cost</p>
                  <p className="font-medium text-gray-900">{formatCurrency(specialty.avgCost)}</p>
                </div>
                <div>
                  <p className="text-gray-600">% of Total</p>
                  <p className="font-medium text-gray-900">
                    {((specialty.revenue / revenueData.monthly) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlatformStats = () => (
    <div className="space-y-6">
      <div className="border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Performance Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="w-16 h-16  flex items-center justify-center mx-auto mb-3">
              <Video className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{platformStats.videoCall.sessions}</p>
            <p className="text-sm text-gray-600">Video Calls</p>
            <p className="text-xs text-gray-500">{platformStats.videoCall.percentage}% of total</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16  flex items-center justify-center mx-auto mb-3">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{platformStats.audioCall.sessions}</p>
            <p className="text-sm text-gray-600">Audio Calls</p>
            <p className="text-xs text-gray-500">{platformStats.audioCall.percentage}% of total</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16  flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{platformStats.messaging.sessions}</p>
            <p className="text-sm text-gray-600">Messages</p>
            <p className="text-xs text-gray-500">{platformStats.messaging.percentage}% of total</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16  flex items-center justify-center mx-auto mb-3">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{platformOverview.patientSatisfaction}</p>
            <p className="text-sm text-gray-600">Satisfaction</p>
            <p className="text-xs text-gray-500">Out of 5 stars</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Platform Health Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="text-sm font-medium text-green-600">99.9%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Connection Quality</span>
                <span className="text-sm font-medium text-blue-600">Excellent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
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
            <div className="p-8 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Telemedicine Management</h1>
                  <p className=" text-lg">
                    Comprehensive oversight of telemedicine services and virtual healthcare delivery
                  </p>
                  <div className="mt-4 flex items-center space-x-6">
                    <div className="flex items-center">
                      <Video className="w-5 h-5 mr-2 text-green-300" />
                      <span className="">
                        {platformOverview.activeSessions} Active Sessions
                      </span>
                    </div>
                    <div className="flex items-center">
                      <UserCheck className="w-5 h-5 mr-2 text-blue-300" />
                      <span className="">
                        {platformOverview.onlineDoctors}/{platformOverview.totalDoctors} Doctors Online
                      </span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-yellow-300" />
                      <span className="">
                        {formatCurrency(revenueData.daily)} Today
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                    <Monitor className="w-16 h-16" />
                  </div>
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
            {activeTab === 'active-sessions' && renderActiveSessions()}
            {activeTab === 'doctors' && renderOnlineDoctors()}
            {activeTab === 'session-history' && renderSessionHistory()}
            {activeTab === 'revenue' && renderRevenue()}
            {activeTab === 'platform-stats' && renderPlatformStats()}
            
            {/* Placeholder for settings tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Settings</h3>
                <p className="text-gray-600">
                  Advanced telemedicine platform configuration options will be available here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemedicineManagement;