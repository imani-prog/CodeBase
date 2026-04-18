import { useCallback, useEffect, useState } from 'react';
import { 
  Shield, FileText, DollarSign,
  CheckCircle, Clock, XCircle, AlertCircle,
  Download,
  Receipt,
  Phone, Info, 
  ExternalLink,
  Copy, Check, RefreshCw, X, Smartphone
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { patientApi } from '../../../API/endpoints/patientApi.js';
import { insuranceService } from '../../../Services/domain/insuranceService.js';

const normalizeToArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

const asNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeId = (value) => (value === null || value === undefined ? '' : String(value));

const formatDate = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toISOString().slice(0, 10);
};

const formatMoney = (value) => {
  return `KSh ${asNumber(value).toLocaleString()}`;
};

const formatTitle = (value) => {
  if (!value) return 'N/A';
  return String(value)
    .replace(/[_-]/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

// ─── PDF Generation Utility (client-side via jsPDF CDN)
const loadJsPDF = () => {
  return new Promise((resolve) => {
    if (window.jspdf) { resolve(window.jspdf.jsPDF); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => resolve(window.jspdf.jsPDF);
    document.head.appendChild(script);
  });
};

const generateReceiptPDF = async (claim) => {
  const jsPDF = await loadJsPDF();
  const doc = new jsPDF();
  const blue = [37, 99, 235];
  const gray = [107, 114, 128];
  const dark = [17, 24, 39];

  // Header bar
  doc.setFillColor(...blue);
  doc.rect(0, 0, 210, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('MediLink', 14, 12);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Insurance Claim Receipt', 14, 20);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 140, 20);

  // Receipt box
  doc.setDrawColor(229, 231, 235);
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(14, 34, 182, 12, 2, 2, 'FD');
  doc.setTextColor(...dark);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('CLAIM RECEIPT', 105, 42, { align: 'center' });

  // Claim details
  const rows = [
    ['Claim Number', claim.claimNumber],
    ['Service', claim.service],
    ['Provider', claim.provider],
    ['Date of Service', claim.date],
    ['Submitted', claim.submittedDate],
    claim.processedDate ? ['Processed', claim.processedDate] : null,
    claim.doctor ? ['Doctor', claim.doctor] : null,
    claim.diagnosis ? ['Diagnosis', claim.diagnosis] : null,
    claim.tests ? ['Tests', claim.tests] : null,
    claim.medication ? ['Medication', claim.medication] : null,
  ].filter(Boolean);

  let y = 56;
  rows.forEach(([label, value], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(14, y - 4, 182, 8, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text(label + ':', 18, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dark);
    doc.text(String(value), 80, y);
    y += 9;
  });

  // Amount section
  y += 4;
  doc.setFillColor(...blue);
  doc.rect(14, y, 182, 0.5, 'F');
  y += 8;

  const amountRows = [
    ['Claim Amount', claim.claimAmount],
    ['Approved Amount', claim.approvedAmount || claim.claimAmount],
    claim.copayment ? ['Co-payment', claim.copayment] : null,
    ['Payment Status', claim.paymentStatus?.toUpperCase()],
  ].filter(Boolean);

  amountRows.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text(label + ':', 18, y);
    doc.setFont('helvetica', 'bold');
    if (value === 'PAID' || value === 'paid') doc.setTextColor(22, 163, 74);
    else if (value === 'PENDING' || value === 'pending') doc.setTextColor(202, 138, 4);
    else doc.setTextColor(...dark);
    doc.text(String(value), 80, y);
    y += 10;
  });

  // Footer
  doc.setFillColor(249, 250, 251);
  doc.rect(0, 272, 210, 25, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.text('MediLink Health Platform · Nairobi, Kenya · support@medilink.co.ke', 105, 282, { align: 'center' });
  doc.text('This is an official claim receipt. Keep for your records.', 105, 289, { align: 'center' });

  doc.save(`Receipt-${claim.claimNumber}.pdf`);
};

const generateInvoicePDF = async (bill) => {
  const jsPDF = await loadJsPDF();
  const doc = new jsPDF();
  const blue = [37, 99, 235];
  const gray = [107, 114, 128];
  const dark = [17, 24, 39];

  doc.setFillColor(...blue);
  doc.rect(0, 0, 210, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('MediLink', 14, 12);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Tax Invoice', 14, 20);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 20);

  doc.setTextColor(...dark);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 14, 42);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...gray);
  doc.text(`Invoice No: ${bill.invoiceNumber}`, 14, 50);
  doc.text(`Date: ${bill.date}`, 14, 57);
  if (bill.dueDate) doc.text(`Due Date: ${bill.dueDate}`, 14, 64);

  // Bill to
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text('BILLED TO:', 14, 76);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...gray);
  doc.text('John Doe', 14, 83);
  doc.text('MediLink Patient Account', 14, 89);

  // Service table header
  doc.setFillColor(...blue);
  doc.rect(14, 100, 182, 9, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Description', 18, 106);
  doc.text('Amount', 160, 106);

  // Service row
  doc.setFillColor(249, 250, 251);
  doc.rect(14, 109, 182, 10, 'F');
  doc.setTextColor(...dark);
  doc.setFont('helvetica', 'normal');
  doc.text(bill.service, 18, 116);
  doc.text(bill.amount, 160, 116);

  // Summary
  let sy = 130;
  doc.setDrawColor(229, 231, 235);
  doc.line(14, sy, 196, sy);
  sy += 8;

  [
    ['Subtotal', bill.amount],
    ['Amount Paid', bill.paid],
    ['Balance Due', bill.balance],
  ].forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text(label + ':', 130, sy);
    doc.setFont('helvetica', 'bold');
    if (label === 'Balance Due' && bill.balance !== 'KSh 0') doc.setTextColor(220, 38, 38);
    else if (label === 'Balance Due') doc.setTextColor(22, 163, 74);
    else doc.setTextColor(...dark);
    doc.text(String(value), 160, sy);
    sy += 9;
  });

  if (bill.paymentMethod) {
    sy += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text(`Payment Method: ${bill.paymentMethod}`, 14, sy);
  }

  // Status badge
  const statusColor = bill.status === 'paid' ? [22, 163, 74] : [202, 138, 4];
  doc.setFillColor(...statusColor);
  doc.roundedRect(14, sy + 8, 30, 8, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(bill.status.toUpperCase(), 29, sy + 14, { align: 'center' });

  doc.setFillColor(249, 250, 251);
  doc.rect(0, 272, 210, 25, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.text('MediLink Health Platform · Nairobi, Kenya · support@medilink.co.ke', 105, 282, { align: 'center' });
  doc.text('Thank you for using MediLink. This is an official invoice.', 105, 289, { align: 'center' });

  doc.save(`Invoice-${bill.invoiceNumber}.pdf`);
};

const ModalOverlay = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur" onClick={onClose}>
    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

// M-Pesa STK Push Modal
const MpesaPayModal = ({ bill, onClose, onSuccess }) => {
  const [step, setStep] = useState('confirm');
  const [phone, setPhone] = useState('+254 712 345 678');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (step === 'processing') {
      const timer = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) {
            clearInterval(timer);
            // Simulate success after ~5s
            setTimeout(() => setStep('success'), 500);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
      // Simulate STK push sent after 1.5s
      const pushTimer = setTimeout(() => {
        setCountdown(55);
      }, 1500);
      return () => { clearInterval(timer); clearTimeout(pushTimer); };
    }
  }, [step]);

  const handleSendSTK = () => {
    setStep('processing');
    setCountdown(60);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5">
              <Smartphone className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">M-Pesa Payment</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
            <X className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {step === 'confirm' && (
          <>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-500 mb-0.5">Paying for</p>
              <p className="text-sm font-semibold text-gray-900">{bill.service}</p>
              <p className="text-xs text-gray-500 mt-1">Invoice: {bill.invoiceNumber}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">Amount Due</span>
                <span className="text-lg font-bold text-blue-600">{bill.balance}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">M-Pesa Phone Number</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="flex-1 text-sm outline-none text-gray-900"
                  placeholder="+254 7XX XXX XXX"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">An STK push will be sent to this number</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 mb-4">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  You'll receive a prompt on your phone. Enter your M-Pesa PIN to complete the payment.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Cancel
              </button>
              <button onClick={handleSendSTK} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Pay {bill.balance}
              </button>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-3 relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
              <Smartphone className="absolute inset-0 m-auto w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Waiting for Payment</h3>
            <p className="text-xs text-gray-500 mb-2">STK push sent to {phone}</p>
            <p className="text-xs text-gray-500">Check your phone and enter your M-Pesa PIN</p>
            <div className="mt-3 bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-xs text-gray-500">Request expires in</p>
              <p className="text-2xl font-bold text-gray-900">{countdown}s</p>
            </div>
            <button onClick={onClose} className="mt-3 text-xs text-gray-500 hover:text-gray-700">Cancel</button>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Payment Failed!</h3>
            <p className="text-xs text-gray-500 mb-1">{bill.balance} Error 404</p>
            <p className="text-xs text-gray-400">Ref: MP{Date.now().toString().slice(-8)}</p>
            <button
              onClick={() => { onSuccess && onSuccess(bill.id); onClose(); }}
              className="mt-4 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {step === 'failed' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Payment Failed</h3>
            <p className="text-xs text-gray-500 mb-3">The request timed out or was cancelled.</p>
            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">Cancel</button>
              <button onClick={() => { setStep('confirm'); setCountdown(60); }} className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">Try Again</button>
            </div>
          </div>
        )}
      </div>
    </ModalOverlay>
  );
};

// Claim Details Modal
const ClaimDetailsModal = ({ claim, onClose }) => (
  <ModalOverlay onClose={onClose}>
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-900">Claim Details</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="space-y-2 text-sm">
        {[
          ['Claim #', claim.claimNumber],
          ['Service', claim.service],
          ['Provider', claim.provider],
          ['Date', claim.date],
          ['Amount', claim.claimAmount],
          ['Approved', claim.approvedAmount],
          claim.copayment ? ['Co-payment', claim.copayment] : null,
          ['Status', claim.status],
          ['Submitted', claim.submittedDate],
          claim.processedDate ? ['Processed', claim.processedDate] : null,
          claim.doctor ? ['Doctor', claim.doctor] : null,
          claim.diagnosis ? ['Diagnosis', claim.diagnosis] : null,
          claim.tests ? ['Tests', claim.tests] : null,
          claim.medication ? ['Medication', claim.medication] : null,
          ['Payment', claim.paymentStatus],
        ].filter(Boolean).map(([label, value]) => (
          <div key={label} className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-500">{label}:</span>
            <span className="font-medium text-gray-900 text-right ml-2">{value}</span>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="mt-4 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
        Close
      </button>
    </div>
  </ModalOverlay>
);

// ─── Main Insurance Component ────────────────────────────────────────────────

const Insurance = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedText, setCopiedText] = useState('');
  const [patientId, setPatientId] = useState(null);
  const [insuranceLoading, setInsuranceLoading] = useState(false);
  const [insuranceError, setInsuranceError] = useState('');
  const [billingLoadError, setBillingLoadError] = useState('');

  // Modal states
  const [mpesaModal, setMpesaModal] = useState(null); // bill object
  const [claimDetailsModal, setClaimDetailsModal] = useState(null); // claim object
  const [downloadingReceipt, setDownloadingReceipt] = useState(null);
  const [downloadingInvoice, setDownloadingInvoice] = useState(null);

  const [insuranceInfo, setInsuranceInfo] = useState({
    provider: 'N/A',
    memberNumber: 'N/A',
    status: 'N/A',
    coverageType: 'N/A',
    validFrom: 'N/A',
    validUntil: 'N/A',
    principal: 'N/A',
    dependents: 0,
    monthlyContribution: 'KSh 0',
    lastPayment: 'N/A',
    benefitLimit: 'KSh 0',
    coverageServices: [],
  });

  const [shaInfo, setShaInfo] = useState({
    provider: 'N/A',
    memberNumber: 'N/A',
    status: 'N/A',
    tier: 'N/A',
    validFrom: 'N/A',
    validUntil: 'N/A',
    monthlyContribution: 'KSh 0',
    coverageLevel: 'N/A',
  });

  const [claims, setClaims] = useState([]);

  const [billingHistory, setBillingHistory] = useState([]);

  const loadInsuranceData = useCallback(async () => {
    if (!user?.id) return;
    setInsuranceLoading(true);
    setInsuranceError('');
    setBillingLoadError('');

    try {
      const resolvedPatientId = patientId || (await patientApi.me())?.id;
      if (!resolvedPatientId) {
        throw new Error('Patient profile not found for this account.');
      }
      if (!patientId) setPatientId(resolvedPatientId);

      const [providersResult, policiesResult, billingResult] = await Promise.allSettled([
        insuranceService.listProviders({ status: 'ACTIVE' }),
        insuranceService.listPoliciesByPatient(resolvedPatientId),
        insuranceService.listBillingByPatient(resolvedPatientId),
      ]);

      const providersResponse = providersResult.status === 'fulfilled' ? providersResult.value : [];
      const policiesResponse = policiesResult.status === 'fulfilled' ? policiesResult.value : [];
      const billingResponse = billingResult.status === 'fulfilled' ? billingResult.value : [];

      if (billingResult.status === 'rejected') {
        setBillingLoadError(billingResult.reason?.message || 'Could not load billing records for this patient.');
      }

      if (providersResult.status === 'rejected' && policiesResult.status === 'rejected' && billingResult.status === 'rejected') {
        throw new Error('Unable to load insurance services at the moment.');
      }

      const providers = normalizeToArray(providersResponse);
      const providerLookup = new Map(
        providers.map((provider) => [
          normalizeId(provider.id || provider.provider_id),
          provider.name || provider.providerName || provider.provider_name || 'Unknown Provider',
        ]),
      );

      const policyRows = normalizeToArray(policiesResponse);
      const billingRows = normalizeToArray(billingResponse);

      const mappedBilling = billingRows.map((bill) => {
        const totalAmount = asNumber(bill.totalAmount ?? bill.total_amount ?? bill.amount);
        const paidAmount = asNumber(bill.paidAmount ?? bill.paid_amount ?? bill.paid);
        const balanceAmount = Math.max(totalAmount - paidAmount, 0);
        const status = String(bill.status || (balanceAmount > 0 ? 'pending' : 'paid')).toLowerCase();

        return {
          id: bill.id,
          invoiceNumber: bill.invoiceNumber || bill.invoice_number || `INV-${bill.id ?? 'N/A'}`,
          date: formatDate(bill.date || bill.createdAt || bill.created_at || bill.serviceDate || bill.service_date),
          service: bill.service || bill.service_name || bill.description || bill.serviceName || 'Medical Service',
          amount: formatMoney(totalAmount),
          paid: formatMoney(paidAmount),
          balance: formatMoney(balanceAmount),
          status,
          paymentMethod: 'M-Pesa',
          paymentDate: bill.paymentDate || bill.payment_date || bill.updatedAt || bill.updated_at
            ? formatDate(bill.paymentDate || bill.payment_date || bill.updatedAt || bill.updated_at)
            : '',
          dueDate: bill.dueDate || bill.due_date ? formatDate(bill.dueDate || bill.due_date) : '',
        };
      });
      setBillingHistory(mappedBilling);

      const resolvePolicy = (policy, fallbackProvider) => {
        const providerId = normalizeId(policy.providerId || policy.provider_id || policy.insuranceProviderId || policy.insurance_provider_id);
        const providerName = providerLookup.get(providerId) || policy.providerName || policy.provider_name || policy.provider || fallbackProvider || 'Unknown Provider';
        return {
          provider: providerName,
          memberNumber: policy.policyNumber || policy.policy_number || policy.planCode || policy.plan_code || `POL-${policy.id ?? 'N/A'}`,
          status: formatTitle(policy.status || 'active'),
          coverageType: policy.policyType || policy.policy_type || policy.planName || policy.plan_name || policy.type || 'General Cover',
          validFrom: formatDate(policy.startDate || policy.start_date || policy.effectiveDate || policy.effective_date || policy.validFrom || policy.valid_from),
          validUntil: formatDate(policy.expiryDate || policy.expiry_date || policy.validUntil || policy.valid_until || policy.endDate || policy.end_date),
          principal: policy.policyHolder || policy.policy_holder || policy.memberName || policy.member_name || user?.name || 'N/A',
          dependents: asNumber(policy.dependents ?? policy.beneficiaries ?? policy.beneficiaries_count, 0),
          monthlyContribution: formatMoney(policy.monthlyPremium ?? policy.monthly_premium ?? policy.premium),
          lastPayment: formatDate(policy.lastPaymentDate || policy.last_payment_date || policy.updatedAt || policy.updated_at),
          benefitLimit: formatMoney(policy.coverageAmount ?? policy.coverage_amount ?? policy.coverage ?? policy.annualLimit ?? policy.annual_limit),
          coverageServices: normalizeToArray(policy.coverageServices || policy.services || policy.benefits),
          tier: policy.tier || policy.planName || policy.plan_name || 'Standard Package',
          coverageLevel: policy.coverageLevel || policy.coverage_level || policy.policyType || policy.policy_type || 'Standard Coverage',
        };
      };

      const nhifPolicy = policyRows.find((policy) => String(policy.providerName || policy.provider || '').toLowerCase().includes('nhif')) || policyRows[0];
      const shaPolicy = policyRows.find((policy) => String(policy.providerName || policy.provider || '').toLowerCase().includes('sha')) || policyRows[1] || policyRows[0];

      setInsuranceInfo(nhifPolicy ? resolvePolicy(nhifPolicy, 'NHIF') : {
        provider: 'N/A', memberNumber: 'N/A', status: 'N/A', coverageType: 'N/A',
        validFrom: 'N/A', validUntil: 'N/A', principal: user?.name || 'N/A', dependents: 0,
        monthlyContribution: 'KSh 0', lastPayment: 'N/A', benefitLimit: 'KSh 0', coverageServices: [],
      });

      setShaInfo(shaPolicy ? resolvePolicy(shaPolicy, 'SHA') : {
        provider: 'N/A', memberNumber: 'N/A', status: 'N/A', tier: 'N/A',
        validFrom: 'N/A', validUntil: 'N/A', monthlyContribution: 'KSh 0', coverageLevel: 'N/A',
      });

      const billingIds = billingRows.map((bill) => bill.id).filter(Boolean);
      let claimRows = [];

      if (billingIds.length > 0) {
        const claimResponses = await Promise.all(
          billingIds.map((id) => insuranceService.listClaimsByBilling(id).catch(() => [])),
        );
        claimRows = claimResponses.flatMap((response) => normalizeToArray(response));
      }

      const uniqueClaims = Array.from(
        new Map(claimRows.map((claim) => [claim.id || claim.claimNumber, claim])).values(),
      );

      const mappedClaims = uniqueClaims.map((claim) => {
        const providerId = normalizeId(claim.providerId || claim.provider_id || claim.insuranceProviderId || claim.insurance_provider_id);
        const providerName = providerLookup.get(providerId) || claim.providerName || claim.provider_name || claim.provider || claim.hospital || 'MediLink Facility';
        const claimAmount = asNumber(claim.claimedAmount ?? claim.claimed_amount ?? claim.claimAmount ?? claim.claim_amount ?? claim.amount);
        const approvedAmountRaw = asNumber(claim.approvedAmount ?? claim.approved_amount ?? claim.paidAmount ?? claim.paid_amount ?? claim.settledAmount ?? claim.settled_amount, 0);
        const resolvedStatus = String(claim.status || 'pending').toLowerCase();
        const approvedAmount = approvedAmountRaw > 0 ? approvedAmountRaw : (resolvedStatus === 'approved' ? claimAmount : 0);
        const copayment = Math.max(claimAmount - approvedAmount, 0);
        return {
          id: claim.id,
          claimNumber: claim.claimNumber || `CLM-${claim.id ?? 'N/A'}`,
          service: claim.service || claim.service_name || claim.serviceType || claim.service_type || claim.claimType || claim.claim_type || 'Medical Service',
          provider: providerName,
          date: claim.serviceDate || claim.service_date || claim.submissionDate || claim.submission_date || claim.createdAt || claim.created_at
            ? formatDate(claim.serviceDate || claim.service_date || claim.submissionDate || claim.submission_date || claim.createdAt || claim.created_at)
            : 'N/A',
          claimAmount: formatMoney(claimAmount),
          approvedAmount: formatMoney(approvedAmount),
          copayment: copayment > 0 ? formatMoney(copayment) : '',
          status: resolvedStatus,
          submittedDate: claim.submissionDate || claim.submission_date || claim.createdAt || claim.created_at
            ? formatDate(claim.submissionDate || claim.submission_date || claim.createdAt || claim.created_at)
            : '',
          processedDate: claim.processedDate || claim.processed_date || claim.responseDate || claim.response_date || claim.updatedAt || claim.updated_at
            ? formatDate(claim.processedDate || claim.processed_date || claim.responseDate || claim.response_date || claim.updatedAt || claim.updated_at)
            : '',
          paymentStatus: String(claim.paymentStatus || (approvedAmount > 0 ? 'paid' : 'pending')).toLowerCase(),
          diagnosis: claim.diagnosis || claim.reason || claim.rejectionReason || claim.rejection_reason || '',
          doctor: claim.doctor || claim.clinician || '',
          tests: claim.tests || '',
          medication: claim.medication || '',
        };
      });
      setClaims(mappedClaims);
    } catch (error) {
      setInsuranceError(error?.message || 'Unable to load insurance and billing data.');
      setClaims([]);
      setBillingHistory([]);
      setBillingLoadError('');
      setInsuranceInfo((prev) => ({ ...prev, status: 'N/A' }));
      setShaInfo((prev) => ({ ...prev, status: 'N/A' }));
    } finally {
      setInsuranceLoading(false);
    }
  }, [patientId, user?.id, user?.name]);

  useEffect(() => {
    loadInsuranceData();
  }, [loadInsuranceData]);

  const handlePaymentSuccess = (billId) => {
    setBillingHistory(prev => prev.map(b =>
      b.id === billId
        ? { ...b, status: 'paid', paid: b.amount, balance: 'KSh 0', paymentMethod: 'M-Pesa', paymentDate: new Date().toISOString().split('T')[0] }
        : b
    ));
  };

  const handleDownloadReceipt = async (claim) => {
    setDownloadingReceipt(claim.id);
    try {
      await generateReceiptPDF(claim);
    } finally {
      setTimeout(() => setDownloadingReceipt(null), 1000);
    }
  };

  const handleDownloadInvoice = async (bill) => {
    setDownloadingInvoice(bill.id);
    try {
      await generateInvoicePDF(bill);
    } finally {
      setTimeout(() => setDownloadingInvoice(null), 1000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': case 'paid': case 'Active': return 'text-green-700';
      case 'processing': case 'pending': return 'text-yellow-700';
      case 'rejected': case 'overdue': return 'text-red-700';
      default: return 'text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': case 'paid': return CheckCircle;
      case 'processing': case 'pending': return Clock;
      case 'rejected': return XCircle;
      default: return AlertCircle;
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const toMoneyNumber = (value) => Number(String(value || '').replace(/[^0-9.-]/g, '')) || 0;
  const totalPendingAmount = billingHistory
    .filter((bill) => bill.status === 'pending')
    .reduce((sum, bill) => sum + toMoneyNumber(bill.balance), 0);
  const totalPaidAmount = billingHistory.reduce((sum, bill) => sum + toMoneyNumber(bill.paid), 0);
  const totalInvoicedAmount = billingHistory.reduce((sum, bill) => sum + toMoneyNumber(bill.amount), 0);

  return (
    <div className="space-y-6">
      {/* Modals */}
      {mpesaModal && (
        <MpesaPayModal
          bill={mpesaModal}
          onClose={() => setMpesaModal(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}
      {claimDetailsModal && (
        <ClaimDetailsModal
          claim={claimDetailsModal}
          onClose={() => setClaimDetailsModal(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Insurance & Payments</h1>
          
        </div>
      </div>

      {insuranceError && (
        <div className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 rounded-sm">
          {insuranceError}
        </div>
      )}
      {insuranceLoading && (
        <div className="border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700 rounded-sm">
          Loading insurance data from backend...
        </div>
      )}
      {billingLoadError && !insuranceError && (
        <div className="border border-yellow-200 bg-yellow-50 px-3 py-2 text-sm text-yellow-700 rounded-sm">
          {billingLoadError}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {[
          { label: "Active Claims", value: claims.filter(c => c.status === 'processing').length, icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />, valueClass: "text-lg sm:text-xl font-bold text-gray-900" },
          { label: "Pending Payments", value: `KSh ${totalPendingAmount.toLocaleString()}`, icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />, valueClass: "text-base sm:text-lg font-bold text-gray-900 truncate" },
          { label: "Coverage Status", value: insuranceInfo.status, icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />, valueClass: "text-base sm:text-lg font-bold text-green-600" },
          { label: "M-Pesa Transactions", value: billingHistory.length, icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />, valueClass: "text-lg sm:text-xl font-bold text-gray-900" },
        ].map(({ label, value, icon, valueClass }) => (
          <div key={label} className="bg-white p-3 sm:p-4 border border-gray-200 rounded-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] sm:text-xs text-gray-500 leading-tight">{label}</p>
                <p className={`${valueClass} mt-1 leading-tight`}>{value}</p>
              </div>
              <div className="shrink-0 mt-0.5">{icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex overflow-x-auto scrollbar-hide">
          {['overview', 'claims', 'finances'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none py-3 sm:py-4 px-3 sm:px-5 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-800 hover:text-gray-900 hover:border-gray-300'
              }`}>
              {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* NHIF Coverage */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" /> NHIF Coverage
              </h3>
              <span className={`text-sm font-semibold px-2 py-0.5 ${getStatusColor(insuranceInfo.status)}`}>{insuranceInfo.status}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="text-xs text-gray-600">Member Number</p>
                  <p className="text-sm font-medium text-gray-900">{insuranceInfo.memberNumber}</p>
                </div>
                <button onClick={() => copyToClipboard(insuranceInfo.memberNumber, 'NHIF')} className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                  {copiedText === 'NHIF' ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5 text-gray-600" />}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><p className="text-gray-500">Coverage Type</p><p className="text-sm font-medium text-gray-900">{insuranceInfo.coverageType}</p></div>
                <div><p className="text-gray-500">Dependents</p><p className="text-sm font-medium text-gray-900">{insuranceInfo.dependents}</p></div>
                <div><p className="text-gray-500">Valid Until</p><p className="text-sm font-medium text-gray-900">{insuranceInfo.validUntil}</p></div>
                <div><p className="text-gray-500">Monthly Contribution</p><p className="text-sm font-medium text-gray-900">{insuranceInfo.monthlyContribution}</p></div>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-700 mb-1.5">Covered Services</p>
                <div className="flex flex-wrap gap-1.5">
                  {insuranceInfo.coverageServices.slice(0, 4).map((service, i) => (
                    <span key={i} className="text-sm px-2 py-0.5 text-blue-700">{service}</span>
                  ))}
                  {insuranceInfo.coverageServices.length > 4 && (
                    <span className="text-xs px-2 py-0.5 bg-gray-50 text-gray-700 rounded-full border border-gray-200">
                      +{insuranceInfo.coverageServices.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SHA Coverage */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" /> SHA Coverage
              </h3>
              <span className={`text-sm font-semibold px-2 py-0.5 ${getStatusColor(shaInfo.status)}`}>{shaInfo.status}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="text-xs text-gray-600">Member Number</p>
                  <p className="text-sm font-medium text-gray-900">{shaInfo.memberNumber}</p>
                </div>
                <button onClick={() => copyToClipboard(shaInfo.memberNumber, 'SHA')} className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                  {copiedText === 'SHA' ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5 text-gray-600" />}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><p className="text-gray-500">Package Tier</p><p className="text-sm font-medium text-gray-900">{shaInfo.tier}</p></div>
                <div><p className="text-gray-500">Coverage Level</p><p className="text-sm font-medium text-gray-900">{shaInfo.coverageLevel}</p></div>
                <div><p className="text-gray-500">Valid Until</p><p className="text-sm font-medium text-gray-900">{shaInfo.validUntil}</p></div>
                <div><p className="text-gray-500">Monthly Contribution</p><p className="text-sm font-medium text-gray-900">{shaInfo.monthlyContribution}</p></div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-2 mt-2">
                <div className="flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-900">SHA provides enhanced coverage complementing your NHIF benefits with additional services and higher benefit limits.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Claims Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Recent Claims
            </h3>
            <div className="space-y-2">
              {claims.slice(0, 3).map((claim) => (
                <div key={claim.id} className="p-2 bg-gray-50 rounded">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{claim.service}</p>
                      <p className="text-xs text-gray-600">{claim.provider}</p>
                    </div>
                    <span className={`text-sm font-semibold px-2 py-0.5 ${getStatusColor(claim.status)}`}>{claim.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{claim.date}</span>
                    <span className="text-sm font-medium text-gray-900">{claim.claimAmount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Payments */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600" /> Pending Payments
            </h3>
            {billingHistory.filter(b => b.status === 'pending').length > 0 ? (
              <div className="space-y-2">
                {billingHistory.filter(b => b.status === 'pending').map((bill) => (
                  <div key={bill.id} className="p-2">
                    <div className="flex items-start justify-between mb-1.5">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{bill.service}</p>
                        <p className="text-xs text-gray-600">Due: {bill.dueDate}</p>
                      </div>
                      <span className="text-sm font-semibold text-red-600">{bill.balance}</span>
                    </div>
                    <button
                      onClick={() => setMpesaModal(bill)}
                      className="mt-1.5 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium"
                    >
                      Pay Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">All payments are up to date</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Claims Tab */}
      {activeTab === 'claims' && (
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-semibold text-blue-900">Claims Processing</h3>
                <p className="text-xs text-blue-800 mt-0.5">Claims are typically processed within 3-5 business days. You'll receive notifications for status updates.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {claims.map((claim) => {
              const StatusIcon = getStatusIcon(claim.status);
              const isDownloading = downloadingReceipt === claim.id;
              return (
                <div key={claim.id} className="bg-white rounded border border-gray-200 overflow-hidden">
                  <div className="p-2">
                    <div className="flex items-start justify-between gap-1.5 mb-1.5">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{claim.service}</h3>
                        <p className="text-xs text-gray-600 truncate">{claim.provider}</p>
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full border flex items-center gap-0.5 flex-shrink-0 ${getStatusColor(claim.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="space-y-1 text-sm mb-1.5">
                      <div className="flex justify-between"><span className="text-gray-500">Claim #:</span><span className="font-bold">{claim.claimNumber}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Date:</span><span className="font-bold">{claim.date}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Amount:</span><span className="font-bold">{claim.claimAmount}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Approved:</span><span className="font-bold">{claim.approvedAmount}</span></div>
                    </div>
                    <div className="">
                      <div className="space-y-1 text-sm mb-2">
                        {claim.submittedDate && <div className="flex justify-between"><span className="text-gray-600">Submitted:</span><span className="font-semibold">{claim.submittedDate}</span></div>}
                        {claim.processedDate && <div className="flex justify-between"><span className="text-gray-600">Processed:</span><span className="font-semibold">{claim.processedDate}</span></div>}
                        {claim.doctor && <div className="flex justify-between"><span className="text-gray-600">Doctor:</span><span className="font-semibold truncate ml-2">{claim.doctor}</span></div>}
                        {claim.diagnosis && <div className="flex justify-between"><span className="text-gray-600">Diagnosis:</span><span className="font-semibold truncate ml-2">{claim.diagnosis}</span></div>}
                        {claim.tests && <div className="flex justify-between"><span className="text-gray-600">Tests:</span><span className="font-semibold truncate ml-2">{claim.tests}</span></div>}
                        {claim.medication && <div className="flex justify-between"><span className="text-gray-600">Medication:</span><span className="font-semibold truncate ml-2">{claim.medication}</span></div>}
                        {claim.copayment && <div className="flex justify-between"><span className="text-gray-600">Co-payment:</span><span className="text-orange-600 font-semibold">{claim.copayment}</span></div>}
                        <div className="flex justify-between"><span className="text-gray-600">Payment:</span><span className="font-semibold capitalize">{claim.paymentStatus}</span></div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDownloadReceipt(claim)}
                          disabled={isDownloading}
                          className="flex items-center gap-0.5 px-2 py-0.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm disabled:opacity-60"
                        >
                          {isDownloading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                          {isDownloading ? 'Saving...' : 'Receipt'}
                        </button>
                        <button
                          onClick={() => setClaimDetailsModal(claim)}
                          className="flex items-center gap-0.5 px-2 py-0.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Finances Tab */}
      {activeTab === 'finances' && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-semibold text-green-900">M-Pesa Payments Only</h3>
                <p className="text-xs text-green-800 mt-0.5">
                  All financial transactions on this page are processed through M-Pesa only.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white rounded border border-gray-200 p-3">
              <p className="text-xs text-gray-500">Total Invoiced</p>
              <p className="text-lg font-bold text-gray-900 mt-1">KSh {totalInvoicedAmount.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded border border-gray-200 p-3">
              <p className="text-xs text-gray-500">Total Paid (M-Pesa)</p>
              <p className="text-lg font-bold text-green-700 mt-1">KSh {totalPaidAmount.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded border border-gray-200 p-3">
              <p className="text-xs text-gray-500">Outstanding Balance</p>
              <p className="text-lg font-bold text-red-600 mt-1">KSh {totalPendingAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {!insuranceLoading && billingHistory.length === 0 && (
              <div className="md:col-span-2 lg:col-span-3 bg-white rounded border border-gray-200 p-6 text-center">
                <Receipt className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">No finance records found</p>
                <p className="text-xs text-gray-500 mt-1">
                  This patient profile has no financial entries yet, or finance records could not be linked to this patient account.
                </p>
              </div>
            )}

            {billingHistory.map((bill) => {
              const isDownloading = downloadingInvoice === bill.id;
              return (
                <div key={bill.id} className="bg-white rounded border border-gray-200 p-2.5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <div className="p-1.5 rounded flex-shrink-0">
                        <Receipt className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold truncate">{bill.service}</h3>
                        <p className="text-xs text-gray-600 truncate">Invoice: {bill.invoiceNumber}</p>
                        <p className="text-xs text-gray-600">{bill.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold px-1.5 py-0.5 flex-shrink-0 ml-2 ${getStatusColor(bill.status)}`}>{bill.status}</span>
                  </div>

                  <div className="space-y-1.5 text-sm mb-2">
                    <div className="flex justify-between"><span className="text-gray-500">Total:</span><span className="font-semibold">{bill.amount}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Paid:</span><span className="font-semibold">{bill.paid}</span></div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Balance:</span>
                      <span className={`font-semibold ${bill.balance === 'KSh 0' ? '' : 'text-red-600'}`}>{bill.balance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Channel:</span>
                      <span className="font-medium text-gray-900">M-Pesa</span>
                    </div>
                    {bill.dueDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Due:</span>
                        <span className="font-medium text-orange-600">{bill.dueDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleDownloadInvoice(bill)}
                      disabled={isDownloading}
                      className="flex items-center gap-0.5 px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm disabled:opacity-60"
                    >
                      {isDownloading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                      {isDownloading ? 'Saving...' : 'Invoice'}
                    </button>
                    {bill.status === 'pending' && (
                      <button
                        onClick={() => setMpesaModal(bill)}
                        className="flex items-center gap-0.5 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <Phone className="w-3 h-3" />
                        Pay via M-Pesa
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Insurance;