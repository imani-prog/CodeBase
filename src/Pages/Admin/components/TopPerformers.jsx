import React from 'react';

const TopPerformers = () => {
  const topPerformers = [
    { id: 1, name: 'Dr. Sarah Wilson', role: 'CHW', patients: 45, rating: 4.9 },
    { id: 2, name: 'John Mitchell', role: 'CHW', patients: 38, rating: 4.8 },
    { id: 3, name: 'Maria Garcia', role: 'CHW', patients: 42, rating: 4.7 },
    { id: 4, name: 'David Chen', role: 'CHW', patients: 35, rating: 4.6 },
    { id: 5, name: 'Lisa Johnson', role: 'CHW', patients: 29, rating: 4.5 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Top Performing CHWs</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {topPerformers.map((performer, index) => (
            <div 
              key={performer.id} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-700">#{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                  <p className="text-xs text-gray-500">{performer.patients} patients</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <span className="text-xs text-yellow-500">★</span>
                  <span className="text-sm font-medium text-gray-700 ml-1">{performer.rating}</span>
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
