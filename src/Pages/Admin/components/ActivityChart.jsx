import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ActivityChart = () => {
  const dailyActivityData = [
    { day: 'Mon', logins: 145, appointments: 89, reports: 23 },
    { day: 'Tue', logins: 167, appointments: 102, reports: 31 },
    { day: 'Wed', logins: 189, appointments: 95, reports: 28 },
    { day: 'Thu', logins: 156, appointments: 118, reports: 35 },
    { day: 'Fri', logins: 201, appointments: 134, reports: 42 },
    { day: 'Sat', logins: 123, appointments: 67, reports: 18 },
    { day: 'Sun', logins: 98, appointments: 45, reports: 12 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Daily Activity Overview</h2>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Bar dataKey="logins" fill="#3b82f6" name="Logins" radius={[2, 2, 0, 0]} />
            <Bar dataKey="appointments" fill="#10b981" name="Appointments" radius={[2, 2, 0, 0]} />
            <Bar dataKey="reports" fill="#f59e0b" name="Reports" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
