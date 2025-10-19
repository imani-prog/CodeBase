import { User, Bell, Lock, CreditCard, Globe, Moon, Shield } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account preferences and privacy settings
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
              <p className="text-sm text-gray-600">Manage your personal information</p>
            </div>
          </div>
          <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
            Edit Profile Information →
          </button>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-600">Configure notification preferences</p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-gray-700">Email Notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-gray-700">SMS Notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-gray-700">Appointment Reminders</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Security & Privacy</h2>
              <p className="text-sm text-gray-600">Password and security settings</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
              Change Password →
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
              Two-Factor Authentication →
            </button>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
              <p className="text-sm text-gray-600">Manage payment options</p>
            </div>
          </div>
          <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
            Manage Payment Methods →
          </button>
        </div>

        {/* Language & Region */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Language & Region</h2>
              <p className="text-sm text-gray-600">Language and timezone settings</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="en">English</option>
                <option value="sw">Swahili</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="eat">East Africa Time (EAT)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Moon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
              <p className="text-sm text-gray-600">Customize your display preferences</p>
            </div>
          </div>
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
            <span className="text-gray-700">Dark Mode</span>
            <input type="checkbox" className="w-5 h-5 text-blue-600" />
          </label>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Legal & Privacy</h2>
              <p className="text-sm text-gray-600">Terms and privacy information</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
              Privacy Policy →
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
              Terms of Service →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
