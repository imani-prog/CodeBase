import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const auditLogApi = {
  listAuditLogs: (params = {}) => httpClient.get(API_PATHS.auditLogs.base, { query: params }),
};
