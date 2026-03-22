import React from 'react';
import { AlertTriangle, Info, XCircle, CheckCircle } from 'lucide-react';

const SystemAlerts = ({ compact = false }) => {
  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High server load detected', time: '5 min ago' },
    { id: 2, type: 'info', message: 'Scheduled maintenance in 2 hours', time: '1 hour ago' },
    { id: 3, type: 'error', message: 'Failed backup attempt', time: '3 hours ago' },
    { id: 4, type: 'success', message: 'Security update completed', time: '6 hours ago' }
  ];

  const getAlertIcon = (type) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case 'error':
        return <XCircle className={`${iconClass} text-red-500`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-yellow-500`} />;
      case 'success':
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case 'info':
        return <Info className={`${iconClass} text-blue-500`} />;
      default:
        return <Info className={`${iconClass} text-gray-500`} />;

    }
  };

  const alerts = compact ? systemAlerts.slice(0, 4) : systemAlerts;

  return (
    <div className="bg-white border border-gray-200">
      <div className={`${compact ? 'px-3 py-2' : 'px-6 py-4'} border-b border-gray-200`}>
        <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-semibold text-gray-900`}>System Alerts</h3>
      </div>
      <div className={compact ? 'p-3' : 'p-6'}>
        <div className={compact ? 'space-y-2' : 'space-y-4'}>
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`flex items-start space-x-3 rounded-lg hover:bg-gray-50 transition-colors ${compact ? 'p-2' : 'p-3'}`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <p className={compact ? 'text-xs leading-tight' : 'text-sm'}>{alert.message}</p>
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
