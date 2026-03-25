const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");

const TOKEN_KEYS = {
  access: "medilink_access_token",
  refresh: "medilink_refresh_token",
};

let authHandlers = {
  refresh: null,
  onUnauthorized: null,
};

function buildUrl(path, query) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (query && typeof query === "object") {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

function parseBody(contentType, rawText) {
  if (!rawText) return null;
  if (contentType?.includes("application/json")) {
    try {
      return JSON.parse(rawText);
    } catch {
      return { message: "Invalid JSON response from server." };
    }
  }
  return rawText;
}

function getStoredToken(key) {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
}

function setStoredToken(key, value) {
  if (typeof window === "undefined") return;
  if (!value) {
    window.localStorage.removeItem(key);
    return;
  }
  window.localStorage.setItem(key, value);
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export function getAccessToken() {
  return getStoredToken(TOKEN_KEYS.access);
}

export function getRefreshToken() {
  return getStoredToken(TOKEN_KEYS.refresh);
}

export function setTokens({ accessToken, refreshToken }) {
  setStoredToken(TOKEN_KEYS.access, accessToken || null);
  setStoredToken(TOKEN_KEYS.refresh, refreshToken || null);
}

export function clearTokens() {
  setStoredToken(TOKEN_KEYS.access, null);
  setStoredToken(TOKEN_KEYS.refresh, null);
}

export function configureHttpClientHandlers(handlers = {}) {
  authHandlers = {
    refresh: handlers.refresh || null,
    onUnauthorized: handlers.onUnauthorized || null,
  };
}

export async function request(path, options = {}) {
  const {
    method = "GET",
    query,
    body,
    headers = {},
    signal,
    skipAuth = false,
    retryOn401 = true,
  } = options;

  const accessToken = getAccessToken();
  const requestHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (!skipAuth && accessToken) {
    requestHeaders.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    headers: requestHeaders,
    body: body === undefined || body === null ? undefined : JSON.stringify(body),
    signal,
  });

  if (response.status === 401 && retryOn401 && typeof authHandlers.refresh === "function") {
    const refreshed = await authHandlers.refresh();
    if (refreshed) {
      return request(path, { ...options, retryOn401: false });
    }
    if (typeof authHandlers.onUnauthorized === "function") {
      authHandlers.onUnauthorized();
    }
  }

  const rawText = await response.text();
  const payload = parseBody(response.headers.get("content-type"), rawText);

  if (!response.ok) {
    const message = payload?.message || response.statusText || "Request failed";
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export const httpClient = {
  request,
  get: (path, options = {}) => request(path, { ...options, method: "GET" }),
  post: (path, body, options = {}) => request(path, { ...options, method: "POST", body }),
  put: (path, body, options = {}) => request(path, { ...options, method: "PUT", body }),
  patch: (path, body, options = {}) => request(path, { ...options, method: "PATCH", body }),
  delete: (path, options = {}) => request(path, { ...options, method: "DELETE" }),
};
