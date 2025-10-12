import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity, 
  Calendar, 
  Clock, 
  Target, 
  Award, 
  Shield, 
  Truck, 
  Video, 
  GraduationCap, 
  Bell, 
  FileText, 
  Download, 
  Upload, 
  Filter, 
  RefreshCw, 
  Eye, 
  Settings, 
  Plus, 
  Search, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Info, 
  Zap, 
  Globe, 
  Building2, 
  Heart, 
  Stethoscope, 
  Pill, 
  UserCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  AlertTriangle,
  LineChart,
  BookOpen,
  CreditCard,
  Percent,
  Calculator,
  Timer,
  Database,
  Server,
  Wifi,
  Signal
} from 'lucide-react';
import AdminNavbar from '../../Components/AdminNavbar';
import AdminSidebar from '../../Components/AdminSidebar';

const ReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [refreshInterval, _setRefreshInterval] = useState(30000); // 30 seconds
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh data
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Comprehensive system metrics
  const systemOverview = {
    totalPatients: 15847,
    activePatients: 2847,
    newPatientsThisMonth: 456,
    totalRevenue: 125670000, // KES
    monthlyRevenue: 8940000, // KES
    revenueGrowth: 12.8,
    totalClaims: 3421,
    claimsApproved: 3298,
    claimsValue: 45670000, // KES
    ambulanceFleet: 15,
    activeAmbulances: 12,
    totalTrips: 1847,
    emergencyResponse: 4.2, // minutes
    telemedicineSessions: 2341,
    activeDoctors: 45,
    sessionCompletionRate: 94.5,
    trainingPrograms: 23,
    enrolledStudents: 1245,
    completionRate: 87.3,
    notificationsSent: 45231,
    deliveryRate: 96.8,
    systemUptime: 99.7,
    averageResponseTime: 185 // milliseconds
  };

  const performanceMetrics = [
    {
      id: 1,
      category: 'Patient Management',
      icon: Users,
      color: 'blue',
      metrics: [
        { label: 'Total Patients', value: systemOverview.totalPatients.toLocaleString(), change: '+5.2%', trend: 'up' },
        { label: 'Active Patients', value: systemOverview.activePatients.toLocaleString(), change: '+8.1%', trend: 'up' },
        { label: 'New This Month', value: systemOverview.newPatientsThisMonth.toLocaleString(), change: '+12.3%', trend: 'up' },
        { label: 'Patient Satisfaction', value: '4.7/5', change: '+0.2', trend: 'up' }
      ]
    },
    {
      id: 2,
      category: 'Financial Performance',
      icon: DollarSign,
      color: 'green',
      metrics: [
        { label: 'Total Revenue', value: `KES ${(systemOverview.totalRevenue / 1000000).toFixed(1)}M`, change: '+15.4%', trend: 'up' },
        { label: 'Monthly Revenue', value: `KES ${(systemOverview.monthlyRevenue / 1000000).toFixed(1)}M`, change: `+${systemOverview.revenueGrowth}%`, trend: 'up' },
        { label: 'Claims Value', value: `KES ${(systemOverview.claimsValue / 1000000).toFixed(1)}M`, change: '+7.8%', trend: 'up' },
        { label: 'Profit Margin', value: '23.4%', change: '+2.1%', trend: 'up' }
      ]
    },
    {
      id: 3,
      category: 'Ambulance Operations',
      icon: Truck,
      color: 'red',
      metrics: [
        { label: 'Fleet Size', value: systemOverview.ambulanceFleet.toString(), change: '+2', trend: 'up' },
        { label: 'Active Units', value: systemOverview.activeAmbulances.toString(), change: '0', trend: 'stable' },
        { label: 'Total Trips', value: systemOverview.totalTrips.toLocaleString(), change: '+18.7%', trend: 'up' },
        { label: 'Response Time', value: `${systemOverview.emergencyResponse} min`, change: '-0.3 min', trend: 'up' }
      ]
    },
    {
      id: 4,
      category: 'Telemedicine',
      icon: Video,
      color: 'purple',
      metrics: [
        { label: 'Total Sessions', value: systemOverview.telemedicineSessions.toLocaleString(), change: '+24.6%', trend: 'up' },
        { label: 'Active Doctors', value: systemOverview.activeDoctors.toString(), change: '+5', trend: 'up' },
        { label: 'Completion Rate', value: `${systemOverview.sessionCompletionRate}%`, change: '+1.2%', trend: 'up' },
        { label: 'Avg Session Time', value: '28 min', change: '+2 min', trend: 'up' }
      ]
    },
    {
      id: 5,
      category: 'Training Programs',
      icon: GraduationCap,
      color: 'indigo',
      metrics: [
        { label: 'Programs Active', value: systemOverview.trainingPrograms.toString(), change: '+3', trend: 'up' },
        { label: 'Enrolled Students', value: systemOverview.enrolledStudents.toLocaleString(), change: '+19.2%', trend: 'up' },
        { label: 'Completion Rate', value: `${systemOverview.completionRate}%`, change: '+3.1%', trend: 'up' },
        { label: 'Certification Rate', value: '91.2%', change: '+4.5%', trend: 'up' }
      ]
    },
    {
      id: 6,
      category: 'Insurance Management',
      icon: Shield,
      color: 'teal',
      metrics: [
        { label: 'Total Claims', value: systemOverview.totalClaims.toLocaleString(), change: '+11.4%', trend: 'up' },
        { label: 'Approval Rate', value: `${((systemOverview.claimsApproved / systemOverview.totalClaims) * 100).toFixed(1)}%`, change: '+2.3%', trend: 'up' },
        { label: 'Claims Value', value: `KES ${(systemOverview.claimsValue / 1000000).toFixed(1)}M`, change: '+8.7%', trend: 'up' },
        { label: 'Processing Time', value: '6.2 days', change: '-1.1 days', trend: 'up' }
      ]
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 7200000, expenses: 5400000, profit: 1800000 },
    { month: 'Feb', revenue: 7800000, expenses: 5600000, profit: 2200000 },
    { month: 'Mar', revenue: 8100000, expenses: 5800000, profit: 2300000 },
    { month: 'Apr', revenue: 8400000, expenses: 6000000, profit: 2400000 },
    { month: 'May', revenue: 8700000, expenses: 6200000, profit: 2500000 },
    { month: 'Jun', revenue: 8500000, expenses: 6100000, profit: 2400000 },
    { month: 'Jul', revenue: 8900000, expenses: 6300000, profit: 2600000 },
    { month: 'Aug', revenue: 9200000, expenses: 6400000, profit: 2800000 },
    { month: 'Sep', revenue: 8800000, expenses: 6200000, profit: 2600000 },
    { month: 'Oct', revenue: 8940000, expenses: 6350000, profit: 2590000 }
  ];

  const patientDistribution = [
    { category: 'Outpatient', count: 8547, percentage: 53.9, color: '#3B82F6' },
    { category: 'Inpatient', count: 3421, percentage: 21.6, color: '#10B981' },
    { category: 'Emergency', count: 2156, percentage: 13.6, color: '#F59E0B' },
    { category: 'Telemedicine', count: 1723, percentage: 10.9, color: '#8B5CF6' }
  ];

  const serviceUtilization = [
    { service: 'General Consultation', utilization: 89, trend: 'up', change: '+5.2%' },
    { service: 'Emergency Services', utilization: 76, trend: 'up', change: '+12.1%' },
    { service: 'Telemedicine', utilization: 82, trend: 'up', change: '+18.7%' },
    { service: 'Laboratory Tests', utilization: 94, trend: 'stable', change: '+0.8%' },
    { service: 'Imaging Services', utilization: 71, trend: 'up', change: '+7.3%' },
    { service: 'Ambulance Services', utilization: 68, trend: 'up', change: '+15.4%' }
  ];

  const geographicData = [
    { region: 'Nairobi County', patients: 4523, revenue: 2890000, growth: '+15.2%' },
    { region: 'Kiambu County', patients: 2847, revenue: 1890000, growth: '+12.8%' },
    { region: 'Machakos County', patients: 1956, revenue: 1234000, growth: '+18.4%' },
    { region: 'Kajiado County', patients: 1634, revenue: 1056000, growth: '+9.7%' },
    { region: 'Nakuru County', patients: 1423, revenue: 967000, growth: '+22.1%' },
    { region: 'Mombasa County', patients: 1289, revenue: 834000, growth: '+7.9%' },
    { region: 'Kisumu County', patients: 1098, revenue: 723000, growth: '+14.3%' },
    { region: 'Eldoret County', patients: 1077, revenue: 698000, growth: '+11.6%' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'financial', label: 'Financial Analytics', icon: DollarSign },
    { id: 'operational', label: 'Operations', icon: Activity },
    { id: 'geographic', label: 'Geographic Analysis', icon: MapPin },
    { id: 'performance', label: 'Performance KPIs', icon: Target },
    { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
    { id: 'custom', label: 'Custom Reports', icon: FileText }``
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  // Render Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900">{systemOverview.totalPatients.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                {getTrendIcon('up')}
                <span className="text-sm text-green-600 ml-1">+5.2% this month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(systemOverview.monthlyRevenue)}</p>
              <div className="flex items-center mt-2">
                {getTrendIcon('up')}
                <span className="text-sm text-green-600 ml-1">+{systemOverview.revenueGrowth}% growth</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">System Uptime</p>
              <p className="text-3xl font-bold text-gray-900">{systemOverview.systemUptime}%</p>
              <div className="flex items-center mt-2">
                {getTrendIcon('up')}
                <span className="text-sm text-green-600 ml-1">Excellent</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Response Time</p>
              <p className="text-3xl font-bold text-gray-900">{systemOverview.emergencyResponse} min</p>
              <div className="flex items-center mt-2">
                {getTrendIcon('up')}
                <span className="text-sm text-green-600 ml-1">-0.3 min improved</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Timer className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trend Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend Analysis</h3>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
            </select>
            <button className="text-blue-600 hover:text-blue-700">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">Revenue Trend Chart</p>
            <p className="text-gray-400 text-sm">Integration with chart library needed</p>
            <div className="mt-4 flex justify-center space-x-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{formatCurrency(revenueData[revenueData.length - 1].revenue)}</p>
                <p className="text-sm text-gray-600">Current Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(revenueData[revenueData.length - 1].profit)}</p>
                <p className="text-sm text-gray-600">Profit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Distribution by Service</h3>
          <div className="space-y-4">
            {patientDistribution.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{item.category}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
                  <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 h-32 flex items-center justify-center bg-gray-50 rounded-lg">
            <PieChart className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Utilization Rates</h3>
          <div className="space-y-4">
            {serviceUtilization.map((service) => (
              <div key={service.service} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{service.service}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{service.utilization}%</span>
                    {getTrendIcon(service.trend)}
                    <span className={`text-sm ${getTrendColor(service.trend)}`}>{service.change}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${service.utilization}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{systemOverview.systemUptime}%</p>
            <p className="text-sm text-gray-600">System Uptime</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{systemOverview.averageResponseTime}ms</p>
            <p className="text-sm text-gray-600">Avg Response Time</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bell className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{systemOverview.deliveryRate}%</p>
            <p className="text-sm text-gray-600">Notification Delivery</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Database className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2.3TB</p>
            <p className="text-sm text-gray-600">Data Processed</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Financial Analytics Tab
  const renderFinancialAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(systemOverview.totalRevenue)}</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <div className="flex items-center justify-center mt-2">
              {getTrendIcon('up')}
              <span className="text-sm text-green-600 ml-1">+15.4% YoY</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(revenueData[revenueData.length - 1].profit)}</p>
            <p className="text-sm text-gray-600">Monthly Profit</p>
            <div className="flex items-center justify-center mt-2">
              {getTrendIcon('up')}
              <span className="text-sm text-green-600 ml-1">+12.8% growth</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <Percent className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">23.4%</p>
            <p className="text-sm text-gray-600">Profit Margin</p>
            <div className="flex items-center justify-center mt-2">
              {getTrendIcon('up')}
              <span className="text-sm text-green-600 ml-1">+2.1% improvement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Service Category</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Stethoscope className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">General Healthcare</p>
                  <p className="text-sm text-gray-500">45.2% of total revenue</p>
                </div>
              </div>
              <p className="text-lg font-bold text-blue-600">{formatCurrency(4040000)}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Truck className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Emergency Services</p>
                  <p className="text-sm text-gray-500">28.7% of total revenue</p>
                </div>
              </div>
              <p className="text-lg font-bold text-green-600">{formatCurrency(2566000)}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Video className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Telemedicine</p>
                  <p className="text-sm text-gray-500">16.8% of total revenue</p>
                </div>
              </div>
              <p className="text-lg font-bold text-purple-600">{formatCurrency(1502000)}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <GraduationCap className="w-8 h-8 text-yellow-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Training Programs</p>
                  <p className="text-sm text-gray-500">9.3% of total revenue</p>
                </div>
              </div>
              <p className="text-lg font-bold text-yellow-600">{formatCurrency(831000)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Financial Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">Financial Trends Chart</p>
              <p className="text-gray-400 text-sm">Revenue vs Profit comparison</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Insurance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium">Insurance Claims</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">67.3%</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67.3%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium">M-Pesa</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">18.9%</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '18.9%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium">Cash</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">10.4%</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '10.4%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium">Bank Transfer</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">3.4%</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '3.4%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Insurance Providers</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Social Health Authority</p>
                <p className="text-sm text-gray-500">1,245 claims processed</p>
              </div>
              <p className="text-lg font-bold text-blue-600">{formatCurrency(1567000)}</p>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">NHIF</p>
                <p className="text-sm text-gray-500">867 claims processed</p>
              </div>
              <p className="text-lg font-bold text-green-600">{formatCurrency(1245000)}</p>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">AAR Insurance</p>
                <p className="text-sm text-gray-500">156 claims processed</p>
              </div>
              <p className="text-lg font-bold text-purple-600">{formatCurrency(892000)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Operations Tab
  const renderOperations = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Icon className={`w-8 h-8 text-${category.color}-600 mr-3`} />
                <h4 className="font-semibold text-gray-900">{category.category}</h4>
              </div>
              <div className="space-y-3">
                {category.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{metric.label}:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                      {getTrendIcon(metric.trend)}
                      <span className={`text-xs ${getTrendColor(metric.trend)}`}>{metric.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Operational Efficiency */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Operational Efficiency Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-2xl font-bold text-green-600">94.5%</p>
            <p className="text-sm text-gray-600">Service Completion Rate</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <p className="text-2xl font-bold text-blue-600">4.2 min</p>
            <p className="text-sm text-gray-600">Avg Emergency Response</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Star className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <p className="text-2xl font-bold text-purple-600">4.7/5</p>
            <p className="text-sm text-gray-600">Patient Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Geographic Analysis Tab
  const renderGeographicAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg mb-6">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">Kenya Healthcare Coverage Map</p>
            <p className="text-gray-400 text-sm">Interactive map integration needed</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Regional Performance Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Share</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {geographicData.map((region) => (
                <tr key={region.region} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{region.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {region.patients.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(region.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTrendIcon('up')}
                      <span className="text-sm text-green-600 ml-1">{region.growth}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(region.patients / systemOverview.totalPatients) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {((region.patients / systemOverview.totalPatients) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Performance KPIs Tab
  const renderPerformanceKPIs = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Patient Satisfaction</h4>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900 mb-2">4.7</p>
            <p className="text-sm text-gray-600 mb-4">out of 5.0</p>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Service Quality</h4>
            <Target className="w-6 h-6 text-green-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Treatment Effectiveness</span>
              <span className="text-sm font-medium">96.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Diagnostic Accuracy</span>
              <span className="text-sm font-medium">94.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Follow-up Compliance</span>
              <span className="text-sm font-medium">87.3%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Operational Metrics</h4>
            <Activity className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Bed Occupancy</span>
              <span className="text-sm font-medium">78.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Staff Efficiency</span>
              <span className="text-sm font-medium">91.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Resource Utilization</span>
              <span className="text-sm font-medium">85.7%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed KPI Dashboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Performance Indicators Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900">98.5%</p>
            <p className="text-sm text-gray-600">Patient Safety Score</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Timer className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900">12.3 min</p>
            <p className="text-sm text-gray-600">Avg Wait Time</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <UserCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900">95.7%</p>
            <p className="text-sm text-gray-600">Staff Retention</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-900">4.9/5</p>
            <p className="text-sm text-gray-600">Quality Rating</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render other tabs as placeholders
  const renderForecasting = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Predictive Analytics & Forecasting</h3>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">Forecasting Dashboard</p>
          <p className="text-gray-400 text-sm">AI-powered predictions and trend analysis</p>
        </div>
      </div>
    </div>
  );

  const renderCustomReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Custom Reports Generator</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Report
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">Custom Report Builder</p>
          <p className="text-gray-400 text-sm">Create customized reports and exports</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
                  <p className="text-gray-600">Comprehensive analytics and reporting dashboard for MediLink healthcare platform</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </div>
                  <button 
                    onClick={() => setLastUpdated(new Date())}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'financial' && renderFinancialAnalytics()}
            {activeTab === 'operational' && renderOperations()}
            {activeTab === 'geographic' && renderGeographicAnalysis()}
            {activeTab === 'performance' && renderPerformanceKPIs()}
            {activeTab === 'forecasting' && renderForecasting()}
            {activeTab === 'custom' && renderCustomReports()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsAnalytics;