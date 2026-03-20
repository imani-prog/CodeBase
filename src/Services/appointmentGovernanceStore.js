const STORAGE_KEY = 'medilink_appointment_governance_v1';
const STORE_UPDATED_EVENT = 'appointment-governance-store-updated';

const STATUS = {
  BOOKED: 'BOOKED',
  ARRIVED: 'ARRIVED',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
};

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

function inferProviderRole(item) {
  const specialty = String(item.specialty || '').toLowerCase();
  const type = String(item.type || '').toLowerCase();
  if (specialty.includes('community health worker') || type.includes('home visit')) return 'CHW';
  return 'DOCTOR';
}

function isFollowUp(item) {
  return /follow-up|follow up|review/i.test(String(item.reason || ''));
}

const SEED_META = {
  chwId: 'CHW-001',
  chwName: 'Jane Wanjiru',
  patientId: 'PT-SELF-001',
  patientName: 'Patient User',
};

const SEEDED_CHW = {
  upcoming: [
    {
      id: 1,
      patientName: 'Sarah Wanjiru',
      patientId: 'PT-2023-001',
      date: '2024-10-25',
      time: '10:00 AM',
      duration: '30 min',
      type: 'In-Person',
      location: 'Community Health Center',
      reason: 'Blood Pressure Check',
      status: 'confirmed',
    },
    {
      id: 2,
      patientName: 'John Kamau',
      patientId: 'PT-2023-045',
      date: '2024-10-25',
      time: '2:00 PM',
      duration: '45 min',
      type: 'Video Call',
      location: 'Telemedicine',
      reason: 'Follow-up Consultation',
      status: 'pending',
    },
  ],
  completed: [
    {
      id: 5,
      patientName: 'Grace Akinyi',
      patientId: 'PT-2023-156',
      date: '2024-10-22',
      time: '10:30 AM',
      duration: '30 min',
      type: 'In-Person',
      location: 'Community Health Center',
      reason: 'Nutrition Counseling',
      notes: 'Patient showed improvement in diet adherence',
    },
  ],
  cancelled: [
    {
      id: 7,
      patientName: 'Jane Wambui',
      patientId: 'PT-2023-178',
      date: '2024-10-20',
      time: '3:00 PM',
      duration: '30 min',
      type: 'In-Person',
      location: 'Community Health Center',
      reason: 'General Checkup',
      cancelReason: 'Patient requested reschedule',
    },
  ],
};

const SEEDED_PATIENT = {
  upcoming: [
    {
      id: 101,
      type: 'Clinic Visit',
      doctor: 'Dr. Sarah Kamau',
      specialty: 'General Practitioner',
      date: '2025-10-22',
      time: '10:00 AM',
      location: 'Nairobi Health Center',
      status: 'confirmed',
      reason: 'Annual checkup',
      bookingRef: 'APT-2025-001234',
    },
    {
      id: 102,
      type: 'Home Visit',
      doctor: 'Nurse Jane Ochieng',
      specialty: 'Community Health Worker',
      date: '2025-10-30',
      time: '11:00 AM',
      location: 'Patient Home',
      status: 'pending',
      reason: 'Follow-up consultation',
      bookingRef: 'APT-2025-001236',
    },
  ],
  past: [
    {
      id: 103,
      type: 'Telemedicine',
      doctor: 'Dr. Emily Njoroge',
      specialty: 'Dermatologist',
      date: '2025-09-15',
      time: '9:00 AM',
      location: 'Video Consultation',
      status: 'completed',
      reason: 'Skin rash evaluation',
      bookingRef: 'APT-2025-001211',
    },
  ],
  cancelled: [
    {
      id: 104,
      type: 'Telemedicine',
      doctor: 'Dr. David Otieno',
      specialty: 'Pediatrician',
      date: '2025-10-05',
      time: '4:00 PM',
      location: 'Video Consultation',
      status: 'cancelled',
      reason: 'Child fever follow-up',
      cancelReason: 'Patient requested reschedule',
      bookingRef: 'APT-2025-001212',
    },
  ],
};

