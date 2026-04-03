import { hospitalApi } from "../../API/endpoints/hospitalApi.js";

const listHospitals = (params = {}) => hospitalApi.list(params);
const getHospitalById = (id) => hospitalApi.getById(id);
const createHospital = (payload) => hospitalApi.create(payload);
const updateHospital = (id, payload) => hospitalApi.update(id, payload);
const deleteHospital = (id) => hospitalApi.delete(id);
const getHospitalByCode = (code) => hospitalApi.getByCode(code);
const getHospitalsByFacility = (facility) => hospitalApi.listByFacility(facility);

export const hospitalService = {
  listHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital,
  getHospitalByCode,
  getHospitalsByFacility,

  // Backward-compatible aliases
  list: listHospitals,
  getById: getHospitalById,
  create: createHospital,
  update: updateHospital,
  delete: deleteHospital,
  getByCode: getHospitalByCode,
  listByFacility: getHospitalsByFacility,
};