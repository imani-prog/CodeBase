import { healthRecordApi } from "../../API/endpoints/healthRecordApi.js";
import { normalizeArray, normalizePagedResult } from "../mappers/normalize.js";

function mapHealthRecordToUi(row = {}) {
  return {
    id: row.id ?? null,
    recordCode: row.recordCode || "",
    patientId: row.patientId ?? null,
    patientName: row.patientName || "",
    recordType: row.recordType || "",
    status: (row.status || "UNKNOWN").toUpperCase(),
    visitDate: row.visitDate || null,
    summary: row.summary || "",
    providerName: row.providerName || row.doctorName || "",
    raw: row,
  };
}

async function listHealthRecords(params = {}) {
  const payload = await healthRecordApi.list(params);
  const paged = normalizePagedResult(payload);
  return {
    ...paged,
    items: normalizeArray(paged.items).map(mapHealthRecordToUi),
  };
}

async function getHealthRecordById(recordId) {
  return mapHealthRecordToUi(await healthRecordApi.getById(recordId));
}

async function createHealthRecord(payload) {
  return mapHealthRecordToUi(await healthRecordApi.create(payload));
}

async function updateHealthRecord(recordId, payload) {
  return mapHealthRecordToUi(await healthRecordApi.update(recordId, payload));
}

const deleteHealthRecord = (id) => healthRecordApi.delete(id);

async function listHealthRecordsByPatient(patientId) {
  const payload = await healthRecordApi.listByPatient(patientId);
  return normalizeArray(payload).map(mapHealthRecordToUi);
}

export const healthRecordService = {
  listHealthRecords,
  getHealthRecordById,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
  listHealthRecordsByPatient,
};
