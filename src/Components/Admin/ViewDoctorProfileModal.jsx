import React from 'react';
import {
  X, Star, Clock, DollarSign, MapPin, Globe, Calendar,
  Stethoscope, Award, UserCheck, Activity, TrendingUp, Phone
} from 'lucide-react';

const ViewDoctorProfileModal = ({ isOpen, onClose, doctor }) => {
  if (!isOpen || !doctor) return null;

  const statusConfig = {
    available: { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200', dot: 'bg-green-500', label: 'Available' },
    busy:      { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200', dot: 'bg-yellow-500', label: 'Busy' },
    offline:   { bg: 'bg-red-50',    text: 'text-red-800',    border: 'border-red-200',    dot: 'bg-red-500',    label: 'Offline' },
  };
  const status = statusConfig[doctor.currentStatus] || statusConfig.offline;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(amount ?? 0);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col">

          {/* ── HEADER ── */}
          <div className="relative px-8 py-5 bg-blue-950 text-white flex-shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="relative flex-shrink-0">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white/30 shadow-lg"
                />
                <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-blue-950 ${status.dot}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-0.5">{doctor.name}</h2>
                <p className="text-sm text-blue-200 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  {doctor.specialty} &mdash; {doctor.id}
                </p>
                <span className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${status.bg} ${status.text} ${status.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>
            </div>
          </div>

          {/* ── BODY ── */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

            {/* Stats grid */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                Performance Overview
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="border border-gray-200 p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-blue-500" />
                    <span className="text-2xl font-bold text-gray-900">{doctor.rating}</span>
                  </div>
                  <p className="text-xs text-gray-800">Rating</p>
                  <p className="text-xs text-gray-700">{doctor.totalSessions} total reviews</p>
                </div>
                <div className="border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{doctor.sessionsToday}</div>
                  <p className="text-xs text-gray-800">Sessions Today</p>
                  <p className="text-xs text-gray-700">{doctor.totalSessions} all time</p>
                </div>
                <div className="border border-gray-200 p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-2xl font-bold text-gray-900">{doctor.avgSessionDuration}m</span>
                  </div>
                  <p className="text-xs text-gray-800">Avg Duration</p>
                  <p className="text-xs text-gray-700">per session</p>
                </div>
                <div className="border border-gray-200 p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(doctor.earnings)}</span>
                  </div>
                  <p className="text-xs text-gray-800">Total Earnings</p>
                  <p className="text-xs text-gray-700">this period</p>
                </div>
              </div>
            </div>

            {/* Personal details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600" />
                Personal &amp; Professional Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">Experience</span>
                  </div>
                  <p className="font-semibold text-gray-900">{doctor.experience} years</p>
                  <p className="text-xs text-gray-400 mt-0.5">Clinical practice</p>
                </div>
                <div className="border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">Location</span>
                  </div>
                  <p className="font-semibold text-gray-900">{doctor.location}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Primary base</p>
                </div>
                <div className="border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">Languages</span>
                  </div>
                  <p className="font-semibold text-gray-900">{doctor.languages?.join(', ')}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{doctor.languages?.length} language{doctor.languages?.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">Next Appointment</span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{formatDate(doctor.nextAppointment)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Upcoming session</p>
                </div>
              </div>
            </div>

            {/* Doctor ID card */}
            <div className="bg-blue-50 border border-blue-200 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold uppercase text-blue-700 tracking-wide">Quick Reference</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                <div>
                  <p className="text-xs text-blue-500">Doctor ID</p>
                  <p className="font-semibold text-blue-900">{doctor.id}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-500">Specialty</p>
                  <p className="font-semibold text-blue-900">{doctor.specialty}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-800 text-white border border-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctorProfileModal;
