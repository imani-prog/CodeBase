import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Search,
  RefreshCw,
  Download,
  Clock,
  User,
  Server,
  Database,
  Shield,
  HardDrive,
  Cpu,
  Monitor,
  Eye,
  MoreHorizontal,
} from 'lucide-react';

const SystemLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [logs] = useState([]);

  // Sample system logs
  const systemLogs = [
    {
      id: 1,
      timestamp: '2024-10-11 17:15:32',
      level: 'info',
      category: 'user_activity',
      source: 'Authentication Service',
      message: 'User login: Dr. Sarah Mitchell (admin)',
      details: 'Successful login from IP: 192.168.1.100',
    },
    {
      id: 2,
      timestamp: '2024-10-11 17:12:45',
      level: 'warning',
      category: 'system_performance',
      source: 'Database Monitor',
      message: 'High database connection count detected',
      details: 'Current connections: 85/100. Consider scaling database pool.',
    },
    {
      id: 3,
      timestamp: '2024-10-11 17:10:18',
      level: 'success',
      category: 'data_backup',
      source: 'Backup Service',
      message: 'Patient data backup completed successfully',
      details: 'Backup size: 2.3GB, Duration: 15 minutes',
    },
    {
      id: 4,
      timestamp: '2024-10-11 17:08:22',
      level: 'error',
      category: 'api_service',
      source: 'Patient API',
      message: 'Failed to process patient registration request',
      details: 'Database timeout error. Request ID: REQ_2024_1011_001',
    },
  ];

  const levelOptions = [
    { value: 'all', label: 'All Levels', count: systemLogs.length },
    { value: 'error', label: 'Error', count: systemLogs.filter(l => l.level === 'error').length },
    { value: 'warning', label: 'Warning', count: systemLogs.filter(l => l.level === 'warning').length },
    { value: 'info', label: 'Info', count: systemLogs.filter(l => l.level === 'info').length },
    { value: 'success', label: 'Success', count: systemLogs.filter(l => l.level === 'success').length },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories', count: systemLogs.length },
    { value: 'user_activity', label: 'User Activity', count: systemLogs.filter(l => l.category === 'user_activity').length },
    { value: 'system_performance', label: 'System Performance', count: systemLogs.filter(l => l.category === 'system_performance').length },
    { value: 'data_backup', label: 'Data Backup', count: systemLogs.filter(l => l.category === 'data_backup').length },
    { value: 'api_service', label: 'API Service', count: systemLogs.filter(l => l.category === 'api_service').length },
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
  ];

  // Filtering
  const filteredLogs = systemLogs.filter(log => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelIcon = level => {
    switch (level) {
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryIcon = category => {
    switch (category) {
      case 'user_activity':
        return <User className="w-4 h-4" />;
      case 'system_performance':
        return <Cpu className="w-4 h-4" />;
      case 'data_backup':
        return <HardDrive className="w-4 h-4" />;
      case 'api_service':
        return <Server className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const refreshLogs = () => console.log('Refreshing logs...');
  const exportLogs = () => console.log('Exporting logs...');

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(refreshLogs, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 rounded-2xl p-8 text-white shadow-lg mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">System Logs</h1>
            <p className="text-blue-200 text-lg">
              Monitor and analyze system activities, errors, and performance
            </p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-300" />
                <span className="text-blue-200">{filteredLogs.length} Log Entries</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-300" />
                <span className="text-blue-200">
                  {systemLogs.filter(l => l.level === 'error' || l.level === 'warning').length} Issues
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-300" />
                <span className="text-blue-200">Real-time Monitoring</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <Server className="w-16 h-16 text-blue-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs, messages, or sources..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {levelOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({opt.count})
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categoryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({opt.count})
                </option>
              ))}
            </select>

            <select
              value={selectedDateRange}
              onChange={e => setSelectedDateRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {dateRangeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoRefresh"
                checked={autoRefresh}
                onChange={e => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="autoRefresh" className="text-sm text-gray-600">
                Auto-refresh ({refreshInterval}s)
              </label>
            </div>
            <button
              onClick={refreshLogs}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
            </button>
            <button
              onClick={exportLogs}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getLevelIcon(log.level)}
                      <span className="ml-2 text-sm font-medium capitalize">{log.level}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 flex items-center text-sm text-gray-600">
                    {getCategoryIcon(log.category)}
                    <span className="ml-2 capitalize">{log.category.replace('_', ' ')}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.source}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <p>{log.message}</p>
                    <p className="text-xs text-gray-500">{log.details}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No logs found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedLevel !== 'all' || selectedCategory !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'No system logs are available for this period'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
