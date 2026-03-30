import React, { useState, useEffect } from 'react';
import { X, Pause, User, Stethoscope, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const PauseSessionModal = ({ isOpen, onClose, session, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [paused, setPaused] = useState(false);

  // auto-close 2.5 s after success
  useEffect(() => {
    if (!paused) return;
    const t = setTimeout(() => {
      setPaused(false);
      onClose();
    }, 2500);
    return () => clearTimeout(t);
  }, [paused, onClose]);

  // reset when modal re-opens
  useEffect(() => {
    if (isOpen) {
      setPaused(false);
      setReason('');
      setSelectedReason('');
    }
  }, [isOpen]);

  if (!isOpen || !session) return null;

  const presetReasons = [
    'Technical difficulties',
    'Patient requested break',
    'Doctor will be back shortly',
    'Waiting for test results',
    'Other',
  ];

  const handleConfirm = () => {
    const finalReason = selectedReason === 'Other' ? reason : selectedReason;
    onConfirm({ sessionId: session.id, reason: finalReason });
    setPaused(true);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const canConfirm = selectedReason && (selectedReason !== 'Other' || reason.trim());

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={paused ? undefined : onClose}
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-md w-full overflow-hidden">

          {/* ── SUCCESS STATE ── */}
          {paused ? (
            <div className="px-8 py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Session Paused</h3>
              <p className="text-sm text-gray-600">
                The session for <span className="font-semibold text-gray-800">{session.patient}</span> with{' '}
                <span className="font-semibold text-gray-800">{session.doctor}</span> has been
                temporarily suspended.
              </p>
              <p className="text-xs text-gray-400">Both patient and doctor have been notified.</p>
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-blue-500 rounded-full animate-[shrink_2.5s_linear_forwards]" style={{ animation: 'width 2.5s linear forwards', width: '100%' }} />
              </div>
              <p className="text-xs text-gray-400">Closing automatically…</p>
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
                    <Pause className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Pause Session</h2>
                    <p className="text-sm text-blue-100">Session will be temporarily suspended</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-5">
                {/* Session summary */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Patient:</span>
                    <span className="font-semibold text-gray-900">{session.patient}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Stethoscope className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-semibold text-gray-900">{session.doctor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Duration so far:</span>
                    <span className="font-semibold text-gray-900">{formatDuration(session.duration)}</span>
                  </div>
                </div>

                {/* Reason selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reason for pausing <span className="text-red-500">*</span>
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
                          name="pauseReason"
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

                {/* Custom reason input */}
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

                {/* Info note */}
                <div className="flex items-start gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>The session can be resumed at any time. Both patient and doctor will be notified.</span>
                </div>
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
                  Pause Session
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PauseSessionModal;
