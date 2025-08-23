import { useState } from "react";
import { 
  User, Mail, Phone, Shield, Settings, Activity, Bell, Key, 
  Monitor, Camera, Check, X, Edit3, Save, Calendar, MapPin, 
  Globe, Moon, Sun, Download, LogOut, AlertTriangle, 
  Smartphone, Clock, Wifi, Eye, EyeOff, Plus, Trash2 
} from "lucide-react";

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@medilink.com",
    phone: "+254 700 123456",
    role: "Chief Administrator",
    department: "Healthcare Operations",
    employeeId: "HCA-2024-001",
    joinDate: "January 15, 2023",
    location: "Nairobi, Kenya",
    timezone: "EAT (UTC+3)",
    language: "English",
    status: "Active"
  });
  
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    security: true
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const recentActivity = [
    { action: "Updated patient record #12345", time: "2 hours ago", type: "update" },
    { action: "Approved staff access request", time: "4 hours ago", type: "approval" },
    { action: "Generated monthly report", time: "1 day ago", type: "report" },
    { action: "Modified system settings", time: "2 days ago", type: "settings" },
    { action: "Added new user account", time: "3 days ago", type: "create" }
  ];

  const loginSessions = [
    { device: "Windows PC", location: "Nairobi, Kenya", time: "Current session", status: "active" },
    { device: "iPhone 14", location: "Nairobi, Kenya", time: "2 hours ago", status: "active" },
    { device: "MacBook Pro", location: "Mombasa, Kenya", time: "1 day ago", status: "inactive" }
  ];

  const permissions = [
    { module: "Patient Management", access: "Full Access", active: true },
    { module: "Staff Management", access: "Full Access", active: true },
    { module: "Financial Reports", access: "Read Only", active: true },
    { module: "System Settings", access: "Full Access", active: true },
    { module: "Audit Logs", access: "Full Access", active: true }
  ];

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "permissions", label: "Permissions", icon: Key }
  ];

  const handleSave = () => {
    setEditMode(false);
    // Add save logic here
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src="https://ui-avatars.com/api/?name=Sarah+Mitchell&background=3B82F6&color=fff&size=120"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-lg text-blue-600 font-medium">{profile.role}</p>
              <p className="text-gray-600">{profile.department}</p>
              <div className="flex items-center mt-2">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">{profile.status}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="font-mono text-sm font-medium">{profile.employeeId}</p>
            <p className="text-sm text-gray-500 mt-2">Joined</p>
            <p className="text-sm font-medium">{profile.joinDate}</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2 text-blue-600" />
              Full Name
            </label>
            {editMode ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2 text-blue-600" />
              Email Address
            </label>
            {editMode ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.email}</p>
            )}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 mr-2 text-blue-600" />
              Phone Number
            </label>
            {editMode ? (
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.phone}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              Location
            </label>
            <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.location}</p>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 mr-2 text-blue-600" />
              Timezone
            </label>
            <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.timezone}</p>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 mr-2 text-blue-600" />
              Language
            </label>
            <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.language}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Password & Authentication</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">{twoFactorEnabled ? "Enabled" : "Disabled"}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">Add an extra layer of security to your account with 2FA.</p>
        {twoFactorEnabled && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800">Two-factor authentication is active</span>
            </div>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
        <div className="space-y-3">
          {loginSessions.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Monitor className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-medium">{session.device}</p>
                  <p className="text-sm text-gray-600">{session.location} • {session.time}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${session.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                {session.status === 'active' && index !== 0 && (
                  <button className="text-red-600 hover:text-red-800 text-sm">Revoke</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-sm text-gray-600">Toggle between light and dark themes</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
              darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
              darkMode ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-medium capitalize">{key} Notifications</p>
                  <p className="text-sm text-gray-600">Receive notifications via {key}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                className="h-4 w-4 text-blue-600"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Language & Region */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>English</option>
              <option>Swahili</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>EAT (UTC+3)</option>
              <option>GMT (UTC+0)</option>
              <option>EST (UTC-5)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      {/* Recent Activity */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <button className="flex items-center text-blue-600 hover:text-blue-800">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mr-3 ${
                activity.type === 'update' ? 'bg-blue-400' :
                activity.type === 'approval' ? 'bg-green-400' :
                activity.type === 'report' ? 'bg-purple-400' :
                activity.type === 'settings' ? 'bg-orange-400' : 'bg-gray-400'
              }`}></div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Login History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Device</th>
                <th className="text-left py-2">Location</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {loginSessions.map((session, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{session.time}</td>
                  <td className="py-2">{session.device}</td>
                  <td className="py-2">{session.location}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      session.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {session.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPermissions = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Access Control</h3>
        <div className="space-y-3">
          {permissions.map((permission, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Key className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-medium">{permission.module}</p>
                  <p className="text-sm text-gray-600">{permission.access}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${
                permission.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {permission.active ? 'Active' : 'Inactive'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">API Keys</h3>
          <button className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-1" />
            Generate Key
          </button>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600">No API keys generated yet.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>
            <div className="flex items-center space-x-3">
              {editMode && activeTab === "personal" ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </>
              ) : activeTab === "personal" ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              ) : null}
              <button className="flex items-center text-red-600 hover:text-red-800 px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "personal" && renderPersonalInfo()}
          {activeTab === "security" && renderSecurity()}
          {activeTab === "preferences" && renderPreferences()}
          {activeTab === "activity" && renderActivity()}
          {activeTab === "permissions" && renderPermissions()}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;