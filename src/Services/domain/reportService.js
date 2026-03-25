import { reportApi } from "../../API/endpoints/reportApi.js";

export const reportService = {
  listReports: (params = {}) => reportApi.list(params),
  getReportById: (id) => reportApi.getById(id),
  createReport: (payload) => reportApi.create(payload),
  updateReport: (id, payload) => reportApi.update(id, payload),
  updateReportStatus: (id, payload) => reportApi.updateStatus(id, payload),
  updateReportFile: (id, payload) => reportApi.updateFile(id, payload),
  deleteReport: (id) => reportApi.delete(id),
};
