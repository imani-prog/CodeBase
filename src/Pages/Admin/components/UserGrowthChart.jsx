import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserGrowthChart = () => {
  const userGrowthData = [
    { month: 'Jan', patients: 600, chws: 200, doctors: 380, drivers: 155 },
    { month: 'Feb', patients: 750, chws: 480, doctors: 320, drivers: 218 },
    { month: 'Mar', patients: 650, chws: 550, doctors: 300, drivers: 200 },
    { month: 'Apr', patients: 1050, chws: 452, doctors: 380, drivers: 322 },
    { month: 'May', patients: 800, chws: 680, doctors: 420, drivers: 325 },
    { month: 'Jun', patients: 1100, chws: 720, doctors: 450, drivers: 328 }
  ];

  return (
    <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">User Growth Trends</h2>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="6m">Last 6 Months</option>
          <option value="1y">Last Year</option>
        </select>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={userGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={true} horizontal={true} />
            <XAxis 
              dataKey="month" 
              stroke="#64748b" 
              fontSize={12}
              tick={{ fill: '#64748b' }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12}
              tick={{ fill: '#64748b' }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={{ stroke: '#cbd5e1' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="patients" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7 }}
              name="Patients"
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
            <Line 
              type="monotone" 
              dataKey="chws" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ fill: '#10b981', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7 }}
              name="CHWs"
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
            <Line 
              type="monotone" 
              dataKey="doctors" 
              stroke="#8b5cf6" 
              strokeWidth={3} 
              dot={{ fill: '#8b5cf6', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7 }}
              name="Doctors"
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
            <Line 
              type="monotone" 
              dataKey="admins" 
              stroke="#f59e0b" 
              strokeWidth={3} 
              dot={{ fill: '#f59e0b', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7 }}
              name="Admins"
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
            <Line 
              type="monotone" 
              dataKey="hospitals" 
              stroke="#ef4444" 
              strokeWidth={3} 
              dot={{ fill: '#ef4444', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7 }}
              name="Hospitals"
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
            <Line 
              type="monotone" 
              dataKey="drivers" 
              stroke="#06b6d4" 
              strokeWidth={3} 
              dot={{ fill: '#06b6d4', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7 }}
              name="Ambulance Drivers"
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-4 h-2 bg-blue-500 mr-2"></div>
          <span className="text-sm text-gray-600">Patients</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-2  bg-green-500 mr-2"></div>
          <span className="text-sm text-gray-600">CHWs</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-2 bg-purple-500 mr-2"></div>
          <span className="text-sm text-gray-600">Doctors</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-2 bg-cyan-500 mr-2"></div>
          <span className="text-sm text-gray-600">Drivers</span>
        </div>
      </div>
    </div>
  );
};

export default UserGrowthChart;