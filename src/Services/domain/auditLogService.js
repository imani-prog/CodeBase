import { auditLogApi } from "../../API/endpoints/auditLogApi.js";
import { normalizeArray, normalizePagedResult } from "../mappers/normalize.js";

function mapAuditLog(log = {}) {
  const displayName = log.fullName || log.userName || log.username || "System";

  return {
    ...log,
    userName: displayName,
    fullName: log.fullName || displayName,
    username: log.username || "-",
    entityType: log.entityType || "-",
    entityId: log.entityId ?? "-",
    ipAddress: log.ipAddress || "-",
    correlationId: log.correlationId || "-",
    integrationPartnerId: log.integrationPartnerId || "-",
    failureReason: log.failureReason || log.errorMessage || null,
    performedAt: log.performedAt || log.eventTime || null,
  };
}

async function listAuditLogs(params = {}) {
  const payload = await auditLogApi.listAuditLogs(params);
  const paged = normalizePagedResult(payload);

  return {
    ...paged,
    items: normalizeArray(paged.items).map(mapAuditLog),
  };
}

export const auditLogService = {
  listAuditLogs,
};
