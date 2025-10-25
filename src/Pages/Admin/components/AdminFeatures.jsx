import React from 'react';
import { Users, BarChart3, Settings, Bell, Plus, Shield, TrendingUp, Download, Calendar, AlertCircle } from 'lucide-react';

const AdminFeatures = () => {
  const features = [
    {
      title: 'User Management',
      icon: Users,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      items: [
        { icon: Plus, color: 'text-green-500', text: 'Create & manage user accounts' },
        { icon: Shield, color: 'text-blue-500', text: 'Assign roles and permissions' },
        { icon: Settings, color: 'text-gray-500', text: 'Reset passwords & security' }
      ]
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      items: [
        { icon: TrendingUp, color: 'text-green-500', text: 'Real-time usage analytics' },
        { icon: Download, color: 'text-blue-500', text: 'Export detailed reports' },
        { icon: Calendar, color: 'text-gray-500', text: 'Historical data trends' }
      ]
    },
    {
      title: 'System Config',
      icon: Settings,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      items: [
        { icon: Settings, color: 'text-blue-500', text: 'Platform configuration' },
        { icon: Bell, color: 'text-yellow-500', text: 'Notification preferences' },
        { icon: Shield, color: 'text-green-500', text: 'Backup & restore data' }
      ]
    },
    {
      title: 'Communications',
      icon: Bell,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      items: [
        { icon: AlertCircle, color: 'text-orange-500', text: 'System alerts & messages' },
        { icon: Bell, color: 'text-blue-500', text: 'Send announcements' },
        { icon: Users, color: 'text-green-500', text: 'Bulk messaging tools' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {features.map((feature, index) => {
        const MainIcon = feature.icon;
        return (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 ${feature.iconBg} rounded-lg flex items-center justify-center`}>
                <MainIcon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">{feature.title}</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {feature.items.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <li key={idx} className="flex items-center">
                    <ItemIcon className={`w-4 h-4 mr-2 ${item.color}`} />
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default AdminFeatures;
