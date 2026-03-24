import { useEffect, useState } from 'react';
import {
  User, Mail, Phone, MapPin, Briefcase, Award, Users,
  Activity, Shield, Settings, Save, Edit3,
  X, Camera, Check, Download, LogOut, Eye, EyeOff,
  Monitor, MapPinned
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth.jsx';

/* ── Section header ── */
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-200 bg-white">
    {Icon && <Icon className="w-4 h-4 text-blue-600 flex-shrink-0" />}
    <div className="min-w-0">
      <h2 className="text-sm font-semibold text-gray-800 leading-tight">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5 leading-tight">{subtitle}</p>}
    </div>
  </div>
);

/* ── Read-only field ── */
const Field = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
    <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 break-words">{value}</p>
  </div>
);

/* ── Editable field ── */
const EditableField = ({ label, icon: Icon, value, onChange, type = 'text', editMode }) => (
  <div>
    <label className="flex items-center text-xs font-medium text-gray-500 mb-1">
      {Icon && <Icon className="w-3.5 h-3.5 mr-1 text-blue-600 flex-shrink-0" />}
      {label}
    </label>
    {editMode ? (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
      />
    ) : (
      <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 break-words">{value}</p>
    )}
  </div>
);

/* ── Info note ── */
const InfoNote = ({ title, message }) => (
  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
    <div>
      <p className="text-xs font-semibold text-blue-800">{title}</p>
      <p className="text-xs text-blue-700 mt-0.5">{message}</p>
    </div>
  </div>
);

const defaultProfile = {
  firstName: 'Jane', lastName: 'Wanjiru',
  email: 'jane.wanjiru@medilink.co.ke', phone: '+254 712 345 678',
  dateOfBirth: '1988-03-20', gender: 'Female',
  street: '45 Kenyatta Avenue', city: 'Nairobi',
  county: 'Nairobi County', postalCode: '00100', country: 'Kenya',
  userId: 'CHW-2023-001856', chwLevel: 'Level 2 CHW',
  specialization: 'Maternal & Child Health', yearsOfExperience: '5 years',
  coverageArea: 'Kibera Sub-County', assignedFacility: 'Kibera Health Centre',
  certifications: 'Basic Life Support (BLS), First Aid, Maternal Health',
  trainingCompleted: '15 courses', lastTraining: '2024-11-15',
  supervisorName: 'Dr. Peter Kamau', supervisorPhone: '+254 722 123 456',
  supervisorEmail: 'p.kamau@health.go.ke',
  totalPatients: '142', homeVisitsCompleted: '87', activePatients: '65',
  memberSince: 'January 15, 2023', status: 'Active',
};

const mapUserToProfile = (user = {}) => {
  const baseName = user.name || user.username || '';
  const [firstName = defaultProfile.firstName, ...rest] = baseName.split(' ').filter(Boolean);
  return {
    ...defaultProfile, firstName,
    lastName: rest.join(' ') || defaultProfile.lastName,
    email: user.email || defaultProfile.email,
    phone: user.phone || defaultProfile.phone,
    userId: user.employeeId || user.userId || defaultProfile.userId,
    chwLevel: user.chwLevel || defaultProfile.chwLevel,
    specialization: user.specialization || defaultProfile.specialization,
  };
};

