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
  logins: '#1e40af', // blue-800
  appointments: '#2563eb', // blue-600
  reports: '#7dd3fc'       // sky-300
};

const ActivityChart = ({ compact = false }) => {
  const dailyActivityData = [
    { day: 'Mon', logins: 145, appointments: 89, reports: 23 },
    { day: 'Tue', logins: 167, appointments: 102, reports: 31 },
    { day: 'Wed', logins: 189, appointments: 95, reports: 28 },
    { day: 'Thu', logins: 156, appointments: 118, reports: 35 },
    { day: 'Fri', logins: 201, appointments: 134, reports: 42 },
    { day: 'Sat', logins: 123, appointments: 67, reports: 18 },
    { day: 'Sun', logins: 98, appointments: 45, reports: 12 }
  ];

  const totals = dailyActivityData.reduce(
    (acc, cur) => ({
      logins: acc.logins + cur.logins,
      appointments: acc.appointments + cur.appointments,
      reports: acc.reports + cur.reports
    }),
    { logins: 0, appointments: 0, reports: 0 }
  );

  return (
    <div className={`bg-white border border-gray-200 ${compact ? 'p-3' : 'p-6'}`}>
      <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-4'}`}>
        <h2 className={`${compact ? 'text-sm' : 'text-lg'} font-semibold`}>Daily Activity Overview</h2>
        <select className={`${compact ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className={compact ? 'h-48' : 'h-80'}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyActivityData} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip
              cursor={{ fill: '#eff6ff' }}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
              }}
            />

            <Bar
              dataKey="logins"
              name="Logins"
              fill={COLORS.logins}
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="appointments"
              name="Appointments"
              fill={COLORS.appointments}
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="reports"
              name="Reports"
              fill={COLORS.reports}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className={`flex items-center justify-center flex-wrap ${compact ? 'gap-3 mt-3' : 'gap-6 mt-6'}`}>
        <div className="flex items-center gap-2">
          <div className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} rounded`} style={{ backgroundColor: COLORS.logins }}></div>
          <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>Logins</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} rounded`} style={{ backgroundColor: COLORS.appointments }}></div>
          <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>Appointments</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} rounded`} style={{ backgroundColor: COLORS.reports }}></div>
          <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>Reports</span>
        </div>
      </div>

      {/* Totals Summary */}
      <div className={`${compact ? 'mt-2 pt-2' : 'mt-4 pt-4'} border-t border-gray-100 text-center`}>
        <p className="text-xs text-gray-500">
          Week Total: <span className="font-semibold text-gray-700">{totals.logins}</span> Logins • <span className="font-semibold text-gray-700">{totals.appointments}</span> Appointments • <span className="font-semibold text-gray-700">{totals.reports}</span> Reports
        </p>
      </div>
    </div>
  );
};

export default ActivityChart;
