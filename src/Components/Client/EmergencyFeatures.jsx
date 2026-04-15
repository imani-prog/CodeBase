import { useMemo, useState } from 'react';
import { AlertCircle, Clock, Siren, X } from 'lucide-react';

const toTimestamp = (value) => {
  const date = new Date(value || '');
  const ms = date.getTime();
  return Number.isNaN(ms) ? 0 : ms;
};

const formatDate = (value) => {
  const date = new Date(value || '');
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatTime = (value) => {
  const date = new Date(value || '');
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleTimeString('en-KE', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const EmergencyFeatures = ({ dispatchHistory = [], activeDispatches = [] }) => {
  const [showHistory, setShowHistory] = useState(false);

  const emergencyHistory = useMemo(() => [...dispatchHistory]
    .sort((a, b) => toTimestamp(b.requestedAt) - toTimestamp(a.requestedAt))
    .map((item) => ({
      id: item.backendId || item.incidentId,
      service: item.ambulanceName || item.vehiclePlate || `Status: ${item.statusLabel || item.status || 'Requested'}`,
      date: formatDate(item.requestedAt),
      time: formatTime(item.requestedAt),
      status: item.statusLabel || item.status || 'Requested',
      incidentType: item.incidentType || 'Medical Emergency',
    })), [dispatchHistory]);

  const activeEmergency = useMemo(() => (activeDispatches.length > 0
    ? {
      name: activeDispatches[0].ambulanceName || activeDispatches[0].vehiclePlate || `Status: ${activeDispatches[0].statusLabel || activeDispatches[0].status || 'Requested'}`,
      eta: activeDispatches[0].estimatedResponse || 'Pending',
      status: activeDispatches[0].statusLabel || activeDispatches[0].status || 'Requested',
    }
    : null), [activeDispatches]);

  return (
    <>
      <div className="space-y-3 mb-4">
        {activeEmergency && (
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 mb-1">
              <AlertCircle className="w-4 h-4" />
              <p className="text-xs font-semibold">Active Emergency</p>
            </div>
            <p className="text-sm font-bold text-gray-900">{activeEmergency.name}</p>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-600">
              <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-100">{activeEmergency.status}</span>
              <span>ETA: {activeEmergency.eta}</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-2 border border-gray-200">
            <button
              onClick={() => setShowHistory(true)}
              className="w-full flex items-center justify-between text-left hover:bg-gray-50 transition-colors p-1.5 rounded cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-gray-900">Emergency Request History</h3>
              </div>
              <span className="text-xs text-gray-500">View</span>
            </button>
          </div>
      </div>

      {showHistory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Emergency Request History
              </h3>
              <button onClick={() => setShowHistory(false)}>
                <X className="w-5 h-5 font-bold hover:text-gray-600" />
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {emergencyHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                      <Siren className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.service}</p>
                      <p className="text-xs text-gray-600">{item.date} at {item.time}</p>
                      <p className="text-xs text-gray-500">{item.incidentType}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">
                    {item.status}
                  </span>
                </div>
              ))}
              {emergencyHistory.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No emergency history yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyFeatures;
