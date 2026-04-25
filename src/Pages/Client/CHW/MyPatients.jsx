import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Users, Search, Filter, MapPin, Phone, Mail, Droplet,
  Eye, Edit, Plus, Download, RefreshCw,
} from 'lucide-react';
import AddPatientModal    from '../../../Components/Admin/AddPatientModal';
import EditPatientModal   from '../../../Components/Admin/EditPatientModal';
import PatientDetailsModal from '../../../Components/Admin/PatientDetailsModal';
import { patientApi } from '../../../API/endpoints/patientApi.js';
import { assignmentService } from '../../../Services/domain/assignmentService.js';
import { chwService } from '../../../Services/domain/chwService.js';
import { homeVisitService } from '../../../Services/domain/homeVisitService.js';
import { refreshAppointmentGovernanceSnapshot } from '../../../Services/appointmentGovernanceStore';
import { useAuth } from '../../../hooks/useAuth.jsx';



const calcAge = (dob) => {
  if (!dob) return '—';
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const formatBloodType = (bt) => {
  if (!bt) return '—';
  return bt.replace('_POS', '+').replace('_NEG', '-');
};

const genderLabel = (g) => {
  if (!g) return '—';
  if (g === 'MALE') return 'Male';
  if (g === 'FEMALE') return 'Female';
  if (g === 'OTHER') return 'Other';
  return 'Unknown';
};

const statusConfig = {
  ACTIVE:   { label: 'Active',   cls: 'text-green-800' },
  INACTIVE: { label: 'Inactive', cls: 'text-gray-700'  },
  DECEASED: { label: 'Deceased', cls: 'text-red-800'   },
};

const AVATAR_COLORS = [
  'bg-blue-600',
  
];

const normalizeListPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const toNumericId = (value) => {
  if (value == null) return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  const text = String(value).trim();
  if (!text) return null;
  if (/^\d+$/.test(text)) return Number(text);

  const match = text.match(/\d+/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
};

const toStatus = (value) => {
  const status = String(value || '').trim().toUpperCase();
  if (status === 'ACTIVE' || status === 'INACTIVE' || status === 'DECEASED') return status;
  return 'INACTIVE';
};

const toChronicConditions = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || '').trim())
      .filter(Boolean)
      .join(', ');
  }
  return String(value || '').trim();
};

const splitName = (value) => {
  const parts = String(value || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: '', middleName: '', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], middleName: '', lastName: '' };
  if (parts.length === 2) return { firstName: parts[0], middleName: '', lastName: parts[1] };
  return {
    firstName: parts[0],
    middleName: parts.slice(1, -1).join(' '),
    lastName: parts[parts.length - 1],
  };
};

const isHomeVisitAppointment = (value) => {
  const text = String(value || '').toUpperCase();
  return text.includes('HOME') && text.includes('VISIT');
};

const normalizePatientRecord = (row = {}, fallbackId = null) => {
  const fullName = row.name || row.fullName || row.patientName || '';
  const parts = splitName(fullName);

  const firstName = String(row.firstName || parts.firstName || '').trim();
  const middleName = String(row.middleName || parts.middleName || '').trim();
  const lastName = String(row.lastName || parts.lastName || '').trim();

  const rawId = row.id ?? row.patientId ?? fallbackId ?? row.nationalId ?? row.email ?? row.phone ?? null;
  const stableId = rawId == null ? `${firstName}-${lastName}-${row.dateOfBirth || 'unknown'}` : rawId;

  return {
    ...row,
    id: stableId,
    firstName,
    middleName,
    lastName,
    gender: String(row.gender || 'OTHER').toUpperCase(),
    dateOfBirth: row.dateOfBirth || row.dob || row.birthDate || null,
    phone: row.phone || row.primaryPhone || row.mobilePhone || '',
    email: row.email || '',
    addressLine1: row.addressLine1 || row.street || row.address?.line1 || '',
    city: row.city || row.town || row.address?.city || '',
    country: row.country || row.address?.country || '',
    nationalId: row.nationalId || row.idNumber || row.nationalIdentifier || '',
    chronicConditions: toChronicConditions(row.chronicConditions || row.conditions || row.condition),
    bloodType: row.bloodType || row.bloodGroup || row.blood_group || '',
    status: toStatus(row.status || row.patientStatus || 'ACTIVE'),
    maritalStatus: row.maritalStatus || row.civilStatus || '',
  };
};

