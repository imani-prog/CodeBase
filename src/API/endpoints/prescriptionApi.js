import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const prescriptionApi = {
  list: (params = {}) => httpClient.get(API_PATHS.prescriptions.base, { query: params }),
  getById: (id) => httpClient.get(`${API_PATHS.prescriptions.base}/${id}`),
  create: (payload) => httpClient.post(API_PATHS.prescriptions.base, payload),
  update: (id, payload) => httpClient.put(`${API_PATHS.prescriptions.base}/${id}`, payload),
  delete: (id) => httpClient.delete(`${API_PATHS.prescriptions.base}/${id}`),
  listByPatient: (patientId, params = {}) => httpClient.get(`${API_PATHS.prescriptions.base}/patient/${patientId}`, { query: params }),
  markComplete: (id) => httpClient.patch(`${API_PATHS.prescriptions.base}/${id}/complete`, {}),
  markExpired: (id) => httpClient.patch(`${API_PATHS.prescriptions.base}/${id}/expire`, {}),
  listRefills: (id) => httpClient.get(`${API_PATHS.prescriptions.base}/${id}/refills`),
  requestRefill: (id, payload) => httpClient.post(`${API_PATHS.prescriptions.base}/${id}/refills`, payload),
  decideRefill: (refillId, payload) => httpClient.patch(`${API_PATHS.prescriptions.base}/refills/${refillId}`, payload),
  listPharmacies: () => httpClient.get(API_PATHS.prescriptions.pharmacies),
  savePharmacy: (payload) => httpClient.post(API_PATHS.prescriptions.pharmacies, payload),
};
