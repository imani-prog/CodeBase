const STORAGE_KEY = 'medilink_chw_assignments_store_v2';
const STORE_UPDATED_EVENT = 'chw-assignments-store-updated';
const FINAL_STATUSES = ['COMPLETED', 'CANCELED'];

const STATUS_TRANSITIONS = {
  PENDING: ['IN_PROGRESS', 'CANCELED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELED'],
  COMPLETED: [],
  CANCELED: [],
};

const defaultAssignments = [];

const defaultWorkItems = [];

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
