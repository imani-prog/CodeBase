import { useEffect, useState, useCallback } from 'react';
import {
  User, Mail, Phone, MapPin, Briefcase, Award, Users,
  Activity, Shield, Settings, Save, Edit3,
  X, Camera, Check, Download, LogOut, Eye, EyeOff,
  Monitor, MapPinned, Loader2, AlertCircle, RefreshCw
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { chwService } from '../../../Services/domain/chwService.js';

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */

/** Format a date string or LocalDate to a readable label */
function formatDate(val) {
  if (!val) return '—';
  try { return new Date(val).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }); }
  catch { return val; }
}

/** Format OffsetDateTime to "Month DD, YYYY" */
function formatJoined(val) {
  if (!val) return '—';
  try { return new Date(val).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' }); }
  catch { return val; }
}

/** Map backend Status enum → display + colour */
function statusMeta(status = '') {
  const s = status.toUpperCase();
  if (s === 'AVAILABLE') return { label: 'Active', colour: 'bg-green-400' };
  if (s === 'BUSY')      return { label: 'Busy',   colour: 'bg-amber-400' };
  return                         { label: 'Offline', colour: 'bg-gray-400' };
}

/* ─────────────────────────────────────────
   Sub-components (unchanged from original)
───────────────────────────────────────── */

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-200 bg-white">
    {Icon && <Icon className="w-4 h-4 text-blue-600 flex-shrink-0" />}
    <div className="min-w-0">
      <h2 className="text-sm font-semibold text-gray-800 leading-tight">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5 leading-tight">{subtitle}</p>}
    </div>
  </div>
);

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
    <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 break-words">{value || '—'}</p>
  </div>
);

const EditableField = ({ label, icon: Icon, value, onChange, type = 'text', editMode }) => (
  <div>
    <label className="flex items-center text-xs font-medium text-gray-500 mb-1">
      {Icon && <Icon className="w-3.5 h-3.5 mr-1 text-blue-600 flex-shrink-0" />}
      {label}
    </label>
    {editMode ? (
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
      />
    ) : (
      <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 break-words">{value || '—'}</p>
    )}
  </div>
);

const InfoNote = ({ title, message }) => (
  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
    <div>
      <p className="text-xs font-semibold text-blue-800">{title}</p>
      <p className="text-xs text-blue-700 mt-0.5">{message}</p>
    </div>
  </div>
);

/* Skeleton shimmer */
const Shimmer = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

