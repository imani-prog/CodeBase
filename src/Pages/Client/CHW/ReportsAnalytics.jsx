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
      color: 'green',
      icon: CheckCircle
    },
    {
      label: 'Avg. Response Time',
      value: '2.3 hrs',
      change: '-15%',
      trend: 'down',
      color: 'yellow',
      icon: Clock
    },
    {
      label: 'High Risk Patients',
      value: '12',
      change: '-5%',
      trend: 'down',
      color: 'red',
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
    { category: 'Hypertension', count: 45, percentage: 32, color: 'red' },
    { category: 'Diabetes', count: 38, percentage: 27, color: 'blue' },
    { category: 'Prenatal Care', count: 28, percentage: 20, color: 'purple' },
    { category: 'Nutrition Support', count: 18, percentage: 13, color: 'green' },
    { category: 'Other', count: 13, percentage: 8, color: 'gray' }
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
        return 'bg-blue-100 text-blue-800';
      case 'Outcomes':
        return 'bg-green-100 text-green-800';
      case 'Activity':
        return 'bg-purple-100 text-purple-800';
      case 'Assessment':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">
            Track performance and analyze patient care data
          </p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md">
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-gray-700">Period:</span>
            <div className="flex space-x-2">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedPeriod === period.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white rounded-xl shadow-md p-2">
        <div className="flex space-x-2">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedReportType(type.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedReportType === type.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
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
        {/* Visit Trends Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Visit & Assessment Trends</h2>
            <LineChart className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            {visitStats.map((stat) => (
              <div key={stat.month}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{stat.month}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-blue-600 font-semibold">{stat.visits} visits</span>
                    <span className="text-sm text-purple-600 font-semibold">{stat.assessments} assessments</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(stat.visits / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(stat.assessments / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Categories Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Patient Categories</h2>
            <PieChart className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            {patientCategories.map((category) => (
              <div key={category.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{category.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{category.count} patients</span>
                    <span className={`text-sm font-bold text-${category.color}-600`}>{category.percentage}%</span>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${category.color}-600 rounded-full transition-all`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Total Active Patients</span>
              <span className="text-2xl font-bold text-blue-600">142</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-blue-900">Patient Satisfaction</span>
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-blue-600">4.8</span>
              <span className="text-sm text-blue-600 mb-1">/5.0</span>
            </div>
            <div className="mt-3 h-2 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '96%' }}></div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-green-900">Follow-up Completion</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-green-600">92</span>
              <span className="text-sm text-green-600 mb-1">%</span>
            </div>
            <div className="mt-3 h-2 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-purple-900">Health Improvement</span>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-purple-600">78</span>
              <span className="text-sm text-purple-600 mb-1">%</span>
            </div>
            <div className="mt-3 h-2 bg-purple-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Reports</h2>
        <div className="space-y-4">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-gray-600">{report.period}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">Generated: {new Date(report.generated).toLocaleDateString()}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold text-green-600">{report.status}</span>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate New Report */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-md p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Generate Custom Report</h2>
            <p className="text-blue-100">
              Create detailed reports with custom date ranges and specific metrics
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-colors shadow-md">
            Create Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
