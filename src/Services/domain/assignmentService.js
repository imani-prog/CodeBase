import { assignmentApi } from "../../API/endpoints/assignmentApi.js";
import { chwService } from "./chwService.js";
import { patientService } from "./patientService.js";
import { normalizeArray } from "../mappers/normalize.js";

function mapAssignmentToUi(row = {}) {
  return {
    id: row.id ?? null,
    assignmentCode: row.assignmentCode || row.code || "",
    patientId: row.patientId ?? row.patient?.id ?? null,
    chwId: row.chwId ?? row.chw?.id ?? null,
    appointmentId: row.appointmentId ?? row.appointment?.id ?? null,
    assignmentType: (row.assignmentType || "TASK").toUpperCase(),
    status: (row.status || "ASSIGNED").toUpperCase(),
    assignedAt: row.assignedAt || null,
    startedAt: row.startedAt || null,
    completedAt: row.completedAt || null,
    createdAt: row.createdAt || null,
    updatedAt: row.updatedAt || null,
    notes: row.notes || "",
    patientName: row.patientName || row.patient?.fullName || row.patient?.name || "",
    chwName: row.chwName || row.chw?.fullName || row.chw?.name || "",
    sourceType: row.sourceType || null,
    raw: row,
  };
}

function resolveEntityIds(payload = {}) {
  return {
    patientId: payload.patientId ?? payload.patient?.id ?? null,
    chwId: payload.chwId ?? payload.chw?.id ?? null,
  };
}

async function ensurePatientAndChwExist(payload = {}) {
  const { patientId, chwId } = resolveEntityIds(payload);
  if (!patientId) {
    throw new Error("Patient is required for CHW assignment");
  }
  if (!chwId) {
    throw new Error("CHW is required for assignment");
  }

  await Promise.all([
    patientService.getPatientById(patientId),
    chwService.getChwById(chwId),
  ]);

  return { patientId, chwId };
}

function isChwLinkedAppointment(appointment = {}) {
  const providerRole = String(appointment.providerRole || "").toUpperCase();
  if (providerRole === "CHW") return true;

  const specialty = String(appointment.specialty || "").toLowerCase();
  const type = String(appointment.type || appointment.appointmentType || "").toLowerCase();
  return specialty.includes("community health worker") || type.includes("home visit");
}

function normalizeListPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.assignments)) return payload.assignments;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.content)) return payload.data.content;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.data?.results)) return payload.data.results;
  return [];
}

function normalizePossibleNumericId(value) {
  const text = String(value ?? '').trim();
  if (!text) return null;
  if (/^\d+$/.test(text)) return Number(text);
  return text;
}

async function listAssignments(params = {}) {
  const payload = await assignmentApi.list(params);
  return normalizeArray(normalizeListPayload(payload)).map(mapAssignmentToUi);
}

async function getAssignmentById(assignmentId) {
  return mapAssignmentToUi(await assignmentApi.getById(assignmentId));
}

async function createAssignment(payload) {
  const { patientId, chwId } = await ensurePatientAndChwExist(payload);
  const normalizedPayload = {
    ...payload,
    patientId,
    chwId,
    assignmentType: (payload.assignmentType || 'TASK').toUpperCase(),
  };
  return mapAssignmentToUi(await assignmentApi.create(normalizedPayload));
}

async function updateAssignmentStatus(assignmentId, status) {
  return mapAssignmentToUi(await assignmentApi.updateStatus(assignmentId, { status }));
}

async function reassignAssignment(assignmentId, payload = {}) {
  const nextChwId = normalizePossibleNumericId(payload.chwId);
  if (!nextChwId) {
    throw new Error("Target CHW id is required for reassignment");
  }

  await chwService.getChwById(nextChwId);

  const requestPayload = {
    chwId: nextChwId,
    newChwId: nextChwId,
    reason: payload.reason || 'Coverage balancing',
  };

  return mapAssignmentToUi(await assignmentApi.reassign(assignmentId, requestPayload));
}

async function listAssignmentsByPatient(patientId, params = {}) {
  const payload = await assignmentApi.listByPatient(patientId, params);
  return normalizeArray(normalizeListPayload(payload)).map(mapAssignmentToUi);
}

async function listAssignmentsByChw(chwId, params = {}) {
  const payload = await assignmentApi.listByChw(chwId, params);
  return normalizeArray(normalizeListPayload(payload)).map(mapAssignmentToUi);
}

async function createAssignmentFromAppointment(appointment = {}) {
  if (!isChwLinkedAppointment(appointment)) {
    throw new Error("Only CHW-linked appointments can be converted into CHW assignments");
  }

  const payload = {
    patientId: appointment.patientId ?? appointment.patient?.id,
    chwId: appointment.chwId ?? appointment.providerId ?? appointment.chw?.id,
    appointmentId: appointment.id ?? appointment.sourceAppointmentId ?? null,
    assignmentType: "APPOINTMENT",
    status: "ASSIGNED",
    assignedAt: appointment.scheduledAt || appointment.scheduledStart || new Date().toISOString(),
  };

  return createAssignment(payload);
}

export const assignmentService = {
  listAssignments,
  getAssignmentById,
  createAssignment,
  createAssignmentFromAppointment,
  updateAssignmentStatus,
  reassignAssignment,
  listAssignmentsByPatient,
  listAssignmentsByChw,
};
