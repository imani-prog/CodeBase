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
  ChevronDown,
  Bell,
  Shield,
  Lock,
  Save,
  Volume2,
  Mail,
  Smartphone
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
import ScheduleSessionModal from '../../Components/Admin/ScheduleSessionModal';
import ExportReportsModal from '../../Components/Admin/ExportReportsModal';
import ViewSessionModal from '../../Components/Admin/ViewSessionModal';
import PauseSessionModal from '../../Components/Admin/PauseSessionModal';
import TerminateSessionModal from '../../Components/Admin/TerminateSessionModal';


const TelemedicineManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [sessionFilter, setSessionFilter] = useState('all');
  // Modal states
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showTerminateModal, setShowTerminateModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [pausedSessionIds, setPausedSessionIds] = useState(new Set());
  const [terminatedSessionIds, setTerminatedSessionIds] = useState(new Set());

  // Platform settings state
  const [platformSettings, setPlatformSettings] = useState({
    // General Settings
    platformName: 'MediLink Telemedicine',
    platformEnabled: true,
    maxConcurrentSessions: 100,
    sessionTimeout: 30,
    
    // Session Settings
    allowVideoCall: true,
    allowAudioCall: true,
    allowMessaging: true,
    videoQuality: 'high',
    autoRecordSessions: false,
    maxSessionDuration: 60,
    minSessionDuration: 5,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    reminderBefore: 15,
    
    // Security Settings
    requirePatientVerification: true,
    requireDoctorVerification: true,
    endToEndEncryption: true,
    sessionRecordingConsent: true,
    
    // Payment Settings
    allowInstantPayment: true,
    allowInsuranceBilling: true,
    requirePaymentUpfront: false,
    
    // Availability Settings
    operatingHours: {
      start: '07:00',
      end: '22:00'
    },
    weekendAvailable: true,
    emergencyAvailable: true
  });

  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleSettingChange = (key, value) => {
    setPlatformSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setSettingsSaved(false);
  };

  const _handleSaveSettings = () => {
    console.log('Saving platform settings:', platformSettings);
    // Add API call here to save settings
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
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
    },
    {
      id: 'TM-004',
      patient: 'Peter Njoroge',
      patientId: 'PAT-12348',
      doctor: 'Dr. Peter Njoroge',
      doctorId: 'DOC-004',
      specialty: 'Dermatology',
      startTime: '2024-10-12T12:00:00',
      duration: 20,
      platform: 'Messaging',
      status: 'active',
      sessionType: 'follow-up',
      priority: 'medium',
      symptoms: ['Rash', 'Itching'],
      cost: 600
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



  const _handleDeleteSession = (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session record?')) {
      console.log('Deleting session:', sessionId);
      // Implement session deletion logic
      alert('Session record deleted successfully');
    }
  };

  const handleScheduleSession = () => {
    setShowScheduleModal(true);
  };

  const handleScheduleSessionSubmit = (sessionData) => {
    console.log('Scheduling new session:', sessionData);
    // Implement session scheduling logic with backend API
    alert(`Session scheduled for ${sessionData.patientName} with ${sessionData.doctorName} on ${sessionData.date} at ${sessionData.time}`);
  };

  const handleExportReports = () => {
    setShowExportModal(true);
  };

  const handleExportReportsSubmit = (reportData) => {
    console.log('Exporting report:', reportData);
    // Implement export logic
    alert('Report exported successfully!');
  };

  const handleOpenSettings = () => {
    setActiveTab('settings');
  };

  const handleViewSession = (session) => {
    setSelectedSession(session);
    setShowViewModal(true);
  };

  const handlePauseSession = (session) => {
    setSelectedSession(session);
    setShowPauseModal(true);
  };

  const handlePauseConfirm = ({ sessionId, reason }) => {
    console.log('Pausing session:', sessionId, 'Reason:', reason);
    setPausedSessionIds(prev => new Set([...prev, sessionId]));
  };

  const handleResumeSession = (sessionId) => {
    setPausedSessionIds(prev => {
      const next = new Set(prev);
      next.delete(sessionId);
      return next;
    });
  };

  const handleTerminateSession = (session) => {
    setSelectedSession(session);
    setShowTerminateModal(true);
  };

  const handleTerminateConfirm = ({ sessionId, reason }) => {
    console.log('Terminating session:', sessionId, 'Reason:', reason);
    setTerminatedSessionIds(prev => new Set([...prev, sessionId]));
    // also remove from paused if it was paused
    setPausedSessionIds(prev => {
      const next = new Set(prev);
      next.delete(sessionId);
      return next;
    });
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
          <button 
            onClick={handleExportReports}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-1.5" />
            Export Reports
          </button>
          <button 
            onClick={handleOpenSettings}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
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
              <th className="px-4 py-3 text-left font-semibold">Patient ID</th>
              <th className="px-4 py-3 text-left font-semibold">Doctor</th>
              <th className="px-4 py-3 text-left font-semibold">Specialty</th>
              <th className="px-4 py-3 text-center font-semibold">Platform</th>
              <th className="px-4 py-3 text-center font-semibold">Priority</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Duration</th>
              <th className="px-4 py-3 text-center font-semibold">Cost</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {activeSessions.map((session, index) => {
              const isPaused = pausedSessionIds.has(session.id);
              const isEnded = terminatedSessionIds.has(session.id);
              return (
                <tr
                  key={session.id}
                  className={`${
                    isEnded ? 'bg-red-50 opacity-60' :
                    isPaused ? 'bg-blue-50 opacity-70' : 'hover:bg-gray-50'
                  } ${index !== 0 ? 'border-t border-gray-200' : ''}`}
                >
                  <td className="px-4 py-3 font-semibold">{session.patient}</td>

                  <td className="px-4 py-3 text-xs text-gray-500">{session.patientId}</td>

                  <td className="px-4 py-3 font-semibold">{session.doctor}</td>

                  <td className="px-4 py-3 text-xs text-gray-600">{session.specialty}</td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {session.platform === 'Video Call' ? (
                        <Video className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Phone className="w-4 h-4 text-blue-600" />
                      )}
                      <span className="text-xs text-gray-600">{session.platform}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-medium ${getPriorityColor(session.priority)}`}>
                      {session.priority}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {isEnded ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-red-700 text-xs font-semibold">
                        <Square className="w-3 h-3" />
                        Ended
                      </span>
                    ) : isPaused ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-blue-700 text-xs font-semibold">
                        <Pause className="w-3 h-3" />
                        Paused
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-green-600 text-xs font-semibold">
                        <Activity className="w-3 h-3" />
                        Live
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center text-sm">
                    {formatDuration(session.duration)}
                  </td>

                  <td className="px-4 py-3 text-center font-semibold text-sm">
                    {formatCurrency(session.cost)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleViewSession(session)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {!isEnded && (
                        isPaused ? (
                          <button
                            onClick={() => handleResumeSession(session.id)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                            title="Resume Session"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePauseSession(session)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="Pause Session"
                          >
                            <Pause className="w-4 h-4" />
                          </button>
                        )
                      )}
                      {!isEnded && (
                        <button
                          onClick={() => handleTerminateSession(session)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          title="End Session"
                        >
                          <Square className="w-4 h-4" />
                        </button>
                      )}
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
              <th className="px-4 py-3 text-left font-semibold">Specialty</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Rating</th>
              <th className="px-4 py-3 text-center font-semibold">Experience</th>
              <th className="px-4 py-3 text-center font-semibold">Sessions Today</th>
              <th className="px-4 py-3 text-center font-semibold">Avg Duration</th>
              <th className="px-4 py-3 text-center font-semibold">Earnings</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {onlineDoctors.map((doctor, index) => (
              <tr
                key={doctor.id}
                className={`hover:bg-gray-50 ${index !== 0 ? 'border-t border-gray-200' : ''}`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="relative flex-shrink-0">
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                        doctor.currentStatus === 'available' ? 'bg-green-500' :
                        doctor.currentStatus === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    <div className="ml-2">
                      <span className="font-semibold text-sm">{doctor.name}</span>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-xs text-gray-600">{doctor.specialty}</td>

                <td className="px-4 py-3 text-center">
                  <span className={`text-xs font-medium ${getStatusColor(doctor.currentStatus)}`}>
                    {doctor.currentStatus}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3.5 h-3.5 text-blue-500" />
                    <span className="font-medium text-sm">{doctor.rating}</span>
                    <span className="text-xs text-gray-400">({doctor.totalSessions})</span>
                  </div>
                </td>

                <td className="px-4 py-3 text-center text-sm font-medium">
                  {doctor.experience} yrs
                </td>

                <td className="px-4 py-3 text-center text-sm font-medium">
                  {doctor.sessionsToday}
                </td>

                <td className="px-4 py-3 text-center text-sm">
                  {formatDuration(doctor.avgSessionDuration)}
                </td>

                <td className="px-4 py-3 text-center text-sm font-semibold">
                  {formatCurrency(doctor.earnings)}
                </td>

                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => console.log('Viewing doctor profile:', doctor.id)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => console.log('Messaging doctor:', doctor.id)}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                      title="Send Message"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => console.log('Editing doctor:', doctor.id)}
                      className="p-1.5 text-purple-600 hover:bg-purple-50 rounded"
                      title="Edit Profile"
                    >
                      <Edit className="w-4 h-4" />
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
          <button 
            onClick={handleExportReports}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
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
                <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">
                    <span className="font-medium text-gray-900">{session.id}</span>
                    <span className="text-xs text-gray-400 ml-1">· {session.date}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{session.patient}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{session.doctor}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{session.duration > 0 ? formatDuration(session.duration) : '-'}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{formatCurrency(session.cost)}</td>
                  <td className="py-3 px-4 text-sm">
                    {session.rating ? (
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500" />
                        <span className="text-gray-900">{session.rating}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`text-xs font-medium ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleViewSession(session)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => console.log('View prescription:', session.id)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                        title="View Prescription"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      {session.status === 'completed' && (
                        <button
                          onClick={() => console.log('Download report:', session.id)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                          title="Download Report"
                        >
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

  const renderSettings = () => (
    <div className="space-y-4">
      {/* Save Bar */}
      {/* {!settingsSaved && (
        <div className="border border-blue-200 bg-blue-50 rounded-lg px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm text-blue-900">You have unsaved changes</span>
          </div>
          <button
            onClick={handleSaveSettings}
            className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Save Changes
          </button>
        </div>
      )} */}

      {settingsSaved && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 flex items-center">
          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
          <span className="text-sm text-green-900">Settings saved successfully</span>
        </div>
      )}

      {/* General + Session Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* General Settings */}
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center mb-4">
            <Settings className="w-4 h-4 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-semibold">General Settings</h3>
              <p className="text-xs text-gray-500">Configure basic platform parameters</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">Platform Name</label>
              <input
                type="text"
                value={platformSettings.platformName}
                onChange={(e) => handleSettingChange('platformName', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                placeholder="Enter platform name"
              />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-gray-100">
              <div>
                <p className="text-xs font-medium">Enable Platform</p>
                <p className="text-xs text-gray-500">Allow telemedicine services to operate</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.platformEnabled} onChange={(e) => handleSettingChange('platformEnabled', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-gray-100">
              <div>
                <label className="block text-xs font-medium mb-1">Max Concurrent Sessions</label>
                <input
                  type="number"
                  value={platformSettings.maxConcurrentSessions}
                  onChange={(e) => handleSettingChange('maxConcurrentSessions', parseInt(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min="1" max="1000"
                />
                <p className="text-xs text-gray-400 mt-0.5">Max simultaneous sessions</p>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Session Timeout (min)</label>
                <input
                  type="number"
                  value={platformSettings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min="5" max="120"
                />
                <p className="text-xs text-gray-400 mt-0.5">Auto-end inactive sessions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Session Configuration */}
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center mb-4">
            <Video className="w-4 h-4 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-semibold">Session Configuration</h3>
              <p className="text-xs text-gray-500">Configure session types and quality</p>
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Video className="w-4 h-4 text-blue-600 mr-2" />
                <div>
                  <p className="text-xs font-medium">Video Call Sessions</p>
                  <p className="text-xs text-gray-500">Enable video consultation</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.allowVideoCall} onChange={(e) => handleSettingChange('allowVideoCall', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-blue-600 mr-2" />
                <div>
                  <p className="text-xs font-medium">Audio Call Sessions</p>
                  <p className="text-xs text-gray-500">Enable voice-only consultation</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.allowAudioCall} onChange={(e) => handleSettingChange('allowAudioCall', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 text-blue-600 mr-2" />
                <div>
                  <p className="text-xs font-medium">Messaging Sessions</p>
                  <p className="text-xs text-gray-500">Enable text-based consultation</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.allowMessaging} onChange={(e) => handleSettingChange('allowMessaging', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div>
                <p className="text-xs font-medium">Auto-Record Sessions</p>
                <p className="text-xs text-gray-500">Record all sessions automatically</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.autoRecordSessions} onChange={(e) => handleSettingChange('autoRecordSessions', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="border-t border-gray-100 pt-2">
              <label className="block text-xs font-medium mb-1">Video Quality</label>
              <select
                value={platformSettings.videoQuality}
                onChange={(e) => handleSettingChange('videoQuality', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="low">Low (360p)</option>
                <option value="medium">Medium (480p)</option>
                <option value="high">High (720p)</option>
                <option value="hd">HD (1080p)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-2">
              <div>
                <label className="block text-xs font-medium mb-1">Max Duration (min)</label>
                <input type="number" value={platformSettings.maxSessionDuration} onChange={(e) => handleSettingChange('maxSessionDuration', parseInt(e.target.value))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" min="5" max="240" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Min Duration (min)</label>
                <input type="number" value={platformSettings.minSessionDuration} onChange={(e) => handleSettingChange('minSessionDuration', parseInt(e.target.value))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" min="1" max="30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications + Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Notification Settings */}
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center mb-4">
            <Bell className="w-4 h-4 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-semibold">Notification Settings</h3>
              <p className="text-xs text-gray-500">Configure how users receive notifications</p>
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-blue-600 mr-2" />
                <div>
                  <p className="text-xs font-medium">Email Notifications</p>
                  <p className="text-xs text-gray-500">Send updates via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.emailNotifications} onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div className="flex items-center">
                <Smartphone className="w-4 h-4 text-blue-600 mr-2" />
                <div>
                  <p className="text-xs font-medium">SMS Notifications</p>
                  <p className="text-xs text-gray-500">Send updates via SMS</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.smsNotifications} onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div className="flex items-center">
                <Volume2 className="w-4 h-4 text-blue-600 mr-2" />
                <div>
                  <p className="text-xs font-medium">Push Notifications</p>
                  <p className="text-xs text-gray-500">Send in-app notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.pushNotifications} onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="border-t border-gray-100 pt-2">
              <label className="block text-xs font-medium mb-1">Reminder Before Session</label>
              <select
                value={platformSettings.reminderBefore}
                onChange={(e) => handleSettingChange('reminderBefore', parseInt(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="5">5 minutes before</option>
                <option value="10">10 minutes before</option>
                <option value="15">15 minutes before</option>
                <option value="30">30 minutes before</option>
                <option value="60">1 hour before</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center mb-4">
            <Shield className="w-4 h-4 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-semibold">Security & Privacy</h3>
              <p className="text-xs text-gray-500">Configure security and compliance settings</p>
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">Require Patient Verification</p>
                <p className="text-xs text-gray-500">Verify patient identity before session</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.requirePatientVerification} onChange={(e) => handleSettingChange('requirePatientVerification', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div>
                <p className="text-xs font-medium">Require Doctor Verification</p>
                <p className="text-xs text-gray-500">Verify doctor credentials before sessions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.requireDoctorVerification} onChange={(e) => handleSettingChange('requireDoctorVerification', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div className="flex items-center">
                <Lock className="w-4 h-4 text-blue-600 mr-2" />
                <div>
                  <p className="text-xs font-medium">End-to-End Encryption</p>
                  <p className="text-xs text-gray-500">Encrypt all session data in transit</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.endToEndEncryption} onChange={(e) => handleSettingChange('endToEndEncryption', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div>
                <p className="text-xs font-medium">Session Recording Consent</p>
                <p className="text-xs text-gray-500">Require consent before recording</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.sessionRecordingConsent} onChange={(e) => handleSettingChange('sessionRecordingConsent', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Payment + Operating Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Payment Settings */}
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center mb-4">
            <DollarSign className="w-4 h-4 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-semibold">Payment Options</h3>
              <p className="text-xs text-gray-500">Configure payment and billing settings</p>
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">Allow Instant Payment</p>
                <p className="text-xs text-gray-500">Enable pay-per-session functionality</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.allowInstantPayment} onChange={(e) => handleSettingChange('allowInstantPayment', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div>
                <p className="text-xs font-medium">Allow Insurance Billing</p>
                <p className="text-xs text-gray-500">Support insurance claim submissions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.allowInsuranceBilling} onChange={(e) => handleSettingChange('allowInsuranceBilling', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div>
                <p className="text-xs font-medium">Require Payment Upfront</p>
                <p className="text-xs text-gray-500">Patients must pay before session begins</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.requirePaymentUpfront} onChange={(e) => handleSettingChange('requirePaymentUpfront', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center mb-4">
            <Clock className="w-4 h-4 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-semibold">Operating Hours</h3>
              <p className="text-xs text-gray-500">Configure platform availability schedule</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  value={platformSettings.operatingHours.start}
                  onChange={(e) => handleSettingChange('operatingHours', { ...platformSettings.operatingHours, start: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">End Time</label>
                <input
                  type="time"
                  value={platformSettings.operatingHours.end}
                  onChange={(e) => handleSettingChange('operatingHours', { ...platformSettings.operatingHours, end: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div>
                <p className="text-xs font-medium">Weekend Availability</p>
                <p className="text-xs text-gray-500">Allow sessions on weekends</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.weekendAvailable} onChange={(e) => handleSettingChange('weekendAvailable', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div>
                <p className="text-xs font-medium">Emergency 24/7 Availability</p>
                <p className="text-xs text-gray-500">Allow emergency sessions at any time</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={platformSettings.emergencyAvailable} onChange={(e) => handleSettingChange('emergencyAvailable', e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-2">
        <div>
          {/* Header Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold mb-0.5">Telemedicine Management</h1>
                <p className="text-sm text-gray-500">
                  Comprehensive oversight of telemedicine services and virtual healthcare delivery
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-4">
            <div className="flex overflow-x-auto ">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent hover:text-gray-900 hover:border-gray-300'
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
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ScheduleSessionModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={handleScheduleSessionSubmit}
      />

      <ExportReportsModal
        showModal={showExportModal}
        setShowModal={setShowExportModal}
        onExportReport={handleExportReportsSubmit}
        module="telemedicine"
      />

      <ViewSessionModal
        isOpen={showViewModal}
        onClose={() => { setShowViewModal(false); setSelectedSession(null); }}
        session={selectedSession}
        sessionStatus={
          selectedSession
            ? terminatedSessionIds.has(selectedSession.id)
              ? 'ended'
              : pausedSessionIds.has(selectedSession.id)
              ? 'paused'
              : 'live'
            : 'live'
        }
      />

      <PauseSessionModal
        isOpen={showPauseModal}
        onClose={() => { setShowPauseModal(false); setSelectedSession(null); }}
        session={selectedSession}
        onConfirm={handlePauseConfirm}
      />

      <TerminateSessionModal
        isOpen={showTerminateModal}
        onClose={() => { setShowTerminateModal(false); setSelectedSession(null); }}
        session={selectedSession}
        onConfirm={handleTerminateConfirm}
      />
    </div>
  );
};

export default TelemedicineManagement;