const sortPatientsByName = (rows = []) => {
  return [...rows].sort((a, b) => {
    const nameA = `${a.firstName || ''} ${a.lastName || ''}`.trim().toLowerCase();
    const nameB = `${b.firstName || ''} ${b.lastName || ''}`.trim().toLowerCase();
    return nameA.localeCompare(nameB);
  });
};


const MyPatients = () => {
  const { user } = useAuth();

  const [searchTerm, setSearchTerm]     = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewPatient, setViewPatient]   = useState(null);
  const [editPatient, setEditPatient]   = useState(null);
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [resolvedChwId, setResolvedChwId] = useState(null);

  const activeChwId = useMemo(() => (
    resolvedChwId
    ?? toNumericId(user?.chwId)
    ?? toNumericId(user?.providerId)
    ?? toNumericId(user?.id)
    ?? null
  ), [resolvedChwId, user?.chwId, user?.providerId, user?.id]);

  const chwNameCandidates = useMemo(
    () => [user?.username, user?.name]
      .filter(Boolean)
      .map((value) => String(value).trim().toLowerCase()),
    [user?.name, user?.username]
  );

  const loadPatients = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const patientKeys = new Set();
      const embeddedById = new Map();
      const fallbackRows = [];
      const fallbackLookup = new Set();

      const registerPatient = ({ rawPatientId, rawPatient, patientName, phone, city, addressLine1 }) => {
        const numeric = toNumericId(rawPatientId);
        const key = numeric != null ? String(numeric) : (rawPatientId != null ? String(rawPatientId) : null);

        if (key) {
          patientKeys.add(key);
        }

        if (rawPatient) {
          const embeddedKey = key || String(rawPatient?.id ?? rawPatient?.patientId ?? '').trim() || null;
          if (embeddedKey && !embeddedById.has(embeddedKey)) {
            embeddedById.set(embeddedKey, normalizePatientRecord(rawPatient, embeddedKey));
          }
          return;
        }

        if (patientName) {
          const signature = `${String(patientName || '').trim().toLowerCase()}|${String(phone || '').trim()}|${String(city || '').trim().toLowerCase()}|${String(addressLine1 || '').trim().toLowerCase()}`;
          if (fallbackLookup.has(signature)) return;
          fallbackLookup.add(signature);

          const fallbackId = key || `fallback-${signature.replace(/[^a-z0-9|]/g, '').replace(/\|+/g, '-') || 'patient'}`;
          fallbackRows.push(normalizePatientRecord({
            id: fallbackId,
            fullName: patientName,
            phone: phone || '',
            city: city || '',
            addressLine1: addressLine1 || '',
            status: 'ACTIVE',
          }, key || fallbackId));
        }
      };

      let homeVisits = [];
      try {
        const query = activeChwId != null ? { chwId: activeChwId } : {};
        homeVisits = await homeVisitService.listHomeVisits(query);
      } catch {
        homeVisits = [];
      }

      homeVisits.forEach((visit) => {
        registerPatient({
          rawPatientId: visit?.patientId,
          rawPatient: visit?.raw?.patient,
          patientName: visit?.patientName,
          phone: visit?.phone,
          city: visit?.city,
          addressLine1: visit?.location,
        });
      });

      let appointmentRows = [];
      try {
        const snapshot = await refreshAppointmentGovernanceSnapshot(
          activeChwId != null
            ? { providerRole: 'CHW', chwId: activeChwId }
            : { providerRole: 'CHW' }
        );

        const rows = Array.isArray(snapshot?.appointments) ? snapshot.appointments : [];
        appointmentRows = rows
          .filter((row) => String(row?.providerRole || '').toUpperCase() === 'CHW')
          .filter((row) => (activeChwId == null || String(row?.providerId ?? '') === String(activeChwId)))
          .filter((row) => isHomeVisitAppointment(row?.appointmentType));
      } catch {
        appointmentRows = [];
      }

      appointmentRows.forEach((row) => {
        registerPatient({
          rawPatientId: row?.patientId,
          patientName: row?.patientName,
          addressLine1: row?.facility,
        });
      });

      let assignments = [];
      if (activeChwId != null) {
        try {
          assignments = await assignmentService.listAssignmentsByChw(activeChwId, { size: 500 });
        } catch (fetchError) {
          if (![404].includes(fetchError?.status)) throw fetchError;
        }
      }

      if (!assignments.length) {
        const allAssignments = await assignmentService.listAssignments({ size: 500 });
        assignments = allAssignments.filter((row) => {
          const identifiers = [
            row?.chwId,
            row?.raw?.chwId,
            row?.raw?.chw?.id,
            row?.raw?.providerId,
            row?.raw?.provider?.id,
          ];

          if (activeChwId != null) {
            const ownsRow = identifiers.some((value) => String(value ?? '') === String(activeChwId));
            if (ownsRow) return true;
          }

          const chwName = String(
            row?.chwName
            || row?.raw?.chwName
            || row?.raw?.chw?.fullName
            || row?.raw?.chw?.name
            || ''
          ).toLowerCase();

          return chwNameCandidates.some((candidate) => candidate && chwName.includes(candidate));
        });
      }

      assignments.forEach((row) => {
        registerPatient({
          rawPatientId: row?.patientId ?? row?.raw?.patientId,
          rawPatient: row?.raw?.patient,
          patientName: row?.patientName,
        });
      });

      const hydratedFromList = new Map();
      if (patientKeys.size > 0) {
        try {
          const payload = await patientApi.list({ size: 1000 });
          const listed = normalizeListPayload(payload);
          listed.forEach((row) => {
            const candidates = [row?.id, row?.patientId, row?.raw?.id, row?.raw?.patientId];
            for (const candidate of candidates) {
              const numeric = toNumericId(candidate);
              const key = numeric != null ? String(numeric) : (candidate != null ? String(candidate) : null);
              if (key && patientKeys.has(key)) {
                hydratedFromList.set(key, normalizePatientRecord(row, key));
                break;
              }
            }
          });
        } catch {
          // Continue with direct by-id hydration.
        }
      }

      const hydratedById = await Promise.all(
        Array.from(patientKeys).map(async (key) => {
          if (embeddedById.has(key)) return embeddedById.get(key);
          if (hydratedFromList.has(key)) return hydratedFromList.get(key);
          try {
            const payload = await patientApi.getById(key);
            return normalizePatientRecord(payload, key);
          } catch {
            return null;
          }
        })
      );

      const patientRows = hydratedById.filter(Boolean);

      // Fallback: try direct patient endpoint queries when assignment links are missing.
      if (!patientRows.length && fallbackRows.length === 0 && activeChwId != null) {
        const queries = [
          { chwId: activeChwId, size: 500 },
          { assignedChwId: activeChwId, size: 500 },
          { providerId: activeChwId, size: 500 },
        ];

        for (const query of queries) {
          try {
            const payload = await patientApi.list(query);
            const list = normalizeListPayload(payload).map((row) => normalizePatientRecord(row));
            if (list.length) {
              setPatients(sortPatientsByName(list));
              setIsLoading(false);
              return;
            }
          } catch {
            // Continue trying alternate query shapes.
          }
        }
      }

      const deduped = Array.from(
        [...patientRows, ...fallbackRows].reduce((acc, row) => {
          acc.set(String(row.id), row);
          return acc;
        }, new Map()).values()
      );

      setPatients(sortPatientsByName(deduped));
    } catch (fetchError) {
      setPatients([]);
      setError(fetchError?.message || 'Failed to fetch linked patients from backend.');
    } finally {
      setIsLoading(false);
    }
  }, [activeChwId, chwNameCandidates]);

  useEffect(() => {
    let active = true;

    const resolveBackendChwId = async () => {
      try {
        const profile = await chwService.getMe();
        const id = toNumericId(profile?.id ?? profile?.raw?.id ?? profile?.raw?.chwId ?? profile?.raw?.providerId ?? profile?.raw?.user?.id);
        if (active && id != null) {
          setResolvedChwId(id);
        }
      } catch {
        // Continue with identifiers from auth user.
      }
    };

    resolveBackendChwId();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

 
  const handleAddSave = async (form) => {
    try {
      const saved = await patientApi.create(form);
      const normalized = normalizePatientRecord(saved);
      setPatients((prev) => sortPatientsByName([...prev, normalized]));
      setShowAddModal(false);
    } catch (saveError) {
      setError(saveError?.message || 'Failed to create patient.');
    }
  };

  const handleEditSave = async (form) => {
    try {
      const updated = await patientApi.update(form.id, form);
      const normalized = normalizePatientRecord(updated, form.id);
      setPatients((prev) => prev.map((p) => (String(p.id) === String(form.id) ? normalized : p)));
      setEditPatient(null);
    } catch (saveError) {
      setError(saveError?.message || 'Failed to update patient.');
    }
  };

  const handleViewToEdit = () => {
    setEditPatient(viewPatient);
    setViewPatient(null);
  };

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const fullName = `${p.firstName || ''} ${p.middleName || ''} ${p.lastName || ''}`.toLowerCase();
      const matchSearch =
        fullName.includes(searchTerm.toLowerCase())
        || String(p.id ?? '').includes(searchTerm)
        || String(p.nationalId || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = filterStatus === 'ALL' || p.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [patients, searchTerm, filterStatus]);

  const stats = useMemo(() => ([
    { label: 'Total Patients', value: patients.length },
    { label: 'Active', value: patients.filter((p) => p.status === 'ACTIVE').length },
    { label: 'Inactive', value: patients.filter((p) => p.status === 'INACTIVE').length },
    { label: 'Deceased', value: patients.filter((p) => p.status === 'DECEASED').length },
  ]), [patients]);

  const handleExport = () => {
    const rows = [
      ['ID', 'Name', 'Age', 'Gender', 'National ID', 'Phone', 'Email', 'Location', 'Status'],
      ...filtered.map((p) => [
        p.id,
        `${p.firstName || ''} ${p.middleName ? `${p.middleName} ` : ''}${p.lastName || ''}`.trim(),
        calcAge(p.dateOfBirth),
        genderLabel(p.gender),
        p.nationalId || '',
        p.phone || '',
        p.email || '',
        [p.city, p.addressLine1].filter(Boolean).join(', '),
        p.status || '',
      ]),
    ];

    const csv = rows
      .map((row) => row.map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `chw-linked-patients-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Patients</h1>
          <p className="text-sm text-gray-500 mt-1">Showing patients linked to your signed-in CHW account.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadPatients}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Patient</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading && patients.length === 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Loading linked patients from backend...
        </div>
      )}

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 px-4 py-4 sm:px-5">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-blue-600">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Search & Filter ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 sm:max-w-md">
          
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID or national ID…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-1 sm:flex-none">
            <Filter className="w-4 h-4 text-gray-500 shrink-0" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 sm:flex-none text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="ALL">All Patients</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DECEASED">Deceased</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* ── Mobile Cards (< md) ── */}
      <div className="md:hidden space-y-3">
        {filtered.map((p) => {
          const sc = statusConfig[p.status] ?? statusConfig.INACTIVE;
          const conditions = p.chronicConditions
            ? p.chronicConditions.split(',').map((c) => c.trim()).filter(Boolean)
            : [];
          const initials = ((p.firstName?.[0] ?? '') + (p.lastName?.[0] ?? '')).toUpperCase();
          const avatarBg = AVATAR_COLORS[(toNumericId(p.id) ?? 0) % AVATAR_COLORS.length];
          return (
            <div key={p.id} className="bg-white border rounded-lg border-gray-200 p-4">
              {/* Card header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0 ${avatarBg}`}>
                    {initials || '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 leading-tight">
                      {p.firstName} {p.middleName ? `${p.middleName} ` : ''}{p.lastName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      #{p.id} · {calcAge(p.dateOfBirth)} yrs · {genderLabel(p.gender)}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${sc.cls}`}>
                  {sc.label}
                </span>
              </div>

              {/* Contact & location */}
              <div className="space-y-1.5 text-sm mb-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{p.phone || '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 min-w-0">
                  <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{p.email || '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{[p.city, p.addressLine1].filter(Boolean).join(', ') || '—'}</span>
                </div>
              </div>

              {/* Conditions + blood type */}
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex flex-wrap gap-1">
                  {conditions.length
                    ? conditions.map((c, i) => (
                        <span key={i} className="px-2 py-0.5  text-blue-700 text-xs rounded-full border border-blue-100 whitespace-nowrap">{c}</span>
                      ))
                    : <span className="text-xs text-gray-400">No conditions</span>}
                </div>
                {p.bloodType && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 shrink-0">
                    <Droplet className="w-3 h-3" />{formatBloodType(p.bloodType)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setViewPatient(p)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg font-medium transition-colors"
                >
                  <Eye className="w-4 h-4" /> View
                </button>
                <button
                  onClick={() => setEditPatient(p)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Desktop Table (≥ md) ── */}
      <div className="hidden md:block bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Age</th>
                <th className="px-4 py-3 text-left">Gender</th>
                <th className="px-4 py-3 text-left">National ID</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Chronic Conditions</th>
                <th className="px-4 py-3 text-left">Blood Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => {
                const sc = statusConfig[p.status] ?? statusConfig.INACTIVE;
                const conditions = p.chronicConditions
                  ? p.chronicConditions.split(',').map((c) => c.trim()).filter(Boolean)
                  : [];
                return (
                  <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-400 text-xs">#{p.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold text-gray-900">
                      {p.firstName} {p.middleName ? `${p.middleName} ` : ''}{p.lastName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">{calcAge(p.dateOfBirth)} yrs</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">{genderLabel(p.gender)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      {p.nationalId || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" />{p.phone}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 shrink-0 text-gray-400" />{p.email}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                        {[p.city, p.addressLine1].filter(Boolean).join(', ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {conditions.length
                          ? conditions.map((c, i) => (
                              <span key={i} className="px-2 py-0.5 text-blue-700 text-xs whitespace-nowrap">{c}</span>
                            ))
                          : <span className="text-gray-300 text-xs">None</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {p.bloodType ? (
                        <span className="inline-flex items-center gap-1 text-red-700 text-xs font-semibold">
                          <Droplet className="w-3 h-3" />{formatBloodType(p.bloodType)}
                        </span>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${sc.cls}`}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button
                          title="View patient"
                          onClick={() => setViewPatient(p)}
                          className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          title="Edit patient"
                          onClick={() => setEditPatient(p)}
                          className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
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

      {/* ── Empty State ── */}
      {filtered.length === 0 && (
        <div className="bg-white border border-gray-200 p-10 sm:p-14 text-center">
          <Users className="w-12 h-12 sm:w-14 sm:h-14 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">No patients found</h3>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or status filter</p>
        </div>
      )}

      {/* ── Modals ── */}
      <AddPatientModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        onSavePatient={handleAddSave}
      />

      <PatientDetailsModal
        patient={viewPatient}
        isOpen={!!viewPatient}
        onClose={() => setViewPatient(null)}
        onEdit={handleViewToEdit}
      />

      <EditPatientModal
        patient={editPatient}
        isOpen={!!editPatient}
        onClose={() => setEditPatient(null)}
        onSave={handleEditSave}
      />

    </div>
  );
};

export default MyPatients;
