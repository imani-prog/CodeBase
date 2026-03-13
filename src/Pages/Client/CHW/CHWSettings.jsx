import { useState } from 'react';
import {
  User, Bell, Lock, CreditCard, Globe, Moon, Shield,
  MapPin, Briefcase, Activity, Users, Radio, Smartphone,
  ChevronRight, Check, Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── Section header ── */
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-gray-200 bg-white">
    <Icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
    <div className="min-w-0">
      <h2 className="text-sm font-semibold text-gray-800 leading-tight">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 leading-tight mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

/* ── Toggle row — inlined into section, separated by border-b ── */
const ToggleRow = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-gray-100 last:border-b-0">
    <p className="text-sm text-gray-700 leading-tight">{label}</p>
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
    >
      <span className={`inline-block w-3.5 h-3.5 mt-0.5 ml-0.5 transform bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  </div>
);

/* ── Select row ── */
const SelectRow = ({ label, value, onChange, options }) => (
  <div className="px-4 py-2.5 border-b border-gray-100 last:border-b-0">
    <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-800"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

/* ── Action row ── */
const ActionRow = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full px-4 py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors group text-left"
  >
    <span className="text-sm text-gray-700 group-hover:text-blue-700">{label}</span>
    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
  </button>
);

/* ── Section wrapper ── */
const Section = ({ children }) => (
  <div className="bg-white border border-gray-200 overflow-hidden">
    {children}
  </div>
);

const CHWSettings = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const [state, setState] = useState({
    gpsTracking: true,
    shareLocation: true,
    autoLogMileage: true,
    emailNotifications: true,
    smsNotifications: true,
    patientAssignments: true,
    visitReminders: true,
    trainingUpdates: true,
    performanceReports: true,
    acceptAssignments: true,
    emergencyCalls: true,
    workingHours: 'flexible',
    maxDailyVisits: '10',
    autoGenerateReports: true,
    sharePerformance: true,
    messagesFromPatients: true,
    messagesFromSupervisor: true,
    autoReplyOffline: false,
    autoCheckIn: true,
    offlineMode: true,
    savePhotos: true,
    visitDuration: '30',
    paymentMethod: 'mpesa',
    biometricLogin: false,
    autoSync: true,
    dataUsage: 'wifi',
    language: 'en',
    timezone: 'eat',
    darkMode: false,
  });

  const set = (key, val) => setState((prev) => ({ ...prev, [key]: val }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full  mx-auto">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-4 px-3 sm:px-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 hidden sm:block">Manage your app preferences and configurations</p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex-shrink-0 ${
              saved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {saved
              ? <><Check className="w-3.5 h-3.5" /><span>Saved</span></>
              : <><Save className="w-3.5 h-3.5" /><span>Save</span></>
            }
          </button>
        </div>

        <div className="space-y-3">

          {/* ── Account Settings ── */}
          <Section>
            <SectionHeader icon={User} title="Account Settings" subtitle="Manage your personal information" />
            <ActionRow label="Edit Profile Information" onClick={() => navigate('/client/chw/profile')} />
          </Section>

          {/* ── GPS & Location ── */}
          <Section>
            <SectionHeader icon={MapPin} title="GPS & Location Settings" subtitle="Manage location tracking preferences" />
            <ToggleRow label="Enable GPS Tracking" checked={state.gpsTracking} onChange={(v) => set('gpsTracking', v)} />
            <ToggleRow label="Share Location with Supervisor" checked={state.shareLocation} onChange={(v) => set('shareLocation', v)} />
            <ToggleRow label="Auto-Log Mileage" checked={state.autoLogMileage} onChange={(v) => set('autoLogMileage', v)} />
          </Section>

          {/* ── Notifications ── */}
          <Section>
            <SectionHeader icon={Bell} title="Notifications" subtitle="Configure notification preferences" />
            <ToggleRow label="Email Notifications" checked={state.emailNotifications} onChange={(v) => set('emailNotifications', v)} />
            <ToggleRow label="SMS Notifications" checked={state.smsNotifications} onChange={(v) => set('smsNotifications', v)} />
            <ToggleRow label="New Patient Assignments" checked={state.patientAssignments} onChange={(v) => set('patientAssignments', v)} />
            <ToggleRow label="Visit Reminders" checked={state.visitReminders} onChange={(v) => set('visitReminders', v)} />
            <ToggleRow label="Training Updates" checked={state.trainingUpdates} onChange={(v) => set('trainingUpdates', v)} />
            <ToggleRow label="Performance Reports" checked={state.performanceReports} onChange={(v) => set('performanceReports', v)} />
          </Section>

          {/* ── Work Preferences ── */}
          <Section>
            <SectionHeader icon={Briefcase} title="Work Preferences" subtitle="Configure your work settings" />
            <ToggleRow label="Accept New Assignments" checked={state.acceptAssignments} onChange={(v) => set('acceptAssignments', v)} />
            <ToggleRow label="Available for Emergency Calls" checked={state.emergencyCalls} onChange={(v) => set('emergencyCalls', v)} />
            <SelectRow
              label="Preferred Working Hours"
              value={state.workingHours}
              onChange={(v) => set('workingHours', v)}
              options={[
                { value: 'morning', label: 'Morning (6AM - 12PM)' },
                { value: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
                { value: 'evening', label: 'Evening (6PM - 10PM)' },
                { value: 'flexible', label: 'Flexible' },
              ]}
            />
            <SelectRow
              label="Maximum Daily Visits"
              value={state.maxDailyVisits}
              onChange={(v) => set('maxDailyVisits', v)}
              options={[
                { value: '5', label: '5 visits' },
                { value: '10', label: '10 visits' },
                { value: '15', label: '15 visits' },
                { value: '20', label: '20 visits' },
              ]}
            />
          </Section>

          {/* ── Performance Tracking ── */}
          <Section>
            <SectionHeader icon={Activity} title="Performance Tracking" subtitle="Manage performance settings" />
            <ActionRow label="View Performance Reports" onClick={() => navigate('/client/chw/reports')} />
            <ToggleRow label="Auto-Generate Monthly Reports" checked={state.autoGenerateReports} onChange={(v) => set('autoGenerateReports', v)} />
            <ToggleRow label="Share Performance with Supervisor" checked={state.sharePerformance} onChange={(v) => set('sharePerformance', v)} />
          </Section>

          {/* ── Communication Preferences ── */}
          <Section>
            <SectionHeader icon={Users} title="Communication Preferences" subtitle="Manage how you communicate" />
            <ToggleRow label="Receive Messages from Patients" checked={state.messagesFromPatients} onChange={(v) => set('messagesFromPatients', v)} />
            <ToggleRow label="Receive Messages from Supervisor" checked={state.messagesFromSupervisor} onChange={(v) => set('messagesFromSupervisor', v)} />
            <ToggleRow label="Auto-Reply When Offline" checked={state.autoReplyOffline} onChange={(v) => set('autoReplyOffline', v)} />
          </Section>

          {/* ── Field Visit Settings ── */}
          <Section>
            <SectionHeader icon={Radio} title="Field Visit Settings" subtitle="Configure field visit preferences" />
            <ToggleRow label="Auto-Check In at Locations" checked={state.autoCheckIn} onChange={(v) => set('autoCheckIn', v)} />
            <ToggleRow label="Enable Offline Mode" checked={state.offlineMode} onChange={(v) => set('offlineMode', v)} />
            <ToggleRow label="Save Visit Photos" checked={state.savePhotos} onChange={(v) => set('savePhotos', v)} />
            <SelectRow
              label="Default Visit Duration"
              value={state.visitDuration}
              onChange={(v) => set('visitDuration', v)}
              options={[
                { value: '15', label: '15 minutes' },
                { value: '30', label: '30 minutes' },
                { value: '45', label: '45 minutes' },
                { value: '60', label: '60 minutes' },
              ]}
            />
          </Section>

          {/* ── Earnings & Payments ── */}
          <Section>
            <SectionHeader icon={CreditCard} title="Earnings & Payments" subtitle="View salary and payment history" />
            <ActionRow label="View Payment Reports" onClick={() => navigate('/client/chw/reports')} />
            <SelectRow
              label="Payment Method"
              value={state.paymentMethod}
              onChange={(v) => set('paymentMethod', v)}
              options={[
                { value: 'mpesa', label: 'M-Pesa' },
                { value: 'bank', label: 'Bank Transfer' },
                { value: 'airtel', label: 'Airtel Money' },
              ]}
            />
          </Section>

          {/* ── Security & Privacy ── */}
          <Section>
            <SectionHeader icon={Lock} title="Security & Privacy" subtitle="Password and security settings" />
            <ActionRow label="Change Password" onClick={() => console.log('Change password')} />
            <ActionRow label="Two-Factor Authentication" onClick={() => console.log('2FA')} />
          </Section>

          {/* ── Device & App Settings ── */}
          {/* <Section>
            <SectionHeader icon={Smartphone} title="Device & App Settings" subtitle="Manage device preferences" />
            <ToggleRow label="Enable Biometric Login" checked={state.biometricLogin} onChange={(v) => set('biometricLogin', v)} />
            <ToggleRow label="Auto-Sync Data" checked={state.autoSync} onChange={(v) => set('autoSync', v)} />
            <SelectRow
              label="Data Usage"
              value={state.dataUsage}
              onChange={(v) => set('dataUsage', v)}
              options={[
                { value: 'wifi', label: 'Wi-Fi Only' },
                { value: 'mobile', label: 'Mobile Data' },
                { value: 'both', label: 'Wi-Fi & Mobile Data' },
              ]}
            />
          </Section> */}

          {/* ── Language & Region ── */}
          {/* <Section>
            <SectionHeader icon={Globe} title="Language & Region" subtitle="Language and timezone settings" />
            <SelectRow
              label="Language"
              value={state.language}
              onChange={(v) => set('language', v)}
              options={[
                { value: 'en', label: 'English' },
                { value: 'sw', label: 'Swahili' },
              ]}
            />
            <SelectRow
              label="Timezone"
              value={state.timezone}
              onChange={(v) => set('timezone', v)}
              options={[{ value: 'eat', label: 'East Africa Time (EAT)' }]}
            />
          </Section> */}

          {/* ── Appearance ── */}
          {/* <Section>
            <SectionHeader icon={Moon} title="Appearance" subtitle="Customize your display preferences" />
            <ToggleRow label="Dark Mode" checked={state.darkMode} onChange={(v) => set('darkMode', v)} />
          </Section> */}

          {/* ── Legal & Privacy ── */}
          <Section>
            <SectionHeader icon={Shield} title="Legal & Privacy" subtitle="Terms and privacy information" />
            <ActionRow label="Privacy Policy" onClick={() => navigate('/privacy')} />
            <ActionRow label="Terms of Service" onClick={() => navigate('/terms')} />
          </Section>

        </div>
      </div>
    </div>
  );
};

export default CHWSettings;