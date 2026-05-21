import { useEffect, useState, useCallback } from 'react';
import {
  User, Mail, Phone, MapPin, Briefcase, Award, Users,
  Activity, Shield, Settings, Save, Edit3,
  X, Camera, Check, Download, LogOut, Eye, EyeOff,
  Monitor, MapPinned, Loader2, AlertCircle, RefreshCw
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { chwService } from '../../../Services/domain/chwService.js';
import { auditLogService } from '../../../Services/domain/auditLogService.js';
import { assignmentService } from '../../../Services/domain/assignmentService.js';
import { homeVisitService } from '../../../Services/domain/homeVisitService.js';
import { appointmentApi } from '../../../API/endpoints/appointmentApi.js';

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */

/** Format a date string or LocalDate to a readable label */
function formatDate(val) {
  if (!val) return '—';
  try { return new Date(val).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }); }
  catch { return val; }
}

/** Format OffsetDateTime to "Month DD, YYYY" */
function formatJoined(val) {
  if (!val) return '—';
  try { return new Date(val).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }); }
  catch { return val; }
}

/** Map backend Status enum → display + colour */
function statusMeta(status = '') {
  const s = status.toUpperCase();
  if (s === 'AVAILABLE') return { label: 'Active', colour: 'bg-green-400' };
  if (s === 'BUSY')      return { label: 'Busy',   colour: 'bg-amber-400' };
  return                         { label: 'Offline', colour: 'bg-gray-400' };
}

function toDisplayLabel(value) {
  if (!value) return 'Action';
  return String(value)
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatRelativeTime(dateValue) {
  if (!dateValue) return '—';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return String(dateValue);

  const diffMs = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return 'Just now';
  if (diffMs < hour) return `${Math.floor(diffMs / minute)} min ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)} hrs ago`;
  return `${Math.floor(diffMs / day)} days ago`;
}

function parseLogDetails(log = {}) {
  const raw = log.details ?? log.eventDetails ?? log.metadata;
  if (!raw) return {};
  if (typeof raw === 'object') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function buildActivityAction(log = {}) {
  const details = parseLogDetails(log);
  if (details.action) return String(details.action);
  if (details.message) return String(details.message);
  if (log.description) return String(log.description);

  const event = toDisplayLabel(log.eventType || 'ACTION');
  const entity = log.entityType && log.entityType !== '-' ? ` ${toDisplayLabel(log.entityType)}` : '';
  const entityId = log.entityId && log.entityId !== '-' ? ` #${log.entityId}` : '';
  return `${event}${entity}${entityId}`;
}

function buildLoginDevice(log = {}) {
  const details = parseLogDetails(log);
  return details.device || details.deviceName || details.userAgent || 'Unknown device';
}

function buildLoginLocation(log = {}) {
  const details = parseLogDetails(log);
  const detailLocation = details.location
    || [details.city, details.country].filter(Boolean).join(', ')
    || [log.city, log.country].filter(Boolean).join(', ');
  if (detailLocation) return detailLocation;
  return log.ipAddress && log.ipAddress !== '-' ? log.ipAddress : 'Unknown location';
}

function normalizeListPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.results)) return payload.results;
  if (payload?.data && typeof payload.data === 'object') return normalizeListPayload(payload.data);
  return [];
}

function toNumericId(value) {
  if (value == null) return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const text = String(value).trim();
  if (!text) return null;
  const strict = Number(text);
  if (Number.isFinite(strict)) return strict;
  const match = text.match(/\d+/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
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
  });

  return Array.from(unique);
}

function getPatientDisplayName(row = {}) {
  return row.patientName || row.patient?.fullName || row.patient?.name || 'patient';
}

function toTs(value) {
  const ts = Date.parse(value || '');
  return Number.isNaN(ts) ? 0 : ts;
}

function dedupeActivities(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.action}__${item.timestamp}__${item.source || 'unknown'}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isChwAppointmentRow(row = {}, chwIdCandidates = []) {
  const role = String(row.providerRole || row.provider?.role || '').toUpperCase();
  const providerId = row.providerId ?? row.chwId ?? row.provider?.id ?? row.chw?.id;

  if (role && role !== 'CHW') return false;
  if (!chwIdCandidates.length) return role === 'CHW' || providerId != null;

  return chwIdCandidates.some((id) => String(id) === String(providerId));
}

