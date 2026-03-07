import { AlertTriangle, X, Calendar, Clock, User } from 'lucide-react';

const CancelAppointmentModal = ({ isOpen, onClose, onConfirm, appointment }) => {
  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white shadow-2xl max-w-md w-full overflow-hidden">

        {/* Header */}
        <div className="relative bg-blue-950 px-6 py-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 pr-8">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30 flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Cancel Appointment</h2>
              <p className="text-sm  mt-0.5">This action cannot be undone</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 bg-gray-50">
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to cancel this appointment? The patient will be notified.
          </p>

          {/* Appointment summary */}
          <div className="bg-white border border-gray-200 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <User className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="font-medium">{appointment.patientName || appointment.patient}</span>
            </div>
            {appointment.date && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>{appointment.date}</span>
              </div>
            )}
            {appointment.time && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>{appointment.time}{appointment.duration ? ` · ${appointment.duration}` : ''}</span>
              </div>
            )}
            {(appointment.reason || appointment.type) && (
              <div className="pt-1 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  {appointment.reason || appointment.type}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-white border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-colors"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm?.(appointment);
              onClose?.();
            }}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointmentModal;
