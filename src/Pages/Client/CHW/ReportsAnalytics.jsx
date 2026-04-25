import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';
import {
  Users, Download, FileText, CheckCircle,
  Clock, AlertCircle, X, ArrowUpRight, ArrowDownRight,
  HeartPulse, Activity, RefreshCw,
} from 'lucide-react';
import { getAccessToken, getApiBaseUrl } from '../../../API/clients/httpClient.js';
import { reportService } from '../../../Services/domain/reportService.js';
import { homeVisitService } from '../../../Services/domain/homeVisitService.js';
import { assignmentService } from '../../../Services/domain/assignmentService.js';
import { chwService } from '../../../Services/domain/chwService.js';
import { refreshAppointmentGovernanceSnapshot } from '../../../Services/appointmentGovernanceStore';
import { useAuth } from '../../../hooks/useAuth.jsx';

Chart.register(...registerables);

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CATEGORY_COLORS = ['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

const typeColor = {
  Performance: 'bg-blue-50 text-blue-700',
  Outcomes:    'bg-emerald-50 text-emerald-700',
  Activity:    'bg-indigo-50 text-indigo-800',
  Assessment:  'bg-amber-50 text-amber-700',
};

const reportTypes = [
  { id:'overview', label:'Overview' },
  { id:'patients', label:'Patients' },
  { id:'visits',   label:'Visits'   },
  { id:'outcomes', label:'Outcomes' },
];

/* ─── helpers ─── */
function normalizeListPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function toNumericId(value) {
  if (value == null) return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const match = String(value).trim().match(/\d+/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

function safeTime(value) {
  if (!value) return null;
  const ts = Date.parse(value);
  if (Number.isNaN(ts)) return null;
  return ts;
}

function monthRange(baseDate, offset = 0) {
  return {
    start: new Date(baseDate.getFullYear(), baseDate.getMonth() + offset, 1).getTime(),
    end: new Date(baseDate.getFullYear(), baseDate.getMonth() + offset + 1, 1).getTime(),
  };
}

function inRange(value, range) {
  const ts = safeTime(value);
  if (ts == null) return false;
  return ts >= range.start && ts < range.end;
}

function toLabel(value, fallback = 'Overview') {
  const text = String(value || '').trim();
  if (!text) return fallback;
  return text
    .toLowerCase()
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatPeriod(fromDate, toDate, dateRange) {
  if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (!Number.isNaN(from.getTime()) && !Number.isNaN(to.getTime())) {
      return `${from.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })} - ${to.toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
  }
  if (dateRange) return toLabel(dateRange, 'Current Period');
  return 'Current Period';
}

function safePatientKey(...values) {
  for (const value of values) {
    if (value == null) continue;
    const text = String(value).trim();
    if (!text) continue;
    return text.toLowerCase();
  }
  return null;
}

function getChwIdCandidates(user, chwProfile) {
  const rawCandidates = [
    chwProfile?.id,
    chwProfile?.chwId,
    chwProfile?.user?.id,
    user?.chwId,
    user?.providerId,
    user?.employeeId,
    user?.id,
    user?.userId,
    toNumericId(chwProfile?.id),
    toNumericId(chwProfile?.user?.id),
    toNumericId(user?.chwId),
    toNumericId(user?.providerId),
    toNumericId(user?.employeeId),
    toNumericId(user?.id),
    toNumericId(user?.userId),
  ];

  const unique = new Set();
  rawCandidates.forEach((value) => {
    if (value == null) return;
    const text = String(value).trim();
    if (!text) return;
    unique.add(text);

    const numeric = toNumericId(text);
    if (numeric != null) unique.add(String(numeric));
  });

  return Array.from(unique);
}

function hasAnyIdentifier(...values) {
  return values.some((value) => {
    if (value == null) return false;
    return String(value).trim().length > 0;
  });
}

function hasAnyChwIdMatch(chwIdLookup, ...values) {
  if (!chwIdLookup || chwIdLookup.size === 0) return false;

  for (const value of values) {
    if (value == null) continue;
    const text = String(value).trim();
    if (!text) continue;
    if (chwIdLookup.has(text)) return true;

    const numeric = toNumericId(text);
    if (numeric != null && chwIdLookup.has(String(numeric))) return true;
  }

  return false;
}

function buildDelta(current, previous, higherIsBetter = true) {
  if (!Number.isFinite(current) || !Number.isFinite(previous)) {
    return { text: '0%', direction: 'up', positive: true };
  }

  const base = previous === 0 ? (current === 0 ? 0 : 100) : ((current - previous) / Math.abs(previous)) * 100;
  const rounded = Number(base.toFixed(0));
  const direction = rounded >= 0 ? 'up' : 'down';
  const positive = higherIsBetter ? rounded >= 0 : rounded <= 0;

  return {
    text: `${rounded >= 0 ? '+' : ''}${rounded}%`,
    direction,
    positive,
  };
}

function getReportPayload(row = {}) {
  return {
    id: row.id ?? row.reportId ?? null,
    downloadUrl: row.downloadUrl || row.fileUrl || row.url || null,
    fileBase64: row.fileBase64 || row.base64 || null,
    fileBytes: Array.isArray(row.fileBytes) ? row.fileBytes : (Array.isArray(row.bytes) ? row.bytes : null),
    content: typeof row.fileContent === 'string'
      ? row.fileContent
      : (typeof row.content === 'string' ? row.content : (typeof row.data === 'string' ? row.data : null)),
    format: String(row.format || row.fileType || 'csv').toLowerCase(),
    fileName: row.fileName || row.name || null,
  };
}

function mimeTypeForFormat(format) {
  const value = String(format || '').toLowerCase();
  if (value === 'pdf') return 'application/pdf';
  if (value === 'xlsx' || value === 'excel') return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  if (value === 'csv') return 'text/csv;charset=utf-8';
  return 'text/plain;charset=utf-8';
}

function mapReportRow(row = {}, index = 0) {
  const generated = row.generatedAt || row.createdAt || row.updatedAt || new Date().toISOString();
  const type = toLabel(row.reportType || row.type || row.module || 'Overview');
  const title = row.title || row.reportName || row.name || `${type} Report`;

  return {
    id: row.id ?? row.reportId ?? `report-${index}-${safeTime(generated) || Date.now()}`,
    title,
    period: row.period || formatPeriod(row.fromDate || row.startDate, row.toDate || row.endDate, row.dateRange),
    generated,
    type,
    downloadUrl: row.downloadUrl || row.fileUrl || row.url || null,
    format: row.format || row.fileType || 'csv',
    raw: row,
  };
}

const dl = (name, content, mimeType = 'text/plain;charset=utf-8') => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: mimeType }));
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const decodeBase64ToBlob = (base64, mimeType) => {
  if (!base64 || typeof base64 !== 'string') return null;
  const raw = base64.includes(',') ? base64.split(',').pop() : base64;
  if (!raw) return null;
  try {
    const binary = window.atob(raw.replace(/\s+/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mimeType });
  } catch {
    return null;
  }
};

/* ─── shared chart tick style (matches AdminDashboard) ─── */
const tick = { color: '#64748b', font: { size: 9 } };

/* ══ Visit Trend Chart — dual-line with fill, same as "Patient Growth Trend" ══ */
function VisitTrendChart({ labels, visits, assessments }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Visits',
            data: visits,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.14)',
            fill: true,
            tension: 0.42,
            pointRadius: 1.8,
            pointHoverRadius: 3,
            pointBackgroundColor: '#2563eb',
            pointBorderWidth: 0,
            borderWidth: 2.4,
          },
          {
            label: 'Assessments',
            data: assessments,
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56,189,248,0.07)',
            fill: true,
            tension: 0.42,
            borderDash: [6, 4],
            pointRadius: 1.8,
            pointHoverRadius: 3,
            pointBackgroundColor: '#38bdf8',
            pointBorderWidth: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { ...tick, maxRotation: 0 },
            border: { display: false },
          },
          y: {
            grid: { color: 'rgba(148,163,184,0.15)' },
            ticks: { ...tick, maxTicksLimit: 4 },
            border: { display: false },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [labels, visits, assessments]);

  return <canvas ref={canvasRef} />;
}

/* ══ Patient Category Chart — horizontal bar, same as "Patient Operations" ══ */
function PatientCategoryChart({ categories }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: categories.map((p) => p.category),
        datasets: [{
          data: categories.map((p) => p.count),
          backgroundColor: categories.map((p) => p.color),
          borderRadius: 0,
          borderSkipped: false,
          barThickness: 14,
        }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: ctx => `  ${ctx.parsed.x} patients` },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(148,163,184,0.15)' },
            ticks: { color: '#64748b', font: { size: 9 }, maxTicksLimit: 5 },
            border: { display: false },
          },
          y: {
            grid: { display: false },
            ticks: { color: '#374151', font: { size: 11 } },
            border: { display: false },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [categories]);

  return <canvas ref={canvasRef} />;
}

/* ══ MAIN ══ */
export default function ReportsAnalytics() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [operationError, setOperationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sourceCacheRef = useRef({
    homeVisits: [],
    assignments: [],
    appointments: [],
    reports: [],
  });

  const [metrics, setMetrics] = useState({
    patientsServed: 0,
    visitsCompleted: 0,
    avgResponseHours: 0,
    highRiskPatients: 0,
    changes: {
      patientsServed: { text: '0%', direction: 'up', positive: true },
      visitsCompleted: { text: '0%', direction: 'up', positive: true },
      avgResponseHours: { text: '0%', direction: 'up', positive: true },
      highRiskPatients: { text: '0%', direction: 'up', positive: true },
    },
  });

  const [visitData, setVisitData] = useState({
    labels: MONTH_LABELS,
    visits: Array(12).fill(0),
    assessments: Array(12).fill(0),
  });

  const [patientCategories, setPatientCategories] = useState([]);
  const [recentReports, setRecentReports] = useState([]);

  const [showExport, setShowExport]     = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);
  const [exportFmt, setExportFmt]       = useState('csv');
  const [exportType, setExportType]     = useState('overview');
  const [form, setForm] = useState({
    name:'', from:'', to:'', type:'overview', fmt:'csv',
    metrics: ['visits','assessments','demographics','response'],
  });

  const stats = useMemo(() => [
    {
      label: 'Patients Served',
      value: String(metrics.patientsServed),
      change: metrics.changes.patientsServed.text,
      direction: metrics.changes.patientsServed.direction,
      positive: metrics.changes.patientsServed.positive,
      icon: Users,
    },
    {
      label: 'Visits Completed',
      value: String(metrics.visitsCompleted),
      change: metrics.changes.visitsCompleted.text,
      direction: metrics.changes.visitsCompleted.direction,
      positive: metrics.changes.visitsCompleted.positive,
      icon: CheckCircle,
    },
    {
      label: 'Avg. Response Time',
      value: `${metrics.avgResponseHours.toFixed(1)} hrs`,
      change: metrics.changes.avgResponseHours.text,
      direction: metrics.changes.avgResponseHours.direction,
      positive: metrics.changes.avgResponseHours.positive,
      icon: Clock,
    },
    {
      label: 'High Risk Patients',
      value: String(metrics.highRiskPatients),
      change: metrics.changes.highRiskPatients.text,
      direction: metrics.changes.highRiskPatients.direction,
      positive: metrics.changes.highRiskPatients.positive,
      icon: AlertCircle,
    },
  ], [metrics]);

  const buildCSV = useCallback((title, period) => [
    `"${title}"`,
    `"Period: ${period}"`,
    `"Generated: ${new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}"`,
    '',
    '"KEY METRICS"',
    '"Metric","Value","Change"',
    ...stats.map((s) => `"${s.label}","${s.value}","${s.change}"`),
    '',
    '"VISIT TRENDS"',
    '"Month","Visits","Assessments"',
    ...visitData.labels.map((month, index) => `"${month}","${visitData.visits[index]}","${visitData.assessments[index]}"`),
    '',
    '"PATIENT CATEGORIES"',
    '"Category","Count"',
    ...patientCategories.map((item) => `"${item.category}","${item.count}"`),
  ].join('\n'), [stats, visitData, patientCategories]);

  const toggleMetric = m => setForm(f => ({
    ...f, metrics: f.metrics.includes(m) ? f.metrics.filter(x => x !== m) : [...f.metrics, m],
  }));

  const fetchReportFileById = useCallback(async (id) => {
    if (!id) return null;

    const token = getAccessToken();
    const apiBase = getApiBaseUrl();
    const encodedId = encodeURIComponent(String(id));
    const candidates = [
      `${apiBase}/api/reports/${encodedId}/download`,
      `${apiBase}/api/reports/${encodedId}/file`,
      `${apiBase}/api/reports/download/${encodedId}`,
    ];

    for (const url of candidates) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) continue;

        const blob = await response.blob();
        if (blob && blob.size > 0) return blob;
      } catch {
        // Try next candidate URL.
      }
    }

    return null;
  }, []);

  const triggerBlobDownload = useCallback((blob, fileName) => {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }, []);

  const handleDownloadReport = useCallback(async (report) => {
    setOperationError('');

    const reportName = `${report.title.replace(/\s+/g, '_')}.${String(report.format || 'csv').toLowerCase()}`;
    let payload = getReportPayload(report.raw || report);

    try {
      if (report.id != null) {
        const details = await reportService.getReportById(report.id);
        payload = getReportPayload(details || report.raw || report);
      }
    } catch {
      // Keep list payload fallback for download.
    }

    if (payload.downloadUrl) {
      window.open(payload.downloadUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const mimeType = mimeTypeForFormat(payload.format);

    if (Array.isArray(payload.fileBytes) && payload.fileBytes.length > 0) {
      triggerBlobDownload(new Blob([new Uint8Array(payload.fileBytes)], { type: mimeType }), payload.fileName || reportName);
      return;
    }

    const base64Blob = decodeBase64ToBlob(payload.fileBase64, mimeType);
    if (base64Blob) {
      triggerBlobDownload(base64Blob, payload.fileName || reportName);
      return;
    }

    if (typeof payload.content === 'string' && payload.content.trim()) {
      triggerBlobDownload(new Blob([payload.content], { type: mimeType }), payload.fileName || reportName);
      return;
    }

    const blobFromApi = await fetchReportFileById(payload.id || report.id);
    if (blobFromApi) {
      triggerBlobDownload(blobFromApi, payload.fileName || reportName);
      return;
    }

    dl(reportName.endsWith('.csv') ? reportName : `${report.title.replace(/\s+/g, '_')}.csv`, buildCSV(report.title, report.period), 'text/csv;charset=utf-8');
  }, [buildCSV, fetchReportFileById, triggerBlobDownload]);

  const buildGeneratedPayload = useCallback((options) => {
    const reportLabel = reportTypes.find((type) => type.id === options.type)?.label || 'Overview';
    return {
      module: 'CHW',
      title: options.title || `${reportLabel} Report`,
      reportType: String(options.type || 'overview').toUpperCase(),
      format: String(options.format || 'csv').toUpperCase(),
      dateRange: options.dateRange || null,
      fromDate: options.fromDate || null,
      toDate: options.toDate || null,
      options: {
        metrics: Array.isArray(options.metrics) ? options.metrics : [],
      },
      generatedAt: new Date().toISOString(),
      status: 'GENERATED',
    };
  }, []);

  const appendCreatedReport = useCallback((response, fallback) => {
    const next = mapReportRow(response || fallback, 0);
    setRecentReports((prev) => [next, ...prev].slice(0, 20));
    return next;
  }, []);

  const fetchLiveData = useCallback(async () => {
    setIsLoading(true);
    setFetchError('');

    let chwProfile = null;
    let normalizedChwId = null;
    try {
      chwProfile = await chwService.getMe();
      normalizedChwId = toNumericId(chwProfile?.id ?? chwProfile?.chwId ?? chwProfile?.providerId ?? chwProfile?.user?.id);
    } catch {
      // Continue without resolved CHW id.
    }

    const chwIdCandidates = getChwIdCandidates(user, chwProfile);
    if (normalizedChwId != null) {
      const normalizedText = String(normalizedChwId);
      if (!chwIdCandidates.includes(normalizedText)) chwIdCandidates.push(normalizedText);
    }

    if (normalizedChwId == null && chwIdCandidates.length > 0) {
      normalizedChwId = toNumericId(chwIdCandidates[0]);
    }

    const chwIdLookup = new Set(chwIdCandidates);
    if (chwIdLookup.size === 0) {
      setFetchError('Could not resolve your CHW identity for scoped analytics. Please sign in again.');
      setIsLoading(false);
      return;
    }

    const loadAssignments = async () => {
      if (normalizedChwId == null) {
        return assignmentService.listAssignments({ size: 500 });
      }

      try {
        return await assignmentService.listAssignmentsByChw(normalizedChwId, { size: 500 });
      } catch (error) {
        if (![404].includes(error?.status)) throw error;

        const allAssignments = await assignmentService.listAssignments({ size: 500 });
        return allAssignments.filter((row) => String(row?.chwId ?? '') === String(normalizedChwId));
      }
    };

    const [homeVisitsResult, assignmentsResult, appointmentsResult, reportsResult] = await Promise.allSettled([
      homeVisitService.listHomeVisits(normalizedChwId != null ? { chwId: normalizedChwId, size: 500 } : { size: 500 }),
      loadAssignments(),
      refreshAppointmentGovernanceSnapshot(normalizedChwId != null ? { providerRole: 'CHW', chwId: normalizedChwId } : { providerRole: 'CHW' }),
      reportService.listReports({ size: 50 }),
    ]);

    if (homeVisitsResult.status === 'fulfilled' && Array.isArray(homeVisitsResult.value)) {
      sourceCacheRef.current.homeVisits = homeVisitsResult.value;
    }
    if (assignmentsResult.status === 'fulfilled' && Array.isArray(assignmentsResult.value)) {
      sourceCacheRef.current.assignments = assignmentsResult.value;
    }
    if (appointmentsResult.status === 'fulfilled') {
      sourceCacheRef.current.appointments = normalizeListPayload(appointmentsResult.value?.appointments || appointmentsResult.value);
    }
    if (reportsResult.status === 'fulfilled') {
      sourceCacheRef.current.reports = normalizeListPayload(reportsResult.value);
    }

    const homeVisits = sourceCacheRef.current.homeVisits.filter((visit) => {
      const identifiers = [visit?.chwId, visit?.raw?.chwId, visit?.raw?.chw?.id, visit?.chwCode, visit?.raw?.chwCode];
      if (hasAnyChwIdMatch(chwIdLookup, ...identifiers)) return true;
      return normalizedChwId != null && !hasAnyIdentifier(...identifiers);
    });

    const assignments = sourceCacheRef.current.assignments.filter((row) => {
      const identifiers = [row?.chwId, row?.raw?.chwId, row?.raw?.chw?.id, row?.raw?.chwCode];
      if (hasAnyChwIdMatch(chwIdLookup, ...identifiers)) return true;
      return normalizedChwId != null && !hasAnyIdentifier(...identifiers);
    });

    const appointmentRows = sourceCacheRef.current.appointments;

    const appointments = appointmentRows.filter((row) => {
      if (String(row?.providerRole || '').toUpperCase() !== 'CHW') return false;
      const identifiers = [row?.providerId, row?.chwId, row?.provider?.id, row?.chw?.id, row?.raw?.providerId, row?.raw?.chwId];
      if (hasAnyChwIdMatch(chwIdLookup, ...identifiers)) return true;
      return normalizedChwId != null && !hasAnyIdentifier(...identifiers);
    });

    const reports = sourceCacheRef.current.reports
      .filter((row) => {
        const moduleLabel = String(row?.module || '').toUpperCase();
        if (moduleLabel && moduleLabel !== 'CHW') return false;

        const ownerIdentifiers = [row?.chwId, row?.providerId, row?.createdBy, row?.userId];
        if (!hasAnyIdentifier(...ownerIdentifiers)) return true;

        return hasAnyChwIdMatch(chwIdLookup, ...ownerIdentifiers);
      })
      .map((row, index) => mapReportRow(row, index))
      .sort((a, b) => (safeTime(b.generated) || 0) - (safeTime(a.generated) || 0))
      .slice(0, 20);

    setRecentReports(reports);

    const now = new Date();
    const currentMonth = monthRange(now, 0);
    const previousMonth = monthRange(now, -1);

    const isTask = (row) => String(row?.assignmentType || '').toUpperCase() === 'TASK';
    const isCompleted = (status) => String(status || '').toUpperCase() === 'COMPLETED';
    const isCanceled = (status) => ['CANCELED', 'CANCELLED'].includes(String(status || '').toUpperCase());

    const taskAssignments = assignments.filter(isTask);

    const completedVisitsCurrent = homeVisits.filter((visit) => (
      String(visit?.status || '').toUpperCase() === 'COMPLETED'
      && inRange(visit?.completedAt || visit?.scheduledAt, currentMonth)
    ));

    const completedVisitsPrevious = homeVisits.filter((visit) => (
      String(visit?.status || '').toUpperCase() === 'COMPLETED'
      && inRange(visit?.completedAt || visit?.scheduledAt, previousMonth)
    ));

    const completedTasksCurrent = taskAssignments.filter((task) => (
      isCompleted(task?.status)
      && inRange(task?.completedAt || task?.updatedAt || task?.assignedAt, currentMonth)
    ));

    const completedTasksPrevious = taskAssignments.filter((task) => (
      isCompleted(task?.status)
      && inRange(task?.completedAt || task?.updatedAt || task?.assignedAt, previousMonth)
    ));

    const completedAppointmentsCurrent = appointments.filter((row) => (
      isCompleted(row?.status)
      && inRange(row?.updatedAt || row?.scheduledAt, currentMonth)
    ));

    const completedAppointmentsPrevious = appointments.filter((row) => (
      isCompleted(row?.status)
      && inRange(row?.updatedAt || row?.scheduledAt, previousMonth)
    ));

    const patientSetCurrent = new Set();
    [...completedVisitsCurrent, ...completedTasksCurrent, ...completedAppointmentsCurrent].forEach((row) => {
      const key = safePatientKey(row?.patientIdText, row?.patientId, row?.patientName);
      if (key) patientSetCurrent.add(key);
    });

    const patientSetPrevious = new Set();
    [...completedVisitsPrevious, ...completedTasksPrevious, ...completedAppointmentsPrevious].forEach((row) => {
      const key = safePatientKey(row?.patientIdText, row?.patientId, row?.patientName);
      if (key) patientSetPrevious.add(key);
    });

    const getPriority = (row) => String(row?.priority || row?.raw?.priority || '').toUpperCase();
    const highRiskCurrent = new Set();
    [...homeVisits, ...taskAssignments].forEach((row) => {
      if (!['HIGH', 'URGENT'].includes(getPriority(row))) return;
      if (!inRange(row?.scheduledAt || row?.completedAt || row?.assignedAt || row?.updatedAt, currentMonth)) return;
      const key = safePatientKey(row?.patientIdText, row?.patientId, row?.patientName);
      if (key) highRiskCurrent.add(key);
    });

    const highRiskPrevious = new Set();
    [...homeVisits, ...taskAssignments].forEach((row) => {
      if (!['HIGH', 'URGENT'].includes(getPriority(row))) return;
      if (!inRange(row?.scheduledAt || row?.completedAt || row?.assignedAt || row?.updatedAt, previousMonth)) return;
      const key = safePatientKey(row?.patientIdText, row?.patientId, row?.patientName);
      if (key) highRiskPrevious.add(key);
    });

    const durationsCurrent = [];
    [...completedVisitsCurrent, ...completedTasksCurrent].forEach((row) => {
      const start = safeTime(row?.createdAt || row?.assignedAt || row?.scheduledAt);
      const end = safeTime(row?.completedAt || row?.updatedAt);
      if (start == null || end == null || end <= start) return;
      durationsCurrent.push((end - start) / (1000 * 60 * 60));
    });

    const durationsPrevious = [];
    [...completedVisitsPrevious, ...completedTasksPrevious].forEach((row) => {
      const start = safeTime(row?.createdAt || row?.assignedAt || row?.scheduledAt);
      const end = safeTime(row?.completedAt || row?.updatedAt);
      if (start == null || end == null || end <= start) return;
      durationsPrevious.push((end - start) / (1000 * 60 * 60));
    });

    const average = (rows) => {
      if (!rows.length) return 0;
      return rows.reduce((sum, value) => sum + value, 0) / rows.length;
    };

    const assignedPatients = Number(chwProfile?.assignedPatients);
    const hasAssignedPatients = Number.isFinite(assignedPatients) && assignedPatients >= 0;

    const currentPatientsServed = patientSetCurrent.size > 0
      ? patientSetCurrent.size
      : (hasAssignedPatients ? assignedPatients : 0);
    const previousPatientsServed = patientSetPrevious.size;
    const currentVisitsCompleted = completedVisitsCurrent.length;
    const previousVisitsCompleted = completedVisitsPrevious.length;
    const currentAvgResponse = average(durationsCurrent);
    const previousAvgResponse = average(durationsPrevious);
    const currentHighRisk = highRiskCurrent.size;
    const previousHighRisk = highRiskPrevious.size;

    setMetrics({
      patientsServed: currentPatientsServed,
      visitsCompleted: currentVisitsCompleted,
      avgResponseHours: currentAvgResponse,
      highRiskPatients: currentHighRisk,
      changes: {
        patientsServed: buildDelta(currentPatientsServed, previousPatientsServed, true),
        visitsCompleted: buildDelta(currentVisitsCompleted, previousVisitsCompleted, true),
        avgResponseHours: buildDelta(currentAvgResponse, previousAvgResponse, false),
        highRiskPatients: buildDelta(currentHighRisk, previousHighRisk, false),
      },
    });

    const thisYear = now.getFullYear();
    const visitsByMonth = Array(12).fill(0);
    const assessmentsByMonth = Array(12).fill(0);

    homeVisits.forEach((visit) => {
      if (isCanceled(visit?.status)) return;
      const ts = safeTime(visit?.scheduledAt || visit?.completedAt);
      if (ts == null) return;
      const date = new Date(ts);
      if (date.getFullYear() !== thisYear) return;
      visitsByMonth[date.getMonth()] += 1;
    });

    taskAssignments.forEach((task) => {
      const text = `${task?.raw?.category || ''} ${task?.notes || ''}`.toLowerCase();
      if (!text.includes('assessment')) return;
      const ts = safeTime(task?.completedAt || task?.updatedAt || task?.assignedAt);
      if (ts == null) return;
      const date = new Date(ts);
      if (date.getFullYear() !== thisYear) return;
      assessmentsByMonth[date.getMonth()] += 1;
    });

    setVisitData({ labels: MONTH_LABELS, visits: visitsByMonth, assessments: assessmentsByMonth });

    const categoryCount = new Map();
    const bumpCategory = (name) => {
      const key = String(name || '').trim() || 'Other';
      categoryCount.set(key, (categoryCount.get(key) || 0) + 1);
    };

    homeVisits.forEach((visit) => bumpCategory(visit?.visitType || 'Home Visit'));
    taskAssignments.forEach((task) => bumpCategory(task?.raw?.category || 'Task'));
    appointments.forEach((row) => bumpCategory(row?.appointmentType || 'Appointment'));

    const categories = Array.from(categoryCount.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((row, index) => ({ ...row, color: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }));

    setPatientCategories(categories);

    const totalFailures = [homeVisitsResult, assignmentsResult, appointmentsResult, reportsResult]
      .filter((result) => result.status === 'rejected')
      .length;

    if (totalFailures === 4) {
      setFetchError('Failed to load analytics from backend. Please retry.');
    } else if (totalFailures > 0) {
      setFetchError('Some analytics sources failed to refresh. Showing last synced values where possible.');
    }

    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  const handleExport = useCallback(async () => {
    setOperationError('');
    setIsSubmitting(true);
    try {
      const label = reportTypes.find((type) => type.id === exportType)?.label || 'Overview';
      const payload = buildGeneratedPayload({
        type: exportType,
        format: exportFmt,
        title: `${label} Report`,
        dateRange: 'THIS_MONTH',
      });

      const created = await reportService.createReport(payload);
      const mapped = appendCreatedReport(created, payload);
      await handleDownloadReport(mapped);
      setShowExport(false);
    } catch (error) {
      setOperationError(error?.message || 'Failed to export report from backend.');
    } finally {
      setIsSubmitting(false);
    }
  }, [appendCreatedReport, buildGeneratedPayload, exportFmt, exportType, handleDownloadReport]);

  const handleGenerate = useCallback(async () => {
    if (!form.from || !form.to) return;

    setOperationError('');
    setIsSubmitting(true);
    try {
      const label = reportTypes.find((type) => type.id === form.type)?.label || 'Overview';
      const payload = buildGeneratedPayload({
        type: form.type,
        format: form.fmt,
        title: form.name || `${label} Report`,
        fromDate: form.from,
        toDate: form.to,
        metrics: form.metrics,
      });

      const created = await reportService.createReport(payload);
      const mapped = appendCreatedReport(created, payload);
      await handleDownloadReport(mapped);

      setShowGenerate(false);
      setForm({
        name: '',
        from: '',
        to: '',
        type: 'overview',
        fmt: 'csv',
        metrics: ['visits', 'assessments', 'demographics', 'response'],
      });
    } catch (error) {
      setOperationError(error?.message || 'Failed to generate report from backend.');
    } finally {
      setIsSubmitting(false);
    }
  }, [appendCreatedReport, buildGeneratedPayload, form, handleDownloadReport]);

  const visitsYearTotal = useMemo(() => visitData.visits.reduce((sum, value) => sum + value, 0), [visitData]);
  const assessmentsYearTotal = useMemo(() => visitData.assessments.reduce((sum, value) => sum + value, 0), [visitData]);
  const totalCategoryCount = useMemo(() => patientCategories.reduce((sum, row) => sum + row.count, 0), [patientCategories]);

  return (
    <div className="space-y-4 pb-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reports &amp; Analytics</h1>
          <p className="text-xs text-gray-500 mt-0.5">Live data synced from backend sources</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchLiveData}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button onClick={() => setShowExport(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold text-sm shadow transition-colors">
          <Download className="w-4 h-4"/> Export
        </button>
        </div>
      </div>

      {fetchError && (
        <div className="p-3 border border-red-200 bg-red-50 text-red-700 text-sm">
          {fetchError}
        </div>
      )}

      {operationError && (
        <div className="p-3 border border-amber-200 bg-amber-50 text-amber-700 text-sm">
          {operationError}
        </div>
      )}

      
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <article key={s.label} className="bg-white border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] font-semibold text-gray-800 leading-tight">{s.label}</p>
                <Icon className="w-3.5 h-3.5 text-blue-700"/>
              </div>
              <p className="text-lg font-bold text-gray-950 leading-tight">{s.value}</p>
              <p className={`text-[11px] mt-0.5 flex items-center gap-0.5 font-semibold ${s.positive ? 'text-green-600' : 'text-red-600'}`}>
                {s.direction === 'up' ? <ArrowUpRight className="w-3 h-3"/> : <ArrowDownRight className="w-3 h-3"/>}
                {s.change} vs last month
              </p>
            </article>
          );
        })}
      </section>

      {/* ── Charts Row ── */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">

        {/* Visit & Assessment Trend */}
        <article className="xl:col-span-7 bg-white border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Visit &amp; Assessment Trends</h2>
            <HeartPulse className="w-4 h-4 text-blue-600"/>
          </div>
          <div className="relative w-full h-36">
            <VisitTrendChart labels={visitData.labels} visits={visitData.visits} assessments={visitData.assessments} />
          </div>
          <div className="flex items-center gap-4 mt-1 text-[10px] text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded inline-block" style={{background:'#2563eb'}}/>
              Visits <span className="font-semibold text-blue-700 ml-1">{visitsYearTotal}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 inline-block" style={{borderTop:'2px dashed #38bdf8'}}/>
              Assessments <span className="font-semibold text-sky-500 ml-1">{assessmentsYearTotal}</span>
            </span>
            <span className="ml-auto">Jan – Dec {new Date().getFullYear()}</span>
          </div>
        </article>

        {/* Patient Categories */}
        <article className="xl:col-span-5 bg-white border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Care Categories</h2>
            <Activity className="w-4 h-4 text-blue-600"/>
          </div>
          <div className="relative w-full h-36">
            {patientCategories.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-gray-400">
                No category data available
              </div>
            ) : (
              <PatientCategoryChart categories={patientCategories} />
            )}
          </div>
          <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-100">
            <span className="text-[10px] text-gray-500">Total Active Cases</span>
            <span className="text-sm font-bold text-blue-700">{totalCategoryCount}</span>
          </div>
        </article>
      </section>

      {/* ── Recent Reports ── */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Recent Reports</h2>
          <span className="text-[11px] text-gray-400">{recentReports.length} reports</span>
        </div>

        {/* table — lg */}
        <div className="hidden lg:block">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Report','Period','Generated','Type','Action'].map(h => (
                  <th key={h} className={`px-5 py-2.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider ${h==='Action'?'text-center':''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentReports.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-gray-400">
                    {isLoading ? 'Loading reports...' : 'No reports available from backend yet.'}
                  </td>
                </tr>
              )}
              {recentReports.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0"/>
                      <span className="font-semibold text-gray-800 text-sm">{r.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">{r.period}</td>
                  <td className="px-5 py-3 text-xs text-gray-500 whitespace-nowrap">
                    {new Date(r.generated).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${typeColor[r.type] || 'bg-gray-100 text-gray-700'}`}>{r.type}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button onClick={() => handleDownloadReport(r)} disabled={isSubmitting}
                      className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-medium transition-colors">
                      <Download className="w-3 h-3"/> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* cards — mobile */}
        <div className="lg:hidden divide-y divide-gray-50">
          {recentReports.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              {isLoading ? 'Loading reports...' : 'No reports available from backend yet.'}
            </div>
          )}
          {recentReports.map(r => (
            <div key={r.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
              <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5"/>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{r.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {r.period} · {new Date(r.generated).toLocaleDateString('en-US',{month:'short',day:'numeric'})}
                </p>
                <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeColor[r.type] || 'bg-gray-100 text-gray-700'}`}>{r.type}</span>
              </div>
              <button onClick={() => handleDownloadReport(r)} disabled={isSubmitting}
                className="shrink-0 self-center p-1.5 border border-gray-200 hover:bg-gray-50 transition-colors">
                <Download className="w-3.5 h-3.5 text-gray-500"/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Generate CTA banner ── */}
      <div className="bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-200">
        <div>
          <h2 className="text-sm font-bold text-gray-800 ">Generate Custom Report</h2>
          <p className="text-xs text-gray-600 mt-0.5">Custom date ranges and specific metrics</p>
        </div>
        <button onClick={() => setShowGenerate(true)}
          className="self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold text-sm transition-colors border border-gray-200 whitespace-nowrap">
          Create Report
        </button>
      </div>

      {/* ══ Export Modal ══ */}
      {showExport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowExport(false)}/>
          <div className="relative bg-white shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-blue-950 px-6 py-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Download className="w-4 h-4 text-white"/>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">Export Report</h3>
                <p className="text-blue-300 text-xs">Download report to your device</p>
              </div>
              <button onClick={() => setShowExport(false)} className="text-blue-400 hover:text-white transition-colors">
                <X className="w-4 h-4"/>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Report Type</label>
                <select value={exportType} onChange={e => setExportType(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {reportTypes.map(t => <option key={t.id} value={t.id}>{t.label} Report</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Format</label>
                <div className="flex gap-2">
                  {['csv','excel','pdf'].map(f => (
                    <button key={f} onClick={() => setExportFmt(f)}
                      className={`flex-1 py-2 text-xs font-bold border transition-colors ${exportFmt===f?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-500 border-gray-200 hover:border-blue-300'}`}>
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowExport(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleExport} disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                  <Download className="w-4 h-4"/> {isSubmitting ? 'Working...' : 'Download'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ Generate Modal ══ */}
      {showGenerate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowGenerate(false)}/>
          <div className="relative bg-white shadow-2xl w-full max-w-lg overflow-hidden" style={{maxHeight:'92vh',overflowY:'auto'}}>
            <div className="bg-blue-950 px-6 py-4 flex items-center gap-3 sticky top-0 z-10">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-white"/>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">Generate Custom Report</h3>
                <p className="text-blue-300 text-xs">Configure and download your report</p>
              </div>
              <button onClick={() => setShowGenerate(false)} className="text-blue-400 hover:text-white transition-colors">
                <X className="w-4 h-4"/>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Report Name</label>
                <input type="text" placeholder="e.g. October Community Health Summary"
                  value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"/>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Date Range</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-400 mb-1 block">From</label>
                    <input type="date" value={form.from} onChange={e => setForm(f => ({...f, from: e.target.value}))}
                      className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 mb-1 block">To</label>
                    <input type="date" value={form.to} onChange={e => setForm(f => ({...f, to: e.target.value}))}
                      className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Report Type</label>
                <select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}
                  className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {reportTypes.map(t => <option key={t.id} value={t.id}>{t.label} Report</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Include Metrics</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {id:'visits',label:'Home Visits'},{id:'assessments',label:'Assessments'},
                    {id:'demographics',label:'Demographics'},{id:'response',label:'Response Times'},
                  ].map(m => (
                    <label key={m.id} className="flex items-center gap-2 p-2.5 border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <input type="checkbox" checked={form.metrics.includes(m.id)} onChange={() => toggleMetric(m.id)} className="accent-blue-600 w-4 h-4"/>
                      <span className="text-xs text-gray-700">{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Format</label>
                <div className="flex gap-2">
                  {['csv','excel','pdf'].map(f => (
                    <button key={f} onClick={() => setForm(ff => ({...ff, fmt: f}))}
                      className={`flex-1 py-2 text-xs font-bold border transition-colors ${form.fmt===f?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-500 border-gray-200 hover:border-blue-300'}`}>
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowGenerate(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleGenerate} disabled={!form.from || !form.to || isSubmitting}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                  <Download className="w-4 h-4"/> {isSubmitting ? 'Working...' : 'Generate &amp; Download'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}