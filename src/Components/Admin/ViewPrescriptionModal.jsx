import React from 'react';
import { X, FileText, User, Stethoscope, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const ViewPrescriptionModal = ({ isOpen, onClose, session }) => {
  if (!isOpen || !session) return null;

  const hasPrescription = !!session.prescription;
  const hasDiagnosis = !!session.diagnosis;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-xl w-full overflow-hidden max-h-[90vh] flex flex-col">

          {/* HEADER */}
          <div className="relative px-8 py-5 bg-blue-950 text-white flex-shrink-0">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center ring-4 ring-white/30">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Prescription &amp; Diagnosis</h2>
                <p className="text-sm text-blue-200">{session.id} &mdash; {session.date}</p>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">

            {/* Session reference */}
            <div className="bg-gray-50 p-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Patient</p>
                  <p className="text-sm font-semibold text-gray-900">{session.patient}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Doctor</p>
                  <p className="text-sm font-semibold text-gray-900">{session.doctor}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Session Date</p>
                  <p className="text-sm font-semibold text-gray-900">{session.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${session.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <p className={`text-sm font-semibold capitalize ${session.status === 'completed' ? 'text-green-700' : 'text-red-700'}`}>
                    {session.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Diagnosis section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                Diagnosis
              </h3>
              {hasDiagnosis ? (
                <div className="border border-blue-200 bg-blue-50 px-4 py-4">
                  <p className="text-sm text-blue-900 font-medium">{session.diagnosis}</p>
                </div>
              ) : (
                <div className="border border-gray-200 bg-gray-50 px-4 py-4">
                  <p className="text-sm text-gray-400 italic">No diagnosis recorded for this session.</p>
                </div>
              )}
            </div>

            {/* Prescription section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Prescription / Notes
              </h3>
              {hasPrescription ? (
                <div className="border border-green-200 bg-green-50 px-4 py-4">
                  <p className="text-sm text-green-900">{session.prescription}</p>
                </div>
              ) : (
                <div className="border border-gray-200 bg-gray-50 px-4 py-4">
                  <p className="text-sm text-gray-400 italic">No prescription issued for this session.</p>
                </div>
              )}
            </div>

            {/* Follow-up */}
            <div className={`flex items-start gap-2 px-4 py-3 border text-sm ${
              session.followUpRequired
                ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}>
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                {session.followUpRequired
                  ? 'A follow-up appointment has been recommended for this patient.'
                  : 'No follow-up appointment required.'}
              </span>
            </div>

            {session.status === 'cancelled' && (
              <div className="flex items-start gap-2 px-4 py-3 border bg-red-50 border-red-200 text-red-700 text-sm">
                <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>This session was cancelled. Medical records may be incomplete.</span>
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

export default ViewPrescriptionModal;
