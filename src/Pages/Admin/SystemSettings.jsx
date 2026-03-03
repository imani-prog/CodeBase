import React, { useState } from 'react';
import { 
  Settings, 
  Database, 
  Shield, 
  Bell, 
  Mail, 
  Users, 
  Globe, 
  Server, 
  Key, 
  Lock, 
  Eye, 
  EyeOff,
  Save, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Clock,
  Wifi,
  HardDrive,
  Cpu,
  Network,
  FileText,
  Smartphone,
  Monitor,
  Zap,
  Upload,
  Download
} from 'lucide-react';

const SectionHeader = ({ icon: Icon, title, subtitle, color = 'blue' }) => {
  const colorMap = {
    blue: '',
   
  };
  return (
    <div className={`flex items-center gap-3 px-5 py-4 border-b border-gray-200 ${colorMap[color]}`}>
      <div className={`p-2 rounded-lg `}>
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        {subtitle && <p className=" mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
};

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'MediLink Healthcare Management System',
    systemVersion: '2.1.4',
    timezone: 'Africa/Nairobi',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24',
    language: 'en',
    currency: 'KES',
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    
    // Security Settings
    passwordMinLength: '8',
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    twoFactorAuth: true,
    autoLogout: true,
    ipWhitelist: '',
    sslEnabled: true,
    encryptionLevel: 'AES-256',
    auditLogging: true,
    
    // Database Settings
    dbHost: 'localhost',
    dbPort: '5432',
    dbName: 'medilink_prod',
    dbUsername: 'medilink_admin',
    dbPassword: '••••••••••••',
    dbMaxConnections: '100',
    dbConnectionPooling: true,
    dbBackupSchedule: 'daily',
    dbBackupRetention: '30',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    emergencyAlerts: true,
    systemAlerts: true,
    maintenanceNotices: true,
    smtpHost: 'smtp.medilink.com',
    smtpPort: '587',
    smtpUsername: 'notifications@medilink.com',
    smtpPassword: '••••••••••••',
    smsProvider: 'Safaricom',
    smsApiKey: '••••••••••••',
    
    // Integration Settings
    telemedicineEnabled: true,
    ambulanceTracking: true,
    paymentGateway: 'M-Pesa',
    insuranceIntegration: true,
    laboratorySystem: true,
    pharmacySystem: true,
    nhifIntegration: true,
    shaIntegration: true,
    apiRateLimit: '1000',
    webhookTimeout: '30',
    
    // System Performance
    cacheEnabled: true,
    cacheTimeout: '3600',
    logLevel: 'INFO',
    maxLogSize: '100',
    compressionEnabled: true,
    cdnEnabled: true,
    monitoringEnabled: true,
    performanceTracking: true,

    // Backup & Recovery
    backupStorageLocation: 's3://medilink-backups',
    backupCompressionEnabled: true,
    backupEncryptionEnabled: true,
    backupNotifyOnComplete: true,
    backupNotifyOnFailure: true,
    autoRestoreEnabled: false,
    restorePointRetention: '7',

    // Monitoring
    alertCpuThreshold: '85',
    alertMemoryThreshold: '90',
    alertDiskThreshold: '80',
    alertEmailNotify: true,
    alertSmsNotify: false,
    uptimeMonitoring: true,
    errorRateThreshold: '5',
    responseTimeThreshold: '2000',
  });

  const [showPasswords, setShowPasswords] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings...', settings);
    setHasChanges(false);
    // Show success message
  };

  const handleResetSettings = () => {
    console.log('Resetting settings...');
    setHasChanges(false);
    // Reset to default values
  };

  const handleTestConnection = (type) => {
    console.log(`Testing ${type} connection...`);
    // Implement connection testing
  };

  // ── renderGeneralSettings (inline below) ──
  const _renderGeneralSettings = () => (
    <div className="mb-8">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
            <input
              type="text"
              value={settings.systemName}
              onChange={(e) => handleSettingChange('systemName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">System Version</label>
            <input
              type="text"
              value={settings.systemVersion}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange('currency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const _renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Policy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
            <input
              type="number"
              value={settings.passwordMinLength}
              onChange={(e) => handleSettingChange('passwordMinLength', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
            <input
              type="number"
              value={settings.maxLoginAttempts}
              onChange={(e) => handleSettingChange('maxLoginAttempts', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.passwordRequireUppercase}
              onChange={(e) => handleSettingChange('passwordRequireUppercase', e.target.checked)}
              className="w-4 h-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">Require uppercase letters</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.passwordRequireNumbers}
              onChange={(e) => handleSettingChange('passwordRequireNumbers', e.target.checked)}
              className="w-4 h-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">Require numbers</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.passwordRequireSymbols}
              onChange={(e) => handleSettingChange('passwordRequireSymbols', e.target.checked)}
              className="w-4 h-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">Require special symbols</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
              className="w-4 h-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">Enable Two-Factor Authentication</label>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Encryption Level</label>
            <select
              value={settings.encryptionLevel}
              onChange={(e) => handleSettingChange('encryptionLevel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="AES-256">AES-256 (Recommended)</option>
              <option value="AES-192">AES-192</option>
              <option value="AES-128">AES-128</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist</label>
            <textarea
              value={settings.ipWhitelist}
              onChange={(e) => handleSettingChange('ipWhitelist', e.target.value)}
              placeholder="Enter IP addresses separated by commas"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.sslEnabled}
              onChange={(e) => handleSettingChange('sslEnabled', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">Enable SSL/TLS</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.auditLogging}
              onChange={(e) => handleSettingChange('auditLogging', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">Enable Audit Logging</label>
          </div>
        </div>
      </div>
    </div>
  );

  const _renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Database Configuration</h3>
          <button
            onClick={() => handleTestConnection('database')}
            className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors "
          >
            <Zap className="w-4 h-4 mr-2" />
            Test Connection
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Database Host</label>
            <input
              type="text"
              value={settings.dbHost}
              onChange={(e) => handleSettingChange('dbHost', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Database Port</label>
            <input
              type="text"
              value={settings.dbPort}
              onChange={(e) => handleSettingChange('dbPort', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Database Name</label>
            <input
              type="text"
              value={settings.dbName}
              onChange={(e) => handleSettingChange('dbName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Database Username</label>
            <input
              type="text"
              value={settings.dbUsername}
              onChange={(e) => handleSettingChange('dbUsername', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Database Password</label>
            <div className="relative">
              <input
                type={showPasswords.dbPassword ? 'text' : 'password'}
                value={settings.dbPassword}
                onChange={(e) => handleSettingChange('dbPassword', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('dbPassword')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.dbPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Connections</label>
            <input
              type="number"
              value={settings.dbMaxConnections}
              onChange={(e) => handleSettingChange('dbMaxConnections', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.dbConnectionPooling}
              onChange={(e) => handleSettingChange('dbConnectionPooling', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">Enable Connection Pooling</label>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Schedule</label>
            <select
              value={settings.dbBackupSchedule}
              onChange={(e) => handleSettingChange('dbBackupSchedule', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Retention (days)</label>
            <input
              type="number"
              value={settings.dbBackupRetention}
              onChange={(e) => handleSettingChange('dbBackupRetention', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const _renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">Email Notifications</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded ffocus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">SMS Notifications</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.emergencyAlerts}
              onChange={(e) => handleSettingChange('emergencyAlerts', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">Emergency Alerts</label>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Email Configuration</h3>
          <button
            onClick={() => handleTestConnection('email')}
            className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            Test Email
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
            <input
              type="text"
              value={settings.smtpHost}
              onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
            <input
              type="text"
              value={settings.smtpPort}
              onChange={(e) => handleSettingChange('smtpPort', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
            <input
              type="text"
              value={settings.smtpUsername}
              onChange={(e) => handleSettingChange('smtpUsername', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
            <div className="relative">
              <input
                type={showPasswords.smtpPassword ? 'text' : 'password'}
                value={settings.smtpPassword}
                onChange={(e) => handleSettingChange('smtpPassword', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('smtpPassword')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.smtpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SMS Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMS Provider</label>
            <select
              value={settings.smsProvider}
              onChange={(e) => handleSettingChange('smsProvider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Safaricom">Safaricom</option>
              <option value="Airtel">Airtel</option>
              <option value="Telkom">Telkom Kenya</option>
              <option value="Twilio">Twilio</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMS API Key</label>
            <div className="relative">
              <input
                type={showPasswords.smsApiKey ? 'text' : 'password'}
                value={settings.smsApiKey}
                onChange={(e) => handleSettingChange('smsApiKey', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('smsApiKey')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.smsApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const _renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Healthcare Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">NHIF Integration</label>
              <input
                type="checkbox"
                checked={settings.nhifIntegration}
                onChange={(e) => handleSettingChange('nhifIntegration', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">SHA Integration</label>
              <input
                type="checkbox"
                checked={settings.shaIntegration}
                onChange={(e) => handleSettingChange('shaIntegration', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Laboratory System</label>
              <input
                type="checkbox"
                checked={settings.laboratorySystem}
                onChange={(e) => handleSettingChange('laboratorySystem', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Pharmacy System</label>
              <input
                type="checkbox"
                checked={settings.pharmacySystem}
                onChange={(e) => handleSettingChange('pharmacySystem', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Telemedicine</label>
              <input
                type="checkbox"
                checked={settings.telemedicineEnabled}
                onChange={(e) => handleSettingChange('telemedicineEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Ambulance Tracking</label>
              <input
                type="checkbox"
                checked={settings.ambulanceTracking}
                onChange={(e) => handleSettingChange('ambulanceTracking', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Payment Gateway</label>
              <select
                value={settings.paymentGateway}
                onChange={(e) => handleSettingChange('paymentGateway', e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="M-Pesa">M-Pesa</option>
                <option value="Airtel Money">Airtel Money</option>
                <option value="PayPal">PayPal</option>
                <option value="Stripe">Stripe</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit (requests/hour)</label>
            <input
              type="number"
              value={settings.apiRateLimit}
              onChange={(e) => handleSettingChange('apiRateLimit', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Webhook Timeout (seconds)</label>
            <input
              type="number"
              value={settings.webhookTimeout}
              onChange={(e) => handleSettingChange('webhookTimeout', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const _renderPerformanceSettings = () => (
    <div className="space-y-6">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Caching & Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.cacheEnabled}
                onChange={(e) => handleSettingChange('cacheEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <label className="ml-2 text-sm text-gray-700">Enable Caching</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.compressionEnabled}
                onChange={(e) => handleSettingChange('compressionEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <label className="ml-2 text-sm text-gray-700">Enable Compression</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.cdnEnabled}
                onChange={(e) => handleSettingChange('cdnEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <label className="ml-2 text-sm text-gray-700">Enable CDN</label>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cache Timeout (seconds)</label>
              <input
                type="number"
                value={settings.cacheTimeout}
                onChange={(e) => handleSettingChange('cacheTimeout', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Log Level</label>
              <select
                value={settings.logLevel}
                onChange={(e) => handleSettingChange('logLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="DEBUG">DEBUG</option>
                <option value="INFO">INFO</option>
                <option value="WARN">WARN</option>
                <option value="ERROR">ERROR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Log Size (MB)</label>
              <input
                type="number"
                value={settings.maxLogSize}
                onChange={(e) => handleSettingChange('maxLogSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Monitoring</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.monitoringEnabled}
              onChange={(e) => handleSettingChange('monitoringEnabled', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">Enable System Monitoring</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.performanceTracking}
              onChange={(e) => handleSettingChange('performanceTracking', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label className="ml-2 text-sm text-gray-700">Enable Performance Tracking</label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 py-6">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">System Settings</h1>
          <p className="text-gray-500">Configure and manage all aspects of the MediLink healthcare system</p>
        </div>

        <div className="space-y-8">

          {/* ── General ── */}
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={Settings} title="General" subtitle="System information and regional preferences" color="blue-700" />
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">System Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
                  <input
                    type="text"
                    value={settings.systemName}
                    onChange={(e) => handleSettingChange('systemName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">System Version</label>
                  <input
                    type="text"
                    value={settings.systemVersion}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="KES">KES - Kenyan Shilling</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Security ── */}
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={Shield} title="Security" subtitle="Password policy and access control" color="blue" />
            <div className="p-6 space-y-8">
              {/* Password Policy */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Password Policy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
                    <input
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => handleSettingChange('passwordMinLength', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleSettingChange('maxLoginAttempts', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'passwordRequireUppercase', label: 'Require uppercase letters' },
                    { key: 'passwordRequireNumbers', label: 'Require numbers' },
                    { key: 'passwordRequireSymbols', label: 'Require special symbols' },
                    { key: 'twoFactorAuth', label: 'Enable Two-Factor Authentication' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={(e) => handleSettingChange(key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <label className="ml-2 text-sm text-gray-700">{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Security Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Encryption Level</label>
                    <select
                      value={settings.encryptionLevel}
                      onChange={(e) => handleSettingChange('encryptionLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="AES-256">AES-256 (Recommended)</option>
                      <option value="AES-192">AES-192</option>
                      <option value="AES-128">AES-128</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist</label>
                    <textarea
                      value={settings.ipWhitelist}
                      onChange={(e) => handleSettingChange('ipWhitelist', e.target.value)}
                      placeholder="Enter IP addresses separated by commas"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'sslEnabled', label: 'Enable SSL/TLS' },
                    { key: 'auditLogging', label: 'Enable Audit Logging' },
                    { key: 'autoLogout', label: 'Enable Auto Logout' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={(e) => handleSettingChange(key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <label className="ml-2 text-sm text-gray-700">{label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Database ── */}
          <div className=" border border-gray-200 overflow-hidden">
            <SectionHeader icon={Database} title="Database" subtitle="Connection, pooling and backup configuration" color="blue" />
            <div className="p-6 space-y-8">
              {/* Database Configuration */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Database Configuration</h3>
                  <button
                    onClick={() => handleTestConnection('database')}
                    className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Test Connection
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Database Host</label>
                    <input
                      type="text"
                      value={settings.dbHost}
                      onChange={(e) => handleSettingChange('dbHost', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Database Port</label>
                    <input
                      type="text"
                      value={settings.dbPort}
                      onChange={(e) => handleSettingChange('dbPort', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Database Name</label>
                    <input
                      type="text"
                      value={settings.dbName}
                      onChange={(e) => handleSettingChange('dbName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Database Username</label>
                    <input
                      type="text"
                      value={settings.dbUsername}
                      onChange={(e) => handleSettingChange('dbUsername', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Database Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.dbPassword ? 'text' : 'password'}
                        value={settings.dbPassword}
                        onChange={(e) => handleSettingChange('dbPassword', e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('dbPassword')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPasswords.dbPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Connections</label>
                    <input
                      type="number"
                      value={settings.dbMaxConnections}
                      onChange={(e) => handleSettingChange('dbMaxConnections', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.dbConnectionPooling}
                    onChange={(e) => handleSettingChange('dbConnectionPooling', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <label className="ml-2 text-sm text-gray-700">Enable Connection Pooling</label>
                </div>
              </div>

              {/* Backup Configuration */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Backup Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backup Schedule</label>
                    <select
                      value={settings.dbBackupSchedule}
                      onChange={(e) => handleSettingChange('dbBackupSchedule', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backup Retention (days)</label>
                    <input
                      type="number"
                      value={settings.dbBackupRetention}
                      onChange={(e) => handleSettingChange('dbBackupRetention', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Notifications ── */}
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={Bell} title="Notifications" subtitle="Channels, email and SMS configuration" color="blue" />
            <div className="p-6 space-y-8">
              {/* Notification Channels */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Notification Channels</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications' },
                    { key: 'smsNotifications', label: 'SMS Notifications' },
                    { key: 'emergencyAlerts', label: 'Emergency Alerts' },
                    { key: 'pushNotifications', label: 'Push Notifications' },
                    { key: 'systemAlerts', label: 'System Alerts' },
                    { key: 'maintenanceNotices', label: 'Maintenance Notices' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={(e) => handleSettingChange(key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <label className="ml-2 text-sm text-gray-700">{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Configuration */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Email Configuration</h3>
                  <button
                    onClick={() => handleTestConnection('email')}
                    className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Test Email
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                    <input
                      type="text"
                      value={settings.smtpHost}
                      onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                    <input
                      type="text"
                      value={settings.smtpPort}
                      onChange={(e) => handleSettingChange('smtpPort', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                    <input
                      type="text"
                      value={settings.smtpUsername}
                      onChange={(e) => handleSettingChange('smtpUsername', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.smtpPassword ? 'text' : 'password'}
                        value={settings.smtpPassword}
                        onChange={(e) => handleSettingChange('smtpPassword', e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('smtpPassword')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPasswords.smtpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SMS Configuration */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">SMS Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMS Provider</label>
                    <select
                      value={settings.smsProvider}
                      onChange={(e) => handleSettingChange('smsProvider', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Safaricom">Safaricom</option>
                      <option value="Airtel">Airtel</option>
                      <option value="Telkom">Telkom Kenya</option>
                      <option value="Twilio">Twilio</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMS API Key</label>
                    <div className="relative">
                      <input
                        type={showPasswords.smsApiKey ? 'text' : 'password'}
                        value={settings.smsApiKey}
                        onChange={(e) => handleSettingChange('smsApiKey', e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('smsApiKey')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPasswords.smsApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Integrations ── */}
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={Globe} title="Integrations" subtitle="Healthcare systems, payment gateway and API configuration" color="blue" />
            <div className="p-6 space-y-8">
              {/* Healthcare Integrations */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Healthcare Integrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      { key: 'nhifIntegration', label: 'NHIF Integration' },
                      { key: 'shaIntegration', label: 'SHA Integration' },
                      { key: 'laboratorySystem', label: 'Laboratory System' },
                      { key: 'pharmacySystem', label: 'Pharmacy System' },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between">
                        <label className="text-sm text-gray-700">{label}</label>
                        <input
                          type="checkbox"
                          checked={settings[key]}
                          onChange={(e) => handleSettingChange(key, e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">Telemedicine</label>
                      <input
                        type="checkbox"
                        checked={settings.telemedicineEnabled}
                        onChange={(e) => handleSettingChange('telemedicineEnabled', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">Ambulance Tracking</label>
                      <input
                        type="checkbox"
                        checked={settings.ambulanceTracking}
                        onChange={(e) => handleSettingChange('ambulanceTracking', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">Insurance Integration</label>
                      <input
                        type="checkbox"
                        checked={settings.insuranceIntegration}
                        onChange={(e) => handleSettingChange('insuranceIntegration', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">Payment Gateway</label>
                      <select
                        value={settings.paymentGateway}
                        onChange={(e) => handleSettingChange('paymentGateway', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="M-Pesa">M-Pesa</option>
                        <option value="Airtel Money">Airtel Money</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Stripe">Stripe</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Settings */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">API Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit (requests/hour)</label>
                    <input
                      type="number"
                      value={settings.apiRateLimit}
                      onChange={(e) => handleSettingChange('apiRateLimit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Webhook Timeout (seconds)</label>
                    <input
                      type="number"
                      value={settings.webhookTimeout}
                      onChange={(e) => handleSettingChange('webhookTimeout', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Performance ── */}
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={Cpu} title="Performance" subtitle="Caching, compression and logging" color="blue" />
            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Caching &amp; Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      { key: 'cacheEnabled', label: 'Enable Caching' },
                      { key: 'compressionEnabled', label: 'Enable Compression' },
                      { key: 'cdnEnabled', label: 'Enable CDN' },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings[key]}
                          onChange={(e) => handleSettingChange(key, e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <label className="ml-2 text-sm text-gray-700">{label}</label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cache Timeout (seconds)</label>
                      <input
                        type="number"
                        value={settings.cacheTimeout}
                        onChange={(e) => handleSettingChange('cacheTimeout', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Log Level</label>
                      <select
                        value={settings.logLevel}
                        onChange={(e) => handleSettingChange('logLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="DEBUG">DEBUG</option>
                        <option value="INFO">INFO</option>
                        <option value="WARN">WARN</option>
                        <option value="ERROR">ERROR</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Log Size (MB)</label>
                      <input
                        type="number"
                        value={settings.maxLogSize}
                        onChange={(e) => handleSettingChange('maxLogSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">System Monitoring</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'monitoringEnabled', label: 'Enable System Monitoring' },
                    { key: 'performanceTracking', label: 'Enable Performance Tracking' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={(e) => handleSettingChange(key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <label className="ml-2 text-sm text-gray-700">{label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Backup & Recovery ── */}
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={HardDrive} title="Backup &amp; Recovery" subtitle="Storage, scheduling and restore configuration" color="blue" />
            <div className="p-6 space-y-8">
              {/* Backup Settings */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Backup Settings</h3>
                  <button
                    onClick={() => handleTestConnection('backup')}
                    className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Run Backup Now
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backup Schedule</label>
                    <select
                      value={settings.dbBackupSchedule}
                      onChange={(e) => handleSettingChange('dbBackupSchedule', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backup Retention (days)</label>
                    <input
                      type="number"
                      value={settings.dbBackupRetention}
                      onChange={(e) => handleSettingChange('dbBackupRetention', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Backup Storage Location</label>
                    <input
                      type="text"
                      value={settings.backupStorageLocation}
                      onChange={(e) => handleSettingChange('backupStorageLocation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Restore Point Retention (days)</label>
                    <input
                      type="number"
                      value={settings.restorePointRetention}
                      onChange={(e) => handleSettingChange('restorePointRetention', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'backupCompressionEnabled', label: 'Enable Backup Compression' },
                    { key: 'backupEncryptionEnabled', label: 'Encrypt Backups' },
                    { key: 'backupNotifyOnComplete', label: 'Notify on Backup Complete' },
                    { key: 'backupNotifyOnFailure', label: 'Notify on Backup Failure' },
                    { key: 'autoRestoreEnabled', label: 'Enable Auto Restore on Failure' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={(e) => handleSettingChange(key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <label className="ml-2 text-sm text-gray-700">{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Backup Status */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Last Backup Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Last Backup</span>
                    </div>
                    <p className="text-sm text-gray-600">Today, 02:00 AM</p>
                    <p className="text-xs text-gray-400 mt-1">Full backup — 2.4 GB</p>
                  </div>
                  <div className=" border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Next Scheduled</span>
                    </div>
                    <p className="text-sm text-gray-600">Tomorrow, 02:00 AM</p>
                    <p className="text-xs text-gray-400 mt-1">Incremental backup</p>
                  </div>
                  <div className="border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <HardDrive className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Storage Used</span>
                    </div>
                    <p className="text-sm text-gray-600">18.7 GB / 100 GB</p>
                    <p className="text-xs text-gray-400 mt-1">18.7% utilised</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Monitoring ── */}
          <div className="border border-gray-200 overflow-hidden">
            <SectionHeader icon={Monitor} title="Monitoring" subtitle="Real-time system health, thresholds and alerting" color="blue" />
            <div className="p-6 space-y-8">

              {/* Live Health Indicators */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">System Health Overview</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'CPU Usage', value: '42%', status: 'good', icon: Cpu },
                    { label: 'Memory', value: '67%', status: 'warn', icon: Server },
                    { label: 'Disk', value: '54%', status: 'good', icon: HardDrive },
                    { label: 'Network', value: 'Online', status: 'good', icon: Wifi },
                  ].map(({ label, value, status, icon: Icon }) => (
                    <div key={label} className="p-4 border border-gray-200 bg-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-gray-500">{label}</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alert Thresholds */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Alert Thresholds</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CPU Alert Threshold (%)</label>
                    <input
                      type="number"
                      value={settings.alertCpuThreshold}
                      onChange={(e) => handleSettingChange('alertCpuThreshold', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Memory Alert Threshold (%)</label>
                    <input
                      type="number"
                      value={settings.alertMemoryThreshold}
                      onChange={(e) => handleSettingChange('alertMemoryThreshold', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Disk Alert Threshold (%)</label>
                    <input
                      type="number"
                      value={settings.alertDiskThreshold}
                      onChange={(e) => handleSettingChange('alertDiskThreshold', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Error Rate Threshold (%)</label>
                    <input
                      type="number"
                      value={settings.errorRateThreshold}
                      onChange={(e) => handleSettingChange('errorRateThreshold', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Response Time Threshold (ms)</label>
                    <input
                      type="number"
                      value={settings.responseTimeThreshold}
                      onChange={(e) => handleSettingChange('responseTimeThreshold', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Alert Notifications */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Alert Notifications &amp; Controls</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'uptimeMonitoring', label: 'Enable Uptime Monitoring' },
                    { key: 'monitoringEnabled', label: 'Enable System Monitoring' },
                    { key: 'performanceTracking', label: 'Enable Performance Tracking' },
                    { key: 'alertEmailNotify', label: 'Send Alerts via Email' },
                    { key: 'alertSmsNotify', label: 'Send Alerts via SMS' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings[key]}
                        onChange={(e) => handleSettingChange(key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <label className="ml-2 text-sm text-gray-700">{label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>{/* end space-y-8 */}

        {/* Fixed save bar */}
        {hasChanges && (
          <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">You have unsaved changes</span>
              <button
                onClick={handleResetSettings}
                className="flex items-center px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </button>
              <button
                onClick={handleSaveSettings}
                className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SystemSettings;