function toActivityFeed(entries = [], limit = 5) {
  return dedupeActivities(entries)
    .sort((a, b) => toTs(b.timestamp) - toTs(a.timestamp))
    .slice(0, limit)
    .map((entry) => ({
      action: entry.action,
      time: formatRelativeTime(entry.timestamp),
    }));
}

/* ─────────────────────────────────────────
   Sub-components (unchanged from original)
───────────────────────────────────────── */

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-200 bg-white">
    {Icon && <Icon className="w-4 h-4 text-blue-600 flex-shrink-0" />}
    <div className="min-w-0">
      <h2 className="text-sm font-semibold text-gray-800 leading-tight">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5 leading-tight">{subtitle}</p>}
    </div>
  </div>
);

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
    <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 break-words">{value || '—'}</p>
  </div>
);

const EditableField = ({ label, icon: Icon, value, onChange, type = 'text', editMode }) => (
  <div>
    <label className="flex items-center text-xs font-medium text-gray-500 mb-1">
      {Icon && <Icon className="w-3.5 h-3.5 mr-1 text-blue-600 flex-shrink-0" />}
      {label}
    </label>
    {editMode ? (
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
      />
    ) : (
      <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 break-words">{value || '—'}</p>
    )}
  </div>
);

const InfoNote = ({ title, message }) => (
  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
    <div>
      <p className="text-xs font-semibold text-blue-800">{title}</p>
      <p className="text-xs text-blue-700 mt-0.5">{message}</p>
    </div>
  </div>
);

/* Skeleton shimmer */
const Shimmer = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

