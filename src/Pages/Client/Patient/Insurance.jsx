import { useState, useEffect } from 'react';
import { 
  Shield, FileText, CreditCard, DollarSign,
  CheckCircle, Clock, XCircle, AlertCircle,
  Download, Plus, Edit, Trash2, 
  Receipt, Wallet,
  Phone, Info, 
  ExternalLink,
  Copy, Check, RefreshCw, X, Smartphone, Building2, Eye, EyeOff
} from 'lucide-react';

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
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Payment Successful!</h3>
            <p className="text-xs text-gray-500 mb-1">{bill.balance} paid via M-Pesa</p>
            <p className="text-xs text-gray-400">Ref: MP{Date.now().toString().slice(-8)}</p>
            <button
              onClick={() => { onSuccess && onSuccess(bill.id); onClose(); }}
              className="mt-4 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Done
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

// Add Payment Method Modal
const AddPaymentModal = ({ onClose, onAdd }) => {
  const [type, setType] = useState('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardName, setCardName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [showCVV, setShowCVV] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      const newMethod = type === 'mpesa'
        ? { id: Date.now(), type: 'M-Pesa', number: mpesaPhone, primary: false, icon: Phone }
        : type === 'card'
        ? { id: Date.now(), type: 'Credit Card', last4: cardNumber.slice(-4), expiry: cardExpiry, brand: 'Visa', primary: false, icon: CreditCard }
        : { id: Date.now(), type: 'Bank Transfer', number: bankName, primary: false, icon: Building2 };
      onAdd(newMethod);
      onClose();
    }, 1000);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Add Payment Method</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Type selector */}
        <div className="flex gap-1.5 mb-4 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'mpesa', label: 'M-Pesa', Icon: Phone },
            { key: 'card', label: 'Card', Icon: CreditCard },
            { key: 'bank', label: 'Bank', Icon: Building2 },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setType(option.key)}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                type === option.key ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <option.Icon className="w-3 h-3" />
              {option.label}
            </button>
          ))}
        </div>

        {type === 'mpesa' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <input value={mpesaPhone} onChange={e => setMpesaPhone(e.target.value)}
                  className="flex-1 text-sm outline-none" placeholder="+254 7XX XXX XXX" />
              </div>
            </div>
          </div>
        )}

        {type === 'card' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input value={cardName} onChange={e => setCardName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
              <input value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1234 5678 9012 3456" />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Expiry</label>
                <input value={cardExpiry} onChange={e => setCardExpiry(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="MM/YY" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">CVV</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <input value={cardCVV} onChange={e => setCardCVV(e.target.value.slice(0, 4))}
                    type={showCVV ? 'text' : 'password'}
                    className="flex-1 text-sm outline-none w-0" placeholder="•••" />
                  <button onClick={() => setShowCVV(v => !v)} className="ml-1">
                    {showCVV ? <EyeOff className="w-3 h-3 text-gray-400" /> : <Eye className="w-3 h-3 text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'bank' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Bank Name</label>
              <input value={bankName} onChange={e => setBankName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. KCB, Equity, NCBA" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Account Number</label>
              <input value={accountNumber} onChange={e => setAccountNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Account number" />
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-1.5">
            {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
            {saving ? 'Saving...' : 'Add Method'}
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

// Edit Payment Method Modal
const EditPaymentModal = ({ method, onClose, onSave }) => {
  const [value, setValue] = useState(method.number || (method.last4 ? `•••• ${method.last4}` : ''));
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave({ ...method, number: value });
      onClose();
    }, 800);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Edit {method.type}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {method.type === 'M-Pesa' ? 'Phone Number' : 'Account Details'}
          </label>
          <input value={value} onChange={e => setValue(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-1.5">
            {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

// Confirm Remove Modal
const ConfirmRemoveModal = ({ method, onClose, onConfirm }) => (
  <ModalOverlay onClose={onClose}>
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-900">Remove Payment Method</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-red-800">
          Are you sure you want to remove <strong>{method.type}</strong> ({method.number || `•••• ${method.last4}`}) from your payment methods?
        </p>
      </div>
      <div className="flex gap-2">
        <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">Cancel</button>
        <button onClick={() => { onConfirm(method.id); onClose(); }}
          className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
          Remove
        </button>
      </div>
    </div>
  </ModalOverlay>
);

// ─── Main Insurance Component ────────────────────────────────────────────────

const Insurance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedText, setCopiedText] = useState('');

  // Modal states
  const [mpesaModal, setMpesaModal] = useState(null); // bill object
  const [claimDetailsModal, setClaimDetailsModal] = useState(null); // claim object
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [editPaymentModal, setEditPaymentModal] = useState(null); // method object
  const [removePaymentModal, setRemovePaymentModal] = useState(null); // method object
  const [downloadingReceipt, setDownloadingReceipt] = useState(null);
  const [downloadingInvoice, setDownloadingInvoice] = useState(null);

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
      'Outpatient Services', 'Inpatient Services', 
      'Maternity Services', 'Surgical Procedures',
      'Emergency Services', 'Chronic Disease Management'
    ]
  };

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

  const [claims] = useState([
    {
      id: 1, claimNumber: 'CLM-2025-001234', service: 'General Consultation',
      provider: 'Nairobi Health Center', date: '2025-11-15', claimAmount: 'KSh 3,500',
      approvedAmount: 'KSh 3,500', status: 'approved', submittedDate: '2025-11-16',
      processedDate: '2025-11-18', paymentStatus: 'paid', diagnosis: 'Seasonal allergies',
      doctor: 'Dr. Sarah Kamau'
    },
    {
      id: 2, claimNumber: 'CLM-2025-001198', service: 'Laboratory Tests',
      provider: 'MediLink Laboratory', date: '2025-11-08', claimAmount: 'KSh 4,200',
      approvedAmount: 'KSh 4,200', status: 'approved', submittedDate: '2025-11-09',
      processedDate: '2025-11-12', paymentStatus: 'paid', tests: 'Complete Blood Count, Lipid Panel'
    },
    {
      id: 3, claimNumber: 'CLM-2025-001267', service: 'Prescription Medication',
      provider: 'Westlands Pharmacy', date: '2025-11-20', claimAmount: 'KSh 2,800',
      approvedAmount: 'KSh 2,100', copayment: 'KSh 700', status: 'processing',
      submittedDate: '2025-11-21', paymentStatus: 'pending', medication: 'Amoxicillin, Cetirizine'
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'M-Pesa', number: '+254 712 345 678', primary: true, icon: Phone },
    { id: 2, type: 'Credit Card', last4: '4532', expiry: '12/26', brand: 'Visa', primary: false, icon: CreditCard }
  ]);

  const [billingHistory, setBillingHistory] = useState([
    {
      id: 1, invoiceNumber: 'INV-2025-00156', date: '2025-11-15',
      service: 'General Consultation + Lab Tests', amount: 'KSh 7,700',
      paid: 'KSh 7,700', balance: 'KSh 0', status: 'paid', paymentMethod: 'NHIF', paymentDate: '2025-11-18'
    },
    {
      id: 2, invoiceNumber: 'INV-2025-00142', date: '2025-10-22',
      service: 'Telemedicine Consultation', amount: 'KSh 2,500',
      paid: 'KSh 2,500', balance: 'KSh 0', status: 'paid', paymentMethod: 'M-Pesa', paymentDate: '2025-10-22'
    },
    {
      id: 3, invoiceNumber: 'INV-2025-00178', date: '2025-11-20',
      service: 'Prescription Co-payment', amount: 'KSh 700',
      paid: 'KSh 0', balance: 'KSh 700', status: 'pending', dueDate: '2025-11-30'
    }
  ]);

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

  const handleAddPaymentMethod = (newMethod) => {
    setPaymentMethods(prev => [...prev, newMethod]);
  };

  const handleSavePaymentMethod = (updated) => {
    setPaymentMethods(prev => prev.map(m => m.id === updated.id ? updated : m));
  };

  const handleRemovePaymentMethod = (id) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
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
      {showAddPayment && (
        <AddPaymentModal
          onClose={() => setShowAddPayment(false)}
          onAdd={handleAddPaymentMethod}
        />
      )}
      {editPaymentModal && (
        <EditPaymentModal
          method={editPaymentModal}
          onClose={() => setEditPaymentModal(null)}
          onSave={handleSavePaymentMethod}
        />
      )}
      {removePaymentModal && (
        <ConfirmRemoveModal
          method={removePaymentModal}
          onClose={() => setRemovePaymentModal(null)}
          onConfirm={handleRemovePaymentMethod}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Insurance & Billing</h1>
          <p className="text-gray-600 mt-2">Manage your insurance coverage, claims, and payment information</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {[
          { label: "Active Claims", value: claims.filter(c => c.status === 'processing').length, icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />, valueClass: "text-lg sm:text-xl font-bold text-gray-900" },
          { label: "Pending Payments", value: `KSh ${billingHistory.filter(b => b.status === 'pending').reduce((sum, b) => sum + parseInt(b.balance.replace(/[^0-9]/g, '')), 0).toLocaleString()}`, icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />, valueClass: "text-base sm:text-lg font-bold text-gray-900 truncate" },
          { label: "Coverage Status", value: insuranceInfo.status, icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />, valueClass: "text-base sm:text-lg font-bold text-green-600" },
          { label: "Payment Methods", value: paymentMethods.length, icon: <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />, valueClass: "text-lg sm:text-xl font-bold text-gray-900" },
        ].map(({ label, value, icon, valueClass }) => (
          <div key={label} className="bg-white p-3 sm:p-4 shadow-sm border border-gray-200 rounded-sm">
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
          {['overview', 'claims', 'billing', 'payment-methods'].map((tab) => (
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
                  <span className="text-xs px-2 py-0.5 bg-gray-50 text-gray-700 rounded-full border border-gray-200">
                    +{insuranceInfo.coverageServices.length - 4} more
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SHA Coverage */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
                <div key={claim.id} className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
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

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {billingHistory.map((bill) => {
            const isDownloading = downloadingInvoice === bill.id;
            return (
              <div key={bill.id} className="bg-white rounded shadow-sm border border-gray-200 p-2.5">
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
                    <span className="text-gray-500">Method:</span>
                    <span className="font-medium text-gray-900">{bill.paymentMethod || '—'}</span>
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
                      <CreditCard className="w-3 h-3" />
                      Pay
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment-methods' && (
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-semibold text-blue-900">Secure Payments</h3>
                <p className="text-xs text-blue-800 mt-0.5">All payment information is encrypted and securely stored. We support M-Pesa, credit/debit cards, and bank transfers.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.id} className="bg-white rounded shadow-sm border border-gray-200 p-2.5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded">
                        <Icon className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{method.type}</p>
                        <p className="text-xs text-gray-600">{method.number || `•••• ${method.last4}`}</p>
                        {method.expiry && <p className="text-xs text-gray-500">Expires: {method.expiry}</p>}
                      </div>
                    </div>
                    {method.primary && (
                      <span className="text-sm font-semibold px-1.5 py-0.5 text-blue-700 flex-shrink-0">Primary</span>
                    )}
                  </div>
                  <div className="mb-2 p-2 bg-gray-50 rounded">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                    {method.type === 'M-Pesa' && (
                      <div className="flex justify-between items-center text-xs mt-1">
                        <span className="text-gray-600">Last used:</span>
                        <span className="text-gray-900">2 days ago</span>
                      </div>
                    )}
                    {method.type !== 'M-Pesa' && (
                      <div className="flex justify-between items-center text-xs mt-1">
                        <span className="text-gray-600">Card type:</span>
                        <span className="text-gray-900">{method.brand || 'Visa'}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setEditPaymentModal(method)}
                      className="flex items-center gap-0.5 px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => setRemovePaymentModal(method)}
                      className="flex items-center gap-0.5 px-2 py-1 bg-white border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors text-sm"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Add Payment Method Card */}
            <button
              onClick={() => setShowAddPayment(true)}
              className="bg-white rounded shadow-sm border-2 border-dashed border-gray-300 p-3 hover:border-blue-400 hover:bg-blue-50 transition-all group"
            >
              <div className="text-center">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">Add Payment Method</p>
                <p className="text-xs text-gray-500 mt-0.5">M-Pesa, Card, or Bank Transfer</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insurance;