import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const SidePanel = () => {
  const data = [
    { name: 'New Registrations', value: 23, color: '#3b82f6' },
    { name: 'Active Sessions', value: 46, color: '#7dd3fc' },
    { name: 'Completed Tasks', value: 89, color: '#1e40af' },
    { name: 'System Alerts', value: 20, color: '#f59e0b' }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="bg-white px-3 py-2 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            Count: <span className="font-semibold">{payload[0].value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Percentage: <span className="font-semibold">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* System Status */}
      <div className="bg-white p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Database</span>
            <span className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Healthy
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">API Services</span>
            <span className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Operational
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Backup System</span>
            <span className="flex items-center text-sm text-yellow-600">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              Syncing
            </span>
          </div>
        </div>
      </div>

      {/* Today's Overview with Pie Chart */}
      <div className="bg-white p-4 border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Today's Overview</h3>
        
        {/* Pie Chart */}
        <div className="h-64 mb-1 -mx-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={95}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with values */}
        <div className="grid grid-cols-2 gap-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600 whitespace-nowrap">{item.name}</span>
              <span className="text-sm font-semibold text-gray-900 ml-1">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Activity</span>
            <span className="text-base font-bold text-gray-900">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;