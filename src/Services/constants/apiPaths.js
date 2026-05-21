export const API_PATHS = {
  auth: {
    register: "/api/auth/register",
    login: "/api/auth/login",
    refresh: "/api/auth/refresh",
    logout: "/api/auth/logout",
    me: "/api/auth/me",
  },

  admin: {
    dashboardOverview: "/api/admin/dashboard/overview",
    dashboardKpis: "/api/admin/dashboard/kpis",
    dashboardCharts: "/api/admin/dashboard/charts",
  },
  users: {
    base: "/api/users",
    me: "/api/users/me",
    role: (id) => `/api/users/${id}/role`,
    status: (id) => `/api/users/${id}/status`,
  },
  patients: {
    base: "/api/patients",
    me: "/api/patients/me",
    location: (id) => `/api/patients/${id}/location`,
  },
  chw: {
    base: "/api/chw",
    me: "/api/chw/me",
    location: (id) => `/api/chw/${id}/location`,
    performance: (id) => `/api/chw/${id}/performance`,
    nearest: "/api/chw/nearest",
    byRegion: (region) => `/api/chw/by-region/${region}`,
    byStatus: (status) => `/api/chw/by-status/${status}`,
    search: "/api/chw/search",
  },
  appointments: {
    base: "/api/appointments",
    search: "/api/appointments/search",
    range: "/api/appointments/range",
  },
  assignments: {
    base: "/api/assignments",
  },
  homeVisits: {
    base: "/api/home-visits",
  },
  prescriptions: {
    base: "/api/prescriptions",
    pharmacies: "/api/prescriptions/pharmacies",
  },
  healthRecords: {
    base: "/api/health-records",
  },
  insurance: {
    plans: "/api/insurance/plans",
    policies: "/api/insurance/policies",
    providers: "/api/insurance/providers",
    claims: "/api/claims",
    billing: "/api/billing",
  },
  telemedicine: {
    sessions: "/api/telemedicine/sessions",
    byPatient: (patientId) => `/api/telemedicine/sessions/by-patient/${patientId}`,
    filter: "/api/telemedicine/sessions/filter",
    byStatus: (status) => `/api/telemedicine/sessions/by-status/${status}`,
    byPlatform: (platform) => `/api/telemedicine/sessions/by-platform/${platform}`,
    byPriority: (priority) => `/api/telemedicine/sessions/by-priority/${priority}`,
    search: "/api/telemedicine/sessions/search",
    overview: "/api/telemedicine/sessions/overview",
    revenue: "/api/telemedicine/sessions/revenue",
    platformStats: "/api/telemedicine/sessions/platform-stats",
    usageDistribution: "/api/telemedicine/sessions/usage-distribution",
    recentActivity: "/api/telemedicine/sessions/recent-activity",
    onlineDoctors: "/api/telemedicine/sessions/doctors/online",
    history: "/api/telemedicine/sessions/history",
  },

  training: {
    base: '/api/training-modules',
    byId: (id) => `/api/training-modules/${id}`,
    active: '/api/training-modules/active',
    topRated: '/api/training-modules/top-rated',
    available: '/api/training-modules/available',
    certification: '/api/training-modules/certification',
    search: '/api/training-modules/search',
    byLevel: (level) => `/api/training-modules/level/${level}`,
    byInstructor: (name) => `/api/training-modules/instructor/${name}`,
    byTag: (tag) => `/api/training-modules/tag/${tag}`,
    byRating: (min) => `/api/training-modules/rating/${min}`,
    activate: (id) => `/api/training-modules/${id}/activate`,
    deactivate: (id) => `/api/training-modules/${id}/deactivate`,
    rate: (id) => `/api/training-modules/${id}/rate`,
    // Enrollments
    enrollments: (moduleId) => `/api/training-modules/${moduleId}/enrollments`,
    enrollmentsByChw: (chwId) => `/api/training-modules/enrollments/chw/${chwId}`,
    enrollmentProgress: (enrollmentId) => `/api/training-modules/enrollments/${enrollmentId}/progress`,
    enrollmentStatus: (enrollmentId) => `/api/training-modules/enrollments/${enrollmentId}/status`,
    unenroll: (enrollmentId) => `/api/training-modules/enrollments/${enrollmentId}`,
  },

  ambulance: {
    base: "/api/ambulances",
    dispatch: "/api/assist",
    drivers: "/api/drivers",
  },
  hospitals: {
    base: "/api/hospitals",
  },
  reports: {
    base: "/api/reports",
  },
  auditLogs: {
    base: "/api/audit-logs",
  },
};
