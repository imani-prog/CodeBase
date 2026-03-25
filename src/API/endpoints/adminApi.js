import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const adminApi = {
  getDashboardOverview: () => httpClient.get(API_PATHS.admin.dashboardOverview),
  getDashboardKpis: () => httpClient.get(API_PATHS.admin.dashboardKpis),
  getDashboardCharts: () => httpClient.get(API_PATHS.admin.dashboardCharts),
  listUsers: (params = {}) => httpClient.get(API_PATHS.users.base, { query: params }),
  getUserById: (userId) => httpClient.get(`${API_PATHS.users.base}/${userId}`),
  updateUserStatus: (userId, payload) => httpClient.patch(`${API_PATHS.users.base}/${userId}/status`, payload),
  updateUserRole: (userId, payload) => httpClient.patch(`${API_PATHS.users.base}/${userId}/role`, payload),
  createUser: (payload) => httpClient.post(API_PATHS.users.base, payload),
};
