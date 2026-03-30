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
  },
  patients: {
    base: "/api/patients",
  },
  chw: {
    base: "/api/chw",
    search: "/api/chw/search",
    nearest: "/api/chw/nearest",
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
  reports: {
    base: "/api/reports",
  },
};
