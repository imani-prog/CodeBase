import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  AlertCircle, 
  TrendingUp, 
  Settings, 
  Bell, 
  Shield, 
  FileText,
  Activity,
  Calendar,
  Download,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Plus,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Mock data for charts
  const userGrowthData = [
    { month: 'Jan', patients: 820, chws: 45 },
    { month: 'Feb', patients: 890, chws: 52 },
    { month: 'Mar', patients: 970, chws: 61 },
    { month: 'Apr', patients: 1050, chws: 68 },
    { month: 'May', patients: 1150, chws: 75 },
    { month: 'Jun', patients: 1245, chws: 87 }
  ];

  const dailyActivityData = [
    { day: 'Mon', logins: 145, appointments: 89, reports: 23 },
    { day: 'Tue', logins: 167, appointments: 102, reports: 31 },
    { day: 'Wed', logins: 189, appointments: 95, reports: 28 },
    { day: 'Thu', logins: 156, appointments: 118, reports: 35 },
    { day: 'Fri', logins: 201, appointments: 134, reports: 42 },
    { day: 'Sat', logins: 123, appointments: 67, reports: 18 },
    { day: 'Sun', logins: 98, appointments: 45, reports: 12 }
  ];

 
  // Mock data for tables
  const topPerformers = [
    { id: 1, name: 'Dr. Sarah Wilson', role: 'CHW', patients: 45, rating: 4.9 },
    { id: 2, name: 'John Mitchell', role: 'CHW', patients: 38, rating: 4.8 },
    { id: 3, name: 'Maria Garcia', role: 'CHW', patients: 42, rating: 4.7 },
    { id: 4, name: 'David Chen', role: 'CHW', patients: 35, rating: 4.6 },
    { id: 5, name: 'Lisa Johnson', role: 'CHW', patients: 29, rating: 4.5 }
  ];

  const recentRegistrations = [
    { id: 1, name: 'Alice Brown', type: 'Patient', date: '2024-08-23', status: 'Active' },
    { id: 2, name: 'Robert Taylor', type: 'CHW', date: '2024-08-22', status: 'Pending' },
    { id: 3, name: 'Emma Davis', type: 'Patient', date: '2024-08-22', status: 'Active' },
    { id: 4, name: 'Michael Wilson', type: 'Patient', date: '2024-08-21', status: 'Active' },
    { id: 5, name: 'Sophie Anderson', type: 'CHW', date: '2024-08-21', status: 'Approved' }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High server load detected', time: '5 min ago' },
    { id: 2, type: 'info', message: 'Scheduled maintenance in 2 hours', time: '1 hour ago' },
    { id: 3, type: 'error', message: 'Failed backup attempt', time: '3 hours ago' },
    { id: 4, type: 'success', message: 'Security update completed', time: '6 hours ago' }
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, user: 'Dr. Sarah Wilson', role: 'CHW', action: 'Added new patient record', time: '2 min ago', status: 'success' },
    { id: 2, user: 'John Doe', role: 'Patient', action: 'Completed health assessment', time: '5 min ago', status: 'info' },
    { id: 3, user: 'Admin System', role: 'System', action: 'Automated backup completed', time: '10 min ago', status: 'success' },
    { id: 4, user: 'Mary Johnson', role: 'CHW', action: 'Requested approval for new patient', time: '15 min ago', status: 'warning' },
    { id: 5, user: 'Mike Chen', role: 'Patient', action: 'Medication reminder sent', time: '20 min ago', status: 'info' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your healthcare platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Patients</p>
                <p className="text-3xl font-bold text-gray-900">1,245</p>
                <p className="text-sm text-green-600 flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active CHWs</p>
                <p className="text-3xl font-bold text-gray-900">87</p>
                <p className="text-sm text-green-600 flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm text-yellow-600 flex items-center mt-2">
                  <Clock className="w-4 h-4 mr-1" />
                  3 urgent
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-3xl font-bold text-green-600">98.5%</p>
                <p className="text-sm text-gray-500 flex items-center mt-2">
                  <Activity className="w-4 h-4 mr-1" />
                  All systems operational
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <button className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <Edit3 className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2 text-center">Edit Profile</span>
            </button>

            <button className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2 text-center">View Patients</span>
            </button>

            <button className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2 text-center">View CHWs</span>
            </button>

            <button className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2 text-center">Approvals</span>
            </button>

            <button className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2 text-center">System Logs</span>
            </button>

            <button className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <Settings className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2 text-center">Settings</span>
            </button>

            <button className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                <Bell className="w-6 h-6 text-pink-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2 text-center">Notifications</span>
            </button>

            <button className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-teal-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2 text-center">Analytics</span>
            </button>
          </div>
        </div>

        {/* Analytics Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">User Growth Trends</h2>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
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
                    dot={{ fill: '#3b82f6', r: 4 }}
                    name="Patients"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="chws" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ fill: '#10b981', r: 4 }}
                    name="CHWs"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Activity Bar Chart */}
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
        </div>

        {/* Data Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Top Performers Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top Performing CHWs</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={performer.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
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

          {/* Recent Registrations Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Registrations</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentRegistrations.map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{reg.name}</p>
                      <p className="text-xs text-gray-500">{reg.type} • {reg.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reg.status === 'Active' ? 'bg-green-100 text-green-700' :
                      reg.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {reg.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Alerts Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'error' ? 'bg-red-500' :
                      alert.type === 'warning' ? 'bg-yellow-500' :
                      alert.type === 'success' ? 'bg-green-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search activities..."
                        className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select 
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                    >
                      <option value="1h">Last Hour</option>
                      <option value="24h">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(activity.status)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                          <p className="text-sm text-gray-500">{activity.action}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">{activity.time}</span>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button className="w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                    View All Activities
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Registrations</span>
                  <span className="text-sm font-semibold text-gray-900">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Sessions</span>
                  <span className="text-sm font-semibold text-gray-900">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed Tasks</span>
                  <span className="text-sm font-semibold text-gray-900">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Alerts</span>
                  <span className="text-sm font-semibold text-yellow-600">3</span>
                </div>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm font-medium text-blue-800">System Update</p>
                  <p className="text-xs text-blue-600">New features deployed successfully</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-sm font-medium text-yellow-800">Pending Review</p>
                  <p className="text-xs text-yellow-600">5 CHW applications awaiting approval</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <p className="text-sm font-medium text-green-800">Backup Complete</p>
                  <p className="text-xs text-green-600">Daily backup finished at 3:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">User Management</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <Plus className="w-4 h-4 mr-2 text-green-500" />
                Create & manage user accounts
              </li>
              <li className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-blue-500" />
                Assign roles and permissions
              </li>
              <li className="flex items-center">
                <Settings className="w-4 h-4 mr-2 text-gray-500" />
                Reset passwords & security
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Analytics</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                Real-time usage analytics
              </li>
              <li className="flex items-center">
                <Download className="w-4 h-4 mr-2 text-blue-500" />
                Export detailed reports
              </li>
              <li className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                Historical data trends
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">System Config</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <Settings className="w-4 h-4 mr-2 text-blue-500" />
                Platform configuration
              </li>
              <li className="flex items-center">
                <Bell className="w-4 h-4 mr-2 text-yellow-500" />
                Notification preferences
              </li>
              <li className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                Backup & restore data
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Communications</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                System alerts & messages
              </li>
              <li className="flex items-center">
                <Bell className="w-4 h-4 mr-2 text-blue-500" />
                Send announcements
              </li>
              <li className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-green-500" />
                Bulk messaging tools
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;