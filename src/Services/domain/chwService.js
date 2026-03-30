import { chwApi } from "../../API/endpoints/chwApi.js";
import { normalizeArray, normalizePagedResult, safeString } from "../mappers/normalize.js";

function mapChwToUi(row = {}) {
  const fullName = row.fullName || [row.firstName, row.middleName, row.lastName].filter(Boolean).join(" ").trim();
  return {
    id: row.id ?? null,
    code: row.code || "",
    name: fullName || "Unknown CHW",
    email: safeString(row.email),
    phone: safeString(row.phone),
    status: safeString(row.status).toUpperCase(),
    region: safeString(row.region),
    specialization: safeString(row.specialization),
    assignedPatients: row.assignedPatients ?? 0,
    raw: row,
  };
}

async function listChw(params = {}) {
  const payload = await chwApi.list(params);
  return normalizeArray(payload).map(mapChwToUi);
}

async function getChwById(chwId) {
  return mapChwToUi(await chwApi.getById(chwId));
}

async function createChw(payload) {
  return mapChwToUi(await chwApi.create(payload));
}

async function updateChw(chwId, payload) {
  return mapChwToUi(await chwApi.update(chwId, payload));
}

async function deleteChw(chwId) {
  return chwApi.delete(chwId);
}

async function searchChw(params = {}) {
  const payload = await chwApi.search(params);
  const paged = normalizePagedResult(payload);
  return {
    ...paged,
    items: normalizeArray(paged.items).map(mapChwToUi),
  };
}

async function getNearestChw(params) {
  return mapChwToUi(await chwApi.nearest(params));
}

async function updateChwLocation(chwId, payload) {
  return mapChwToUi(await chwApi.updateLocation(chwId, payload));
}

async function updateChwPerformance(chwId, payload) {
  return mapChwToUi(await chwApi.updatePerformance(chwId, payload));
}

export const chwService = {
  listChw,
  getChwById,
  createChw,
  updateChw,
  deleteChw,
  searchChw,
  getNearestChw,
  updateChwLocation,
  updateChwPerformance,
};
