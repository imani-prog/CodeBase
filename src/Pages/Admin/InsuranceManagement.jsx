import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Plus, 
  Edit, 
  Eye, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Calendar, 
  BarChart3, 
  PieChart, 
  Target, 
  CreditCard, 
  Activity, 
  Settings, 
  RefreshCw, 
  Truck, 
  Hospital, 
  UserCheck, 
  Receipt, 
  Calculator, 
  Banknote, 
  Percent, 
  TrendingDown,
  Building2,
  Phone,
  Mail,
  MapPin,
  Star,
  Zap
} from 'lucide-react';

const InsuranceManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');

  // Sample data for Kenyan insurance context
  const insuranceOverview = {
    totalProviders: 8,
    activePatients: 2347,
    totalCoverage: 45670000, // KES
    claimsProcessed: 1289,
    pendingClaims: 67,
    rejectedClaims: 23,
    averageClaimAmount: 8500,
    ambulanceCoverage: 89.5,
    monthlyPremiums: 2890000
  };

  const insuranceProviders = [
    {
      id: 1,
      name: "Social Health Authority (SHA)",
      type: "Government",
      logo: "🏛️",
      status: "Active",
      patients: 1245,
      coverage: "Universal Health Coverage",
      claimsProcessed: 456,
      totalAmount: 15670000,
      contactPerson: "Dr. Sarah Mwangi",
      phone: "+254-700-123456",
      email: "claims@sha.go.ke",
      policyTypes: ["UHC Basic", "UHC Plus", "Emergency Care"],
      ambulanceCover: true,
      coveragePercentage: 85,
      averageProcessingTime: "7 days"
    },
    {
      id: 2,
      name: "National Hospital Insurance Fund (NHIF)",
      type: "Government",
      logo: "🏥",
      status: "Active",
      patients: 867,
      coverage: "National Health Insurance",
      claimsProcessed: 312,
      totalAmount: 12450000,
      contactPerson: "Mr. Peter Kiprotich",
      phone: "+254-700-789012",
      email: "claims@nhif.or.ke",
      policyTypes: ["Inpatient", "Outpatient", "Maternity", "Chronic Disease"],
      ambulanceCover: true,
      coveragePercentage: 80,
      averageProcessingTime: "10 days"
    },
    {
      id: 3,
      name: "AAR Insurance",
      type: "Private",
      logo: "🛡️",
      status: "Active",
      patients: 156,
      coverage: "Comprehensive Health Insurance",
      claimsProcessed: 89,
      totalAmount: 8920000,
      contactPerson: "Ms. Grace Wanjiku",
      phone: "+254-700-345678",
      email: "medical@aar.co.ke",
      policyTypes: ["Individual", "Family", "Corporate", "Travel"],
      ambulanceCover: true,
      coveragePercentage: 90,
      averageProcessingTime: "5 days"
    },
    {
      id: 4,
      name: "Jubilee Insurance",
      type: "Private",
      logo: "💎",
      status: "Active",
      patients: 78,
      coverage: "Premium Health Plans",
      claimsProcessed: 45,
      totalAmount: 5670000,
      contactPerson: "Dr. Michael Ochieng",
      phone: "+254-700-456789",
      email: "health@jubilee.co.ke",
      policyTypes: ["Gold", "Silver", "Bronze", "Executive"],
      ambulanceCover: true,
      coveragePercentage: 95,
      averageProcessingTime: "3 days"
    },
    {
      id: 5,
      name: "CIC Insurance",
      type: "Private",
      logo: "🔰",
      status: "Active",
      patients: 234,
      coverage: "Affordable Health Coverage",
      claimsProcessed: 134,
      totalAmount: 4560000,
      contactPerson: "Ms. Betty Njeri",
      phone: "+254-700-567890",
      email: "medical@cic.co.ke",
      policyTypes: ["Basic", "Standard", "Premium"],
      ambulanceCover: false,
      coveragePercentage: 75,
      averageProcessingTime: "8 days"
    }
  ];

  const patientCoverage = [
    {
      id: 1,
      patientName: "John Mwangi",
      patientId: "PT001",
      insuranceProvider: "SHA",
      policyNumber: "SHA/2024/001234",
      policyType: "UHC Plus",
      coverageAmount: 150000,
      usedAmount: 45000,
      remainingAmount: 105000,
      status: "Active",
      renewalDate: "2024-12-31",
      dependents: 3,
      lastClaim: "2024-09-15",
      claimAmount: 12500
    },
    {
      id: 2,
      patientName: "Mary Achieng",
      patientId: "PT002",
      insuranceProvider: "NHIF",
      policyNumber: "NHIF/2024/567890",
      policyType: "Comprehensive",
      coverageAmount: 100000,
      usedAmount: 23000,
      remainingAmount: 77000,
      status: "Active",
      renewalDate: "2024-11-30",
      dependents: 2,
      lastClaim: "2024-08-22",
      claimAmount: 8700
    },
    {
      id: 3,
      patientName: "Peter Kimani",
      patientId: "PT003",
      insuranceProvider: "AAR Insurance",
      policyNumber: "AAR/2024/112233",
      policyType: "Family Plan",
      coverageAmount: 300000,
      usedAmount: 67000,
      remainingAmount: 233000,
      status: "Active",
      renewalDate: "2025-01-15",
      dependents: 4,
      lastClaim: "2024-10-01",
      claimAmount: 34500
    }
  ];

  const ambulanceInsurance = [
    {
      id: 1,
      vehicleNumber: "KCA 001A",
      insuranceProvider: "AAR Insurance",
      policyNumber: "AAR/AMB/2024/001",
      policyType: "Comprehensive Commercial",
      coverageAmount: 5000000,
      premium: 45000,
      deductible: 25000,
      status: "Active",
      expiryDate: "2024-12-15",
      lastClaim: "2024-07-20",
      claimAmount: 125000,
      driversCovered: 3
    },
    {
      id: 2,
      vehicleNumber: "KCB 002B",
      insuranceProvider: "Jubilee Insurance",
      policyNumber: "JUB/AMB/2024/002",
      policyType: "Third Party Plus",
      coverageAmount: 3000000,
      premium: 32000,
      deductible: 20000,
      status: "Active",
      expiryDate: "2025-01-10",
      lastClaim: "2024-05-15",
      claimAmount: 85000,
      driversCovered: 2
    },
    {
      id: 3,
      vehicleNumber: "KCC 003C",
      insuranceProvider: "CIC Insurance",
      policyNumber: "CIC/AMB/2024/003",
      policyType: "Commercial Vehicle",
      coverageAmount: 4000000,
      premium: 38000,
      deductible: 30000,
      status: "Expiring Soon",
      expiryDate: "2024-10-25",
      lastClaim: "2024-09-10",
      claimAmount: 95000,
      driversCovered: 4
    }
  ];

  const claimsData = [
    {
      id: 1,
      claimNumber: "CLM-2024-001",
      patientName: "Sarah Wanjiku",
      patientId: "PT045",
      insuranceProvider: "SHA",
      claimType: "Outpatient",
      claimAmount: 15500,
      approvedAmount: 13950,
      status: "Approved",
      submissionDate: "2024-10-01",
      processingTime: "6 days",
      diagnosis: "Hypertension Management",
      hospital: "Kenyatta National Hospital"
    },
    {
      id: 2,
      claimNumber: "CLM-2024-002",
      patientName: "David Kiprotich",
      patientId: "PT067",
      insuranceProvider: "NHIF",
      claimType: "Emergency",
      claimAmount: 45000,
      approvedAmount: 36000,
      status: "Processing",
      submissionDate: "2024-10-08",
      processingTime: "3 days",
      diagnosis: "Cardiac Emergency",
      hospital: "Aga Khan University Hospital"
    },
    {
      id: 3,
      claimNumber: "CLM-2024-003",
      patientName: "Grace Njeri",
      patientId: "PT089",
      insuranceProvider: "AAR Insurance",
      claimType: "Maternity",
      claimAmount: 85000,
      approvedAmount: 80750,
      status: "Approved",
      submissionDate: "2024-09-25",
      processingTime: "4 days",
      diagnosis: "Normal Delivery",
      hospital: "Nairobi Hospital"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'providers', label: 'Insurance Providers', icon: Building2 },
    { id: 'patients', label: 'Patient Coverage', icon: Users },
    { id: 'claims', label: 'Claims Management', icon: FileText },
    { id: 'ambulance', label: 'Ambulance Insurance', icon: Truck },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'policies', label: 'Policy Management', icon: Receipt },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      case 'approved': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'expiring soon': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Render Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Providers</p>
              <p className="text-3xl font-bold text-gray-900">{insuranceOverview.totalProviders}</p>
              <p className="text-sm text-green-600 mt-1">+2 this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Covered Patients</p>
              <p className="text-3xl font-bold text-gray-900">{insuranceOverview.activePatients.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+156 this month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Coverage</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(insuranceOverview.totalCoverage)}</p>
              <p className="text-sm text-green-600 mt-1">+8.5% growth</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Claims Processed</p>
              <p className="text-3xl font-bold text-gray-900">{insuranceOverview.claimsProcessed}</p>
              <p className="text-sm text-yellow-600 mt-1">{insuranceOverview.pendingClaims} pending</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Claims by Provider</h3>
          <div className="space-y-4">
            {insuranceProviders.slice(0, 4).map((provider) => (
              <div key={provider.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{provider.logo}</span>
                  <div>
                    <p className="font-medium text-gray-900">{provider.name}</p>
                    <p className="text-sm text-gray-500">{provider.claimsProcessed} claims</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{formatCurrency(provider.totalAmount)}</p>
                  <p className="text-sm text-gray-500">{provider.coveragePercentage}% coverage</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus className="w-5 h-5 text-blue-600 mr-2" />
              Add Provider
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5 text-green-600 mr-2" />
              Process Claims
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-purple-600 mr-2" />
              Export Report
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 text-gray-600 mr-2" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Insurance Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Claim Approved - CLM-2024-045</p>
                <p className="text-sm text-gray-500">SHA - Sarah Wanjiku - KES 13,950</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">New Patient Enrolled</p>
                <p className="text-sm text-gray-500">NHIF - David Kiprotich - UHC Basic</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Policy Renewal Required</p>
                <p className="text-sm text-gray-500">Ambulance KCC 003C - Expires Oct 25</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Insurance Providers Tab
  const renderProviders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Insurance Providers</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insuranceProviders.map((provider) => (
          <div key={provider.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{provider.logo}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                  <p className="text-sm text-gray-500">{provider.type}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(provider.status)}`}>
                {provider.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Covered Patients:</span>
                <span className="text-sm font-medium">{provider.patients.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Claims Processed:</span>
                <span className="text-sm font-medium">{provider.claimsProcessed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Amount:</span>
                <span className="text-sm font-medium">{formatCurrency(provider.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Coverage:</span>
                <span className="text-sm font-medium">{provider.coveragePercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Ambulance Cover:</span>
                <span className={`text-sm font-medium ${provider.ambulanceCover ? 'text-green-600' : 'text-red-600'}`}>
                  {provider.ambulanceCover ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600 mb-2">Contact Person:</div>
              <div className="text-sm font-medium text-gray-900">{provider.contactPerson}</div>
              <div className="text-sm text-gray-500">{provider.phone}</div>
              <div className="text-sm text-gray-500">{provider.email}</div>
            </div>

            <div className="mt-4 flex justify-between">
              <button className="text-blue-600 hover:text-blue-700 flex items-center text-sm">
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </button>
              <button className="text-gray-600 hover:text-gray-700 flex items-center text-sm">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Patient Coverage Tab
  const renderPatientCoverage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Patient Insurance Coverage</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="all">All Providers</option>
            <option value="sha">SHA</option>
            <option value="nhif">NHIF</option>
            <option value="aar">AAR Insurance</option>
            <option value="jubilee">Jubilee Insurance</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patientCoverage.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{patient.patientName}</div>
                      <div className="text-sm text-gray-500">ID: {patient.patientId}</div>
                      <div className="text-sm text-gray-500">{patient.dependents} dependents</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.insuranceProvider}</div>
                    <div className="text-sm text-gray-500">{patient.policyType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.policyNumber}</div>
                    <div className="text-sm text-gray-500">Expires: {patient.renewalDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{formatCurrency(patient.coverageAmount)} Total</div>
                      <div className="text-green-600">{formatCurrency(patient.remainingAmount)} Remaining</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(patient.remainingAmount / patient.coverageAmount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
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

  // Render Claims Management Tab
  const renderClaims = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Claims Management</h3>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Claim
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </button>
        </div>
      </div>

      {/* Claims Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Approved Claims</p>
              <p className="text-2xl font-bold text-gray-900">{insuranceOverview.claimsProcessed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Claims</p>
              <p className="text-2xl font-bold text-gray-900">{insuranceOverview.pendingClaims}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rejected Claims</p>
              <p className="text-2xl font-bold text-gray-900">{insuranceOverview.rejectedClaims}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Claim</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(insuranceOverview.averageClaimAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claimsData.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{claim.claimNumber}</div>
                      <div className="text-sm text-gray-500">{claim.claimType}</div>
                      <div className="text-sm text-gray-500">Submitted: {claim.submissionDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{claim.patientName}</div>
                      <div className="text-sm text-gray-500">ID: {claim.patientId}</div>
                      <div className="text-sm text-gray-500">{claim.diagnosis}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{claim.insuranceProvider}</div>
                      <div className="text-sm text-gray-500">{claim.hospital}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(claim.claimAmount)}</div>
                      <div className="text-sm text-green-600">Approved: {formatCurrency(claim.approvedAmount)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">{claim.processingTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <XCircle className="w-4 h-4" />
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

  // Render Ambulance Insurance Tab
  const renderAmbulanceInsurance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Ambulance Insurance Management</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Policy
        </button>
      </div>

      {/* Ambulance Insurance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Truck className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-blue-600">Total Vehicles</p>
              <p className="text-2xl font-bold text-blue-900">{ambulanceInsurance.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-green-600">Coverage Rate</p>
              <p className="text-2xl font-bold text-green-900">{insuranceOverview.ambulanceCoverage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-purple-600">Total Premiums</p>
              <p className="text-2xl font-bold text-purple-900">
                {formatCurrency(ambulanceInsurance.reduce((sum, ambulance) => sum + ambulance.premium, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ambulance Insurance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ambulanceInsurance.map((ambulance) => (
          <div key={ambulance.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Truck className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">{ambulance.vehicleNumber}</h4>
                  <p className="text-sm text-gray-500">{ambulance.policyType}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ambulance.status)}`}>
                {ambulance.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Insurance Provider:</span>
                <span className="text-sm font-medium">{ambulance.insuranceProvider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Policy Number:</span>
                <span className="text-sm font-medium">{ambulance.policyNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Coverage Amount:</span>
                <span className="text-sm font-medium">{formatCurrency(ambulance.coverageAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Premium:</span>
                <span className="text-sm font-medium">{formatCurrency(ambulance.premium)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Deductible:</span>
                <span className="text-sm font-medium">{formatCurrency(ambulance.deductible)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Expiry Date:</span>
                <span className="text-sm font-medium">{ambulance.expiryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Drivers Covered:</span>
                <span className="text-sm font-medium">{ambulance.driversCovered}</span>
              </div>
            </div>

            {ambulance.lastClaim && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Last Claim:</div>
                <div className="text-sm font-medium text-gray-900">{ambulance.lastClaim}</div>
                <div className="text-sm text-gray-500">{formatCurrency(ambulance.claimAmount)}</div>
              </div>
            )}

            <div className="mt-4 flex justify-between">
              <button className="text-blue-600 hover:text-blue-700 flex items-center text-sm">
                <Eye className="w-4 h-4 mr-1" />
                View Policy
              </button>
              <button className="text-green-600 hover:text-green-700 flex items-center text-sm">
                <RefreshCw className="w-4 h-4 mr-1" />
                Renew
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Analytics Tab (placeholder)
  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Insurance Analytics & Reports</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Coverage Distribution</h4>
          <div className="space-y-4">
            {insuranceProviders.map((provider) => (
              <div key={provider.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{provider.logo}</span>
                  <span className="text-sm font-medium">{provider.name}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(provider.patients / insuranceOverview.activePatients) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{provider.patients}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h4>
          <div className="text-center py-12 text-gray-500">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p>Analytics chart placeholder</p>
            <p className="text-sm">Integration with chart library needed</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Policy Management Tab (placeholder)
  const renderPolicies = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Policy Management Dashboard</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Policy Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <Receipt className="w-8 h-8 text-blue-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Active Policies</h4>
          <p className="text-3xl font-bold text-gray-900">127</p>
          <p className="text-sm text-green-600 mt-1">+12 this month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <AlertCircle className="w-8 h-8 text-yellow-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Expiring Soon</h4>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-sm text-yellow-600 mt-1">Next 30 days</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <Calculator className="w-8 h-8 text-purple-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Premium Value</h4>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(insuranceOverview.monthlyPremiums)}</p>
          <p className="text-sm text-green-600 mt-1">+5.2% growth</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Policy Categories</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-900">Individual Policies</h5>
            <p className="text-2xl font-bold text-blue-600">45</p>
            <p className="text-sm text-blue-500">Personal coverage</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h5 className="font-medium text-green-900">Family Policies</h5>
            <p className="text-2xl font-bold text-green-600">67</p>
            <p className="text-sm text-green-500">Household coverage</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h5 className="font-medium text-purple-900">Corporate Policies</h5>
            <p className="text-2xl font-bold text-purple-600">12</p>
            <p className="text-sm text-purple-500">Business coverage</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h5 className="font-medium text-orange-900">Emergency Policies</h5>
            <p className="text-2xl font-bold text-orange-600">3</p>
            <p className="text-sm text-orange-500">Critical care coverage</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Settings Tab (placeholder)
  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Insurance Management Settings</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="KES">Kenyan Shilling (KES)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Claim Processing Time</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="3">3 days</option>
                <option value="5">5 days</option>
                <option value="7">7 days</option>
                <option value="10">10 days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auto-approval Limit</label>
              <input
                type="number"
                placeholder="Amount in KES"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Send email updates for claims</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Send SMS updates for urgent claims</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Policy Renewal Alerts</p>
                <p className="text-sm text-gray-500">Alert before policy expiration</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <main className="">
          <div className="">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Management</h1>
              <p className="text-gray-600">Manage insurance providers, patient coverage, claims processing, and ambulance insurance policies</p>
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
            {activeTab === 'providers' && renderProviders()}
            {activeTab === 'patients' && renderPatientCoverage()}
            {activeTab === 'claims' && renderClaims()}
            {activeTab === 'ambulance' && renderAmbulanceInsurance()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'policies' && renderPolicies()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InsuranceManagement;