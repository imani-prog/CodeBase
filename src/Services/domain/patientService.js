import { patientApi } from "../../API/endpoints/patientApi.js";
import { normalizeArray } from "../mappers/normalize.js";

function mapPatientToUi(row = {}) {
  return {
    id: row.id ?? null,
    name: row.name || row.fullName || "",
    email: row.email || "",
    phone: row.phone || "",
    status: row.status || "",
    raw: row,
  };
}

async function listPatients(params = {}) {
  const payload = await patientApi.list(params);
  return normalizeArray(payload).map(mapPatientToUi);
}

async function getPatientById(patientId) {
  return mapPatientToUi(await patientApi.getById(patientId));
}

async function createPatient(payload) {
  return mapPatientToUi(await patientApi.create(payload));
}

async function updatePatient(patientId, payload) {
  return mapPatientToUi(await patientApi.update(patientId, payload));
}

async function deletePatient(patientId) {
  return patientApi.delete(patientId);
}

async function updatePatientLocation(patientId, locationPayload) {
  return patientApi.updateLocation(patientId, locationPayload);
}

export const patientService = {
  listPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  updatePatientLocation,
};
