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
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(financialOverview.totalRevenue)}
              </p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{financialOverview.monthlyGrowth}%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(financialOverview.totalExpenses)}
              </p>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">68.6% of revenue</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(financialOverview.netProfit)}
              </p>
              <div className="flex items-center mt-2">
                <Target className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">{financialOverview.profitMargin}% margin</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CircleDollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(financialOverview.pendingPayments)}
              </p>
              <div className="flex items-center mt-2">
                <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm text-yellow-600">23 transactions</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue vs Expenses Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Financial Trend</h3>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="this-month">This Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="last-6-months">Last 6 Months</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Financial trend chart would be displayed here</p>
            <p className="text-sm text-gray-500">Integration with charting library needed</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
          <div className="space-y-3">
            <button className="w-full flex items-center px-4 py-2 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-blue-600 mr-3" />
              <span className="text-blue-700">Add New Transaction</span>
            </button>
            <button className="w-full flex items-center px-4 py-2 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <Download className="w-4 h-4 text-green-600 mr-3" />
              <span className="text-green-700">Export Financial Report</span>
            </button>
            <button className="w-full flex items-center px-4 py-2 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <Users className="w-4 h-4 text-purple-600 mr-3" />
              <span className="text-purple-700">Process CHW Payments</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Streams Analysis</h3>
          <div className="flex items-center space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{stream.source}</h4>
                  <div className="flex items-center">
                    {stream.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(stream.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Share of Total</p>
                    <p className="text-lg font-semibold text-gray-900">{stream.percentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transactions</p>
                    <p className="text-lg font-semibold text-gray-900">{stream.transactions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg per Transaction</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(stream.avgPerTransaction)}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${stream.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-4">Revenue Distribution</h4>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Pie chart visualization</p>
                <p className="text-sm text-gray-500">Would show revenue distribution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExpenses = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Expense Management</h3>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </button>
        </div>

        <div className="space-y-4">
          {expenses.map((expense, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{expense.category}</h4>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  expense.variance >= 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {expense.variance >= 0 ? '+' : ''}{formatCurrency(expense.variance)} vs budget
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Actual Spend</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(expense.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(expense.budget)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">% of Total Expenses</p>
                  <p className="text-lg font-semibold text-gray-900">{expense.percentage}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {expense.category.includes('CHW') ? 'CHWs' : 
                     expense.category.includes('Ambulance') ? 'Vehicles' : 
                     expense.category.includes('Staff') ? 'Staff' : 'Items'}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {expense.chws || expense.vehicles || expense.staff || expense.orders || expense.items}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        expense.variance >= 0 ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((expense.amount / expense.budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-sm text-gray-600">
                  {((expense.amount / expense.budget) * 100).toFixed(1)}% of budget
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAmbulanceFinances = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Ambulance Financial Performance</h3>
          <div className="flex items-center space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Ambulance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Fuel Costs</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Maintenance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Driver Pay</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Net Profit</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Trips</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {ambulanceFinancials.map((ambulance) => (
                <tr key={ambulance.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{ambulance.registration}</p>
                      <p className="text-sm text-gray-600">{ambulance.location}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{formatCurrency(ambulance.monthlyRevenue)}</p>
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
                    <p className={`font-medium ${ambulance.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(ambulance.netProfit)}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{ambulance.trips}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ambulance.status)}`}>
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Community Health Worker Payments</h3>
          <div className="flex items-center space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All CHWs</option>
              <option>Paid</option>
              <option>Pending</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <CheckCircle className="w-4 h-4 mr-2" />
              Process Payments
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-blue-600">Total CHWs</p>
                <p className="text-2xl font-bold text-blue-900">45</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-green-600">Payments Processed</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(480000)}</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-yellow-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-900">{formatCurrency(54000)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">CHW</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Base Pay</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Transport</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Patients</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {chwPayments.map((chw) => (
                <tr key={chw.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{chw.name}</p>
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chw.paymentStatus)}`}>
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Patient Payment Transactions</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Payments</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center">
              <Smartphone className="w-6 h-6 mr-2" />
              <div>
                <p className="text-sm opacity-90">M-Pesa</p>
                <p className="text-xl font-bold">{formatCurrency(650000)}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center">
              <CreditCard className="w-6 h-6 mr-2" />
              <div>
                <p className="text-sm opacity-90">Card Payments</p>
                <p className="text-xl font-bold">{formatCurrency(420000)}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
            <div className="flex items-center">
              <Banknote className="w-6 h-6 mr-2" />
              <div>
                <p className="text-sm opacity-90">Cash</p>
                <p className="text-xl font-bold">{formatCurrency(280000)}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center">
              <Receipt className="w-6 h-6 mr-2" />
              <div>
                <p className="text-sm opacity-90">Insurance</p>
                <p className="text-xl font-bold">{formatCurrency(180000)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Payment Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
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
                      {payment.paymentMethod === 'M-Pesa' && <Smartphone className="w-4 h-4 text-green-600 mr-2" />}
                      {payment.paymentMethod === 'Credit Card' && <CreditCard className="w-4 h-4 text-blue-600 mr-2" />}
                      {payment.paymentMethod === 'Cash' && <Banknote className="w-4 h-4 text-yellow-600 mr-2" />}
                      <span className="text-gray-900">{payment.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
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
                        <Receipt className="w-4 h-4" />
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
            <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <TrendingDown className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Expense Report</h4>
                <p className="text-sm text-gray-600">Detailed expense analysis</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Truck className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Ambulance P&L</h4>
                <p className="text-sm text-gray-600">Profit & loss per ambulance</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <UserCheck className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">CHW Payment Report</h4>
                <p className="text-sm text-gray-600">Payment summary for CHWs</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <PieChart className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Financial Summary</h4>
                <p className="text-sm text-gray-600">Complete financial overview</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Activity className="w-8 h-8 text-indigo-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Budget Analysis</h4>
                <p className="text-sm text-gray-600">Budget vs actual comparison</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="">
        <div className="">
          {/* Header Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Financial Management</h1>
                  <p className="text-blue-200 text-lg">
                    Comprehensive financial oversight for MediLink healthcare operations
                  </p>
                  <div className="mt-4 flex items-center space-x-6">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-300" />
                      <span className="text-blue-200">
                        Revenue: {formatCurrency(financialOverview.totalRevenue)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CircleDollarSign className="w-5 h-5 mr-2 text-yellow-300" />
                      <span className="text-blue-200">
                        Profit: {formatCurrency(financialOverview.netProfit)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-300" />
                      <span className="text-blue-200">
                        Margin: {financialOverview.profitMargin}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-16 h-16 text-blue-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
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