import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const reportApi = {
  list: (params = {}) => httpClient.get(API_PATHS.reports.base, { query: params }),
  getById: (id) => httpClient.get(`${API_PATHS.reports.base}/${id}`),
  create: (payload) => httpClient.post(API_PATHS.reports.base, payload),
  update: (id, payload) => httpClient.put(`${API_PATHS.reports.base}/${id}`, payload),
  updateStatus: (id, payload) => httpClient.patch(`${API_PATHS.reports.base}/${id}/status`, payload),
  updateFile: (id, payload) => httpClient.patch(`${API_PATHS.reports.base}/${id}/file`, payload),
  delete: (id) => httpClient.delete(`${API_PATHS.reports.base}/${id}`),
};
