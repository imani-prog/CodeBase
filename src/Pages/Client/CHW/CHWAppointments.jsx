import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Video,
  Plus,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Search,
  X
} from 'lucide-react';
import AddAppointmentModal from '../../../Components/CHW/AddAppointmentModal';
import EditAppointmentModal from '../../../Components/CHW/EditAppointmentModal';
import CancelAppointmentModal from '../../../Components/CHW/CancelAppointmentModal';
import { appointmentApi } from '../../../API/endpoints/appointmentApi.js';
import { assignmentApi } from '../../../API/endpoints/assignmentApi.js';
import { chwApi } from '../../../API/endpoints/chwApi.js';
import { patientApi } from '../../../API/endpoints/patientApi.js';
import {
  refreshAppointmentGovernanceSnapshot,
  transitionGovernanceAppointment,
} from '../../../Services/appointmentGovernanceStore';
import { syncChwAppointmentWorkItems } from '../../../Services/chwAssignmentsStore';
import { useAuth } from '../../../hooks/useAuth.jsx';

const EMPTY_APPOINTMENTS = { upcoming: [], completed: [], cancelled: [] };

function toInputDate(iso) {
  const ts = Date.parse(iso || '');
  if (Number.isNaN(ts)) return new Date().toISOString().slice(0, 10);
  return new Date(ts).toISOString().slice(0, 10);
}

