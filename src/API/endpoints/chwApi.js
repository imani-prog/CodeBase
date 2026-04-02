import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const chwApi = {
  list: (params = {}) =>
    httpClient.get(API_PATHS.chw.base, { query: params }),
  me: () =>
    httpClient.get(API_PATHS.chw.me),
  getById: (id) =>
    httpClient.get(`${API_PATHS.chw.base}/${id}`),
  create: (payload) =>
    httpClient.post(API_PATHS.chw.base, payload),
  update: (id, payload) =>
    httpClient.put(`${API_PATHS.chw.base}/${id}`, payload),
  delete: (id) =>
    httpClient.delete(`${API_PATHS.chw.base}/${id}`),
  updateLocation: (id, payload) =>
    httpClient.patch(API_PATHS.chw.location(id), payload),
  updatePerformance: (id, payload) =>
    httpClient.patch(API_PATHS.chw.performance(id), payload),
  nearest: (params = {}) =>
    httpClient.get(API_PATHS.chw.nearest, { query: params }),
  byRegion: (region) =>
    httpClient.get(API_PATHS.chw.byRegion(region)),
  byStatus: (status) =>
    httpClient.get(API_PATHS.chw.byStatus(status)),
  search: (params = {}) =>
    httpClient.get(API_PATHS.chw.search, { query: params }),
};