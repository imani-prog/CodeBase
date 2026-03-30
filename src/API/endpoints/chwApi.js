import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const chwApi = {
  list: (params = {}) => httpClient.get(API_PATHS.chw.base, { query: params }),
  getById: (id) => httpClient.get(`${API_PATHS.chw.base}/${id}`),
  create: (payload) => httpClient.post(API_PATHS.chw.base, payload),
  update: (id, payload) => httpClient.put(`${API_PATHS.chw.base}/${id}`, payload),
  delete: (id) => httpClient.delete(`${API_PATHS.chw.base}/${id}`),
  search: (params = {}) => httpClient.get(API_PATHS.chw.search, { query: params }),
  nearest: (params = {}) => httpClient.get(API_PATHS.chw.nearest, { query: params }),
  updateLocation: (id, payload) => httpClient.patch(`${API_PATHS.chw.base}/${id}/location`, payload),
  updatePerformance: (id, payload) => httpClient.patch(`${API_PATHS.chw.base}/${id}/performance`, payload),
};
