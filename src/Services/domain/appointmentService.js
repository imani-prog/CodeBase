import { appointmentApi } from "../../API/endpoints/appointmentApi.js";
import { mapAppointmentToUi } from "../mappers/uiMappers.js";
import { normalizeArray, normalizePagedResult } from "../mappers/normalize.js";

async function listAppointments(params = {}) {
  const payload = await appointmentApi.list(params);
  return normalizeArray(payload).map(mapAppointmentToUi);
}

async function searchAppointments(params = {}) {
  const payload = await appointmentApi.search(params);
  const paged = normalizePagedResult(payload);
  return {
    ...paged,
    items: normalizeArray(paged.items).map(mapAppointmentToUi),
  };
}

async function getAppointmentById(appointmentId) {
  return mapAppointmentToUi(await appointmentApi.getById(appointmentId));
}

async function createAppointment(payload) {
  return mapAppointmentToUi(await appointmentApi.create(payload));
}

async function updateAppointment(appointmentId, payload) {
  return mapAppointmentToUi(await appointmentApi.update(appointmentId, payload));
}

async function deleteAppointment(appointmentId) {
  return appointmentApi.delete(appointmentId);
}

async function listAppointmentsByPatient(patientId) {
  const payload = await appointmentApi.listByPatient(patientId);
  return normalizeArray(payload).map(mapAppointmentToUi);
}

async function listAppointmentsByHospital(hospitalId) {
  const payload = await appointmentApi.listByHospital(hospitalId);
  return normalizeArray(payload).map(mapAppointmentToUi);
}

async function listAppointmentsByStatus(status) {
  const payload = await appointmentApi.listByStatus(status);
  return normalizeArray(payload).map(mapAppointmentToUi);
}

async function listAppointmentsInRange(params) {
  const payload = await appointmentApi.listInRange(params);
  return normalizeArray(payload).map(mapAppointmentToUi);
}

const confirmAppointment = (id) => appointmentApi.confirm(id);
const checkInAppointment = (id) => appointmentApi.checkIn(id);
const checkOutAppointment = (id) => appointmentApi.checkOut(id);
const cancelAppointment = (id, reason) => appointmentApi.cancel(id, { reason });
const rescheduleAppointment = (id, payload) => appointmentApi.reschedule(id, payload);

export const appointmentService = {
  listAppointments,
  searchAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  listAppointmentsByPatient,
  listAppointmentsByHospital,
  listAppointmentsByStatus,
  listAppointmentsInRange,
  confirmAppointment,
  checkInAppointment,
  checkOutAppointment,
  cancelAppointment,
  rescheduleAppointment,
};
