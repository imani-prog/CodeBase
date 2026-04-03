const STORAGE_KEY = 'medilink_chw_assignments_store_v1';
const STORE_UPDATED_EVENT = 'chw-assignments-store-updated';
const FINAL_STATUSES = ['COMPLETED', 'CANCELED'];

const STATUS_TRANSITIONS = {
  PENDING: ['IN_PROGRESS', 'CANCELED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELED'],
  COMPLETED: [],
  CANCELED: [],
};

const defaultAssignments = [
  {
    id: 1,
    assignmentCode: 'ASG-001',
    patientIdText: 'PT-2023-001',
    patientName: 'Sarah Wanjiru',
    chwId: 1,
    chwCode: 'CHW-001',
    chwName: 'Grace Akinyi Achieng',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assignedAt: '2025-12-10T08:30:00.000Z',
    nextVisit: null,
  },
  {
    id: 2,
    assignmentCode: 'ASG-002',
    patientIdText: 'PT-2023-045',
    patientName: 'John Kamau',
    chwId: 1,
    chwCode: 'CHW-001',
    chwName: 'Grace Akinyi Achieng',
    priority: 'URGENT',
    status: 'IN_PROGRESS',
    assignedAt: '2025-12-11T08:30:00.000Z',
    nextVisit: null,
  },
  {
    id: 3,
    assignmentCode: 'ASG-003',
    patientIdText: 'PT-2023-089',
    patientName: 'Mary Njoki',
    chwId: 1,
    chwCode: 'CHW-001',
    chwName: 'Grace Akinyi Achieng',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assignedAt: '2025-12-12T08:30:00.000Z',
    nextVisit: null,
  },
  {
    id: 4,
    assignmentCode: 'ASG-004',
    patientIdText: 'PT-2023-112',
    patientName: 'Peter Ochieng',
    chwId: 1,
    chwCode: 'CHW-001',
    chwName: 'Grace Akinyi Achieng',
    priority: 'NORMAL',
    status: 'ASSIGNED',
    assignedAt: '2025-12-13T08:30:00.000Z',
    nextVisit: null,
  },
  {
    id: 5,
    assignmentCode: 'ASG-005',
    patientIdText: 'PT-2023-156',
    patientName: 'Grace Akinyi',
    chwId: 1,
    chwCode: 'CHW-001',
    chwName: 'Grace Akinyi Achieng',
    priority: 'NORMAL',
    status: 'ASSIGNED',
    assignedAt: '2025-12-14T08:30:00.000Z',
    nextVisit: null,
  },
  {
    id: 6,
    assignmentCode: 'ASG-006',
    patientIdText: 'PT-2023-201',
    patientName: 'David Mwangi',
    chwId: 1,
    chwCode: 'CHW-001',
    chwName: 'Grace Akinyi Achieng',
    priority: 'NORMAL',
    status: 'ASSIGNED',
    assignedAt: '2025-12-15T08:30:00.000Z',
    nextVisit: null,
  },
  {
    id: 7,
    assignmentCode: 'ASG-007',
    patientIdText: 'PT-2023-178',
    patientName: 'Jane Wambui',
    chwId: 1,
    chwCode: 'CHW-001',
    chwName: 'Grace Akinyi Achieng',
    priority: 'HIGH',
    status: 'ASSIGNED',
    assignedAt: '2025-12-16T08:30:00.000Z',
    nextVisit: null,
  },
];

