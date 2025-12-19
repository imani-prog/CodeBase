import { useState } from 'react';
import {
  TrendingUp,
  Users,
  Calendar,
  Activity,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ReportsAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReportType, setSelectedReportType] = useState('overview');

  // Sample analytics data
  const stats = [
    {
      label: 'Total Patients Served',
      value: '142',
      change: '+12%',
      trend: 'up',
      color: 'blue',
      icon: Users
    },
    {
      label: 'Home Visits Completed',
      value: '87',
      change: '+18%',
      trend: 'up',
      color: 'blue',
      icon: CheckCircle
    },
    {
      label: 'Avg. Response Time',
      value: '2.3 hrs',
      change: '-15%',
      trend: 'down',
      color: 'blue',
      icon: Clock
    },
    {
      label: 'High Risk Patients',
      value: '12',
      change: '-5%',
      trend: 'down',
      color: 'blue',
      icon: AlertCircle
    }
  ];

  const visitStats = [
    { month: 'Jan', visits: 45, assessments: 38 },
    { month: 'Feb', visits: 52, assessments: 42 },
    { month: 'Mar', visits: 48, assessments: 40 },
    { month: 'Apr', visits: 61, assessments: 51 },
    { month: 'May', visits: 73, assessments: 62 },
    { month: 'Jun', visits: 87, assessments: 74 }
  ];

  const patientCategories = [
    { category: 'Hypertension', count: 45, percentage: 32, color: 'blue' },
    { category: 'Diabetes', count: 38, percentage: 27, color: 'blue' },
    { category: 'Prenatal Care', count: 28, percentage: 20, color: 'blue' },
    { category: 'Nutrition Support', count: 18, percentage: 13, color: 'blue' },
    { category: 'Other', count: 13, percentage: 8, color: 'blue' }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Monthly Performance Report',
      period: 'October 2024',
      generated: '2024-10-24',
      type: 'Performance',
      status: 'Ready'
    },
    {
      id: 2,
      title: 'Patient Outcomes Analysis',
      period: 'Q3 2024',
      generated: '2024-10-20',
      type: 'Outcomes',
      status: 'Ready'
    },
    {
      id: 3,
      title: 'Home Visits Summary',
      period: 'October 2024',
      generated: '2024-10-18',
      type: 'Activity',
      status: 'Ready'
    },
    {
      id: 4,
      title: 'Health Assessments Report',
      period: 'September 2024',
      generated: '2024-10-01',
      type: 'Assessment',
      status: 'Ready'
    }
  ];

  const reportTypes = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'visits', label: 'Visits', icon: Calendar },
    { id: 'outcomes', label: 'Outcomes', icon: TrendingUp }
  ];

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Performance':
        return 'text-blue-800';
      case 'Outcomes':
        return 'text-green-800';
      case 'Activity':
        return 'text-purple-800';
      case 'Assessment':
        return 'text-yellow-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="mt-2">
            Track performance and analyze patient care data
          </p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md">
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-gray-700">Period:</span>
            <div className="flex space-x-2">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    selectedPeriod === period.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            <span>Custom Filter</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                <span className={`flex items-center text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1 transform rotate-180" />}
                  {stat.change}
                </span>
              </div>
              <p className={`text-3xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</p>
              <p className="">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Report Type Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedReportType(type.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap  ${
                  selectedReportType === type.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Charts and Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visit Trends Chart - Line Chart */}
        <div className="bg-white shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Visit & Assessment Trends</h2>
            <LineChart className="w-6 h-6 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={visitStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
              />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ fill: '#2563eb', r: 5 }}
                activeDot={{ r: 7 }}
                name="Visits"
              />
              <Line 
                type="monotone" 
                dataKey="assessments" 
                stroke="#9333ea" 
                strokeWidth={3}
                dot={{ fill: '#9333ea', r: 5 }}
                activeDot={{ r: 7 }}
                name="Assessments"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>

        {/* Patient Categories Chart - Bar Chart */}
        <div className="bg-white shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Patient Categories</h2>
            <PieChart className="w-6 h-6 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={patientCategories} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                type="number" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                type="category" 
                dataKey="category" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#e5e7eb' }}
                width={120}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value, name) => {
                  if (name === 'count') return [`${value} patients`, 'Patients'];
                  if (name === 'percentage') return [`${value}%`, 'Percentage'];
                  return [value, name];
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
              />
              <Bar 
                dataKey="count" 
                fill="#2563eb" 
                radius={[0, 8, 8, 0]}
                name="Patients"
              />
            </RechartsBarChart>
          </ResponsiveContainer>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Total Active Patients</span>
              <span className="text-2xl font-bold text-blue-600">142</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      

      {/* Recent Reports */}
      <div className="bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Recent Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="flex flex-col p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors max-w-md"
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className="p-2 flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{report.title}</h3>
                  <div className="flex flex-col space-y-1 mt-1">
                    <span className="text-xs text-gray-600">{report.period}</span>
                    <span className="text-xs text-gray-600">Generated: {new Date(report.generated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full self-start ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-semibold text-green-600">{report.status}</span>
                <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors">
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate New Report */}
      <div className="shadow-md p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Generate Custom Report</h2>
            <p className="">
              Create detailed reports with custom date ranges and specific metrics
            </p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold transition-colors shadow-md">
            Create Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
