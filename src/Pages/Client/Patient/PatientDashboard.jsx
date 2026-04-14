import { useState, useEffect } from 'react';
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

import { httpClient } from '../../../API/clients/httpClient.js';

// ── API helpers ────────────────────────────────────────────────────────
const fetchMyProfile   = ()           => httpClient.get('/api/patients/me');
const fetchAppointments = (patientId) => httpClient.get(`/api/appointments/patient/${patientId}`);
const fetchHealthRecords = (patientId) => httpClient.get(`/api/health-records/patient/${patientId}`);

// ── Date helpers ───────────────────────────────────────────────────────
const isUpcoming = (scheduledAt) => {
  if (!scheduledAt) return false;
  return new Date(scheduledAt) >= new Date();
};

const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const diff = Date.now() - new Date(dateString).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days  = Math.floor(hours / 24);
  if (mins  < 60)  return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  if (hours < 24)  return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  return `${days} day${days !== 1 ? 's' : ''} ago`;
};

// ── Component ──────────────────────────────────────────────────────────
const PatientDashboard = () => {
  const [patient,     setPatient]     = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1 — get patient profile
        const patientData = await fetchMyProfile();
        setPatient(patientData);

        // Step 2 — fetch appointments + health records in parallel
        const [apptData, recordsData] = await Promise.all([
          fetchAppointments(patientData.id),
          fetchHealthRecords(patientData.id),
        ]);

        setAppointments(Array.isArray(apptData) ? apptData : []);
        setHealthRecords(Array.isArray(recordsData) ? recordsData : []);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // ── Derived data ─────────────────────────────────────────────────────

  const upcomingAppointments = appointments
    .filter(a => isUpcoming(a.scheduledAt) && a.status !== 'CANCELED' && a.status !== 'COMPLETED')
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
    .slice(0, 3);

  const activePresciptions = healthRecords.filter(
    r => (r.recordType ?? '').toLowerCase().includes('prescription') && r.status === 'ACTIVE'
  ).length;

  const pendingResults = healthRecords.filter(
    r => (r.recordType ?? '').toLowerCase().includes('lab') && r.status === 'PENDING'
  ).length;

  const healthStats = [
    { label: 'Upcoming Visits',      value: upcomingAppointments.length, icon: Calendar },
    { label: 'Active Prescriptions', value: activePresciptions,          icon: Pill },
    { label: 'Pending Results',      value: pendingResults,              icon: Clock },
    { label: 'Emergency Orders',     value: 0,                           icon: AlertCircle },
  ];

  // Build recent activity from latest health records + appointments
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
      time:  formatRelativeTime(a.createdAt ?? a.scheduledAt),
      color: 'text-blue-600',
    })),
  ]
    .filter(item => item.time)
    .sort((a, b) => 0) // already ordered by fetch
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
          onClick={() => window.location.reload()}
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
        {patient && (
          <p className="text-sm text-gray-500">
            Welcome back, <span className="font-medium text-gray-700">
              {patient.firstName ?? patient.user?.fullName ?? 'Patient'}
            </span>
          </p>
        )}
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
                const scheduledDate = appointment.scheduledAt
                  ? new Date(appointment.scheduledAt)
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
                              : appointment.status === 'PENDING'
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