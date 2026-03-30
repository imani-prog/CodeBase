import React from 'react';
import {
  X, User, Stethoscope, Clock, DollarSign, Calendar,
  CheckCircle, XCircle, Star, Tag, AlertCircle, Activity
} from 'lucide-react';

const ViewHistorySessionModal = ({ isOpen, onClose, session }) => {
  if (!isOpen || !session) return null;

  const formatDuration = (minutes) => {
    if (!minutes) return '—';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(amount ?? 0);

  const statusConfig = {
    completed: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: CheckCircle, label: 'Completed' },
    cancelled: { bg: 'bg-red-50',   border: 'border-red-200',   text: 'text-red-800',   icon: XCircle,     label: 'Cancelled' },
  };
  const sc = statusConfig[session.status] || statusConfig.cancelled;
  const StatusIcon = sc.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col">

          {/* HEADER */}
          <div className="relative px-8 py-5 bg-blue-950 text-white flex-shrink-0">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <Activity className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-0.5">Session Details</h2>
                <p className="text-sm text-blue-200">{session.id} &mdash; {session.date}</p>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

            {/* Status banner */}
            <div className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg ${sc.bg} ${sc.border}`}>
              <StatusIcon className={`w-4 h-4 flex-shrink-0 ${sc.text}`} />
              <span className={`text-sm font-medium ${sc.text}`}>
                Session <span className="font-bold">{sc.label}</span>
              </span>
            </div>

            {/* Patient & Doctor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">Patient</span>
                </div>
                <p className="font-semibold text-gray-900">{session.patient}</p>
              </div>
              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">Doctor</span>
                </div>
                <p className="font-semibold text-gray-900">{session.doctor}</p>
              </div>
            </div>

            {/* Session Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Session Information
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="text-sm font-medium text-gray-900">{session.date}</p>
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {formatDuration(session.duration)}
                  </p>
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">Cost</p>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                    {formatCurrency(session.cost)}
                  </p>
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">Rating</p>
                  {session.rating ? (
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-900">{session.rating} / 5</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Not rated</span>
                  )}
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            {session.diagnosis && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-600" />
                  Diagnosis
                </h3>
                <div className="bg-gray-50 border border-gray-200 px-4 py-3">
                  <p className="text-sm text-gray-800">{session.diagnosis}</p>
                </div>
              </div>
            )}

            {/* Prescription */}
            {session.prescription && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  Prescription / Notes
                </h3>
                <div className="bg-gray-50 border border-gray-200 px-4 py-3">
                  <p className="text-sm text-gray-800">{session.prescription}</p>
                </div>
              </div>
            )}

            {/* Follow-up */}
            {session.status === 'completed' && (
              <div className={`flex items-start gap-2 px-4 py-3 border text-sm ${
                session.followUpRequired
                  ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                  : 'bg-green-50 border-green-200 text-green-800'
              }`}>
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {session.followUpRequired
                    ? 'Follow-up appointment is required for this patient.'
                    : 'No follow-up appointment required.'}
                </span>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHistorySessionModal;