const defaultWorkItems = [
  {
    id: 'TASK-1',
    assignmentId: 1,
    workType: 'TASK',
    sourceId: 1,
    title: 'Follow-up Blood Pressure Check',
    patientName: 'Sarah Wanjiru',
    patientIdText: 'PT-2023-001',
    category: 'Medical Follow-up',
    priority: 'HIGH',
    status: 'PENDING',
    dueAt: '2026-03-25T14:00:00.000Z',
    scheduledAt: null,
    completedAt: null,
    notes: 'Check blood pressure after medication adjustment',
    location: null,
    visitType: null,
    updatedAt: '2026-03-20T10:00:00.000Z',
  },
  {
    id: 'TASK-2',
    assignmentId: 2,
    workType: 'TASK',
    sourceId: 2,
    title: 'Medication Adherence Check',
    patientName: 'John Kamau',
    patientIdText: 'PT-2023-045',
    category: 'Medication',
    priority: 'URGENT',
    status: 'IN_PROGRESS',
    dueAt: '2026-03-24T16:00:00.000Z',
    scheduledAt: null,
    completedAt: null,
    notes: 'Verify adherence to prescribed medications',
    location: null,
    visitType: null,
    updatedAt: '2026-03-20T10:00:00.000Z',
  },
  {
    id: 'TASK-8',
    assignmentId: 5,
    workType: 'TASK',
    sourceId: 8,
    title: 'Initial Health Assessment',
    patientName: 'Grace Akinyi',
    patientIdText: 'PT-2023-156',
    category: 'Assessment',
    priority: 'NORMAL',
    status: 'COMPLETED',
    dueAt: '2026-03-20T10:00:00.000Z',
    scheduledAt: null,
    completedAt: '2026-03-20T10:00:00.000Z',
    notes: 'Completed comprehensive health assessment',
    location: null,
    visitType: null,
    updatedAt: '2026-03-20T10:00:00.000Z',
  },
  {
    id: 'HOME_VISIT-1',
    assignmentId: 1,
    workType: 'HOME_VISIT',
    sourceId: 1,
    title: 'Follow-up Visit',
    patientName: 'Sarah Wanjiru',
    patientIdText: 'PT-2023-001',
    category: 'Home Visit',
    priority: 'NORMAL',
    status: 'PENDING',
    dueAt: '2026-03-25T10:00:00.000Z',
    scheduledAt: '2026-03-25T10:00:00.000Z',
    completedAt: null,
    notes: 'Check blood pressure and review medication',
    location: 'Katoloni AIC Church, House 23',
    visitType: 'Follow-up Visit',
    updatedAt: '2026-03-20T10:00:00.000Z',
  },
  {
    id: 'HOME_VISIT-2',
    assignmentId: 2,
    workType: 'HOME_VISIT',
    sourceId: 2,
    title: 'Initial Assessment',
    patientName: 'John Kamau',
    patientIdText: 'PT-2023-045',
    category: 'Home Visit',
    priority: 'URGENT',
    status: 'PENDING',
    dueAt: '2026-03-25T14:00:00.000Z',
    scheduledAt: '2026-03-25T14:00:00.000Z',
    completedAt: null,
    notes: 'Comprehensive assessment required',
    location: 'Kathemboni Mosque',
    visitType: 'Initial Assessment',
    updatedAt: '2026-03-20T10:00:00.000Z',
  },
  {
    id: 'HOME_VISIT-5',
    assignmentId: 5,
    workType: 'HOME_VISIT',
    sourceId: 5,
    title: 'Nutrition Assessment',
    patientName: 'Grace Akinyi',
    patientIdText: 'PT-2023-156',
    category: 'Home Visit',
    priority: 'NORMAL',
    status: 'COMPLETED',
    dueAt: '2026-03-19T10:30:00.000Z',
    scheduledAt: '2026-03-19T10:30:00.000Z',
    completedAt: '2026-03-19T10:30:00.000Z',
    notes: 'Patient improving - continue current plan',
    location: 'Mathare, House 45',
    visitType: 'Nutrition Assessment',
    updatedAt: '2026-03-20T10:00:00.000Z',
  },
];

const defaultStore = {
  assignments: defaultAssignments,
  workItems: defaultWorkItems,
};

const DEFAULT_CHW_REFERENCE = {
  chwId: 1,
  chwCode: 'CHW-001',
  chwName: 'Grace Akinyi Achieng',
};

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function safeDate(dateString) {
  if (!dateString) return null;
  const ts = Date.parse(dateString);
  return Number.isNaN(ts) ? null : new Date(ts).toISOString();
}

function toIsoFromDateTime(datePart, timePart) {
  if (!datePart) return null;
  const dateTime = timePart ? `${datePart} ${timePart}` : datePart;
  return safeDate(dateTime);
}

