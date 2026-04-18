import { useEffect, useRef, useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Document as WordDocument,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  TextRun
} from 'docx';
import {
  FileText, Download, Share2, Calendar, Activity,
  File, Upload, Filter, Search, ChevronDown,
  AlertCircle, CheckCircle, Clock, Pill, Paperclip,
  Image, FileCheck, Folder, TrendingUp, Eye, Loader2, RefreshCw
} from 'lucide-react';
import { healthRecordService } from '../../../Services/domain/healthRecordService.js';

// ─── helpers ────────────────────────────────────────────────────────────────

const RECORD_TYPE_LABELS = {
  CONSULTATION: 'Consultation',
  PRESCRIPTION: 'Prescription',
  LAB_RESULT:   'Lab Result',
  IMAGING:      'Diagnostics',
  INSURANCE:    'Insurance',
  DOCUMENT:     'Document',
  OTHER:        'Other',
};

const STATUS_BADGE = {
  ACTIVE:    'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  UPCOMING:  'bg-yellow-100 text-yellow-700',
  ARCHIVED:  'bg-gray-100 text-gray-600',
  UNKNOWN:   'bg-gray-100 text-gray-500',
};

const typeIcon = (recordType) => {
  switch (recordType) {
    case 'PRESCRIPTION': return Pill;
    case 'LAB_RESULT':
    case 'IMAGING':      return Activity;
    case 'INSURANCE':    return FileText;
    default:             return FileText;
  }
};

const getRecordField = (record, ...keys) => {
  if (!record) return null;
  for (const key of keys) {
    const direct = record?.[key];
    if (direct !== undefined && direct !== null && String(direct).trim() !== '') return direct;
    const nested = record?.raw?.[key];
    if (nested !== undefined && nested !== null && String(nested).trim() !== '') return nested;
  }
  return null;
};

// ─── component ──────────────────────────────────────────────────────────────

