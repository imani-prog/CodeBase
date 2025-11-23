import { useState } from 'react';
import { 
  Shield, FileText, CreditCard, DollarSign,
  CheckCircle, Clock, XCircle, AlertCircle,
  Download, Plus, Edit, Trash2, 
  Calendar, Receipt, TrendingUp, Wallet,
  Phone, Mail, MapPin, Info, 
  ChevronDown, ChevronUp, ExternalLink,
  Copy, Check, RefreshCw
} from 'lucide-react';

const Insurance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedClaim, setExpandedClaim] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  // Insurance coverage data
  const insuranceInfo = {
    provider: 'NHIF (National Hospital Insurance Fund)',
    memberNumber: 'NHIF-2025-789456',
    status: 'Active',
    coverageType: 'Family Cover',
    validFrom: '2025-01-01',
    validUntil: '2025-12-31',
    principal: 'John Doe',
    dependents: 3,
    monthlyContribution: 'KSh 1,700',
    lastPayment: '2025-11-01',
    benefitLimit: 'Up to KSh 500,000 per year',
    coverageServices: [
      'Outpatient Services',
      'Inpatient Services', 
      'Maternity Services',
      'Surgical Procedures',
      'Emergency Services',
      'Chronic Disease Management'
    ]
  };

  // SHA (Social Health Authority) info
  const shaInfo = {
    provider: 'SHA (Social Health Authority)',
    memberNumber: 'SHA-KE-2025-456789',
    status: 'Active',
    tier: 'Standard Package',
    validFrom: '2025-01-01',
    validUntil: '2026-01-01',
    monthlyContribution: 'KSh 2,500',
    coverageLevel: 'Enhanced Coverage'
  };

  // Claims data
  const claims = [
    {
      id: 1,
      claimNumber: 'CLM-2025-001234',
      service: 'General Consultation',
      provider: 'Nairobi Health Center',
      date: '2025-11-15',
      claimAmount: 'KSh 3,500',
      approvedAmount: 'KSh 3,500',
      status: 'approved',
      submittedDate: '2025-11-16',
      processedDate: '2025-11-18',
      paymentStatus: 'paid',
      diagnosis: 'Seasonal allergies',
      doctor: 'Dr. Sarah Kamau'
    },
    {
      id: 2,
      claimNumber: 'CLM-2025-001198',
      service: 'Laboratory Tests',
      provider: 'MediLink Laboratory',
      date: '2025-11-08',
      claimAmount: 'KSh 4,200',
      approvedAmount: 'KSh 4,200',
      status: 'approved',
      submittedDate: '2025-11-09',
      processedDate: '2025-11-12',
      paymentStatus: 'paid',
      tests: 'Complete Blood Count, Lipid Panel'
    },
    {
      id: 3,
      claimNumber: 'CLM-2025-001267',
      service: 'Prescription Medication',
      provider: 'Westlands Pharmacy',
      date: '2025-11-20',
      claimAmount: 'KSh 2,800',
      approvedAmount: 'KSh 2,100',
      copayment: 'KSh 700',
      status: 'processing',
      submittedDate: '2025-11-21',
      paymentStatus: 'pending',
      medication: 'Amoxicillin, Cetirizine'
    }
  ];

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'M-Pesa',
      number: '+254 712 345 678',
      primary: true,
      icon: Phone
    },
    {
      id: 2,
      type: 'Credit Card',
      last4: '4532',
      expiry: '12/26',
      brand: 'Visa',
      primary: false,
      icon: CreditCard
    }
  ]);

  // Billing history
  const billingHistory = [
    {
      id: 1,
      invoiceNumber: 'INV-2025-00156',
      date: '2025-11-15',
      service: 'General Consultation + Lab Tests',
      amount: 'KSh 7,700',
      paid: 'KSh 7,700',
      balance: 'KSh 0',
      status: 'paid',
      paymentMethod: 'NHIF',
      paymentDate: '2025-11-18'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2025-00142',
      date: '2025-10-22',
      service: 'Telemedicine Consultation',
      amount: 'KSh 2,500',
      paid: 'KSh 2,500',
      balance: 'KSh 0',
      status: 'paid',
      paymentMethod: 'M-Pesa',
      paymentDate: '2025-10-22'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2025-00178',
      date: '2025-11-20',
      service: 'Prescription Co-payment',
      amount: 'KSh 700',
      paid: 'KSh 0',
      balance: 'KSh 700',
      status: 'pending',
      dueDate: '2025-11-30'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
      case 'paid':
      case 'Active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'processing':
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'rejected':
      case 'overdue':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
      case 'paid':
        return CheckCircle;
      case 'processing':
      case 'pending':
        return Clock;
      case 'rejected':
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const toggleClaim = (id) => {
    setExpandedClaim(expandedClaim === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Insurance & Billing</h1>
          <p className="text-gray-600 mt-2">
            Manage your insurance coverage, claims, and payment information
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Submit Claim</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Statement</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Claims</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {claims.filter(c => c.status === 'processing').length}
              </p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                KSh {billingHistory.filter(b => b.status === 'pending').reduce((sum, b) => sum + parseInt(b.balance.replace(/[^0-9]/g, '')), 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Coverage Status</p>
              <p className="text-lg font-bold text-green-600 mt-1">{insuranceInfo.status}</p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Payment Methods</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{paymentMethods.length}</p>
            </div>
            <Wallet className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {['overview', 'claims', 'billing', 'payment-methods'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* NHIF Coverage */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                NHIF Coverage
              </h3>
              <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(insuranceInfo.status)}`}>
                {insuranceInfo.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Member Number</p>
                  <p className="font-medium text-gray-900">{insuranceInfo.memberNumber}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(insuranceInfo.memberNumber, 'NHIF')}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                >
                  {copiedText === 'NHIF' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Coverage Type</p>
                  <p className="font-medium text-gray-900">{insuranceInfo.coverageType}</p>
                </div>
                <div>
                  <p className="text-gray-600">Dependents</p>
                  <p className="font-medium text-gray-900">{insuranceInfo.dependents}</p>
                </div>
                <div>
                  <p className="text-gray-600">Valid Until</p>
                  <p className="font-medium text-gray-900">{insuranceInfo.validUntil}</p>
                </div>
                <div>
                  <p className="text-gray-600">Monthly Contribution</p>
                  <p className="font-medium text-gray-900">{insuranceInfo.monthlyContribution}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Covered Services</p>
                <div className="flex flex-wrap gap-2">
                  {insuranceInfo.coverageServices.slice(0, 4).map((service, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
                      {service}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-1 bg-gray-50 text-gray-700 rounded-full border border-gray-200">
                    +{insuranceInfo.coverageServices.length - 4} more
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SHA Coverage */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                SHA Coverage
              </h3>
              <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(shaInfo.status)}`}>
                {shaInfo.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Member Number</p>
                  <p className="font-medium text-gray-900">{shaInfo.memberNumber}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(shaInfo.memberNumber, 'SHA')}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                >
                  {copiedText === 'SHA' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Package Tier</p>
                  <p className="font-medium text-gray-900">{shaInfo.tier}</p>
                </div>
                <div>
                  <p className="text-gray-600">Coverage Level</p>
                  <p className="font-medium text-gray-900">{shaInfo.coverageLevel}</p>
                </div>
                <div>
                  <p className="text-gray-600">Valid Until</p>
                  <p className="font-medium text-gray-900">{shaInfo.validUntil}</p>
                </div>
                <div>
                  <p className="text-gray-600">Monthly Contribution</p>
                  <p className="font-medium text-gray-900">{shaInfo.monthlyContribution}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-900">
                    SHA provides enhanced coverage complementing your NHIF benefits with additional services and higher benefit limits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Claims Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              Recent Claims
            </h3>
            <div className="space-y-3">
              {claims.slice(0, 3).map((claim) => {
                const StatusIcon = getStatusIcon(claim.status);
                return (
                  <div key={claim.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{claim.service}</p>
                        <p className="text-sm text-gray-600">{claim.provider}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 ${getStatusColor(claim.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {claim.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{claim.date}</span>
                      <span className="font-medium text-gray-900">{claim.claimAmount}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pending Payments */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-red-600" />
              Pending Payments
            </h3>
            {billingHistory.filter(b => b.status === 'pending').length > 0 ? (
              <div className="space-y-3">
                {billingHistory.filter(b => b.status === 'pending').map((bill) => (
                  <div key={bill.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{bill.service}</p>
                        <p className="text-sm text-gray-600">Due: {bill.dueDate}</p>
                      </div>
                      <span className="font-semibold text-red-600">{bill.balance}</span>
                    </div>
                    <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Pay Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-gray-600">All payments are up to date</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Claims Tab */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-blue-900">Claims Processing</h3>
                <p className="text-sm text-blue-800 mt-1">
                  Claims are typically processed within 3-5 business days. You'll receive notifications for status updates.
                </p>
              </div>
            </div>
          </div>

          {claims.map((claim) => {
            const StatusIcon = getStatusIcon(claim.status);
            return (
              <div key={claim.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleClaim(claim.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{claim.service}</h3>
                          <p className="text-sm text-gray-600">{claim.provider}</p>
                          <p className="text-sm text-gray-600">Claim #: {claim.claimNumber}</p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full border flex items-center gap-1 ${getStatusColor(claim.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          {claim.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 text-sm">
                        <div>
                          <p className="text-gray-600">Service Date</p>
                          <p className="font-medium text-gray-900">{claim.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Claim Amount</p>
                          <p className="font-medium text-gray-900">{claim.claimAmount}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Approved</p>
                          <p className="font-medium text-green-600">{claim.approvedAmount}</p>
                        </div>
                      </div>
                    </div>
                    {expandedClaim === claim.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </div>

                {expandedClaim === claim.id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Submitted Date</p>
                        <p className="text-gray-900">{claim.submittedDate}</p>
                      </div>
                      {claim.processedDate && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Processed Date</p>
                          <p className="text-gray-900">{claim.processedDate}</p>
                        </div>
                      )}
                      {claim.doctor && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Attending Doctor</p>
                          <p className="text-gray-900">{claim.doctor}</p>
                        </div>
                      )}
                      {claim.diagnosis && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Diagnosis</p>
                          <p className="text-gray-900">{claim.diagnosis}</p>
                        </div>
                      )}
                      {claim.tests && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Tests Performed</p>
                          <p className="text-gray-900">{claim.tests}</p>
                        </div>
                      )}
                      {claim.medication && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Medications</p>
                          <p className="text-gray-900">{claim.medication}</p>
                        </div>
                      )}
                      {claim.copayment && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Your Co-payment</p>
                          <p className="text-orange-600 font-semibold">{claim.copayment}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-700">Payment Status</p>
                        <p className="text-gray-900 capitalize">{claim.paymentStatus}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Download Receipt
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-4">
          {billingHistory.map((bill) => (
            <div key={bill.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Receipt className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{bill.service}</h3>
                    <p className="text-sm text-gray-600">Invoice: {bill.invoiceNumber}</p>
                    <p className="text-sm text-gray-600">Date: {bill.date}</p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(bill.status)}`}>
                  {bill.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="font-semibold text-gray-900">{bill.amount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Paid</p>
                  <p className="font-semibold text-green-600">{bill.paid}</p>
                </div>
                <div>
                  <p className="text-gray-600">Balance</p>
                  <p className={`font-semibold ${bill.balance === 'KSh 0' ? 'text-gray-600' : 'text-red-600'}`}>
                    {bill.balance}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Method</p>
                  <p className="font-medium text-gray-900">{bill.paymentMethod}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Download Invoice
                </button>
                {bill.status === 'pending' && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    <CreditCard className="w-4 h-4" />
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment-methods' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-blue-900">Secure Payments</h3>
                <p className="text-sm text-blue-800 mt-1">
                  All payment information is encrypted and securely stored. We support M-Pesa, credit/debit cards, and bank transfers.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{method.type}</p>
                        <p className="text-sm text-gray-600">
                          {method.number || `•••• ${method.last4}`}
                        </p>
                        {method.expiry && (
                          <p className="text-xs text-gray-500">Expires: {method.expiry}</p>
                        )}
                      </div>
                    </div>
                    {method.primary && (
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                        Primary
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Add Payment Method Card */}
            <button
              onClick={() => setShowAddCard(true)}
              className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-6 hover:border-blue-400 hover:bg-blue-50 transition-all group"
            >
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mx-auto mb-2" />
                <p className="font-medium text-gray-600 group-hover:text-blue-600">Add Payment Method</p>
                <p className="text-sm text-gray-500 mt-1">M-Pesa, Card, or Bank Transfer</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insurance;