/* Full-page error banner */
const ErrorBanner = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
    <AlertCircle className="w-8 h-8 text-red-400" />
    <p className="text-sm text-gray-600">{message}</p>
    <button
      onClick={onRetry}
      className="flex items-center gap-1.5 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <RefreshCw className="w-3.5 h-3.5" /> Retry
    </button>
  </div>
);

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
const CHWProfile = () => {
  const { user, setUser } = useAuth();

  /* Remote data state */
  const [chw, setChw]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [saving, setSaving]   = useState(false);
  const [saveError, setSaveError] = useState(null);

  /* Form / UI state */
  const [form, setForm]       = useState({});
  const [editMode, setEditMode]             = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loginSessions, setLoginSessions]   = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError]     = useState('');

  const loadAuditHistory = useCallback(async (chwProfile) => {
    setHistoryLoading(true);
    setHistoryError('');

    const chwIdCandidates = getChwIdCandidates(user, chwProfile);
    const primaryChwId = chwIdCandidates[0] ?? null;

    try {
      const [auditResult, assignmentResult, homeVisitResult, appointmentResult] = await Promise.allSettled([
        auditLogService.listAuditLogs({ page: 0, size: 300, sort: 'eventTime,desc' }),
        primaryChwId != null
          ? assignmentService.listAssignmentsByChw(primaryChwId, { size: 200 })
          : assignmentService.listAssignments({ size: 200 }),
        homeVisitService.listHomeVisits(primaryChwId != null ? { chwId: primaryChwId } : { size: 200 }),
        appointmentApi.list({ size: 300 }),
      ]);

      const sourceFailures = [auditResult, assignmentResult, homeVisitResult, appointmentResult]
        .filter((result) => result.status === 'rejected');
      if (sourceFailures.length === 4) {
        const reason = sourceFailures[0]?.reason;
        setHistoryError(reason?.message || 'Unable to load activity history right now.');
      }

      const logs = auditResult.status === 'fulfilled' && Array.isArray(auditResult.value?.items)
        ? auditResult.value.items
        : [];
      const assignments = assignmentResult.status === 'fulfilled' && Array.isArray(assignmentResult.value)
        ? assignmentResult.value
        : [];
      const homeVisits = homeVisitResult.status === 'fulfilled' && Array.isArray(homeVisitResult.value)
        ? homeVisitResult.value
        : [];
      const appointmentRows = appointmentResult.status === 'fulfilled'
        ? normalizeListPayload(appointmentResult.value)
        : [];

      const candidateNames = [
        user?.username,
        chwProfile?.name,
        [chwProfile?.firstName, chwProfile?.lastName].filter(Boolean).join(' '),
      ]
        .filter(Boolean)
        .map((v) => String(v).toLowerCase());

      const ownLogs = logs.filter((log) => {
        const logUserId = log?.userId ?? null;
        const logEntityId = log?.entityId ?? null;
        const logRole = String(log?.userRole || '').toUpperCase();
        const logEntityType = String(log?.entityType || '').toUpperCase();
        const logChwCode = String(log?.details || '').toLowerCase();

        if (user?.id != null && logUserId != null && String(user.id) === String(logUserId)) return true;
        if (chwProfile?.user?.id != null && logUserId != null && String(chwProfile.user.id) === String(logUserId)) return true;
        if (chwProfile?.id != null && logEntityId != null && String(chwProfile.id) === String(logEntityId)) return true;
        if (logRole === 'CHW') return true;
        if (logEntityType === 'CHW') return true;
        if (chwProfile?.code && logChwCode.includes(String(chwProfile.code).toLowerCase())) return true;

        const logIdentity = `${log?.username || ''} ${log?.fullName || ''} ${log?.userName || ''}`.toLowerCase();
        return candidateNames.some((name) => name && logIdentity.includes(name));
      });

      const sourceLogs = ownLogs;

      const accountActivities = sourceLogs
        .filter((log) => {
          const eventType = String(log?.eventType || '').toUpperCase();
          const entityType = String(log?.entityType || '').toUpperCase();
          if (['LOGIN', 'LOGOUT'].includes(eventType)) return false;
          // Avoid noisy self-profile read events flooding activity cards.
          if (eventType === 'READ' && entityType === 'CHW') return false;
          return true;
        })
        .map((log) => ({
          action: buildActivityAction(log),
          timestamp: log?.performedAt || log?.eventTime || log?.updatedAt,
          source: 'account',
        }));

      const assignmentActivities = assignments.map((item) => {
        const status = String(item?.status || 'ASSIGNED').toUpperCase();
        const patientName = item?.patientName || (item?.patientId ? `patient #${item.patientId}` : 'patient');

        let action = `Updated assignment for ${patientName}`;
        if (status === 'ASSIGNED') action = `Received assignment for ${patientName}`;
        if (status === 'IN_PROGRESS' || status === 'STARTED') action = `Started assignment for ${patientName}`;
        if (status === 'COMPLETED') action = `Completed assignment for ${patientName}`;
        if (status === 'CANCELED' || status === 'CANCELLED') action = `Canceled assignment for ${patientName}`;

        return {
          action,
          timestamp: item?.completedAt || item?.startedAt || item?.updatedAt || item?.assignedAt || item?.createdAt,
          source: 'assignment',
        };
      });

      const homeVisitActivities = homeVisits.map((visit) => {
        const status = String(visit?.status || 'SCHEDULED').toUpperCase();
        const patientName = visit?.patientName || (visit?.patientId ? `patient #${visit.patientId}` : 'patient');
        const visitType = String(visit?.visitType || 'home visit').toLowerCase();

        let action = `Updated ${visitType} for ${patientName}`;
        if (status === 'SCHEDULED') action = `Scheduled ${visitType} for ${patientName}`;
        if (status === 'IN_PROGRESS') action = `Started ${visitType} for ${patientName}`;
        if (status === 'COMPLETED') action = `Completed ${visitType} for ${patientName}`;
        if (status === 'CANCELED' || status === 'CANCELLED' || status === 'NO_SHOW') action = `Canceled ${visitType} for ${patientName}`;

        return {
          action,
          timestamp: visit?.completedAt || visit?.canceledAt || visit?.updatedAt || visit?.scheduledAt || visit?.createdAt,
          source: 'home-visit',
        };
      });

      const appointmentActivities = appointmentRows
        .filter((row) => isChwAppointmentRow(row, chwIdCandidates))
        .map((row) => {
          const status = String(row?.status || '').toUpperCase();
          const patientName = getPatientDisplayName(row);

          let action = `Updated appointment for ${patientName}`;
          if (status === 'BOOKED' || status === 'SCHEDULED' || status === 'CONFIRMED') action = `Scheduled appointment for ${patientName}`;
          if (status === 'COMPLETED' || status === 'CHECKED_OUT') action = `Completed appointment for ${patientName}`;
          if (status === 'CANCELED' || status === 'CANCELLED') action = `Canceled appointment for ${patientName}`;
          if (status === 'CHECKED_IN') action = `Checked in appointment for ${patientName}`;

          return {
            action,
            timestamp: row?.updatedAt || row?.completedAt || row?.scheduledAt || row?.scheduledStart || row?.createdAt,
            source: 'appointment',
          };
        });

      const mergedActivities = [
        ...assignmentActivities,
        ...homeVisitActivities,
        ...appointmentActivities,
        ...accountActivities,
      ].filter((entry) => entry.timestamp);

      const feed = toActivityFeed(mergedActivities, 5);
      if (feed.length > 0) {
        setRecentActivity(feed);
      } else {
        // Fallback to audit-derived actions so the card is never empty when logs exist.
        setRecentActivity(toActivityFeed(
          sourceLogs.map((log) => ({
            action: buildActivityAction(log),
            timestamp: log?.performedAt || log?.eventTime || log?.updatedAt,
            source: 'audit-fallback',
          })),
          5,
        ));
      }

      const loginLogs = sourceLogs
        .filter((log) => ['LOGIN', 'LOGOUT'].includes(String(log?.eventType || '').toUpperCase()))
        .slice(0, 5);

      setLoginSessions(
        loginLogs.map((log, index) => {
          const isActive = String(log?.eventType || '').toUpperCase() === 'LOGIN'
            && String(log?.status || '').toUpperCase() === 'SUCCESS';

          return {
            device: buildLoginDevice(log),
            location: buildLoginLocation(log),
            time: index === 0 && isActive ? 'Current session' : formatRelativeTime(log?.performedAt || log?.eventTime),
            status: isActive ? 'active' : 'inactive',
          };
        })
      );
    } finally {
      setHistoryLoading(false);
    }
  }, [user]);

  /* ── Fetch ── */
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await chwService.getMe(user?.id);
      setChw(data);
      setForm(data);                    // seed form with live data
    } catch (err) {
      setError(err?.message || 'Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  useEffect(() => {
    if (!chw) return;
    loadAuditHistory(chw);
  }, [chw, loadAuditHistory]);

  /* ── Field change ── */
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  /* ── Save ── */
  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      // Build backend payload from form values (matches CommunityHealthWorkers entity)
      const payload = {
        firstName:    form.firstName,
        lastName:     form.lastName,
        email:        form.email,
        phone:        form.phone,
        addressLine1: form.street,
        city:         form.city,
        state:        form.county,
        postalCode:   form.postalCode,
        country:      form.country,
        region:       form.region,
        specialization: form.specialization,
      };

      const updated = await chwService.updateChw(chw.id, payload);
      setChw(updated);
      setForm(updated);

      // Keep auth context in sync
      setUser((prev) => ({
        ...prev,
        name:  [updated.firstName, updated.lastName].filter(Boolean).join(' ') || prev?.name,
        email: updated.email,
        phone: updated.phone,
        initials: [updated.firstName, updated.lastName]
          .filter(Boolean).map((w) => w[0].toUpperCase()).join('') || prev?.initials,
      }));

      setEditMode(false);
    } catch (err) {
      setSaveError(err?.message || 'Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(chw);       // revert unsaved changes
    setSaveError(null);
    setEditMode(false);
  };

  /* ── Derived values ── */
  const fullName = form.firstName || form.lastName
    ? [form.firstName, form.lastName].filter(Boolean).join(' ')
    : chw?.name || '—';

  const initials = [form.firstName, form.lastName]
    .filter(Boolean).map((w) => w[0].toUpperCase()).join('') || '??';

  const { label: statusLabel, colour: statusColour } = statusMeta(chw?.status);

  const performanceStats = chw ? [
    { label: 'Assigned Patients', value: chw.assignedPatients, icon: Users },
    { label: 'Monthly Visits',    value: chw.monthlyVisits,    icon: MapPinned },
    { label: 'Success Rate',      value: chw.successRate != null ? `${chw.successRate}%` : '—', icon: Activity },
    { label: 'Rating',            value: chw.rating != null ? `${chw.rating}/5` : '—', icon: Award },
  ] : [];

  /* ── Render: loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 space-y-4">
        <Shimmer className="h-8 w-40" />
        <div className="border border-gray-200 bg-white rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Shimmer className="w-11 h-11 rounded-full" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-4 w-32" />
              <Shimmer className="h-3 w-24" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => <Shimmer key={i} className="h-10" />)}
          </div>
        </div>
        <div className="border border-gray-200 bg-white rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => <Shimmer key={i} className="h-10" />)}
          </div>
        </div>
      </div>
    );
  }

  /* ── Render: error ── */
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <ErrorBanner message={error} onRetry={fetchProfile} />
      </div>
    );
  }

  /* ── Render: profile ── */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-0 sm:px-4 py-4 sm:py-6">

        {/* Page header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">My Profile</h1>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {editMode ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-50"
                >
                  <X className="w-3.5 h-3.5" /><span className="hidden sm:inline">Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving
                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    : <Save className="w-3.5 h-3.5" />}
                  <span>{saving ? 'Saving…' : 'Save'}</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit3 className="w-3.5 h-3.5" /><span>Edit</span>
              </button>
            )}
            <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
              <LogOut className="w-3.5 h-3.5" /><span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Save error */}
        {saveError && (
          <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />{saveError}
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">

          {/* ── Personal Information ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={User} title="Personal Information" subtitle="Your account details and contact information" />
            <div className="p-4">
              {/* Avatar row */}
              <div className="flex items-start gap-3 pb-4 mb-4 border-b border-gray-100">
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm select-none">
                    {initials}
                  </div>
                  <button className="absolute -bottom-0.5 -right-0.5 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700">
                    <Camera className="w-2.5 h-2.5" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-tight">{fullName}</p>
                  <p className="text-xs text-blue-600 leading-tight mt-0.5 truncate">{chw?.user?.role || 'Community Health Worker'}</p>
                  <p className="text-xs text-gray-500 leading-tight truncate">{chw?.specialization}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full inline-block flex-shrink-0 ${statusColour}`} />
                    <span className="text-xs text-gray-400">{statusLabel}</span>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 flex-shrink-0 hidden sm:block">
                  <p className="font-mono font-medium text-gray-700">{chw?.code}</p>
                  <p className="mt-0.5">Joined {formatJoined(chw?.createdAt)}</p>
                </div>
              </div>

              {/* Mobile: code pill */}
              <div className="sm:hidden flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg mb-3">
                <span className="text-xs text-gray-500">CHW Code</span>
                <span className="text-xs font-mono font-medium text-gray-700">{chw?.code}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EditableField label="First Name" icon={User} value={form.firstName} onChange={(v) => set('firstName', v)} editMode={editMode} />
                <EditableField label="Last Name"  icon={User} value={form.lastName}  onChange={(v) => set('lastName', v)}  editMode={editMode} />
                <EditableField label="Email Address" icon={Mail}  type="email" value={form.email} onChange={(v) => set('email', v)} editMode={editMode} />
                <EditableField label="Phone Number"  icon={Phone} type="tel"   value={form.phone} onChange={(v) => set('phone', v)} editMode={editMode} />
                <Field label="Start Date" value={formatDate(chw?.startDate)} />
                <Field label="Response Time" value={chw?.responseTime} />
              </div>
            </div>
          </div>

          {/* ── Address ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={MapPin} title="Address" subtitle="Your residential address details" />
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <EditableField label="Street Address" icon={MapPin} value={form.street} onChange={(v) => set('street', v)} editMode={editMode} />
                </div>
                <EditableField label="City"        icon={MapPin} value={form.city}       onChange={(v) => set('city', v)}       editMode={editMode} />
                <EditableField label="County"      icon={MapPin} value={form.county}     onChange={(v) => set('county', v)}     editMode={editMode} />
                <EditableField label="Postal Code" icon={MapPin} value={form.postalCode} onChange={(v) => set('postalCode', v)} editMode={editMode} />
                <EditableField label="Country"     icon={MapPin} value={form.country}    onChange={(v) => set('country', v)}    editMode={editMode} />
              </div>
            </div>
          </div>

          {/* ── Work Information ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Briefcase} title="Work Information" subtitle="Your professional details and coverage area" />
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="CHW Code"           value={chw?.code} />
                <Field label="Assigned Facility"  value={chw?.hospital?.name} />
                <EditableField label="Specialization" icon={Activity}  value={form.specialization} onChange={(v) => set('specialization', v)} editMode={editMode} />
                <EditableField label="Region / Coverage Area" icon={MapPinned} value={form.region} onChange={(v) => set('region', v)} editMode={editMode} />
                <Field label="Assigned Patients"  value={chw?.assignedPatients} />
                <Field label="Status"             value={statusLabel} />
              </div>
            </div>
          </div>

          {/* ── Performance Overview ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Activity} title="Performance Overview" subtitle="Your field performance and patient statistics" />
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {performanceStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1" />
                      <p className="text-lg sm:text-xl font-bold text-blue-600">{stat.value ?? '—'}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-tight">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
              <InfoNote title="Track Your Progress" message="View detailed performance reports in the Reports & Analytics section." />
            </div>
          </div>

          {/* ── Security Settings ── */}
          {/* <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Shield} title="Security Settings" subtitle="Password, 2FA and active sessions" />
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Password &amp; Authentication</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Current Password</label>
                    <input type={showPassword ? 'text' : 'password'} placeholder="Current password"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-9" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 bottom-2.5 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">New Password</label>
                    <input type="password" placeholder="New password" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Confirm Password</label>
                    <input type="password" placeholder="Confirm password" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <button className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update Password
                </button>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800">Authenticator App</p>
                    <p className="text-xs text-gray-500">Add an extra layer of security with 2FA</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-500 hidden sm:inline">{twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                    <button onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                      <span className={`inline-block w-3.5 h-3.5 mt-0.5 ml-0.5 transform bg-white rounded-full transition-transform ${twoFactorEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
                {twoFactorEnabled && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" /> Two-factor authentication is active
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Active Sessions</h3>
                <div className="space-y-2">
                  {loginSessions.map((session, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 min-w-0">
                        <Monitor className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{session.device}</p>
                          <p className="text-xs text-gray-500 truncate">{session.location} &bull; {session.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`w-2 h-2 rounded-full ${session.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`} />
                        {session.status === 'active' && i !== 0 && (
                          <button className="text-xs text-red-600 hover:text-red-800">Revoke</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}

          {/* ── Preferences ── */}
          {/* <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Settings} title="Preferences" subtitle="Notification settings and regional preferences" />
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Notifications</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(notifications).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg gap-2">
                      <p className="text-xs sm:text-sm capitalize text-gray-700 truncate">{key}</p>
                      <input type="checkbox" checked={val}
                        onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Language &amp; Region</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Language</label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                      <option>English</option><option>Swahili</option><option>French</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Timezone</label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                      <option>EAT (UTC+3)</option><option>GMT (UTC+0)</option><option>EST (UTC-5)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* ── Activity & History ── */}
          {/* <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Activity} title="Activity & History" subtitle="Recent actions and login records" />
            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Activity</h3>
                  <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800">
                    <Download className="w-3.5 h-3.5" /> Export
                  </button>
                </div>
                <div className="space-y-1.5">
                  {historyLoading ? (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-500">
                      Loading recent activity...
                    </div>
                  ) : historyError ? (
                    <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                      {historyError}
                    </div>
                  ) : recentActivity.length ? recentActivity.map((a, i) => (
                    <div key={i} className="flex items-start gap-2.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="w-2 h-2 rounded-full flex-shrink-0 bg-blue-400 mt-1.5" />
                      <p className="flex-1 text-xs sm:text-sm text-gray-800 leading-snug">{a.action}</p>
                      <p className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">{a.time}</p>
                    </div>
                  )) : (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-500">
                      No recent activity found.
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Login History</h3>
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {['Date', 'Device', 'Location', 'Status'].map((h) => (
                          <th key={h} className="text-left py-2 text-xs font-medium text-gray-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {historyLoading ? (
                        <tr>
                          <td colSpan={4} className="py-3 text-xs text-gray-500">Loading login history...</td>
                        </tr>
                      ) : historyError ? (
                        <tr>
                          <td colSpan={4} className="py-3 text-xs text-red-700">{historyError}</td>
                        </tr>
                      ) : loginSessions.length ? loginSessions.map((s, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="py-2 text-xs text-gray-700 whitespace-nowrap">{s.time}</td>
                          <td className="py-2 text-xs text-gray-700">{s.device}</td>
                          <td className="py-2 text-xs text-gray-700">{s.location}</td>
                          <td className="py-2">
                            <span className={`text-xs font-medium ${s.status === 'active' ? 'text-green-700' : 'text-gray-600'}`}>{s.status}</span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="py-3 text-xs text-gray-500">No login history found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="sm:hidden space-y-2">
                  {historyLoading ? (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-500">
                      Loading login history...
                    </div>
                  ) : historyError ? (
                    <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                      {historyError}
                    </div>
                  ) : loginSessions.length ? loginSessions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{s.device}</p>
                        <p className="text-xs text-gray-500 truncate">{s.location} &bull; {s.time}</p>
                      </div>
                      <span className={`text-xs font-medium flex-shrink-0 ${s.status === 'active' ? 'text-green-700' : 'text-gray-500'}`}>
                        {s.status}
                      </span>
                    </div>
                  )) : (
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-500">
                      No login history found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default CHWProfile;