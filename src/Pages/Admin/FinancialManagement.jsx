import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard, 
  Wallet, 
  PieChart, 
  BarChart3,
  Calendar,
  FileText,
  Download,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Truck,
  Building,
  Smartphone,
  Banknote,
  Receipt,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  Fuel,
  UserCheck,
  Hospital,
  Activity
} from 'lucide-react';
import {
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const FinancialManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample financial data
  const financialOverview = {
    totalRevenue: 2450000,
    totalExpenses: 1680000,
    netProfit: 770000,
    profitMargin: 31.4,
    monthlyGrowth: 12.5,
    pendingPayments: 125000
  };

  // Monthly financial trend data for 12 months
  const monthlyTrendData = [
    { month: 'Jan', revenue: 1200000, expenses: 1400000, profit: 800000 },
    { month: 'Feb', revenue: 1800000, expenses: 1550000, profit: 250000 },
    { month: 'Mar', revenue: 1500000, expenses: 1600000, profit: 100000 },
    { month: 'Apr', revenue: 2400000, expenses: 1300000, profit: 700000 },
    { month: 'May', revenue: 2000000, expenses: 1650000, profit: 350000 },
    { month: 'Jun', revenue: 2700000, expenses: 1200000, profit: 900000 },
    { month: 'Jul', revenue: 2300000, expenses: 1750000, profit: 550000 },
    { month: 'Aug', revenue: 2900000, expenses: 1900000, profit: 1000000 },
    { month: 'Sep', revenue: 2100000, expenses: 1850000, profit: 250000 },
    { month: 'Oct', revenue: 3000000, expenses: 2000000, profit: 1000000 },
    { month: 'Nov', revenue: 2600000, expenses: 1950000, profit: 650000 },
    { month: 'Dec', revenue: 3200000, expenses: 2100000, profit: 1100000 }
  ];

  const revenueStreams = [
    { 
      source: 'Ambulance Services', 
      amount: 850000, 
      percentage: 34.7, 
      trend: 'up',
      transactions: 342,
      avgPerTransaction: 2485
    },
    { 
      source: 'Patient Consultation Fees', 
      amount: 650000, 
      percentage: 26.5, 
      trend: 'up',
      transactions: 1250,
      avgPerTransaction: 520
    },
    { 
      source: 'Online Payment Processing', 
      amount: 420000, 
      percentage: 17.1, 
      trend: 'up',
      transactions: 890,
      avgPerTransaction: 472
    },
    { 
      source: 'Medical Equipment Rental', 
      amount: 380000, 
      percentage: 15.5, 
      trend: 'down',
      transactions: 156,
      avgPerTransaction: 2436
    },
    { 
      source: 'Telemedicine Services', 
      amount: 150000, 
      percentage: 6.1, 
      trend: 'up',
      transactions: 445,
      avgPerTransaction: 337
    }
  ];

  // Revenue distribution data for pie chart
  const revenueDistribution = [
    { name: 'Ambulance Services', value: 850000, color: '#1e3a8a' },
    { name: 'Consultation Fees', value: 650000, color: '#4ade80' },
    { name: 'Online Payments', value: 420000, color: '#2563eb' },
    { name: 'Equipment Rental', value: 380000, color: '#93c5fd' },
    { name: 'Telemedicine', value: 150000, color: '#fb923c' }
  ];

  const expenses = [
    { 
      category: 'CHW Payments', 
      amount: 480000, 
      percentage: 28.6, 
      budget: 500000,
      variance: -20000,
      chws: 45,
      avgPerCHW: 10667
    },
    { 
      category: 'Ambulance Fuel & Maintenance', 
      amount: 320000, 
      percentage: 19.0, 
      budget: 300000,
      variance: 20000,
      vehicles: 12,
      avgPerVehicle: 26667
    },
    { 
      category: 'Staff Salaries', 
      amount: 450000, 
      percentage: 26.8, 
      budget: 450000,
      variance: 0,
      staff: 38,
      avgPerStaff: 11842
    },
    { 
      category: 'Medical Supplies', 
      amount: 280000, 
      percentage: 16.7, 
      budget: 320000,
      variance: -40000,
      orders: 89,
      avgPerOrder: 3146
    },
    { 
      category: 'Technology & Equipment', 
      amount: 150000, 
      percentage: 8.9, 
      budget: 180000,
      variance: -30000,
      items: 23,
      avgPerItem: 6522
    }
  ];

  const ambulanceFinancials = [
    {
      id: 'AMB-001',
      registration: 'KCA 123A',
      location: 'Nairobi Central',
      monthlyRevenue: 85000,
      fuelCosts: 28000,
      maintenanceCosts: 12000,
      driverPayments: 15000,
      netProfit: 30000,
      trips: 45,
      avgRevenuePerTrip: 1889,
      status: 'active'
    },
    {
      id: 'AMB-002',
      registration: 'KBZ 456B',
      location: 'Kisumu',
      monthlyRevenue: 72000,
      fuelCosts: 24000,
      maintenanceCosts: 8000,
      driverPayments: 15000,
      netProfit: 25000,
      trips: 38,
      avgRevenuePerTrip: 1895,
      status: 'active'
    },
    {
      id: 'AMB-003',
      registration: 'KDA 789C',
      location: 'Mombasa',
      monthlyRevenue: 65000,
      fuelCosts: 22000,
      maintenanceCosts: 15000,
      driverPayments: 15000,
      netProfit: 13000,
      trips: 32,
      avgRevenuePerTrip: 2031,
      status: 'maintenance'
    }
  ];

  const chwPayments = [
    {
      id: 'CHW-001',
      name: 'Grace Achieng',
      location: 'Kibera',
      basePayment: 12000,
      performanceBonus: 3000,
      transportAllowance: 2000,
      totalPayment: 17000,
      patientsServed: 85,
      avgPerPatient: 200,
      paymentStatus: 'paid',
      paymentDate: '2024-10-10'
    },
    {
      id: 'CHW-002',
      name: 'Joseph Otieno',
      location: 'Mathare',
      basePayment: 12000,
      performanceBonus: 2500,
      transportAllowance: 2000,
      totalPayment: 16500,
      patientsServed: 78,
      avgPerPatient: 211,
      paymentStatus: 'paid',
      paymentDate: '2024-10-10'
    },
    {
      id: 'CHW-003',
      name: 'Esther Nyambura',
      location: 'Eastlands',
      basePayment: 12000,
      performanceBonus: 4000,
      transportAllowance: 2000,
      totalPayment: 18000,
      patientsServed: 92,
      avgPerPatient: 196,
      paymentStatus: 'pending',
      paymentDate: null
    }
  ];

  const patientPayments = [
    {
      id: 'PAY-001',
      patientName: 'Mary Wanjiku',
      service: 'Ambulance Service',
      amount: 2500,
      paymentMethod: 'M-Pesa',
      status: 'completed',
      date: '2024-10-11',
      transactionId: 'MPesa-ABC123'
    },
    {
      id: 'PAY-002',
      patientName: 'John Kiprotich',
      service: 'Consultation Fee',
      amount: 500,
      paymentMethod: 'Cash',
      status: 'completed',
      date: '2024-10-11',
      transactionId: 'CASH-001'
    },
    {
      id: 'PAY-003',
      patientName: 'Sarah Muthoni',
      service: 'Telemedicine',
      amount: 300,
      paymentMethod: 'Credit Card',
      status: 'pending',
      date: '2024-10-11',
      transactionId: 'CC-XYZ789'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Financial Overview', icon: BarChart3 },
    { id: 'revenue', label: 'Revenue Streams', icon: TrendingUp },
    { id: 'expenses', label: 'Expenses', icon: TrendingDown },
    { id: 'ambulances', label: 'Ambulance Finances', icon: Truck },
    { id: 'chw-payments', label: 'CHW Payments', icon: UserCheck },
    { id: 'patient-payments', label: 'Patient Payments', icon: CreditCard },
    { id: 'reports', label: 'Financial Reports', icon: FileText }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'paid':
      case 'active':
        return 'text-green-800';
      case 'pending':
        return 'text-yellow-800';
      case 'failed':
      case 'maintenance':
        return 'text-red-800';
      default:
        return 'text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Total Revenue</p>
              <p className="text-2xl font-bold ">
                {formatCurrency(financialOverview.totalRevenue)}
              </p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{financialOverview.monthlyGrowth}%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Total Expenses</p>
              <p className="text-2xl font-bold ">
                {formatCurrency(financialOverview.totalExpenses)}
              </p>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">68.6% of revenue</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Net Profit</p>
              <p className="text-2xl font-bold ">
                {formatCurrency(financialOverview.netProfit)}
              </p>
              <div className="flex items-center mt-2">
                <Target className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">{financialOverview.profitMargin}% margin</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <CircleDollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Pending Payments</p>
              <p className="text-2xl font-bold ">
                {formatCurrency(financialOverview.pendingPayments)}
              </p>
              <div className="flex items-center mt-2">
                <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm text-yellow-600">23 transactions</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
          <div className="space-y-3">
            <button className="w-full flex items-center px-4 py-2 text-left  hover:bg-blue-100 rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-blue-600 mr-3" />
              <span className="text-blue-700">Add New Transaction</span>
            </button>
            <button className="w-full flex items-center px-4 py-2 text-left  hover:bg-blue-100 rounded-lg transition-colors">
              <Download className="w-4 h-4 text-blue-600 mr-3" />
              <span className="text-blue-700">Export Financial Report</span>
            </button>
            <button className="w-full flex items-center px-4 py-2 text-left  hover:bg-blue-100 rounded-lg transition-colors">
              <Users className="w-4 h-4 text-blue-600 mr-3" />
              <span className="text-blue-700">Process CHW Payments</span>
            </button>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Recent Transactions</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Ambulance Payment</span>
              </div>
              <span className="text-sm font-medium text-green-600">+{formatCurrency(2500)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Fuel Purchase</span>
              </div>
              <span className="text-sm font-medium text-red-600">-{formatCurrency(15000)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">CHW Payment</span>
              </div>
              <span className="text-sm font-medium text-red-600">-{formatCurrency(17000)}</span>
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Financial Alerts</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">Budget Alert</p>
                <p className="text-xs text-gray-500">Ambulance maintenance 107% of budget</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">Payment Processed</p>
                <p className="text-xs text-gray-500">45 CHW payments completed</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">Pending Review</p>
                <p className="text-xs text-gray-500">23 payment approvals needed</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Revenue vs Expenses Chart */}
      <div className="shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Financial Trend</h3>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent text-sm"
          >
            <option value="this-month">This Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="last-6-months">Last 6 Months</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart 
            data={monthlyTrendData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
            {/* Revenue – darkest blue */}
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e40af" stopOpacity={0.45} /> {/* blue-800 */}
              <stop offset="100%" stopColor="#1e40af" stopOpacity={0.05} />
            </linearGradient>

            {/* Expenses – mid blue */}
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} /> {/* blue-500 */}
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
            </linearGradient>

            {/* Profit – green (clearly distinct) */}
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity={0.4} /> {/* green-600 */}
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0.05} />
            </linearGradient>
          </defs>


            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#9ca3af"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              domain={[0, 'dataMax + 200000']}
              allowDataOverflow={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => {
                const formattedValue = new Intl.NumberFormat('en-KE', {
                  style: 'currency',
                  currency: 'KES',
                  minimumFractionDigits: 0
                }).format(value);
                const label = name.charAt(0).toUpperCase() + name.slice(1);
                return [formattedValue, label];
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1e3a8a"
              strokeWidth={2.5}
              fill="url(#colorRevenue)"
              baseValue={0}
              name="Revenue"
            />

            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#colorExpenses)"
              baseValue={0}
              name="Expenses"
            />

            <Area
              type="monotone"
              dataKey="profit"
              stroke="#16a34a"
              strokeWidth={2.5}
              fill="url(#colorProfit)"
              baseValue={0}
              name="Profit"
            />

          </AreaChart>
        </ResponsiveContainer>
        
        <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 rounded bg-blue-800 mr-2"></div>
              <span className="text-sm text-gray-600">Latest Month Total</span>
            </div>
            <p className="text-sm text-gray-500">
              Revenue: <span className="font-semibold text-gray-900">{formatCurrency(monthlyTrendData[monthlyTrendData.length - 1].revenue)}</span>
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 rounded bg-blue-500  mr-2"></div>
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
            <p className="text-sm text-gray-500">
              Total: <span className="font-semibold text-gray-900">{formatCurrency(monthlyTrendData[monthlyTrendData.length - 1].expenses)}</span>
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 rounded bg-green-600 mr-2"></div>
              <span className="text-sm text-gray-600">Net Profit</span>
            </div>
            <p className="text-sm text-gray-500">
              Amount: <span className="font-semibold text-gray-900">{formatCurrency(monthlyTrendData[monthlyTrendData.length - 1].profit)}</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Revenue Streams Analysis</h3>
          <div className="flex items-center space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="border border-gray-200 overflow-hidden flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="min-w-full divide-y divide-gray-200 h-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                      Share
                    </th>
                    <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                      Trans.
                    </th>
                    <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                      Avg/Trans
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {revenueStreams.map((stream, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{stream.source}</span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right">
                        <span className="text-sm font-semibold text-gray-900">{formatCurrency(stream.amount)}</span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right">
                        <span className="text-sm font-semibold text-blue-600">{stream.percentage}%</span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right">
                        <span className="text-sm text-gray-900">{stream.transactions}</span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right">
                        <span className="text-sm text-gray-900">{formatCurrency(stream.avgPerTransaction)}</span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-center">
                        {stream.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500 inline-block" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500 inline-block" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <h4 className="font-bold mb-4">Revenue Distribution</h4>
            <ResponsiveContainer width="100%" height={480}>
              <RechartsPieChart>
                <Pie
                  data={revenueDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={180}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [
                    new Intl.NumberFormat('en-KE', {
                      style: 'currency',
                      currency: 'KES',
                      minimumFractionDigits: 0
                    }).format(value),
                    ''
                  ]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {revenueDistribution.map((item, index) => {
                const total = revenueDistribution.reduce((sum, i) => sum + i.value, 0);
                const percentage = ((item.value / total) * 100).toFixed(1);
                return (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-blue-600">{percentage}%</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExpenses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Expense Management</h3>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </button>
      </div>

      <div className="border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-bold ">Category</th>
                <th className="text-right py-4 px-4 font-bold ">Actual Spend</th>
                <th className="text-right py-4 px-4 font-bold ">Budget</th>
                <th className="text-right py-4 px-4 font-bold ">Variance</th>
                <th className="text-right py-4 px-4 font-bold ">% of Total</th>
                <th className="text-center py-4 px-4 font-bold ">Units</th>
                <th className="text-right py-4 px-4 font-bold ">Avg/Unit</th>
                <th className="text-center py-4 px-4 font-bold ">Budget Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses.map((expense, index) => {
                const budgetPercentage = ((expense.amount / expense.budget) * 100).toFixed(1);
                const isOverBudget = expense.variance > 0;
                const unitCount = expense.chws || expense.vehicles || expense.staff || expense.orders || expense.items;
                const unitLabel = expense.category.includes('CHW') ? 'CHWs' : 
                                 expense.category.includes('Ambulance') ? 'Vehicles' : 
                                 expense.category.includes('Staff') ? 'Staff' : 
                                 expense.category.includes('Medical') ? 'Orders' : 'Items';
                const avgPerUnit = expense.avgPerCHW || expense.avgPerVehicle || expense.avgPerStaff || expense.avgPerOrder || expense.avgPerItem;

                return (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {expense.category.includes('CHW') && <Users className="w-5 h-5 text-blue-600 mr-2" />}
                        {expense.category.includes('Ambulance') && <Truck className="w-5 h-5 text-blue-600 mr-2" />}
                        {expense.category.includes('Staff') && <UserCheck className="w-5 h-5 text-blue-600 mr-2" />}
                        {expense.category.includes('Medical') && <Hospital className="w-5 h-5 text-blue-600 mr-2" />}
                        {expense.category.includes('Technology') && <Smartphone className="w-5 h-5 text-blue-600 mr-2" />}
                        <span className="font-medium text-gray-900">{expense.category}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-semibold text-gray-900">{formatCurrency(expense.amount)}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-gray-700">{formatCurrency(expense.budget)}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                        {expense.variance >= 0 ? '+' : ''}{formatCurrency(expense.variance)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-semibold">{expense.percentage}%</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex flex-col">
                        <span className="font-semibold">{unitCount}</span>
                        <span className="text-xs ">{unitLabel}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="">{formatCurrency(avgPerUnit)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isOverBudget ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {budgetPercentage}% used
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              isOverBudget ? 'bg-red-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(parseFloat(budgetPercentage), 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 border-t-2 border-gray-300 font-semibold">
                <td className="py-4 px-4 text-gray-900">Total Expenses</td>
                <td className="py-4 px-4 text-right text-gray-900">
                  {formatCurrency(expenses.reduce((sum, exp) => sum + exp.amount, 0))}
                </td>
                <td className="py-4 px-4 text-right text-gray-900">
                  {formatCurrency(expenses.reduce((sum, exp) => sum + exp.budget, 0))}
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={expenses.reduce((sum, exp) => sum + exp.variance, 0) >= 0 ? 'text-red-600' : 'text-green-600'}>
                    {formatCurrency(expenses.reduce((sum, exp) => sum + exp.variance, 0))}
                  </span>
                </td>
                <td className="py-4 px-4 text-right ">100%</td>
                <td className="py-4 px-4 text-center ">—</td>
                <td className="py-4 px-4 text-right ">—</td>
                <td className="py-4 px-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAmbulanceFinances = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold ">Ambulance Financial Performance</h3>
        <div className="flex items-center space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent">
            <option>All Ambulances</option>
            <option>Active Only</option>
            <option>Maintenance</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold">Ambulance</th>
                <th className="text-left py-3 px-4 font-bold">Revenue</th>
                <th className="text-left py-3 px-4 font-bold">Fuel Costs</th>
                <th className="text-left py-3 px-4 font-bold">Maintenance</th>
                <th className="text-left py-3 px-4 font-bold">Driver Pay</th>
                <th className="text-left py-3 px-4 font-bold">Net Profit</th>
                <th className="text-left py-3 px-4 font-bold">Trips</th>
                <th className="text-left py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {ambulanceFinancials.map((ambulance) => (
                <tr key={ambulance.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold ">{ambulance.registration}</p>
                      <p className="text-sm text-gray-600">{ambulance.location}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold">{formatCurrency(ambulance.monthlyRevenue)}</p>
                      <p className="text-sm text-gray-600">{formatCurrency(ambulance.avgRevenuePerTrip)}/trip</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{formatCurrency(ambulance.fuelCosts)}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{formatCurrency(ambulance.maintenanceCosts)}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{formatCurrency(ambulance.driverPayments)}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className={`font-semibold ${ambulance.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(ambulance.netProfit)}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{ambulance.trips}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(ambulance.status)}`}>
                      {ambulance.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCHWPayments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold ">Community Health Worker Payments</h3>
        <div className="flex items-center space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent">
            <option>All CHWs</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <CheckCircle className="w-4 h-4 mr-2" />
            Process Payments
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
        <div className="border border-gray-100 shadow-md p-8">
          <div className="flex items-center">
            <Users className="w-10 h-10 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-blue-600">Total CHWs</p>
              <p className="text-2xl font-bold ">45</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 shadow-md p-8">
          <div className="flex items-center">
            <CheckCircle className="w-10 h-10 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-blue-600">Payments Processed</p>
              <p className="text-2xl font-bold ">{formatCurrency(480000)}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 shadow-md p-8">
          <div className="flex items-center">
            <Clock className="w-10 h-10 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-blue-600">Pending Payments</p>
              <p className="text-2xl font-bold ">{formatCurrency(54000)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold">CHW</th>
                <th className="text-left py-3 px-4 font-bold">Base Pay</th>
                <th className="text-left py-3 px-4 font-bold">Performance</th>
                <th className="text-left py-3 px-4 font-bold">Transport</th>
                <th className="text-left py-3 px-4 font-bold">Total</th>
                <th className="text-left py-3 px-4 font-bold">Patients</th>
                <th className="text-left py-3 px-4 font-bold">Status</th>
                <th className="text-left py-3 px-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {chwPayments.map((chw) => (
                <tr key={chw.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold">{chw.name}</p>
                      <p className="text-sm text-gray-600">{chw.location}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">{formatCurrency(chw.basePayment)}</td>
                  <td className="py-4 px-4">{formatCurrency(chw.performanceBonus)}</td>
                  <td className="py-4 px-4">{formatCurrency(chw.transportAllowance)}</td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{formatCurrency(chw.totalPayment)}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-gray-900">{chw.patientsServed}</p>
                      <p className="text-sm text-gray-600">{formatCurrency(chw.avgPerPatient)}/patient</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full ${getStatusColor(chw.paymentStatus)}`}>
                      {chw.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
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

  const renderPatientPayments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Patient Payment Transactions</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent">
            <option>All Payments</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 max-w-6xl mx-auto">
        <div className="border border-gray-100 shadow-md p-6">
          <div className="flex items-center">
            <Smartphone className="w-10 h-10 text-blue-600 mr-3" />
            <div>
              <p className="text-base text-blue-600 mb-1">M-Pesa</p>
              <p className="text-2xl font-bold">{formatCurrency(650000)}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 shadow-md p-6">
          <div className="flex items-center">
            <CreditCard className="w-10 h-10 text-blue-600 mr-3" />
            <div>
              <p className="text-base text-blue-600 mb-1">Card Payments</p>
              <p className="text-2xl font-bold">{formatCurrency(420000)}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 shadow-md p-6">
          <div className="flex items-center">
            <Banknote className="w-10 h-10 text-blue-600 mr-3" />
            <div>
              <p className="text-base text-blue-600 mb-1">Cash</p>
              <p className="text-2xl font-bold">{formatCurrency(280000)}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 shadow-md p-6">
          <div className="flex items-center">
            <Receipt className="w-10 h-10 text-blue-600 mr-3" />
            <div>
              <p className="text-base text-blue-600 mb-1">Insurance</p>
              <p className="text-2xl font-bold">{formatCurrency(180000)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold">Patient</th>
                <th className="text-left py-3 px-4 font-bold">Service</th>
                <th className="text-left py-3 px-4 font-bold">Amount</th>
                <th className="text-left py-3 px-4 font-bold">Payment Method</th>
                <th className="text-left py-3 px-4 font-bold">Status</th>
                <th className="text-left py-3 px-4 font-bold">Date</th>
                <th className="text-left py-3 px-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{payment.patientName}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{payment.service}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {payment.paymentMethod === 'M-Pesa' && <Smartphone className="w-4 h-4 text-blue-600 mr-2" />}
                      {payment.paymentMethod === 'Credit Card' && <CreditCard className="w-4 h-4 text-blue-600 mr-2" />}
                      {payment.paymentMethod === 'Cash' && <Banknote className="w-4 h-4 text-blue-600 mr-2" />}
                      <span className="text-gray-900">{payment.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{payment.date}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
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

  const renderReports = () => (
    <div className="space-y-6">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Reports & Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Revenue Report</h4>
                <p className="text-sm text-gray-600">Monthly revenue breakdown</p>
              </div>
            </div>
            <button className="w-full flex items-center shadow-md justify-center border border-gray-100 px-4 py-2  text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <TrendingDown className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Expense Report</h4>
                <p className="text-sm text-gray-600">Detailed expense analysis</p>
              </div>
            </div>
            <button className="w-full flex items-center shadow-md justify-center border border-gray-100 px-4 py-2  text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Truck className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Ambulance P&L</h4>
                <p className="text-sm text-gray-600">Profit & loss per ambulance</p>
              </div>
            </div>
            <button className="w-full flex items-center shadow-md justify-center border border-gray-100 px-4 py-2  text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <UserCheck className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">CHW Payment Report</h4>
                <p className="text-sm text-gray-600">Payment summary for CHWs</p>
              </div>
            </div>
            <button className="w-full flex shadow-md items-center justify-center border border-gray-100 px-4 py-2  text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <PieChart className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Financial Summary</h4>
                <p className="text-sm text-gray-600">Complete financial overview</p>
              </div>
            </div>
            <button className="w-full flex shadow-md items-center justify-center border border-gray-100 px-4 py-2  text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Activity className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Budget Analysis</h4>
                <p className="text-sm text-gray-600">Budget vs actual comparison</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center border border-gray-100 shadow-md px-4 py-2  text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <div className="">
        <div className="">
          {/* Header Section */}
          <div className="mb-8">
            <div className="">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold">Financial Management</h1>
                  <p className="text-lg">
                    Comprehensive financial oversight for MediLink healthcare operations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="shadow-sm border border-gray-200 mb-6">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'revenue' && renderRevenue()}
            {activeTab === 'expenses' && renderExpenses()}
            {activeTab === 'ambulances' && renderAmbulanceFinances()}
            {activeTab === 'chw-payments' && renderCHWPayments()}
            {activeTab === 'patient-payments' && renderPatientPayments()}
            {activeTab === 'reports' && renderReports()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialManagement;