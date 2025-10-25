import React, { useState } from 'react';
import { Search, MoreVertical, CheckCircle, AlertCircle, XCircle, Activity } from 'lucide-react';

const RecentActivity = () => {
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

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(activity.status)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
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
          <div className="mt-6">
            <button className="w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              View All Activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
