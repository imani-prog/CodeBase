import React, { useState } from 'react';
import { X, TrendingUp, Download, Calendar } from 'lucide-react';

const AnalyticsModal = ({ isOpen, onClose, action }) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [reportType, setReportType] = useState('users');

  if (!isOpen) return null;

  const handleExport = (format) => {
    console.log(`Exporting ${reportType} report as ${format}`, dateRange);
    // Implement export logic
    onClose();
  };

  const renderContent = () => {
    switch(action) {
      case 'realtime':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-blue-600">1,234</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% from yesterday</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Sessions</p>
                <p className="text-2xl font-bold text-green-600">3,456</p>
                <p className="text-xs text-green-600 mt-1">↑ 8% from yesterday</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Page Views</p>
                <p className="text-2xl font-bold text-purple-600">12,345</p>
                <p className="text-xs text-red-600 mt-1">↓ 3% from yesterday</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Duration</p>
                <p className="text-2xl font-bold text-yellow-600">5:23</p>
                <p className="text-xs text-green-600 mt-1">↑ 15% from yesterday</p>
              </div>
            </div>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="users">User Analytics</option>
                <option value="patients">Patient Activity</option>
                <option value="chw">CHW Performance</option>
                <option value="system">System Usage</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleExport('pdf')}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Export PDF
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Export CSV
              </button>
            </div>
          </div>
        );

      case 'trends':
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">7 Days</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">30 Days</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">90 Days</button>
            </div>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">User Growth</p>
                <p className="text-xs text-gray-600">+234 new users this week</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Engagement Rate</p>
                <p className="text-xs text-gray-600">78% average engagement</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Peak Hours</p>
                <p className="text-xs text-gray-600">2PM - 5PM daily</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const titles = {
    realtime: 'Real-time Analytics',
    export: 'Export Detailed Reports',
    trends: 'Historical Data Trends'
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{titles[action]}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
