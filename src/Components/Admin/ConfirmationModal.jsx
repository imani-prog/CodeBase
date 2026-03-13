import React from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

const ConfirmationModal = ({ showModal, setShowModal, title, message, onConfirm, type = 'warning' }) => {
  if (!showModal) return null;

  const handleConfirm = () => {
    onConfirm?.();
    setShowModal(false);
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          bg: '',
          iconColor: 'text-blue-600',
          buttonBg: 'bg-red-600 hover:bg-red-700',
          icon: AlertCircle
        };
      case 'success':
        return {
          bg: '',
          iconColor: 'text-blue-600',
          buttonBg: 'bg-green-600 hover:bg-green-700',
          icon: CheckCircle
        };
      case 'warning':
      default:
        return {
          bg: '',
          iconColor: 'text-blue-600',
          buttonBg: 'bg-yellow-600 hover:bg-yellow-700',
          icon: AlertCircle
        };
    }
  };

  const styles = getTypeStyles();
  const Icon = styles.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)} />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="relative px-6 py-4 border-b border-gray-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <div className={`flex items-start space-x-4 p-4 rounded-lg ${styles.bg}`}>
              <Icon className={`w-6 h-6 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
              <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 text-white rounded-lg transition-colors font-medium ${styles.buttonBg}`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
