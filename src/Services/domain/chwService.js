import { chwApi } from "../../API/endpoints/chwApi.js";
import { normalizeArray, normalizePagedResult, safeString } from "../mappers/normalize.js";

function mapChwToUi(row = {}) {
  const fullName =
    row.fullName ||
    [row.firstName, row.middleName, row.lastName].filter(Boolean).join(" ").trim();

  return {
    id: row.id ?? null,
    code: row.code || "",
    firstName: safeString(row.firstName),
    middleName: safeString(row.middleName),
    lastName: safeString(row.lastName),
    name: fullName || "Unknown CHW",
    email: safeString(row.email),
    phone: safeString(row.phone),
    street: safeString(row.addressLine1),
    addressLine2: safeString(row.addressLine2),
    city: safeString(row.city),
    county: safeString(row.state),       // "state" maps to "county" in Kenya context
    postalCode: safeString(row.postalCode),
    country: safeString(row.country),
    // Location
    latitude: row.latitude ?? null,
    longitude: row.longitude ?? null,
    region: safeString(row.region),
    specialization: safeString(row.specialization),
    status: safeString(row.status).toUpperCase(),
    assignedPatients: row.assignedPatients ?? 0,
    startDate: row.startDate || null,
    monthlyVisits: row.monthlyVisits ?? 0,
    successRate: row.successRate ?? 0,
    responseTime: safeString(row.responseTime),
    rating: row.rating ?? 0,
    hospital: row.hospital ?? null,
    user: row.user ?? null,
    createdAt: row.createdAt || null,
    updatedAt: row.updatedAt || null,
    raw: row,
  };
}

async function listChw(params = {}) {
  const payload = await chwApi.list(params);
  return normalizeArray(payload).map(mapChwToUi);
}

async function getMe() {
  return mapChwToUi(await chwApi.me());
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
  getMe,
  getChwById,
  createChw,
  updateChw,
  deleteChw,
  searchChw,
  getNearestChw,
  updateChwLocation,
  updateChwPerformance,
};