import { insuranceApi } from "../../API/endpoints/insuranceApi.js";

const listProviders = (params = {}) => insuranceApi.listProviders(params);
const getProviderById = (id) => insuranceApi.getProviderById(id);
const createProvider = (payload) => insuranceApi.createProvider(payload);
const updateProvider = (id, payload) => insuranceApi.updateProvider(id, payload);
const deleteProvider = (id) => insuranceApi.deleteProvider(id);

const listInsurancePlansByProvider = (providerId) => insuranceApi.listPlansByProvider(providerId);
const listInsurancePlansByProviderAndStatus = (providerId, status) => insuranceApi.listPlansByProviderAndStatus(providerId, status);
const createInsurancePlan = (payload) => insuranceApi.createPlan(payload);
const updateInsurancePlan = (id, payload) => insuranceApi.updatePlan(id, payload);
const deleteInsurancePlan = (id) => insuranceApi.deletePlan(id);

const listPoliciesByPatient = (patientId) => insuranceApi.listPoliciesByPatient(patientId);
const listPoliciesByProvider = (providerId) => insuranceApi.listPoliciesByProvider(providerId);
const listActivePoliciesInRange = (params) => insuranceApi.listActivePoliciesInRange(params);
const createPolicy = (payload) => insuranceApi.createPolicy(payload);
const updatePolicy = (id, payload) => insuranceApi.updatePolicy(id, payload);
const deletePolicy = (id) => insuranceApi.deletePolicy(id);

const createClaim = (payload) => insuranceApi.createClaim(payload);
const getClaimById = (id) => insuranceApi.getClaimById(id);
const updateClaimStatus = (id, params) => insuranceApi.updateClaimStatus(id, params);
const listClaimsByBilling = (billingId) => insuranceApi.listClaimsByBilling(billingId);
const listClaimsByProviderAndStatus = (providerId, status) => insuranceApi.listClaimsByProviderAndStatus(providerId, status);

const createBilling = (payload) => insuranceApi.createBilling(payload);
const getBillingById = (id) => insuranceApi.getBillingById(id);
const listBillingByPatient = (patientId) => insuranceApi.listBillingByPatient(patientId);

export const insuranceService = {
  listProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
  listInsurancePlansByProvider,
  listInsurancePlansByProviderAndStatus,
  createInsurancePlan,
  updateInsurancePlan,
  deleteInsurancePlan,
  listPoliciesByPatient,
  listPoliciesByProvider,
  listActivePoliciesInRange,
  createPolicy,
  updatePolicy,
  deletePolicy,
  createClaim,
  getClaimById,
  updateClaimStatus,
  listClaimsByBilling,
  listClaimsByProviderAndStatus,
  createBilling,
  getBillingById,
  listBillingByPatient,
};
