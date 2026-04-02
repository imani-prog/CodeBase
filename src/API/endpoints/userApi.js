import { API_PATHS } from "../../Services/constants/apiPaths.js";
import { httpClient } from "../clients/httpClient.js";

export const userApi = {
  me: () => httpClient.get(API_PATHS.users.me),
  list: () => httpClient.get(API_PATHS.users.base),
  getById: (id) => httpClient.get(`${API_PATHS.users.base}/${id}`),
  create: (payload) => httpClient.post(API_PATHS.users.base, payload),
  update: (id, payload) => httpClient.put(`${API_PATHS.users.base}/${id}`, payload),
  delete: (id) => httpClient.delete(`${API_PATHS.users.base}/${id}`),
  updateRole: (id, role) => httpClient.patch(
    API_PATHS.users.role(id),
    null,
    { query: { role } }
  ),
  updateStatus: (id, status) => httpClient.patch(
    API_PATHS.users.status(id),
    null,
    { query: { status } }
  ),
};