const CHWProfile = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(() => mapUserToProfile(user));
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true, alerts: true });

  useEffect(() => { setProfile(mapUserToProfile(user)); }, [user]);

  const set = (key, val) => setProfile((p) => ({ ...p, [key]: val }));

  const handleSave = () => {
    const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ').trim();
    setUser((prev) => ({
      ...prev, name: fullName || prev?.name,
      email: profile.email, phone: profile.phone,
      userId: profile.userId, employeeId: profile.userId,
      chwLevel: profile.chwLevel, specialization: profile.specialization,
      initials: [profile.firstName, profile.lastName].filter(Boolean).map((w) => w[0].toUpperCase()).join('') || prev?.initials,
    }));
    setEditMode(false);
  };

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

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const initials = [profile.firstName, profile.lastName].filter(Boolean).map((w) => w[0].toUpperCase()).join('');

  const performanceStats = [
    { label: 'Total Patients', value: profile.totalPatients, icon: Users },
    { label: 'Home Visits', value: profile.homeVisitsCompleted, icon: MapPinned },
    { label: 'Active Patients', value: profile.activePatients, icon: Activity },
    { label: 'Trainings', value: profile.trainingCompleted, icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full -mx-4 sm:-mx-6 px-0 py-4 sm:py-6">

        {/* ── Page Header ── */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">My Profile</h1>
            
          </div>
          {/* Buttons — compact on mobile */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  <X className="w-3.5 h-3.5" /><span className="hidden sm:inline">Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save className="w-3.5 h-3.5" /><span>Save</span>
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
                  <p className="text-xs text-blue-600 leading-tight mt-0.5 truncate">{profile.chwLevel}</p>
                  <p className="text-xs text-gray-500 leading-tight truncate">{profile.specialization}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block flex-shrink-0" />
                    <span className="text-xs text-gray-400">{profile.status}</span>
                  </div>
                </div>
                
                <div className="text-right text-xs text-gray-500 flex-shrink-0 hidden sm:block">
                  <p className="font-mono font-medium text-gray-700">{profile.userId}</p>
                  <p className="mt-0.5">Joined {profile.memberSince}</p>
                </div>
              </div>

              {/* ID pill — mobile only */}
              <div className="sm:hidden flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg mb-3">
                <span className="text-xs text-gray-500">Employee ID</span>
                <span className="text-xs font-mono font-medium text-gray-700">{profile.userId}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EditableField label="First Name" icon={User} value={profile.firstName} onChange={(v) => set('firstName', v)} editMode={editMode} />
                <EditableField label="Last Name" icon={User} value={profile.lastName} onChange={(v) => set('lastName', v)} editMode={editMode} />
                <EditableField label="Email Address" icon={Mail} type="email" value={profile.email} onChange={(v) => set('email', v)} editMode={editMode} />
                <EditableField label="Phone Number" icon={Phone} type="tel" value={profile.phone} onChange={(v) => set('phone', v)} editMode={editMode} />
                <Field label="Date of Birth" value={profile.dateOfBirth} />
                <Field label="Gender" value={profile.gender} />
              </div>
            </div>
          </div>

          {/* ── Address ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={MapPin} title="Address" subtitle="Your residential address details" />
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <EditableField label="Street Address" icon={MapPin} value={profile.street} onChange={(v) => set('street', v)} editMode={editMode} />
                </div>
                <Field label="City" value={profile.city} />
                <Field label="County" value={profile.county} />
                <Field label="Postal Code" value={profile.postalCode} />
                <Field label="Country" value={profile.country} />
              </div>
            </div>
          </div>

          {/* ── Work Information ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Briefcase} title="Work Information" subtitle="Your professional details and coverage area" />
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="CHW ID" value={profile.userId} />
                <Field label="CHW Level" value={profile.chwLevel} />
                <EditableField label="Specialization" icon={Activity} value={profile.specialization} onChange={(v) => set('specialization', v)} editMode={editMode} />
                <Field label="Years of Experience" value={profile.yearsOfExperience} />
                <EditableField label="Coverage Area" icon={MapPinned} value={profile.coverageArea} onChange={(v) => set('coverageArea', v)} editMode={editMode} />
                <Field label="Assigned Facility" value={profile.assignedFacility} />
              </div>
            </div>
          </div>

          {/* ── Certifications & Training ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Award} title="Certifications & Training" subtitle="Your certifications and training history" />
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <Field label="Certifications Held" value={profile.certifications} />
                </div>
                <Field label="Training Courses Completed" value={profile.trainingCompleted} />
                <Field label="Last Training Date" value={profile.lastTraining} />
              </div>
              <InfoNote title="Continue Learning" message="Keep your certifications up to date. Visit Resources & Training to access new courses." />
            </div>
          </div>

          {/* ── Supervisor Contact ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Users} title="Supervisor Contact" subtitle="Your supervisor and emergency contact details" />
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EditableField label="Supervisor Name" icon={User} value={profile.supervisorName} onChange={(v) => set('supervisorName', v)} editMode={editMode} />
                <EditableField label="Supervisor Phone" icon={Phone} type="tel" value={profile.supervisorPhone} onChange={(v) => set('supervisorPhone', v)} editMode={editMode} />
                <div className="sm:col-span-2">
                  <EditableField label="Supervisor Email" icon={Mail} type="email" value={profile.supervisorEmail} onChange={(v) => set('supervisorEmail', v)} editMode={editMode} />
                </div>
              </div>
              <InfoNote title="Support Available" message="Contact your supervisor for work-related concerns or support during field visits." />
            </div>
          </div>

          {/* ── Security Settings ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
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
          </div>

          {/* ── Preferences ── */}
          <div className="border border-gray-200 overflow-hidden bg-white">
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
                      <p className="text-lg sm:text-xl font-bold text-blue-600">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-tight">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
              <InfoNote title="Track Your Progress" message="View detailed performance reports in the Reports & Analytics section." />
            </div>
          </div>

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
                {/* Table on sm+, cards on mobile */}
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