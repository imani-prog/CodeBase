import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const assignmentApi = {
  list: (params = {}) => httpClient.get(API_PATHS.assignments.base, { query: params }),
  getById: (id) => httpClient.get(`${API_PATHS.assignments.base}/${id}`),
  create: (payload) => httpClient.post(API_PATHS.assignments.base, payload),
  updateStatus: (id, payload) => httpClient.patch(`${API_PATHS.assignments.base}/${id}/status`, payload),
  listByPatient: (patientId, params = {}) => httpClient.get(`${API_PATHS.assignments.base}/patient/${patientId}`, { query: params }),
  listByChw: (chwId, params = {}) => httpClient.get(`${API_PATHS.assignments.base}/chw/${chwId}`, { query: params }),
};