function readStore() {
  if (typeof window === 'undefined') return defaultStore;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStore));
      return defaultStore;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.assignments) || !Array.isArray(parsed.workItems)) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStore));
      return defaultStore;
    }
    return {
      ...parsed,
      workItems: parsed.workItems.map((item) => {
        const normalizedStatus = item.status === 'ESCALATED' ? 'IN_PROGRESS' : item.status;
        return {
          ...item,
          status: normalizedStatus,
          approvalStatus: item.approvalStatus || (normalizedStatus === 'COMPLETED' ? 'PENDING_REVIEW' : 'NOT_REQUIRED'),
        };
      }),
    };
  } catch {
    return defaultStore;
  }
}

function emitUpdate() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(STORE_UPDATED_EVENT));
}

function recomputeAssignments(store) {
  const now = Date.now();
  return store.assignments.map((assignment) => {
    const items = store.workItems.filter((item) => item.assignmentId === assignment.id);
    if (items.length === 0) {
      return { ...assignment, status: 'ASSIGNED', nextVisit: null };
    }

    const openItems = items.filter((item) => !FINAL_STATUSES.includes(item.status));
    const overdueOpen = openItems.filter((item) => {
      if (!item.dueAt) return false;
      const dueTs = Date.parse(item.dueAt);
      return !Number.isNaN(dueTs) && dueTs < now;
    });

    const pendingVisits = items
      .filter((item) => item.workType === 'HOME_VISIT' && ['PENDING', 'IN_PROGRESS'].includes(item.status) && item.scheduledAt)
      .sort((a, b) => Date.parse(a.scheduledAt) - Date.parse(b.scheduledAt));

    let status = 'IN_PROGRESS';
    if (openItems.length === 0) {
      status = 'COMPLETED';
    } else if (overdueOpen.length > 0) {
      status = 'IN_PROGRESS';
    }

    return {
      ...assignment,
      status,
      nextVisit: pendingVisits.length > 0 ? pendingVisits[0].scheduledAt : null,
    };
  });
}

function writeStore(nextStore) {
  if (typeof window === 'undefined') return nextStore;
  const withStatus = {
    ...nextStore,
    assignments: recomputeAssignments(nextStore),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(withStatus));
  emitUpdate();
  return withStatus;
}

function canTransition(currentStatus, nextStatus) {
  const allowed = STATUS_TRANSITIONS[currentStatus] || [];
  return allowed.includes(nextStatus);
}

function findAssignment(assignments, patientIdText, patientName) {
  const normalizedId = normalizeText(patientIdText);
  const normalizedName = normalizeText(patientName);

  return assignments.find((assignment) => {
    if (normalizedId && normalizeText(assignment.patientIdText) === normalizedId) return true;
    if (normalizedName && normalizeText(assignment.patientName) === normalizedName) return true;
    return false;
  });
}

function resolveChwReference(chwRef = {}) {
  const merged = {
    chwId: chwRef.chwId ?? DEFAULT_CHW_REFERENCE.chwId,
    chwCode: chwRef.chwCode || DEFAULT_CHW_REFERENCE.chwCode,
    chwName: chwRef.chwName || DEFAULT_CHW_REFERENCE.chwName,
  };

  const hasIdentifier = Boolean(merged.chwId || merged.chwCode || merged.chwName);
  return hasIdentifier ? merged : null;
}

function ensureAssignment(store, payload = {}) {
  const {
    patientIdText,
    patientName,
    priority,
    chwRef,
  } = payload;

  const normalizedPatientId = String(patientIdText || '').trim();
  const normalizedPatientName = String(patientName || '').trim();
  if (!normalizedPatientId && !normalizedPatientName) {
    return null;
  }

  const existing = findAssignment(store.assignments, normalizedPatientId, normalizedPatientName);
  if (existing) return existing.id;

  const resolvedChw = resolveChwReference(chwRef);
  if (!resolvedChw) {
    return null;
  }

  const nextId = store.assignments.length > 0 ? Math.max(...store.assignments.map((item) => item.id)) + 1 : 1;
  const assignment = {
    id: nextId,
    assignmentCode: `ASG-${String(nextId).padStart(3, '0')}`,
    patientIdText: normalizedPatientId || `PT-UNMAPPED-${nextId}`,
    patientName: normalizedPatientName || `Unknown Patient ${nextId}`,
    chwId: resolvedChw.chwId,
    chwCode: resolvedChw.chwCode,
    chwName: resolvedChw.chwName,
    priority: (priority || 'NORMAL').toUpperCase(),
    status: 'ASSIGNED',
    assignedAt: new Date().toISOString(),
    nextVisit: null,
  };
  store.assignments = [...store.assignments, assignment];
  return assignment.id;
}

