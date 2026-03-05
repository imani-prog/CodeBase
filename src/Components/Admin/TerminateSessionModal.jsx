import React, { useState, useEffect } from 'react';
import { X, Square, User, Stethoscope, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const TerminateSessionModal = ({ isOpen, onClose, session, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [ended, setEnded] = useState(false);

  // auto-close 2.5 s after success
  useEffect(() => {
    if (!ended) return;
    const t = setTimeout(() => {
      setEnded(false);
      onClose();
    }, 2500);
    return () => clearTimeout(t);
  }, [ended, onClose]);

  // reset when modal re-opens
  useEffect(() => {
    if (isOpen) {
      setEnded(false);
      setReason('');
      setSelectedReason('');
    }
  }, [isOpen]);

  if (!isOpen || !session) return null;

  const presetReasons = [
    'Consultation completed',
    'Patient disconnected',
    'Doctor emergency',
    'Technical failure',
    'Patient requested to end',
    'Other',
  ];

  const handleConfirm = () => {
    const finalReason = selectedReason === 'Other' ? reason : selectedReason;
    onConfirm({ sessionId: session.id, reason: finalReason });
    setEnded(true);
  };

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

  const canConfirm = selectedReason && (selectedReason !== 'Other' || reason.trim());

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={ended ? undefined : onClose}
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-md w-full overflow-hidden">

          {/* ── SUCCESS STATE ── */}
          {ended ? (
            <div className="px-8 py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16  flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Session Ended</h3>
              <p className="text-sm text-gray-600">
                The session for <span className="font-semibold text-gray-800">{session.patient}</span> with{' '}
                <span className="font-semibold text-gray-800">{session.doctor}</span> has been
                permanently terminated.
              </p>
              <p className="text-xs text-gray-400">Both patient and doctor have been disconnected.</p>
              <p className="text-xs text-gray-400 mt-2">Closing automatically…</p>
            </div>
          ) : (
            <>
              {/* ── FORM STATE ── */}
              {/* Header */}
              <div className="relative px-6 py-5 bg-blue-950 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center ring-4 ring-white/30">
                    <Square className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">End Session</h2>
                    <p className="text-sm">This action cannot be undone</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-5">
                {/* Warning */}
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">
                    You are about to permanently end this live session. Both the patient and doctor will
                    be disconnected immediately.
                  </p>
                </div>

                {/* Session summary */}
                <div className="bg-gray-50 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Patient:</span>
                    <span className="font-semibold text-gray-900">{session.patient}</span>
                    <span className="text-xs text-gray-400">({session.patientId})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Stethoscope className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-semibold text-gray-900">{session.doctor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-gray-900">{formatDuration(session.duration)}</span>
                    <span className="text-gray-400">&mdash;</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(session.cost)}</span>
                  </div>
                </div>

                {/* Reason selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reason for ending <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {presetReasons.map((r) => (
                      <label
                        key={r}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                          selectedReason === r
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="terminateReason"
                          value={r}
                          checked={selectedReason === r}
                          onChange={() => setSelectedReason(r)}
                          className="accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">{r}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Custom reason */}
                {selectedReason === 'Other' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Please specify
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Enter reason..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!canConfirm}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  End Session
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminateSessionModal;
