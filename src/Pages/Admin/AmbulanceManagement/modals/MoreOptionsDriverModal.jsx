import React, { useState } from 'react';
import {
  X,
  Ban,
  UserX,
  History,
  FileText,
  Calendar,
  Download,
  MapPin,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';

const MoreOptionsDriverModal = ({ driver, onClose, onAction }) => {
  const [pendingAction, setPendingAction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const options = [
    {
      id: 'view-history',
      label: 'View Trip History',
      icon: History,
      description: 'View complete trip history and performance records',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'schedule',
      label: 'Manage Schedule',
      icon: Calendar,
      description: 'Update shift schedules and availability',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'location',
      label: 'Track Location',
      icon: MapPin,
      description: 'View current location and movement history',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'export',
      label: 'Export Driver Details',
      icon: Download,
      description: 'Download driver information and records',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'suspend',
      label: 'Suspend Driver',
      icon: Ban,
      description: 'Temporarily suspend driver from active duty',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100',
      requiresConfirmation: true,
      confirmLabel: 'Suspend this driver?'
    },
    {
      id: 'deactivate',
      label: 'Deactivate Driver',
      icon: UserX,
      description: 'Permanently deactivate driver account',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100',
      requiresConfirmation: true,
      confirmLabel: 'Deactivate this driver?'
    },
    {
      id: 'delete',
      label: 'Delete Driver',
      icon: Trash2,
      description: 'Permanently delete driver from system',
      color: 'text-red-600',
      hoverColor: 'hover:bg-red-100',
      requiresConfirmation: true,
      confirmLabel: 'Delete this driver permanently?'
    }
  ];

  const optionMap = Object.fromEntries(options.map((option) => [option.id, option]));

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

  const executeAction = async (optionId) => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const result = await onAction(optionId, driver);
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

  const handleOptionClick = (optionId) => {
    const option = optionMap[optionId];
    if (!option) return;
    if (option.requiresConfirmation) {
      setPendingAction(option);
      return;
    }
    executeAction(optionId);
  };

  if (!driver) return null;

  return (
    <div className="fixed inset-0 flex bg-black/60 backdrop-blur items-center justify-center p-4 z-50 overflow-y-auto transition-opacity">
      <div className="bg-white shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative px-8 py-6 bg-blue-950 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">More Options</h2>
              <p className="text-sm text-white/80">{driver.name}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
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
              <p className="text-xs text-amber-700 mt-1">This action updates backend records immediately.</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => executeAction(pendingAction.id)}
                  disabled={isSubmitting}
                  className={`px-3 py-1.5 rounded-md text-white text-sm ${pendingAction.id === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
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

          <div className="space-y-3">
            {options.map((option) => {
              const Icon = option.icon;
              const isActionPending = isSubmitting && pendingAction?.id === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  disabled={isSubmitting}
                  className={`w-full text-left p-4 rounded-lg border border-gray-200 transition-all ${option.hoverColor} ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${option.bgColor}`}>
                      {isActionPending ? <Loader2 className={`w-6 h-6 ${option.color} animate-spin`} /> : <Icon className={`w-6 h-6 ${option.color}`} />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{option.label}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 flex justify-end space-x-3 border-t">
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

export default MoreOptionsDriverModal;