const HealthRecords = ({ patientId }) => {

  // ── state ──
  const [activeTab, setActiveTab]               = useState('overview');
  const [searchQuery, setSearchQuery]           = useState('');
  const [typeFilter, setTypeFilter]             = useState('all');
  const [openShareMenuId, setOpenShareMenuId]   = useState(null);
  const [showExportMenu, setShowExportMenu]     = useState(false);
  const [actionFeedback, setActionFeedback]     = useState('');
  const [selectedRecord, setSelectedRecord]     = useState(null);
  const [showRecordDetails, setShowRecordDetails] = useState(false);
  const [viewLoading, setViewLoading]           = useState(false);
  const [viewError, setViewError]               = useState('');

  // backend data
  const [records, setRecords]         = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

  // uploaded docs (client-side only, no upload endpoint yet)
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const fileInputRef  = useRef(null);
  const exportMenuRef = useRef(null);

  // ── fetch health records ──
  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (patientId) {
        // fetch flat list for a specific patient
        const list = await healthRecordService.listHealthRecordsByPatient(patientId);
        result = { items: list, totalElements: list.length };
      } else {
        // paged search — pass active filters
        result = await healthRecordService.listHealthRecords({
          ...(typeFilter !== 'all' && { recordType: typeFilter }),
          ...(searchQuery.trim() && { searchTerm: searchQuery.trim() }),
          size: 50,
        });
      }
      setRecords(result.items ?? []);
      setTotalRecords(result.totalElements ?? result.items?.length ?? 0);
    } catch {
      setError('Failed to load health records. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [patientId, typeFilter, searchQuery]);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  // ── derived slices ──
  const consultations = records.filter(r => r.recordType === 'CONSULTATION');
  const prescriptions = records.filter(r => r.recordType === 'PRESCRIPTION');

  const recentRecords = [...records]
    .sort((a, b) => new Date(b.visitDate ?? 0) - new Date(a.visitDate ?? 0))
    .slice(0, 5);

  // upcoming = UPCOMING status sorted by visitDate
  const upcomingRecords = records
    .filter(r => r.status === 'UPCOMING')
    .sort((a, b) => new Date(a.visitDate ?? 0) - new Date(b.visitDate ?? 0))
    .slice(0, 5);

  // filtered medical history for the tab
  const filteredHistory = records.filter(r => {
    const matchesType = typeFilter === 'all' || r.recordType === typeFilter;
    if (!matchesType) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return [r.recordType, r.providerName, r.summary, r.status, r.visitDate]
      .filter(Boolean).join(' ').toLowerCase().includes(q);
  });

  // ── auto-clear feedback ──
  useEffect(() => {
    if (!actionFeedback) return;
    const t = setTimeout(() => setActionFeedback(''), 3000);
    return () => clearTimeout(t);
  }, [actionFeedback]);

  // ── close export menu on outside click ──
  useEffect(() => {
    if (!showExportMenu) return;
    const handler = (e) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target))
        setShowExportMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showExportMenu]);

  // ── close share menus on outside click ──
  useEffect(() => {
    if (openShareMenuId === null) return;
    const handler = (e) => {
      if (!e.target.closest('[data-share-menu-root]')) setOpenShareMenuId(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openShareMenuId]);

  // ── upload helpers ──────────────────────────────────────────────────────
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes, ui = 0;
    while (size >= 1024 && ui < units.length - 1) { size /= 1024; ui++; }
    return `${ui === 0 ? size.toFixed(0) : size.toFixed(1)} ${units[ui]}`;
  };

  const getDocCategoryFromName = (name) => {
    const n = name.toLowerCase();
    if (n.includes('prescription')) return 'prescription';
    if (n.includes('lab') || n.includes('test') || n.includes('result')) return 'lab-result';
    if (n.includes('insurance'))    return 'insurance';
    return 'report';
  };

  const addFilesToDocuments = (files) => {
    if (!files.length) return;
    const today = new Date().toISOString().slice(0, 10);
    const mapped = files.map(f => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: f.name,
      type: f.type.startsWith('image/') ? 'Medical Image'
          : f.type === 'application/pdf'  ? 'Medical PDF'
          : f.type.includes('word')       ? 'Medical Document' : 'Medical File',
      uploadedBy: 'Patient Upload',
      date: today,
      size: formatFileSize(f.size),
      category: getDocCategoryFromName(f.name),
      icon: f.type.startsWith('image/') ? Image : f.type === 'application/pdf' ? FileCheck : FileText,
      color: 'blue',
      sourceFile: f,
    }));
    setUploadedDocuments(prev => [...mapped, ...prev]);
    setActionFeedback(`${mapped.length} document${mapped.length > 1 ? 's' : ''} uploaded.`);
  };

  const handleFileInputChange = (e) => {
    addFilesToDocuments(Array.from(e.target.files || []));
    e.target.value = '';
  };

  const handleUploadClick = async () => {
    setShowExportMenu(false);
    try {
      if ('showOpenFilePicker' in window) {
        const handles = await window.showOpenFilePicker({
          multiple: true,
          types: [{
            description: 'Health records',
            accept: {
              'application/pdf': ['.pdf'],
              'image/*': ['.png', '.jpg', '.jpeg'],
              'application/msword': ['.doc'],
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
              'text/plain': ['.txt'],
            },
          }],
        });
        addFilesToDocuments(await Promise.all(handles.map(h => h.getFile())));
        return;
      }
      fileInputRef.current?.click();
    } catch (err) {
      if (err?.name !== 'AbortError') setActionFeedback('Unable to open file picker.');
    }
  };

  // ── download / export helpers ───────────────────────────────────────────
  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: filename });
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  const saveBlobToFileSystem = async (blob, filename, mimeType) => {
    if (!('showSaveFilePicker' in window)) { downloadBlob(blob, filename); return; }
    const fh = await window.showSaveFilePicker({
      suggestedName: filename,
      types: [{ description: 'Document', accept: { [mimeType]: [`.${filename.split('.').pop()}`] } }],
    });
    const w = await fh.createWritable();
    await w.write(blob); await w.close();
  };

  // ── export builders (use backend records) ──
  const exportRows = () => records.map(r => ({
    Code:       r.recordCode,
    Type:       RECORD_TYPE_LABELS[r.recordType] || r.recordType,
    Status:     r.status,
    Provider:   r.providerName,
    VisitDate:  r.visitDate || '',
    Summary:    r.summary,
  }));

  const createCsvBlob = () => {
    const headers = ['Code', 'Type', 'Status', 'Provider', 'VisitDate', 'Summary'];
    const escape = v => { const t = String(v ?? ''); return (t.includes(',') || t.includes('"') || t.includes('\n')) ? `"${t.replace(/"/g, '""')}"` : t; };
    const lines = [headers.join(','), ...exportRows().map(r => headers.map(h => escape(r[h])).join(','))];
    return new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  };

  const createExcelBlob = () => {
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(exportRows()), 'HealthRecords');
    return new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  };

  const createPdfBlob = () => {
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    pdf.setFontSize(16); pdf.text('Health Records Export', 40, 40);
    pdf.setFontSize(10); pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 40, 58);
    autoTable(pdf, {
      startY: 74,
      head: [['Code', 'Type', 'Status', 'Provider', 'Visit Date']],
      body: records.map(r => [r.recordCode, RECORD_TYPE_LABELS[r.recordType] || r.recordType, r.status, r.providerName, r.visitDate || '']),
      styles: { fontSize: 9 },
    });
    return pdf.output('blob');
  };

  const createWordBlob = async () => {
    const cell = (text) => new TableCell({ children: [new Paragraph(String(text ?? ''))] });
    const headerCell = (text) => new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text, bold: true })] })] });

    const rows = [
      new TableRow({ children: ['Code', 'Type', 'Status', 'Provider', 'Visit Date'].map(headerCell) }),
      ...records.map(r => new TableRow({
        children: [r.recordCode, RECORD_TYPE_LABELS[r.recordType] || r.recordType, r.status, r.providerName, r.visitDate || ''].map(cell),
      })),
    ];

    const doc = new WordDocument({
      sections: [{
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Health Records Export', bold: true, size: 32 })] }),
          new Paragraph(`Generated: ${new Date().toLocaleString()}`),
          new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: 'Records', bold: true, size: 24 })] }),
          new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows }),
        ],
      }],
    });
    return Packer.toBlob(doc);
  };

  const exportConfig = {
    csv:  { extension: 'csv',  mimeType: 'text/csv',                                                                         label: 'CSV'   },
    xlsx: { extension: 'xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',                label: 'Excel' },
    pdf:  { extension: 'pdf',  mimeType: 'application/pdf',                                                                  label: 'PDF'   },
    docx: { extension: 'docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',          label: 'Word'  },
  };

  const handleExportByFormat = async (format) => {
    const cfg = exportConfig[format];
    const date = new Date().toISOString().slice(0, 10);
    const blob = format === 'csv' ? createCsvBlob()
               : format === 'xlsx' ? createExcelBlob()
               : format === 'pdf'  ? createPdfBlob()
               : await createWordBlob();
    setShowExportMenu(false);
    try {
      await saveBlobToFileSystem(blob, `health-records-${date}.${cfg.extension}`, cfg.mimeType);
      setActionFeedback(`Exported as ${cfg.label}.`);
    } catch (err) {
      if (err?.name !== 'AbortError') setActionFeedback('Export failed. Please try again.');
    }
  };

  // ── per-record share / download ─────────────────────────────────────────
  const buildRecordSummary = (r) => [
    `Type: ${RECORD_TYPE_LABELS[r.recordType] || r.recordType}`,
    `Status: ${r.status}`,
    `Provider: ${r.providerName}`,
    `Visit Date: ${r.visitDate || 'N/A'}`,
    r.summary ? `Summary: ${r.summary}` : '',
  ].filter(Boolean).join('\n');

  const createRecordPdfBlob = (r) => {
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    pdf.setFontSize(16); pdf.text('Health Record', 40, 44);
    pdf.setFontSize(10); pdf.text(`Generated: ${new Date().toLocaleString()}`, 40, 62);
    let y = 88;
    buildRecordSummary(r).split('\n').forEach(line => {
      const wrapped = pdf.splitTextToSize(line, 500);
      pdf.text(wrapped, 40, y);
      y += wrapped.length * 14;
    });
    return pdf.output('blob');
  };

  const handleRecordDownload = async (r) => {
    try {
      const blob = createRecordPdfBlob(r);
      await saveBlobToFileSystem(blob, `health-record-${r.id}.pdf`, 'application/pdf');
      setActionFeedback(`Downloaded record ${r.recordCode}.`);
    } catch (err) {
      if (err?.name !== 'AbortError') setActionFeedback('Download failed.');
    }
  };

  const copyText = async (text) => {
    if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return; }
    const ta = Object.assign(document.createElement('textarea'), { value: text });
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
  };

  const handleCopyRecordLink = async (r) => {
    try {
      await copyText(`${window.location.origin}${window.location.pathname}?record=${r.id}`);
      setActionFeedback('Link copied to clipboard.');
    } catch { setActionFeedback('Unable to copy link.'); }
    finally { setOpenShareMenuId(null); }
  };

  const handleCopyRecordSummary = async (r) => {
    try {
      await copyText(buildRecordSummary(r));
      setActionFeedback('Summary copied to clipboard.');
    } catch { setActionFeedback('Unable to copy summary.'); }
    finally { setOpenShareMenuId(null); }
  };

  const handleViewRecord = async (record) => {
    setShowRecordDetails(true);
    setSelectedRecord(record);
    setViewError('');

    if (!record?.id) return;

    try {
      setViewLoading(true);
      const fullRecord = await healthRecordService.getHealthRecordById(record.id);
      setSelectedRecord(fullRecord);
    } catch {
      setViewError('Could not load full details. Showing available information.');
    } finally {
      setViewLoading(false);
    }
  };

  // ── render helpers ──────────────────────────────────────────────────────
  const StatusBadge = ({ status }) => (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[status] || STATUS_BADGE.UNKNOWN}`}>
      {status}
    </span>
  );

  const RecordCard = ({ record }) => {
    const Icon = typeIcon(record.recordType);
    return (
      <div className="border border-gray-200 overflow-hidden rounded-sm">
        <div className="p-3 bg-gray-50 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 bg-blue-50 rounded flex-shrink-0">
              <Icon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {RECORD_TYPE_LABELS[record.recordType] || record.recordType}
              </p>
              <p className="text-xs text-gray-500 truncate">{record.providerName}</p>
            </div>
          </div>
          <StatusBadge status={record.status} />
        </div>

        <div className="p-3 bg-white border-t border-gray-200">
          {record.summary && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{record.summary}</p>
          )}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400">{record.visitDate || '—'}</span>
            <span className="text-xs text-gray-400 font-mono">{record.recordCode}</span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleViewRecord(record)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> View
            </button>
            <button
              type="button"
              onClick={() => handleRecordDownload(record)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            <div className="relative" data-share-menu-root>
              <button
                type="button"
                onClick={() => setOpenShareMenuId(prev => prev === record.id ? null : record.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                aria-haspopup="menu"
                aria-expanded={openShareMenuId === record.id}
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
              {openShareMenuId === record.id && (
                <div className="absolute left-0 bottom-full mb-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                  {[
                    { label: 'Copy Record Link',    action: () => handleCopyRecordLink(record) },
                    { label: 'Copy Summary',        action: () => handleCopyRecordSummary(record) },
                  ].map(({ label, action }) => (
                    <button key={label} type="button" onClick={action}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── loading / error states ──────────────────────────────────────────────
  if (loading && records.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 gap-3 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Loading health records…</span>
      </div>
    );
  }

  // ── main render ─────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Health Records</h1>
          {/* {totalRecords > 0 && (
            <p className="text-sm text-gray-500 mt-0.5">{totalRecords} record{totalRecords !== 1 ? 's' : ''} found</p>
          )} */}
        </div>

        <div className="flex flex-col items-stretch sm:items-end gap-2">
          <div className="flex gap-2">
            <button type="button" onClick={() => fetchRecords()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button type="button" onClick={handleUploadClick}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span>
            </button>
            <div className="relative" ref={exportMenuRef}>
              <button type="button" onClick={() => setShowExportMenu(p => !p)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                aria-haspopup="menu" aria-expanded={showExportMenu}>
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-lg z-20 overflow-hidden">
                  {Object.entries(exportConfig).map(([key, cfg]) => (
                    <button key={key} type="button" onClick={() => handleExportByFormat(key)}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      {cfg.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {actionFeedback && <p className="text-xs text-gray-600 sm:text-right">{actionFeedback}</p>}
          {error && (
            <p className="text-xs text-red-600 sm:text-right flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {error}
            </p>
          )}
          <input ref={fileInputRef} type="file" className="hidden" multiple
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt" onChange={handleFileInputChange} />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {[
          { label: 'Total Records',       value: totalRecords,          icon: <FileText className="w-5 h-5 text-blue-600" /> },
          { label: 'Consultations',       value: consultations.length,  icon: <Activity  className="w-5 h-5 text-blue-600" /> },
          { label: 'Prescriptions',       value: prescriptions.length,  icon: <Pill className="w-5 h-5 text-blue-600" /> },
          { label: 'Upcoming',            value: upcomingRecords.length, icon: <Calendar className="w-5 h-5 text-blue-600" /> },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white p-3 sm:p-4 shadow-sm border border-gray-200 rounded-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">{label}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1 leading-tight">{value}</p>
              </div>
              <div className="shrink-0 mt-0.5">{icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {['overview', 'medical-history', 'documents'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}>
              {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Overview Tab ── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Recent Records */}
          <div className="bg-white border border-gray-200 p-4 rounded-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Recent Records
            </h3>
            {recentRecords.length === 0
              ? <p className="text-sm text-gray-500">No records yet.</p>
              : (
                <div className="space-y-2">
                  {recentRecords.map(r => {
                    const Icon = typeIcon(r.recordType);
                    return (
                      <div key={r.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="p-1.5 bg-blue-50 rounded flex-shrink-0">
                            <Icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {RECORD_TYPE_LABELS[r.recordType] || r.recordType}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{r.providerName} • {r.visitDate}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => handleRecordDownload(r)}
                          className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0 ml-2"
                          aria-label="Download record">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
          </div>

          {/* Upcoming */}
          <div className="bg-white border border-gray-200 p-4 rounded-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" /> Upcoming
            </h3>
            {upcomingRecords.length === 0
              ? <p className="text-sm text-gray-500">No upcoming records.</p>
              : (
                <div className="space-y-2">
                  {upcomingRecords.map(r => (
                    <div key={r.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{RECORD_TYPE_LABELS[r.recordType] || r.recordType}</p>
                        <p className="text-xs text-gray-500">Due: {r.visitDate}</p>
                      </div>
                      <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* By Type breakdown */}
          <div className="bg-white border border-gray-200 p-4 rounded-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" /> By Type
            </h3>
            <div className="space-y-2">
              {Object.entries(RECORD_TYPE_LABELS).map(([key, label]) => {
                const count = records.filter(r => r.recordType === key).length;
                if (count === 0) return null;
                return (
                  <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{label}</span>
                    <span className="text-sm font-semibold text-blue-600">{count}</span>
                  </div>
                );
              })}
              {records.length === 0 && <p className="text-sm text-gray-500">No records loaded.</p>}
            </div>
          </div>

          {/* Uploaded Documents */}
          {uploadedDocuments.length > 0 && (
            <div className="bg-white border border-gray-200 p-4 rounded-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Folder className="w-4 h-4 text-blue-600" /> Uploaded Documents
              </h3>
              <div className="space-y-2">
                {uploadedDocuments.slice(0, 3).map(doc => {
                  const Icon = doc.icon;
                  return (
                    <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-1.5 bg-blue-50 rounded flex-shrink-0">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type} • {doc.date}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{doc.size}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Medical History Tab ── */}
      {activeTab === 'medical-history' && (
        <div className="bg-white border border-gray-200 rounded-sm">
          <div className="p-4 sm:p-6">
            {/* Search + filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search records…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option value="all">All Types</option>
                {Object.entries(RECORD_TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            {/* Grid */}
            {loading
              ? (
                <div className="flex items-center justify-center h-40 gap-2 text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin" /> Loading…
                </div>
              )
              : filteredHistory.length === 0
                ? <p className="text-sm text-gray-500 py-8 text-center">No records match your search.</p>
                : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredHistory.map(r => <RecordCard key={r.id} record={r} />)}
                  </div>
                )
            }
          </div>
        </div>
      )}

      {/* ── Documents Tab ── */}
      {activeTab === 'documents' && (
        <div className="bg-white border border-gray-200 rounded-sm">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Uploaded Documents</h3>
              <button type="button" onClick={handleUploadClick}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Upload className="w-4 h-4" /> Upload
              </button>
            </div>

            {uploadedDocuments.length === 0
              ? (
                <div className="text-center py-12 text-gray-400">
                  <Folder className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">No documents uploaded yet.</p>
                  <button type="button" onClick={handleUploadClick}
                    className="mt-3 text-sm text-blue-600 hover:underline">
                    Upload your first document
                  </button>
                </div>
              )
              : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {uploadedDocuments.map(doc => {
                    const Icon = doc.icon;
                    return (
                      <div key={doc.id} className="border border-gray-200 p-3 rounded-sm flex items-start gap-3 hover:bg-gray-50 transition-colors">
                        <div className="p-2 bg-blue-50 rounded flex-shrink-0">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                          <p className="text-xs text-gray-400">{doc.uploadedBy} • {doc.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            }
          </div>
        </div>
      )}

      {/* ── Record Details Modal ── */}
      {showRecordDetails && selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Record Details</h3>
                <p className="text-sm text-gray-500">
                  {RECORD_TYPE_LABELS[selectedRecord.recordType] || selectedRecord.recordType}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowRecordDetails(false);
                  setSelectedRecord(null);
                  setViewError('');
                }}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Close
              </button>
            </div>

            <div className="p-4 space-y-4">
              {viewLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading full details...
                </div>
              )}

              {viewError && (
                <div className="text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded p-3">
                  {viewError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-gray-500">Record Code</p>
                  <p className="font-medium text-gray-900">{selectedRecord.recordCode || '—'}</p>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium text-gray-900">{selectedRecord.status || '—'}</p>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-gray-500">Provider</p>
                  <p className="font-medium text-gray-900">{selectedRecord.providerName || '—'}</p>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-gray-500">Visit Date</p>
                  <p className="font-medium text-gray-900">{selectedRecord.visitDate || '—'}</p>
                </div>
              </div>

              {getRecordField(selectedRecord, 'summary') && (
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Summary</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded p-3">
                    {getRecordField(selectedRecord, 'summary')}
                  </p>
                </div>
              )}

              {getRecordField(selectedRecord, 'notes') && (
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Clinical Notes</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded p-3 whitespace-pre-wrap">
                    {getRecordField(selectedRecord, 'notes')}
                  </p>
                </div>
              )}

              {(selectedRecord.recordType === 'PRESCRIPTION' || getRecordField(selectedRecord, 'medicationName', 'dosage', 'frequency', 'durationText')) && (
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Prescription Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-gray-500">Medication</p>
                      <p className="font-medium text-gray-900">{getRecordField(selectedRecord, 'medicationName') || '—'}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-gray-500">Dosage</p>
                      <p className="font-medium text-gray-900">{getRecordField(selectedRecord, 'dosage') || '—'}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-gray-500">Frequency</p>
                      <p className="font-medium text-gray-900">{getRecordField(selectedRecord, 'frequency') || '—'}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-gray-500">Duration</p>
                      <p className="font-medium text-gray-900">{getRecordField(selectedRecord, 'durationText') || '—'}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-gray-500">Refills Remaining</p>
                      <p className="font-medium text-gray-900">{getRecordField(selectedRecord, 'refillsRemaining') ?? '—'}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-gray-500">Total Refills</p>
                      <p className="font-medium text-gray-900">{getRecordField(selectedRecord, 'totalRefills') ?? '—'}</p>
                    </div>
                  </div>
                </div>
              )}

              {(selectedRecord.recordType === 'CONSULTATION' || getRecordField(selectedRecord, 'diagnosis', 'providerSpecialty')) && (
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Consultation Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-gray-500">Diagnosis</p>
                      <p className="font-medium text-gray-900">{getRecordField(selectedRecord, 'diagnosis') || '—'}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-gray-500">Specialty</p>
                      <p className="font-medium text-gray-900">{getRecordField(selectedRecord, 'providerSpecialty') || '—'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HealthRecords;