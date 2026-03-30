import React from 'react';
import {
  X,
  Download,
  Printer,
  RefreshCw,
  Trash2,
  Archive,
  MapPin,
  Calendar,
  FileText,
  AlertTriangle
} from 'lucide-react';

const MoreOptionsModal = ({ ambulance, onClose, onAction }) => {
  if (!ambulance) return null;

  const menuItems = [
    {
      icon: MapPin,
      label: 'Track Location',
      action: 'track',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'View real-time location on map'
    },
    {
      icon: Calendar,
      label: 'Schedule Maintenance',
      action: 'schedule',
     color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'Schedule next maintenance date'
    },
    {
      icon: FileText,
      label: 'View Service History',
      action: 'history',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'View complete service records'
    },
    {
      icon: Download,
      label: 'Export Details',
      action: 'export',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'Download ambulance information'
    },
    {
      icon: Printer,
      label: 'Print Report',
      action: 'print',
     color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'Print detailed report'
    },
    {
      icon: RefreshCw,
      label: 'Refresh Status',
      action: 'refresh',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'Update current status'
    },
    {
      icon: Archive,
      label: 'Archive Vehicle',
      action: 'archive',
     color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      description: 'Move to archived vehicles'
    },
    {
      icon: Trash2,
      label: 'Delete Vehicle',
      action: 'delete',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50',
      description: 'Permanently remove vehicle',
      danger: true
    }
  ];

  const handleAction = (action) => {
    onAction(action, ambulance);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="p-6 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">More Options</h2>
              <p className="mt-1">
                {ambulance.vehiclePlate} - {ambulance.registrationNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleAction(item.action)}
                  className={`flex items-start p-4 border-2 border-gray-100 transition-all ${item.bgColor} ${
                    item.danger ? 'border-red-200' : ''
                  } group`}
                >
                  <div className={`p-2 rounded-lg ${item.danger ? '' : ''} mr-4`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-semibold ${item.danger ? 'text-red-600' : 'text-gray-900'} group-hover:${item.color}`}>
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  {item.danger && (
                    <AlertTriangle className="w-5 h-5 text-red-500 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Warning for destructive actions */}
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-yellow-800">Important Notice</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Some actions like Archive and Delete are permanent and cannot be undone. Please proceed with caution.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t rounded-b-xl">
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

export default MoreOptionsModal;
