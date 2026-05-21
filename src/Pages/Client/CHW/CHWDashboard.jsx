import { useState, useEffect, useCallback, createElement } from 'react';
import {
  Users,
  Calendar,
  MapPin,
  ClipboardList,
  TrendingUp,
  CheckCircle,
  Clock,
  Activity,
  Heart,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { chwService } from '../../../Services/domain/chwService.js';
import { homeVisitService } from '../../../Services/domain/homeVisitService.js';
import { assignmentService } from '../../../Services/domain/assignmentService.js';
import { refreshAppointmentGovernanceSnapshot } from '../../../Services/appointmentGovernanceStore';

// ─── Helpers ────────────────────────────────────────────────────────────────



function formatScheduledAt(iso) {
  if (!iso) return '—';
  const date = new Date(iso);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  const timeStr = date.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' });
  if (isToday) return `Today, ${timeStr}`;
  if (isTomorrow) return `Tomorrow, ${timeStr}`;
  return date.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' }) + `, ${timeStr}`;
}

function formatRelativeTime(iso) {
  if (!iso) return '';
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return diffDays === 1 ? 'Yesterday' : `${diffDays}d ago`;
}

function toNumericId(value) {
  if (value == null) return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const match = String(value).trim().match(/\d+/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

function isHomeVisitAppointment(value) {
  const text = String(value || '').toUpperCase();
  return text.includes('HOME') && text.includes('VISIT');
}

function mapAppointmentHomeVisits(rows = []) {
  return rows.reduce(
    (acc, row) => {
      const mapped = {
        id: `appt-${row?.id}`,
        patientName: row?.patientName || 'Unknown Patient',
        patientId: row?.patientId != null ? `PT-${row.patientId}` : 'N/A',
        location: row?.facility || 'Community Health Visit',
        type: 'Home Visit',
        priority: 'normal',
        notes: row?.reason || '',
        reason: row?.cancellationReason || '',
        outcome: row?.reason || '',
        scheduledAt: row?.scheduledAt || null,
        updatedAt: row?.updatedAt || row?.scheduledAt || null,
      };

      const status = String(row?.status || '').toUpperCase();
      if (status === 'COMPLETED') {
        acc.completed.push({ ...mapped, status: 'completed' });
      } else if (status === 'CANCELED' || status === 'NO_SHOW') {
        acc.cancelled.push({
          ...mapped,
          status: 'cancelled',
          reasonType: status === 'NO_SHOW' ? 'NO_SHOW' : undefined,
        });
      } else {
        acc.upcoming.push(mapped);
      }

      return acc;
    },
    { upcoming: [], completed: [], cancelled: [] }
  );
}

// Map a post-grouped visit (output of groupHomeVisitsByTab) → dashboard UI shape.
// groupHomeVisitsByTab already reshapes fields: patientId → patientIdText, visitType → type, etc.
function mapVisit(v) {
  const priorityUpper = String(v.priority || '').toUpperCase();
  return {
    id: v.id,
    patientName: v.patientName || 'Unknown Patient',
    // groupHomeVisitsByTab sets patientId = visit.patientIdText (already a string like "PT-123")
    patientId: v.patientId || '—',
    time: formatScheduledAt(v.scheduledAt),
    location: v.location || '—',
    // groupHomeVisitsByTab sets type = visit.visitType
    type: v.type || 'Home Visit',
    urgent: priorityUpper === 'HIGH' || priorityUpper === 'URGENT',
    status: String(v.status || '').toUpperCase(),
    scheduledAt: v.scheduledAt,
    updatedAt: v.updatedAt,
  };
}

function mapAppointmentToActivity(appointment) {
  const status = String(appointment?.status || '').toUpperCase();

  let action = 'Scheduled appointment';
  let icon = Calendar;
  if (status === 'COMPLETED') {
    action = 'Completed appointment';
    icon = CheckCircle;
  } else if (status === 'CANCELED' || status === 'NO_SHOW') {
    action = 'Cancelled appointment';
    icon = AlertCircle;
  } else if (status === 'ARRIVED' || status === 'IN_PROGRESS') {
    action = 'Checked in appointment';
    icon = Clock;
  }

  return {
    id: `appointment-${appointment?.id || appointment?.sourceAppointmentId || 'unknown'}`,
    action,
    icon,
    patientName: appointment?.patientName || 'Unknown Patient',
    sourceLabel: 'Appointments',
    activityAt: appointment?.updatedAt || appointment?.scheduledAt || null,
  };
}

function mapTaskAssignmentToActivity(taskAssignment) {
  const status = String(taskAssignment?.status || '').toUpperCase();

  let action = 'Assigned task';
  let icon = ClipboardList;
  if (status === 'IN_PROGRESS') {
    action = 'Started task';
    icon = Clock;
  } else if (status === 'COMPLETED') {
    action = 'Completed task';
    icon = CheckCircle;
  } else if (status === 'CANCELED' || status === 'CANCELLED') {
    action = 'Cancelled task';
    icon = AlertCircle;
  }

  return {
    id: `task-${taskAssignment?.id || 'unknown'}`,
    action,
    icon,
    patientName: taskAssignment?.patientName || 'Unknown Patient',
    sourceLabel: 'Tasks & Follow-ups',
    activityAt:
      taskAssignment?.updatedAt
      || taskAssignment?.completedAt
      || taskAssignment?.startedAt
      || taskAssignment?.assignedAt
      || taskAssignment?.createdAt
      || null,
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

// trend: 'up' | 'warn' | 'neutral' | null
function StatCard({ label, value, change, icon: Icon, loading, error, trend, trendLabel }) {
  const badge = {
    up:      'text-green-700',
    warn:    'text-yellow-700',
    neutral: 'text-gray-500',
  }[trend] ?? null;

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'warn' ? AlertCircle : null;

  const iconColor = trend === 'warn' ? 'text-yellow-600' : 'text-blue-600';

  return (
    <div className="bg-white border border-gray-200 p-3.5 flex flex-row items-center gap-3.5 min-w-0 overflow-hidden">
      
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        {loading ? (
          <div className="h-6 w-12 bg-gray-100 rounded animate-pulse" />
        ) : error ? (
          <p className="text-sm text-red-500">—</p>
        ) : (
          <p className="text-xl font-bold text-blue-600 leading-tight">{value ?? '—'}</p>
        )}
        <p className="text-xs font-bold text-gray-700 ">{label}</p>
        {!loading && !error && change && (
          <p className="text-[11px] text-gray-600 truncate">{change}</p>
        )}
        {!loading && !error && badge && trendLabel && (
          <span className={`inline-flex items-center gap-1 text-[11px] font-medium rounded px-1.5 py-0.5 w-fit mt-0.5 ${badge}`}>
            {TrendIcon && <TrendIcon className="w-3 h-3" />}
            {trendLabel}
          </span>
        )}
      </div>
    </div>
  );
}

function SectionError({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
      <AlertCircle className="w-6 h-6 text-red-400" />
      <p className="text-sm text-gray-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
        >
          <RefreshCw className="w-3 h-3" /> Retry
        </button>
      )}
    </div>
  );
}

function SectionSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 rounded-lg border border-gray-100 animate-pulse">
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
          <div className="h-3 bg-gray-100 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const CHWDashboard = () => {
  const { user } = useAuth();
  // CHW profile (drives stats)
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  // Upcoming home visits
  const [upcomingVisits, setUpcomingVisits] = useState([]);
  const [visitsLoading, setVisitsLoading] = useState(true);
  const [visitsError, setVisitsError] = useState(null);
  const [monthlyVisitsCount, setMonthlyVisitsCount] = useState(0);
  const [openTasksCount, setOpenTasksCount] = useState(0);

  // Recent activity across CHW portal modules
  const [recentActivity, setRecentActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);


  // ── Fetchers ───────────────────────────────────────────────────────────────

  const fetchProfile = useCallback(async () => {
    setProfileLoading(true);
    setProfileError(null);
    try {
      const data = await chwService.getMe(user?.id);
      setProfile(data);
    } catch (err) {
      setProfileError(err?.message || 'Failed to load profile');
    } finally {
      setProfileLoading(false);
    }
  }, [user?.id]);

  const fetchVisits = useCallback(async (chwId) => {
    setVisitsLoading(true);
    setActivityLoading(true);
    setVisitsError(null);
    try {
      // Mirror the HomeVisits page exactly: fetch ALL visits, group client-side.
      // Passing status as a query param is unreliable — the backend may ignore it
      // or use different enum casing. groupHomeVisitsByTab is the single source of truth.
      const normalizedChwId = toNumericId(chwId);
      const query = normalizedChwId != null ? { chwId: normalizedChwId } : {};
      const list = await homeVisitService.listHomeVisits(query);
      let grouped = homeVisitService.groupHomeVisitsByTab(list);

      let appointmentRows = [];
      if (normalizedChwId != null) {
        try {
          const snapshot = await refreshAppointmentGovernanceSnapshot({
            providerRole: 'CHW',
            chwId: normalizedChwId,
          });
          appointmentRows = Array.isArray(snapshot?.appointments) ? snapshot.appointments : [];
        } catch {
          appointmentRows = [];
        }
      }

      const groupedCount = grouped.upcoming.length + grouped.completed.length + grouped.cancelled.length;
      if (groupedCount === 0 && normalizedChwId != null) {
        const homeVisitAppointments = appointmentRows.filter((row) => (
            String(row?.providerRole || '').toUpperCase() === 'CHW'
            && String(row?.providerId ?? '') === String(normalizedChwId)
            && isHomeVisitAppointment(row?.appointmentType)
        ));

        if (homeVisitAppointments.length > 0) {
          grouped = mapAppointmentHomeVisits(homeVisitAppointments);
        }
      }

      // Upcoming: sort by scheduledAt asc, show next 5
      const sorted = (grouped.upcoming ?? [])
        .map(mapVisit)
        .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
        .slice(0, 5);
      setUpcomingVisits(sorted);

      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime();
      const isCurrentMonth = (iso) => {
        if (!iso) return false;
        const ts = Date.parse(iso);
        if (Number.isNaN(ts)) return false;
        return ts >= monthStart && ts < nextMonthStart;
      };

      // Monthly visits = all non-cancelled visits scheduled in the current calendar month.
      const monthlyVisitTotal = [
        ...(grouped.upcoming ?? []),
        ...(grouped.completed ?? []),
      ].filter((visit) => isCurrentMonth(visit?.scheduledAt)).length;
      setMonthlyVisitsCount(monthlyVisitTotal);

      // Activity feed: home visits + appointments + tasks.
      const visitCompleted = (grouped.completed ?? []).map((v) => ({
        ...mapVisit(v),
        id: `visit-completed-${v.id}`,
        action: 'Completed home visit',
        icon: CheckCircle,
        sourceLabel: 'Home Visits',
        activityAt: v.updatedAt || v.scheduledAt || null,
      }));
      const visitCancelled = (grouped.cancelled ?? []).map((v) => ({
        ...mapVisit(v),
        id: `visit-cancelled-${v.id}`,
        action: 'Visit cancelled',
        icon: AlertCircle,
        sourceLabel: 'Home Visits',
        activityAt: v.updatedAt || v.scheduledAt || null,
      }));
      const visitScheduled = (grouped.upcoming ?? []).map((v) => ({
        ...mapVisit(v),
        id: `visit-scheduled-${v.id}`,
        action: 'Visit scheduled',
        icon: Calendar,
        sourceLabel: 'Home Visits',
        activityAt: v.updatedAt || v.scheduledAt || null,
      }));

      const appointmentActivity = appointmentRows
        .filter((row) => String(row?.providerRole || '').toUpperCase() === 'CHW')
        .filter((row) => (
          normalizedChwId == null
          || String(row?.providerId ?? '') === String(normalizedChwId)
        ))
        .filter((row) => !isHomeVisitAppointment(row?.appointmentType))
        .map(mapAppointmentToActivity);

      let taskAssignments = [];
      if (normalizedChwId != null) {
        try {
          taskAssignments = await assignmentService.listAssignmentsByChw(normalizedChwId, { size: 300 });
        } catch (taskByChwError) {
          if (![401, 403, 404].includes(taskByChwError?.status)) {
            taskAssignments = [];
          }
        }
      }

      if (!taskAssignments.length) {
        try {
          const allAssignments = await assignmentService.listAssignments({ size: 300 });
          taskAssignments = normalizedChwId == null
            ? allAssignments
            : allAssignments.filter((row) => String(row?.chwId ?? '') === String(normalizedChwId));
        } catch {
          taskAssignments = [];
        }
      }

      const taskActivity = taskAssignments
        .filter((row) => String(row?.assignmentType || '').toUpperCase() === 'TASK')
        .map(mapTaskAssignmentToActivity);

      const openTaskTotal = taskAssignments
        .filter((row) => String(row?.assignmentType || '').toUpperCase() === 'TASK')
        .filter((row) => !['COMPLETED', 'CANCELED', 'CANCELLED'].includes(String(row?.status || '').toUpperCase()))
        .length;
      setOpenTasksCount(openTaskTotal);

      const activity = [
        ...visitCompleted,
        ...visitCancelled,
        ...visitScheduled,
        ...appointmentActivity,
        ...taskActivity,
      ]
        .filter((v) => v.activityAt)
        .sort((a, b) => new Date(b.activityAt) - new Date(a.activityAt))
        .slice(0, 5);
      setRecentActivity(activity);
    } catch (err) {
      setVisitsError(err?.message || 'Failed to load home visits');
      setMonthlyVisitsCount(0);
      setOpenTasksCount(0);
      setRecentActivity([]);
    } finally {
      setVisitsLoading(false);
      setActivityLoading(false);
    }
  }, []);


  // ── Bootstrap ──────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Once profile resolves, fetch visits (which also populates activity feed)
  useEffect(() => {
    if (profileLoading) return;
    fetchVisits(profile?.id ?? null);
  }, [profile, profileLoading, fetchVisits]);

  // ── Derived stats ──────────────────────────────────────────────────────────

  const stats = [
    {
      label: 'Assigned Patients',
      value: profile?.assignedPatients ?? null,
      change: profile?.region ? `Region: ${profile.region}` : null,
      icon: Users,
      loading: profileLoading,
      error: profileError,
    },
    {
      label: 'Monthly Visits',
      value: visitsLoading ? null : monthlyVisitsCount,
      change: `${new Date().toLocaleDateString('en-KE', { month: 'long' })} schedule`,
      icon: MapPin,
      loading: visitsLoading,
      error: visitsError,
    },
    {
      label: 'Upcoming Visits',
      value: visitsLoading ? null : upcomingVisits.length,
      change: 'Scheduled',
      icon: Calendar,
      loading: visitsLoading,
      error: visitsError,
    },
    {
      label: 'Open Tasks',
      value: visitsLoading ? null : openTasksCount,
      change: 'Pending and in progress',
      icon: ClipboardList,
      loading: visitsLoading,
      error: visitsError,
    },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          {profile && (
            <p className="text-sm font-medium mt-0.5">
              Welcome back, {profile.username || profile.name}
              {profile.region ? ` · ${profile.region}` : ''}
            </p>
          )}
        </div>
        {/* <button
          onClick={fetchProfile}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors"
          title="Refresh dashboard"
        >
          <RefreshCw className={`w-4 h-4 ${profileLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button> */}
      </div>

      {/* Profile error banner */}
      {profileError && !profileLoading && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{profileError}</span>
          <button onClick={fetchProfile} className="ml-auto underline text-xs">Retry</button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Upcoming Visits */}
        <div className="lg:col-span-2 bg-white p-4 border border-gray-200 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold flex items-center">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
              Upcoming Home Visits
            </h2>
            <Link
              to="/client/chw/home-visits"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View All →
            </Link>
          </div>

          {visitsLoading ? (
            <SectionSkeleton rows={3} />
          ) : visitsError ? (
            <SectionError
              message={visitsError}
              onRetry={() => fetchVisits(profile?.id ?? null)}
            />
          ) : upcomingVisits.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
              <Calendar className="w-8 h-8 text-gray-300" />
              <p className="text-sm text-gray-400">No upcoming visits scheduled</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingVisits.map((visit) => (
                <div
                  key={visit.id}
                  className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                    visit.urgent
                      ? 'border-red-200 bg-red-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <h3 className="font-semibold text-sm sm:text-base">{visit.patientName}</h3>
                        {visit.urgent && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                            Urgent
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full ml-auto">
                          {visit.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">ID: {visit.patientId}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-600 gap-1 sm:gap-4">
                        <span className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                          {visit.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                          <span className="truncate">{visit.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
            Recent Activity
          </h2>

          {activityLoading ? (
            <SectionSkeleton rows={4} />
          ) : recentActivity.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
              <Activity className="w-8 h-8 text-gray-300" />
              <p className="text-sm text-gray-400">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{item.action}</p>
                      <p className="text-sm text-gray-600 truncate">{item.patientName} · {item.sourceLabel}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatRelativeTime(item.activityAt || item.updatedAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Link
            to="/client/chw/patients"
            className="flex items-center space-x-3 bg-white p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <Users className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            <span className="font-semibold text-gray-700 group-hover:text-blue-700">View Patients</span>
          </Link>
          <Link
            to="/client/chw/tasks"
            className="flex items-center space-x-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <ClipboardList className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            <span className="font-semibold text-gray-700 group-hover:text-blue-700">Add Task</span>
          </Link>
          <Link
            to="/client/chw/appointments"
            className="flex items-center space-x-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <Heart className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            <span className="font-semibold text-gray-700 group-hover:text-blue-700">New Appointment</span>
          </Link>
          <Link
            to="/client/chw/reports"
            className="flex items-center space-x-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <TrendingUp className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            <span className="font-semibold text-gray-700 group-hover:text-blue-700">View Reports</span>
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default CHWDashboard;