import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

const canFallbackToById = (error) => {
  const status = Number(error?.status || 0);
  return status === 400 || status === 401 || status === 403 || status === 404;
};

export const patientApi = {
  list: (params = {}) =>
    httpClient.get(API_PATHS.patients.base, { query: params }),
  me: async ({ fallbackUserId } = {}) => {
    try {
      return await httpClient.get(API_PATHS.patients.me);
    } catch (error) {
      if (!fallbackUserId || !canFallbackToById(error)) {
        throw error;
      }
      return httpClient.get(`${API_PATHS.patients.base}/${fallbackUserId}`);
    }
  },
  resolveMyPatientId: async (fallbackUserId) => {
    const profile = await patientApi.me({ fallbackUserId });
    return profile?.id ?? profile?.userId ?? null;
  },
  getById: (id) =>
    httpClient.get(`${API_PATHS.patients.base}/${id}`),
  create: (payload) =>
    httpClient.post(API_PATHS.patients.base, payload),
  update: (id, payload) =>
    httpClient.put(`${API_PATHS.patients.base}/${id}`, payload),
  delete: (id) =>
    httpClient.delete(`${API_PATHS.patients.base}/${id}`),
  updateLocation: (id, payload) =>
    httpClient.patch(API_PATHS.patients.location(id), payload),
};