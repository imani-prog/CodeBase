import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const authApi = {
  register: (payload) => httpClient.post(API_PATHS.auth.register, payload, { skipAuth: true }),
  login: (payload) => httpClient.post(API_PATHS.auth.login, payload, { skipAuth: true }),
  refresh: (payload) => httpClient.post(API_PATHS.auth.refresh, payload, { skipAuth: true, retryOn401: false }),
  logout: (payload) => httpClient.post(API_PATHS.auth.logout, payload),
  me: () => httpClient.get(API_PATHS.auth.me),
};
