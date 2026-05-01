import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient, setTokens } from "../clients/httpClient.js";

export const authApi = {
  login: async (credentials) => {
    const response = await httpClient.post(
      API_PATHS.auth.login,
      credentials,
      { skipAuth: true }
    );
    setTokens({
      accessToken:  response.accessToken || response.token,
      refreshToken: response.refreshToken,
    });
    return response;
  },

  register: async (payload) => {
    const response = await httpClient.post(
      API_PATHS.auth.register,
      payload,
      { skipAuth: true }
    );
    setTokens({
      accessToken:  response.accessToken || response.token,
      refreshToken: response.refreshToken,
    });
    return response;
  },

  refresh: (payload) =>
    httpClient.post(API_PATHS.auth.refresh, payload, {
      skipAuth:    true,
      retryOn401:  false,
    }),

  logout: (payload = {}) =>
    httpClient.post(API_PATHS.auth.logout, payload, {
      retryOn401: false,
    }),

};