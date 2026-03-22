import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const COLORS = {
  chws: '#1e40af',      // blue-800
  admins: '#1d4ed8',    // blue-700
  doctors: '#2563eb',   // blue-600
  patients: '#3b82f6',  // blue-500
  drivers: '#0ea5e9',   // blue-500 
  hospitals: '#60a5fa'  // blue-400 
};


const UserGrowthBarChart = ({ compact = false }) => {
  const data = [
    { month: 'Jan', patients: 600, chws: 200, doctors: 380, admins: 120, hospitals: 90, drivers: 155 },
    { month: 'Feb', patients: 750, chws: 480, doctors: 320, admins: 160, hospitals: 130, drivers: 218 },
    { month: 'Mar', patients: 650, chws: 550, doctors: 300, admins: 190, hospitals: 150, drivers: 200 },
    { month: 'Apr', patients: 1050, chws: 452, doctors: 380, admins: 240, hospitals: 170, drivers: 322 },
    { month: 'May', patients: 800, chws: 680, doctors: 420, admins: 260, hospitals: 200, drivers: 325 },
    { month: 'Jun', patients: 1100, chws: 720, doctors: 450, admins: 290, hospitals: 230, drivers: 328 }
  ];

  const latest = data[data.length - 1];
  const totalUsers = Object.values(latest)
    .filter(v => typeof v === 'number')
    .reduce((a, b) => a + b, 0);

  return (
    <div className={`bg-white border border-gray-200 ${compact ? 'p-3' : 'p-6'}`}>
      <h2 className={`${compact ? 'text-sm mb-2' : 'text-lg mb-4'} font-semibold`}>
        Monthly User Growth Comparison
      </h2>

      <div className={compact ? 'h-48' : 'h-80'}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />

            <Bar dataKey="patients" fill={COLORS.patients} radius={[6, 6, 0, 0]} />
            <Bar dataKey="chws" fill={COLORS.chws} radius={[6, 6, 0, 0]} />
            <Bar dataKey="doctors" fill={COLORS.doctors} radius={[6, 6, 0, 0]} />
            <Bar dataKey="admins" fill={COLORS.admins} radius={[6, 6, 0, 0]} />
            <Bar dataKey="hospitals" fill={COLORS.hospitals} radius={[6, 6, 0, 0]} />
            <Bar dataKey="drivers" fill={COLORS.drivers} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className={`flex items-center justify-center flex-wrap ${compact ? 'gap-3 mt-3' : 'gap-6 mt-6'}`}>
        <div className="flex items-center gap-2">
          <div className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} rounded`} style={{ backgroundColor: COLORS.patients }}></div>
          <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>Patients</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} rounded`} style={{ backgroundColor: COLORS.chws }}></div>
          <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>CHWs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} rounded`} style={{ backgroundColor: COLORS.doctors }}></div>
          <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>Doctors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} rounded`} style={{ backgroundColor: COLORS.admins }}></div>
          <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>Admins</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} rounded`} style={{ backgroundColor: COLORS.hospitals }}></div>
          <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>Hospitals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} rounded`} style={{ backgroundColor: COLORS.drivers }}></div>
          <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>Drivers</span>
        </div>
      </div>

      {/* Totals Summary */}
      <div className={`${compact ? 'mt-2 pt-2' : 'mt-4 pt-4'} border-t border-gray-100 text-center`}>
        <p className="text-xs text-gray-500">
          Latest Month Total: <span className="font-semibold text-gray-700">{totalUsers}</span> users • Largest Segment: <span className="font-semibold text-gray-700">Patients ({latest.patients})</span>
        </p>
      </div>
    </div>
  );
};

export default UserGrowthBarChart;
