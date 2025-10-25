import React from 'react';
import { Edit3, Users, UserCheck, CheckCircle, FileText, Settings, Bell, BarChart3 } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { icon: Edit3, label: 'Edit Profile', color: 'indigo' },
    { icon: Users, label: 'View Patients', color: 'blue' },
    { icon: UserCheck, label: 'View CHWs', color: 'green' },
    { icon: CheckCircle, label: 'Approvals', color: 'yellow' },
    { icon: FileText, label: 'System Logs', color: 'purple' },
    { icon: Settings, label: 'Settings', color: 'red' },
    { icon: Bell, label: 'Notifications', color: 'pink' },
    { icon: BarChart3, label: 'Analytics', color: 'teal' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button 
              key={index}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-200 transition-colors`}>
                <Icon className={`w-6 h-6 text-${action.color}-600`} />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2 text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
