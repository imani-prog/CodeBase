import { adminApi } from "../../API/endpoints/adminApi.js";
import { mapUserToUi } from "../mappers/uiMappers.js";
import { normalizeArray, normalizePagedResult, safeNumber } from "../mappers/normalize.js";

function normalizeDashboard(payload = {}) {
  return {
    kpis: payload.kpis || {},
    trends: payload.trends || {},
    mix: payload.mix || {},
    totals: {
      activePatients: safeNumber(payload?.kpis?.activePatients, 0),
      activeChw: safeNumber(payload?.kpis?.activeChw, 0),
      liveAppointments: safeNumber(payload?.kpis?.liveAppointments, 0),
    },
    raw: payload,
  };
}

async function getDashboardOverview() {
  const payload = await adminApi.getDashboardOverview();
  return normalizeDashboard(payload);
}

async function getDashboardKpis() {
  return adminApi.getDashboardKpis();
}

async function getDashboardCharts() {
  return adminApi.getDashboardCharts();
}

async function listUsers(params = {}) {
  const payload = await adminApi.listUsers(params);
  const paged = normalizePagedResult(payload);
  return {
    ...paged,
    items: normalizeArray(paged.items).map(mapUserToUi),
  };
}

async function getUserById(userId) {
  return mapUserToUi(await adminApi.getUserById(userId));
}

async function updateUserStatus(userId, status) {
  return mapUserToUi(await adminApi.updateUserStatus(userId, { status }));
}

async function updateUserRole(userId, role) {
  return mapUserToUi(await adminApi.updateUserRole(userId, { role }));
}

async function createUser(payload) {
  return mapUserToUi(await adminApi.createUser(payload));
}

export const adminService = {
  getDashboardOverview,
  getDashboardKpis,
  getDashboardCharts,
  listUsers,
  getUserById,
  updateUserStatus,
  updateUserRole,
  createUser,
};
