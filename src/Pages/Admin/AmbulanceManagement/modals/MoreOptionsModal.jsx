import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  RefreshCw,
  Trash2,
  Archive,
  MapPin,
  Calendar,
  FileText,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';

const MoreOptionsModal = ({ ambulance, onClose, onAction }) => {
  const [pendingAction, setPendingAction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const menuItems = [
    {
      icon: MapPin,
      label: 'Track Location',
      action: 'track',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'View real-time location on map'
    },
    {
      icon: Calendar,
      label: 'Schedule Maintenance',
      action: 'schedule',
     color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'Schedule next maintenance date'
    },
    {
      icon: FileText,
      label: 'View Service History',
      action: 'history',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'View complete service records'
    },
    {
      icon: Download,
      label: 'Export Details',
      action: 'export',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'Download ambulance information'
    },
    {
      icon: Printer,
      label: 'Print Report',
      action: 'print',
     color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'Print detailed report'
    },
    {
      icon: RefreshCw,
      label: 'Refresh Status',
      action: 'refresh',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'Update current status'
    },
    {
      icon: Archive,
      label: 'Archive Vehicle',
      action: 'archive',
     color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'Move to archived vehicles',
      requiresConfirmation: true,
      confirmLabel: 'Archive this vehicle?'
    },
    {
      icon: Trash2,
      label: 'Delete Vehicle',
      action: 'delete',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50',
      description: 'Permanently remove vehicle',
      danger: true,
      requiresConfirmation: true,
      confirmLabel: 'Delete this vehicle permanently?'
    }
  ];

  const actionMap = Object.fromEntries(menuItems.map((item) => [item.action, item]));

  const renderDetails = (details) => {
    if (!details) return null;
    if (Array.isArray(details)) {
      if (details.length === 0) return null;
      return (
        <div className="mt-3 space-y-2">
          {details.map((entry, index) => {
            if (entry && typeof entry === 'object') {
              return (
                <div key={`${index}-obj`} className="rounded bg-white/70 p-2 text-xs text-gray-700 border border-gray-200">
                  {Object.entries(entry).map(([key, value]) => (
                    <div key={key} className="mb-1 last:mb-0">
                      <span className="font-semibold">{key}:</span> {String(value ?? 'N/A')}
                    </div>
                  ))}
                </div>
              );
            }
            return <p key={`${index}-txt`} className="text-xs text-gray-700">{String(entry)}</p>;
          })}
        </div>
      );
    }
    if (details && typeof details === 'object') {
      return (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="rounded bg-white/70 p-2 text-xs text-gray-700 border border-gray-200">
              <span className="font-semibold">{key}:</span> {String(value ?? 'N/A')}
            </div>
          ))}
        </div>
      );
    }
    return <p className="mt-2 text-xs text-gray-700">{String(details)}</p>;
  };

  const feedbackStyle = feedback?.type === 'error'
    ? 'border-red-200 bg-red-50 text-red-700'
    : feedback?.type === 'success'
      ? 'border-green-200 bg-green-50 text-green-700'
      : 'border-blue-200 bg-blue-50 text-blue-700';

  const feedbackIcon = feedback?.type === 'error'
    ? <AlertCircle className="w-4 h-4 mt-0.5" />
    : feedback?.type === 'success'
      ? <CheckCircle2 className="w-4 h-4 mt-0.5" />
      : <Info className="w-4 h-4 mt-0.5" />;

  const executeAction = async (action) => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const result = await onAction(action, ambulance);
      const normalizedResult = result || { type: 'success', message: 'Action completed.' };
      setFeedback(normalizedResult);
      if (normalizedResult.closeModal) {
        onClose();
      }
    } catch (error) {
      setFeedback({ type: 'error', message: error?.message || 'Action failed.' });
    } finally {
      setIsSubmitting(false);
      setPendingAction(null);
    }
  };

  const handleAction = (action) => {
    const option = actionMap[action];
    if (!option) return;
    if (option.requiresConfirmation) {
      setPendingAction(option);
      return;
    }
    executeAction(action);
  };

  if (!ambulance) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center p-4 z-50">
      <div className="bg-white shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="p-6 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">More Options</h2>
              <p className="mt-1">
                {ambulance.vehiclePlate} - {ambulance.registrationNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {feedback && (
            <div className={`mb-4 rounded-lg border px-4 py-3 ${feedbackStyle}`}>
              <div className="flex items-start gap-2">
                {feedbackIcon}
                <div className="flex-1">
                  <p className="text-sm font-medium">{feedback.message}</p>
                  {renderDetails(feedback.details)}
                </div>
              </div>
            </div>
          )}

          {pendingAction && (
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-sm font-semibold text-amber-800">{pendingAction.confirmLabel}</p>
              <p className="text-xs text-amber-700 mt-1">This action will update backend records immediately.</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => executeAction(pendingAction.action)}
                  disabled={isSubmitting}
                  className={`px-3 py-1.5 rounded-md text-white text-sm ${pendingAction.danger ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Processing...' : 'Confirm'}
                </button>
                <button
                  onClick={() => setPendingAction(null)}
                  disabled={isSubmitting}
                  className="px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActionPending = isSubmitting && pendingAction?.action === item.action;
              return (
                <button
                  key={index}
                  onClick={() => handleAction(item.action)}
                  disabled={isSubmitting}
                  className={`flex items-start p-4 border-2 border-gray-100 transition-all ${item.bgColor} ${
                    item.danger ? 'border-red-200' : ''
                  } group ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <div className={`p-2 rounded-lg ${item.danger ? '' : ''} mr-4`}>
                    {isActionPending ? <Loader2 className={`w-5 h-5 ${item.color} animate-spin`} /> : <Icon className={`w-5 h-5 ${item.color}`} />}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-semibold ${item.danger ? 'text-red-600' : 'text-gray-900'} group-hover:${item.color}`}>
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  {item.danger && (
                    <AlertTriangle className="w-5 h-5 text-red-500 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Warning for destructive actions */}
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-yellow-800">Important Notice</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Some actions like Archive and Delete are permanent and cannot be undone. Please proceed with caution.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreOptionsModal;
