import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info, 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  RefreshCw,
  Clock,
  User,
  Server,
  Database,
  Shield,
  Wifi,
  HardDrive,
  Cpu,
  Monitor,
  ChevronDown,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import AdminNavbar from '../../Components/AdminNavbar';
import AdminSidebar from '../../Components/AdminSidebar';

const SystemLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [showFilters, setShowFilters] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [logs, setLogs] = useState([]);

  // Sample system logs data - MediLink specific
  const systemLogs = [
    {
      id: 1,
      timestamp: '2024-10-11 17:15:32',
      level: 'info',
      category: 'user_activity',
      source: 'Authentication Service',
      message: 'User login: Dr. Sarah Mitchell (admin)',
      details: 'Successful login from IP: 192.168.1.100',
      userId: 'admin_001',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Chrome/118.0)'
    },
    {
      id: 2,
      timestamp: '2024-10-11 17:12:45',
      level: 'warning',
      category: 'system_performance',
      source: 'Database Monitor',
      message: 'High database connection count detected',
      details: 'Current connections: 85/100. Consider scaling database pool.',
      metric: 'db_connections',
      value: 85,
      threshold: 80
    },
    {
      id: 3,
      timestamp: '2024-10-11 17:10:18',
      level: 'success',
      category: 'data_backup',
      source: 'Backup Service',
      message: 'Patient data backup completed successfully',
      details: 'Backup size: 2.3GB, Duration: 15 minutes',
      backupSize: '2.3GB',
      duration: '15 minutes'
    },
    {
      id: 4,
      timestamp: '2024-10-11 17:08:22',
      level: 'error',
      category: 'api_service',
      source: 'Patient API',
      message: 'Failed to process patient registration request',
      details: 'Database timeout error. Request ID: REQ_2024_1011_001',
      errorCode: 'DB_TIMEOUT',
      requestId: 'REQ_2024_1011_001'
    },
    {
      id: 5,
      timestamp: '2024-10-11 17:05:55',
      level: 'info',
      category: 'system_security',
      source: 'Security Monitor',
      message: 'SSL certificate renewal reminder',
      details: 'Certificate expires in 30 days. Domain: medilink.com',
      domain: 'medilink.com',
      expiryDate: '2024-11-10'
    },
    {
      id: 6,
      timestamp: '2024-10-11 17:03:10',
      level: 'info',
      category: 'chw_activity',
      source: 'CHW Service',
      message: 'CHW Grace Achieng submitted patient report',
      details: 'Patient ID: PAT_001, Report Type: Weekly Health Check',
      chwId: 'CHW_003',
      patientId: 'PAT_001',
      reportType: 'Weekly Health Check'
    },
    {
      id: 7,
      timestamp: '2024-10-11 17:00:33',
      level: 'warning',
      category: 'system_performance',
      source: 'Server Monitor',
      message: 'High CPU usage detected on web server',
      details: 'CPU usage: 92%. Consider scaling resources.',
      serverName: 'web-server-01',
      cpuUsage: 92,
      threshold: 85
    },
    {
      id: 8,
      timestamp: '2024-10-11 16:58:45',
      level: 'info',
      category: 'telemedicine',
      source: 'Video Service',
      message: 'Telemedicine session completed successfully',
      details: 'Doctor: Dr. Kevin Murage, Patient: Peter Njoroge, Duration: 20 minutes',
      doctorId: 'DOC_005',
      patientId: 'PAT_008',
      duration: '20 minutes'
    },
    {
      id: 9,
      timestamp: '2024-10-11 16:55:12',
      level: 'error',
      category: 'system_security',
      source: 'Firewall',
      message: 'Suspicious login attempt blocked',
      details: 'Multiple failed login attempts from IP: 203.0.113.42',
      ipAddress: '203.0.113.42',
      attemptCount: 5,
      action: 'blocked'
    },
    {
      id: 10,
      timestamp: '2024-10-11 16:52:28',
      level: 'success',
      category: 'patient_data',
      source: 'Patient Service',
      message: 'Patient medical record updated successfully',
      details: 'Patient: Susan Mwangi, Updated by: Dr. Sarah Mitchell',
      patientId: 'PAT_012',
      updatedBy: 'DOC_001',
      recordType: 'Medical History'
    }
  ];

  const levelOptions = [
    { value: 'all', label: 'All Levels', count: systemLogs.length },
    { value: 'error', label: 'Error', count: systemLogs.filter(log => log.level === 'error').length, color: 'text-red-600' },
    { value: 'warning', label: 'Warning', count: systemLogs.filter(log => log.level === 'warning').length, color: 'text-yellow-600' },
    { value: 'info', label: 'Info', count: systemLogs.filter(log => log.level === 'info').length, color: 'text-blue-600' },
    { value: 'success', label: 'Success', count: systemLogs.filter(log => log.level === 'success').length, color: 'text-green-600' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories', count: systemLogs.length },
    { value: 'user_activity', label: 'User Activity', count: systemLogs.filter(log => log.category === 'user_activity').length },
    { value: 'system_performance', label: 'System Performance', count: systemLogs.filter(log => log.category === 'system_performance').length },
    { value: 'data_backup', label: 'Data Backup', count: systemLogs.filter(log => log.category === 'data_backup').length },
    { value: 'api_service', label: 'API Service', count: systemLogs.filter(log => log.category === 'api_service').length },
    { value: 'system_security', label: 'System Security', count: systemLogs.filter(log => log.category === 'system_security').length },
    { value: 'chw_activity', label: 'CHW Activity', count: systemLogs.filter(log => log.category === 'chw_activity').length },
    { value: 'telemedicine', label: 'Telemedicine', count: systemLogs.filter(log => log.category === 'telemedicine').length },
    { value: 'patient_data', label: 'Patient Data', count: systemLogs.filter(log => log.category === 'patient_data').length }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'Last 7 days' },
    { value: 'month', label: 'Last 30 days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // Filter logs based on search term, level, category, and date range
  const filteredLogs = systemLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    // Date filtering would be implemented here
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'user_activity': return <User className="w-4 h-4" />;
      case 'system_performance': return <Cpu className="w-4 h-4" />;
      case 'data_backup': return <HardDrive className="w-4 h-4" />;
      case 'api_service': return <Server className="w-4 h-4" />;
      case 'system_security': return <Shield className="w-4 h-4" />;
      case 'chw_activity': return <Activity className="w-4 h-4" />;
      case 'telemedicine': return <Monitor className="w-4 h-4" />;
      case 'patient_data': return <Database className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const exportLogs = () => {
    console.log('Exporting logs...');
    // Implement log export functionality
  };

  const refreshLogs = () => {
    console.log('Refreshing logs...');
    // Implement log refresh functionality
  };

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshLogs();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 pl-64">
        <AdminNavbar />
        
        <div className="p-6 mt-16">
          {/* Header Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">System Logs</h1>
                  <p className="text-blue-200 text-lg">
                    Monitor and analyze system activities, errors, and performance metrics
                  </p>
                  <div className="mt-4 flex items-center space-x-6">
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-blue-300" />
                      <span className="text-blue-200">
                        {filteredLogs.length} Log Entries
                      </span>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-300" />
                      <span className="text-blue-200">
                        {systemLogs.filter(log => log.level === 'error' || log.level === 'warning').length} Issues
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-green-300" />
                      <span className="text-blue-200">
                        Real-time Monitoring
                      </span>
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
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search logs, messages, or sources..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  {/* Level Filter */}
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {levelOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} ({option.count})
                      </option>
                    ))}
                  </select>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} ({option.count})
                      </option>
                    ))}
                  </select>

                  {/* Date Range Filter */}
                  <select
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {dateRangeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="autoRefresh"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="autoRefresh" className="text-sm text-gray-600">
                    Auto-refresh ({refreshInterval}s)
                  </label>
                </div>
                
                <button
                  onClick={refreshLogs}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
                
                <button
                  onClick={exportLogs}
                  className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
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
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getLevelIcon(log.level)}
                          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(log.level)}`}>
                            {log.level.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex flex-col">
                          <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          {getCategoryIcon(log.category)}
                          <span className="ml-2 capitalize">{log.category.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {log.source}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <p className="line-clamp-2">{log.message}</p>
                          {log.details && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {log.details}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
                    : 'No system logs are available for the selected time period'
                  }
                </p>
              </div>
            )}
          </div>

          {/* System Health Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">System Status</p>
                  <p className="text-2xl font-bold text-green-600">Healthy</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Errors</p>
                  <p className="text-2xl font-bold text-red-600">
                    {systemLogs.filter(log => log.level === 'error').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {systemLogs.filter(log => log.level === 'warning').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Uptime</p>
                  <p className="text-2xl font-bold text-blue-600">99.9%</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;