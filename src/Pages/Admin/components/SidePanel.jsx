import React from 'react';

const SidePanel = () => {
  return (
    <div className="space-y-6">
      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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

      {/* Recent Notifications */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm font-medium text-blue-800">System Update</p>
            <p className="text-xs text-blue-600">New features deployed successfully</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm font-medium text-yellow-800">Pending Review</p>
            <p className="text-xs text-yellow-600">5 CHW applications awaiting approval</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <p className="text-sm font-medium text-green-800">Backup Complete</p>
            <p className="text-xs text-green-600">Daily backup finished at 3:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
