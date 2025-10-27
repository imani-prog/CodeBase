import React, { useState } from 'react';
import { Users, BarChart3, Settings, Bell, Plus, Shield, TrendingUp, Download, Calendar, AlertCircle } from 'lucide-react';
import UserManagementModal from '../../../Components/Admin/UserManagementModal';
import AnalyticsModal from '../../../Components/Admin/AnalyticsModal';
import SystemConfigModal from '../../../Components/Admin/SystemConfigModal';
import CommunicationsModal from '../../../Components/Admin/CommunicationsModal';

const AdminFeatures = () => {
  const [activeModal, setActiveModal] = useState({ type: null, action: null });

  const openModal = (type, action) => {
    setActiveModal({ type, action });
  };

  const closeModal = () => {
    setActiveModal({ type: null, action: null });
  };

  const features = [
    {
      title: 'User Management',
      icon: Users,
      
      iconColor: 'text-blue-600',
      items: [
        { icon: Plus, color: 'text-black', text: 'Create & manage user accounts', action: () => openModal('user', 'create') },
        { icon: Shield, color: 'text-black', text: 'Assign roles and permissions', action: () => openModal('user', 'roles') },
        { icon: Settings, color: 'text-black', text: 'Reset passwords & security', action: () => openModal('user', 'security') }
      ]
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      iconColor: 'text-blue-600',
      items: [
        { icon: TrendingUp, color: 'text-black', text: 'Real-time usage analytics', action: () => openModal('analytics', 'realtime') },
        { icon: Download, color: 'text-black', text: 'Export detailed reports', action: () => openModal('analytics', 'export') },
        { icon: Calendar, color: 'text-black', text: 'Historical data trends', action: () => openModal('analytics', 'trends') }
      ]
    },
    {
      title: 'System Config',
      icon: Settings,
      iconColor: 'text-blue-600',
      items: [
        { icon: Settings, color: 'text-black', text: 'Platform configuration', action: () => openModal('config', 'platform') },
        { icon: Bell, color: 'text-black', text: 'Notification preferences', action: () => openModal('config', 'notifications') },
        { icon: Shield, color: 'text-black', text: 'Backup & restore data', action: () => openModal('config', 'backup') }
      ]
    },
    {
      title: 'Communications',
      icon: Bell,
      iconColor: 'text-blue-600',
      items: [
        { icon: AlertCircle, color: 'text-black', text: 'System alerts & messages', action: () => openModal('comms', 'alerts') },
        { icon: Bell, color: 'text-black', text: 'Send announcements', action: () => openModal('comms', 'announcements') },
        { icon: Users, color: 'text-black', text: 'Bulk messaging tools', action: () => openModal('comms', 'bulk') }
      ]
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {features.map((feature, index) => {
          const MainIcon = feature.icon;
          return (
            <div 
              key={index}
              className="bg-white shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 ${feature.iconBg} rounded-lg flex items-center justify-center`}>
                  <MainIcon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">{feature.title}</h3>
              </div>
              <ul className="space-y-3">
                {feature.items.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <li key={idx}>
                      <button
                        onClick={item.action}
                        className="w-full flex items-center text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors text-left"
                      >
                        <ItemIcon className={`w-4 h-4 mr-2 ${item.color}`} />
                        <span className="flex-1">{item.text}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <UserManagementModal
        isOpen={activeModal.type === 'user'}
        onClose={closeModal}
        action={activeModal.action}
      />
      <AnalyticsModal
        isOpen={activeModal.type === 'analytics'}
        onClose={closeModal}
        action={activeModal.action}
      />
      <SystemConfigModal
        isOpen={activeModal.type === 'config'}
        onClose={closeModal}
        action={activeModal.action}
      />
      <CommunicationsModal
        isOpen={activeModal.type === 'comms'}
        onClose={closeModal}
        action={activeModal.action}
      />
    </>
  );
};

export default AdminFeatures;
