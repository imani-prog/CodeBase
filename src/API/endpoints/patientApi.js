import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const patientApi = {
  list: (params = {}) => httpClient.get(API_PATHS.patients.base, { query: params }),
  getById: (id) => httpClient.get(`${API_PATHS.patients.base}/${id}`),
  create: (payload) => httpClient.post(API_PATHS.patients.base, payload),
  update: (id, payload) => httpClient.put(`${API_PATHS.patients.base}/${id}`, payload),
  delete: (id) => httpClient.delete(`${API_PATHS.patients.base}/${id}`),
  updateLocation: (id, payload) => httpClient.patch(`${API_PATHS.patients.base}/${id}/location`, payload),
};
