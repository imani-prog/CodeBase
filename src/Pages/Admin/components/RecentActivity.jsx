import React, { useState } from 'react';
import { Search, MoreVertical, CheckCircle, AlertCircle, XCircle, Activity } from 'lucide-react';

const RecentActivity = ({ compact = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const recentActivities = [
    { id: 1, user: 'Dr. Sarah Wilson', role: 'CHW', action: 'Added new patient record', time: '2 min ago', status: 'success' },
    { id: 2, user: 'John Doe', role: 'Patient', action: 'Completed health assessment', time: '5 min ago', status: 'info' },
    { id: 3, user: 'Admin System', role: 'System', action: 'Automated backup completed', time: '10 min ago', status: 'success' },
    { id: 4, user: 'Mary Johnson', role: 'CHW', action: 'Requested approval for new patient', time: '15 min ago', status: 'warning' },
    { id: 5, user: 'Mike Chen', role: 'Patient', action: 'Medication reminder sent', time: '20 min ago', status: 'info' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const activities = compact ? recentActivities.slice(0, 4) : recentActivities;

  return (
    <div className={compact ? '' : 'lg:col-span-2'}>
      <div className="bg-white border border-gray-200">
        <div className={`${compact ? 'px-3 py-2' : 'px-6 py-4'} border-b border-gray-200`}>
          <div className="flex items-center justify-between">
            <h2 className={`${compact ? 'text-sm' : 'text-lg'} font-semibold`}>Recent Activity</h2>
            <div className="flex items-center space-x-2">
              {!compact && (
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search activities..."
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              )}
              <select 
                className={`${compact ? 'text-xs px-2 py-1' : 'text-sm px-3 py-2'} border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent`}
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>
        <div className={compact ? 'p-3' : 'p-6'}>
          <div className={compact ? 'space-y-2' : 'space-y-4'}>
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className={`flex items-center justify-between border border-gray-100 hover:bg-gray-50 transition-colors ${compact ? 'p-2' : 'p-4'}`}
              >
                <div className={compact ? 'flex items-center space-x-2' : 'flex items-center space-x-4'}>
                  {getStatusIcon(activity.status)}
                  <div>
                    <p className={compact ? 'text-xs font-medium' : ''}>{activity.user}</p>
                    <p className={compact ? 'text-xs text-gray-500 leading-tight' : 'text-sm text-gray-500'}>{activity.action}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">{activity.time}</span>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={compact ? 'mt-3' : 'mt-6'}>
            <button className={`w-full ${compact ? 'py-1.5 text-xs' : 'py-2 text-sm'} font-medium text-indigo-600 hover:text-indigo-700 transition-colors`}>
              View All Activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