function toInputTime(iso) {
  const ts = Date.parse(iso || '');
  if (Number.isNaN(ts)) return '09:00';
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function normalizeType(value) {
  const text = String(value || '').toLowerCase();
  if (text.includes('video') || text.includes('tele')) return 'Video Call';
  if (text.includes('phone')) return 'Phone Call';
  if (text.includes('home')) return 'Home Visit';
  return 'In-Person';
}

function durationLabel(startIso, endIso) {
  const start = Date.parse(startIso || '');
  const end = Date.parse(endIso || '');
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return '30 min';
  const mins = Math.round((end - start) / (60 * 1000));
  return `${mins} min`;
}

function mapStatus(status) {
  const normalized = String(status || '').toUpperCase();
  if (normalized === 'COMPLETED') return 'completed';
  if (normalized === 'CANCELED' || normalized === 'CANCELLED') return 'cancelled';
  if (normalized === 'BOOKED' || normalized === 'SCHEDULED') return 'pending';
  return 'confirmed';
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

function getChwIdCandidates(user, discoveredChwId) {
  const rawCandidates = [
    discoveredChwId,
    user?.chwId,
    user?.providerId,
    user?.employeeId,
    toNumericId(discoveredChwId),
    toNumericId(user?.chwId),
    toNumericId(user?.providerId),
    toNumericId(user?.employeeId),

    // Keep auth user ids as last-resort fallback; these may not match CHW profile ids.
    user?.id,
    user?.userId,
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

function extractTotalPages(payload) {
  const candidates = [
    payload?.totalPages,
    payload?.data?.totalPages,
    payload?.meta?.totalPages,
    payload?.pagination?.totalPages,
    payload?.pages,
    payload?.data?.pages,
  ];

  for (const value of candidates) {
    const num = Number(value);
    if (Number.isFinite(num) && num > 0) return num;
  }
  return null;
}

async function fetchPatientsPaged() {
  const aggregated = [];

  // Try both zero-based and one-based page numbering.
  const starts = [0, 1];
  for (const startPage of starts) {
    for (let i = 0; i < 25; i += 1) {
      const page = startPage + i;
      const payload = await patientApi.list({ page, size: 100 });
      const rows = normalizeListPayload(payload);
      if (!rows.length) {
        if (i === 0) break;
        break;
      }

      aggregated.push(...rows);

      const totalPages = extractTotalPages(payload);
      if (totalPages && i + 1 >= totalPages) break;
      if (rows.length < 100) break;
    }

    if (aggregated.length > 1) break;
  }

  return aggregated;
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

function resolvePatientName(row = {}) {
  const nested = row.patient || row.user || {};
  const direct =
    row.patientName || row.fullName || row.name ||
    nested.patientName || nested.fullName || nested.name;
  if (direct) return String(direct).trim();
  return [
    row.firstName,
    row.middleName,
    row.lastName,
    nested.firstName,
    nested.middleName,
    nested.lastName,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
}

function toPatientOptions(rows = []) {
  return rows
    .map((row) => {
      const rawId =
        row.patientId ?? row.id ?? row.patient?.id ??
        row.userId ?? row.user?.id ?? row.profileId;
      const id = rawId === undefined || rawId === null ? '' : String(rawId).trim();
      const name = resolvePatientName(row) || (id ? `Patient ${id}` : 'Unknown Patient');
      return { id, name };
    })
    .filter((p) => p.id);
}

function mergePatientOptions(...groups) {
  const merged = new Map();
  groups.flat().forEach((p) => {
    const id = String(p?.id || '').trim();
    if (!id) return;
    const name = String(p?.name || '').trim() || `Patient ${id}`;
    if (!merged.has(id)) merged.set(id, { id, name });
  });
  return Array.from(merged.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function mapSnapshotToChwAppointments(rows = [], chwId) {
  const chwRows = rows.filter((row) => String(row.providerRole || '').toUpperCase() === 'CHW');
  const scopedRows = chwRows.filter((row) => {
    if (String(row.providerRole || '').toUpperCase() !== 'CHW') return false;
    if (chwId === undefined || chwId === null || chwId === '') return true;
    return String(row.providerId ?? '') === String(chwId);
  });
  const rowsToUse = scopedRows.length > 0 ? scopedRows : chwRows;

  const mapped = rowsToUse.map((row) => {
    const status = String(row.status || '').toUpperCase();
    return {
      id: row.id,
      patientName: row.patientName || 'Unknown Patient',
      patientId: row.patientId || 'N/A',
      date: toInputDate(row.scheduledAt),
      time: toInputTime(row.scheduledAt),
      duration: durationLabel(row.scheduledAt, row.scheduledEnd),
      type: normalizeType(row.appointmentType),
      location: row.facility || 'Unknown Location',
      reason: row.reason || 'General appointment',
      notes: row.notes || '',
      status: mapStatus(status),
      cancelReason: row.cancellationReason || '',
    };
  });

  return {
    upcoming: mapped
      .filter((item) => item.status !== 'completed' && item.status !== 'cancelled')
      .sort((a, b) => Date.parse(`${a.date}T${a.time}:00`) - Date.parse(`${b.date}T${b.time}:00`)),
    completed: mapped
      .filter((item) => item.status === 'completed')
      .sort((a, b) => Date.parse(`${b.date}T${b.time}:00`) - Date.parse(`${a.date}T${a.time}:00`)),
    cancelled: mapped
      .filter((item) => item.status === 'cancelled')
      .sort((a, b) => Date.parse(`${b.date}T${b.time}:00`) - Date.parse(`${a.date}T${a.time}:00`)),
  };
}

function parseDuration(durationText) {
  const match = String(durationText || '').match(/(\d+)/);
  if (!match) return 30;
  const value = Number(match[1]);
  return Number.isFinite(value) && value > 0 ? value : 30;
}

function toIsoWindow(date, time, durationText) {
  const start = new Date(`${date}T${time}:00`);
  if (Number.isNaN(start.getTime())) return { startIso: null, endIso: null };
  const end = new Date(start.getTime() + parseDuration(durationText) * 60 * 1000);
  return {
    startIso: start.toISOString(),
    endIso: end.toISOString(),
  };
}

const CANONICAL_TYPES = new Set([
  'CONSULTATION',
  'FOLLOW_UP',
  'HOME_VISIT',
  'SURGERY',
  'LAB_TEST',
  'IMAGING',
  'VACCINATION',
  'TELEHEALTH',
  'TELEMEDICINE',
  'OTHER',
]);

function normalizeAppointmentType(value) {
  const token = String(value || '').trim().toUpperCase();
  if (!token) return 'OTHER';
  if (CANONICAL_TYPES.has(token)) return token;

  if (token === 'IN_PERSON' || token === 'CLINIC_VISIT') return 'CONSULTATION';
  if (token === 'VIDEO_CALL') return 'TELEMEDICINE';
  if (token === 'PHONE_CALL') return 'TELEHEALTH';

  if (token.includes('HOME')) return 'HOME_VISIT';
  if (token.includes('PHONE')) return 'TELEHEALTH';
  if (token.includes('VIDEO') || token.includes('TELE')) return 'TELEMEDICINE';
  return 'OTHER';
}

function buildChwPayload(appointment, chwId) {
  const patientId = Number(appointment.patientId);
  if (!Number.isFinite(patientId)) {
    throw new Error('Invalid patient id');
  }

  const existingStart = appointment.scheduledStart || appointment.startAt;
  const existingEnd = appointment.scheduledEnd || appointment.endAt;

  let startIso = existingStart;
  let endIso = existingEnd;

  if (!startIso || !endIso) {
    const built = toIsoWindow(appointment.date, appointment.time, appointment.duration);
    startIso = built.startIso;
    endIso = built.endIso;
  }

  if (!startIso || !endIso) {
    throw new Error('Invalid appointment date/time');
  }

  const backendType = normalizeAppointmentType(appointment.type);

  return {
    patientId,
    chwId: appointment.chwId ?? chwId,
    providerRole: appointment.providerRole || 'CHW',
    providerId: appointment.providerId ?? appointment.chwId ?? chwId,
    doctorId: appointment.doctorId,
    hospitalId: appointment.hospitalId,
    type: backendType,
    appointmentType: backendType,
    location: appointment.location || ((backendType === 'TELEMEDICINE' || backendType === 'TELEHEALTH') ? 'Telemedicine' : 'Community Health Visit'),
    reason: appointment.reason,
    notes: appointment.notes,
    reminderSent: Boolean(appointment.reminderSent),
    scheduledStart: startIso,
    scheduledEnd: endIso,
    startAt: startIso,
    endAt: endIso,
    status: appointment.status || 'SCHEDULED',
  };
}

const CHWAppointments = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editAppointment, setEditAppointment] = useState(null);
  const [cancelAppointment, setCancelAppointment] = useState(null);
  const [toast, setToast] = useState(null);
  const [appointmentData, setAppointmentData] = useState(EMPTY_APPOINTMENTS);
  const [backendPatients, setBackendPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [discoveredChwId, setDiscoveredChwId] = useState(null);
  const [resolvedChwId, setResolvedChwId] = useState(null);

  const chwIdCandidates = useMemo(
    () => getChwIdCandidates(user, discoveredChwId),
    [user, discoveredChwId]
  );
  const primaryChwId = resolvedChwId ?? chwIdCandidates[0] ?? null;

  useEffect(() => {
    let isMounted = true;
    const loadChwProfile = async () => {
      try {
        const me = await chwApi.me({ fallbackUserId: user?.id });
        const source =
          me?.data || me?.chw || me?.profile || me?.result || me;
        const found =
          source?.id ?? source?.chwId ?? source?.providerId ?? source?.userId;
        if (isMounted && found != null) {
          setDiscoveredChwId(String(found));
        }
      } catch {
        // Ignore and continue with auth-derived identifiers.
      }
    };

    loadChwProfile();
    return () => { isMounted = false; };
  }, [user?.id]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (type, message) => setToast({ type, message });

  const loadAppointments = useCallback(async () => {
    const candidates = chwIdCandidates.length > 0 ? chwIdCandidates : [null];
    let lastError = null;

    for (const candidate of candidates) {
      try {
        const snapshot = await refreshAppointmentGovernanceSnapshot({
          providerRole: 'CHW',
          chwId: candidate,
        });
        const nextData = mapSnapshotToChwAppointments(snapshot.appointments, candidate);
        setAppointmentData(nextData);
        syncChwAppointmentWorkItems(snapshot.appointments);
        if (candidate != null) {
          setResolvedChwId(String(candidate));
        }
        return;
      } catch (error) {
        lastError = error;
        const message = String(error?.message || '').toLowerCase();
        const looksLikeWrongChwId =
          message.includes('chw') && message.includes('not found');
        const looksLikeGenericMissingResource = message.includes('not found') || error?.status === 404;
        if (candidate != null && (looksLikeWrongChwId || looksLikeGenericMissingResource)) {
          continue;
        }
        break;
      }
    }

    setAppointmentData(EMPTY_APPOINTMENTS);
    showToast('error', lastError?.message || 'Failed to load appointments.');
  }, [chwIdCandidates]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const loadPatientOptions = useCallback(async () => {
    if (chwIdCandidates.length === 0 && !user?.id) {
      setBackendPatients([]);
      return;
    }

    setLoadingPatients(true);
    try {
      const patientRequests = [
        patientApi.list(),
        patientApi.list({ size: 500 }),
        patientApi.list({ page: 0, size: 500 }),
        patientApi.list({ limit: 500 }),
        fetchPatientsPaged(),
      ];

      const assignmentRequests = chwIdCandidates.flatMap((chwId) => ([
        assignmentApi.listByChw(chwId, { size: 500 }),
        assignmentApi.list({ chwId, size: 500 }),
      ]));

      assignmentRequests.push(assignmentApi.list({ size: 500 }));

      const appointmentRequests = [
        appointmentApi.list({ size: 500 }),
      ];

      const [patientResults, assignmentResults, appointmentResults] = await Promise.all([
        Promise.allSettled(patientRequests),
        Promise.allSettled(assignmentRequests),
        Promise.allSettled(appointmentRequests),
      ]);

      const patientRows = patientResults
        .filter((result) => result.status === 'fulfilled')
        .flatMap((result) => Array.isArray(result.value) ? result.value : normalizeListPayload(result.value));

      const assignmentRows = assignmentResults
        .filter((result) => result.status === 'fulfilled')
        .flatMap((result) => normalizeListPayload(result.value));

      const appointmentRows = appointmentResults
        .filter((result) => result.status === 'fulfilled')
        .flatMap((result) => normalizeListPayload(result.value));

      const directPatients = toPatientOptions(patientRows);
      const assignedPatients = toPatientOptions(
        assignmentRows.map((row) => ({
          patientId: row.patientId ?? row.patient?.id,
          patientName: row.patientName ?? row.patient?.fullName ?? row.patient?.name,
          firstName: row.patient?.firstName,
          middleName: row.patient?.middleName,
          lastName: row.patient?.lastName,
        }))
      );

      const appointmentPatients = toPatientOptions(
        appointmentRows.map((row) => ({
          patientId: row.patientId ?? row.patient?.id,
          patientName: row.patientName ?? row.patient?.fullName ?? row.patient?.name,
          firstName: row.patient?.firstName,
          middleName: row.patient?.middleName,
          lastName: row.patient?.lastName,
        }))
      );

      setBackendPatients(mergePatientOptions(directPatients, assignedPatients, appointmentPatients));
    } catch {
      setBackendPatients([]);
    } finally {
      setLoadingPatients(false);
    }
  }, [chwIdCandidates, user?.id]);

  useEffect(() => {
    loadPatientOptions();
  }, [loadPatientOptions]);

  const handleAddSave = async (newAppt) => {
    const payload = buildChwPayload(newAppt, primaryChwId);
    await appointmentApi.create(payload);
    await loadAppointments();
    showToast('success', `Appointment for ${newAppt.patientName || 'patient'} scheduled successfully.`);
  };

  const handleEditSave = async (updated) => {
    const payload = buildChwPayload(updated, primaryChwId);
    await appointmentApi.update(updated.id, payload);
    await loadAppointments();
    setEditAppointment(null);
    showToast('success', `Appointment for ${updated.patientName} updated successfully.`);
  };

  const handleCancelConfirm = async (appt) => {
    const result = await transitionGovernanceAppointment(appt.id, 'CANCELED', 'Cancelled by CHW');
    if (!result.ok) {
      throw new Error(result.reason || 'Failed to cancel appointment.');
    }
    await loadAppointments();
    showToast('success', `Appointment for ${appt.patientName} has been cancelled.`);
  };

  const appointmentPatientOptions = useMemo(() => {
    const uniquePatients = new Map();
    [...appointmentData.upcoming, ...appointmentData.completed, ...appointmentData.cancelled].forEach((item) => {
      const key = String(item.patientId || '').trim();
      if (!key) return;
      if (!uniquePatients.has(key)) {
        uniquePatients.set(key, {
          id: item.patientId,
          name: item.patientName || item.patientId,
        });
      }
    });
    return Array.from(uniquePatients.values());
  }, [appointmentData]);

  const patientOptions = useMemo(
    () => mergePatientOptions(backendPatients, appointmentPatientOptions),
    [backendPatients, appointmentPatientOptions]
  );

  const filterAppts = (list) => {
    if (!searchTerm.trim()) return list;
    const q = searchTerm.toLowerCase();
    return list.filter(
      (a) =>
        a.patientName?.toLowerCase().includes(q) ||
        a.patientId?.toLowerCase().includes(q) ||
        a.reason?.toLowerCase().includes(q) ||
        a.type?.toLowerCase().includes(q)
    );
  };

  const filteredUpcoming = filterAppts(appointmentData.upcoming);
  const filteredCompleted = filterAppts(appointmentData.completed);
  const filteredCancelled = filterAppts(appointmentData.cancelled);

  const stats = [
    { label: "Today's Appointments", value: String(appointmentData.upcoming.length), color: 'blue' },
    { label: 'This Week', value: String(appointmentData.upcoming.length + appointmentData.completed.length), color: 'blue' },
    { label: 'Pending Confirmation', value: String(appointmentData.upcoming.filter((a) => a.status === 'pending').length), color: 'blue' },
    { label: 'Completed This Month', value: String(appointmentData.completed.length), color: 'blue' },
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: filteredUpcoming.length },
    { id: 'completed', label: 'Completed', count: filteredCompleted.length },
    { id: 'cancelled', label: 'Cancelled', count: filteredCancelled.length },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video Call':
        return <Video className="w-5 h-5 text-blue-600" />;
      case 'Phone Call':
        return <Phone className="w-5 h-5 text-blue-600" />;
      default:
        return <MapPin className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-800';
      case 'pending':
        return 'text-yellow-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75 transition-opacity">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Appointments</h1>
         
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md flex-shrink-0">
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New Appointment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 sm:p-6 border border-gray-200">
            <p className="text-xs sm:text-sm mb-1 text-gray-600">{stat.label}</p>
            <p className={`text-2xl sm:text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty search state */}
      {searchTerm.trim() !== '' &&
        ((activeTab === 'upcoming' && filteredUpcoming.length === 0) ||
          (activeTab === 'completed' && filteredCompleted.length === 0) ||
          (activeTab === 'cancelled' && filteredCancelled.length === 0)) && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-700 font-semibold">No appointments found</p>
            <p className="text-sm text-gray-400 mt-1">
              No results for &ldquo;<span className="font-medium text-gray-500">{searchTerm}</span>&rdquo;
            </p>
          </div>
        )}

      {/* Upcoming Appointments */}
      {activeTab === 'upcoming' && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700">Patient</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Date & Time</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Duration</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Reason</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUpcoming.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{appt.patientName}</p>
                      <p className="text-xs text-gray-500">{appt.patientId}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>{appt.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{appt.duration}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        {getTypeIcon(appt.type)}
                        <span>{appt.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 max-w-[180px]">
                      <span className="line-clamp-2">{appt.reason}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(appt.status)}`}>
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {appt.type === 'Video Call' && (
                          <button className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium">
                            <Video className="w-3 h-3" />Join
                          </button>
                        )}
                        {appt.type === 'Phone Call' && (
                          <button className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium">
                            <Phone className="w-3 h-3" />Call
                          </button>
                        )}
                        <button
                          onClick={() => setEditAppointment(appt)}
                          className="flex items-center gap-1 px-2.5 py-1 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium">
                          <Edit className="w-3 h-3" />Edit
                        </button>
                        <button
                          onClick={() => setCancelAppointment(appt)}
                          className="flex items-center gap-1 px-2.5 py-1 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded text-xs font-medium transition-colors">
                          <XCircle className="w-3 h-3" />Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredUpcoming.map((appt) => (
              <div key={appt.id} className={`bg-white rounded-xl border p-4 ${
                appt.status === 'pending' ? 'border-yellow-200 bg-yellow-50/30' : 'border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{appt.patientName}</h3>
                    <p className="text-xs text-gray-500">{appt.patientId}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(appt.status)}`}>
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{appt.time} · {appt.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    {getTypeIcon(appt.type)}
                    <span className="text-xs text-gray-700">{appt.type}</span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg px-3 py-2 mb-3">
                  <p className="text-xs text-gray-700"><span className="font-semibold">Reason:</span> {appt.reason}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {appt.type === 'Video Call' && (
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">
                      <Video className="w-3.5 h-3.5" />Join Call
                    </button>
                  )}
                  {appt.type === 'Phone Call' && (
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">
                      <Phone className="w-3.5 h-3.5" />Call
                    </button>
                  )}
                  <button
                    onClick={() => setEditAppointment(appt)}
                    className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold">
                    <Edit className="w-3.5 h-3.5" />Edit
                  </button>
                  <button
                    onClick={() => setCancelAppointment(appt)}
                    className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-xs font-semibold transition-colors">
                    <XCircle className="w-3.5 h-3.5" />Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Completed Appointments */}
      {activeTab === 'completed' && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700">Patient</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Date & Time</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Duration</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Reason</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCompleted.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">{appt.patientName}</p>
                          <p className="text-xs text-gray-500">{appt.patientId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{appt.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{appt.duration}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        {getTypeIcon(appt.type)}
                        <span>{appt.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{appt.reason}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs max-w-[200px]">
                      <span className="line-clamp-2">{appt.notes || '—'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredCompleted.map((appt) => (
              <div key={appt.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">{appt.patientName}</h3>
                    <p className="text-xs text-gray-500">{appt.patientId}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{appt.time} · {appt.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    {getTypeIcon(appt.type)}
                    <span className="text-xs text-gray-700">{appt.type}</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-700"><span className="font-semibold">Reason:</span> {appt.reason}</p>
                  {appt.notes && (
                    <p className="text-xs text-gray-600 mt-1"><span className="font-semibold">Notes:</span> {appt.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Cancelled Appointments */}
      {activeTab === 'cancelled' && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700">Patient</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Date & Time</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Duration</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Cancellation Reason</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCancelled.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">{appt.patientName}</p>
                          <p className="text-xs text-gray-500">{appt.patientId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{appt.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{appt.duration}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        {getTypeIcon(appt.type)}
                        <span>{appt.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs max-w-[200px]">
                      <span className="line-clamp-2">{appt.cancelReason}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-colors">
                        Reschedule
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredCancelled.map((appt) => (
              <div key={appt.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">{appt.patientName}</h3>
                    <p className="text-xs text-gray-500">{appt.patientId}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{appt.time} · {appt.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    {getTypeIcon(appt.type)}
                    <span className="text-xs text-gray-700">{appt.type}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2 mb-3">
                  <p className="text-xs text-gray-700"><span className="font-semibold">Cancellation Reason:</span> {appt.cancelReason}</p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors">
                  Reschedule Appointment
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Add Appointment Modal */}
      <AddAppointmentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddSave}
        patients={patientOptions}
        isPatientsLoading={loadingPatients}
      />
      <EditAppointmentModal
        isOpen={!!editAppointment}
        appointment={editAppointment}
        onClose={() => setEditAppointment(null)}
        onSave={handleEditSave}
        patients={patientOptions}
        isPatientsLoading={loadingPatients}
      />
      <CancelAppointmentModal
        isOpen={!!cancelAppointment}
        appointment={cancelAppointment}
        onClose={() => setCancelAppointment(null)}
        onConfirm={handleCancelConfirm}
      />
    </div>
  );
};

export default CHWAppointments;
