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

  const totals = dailyActivityData.reduce(
    (acc, cur) => ({
      logins: acc.logins + cur.logins,
      appointments: acc.appointments + cur.appointments,
      reports: acc.reports + cur.reports
    }),
    { logins: 0, appointments: 0, reports: 0 }
  );

  return (
    <div className="bg-white shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Daily Activity Overview</h2>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="h-80">
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
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.logins }}></div>
          <span className="text-sm text-gray-600">Logins</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.appointments }}></div>
          <span className="text-sm text-gray-600">Appointments</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.reports }}></div>
          <span className="text-sm text-gray-600">Reports</span>
        </div>
      </div>

      {/* Totals Summary */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          Week Total: <span className="font-semibold text-gray-700">{totals.logins}</span> Logins • <span className="font-semibold text-gray-700">{totals.appointments}</span> Appointments • <span className="font-semibold text-gray-700">{totals.reports}</span> Reports
        </p>
      </div>
    </div>
  );
};

export default ActivityChart;
