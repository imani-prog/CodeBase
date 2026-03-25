import { prescriptionApi } from "../../API/endpoints/prescriptionApi.js";
import { mapPrescriptionToUi } from "../mappers/uiMappers.js";
import { normalizeArray, normalizePagedResult } from "../mappers/normalize.js";

async function listPrescriptions(params = {}) {
  const payload = await prescriptionApi.list(params);
  const paged = normalizePagedResult(payload);
  return {
    ...paged,
    items: normalizeArray(paged.items).map(mapPrescriptionToUi),
  };
}

async function getPrescriptionById(prescriptionId) {
  return mapPrescriptionToUi(await prescriptionApi.getById(prescriptionId));
}

async function createPrescription(payload) {
  return mapPrescriptionToUi(await prescriptionApi.create(payload));
}

async function updatePrescription(prescriptionId, payload) {
  return mapPrescriptionToUi(await prescriptionApi.update(prescriptionId, payload));
}

const deletePrescription = (id) => prescriptionApi.delete(id);

async function listPrescriptionsByPatient(patientId, params = {}) {
  const payload = await prescriptionApi.listByPatient(patientId, params);
  return normalizeArray(payload).map(mapPrescriptionToUi);
}

const markPrescriptionComplete = (id) => prescriptionApi.markComplete(id);
const markPrescriptionExpired = (id) => prescriptionApi.markExpired(id);
const listRefills = (id) => prescriptionApi.listRefills(id);
const requestRefill = (id, payload) => prescriptionApi.requestRefill(id, payload);
const decideRefill = (id, payload) => prescriptionApi.decideRefill(id, payload);
const listPharmacies = () => prescriptionApi.listPharmacies();
const savePharmacy = (payload) => prescriptionApi.savePharmacy(payload);

export const prescriptionService = {
  listPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
  listPrescriptionsByPatient,
  markPrescriptionComplete,
  markPrescriptionExpired,
  listRefills,
  requestRefill,
  decideRefill,
  listPharmacies,
  savePharmacy,
};
