import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient, setTokens } from "../clients/httpClient.js";

export const authApi = {
  // Login — returns { token, username, role, id }
  login: async (credentials) => {
    const response = await httpClient.post(
      API_PATHS.auth.login,
      credentials,
      { skipAuth: true }
    );
    setTokens({
      accessToken: response.token || response.accessToken,
      refreshToken: response.refreshToken,
    });
    return response;
  },

  // Register — returns { token, username, role, id }
  register: async (payload) => {
    const response = await httpClient.post(
      API_PATHS.auth.register,
      payload,
      { skipAuth: true }
    );
    setTokens({
      accessToken: response.token || response.accessToken,
      refreshToken: response.refreshToken,
    });
    return response;
  },

  refresh: (payload) =>
    httpClient.post(API_PATHS.auth.refresh, payload, {
      skipAuth: true,
      retryOn401: false,
    }),

  me: () => httpClient.get(API_PATHS.auth.me),

  logout: (payload = {}) =>
    httpClient.post(API_PATHS.auth.logout, payload, {
      retryOn401: false,
    }),
};