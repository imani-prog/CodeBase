import { ambulanceApi } from "../../API/endpoints/ambulanceApi.js";

const getAllAmbulances = () => ambulanceApi.list();
const getAmbulanceById = (id) => ambulanceApi.getById(id);
const getAmbulanceByVehiclePlate = (vehiclePlate) => ambulanceApi.getByPlate(vehiclePlate);
const addAmbulance = (payload) => ambulanceApi.create(payload);
const updateAmbulance = (id, payload) => ambulanceApi.update(id, payload);
const updateAmbulanceByVehiclePlate = (vehiclePlate, payload) => ambulanceApi.updateByPlate(vehiclePlate, payload);
const deleteAmbulance = (id) => ambulanceApi.delete(id);
const getAvailableAmbulances = () => ambulanceApi.listAvailable();
const getAmbulancesByStatus = (status) => ambulanceApi.listByStatus(status);
const getAmbulancesByType = (type) => ambulanceApi.listByType(type);
const updateStatus = (id, status) => ambulanceApi.updateStatus(id, status);
const updateLocation = (id, payload) => ambulanceApi.updateLocation(id, payload);
const getTrackingHistory = (id, params = {}) => ambulanceApi.getTrackingHistory(id, params);
const getCurrentLocation = (id) => ambulanceApi.getCurrentLocation(id);
const getAllActiveTracking = () => ambulanceApi.listActiveTracking();
const getMaintenanceDue = () => ambulanceApi.getMaintenanceDue();
const getStatistics = () => ambulanceApi.getStatistics();
const searchAmbulances = (query) => ambulanceApi.search(query);
const getDispatchHistory = (id) => ambulanceApi.getAmbulanceDispatchHistory(id);

const requestAssistance = (payload) => ambulanceApi.requestAssistance(payload);
const getAllDispatches = () => ambulanceApi.listDispatches();
const getDispatchById = (id) => ambulanceApi.getDispatchById(id);
const updateDispatch = (id, payload) => ambulanceApi.updateDispatch(id, payload);
const deleteDispatch = (id) => ambulanceApi.deleteDispatch(id);
const trackDispatch = (id) => ambulanceApi.trackDispatch(id);

const addDriver = (payload) => ambulanceApi.createDriver(payload);
const getAllDrivers = () => ambulanceApi.listDrivers();
const getDriverById = (id) => ambulanceApi.getDriverById(id);
const getAvailableDrivers = () => ambulanceApi.listAvailableDrivers();
const getDriversByStatus = (status) => ambulanceApi.listDriversByStatus(status);
const updateDriver = (id, payload) => ambulanceApi.updateDriver(id, payload);
const updateDriverStatus = (id, status) => ambulanceApi.updateDriverStatus(id, status);
const assignToAmbulance = (id, ambulanceId) => ambulanceApi.assignDriverToAmbulance(id, ambulanceId);
const deleteDriver = (id) => ambulanceApi.deleteDriver(id);

export const ambulanceService = {
  // Backend-aligned methods
  getAllAmbulances,
  getAmbulanceById,
  getAmbulanceByVehiclePlate,
  addAmbulance,
  updateAmbulance,
  updateAmbulanceByVehiclePlate,
  deleteAmbulance,
  getAvailableAmbulances,
  getAmbulancesByStatus,
  getAmbulancesByType,
  updateStatus,
  updateLocation,
  getTrackingHistory,
  getCurrentLocation,
  getAllActiveTracking,
  getMaintenanceDue,
  getStatistics,
  searchAmbulances,
  getDispatchHistory,
  requestAssistance,
  getAllDispatches,
  getDispatchById,
  updateDispatch,
  deleteDispatch,
  trackDispatch,
  addDriver,
  getAllDrivers,
  getDriverById,
  getAvailableDrivers,
  getDriversByStatus,
  updateDriver,
  updateDriverStatus,
  assignToAmbulance,
  deleteDriver,

  // Backward-compatible aliases
  listAmbulances: getAllAmbulances,
  getAmbulanceByPlate: getAmbulanceByVehiclePlate,
  createAmbulance: addAmbulance,
  updateAmbulanceByPlate: updateAmbulanceByVehiclePlate,
  getAmbulanceStatistics: getStatistics,
  updateAmbulanceStatus: updateStatus,
  updateAmbulanceLocation: updateLocation,
  getAmbulanceTrackingHistory: getTrackingHistory,
  getMaintenanceDueAmbulances: getMaintenanceDue,
  getAmbulanceDispatchHistory: getDispatchHistory,
  createDispatch: requestAssistance,
  listDispatches: getAllDispatches,
  listAmbulanceDrivers: getAllDrivers,
  getAmbulanceDriverById: getDriverById,
  createAmbulanceDriver: addDriver,
  updateAmbulanceDriver: updateDriver,
  deleteAmbulanceDriver: deleteDriver,
  getAvailableAmbulanceDrivers: getAvailableDrivers,
  getAmbulanceDriversByStatus: getDriversByStatus,
  updateAmbulanceDriverStatus: updateDriverStatus,
  assignDriverToAmbulance: assignToAmbulance,
};
