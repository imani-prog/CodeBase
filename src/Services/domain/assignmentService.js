import { assignmentApi } from "../../API/endpoints/assignmentApi.js";
import { normalizeArray } from "../mappers/normalize.js";

function mapAssignmentToUi(row = {}) {
  return {
    id: row.id ?? null,
    patientId: row.patientId ?? row.patient?.id ?? null,
    chwId: row.chwId ?? row.chw?.id ?? null,
    status: (row.status || "ASSIGNED").toUpperCase(),
    assignedAt: row.assignedAt || null,
    startedAt: row.startedAt || null,
    completedAt: row.completedAt || null,
    raw: row,
  };
}

async function listAssignments(params = {}) {
  const payload = await assignmentApi.list(params);
  return normalizeArray(payload).map(mapAssignmentToUi);
}

async function getAssignmentById(assignmentId) {
  return mapAssignmentToUi(await assignmentApi.getById(assignmentId));
}

async function createAssignment(payload) {
  return mapAssignmentToUi(await assignmentApi.create(payload));
}

async function updateAssignmentStatus(assignmentId, status) {
  return mapAssignmentToUi(await assignmentApi.updateStatus(assignmentId, { status }));
}

async function listAssignmentsByPatient(patientId, params = {}) {
  const payload = await assignmentApi.listByPatient(patientId, params);
  return normalizeArray(payload).map(mapAssignmentToUi);
}

async function listAssignmentsByChw(chwId, params = {}) {
  const payload = await assignmentApi.listByChw(chwId, params);
  return normalizeArray(payload).map(mapAssignmentToUi);
}

export const assignmentService = {
  listAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignmentStatus,
  listAssignmentsByPatient,
  listAssignmentsByChw,
};
