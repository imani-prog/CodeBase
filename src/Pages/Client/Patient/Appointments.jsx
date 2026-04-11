import { useCallback, useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Video, User, Plus, X, Phone, Mail, AlertCircle, CheckCircle, ExternalLink, Download } from 'lucide-react';
import { appointmentApi } from '../../../API/endpoints/appointmentApi.js';
import {
  refreshAppointmentGovernanceSnapshot,
  transitionGovernanceAppointment,
} from '../../../Services/appointmentGovernanceStore';
import { syncChwAppointmentWorkItems } from '../../../Services/chwAssignmentsStore';
import { useAuth } from '../../../hooks/useAuth.jsx';

const EMPTY_APPOINTMENTS = { upcoming: [], past: [], cancelled: [] };
const DEFAULT_MEETING_LINK = 'https://app.zoom.us/wc/88034100679/start?fromPWA=1&pwd=pVmy08XQyh0Ef3gWCFLCCikrXuW6o1.1';

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

function normalizeType(value) {
  const text = String(value || '').toLowerCase();
  if (text.includes('tele') || text.includes('video')) return 'Telemedicine';
  if (text.includes('home')) return 'Home Visit';
  return 'Clinic Visit';
}

function normalizeStatus(value) {
  const text = String(value || '').toUpperCase();
  if (text === 'COMPLETED') return 'completed';
  if (text === 'CANCELED' || text === 'CANCELLED') return 'cancelled';
  if (text === 'BOOKED') return 'pending';
  return 'confirmed';
}

function toWindowFromSlot(date, slot) {
  const lowered = String(slot || '').toLowerCase();
  let hourMinute = '09:00';

  if (lowered.includes('morning')) hourMinute = '09:00';
  else if (lowered.includes('afternoon')) hourMinute = '14:00';
  else if (lowered.includes('evening')) hourMinute = '18:00';
  else if (/^\d{2}:\d{2}$/.test(String(slot || ''))) hourMinute = String(slot);

  const start = new Date(`${date}T${hourMinute}:00`);
  if (Number.isNaN(start.getTime())) return { startIso: null, endIso: null };

  const end = new Date(start.getTime() + 30 * 60 * 1000);
  return {
    startIso: start.toISOString(),
    endIso: end.toISOString(),
  };
}

function mapSnapshotToPatientAppointments(rows = [], user) {
  const userId = user?.id !== undefined && user?.id !== null ? String(user.id) : '';
  const username = String(user?.username || '').toLowerCase();

  let scoped = rows;
  if (userId) {
    scoped = rows.filter((row) => String(row.patientId ?? '') === userId);
  }
  if (scoped.length === 0 && username) {
    scoped = rows.filter((row) => String(row.patientName || '').toLowerCase() === username);
  }
  if (scoped.length === 0) {
    scoped = rows;
  }

  const mapped = scoped.map((row) => {
    const type = normalizeType(row.appointmentType);
    const status = normalizeStatus(row.status);
    return {
      id: row.id,
      type,
      doctor: row.providerName || 'Assigned Provider',
      specialty: String(row.providerRole || '').toUpperCase() === 'CHW' ? 'Community Health Worker' : 'General Practitioner',
      date: formatDate(row.scheduledAt),
      time: formatTime(row.scheduledAt),
      location: row.facility || 'Health Facility',
      status,
      reason: row.reason || 'General consultation',
      bookingRef: row.sourceAppointmentId ? `APT-${row.sourceAppointmentId}` : `APT-${row.id}`,
      meetingLink: type === 'Telemedicine' ? DEFAULT_MEETING_LINK : undefined,
      instructions: row.reason ? 'Please keep your phone nearby. You will receive confirmation shortly.' : undefined,
      patientId: row.patientId,
      patientName: row.patientName,
    };
  });

  return {
    upcoming: mapped.filter((item) => item.status === 'pending' || item.status === 'confirmed'),
    past: mapped.filter((item) => item.status === 'completed'),
    cancelled: mapped.filter((item) => item.status === 'cancelled'),
  };
}