function normalizeChwStatus(item, bucket) {
  if (bucket === 'completed') return STATUS.COMPLETED;
  if (bucket === 'cancelled') return STATUS.CANCELED;
  if (item.status === 'arrived') return STATUS.ARRIVED;
  return STATUS.BOOKED;
}

function normalizePatientStatus(item, bucket) {
  if (bucket === 'past') return STATUS.COMPLETED;
  if (bucket === 'cancelled') return STATUS.CANCELED;
  if (item.status === 'arrived' || item.status === 'checked_in') return STATUS.ARRIVED;
  if (item.status === 'completed') return STATUS.COMPLETED;
  if (item.status === 'cancelled') return STATUS.CANCELED;
  return STATUS.BOOKED;
}

function normalizeChwAppointments(appointmentData, meta) {
  const chunks = ['upcoming', 'completed', 'cancelled'];
  const rows = [];

  chunks.forEach((bucket) => {
    (appointmentData?.[bucket] || []).forEach((item) => {
      const standardizedReasonCode =
        bucket === 'cancelled'
          ? normalizeReasonCode(item.cancelReason || item.reason, 'CANCEL')
          : null;

      rows.push({
        id: `CHW:${meta.chwId}:${item.id}`,
        source: 'CHW_PORTAL',
        sourceAppointmentId: String(item.id),
        patientId: item.patientId || 'N/A',
        patientName: item.patientName || 'Unknown Patient',
        providerRole: 'CHW',
        providerId: meta.chwId,
        providerName: meta.chwName,
        facility: item.location || 'Community Health Center',
        appointmentType: item.type || 'In-Person',
        reason: item.reason || null,
        reasonCode: standardizedReasonCode,
        scheduledAt: toIsoDateTime(item.date, item.time),
        status: normalizeChwStatus(item, bucket),
        followUpRequired: isFollowUp(item),
        followUpDueAt: isFollowUp(item) ? toIsoDateTime(item.date, item.time) : null,
        cancellationReason: item.cancelReason || null,
        rescheduleReason: item.rescheduleReason || null,
        updatedAt: new Date().toISOString(),
      });
    });
  });

  return rows;
}

function normalizePatientAppointments(appointmentsState, meta) {
  const chunks = ['upcoming', 'past', 'cancelled'];
  const rows = [];

  chunks.forEach((bucket) => {
    (appointmentsState?.[bucket] || []).forEach((item) => {
      const providerRole = inferProviderRole(item);
      const reasonText = item.cancelReason || item.reason;
      const standardizedReasonCode =
        bucket === 'cancelled' ? normalizeReasonCode(reasonText, 'CANCEL') : null;

      rows.push({
        id: `PATIENT:${meta.patientId}:${item.id}`,
        source: 'PATIENT_PORTAL',
        sourceAppointmentId: String(item.id),
        patientId: meta.patientId,
        patientName: meta.patientName,
        providerRole,
        providerId: providerRole === 'CHW' ? 'CHW-ON-CALL' : 'DR-ON-CALL',
        providerName: item.doctor || (providerRole === 'CHW' ? 'CHW On Call' : 'Doctor On Call'),
        facility: item.location || 'Unknown Facility',
        appointmentType: item.type || 'Clinic Visit',
        reason: item.reason || null,
        reasonCode: standardizedReasonCode,
        scheduledAt: toIsoDateTime(item.date, item.time),
        status: normalizePatientStatus(item, bucket),
        followUpRequired: isFollowUp(item),
        followUpDueAt: isFollowUp(item) ? toIsoDateTime(item.date, item.time) : null,
        cancellationReason: item.cancelReason || null,
        rescheduleReason: item.rescheduleReason || null,
        updatedAt: new Date().toISOString(),
      });
    });
  });

  return rows;
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

function seedStore() {
  const seedAppointments = [
    ...normalizeChwAppointments(SEEDED_CHW, { chwId: SEED_META.chwId, chwName: SEED_META.chwName }),
    ...normalizePatientAppointments(SEEDED_PATIENT, {
      patientId: SEED_META.patientId,
      patientName: SEED_META.patientName,
    }),
  ];

  return {
    appointments: seedAppointments,
    updatedAt: new Date().toISOString(),
  };
}

const defaultStore = seedStore();

function readStore() {
  if (typeof window === 'undefined') return defaultStore;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedStore();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.appointments) || parsed.appointments.length === 0) {
      const seeded = seedStore();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return parsed;
  } catch {
    return defaultStore;
  }
}

