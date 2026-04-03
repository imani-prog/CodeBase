import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const hospitalApi = {
  list: (params = {}) => httpClient.get(API_PATHS.hospitals.base, { query: params }),
  getById: (id) => httpClient.get(`${API_PATHS.hospitals.base}/${id}`),
  create: (payload) => httpClient.post(API_PATHS.hospitals.base, payload),
  update: (id, payload) => httpClient.put(`${API_PATHS.hospitals.base}/${id}`, payload),
  delete: (id) => httpClient.delete(`${API_PATHS.hospitals.base}/${id}`),
  getByCode: (code) =>
    httpClient.get(`${API_PATHS.hospitals.base}/by-code/${encodeURIComponent(code)}`),
  listByFacility: (facility) =>
    httpClient.get(`${API_PATHS.hospitals.base}/by-facility/${encodeURIComponent(facility)}`),
};