function mapTaskStatus(tab) {
  if (tab === 'inProgress') return 'IN_PROGRESS';
  if (tab === 'completed') return 'COMPLETED';
  return 'PENDING';
}

function mapVisitStatus(tab) {
  if (tab === 'completed') return 'COMPLETED';
  if (tab === 'cancelled') return 'CANCELED';
  return 'PENDING';
}

function taskToWorkItem(task, tab, assignmentId) {
  return {
    id: `TASK-${task.id}`,
    assignmentId,
    workType: 'TASK',
    sourceId: task.id,
    title: task.title,
    patientName: task.patient,
    patientIdText: task.patientId,
    category: task.category || 'General',
    priority: String(task.priority || 'normal').toUpperCase(),
    status: mapTaskStatus(tab),
    dueAt: toIsoFromDateTime(task.dueDate, task.dueTime),
    scheduledAt: null,
    completedAt: task.completedDate ? safeDate(task.completedDate) : null,
    notes: task.notes || task.description || '',
    location: null,
    visitType: null,
    updatedAt: new Date().toISOString(),
  };
}

function visitToWorkItem(visit, tab, assignmentId) {
  return {
    id: `HOME_VISIT-${visit.id}`,
    assignmentId,
    workType: 'HOME_VISIT',
    sourceId: visit.id,
    title: visit.type || 'Home Visit',
    patientName: visit.patientName,
    patientIdText: visit.patientId,
    category: 'Home Visit',
    priority: String(visit.priority || 'normal').toUpperCase(),
    status: mapVisitStatus(tab),
    dueAt: toIsoFromDateTime(visit.date, visit.time),
    scheduledAt: toIsoFromDateTime(visit.date, visit.time),
    completedAt: tab === 'completed' ? toIsoFromDateTime(visit.date, visit.time) : null,
    notes: visit.outcome || visit.reason || visit.notes || '',
    location: visit.location || null,
    visitType: visit.type || 'Home Visit',
    updatedAt: new Date().toISOString(),
  };
}

function mapAppointmentStatus(status) {
  const value = String(status || '').toUpperCase();
  if (value === 'ARRIVED' || value === 'IN_PROGRESS') return 'IN_PROGRESS';
  if (value === 'COMPLETED') return 'COMPLETED';
  if (value === 'CANCELED' || value === 'CANCELLED') return 'CANCELED';
  return 'PENDING';
}

function appointmentToWorkItem(appointment, assignmentId) {
  const mappedStatus = mapAppointmentStatus(appointment?.status);
  const scheduledAt = safeDate(appointment?.scheduledAt);
  return {
    id: `APPOINTMENT-${appointment?.id}`,
    assignmentId,
    workType: 'APPOINTMENT',
    sourceId: appointment?.sourceAppointmentId || appointment?.id,
    title: appointment?.reason || appointment?.appointmentType || 'CHW Appointment',
    patientName: appointment?.patientName || 'Unknown Patient',
    patientIdText: appointment?.patientId || '',
    category: 'Appointment',
    priority: 'NORMAL',
    status: mappedStatus,
    dueAt: scheduledAt,
    scheduledAt,
    completedAt: mappedStatus === 'COMPLETED' ? scheduledAt : null,
    notes: appointment?.reason || '',
    location: appointment?.facility || null,
    visitType: appointment?.appointmentType || 'Appointment',
    approvalStatus: mappedStatus === 'COMPLETED' ? 'PENDING_REVIEW' : 'NOT_REQUIRED',
    updatedAt: new Date().toISOString(),
  };
}

export function getChwAssignmentsSnapshot() {
  return readStore();
}

export function syncTaskWorkItems(tasksByStatus, meta = {}) {
  const store = readStore();
  const keep = store.workItems.filter((item) => item.workType !== 'TASK');
  const built = [];
  const chwRef = resolveChwReference(meta);

  ['pending', 'inProgress', 'completed'].forEach((tab) => {
    const list = Array.isArray(tasksByStatus?.[tab]) ? tasksByStatus[tab] : [];
    list.forEach((task) => {
      const assignmentId = ensureAssignment(store, {
        patientIdText: task.patientId,
        patientName: task.patient,
        priority: task.priority,
        chwRef,
      });
      if (!assignmentId) return;
      built.push(taskToWorkItem(task, tab, assignmentId));
    });
  });

  return writeStore({ ...store, workItems: [...keep, ...built] });
}

