import { homeVisitApi } from "../../API/endpoints/homeVisitApi.js";
import { normalizeArray } from "../mappers/normalize.js";

function normalizeStatus(value) {
  const status = String(value || "SCHEDULED").trim().toUpperCase();
  if (status === "CANCELLED") return "CANCELED";
  return status;
}

function normalizePriority(value) {
  const priority = String(value || "NORMAL").trim().toUpperCase();
  if (["NORMAL", "HIGH", "URGENT"].includes(priority)) return priority;
  return "NORMAL";
}

function normalizeListPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

function buildPatientIdText(row = {}, patient = {}) {
  if (row.patientIdText) return String(row.patientIdText);
  if (patient.patientId) return String(patient.patientId);
  if (patient.code) return String(patient.code);
  if (row.patientId != null) return `PT-${row.patientId}`;
  if (patient.id != null) return `PT-${patient.id}`;
  return "";
}

function buildChwCode(row = {}, chw = {}) {
  if (row.chwCode) return String(row.chwCode);
  if (chw.code) return String(chw.code);
  if (row.chwId != null) return `CHW-${row.chwId}`;
  if (chw.id != null) return `CHW-${chw.id}`;
  return "";
}

function toIsoDateTime(value) {
  if (!value) return null;
  const ts = Date.parse(value);
  if (Number.isNaN(ts)) return null;
  return new Date(ts).toISOString();
}

function toDateAndTime(isoDateTime) {
  if (!isoDateTime) {
    return { date: "", time: "" };
  }

  const date = new Date(isoDateTime);
  if (Number.isNaN(date.getTime())) {
    return { date: "", time: "" };
  }

  const dateText = new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  const timeText = date.toLocaleTimeString("en-KE", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return {
    date: dateText,
    time: timeText,
  };
}

function calculateNotesQuality(outcomeText) {
  const words = String(outcomeText || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length >= 20) return 100;
  if (words.length >= 12) return 80;
  if (words.length >= 8) return 60;
  if (words.length >= 4) return 40;
  return words.length > 0 ? 20 : 0;
}

function buildCompletionEvidence(row = {}, status) {
  if (row.completionEvidence) return row.completionEvidence;
  if (status !== "COMPLETED") return null;

  return {
    completedAt: toIsoDateTime(row.completedAt || row.updatedAt) || new Date().toISOString(),
    notesQualityScore: calculateNotesQuality(row.outcome || row.notes || ""),
    geoCheckPassed: row.latitude != null && row.longitude != null,
  };
}

function mapHomeVisitToUi(row = {}) {
  const patient = row.patient || {};
  const chw = row.chw || {};
  const status = normalizeStatus(row.status);
  const scheduledAt = toIsoDateTime(row.scheduledAt);
  const completedAt = toIsoDateTime(row.completedAt);
  const canceledAt = toIsoDateTime(row.canceledAt);
  const { date, time } = toDateAndTime(scheduledAt);

  return {
    id: row.id ?? null,
    patientId: row.patientId ?? patient.id ?? null,
    patientIdText: buildPatientIdText(row, patient),
    patientName: row.patientName || patient.fullName || patient.name || "Unknown Patient",
    phone: row.patientPhone || patient.phone || "",
    chwId: row.chwId ?? chw.id ?? null,
    chwCode: buildChwCode(row, chw),
    chwName: row.chwName || chw.fullName || chw.name || "Unknown CHW",
    visitType: row.visitType || row.type || "Home Visit",
    status,
    priority: normalizePriority(row.priority),
    scheduledAt,
    completedAt,
    canceledAt,
    date,
    time,
    location: row.location || "",
    latitude: row.latitude ?? null,
    longitude: row.longitude ?? null,
    coordinates:
      row.latitude != null && row.longitude != null
        ? { lat: Number(row.latitude), lng: Number(row.longitude) }
        : row.coordinates || null,
    reason: row.reason || "",
    notes: row.notes || "",
    outcome: row.outcome || "",
    completionEvidence: buildCompletionEvidence(row, status),
    createdAt: toIsoDateTime(row.createdAt),
    updatedAt: toIsoDateTime(row.updatedAt),
    raw: row,
  };
}

async function listHomeVisits(params = {}) {
  const payload = await homeVisitApi.list(params);
  return normalizeArray(normalizeListPayload(payload)).map(mapHomeVisitToUi);
}

async function getHomeVisitById(homeVisitId) {
  return mapHomeVisitToUi(await homeVisitApi.getById(homeVisitId));
}

function toBackendPayload(payload = {}) {
  const scheduledAt =
    payload.scheduledAt ||
    (payload.date && payload.time
      ? new Date(`${payload.date}T${payload.time}:00`).toISOString()
      : null);

  const normalized = {
    ...payload,
    status: payload.status ? normalizeStatus(payload.status) : undefined,
    priority: payload.priority ? normalizePriority(payload.priority) : undefined,
    patientId: payload.patientId ?? payload.patient?.id,
    chwId: payload.chwId ?? payload.chw?.id,
    visitType: payload.visitType || payload.type,
    scheduledAt,
  };

  if (!normalized.status) delete normalized.status;
  if (!normalized.priority) delete normalized.priority;
  if (!normalized.patientId) delete normalized.patientId;
  if (!normalized.chwId) delete normalized.chwId;
  if (!normalized.scheduledAt) delete normalized.scheduledAt;

  return normalized;
}

async function createHomeVisit(payload) {
  return mapHomeVisitToUi(await homeVisitApi.create(toBackendPayload(payload)));
}

async function updateHomeVisit(homeVisitId, payload) {
  return mapHomeVisitToUi(await homeVisitApi.update(homeVisitId, toBackendPayload(payload)));
}

const completeHomeVisit = async (id, payload = {}) => mapHomeVisitToUi(await homeVisitApi.complete(id, payload));
const cancelHomeVisit = async (id, payload = {}) => mapHomeVisitToUi(await homeVisitApi.cancel(id, payload));
const rescheduleHomeVisit = async (id, payload) => mapHomeVisitToUi(await homeVisitApi.reschedule(id, payload));
const updateHomeVisitLocation = async (id, payload) => mapHomeVisitToUi(await homeVisitApi.updateLocation(id, payload));

function groupHomeVisitsByTab(homeVisits = []) {
  return homeVisits.reduce(
    (acc, visit) => {
      const normalizedVisit = {
        id: `${visit.chwId}:${visit.id}`,
        backendId: visit.id, 
        
        // backendId: Number(visit.id),
        patientName: visit.patientName,
        patientId: visit.patientIdText,
        phone: visit.phone,
        date: visit.date,
        time: visit.time,
        location: visit.location,
        coordinates: visit.coordinates,
        type: visit.visitType,
        priority: String(visit.priority || "NORMAL").toLowerCase(),
        notes: visit.notes,
        reason: visit.reason,
        outcome: visit.outcome,
        completionEvidence: visit.completionEvidence,
        scheduledAt: visit.scheduledAt,
        chwId: visit.chwId,
        chwName: visit.chwName,
        rescheduleHistory: Array.isArray(visit.raw?.rescheduleHistory) ? visit.raw.rescheduleHistory : [],
        reassignmentHistory: Array.isArray(visit.raw?.reassignmentHistory) ? visit.raw.reassignmentHistory : [],
      };

      if (visit.status === "COMPLETED") {
        acc.completed.push({ ...normalizedVisit, status: "COMPLETED"});
      } else if (["CANCELED", "NO_SHOW"].includes(visit.status)) {
        acc.cancelled.push({
          ...normalizedVisit,
          status: "CANCELED",
          reasonType: visit.status === "NO_SHOW" ? "NO_SHOW" : undefined,
        });
      } else {
        acc.upcoming.push(normalizedVisit);
      }

      return acc;
    },
    { upcoming: [], completed: [], cancelled: [] }
  );
}

export const homeVisitService = {
  listHomeVisits,
  getHomeVisitById,
  createHomeVisit,
  updateHomeVisit,
  completeHomeVisit,
  cancelHomeVisit,
  rescheduleHomeVisit,
  updateHomeVisitLocation,
  groupHomeVisitsByTab,
};
