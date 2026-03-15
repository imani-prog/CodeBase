import { useEffect, useRef, useState } from 'react';
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
  Image, FileCheck, Folder, TrendingUp, Eye
} from 'lucide-react';

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [medicalHistoryFilter, setMedicalHistoryFilter] = useState('all');
  const [openShareMenuRecordId, setOpenShareMenuRecordId] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [actionFeedback, setActionFeedback] = useState('');
  const fileInputRef = useRef(null);
  const exportMenuRef = useRef(null);

  // Sample health data - replace with actual API data
  // Documents uploaded by healthcare providers or patients
  const [uploadedDocuments, setUploadedDocuments] = useState([
    { 
      id: 1, 
      name: 'Medical Certificate', 
      type: 'Medical Document', 
      uploadedBy: 'Dr. Sarah Johnson',
      date: '2025-11-20', 
      size: '0.8 MB',
      category: 'report',
      icon: FileCheck,
      color: 'blue'
    },
    { 
      id: 2, 
      name: 'Consultation Notes', 
      type: 'Medical Report', 
      uploadedBy: 'Dr. Sarah Johnson',
      date: '2025-11-18', 
      size: '0.5 MB',
      category: 'report',
      icon: FileText,
      color: 'blue'
    },
    { 
      id: 3, 
      name: 'Prescription - Cetirizine', 
      type: 'Prescription', 
      uploadedBy: 'Dr. Sarah Johnson',
      date: '2025-10-15', 
      size: '0.3 MB',
      category: 'prescription',
      icon: Pill,
      color: 'blue'
    },
    { 
      id: 4, 
      name: 'Vaccination Record Card', 
      type: 'Vaccination Record', 
      uploadedBy: 'Patient Upload',
      date: '2025-10-01', 
      size: '1.2 MB',
      category: 'vaccination',
      icon: File,
      color: 'blue'
    },
    { 
      id: 5, 
      name: 'Insurance Card Copy', 
      type: 'Insurance Document', 
      uploadedBy: 'Patient Upload',
      date: '2025-09-15', 
      size: '0.6 MB',
      category: 'insurance',
      icon: FileText,
      color: 'blue'
    },
  ]);

  const healthSummary = [
    {
      id: 1,
      category: 'Allergies',
      items: ['Pollen', 'Dust mites'],
      severity: 'Moderate',
      icon: AlertCircle,
      color: 'blue'
    },
    {
      id: 2,
      category: 'Chronic Conditions',
      items: ['None reported'],
      severity: 'N/A',
      icon: CheckCircle,
      color: 'blue'
    },
    {
      id: 3,
      category: 'Blood Type',
      items: ['O Positive'],
      severity: 'N/A',
      icon: Activity,
      color: 'blue'
    },
  ];

  const medicalHistory = [
    {
      id: 1,
      date: '2025-10-15',
      type: 'Consultation',
      provider: 'Dr. Sarah Johnson',
      specialty: 'General Practitioner',
      diagnosis: 'Seasonal Allergies',
      notes: 'Patient presented with mild respiratory symptoms. Prescribed antihistamines.',
      status: 'completed'
    },
    {
      id: 2,
      date: '2025-09-08',
      type: 'Vaccination',
      provider: 'Community Health Worker',
      vaccine: 'Tetanus Booster',
      notes: 'Vaccination administered at community health outreach.',
      status: 'completed'
    },
    {
      id: 3,
      date: '2025-08-22',
      type: 'Vaccination',
      provider: 'Dr. Michael Brown',
      vaccine: 'Influenza Vaccine',
      notes: 'Annual flu shot administered. No adverse reactions.',
      status: 'completed'
    },
  ];

  const prescriptions = [
    {
      id: 1,
      medication: 'Cetirizine',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2025-10-15',
      duration: '30 days',
      status: 'active',
      refills: 2
    },
    {
      id: 2,
      medication: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2025-09-01',
      duration: '90 days',
      status: 'active',
      refills: 1
    },
  ];

  const upcomingVaccinations = [
    { name: 'Tetanus Booster', dueDate: '2026-03-15', status: 'upcoming' },
    { name: 'COVID-19 Booster', dueDate: '2026-05-20', status: 'upcoming' },
  ];

  useEffect(() => {
    if (!actionFeedback) return undefined;

    const timeoutId = setTimeout(() => {
      setActionFeedback('');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [actionFeedback]);

  useEffect(() => {
    if (!showExportMenu) return undefined;

    const handleOutsideClick = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showExportMenu]);

  useEffect(() => {
    if (openShareMenuRecordId === null) return undefined;

    const handleOutsideClick = (event) => {
      if (!event.target.closest('[data-share-menu-root]')) {
        setOpenShareMenuRecordId(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [openShareMenuRecordId]);

  const getDocumentCategory = (fileName) => {
    const lowerName = fileName.toLowerCase();

    if (lowerName.includes('prescription')) return 'prescription';
    if (lowerName.includes('vaccine') || lowerName.includes('vaccination')) return 'vaccination';
    if (lowerName.includes('insurance')) return 'insurance';

    return 'report';
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex += 1;
    }

    const value = unitIndex === 0 ? size.toFixed(0) : size.toFixed(1);
    return `${value} ${units[unitIndex]}`;
  };

  const getDocumentType = (file) => {
    if (file.type.startsWith('image/')) return 'Medical Image';
    if (file.type === 'application/pdf') return 'Medical PDF';
    if (file.type.includes('word')) return 'Medical Document';
    if (file.type.includes('text')) return 'Text Report';
    return 'Medical File';
  };

  const getDocumentIcon = (file) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type === 'application/pdf') return FileCheck;
    return FileText;
  };

  const addFilesToDocuments = (files) => {
    if (!files.length) return;

    const today = new Date().toISOString().slice(0, 10);
    const mappedDocuments = files.map((file) => ({
      id: `${Date.now()}-${file.name}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      type: getDocumentType(file),
      uploadedBy: 'Patient Upload',
      date: today,
      size: formatFileSize(file.size),
      category: getDocumentCategory(file.name),
      icon: getDocumentIcon(file),
      color: 'blue',
      sourceFile: file
    }));

    setUploadedDocuments((prev) => [...mappedDocuments, ...prev]);
    setActionFeedback(`${mappedDocuments.length} document${mappedDocuments.length > 1 ? 's' : ''} uploaded successfully.`);
  };

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files || []);
    addFilesToDocuments(files);
    event.target.value = '';
  };

  const handleUploadClick = async () => {
    setShowExportMenu(false);

    try {
      if ('showOpenFilePicker' in window) {
        const fileHandles = await window.showOpenFilePicker({
          multiple: true,
          types: [
            {
              description: 'Health records',
              accept: {
                'application/pdf': ['.pdf'],
                'image/*': ['.png', '.jpg', '.jpeg'],
                'application/msword': ['.doc'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                'text/plain': ['.txt']
              }
            }
          ]
        });

        const files = await Promise.all(fileHandles.map((fileHandle) => fileHandle.getFile()));
        addFilesToDocuments(files);
        return;
      }

      fileInputRef.current?.click();
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setActionFeedback('Unable to open file picker. Please try again.');
      }
    }
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const saveBlobToFileSystem = async (blob, filename, mimeType) => {
    if (!('showSaveFilePicker' in window)) {
      downloadBlob(blob, filename);
      return;
    }

    const fileHandle = await window.showSaveFilePicker({
      suggestedName: filename,
      types: [
        {
          description: 'Document file',
          accept: {
            [mimeType]: [`.${filename.split('.').pop()}`]
          }
        }
      ]
    });

    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();
  };

  const getDownloadFileName = (name, extension = 'txt') => {
    const trimmed = String(name || 'document').trim();
    const hasExtension = /\.[A-Za-z0-9]+$/.test(trimmed);
    const sanitized = trimmed.replace(/[^a-zA-Z0-9._-]+/g, '_');
    return hasExtension ? sanitized : `${sanitized}.${extension}`;
  };

  const handleDocumentDownload = async (document) => {
    const sourceFile = document?.sourceFile;

    if (sourceFile && typeof sourceFile.arrayBuffer === 'function') {
      const filename = getDownloadFileName(sourceFile.name || document.name);

      try {
        await saveBlobToFileSystem(sourceFile, filename, sourceFile.type || 'application/octet-stream');
        setActionFeedback(`Downloaded ${document.name}.`);
      } catch (error) {
        if (error?.name !== 'AbortError') {
          setActionFeedback('Download failed. Please try again.');
        }
      }

      return;
    }

    const placeholderContent = [
      'MediLink Document Export',
      `Name: ${document.name}`,
      `Type: ${document.type}`,
      `Uploaded By: ${document.uploadedBy}`,
      `Date: ${document.date}`,
      `Size: ${document.size}`,
      '',
      'This is a generated placeholder for seeded demo records.'
    ].join('\n');

    const blob = new Blob([placeholderContent], { type: 'text/plain;charset=utf-8;' });

    try {
      await saveBlobToFileSystem(blob, getDownloadFileName(document.name, 'txt'), 'text/plain');
      setActionFeedback(`Downloaded ${document.name}.`);
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setActionFeedback('Download failed. Please try again.');
      }
    }
  };

  const getDocumentExportRows = () => uploadedDocuments.map((document) => ({
    Name: document.name,
    Type: document.type,
    Category: document.category,
    UploadedBy: document.uploadedBy,
    Date: document.date,
    Size: document.size
  }));

  const escapeCsv = (value) => {
    const text = String(value ?? '');

    if (text.includes(',') || text.includes('"') || text.includes('\n')) {
      return `"${text.replace(/"/g, '""')}"`;
    }

    return text;
  };

  const createCsvBlob = () => {
    const rows = getDocumentExportRows();
    const headers = ['Name', 'Type', 'Category', 'UploadedBy', 'Date', 'Size'];
    const lines = [
      headers.join(','),
      ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(','))
    ];

    return new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  };

  const createExcelBlob = () => {
    const workbook = XLSX.utils.book_new();
    const documentSheet = XLSX.utils.json_to_sheet(getDocumentExportRows());
    const prescriptionSheet = XLSX.utils.json_to_sheet(
      prescriptions.map((prescription) => ({
        Medication: prescription.medication,
        Dosage: prescription.dosage,
        Frequency: prescription.frequency,
        PrescribedBy: prescription.prescribedBy,
        StartDate: prescription.startDate,
        Duration: prescription.duration,
        Status: prescription.status,
        Refills: prescription.refills
      }))
    );
    const historySheet = XLSX.utils.json_to_sheet(
      medicalHistory.map((record) => ({
        Date: record.date,
        Type: record.type,
        Provider: record.provider,
        Specialty: record.specialty || '',
        Diagnosis: record.diagnosis || '',
        Vaccine: record.vaccine || '',
        Notes: record.notes || '',
        Status: record.status
      }))
    );

    XLSX.utils.book_append_sheet(workbook, documentSheet, 'Documents');
    XLSX.utils.book_append_sheet(workbook, prescriptionSheet, 'Prescriptions');
    XLSX.utils.book_append_sheet(workbook, historySheet, 'MedicalHistory');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
  };

  const createPdfBlob = () => {
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const exportDate = new Date().toLocaleDateString();

    pdf.setFontSize(16);
    pdf.text('Health Records Export', 40, 40);
    pdf.setFontSize(10);
    pdf.text(`Generated: ${exportDate}`, 40, 58);

    autoTable(pdf, {
      startY: 74,
      head: [['Name', 'Type', 'Category', 'Date']],
      body: uploadedDocuments.map((document) => [
        document.name,
        document.type,
        document.category,
        document.date
      ]),
      styles: { fontSize: 9 }
    });

    const finalY = pdf.lastAutoTable?.finalY || 110;
    autoTable(pdf, {
      startY: finalY + 16,
      head: [['Medication', 'Dosage', 'Frequency', 'Status']],
      body: prescriptions.map((prescription) => [
        prescription.medication,
        prescription.dosage,
        prescription.frequency,
        prescription.status
      ]),
      styles: { fontSize: 9 }
    });

    return pdf.output('blob');
  };

  const createWordBlob = async () => {
    const headerCellStyle = { width: { size: 25, type: WidthType.PERCENTAGE } };
    const sectionTitle = (title) => new Paragraph({
      spacing: { before: 220, after: 140 },
      children: [new TextRun({ text: title, bold: true, size: 24 })]
    });

    const documentRows = [
      new TableRow({
        children: [
          new TableCell({ ...headerCellStyle, children: [new Paragraph('Name')] }),
          new TableCell({ ...headerCellStyle, children: [new Paragraph('Type')] }),
          new TableCell({ ...headerCellStyle, children: [new Paragraph('Category')] }),
          new TableCell({ ...headerCellStyle, children: [new Paragraph('Date')] })
        ]
      }),
      ...uploadedDocuments.map((document) => new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(document.name)] }),
          new TableCell({ children: [new Paragraph(document.type)] }),
          new TableCell({ children: [new Paragraph(document.category)] }),
          new TableCell({ children: [new Paragraph(document.date)] })
        ]
      }))
    ];

    const prescriptionRows = [
      new TableRow({
        children: [
          new TableCell({ ...headerCellStyle, children: [new Paragraph('Medication')] }),
          new TableCell({ ...headerCellStyle, children: [new Paragraph('Dosage')] }),
          new TableCell({ ...headerCellStyle, children: [new Paragraph('Frequency')] }),
          new TableCell({ ...headerCellStyle, children: [new Paragraph('Status')] })
        ]
      }),
      ...prescriptions.map((prescription) => new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(prescription.medication)] }),
          new TableCell({ children: [new Paragraph(prescription.dosage)] }),
          new TableCell({ children: [new Paragraph(prescription.frequency)] }),
          new TableCell({ children: [new Paragraph(prescription.status)] })
        ]
      }))
    ];

    const report = new WordDocument({
      sections: [
        {
          children: [
            new Paragraph({
              spacing: { after: 180 },
              children: [new TextRun({ text: 'Health Records Export', bold: true, size: 32 })]
            }),
            new Paragraph(`Generated: ${new Date().toLocaleString()}`),
            sectionTitle('Documents'),
            new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: documentRows }),
            sectionTitle('Prescriptions'),
            new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: prescriptionRows })
          ]
        }
      ]
    });

    return Packer.toBlob(report);
  };

  const buildMedicalHistorySummary = (record) => [
    `Type: ${record.type}`,
    `Provider: ${record.provider}${record.specialty ? ` - ${record.specialty}` : ''}`,
    `Date: ${record.date}`,
    record.diagnosis ? `Diagnosis: ${record.diagnosis}` : '',
    record.vaccine ? `Vaccine: ${record.vaccine}` : '',
    record.notes ? `Notes: ${record.notes}` : ''
  ].filter(Boolean).join('\n');

  const createMedicalHistoryPdfBlob = (record) => {
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const lines = buildMedicalHistorySummary(record).split('\n');

    pdf.setFontSize(16);
    pdf.text('Medical History Record', 40, 44);
    pdf.setFontSize(10);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 40, 62);

    let y = 88;
    lines.forEach((line) => {
      const wrapped = pdf.splitTextToSize(line, 500);
      pdf.text(wrapped, 40, y);
      y += wrapped.length * 14;
    });

    return pdf.output('blob');
  };

  const createMedicalHistoryTextBlob = (record) => new Blob([
    'MediLink Medical History Record\n',
    `${buildMedicalHistorySummary(record)}\n`
  ], { type: 'text/plain;charset=utf-8;' });

  const getMedicalHistoryFileBaseName = (record) => {
    const safeType = String(record.type || 'record').replace(/[^a-zA-Z0-9_-]+/g, '-').toLowerCase();
    return `medical-history-${record.id}-${safeType}`;
  };

  const copyTextToClipboard = async (text) => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  };

  const shareOrDownloadFile = async ({ blob, fileName, fallbackMessage }) => {
    const ShareFile = globalThis.File;

    if (
      typeof navigator.share === 'function' &&
      typeof navigator.canShare === 'function' &&
      typeof ShareFile === 'function'
    ) {
      const file = new ShareFile([blob], fileName, { type: blob.type || 'application/octet-stream' });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'MediLink Record',
          text: 'Shared from MediLink Health Records',
          files: [file]
        });
        setActionFeedback(`Shared ${fileName}.`);
        return;
      }
    }

    await saveBlobToFileSystem(blob, fileName, blob.type || 'application/octet-stream');
    setActionFeedback(fallbackMessage);
  };

  const handleMedicalHistoryDownload = async (record) => {
    try {
      const blob = createMedicalHistoryPdfBlob(record);
      const fileName = `${getMedicalHistoryFileBaseName(record)}.pdf`;
      await saveBlobToFileSystem(blob, fileName, 'application/pdf');
      setActionFeedback(`Downloaded ${record.type} record.`);
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setActionFeedback('Download failed. Please try again.');
      }
    }
  };

  const handleShareMedicalHistoryPdf = async (record) => {
    try {
      const blob = createMedicalHistoryPdfBlob(record);
      const fileName = `${getMedicalHistoryFileBaseName(record)}.pdf`;
      await shareOrDownloadFile({
        blob,
        fileName,
        fallbackMessage: 'Sharing is not supported on this browser. PDF was downloaded instead.'
      });
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setActionFeedback('Unable to share this record.');
      }
    } finally {
      setOpenShareMenuRecordId(null);
    }
  };

  const handleShareMedicalHistoryText = async (record) => {
    try {
      const blob = createMedicalHistoryTextBlob(record);
      const fileName = `${getMedicalHistoryFileBaseName(record)}.txt`;
      await shareOrDownloadFile({
        blob,
        fileName,
        fallbackMessage: 'Sharing is not supported on this browser. Text file was downloaded instead.'
      });
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setActionFeedback('Unable to share this record.');
      }
    } finally {
      setOpenShareMenuRecordId(null);
    }
  };

  const handleCopyMedicalHistoryLink = async (record) => {
    try {
      const link = `${window.location.origin}${window.location.pathname}?record=${record.id}`;
      await copyTextToClipboard(link);
      setActionFeedback('Record link copied to clipboard.');
    } catch {
      setActionFeedback('Unable to copy link.');
    } finally {
      setOpenShareMenuRecordId(null);
    }
  };

  const handleCopyMedicalHistorySummary = async (record) => {
    try {
      await copyTextToClipboard(buildMedicalHistorySummary(record));
      setActionFeedback('Record summary copied to clipboard.');
    } catch {
      setActionFeedback('Unable to copy summary.');
    } finally {
      setOpenShareMenuRecordId(null);
    }
  };

  const normalizedMedicalSearchQuery = searchQuery.trim().toLowerCase();
  const filteredMedicalHistory = medicalHistory.filter((record) => {
    const matchesCategory = medicalHistoryFilter === 'all' || record.type === medicalHistoryFilter;

    if (!matchesCategory) return false;
    if (!normalizedMedicalSearchQuery) return true;

    const searchableText = [
      record.type,
      record.provider,
      record.specialty,
      record.diagnosis,
      record.vaccine,
      record.notes,
      record.date,
      record.status
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedMedicalSearchQuery);
  });

  const exportConfig = {
    csv: {
      extension: 'csv',
      mimeType: 'text/csv',
      label: 'CSV'
    },
    xlsx: {
      extension: 'xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      label: 'Excel'
    },
    pdf: {
      extension: 'pdf',
      mimeType: 'application/pdf',
      label: 'PDF'
    },
    docx: {
      extension: 'docx',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      label: 'Word'
    }
  };

  const getExportBlobByFormat = async (format) => {
    if (format === 'csv') return createCsvBlob();
    if (format === 'xlsx') return createExcelBlob();
    if (format === 'pdf') return createPdfBlob();
    return createWordBlob();
  };

  const handleExportClick = () => {
    setShowExportMenu((prev) => !prev);
  };

  const handleExportByFormat = async (format) => {
    const exportDate = new Date().toISOString().slice(0, 10);
    const selectedConfig = exportConfig[format];
    const fileName = `health-records-${exportDate}.${selectedConfig.extension}`;
    const exportBlob = await getExportBlobByFormat(format);
    setShowExportMenu(false);

    try {
      if ('showSaveFilePicker' in window) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: `${selectedConfig.label} file`,
              accept: {
                [selectedConfig.mimeType]: [`.${selectedConfig.extension}`]
              }
            }
          ]
        });

        const writable = await fileHandle.createWritable();
        await writable.write(exportBlob);
        await writable.close();
      } else {
        downloadBlob(exportBlob, fileName);
      }

      setActionFeedback(`Exported as ${selectedConfig.label}.`);
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setActionFeedback('Export failed. Please try again.');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      case 'active': return 'text-blue-600';
      case 'completed': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Health Records</h1>
          <p className="mt-2">
            Comprehensive view of your medical history, lab results, and vital signs
          </p>
        </div>
        <div className="flex flex-col items-stretch sm:items-end gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleUploadClick}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span>
            </button>
            <div className="relative" ref={exportMenuRef}>
              <button
                type="button"
                onClick={handleExportClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                aria-haspopup="menu"
                aria-expanded={showExportMenu}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
              </button>

              {showExportMenu && (
                <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-44 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white shadow-lg z-20 overflow-hidden">
                  {Object.entries(exportConfig).map(([key, config]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleExportByFormat(key)}
                      className="w-full text-left px-4 py-3 text-sm whitespace-nowrap text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {actionFeedback && <p className="text-xs text-gray-600 sm:text-right">{actionFeedback}</p>}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
            onChange={handleFileInputChange}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white p-3 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total Records</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">24</p>
            </div>
            <FileText className="w-7 h-7 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-3 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Active Prescriptions</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{prescriptions.filter(p => p.status === 'active').length}</p>
            </div>
            <Pill className="w-7 h-7 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-3 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Upcoming Vaccinations</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{upcomingVaccinations.length}</p>
            </div>
            <Calendar className="w-7 h-7 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-3 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Last Checkup</p>
              <p className="text-xs font-semibold text-gray-900 mt-0.5">Oct 15, 2025</p>
            </div>
            <CheckCircle className="w-7 h-7 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {['overview', 'prescriptions', 'medical-history'].map((tab) => (
            

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Recent Documents */}
          <div className="bg-white shadow-sm border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-600" />
              Recent Documents
            </h3>
            <div className="space-y-2">
              {uploadedDocuments.slice(0, 3).map((doc) => {
                const Icon = doc.icon;
                return (
                  <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 ${doc.color} rounded`}>
                        <Icon className={`w-4 h-4 text-${doc.color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-600">{doc.type} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{doc.size}</span>
                      <button
                        type="button"
                        onClick={() => handleDocumentDownload(doc)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label={`Download ${doc.name}`}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Health Summary */}
          <div className="bg-white shadow-sm border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Health Summary
            </h3>
            <div className="space-y-2">
              {healthSummary.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className={`p-1.5 ${item.color} rounded flex-shrink-0`}>
                        <Icon className={`w-4 h-4 text-${item.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className="text-sm font-medium text-gray-900">{item.category}</p>
                          {item.severity !== 'N/A' && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                              {item.severity}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{item.items.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Prescriptions */}
          <div className="bg-white shadow-sm border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Pill className="w-4 h-4 text-blue-600" />
              Active Prescriptions
            </h3>
            <div className="space-y-2">
              {prescriptions.filter(p => p.status === 'active').map((prescription) => (
                <div key={prescription.id} className="p-2 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{prescription.medication}</p>
                      <p className="text-xs text-gray-600">{prescription.dosage} - {prescription.frequency}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(prescription.status)}`}>
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Refills remaining: {prescription.refills}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Vaccinations */}
          <div className="bg-white shadow-sm border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Upcoming Vaccinations
            </h3>
            <div className="space-y-2">
              {upcomingVaccinations.map((vaccination, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{vaccination.name}</p>
                    <p className="text-xs text-gray-600">Due: {vaccination.dueDate}</p>
                  </div>
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Medical History */}
          <div className="bg-white shadow-sm border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Recent Medical History
            </h3>
            <div className="space-y-2">
              {medicalHistory.slice(0, 2).map((record) => (
                <div key={record.id} className="p-2 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{record.type}</p>
                      <p className="text-xs text-gray-600">{record.provider}</p>
                    </div>
                    <p className="text-xs text-gray-500">{record.date}</p>
                  </div>
                  <p className="text-xs text-gray-700">
                    {record.diagnosis || record.testName || record.vaccine}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Medical History Tab */}
      {activeTab === 'medical-history' && (
        <div className="bg-white shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medical records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
              <select
                value={medicalHistoryFilter}
                onChange={(e) => setMedicalHistoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              >
                <option value="all">All Records</option>
                <option value="Consultation">Consultations</option>
                <option value="Vaccination">Vaccinations</option>
                <option value="Referral">Referrals</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredMedicalHistory.map((record) => (
                <div key={record.id} className="border border-gray-200 overflow-hidden">
                  <div className="p-3 bg-gray-50">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded flex-shrink-0">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{record.type}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 truncate">{record.provider} {record.specialty && `- ${record.specialty}`}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{record.date}</div>
                    </div>
                  </div>
                  <div className="p-3 bg-white border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {record.diagnosis && (
                        <div>
                          <p className="text-xs font-medium text-gray-700">Diagnosis</p>
                          <p className="text-sm text-gray-900">{record.diagnosis}</p>
                        </div>
                      )}
                      {record.vaccine && (
                        <div>
                          <p className="text-xs font-medium text-gray-700">Vaccine</p>
                          <p className="text-sm text-gray-900">{record.vaccine}</p>
                        </div>
                      )}
                    </div>
                    {record.notes && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-gray-700 mb-1">Notes</p>
                        <p className="text-sm text-gray-600">{record.notes}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleMedicalHistoryDownload(record)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                      <div className="relative" data-share-menu-root>
                        <button
                          type="button"
                          onClick={() => setOpenShareMenuRecordId((prev) => (prev === record.id ? null : record.id))}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          aria-haspopup="menu"
                          aria-expanded={openShareMenuRecordId === record.id}
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          Share
                        </button>

                        {openShareMenuRecordId === record.id && (
                          <div className="absolute left-0 bottom-full mb-2 w-52 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => handleShareMedicalHistoryPdf(record)}
                              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              Share as PDF
                            </button>
                            <button
                              type="button"
                              onClick={() => handleShareMedicalHistoryText(record)}
                              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              Share as Text
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopyMedicalHistoryLink(record)}
                              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              Copy Record Link
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopyMedicalHistorySummary(record)}
                              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              Copy Summary
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredMedicalHistory.length === 0 && (
                <div className="col-span-full border border-gray-200 bg-white p-6 text-sm text-gray-600">
                  No medical records match your current search and filter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Prescriptions Tab */}
      {activeTab === 'prescriptions' && (
        <div className="border border-gray-200">
          <div className="p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Current Prescriptions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="border border-gray-200 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <div className="p-1.5 rounded flex-shrink-0">
                        <Pill className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{prescription.medication}</h4>
                        <p className="text-xs text-gray-600">{prescription.dosage} - {prescription.frequency}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${getStatusColor(prescription.status)}`}>
                      {prescription.status}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs mb-2">
                    <div>
                      <p className="text-gray-500">Prescribed By</p>
                      <p className="font-medium text-gray-900 truncate">{prescription.prescribedBy}</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <p className="text-gray-500">Start Date</p>
                        <p className="font-medium text-gray-900">{prescription.startDate}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium text-gray-900">{prescription.duration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">{prescription.refills}</span> refills left
                    </p>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Request Refill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default HealthRecords;
