import { normalizeArray, normalizeStatus, safeNumber, safeString } from "./normalize.js";

export function mapUserToUi(user = {}) {
  const name = user.fullName || user.name || user.username || "Unknown";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return {
    id: user.id ?? null,
    name,
    initials,
    email: safeString(user.email),
    phone: safeString(user.phone),
    role: safeString(user.role).toLowerCase(),
    status: normalizeStatus(user.status, "UNKNOWN"),
  };
}

export function mapAppointmentToUi(row = {}) {
  return {
    id: row.id ?? null,
    code: row.appointmentCode || "",
    patientId: row.patientId ?? null,
    patientName: row.patientName || "Unknown Patient",
    providerName: row.providerName || "",
    status: normalizeStatus(row.status, "BOOKED"),
    type: row.type || "",
    location: row.location || row.room || "",
    reason: row.reason || "",
    scheduledStart: row.scheduledStart || null,
    scheduledEnd: row.scheduledEnd || null,
  };
}

export function mapPrescriptionToUi(row = {}) {
  return {
    id: row.id ?? null,
    code: row.prescriptionCode || "",
    medicationName: row.medicationName || "",
    dosage: row.dosage || "",
    frequency: row.frequency || "",
    doctorName: row.doctorName || "",
    status: normalizeStatus(row.status, "UNKNOWN"),
    refillsRemaining: safeNumber(row.refillsRemaining, 0),
    nextDoseAt: row.nextDoseAt || null,
    sideEffects: normalizeArray(row.sideEffects),
  };
}
