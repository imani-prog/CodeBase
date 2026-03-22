import React from 'react';

const TopPerformers = ({ compact = false }) => {
  const topPerformers = [
    { id: 1, name: 'Dr. Sarah Wilson', role: 'CHW', patients: 45, rating: 4.9 },
    { id: 2, name: 'John Mitchell', role: 'CHW', patients: 38, rating: 4.8 },
    { id: 3, name: 'Maria Garcia', role: 'CHW', patients: 42, rating: 4.7 },
    { id: 4, name: 'David Chen', role: 'CHW', patients: 35, rating: 4.6 },
    { id: 5, name: 'Lisa Johnson', role: 'CHW', patients: 29, rating: 4.5 }
  ];

  const performers = compact ? topPerformers.slice(0, 4) : topPerformers;

  return (
    <div className="bg-white border border-gray-200">
      <div className={`${compact ? 'px-3 py-2' : 'px-6 py-4'} border-b border-gray-200`}>
        <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-semibold`}>Top Performing CHWs</h3>
      </div>
      <div className={compact ? 'p-3' : 'p-6'}>
        <div className={compact ? 'space-y-2' : 'space-y-4'}>
          {performers.map((performer, index) => (
            <div 
              key={performer.id} 
              className={`flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors ${compact ? 'p-2' : 'p-3'}`}
            >
              <div className={compact ? 'flex items-center space-x-2' : 'flex items-center space-x-3'}>
                <div className={`${compact ? 'w-6 h-6 text-xs' : 'w-8 h-8'} flex items-center justify-center`}>
                  <span className="text-blue-700">#{index + 1}</span>
                </div>
                <div>
                  <p className={compact ? 'text-xs font-medium' : ''}>{performer.name}</p>
                  <p className="text-xs text-gray-500">{performer.patients} patients</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <span className="text-xs text-blue-500">★</span>
                  <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700 ml-1`}>{performer.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
