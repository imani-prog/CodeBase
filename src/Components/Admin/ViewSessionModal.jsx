import React from 'react';
import {
  X,
  Video,
  Phone,
  User,
  Stethoscope,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Pause,
  Calendar,
  Activity,
  Tag
} from 'lucide-react';

const ViewSessionModal = ({ isOpen, onClose, session, sessionStatus = 'live' }) => {
  if (!isOpen || !session) return null;

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDateTime = (iso) => {
    if (!iso) return '-';
    return new Date(iso).toLocaleString('en-KE', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const priorityColor = {
    high: 'text-red-700',
    medium: 'text-yellow-700',
    normal: 'text-green-700',
    low: 'text-gray-600',
  }[session.priority] || 'text-gray-600';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="relative px-8 py-5 bg-blue-950 text-white flex-shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <Activity className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-0.5">Session Details</h2>
                <p className="text-sm text-blue-200">
                  {session.id} &mdash; {session.sessionType}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
            {/* Status banner */}
            {sessionStatus === 'ended' ? (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg">
                <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span className="text-sm text-red-800 font-medium">
                  Session has been <span className="font-bold">Ended</span>
                </span>
              </div>
            ) : sessionStatus === 'paused' ? (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                <Pause className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-blue-800 font-medium">
                  Session is currently <span className="font-bold">Paused</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-green-800 font-medium">
                  Session is currently <span className="font-bold">Live</span>
                </span>
              </div>
            )}

            {/* Patient & Doctor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200  p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">
                    Patient
                  </span>
                </div>
                <p className="font-semibold text-gray-900">{session.patient}</p>
                <p className="text-sm text-gray-500 mt-0.5">ID: {session.patientId}</p>
              </div>

              <div className="border border-gray-200  p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">
                    Doctor
                  </span>
                </div>
                <p className="font-semibold text-gray-900">{session.doctor}</p>
                <p className="text-sm text-gray-500 mt-0.5">{session.specialty}</p>
              </div>
            </div>

            {/* Session Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Session Information
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">Start Time</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDateTime(session.startTime)}
                  </p>
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {formatDuration(session.duration)}
                  </p>
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">Platform</p>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    {session.platform === 'Video Call' ? (
                      <Video className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <Phone className="w-3.5 h-3.5 text-blue-600" />
                    )}
                    {session.platform}
                  </p>
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">Session Type</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {session.sessionType}
                  </p>
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">Priority</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityColor}`}>
                    {session.priority}
                  </span>
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">Cost</p>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                    {formatCurrency(session.cost)}
                  </p>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            {session.symptoms && session.symptoms.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-600" />
                  Reported Symptoms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {session.symptoms.map((symptom, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 border text-blue-800 text-xs font-medium rounded-full"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSessionModal;
