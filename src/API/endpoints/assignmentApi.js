import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const assignmentApi = {
  list: (params = {}) => httpClient.get(API_PATHS.assignments.base, { query: params }),
  getById: (id) => httpClient.get(`${API_PATHS.assignments.base}/${id}`),
  create: (payload) => httpClient.post(API_PATHS.assignments.base, payload),
  updateStatus: (id, payload) => httpClient.patch(`${API_PATHS.assignments.base}/${id}/status`, payload),
  reassign: async (id, payload) => {
    const base = `${API_PATHS.assignments.base}/${id}`;
    try {
      return await httpClient.patch(`${base}/reassign`, payload);
    } catch (error) {
      if (![404, 405].includes(error?.status)) throw error;
    }

    try {
      return await httpClient.patch(base, payload);
    } catch (error) {
      if (![404, 405].includes(error?.status)) throw error;
    }

    return httpClient.put(base, payload);
  },
  listByPatient: (patientId, params = {}) => httpClient.get(`${API_PATHS.assignments.base}/patient/${patientId}`, { query: params }),
  listByChw: (chwId, params = {}) => httpClient.get(`${API_PATHS.assignments.base}/chw/${chwId}`, { query: params }),
};
