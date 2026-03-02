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

  // Modal & form state
  const [showAddProviderModal, setShowAddProviderModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [newProvider, setNewProvider] = useState({
    name: '', type: 'Private', contactPerson: '', phone: '', email: '',
    coverage: '', coveragePercentage: 80, ambulanceCover: false,
    averageProcessingTime: '7 days', policyTypes: ''
  });
  const [providerErrors, setProviderErrors] = useState({});

  // View / Edit provider modal state
  const [showViewProviderModal, setShowViewProviderModal] = useState(false);
  const [selectedProviderData, setSelectedProviderData] = useState(null);

  const [showEditProviderModal, setShowEditProviderModal] = useState(false);
  const [editProvider, setEditProvider] = useState(null);
  const [editProviderErrors, setEditProviderErrors] = useState({});

  // Patient coverage modal state
  const [showViewCoverageModal, setShowViewCoverageModal] = useState(false);
  const [selectedCoverageData, setSelectedCoverageData] = useState(null);

  const [showEditCoverageModal, setShowEditCoverageModal] = useState(false);
  const [editCoverage, setEditCoverage] = useState(null);
  const [editCoverageErrors, setEditCoverageErrors] = useState({});

  const [showClaimsHistoryModal, setShowClaimsHistoryModal] = useState(false);
  const [selectedClaimsPatient, setSelectedClaimsPatient] = useState(null);

  // --- Claim modals state ---
  const [showAddClaimModal, setShowAddClaimModal] = useState(false);
  const [newClaim, setNewClaim] = useState({
    patientName: '', patientId: '', insuranceProvider: '', claimType: 'Outpatient',
    claimAmount: '', diagnosis: '', hospital: '', submissionDate: new Date().toISOString().slice(0, 10),
    notes: ''
  });
  const [claimErrors, setClaimErrors] = useState({});

  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkUploadStep, setBulkUploadStep] = useState('select'); // 'select' | 'preview' | 'done'

  const [showViewClaimModal, setShowViewClaimModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const [showApproveClaimModal, setShowApproveClaimModal] = useState(false);
  const [claimToApprove, setClaimToApprove] = useState(null);
  const [approvalData, setApprovalData] = useState({ approvedAmount: '', notes: '', processingTime: '' });
  const [approvalErrors, setApprovalErrors] = useState({});

  const [showDeleteClaimModal, setShowDeleteClaimModal] = useState(false);
  const [claimToDelete, setClaimToDelete] = useState(null);

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

  // ---------- Quick Action handlers ----------

  const handleAddProvider = () => {
    setNewProvider({ name: '', type: 'Private', contactPerson: '', phone: '', email: '',
      coverage: '', coveragePercentage: 80, ambulanceCover: false, averageProcessingTime: '7 days', policyTypes: '' });
    setProviderErrors({});
    setShowAddProviderModal(true);
  };

  const validateProvider = () => {
    const errors = {};
    if (!newProvider.name.trim()) errors.name = 'Provider name is required';
    if (!newProvider.contactPerson.trim()) errors.contactPerson = 'Contact person is required';
    if (!newProvider.phone.trim()) errors.phone = 'Phone number is required';
    if (!newProvider.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newProvider.email)) errors.email = 'Enter a valid email';
    if (!newProvider.coverage.trim()) errors.coverage = 'Coverage description is required';
    return errors;
  };

  const handleAddProviderSubmit = (e) => {
    e.preventDefault();
    const errors = validateProvider();
    if (Object.keys(errors).length > 0) { setProviderErrors(errors); return; }
    // In a real app: POST to API then refresh providers list
    alert(`Provider "${newProvider.name}" added successfully!`);
    setShowAddProviderModal(false);
  };

  const handleViewProvider = (provider) => {
    setSelectedProviderData(provider);
    setShowViewProviderModal(true);
  };

  const handleEditProvider = (provider) => {
    setEditProvider({ ...provider, policyTypes: Array.isArray(provider.policyTypes) ? provider.policyTypes.join(', ') : provider.policyTypes });
    setEditProviderErrors({});
    setShowEditProviderModal(true);
  };

  const validateEditProvider = () => {
    const errors = {};
    if (!editProvider.name.trim()) errors.name = 'Provider name is required';
    if (!editProvider.contactPerson.trim()) errors.contactPerson = 'Contact person is required';
    if (!editProvider.phone.trim()) errors.phone = 'Phone number is required';
    if (!editProvider.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editProvider.email)) errors.email = 'Enter a valid email';
    if (!editProvider.coverage.trim()) errors.coverage = 'Coverage description is required';
    return errors;
  };

  const handleEditProviderSubmit = (e) => {
    e.preventDefault();
    const errors = validateEditProvider();
    if (Object.keys(errors).length > 0) { setEditProviderErrors(errors); return; }
    alert(`Provider "${editProvider.name}" updated successfully!`);
    setShowEditProviderModal(false);
  };

  // Patient coverage modal handlers
  const handleViewCoverage = (patient) => {
    setSelectedCoverageData(patient);
    setShowViewCoverageModal(true);
  };

  const handleEditCoverage = (patient) => {
    setEditCoverage({ ...patient });
    setEditCoverageErrors({});
    setShowEditCoverageModal(true);
  };

  const validateEditCoverage = () => {
    const errors = {};
    if (!editCoverage.insuranceProvider.trim()) errors.insuranceProvider = 'Provider is required';
    if (!editCoverage.policyNumber.trim()) errors.policyNumber = 'Policy number is required';
    if (!editCoverage.policyType.trim()) errors.policyType = 'Policy type is required';
    if (!editCoverage.renewalDate) errors.renewalDate = 'Renewal date is required';
    return errors;
  };

  const handleEditCoverageSubmit = (e) => {
    e.preventDefault();
    const errors = validateEditCoverage();
    if (Object.keys(errors).length > 0) { setEditCoverageErrors(errors); return; }
    alert(`Coverage for "${editCoverage.patientName}" updated successfully!`);
    setShowEditCoverageModal(false);
  };

  const handleViewClaimsHistory = (patient) => {
    setSelectedClaimsPatient(patient);
    setShowClaimsHistoryModal(true);
  };

  // --- Claim action handlers ---
  const handleOpenAddClaim = () => {
    setNewClaim({
      patientName: '', patientId: '', insuranceProvider: '', claimType: 'Outpatient',
      claimAmount: '', diagnosis: '', hospital: '', submissionDate: new Date().toISOString().slice(0, 10), notes: ''
    });
    setClaimErrors({});
    setShowAddClaimModal(true);
  };

  const validateNewClaim = () => {
    const e = {};
    if (!newClaim.patientName.trim()) e.patientName = 'Patient name is required';
    if (!newClaim.patientId.trim()) e.patientId = 'Patient ID is required';
    if (!newClaim.insuranceProvider.trim()) e.insuranceProvider = 'Insurance provider is required';
    if (!newClaim.claimAmount || isNaN(newClaim.claimAmount) || Number(newClaim.claimAmount) <= 0) e.claimAmount = 'Enter a valid claim amount';
    if (!newClaim.diagnosis.trim()) e.diagnosis = 'Diagnosis is required';
    if (!newClaim.hospital.trim()) e.hospital = 'Hospital is required';
    if (!newClaim.submissionDate) e.submissionDate = 'Submission date is required';
    return e;
  };

  const handleAddClaimSubmit = (e) => {
    e.preventDefault();
    const errs = validateNewClaim();
    if (Object.keys(errs).length > 0) { setClaimErrors(errs); return; }
    alert(`Claim for "${newClaim.patientName}" submitted successfully!`);
    setShowAddClaimModal(false);
  };

  const handleOpenBulkUpload = () => {
    setBulkFile(null);
    setBulkUploadStep('select');
    setShowBulkUploadModal(true);
  };

  const handleViewClaim = (claim) => {
    setSelectedClaim(claim);
    setShowViewClaimModal(true);
  };

  const handleOpenApproveClaim = (claim) => {
    setClaimToApprove(claim);
    setApprovalData({ approvedAmount: claim.approvedAmount || '', notes: '', processingTime: claim.processingTime || '' });
    setApprovalErrors({});
    setShowApproveClaimModal(true);
  };

  const handleApproveClaimSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!approvalData.approvedAmount || isNaN(approvalData.approvedAmount) || Number(approvalData.approvedAmount) <= 0)
      errs.approvedAmount = 'Enter a valid approved amount';
    if (Object.keys(errs).length > 0) { setApprovalErrors(errs); return; }
    alert(`Claim ${claimToApprove.claimNumber} approved for ${formatCurrency(Number(approvalData.approvedAmount))}.`);
    setShowApproveClaimModal(false);
  };

  const handleOpenDeleteClaim = (claim) => {
    setClaimToDelete(claim);
    setShowDeleteClaimModal(true);
  };

  const handleDeleteClaimConfirm = () => {
    alert(`Claim ${claimToDelete.claimNumber} has been deleted.`);
    setShowDeleteClaimModal(false);
  };

  const handleProcessClaims = () => setActiveTab('claims');

  const handleExportReport = () => {
    setExportLoading(true);
    // Build CSV from providers data
    const headers = ['Provider Name','Type','Patients','Claims Processed','Total Amount (KES)','Coverage %','Ambulance Cover','Contact Person','Phone','Email','Status'];
    const rows = insuranceProviders.map(p => [
      `"${p.name}"`, p.type, p.patients, p.claimsProcessed, p.totalAmount,
      p.coveragePercentage + '%', p.ambulanceCover ? 'Yes' : 'No',
      `"${p.contactPerson}"`, p.phone, p.email, p.status
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `insurance-report-${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTimeout(() => setExportLoading(false), 800);
  };

  const handleOpenSettings = () => setActiveTab('settings');

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
            <button
              onClick={handleAddProvider}
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Plus className="w-5 h-5 text-blue-600 mr-2" />
              Add Provider
            </button>
            <button
              onClick={handleProcessClaims}
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              Process Claims
            </button>
            <button
              onClick={handleExportReport}
              disabled={exportLoading}
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download className={`w-5 h-5 text-blue-600 mr-2 ${exportLoading ? 'animate-bounce' : ''}`} />
              {exportLoading ? 'Exporting...' : 'Export Report'}
            </button>
            <button
              onClick={handleOpenSettings}
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
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
        <button onClick={handleAddProvider} className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-800 transition-colors flex items-center">
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

      <div className="bg-white border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 uppercase text-xs tracking-wide border-b border-gray-200">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">Provider</th>
              <th className="px-3 py-2 text-center font-semibold">Type</th>
              <th className="px-3 py-2 text-center font-semibold">Patients</th>
              <th className="px-3 py-2 text-center font-semibold">Claims</th>
              <th className="px-3 py-2 text-right font-semibold">Total Amount</th>
              <th className="px-3 py-2 text-center font-semibold">Coverage %</th>
              <th className="px-3 py-2 text-center font-semibold">Proc. Time</th>
              <th className="px-3 py-2 text-center font-semibold">Ambulance</th>
              <th className="px-3 py-2 text-center font-semibold">Policy Types</th>
              <th className="px-3 py-2 text-left font-semibold">Contact</th>
              <th className="px-3 py-2 text-center font-semibold">Status</th>
              <th className="px-3 py-2 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {insuranceProviders.map((provider) => (
              <tr key={provider.id} className="hover:bg-blue-50/40 transition-colors">
                <td className="px-3 py-2 max-w-[180px]">
                  <p className="font-semibold text-gray-800 leading-tight truncate">{provider.name}</p>
                  <p className="text-gray-400 truncate leading-tight">{provider.coverage}</p>
                </td>
                <td className="px-3 py-2 text-center whitespace-nowrap">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                    provider.type === 'Government'
                      ? 'text-blue-700 border-blue-200'
                      : 'text-blue-950 border-blue-950'
                  }`}>
                    {provider.type}
                  </span>
                </td>
                <td className="px-3 py-2 text-center font-semibold text-gray-800">
                  {provider.patients.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-center font-semibold text-gray-800">
                  {provider.claimsProcessed}
                </td>
                <td className="px-3 py-2 text-right font-semibold text-gray-800 whitespace-nowrap">
                  {formatCurrency(provider.totalAmount)}
                </td>
                <td className="px-3 py-2 text-center">
                  <div className="flex items-center gap-1.5 justify-center">
                    <div className="">
                      <div
                        
                        style={{ width: `${provider.coveragePercentage}%` }}
                      />
                    </div>
                    <span className="font-semibold text-gray-700 w-7 text-right leading-none">
                      {provider.coveragePercentage}%
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2 text-center font-semibold">
                  {provider.averageProcessingTime}
                </td>
                <td className="px-3 py-2 text-center">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                    provider.ambulanceCover
                      ? 'text-green-700 '
                      : 'text-red-600'
                  }`}>
                    {provider.ambulanceCover ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 font-medium">
                    {provider.policyTypes.length}
                    <span className="">plans</span>
                  </span>
                </td>
                <td className="px-3 py-2 max-w-[160px]">
                  <p className="font-medium text-gray-900 leading-tight truncate">{provider.contactPerson}</p>
                  <p className="text-gray-600 leading-tight truncate">{provider.phone} · {provider.email}</p>
                </td>
                <td className="px-3 py-2 text-center">
                  <span className="px-2 py-0.5 text-xs font-medium text-green-700 ">
                    {provider.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleViewProvider(provider)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                      title="View details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleEditProvider(provider)}
                      className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors"
                      title="Edit provider"
                    >
                      <Edit className="w-3.5 h-3.5" />
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

      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 uppercase text-xs tracking-wide border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Patient</th>
                <th className="px-3 py-2 text-center font-semibold">Provider</th>
                <th className="px-3 py-2 text-center font-semibold">Plan</th>
                <th className="px-3 py-2 text-left font-semibold">Policy No.</th>
                <th className="px-3 py-2 text-center font-semibold">Expires</th>
                <th className="px-3 py-2 text-right font-semibold">Total Cover</th>
                <th className="px-3 py-2 text-right font-semibold">Used</th>
                <th className="px-3 py-2 text-center font-semibold">Remaining %</th>
                <th className="px-3 py-2 text-center font-semibold">Last Claim</th>
                <th className="px-3 py-2 text-right font-semibold">Claim Amt</th>
                <th className="px-3 py-2 text-center font-semibold">Status</th>
                <th className="px-3 py-2 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patientCoverage.map((patient) => {
                const remainingPct = Math.round((patient.remainingAmount / patient.coverageAmount) * 100);
                return (
                  <tr key={patient.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-3 py-2">
                      <p className="font-semibold text-gray-800 leading-tight">{patient.patientName}</p>
                      <p className="text-gray-400 leading-tight">
                        {patient.patientId} &middot;
                        {/* <span className="ml-1 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">{patient.dependents} dep.</span> */}
                      </p>
                    </td>
                    <td className="px-3 py-2 text-center font-semibold text-gray-800 whitespace-nowrap">
                      {patient.insuranceProvider}
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      <span className="px-2 py-0.5  text-blue-700  font-medium">
                        {patient.policyType}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {patient.policyNumber}
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      {patient.renewalDate}
                    </td>
                    <td className="px-3 py-2 text-right font-semibold whitespace-nowrap">
                      {formatCurrency(patient.coverageAmount)}
                    </td>
                    <td className="px-3 py-2 text-right text-blue-600 font-medium whitespace-nowrap">
                      {formatCurrency(patient.usedAmount)}
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      <span className={`font-semibold ${remainingPct > 50 ? 'text-green-600' : remainingPct > 25 ? 'text-yellow-600' : 'text-red-500'}`}>
                        {remainingPct}%
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      {patient.lastClaim}
                    </td>
                    <td className="px-3 py-2 text-right font-medium whitespace-nowrap">
                      {formatCurrency(patient.claimAmount)}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className={`px-2 py-0.5 text-xs font-medium  ${
                        patient.status === 'Active'
                          ? ' text-green-700'
                          : patient.status === 'Expired'
                          ? ' text-red-600'
                          : ' text-yellow-700'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleViewCoverage(patient)} className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="View coverage">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleEditCoverage(patient)} className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors" title="Edit coverage">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleViewClaimsHistory(patient)} className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Claims history">
                          <Receipt className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>
    </div>
  );

  // Render Claims Management Tab
  const renderClaims = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Claims Management</h3>
        <div className="flex items-center space-x-4">
          <button onClick={handleOpenAddClaim} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Claim
          </button>
          <button onClick={handleOpenBulkUpload} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
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
      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 uppercase text-xs tracking-wide border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Claim No.</th>
                <th className="px-3 py-2 text-center font-semibold">Type</th>
                <th className="px-3 py-2 text-center font-semibold">Submitted</th>
                <th className="px-3 py-2 text-left font-semibold">Patient</th>
                <th className="px-3 py-2 text-left font-semibold">Diagnosis</th>
                <th className="px-3 py-2 text-left font-semibold">Provider</th>
                <th className="px-3 py-2 text-left font-semibold">Hospital</th>
                <th className="px-3 py-2 text-right font-semibold">Claim Amt</th>
                <th className="px-3 py-2 text-right font-semibold">Approved</th>
                <th className="px-3 py-2 text-center font-semibold">Status</th>
                <th className="px-3 py-2 text-center font-semibold">Proc. Time</th>
                <th className="px-3 py-2 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {claimsData.map((claim) => (
                <tr key={claim.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{claim.claimNumber}</td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">{claim.claimType}</td>
                  <td className="px-3 py-2 text-center text-gray-500 whitespace-nowrap">{claim.submissionDate}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="font-semibold text-gray-800">{claim.patientName}</span>
                    <span className="text-gray-400 ml-1">&middot; {claim.patientId}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{claim.diagnosis}</td>
                  <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{claim.insuranceProvider}</td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{claim.hospital}</td>
                  <td className="px-3 py-2 text-right font-semibold whitespace-nowrap">{formatCurrency(claim.claimAmount)}</td>
                  <td className="px-3 py-2 text-right text-blue-600 font-medium whitespace-nowrap">{formatCurrency(claim.approvedAmount)}</td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center text-gray-500 whitespace-nowrap">{claim.processingTime}</td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleViewClaim(claim)} className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="View claim">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleOpenApproveClaim(claim)} className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors" title="Approve claim">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleOpenDeleteClaim(claim)} className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors" title="Delete claim">
                        <Trash2 className="w-3.5 h-3.5" />
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
      <div className="bg-white border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 uppercase text-xs tracking-wide border-b border-gray-200">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">Vehicle</th>
              <th className="px-3 py-2 text-left font-semibold">Provider</th>
              <th className="px-3 py-2 text-left font-semibold">Policy No.</th>
              <th className="px-3 py-2 text-center font-semibold">Policy Type</th>
              <th className="px-3 py-2 text-right font-semibold">Coverage</th>
              <th className="px-3 py-2 text-right font-semibold">Premium</th>
              <th className="px-3 py-2 text-right font-semibold">Deductible</th>
              <th className="px-3 py-2 text-center font-semibold">Expiry</th>
              <th className="px-3 py-2 text-center font-semibold">Drivers</th>
              <th className="px-3 py-2 text-center font-semibold">Last Claim</th>
              <th className="px-3 py-2 text-right font-semibold">Claim Amt</th>
              <th className="px-3 py-2 text-center font-semibold">Status</th>
              <th className="px-3 py-2 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ambulanceInsurance.map((ambulance) => (
              <tr key={ambulance.id} className="hover:bg-blue-50/40 transition-colors">
                <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{ambulance.vehicleNumber}</td>
                <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{ambulance.insuranceProvider}</td>
                <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{ambulance.policyNumber}</td>
                <td className="px-3 py-2 text-center whitespace-nowrap">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full border text-blue-800">
                    {ambulance.policyType}
                  </span>
                </td>
                <td className="px-3 py-2 text-right font-semibold whitespace-nowrap">{formatCurrency(ambulance.coverageAmount)}</td>
                <td className="px-3 py-2 text-right font-semibold whitespace-nowrap">{formatCurrency(ambulance.premium)}</td>
                <td className="px-3 py-2 text-right font-medium whitespace-nowrap">{formatCurrency(ambulance.deductible)}</td>
                <td className="px-3 py-2 text-center whitespace-nowrap">{ambulance.expiryDate}</td>
                <td className="px-3 py-2 text-center font-semibold whitespace-nowrap">{ambulance.driversCovered}</td>
                <td className="px-3 py-2 text-center whitespace-nowrap">
                  {ambulance.lastClaim ? ambulance.lastClaim : <span className="text-gray-400">—</span>}
                </td>
                <td className="px-3 py-2 text-right whitespace-nowrap">
                  {ambulance.lastClaim ? formatCurrency(ambulance.claimAmount) : <span className="text-gray-400">—</span>}
                </td>
                <td className="px-3 py-2 text-center whitespace-nowrap">
                  <span className={`px-2 py-0.5 text-xs font-medium ${
                    ambulance.status === 'Active' ? 'text-green-700' :
                    ambulance.status === 'Expiring Soon' ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>
                    {ambulance.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors" title="Renew">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors" title="Edit">
                      <Edit className="w-3.5 h-3.5" />
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


  // ─── Patient Coverage Modals ────────────────────────────────
  const renderViewCoverageModal = () => {
    if (!showViewCoverageModal || !selectedCoverageData) return null;
    const p = selectedCoverageData;
    const remainingPct = Math.round((p.remainingAmount / p.coverageAmount) * 100);
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowViewCoverageModal(false)} />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white shadow-2xl w-full max-w-xl overflow-hidden">
            {/* Header */}
            <div className="relative px-6 py-5 bg-blue-950 text-white">
              <button onClick={() => setShowViewCoverageModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all">
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center ring-4 ring-white/20">
                  <span className="text-xl font-bold">{p.patientName.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold leading-tight">{p.patientName}</h2>
                  <p className="text-sm text-blue-200">{p.patientId} &middot; {p.dependents} dependents</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500/30 text-blue-100">{p.insuranceProvider}</span>
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-white/20 text-white">{p.policyType}</span>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      p.status === 'Active' ? 'bg-green-500/30 text-green-100' : 'bg-red-500/30 text-red-100'
                    }`}>{p.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[68vh] overflow-y-auto">

              {/* Donut chart — used vs remaining */}
              {(() => {
                const usedPct = 100 - remainingPct;
                const r = 36;
                const cx = 52;
                const cy = 52;
                const circumference = 2 * Math.PI * r;
                const usedDash = (usedPct / 100) * circumference;
                const remainDash = (remainingPct / 100) * circumference;
                const usedColor = usedPct < 50 ? '#22c55e' : usedPct < 75 ? '#f59e0b' : '#ef4444';
                const remainColor = '#3b82f6';
                return (
                  <div className="border border-gray-200 p-4 flex items-center gap-5">
                    {/* SVG donut */}
                    <svg width="104" height="104" viewBox="0 0 104 104" className="flex-shrink-0">
                      {/* Track */}
                      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="13" />
                      {/* Remaining arc */}
                      <circle
                        cx={cx} cy={cy} r={r} fill="none"
                        stroke={remainColor} strokeWidth="13"
                        strokeDasharray={`${remainDash} ${circumference - remainDash}`}
                        strokeDashoffset={-usedDash}
                        strokeLinecap="butt"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
                      />
                      {/* Used arc */}
                      <circle
                        cx={cx} cy={cy} r={r} fill="none"
                        stroke={usedColor} strokeWidth="13"
                        strokeDasharray={`${usedDash} ${circumference - usedDash}`}
                        strokeLinecap="butt"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
                      />
                      {/* Center label */}
                      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e3a5f">{usedPct}%</text>
                      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="8" fill="#6b7280">USED</text>
                    </svg>

                    {/* Legend */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: usedColor }} />
                          <span className="text-xs font-medium text-gray-600">Used</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-800">{formatCurrency(p.usedAmount)}</p>
                          <p className="text-xs text-gray-400">{usedPct}% of cover</p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: remainColor }} />
                          <span className="text-xs font-medium text-gray-600">Remaining</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-800">{formatCurrency(p.remainingAmount)}</p>
                          <p className="text-xs text-gray-400">{remainingPct}% of cover</p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500">Total Cover</span>
                        <span className="text-sm font-bold text-gray-800">{formatCurrency(p.coverageAmount)}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Policy Details */}
              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Receipt className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Policy Details</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Policy Number', p.policyNumber],
                    ['Policy Type', p.policyType],
                    ['Insurance Provider', p.insuranceProvider],
                    ['Expiry / Renewal', p.renewalDate],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                      <p className="font-medium text-gray-800 mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Claim */}
              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Last Claim</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Date</p>
                    <p className="font-medium text-gray-800 mt-0.5">{p.lastClaim}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Amount</p>
                    <p className="font-medium text-gray-800 mt-0.5">{formatCurrency(p.claimAmount)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button onClick={() => setShowViewCoverageModal(false)} className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium">Close</button>
              <button
                onClick={() => { setShowViewCoverageModal(false); handleEditCoverage(p); }}
                className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              >
                <Edit className="w-4 h-4" /> Edit Coverage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEditCoverageModal = () => {
    if (!showEditCoverageModal || !editCoverage) return null;
    const fieldErr = (key) => editCoverageErrors[key] ? (
      <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{editCoverageErrors[key]}</p>
    ) : null;
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEditCoverageModal(false)} />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white shadow-2xl w-full max-w-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 bg-blue-950 text-white">
              <button onClick={() => setShowEditCoverageModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all">
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Edit className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Edit Patient Coverage</h2>
                  <p className="text-sm text-blue-200">{editCoverage.patientName} &middot; {editCoverage.patientId}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleEditCoverageSubmit} className="p-6 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* Policy Information */}
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Policy Information</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Insurance Provider <span className="text-red-500">*</span></label>
                    <input type="text" value={editCoverage.insuranceProvider}
                      onChange={e => { setEditCoverage(p => ({...p, insuranceProvider: e.target.value})); setEditCoverageErrors(er => ({...er, insuranceProvider: ''})); }}
                      className={`w-full px-4 py-2.5 border ${ editCoverageErrors.insuranceProvider ? 'border-red-400' : 'border-gray-300'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent`}
                    />
                    {fieldErr('insuranceProvider')}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Policy Type <span className="text-red-500">*</span></label>
                    <input type="text" value={editCoverage.policyType}
                      onChange={e => { setEditCoverage(p => ({...p, policyType: e.target.value})); setEditCoverageErrors(er => ({...er, policyType: ''})); }}
                      className={`w-full px-4 py-2.5 border ${ editCoverageErrors.policyType ? 'border-red-400' : 'border-gray-300'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent`}
                    />
                    {fieldErr('policyType')}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Policy Number <span className="text-red-500">*</span></label>
                    <input type="text" value={editCoverage.policyNumber}
                      onChange={e => { setEditCoverage(p => ({...p, policyNumber: e.target.value})); setEditCoverageErrors(er => ({...er, policyNumber: ''})); }}
                      className={`w-full px-4 py-2.5 border ${ editCoverageErrors.policyNumber ? 'border-red-400' : 'border-gray-300'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent font-mono`}
                    />
                    {fieldErr('policyNumber')}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Renewal Date <span className="text-red-500">*</span></label>
                    <input type="date" value={editCoverage.renewalDate}
                      onChange={e => { setEditCoverage(p => ({...p, renewalDate: e.target.value})); setEditCoverageErrors(er => ({...er, renewalDate: ''})); }}
                      className={`w-full px-4 py-2.5 border ${ editCoverageErrors.renewalDate ? 'border-red-400' : 'border-gray-300'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent`}
                    />
                    {fieldErr('renewalDate')}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Dependents</label>
                    <input type="number" min="0" value={editCoverage.dependents}
                      onChange={e => setEditCoverage(p => ({...p, dependents: parseInt(e.target.value) || 0}))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Coverage Amounts */}
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Coverage Amounts</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[['Coverage Amount', 'coverageAmount'], ['Used Amount', 'usedAmount'], ['Remaining Amount', 'remainingAmount']].map(([label, key]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                      <div className="relative">
                        <span className="absolute left-3 inset-y-0 flex items-center text-gray-400 text-sm">KES</span>
                        <input type="number" value={editCoverage[key]}
                          onChange={e => setEditCoverage(p => ({...p, [key]: parseFloat(e.target.value) || 0}))}
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Status</span>
                </div>
                <select value={editCoverage.status}
                  onChange={e => setEditCoverage(p => ({...p, status: e.target.value}))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Expired">Expired</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-1 border-t border-gray-100">
                <button type="button" onClick={() => setShowEditCoverageModal(false)} className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderClaimsHistoryModal = () => {
    if (!showClaimsHistoryModal || !selectedClaimsPatient) return null;
    const p = selectedClaimsPatient;
    // Sample claims for this patient derived from claimsData or mock fallback
    const patientClaims = claimsData.filter(c =>
      c.insuranceProvider === p.insuranceProvider
    ).slice(0, 4);
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowClaimsHistoryModal(false)} />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Header */}
            <div className="relative px-6 py-5 bg-blue-950 text-white">
              <button onClick={() => setShowClaimsHistoryModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all">
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center ring-4 ring-white/20">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Claims History</h2>
                  <p className="text-sm text-blue-200">{p.patientName} &middot; {p.patientId} &middot; {p.insuranceProvider}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Summary */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Last Claim Date', value: p.lastClaim },
                  { label: 'Last Claim Amount', value: formatCurrency(p.claimAmount) },
                  { label: 'Total Used', value: formatCurrency(p.usedAmount) },
                ].map(({ label, value }) => (
                  <div key={label} className="border border-gray-200 p-3 text-center bg-gray-50">
                    <p className="text-sm font-bold text-gray-800">{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Claims table */}
              <div className="border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Recent Claims ({patientClaims.length})</span>
                </div>
                {patientClaims.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-400">No claims found for this patient.</div>
                ) : (
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">Claim No.</th>
                        <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">Type</th>
                        <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">Diagnosis</th>
                        <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide">Claimed</th>
                        <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide">Approved</th>
                        <th className="px-3 py-2 text-center font-semibold uppercase tracking-wide">Status</th>
                        <th className="px-3 py-2 text-center font-semibold uppercase tracking-wide">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {patientClaims.map((claim) => (
                        <tr key={claim.id} className="hover:bg-blue-50/30">
                          <td className="px-3 py-2 font-mono text-gray-700">{claim.claimNumber}</td>
                          <td className="px-3 py-2 text-gray-600">{claim.claimType}</td>
                          <td className="px-3 py-2 text-gray-600 max-w-[140px] truncate">{claim.diagnosis}</td>
                          <td className="px-3 py-2 text-right font-medium text-gray-800">{formatCurrency(claim.claimAmount)}</td>
                          <td className="px-3 py-2 text-right font-medium text-green-700">{formatCurrency(claim.approvedAmount)}</td>
                          <td className="px-3 py-2 text-center">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                              claim.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200'
                              : claim.status === 'Processing' ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                              : 'bg-red-50 text-red-600 border-red-200'
                            }`}>{claim.status}</span>
                          </td>
                          <td className="px-3 py-2 text-center text-gray-500">{claim.submissionDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button onClick={() => setShowClaimsHistoryModal(false)} className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium">Close</button>
              <button
                onClick={() => { setShowClaimsHistoryModal(false); setActiveTab('claims'); }}
                className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              >
                <FileText className="w-4 h-4" /> Go to Claims
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Add New Claim Modal ───────────────────────────────────────────────────
  const renderAddClaimModal = () => {
    if (!showAddClaimModal) return null;
    const field = (label, key, type = 'text', placeholder = '', required = false, Icon = null) => (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-4 w-4 text-gray-400" /></div>}
          <input
            type={type}
            value={newClaim[key]}
            onChange={e => { setNewClaim(p => ({ ...p, [key]: e.target.value })); setClaimErrors(er => ({ ...er, [key]: '' })); }}
            placeholder={placeholder}
            className={`w-full ${Icon ? 'pl-9' : 'px-4'} pr-4 py-2.5 border ${claimErrors[key] ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-700'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
          />
          {claimErrors[key] && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{claimErrors[key]}</p>}
        </div>
      </div>
    );
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddClaimModal(false)} />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-5 bg-blue-950 text-white">
              <button onClick={() => setShowAddClaimModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all">
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">New Insurance Claim</h2>
                  <p className="text-sm text-blue-200">Submit a new claim for processing</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleAddClaimSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Patient Info */}
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Patient Information</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>{field('Patient Name', 'patientName', 'text', 'e.g. Sarah Wanjiku', true, UserCheck)}</div>
                  <div>{field('Patient ID', 'patientId', 'text', 'e.g. PT045', true)}</div>
                </div>
              </div>
              {/* Claim Details */}
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Receipt className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Claim Details</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Insurance Provider <span className="text-red-500">*</span></label>
                    <select
                      value={newClaim.insuranceProvider}
                      onChange={e => { setNewClaim(p => ({ ...p, insuranceProvider: e.target.value })); setClaimErrors(er => ({ ...er, insuranceProvider: '' })); }}
                      className={`w-full px-4 py-2.5 border ${claimErrors.insuranceProvider ? 'border-red-400' : 'border-gray-300'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700`}
                    >
                      <option value="">Select provider…</option>
                      {['SHA', 'NHIF', 'AAR Insurance', 'Jubilee Insurance', 'Britam', 'UAP Insurance', 'CIC Insurance', 'Resolution Insurance'].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {claimErrors.insuranceProvider && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{claimErrors.insuranceProvider}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Claim Type</label>
                    <select
                      value={newClaim.claimType}
                      onChange={e => setNewClaim(p => ({ ...p, claimType: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                    >
                      {['Outpatient', 'Inpatient', 'Emergency', 'Maternity', 'Dental', 'Optical', 'Surgery', 'Physiotherapy'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>{field('Diagnosis / Condition', 'diagnosis', 'text', 'e.g. Hypertension Management', true, Activity)}</div>
                  <div>{field('Hospital / Facility', 'hospital', 'text', 'e.g. Kenyatta National Hospital', true, Building2)}</div>
                  <div>{field('Claim Amount (KES)', 'claimAmount', 'number', '0.00', true, DollarSign)}</div>
                  <div>{field('Submission Date', 'submissionDate', 'date', '', true, Calendar)}</div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes / Additional Information</label>
                    <textarea
                      value={newClaim.notes}
                      onChange={e => setNewClaim(p => ({ ...p, notes: e.target.value }))}
                      rows={3}
                      placeholder="Any supporting notes or additional context…"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button onClick={() => setShowAddClaimModal(false)} className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium">Cancel</button>
              <button onClick={handleAddClaimSubmit} className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                <Plus className="w-4 h-4" /> Submit Claim
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Bulk Upload Modal ──────────────────────────────────────────────────────
  const renderBulkUploadModal = () => {
    if (!showBulkUploadModal) return null;
    const sampleRows = [
      ['CLM-2024-010', 'John Mwangi', 'PT112', 'SHA', 'Outpatient', '12000', 'Malaria Treatment', 'Kenyatta National Hospital', '2024-10-15'],
      ['CLM-2024-011', 'Amina Hassan', 'PT088', 'NHIF', 'Inpatient', '55000', 'Appendectomy', 'Aga Khan University Hospital', '2024-10-16'],
    ];
    const downloadTemplate = () => {
      const headers = 'Claim Number,Patient Name,Patient ID,Insurance Provider,Claim Type,Claim Amount (KES),Diagnosis,Hospital,Submission Date';
      const sample = sampleRows.map(r => r.join(',')).join('\n');
      const blob = new Blob([headers + '\n' + sample], { type: 'text/csv' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = 'claims_bulk_upload_template.csv'; a.click();
    };
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowBulkUploadModal(false)} />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="px-6 py-5 bg-blue-950 text-white">
              <button onClick={() => setShowBulkUploadModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all">
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Bulk Upload Claims</h2>
                  <p className="text-sm text-blue-200">Upload multiple claims via CSV file</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {bulkUploadStep === 'select' && (
                <>
                  {/* Step 1 — Instructions */}
                  <div className="border border-blue-100 bg-blue-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-semibold text-blue-800 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Upload Instructions</p>
                    <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                      <li>Download the CSV template below and fill in claim details.</li>
                      <li>Ensure all required columns are present and correctly formatted.</li>
                      <li>Claim amounts should be numeric values in KES (no commas).</li>
                      <li>Dates must be in YYYY-MM-DD format.</li>
                    </ul>
                  </div>
                  <button onClick={downloadTemplate} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                    <Download className="w-4 h-4" /> Download CSV Template
                  </button>
                  {/* Drop zone */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${bulkFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'}`}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setBulkFile(f); }}
                  >
                    {bulkFile ? (
                      <div className="space-y-1">
                        <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
                        <p className="text-sm font-semibold text-green-700">{bulkFile.name}</p>
                        <p className="text-xs text-green-600">{(bulkFile.size / 1024).toFixed(1)} KB — ready to upload</p>
                        <button onClick={() => setBulkFile(null)} className="text-xs text-red-500 hover:underline mt-1">Remove</button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-10 h-10 text-gray-400 mx-auto" />
                        <p className="text-sm font-medium text-gray-600">Drag & drop your CSV here, or</p>
                        <label className="cursor-pointer inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                          Browse File
                          <input type="file" accept=".csv" className="hidden" onChange={e => setBulkFile(e.target.files[0])} />
                        </label>
                        <p className="text-xs text-gray-400">CSV files only, max 5 MB</p>
                      </div>
                    )}
                  </div>
                  {bulkFile && (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <span className="text-xs font-semibold uppercase text-gray-500">Preview (sample rows)</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-gray-50 border-b">
                            <tr>{['Claim No.','Patient','ID','Provider','Type','Amount','Diagnosis','Hospital','Date'].map(h => <th key={h} className="px-2 py-1.5 text-left font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {sampleRows.map((r, i) => <tr key={i} className="hover:bg-gray-50">{r.map((c, j) => <td key={j} className="px-2 py-1.5 text-gray-700 whitespace-nowrap">{c}</td>)}</tr>)}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[10px] text-gray-400 px-4 py-2">Showing template sample — actual file rows will be validated on upload.</p>
                    </div>
                  )}
                </>
              )}
              {bulkUploadStep === 'done' && (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
                  <p className="text-lg font-bold text-gray-800">Upload Successful!</p>
                  <p className="text-sm text-gray-500">Your claims file has been processed and queued for review.</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button onClick={() => setShowBulkUploadModal(false)} className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium">Cancel</button>
              {bulkUploadStep === 'select' && (
                <button
                  disabled={!bulkFile}
                  onClick={() => setBulkUploadStep('done')}
                  className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" /> Upload Claims
                </button>
              )}
              {bulkUploadStep === 'done' && (
                <button onClick={() => setShowBulkUploadModal(false)} className="px-5 py-2.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4" /> Done
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── View Claim Modal ───────────────────────────────────────────────────────
  const renderViewClaimModal = () => {
    if (!showViewClaimModal || !selectedClaim) return null;
    const c = selectedClaim;
    const row = (label, value, bold = false) => (
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className={`text-sm ${bold ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{value}</p>
      </div>
    );
    const statusBadge = (s) => {
      const map = { Approved: 'bg-green-50 text-green-700 border-green-200', Processing: 'bg-yellow-50 text-yellow-700 border-yellow-200', Rejected: 'bg-red-50 text-red-600 border-red-200', Pending: 'bg-gray-50 text-gray-600 border-gray-200' };
      return <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${map[s] || map.Pending}`}>{s}</span>;
    };
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowViewClaimModal(false)} />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="px-6 py-5 bg-blue-950 text-white">
              <button onClick={() => setShowViewClaimModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all"><XCircle className="w-5 h-5" /></button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center ring-4 ring-white/20">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold leading-tight">{c.claimNumber}</h2>
                  <p className="text-sm text-blue-200">{c.claimType} · {c.diagnosis}</p>
                  <div className="mt-1.5">{statusBadge(c.status)}</div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-5 max-h-[68vh] overflow-y-auto">
              {/* Summary amounts */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Claim Amount', value: formatCurrency(c.claimAmount) },
                  { label: 'Approved Amount', value: formatCurrency(c.approvedAmount) },
                  { label: 'Processing Time', value: c.processingTime },
                ].map(({ label, value }) => (
                  <div key={label} className="border border-gray-200 p-3 text-center bg-gray-50">
                    <p className="text-sm font-bold text-gray-800">{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              {/* Patient & Claim Details */}
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1"><Users className="w-4 h-4 text-blue-600" /><span className="text-sm font-semibold text-gray-700">Patient</span></div>
                <div className="grid grid-cols-2 gap-4">
                  {row('Name', c.patientName, true)}
                  {row('Patient ID', c.patientId)}
                </div>
              </div>
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1"><Receipt className="w-4 h-4 text-blue-600" /><span className="text-sm font-semibold text-gray-700">Claim Details</span></div>
                <div className="grid grid-cols-2 gap-4">
                  {row('Provider', c.insuranceProvider, true)}
                  {row('Hospital', c.hospital)}
                  {row('Claim Type', c.claimType)}
                  {row('Submission Date', c.submissionDate)}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button onClick={() => setShowViewClaimModal(false)} className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium">Close</button>
              <button
                onClick={() => { setShowViewClaimModal(false); handleOpenApproveClaim(c); }}
                className="px-5 py-2.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
              >
                <CheckCircle className="w-4 h-4" /> Approve Claim
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Approve Claim Modal ────────────────────────────────────────────────────
  const renderApproveClaimModal = () => {
    if (!showApproveClaimModal || !claimToApprove) return null;
    const c = claimToApprove;
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowApproveClaimModal(false)} />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-5 bg-green-700 text-white">
              <button onClick={() => setShowApproveClaimModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all"><XCircle className="w-5 h-5" /></button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Approve Claim</h2>
                  <p className="text-sm text-green-200">{c.claimNumber} · {c.patientName}</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleApproveClaimSubmit} className="p-6 space-y-5">
              {/* Claim summary */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Claim Amount', value: formatCurrency(c.claimAmount) },
                  { label: 'Provider', value: c.insuranceProvider },
                  { label: 'Claim Type', value: c.claimType },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 border border-gray-200 p-3 text-center">
                    <p className="text-sm font-bold text-gray-800">{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              {/* Approved amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Approved Amount (KES) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={approvalData.approvedAmount}
                    onChange={e => { setApprovalData(p => ({ ...p, approvedAmount: e.target.value })); setApprovalErrors(er => ({ ...er, approvedAmount: '' })); }}
                    placeholder="e.g. 13950"
                    className={`w-full pl-9 pr-4 py-2.5 border ${approvalErrors.approvedAmount ? 'border-red-400' : 'border-gray-300'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600`}
                  />
                  {approvalErrors.approvedAmount && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{approvalErrors.approvedAmount}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Processing Time</label>
                <input
                  type="text"
                  value={approvalData.processingTime}
                  onChange={e => setApprovalData(p => ({ ...p, processingTime: e.target.value }))}
                  placeholder="e.g. 5 days"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Approval Notes</label>
                <textarea
                  value={approvalData.notes}
                  onChange={e => setApprovalData(p => ({ ...p, notes: e.target.value }))}
                  rows={3}
                  placeholder="Optional notes for the approval decision…"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                />
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>This action will mark the claim as <strong>Approved</strong> and notify the patient and provider.</span>
              </div>
            </form>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button onClick={() => setShowApproveClaimModal(false)} className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium">Cancel</button>
              <button onClick={handleApproveClaimSubmit} className="px-5 py-2.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium">
                <CheckCircle className="w-4 h-4" /> Confirm Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Delete Claim Confirmation Modal ───────────────────────────────────────
  const renderDeleteClaimModal = () => {
    if (!showDeleteClaimModal || !claimToDelete) return null;
    const c = claimToDelete;
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteClaimModal(false)} />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-5 bg-red-600 text-white">
              <button onClick={() => setShowDeleteClaimModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all"><XCircle className="w-5 h-5" /></button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Delete Claim</h2>
                  <p className="text-sm text-red-200">This action cannot be undone</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
                <p className="text-sm text-red-800 font-medium">You are about to permanently delete the following claim:</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-xs text-red-500 uppercase font-medium mb-0.5">Claim Number</p><p className="font-semibold text-red-900">{c.claimNumber}</p></div>
                  <div><p className="text-xs text-red-500 uppercase font-medium mb-0.5">Patient</p><p className="font-semibold text-red-900">{c.patientName}</p></div>
                  <div><p className="text-xs text-red-500 uppercase font-medium mb-0.5">Provider</p><p className="text-red-800">{c.insuranceProvider}</p></div>
                  <div><p className="text-xs text-red-500 uppercase font-medium mb-0.5">Claim Amount</p><p className="text-red-800">{formatCurrency(c.claimAmount)}</p></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">This will permanently remove the claim record from the system. A deletion log entry will be created for audit purposes.</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button onClick={() => setShowDeleteClaimModal(false)} className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium">Cancel</button>
              <button onClick={handleDeleteClaimConfirm} className="px-5 py-2.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium">
                <Trash2 className="w-4 h-4" /> Delete Claim
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderViewProviderModal = () => {
    if (!showViewProviderModal || !selectedProviderData) return null;
    const p = selectedProviderData;
    const infoRow = (icon, label, value) => (
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <div className="flex items-center gap-1.5 text-sm text-gray-800">
          {React.createElement(icon, { className: 'w-3.5 h-3.5 text-gray-400 flex-shrink-0' })}
          <span>{value}</span>
        </div>
      </div>
    );
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowViewProviderModal(false)} />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Header */}
            <div className="relative px-6 py-5 bg-blue-950 text-white">
              <button
                onClick={() => setShowViewProviderModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center ring-4 ring-white/20">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold leading-tight">{p.name}</h2>
                  <p className="text-sm text-blue-200">{p.coverage}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      p.type === 'Government' ? 'bg-blue-500/30 text-blue-100' : 'bg-purple-500/30 text-purple-100'
                    }`}>{p.type}</span>
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-500/30 text-green-100">{p.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Users, label: 'Patients', value: p.patients.toLocaleString() },
                  { icon: FileText, label: 'Claims', value: p.claimsProcessed.toLocaleString() },
                  { icon: DollarSign, label: 'Total Amount', value: formatCurrency(p.totalAmount) },
                ].map((stat) => (
                  <div key={stat.label} className="border border-gray-200 p-3 text-center bg-gray-50">
                    {React.createElement(stat.icon, { className: 'w-5 h-5 text-blue-600 mx-auto mb-1' })}
                    <p className="text-base font-bold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Contact Information</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {infoRow(UserCheck, 'Contact Person', p.contactPerson)}
                  {infoRow(Phone, 'Phone', p.phone)}
                  {infoRow(Mail, 'Email', p.email)}
                </div>
              </div>

              {/* Coverage Details */}
              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Coverage Details</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Coverage %</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${p.coveragePercentage}%` }} />
                      </div>
                      <span className="text-sm font-bold text-gray-800">{p.coveragePercentage}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">Processing Time</p>
                    <div className="flex items-center gap-1.5 text-sm text-gray-800">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{p.averageProcessingTime}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">Ambulance</p>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${
                      p.ambulanceCover ? 'text-green-700' : 'text-red-600'
                    }`}>
                      {p.ambulanceCover ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {p.ambulanceCover ? 'Covered' : 'Not Covered'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Policy Types */}
              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Receipt className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Policy Types ({p.policyTypes.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.policyTypes.map((pt, i) => (
                    <span key={i} className="px-3 py-1  text-blue-700 rounded-full text-xs font-medium border border-blue-100">{pt}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowViewProviderModal(false)}
                className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => { setShowViewProviderModal(false); handleEditProvider(p); }}
                className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              >
                <Edit className="w-4 h-4" /> Edit Provider
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEditProviderModal = () => {
    if (!showEditProviderModal || !editProvider) return null;

    const field = (label, key, type = 'text', placeholder = '', required = false, Icon = null) => (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <input
            type={type}
            value={editProvider[key] || ''}
            onChange={e => { setEditProvider(p => ({...p, [key]: e.target.value})); setEditProviderErrors(er => ({...er, [key]: ''})); }}
            placeholder={placeholder}
            className={`w-full ${Icon ? 'pl-9' : 'px-4'} pr-4 py-2.5 border ${
              editProviderErrors[key] ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-700'
            } rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
          />
          {editProviderErrors[key] && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{editProviderErrors[key]}
            </p>
          )}
        </div>
      </div>
    );

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEditProviderModal(false)} />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 bg-blue-950 text-white">
              <button
                onClick={() => setShowEditProviderModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Edit className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Edit Insurance Provider</h2>
                  <p className="text-sm text-blue-200 truncate max-w-xs">{editProvider.name}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleEditProviderSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Provider Identity */}
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Provider Identity</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">{field('Provider Name', 'name', 'text', 'e.g. APA Insurance', true, Building2)}</div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Provider Type</label>
                    <select
                      value={editProvider.type}
                      onChange={e => setEditProvider(p => ({...p, type: e.target.value}))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    >
                      <option value="Government">Government</option>
                      <option value="Private">Private</option>
                      <option value="NGO">NGO</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                  </div>
                  <div>{field('Coverage Description', 'coverage', 'text', 'e.g. Comprehensive Health Insurance', true, Shield)}</div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Policy Types</label>
                    <input
                      type="text"
                      value={typeof editProvider.policyTypes === 'string' ? editProvider.policyTypes : editProvider.policyTypes?.join(', ') || ''}
                      onChange={e => setEditProvider(p => ({...p, policyTypes: e.target.value}))}
                      placeholder="e.g. Inpatient, Outpatient, Maternity (comma-separated)"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Contact Information</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>{field('Contact Person', 'contactPerson', 'text', 'Full name', true, UserCheck)}</div>
                  <div>{field('Phone Number', 'phone', 'tel', '+254-700-000000', true, Phone)}</div>
                  <div className="sm:col-span-2">{field('Email Address', 'email', 'email', 'claims@provider.co.ke', true, Mail)}</div>
                </div>
              </div>

              {/* Coverage Settings */}
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Coverage Settings</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Coverage Percentage — <span className="text-blue-600 font-semibold">{editProvider.coveragePercentage}%</span>
                    </label>
                    <input
                      type="range" min="0" max="100"
                      value={editProvider.coveragePercentage}
                      onChange={e => setEditProvider(p => ({...p, coveragePercentage: parseInt(e.target.value)}))}
                      className="w-full accent-blue-600 h-2 mt-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Average Processing Time</label>
                    <select
                      value={editProvider.averageProcessingTime}
                      onChange={e => setEditProvider(p => ({...p, averageProcessingTime: e.target.value}))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    >
                      {['1 day','3 days','5 days','7 days','10 days','14 days'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                    <select
                      value={editProvider.status}
                      onChange={e => setEditProvider(p => ({...p, status: e.target.value}))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Ambulance Coverage</p>
                        <p className="text-xs text-gray-500">Does this provider cover ambulance services?</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editProvider.ambulanceCover}
                          onChange={e => setEditProvider(p => ({...p, ambulanceCover: e.target.checked}))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-1 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowEditProviderModal(false)}
                  className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderAddProviderModal = () => {
    if (!showAddProviderModal) return null;

    const field = (label, key, type = 'text', placeholder = '', required = false, Icon = null) => (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <input
            type={type}
            value={newProvider[key]}
            onChange={e => { setNewProvider(p => ({...p, [key]: e.target.value})); setProviderErrors(er => ({...er, [key]: ''})); }}
            placeholder={placeholder}
            className={`w-full ${Icon ? 'pl-9' : 'px-4'} pr-4 py-2.5 border ${
              providerErrors[key] ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-700'
            } rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
          />
          {providerErrors[key] && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{providerErrors[key]}
            </p>
          )}
        </div>
      </div>
    );

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddProviderModal(false)} />
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 bg-blue-950 text-white">
              <button
                onClick={() => setShowAddProviderModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Add Insurance Provider</h2>
                  <p className="text-sm text-blue-200">Fill in the details to register a new provider</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleAddProviderSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Provider Identity */}
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Provider Identity</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">{field('Provider Name', 'name', 'text', 'e.g. APA Insurance', true, Building2)}</div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Provider Type</label>
                    <select
                      value={newProvider.type}
                      onChange={e => setNewProvider(p => ({...p, type: e.target.value}))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    >
                      <option value="Government">Government</option>
                      <option value="Private">Private</option>
                      <option value="NGO">NGO</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                  </div>
                  <div>{field('Coverage Description', 'coverage', 'text', 'e.g. Comprehensive Health Insurance', true, Shield)}</div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Policy Types</label>
                    <input
                      type="text"
                      value={newProvider.policyTypes}
                      onChange={e => setNewProvider(p => ({...p, policyTypes: e.target.value}))}
                      placeholder="e.g. Inpatient, Outpatient, Maternity (comma-separated)"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Contact Information</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>{field('Contact Person', 'contactPerson', 'text', 'Full name', true, UserCheck)}</div>
                  <div>{field('Phone Number', 'phone', 'tel', '+254-700-000000', true, Phone)}</div>
                  <div className="sm:col-span-2">{field('Email Address', 'email', 'email', 'claims@provider.co.ke', true, Mail)}</div>
                </div>
              </div>

              {/* Coverage Settings */}
              <div className="border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Coverage Settings</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Coverage Percentage — <span className="text-blue-600 font-semibold">{newProvider.coveragePercentage}%</span>
                    </label>
                    <input
                      type="range" min="0" max="100"
                      value={newProvider.coveragePercentage}
                      onChange={e => setNewProvider(p => ({...p, coveragePercentage: parseInt(e.target.value)}))}
                      className="w-full accent-blue-600 h-2 mt-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Average Processing Time</label>
                    <select
                      value={newProvider.averageProcessingTime}
                      onChange={e => setNewProvider(p => ({...p, averageProcessingTime: e.target.value}))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    >
                      {['1 day','3 days','5 days','7 days','10 days','14 days'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between border border-gray-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Ambulance Coverage</p>
                        <p className="text-xs text-gray-500">Does this provider cover ambulance services?</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newProvider.ambulanceCover}
                          onChange={e => setNewProvider(p => ({...p, ambulanceCover: e.target.checked}))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border  after:border-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-1 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddProviderModal(false)}
                  className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Provider
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderViewCoverageModal()}
      {renderEditCoverageModal()}
      {renderClaimsHistoryModal()}
      {renderViewProviderModal()}
      {renderEditProviderModal()}
      {renderAddProviderModal()}
      {renderAddClaimModal()}
      {renderBulkUploadModal()}
      {renderViewClaimModal()}
      {renderApproveClaimModal()}
      {renderDeleteClaimModal()}
      <div className="">
        <main className="">
          <div className="">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Management</h1>
              <p className="text-gray-600">Manage insurance providers, patient coverage, claims processing, and ambulance insurance policies</p>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
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
                          : 'border-transparent  hover:text-gray-700 hover:border-gray-300'
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