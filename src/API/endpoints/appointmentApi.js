import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const appointmentApi = {
  list: (params = {}) => httpClient.get(API_PATHS.appointments.base, { query: params }),
  search: (params = {}) => httpClient.get(API_PATHS.appointments.search, { query: params }),
  getById: (id) => httpClient.get(`${API_PATHS.appointments.base}/${id}`),
  create: (payload) => httpClient.post(API_PATHS.appointments.base, payload),
  update: (id, payload) => httpClient.put(`${API_PATHS.appointments.base}/${id}`, payload),
  delete: (id) => httpClient.delete(`${API_PATHS.appointments.base}/${id}`),
  listByPatient: (patientId) => httpClient.get(`${API_PATHS.appointments.base}/patient/${patientId}`),
  listByHospital: (hospitalId) => httpClient.get(`${API_PATHS.appointments.base}/hospital/${hospitalId}`),
  listByStatus: (status) => httpClient.get(`${API_PATHS.appointments.base}/status/${status}`),
  listInRange: (params) => httpClient.get(API_PATHS.appointments.range, { query: params }),
  checkIn: (id) => httpClient.patch(`${API_PATHS.appointments.base}/${id}/check-in`, {}),
  checkOut: (id) => httpClient.patch(`${API_PATHS.appointments.base}/${id}/check-out`, {}),
  confirm: (id) => httpClient.patch(`${API_PATHS.appointments.base}/${id}/confirm`, {}),
  cancel: (id, payload) => httpClient.patch(`${API_PATHS.appointments.base}/${id}/cancel`, payload || {}),
  reschedule: (id, payload) => httpClient.patch(`${API_PATHS.appointments.base}/${id}/reschedule`, payload),
};
