import { useEffect, useState } from 'react';
import {
  User, Mail, Phone, MapPin, Shield,
  Heart, AlertCircle,
  Edit3, Save, X, Camera, Check, LogOut,
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth.jsx';

/* ── Section header ── */
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-200">
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
    <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 break-words">
      {value || '—'}
    </p>
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
      <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 break-words">
        {value || '—'}
      </p>
    )}
  </div>
);

/* ── Info / Warning note ── */
const Note = ({ type = 'info', title, message }) => {
  const isWarning = type === 'warning';
  return (
    <div className={`flex items-start gap-2 p-3 rounded-lg border ${isWarning ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
      {isWarning
        ? <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        : <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />}
      <div>
        <p className={`text-xs font-semibold ${isWarning ? 'text-amber-800' : 'text-blue-800'}`}>{title}</p>
        <p className={`text-xs mt-0.5 ${isWarning ? 'text-amber-700' : 'text-blue-700'}`}>{message}</p>
      </div>
    </div>
  );
};

/* ── Defaults ── */
const defaultProfile = {
  firstName: '', lastName: '',
  email: '', phone: '',
  dateOfBirth: '2003-06-15', gender: 'Male', bloodType: 'O+',
  street: '123 Health Street', city: 'Machakos',
  state: 'Machakos County', zipCode: '02101', country: 'Kenya',
  emergencyName: 'Sarah Imani', emergencyRelation: 'Spouse',
  emergencyPhone: '+25443669252',
  height: "5'10\"", weight: '175 lbs',
  allergies: 'Penicillin, Peanuts',
  medications: 'Lisinopril 10mg daily',
  conditions: 'Hypertension',
  insuranceProvider: 'Social Health Insurance Fund',
  policyNumber: 'BCBS-123456789', groupNumber: 'GRP-987654',
  memberSince: 'January 15, 2023',
  userId: '', status: 'Active',
};

const mapUserToProfile = (user = {}) => {
  const baseName = user.name || user.username || '';
  const [firstName = '', ...rest] = baseName.split(' ').filter(Boolean);
  return {
    ...defaultProfile,
    firstName,
    lastName: rest.join(' '),
    email: user.email || '',
    phone: user.phone || '',
    userId: user.patientId || user.userId || '',
  };
};

/* ── Main Component ── */
const PatientProfile = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(() => mapUserToProfile(user));
  const [editMode, setEditMode] = useState(false);

  useEffect(() => { setProfile(mapUserToProfile(user)); }, [user]);

  const set = (key, val) => setProfile((p) => ({ ...p, [key]: val }));

  const handleSave = () => {
    const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ').trim();

    setUser((prev) => ({
      ...prev,
      name: fullName || prev?.name,
      email: profile.email,
      phone: profile.phone,
      userId: profile.userId,
      patientId: profile.userId,
      initials: [profile.firstName, profile.lastName]
        .filter(Boolean)
        .map((w) => w[0].toUpperCase())
        .join('') || prev?.initials,
    }));
    setEditMode(false);
  };

  const initials = [profile.firstName, profile.lastName]
    .filter(Boolean).map((w) => w[0].toUpperCase()).join('');
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-0 sm:px-4 py-4 sm:py-6">

        {/* ── Page Header ── */}
        <div className="flex items-start justify-between gap-2 mb-4 px-4 sm:px-0">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">My Profile</h1>
            
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            )}
            <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-4">

          {/* ── Personal Information ── */}
          <div className="border-y sm:border border-gray-200 overflow-hidden">
            <SectionHeader icon={User} title="Personal Information" subtitle="Your personal contact details" />
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
                  <p className="text-xs text-blue-600 leading-tight mt-0.5">Patient</p>
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
                <span className="text-xs text-gray-500">Patient ID</span>
                <span className="text-xs font-mono font-medium text-gray-700">{profile.userId}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EditableField label="First Name" icon={User} value={profile.firstName} onChange={(v) => set('firstName', v)} editMode={editMode} />
                <EditableField label="Last Name" icon={User} value={profile.lastName} onChange={(v) => set('lastName', v)} editMode={editMode} />
                <EditableField label="Email Address" icon={Mail} type="email" value={profile.email} onChange={(v) => set('email', v)} editMode={editMode} />
                <EditableField label="Phone Number" icon={Phone} type="tel" value={profile.phone} onChange={(v) => set('phone', v)} editMode={editMode} />
                <Field label="Date of Birth" value={profile.dateOfBirth} />
                <Field label="Gender" value={profile.gender} />
                <Field label="Blood Type" value={profile.bloodType} />
              </div>
            </div>
          </div>

          {/* ── Address ── */}
          <div className="border-y sm:border border-gray-200 overflow-hidden">
            <SectionHeader icon={MapPin} title="Address" subtitle="Your residential address" />
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <EditableField label="Street Address" icon={MapPin} value={profile.street} onChange={(v) => set('street', v)} editMode={editMode} />
                </div>
                <EditableField label="City" value={profile.city} onChange={(v) => set('city', v)} editMode={editMode} />
                <EditableField label="State / County" value={profile.state} onChange={(v) => set('state', v)} editMode={editMode} />
                <EditableField label="Postal Code" value={profile.zipCode} onChange={(v) => set('zipCode', v)} editMode={editMode} />
                <Field label="Country" value={profile.country} />
              </div>
            </div>
          </div>

          {/* ── Medical Information ── */}
          <div className="border-y sm:border border-gray-200 overflow-hidden">
            <SectionHeader icon={Heart} title="Medical Information" subtitle="Your health and medical details" />
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Height" value={profile.height} />
                <Field label="Weight" value={profile.weight} />
                <div className="sm:col-span-2">
                  <EditableField label="Allergies" value={profile.allergies} onChange={(v) => set('allergies', v)} editMode={editMode} />
                </div>
                <div className="sm:col-span-2">
                  <EditableField label="Current Medications" value={profile.medications} onChange={(v) => set('medications', v)} editMode={editMode} />
                </div>
                <div className="sm:col-span-2">
                  <EditableField label="Medical Conditions" value={profile.conditions} onChange={(v) => set('conditions', v)} editMode={editMode} />
                </div>
              </div>
              <Note type="info" title="Keep Information Current"
                message="Accurate medical information helps healthcare providers deliver better care. Please update any changes to your medications or conditions." />
            </div>
          </div>

          {/* ── Emergency Contact ── */}
          <div className="border-y sm:border border-gray-200 overflow-hidden">
            <SectionHeader icon={AlertCircle} title="Emergency Contact" subtitle="This person will be contacted in a medical emergency" />
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EditableField label="Contact Name" icon={User} value={profile.emergencyName} onChange={(v) => set('emergencyName', v)} editMode={editMode} />
                <EditableField label="Relationship" value={profile.emergencyRelation} onChange={(v) => set('emergencyRelation', v)} editMode={editMode} />
                <div className="sm:col-span-2">
                  <EditableField label="Phone Number" icon={Phone} type="tel" value={profile.emergencyPhone} onChange={(v) => set('emergencyPhone', v)} editMode={editMode} />
                </div>
              </div>
              <Note type="warning" title="Important"
                message="Make sure your emergency contact is always up to date. This person should be able to make medical decisions on your behalf if needed." />
            </div>
          </div>

          {/* ── Insurance ── */}
          <div className="border-y sm:border border-gray-200 overflow-hidden">
            <SectionHeader icon={Shield} title="Insurance" subtitle="Your insurance coverage details" />
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <EditableField label="Insurance Provider" icon={Shield} value={profile.insuranceProvider} onChange={(v) => set('insuranceProvider', v)} editMode={editMode} />
                </div>
                <EditableField label="Policy Number" value={profile.policyNumber} onChange={(v) => set('policyNumber', v)} editMode={editMode} />
                <EditableField label="Group Number" value={profile.groupNumber} onChange={(v) => set('groupNumber', v)} editMode={editMode} />
              </div>
              <Note type="info" title="Insurance Coverage"
                message="Your insurance information is securely stored and encrypted. Please verify this with your insurance provider to ensure accuracy." />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientProfile;