import { homeVisitApi } from "../../API/endpoints/homeVisitApi.js";
import { normalizeArray } from "../mappers/normalize.js";

function mapHomeVisitToUi(row = {}) {
  return {
    id: row.id ?? null,
    patientId: row.patientId ?? null,
    chwId: row.chwId ?? null,
    visitType: row.visitType || row.type || "Home Visit",
    status: (row.status || "SCHEDULED").toUpperCase(),
    scheduledAt: row.scheduledAt || null,
    location: row.location || "",
    notes: row.notes || "",
    raw: row,
  };
}

async function listHomeVisits(params = {}) {
  const payload = await homeVisitApi.list(params);
  return normalizeArray(payload).map(mapHomeVisitToUi);
}

async function getHomeVisitById(homeVisitId) {
  return mapHomeVisitToUi(await homeVisitApi.getById(homeVisitId));
}

async function createHomeVisit(payload) {
  return mapHomeVisitToUi(await homeVisitApi.create(payload));
}

async function updateHomeVisit(homeVisitId, payload) {
  return mapHomeVisitToUi(await homeVisitApi.update(homeVisitId, payload));
}

const completeHomeVisit = (id, payload = {}) => homeVisitApi.complete(id, payload);
const cancelHomeVisit = (id, payload = {}) => homeVisitApi.cancel(id, payload);
const rescheduleHomeVisit = (id, payload) => homeVisitApi.reschedule(id, payload);
const updateHomeVisitLocation = (id, payload) => homeVisitApi.updateLocation(id, payload);

export const homeVisitService = {
  listHomeVisits,
  getHomeVisitById,
  createHomeVisit,
  updateHomeVisit,
  completeHomeVisit,
  cancelHomeVisit,
  rescheduleHomeVisit,
  updateHomeVisitLocation,
};
