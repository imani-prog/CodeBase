import React from 'react';

const RecentRegistrations = () => {
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
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Approved':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Registrations</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {recentRegistrations.map((reg) => (
            <div 
              key={reg.id} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{reg.name}</p>
                <p className="text-xs text-gray-500">{reg.type} • {reg.date}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status)}`}>
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
