import { telemedicineApi } from "../../API/endpoints/telemedicineApi.js";

export const telemedicineService = {
  createSession: (payload) => telemedicineApi.createSession(payload),
  listSessions: (params = {}) => telemedicineApi.listSessions(params),
  getSessionById: (id) => telemedicineApi.getSessionById(id),
  updateSession: (id, payload) => telemedicineApi.updateSession(id, payload),
  deleteSession: (id) => telemedicineApi.deleteSession(id),
  startSession: (id) => telemedicineApi.startSession(id),
  pauseSession: (id) => telemedicineApi.pauseSession(id),
  resumeSession: (id) => telemedicineApi.resumeSession(id),
  completeSession: (id, params) => telemedicineApi.completeSession(id, params),
  cancelSession: (id, params) => telemedicineApi.cancelSession(id, params),
  terminateSession: (id, params) => telemedicineApi.terminateSession(id, params),
  rateSession: (id, params) => telemedicineApi.rateSession(id, params),
  getPlatformOverview: () => telemedicineApi.getOverview(),
  getRevenueData: (params = {}) => telemedicineApi.getRevenueData(params),
  getPlatformStats: () => telemedicineApi.getPlatformStats(),
  getOnlineDoctors: () => telemedicineApi.getOnlineDoctors(),
  getSessionHistory: (params = {}) => telemedicineApi.getHistory(params),
};
