import React from 'react';

const SystemAlerts = () => {
  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High server load detected', time: '5 min ago' },
    { id: 2, type: 'info', message: 'Scheduled maintenance in 2 hours', time: '1 hour ago' },
    { id: 3, type: 'error', message: 'Failed backup attempt', time: '3 hours ago' },
    { id: 4, type: 'success', message: 'Security update completed', time: '6 hours ago' }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'success':
        return 'bg-green-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {systemAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${getAlertColor(alert.type)}`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemAlerts;
