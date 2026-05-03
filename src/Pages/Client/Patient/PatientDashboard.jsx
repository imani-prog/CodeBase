import { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  Video,
  FileText,
  Pill,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Settings,
  MapPin,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { patientApi } from '../../../API/endpoints/patientApi.js';

import { httpClient } from '../../../API/clients/httpClient.js';

// ── API helpers ────────────────────────────────────────────────────────
const fetchMyProfile         = (userId)     => patientApi.me({ fallbackUserId: userId });
const fetchAppointments      = (patientId)  => httpClient.get(`/api/appointments/patient/${patientId}`);
const fetchHealthRecords     = (patientId)  => httpClient.get(`/api/health-records/patient/${patientId}`);
const fetchEmergencyDispatches = ()         => httpClient.get('/api/assist');
const EMERGENCY_ORDERS_UPDATED_EVENT        = 'patient-emergency-orders-updated';
const PATIENT_EMERGENCY_ORDERS_STORAGE_KEY  = 'patient-emergency-orders-v1';

const toArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items))   return payload.items;
  if (Array.isArray(payload?.data))    return payload.data;
  if (payload?.data && typeof payload.data === 'object') return toArray(payload.data);
  return [];
};

const readPersistedEmergencyOrders = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw    = window.localStorage.getItem(PATIENT_EMERGENCY_ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const mergeDispatchRows = (primaryRows = [], secondaryRows = []) => {
  const byKey = new Map();
  [...toArray(secondaryRows), ...toArray(primaryRows)].forEach((row) => {
    if (!row || typeof row !== 'object') return;
    const key = String(row.id ?? row.incidentId ?? `${row.patientId || ''}-${row.createdAt || row.requestTime || ''}`);
    if (!key) return;
    byKey.set(key, row);
  });
  return Array.from(byKey.values());
};

const normalizePhone = (value) => String(value || '').replace(/\D/g, '');

const normalizeName = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

const extractPatientName = (patient) => {
  if (!patient) return '';
  const fullName = String(patient.fullName || patient.name || '').trim();
  if (fullName) return fullName;
  return [patient.firstName, patient.middleName, patient.lastName]
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .join(' ')
    .trim();
};

const toTimestamp = (value) => {
  const date = new Date(value || '');
  const ms   = date.getTime();
  return Number.isNaN(ms) ? 0 : ms;
};

// ── Date helpers ───────────────────────────────────────────────────────

/**
 * Extract the scheduled date from an appointment, trying every field name
 * the backend has been observed to use.
 */
const getScheduledDate = (a) =>
  a.scheduledAt || a.scheduledStart || a.date || a.startAt || a.appointmentDate || a.startTime;

/**
 * FIX 1 — Compare timestamps (ms numbers) instead of Date objects.
 * `new Date(str) >= new Date()` can be unreliable across JS engines when
 * the string is a UTC ISO value; comparing `.getTime()` integers is safe.
 */
const isUpcoming = (dateValue) => {
  if (!dateValue) return false;
  const ms = new Date(dateValue).getTime();
  return !Number.isNaN(ms) && ms >= Date.now();
};

/**
 * FIX 2 — The backend uses 'SCHEDULED' as the status for a booked-but-not-
 * yet-confirmed appointment. The original filter only allowed 'CONFIRMED' and
 * 'PENDING', so every SCHEDULED appointment was silently dropped.
 * Now we exclude only the terminal statuses (CANCELED / CANCELLED / COMPLETED).
 */
const isActiveStatus = (status) => {
  const s = (status ?? '').toUpperCase();
  return s !== 'CANCELED' && s !== 'CANCELLED' && s !== 'COMPLETED';
};

const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const diff  = Date.now() - new Date(dateString).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days  = Math.floor(hours / 24);
  if (mins  < 60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  return `${days} day${days !== 1 ? 's' : ''} ago`;
};

// ── Component ──────────────────────────────────────────────────────────
const PatientDashboard = () => {
  const { user } = useAuth();
  const [patient,             setPatient]             = useState(null);
  const [appointments,        setAppointments]        = useState([]);
  const [healthRecords,       setHealthRecords]       = useState([]);
  const [emergencyDispatches, setEmergencyDispatches] = useState([]);
  const [loading,             setLoading]             = useState(true);
  const [error,               setError]               = useState(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const patientData = await fetchMyProfile(user?.id);
      setPatient(patientData);

      const resolvedPatientId =
        patientData?.id ??
        patientData?.patientId ??
        patientData?.patient?.id ??
        patientData?.data?.id ??
        (patientApi.resolveMyPatientId
          ? await patientApi.resolveMyPatientId(user?.id).catch(() => undefined)
          : undefined);

      if (!resolvedPatientId) {
        throw new Error('Could not resolve patient ID');
      }

      const [apptRaw, recordsRaw, dispatchRaw] = await Promise.all([
        fetchAppointments(resolvedPatientId).catch(() => []),
        fetchHealthRecords(resolvedPatientId).catch(() => []),
        fetchEmergencyDispatches().catch(() => []),
      ]);

      setAppointments(toArray(apptRaw));
      setHealthRecords(toArray(recordsRaw));
      setEmergencyDispatches(mergeDispatchRows(toArray(dispatchRaw), readPersistedEmergencyOrders()));
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    const handler = () => loadDashboard();
    window.addEventListener(EMERGENCY_ORDERS_UPDATED_EVENT, handler);
    return () => window.removeEventListener(EMERGENCY_ORDERS_UPDATED_EVENT, handler);
  }, [loadDashboard]);

  // ── Derived data ─────────────────────────────────────────────────────

  const upcomingAppointments = appointments
    .filter(a => isUpcoming(getScheduledDate(a)) && isActiveStatus(a.status))
    .sort((a, b) => new Date(getScheduledDate(a)).getTime() - new Date(getScheduledDate(b)).getTime())
    .slice(0, 3);

  const activePresciptions = healthRecords.filter(
    r => (r.recordType ?? '').toLowerCase().includes('prescription') && r.status === 'ACTIVE'
  ).length;

  const pendingResults = healthRecords.filter(
    r => (r.recordType ?? '').toLowerCase().includes('lab') && r.status === 'PENDING'
  ).length;

  const patientDispatches = toArray(emergencyDispatches)
    .filter((dispatch) => {
      if (!patient) return false;
      if (String(dispatch.patientId || '') === String(patient.id || '')) return true;
      const patientPhone       = normalizePhone(patient.phone || patient.phoneNumber || '');
      const callerPhone        = normalizePhone(dispatch.callerPhone || '');
      if (patientPhone && callerPhone && callerPhone.endsWith(patientPhone.slice(-9))) return true;
      const patientName        = normalizeName(extractPatientName(patient));
      const dispatchPatientName = normalizeName(dispatch.patientName || '');
      const dispatchCallerName  = normalizeName(dispatch.callerName  || '');
      if (patientName && (dispatchPatientName === patientName || dispatchCallerName === patientName)) return true;
      return false;
    })
    .sort((a, b) => toTimestamp(b.requestTime || b.createdAt) - toTimestamp(a.requestTime || a.createdAt));

  const emergencyOrdersCount = patientDispatches.length;

  const healthStats = [
    { label: 'Upcoming Visits',      value: upcomingAppointments.length, icon: Calendar },
    { label: 'Active Prescriptions', value: activePresciptions,          icon: Pill },
    { label: 'Pending Results',      value: pendingResults,              icon: Clock },
    { label: 'Emergency Orders',     value: emergencyOrdersCount,        icon: AlertCircle },
  ];

  const recentActivities = [
    ...healthRecords.slice(0, 4).map(r => ({
      id:    `hr-${r.id}`,
      icon:  r.recordType?.toLowerCase().includes('lab') ? Activity : FileText,
      text:  r.title ?? r.recordType ?? 'Health record updated',
      time:  formatRelativeTime(r.createdAt ?? r.recordDate),
      color: 'text-blue-600',
    })),
    ...appointments.slice(0, 2).map(a => ({
      id:    `apt-${a.id}`,
      icon:  Calendar,
      text:  `Appointment ${(a.status ?? '').toLowerCase()} — ${a.providerName ?? a.doctorName ?? 'Provider'}`,
      time:  formatRelativeTime(a.createdAt ?? getScheduledDate(a)),
      color: 'text-blue-600',
    })),
    ...patientDispatches.slice(0, 2).map((dispatch) => ({
      id:    `emg-${dispatch.id}`,
      icon:   AlertCircle,
      text:   `Emergency request ${(dispatch.status ?? 'REQUESTED').toLowerCase()} — ${dispatch.vehiclePlate || dispatch.ambulanceUnitId || 'Ambulance pending'}`,
      time:   formatRelativeTime(dispatch.requestTime ?? dispatch.createdAt),
      color: 'text-red-600',
    })),
  ]
    .filter(item => item.time)
    .slice(0, 4);

  const quickActions = [
    { title: 'Book Appointment', description: 'Schedule a clinic or home visit',  icon: Calendar, link: '/client/patient/appointments' },
    { title: 'Telemedicine',     description: 'Connect with a doctor online',      icon: Video,    link: '/client/patient/telemedicine' },
    { title: 'Health Records',   description: 'View your medical history',         icon: FileText, link: '/client/patient/health-records' },
    { title: 'Prescriptions',    description: 'Manage your medications',           icon: Pill,     link: '/client/patient/prescriptions' },
    { title: 'Emergency',        description: 'Request ambulance service',         icon: Phone,    link: '/client/patient/emergency' },
    { title: 'Settings',         description: 'Manage account & preferences',      icon: Settings, link: '/client/patient/settings' },
  ];

  // ── Loading / error states ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertCircle className="w-12 h-12 text-red-400 mb-3" />
        <p className="text-gray-700 font-medium mb-1">Failed to load dashboard</p>
        <p className="text-sm text-gray-500 mb-4">{error}</p>
        <button
          onClick={loadDashboard}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="w-full px-0.5 sm:px-0">
      {/* Header */}
      <div className="mb-5 sm:mb-8">
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
          Dashboard
        </h1>
        {/* {patient && (
          <p className="text-sm text-gray-500">
            Welcome back, <span className="font-medium text-gray-700">
              {patient.firstName ?? patient.user?.fullName ?? 'Patient'}
            </span>
          </p>
        )} */}
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-5 sm:mb-8">
        {healthStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-3 sm:p-5 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] sm:text-sm text-gray-600 leading-tight">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 leading-tight">{stat.value}</p>
              </div>
              <div className="shrink-0 mt-0.5">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

          {/* Quick Actions */}
          <div className="bg-white p-3 sm:p-6 border border-gray-200">
            <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-3 sm:mb-6">Quick Actions</h2>
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="hover:bg-blue-50 rounded-xl p-2.5 sm:p-5 transition-all duration-200 group border border-transparent hover:border-gray-200"
                >
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-blue-50 shadow-sm mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                    <action.icon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-base mb-0.5 sm:mb-1 leading-tight">
                    {action.title}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-gray-500 leading-tight hidden sm:block">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white p-3 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3 sm:mb-6">
              <h2 className="text-base sm:text-xl font-bold">Upcoming Appointments</h2>
              <Link
                to="/client/patient/appointments"
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {upcomingAppointments.map((appointment) => {
                const scheduledDate = getScheduledDate(appointment)
                  ? new Date(getScheduledDate(appointment))
                  : null;
                const isTelemedicine = (appointment.type ?? appointment.appointmentType ?? '')
                  .toLowerCase()
                  .includes('tele');

                return (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                            {appointment.providerName ?? appointment.doctorName ?? 'Provider'}
                          </h3>
                          <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full shrink-0 ${
                            appointment.status === 'CONFIRMED'
                              ? 'bg-green-100 text-green-700'
                              : appointment.status === 'PENDING' || appointment.status === 'SCHEDULED'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {(appointment.status ?? '').toLowerCase()}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {appointment.providerRole ?? appointment.specialty ?? ''}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="truncate">
                          {scheduledDate
                            ? scheduledDate.toLocaleDateString('en-KE', {
                                weekday: 'short', month: 'short', day: 'numeric',
                              })
                            : '—'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span>
                          {scheduledDate
                            ? scheduledDate.toLocaleTimeString('en-KE', {
                                hour: '2-digit', minute: '2-digit',
                              })
                            : '—'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-600 flex items-center gap-1.5">
                      {isTelemedicine ? (
                        <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      )}
                      <span className="truncate">
                        {appointment.location ?? appointment.facilityName ?? (isTelemedicine ? 'Video Consultation' : 'Clinic Visit')}
                      </span>
                    </div>
                  </div>
                );
              })}

              {upcomingAppointments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm sm:text-base">No upcoming appointments</p>
                  <Link
                    to="/client/patient/appointments"
                    className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium mt-2 inline-block"
                  >
                    Book Your First Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">

          {/* Health Alert — only show if there are pending results */}
          {pendingResults > 0 ? (
            <div className="bg-blue-500 p-3 sm:p-6 text-white">
              <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
                <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg shrink-0">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-sm sm:text-lg">Health Reminder</h3>
              </div>
              <p className="text-xs sm:text-base mb-3 sm:mb-4 text-blue-50 leading-relaxed">
                You have {pendingResults} pending lab result{pendingResults > 1 ? 's' : ''}. Check your health records for details.
              </p>
              <Link
                to="/client/patient/health-records"
                className="bg-white text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-50 transition-colors inline-block"
              >
                View Results
              </Link>
            </div>
          ) : (
            <div className="bg-green-500 p-3 sm:p-6 text-white">
              <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
                <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg shrink-0">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-sm sm:text-lg">All Clear</h3>
              </div>
              <p className="text-xs sm:text-base text-green-50 leading-relaxed">
                No pending results or alerts at this time.
              </p>
            </div>
          )}

          {/* Recent Activity */}
          <div className="p-3 sm:p-6 border border-gray-200 bg-white">
            <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-6">Recent Activity</h2>
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.length > 0 ? recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-2.5 sm:gap-3">
                  <div className="bg-gray-50 p-1.5 sm:p-2 rounded-lg mt-0.5 shrink-0">
                    <activity.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 leading-tight">{activity.text}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity.</p>
              )}
            </div>
          </div>

          {/* Quick Contact */}
          <div className="p-3 sm:p-6 border border-gray-200 bg-white">
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Need Help?</h3>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Call Support: +254 700 000 000</span>
              </button>
              <Link
                to="/client/patient/emergency"
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                Emergency Services
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;