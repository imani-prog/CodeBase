import { appointmentApi } from '../API/endpoints/appointmentApi.js';
import { normalizeArray } from './mappers/normalize.js';

const STORE_UPDATED_EVENT = 'appointment-governance-store-updated';

const STATUS = {
  BOOKED: 'BOOKED',
  ARRIVED: 'ARRIVED',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
};

const EMPTY_STORE = {
  appointments: [],
  updatedAt: null,
};

let memoryStore = { ...EMPTY_STORE };

function emitUpdate() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(STORE_UPDATED_EVENT));
}

function parseTimeTo24h(timeText) {
  if (!timeText) return null;
  if (/^\d{2}:\d{2}$/.test(timeText)) return timeText;
  const match = String(timeText).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const suffix = match[3].toUpperCase();

  let converted = hour % 12;
  if (suffix === 'PM') converted += 12;

  return `${String(converted).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function toIsoDateTime(date, time) {
  if (!date) return null;
  const h24 = parseTimeTo24h(time) || '09:00';
  const iso = new Date(`${date}T${h24}:00`).toISOString();
  return Number.isNaN(Date.parse(iso)) ? null : iso;
}

function toSafeIso(value) {
  if (value === undefined || value === null || value === '') return null;
  const ts = Date.parse(String(value));
  if (Number.isNaN(ts)) return null;
  return new Date(ts).toISOString();
}

function firstNonEmpty(...values) {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    if (typeof value === 'string' && value.trim() === '') continue;
    return value;
  }
  return null;
}

function normalizeReasonCode(text, kind) {
  const input = String(text || '').toLowerCase();

  if (kind === 'CANCEL') {
    if (/patient|unavailable|not available|no show/.test(input)) return 'PATIENT_UNAVAILABLE';
    if (/provider|doctor|chw|staff/.test(input)) return 'PROVIDER_UNAVAILABLE';
    if (/transport|travel|distance/.test(input)) return 'TRANSPORT_BARRIER';
    if (/cost|fee|insurance|nhif|sha/.test(input)) return 'FINANCIAL_CONSTRAINT';
    if (/emergency|urgent/.test(input)) return 'EMERGENCY_CONFLICT';
    return 'OTHER_CANCELLATION';
  }

  if (/patient request|reschedule|preferred|timing/.test(input)) return 'PATIENT_REQUESTED_TIME_CHANGE';
  if (/provider|doctor|chw|staff/.test(input)) return 'PROVIDER_SCHEDULE_CONFLICT';
  if (/facility|clinic|room/.test(input)) return 'FACILITY_CAPACITY_CONSTRAINT';
  if (/transport|travel/.test(input)) return 'TRANSPORT_DELAY';
  return 'OTHER_RESCHEDULE';
}

function normalizeStatus(value) {
  const input = String(value || '').toUpperCase();

  if (['ARRIVED', 'CHECKED_IN', 'IN_PROGRESS'].includes(input)) return STATUS.ARRIVED;
  if (['COMPLETED', 'CHECKED_OUT', 'DONE'].includes(input)) return STATUS.COMPLETED;
  if (['CANCELED', 'CANCELLED', 'NO_SHOW'].includes(input)) return STATUS.CANCELED;
  if (['BOOKED', 'CONFIRMED', 'PENDING', 'SCHEDULED', 'RESCHEDULED'].includes(input)) return STATUS.BOOKED;

  return STATUS.BOOKED;
}

function inferProviderRole(item) {
  const hints = [
    item.providerRole,
    item.providerType,
    item.role,
    item.type,
    item.appointmentType,
    item.specialty,
    item.providerName,
    item.doctorName,
    item.chwName,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (/chw|community health|home visit|nurse/.test(hints)) return 'CHW';
  return 'DOCTOR';
}

function isFollowUp(item) {
  return /follow-up|follow up|review/i.test(String(item.reason || item.notes || item.description || ''));
}

function normalizePayloadAppointments(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.appointments)) return payload.appointments;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

function mapBackendAppointment(raw = {}, index = 0) {
  const patient = raw.patient || {};
  const provider = raw.provider || {};
  const hospital = raw.hospital || {};

  const rawId = firstNonEmpty(raw.id, raw.appointmentId, raw.code, raw.appointmentCode, `row-${index}`);
  const scheduledAt = toSafeIso(
    firstNonEmpty(
      raw.scheduledStart,
      raw.scheduledAt,
      raw.startAt,
      raw.startTime,
      raw.appointmentDate,
      raw.date,
      raw.start
    )
  );

  const cancellationReason = firstNonEmpty(
    raw.cancellationReason,
    raw.cancelReason,
    raw.cancelReasonText,
    raw.cancelReasonCode
  );

  const rescheduleReason = firstNonEmpty(raw.rescheduleReason, raw.rescheduleNote, raw.rescheduleComment);

  const reasonCode = firstNonEmpty(
    raw.reasonCode,
    cancellationReason ? normalizeReasonCode(cancellationReason, 'CANCEL') : null,
    rescheduleReason ? normalizeReasonCode(rescheduleReason, 'RESCHEDULE') : null
  );

  const providerRole = inferProviderRole(raw);
  const followUpRequired = Boolean(raw.followUpRequired) || isFollowUp(raw);
  const followUpDueAt =
    toSafeIso(firstNonEmpty(raw.followUpDueAt, raw.followUpAt, raw.followUpDate)) ||
    (followUpRequired ? scheduledAt : null);

  const updatedAt =
    toSafeIso(firstNonEmpty(raw.updatedAt, raw.modifiedAt, raw.lastUpdated, raw.createdAt, scheduledAt)) ||
    new Date().toISOString();

  return {
    id: rawId,
    source: String(firstNonEmpty(raw.source, 'BACKEND')),
    sourceAppointmentId: String(rawId),
    patientId: firstNonEmpty(raw.patientId, patient.id, patient.patientId, 'N/A'),
    patientName: String(firstNonEmpty(raw.patientName, patient.fullName, patient.name, 'Unknown Patient')),
    providerRole,
    providerId: firstNonEmpty(raw.providerId, raw.doctorId, raw.chwId, provider.id, providerRole),
    providerName: String(
      firstNonEmpty(
        raw.providerName,
        raw.doctorName,
        raw.chwName,
        provider.fullName,
        provider.name,
        providerRole === 'CHW' ? 'CHW On Call' : 'Doctor On Call'
      )
    ),
    facility: String(
      firstNonEmpty(raw.facility, raw.location, raw.hospitalName, hospital.name, raw.clinicName, raw.room, 'Unknown Facility')
    ),
    appointmentType: String(firstNonEmpty(raw.appointmentType, raw.type, 'General Appointment')),
    reason: firstNonEmpty(raw.reason, raw.notes, raw.description, null),
    reasonCode: reasonCode ? String(reasonCode) : null,
    scheduledAt,
    status: normalizeStatus(raw.status),
    followUpRequired,
    followUpDueAt,
    cancellationReason: cancellationReason ? String(cancellationReason) : null,
    rescheduleReason: rescheduleReason ? String(rescheduleReason) : null,
    updatedAt,
  };
}

function computeAggregates(appointments) {
  const now = Date.now();
  const pipeline = {
    booked: appointments.filter((a) => a.status === STATUS.BOOKED).length,
    arrived: appointments.filter((a) => a.status === STATUS.ARRIVED).length,
    completed: appointments.filter((a) => a.status === STATUS.COMPLETED).length,
    canceled: appointments.filter((a) => a.status === STATUS.CANCELED).length,
  };

  const pipelineByProvider = ['CHW', 'DOCTOR'].map((role) => {
    const scoped = appointments.filter((a) => a.providerRole === role);
    return {
      role,
      booked: scoped.filter((a) => a.status === STATUS.BOOKED).length,
      arrived: scoped.filter((a) => a.status === STATUS.ARRIVED).length,
      completed: scoped.filter((a) => a.status === STATUS.COMPLETED).length,
      canceled: scoped.filter((a) => a.status === STATUS.CANCELED).length,
      total: scoped.length,
    };
  });

  const facilityMap = new Map();
  appointments.forEach((a) => {
    const key = a.facility || 'Unknown Facility';
    if (!facilityMap.has(key)) {
      facilityMap.set(key, { facility: key, booked: 0, arrived: 0, completed: 0, canceled: 0, total: 0 });
    }

    const row = facilityMap.get(key);
    row.total += 1;
    if (a.status === STATUS.BOOKED) row.booked += 1;
    if (a.status === STATUS.ARRIVED) row.arrived += 1;
    if (a.status === STATUS.COMPLETED) row.completed += 1;
    if (a.status === STATUS.CANCELED) row.canceled += 1;
  });

  const pipelineByFacility = Array.from(facilityMap.values()).sort((a, b) => b.total - a.total);

  const overdueFollowUps = appointments
    .filter((a) => a.followUpRequired && a.status !== STATUS.COMPLETED && a.status !== STATUS.CANCELED)
    .filter((a) => {
      const due = Date.parse(a.followUpDueAt || '');
      return !Number.isNaN(due) && due < now;
    })
    .sort((a, b) => Date.parse(a.followUpDueAt || '') - Date.parse(b.followUpDueAt || ''));

  const reasonCounter = new Map();
  appointments.forEach((a) => {
    if (!a.reasonCode) return;
    reasonCounter.set(a.reasonCode, (reasonCounter.get(a.reasonCode) || 0) + 1);
  });

  const reasonAnalytics = Array.from(reasonCounter.entries())
    .map(([reasonCode, count]) => ({ reasonCode, count }))
    .sort((a, b) => b.count - a.count);

  return {
    pipeline,
    pipelineByProvider,
    pipelineByFacility,
    overdueFollowUps,
    reasonAnalytics,
  };
}

function writeMemoryStore(appointments) {
  memoryStore = {
    appointments,
    updatedAt: new Date().toISOString(),
  };

  return memoryStore;
}

export async function refreshAppointmentGovernanceSnapshot(params = {}) {
  const payload = await appointmentApi.list(params);
  const rows = normalizeArray(normalizePayloadAppointments(payload));
  const normalized = rows.map((item, index) => mapBackendAppointment(item, index));

  writeMemoryStore(normalized);
  emitUpdate();

  return getAppointmentGovernanceSnapshot();
}

export function syncChwAppointments() {
  // Backend API is now the single source of truth for governance data.
}

export function syncPatientAppointments() {
  // Backend API is now the single source of truth for governance data.
}

export async function transitionGovernanceAppointment(appointmentId, nextStatus, reasonText) {
  if (!Object.values(STATUS).includes(nextStatus)) {
    return { ok: false, reason: 'Invalid status' };
  }

  try {
    if (nextStatus === STATUS.ARRIVED) {
      await appointmentApi.checkIn(appointmentId);
    } else if (nextStatus === STATUS.COMPLETED) {
      await appointmentApi.checkOut(appointmentId);
    } else if (nextStatus === STATUS.CANCELED) {
      await appointmentApi.cancel(appointmentId, { reason: reasonText || 'Canceled by admin' });
    } else if (nextStatus === STATUS.BOOKED) {
      await appointmentApi.confirm(appointmentId);
    }

    await refreshAppointmentGovernanceSnapshot();
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error?.message || 'Could not update appointment status' };
  }
}

export async function rescheduleGovernanceAppointment(appointmentId, nextDate, nextTime) {
  if (!nextDate || !nextTime) {
    return { ok: false, reason: 'New date and time are required' };
  }

  const newStart = toIsoDateTime(nextDate, nextTime);
  if (!newStart) {
    return { ok: false, reason: 'Invalid date or time' };
  }

  const newEnd = new Date(Date.parse(newStart) + 30 * 60 * 1000).toISOString();

  try {
    await appointmentApi.reschedule(appointmentId, { newStart, newEnd });
    await refreshAppointmentGovernanceSnapshot();
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error?.message || 'Could not reschedule appointment' };
  }
}

export function getAppointmentGovernanceSnapshot() {
  const appointments = [...memoryStore.appointments].sort((a, b) => {
    const bTs = Date.parse(b.updatedAt || b.scheduledAt || 0);
    const aTs = Date.parse(a.updatedAt || a.scheduledAt || 0);
    return bTs - aTs;
  });

  return {
    appointments,
    ...computeAggregates(appointments),
    updatedAt: memoryStore.updatedAt,
  };
}

export function subscribeToAppointmentGovernanceUpdates(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback(getAppointmentGovernanceSnapshot());
  window.addEventListener(STORE_UPDATED_EVENT, handler);
  return () => window.removeEventListener(STORE_UPDATED_EVENT, handler);
}
