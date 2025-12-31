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
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';


const TelemedicineManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [sessionFilter, setSessionFilter] = useState('all');
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

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
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Telemedicine Overview</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleScheduleSession}
            className="flex items-center px-3 py-1.5 text-sm bg-blue-500 border border-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Schedule Session
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-1.5" />
            Export Reports
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4 mr-1.5" />
            Settings
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold  mb-1">Active Sessions</p>
              <p className="text-3xl font-bold text-gray-900">{platformOverview.activeSessions}</p>
              <div className="flex items-center mt-2">
                <Activity className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">Live now</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold mb-1">Online Doctors</p>
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
              <p className="text-sm font-semibold mb-1">Today's Revenue</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(revenueData.daily)}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">+{platformOverview.monthlyGrowth}%</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold mb-1">Avg Session Time</p>
              <p className="text-3xl font-bold text-gray-900">{formatDuration(platformOverview.avgSessionDuration)}</p>
              <div className="flex items-center mt-2">
                <Clock className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">Per session</span>
              </div>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Timer className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Usage Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Platform Usage Distribution</h3>
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
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium ">Session Completed</p>
                  <p className="text-xs text-gray-600">Dr. Sarah Mitchell - Mary Wanjiku</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 ">
              <div className="flex items-center">
                <UserCheck className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium ">Doctor Joined</p>
                  <p className="text-xs text-gray-600">Dr. James Mwangi is now online</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">5 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium ">Session Scheduled</p>
                  <p className="text-xs text-gray-600">New appointment for 2:30 PM</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">8 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSessions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Active Telemedicine Sessions</h3>
        <div className="flex items-center space-x-3">
          <select
            value={sessionFilter}
            onChange={(e) => setSessionFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
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

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Patient</th>
              <th className="px-4 py-3 text-left font-semibold">Doctor</th>
              <th className="px-4 py-3 font-semibold">Platform</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Duration</th>
              <th className="px-4 py-3 font-semibold">Cost</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {activeSessions.map((session, index) => (
              <React.Fragment key={session.id}>
                {/* MAIN ROW */}
                <tr
                  className={`hover:bg-gray-50 cursor-pointer ${index !== 0 ? 'border-t border-gray-200' : ''}`}
                  onClick={() => toggleRow(session.id)}
                >
                  <td className="px-4 py-3 font-semibold">
                    {session.patient}
                    <div className="text-xs text-gray-500">
                      ID: {session.patientId}
                    </div>
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    {session.doctor}
                    <div className="text-xs text-gray-500">
                      {session.specialty}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {session.platform === 'Video Call' ? (
                      <Video className="w-4 h-4 inline text-blue-600" />
                    ) : (
                      <Phone className="w-4 h-4 inline text-blue-600" />
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1  ${getPriorityColor(session.priority)}`}>
                      {session.priority}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-1 text-green-700">
                      Live
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {formatDuration(session.duration)}
                  </td>

                  <td className="px-4 py-3 text-center font-semibold">
                    {formatCurrency(session.cost)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <ChevronDown
                      className={`w-4 h-4 inline transition-transform ${
                        expandedRow === session.id ? 'rotate-180' : ''
                      }`}
                    />
                  </td>
                </tr>

                {/* EXPANDED ROW */}
                {expandedRow === session.id && (
                  <tr className="bg-gray-50">
                    <td colSpan="8" className="px-6 py-4 border-b border-gray-200">
                      <div className="grid grid-cols-3 gap-6 text-sm">
                        {/* Symptoms */}
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Symptoms</p>
                          <div className="flex flex-wrap gap-1">
                            {session.symptoms.map((symptom, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-white border rounded text-xs"
                              >
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Session Info */}
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Session Info</p>
                          <p className="text-gray-600">Type: {session.sessionType}</p>
                          <p className="text-gray-600">Platform: {session.platform}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-start justify-end gap-3">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded">
                            <Pause className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleTerminateSession(session.id)}
                            className="text-sm text-red-600 hover:underline"
                          >
                            End Session
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOnlineDoctors = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Online Doctors</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent">
            <option>All Specialties</option>
            <option>General Medicine</option>
            <option>Cardiology</option>
            <option>Pediatrics</option>
            <option>Dermatology</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Doctor</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Rating</th>
              <th className="px-4 py-3 font-semibold">Experience</th>
              <th className="px-4 py-3 font-semibold">Sessions Today</th>
              <th className="px-4 py-3 font-semibold">Avg Duration</th>
              <th className="px-4 py-3 font-semibold">Earnings</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {onlineDoctors.map((doctor, index) => (
              <React.Fragment key={doctor.id}>
                {/* MAIN ROW */}
                <tr
                  className={`hover:bg-gray-50 cursor-pointer ${index !== 0 ? 'border-t border-gray-200' : ''}`}
                  onClick={() => toggleRow(doctor.id)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={doctor.photo}
                          alt={doctor.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                          doctor.currentStatus === 'available' ? 'bg-green-500' :
                          doctor.currentStatus === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">{doctor.name}</p>
                        <p className="text-xs">{doctor.specialty}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 ${getStatusColor(doctor.currentStatus)}`}>
                      {doctor.currentStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-500 mr-1" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">{doctor.totalSessions} sessions</div>
                  </td>

                  <td className="px-4 py-3 text-center font-medium">
                    {doctor.experience} years
                  </td>

                  <td className="px-4 py-3 text-center font-medium">
                    {doctor.sessionsToday}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {formatDuration(doctor.avgSessionDuration)}
                  </td>

                  <td className="px-4 py-3 text-center font-semibold">
                    {formatCurrency(doctor.earnings)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <ChevronDown
                      className={`w-4 h-4 inline transition-transform ${
                        expandedRow === doctor.id ? 'rotate-180' : ''
                      }`}
                    />
                  </td>
                </tr>

                {/* EXPANDED ROW */}
                {expandedRow === doctor.id && (
                  <tr className="bg-gray-50">
                    <td colSpan="8" className="px-6 py-4 border-b border-gray-200">
                      <div className="grid grid-cols-3 gap-6 text-sm">
                        {/* Languages */}
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Languages</p>
                          <div className="flex flex-wrap gap-1">
                            {doctor.languages.map((language, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-white border rounded text-xs text-blue-700"
                              >
                                {language}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Location Info */}
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Location</p>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{doctor.location}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-start justify-end gap-3">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSessionHistory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Session History</h3>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
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

      <div className="border border-gray-200 p-6">

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
                        <button className="text-blue-600 hover:text-blue-800">
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
              <p className="text-sm mb-1">Daily Revenue</p>
              <p className="text-2xl font-bold ">{formatCurrency(revenueData.daily)}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm  mb-1">Weekly Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(revenueData.weekly)}</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Monthly Revenue</p>
              <p className="text-2xl font-bold ">{formatCurrency(revenueData.monthly)}</p>
            </div>
            <div className="w-12 h-12  flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold  mb-6">Revenue by Specialty</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Table on the left */}
          <div className="bg-white border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50  uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Specialty</th>
                  <th className="px-4 py-3 text-center font-semibold">Sessions</th>
                  <th className="px-4 py-3 text-center font-semibold">Avg Cost</th>
                  <th className="px-4 py-3 text-right font-semibold">Revenue</th>
                  <th className="px-4 py-3 text-right font-semibold">% Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {revenueData.bySpecialty.map((specialty, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">{specialty.specialty}</td>
                    <td className="px-4 py-3 text-center ">{specialty.sessions}</td>
                    <td className="px-4 py-3 text-center ">{formatCurrency(specialty.avgCost)}</td>
                    <td className="px-4 py-3 text-right font-semibold ">{formatCurrency(specialty.revenue)}</td>
                    <td className="px-4 py-3 text-right font-semibold ">
                      {((specialty.revenue / revenueData.monthly) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bar Chart on the right */}
          <div className="bg-white border border-gray-200 p-6">
            <h4 className="font-semibold mb-4">Revenue Analytics</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={revenueData.bySpecialty}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="specialty" 
                  tick={{ fill: '#000000', fontSize: 12, fontWeight: 600 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fill: '#000000', fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
            <div className="">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Telemedicine Management</h1>
                  <p className=" text-lg">
                    Comprehensive oversight of telemedicine services and virtual healthcare delivery
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
            {activeTab === 'active-sessions' && renderActiveSessions()}
            {activeTab === 'doctors' && renderOnlineDoctors()}
            {activeTab === 'session-history' && renderSessionHistory()}
            {activeTab === 'revenue' && renderRevenue()}
            
            
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