export function syncHomeVisitWorkItems(visitsByStatus, meta = {}) {
  const store = readStore();
  const keep = store.workItems.filter((item) => item.workType !== 'HOME_VISIT');
  const built = [];
  const chwRef = resolveChwReference(meta);

  ['upcoming', 'completed', 'cancelled'].forEach((tab) => {
    const list = Array.isArray(visitsByStatus?.[tab]) ? visitsByStatus[tab] : [];
    list.forEach((visit) => {
      const assignmentId = ensureAssignment(store, {
        patientIdText: visit.patientId,
        patientName: visit.patientName,
        priority: visit.priority,
        chwRef,
      });
      if (!assignmentId) return;
      built.push(visitToWorkItem(visit, tab, assignmentId));
    });
  });

  return writeStore({ ...store, workItems: [...keep, ...built] });
}

export function syncChwAppointmentWorkItems(appointments) {
  const store = readStore();
  const keep = store.workItems.filter((item) => item.workType !== 'APPOINTMENT');
  const built = [];
  const list = Array.isArray(appointments) ? appointments : [];

  list.forEach((appointment) => {
    if (String(appointment?.providerRole || '').toUpperCase() !== 'CHW') {
      return;
    }

    const assignmentId = ensureAssignment(store, {
      patientIdText: appointment?.patientId,
      patientName: appointment?.patientName,
      priority: 'NORMAL',
      chwRef: {
        chwId: appointment?.providerId,
        chwCode: appointment?.providerId,
        chwName: appointment?.providerName,
      },
    });
    if (!assignmentId) return;
    built.push(appointmentToWorkItem(appointment, assignmentId));
  });

  return writeStore({ ...store, workItems: [...keep, ...built] });
}

export function subscribeToChwAssignmentUpdates(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback(getChwAssignmentsSnapshot());
  window.addEventListener(STORE_UPDATED_EVENT, handler);
  return () => window.removeEventListener(STORE_UPDATED_EVENT, handler);
}

export function transitionWorkItemStatus(workItemId, nextStatus) {
  const store = readStore();
  const target = store.workItems.find((item) => item.id === workItemId);
  if (!target) return { ok: false, reason: 'Work item not found' };
  if (!canTransition(target.status, nextStatus)) {
    return {
      ok: false,
      reason: `Invalid transition from ${target.status} to ${nextStatus}`,
    };
  }

  const workItems = store.workItems.map((item) => {
    if (item.id !== workItemId) return item;
    return {
      ...item,
      status: nextStatus,
      completedAt: nextStatus === 'COMPLETED' ? new Date().toISOString() : item.completedAt,
      approvalStatus: nextStatus === 'COMPLETED' ? 'PENDING_REVIEW' : item.approvalStatus,
      updatedAt: new Date().toISOString(),
    };
  });

  writeStore({ ...store, workItems });
  return { ok: true };
}

export function approveWorkItem(workItemId) {
  const store = readStore();
  const target = store.workItems.find((item) => item.id === workItemId);
  if (!target) return { ok: false, reason: 'Work item not found' };
  if (target.status !== 'COMPLETED') {
    return { ok: false, reason: 'Only completed work items can be approved' };
  }

  const workItems = store.workItems.map((item) => {
    if (item.id !== workItemId) return item;
    return {
      ...item,
      approvalStatus: 'APPROVED',
      updatedAt: new Date().toISOString(),
    };
  });

  writeStore({ ...store, workItems });
  return { ok: true };
}

export function reassignAssignment(assignmentId, chwName, chwCode) {
  const store = readStore();
  const assignments = store.assignments.map((assignment) => {
    if (assignment.id !== assignmentId) return assignment;
    return {
      ...assignment,
      chwName: chwName || assignment.chwName,
      chwCode: chwCode || assignment.chwCode,
      updatedAt: new Date().toISOString(),
    };
  });

  writeStore({ ...store, assignments });
  return { ok: true };
}
