import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const insuranceApi = {
  listPlansByProvider: (providerId) => httpClient.get(`${API_PATHS.insurance.plans}/provider/${providerId}`),
  listPlansByProviderAndStatus: (providerId, status) => httpClient.get(`${API_PATHS.insurance.plans}/provider/${providerId}/status/${status}`),
  createPlan: (payload) => httpClient.post(API_PATHS.insurance.plans, payload),
  updatePlan: (id, payload) => httpClient.put(`${API_PATHS.insurance.plans}/${id}`, payload),
  deletePlan: (id) => httpClient.delete(`${API_PATHS.insurance.plans}/${id}`),
  listPoliciesByPatient: (patientId) => httpClient.get(`${API_PATHS.insurance.policies}/patient/${patientId}`),
  listPoliciesByProvider: (providerId) => httpClient.get(`${API_PATHS.insurance.policies}/provider/${providerId}`),
  listActivePoliciesInRange: (params) => httpClient.get(`${API_PATHS.insurance.policies}/active`, { query: params }),
  createPolicy: (payload) => httpClient.post(API_PATHS.insurance.policies, payload),
  updatePolicy: (id, payload) => httpClient.put(`${API_PATHS.insurance.policies}/${id}`, payload),
  deletePolicy: (id) => httpClient.delete(`${API_PATHS.insurance.policies}/${id}`),
  createClaim: (payload) => httpClient.post(API_PATHS.insurance.claims, payload),
  getClaimById: (id) => httpClient.get(`${API_PATHS.insurance.claims}/${id}`),
  updateClaimStatus: (id, params) => httpClient.patch(`${API_PATHS.insurance.claims}/${id}/status`, null, { query: params }),
  listClaimsByBilling: (billingId) => httpClient.get(`${API_PATHS.insurance.claims}/billing/${billingId}`),
  listClaimsByProviderAndStatus: (providerId, status) => httpClient.get(`${API_PATHS.insurance.claims}/provider/${providerId}/status/${status}`),
  createBilling: (payload) => httpClient.post(API_PATHS.insurance.billing, payload),
  getBillingById: (id) => httpClient.get(`${API_PATHS.insurance.billing}/${id}`),
  listBillingByPatient: (patientId) => httpClient.get(`${API_PATHS.insurance.billing}/patient/${patientId}`),
};
