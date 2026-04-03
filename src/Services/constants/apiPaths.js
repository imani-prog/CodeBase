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
    base: "/api/chw-assignments",
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
    overview: "/api/telemedicine/sessions/overview",
    revenue: "/api/telemedicine/sessions/revenue",
    platformStats: "/api/telemedicine/sessions/platform-stats",
    onlineDoctors: "/api/telemedicine/sessions/doctors/online",
    history: "/api/telemedicine/sessions/history",
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
};