/* Full-page error banner */
const ErrorBanner = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
    <AlertCircle className="w-8 h-8 text-red-400" />
    <p className="text-sm text-gray-600">{message}</p>
    <button
      onClick={onRetry}
      className="flex items-center gap-1.5 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <RefreshCw className="w-3.5 h-3.5" /> Retry
    </button>
  </div>
);

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
const CHWProfile = () => {
  const { user, setUser } = useAuth();

  /* Remote data state */
  const [chw, setChw]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [saving, setSaving]   = useState(false);
  const [saveError, setSaveError] = useState(null);

  /* Form / UI state */
  const [form, setForm]       = useState({});
  const [editMode, setEditMode]             = useState(false);
  const [showPassword, setShowPassword]     = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications]  = useState({ email: true, sms: false, push: true, alerts: true });

  /* ── Fetch ── */
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await chwService.getMe();
      setChw(data);
      setForm(data);                    // seed form with live data
    } catch (err) {
      setError(err?.message || 'Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  /* ── Field change ── */
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  /* ── Save ── */
  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      // Build backend payload from form values (matches CommunityHealthWorkers entity)
      const payload = {
        firstName:    form.firstName,
        lastName:     form.lastName,
        email:        form.email,
        phone:        form.phone,
        addressLine1: form.street,
        city:         form.city,
        state:        form.county,
        postalCode:   form.postalCode,
        country:      form.country,
        region:       form.region,
        specialization: form.specialization,
      };

      const updated = await chwService.updateChw(chw.id, payload);
      setChw(updated);
      setForm(updated);

      // Keep auth context in sync
      setUser((prev) => ({
        ...prev,
        name:  [updated.firstName, updated.lastName].filter(Boolean).join(' ') || prev?.name,
        email: updated.email,
        phone: updated.phone,
        initials: [updated.firstName, updated.lastName]
          .filter(Boolean).map((w) => w[0].toUpperCase()).join('') || prev?.initials,
      }));

      setEditMode(false);
    } catch (err) {
      setSaveError(err?.message || 'Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(chw);       // revert unsaved changes
    setSaveError(null);
    setEditMode(false);
  };

  /* ── Derived values ── */
  const fullName = form.firstName || form.lastName
    ? [form.firstName, form.lastName].filter(Boolean).join(' ')
    : chw?.name || '—';

  const initials = [form.firstName, form.lastName]
    .filter(Boolean).map((w) => w[0].toUpperCase()).join('') || '??';

  const { label: statusLabel, colour: statusColour } = statusMeta(chw?.status);

  /* Static demo data (replace with real API calls when endpoints exist) */
  const recentActivity = [
    { action: 'Completed home visit for patient #0234', time: '1 hr ago' },
    { action: 'Updated health record for Mary Otieno', time: '3 hrs ago' },
    { action: 'Submitted monthly report', time: '1 day ago' },
    { action: 'Completed Maternal Health training module', time: '2 days ago' },
    { action: 'Registered new patient in coverage area', time: '3 days ago' },
  ];

  const loginSessions = [
    { device: 'Android Phone', location: 'Nairobi, Kenya', time: 'Current session', status: 'active' },
    { device: 'Shared Tablet', location: 'Kibera Health Centre', time: '5 hrs ago', status: 'active' },
    { device: 'Windows PC', location: 'Nairobi, Kenya', time: '2 days ago', status: 'inactive' },
  ];

  const performanceStats = chw ? [
    { label: 'Assigned Patients', value: chw.assignedPatients, icon: Users },
    { label: 'Monthly Visits',    value: chw.monthlyVisits,    icon: MapPinned },
    { label: 'Success Rate',      value: chw.successRate != null ? `${chw.successRate}%` : '—', icon: Activity },
    { label: 'Rating',            value: chw.rating != null ? `${chw.rating}/5` : '—', icon: Award },
  ] : [];

  /* ── Render: loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 space-y-4">
        <Shimmer className="h-8 w-40" />
        <div className="border border-gray-200 bg-white rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Shimmer className="w-11 h-11 rounded-full" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-4 w-32" />
              <Shimmer className="h-3 w-24" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => <Shimmer key={i} className="h-10" />)}
          </div>
        </div>
        <div className="border border-gray-200 bg-white rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => <Shimmer key={i} className="h-10" />)}
          </div>
        </div>
      </div>
    );
  }

  /* ── Render: error ── */
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <ErrorBanner message={error} onRetry={fetchProfile} />
      </div>
    );
  }

  /* ── Render: profile ── */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-0 sm:px-4 py-4 sm:py-6">

        {/* Page header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">My Profile</h1>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {editMode ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-50"
                >
                  <X className="w-3.5 h-3.5" /><span className="hidden sm:inline">Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving
                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    : <Save className="w-3.5 h-3.5" />}
                  <span>{saving ? 'Saving…' : 'Save'}</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit3 className="w-3.5 h-3.5" /><span>Edit</span>
              </button>
            )}
            <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
              <LogOut className="w-3.5 h-3.5" /><span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Save error */}
        {saveError && (
          <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />{saveError}
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">

          {/* ── Personal Information ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={User} title="Personal Information" subtitle="Your account details and contact information" />
            <div className="p-4">
              {/* Avatar row */}
              <div className="flex items-start gap-3 pb-4 mb-4 border-b border-gray-100">
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm select-none">
                    {initials}
                  </div>
                  <button className="absolute -bottom-0.5 -right-0.5 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700">
                    <Camera className="w-2.5 h-2.5" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-tight">{fullName}</p>
                  <p className="text-xs text-blue-600 leading-tight mt-0.5 truncate">{chw?.user?.role || 'Community Health Worker'}</p>
                  <p className="text-xs text-gray-500 leading-tight truncate">{chw?.specialization}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full inline-block flex-shrink-0 ${statusColour}`} />
                    <span className="text-xs text-gray-400">{statusLabel}</span>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 flex-shrink-0 hidden sm:block">
                  <p className="font-mono font-medium text-gray-700">{chw?.code}</p>
                  <p className="mt-0.5">Joined {formatJoined(chw?.createdAt)}</p>
                </div>
              </div>

              {/* Mobile: code pill */}
              <div className="sm:hidden flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg mb-3">
                <span className="text-xs text-gray-500">CHW Code</span>
                <span className="text-xs font-mono font-medium text-gray-700">{chw?.code}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EditableField label="First Name" icon={User} value={form.firstName} onChange={(v) => set('firstName', v)} editMode={editMode} />
                <EditableField label="Last Name"  icon={User} value={form.lastName}  onChange={(v) => set('lastName', v)}  editMode={editMode} />
                <EditableField label="Email Address" icon={Mail}  type="email" value={form.email} onChange={(v) => set('email', v)} editMode={editMode} />
                <EditableField label="Phone Number"  icon={Phone} type="tel"   value={form.phone} onChange={(v) => set('phone', v)} editMode={editMode} />
                <Field label="Start Date" value={formatDate(chw?.startDate)} />
                <Field label="Response Time" value={chw?.responseTime} />
              </div>
            </div>
          </div>

          {/* ── Address ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={MapPin} title="Address" subtitle="Your residential address details" />
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <EditableField label="Street Address" icon={MapPin} value={form.street} onChange={(v) => set('street', v)} editMode={editMode} />
                </div>
                <EditableField label="City"        icon={MapPin} value={form.city}       onChange={(v) => set('city', v)}       editMode={editMode} />
                <EditableField label="County"      icon={MapPin} value={form.county}     onChange={(v) => set('county', v)}     editMode={editMode} />
                <EditableField label="Postal Code" icon={MapPin} value={form.postalCode} onChange={(v) => set('postalCode', v)} editMode={editMode} />
                <EditableField label="Country"     icon={MapPin} value={form.country}    onChange={(v) => set('country', v)}    editMode={editMode} />
              </div>
            </div>
          </div>

          {/* ── Work Information ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Briefcase} title="Work Information" subtitle="Your professional details and coverage area" />
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="CHW Code"           value={chw?.code} />
                <Field label="Assigned Facility"  value={chw?.hospital?.name} />
                <EditableField label="Specialization" icon={Activity}  value={form.specialization} onChange={(v) => set('specialization', v)} editMode={editMode} />
                <EditableField label="Region / Coverage Area" icon={MapPinned} value={form.region} onChange={(v) => set('region', v)} editMode={editMode} />
                <Field label="Assigned Patients"  value={chw?.assignedPatients} />
                <Field label="Status"             value={statusLabel} />
              </div>
            </div>
          </div>

          {/* ── Performance Overview ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Activity} title="Performance Overview" subtitle="Your field performance and patient statistics" />
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {performanceStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1" />
                      <p className="text-lg sm:text-xl font-bold text-blue-600">{stat.value ?? '—'}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-tight">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
              <InfoNote title="Track Your Progress" message="View detailed performance reports in the Reports & Analytics section." />
            </div>
          </div>

          {/* ── Security Settings ── */}
          {/* <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Shield} title="Security Settings" subtitle="Password, 2FA and active sessions" />
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Password &amp; Authentication</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Current Password</label>
                    <input type={showPassword ? 'text' : 'password'} placeholder="Current password"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-9" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 bottom-2.5 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">New Password</label>
                    <input type="password" placeholder="New password" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Confirm Password</label>
                    <input type="password" placeholder="Confirm password" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <button className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update Password
                </button>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800">Authenticator App</p>
                    <p className="text-xs text-gray-500">Add an extra layer of security with 2FA</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-500 hidden sm:inline">{twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                    <button onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                      <span className={`inline-block w-3.5 h-3.5 mt-0.5 ml-0.5 transform bg-white rounded-full transition-transform ${twoFactorEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
                {twoFactorEnabled && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" /> Two-factor authentication is active
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Active Sessions</h3>
                <div className="space-y-2">
                  {loginSessions.map((session, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 min-w-0">
                        <Monitor className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{session.device}</p>
                          <p className="text-xs text-gray-500 truncate">{session.location} &bull; {session.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`w-2 h-2 rounded-full ${session.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`} />
                        {session.status === 'active' && i !== 0 && (
                          <button className="text-xs text-red-600 hover:text-red-800">Revoke</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}

          {/* ── Preferences ── */}
          {/* <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Settings} title="Preferences" subtitle="Notification settings and regional preferences" />
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Notifications</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(notifications).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg gap-2">
                      <p className="text-xs sm:text-sm capitalize text-gray-700 truncate">{key}</p>
                      <input type="checkbox" checked={val}
                        onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Language &amp; Region</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Language</label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                      <option>English</option><option>Swahili</option><option>French</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Timezone</label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                      <option>EAT (UTC+3)</option><option>GMT (UTC+0)</option><option>EST (UTC-5)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* ── Activity & History ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Activity} title="Activity & History" subtitle="Recent actions and login records" />
            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Activity</h3>
                  <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800">
                    <Download className="w-3.5 h-3.5" /> Export
                  </button>
                </div>
                <div className="space-y-1.5">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex items-start gap-2.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="w-2 h-2 rounded-full flex-shrink-0 bg-blue-400 mt-1.5" />
                      <p className="flex-1 text-xs sm:text-sm text-gray-800 leading-snug">{a.action}</p>
                      <p className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">{a.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Login History</h3>
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {['Date', 'Device', 'Location', 'Status'].map((h) => (
                          <th key={h} className="text-left py-2 text-xs font-medium text-gray-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loginSessions.map((s, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="py-2 text-xs text-gray-700 whitespace-nowrap">{s.time}</td>
                          <td className="py-2 text-xs text-gray-700">{s.device}</td>
                          <td className="py-2 text-xs text-gray-700">{s.location}</td>
                          <td className="py-2">
                            <span className={`text-xs font-medium ${s.status === 'active' ? 'text-green-700' : 'text-gray-600'}`}>{s.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="sm:hidden space-y-2">
                  {loginSessions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{s.device}</p>
                        <p className="text-xs text-gray-500 truncate">{s.location} &bull; {s.time}</p>
                      </div>
                      <span className={`text-xs font-medium flex-shrink-0 ${s.status === 'active' ? 'text-green-700' : 'text-gray-500'}`}>
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CHWProfile;