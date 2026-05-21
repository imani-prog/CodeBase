import { API_PATHS } from '../../Services/constants/apiPaths.js';
import { httpClient } from '../clients/httpClient.js';

export const trainingApi = {
  
  list:            ()              => httpClient.get(API_PATHS.training.base),
  getById:         (id)            => httpClient.get(API_PATHS.training.byId(id)),
  create:          (payload)       => httpClient.post(API_PATHS.training.base, payload),
  update:          (id, payload)   => httpClient.put(API_PATHS.training.byId(id), payload),
  delete:          (id)            => httpClient.delete(API_PATHS.training.byId(id)),
  activate:        (id)            => httpClient.patch(API_PATHS.training.activate(id)),
  deactivate:      (id)            => httpClient.patch(API_PATHS.training.deactivate(id)),
  listActive:      ()              => httpClient.get(API_PATHS.training.active),
  listTopRated:    ()              => httpClient.get(API_PATHS.training.topRated),
  listAvailable:   ()              => httpClient.get(API_PATHS.training.available),
  listCertification: ()            => httpClient.get(API_PATHS.training.certification),
  search:          (keyword)       => httpClient.get(API_PATHS.training.search, { query: { keyword } }),
  listByLevel:     (level)         => httpClient.get(API_PATHS.training.byLevel(level)),
  listByInstructor:(name)          => httpClient.get(API_PATHS.training.byInstructor(name)),
  listByTag:       (tag)           => httpClient.get(API_PATHS.training.byTag(tag)),
  listByRating:    (min)           => httpClient.get(API_PATHS.training.byRating(min)),
  rate:            (id, rating, comment) =>
    httpClient.post(`${API_PATHS.training.rate(id)}?rating=${rating}${comment ? `&comment=${encodeURIComponent(comment)}` : ''}`),

  enroll:           (moduleId, payload)      => httpClient.post(API_PATHS.training.enrollments(moduleId), payload),
  getEnrollments:   (moduleId)               => httpClient.get(API_PATHS.training.enrollments(moduleId)),
  getChwEnrollments:(chwId)                  => httpClient.get(API_PATHS.training.enrollmentsByChw(chwId)),
  updateProgress:   (enrollmentId, progress) =>
    httpClient.patch(`${API_PATHS.training.enrollmentProgress(enrollmentId)}?progressPercentage=${progress}`),
  updateStatus:     (enrollmentId, status)   =>
    httpClient.patch(`${API_PATHS.training.enrollmentStatus(enrollmentId)}?status=${status}`),
  unenroll:         (enrollmentId)           => httpClient.delete(API_PATHS.training.unenroll(enrollmentId)),
  issueCertificates:(moduleId, payload)      =>
    httpClient.post(`${API_PATHS.training.byId(moduleId)}/certificates/issue`, payload),
  exportReport:     (payload)                =>
    httpClient.post(`${API_PATHS.training.base}/reports/export`, payload),
};