function writeStore(nextStore) {
  if (typeof window === 'undefined') return nextStore;
  const payload = {
    ...nextStore,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  emitUpdate();
  return payload;
}

export function syncChwAppointments(appointmentData, meta = {}) {
  const chwMeta = {
    chwId: meta.chwId || 'CHW-001',
    chwName: meta.chwName || 'CHW User',
  };

  const normalized = normalizeChwAppointments(appointmentData, chwMeta);
  const store = readStore();
  const remaining = store.appointments.filter((a) => !(a.source === 'CHW_PORTAL' && a.providerId === chwMeta.chwId));

  writeStore({
    ...store,
    appointments: [...remaining, ...normalized],
  });
}

export function syncPatientAppointments(appointmentsState, meta = {}) {
  const patientMeta = {
    patientId: meta.patientId || 'PT-SELF-001',
    patientName: meta.patientName || 'Patient User',
  };

  const normalized = normalizePatientAppointments(appointmentsState, patientMeta);
  const store = readStore();
  const remaining = store.appointments.filter((a) => !(a.source === 'PATIENT_PORTAL' && a.patientId === patientMeta.patientId));

  writeStore({
    ...store,
    appointments: [...remaining, ...normalized],
  });
}

export function transitionGovernanceAppointment(appointmentId, nextStatus, reasonText) {
  if (!Object.values(STATUS).includes(nextStatus)) {
    return { ok: false, reason: 'Invalid status' };
  }

  const store = readStore();
  let found = false;
  const nextAppointments = store.appointments.map((appointment) => {
    if (appointment.id !== appointmentId) return appointment;
    found = true;

    const update = {
      ...appointment,
      status: nextStatus,
      updatedAt: new Date().toISOString(),
    };

    if (nextStatus === STATUS.CANCELED) {
      update.cancellationReason = reasonText || appointment.cancellationReason || 'Canceled by admin';
      update.reasonCode = normalizeReasonCode(update.cancellationReason, 'CANCEL');
    }

    return update;
  });

  if (!found) return { ok: false, reason: 'Appointment not found' };
  writeStore({ ...store, appointments: nextAppointments });
  return { ok: true };
}

export function rescheduleGovernanceAppointment(appointmentId, nextDate, nextTime, reasonText) {
  if (!nextDate || !nextTime) {
    return { ok: false, reason: 'New date and time are required' };
  }

  const store = readStore();
  let found = false;
  const nextAppointments = store.appointments.map((appointment) => {
    if (appointment.id !== appointmentId) return appointment;
    found = true;

    return {
      ...appointment,
      scheduledAt: toIsoDateTime(nextDate, nextTime),
      status: STATUS.BOOKED,
      rescheduleReason: reasonText || 'Rescheduled by admin',
      reasonCode: normalizeReasonCode(reasonText || 'Rescheduled by admin', 'RESCHEDULE'),
      updatedAt: new Date().toISOString(),
    };
  });

  if (!found) return { ok: false, reason: 'Appointment not found' };
  writeStore({ ...store, appointments: nextAppointments });
  return { ok: true };
}

export function getAppointmentGovernanceSnapshot() {
  const store = readStore();
  const appointments = [...store.appointments].sort(
    (a, b) => Date.parse(b.updatedAt || 0) - Date.parse(a.updatedAt || 0)
  );

  return {
    appointments,
    ...computeAggregates(appointments),
    updatedAt: store.updatedAt,
  };
}

export function subscribeToAppointmentGovernanceUpdates(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback(getAppointmentGovernanceSnapshot());
  window.addEventListener(STORE_UPDATED_EVENT, handler);
  return () => window.removeEventListener(STORE_UPDATED_EVENT, handler);
}
