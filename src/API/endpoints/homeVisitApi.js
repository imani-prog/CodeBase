import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const homeVisitApi = {
  list: (params = {}) => httpClient.get(API_PATHS.homeVisits.base, { query: params }),
  getById: (id) => httpClient.get(`${API_PATHS.homeVisits.base}/${id}`),
  create: (payload) => httpClient.post(API_PATHS.homeVisits.base, payload),
  update: (id, payload) => httpClient.put(`${API_PATHS.homeVisits.base}/${id}`, payload),
  complete: (id, payload = {}) => httpClient.patch(`${API_PATHS.homeVisits.base}/${id}/complete`, payload),
  cancel: (id, payload = {}) => httpClient.patch(`${API_PATHS.homeVisits.base}/${id}/cancel`, payload),
  reschedule: (id, payload) => httpClient.patch(`${API_PATHS.homeVisits.base}/${id}/reschedule`, payload),
  updateLocation: (id, payload) => httpClient.patch(`${API_PATHS.homeVisits.base}/${id}/location`, payload),
};
