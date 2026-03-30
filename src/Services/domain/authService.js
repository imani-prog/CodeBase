import { authApi } from "../../API/endpoints/authApi.js";
import {
  clearTokens,
  configureHttpClientHandlers,
  getRefreshToken,
  setTokens,
} from "../../API/clients/httpClient.js";
import { mapUserToUi } from "../mappers/uiMappers.js";

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const payload = await authApi.refresh({ refreshToken });
    setTokens({
      accessToken: payload?.accessToken,
      refreshToken: payload?.refreshToken || refreshToken,
    });
    return Boolean(payload?.accessToken);
  } catch {
    clearTokens();
    return false;
  }
}

function setupHttpAuthBridge(onUnauthorized) {
  configureHttpClientHandlers({
    refresh: refreshAccessToken,
    onUnauthorized,
  });
}

async function login(credentials) {
  const payload = await authApi.login(credentials);
  setTokens({
    accessToken: payload?.accessToken,
    refreshToken: payload?.refreshToken,
  });

  return {
    ...payload,
    user: mapUserToUi(payload?.user || {}),
  };
}

async function register(data) {
  return authApi.register(data);
}

async function me() {
  const payload = await authApi.me();
  return mapUserToUi(payload || {});
}

async function logout() {
  try {
    await authApi.logout({ refreshToken: getRefreshToken() });
  } finally {
    clearTokens();
  }
}

export const authService = {
  setupHttpAuthBridge,
  login,
  logout,
  register,
  me,
  refreshAccessToken,
};
