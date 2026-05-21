import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

const canFallbackToById = (error) => {
  const status = Number(error?.status || 0);
  return status === 400 || status === 401 || status === 403 || status === 404;
};

const extractLinkedChwId = (payload) => {
  const root = payload?.data ?? payload?.user ?? payload;
  const candidate =
    root?.chwId ??
    root?.providerId ??
    root?.chw?.id ??
    root?.profile?.chwId ??
    root?.profile?.providerId ??
    null;

  if (candidate == null || candidate === "") return null;
  return String(candidate);
};

export const chwApi = {
  list: (params = {}) =>
    httpClient.get(API_PATHS.chw.base, { query: params }),
  me: async ({ fallbackUserId } = {}) => {
    try {
      return await httpClient.get(API_PATHS.chw.me);
    } catch (error) {
      if (!fallbackUserId || !canFallbackToById(error)) {
        throw error;
      }

      // CHW IDs are not guaranteed to equal auth user IDs. Resolve via user record first.
      let userPayload = null;
      try {
        userPayload = await httpClient.get(`${API_PATHS.users.base}/${fallbackUserId}`);
      } catch {
        throw error;
      }

      const linkedChwId = extractLinkedChwId(userPayload);
      if (!linkedChwId) {
        throw error;
      }

      return httpClient.get(`${API_PATHS.chw.base}/${linkedChwId}`);
    }
  },
  resolveMyChwId: async (fallbackUserId) => {
    const profile = await chwApi.me({ fallbackUserId });
    return profile?.id ?? profile?.chwId ?? profile?.providerId ?? profile?.userId ?? null;
  },
  getById: (id) =>
    httpClient.get(`${API_PATHS.chw.base}/${id}`),
  create: (payload) =>
    httpClient.post(API_PATHS.chw.base, payload),
  update: (id, payload) =>
    httpClient.put(`${API_PATHS.chw.base}/${id}`, payload),
  delete: (id) =>
    httpClient.delete(`${API_PATHS.chw.base}/${id}`),
  updateLocation: (id, payload) =>
    httpClient.patch(API_PATHS.chw.location(id), payload),
  updatePerformance: (id, payload) =>
    httpClient.patch(API_PATHS.chw.performance(id), payload),
  nearest: (params = {}) =>
    httpClient.get(API_PATHS.chw.nearest, { query: params }),
  byRegion: (region) =>
    httpClient.get(API_PATHS.chw.byRegion(region)),
  byStatus: (status) =>
    httpClient.get(API_PATHS.chw.byStatus(status)),
  search: (params = {}) =>
    httpClient.get(API_PATHS.chw.search, { query: params }),
};