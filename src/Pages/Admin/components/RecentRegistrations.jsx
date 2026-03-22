import React from 'react';

const RecentRegistrations = ({ compact = false }) => {
  const recentRegistrations = [
    { id: 1, name: 'Alice Brown', type: 'Patient', date: '2024-08-23', status: 'Active' },
    { id: 2, name: 'Robert Taylor', type: 'CHW', date: '2024-08-22', status: 'Pending' },
    { id: 3, name: 'Emma Davis', type: 'Patient', date: '2024-08-22', status: 'Active' },
    { id: 4, name: 'Michael Wilson', type: 'Patient', date: '2024-08-21', status: 'Active' },
    { id: 5, name: 'Sophie Anderson', type: 'CHW', date: '2024-08-21', status: 'Approved' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-700';
      case 'Pending':
        return 'text-yellow-700';
      case 'Approved':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  };

  const registrations = compact ? recentRegistrations.slice(0, 4) : recentRegistrations;

  return (
    <div className="bg-white border border-gray-200">
      <div className={`${compact ? 'px-3 py-2' : 'px-6 py-4'} border-b border-gray-200`}>
        <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-semibold `}>Recent Registrations</h3>
      </div>
      <div className={compact ? 'p-3' : 'p-6'}>
        <div className={compact ? 'space-y-2' : 'space-y-4'}>
          {registrations.map((reg) => (
            <div 
              key={reg.id} 
              className={`flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors ${compact ? 'p-2' : 'p-3'}`}
            >
              <div>
                <p className={compact ? 'text-xs font-medium' : ''}>{reg.name}</p>
                <p className="text-xs text-gray-500">{reg.type} • {reg.date}</p>
              </div>
              <span className={`${compact ? 'px-1.5 py-0.5' : 'px-2 py-1'} rounded-full text-xs font-medium ${getStatusColor(reg.status)}`}>
                {reg.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentRegistrations;