function buildPatientPayload(bookingForm, bookingType, userId) {
  const { startIso, endIso } = toWindowFromSlot(bookingForm.date, bookingForm.time);
  if (!startIso || !endIso) {
    throw new Error('Invalid date or time for appointment booking');
  }

  const appointmentType =
    bookingType === 'telemedicine' ? 'Telemedicine' : bookingType === 'home' ? 'Home Visit' : 'Clinic Visit';

  return {
    patientId: userId,
    providerRole: bookingType === 'home' ? 'CHW' : 'DOCTOR',
    type: appointmentType,
    appointmentType,
    location:
      bookingType === 'telemedicine'
        ? 'Video Consultation'
        : bookingType === 'home'
          ? bookingForm.address || 'Patient Home'
          : bookingForm.location,
    reason: bookingForm.reason,
    notes: `Insurance: ${bookingForm.insurance}`,
    scheduledStart: startIso,
    scheduledEnd: endIso,
    startAt: startIso,
    endAt: endIso,
    status: 'BOOKED',
  };
}

const Appointments = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showJoinCallModal, setShowJoinCallModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [bookingType, setBookingType] = useState('clinic');
  const [appointments, setAppointments] = useState(EMPTY_APPOINTMENTS);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingForm, setBookingForm] = useState({
    specialty: 'General Practitioner',
    date: new Date().toISOString().split('T')[0],
    time: 'Morning (8AM - 12PM)',
    location: 'Nairobi Health Center',
    address: '',
    reason: '',
    insurance: 'NHIF'
  });

  const isAnyModalOpen =
    showBookingModal || showDetailsModal || showCancelModal || showJoinCallModal;

  useEffect(() => {
    if (!isAnyModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isAnyModalOpen]);

  const loadAppointments = useCallback(async () => {
    setLoadingAppointments(true);
    setLoadError('');

    try {
      const snapshot = await refreshAppointmentGovernanceSnapshot();
      const mapped = mapSnapshotToPatientAppointments(snapshot.appointments, user);
      setAppointments(mapped);
      syncChwAppointmentWorkItems(snapshot.appointments);
    } catch (error) {
      setAppointments(EMPTY_APPOINTMENTS);
      setLoadError(error?.message || 'Could not load appointments.');
    } finally {
      setLoadingAppointments(false);
    }
  }, [user]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleCancelAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleJoinCall = (appointment) => {
    setSelectedAppointment(appointment);
    setShowJoinCallModal(true);
  };

  const confirmCancellation = async () => {
    if (!selectedAppointment) return;

    const result = await transitionGovernanceAppointment(
      selectedAppointment.id,
      'CANCELED',
      'Cancelled by patient'
    );

    if (!result.ok) {
      window.alert(result.reason || 'Could not cancel appointment');
      return;
    }

    await loadAppointments();
    setSelectedAppointment((current) => (current ? { ...current, status: 'cancelled' } : null));
    setShowCancelModal(false);
    setActiveTab('cancelled');
  };

  const joinVideoCall = () => {
    // Open the video call link
    if (selectedAppointment?.meetingLink) {
      window.open(selectedAppointment.meetingLink, '_blank');
      setShowJoinCallModal(false);
    }
  };

  const getStatusClasses = (status) => {
    if (status === 'confirmed' || status === 'completed') return 'text-green-700';
    if (status === 'pending') return 'text-yellow-700';
    if (status === 'cancelled') return 'text-red-700';
    return 'text-gray-700';
  };

  const getTypeIcon = (type) => {
    if (type === 'Telemedicine') return Video;
    if (type === 'Home Visit') return User;
    return MapPin;
  };

  const mapAppointmentTypeToBookingType = (type) => {
    if (type === 'Telemedicine') return 'telemedicine';
    if (type === 'Home Visit') return 'home';
    return 'clinic';
  };

  const resetBookingForm = (type = 'clinic') => {
    setBookingForm({
      specialty: 'General Practitioner',
      date: new Date().toISOString().split('T')[0],
      time: 'Morning (8AM - 12PM)',
      location: type === 'telemedicine' ? 'Video Consultation' : 'Nairobi Health Center',
      address: '',
      reason: '',
      insurance: 'NHIF'
    });
    setBookingError('');
  };

  const handleBookingTypeChange = (type) => {
    setBookingType(type);
    setBookingForm((prev) => ({
      ...prev,
      location: type === 'telemedicine' ? 'Video Consultation' : prev.location || 'Nairobi Health Center',
      address: type === 'home' ? prev.address : ''
    }));
  };

  const handleBookAppointment = async () => {
    if (!bookingForm.date || !bookingForm.reason.trim()) {
      setBookingError('Please provide a date and reason for visit before booking.');
      return;
    }

    setBookingError('');

    try {
      const payload = buildPatientPayload(bookingForm, bookingType, user?.id);
      await appointmentApi.create(payload);
      await loadAppointments();
      setShowBookingModal(false);
      setActiveTab('upcoming');
      resetBookingForm(bookingType);
    } catch (error) {
      setBookingError(error?.message || 'Could not book appointment. Please try again.');
    }
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
          onClick={() => appointment.type === 'Telemedicine' ? handleJoinCall(appointment) : handleViewDetails(appointment)}
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

  const modalOverlayClasses =
    'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-stretch sm:items-center sm:justify-center p-0 sm:p-6 overflow-y-auto';

  const DetailsModal = () => {
    const status = selectedAppointment?.status;
    const isActiveAppointment = status === 'confirmed' || status === 'pending';
    const isCompleted = status === 'completed';
    const isCancelled = status === 'cancelled';
    const canJoinCall = isActiveAppointment && selectedAppointment?.type === 'Telemedicine';
    const canCancel = isActiveAppointment;
    const canRebook = isCompleted || isCancelled;

    const statusPillClass =
      status === 'confirmed' || status === 'completed'
        ? 'bg-green-50 text-green-700'
        : status === 'pending'
          ? 'bg-yellow-50 text-yellow-700'
          : status === 'cancelled'
            ? 'bg-red-50 text-red-700'
            : 'bg-gray-50 text-gray-700';

    return (
    <div className={modalOverlayClasses}>
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
          <button
            onClick={() => setShowDetailsModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Booking Reference */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700 font-medium">Booking Reference</p>
            <p className="text-lg font-bold text-blue-900">{selectedAppointment?.bookingRef}</p>
          </div>

          {/* Doctor Information */}
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

          {/* Appointment Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Appointment Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <p className="text-sm font-medium text-gray-700">Date</p>
                </div>
                <p className="text-gray-900">{new Date(selectedAppointment?.date).toLocaleDateString('en-KE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
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
                {selectedAppointment?.address && (
                  <p className="text-sm text-gray-600 mt-1">{selectedAppointment.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Reason for Visit */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Reason for Visit</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">{selectedAppointment?.reason}</p>
            </div>
          </div>

          {/* Special Instructions */}
          {selectedAppointment?.instructions && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Instructions</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-yellow-900">{selectedAppointment.instructions}</p>
                </div>
              </div>
            </div>
          )}

          {/* Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Status</h3>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusPillClass}`}>
              {status === 'cancelled' || status === 'pending' ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              {selectedAppointment?.status.charAt(0).toUpperCase() + selectedAppointment?.status.slice(1)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            {canJoinCall && (
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleJoinCall(selectedAppointment);
                }}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                Join Video Call
              </button>
            )}

            {canCancel && (
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleCancelAppointment(selectedAppointment);
                }}
                className="px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Cancel Appointment
              </button>
            )}

            {canRebook && (
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
              <Download className="w-4 h-4" />
              Download
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
            Are you sure you want to cancel your appointment with {selectedAppointment?.doctor} on {new Date(selectedAppointment?.date).toLocaleDateString('en-KE')}?
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
              <strong>Note:</strong> Cancelling less than 24 hours before your appointment may incur a cancellation fee.
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
              <ExternalLink className="w-4 h-4" />
              Join Now
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
          <button
            onClick={() => setShowBookingModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Appointment Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Appointment Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'clinic', label: 'Clinic Visit', icon: MapPin },
                { id: 'home', label: 'Home Visit', icon: User },
                { id: 'telemedicine', label: 'Telemedicine', icon: Video }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleBookingTypeChange(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    bookingType === type.id
                      ? 'border-blue-600'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <type.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">{type.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <select
                value={bookingForm.specialty}
                onChange={(e) => setBookingForm((prev) => ({ ...prev, specialty: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm((prev) => ({ ...prev, date: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm((prev) => ({ ...prev, time: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
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
                  {bookingType === 'clinic' ? 'Select Clinic' : 'Your Location'}
                </label>
                {bookingType === 'clinic' ? (
                  <select
                    value={bookingForm.location}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
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
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, address: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                  />
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit
              </label>
              <textarea
                rows="3"
                placeholder="Describe your symptoms or reason for appointment..."
                value={bookingForm.reason}
                onChange={(e) => setBookingForm((prev) => ({ ...prev, reason: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance
              </label>
              <select
                value={bookingForm.insurance}
                onChange={(e) => setBookingForm((prev) => ({ ...prev, insurance: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
              >
                <option>NHIF</option>
                <option>SHA</option>
                <option>Private Insurance</option>
                <option>Self Pay</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                setShowBookingModal(false);
                resetBookingForm(bookingType);
              }}
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

          {bookingError && (
            <p className="mt-3 text-sm text-red-600">{bookingError}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full px-0.5 sm:px-0">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
            {loadError && <p className="text-sm text-red-600">{loadError}</p>}
          </div>
          <button
            onClick={() => {
              setBookingType('clinic');
              resetBookingForm('clinic');
              setShowBookingModal(true);
            }}
            className="self-start sm:self-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className=" mb-6 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-start gap-1.5 sm:gap-2 px-2.5 sm:px-3 pt-2">
          {[
            { id: 'upcoming', label: 'Upcoming', count: appointments.upcoming.length },
            { id: 'past', label: 'Past', count: appointments.past.length },
            { id: 'cancelled', label: 'Cancelled', count: appointments.cancelled.length }
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
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="p-3 sm:p-4 lg:p-6">
          {loadingAppointments ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading appointments...</h3>
            </div>
          ) : appointments[activeTab].length > 0 ? (
            <>
              {/* Mobile/Tablet Cards */}
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
                          <span className="text-gray-500">Reason: </span>
                          {appointment.reason}
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

              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto border border-gray-200 bg-white">
                <table className="w-full min-w-[980px] border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-800 border-b border-gray-200">
                      <th className="py-3 px-3 ">Provider</th>
                      <th className="py-3 px-3 ">Type</th>
                      <th className="py-3 px-3 ">Date & Time</th>
                      <th className="py-3 px-3 ">Location</th>
                      <th className="py-3 px-3 ">Reason</th>
                      <th className="py-3 px-3 ">Status</th>
                      <th className="py-3 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments[activeTab].map((appointment) => {
                      const TypeIcon = getTypeIcon(appointment.type);
                      return (
                        <tr key={appointment.id} className="border-b border-gray-200 odd:bg-white even:bg-gray-50/40 hover:bg-blue-50/50 transition-colors">
                          <td className="py-4 px-3  align-top">
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
                          <td className="py-4 px-3  text-sm text-gray-700 max-w-[220px] align-top">
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} appointments
              </h3>
              <p className="text-gray-600 mb-4">
                {activeTab === 'upcoming' && "You don't have any upcoming appointments"}
                {activeTab === 'past' && "No past appointments to show"}
                {activeTab === 'cancelled' && "No cancelled appointments"}
              </p>
              {activeTab === 'upcoming' && (
                <button
                  onClick={() => {
                    setBookingType('clinic');
                    resetBookingForm('clinic');
                    setShowBookingModal(true);
                  }}
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

      {/* Booking Modal */}
      {showBookingModal && bookingModal}
      
      {/* Details Modal */}
      {showDetailsModal && selectedAppointment && <DetailsModal />}
      
      {/* Cancel Modal */}
      {showCancelModal && selectedAppointment && <CancelModal />}
      
      {/* Join Call Modal */}
      {showJoinCallModal && selectedAppointment && <JoinCallModal />}
    </div>
  );
};

export default Appointments;
