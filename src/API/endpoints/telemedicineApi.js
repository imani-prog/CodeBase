import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const telemedicineApi = {
  createSession: (payload) => httpClient.post(API_PATHS.telemedicine.sessions, payload),
  listSessions: (params = {}) => httpClient.get(API_PATHS.telemedicine.sessions, { query: params }),
  getSessionsByPatient: async (patientId, params = {}) => {
    try {
      return await httpClient.get(API_PATHS.telemedicine.byPatient(patientId), { query: params });
    } catch (err) {
      if (err?.status !== 404) throw err;
      // Backward compatibility with older backend route naming.
      return httpClient.get(`${API_PATHS.telemedicine.sessions}/patient/${patientId}`, { query: params });
    }
  },
  getSessionById: (id) => httpClient.get(`${API_PATHS.telemedicine.sessions}/${id}`),
  getSessionBySessionId: (sessionId) => httpClient.get(`${API_PATHS.telemedicine.sessions}/by-session-id/${sessionId}`),
  updateSession: (id, payload) => httpClient.put(`${API_PATHS.telemedicine.sessions}/${id}`, payload),
  deleteSession: (id) => httpClient.delete(`${API_PATHS.telemedicine.sessions}/${id}`),
  startSession: (id) => httpClient.post(`${API_PATHS.telemedicine.sessions}/${id}/start`, {}),
  pauseSession: (id) => httpClient.post(`${API_PATHS.telemedicine.sessions}/${id}/pause`, {}),
  resumeSession: (id) => httpClient.post(`${API_PATHS.telemedicine.sessions}/${id}/resume`, {}),
  completeSession: (id, params) => httpClient.post(`${API_PATHS.telemedicine.sessions}/${id}/complete`, null, { query: params }),
  cancelSession: (id, params) => httpClient.post(`${API_PATHS.telemedicine.sessions}/${id}/cancel`, null, { query: params }),
  terminateSession: (id, params) => httpClient.post(`${API_PATHS.telemedicine.sessions}/${id}/terminate`, null, { query: params }),
  rateSession: (id, params) => httpClient.post(`${API_PATHS.telemedicine.sessions}/${id}/rate`, null, { query: params }),
  getSessionsWithFilters: (params = {}) => httpClient.get(API_PATHS.telemedicine.filter, { query: params }),
  getSessionsByStatus: (status, params = {}) => httpClient.get(API_PATHS.telemedicine.byStatus(status), { query: params }),
  getSessionsByPlatform: (platform, params = {}) => httpClient.get(API_PATHS.telemedicine.byPlatform(platform), { query: params }),
  getSessionsByPriority: (priority) => httpClient.get(API_PATHS.telemedicine.byPriority(priority)),
  searchSessions: (params = {}) => httpClient.get(API_PATHS.telemedicine.search, { query: params }),
  getOverview: () => httpClient.get(API_PATHS.telemedicine.overview),
  getRevenueData: (params = {}) => httpClient.get(API_PATHS.telemedicine.revenue, { query: params }),
  getPlatformStats: () => httpClient.get(API_PATHS.telemedicine.platformStats),
  getUsageDistribution: () => httpClient.get(API_PATHS.telemedicine.usageDistribution),
  getRecentActivity: (params = {}) => httpClient.get(API_PATHS.telemedicine.recentActivity, { query: params }),
  getOnlineDoctors: () => httpClient.get(API_PATHS.telemedicine.onlineDoctors),
  getHistory: (params = {}) => httpClient.get(API_PATHS.telemedicine.history, { query: params }),
};
