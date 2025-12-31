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
  Trash,
  Zap,
  Trash2,
  Save,
  Bell,
  MessageSquare
} from 'lucide-react';

const InsuranceManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [hasChanges, setHasChanges] = useState(false);

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
      logo: "",
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
      logo: "",
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
      logo: "",
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
      logo: "",
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
      logo: "",
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
      case 'active': return 'text-green-600';
      case 'processing': return 'text-yellow-600';
      case 'approved': return 'text-green-600';
      case 'rejected': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      case 'expiring soon': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  // Render Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1">Total Providers</p>
              <p className="text-3xl font-bold">{insuranceOverview.totalProviders}</p>
              <p className="text-sm text-green-600 mt-1">+2 this month</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className=" mb-1">Covered Patients</p>
              <p className="text-3xl font-bold">{insuranceOverview.activePatients.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+156 this month</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className=" mb-1">Total Coverage</p>
              <p className="text-3xl font-bold">{formatCurrency(insuranceOverview.totalCoverage)}</p>
              <p className="text-sm text-green-600 mt-1">+8.5% growth</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className=" mb-1">Claims Processed</p>
              <p className="text-3xl font-bold">{insuranceOverview.claimsProcessed}</p>
              <p className="text-sm text-yellow-600 mt-1">{insuranceOverview.pendingClaims} pending</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Claims by Provider</h3>
          <div className="space-y-4">
            {insuranceProviders.slice(0, 4).map((provider) => (
              <div key={provider.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <span className="text-2xl mr-3">{provider.logo}</span> */}
                  <div>
                    <p className="font-semibold">{provider.name}</p>
                    <p className="text-sm">{provider.claimsProcessed} claims</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(provider.totalAmount)}</p>
                  <p className="text-sm">{provider.coveragePercentage}% coverage</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus className="w-5 h-5 text-blue-600 mr-2" />
              Add Provider
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              Process Claims
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-blue-600 mr-2" />
              Export Report
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 text-blue-600 mr-2" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Insurance Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 ">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="font-medium ">Claim Approved - CLM-2024-045</p>
                <p className="text-sm text-gray-500">SHA - Sarah Wanjiku - KES 13,950</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-4 ">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="font-medium ">New Patient Enrolled</p>
                <p className="text-sm text-gray-500">NHIF - David Kiprotich - UHC Basic</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </div>

          <div className="flex items-center justify-between p-4 ">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="font-medium">Policy Renewal Required</p>
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Insurance Providers</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Total Providers</p>
              <p className="text-2xl font-bold">{insuranceProviders.length}</p>
            </div>
          </div>
        </div>
        <div className="shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Covered Patients</p>
              <p className="text-2xl font-bold">
                {insuranceProviders.reduce((sum, p) => sum + p.patients, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Total Claims</p>
              <p className="text-2xl font-bold">
                {insuranceProviders.reduce((sum, p) => sum + p.claimsProcessed, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Total Amount</p>
              <p className="text-2xl font-bold">
                {formatCurrency(insuranceProviders.reduce((sum, p) => sum + p.totalAmount, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Provider Name</th>
              <th className="px-4 py-3 text-center">Type</th>
              <th className="px-4 py-3 text-center">Patients</th>
              <th className="px-4 py-3 text-center">Claims</th>
              <th className="px-4 py-3 text-right">Total Amount</th>
              <th className="px-4 py-3 text-center">Coverage</th>
              <th className="px-4 py-3 text-center">Ambulance</th>
              <th className="px-4 py-3 text-left">Contact Person</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {insuranceProviders.map((provider) => (
              <tr key={provider.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div>
                    <p className="font-semibold">{provider.name}</p>
                    <p className="text-xs text-gray-500">{provider.coverage}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                    provider.type === 'Government' ? ' text-blue-800' : ' text-blue-800'
                  }`}>
                    {provider.type}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-semibold">{provider.patients.toLocaleString()}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-semibold">{provider.claimsProcessed}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold">{formatCurrency(provider.totalAmount)}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium mb-1">{provider.coveragePercentage}%</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${provider.coveragePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-2 py-1 font-medium rounded-full border ${
                    provider.ambulanceCover ? ' text-green-800' : ' text-red-800'
                  }`}>
                    {provider.ambulanceCover ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium">{provider.contactPerson}</p>
                    <p className="text-xs text-gray-500">{provider.phone}</p>
                    <p className="text-xs text-gray-500">{provider.email}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="px-2 py-1 font-medium text-green-800">
                    {provider.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
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
  );

  // Render Patient Coverage Tab
  const renderPatientCoverage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Patient Insurance Coverage</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Insurance Provider</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Policy Details</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Coverage</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patientCoverage.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-semibold">{patient.patientName}</div>
                      <div className="text-sm ">ID: {patient.patientId}</div>
                      <div className="text-sm text-gray-500">{patient.dependents} dependents</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold">{patient.insuranceProvider}</div>
                    <div className="text-sm ">{patient.policyType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold">{patient.policyNumber}</div>
                    <div className="text-sm ">Expires: {patient.renewalDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-semibold mb-2">{formatCurrency(patient.coverageAmount)} Total</div>
                      <div className="">{formatCurrency(patient.remainingAmount)} Remaining</div>
                      {/* <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(patient.remainingAmount / patient.coverageAmount) * 100}%` }}
                        ></div>
                      </div> */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex leading-5 ${getStatusColor(patient.status)}`}>
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
                      <button className="text-blue-800 hover:text-blue-900">
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
        <h3 className="text-lg font-semibold">Claims Management</h3>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Claim
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </button>
        </div>
      </div>

      {/* Claims Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white  shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12  flex items-center justify-center mr-4">
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <p className="">Approved Claims</p>
              <p className="text-2xl font-bold">{insuranceOverview.claimsProcessed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12  flex items-center justify-center mr-4">
              <Clock className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <p className="">Pending Claims</p>
              <p className="text-2xl font-bold">{insuranceOverview.pendingClaims}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12  flex items-center justify-center mr-4">
              <XCircle className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <p className="">Rejected Claims</p>
              <p className="text-2xl font-bold">{insuranceOverview.rejectedClaims}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12  flex items-center justify-center mr-4">
              <DollarSign className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <p className="">Average Claim</p>
              <p className="text-2xl font-bold">{formatCurrency(insuranceOverview.averageClaimAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Claim Details</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claimsData.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-semibold">{claim.claimNumber}</div>
                      <div className="text-sm">{claim.claimType}</div>
                      <div className="text-sm text-gray-500">Submitted: {claim.submissionDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-semibold">{claim.patientName}</div>
                      <div className="text-sm">ID: {claim.patientId}</div>
                      <div className="text-sm text-gray-500">{claim.diagnosis}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-semibold">{claim.insuranceProvider}</div>
                      <div className="text-sm">{claim.hospital}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-semibold">{formatCurrency(claim.claimAmount)}</div>
                      <div className="text-sm">Approved: {formatCurrency(claim.approvedAmount)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                    <div className="text-xs mt-1">{claim.processingTime}</div>
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
                        <Trash2 className="w-4 h-4" />
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Ambulance Insurance Management</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Policy
        </button>
      </div>

      {/* Ambulance Insurance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <Truck className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="">Total Vehicles</p>
              <p className="text-2xl font-bold">{ambulanceInsurance.length}</p>
            </div>
          </div>
        </div>

        <div className="shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm">Coverage Rate</p>
              <p className="text-2xl font-bold">{insuranceOverview.ambulanceCoverage}%</p>
            </div>
          </div>
        </div>

        <div className="shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm">Total Premiums</p>
              <p className="text-2xl font-bold">
                {formatCurrency(ambulanceInsurance.reduce((sum, ambulance) => sum + ambulance.premium, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ambulance Insurance Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Vehicle</th>
              <th className="px-4 py-3 text-left">Insurance Provider</th>
              <th className="px-4 py-3 text-center">Policy Type</th>
              <th className="px-4 py-3 text-right">Coverage Amount</th>
              <th className="px-4 py-3 text-right">Premium</th>
              <th className="px-4 py-3 text-right">Deductible</th>
              <th className="px-4 py-3 text-center">Expiry Date</th>
              <th className="px-4 py-3 text-center">Drivers</th>
              <th className="px-4 py-3 text-left">Last Claim</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ambulanceInsurance.map((ambulance) => (
              <tr key={ambulance.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <span className="font-semibold">{ambulance.vehicleNumber}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-semibold">{ambulance.insuranceProvider}</p>
                    <p className="text-sm">{ambulance.policyNumber}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="px-2 py-1 text-xs font-medium rounded-full border text-blue-800">
                    {ambulance.policyType}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold">{formatCurrency(ambulance.coverageAmount)}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold">{formatCurrency(ambulance.premium)}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-medium">{formatCurrency(ambulance.deductible)}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="">{ambulance.expiryDate}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-semibold">{ambulance.driversCovered}</span>
                </td>
                <td className="px-4 py-4">
                  {ambulance.lastClaim ? (
                    <div>
                      <p className="text-sm font-medium">{ambulance.lastClaim}</p>
                      <p className="text-xs">{formatCurrency(ambulance.claimAmount)}</p>
                    </div>
                  ) : (
                    <span className="text-gray-400">No claims</span>
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-2 py-1 text-sm font-medium ${
                    ambulance.status === 'Active' ? ' text-green-800' :
                    ambulance.status === 'Expiring Soon' ? ' text-yellow-800' :
                    ' text-red-800'
                  }`}>
                    {ambulance.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
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
  );

  // Render Analytics Tab (placeholder)
  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Insurance Analytics & Reports</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold mb-4">Coverage Distribution</h4>
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 uppercase text-xs">
                <tr>
                  <th className="px-3 py-2 text-left">Provider</th>
                  <th className="px-3 py-2 text-center">Patients</th>
                  <th className="px-3 py-2 text-center">% Share</th>
                  <th className="px-3 py-2 text-right">Claims</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {insuranceProviders.map((provider) => {
                  const sharePercentage = ((provider.patients / insuranceOverview.activePatients) * 100).toFixed(1);
                  return (
                    <tr key={provider.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3">
                        <p className="font-medium text-sm">{provider.name}</p>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className="font-semibold">{provider.patients}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-medium mb-1">{sharePercentage}%</span>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-500 h-1.5 rounded-full" 
                              style={{ width: `${sharePercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <span className="font-medium text-gray-900">{provider.claimsProcessed}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold mb-4">Monthly Trends</h4>
          <div className="space-y-2">
            {/* Chart Legend */}
            <div className="flex justify-end space-x-4 text-xs mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-900 rounded mr-1"></div>
                <span className="text-gray-600">Claims</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                <span className="text-gray-600">Premiums</span>
              </div>
            </div>

            {/* Chart Area with Y-axis */}
            <div className="flex">
              {/* Y-axis Labels */}
              <div className="flex flex-col-reverse justify-between text-xs text-gray-500 pr-2 h-56">
                <span>0</span>
                <span>100</span>
                <span>200</span>
                <span>300+</span>
              </div>

              {/* Chart Container */}
              <div className="flex-1">
                {/* Bar Chart */}
                <div className="h-56 border-b-2 border-l-2 border-gray-300 flex items-end justify-around px-2 relative">
                  {[
                    { month: 'Jun', claims: 180, premiums: 85 },
                    { month: 'Jul', claims: 220, premiums: 90 },
                    { month: 'Aug', claims: 280, premiums: 88 },
                    { month: 'Sep', claims: 310, premiums: 92 },
                    { month: 'Oct', claims: 289, premiums: 87 },
                    { month: 'Nov', claims: 320, premiums: 95 }
                  ].map((data, index) => {
                    const maxValue = 350;
                    const chartHeight = 220; // Fixed height in pixels
                    const claimsHeight = (data.claims / maxValue) * chartHeight;
                    const premiumsHeight = (data.premiums / maxValue) * chartHeight;
                    
                    return (
                      <div key={index} className="flex items-end space-x-1 pb-2">
                        {/* Claims Bar */}
                        <div className="relative group">
                          <div 
                            className="bg-blue-900 hover:bg-blue-600 transition-all rounded-t-sm w-6 cursor-pointer"
                            style={{ height: `${claimsHeight}px` }}
                          >
                            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-200 px-6 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                              <div className="font-semibold text-center border-b border-gray-200 pb-1 mb-1 text-gray-800">{data.month}</div>
                              <div className="text-blue-900 font-medium">Claims: {data.claims}</div>
                              <div className="text-blue-500 font-medium">Premiums: {data.premiums}%</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Premiums Bar */}
                        <div className="relative group">
                          <div 
                            className="bg-blue-500 hover:bg-blue-600 transition-all rounded-t-sm w-6 cursor-pointer"
                            style={{ height: `${premiumsHeight}px` }}
                          >
                            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-200 px-6 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                              <div className="font-semibold text-center border-b border-gray-200 pb-1 mb-1 text-gray-800">{data.month}</div>
                              <div className="text-blue-900 font-medium">Claims: {data.claims}</div>
                              <div className="text-blue-500 font-medium">Premiums: {data.premiums}%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* X-axis Labels (Months) */}
                <div className="flex justify-around text-xs text-gray-600 font-medium mt-2 px-2">
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Policy Management Tab
  const renderPolicies = () => {
    const policies = [
      { id: 'POL-001', policyNumber: 'NHIF-2024-001', policyHolder: 'John Kamau', category: 'Individual', type: 'Comprehensive', provider: 'Jubilee Insurance', premium: 45000, coverage: 1500000, startDate: '2024-01-15', expiryDate: '2025-01-15', status: 'Active', beneficiaries: 1, claims: 3 },
      { id: 'POL-002', policyNumber: 'AAR-2024-089', policyHolder: 'Mary Njeri', category: 'Family', type: 'Premium', provider: 'AAR Healthcare', premium: 85000, coverage: 3000000, startDate: '2024-02-20', expiryDate: '2025-02-20', status: 'Active', beneficiaries: 4, claims: 5 },
      { id: 'POL-003', policyNumber: 'MED-2024-045', policyHolder: 'Peter Omondi', category: 'Individual', type: 'Basic', provider: 'Madison Insurance', premium: 28000, coverage: 800000, startDate: '2024-03-10', expiryDate: '2025-03-10', status: 'Active', beneficiaries: 1, claims: 2 },
      { id: 'POL-004', policyNumber: 'CIC-2024-123', policyHolder: 'Tech Solutions Ltd', category: 'Corporate', type: 'Group', provider: 'CIC Insurance', premium: 450000, coverage: 10000000, startDate: '2024-01-01', expiryDate: '2025-01-01', status: 'Active', beneficiaries: 25, claims: 18 },
      { id: 'POL-005', policyNumber: 'BRI-2024-067', policyHolder: 'Grace Muthoni', category: 'Family', type: 'Standard', provider: 'Britam Insurance', premium: 62000, coverage: 2000000, startDate: '2024-04-15', expiryDate: '2024-02-10', status: 'Expiring', beneficiaries: 3, claims: 4 },
      { id: 'POL-006', policyNumber: 'JUB-2024-234', policyHolder: 'Samuel Kipchoge', category: 'Individual', type: 'Premium', provider: 'Jubilee Insurance', premium: 55000, coverage: 2500000, startDate: '2024-05-01', expiryDate: '2025-05-01', status: 'Active', beneficiaries: 1, claims: 1 },
      { id: 'POL-007', policyNumber: 'AAR-2024-156', policyHolder: 'Jane Wambui', category: 'Family', type: 'Comprehensive', provider: 'AAR Healthcare', premium: 95000, coverage: 3500000, startDate: '2024-03-20', expiryDate: '2024-02-05', status: 'Expiring', beneficiaries: 5, claims: 7 },
      { id: 'POL-008', policyNumber: 'EMG-2024-012', policyHolder: 'Dr. David Mutua', category: 'Emergency', type: 'Critical Care', provider: 'Resolution Health', premium: 120000, coverage: 5000000, startDate: '2024-06-01', expiryDate: '2025-06-01', status: 'Active', beneficiaries: 1, claims: 2 },
      { id: 'POL-009', policyNumber: 'MED-2024-078', policyHolder: 'Sarah Achieng', category: 'Individual', type: 'Basic', provider: 'Madison Insurance', premium: 32000, coverage: 1000000, startDate: '2024-07-10', expiryDate: '2025-07-10', status: 'Active', beneficiaries: 1, claims: 0 },
      { id: 'POL-010', policyNumber: 'CIC-2024-189', policyHolder: 'Green Valley School', category: 'Corporate', type: 'Group', provider: 'CIC Insurance', premium: 380000, coverage: 8000000, startDate: '2024-02-01', expiryDate: '2025-02-01', status: 'Active', beneficiaries: 42, claims: 12 }
    ];

    const stats = [
      { label: 'Total Policies', value: '127', change: '+12 this month', icon: Receipt, color: 'blue' },
      { label: 'Expiring Soon', value: '8', change: 'Next 30 days', icon: AlertCircle, color: 'blue' },
      { label: 'Premium Value', value: formatCurrency(2890000), change: '+5.2% growth', icon: Calculator, color: 'blue' },
      { label: 'Active Claims', value: '54', change: '18 pending', icon: FileText, color: 'blue' }
    ];

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Policy Management</h3>
            
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Policy
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = {
              blue: 'text-blue-600',
              
            };
            
            return (
              <div key={index} className="bg-white shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${colors[stat.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Header with Actions */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">All Policies</h4>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-1" />
              Export
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="ml-50 w-1/2 flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by policy number, holder name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Categories</option>
            <option value="individual">Individual</option>
            <option value="family">Family</option>
            <option value="corporate">Corporate</option>
            <option value="emergency">Emergency</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="expiring">Expiring</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Policies Table */}
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Policy Details</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Coverage</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Premium</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Beneficiaries</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Claims</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {policies.map((policy) => (
                  <tr key={policy.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-semibold">{policy.policyHolder}</div>
                        <div className="text-sm ">{policy.policyNumber}</div>
                        <div className="text-xs text-gray-600">{policy.type}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                        policy.category === 'Individual' ? ' text-blue-700' :
                        policy.category === 'Family' ? ' text-green-700' :
                        policy.category === 'Corporate' ? ' text-blue-950' :
                        ' text-orange-700'
                      }`}>
                        {policy.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold ">{policy.provider}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{formatCurrency(policy.coverage)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{formatCurrency(policy.premium)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-4 h-4  mr-1" />
                        <span className="text-sm ">{policy.beneficiaries}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm ">{policy.expiryDate}</div>
                      <div className="text-xs ">{policy.startDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium  text-blue-700">
                        <FileText className="w-3 h-3 mr-1" />
                        {policy.claims}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${
                        policy.status === 'Active' ? ' text-green-800' :
                        policy.status === 'Expiring' ? ' text-yellow-800' :
                        ' text-red-800'
                      }`}>
                        {policy.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1-10</span> of <span className="font-medium">127</span> policies
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
      </div>
    );
  };

  // Render Settings Tab
  const renderSettings = () => {
    return (
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold ">Insurance Management Settings</h3>
            
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-gray-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Default
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-sm">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="p-2  mr-3">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold ">General Settings</h4>
                <p className="text-sm">Insurance Management configuration options</p>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block font-semibold mb-2">Default Currency</label>
                <select 
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  onChange={() => setHasChanges(true)}
                >
                  <option value="KES">Kenyan Shilling (KES)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                </select>
                <p className="text-sm mt-1">Default currency for all financial transactions</p>
              </div>
              
              <div>
                <label className="block font-semibold mb-2">Claim Processing Time</label>
                <select 
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  onChange={() => setHasChanges(true)}
                >
                  <option value="1">1 day (Express)</option>
                  <option value="3">3 days (Standard)</option>
                  <option value="5">5 days</option>
                  <option value="7">7 days</option>
                  <option value="10">10 days</option>
                  <option value="14">14 days</option>
                </select>
                <p className="text-sm mt-1">Standard time to process insurance claims</p>
              </div>
              
              <div>
                <label className="block font-semibold mb-2">Auto-approval Limit</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-4 h-4" />
                  <input
                    type="number"
                    placeholder="50000"
                    defaultValue="50000"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <p className="text-sm  mt-1">Claims below this amount are auto-approved (KES)</p>
              </div>

              <div>
                <label className="block font-semibold mb-2">Maximum Coverage Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-4 h-4" />
                  <input
                    type="number"
                    placeholder="10000000"
                    defaultValue="10000000"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <p className="text-sm mt-1">Maximum insurance coverage per policy (KES)</p>
              </div>

              <div>
                <label className="block font-semibold mb-2">Policy Expiry Warning Period</label>
                <select 
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  onChange={() => setHasChanges(true)}
                >
                  <option value="7">7 days before</option>
                  <option value="14">14 days before</option>
                  <option value="30">30 days before</option>
                  <option value="60">60 days before</option>
                  <option value="90">90 days before</option>
                </select>
                <p className="text-sm mt-1">When to send policy renewal reminders</p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 mr-3">
                <Bell className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold ">Notification Settings</h4>
                <p className="text-sm">Manage alerts and communication preferences</p>
              </div>
            </div>
            
            <div className="space-y-5">
              {/* Email Notifications */}
              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-600  mt-0.5" />
                  <div>
                    <p className="font-semibold">Email Notifications</p>
                    <p className="text-sm  mt-0.5">Send email updates for claims and policies</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* SMS Notifications */}
              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">SMS Notifications</p>
                    <p className="text-sm mt-0.5">Send SMS updates for urgent claims</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Policy Renewal Alerts */}
              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">Policy Renewal Alerts</p>
                    <p className="text-sm mt-0.5">Alert before policy expiration</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Claim Status Updates */}
              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">Claim Status Updates</p>
                    <p className="text-sm mt-0.5">Notify on claim approval/rejection</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Payment Reminders */}
              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">Payment Reminders</p>
                    <p className="text-sm mt-0.5">Remind users about pending premiums</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* System Maintenance Alerts */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">System Maintenance Alerts</p>
                    <p className="text-sm mt-0.5">Notify about scheduled maintenance</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security & Access Settings */}
          {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-green-50 rounded-lg mr-3">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Security & Access</h4>
                <p className="text-xs text-gray-500">Data protection and user access controls</p>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Period</label>
                <select 
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  onChange={() => setHasChanges(true)}
                >
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="5">5 years</option>
                  <option value="7">7 years (Recommended)</option>
                  <option value="10">10 years</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">How long to keep insurance records</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                <select 
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  onChange={() => setHasChanges(true)}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="240">4 hours</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Auto-logout after inactivity period</p>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Require 2FA for sensitive operations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">Audit Logging</p>
                  <p className="text-sm text-gray-500">Track all system changes and access</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div> */}

          {/* Integration & API Settings */}
          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 mr-3">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Integration & API</h4>
                <p className="text-sm ">Third-party integrations and API settings</p>
              </div>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-semibold">Provider API Integration</p>
                  <p className="text-sm">Connect to insurance provider systems</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-semibold">Payment Gateway</p>
                  <p className="text-sm">Enable online premium payments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold">Automated Claim Verification</p>
                  <p className="text-sm">Auto-verify claims through provider APIs</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" onChange={() => setHasChanges(true)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">API Rate Limit</label>
                <select 
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  onChange={() => setHasChanges(true)}
                >
                  <option value="100">100 requests/hour</option>
                  <option value="500">500 requests/hour</option>
                  <option value="1000">1000 requests/hour</option>
                  <option value="5000">5000 requests/hour</option>
                  <option value="unlimited">Unlimited</option>
                </select>
                <p className="text-xs mt-1">Maximum API calls per hour</p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Banner */}
        {hasChanges && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 flex items-center space-x-4 z-50">
            <AlertCircle className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="font-semibold">You have unsaved changes</p>
              <p className="text-sm ">Save your changes to apply the new settings</p>
            </div>
            <div className="flex items-center space-x-2 ml-8">
              <button 
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setHasChanges(false)}
              >
                Discard
              </button>
              <button 
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                onClick={() => setHasChanges(false)}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

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