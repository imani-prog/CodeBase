import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";


import { useNavigate } from 'react-router-dom';

import { userApi } from '../../API/endpoints/userApi.js';
import {
  User, Mail, Phone, Shield, Settings, Activity, Bell, Key,
  Monitor, Camera, Check, X, Edit3, Save, MapPin,
  Globe, Download, LogOut, Plus, Eye, EyeOff
} from "lucide-react";


const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-200 bg-white rounded-t-xl">
    <div className="p-1.5 ">
      <Icon className="w-4 h-4 text-blue-600" />
    </div>
    <div>
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);


const Field = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
    <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800">{value}</p>
  </div>
);

const AdminProfile = () => {
  const { user, setUser } = useAuth();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
  name: '',
  email: '',
  phone: '',
  role: '',
  department: '',
  employeeId: '',
  joinDate: '',
  location: '',
  timezone: 'EAT (UTC+3)',
  language: 'English',
  status: 'ACTIVE',
});

useEffect(() => {
  const loadProfile = async () => {
    try {
      setLoadingProfile(true);
      
      
      const data = await userApi.me();

      setProfile({
        name: data.fullName || user?.name || '',
        email: data.email || user?.email || '',
        phone: data.phone || user?.phone || '',
        role: data.role || user?.title || '',
        department: user?.department || '',
        employeeId: `USR-${String(data.id).padStart(4, '0')}`,
        joinDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '',
        location: user?.location || '',
        timezone: user?.timezone || 'EAT (UTC+3)',
        language: user?.language || 'English',
        status: data.status || 'ACTIVE',
      });

      setUser(prev => ({
      ...prev,
      id: data.id,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      role: data.role?.toLowerCase(),
      status: data.status,
    }));
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoadingProfile(false);
    }
  };

  loadProfile();
}, []);


  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true, security: true });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const recentActivity = [
    { action: "Updated patient record #12345", time: "2 hours ago", type: "update" },
    { action: "Approved staff access request", time: "4 hours ago", type: "approval" },
    { action: "Generated monthly report", time: "1 day ago", type: "report" },
    { action: "Modified system settings", time: "2 days ago", type: "settings" },
    { action: "Added new user account", time: "3 days ago", type: "create" },
  ];

  const loginSessions = [
    { device: "Windows PC", location: "Nairobi, Kenya", time: "Current session", status: "active" },
    { device: "iPhone 14", location: "Nairobi, Kenya", time: "2 hours ago", status: "active" },
    { device: "MacBook Pro", location: "Mombasa, Kenya", time: "1 day ago", status: "inactive" },
  ];

  const permissions = [
    { module: "Patient Management", access: "Full Access", active: true },
    { module: "Staff Management", access: "Full Access", active: true },
    { module: "Financial Reports", access: "Read Only", active: true },
    { module: "System Settings", access: "Full Access", active: true },
    { module: "Audit Logs", access: "Full Access", active: true },
  ];

  const activityDot = {
    update: "bg-blue-400", approval: "bg-blue-400",
    report: "bg-blue-400", settings: "bg-blue-400", create: "bg-blue-400",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 py-6">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
           
          </div>
          <div className="flex items-center gap-2">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="flex items-center px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  <X className="w-4 h-4 mr-1.5" /> Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      await userApi.update(user.id, {
                        fullName: profile.name,
                        email: profile.email,
                        phone: profile.phone,
                      });
                      setUser((prev) => ({
                        ...prev,
                        name: profile.name,
                        email: profile.email,
                        phone: profile.phone,
                      }));
                      setEditMode(false);
                    } catch (err) {
                      alert('Failed to save profile: ' + err.message);
                    }
                  }}

                  className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-1.5" /> Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit3 className="w-4 h-4 mr-1.5" /> Edit Profile
              </button>
            )}

            <button className="flex items-center px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
              <LogOut 
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
              className="w-4 h-4 mr-1.5" /> Logout
            </button>


          </div>
        </div>

        <div className="space-y-5">

          {/* ── Personal Information ── */}
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={User} title="Personal Information" subtitle="Your account details and contact information" />
            <div className="p-5">
              {/* Avatar row */}
              <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm select-none">
                    {profile.name.split(' ').filter(Boolean).map((w) => w[0].toUpperCase()).slice(0, 2).join('')}
                  </div>
                  <button className="absolute -bottom-0.5 -right-0.5 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{profile.name}</p>
                  <p className="text-xs text-blue-600">{profile.role}</p>
                  <p className="text-xs text-gray-500">{profile.department}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                    <span className="text-xs text-gray-400">{profile.status}</span>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 flex-shrink-0">
                  <p className="font-medium text-gray-700 font-mono">{profile.employeeId}</p>
                  <p className="mt-0.5">Joined {profile.joinDate}</p>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center text-xs font-medium text-gray-500 mb-1">
                    <User className="w-3.5 h-3.5 mr-1 text-blue-600" /> Full Name
                  </label>
                  {editMode ? (
                    <input type="text" value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500" />
                  ) : (
                    <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800">{profile.name}</p>
                  )}
                </div>

                <Field label="Location" value={profile.location} />

                <div>
                  <label className="flex items-center text-xs font-medium text-gray-500 mb-1">
                    <Mail className="w-3.5 h-3.5 mr-1 text-blue-600" /> Email Address
                  </label>
                  {editMode ? (
                    <input type="email" value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                  ) : (
                    <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800">{profile.email}</p>
                  )}
                </div>

                <Field label="Timezone" value={profile.timezone} />

                <div>
                  <label className="flex items-center text-xs font-medium text-gray-500 mb-1">
                    <Phone className="w-3.5 h-3.5 mr-1 text-blue-600" /> Phone Number
                  </label>
                  {editMode ? (
                    <input type="tel" value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                  ) : (
                    <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800">{profile.phone}</p>
                  )}
                </div>

                <Field label="Language" value={profile.language} />
              </div>
            </div>
          </div>

          {/* ── Security Settings ── */}
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={Shield} title="Security Settings" subtitle="Password, 2FA and active sessions" />
            <div className="p-5 space-y-5">

              {/* Password */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Password &amp; Authentication</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Current Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Current password"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-9"
                    />
                    <button onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 bottom-2.5 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">New Password</label>
                    <input type="password" placeholder="New password"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Confirm Password</label>
                    <input type="password" placeholder="Confirm password"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>
                <button className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update Password
                </button>
              </div>

              {/* 2FA */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Authenticator App</p>
                    <p className="text-xs text-gray-500">Add an extra layer of security with 2FA</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{twoFactorEnabled ? "Enabled" : "Disabled"}</span>
                    <button onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${twoFactorEnabled ? "bg-blue-600" : "bg-gray-300"}`}>
                      <span className={`inline-block w-3.5 h-3.5 mt-0.5 ml-0.5 transform bg-white rounded-full transition-transform ${twoFactorEnabled ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>
                </div>
                {twoFactorEnabled && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" /> Two-factor authentication is active
                  </div>
                )}
              </div>

              {/* Active Sessions */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Active Sessions</h3>
                <div className="space-y-2">
                  {loginSessions.map((session, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Monitor className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{session.device}</p>
                          <p className="text-xs text-gray-500">{session.location} &bull; {session.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${session.status === "active" ? "bg-green-400" : "bg-gray-400"}`} />
                        {session.status === "active" && i !== 0 && (
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
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={Settings} title="Preferences" subtitle="Appearance, notifications and regional settings" />
            <div className="p-5 space-y-5">

              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Dark Mode</p>
                  <p className="text-xs text-gray-500">Toggle between light and dark themes</p>
                </div>
                <button onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${darkMode ? "bg-blue-600" : "bg-gray-300"}`}>
                  <span className={`inline-block w-3.5 h-3.5 mt-0.5 ml-0.5 transform bg-white rounded-full transition-transform ${darkMode ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </div>

              {/* Notifications */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Notifications</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(notifications).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm capitalize text-gray-700">{key}</p>
                      <input type="checkbox" checked={val}
                        onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Language & Region */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Language &amp; Region</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Language</label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                      <option>English</option><option>Swahili</option><option>French</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Timezone</label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option>EAT (UTC+3)</option><option>GMT (UTC+0)</option><option>EST (UTC-5)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Activity & History ── */}
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={Activity} title="Activity &amp; History" subtitle="Recent actions and login records" />
            <div className="p-5 space-y-5">

              {/* Recent Activity */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Activity</h3>
                  <button className="flex items-center text-xs text-blue-600 hover:text-blue-800">
                    <Download className="w-3.5 h-3.5 mr-1" /> Export
                  </button>
                </div>
                <div className="space-y-1.5">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${activityDot[a.type]}`} />
                      <p className="flex-1 text-sm text-gray-800">{a.action}</p>
                      <p className="text-xs text-gray-400 flex-shrink-0">{a.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Login History */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Login History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {["Date", "Device", "Location", "Status"].map((h) => (
                          <th key={h} className="text-left py-2 text-xs font-medium text-gray-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loginSessions.map((s, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="py-2 text-gray-700">{s.time}</td>
                          <td className="py-2 text-gray-700">{s.device}</td>
                          <td className="py-2 text-gray-700">{s.location}</td>
                          <td className="py-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === "active" ? " text-green-700" : " text-gray-600"}`}>
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* ── Permissions & Access ── */}
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={Key} title="Permissions &amp; Access" subtitle="Module access levels and API keys" />
            <div className="p-5 space-y-5">

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Access Control</h3>
                <div className="space-y-1.5">
                  {permissions.map((p, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{p.module}</p>
                          <p className="text-xs text-gray-500">{p.access}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.active ? " text-green-700" : " text-red-700"}`}>
                        {p.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">API Keys</h3>
                  <button className="flex items-center px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Generate Key
                  </button>
                </div>
                <div className="px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-500">No API keys generated yet.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
