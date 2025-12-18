import { User, Bell, Lock, CreditCard, Globe, Moon, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <p className="mt-2">
          Manage your account preferences and privacy settings
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Account Settings</h2>
              <p className="text-xs">Manage your personal information</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/client/patient/profile')}
            className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
          >
            Edit Profile Information →
          </button>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Notifications</h2>
              <p className="text-xs">Configure notification preferences</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-sm text-gray-700">Email Notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
            </label>
            <label className="flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-sm text-gray-700">SMS Notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
            </label>
            <label className="flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-sm text-gray-700">Appointment Reminders</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Security & Privacy</h2>
              <p className="text-xs">Password and security settings</p>
            </div>
          </div>
          <div className="space-y-2">
            <button 
              onClick={() => navigate('')}
              className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
            >
              Change Password →
            </button>
            <button 
              onClick={() => navigate('')}
              className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
            >
              Two-Factor Authentication →
            </button>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Payment Methods</h2>
              <p className="text-xs">Manage payment options</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/client/patient/insurance')}
            className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
          >
            Manage Payment Methods →
          </button>
        </div>

        {/* Language & Region */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Language & Region</h2>
              <p className="text-xs">Language and timezone settings</p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Language</label>
              <select className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500">
                <option value="en">English</option>
                <option value="sw">Swahili</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Timezone</label>
              <select className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500">
                <option value="eat">East Africa Time (EAT)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <Moon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Appearance</h2>
              <p className="text-xs">Customize your display preferences</p>
            </div>
          </div>
          <label className="flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer">
            <span className="text-sm text-gray-700">Dark Mode</span>
            <input type="checkbox" className="w-4 h-4 text-blue-600" />
          </label>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Legal & Privacy</h2>
              <p className="text-xs">Terms and privacy information</p>
            </div>
          </div>
          <div className="space-y-2">
            <button 
              onClick={() => navigate('/privacy')}
              className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
            >
              Privacy Policy →
            </button>
            <button 
              onClick={() => navigate('/terms')}
              className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
            >
              Terms of Service →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
