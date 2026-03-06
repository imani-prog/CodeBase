import React, { useState, useEffect } from 'react';
import { X, Download, CheckCircle, User, Stethoscope, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const DownloadReportModal = ({ isOpen, onClose, session }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [includeSections, setIncludeSections] = useState({
    sessionInfo: true,
    diagnosis: true,
    prescription: true,
    billing: true,
    followUp: true,
  });
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedFormat('pdf');
      setIncludeSections({ sessionInfo: true, diagnosis: true, prescription: true, billing: true, followUp: true });
      setDownloading(false);
      setDone(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => { setDone(false); onClose(); }, 2500);
      return () => clearTimeout(t);
    }
  }, [done, onClose]);

  const toggleSection = (key) =>
    setIncludeSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(amount ?? 0);

  const buildRows = () => {
    const rows = [];
    if (includeSections.sessionInfo) {
      rows.push(['Session ID', String(session.id)]);
      rows.push(['Date', String(session.date)]);
      rows.push(['Status', String(session.status)]);
      rows.push(['Duration (min)', String(session.duration || 0)]);
    }
    rows.push(['Patient', String(session.patient)]);
    rows.push(['Doctor', String(session.doctor)]);
    if (includeSections.billing) {
      rows.push(['Cost (KES)', String(session.cost ?? 0)]);
      rows.push(['Rating', String(session.rating ?? 'N/A')]);
    }
    if (includeSections.diagnosis) {
      rows.push(['Diagnosis', String(session.diagnosis || 'N/A')]);
    }
    if (includeSections.prescription) {
      rows.push(['Prescription', String(session.prescription || 'N/A')]);
    }
    if (includeSections.followUp) {
      rows.push(['Follow-up Required', session.followUpRequired ? 'Yes' : 'No']);
    }
    return rows;
  };

  const handleDownload = () => {
    if (!session) return;
    setDownloading(true);
    const rows = buildRows();
    const filename = session.id + '_report';

    try {
      if (selectedFormat === 'pdf') {
        const doc = new jsPDF();
        doc.setFillColor(10, 30, 80);
        doc.rect(0, 0, 210, 22, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('MediLink Session Report - ' + session.id, 14, 14);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(180, 200, 240);
        doc.text('Generated: ' + new Date().toLocaleString('en-KE'), 14, 20);
        doc.setTextColor(40, 40, 40);
        let y = 34;
        rows.forEach(function(row, i) {
          const label = row[0];
          const value = row[1];
          if (i % 2 === 0) {
            doc.setFillColor(245, 247, 250);
            doc.rect(12, y - 5, 186, 10, 'F');
          }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.text(String(label), 16, y);
          doc.setFont('helvetica', 'normal');
          doc.text(String(value), 90, y);
          y += 12;
          if (y > 270) { doc.addPage(); y = 20; }
        });
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text('MediLink Administration - Confidential. For authorized use only.', 14, 290);
        const pdfBlob = doc.output('blob');
        saveAs(pdfBlob, filename + '.pdf');

      } else if (selectedFormat === 'csv') {
        const header = '"Field","Value"';
        const body = rows.map(function(r) {
          return '"' + String(r[0]).replace(/"/g, '""') + '","' + String(r[1]).replace(/"/g, '""') + '"';
        }).join('\n');
        const blob = new Blob(['\uFEFF' + header + '\n' + body], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, filename + '.csv');

      } else if (selectedFormat === 'excel') {
        const wsData = [['Field', 'Value']].concat(rows);
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        // Force every data cell to text type so numbers don't right-align
        wsData.forEach(function(row, r) {
          row.forEach(function(cell, c) {
            const addr = XLSX.utils.encode_cell({ r: r, c: c });
            ws[addr] = { v: String(cell), t: 's' };
          });
        });
        ws['!cols'] = [{ wch: 30 }, { wch: 55 }];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Session Report');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blob, filename + '.xlsx');
      }

      setDone(true);
    } catch (err) {
      console.error('Download error:', err);
      alert('Download failed: ' + err.message);
    } finally {
      setDownloading(false);
    }
  };

  if (!isOpen || !session) return null;

  const sections = [
    { key: 'sessionInfo', label: 'Session Information', desc: 'Date, duration, platform and session type' },
    { key: 'diagnosis', label: 'Diagnosis', desc: "Doctor's diagnosis and clinical notes" },
    { key: 'prescription', label: 'Prescription', desc: 'Medications and treatment instructions' },
    { key: 'billing', label: 'Billing Details', desc: 'Cost breakdown and payment info' },
    { key: 'followUp', label: 'Follow-up Notes', desc: 'Recommended follow-up actions' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={done || downloading ? undefined : onClose}
      />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-xl w-full overflow-hidden">
          {done ? (
            <div className="px-8 py-14 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 flex items-center justify-center bg-green-50 rounded-full">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Report Downloaded!</h3>
              <p className="text-sm text-gray-600">
                Session <span className="font-semibold text-gray-800">{session.id}</span> has been saved to your
                downloads as a <span className="font-semibold uppercase">{selectedFormat === 'excel' ? 'xlsx' : selectedFormat}</span> file.
              </p>
              <p className="text-xs text-gray-400 mt-2">Closing automatically...</p>
            </div>
          ) : (
            <>
              <div className="relative px-8 py-5 bg-blue-950 text-white flex-shrink-0">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center ring-4 ring-white/30">
                    <Download className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Download Session Report</h2>
                    <p className="text-sm text-blue-200">{session.id} &mdash; {session.date}</p>
                  </div>
                </div>
              </div>
              <div className="px-8 py-6 space-y-5">
                <div className="bg-gray-50 p-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Patient</p>
                      <p className="font-semibold text-gray-900">{session.patient}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Doctor</p>
                      <p className="font-semibold text-gray-900">{session.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="font-semibold text-gray-900">{session.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Cost</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(session.cost)}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Export Format</label>
                  <div className="flex gap-6">
                    {['pdf', 'csv', 'excel'].map((fmt) => (
                      <label key={fmt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="reportFormat"
                          value={fmt}
                          checked={selectedFormat === fmt}
                          onChange={() => setSelectedFormat(fmt)}
                          className="accent-blue-600 w-4 h-4"
                        />
                        <span className="text-sm text-gray-700 uppercase font-medium">{fmt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Include Sections</label>
                  <div className="space-y-2">
                    {sections.map(({ key, label, desc }) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeSections[key]}
                          onChange={() => toggleSection(key)}
                          className="accent-blue-600 w-4 h-4 flex-shrink-0"
                        />
                        <div>
                          <span className="text-sm text-gray-800 font-medium">{label}</span>
                          <p className="text-xs text-gray-400">{desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2 px-3 py-2.5 bg-blue-50 border border-blue-200 text-xs text-blue-700">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>This report is for administrative use only. Ensure it is shared securely and in compliance with data protection policies.</span>
                </div>
              </div>
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDownload}
                  disabled={downloading || !Object.values(includeSections).some(Boolean)}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white hover:bg-blue-800 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {downloading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Preparing...
                    </span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download Report
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadReportModal;
