import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import ViewDoctorProfileModal from '../../Components/Admin/ViewDoctorProfileModal';
import MessageDoctorModal from '../../Components/Admin/MessageDoctorModal';
import EditDoctorModal from '../../Components/Admin/EditDoctorModal';
import ViewHistorySessionModal from '../../Components/Admin/ViewHistorySessionModal';
import ViewPrescriptionModal from '../../Components/Admin/ViewPrescriptionModal';
import DownloadReportModal from '../../Components/Admin/DownloadReportModal';
import { telemedicineService } from '../../Services/domain/telemedicineService.js';
import JitsiCallModal from '../../Components/JitsiCallModal';
import { patientApi } from '../../API/endpoints/patientApi.js';

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
  // Doctor modal states
  const [showViewDoctorModal, setShowViewDoctorModal] = useState(false);
  const [showMessageDoctorModal, setShowMessageDoctorModal] = useState(false);
  const [showEditDoctorModal, setShowEditDoctorModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  // Session history modal states
  const [showHistoryViewModal, setShowHistoryViewModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showDownloadReportModal, setShowDownloadReportModal] = useState(false);
  const [selectedHistorySession, setSelectedHistorySession] = useState(null);

  const [showJitsiCall, setShowJitsiCall] = useState(false);
  const [jitsiSession, setJitsiSession]   = useState(null);
  const [joiningSession, setJoiningSession] = useState(false);

  const handleJoinLiveSession = async (session) => {
    if (!session?.backendId || !session?.patientId || session?.patientId === 'N/A') {
      window.alert('Please select a valid patient-linked session before joining.');
      return;
    }

    setJoiningSession(true);
    try {
      if (session.status === 'scheduled') {
        await telemedicineService.startSession(session.backendId);
        setReloadToken((prev) => prev + 1);
      } else if (session.status === 'paused') {
        await telemedicineService.resumeSession(session.backendId);
        setReloadToken((prev) => prev + 1);
      }

      setJitsiSession(session);
      setShowJitsiCall(true);
    } catch (error) {
      window.alert(error?.message || 'Failed to start the session.');
    } finally {
      setJoiningSession(false);
    }
  };

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


const formatDateOnly = (dateString) => {
  if (!dateString) return '—';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-KE', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};


const formatIfDate = (value) => {
  if (!value || typeof value !== 'string') return value;
  return value.replace(
    /\d{4}-\d{2}-\d{2}T[\d:.Z+%-]+/g,
    (match) => {
      const d = new Date(match);
      if (isNaN(d.getTime())) return match;
      return d.toLocaleString('en-KE', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true,
      });
    }
  );
};

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

  const [platformOverview, setPlatformOverview] = useState({
    totalSessions: 0,
    activeSessions: 0,
    totalDoctors: 0,
    onlineDoctors: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    avgSessionDuration: 0,
    patientSatisfaction: 0,
  });
  const [activeSessions, setActiveSessions] = useState([]);
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [revenueData, setRevenueData] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    bySpecialty: [],
  });
  const [usageDistribution, setUsageDistribution] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState('');
  const [reloadToken, setReloadToken] = useState(0);
  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [patientsError, setPatientsError] = useState('');

  const firstNonEmpty = useCallback((...values) => {
    for (const value of values) {
      if (value === undefined || value === null) continue;
      if (typeof value === 'string') {
        const trimmed = value.trim();
        const lowered = trimmed.toLowerCase();
        if (trimmed === '' || lowered === 'null' || lowered === 'undefined' || lowered === 'n/a' || lowered === 'na') {
          continue;
        }
      }
      return value;
    }
    return null;
  }, []);

  const toNumber = useCallback((value, fallback = 0) => {
    if (typeof value === 'string') {
      const cleaned = value.replace(/[^0-9.-]/g, '');
      const parsed = Number(cleaned);
      return Number.isFinite(parsed) ? parsed : fallback;
    }
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }, []);

  const toArray = useCallback((value) => (Array.isArray(value) ? value : []), []);

  const normalizePagedContent = useCallback((payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.content)) return payload.content;
    if (Array.isArray(payload?.result)) return payload.result;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
  }, []);

  const extractListPayload = useCallback((payload, keys = []) => {
    const direct = normalizePagedContent(payload);
    if (direct.length > 0) return direct;

    for (const key of keys) {
      const nested = normalizePagedContent(payload?.[key]);
      if (nested.length > 0) return nested;

      const nestedData = normalizePagedContent(payload?.data?.[key]);
      if (nestedData.length > 0) return nestedData;
    }

    return [];
  }, [normalizePagedContent]);

  const parseBackendId = useCallback((value) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (value === undefined || value === null) return null;
    const text = String(value);
    const digits = text.match(/\d+/g);
    if (!digits) {
      const asNumber = Number(text);
      return Number.isFinite(asNumber) ? asNumber : null;
    }
    const parsed = Number(digits.join(''));
    return Number.isFinite(parsed) ? parsed : null;
  }, []);

  const normalizePlatform = useCallback((value) => {
    const key = String(value || '').toUpperCase();
    if (key.includes('VIDEO')) return 'Video Call';
    if (key.includes('AUDIO')) return 'Audio Call';
    if (key.includes('MESSAGE')) return 'Messaging';
    return 'Video Call';
  }, []);

  const normalizeSessionStatus = useCallback((value) => {
    const key = String(value || '').toUpperCase();
    if (key === 'ACTIVE') return 'active';
    if (key === 'PAUSED') return 'paused';
    if (key === 'COMPLETED') return 'completed';
    if (key === 'TERMINATED') return 'terminated';
    if (key === 'CANCELLED' || key === 'CANCELED') return 'cancelled';
    if (key === 'SCHEDULED') return 'scheduled';
    return 'active';
  }, []);

  const normalizePriority = useCallback((value) => String(value || 'normal').toLowerCase(), []);

  const mapSessionRow = useCallback((row = {}) => {
    const patient = row.patient || {};
    const doctor = row.doctor || {};
    const startTime = firstNonEmpty(row.startTime, row.scheduledStart, row.scheduledAt, row.createdAt);
    const endTime = firstNonEmpty(row.endTime, row.scheduledEnd);
    const durationFromRange = (() => {
      const start = Date.parse(startTime || '');
      const end = Date.parse(endTime || '');
      if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return null;
      return Math.round((end - start) / (1000 * 60));
    })();

    const backendId = parseBackendId(firstNonEmpty(row.id, row.sessionPk));
    const sessionId = firstNonEmpty(row.sessionId, row.sessionCode, backendId ? `TM-${backendId}` : null);
    const displayId = sessionId ?? 'TM-N/A';

    return {
      id: String(displayId),
      sessionId: sessionId ?? null,
      backendId,
      patient: String(firstNonEmpty(row.patientName, patient.fullName, patient.name, 'Unknown Patient')),
      patientId: String(firstNonEmpty(row.patientId, patient.id, patient.patientId, 'N/A')),
      doctor: String(firstNonEmpty(row.doctorName, doctor.fullName, doctor.name, 'Assigned Doctor')),
      doctorId: String(firstNonEmpty(row.doctorId, doctor.id, 'N/A')),
      specialty: String(firstNonEmpty(row.specialty, row.doctorSpecialty, doctor.specialty, 'General Medicine')),
      startTime,
      duration: toNumber(firstNonEmpty(row.duration, row.durationMinutes, durationFromRange), 0),
      platform: normalizePlatform(firstNonEmpty(row.platform, row.platformType)),
      status: normalizeSessionStatus(row.status),
      sessionType: String(firstNonEmpty(row.sessionType, row.type, 'consultation')).toLowerCase(),
      priority: normalizePriority(firstNonEmpty(row.priority, row.urgency)),
      symptoms: Array.isArray(row.symptoms)
        ? row.symptoms
        : String(firstNonEmpty(row.symptoms, '')).split(',').map((item) => item.trim()).filter(Boolean),
      cost: toNumber(firstNonEmpty(row.cost, row.amount, row.sessionFee), 0),
      diagnosis: firstNonEmpty(row.diagnosis, null),
      prescription: firstNonEmpty(row.prescription, row.doctorNotes, null),
      rating: firstNonEmpty(row.rating, null),
      followUpRequired: Boolean(firstNonEmpty(row.followUpRequired, false)),
      date: startTime ? formatDateOnly(startTime) : '—',
      meetingLink: firstNonEmpty(row.meetingLink, row.meetingUrl, null),
    
    };
  }, [
    firstNonEmpty,
    toNumber,
    parseBackendId,
    normalizePlatform,
    normalizeSessionStatus,
    normalizePriority,
  ]);

  
  const mapDoctorRow = useCallback((row = {}) => ({
    id: String(firstNonEmpty(row.id, row.doctorId, 'N/A')),
    backendId: parseBackendId(firstNonEmpty(row.doctorId, row.id)),
    name: String(firstNonEmpty(row.name, row.doctorName, 'Unknown Doctor')),
    photo: String(firstNonEmpty(row.photo, row.avatarUrl, '/src/assets/Timothy Imani.jpeg')),
    specialty: String(firstNonEmpty(row.specialty, 'General Medicine')),
    experience: toNumber(firstNonEmpty(row.experience, row.yearsOfExperience), 0),
    rating: toNumber(firstNonEmpty(row.rating, row.averageRating), 0),
    sessionsToday: toNumber(firstNonEmpty(row.sessionsToday, row.todaySessions), 0),
    totalSessions: toNumber(firstNonEmpty(row.totalSessions, row.completedSessions), 0),
    currentStatus: String(firstNonEmpty(row.currentStatus, row.status, 'offline')).toLowerCase(),
    nextAppointment: firstNonEmpty(row.nextAppointment, row.nextSessionAt, null),
    avgSessionDuration: toNumber(firstNonEmpty(row.avgSessionDuration, row.averageSessionDuration), 0),
    earnings: toNumber(firstNonEmpty(row.earnings, row.totalEarnings), 0),
    languages: Array.isArray(row.languages)
      ? row.languages
      : String(firstNonEmpty(row.languages, 'English')).split(',').map((item) => item.trim()).filter(Boolean),
    location: String(firstNonEmpty(row.location, row.city, 'Nairobi')),
  }), [firstNonEmpty, parseBackendId, toNumber]);

  const mapPatientRow = useCallback((row = {}) => {
    const name = String(firstNonEmpty(
      row.fullName,
      row.name,
      [row.firstName, row.middleName, row.lastName].filter(Boolean).join(' '),
      'Unknown Patient'
    ));
    const id = String(firstNonEmpty(row.id, row.patientId, row.patient_id, ''));

    return {
      id,
      patientId: String(firstNonEmpty(row.patientId, row.patient_id, row.id, '')),
      name,
      email: String(firstNonEmpty(row.email, row.patientEmail, '')),
      phone: String(firstNonEmpty(row.phone, row.patientPhone, '')),
    };
  }, [firstNonEmpty]);

  const mapHistoryRow = useCallback((row = {}) => {
    const mapped = mapSessionRow(row);
    return {
      ...mapped,
      id: String(firstNonEmpty(row.sessionId, mapped.id, row.id)),
      status: normalizeSessionStatus(firstNonEmpty(row.status, mapped.status)),
      date: String(firstNonEmpty(row.date, mapped.date, '')),
    };
  }, [mapSessionRow, firstNonEmpty, normalizeSessionStatus]);

  const mapRecentActivityRow = useCallback((row = {}, index = 0) => {
    const title = String(firstNonEmpty(row.title, row.type, row.activityType, 'Activity'));
    const description = String(
      firstNonEmpty(
        row.subtitle,
        row.description,
        row.message,
        row.summary,
        row.details,
        row.activity,
        row.note,
        row.event,
        'No details available'
      )
    );
    const ts = firstNonEmpty(row.activityAt, row.timestamp, row.createdAt, row.time);
    const precomputedTimeAgo = firstNonEmpty(row.timeAgo, row.relativeTime);
    const timeAgo = (() => {
      if (precomputedTimeAgo) return String(precomputedTimeAgo);
      const t = Date.parse(ts || '');
      if (Number.isNaN(t)) return '';
      const deltaMins = Math.max(0, Math.floor((Date.now() - t) / (1000 * 60)));
      if (deltaMins < 1) return 'Just now';
      if (deltaMins < 60) return `${deltaMins} min ago`;
      const hours = Math.floor(deltaMins / 60);
      if (hours < 24) return `${hours} hr ago`;
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    })();

    return {
      id: String(firstNonEmpty(row.id, row.activityAt, index)),
      title,
      description,
      timeAgo,
    };
  }, [firstNonEmpty]);

  const usageListFromStats = useCallback((statsObj = {}) => {
    const entries = [
      { key: 'videoCall', label: 'Video Call' },
      { key: 'audioCall', label: 'Audio Call' },
      { key: 'messaging', label: 'Messaging' },
    ];

    return entries.map(({ key, label }) => ({
      key,
      label,
      sessions: toNumber(statsObj?.[key]?.sessions, 0),
      percentage: toNumber(statsObj?.[key]?.percentage, 0),
      avgDuration: toNumber(statsObj?.[key]?.avgDuration, 0),
    }));
  }, [toNumber]);

  const usageListFromSessions = useCallback((sessions = []) => {
    const buckets = {
      'Video Call': { key: 'videoCall', label: 'Video Call', sessions: 0, totalDuration: 0 },
      'Audio Call': { key: 'audioCall', label: 'Audio Call', sessions: 0, totalDuration: 0 },
      Messaging: { key: 'messaging', label: 'Messaging', sessions: 0, totalDuration: 0 },
    };

    for (const session of sessions) {
      const label = normalizePlatform(session?.platform);
      const bucket = buckets[label] || buckets['Video Call'];
      bucket.sessions += 1;
      bucket.totalDuration += toNumber(session?.duration, 0);
    }

    const total = sessions.length;
    return Object.values(buckets).map((item) => ({
      key: item.key,
      label: item.label,
      sessions: item.sessions,
      percentage: total > 0 ? Number(((item.sessions / total) * 100).toFixed(1)) : 0,
      avgDuration: item.sessions > 0 ? Math.round(item.totalDuration / item.sessions) : 0,
    }));
  }, [normalizePlatform, toNumber]);

  const filteredActiveSessions = useMemo(() => {
    return activeSessions.filter((session) => {
      if (sessionFilter === 'all') return true;
      if (sessionFilter === 'video') return session.platform === 'Video Call';
      if (sessionFilter === 'audio') return session.platform === 'Audio Call';
      if (sessionFilter === 'high-priority') return session.priority === 'high';
      return true;
    });
  }, [activeSessions, sessionFilter]);

  useEffect(() => {
    const loadTelemedicineData = async () => {
      setDataLoading(true);
      setDataError('');

      try {
        const [
          overviewPayload,
          sessionsPayload,
          revenuePayload,
          platformStatsPayload,
          usagePayload,
          activityPayload,
          doctorsPayload,
          historyPayload,
        ] = await Promise.all([
          telemedicineService.getPlatformOverview(),
          telemedicineService.listSessions({ page: 0, size: 200 }),
          telemedicineService.getRevenueData({ period: 'monthly' }),
          telemedicineService.getPlatformStats(),
          telemedicineService.getUsageDistribution(),
          telemedicineService.getRecentActivity({ limit: 10 }),
          telemedicineService.getOnlineDoctors(),
          telemedicineService.getSessionHistory({ period: selectedPeriod }),
          
        ]);
// Inside your useEffect, after the Promise.all resolves
console.log('RAW historyPayload:', JSON.stringify(historyPayload, null, 2));
console.log('EXTRACTED history rows:', extractListPayload(historyPayload, ['history', 'sessionHistory']));

        setPlatformOverview({
          totalSessions: toNumber(firstNonEmpty(overviewPayload?.totalSessions, overviewPayload?.sessionsTotal), 0),
          activeSessions: toNumber(firstNonEmpty(overviewPayload?.activeSessions, overviewPayload?.currentActiveSessions), 0),
          totalDoctors: toNumber(firstNonEmpty(overviewPayload?.totalDoctors, overviewPayload?.doctorsTotal), 0),
          onlineDoctors: toNumber(firstNonEmpty(overviewPayload?.onlineDoctors, overviewPayload?.doctorsOnline), 0),
          totalRevenue: toNumber(firstNonEmpty(overviewPayload?.totalRevenue, overviewPayload?.monthlyRevenue), 0),
          monthlyGrowth: toNumber(firstNonEmpty(overviewPayload?.monthlyGrowth, overviewPayload?.growthRate), 0),
          avgSessionDuration: toNumber(firstNonEmpty(overviewPayload?.avgSessionDuration, overviewPayload?.averageSessionDuration), 0),
          patientSatisfaction: toNumber(firstNonEmpty(overviewPayload?.patientSatisfaction, overviewPayload?.satisfactionRating), 0),
        });

        const mappedSessions = normalizePagedContent(sessionsPayload)
          .map(mapSessionRow)
          .filter((session) => ['active', 'paused', 'scheduled'].includes(session.status));
        setActiveSessions(mappedSessions);

        setRevenueData({
          daily: toNumber(firstNonEmpty(revenuePayload?.daily, revenuePayload?.dailyRevenue), 0),
          weekly: toNumber(firstNonEmpty(revenuePayload?.weekly, revenuePayload?.weeklyRevenue), 0),
          monthly: toNumber(firstNonEmpty(revenuePayload?.monthly, revenuePayload?.monthlyRevenue), 0),
          bySpecialty: toArray(firstNonEmpty(revenuePayload?.bySpecialty, revenuePayload?.specialtyRevenue)).map((item) => ({
            specialty: String(firstNonEmpty(item.specialty, item.name, 'Unknown Specialty')),
            revenue: toNumber(firstNonEmpty(item.revenue, item.totalRevenue), 0),
            sessions: toNumber(firstNonEmpty(item.sessions, item.totalSessions), 0),
            avgCost: toNumber(firstNonEmpty(item.avgCost, item.averageCost), 0),
          })),
        });

        const mappedPlatformStats = {
          videoCall: {
            sessions: toNumber(firstNonEmpty(platformStatsPayload?.videoCall?.sessions, platformStatsPayload?.videoCallSessions), 0),
            percentage: toNumber(firstNonEmpty(platformStatsPayload?.videoCall?.percentage, platformStatsPayload?.videoCallPercentage), 0),
            avgDuration: toNumber(firstNonEmpty(platformStatsPayload?.videoCall?.avgDuration, platformStatsPayload?.videoCallAvgDuration), 0),
          },
          audioCall: {
            sessions: toNumber(firstNonEmpty(platformStatsPayload?.audioCall?.sessions, platformStatsPayload?.audioCallSessions), 0),
            percentage: toNumber(firstNonEmpty(platformStatsPayload?.audioCall?.percentage, platformStatsPayload?.audioCallPercentage), 0),
            avgDuration: toNumber(firstNonEmpty(platformStatsPayload?.audioCall?.avgDuration, platformStatsPayload?.audioCallAvgDuration), 0),
          },
          messaging: {
            sessions: toNumber(firstNonEmpty(platformStatsPayload?.messaging?.sessions, platformStatsPayload?.messagingSessions), 0),
            percentage: toNumber(firstNonEmpty(platformStatsPayload?.messaging?.percentage, platformStatsPayload?.messagingPercentage), 0),
            avgDuration: toNumber(firstNonEmpty(platformStatsPayload?.messaging?.avgDuration, platformStatsPayload?.messagingAvgDuration), 0),
          },
        };

        const usageRows = extractListPayload(usagePayload, ['usageDistribution', 'platformUsageDistribution', 'platformUsage', 'distribution']);
        const mappedUsage = usageRows.map((item, index) => {
          const label = normalizePlatform(firstNonEmpty(item.platform, item.platformType, item.name));
          const key = label === 'Video Call' ? 'videoCall' : label === 'Audio Call' ? 'audioCall' : 'messaging';
          return {
            key: String(firstNonEmpty(item.key, key, index)),
            label,
            sessions: toNumber(firstNonEmpty(item.sessions, item.totalSessions, item.count), 0),
            percentage: toNumber(firstNonEmpty(item.percentage, item.ratio, item.percent), 0),
            avgDuration: toNumber(firstNonEmpty(item.avgDuration, item.averageDuration, item.avgSessionDuration), 0),
          };
        });

        const usageFromStats = usageListFromStats(mappedPlatformStats);
        const usageFromSessions = usageListFromSessions(mappedSessions);
        const usageHasValues = mappedUsage.some((item) => item.sessions > 0 || item.percentage > 0);
        const statsHasValues = usageFromStats.some((item) => item.sessions > 0 || item.percentage > 0);
        const sessionsHasValues = usageFromSessions.some((item) => item.sessions > 0 || item.percentage > 0);

        if (usageHasValues) {
          setUsageDistribution(mappedUsage);
        } else if (statsHasValues) {
          setUsageDistribution(usageFromStats);
        } else if (sessionsHasValues) {
          setUsageDistribution(usageFromSessions);
        } else {
          setUsageDistribution(usageFromStats);
        }

        setRecentActivities(
          extractListPayload(activityPayload, ['recentActivities', 'recentActivity', 'activities'])
            .map(mapRecentActivityRow)
        );
        setOnlineDoctors(extractListPayload(doctorsPayload, ['doctors', 'onlineDoctors']).map(mapDoctorRow));
        const historyStatuses = ['completed', 'terminated', 'cancelled'];
        const mappedHistory = normalizePagedContent(sessionsPayload)
          .map(mapHistoryRow)
          .filter(session => historyStatuses.includes(session.status));
        setSessionHistory(mappedHistory);
      } catch (error) {
        setDataError(error?.message || 'Failed to load telemedicine data from backend.');
      } finally {
        setDataLoading(false);
      }
    };

    loadTelemedicineData();
  }, [
    selectedPeriod,
    reloadToken,
    firstNonEmpty,
    toNumber,
    toArray,
    normalizePagedContent,
    normalizePlatform,
    mapSessionRow,
    mapDoctorRow,
    mapHistoryRow,
    mapRecentActivityRow,
    extractListPayload,
    usageListFromStats,
    usageListFromSessions,
  ]);

  useEffect(() => {
    const loadPatients = async () => {
      setPatientsLoading(true);
      setPatientsError('');
      try {
        const payload = await patientApi.list({ page: 0, size: 200, sort: 'createdAt,desc' });
        const rows = normalizePagedContent(payload);
        setPatients(rows.map(mapPatientRow).filter((p) => p.id));
      } catch (error) {
        setPatientsError(error?.message || 'Failed to load patients.');
      } finally {
        setPatientsLoading(false);
      }
    };

    loadPatients();
  }, [mapPatientRow, normalizePagedContent]);

  const tabs = [
    { id: 'overview', label: 'Overview & Active Sessions', icon: Monitor },
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

  const handleScheduleSessionSubmit = async (sessionData) => {
    const platformMap = {
      video: 'VIDEO_CALL',
      audio: 'AUDIO_CALL',
      messaging: 'MESSAGING',
    };

    const sessionTypeMap = {
      consultation: 'CONSULTATION',
      'follow-up': 'FOLLOW_UP',
      emergency: 'EMERGENCY',
      prescription: 'PRESCRIPTION_RENEWAL',
      'test-review': 'TEST_RESULT_REVIEW',
    };

    const parseId = (value) => {
      if (value === undefined || value === null || value === '') return null;
      const direct = Number(value);
      if (Number.isFinite(direct)) return direct;
      const digits = String(value).match(/\d+/g);
      if (!digits) return null;
      const parsed = Number(digits.join(''));
      return Number.isFinite(parsed) ? parsed : null;
    };

    const start = new Date(`${sessionData.date}T${sessionData.time}:00`);
    const durationMins = Number(sessionData.duration) || 30;
    const end = new Date(start.getTime() + durationMins * 60 * 1000);

    const parsedPatientId = parseId(sessionData.patientId);
    if (!parsedPatientId) {
      window.alert('Please select a valid patient for this session.');
      return;
    }

    const selectedPatient = patients.find((patient) => String(patient.id) === String(sessionData.patientId));

    const payload = {
      patientId: parsedPatientId,
      patientName: sessionData.patientName || selectedPatient?.name,
      doctorId: parseId(sessionData.doctorId),
      doctorName: sessionData.doctorName,
      sessionType: sessionTypeMap[sessionData.sessionType] || String(sessionData.sessionType || '').toUpperCase(),
      platform: platformMap[sessionData.platform] || 'VIDEO_CALL',
      priority: String(sessionData.priority || 'NORMAL').toUpperCase(),
      startTime: Number.isNaN(start.getTime()) ? null : start.toISOString(),
      endTime: Number.isNaN(end.getTime()) ? null : end.toISOString(),
      duration: durationMins,
      symptoms: String(sessionData.symptoms || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      doctorNotes: sessionData.notes || '',
      notes: sessionData.notes || '',
    };

    try {
      await telemedicineService.createSession(payload);
      setReloadToken((prev) => prev + 1);
    } catch (error) {
      window.alert(error?.message || 'Failed to schedule session');
    }
  };

  const handleExportReports = () => {
    setShowExportModal(true);
  };

  const handleExportReportsSubmit = (reportData) => {
    console.log('Exporting report:', reportData);
    
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

  const handlePauseConfirm = async ({ sessionId, reason }) => {
    const target = activeSessions.find((session) => session.id === sessionId || session.backendId === sessionId);
    const backendId = target?.backendId;
    if (!backendId) return;

    try {
      await telemedicineService.pauseSession(backendId);
      setReloadToken((prev) => prev + 1);
    } catch (error) {
      window.alert(error?.message || reason || 'Failed to pause session');
    }
  };

  const handleResumeSession = async (sessionId) => {
    const target = activeSessions.find((session) => session.id === sessionId || session.backendId === sessionId);
    const backendId = target?.backendId;
    if (!backendId) return;

    try {
      await telemedicineService.resumeSession(backendId);
      setReloadToken((prev) => prev + 1);
    } catch (error) {
      window.alert(error?.message || 'Failed to resume session');
    }
  };

  const handleTerminateSession = (session) => {
    setSelectedSession(session);
    setShowTerminateModal(true);
  };

  const handleTerminateConfirm = async ({ sessionId, reason }) => {
    const target = activeSessions.find((session) => session.id === sessionId || session.backendId === sessionId);
    const backendId = target?.backendId;
    if (!backendId) return;

    try {
      await telemedicineService.terminateSession(backendId, { reason: reason || 'Terminated by admin' });
      setReloadToken((prev) => prev + 1);
    } catch (error) {
      window.alert(error?.message || 'Failed to terminate session');
    }
  };

  const handleViewDoctor = (doctor) => { setSelectedDoctor(doctor); setShowViewDoctorModal(true); };
  const handleMessageDoctor = (doctor) => { setSelectedDoctor(doctor); setShowMessageDoctorModal(true); };
  const handleEditDoctor = (doctor) => { setSelectedDoctor(doctor); setShowEditDoctorModal(true); };
  const handleEditDoctorSave = (updatedDoctor) => {
    setOnlineDoctors(prev => prev.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
  };

  const handleHistoryView = (session) => { setSelectedHistorySession(session); setShowHistoryViewModal(true); };
  const handleHistoryPrescription = (session) => { setSelectedHistorySession(session); setShowPrescriptionModal(true); };
  const handleHistoryDownload = (session) => { setSelectedHistorySession(session); setShowDownloadReportModal(true); };

  const renderOverview = () => (
    <div className="space-y-4">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Telemedicine Overview</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Active Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{platformOverview.activeSessions}</p>
              <div className="flex items-center mt-1">
                <Activity className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">Live now</span>
              </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <Video className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Online Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{platformOverview.onlineDoctors}</p>
              <div className="flex items-center mt-1">
                <UserCheck className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">of {platformOverview.totalDoctors} total</span>
              </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenueData.daily)}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">+{platformOverview.monthlyGrowth}%</span>
              </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Avg Session Time</p>
              <p className="text-2xl font-bold text-gray-900">{formatDuration(platformOverview.avgSessionDuration)}</p>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">Per session</span>
              </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <Timer className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Usage Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 p-4">
          <h3 className="text-base font-semibold mb-3">Platform Usage Distribution</h3>
          <div className="space-y-3">
            {usageDistribution.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center">
                  {item.label === 'Video Call' && <Video className="w-4 h-4 text-blue-600 mr-2" />}
                  {item.label === 'Audio Call' && <Phone className="w-4 h-4 text-blue-600 mr-2" />}
                  {item.label === 'Messaging' && <MessageSquare className="w-4 h-4 text-blue-600 mr-2" />}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-600">{item.sessions} sessions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{item.percentage}%</p>
                  <p className="text-xs text-gray-600">{formatDuration(item.avgDuration)} avg</p>
                </div>
              </div>
            ))}
            {usageDistribution.length === 0 && (
              <p className="text-sm text-gray-500">No platform usage data available.</p>
            )}
          </div>
        </div>
            <div className="bg-white border border-gray-200 p-4">
              <h3 className="text-base font-semibold mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivities.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2.5">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-gray-600">{formatIfDate(item.description)}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{formatIfDate(item.timeAgo)}</span>
                  </div>
                ))}
                {recentActivities.length === 0 && (
                  <p className="text-sm text-gray-500">No recent activity available.</p>
                )}
              </div>
            </div>
      </div>
    </div>

    
  );

  const renderActiveSessions = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Active Telemedicine Sessions</h3>
        <div className="flex items-center space-x-3">
          <select
            value={sessionFilter}
            onChange={(e) => setSessionFilter(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
          >
            <option value="all">All Sessions</option>
            <option value="video">Video Calls</option>
            <option value="audio">Audio Calls</option>
            <option value="high-priority">High Priority</option>
          </select>
          <button
            onClick={handleScheduleSession}
            className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
              <th className="px-3 py-2.5 text-left font-semibold">Patient</th>
              <th className="px-3 py-2.5 text-left font-semibold">Patient ID</th>
              <th className="px-3 py-2.5 text-left font-semibold">Doctor</th>
              <th className="px-3 py-2.5 text-left font-semibold">Specialty</th>
              <th className="px-3 py-2.5 text-center font-semibold">Platform</th>
              <th className="px-3 py-2.5 text-center font-semibold">Priority</th>
              <th className="px-3 py-2.5 text-center font-semibold">Status</th>
              <th className="px-3 py-2.5 text-center font-semibold">Duration</th>
              <th className="px-3 py-2.5 text-center font-semibold">Cost</th>
              <th className="px-3 py-2.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredActiveSessions.map((session, index) => {
              const isPaused = session.status === 'paused';
              const isEnded = ['terminated', 'completed', 'cancelled'].includes(session.status);
              const canJoin = !isEnded && Boolean(session.backendId) && session.patientId && session.patientId !== 'N/A';
              return (
                <tr
                  key={session.id}
                  className={`${
                    isEnded ? 'bg-red-50 opacity-60' :
                    isPaused ? 'bg-blue-50 opacity-70' : 'hover:bg-gray-50'
                  } ${index !== 0 ? 'border-t border-gray-200' : ''}`}
                >
                  <td className="px-3 py-2.5 font-semibold">{session.patient}</td>

                  <td className="px-3 py-2.5 text-xs text-gray-500">{session.patientId}</td>

                  <td className="px-3 py-2.5 font-semibold">{session.doctor}</td>

                  <td className="px-3 py-2.5 text-xs text-gray-600">{session.specialty}</td>

                  <td className="px-3 py-2.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {session.platform === 'Video Call' ? (
                        <Video className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Phone className="w-4 h-4 text-blue-600" />
                      )}
                      <span className="text-xs text-gray-600">{session.platform}</span>
                    </div>
                  </td>

                  <td className="px-3 py-2.5 text-center">
                    <span className={`text-xs font-medium ${getPriorityColor(session.priority)}`}>
                      {session.priority}
                    </span>
                  </td>

                  <td className="px-3 py-2.5 text-center">
                    {isEnded ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-red-700 text-xs font-semibold">
                        <Square className="w-3 h-3" />
                        {session.status}
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

                  <td className="px-3 py-2.5 text-center text-sm">
                    {formatDuration(session.duration)}
                  </td>

                  <td className="px-3 py-2.5 text-center font-semibold text-sm">
                    {formatCurrency(session.cost)}
                  </td>

                  <td className="px-3 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleViewSession(session)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {canJoin && (
                        <button
                          onClick={() => handleJoinLiveSession(session)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                          title="Join live call"
                          disabled={joiningSession}
                        >
                          <Video className="w-4 h-4" />
                        </button>
                      )}

                      {!isEnded && (
                        isPaused ? (
                          <button
                            onClick={() => handleResumeSession(session.backendId || session.id)}
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

  const renderOverviewAndActiveSessions = () => (
    <div className="space-y-6">
      {renderOverview()}
      {renderActiveSessions()}
      
    </div>
  );

  const renderOnlineDoctors = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Online Doctors</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
            />
          </div>
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
          >
            <option value="all">All Specialties</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Dermatology">Dermatology</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 uppercase text-xs">
            <tr>
              <th className="px-3 py-2.5 text-left font-semibold">Doctor</th>
              <th className="px-3 py-2.5 text-left font-semibold">Specialty</th>
              <th className="px-3 py-2.5 text-center font-semibold">Status</th>
              <th className="px-3 py-2.5 text-center font-semibold">Rating</th>
              <th className="px-3 py-2.5 text-center font-semibold">Experience</th>
              <th className="px-3 py-2.5 text-center font-semibold">Sessions Today</th>
              <th className="px-3 py-2.5 text-center font-semibold">Avg Duration</th>
              <th className="px-3 py-2.5 text-center font-semibold">Earnings</th>
              <th className="px-3 py-2.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {onlineDoctors
              .filter((doctor) => specialtyFilter === 'all' || doctor.specialty === specialtyFilter)
              .filter((doctor) => {
                if (!searchTerm.trim()) return true;
                const q = searchTerm.toLowerCase();
                return doctor.name.toLowerCase().includes(q) || doctor.specialty.toLowerCase().includes(q);
              })
              .map((doctor, index) => (
              <tr
                key={doctor.id}
                className={`hover:bg-gray-50 ${index !== 0 ? 'border-t border-gray-200' : ''}`}
              >
                <td className="px-3 py-2.5">
                  <div className="flex items-center">
                    <div className="relative flex-shrink-0">
                      {/* <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-8 h-8 rounded-full object-cover"
                      /> */}
                      {/* <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                        doctor.currentStatus === 'available' ? 'bg-green-500' :
                        doctor.currentStatus === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div> */}
                    </div>
                    <div className="ml-2">
                      <span className="font-semibold text-sm">{doctor.name}</span>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-2.5 text-xs text-gray-600">{doctor.specialty}</td>

                <td className="px-3 py-2.5 text-center">
                  <span className={`text-xs font-medium ${getStatusColor(doctor.currentStatus)}`}>
                    {doctor.currentStatus}
                  </span>
                </td>

                <td className="px-3 py-2.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3.5 h-3.5 text-blue-500" />
                    <span className="font-medium text-sm">{doctor.rating}</span>
                    <span className="text-xs text-gray-400">({doctor.totalSessions})</span>
                  </div>
                </td>

                <td className="px-3 py-2.5 text-center text-sm font-medium">
                  {doctor.experience} yrs
                </td>

                <td className="px-3 py-2.5 text-center text-sm font-medium">
                  {doctor.sessionsToday}
                </td>

                <td className="px-3 py-2.5 text-center text-sm">
                  {formatDuration(doctor.avgSessionDuration)}
                </td>

                <td className="px-3 py-2.5 text-center text-sm font-semibold">
                  {formatCurrency(doctor.earnings)}
                </td>

                <td className="px-3 py-2.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleViewDoctor(doctor)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMessageDoctor(doctor)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      title="Send Message"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditDoctor(doctor)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
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
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Session History</h3>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
          <button 
            onClick={handleExportReports}
            className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="border bg-white border-gray-200 p-4">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-100">
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
                        onClick={() => handleHistoryView(session)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleHistoryPrescription(session)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                        title="View Prescription"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      {session.status === 'completed' && (
                        <button
                          onClick={() => handleHistoryDownload(session)}
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Daily Revenue</p>
              <p className="text-xl font-bold ">{formatCurrency(revenueData.daily)}</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Weekly Revenue</p>
              <p className="text-xl font-bold">{formatCurrency(revenueData.weekly)}</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Monthly Revenue</p>
              <p className="text-xl font-bold ">{formatCurrency(revenueData.monthly)}</p>
            </div>
            <div className="w-10 h-10  flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-0">
        <h3 className="text-base font-semibold mb-4">Revenue by Specialty</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          <div className="bg-white border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100  uppercase text-xs">
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
                      {revenueData.monthly > 0 ? ((specialty.revenue / revenueData.monthly) * 100).toFixed(1) : '0.0'}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
          <div className="bg-white border border-gray-200 p-4">
            <h4 className="text-sm font-semibold mb-3">Revenue Analytics</h4>
            <ResponsiveContainer width="100%" height={260}>
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
    <div className="min-h-screen bg-gray-50 p-4 lg:p-5">
      <div>
        <div>
          {/* Header Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-0.5">Telemedicine Management</h1>
               
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
            {dataError && (
              <div className="mb-3 px-3 py-2 bg-red-50 border border-red-200 text-sm text-red-700">
                {dataError}
              </div>
            )}
            {dataLoading && (
              <div className="mb-3 px-3 py-2 bg-blue-50 border border-blue-200 text-sm text-blue-700">
                Loading telemedicine data from backend...
              </div>
            )}
            {patientsError && (
              <div className="mb-3 px-3 py-2 bg-yellow-50 border border-yellow-200 text-sm text-yellow-700">
                {patientsError}
              </div>
            )}
            {activeTab === 'overview' && renderOverviewAndActiveSessions()}
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
        patients={patients}
        doctors={onlineDoctors}
        patientsLoading={patientsLoading}
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
            ? ['terminated', 'completed', 'cancelled'].includes(selectedSession.status)
              ? 'ended'
              : selectedSession.status === 'paused'
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

      <ViewDoctorProfileModal
        isOpen={showViewDoctorModal}
        onClose={() => { setShowViewDoctorModal(false); setSelectedDoctor(null); }}
        doctor={selectedDoctor}
      />

      <MessageDoctorModal
        isOpen={showMessageDoctorModal}
        onClose={() => { setShowMessageDoctorModal(false); setSelectedDoctor(null); }}
        doctor={selectedDoctor}
        onConfirm={() => {}}
      />

      <EditDoctorModal
        isOpen={showEditDoctorModal}
        onClose={() => { setShowEditDoctorModal(false); setSelectedDoctor(null); }}
        doctor={selectedDoctor}
        onSave={handleEditDoctorSave}
      />

      <ViewHistorySessionModal
        isOpen={showHistoryViewModal}
        onClose={() => { setShowHistoryViewModal(false); setSelectedHistorySession(null); }}
        session={selectedHistorySession}
      />

      <ViewPrescriptionModal
        isOpen={showPrescriptionModal}
        onClose={() => { setShowPrescriptionModal(false); setSelectedHistorySession(null); }}
        session={selectedHistorySession}
      />

      <DownloadReportModal
        isOpen={showDownloadReportModal}
        onClose={() => { setShowDownloadReportModal(false); setSelectedHistorySession(null); }}
        session={selectedHistorySession}
      />

      <JitsiCallModal
        isOpen={showJitsiCall}
        onClose={() => {
          setShowJitsiCall(false);
          setJitsiSession(null);
        }}
        roomName={jitsiSession?.sessionId ?? jitsiSession?.id}
        userInfo={{ displayName: 'Doctor / Admin' }}
        title={
          jitsiSession
            ? `${jitsiSession.patient} · ${jitsiSession.doctor}`
            : ''
        }
      />
    </div>
  );
};

export default TelemedicineManagement;