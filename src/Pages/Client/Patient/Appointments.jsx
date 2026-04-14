import { useCallback, useEffect, useState } from 'react';
import {
  Calendar, Clock, MapPin, Video, User, Plus, X,
  Phone, Mail, AlertCircle, CheckCircle, ExternalLink, Download
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { appointmentApi } from '../../../API/endpoints/appointmentApi.js';
import { patientApi } from '../../../API/endpoints/patientApi.js';

const EMPTY_APPOINTMENTS = { upcoming: [], past: [], cancelled: [] };
const DEFAULT_MEETING_LINK =
  'https://app.zoom.us/wc/88034100679/start?fromPWA=1&pwd=pVmy08XQyh0Ef3gWCFLCCikrXuW6o1.1';

// ─── normalizers ─────────────────────────────────────────────────────────────

function normalizeType(value) {
  const text = String(value || '').toUpperCase();
  if (text === 'TELEMEDICINE' || text === 'TELEHEALTH') return 'Telemedicine';
  if (text === 'HOME_VISIT') return 'Home Visit';
  return 'Clinic Visit';
}

function normalizeStatus(value) {
  const text = String(value || '').toUpperCase();
  if (text === 'COMPLETED') return 'completed';
  if (text === 'CANCELED' || text === 'CANCELLED') return 'cancelled';
  if (text === 'SCHEDULED') return 'pending';
  return 'confirmed'; // CONFIRMED, CHECKED_IN, IN_PROGRESS
}

function formatDate(iso) {
  const ts = Date.parse(iso || '');
  if (Number.isNaN(ts)) return new Date().toISOString().slice(0, 10);
  return new Date(ts).toISOString().slice(0, 10);
}

function formatTime(iso) {
  const ts = Date.parse(iso || '');
  if (Number.isNaN(ts)) return '09:00 AM';
  return new Date(ts).toLocaleTimeString('en-KE', { hour: 'numeric', minute: '2-digit' });
}

/** Map a single AppointmentResponse → UI shape */
function mapToUi(row) {
  // Support both raw backend responses and already-mapped uiMapper objects
  const rawType = row.type || row.appointmentType || '';
  const rawStatus = row.status || '';
  const scheduledAt = row.scheduledStart || row.scheduledAt || row.date || '';
  const providerRole = String(row.providerRole || '').toUpperCase();
  const type = normalizeType(rawType);

  return {
    id: row.id,
    type,
    doctor: row.providerName || row.doctor || 'Assigned Provider',
    specialty: providerRole === 'CHW' ? 'Community Health Worker' : 'General Practitioner',
    date: formatDate(scheduledAt),
    time: formatTime(scheduledAt),
    location: row.location || row.facility || 'Health Facility',
    status: normalizeStatus(rawStatus),
    reason: row.reason || 'General consultation',
    bookingRef: row.appointmentCode
      ? `APT-${row.appointmentCode}`
      : `APT-${row.id}`,
    meetingLink: type === 'Telemedicine' ? DEFAULT_MEETING_LINK : undefined,
    instructions: row.notes || undefined,
  };
}

function bucketAppointments(rows = []) {
  const mapped = rows.map(mapToUi);
  return {
    upcoming: mapped.filter((a) => a.status === 'pending' || a.status === 'confirmed'),
    past:     mapped.filter((a) => a.status === 'completed'),
    cancelled:mapped.filter((a) => a.status === 'cancelled'),
  };
}

function normalizeRows(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.appointments)) return payload.appointments;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (payload?.data && typeof payload.data === 'object') return normalizeRows(payload.data);
  return [];
}

/** Build AppointmentRequest body for POST /api/appointments */
function buildCreatePayload(form, bookingType, patientId) {
  const slotMap = {
    'Morning (8AM - 12PM)':  '09:00',
    'Afternoon (12PM - 5PM)':'14:00',
    'Evening (5PM - 8PM)':   '18:00',
  };
  const hourMinute = slotMap[form.time] ?? '09:00';
  const start = new Date(`${form.date}T${hourMinute}:00`);
  if (Number.isNaN(start.getTime())) throw new Error('Invalid date/time');
  const end = new Date(start.getTime() + 30 * 60 * 1000);

  const typeMap = { telemedicine: 'TELEMEDICINE', home: 'HOME_VISIT', clinic: 'CONSULTATION' };
  const roleMap = { telemedicine: 'DOCTOR',       home: 'CHW',        clinic: 'DOCTOR' };

  return {
    patientId,
    type:         typeMap[bookingType] ?? 'CONSULTATION',
    providerRole: roleMap[bookingType] ?? 'DOCTOR',
    location:
      bookingType === 'telemedicine' ? 'Video Consultation'
      : bookingType === 'home'       ? form.address || 'Patient Home'
      : form.location,
    reason:        form.reason,
    notes:         `Insurance: ${form.insurance}`,
    scheduledStart: start.toISOString(),
    scheduledEnd:   end.toISOString(),
    status:        'SCHEDULED',
  };
}

