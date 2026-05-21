import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const ambulanceApi = {
  // /api/ambulances (AmbulanceController)
  list: () => httpClient.get(API_PATHS.ambulance.base),
  getById: (id) => httpClient.get(`${API_PATHS.ambulance.base}/${id}`),
  getByPlate: (vehiclePlate) => httpClient.get(`${API_PATHS.ambulance.base}/by-plate/${vehiclePlate}`),
  create: (payload) => httpClient.post(API_PATHS.ambulance.base, payload),
  update: (id, payload) => httpClient.put(`${API_PATHS.ambulance.base}/${id}`, payload),
  updateByPlate: (vehiclePlate, payload) => httpClient.put(`${API_PATHS.ambulance.base}/by-plate/${vehiclePlate}`, payload),
  delete: (id) => httpClient.delete(`${API_PATHS.ambulance.base}/${id}`),

  // Status and filters
  listAvailable: () => httpClient.get(`${API_PATHS.ambulance.base}/available`),
  listByStatus: (status) => httpClient.get(`${API_PATHS.ambulance.base}/status/${status}`),
  getStatistics: () => httpClient.get(`${API_PATHS.ambulance.base}/statistics`),
  search: (query) => httpClient.get(`${API_PATHS.ambulance.base}/search`, { query: { query } }),
  listByType: (type) => httpClient.get(`${API_PATHS.ambulance.base}/type/${type}`),
  updateStatus: (id, status) => httpClient.patch(`${API_PATHS.ambulance.base}/${id}/status`, null, { query: { status } }),

  // Tracking and location
  updateLocation: (id, payload) => httpClient.post(`${API_PATHS.ambulance.base}/${id}/location`, payload),
  getTrackingHistory: (id, params = {}) => httpClient.get(`${API_PATHS.ambulance.base}/${id}/tracking-history`, { query: params }),
  getCurrentLocation: (id) => httpClient.get(`${API_PATHS.ambulance.base}/${id}/current-location`),
  listActiveTracking: () => httpClient.get(`${API_PATHS.ambulance.base}/tracking/active`),
  getMaintenanceDue: () => httpClient.get(`${API_PATHS.ambulance.base}/maintenance-due`),
  getAmbulanceDispatchHistory: (id) => httpClient.get(`${API_PATHS.ambulance.base}/${id}/dispatches`),

  // /api/assist (AmbulanceDispatchController)
  requestAssistance: (payload) => httpClient.post(API_PATHS.ambulance.dispatch, payload),
  createDispatch: (payload) => httpClient.post(API_PATHS.ambulance.dispatch, payload),
  listDispatches: () => httpClient.get(API_PATHS.ambulance.dispatch),
  getDispatchById: (id) => httpClient.get(`${API_PATHS.ambulance.dispatch}/${id}`),
  updateDispatch: (id, payload) => httpClient.put(`${API_PATHS.ambulance.dispatch}/${id}`, payload),
  deleteDispatch: (id) => httpClient.delete(`${API_PATHS.ambulance.dispatch}/${id}`),
  trackDispatch: (id) => httpClient.get(`${API_PATHS.ambulance.dispatch}/${id}/track`),

  // /api/drivers (AmbulanceDriverController)
  listDrivers: () => httpClient.get(API_PATHS.ambulance.drivers),
  getDriverById: (id) => httpClient.get(`${API_PATHS.ambulance.drivers}/${id}`),
  createDriver: (payload) => httpClient.post(API_PATHS.ambulance.drivers, payload),
  updateDriver: (id, payload) => httpClient.put(`${API_PATHS.ambulance.drivers}/${id}`, payload),
  deleteDriver: (id) => httpClient.delete(`${API_PATHS.ambulance.drivers}/${id}`),
  listAvailableDrivers: () => httpClient.get(`${API_PATHS.ambulance.drivers}/available`),
  listDriversByStatus: (status) => httpClient.get(`${API_PATHS.ambulance.drivers}/status/${status}`),
  updateDriverStatus: (id, status) =>
    httpClient.patch(`${API_PATHS.ambulance.drivers}/${id}/status`, null, { query: { status } }),
  assignDriverToAmbulance: (id, ambulanceId) =>
    httpClient.patch(`${API_PATHS.ambulance.drivers}/${id}/assign-ambulance`, null, { query: { ambulanceId } }),
  unassignDriverFromAmbulance: (id) =>
    httpClient.patch(`${API_PATHS.ambulance.drivers}/${id}/unassign-ambulance`),
};
