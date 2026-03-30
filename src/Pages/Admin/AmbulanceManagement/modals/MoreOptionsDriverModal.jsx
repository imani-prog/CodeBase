import React from 'react';
import {
  X,
  Ban,
  UserX,
  History,
  FileText,
  Calendar,
  Download,
  MapPin,
  Trash2
} from 'lucide-react';

const MoreOptionsDriverModal = ({ driver, onClose, onAction }) => {
  if (!driver) return null;

  const options = [
    {
      id: 'view-history',
      label: 'View Trip History',
      icon: History,
      description: 'View complete trip history and performance records',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'schedule',
      label: 'Manage Schedule',
      icon: Calendar,
      description: 'Update shift schedules and availability',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'location',
      label: 'Track Location',
      icon: MapPin,
      description: 'View current location and movement history',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'export',
      label: 'Export Driver Details',
      icon: Download,
      description: 'Download driver information and records',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'suspend',
      label: 'Suspend Driver',
      icon: Ban,
      description: 'Temporarily suspend driver from active duty',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'deactivate',
      label: 'Deactivate Driver',
      icon: UserX,
      description: 'Permanently deactivate driver account',
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'delete',
      label: 'Delete Driver',
      icon: Trash2,
      description: 'Permanently delete driver from system',
      color: 'text-red-600',
      hoverColor: 'hover:bg-red-100'
    }
  ];

  const handleOptionClick = (optionId) => {
    onAction(optionId, driver);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative px-8 py-6 bg-blue-950 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">More Options</h2>
              <p className="text-sm text-white/80">{driver.name}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-3">
            {options.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className={`w-full text-left p-4 rounded-lg border border-gray-200 transition-all ${option.hoverColor}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${option.bgColor}`}>
                      <Icon className={`w-6 h-6 ${option.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{option.label}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 flex justify-end space-x-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreOptionsDriverModal;
