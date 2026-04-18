import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  Calendar,
  Clock,
  Phone,
  FileText,
  Plus,
  X,
  ChevronRight,
  Shield,
  CheckCircle,
  AlertCircle,
  Mail,
  Download,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import JitsiCallModal from '../../../Components/JitsiCallModal';
import { telemedicineService } from '../../../Services/domain/telemedicineService';
import { userApi } from '../../../API/endpoints/userApi';
import { patientApi } from '../../../API/endpoints/patientApi';
import { useAuth } from '../../../hooks/useAuth';

// ─── helpers ────────────────────────────────────────────────────────────────

const formatDateLong = (raw) => {
  if (!raw) return '—';
  const d = new Date(raw);
  return isNaN(d) ? '—' : d.toLocaleDateString('en-KE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
};

const formatDateShort = (raw) => {
  if (!raw) return '—';
  const d = new Date(raw);
  return isNaN(d) ? '—' : d.toLocaleDateString('en-KE');
};

const formatTime = (raw) => {
  if (!raw) return '—';
  const d = new Date(raw);
  return isNaN(d) ? '—' : d.toLocaleTimeString('en-KE', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
};

const extractPatientId = (payload) => {
  const root = payload?.data ?? payload?.profile ?? payload;
  return (
    root?.patientId ??
    root?.patient_id ??
    root?.patient?.id ??
    root?.patient?.patientId ??
    root?.patientProfile?.id ??
    root?.patientProfile?.patientId ??
    null
  );
};

const extractPatientName = (payload) => {
  const root = payload?.data ?? payload?.profile ?? payload;
  const patient = root?.patient ?? root?.patientProfile ?? root;

  const fullName = String(patient?.fullName ?? patient?.name ?? '').trim();
  if (fullName) return fullName;

  const composed = [patient?.firstName, patient?.middleName, patient?.lastName]
    .map((part) => String(part ?? '').trim())
    .filter(Boolean)
    .join(' ')
    .trim();

  return composed || String(root?.username ?? '').trim() || '';
};

const parseBackendId = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (value === undefined || value === null || value === '') return null;
  const direct = Number(value);
  if (Number.isFinite(direct)) return direct;
  const digits = String(value).match(/\d+/g);
  if (!digits) return null;
  const parsed = Number(digits.join(''));
  return Number.isFinite(parsed) ? parsed : null;
};

const getApiErrorMessage = (err, fallback) => {
  const payload = err?.payload;
  const message = typeof payload?.message === 'string' ? payload.message.trim() : '';
  if (message) return message;

  const structured = payload?.errors ?? payload?.validationErrors;
  if (Array.isArray(structured) && structured.length > 0) {
    return String(structured[0]?.message ?? structured[0]).trim() || fallback;
  }
  if (structured && typeof structured === 'object') {
    const first = Object.values(structured).find((value) => {
      if (value === undefined || value === null) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    });
    if (Array.isArray(first)) {
      const firstItem = first[0];
      if (typeof firstItem === 'string' && firstItem.trim()) return firstItem.trim();
      if (firstItem && typeof firstItem?.message === 'string' && firstItem.message.trim()) {
        return firstItem.message.trim();
      }
    }
    if (typeof first === 'string' && first.trim()) return first.trim();
    if (first && typeof first?.message === 'string' && first.message.trim()) return first.message.trim();
  }

  if (typeof err?.message === 'string' && err.message.trim() && err.message !== 'Bad Request') {
    return err.message.trim();
  }
  return fallback;
};


const normalizeSession = (raw) => {
  const startRaw = raw.startTime ?? raw.scheduledStart ?? raw.createdAt ?? null;
  const endRaw   = raw.endTime   ?? raw.scheduledEnd   ?? null;

  const durationMin = (() => {
    if (raw.duration)         return raw.duration;
    if (raw.plannedDuration)  return raw.plannedDuration;
    if (startRaw && endRaw) {
      const ms = new Date(endRaw) - new Date(startRaw);
      return ms > 0 ? Math.round(ms / 60000) : null;
    }
    return null;
  })();

  const statusRaw = String(raw.statusLabel ?? raw.status ?? 'scheduled').toLowerCase();
  const isPast    = ['completed', 'cancelled', 'canceled', 'terminated'].includes(statusRaw);

  return {
    id:               raw.id,
    sessionId:        raw.sessionId ?? `TM-${raw.id}`,
    bookingRef:       raw.sessionId ?? `TM-${raw.id}`,
    doctor:           raw.doctorName      ?? raw.doctor      ?? 'Assigned Doctor',
    doctorEmail:      raw.doctorEmail     ?? '',
    doctorPhone:      raw.doctorPhone     ?? '',
    specialty:        raw.doctorSpecialty ?? raw.specialty   ?? 'General',
    startRaw,
    dateShort:        formatDateShort(startRaw),
    dateLong:         formatDateLong(startRaw),
    timeLabel:        formatTime(startRaw),
    duration:         durationMin ? `${durationMin} min` : '—',
    reason:           raw.chiefComplaint  ?? raw.reason      ?? '—',
    instructions:     raw.doctorNotes     ?? raw.notes       ?? null,
    diagnosis:        raw.diagnosis       ?? null,
    hasPrescription:  Boolean(raw.prescription),
    hasRecording:     Boolean(raw.recordingUrl),
    recordingUrl:     raw.recordingUrl    ?? null,

    status:           statusRaw,
    isPast,

    // meeting — generated by backend's generateMeetingLink()
    // e.g. "https://meet.jit.si/medilink-TM-001"
    meetingLink:      raw.meetingLink     ?? null,

    // financial
    cost:             raw.actualCost      ?? raw.cost        ?? null,
    paymentStatus:    raw.paymentStatus   ?? 'PENDING',

    // feedback
    rating:           raw.rating          ?? null,
    feedback:         raw.feedback        ?? null,
  };
};

// ─── StatusBadge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const colourMap = {
    confirmed:  'text-green-700',
    active:     'text-green-700',
    pending:    'text-yellow-700',
    scheduled:  'text-blue-700',
    completed:  'text-gray-500',
    cancelled:  'text-red-600',
    canceled:   'text-red-600',
    terminated: 'text-red-600',
  };
  return (
    <span className={`text-xs font-semibold whitespace-nowrap ${colourMap[status] ?? 'text-gray-600'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ─── component ───────────────────────────────────────────────────────────────

const Telemedicine = () => {
  // user shape (from Login.jsx): { id, username, role, token }
  const { user } = useAuth();

  const [patientId, setPatientId]     = useState(null);
  const [patientName, setPatientName] = useState('');
  const [profileErr, setProfileErr]   = useState('');

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        const profile = await userApi.me();
        let resolved = extractPatientId(profile);
        if (!resolved) {
          const patientProfile = await patientApi.me();
          resolved = extractPatientId(patientProfile) ?? patientProfile?.id ?? null;
          setPatientName(extractPatientName(patientProfile));
        } else {
          setPatientName(extractPatientName(profile));
        }
        if (!resolved) {
          setProfileErr('Could not determine your patient ID. Please contact support.');
          setLoading(false);
        } else {
          setPatientId(resolved);
        }
      } catch (err) {
        try {
          const patientProfile = await patientApi.me();
          const resolved = extractPatientId(patientProfile) ?? patientProfile?.id ?? null;
          if (resolved) {
            setPatientId(resolved);
            setPatientName(extractPatientName(patientProfile));
            setProfileErr('');
            return;
          }
        } catch {
          // ignore and show the original profile error below
        }
        setProfileErr(err?.message ?? 'Failed to load your profile.');
        setLoading(false);
      }
    })();
  }, [user?.id]);

  // ── session data ──────────────────────────────────────────────────────────
  const [upcoming, setUpcoming]       = useState([]);
  const [past, setPast]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [dataError, setDataError]     = useState('');
  const [reloadToken, setReloadToken] = useState(0);

 
  useEffect(() => {
    (async () => {
      if (!patientId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setDataError('');
      try {
        
        const payload = await telemedicineService.getSessionsByPatient(patientId, {
          page: 0,
          size: 100,
          sort: 'startTime,desc',
        });

        
        const rows = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.content)
          ? payload.content
          : [];

        const sessions = rows.map(normalizeSession);
        setUpcoming(sessions.filter((s) => !s.isPast));
        setPast(sessions.filter((s) => s.isPast));
      } catch (err) {
        setDataError(err?.message ?? 'Failed to load consultations. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, [patientId, reloadToken]);

  
  const [activeTab, setActiveTab]               = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selected, setSelected]                 = useState(null);
  const [submitting, setSubmitting]             = useState(false);

 
  const [showJitsiCall, setShowJitsiCall] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    specialty: '', date: '', time: '', reason: '', insurance: '',
  });

  const handleBookingFormChange = (field, value) =>
    setBookingForm((prev) => ({ ...prev, [field]: value }));

  

  const handleJoinCall = (consultation) => {
    setSelected(consultation);
    setShowJitsiCall(true);
  };

  const handleViewDetails = (consultation) => {
    setSelected(consultation);
    setShowDetailsModal(true);
  };

  const handleBookConsultation = async (e) => {
    e.preventDefault();
    if (!patientId) {
      alert('Your patient profile could not be loaded. Please refresh and try again.');
      return;
    }
    setSubmitting(true);
    const durationMins = 30;

    // "HH:MM" value from the <select> + date → ISO string
    const schedule = (() => {
      try {
        const start = new Date(`${bookingForm.date}T${bookingForm.time}:00`);
        if (isNaN(start.getTime())) return null;
        const end = new Date(start.getTime() + durationMins * 60 * 1000);
        return {
          startTime: start.toISOString(),
          endTime: end.toISOString(),
        };
      } catch {
        return null;
      }
    })();

    if (!schedule) {
      alert('Invalid date or time. Please check your selection.');
      setSubmitting(false);
      return;
    }

    try {
      const normalizedPatientId = parseBackendId(patientId) ?? patientId;
      const resolvedPatientName = patientName || user?.username || 'Patient';

      await telemedicineService.createSession({
        patientId:       normalizedPatientId,
        patientName:     resolvedPatientName,
        sessionType:     'CONSULTATION',
        platform:        'VIDEO_CALL',
        priority:        'NORMAL',
        startTime:       schedule.startTime,
        endTime:         schedule.endTime,
        duration:        durationMins,
        plannedDuration: durationMins,
        chiefComplaint:  bookingForm.reason,
        reason:          bookingForm.reason,
        notes:           bookingForm.reason,
        doctorNotes:     '',
        cost:            1500,
        insuranceProvider: bookingForm.insurance ? bookingForm.insurance.toUpperCase() : undefined,
        symptoms:        [bookingForm.specialty].filter(Boolean),
      });

      setBookingForm({ specialty: '', date: '', time: '', reason: '', insurance: '' });
      setShowBookingModal(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
      setReloadToken((t) => t + 1);   // re-fetch the session list
    } catch (err) {
      alert(getApiErrorMessage(err, 'Failed to book consultation. Please try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  const canJoin = (s) =>
    ['confirmed', 'active', 'scheduled'].includes(s.status) && Boolean(s.meetingLink);

  return (
    <div className="space-y-6">

      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border-2 border-green-500 rounded-lg shadow-lg p-4 max-w-md">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-green-900">Consultation Booked!</h3>
              <p className="text-sm text-green-700 mt-1">
                Your video consultation has been scheduled. You'll receive a confirmation email within 2 hours.
              </p>
            </div>
            <button onClick={() => setShowSuccessMessage(false)} className="text-green-600 hover:text-green-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">Telemedicine</h1>
        <button
          onClick={() => setReloadToken((t) => t + 1)}
          disabled={loading}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* ── Security notice ───────────────────────────────────────────────── */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900">Secure & Private</h3>
            <p className="text-sm text-blue-700 mt-1">
              All video consultations are end-to-end encrypted. Allow camera and microphone
              access when prompted.
            </p>
          </div>
        </div>
      </div>

      {/* ── Error banners ─────────────────────────────────────────────────── */}
      {profileErr && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {profileErr}
        </div>
      )}
      {dataError && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {dataError}
          <button
            onClick={() => setReloadToken((t) => t + 1)}
            className="ml-auto underline text-red-600 hover:text-red-800"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Quick actions ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowBookingModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Book Consultation
        </button>
        <Link
          to="/client/patient/appointments"
          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded hover:border-blue-600 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 text-sm"
        >
          <Calendar className="w-4 h-4" />
          All Appointments
        </Link>
      </div>

      {/* ── Tabs ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { key: 'upcoming', label: 'Upcoming',           count: upcoming.length },
            { key: 'past',     label: 'Past Consultations', count: past.length },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {label} ({loading ? '…' : count})
            </button>
          ))}
        </nav>
      </div>

      {/* ── Session list ──────────────────────────────────────────────────── */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-500">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading consultations…
        </div>
      ) : activeTab === 'upcoming' ? (
        upcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {upcoming.map((c) => (
              <div
                key={c.id}
                className="bg-white shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">{c.doctor}</h3>
                    <p className="text-sm text-gray-600 truncate">{c.specialty}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>

                <div className="space-y-1 mb-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{c.dateShort}</span>
                    <Clock className="w-3.5 h-3.5 ml-2" />
                    <span>{c.timeLabel} ({c.duration})</span>
                  </div>
                  <p className="text-gray-600 line-clamp-1">
                    <span className="font-medium">Reason:</span> {c.reason}
                  </p>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  {canJoin(c) && (
                    <button
                      onClick={() => handleJoinCall(c)}
                      className="flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <Video className="w-3.5 h-3.5" />
                      Join
                    </button>
                  )}
                  <button
                    onClick={() => handleViewDetails(c)}
                    className="flex items-center justify-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
                  >
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Consultations</h3>
            <p className="text-gray-600 mb-6">Schedule a video consultation with a healthcare provider</p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" /><span>Book Consultation</span>
            </button>
          </div>
        )
      ) : (
        past.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {past.map((c) => (
              <div key={c.id} className="bg-white shadow-sm border border-gray-200 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">{c.doctor}</h3>
                    <p className="text-sm text-gray-600 truncate">{c.specialty}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>

                <div className="space-y-1 mb-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{c.dateShort}</span>
                    <Clock className="w-3.5 h-3.5 ml-2" />
                    <span>{c.timeLabel}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {c.hasPrescription && (
                      <span className="flex items-center gap-1 text-sm text-blue-600">
                        <FileText className="w-3.5 h-3.5" /> Prescription
                      </span>
                    )}
                    {c.hasRecording && (
                      <span className="flex items-center gap-1 text-sm text-blue-600">
                        <Video className="w-3.5 h-3.5" /> Recording
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleViewDetails(c)}
                    className="flex items-center justify-center gap-1 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
                  >
                    <FileText className="w-3.5 h-3.5" /> Summary
                  </button>
                  {c.hasPrescription && (
                    <Link
                      to="/client/patient/prescriptions"
                      className="flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors text-sm"
                    >
                      Prescription
                    </Link>
                  )}
                  {c.hasRecording && c.recordingUrl && (
                    <a
                      href={c.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Download className="w-3.5 h-3.5" /> Recording
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Past Consultations</h3>
            <p className="text-gray-600">Your consultation history will appear here</p>
          </div>
        )
      )}

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">How Video Consultations Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: 1, title: 'Book Consultation', body: 'Choose your preferred specialty and schedule a convenient time.' },
            { step: 2, title: 'Join Video Call',    body: "Click \"Join\" when it's time and connect with your doctor instantly." },
            { step: 3, title: 'Get Prescription',   body: 'Receive prescriptions and follow-up instructions digitally.' },
          ].map(({ step, title, body }) => (
            <div key={step} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-3">
                <span className="text-lg font-bold">{step}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Booking Modal ─────────────────────────────────────────────────── */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-stretch sm:items-center sm:justify-center p-0 sm:p-4 overflow-y-auto">
          <div className="bg-white w-full h-full sm:h-auto sm:rounded-lg sm:max-w-2xl sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Book Video Consultation</h2>
              <button onClick={() => setShowBookingModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form className="p-4 sm:p-6 space-y-5 sm:space-y-6" onSubmit={handleBookConsultation}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Specialty</label>
                <select
                  className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                  value={bookingForm.specialty}
                  onChange={(e) => handleBookingFormChange('specialty', e.target.value)}
                  required
                >
                  <option value="">Choose a specialty…</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Cardiology">Cardiologist</option>
                  <option value="Dermatology">Dermatologist</option>
                  <option value="Pediatrics">Pediatrician</option>
                  <option value="Mental Health">Mental Health</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                    value={bookingForm.date}
                    onChange={(e) => handleBookingFormChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                  <select
                    className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                    value={bookingForm.time}
                    onChange={(e) => handleBookingFormChange('time', e.target.value)}
                    required
                  >
                    <option value="">Select time…</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
                <label className="flex items-center p-4 border-2 border-blue-600 bg-blue-50 rounded-lg cursor-pointer">
                  <input type="radio" name="consultationType" value="video" defaultChecked readOnly className="w-4 h-4 text-blue-600" />
                  <Video className="w-5 h-5 text-blue-600 ml-3" />
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">Video Consultation</span>
                    <p className="text-sm text-gray-600">Face-to-face consultation via video call</p>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Consultation</label>
                <textarea
                  rows="4"
                  placeholder="Please describe your symptoms or reason for consultation…"
                  className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                  value={bookingForm.reason}
                  onChange={(e) => handleBookingFormChange('reason', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Coverage</label>
                <select
                  className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                  value={bookingForm.insurance}
                  onChange={(e) => handleBookingFormChange('insurance', e.target.value)}
                  required
                >
                  <option value="">Select insurance…</option>
                  <option value="nhif">NHIF</option>
                  <option value="sha">SHA</option>
                  <option value="private">Private Insurance</option>
                  <option value="none">Self Pay</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Consultation Fee: KES 1,500</p>
                    <p className="text-xs text-blue-700 mt-1">Subject to insurance coverage. Confirmation within 2 hours.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? 'Booking…' : 'Book Consultation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Details Modal ─────────────────────────────────────────────────── */}
      {showDetailsModal && selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-stretch sm:items-center sm:justify-center z-50 p-0 sm:p-4 overflow-y-auto">
          <div className="bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Consultation Details</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">

              {/* Booking ref */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700 font-medium">Booking Reference</p>
                <p className="text-lg font-bold text-blue-900">{selected.bookingRef}</p>
              </div>

              {/* Provider */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Healthcare Provider</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="font-semibold text-gray-900">{selected.doctor}</p>
                  <p className="text-sm text-gray-600">{selected.specialty}</p>
                  {selected.doctorPhone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-blue-600" />{selected.doctorPhone}
                    </div>
                  )}
                  {selected.doctorEmail && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-blue-600" />{selected.doctorEmail}
                    </div>
                  )}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Consultation Information</h3>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-gray-700">Date</p>
                    </div>
                    <p className="text-gray-900">{selected.dateLong}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-gray-700">Time</p>
                    </div>
                    <p className="text-gray-900">
                      {selected.timeLabel}
                      {selected.duration !== '—' && ` (${selected.duration})`}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 sm:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Video className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-gray-700">Type</p>
                    </div>
                    <p className="text-gray-900">Video Consultation</p>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Reason for Consultation</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900">{selected.reason}</p>
                </div>
              </div>

              {/* Diagnosis — only shown after session completes */}
              {selected.diagnosis && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Diagnosis</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900">{selected.diagnosis}</p>
                  </div>
                </div>
              )}

              {/* Instructions */}
              {selected.instructions && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes / Instructions</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-900">{selected.instructions}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Status</h3>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <StatusBadge status={selected.status} />
                </div>
              </div>

              {/* Rating (if already submitted) */}
              {selected.rating && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Your Rating</h3>
                  <p className="text-lg">
                    <span className="text-yellow-500">{'★'.repeat(selected.rating)}</span>
                    <span className="text-gray-300">{'★'.repeat(5 - selected.rating)}</span>
                  </p>
                  {selected.feedback && (
                    <p className="text-sm text-gray-600 mt-1 italic">"{selected.feedback}"</p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                {canJoin(selected) && (
                  <button
                    onClick={() => { setShowDetailsModal(false); handleJoinCall(selected); }}
                    className="w-full sm:flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4" /> Join Video Call
                  </button>
                )}
                {selected.hasPrescription && (
                  <Link
                    to="/client/patient/prescriptions"
                    className="w-full sm:flex-1 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" /> View Prescription
                  </Link>
                )}
                {selected.hasRecording && selected.recordingUrl && (
                  <a
                    href={selected.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download Recording
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Jitsi embedded call ───────────────────────────────────────────── */}
      {/*
        roomName = bookingRef = sessionId (e.g. "TM-001")
        The admin/doctor side also uses sessionId as roomName, so both
        parties land in the same Jitsi room automatically.
      */}
      <JitsiCallModal
        isOpen={showJitsiCall}
        onClose={() => {
          setShowJitsiCall(false);
          setSelected(null);
        }}
        roomName={selected?.bookingRef ?? String(selected?.id ?? '')}
        userInfo={{
          displayName: user?.username ?? 'Patient',
          email:       '',   // not stored in auth user shape
        }}
        title={
          selected
            ? `${selected.doctor} · ${selected.specialty}`
            : 'Video Consultation'
        }
      />
    </div>
  );
};

export default Telemedicine;