import React from 'react';

const SidePanel = () => {
  return (
    <div className="space-y-6">
      {/* System Status */}
      <div className="bg-white shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Database</span>
            <span className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Healthy
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">API Services</span>
            <span className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Operational
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Backup System</span>
            <span className="flex items-center text-sm text-yellow-600">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              Syncing
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">New Registrations</span>
            <span className="text-sm font-semibold text-gray-900">23</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Active Sessions</span>
            <span className="text-sm font-semibold text-gray-900">156</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Completed Tasks</span>
            <span className="text-sm font-semibold text-gray-900">89</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">System Alerts</span>
            <span className="text-sm font-semibold text-yellow-600">3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
