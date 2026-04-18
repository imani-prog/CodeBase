import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";


export const healthRecordApi = {
  list: (params = {}) => httpClient.get(API_PATHS.healthRecords.base, { query: params }),
  getById: (id) => httpClient.get(`${API_PATHS.healthRecords.base}/${id}`),
  create: (payload) => httpClient.post(API_PATHS.healthRecords.base, payload),
  update: (id, payload) => httpClient.put(`${API_PATHS.healthRecords.base}/${id}`, payload),
  delete: (id) => httpClient.delete(`${API_PATHS.healthRecords.base}/${id}`),
  listByPatient: (patientId) => httpClient.get(`${API_PATHS.healthRecords.base}/patient/${patientId}`),
};