// ─── component ────────────────────────────────────────────────────────────────

const Appointments = () => {
  const { user } = useAuth();

  const [activeTab,          setActiveTab]          = useState('upcoming');
  const [showBookingModal,   setShowBookingModal]   = useState(false);
  const [showDetailsModal,   setShowDetailsModal]   = useState(false);
  const [showCancelModal,    setShowCancelModal]    = useState(false);
  const [showJoinCallModal,  setShowJoinCallModal]  = useState(false);
  const [selectedAppointment,setSelectedAppointment]= useState(null);
  const [bookingType,        setBookingType]        = useState('clinic');
  const [appointments,       setAppointments]       = useState(EMPTY_APPOINTMENTS);
  const [patientId,          setPatientId]          = useState(null);
  const [loadingAppointments,setLoadingAppointments]= useState(true);
  const [loadError,          setLoadError]          = useState('');
  const [bookingError,       setBookingError]       = useState('');
  const [bookingForm,        setBookingForm]        = useState({
    specialty: 'General Practitioner',
    date:      new Date().toISOString().split('T')[0],
    time:      'Morning (8AM - 12PM)',
    location:  'Nairobi Health Center',
    address:   '',
    reason:    '',
    insurance: 'NHIF',
  });

  // Lock body scroll when any modal is open
  const isAnyModalOpen = showBookingModal || showDetailsModal || showCancelModal || showJoinCallModal;
  useEffect(() => {
    if (!isAnyModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isAnyModalOpen]);

  // ── data fetching ─────────────────────────────────────────────────────────

  const loadAppointments = useCallback(async () => {
    if (!user?.id) return;
    setLoadingAppointments(true);
    setLoadError('');
    try {
      const resolvedPatientId = patientId || (await patientApi.me())?.id;
      if (!resolvedPatientId) {
        throw new Error('Patient profile not found for this account.');
      }
      if (!patientId) setPatientId(resolvedPatientId);

      const data = await appointmentApi.listByPatient(resolvedPatientId);
      setAppointments(bucketAppointments(normalizeRows(data)));
    } catch (err) {
      setAppointments(EMPTY_APPOINTMENTS);
      setLoadError(err?.message || 'Could not load appointments.');
    } finally {
      setLoadingAppointments(false);
    }
  }, [user?.id, patientId]);

  useEffect(() => { loadAppointments(); }, [loadAppointments]);

  // ── actions ───────────────────────────────────────────────────────────────

  const handleViewDetails       = (a) => { setSelectedAppointment(a); setShowDetailsModal(true);  };
  const handleCancelAppointment = (a) => { setSelectedAppointment(a); setShowCancelModal(true);   };
  const handleJoinCall          = (a) => { setSelectedAppointment(a); setShowJoinCallModal(true); };

  const confirmCancellation = async () => {
    if (!selectedAppointment) return;
    try {
      await appointmentApi.cancel(selectedAppointment.id, { reason: 'Cancelled by patient' });
      await loadAppointments();
      setShowCancelModal(false);
      setActiveTab('cancelled');
    } catch (err) {
      window.alert(err?.message || 'Could not cancel appointment');
    }
  };

  const joinVideoCall = () => {
    if (selectedAppointment?.meetingLink) {
      window.open(selectedAppointment.meetingLink, '_blank');
      setShowJoinCallModal(false);
    }
  };

  const resetBookingForm = (type = 'clinic') => {
    setBookingForm({
      specialty: 'General Practitioner',
      date:      new Date().toISOString().split('T')[0],
      time:      'Morning (8AM - 12PM)',
      location:  type === 'telemedicine' ? 'Video Consultation' : 'Nairobi Health Center',
      address:   '',
      reason:    '',
      insurance: 'NHIF',
    });
    setBookingError('');
  };

  const handleBookingTypeChange = (type) => {
    setBookingType(type);
    setBookingForm((prev) => ({
      ...prev,
      location: type === 'telemedicine' ? 'Video Consultation' : prev.location || 'Nairobi Health Center',
      address:  type === 'home' ? prev.address : '',
    }));
  };

  const handleBookAppointment = async () => {
    if (!bookingForm.date || !bookingForm.reason.trim()) {
      setBookingError('Please provide a date and reason for visit.');
      return;
    }
    setBookingError('');
    try {
      const resolvedPatientId = patientId || (await patientApi.me())?.id;
      if (!resolvedPatientId) {
        throw new Error('Patient profile not found for this account.');
      }
      if (!patientId) setPatientId(resolvedPatientId);

      const payload = buildCreatePayload(bookingForm, bookingType, resolvedPatientId);
      await appointmentApi.create(payload);
      await loadAppointments();
      setShowBookingModal(false);
      setActiveTab('upcoming');
      resetBookingForm(bookingType);
    } catch (err) {
      setBookingError(err?.message || 'Could not book appointment. Please try again.');
    }
  };

  // ── ui helpers ────────────────────────────────────────────────────────────

  const getStatusClasses = (status) => {
    if (status === 'confirmed' || status === 'completed') return 'text-green-700';
    if (status === 'pending')   return 'text-yellow-700';
    if (status === 'cancelled') return 'text-red-700';
    return 'text-gray-700';
  };

  const getTypeIcon = (type) => {
    if (type === 'Telemedicine') return Video;
    if (type === 'Home Visit')   return User;
    return MapPin;
  };

  const mapAppointmentTypeToBookingType = (type) => {
    if (type === 'Telemedicine') return 'telemedicine';
    if (type === 'Home Visit')   return 'home';
    return 'clinic';
  };

  const renderAppointmentActions = (appointment) => {
    if (activeTab === 'past' || activeTab === 'cancelled') {
      return (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleViewDetails(appointment)}
            className="px-3 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Details
          </button>
        </div>
      );
    }
    if (activeTab !== 'upcoming') return null;
    return (
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() =>
            appointment.type === 'Telemedicine'
              ? handleJoinCall(appointment)
              : handleViewDetails(appointment)
          }
          className="px-3 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {appointment.type === 'Telemedicine' ? 'Join Call' : 'Details'}
        </button>
        <button
          onClick={() => handleCancelAppointment(appointment)}
          className="px-3 py-1.5 text-xs sm:text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  };

  // ── modals ────────────────────────────────────────────────────────────────

  const modalOverlayClasses =
    'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-stretch sm:items-center sm:justify-center p-0 sm:p-6 overflow-y-auto';

  const DetailsModal = () => {
    const status      = selectedAppointment?.status;
    const isActive    = status === 'confirmed' || status === 'pending';
    const isCompleted = status === 'completed';
    const isCancelled = status === 'cancelled';

    const statusPillClass =
      isActive || isCompleted ? 'bg-green-50 text-green-700'
      : status === 'pending'  ? 'bg-yellow-50 text-yellow-700'
      : isCancelled           ? 'bg-red-50 text-red-700'
      : 'bg-gray-50 text-gray-700';

    return (
      <div className={modalOverlayClasses}>
        <div className="bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
            <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700 font-medium">Booking Reference</p>
              <p className="text-lg font-bold text-blue-900">{selectedAppointment?.bookingRef}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Healthcare Provider</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-gray-900">{selectedAppointment?.doctor}</p>
                <p className="text-sm text-gray-600">{selectedAppointment?.specialty}</p>
                {selectedAppointment?.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>{selectedAppointment.phone}</span>
                  </div>
                )}
                {selectedAppointment?.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>{selectedAppointment.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Appointment Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-medium text-gray-700">Date</p>
                  </div>
                  <p className="text-gray-900">
                    {new Date(selectedAppointment?.date).toLocaleDateString('en-KE', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-medium text-gray-700">Time</p>
                  </div>
                  <p className="text-gray-900">{selectedAppointment?.time}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-medium text-gray-700">Location</p>
                  </div>
                  <p className="text-gray-900">{selectedAppointment?.location}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Reason for Visit</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900">{selectedAppointment?.reason}</p>
              </div>
            </div>

            {selectedAppointment?.instructions && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-yellow-900">{selectedAppointment.instructions}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Status</h3>
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusPillClass}`}>
                {status === 'cancelled' || status === 'pending'
                  ? <AlertCircle className="w-4 h-4" />
                  : <CheckCircle className="w-4 h-4" />}
                {selectedAppointment?.status.charAt(0).toUpperCase() + selectedAppointment?.status.slice(1)}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              {isActive && selectedAppointment?.type === 'Telemedicine' && (
                <button
                  onClick={() => { setShowDetailsModal(false); handleJoinCall(selectedAppointment); }}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Video className="w-4 h-4" /> Join Video Call
                </button>
              )}
              {isActive && (
                <button
                  onClick={() => { setShowDetailsModal(false); handleCancelAppointment(selectedAppointment); }}
                  className="px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Cancel Appointment
                </button>
              )}
              {(isCompleted || isCancelled) && (
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setBookingType(mapAppointmentTypeToBookingType(selectedAppointment?.type));
                    setShowBookingModal(true);
                  }}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Rebook Appointment
                </button>
              )}
              <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CancelModal = () => (
    <div className={modalOverlayClasses}>
      <div className="bg-white w-full h-full sm:h-auto sm:rounded-xl sm:max-w-md overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Cancel Appointment?</h2>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to cancel your appointment with{' '}
            {selectedAppointment?.doctor} on{' '}
            {new Date(selectedAppointment?.date).toLocaleDateString('en-KE')}?
          </p>
          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Appointment Type</p>
              <p className="font-medium text-gray-900">{selectedAppointment?.type}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Date & Time</p>
              <p className="font-medium text-gray-900">
                {new Date(selectedAppointment?.date).toLocaleDateString('en-KE')} at {selectedAppointment?.time}
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-yellow-900">
              <strong>Note:</strong> Cancelling less than 24 hours before your appointment may incur a fee.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCancelModal(false)}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Keep Appointment
            </button>
            <button
              onClick={confirmCancellation}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const JoinCallModal = () => (
    <div className={modalOverlayClasses}>
      <div className="bg-white w-full h-full sm:h-auto sm:rounded-xl sm:max-w-md overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4">
            <Video className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Join Video Consultation</h2>
          <p className="text-gray-600 text-center mb-6">
            You're about to join a video call with {selectedAppointment?.doctor}
          </p>
          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Doctor</p>
              <p className="font-medium text-gray-900">{selectedAppointment?.doctor}</p>
              <p className="text-sm text-gray-600">{selectedAppointment?.specialty}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Scheduled Time</p>
              <p className="font-medium text-gray-900">{selectedAppointment?.time}</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-blue-900 mb-2">Before you join:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure you have a stable internet connection</li>
              <li>• Check your camera and microphone</li>
              <li>• Find a quiet, well-lit space</li>
              <li>• Have your medical records ready</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowJoinCallModal(false)}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={joinVideoCall}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const bookingModal = (
    <div className={modalOverlayClasses}>
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Book New Appointment</h2>
          <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Appointment Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'clinic',      label: 'Clinic Visit', icon: MapPin },
                { id: 'home',        label: 'Home Visit',   icon: User  },
                { id: 'telemedicine',label: 'Telemedicine', icon: Video },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleBookingTypeChange(t.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    bookingType === t.id ? 'border-blue-600' : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <t.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">{t.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
              <select
                value={bookingForm.specialty}
                onChange={(e) => setBookingForm((p) => ({ ...p, specialty: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500"
              >
                <option>General Practitioner</option>
                <option>Cardiologist</option>
                <option>Pediatrician</option>
                <option>Dentist</option>
                <option>Dermatologist</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                <input
                  type="date"
                  value={bookingForm.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBookingForm((p) => ({ ...p, date: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                <select
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm((p) => ({ ...p, time: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option>Morning (8AM - 12PM)</option>
                  <option>Afternoon (12PM - 5PM)</option>
                  <option>Evening (5PM - 8PM)</option>
                </select>
              </div>
            </div>

            {bookingType !== 'telemedicine' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {bookingType === 'clinic' ? 'Select Clinic' : 'Your Address'}
                </label>
                {bookingType === 'clinic' ? (
                  <select
                    value={bookingForm.location}
                    onChange={(e) => setBookingForm((p) => ({ ...p, location: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option>Nairobi Health Center</option>
                    <option>Mombasa Medical Clinic</option>
                    <option>Kisumu Health Facility</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter your address"
                    value={bookingForm.address}
                    onChange={(e) => setBookingForm((p) => ({ ...p, address: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
              <textarea
                rows="3"
                placeholder="Describe your symptoms or reason for appointment..."
                value={bookingForm.reason}
                onChange={(e) => setBookingForm((p) => ({ ...p, reason: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
              <select
                value={bookingForm.insurance}
                onChange={(e) => setBookingForm((p) => ({ ...p, insurance: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option>NHIF</option>
                <option>SHA</option>
                <option>Private Insurance</option>
                <option>Self Pay</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => { setShowBookingModal(false); resetBookingForm(bookingType); }}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleBookAppointment}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </button>
          </div>
          {bookingError && <p className="mt-3 text-sm text-red-600">{bookingError}</p>}
        </div>
      </div>
    </div>
  );

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-full px-0.5 sm:px-0">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
            {loadError && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {loadError}
              </p>
            )}
          </div>
          <button
            onClick={() => { setBookingType('clinic'); resetBookingForm('clinic'); setShowBookingModal(true); }}
            className="self-start sm:self-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      <div className="mb-6 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-start gap-1.5 sm:gap-2 px-2.5 sm:px-3 pt-2">
            {[
              { id: 'upcoming',  label: 'Upcoming',  count: appointments.upcoming.length  },
              { id: 'past',      label: 'Past',      count: appointments.past.length      },
              { id: 'cancelled', label: 'Cancelled', count: appointments.cancelled.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-2 text-[11px] sm:text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-800 border-transparent hover:text-gray-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] rounded-full ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 sm:p-4 lg:p-6">
          {loadingAppointments ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-blue-600 animate-pulse" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading appointments...</h3>
            </div>
          ) : appointments[activeTab].length > 0 ? (
            <>
              {/* Mobile cards */}
              <div className="grid grid-cols-1 gap-3 lg:hidden">
                {appointments[activeTab].map((appointment) => {
                  const TypeIcon = getTypeIcon(appointment.type);
                  return (
                    <article
                      key={appointment.id}
                      className="border border-gray-200 rounded-xl p-3.5 sm:p-4 hover:border-blue-300 hover:bg-blue-50/40 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                            <TypeIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 text-base leading-tight truncate">{appointment.doctor}</h3>
                            <p className="text-sm text-gray-600 truncate">{appointment.specialty}</p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusClasses(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>{new Date(appointment.date).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:col-span-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="truncate">{appointment.location}</span>
                        </div>
                        <p className="sm:col-span-2 text-gray-700">
                          <span className="text-gray-500">Reason: </span>{appointment.reason}
                        </p>
                      </div>
                      {renderAppointmentActions(appointment) && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          {renderAppointmentActions(appointment)}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto border border-gray-200 bg-white">
                <table className="w-full min-w-[980px] border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-800 border-b border-gray-200">
                      <th className="py-3 px-3">Provider</th>
                      <th className="py-3 px-3">Type</th>
                      <th className="py-3 px-3">Date & Time</th>
                      <th className="py-3 px-3">Location</th>
                      <th className="py-3 px-3">Reason</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments[activeTab].map((appointment) => {
                      const TypeIcon = getTypeIcon(appointment.type);
                      return (
                        <tr key={appointment.id} className="border-b border-gray-200 odd:bg-white even:bg-gray-50/40 hover:bg-blue-50/50 transition-colors">
                          <td className="py-4 px-3 align-top">
                            <div className="font-semibold text-gray-900">{appointment.doctor}</div>
                            <div className="text-sm text-gray-600">{appointment.specialty}</div>
                          </td>
                          <td className="py-4 px-3 align-top">
                            <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                              <TypeIcon className="w-4 h-4 text-blue-600" />
                              <span>{appointment.type}</span>
                            </div>
                          </td>
                          <td className="py-4 px-3 text-sm text-gray-700 align-top">
                            <div>{new Date(appointment.date).toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                            <div className="text-gray-500">{appointment.time}</div>
                          </td>
                          <td className="py-4 px-3 text-sm text-gray-700 max-w-[180px] align-top">
                            <p className="truncate">{appointment.location}</p>
                          </td>
                          <td className="py-4 px-3 text-sm text-gray-700 max-w-[220px] align-top">
                            <p className="truncate">{appointment.reason}</p>
                          </td>
                          <td className="py-4 px-3 align-top">
                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusClasses(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-3 align-top">
                            <div className="flex justify-start">
                              {renderAppointmentActions(appointment)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} appointments</h3>
              <p className="text-gray-600 mb-4">
                {activeTab === 'upcoming'  && "You don't have any upcoming appointments"}
                {activeTab === 'past'      && 'No past appointments to show'}
                {activeTab === 'cancelled' && 'No cancelled appointments'}
              </p>
              {activeTab === 'upcoming' && (
                <button
                  onClick={() => { setBookingType('clinic'); resetBookingForm('clinic'); setShowBookingModal(true); }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Book Your First Appointment</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {showBookingModal  && bookingModal}
      {showDetailsModal  && selectedAppointment && <DetailsModal />}
      {showCancelModal   && selectedAppointment && <CancelModal />}
      {showJoinCallModal && selectedAppointment && <JoinCallModal />}
    </div>
  );
};

export default Appointments;