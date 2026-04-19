import { useEffect, useState } from 'react';
import {
  User, Mail, Phone, MapPin, Shield,
  Heart, AlertCircle,
  Edit3, Save, X, Camera, Check, LogOut, Loader2,
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { patientApi } from '../../../API/endpoints/patientApi.js'; // adjust path as needed

/* ── helpers ── */
const formatBloodType = (bt) => {
  if (!bt) return '—';
  return bt.replace('_POS', '+').replace('_NEG', '-').replace('_', '');
};

const formatGender = (g) => g
  ? g.charAt(0) + g.slice(1).toLowerCase()
  : '—';

const formatMaritalStatus = (status) => status
  ? status.charAt(0) + status.slice(1).toLowerCase()
  : '—';

const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
  { value: 'UNKNOWN', label: 'Unknown' },
];

const BLOOD_TYPE_OPTIONS = [
  { value: 'A_POS', label: 'A+' },
  { value: 'A_NEG', label: 'A-' },
  { value: 'B_POS', label: 'B+' },
  { value: 'B_NEG', label: 'B-' },
  { value: 'AB_POS', label: 'AB+' },
  { value: 'AB_NEG', label: 'AB-' },
  { value: 'O_POS', label: 'O+' },
  { value: 'O_NEG', label: 'O-' },
];

const MARITAL_STATUS_OPTIONS = [
  { value: 'SINGLE', label: 'Single' },
  { value: 'MARRIED', label: 'Married' },
  { value: 'DIVORCED', label: 'Divorced' },
  { value: 'WIDOWED', label: 'Widowed' },
  { value: 'SEPARATED', label: 'Separated' },
  { value: 'OTHER', label: 'Other' },
];

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

/* ── Editable field ── */
const EditableField = ({
  label,
  icon: Icon,
  value,
  onChange,
  type = 'text',
  editMode,
  displayValue,
  options,
  placeholder,
}) => (
  <div>
    <label className="flex items-center text-xs font-medium text-gray-500 mb-1">
      {Icon && <Icon className="w-3.5 h-3.5 mr-1 text-blue-600 flex-shrink-0" />}
      {label}
    </label>
    {editMode ? (
      options ? (
        <select
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-500"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
      )
    ) : (
      <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 break-words">
        {displayValue || value || '—'}
      </p>
    )}
  </div>
);

/* ── Note ── */
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

/* ── Main Component ── */
const PatientProfile = () => {
  const { setUser } = useAuth();
  const [profile, setProfile]     = useState(null);
  const [editData, setEditData]   = useState({});   // draft while editing
  const [editMode, setEditMode]   = useState(false);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState(null);

  /* ── Fetch from backend on mount ── */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await patientApi.me();   // GET /api/patients/me
        setProfile(data);
      } catch (err) {
        setError(err?.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* ── Enter edit mode — clone current profile into draft ── */
  const handleEdit = () => {
    setEditData({ ...profile });
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditData({});
    setEditMode(false);
  };

  /* ── Field setter for draft ── */
  const set = (key, val) => setEditData((p) => ({ ...p, [key]: val }));

  /* ── Save draft to backend via PUT ── */
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      const updated = await patientApi.update(profile.id, editData); // PUT /api/patients/{id}
      setProfile(updated);

      // Keep auth context in sync
      setUser((prev) => ({
        ...prev,
        name: `${updated.firstName ?? ''} ${updated.lastName ?? ''}`.trim() || prev?.name,
        email: updated.email || prev?.email,
        phone: updated.phone || prev?.phone,
        initials: [updated.firstName, updated.lastName]
          .filter(Boolean).map((w) => w[0].toUpperCase()).join('') || prev?.initials,
      }));

      setEditMode(false);
    } catch (err) {
      setError(err?.message || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  /* ── Derived display values ── */
  const src = editMode ? editData : profile;
  const initials = [src?.firstName, src?.lastName]
    .filter(Boolean).map((w) => w[0].toUpperCase()).join('') || '?';
  const fullName = [src?.firstName, src?.middleName, src?.lastName].filter(Boolean).join(' ');

  /* ── Loading state ── */
  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm">Loading your profile…</p>
      </div>
    </div>
  );

  /* ── Error state ── */
  if (error && !profile) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-red-200 rounded-xl p-6 text-center max-w-sm w-full">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
        <p className="text-sm font-semibold text-red-700 mb-1">Could not load profile</p>
        <p className="text-xs text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-0 sm:px-4 py-4 sm:py-6">

        {/* ── Page Header ── */}
        <div className="flex items-start justify-between gap-2 mb-4 px-4 sm:px-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">My Profile</h1>

          {/* Inline save error */}
          {error && editMode && (
            <p className="text-xs text-red-600 flex-1 text-center mt-1">{error}</p>
          )}

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {editMode ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-50"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cancel</span>
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
                onClick={handleEdit}
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
          <div className="border-y sm:border border-gray-200 overflow-hidden bg-white">
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
                  <p className="font-semibold text-gray-900 text-sm leading-tight">{fullName || '—'}</p>
                  <p className="text-xs text-blue-600 leading-tight mt-0.5">Patient</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full inline-block flex-shrink-0 ${
                      src?.status === 'ACTIVE' ? 'bg-green-400' : 'bg-gray-300'
                    }`} />
                    <span className="text-xs text-gray-400 capitalize">
                      {src?.status?.toLowerCase() ?? 'active'}
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 flex-shrink-0 hidden sm:block">
                  <p className="font-mono font-medium text-gray-700">#{profile?.id}</p>
                  <p className="mt-0.5">
                    {profile?.createdAt
                      ? `Joined ${new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                      : ''}
                  </p>
                </div>
              </div>

              {/* ID pill — mobile */}
              <div className="sm:hidden flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg mb-3">
                <span className="text-xs text-gray-500">Patient ID</span>
                <span className="text-xs font-mono font-medium text-gray-700">#{profile?.id}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EditableField label="First Name"      icon={User}  value={src?.firstName}   onChange={(v) => set('firstName', v)}   editMode={editMode} />
                <EditableField label="Last Name"       icon={User}  value={src?.lastName}    onChange={(v) => set('lastName', v)}    editMode={editMode} />
                <EditableField label="Middle Name"     icon={User}  value={src?.middleName}  onChange={(v) => set('middleName', v)}  editMode={editMode} />
                <EditableField label="Email Address"   icon={Mail}  type="email" value={src?.email}  onChange={(v) => set('email', v)}  editMode={editMode} />
                <EditableField label="Phone Number"    icon={Phone} type="tel"   value={src?.phone}  onChange={(v) => set('phone', v)}  editMode={editMode} />
                <EditableField label="Secondary Phone" icon={Phone} type="tel"   value={src?.secondaryPhone} onChange={(v) => set('secondaryPhone', v)} editMode={editMode} />
                <EditableField label="Date of Birth"   type="date" value={src?.dateOfBirth} onChange={(v) => set('dateOfBirth', v)} editMode={editMode} />
                <EditableField
                  label="Gender"
                  value={src?.gender}
                  onChange={(v) => set('gender', v)}
                  editMode={editMode}
                  options={GENDER_OPTIONS}
                  displayValue={formatGender(src?.gender)}
                />
                <EditableField
                  label="Blood Type"
                  value={src?.bloodType}
                  onChange={(v) => set('bloodType', v || null)}
                  editMode={editMode}
                  options={BLOOD_TYPE_OPTIONS}
                  placeholder="Select blood type"
                  displayValue={formatBloodType(src?.bloodType)}
                />
                <EditableField
                  label="Marital Status"
                  value={src?.maritalStatus}
                  onChange={(v) => set('maritalStatus', v || null)}
                  editMode={editMode}
                  options={MARITAL_STATUS_OPTIONS}
                  placeholder="Select marital status"
                  displayValue={formatMaritalStatus(src?.maritalStatus)}
                />
                <EditableField label="National ID"     value={src?.nationalId} onChange={(v) => set('nationalId', v)} editMode={editMode} />
              </div>
            </div>
          </div>

          {/* ── Address ── */}
          <div className="border-y sm:border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={MapPin} title="Address" subtitle="Your residential address" />
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <EditableField label="Street Address (Line 1)" icon={MapPin} value={src?.addressLine1} onChange={(v) => set('addressLine1', v)} editMode={editMode} />
                </div>
                <div className="sm:col-span-2">
                  <EditableField label="Street Address (Line 2)" value={src?.addressLine2} onChange={(v) => set('addressLine2', v)} editMode={editMode} />
                </div>
                <EditableField label="City"          value={src?.city}       onChange={(v) => set('city', v)}       editMode={editMode} />
                <EditableField label="State / County" value={src?.state}     onChange={(v) => set('state', v)}      editMode={editMode} />
                <EditableField label="Postal Code"   value={src?.postalCode} onChange={(v) => set('postalCode', v)} editMode={editMode} />
                <EditableField label="Country"       value={src?.country} onChange={(v) => set('country', v)} editMode={editMode} />
              </div>
            </div>
          </div>

          {/* ── Medical Information ── */}
          <div className="border-y sm:border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Heart} title="Medical Information" subtitle="Your health and medical details" />
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <EditableField label="Allergies"          value={src?.allergies}         onChange={(v) => set('allergies', v)}         editMode={editMode} />
                </div>
                <div className="sm:col-span-2">
                  <EditableField label="Current Medications" value={src?.medications}      onChange={(v) => set('medications', v)}        editMode={editMode} />
                </div>
                <div className="sm:col-span-2">
                  <EditableField label="Chronic Conditions" value={src?.chronicConditions} onChange={(v) => set('chronicConditions', v)} editMode={editMode} />
                </div>
              </div>
              <Note type="info" title="Keep Information Current"
                message="Accurate medical information helps healthcare providers deliver better care." />
            </div>
          </div>

          {/* ── Emergency Contact ── */}
          <div className="border-y sm:border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={AlertCircle} title="Emergency Contact" subtitle="This person will be contacted in a medical emergency" />
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EditableField label="Contact Name"   icon={User}  value={src?.emergencyContactName}     onChange={(v) => set('emergencyContactName', v)}     editMode={editMode} />
                <EditableField label="Relationship"              value={src?.emergencyContactRelation}  onChange={(v) => set('emergencyContactRelation', v)}  editMode={editMode} />
                <div className="sm:col-span-2">
                  <EditableField label="Phone Number" icon={Phone} type="tel" value={src?.emergencyContactPhone} onChange={(v) => set('emergencyContactPhone', v)} editMode={editMode} />
                </div>
              </div>
              <Note type="warning" title="Important"
                message="Make sure your emergency contact is always up to date and can make medical decisions on your behalf." />
            </div>
          </div>

          {/* ── Insurance ── */}
          <div className="border-y sm:border border-gray-200 overflow-hidden bg-white">
            <SectionHeader icon={Shield} title="Insurance" subtitle="Your insurance coverage details" />
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <EditableField label="Insurance Provider" icon={Shield} value={src?.insuranceProviderName} onChange={(v) => set('insuranceProviderName', v)} editMode={editMode} />
                </div>
                <EditableField label="Member / Policy ID" value={src?.insuranceMemberId} onChange={(v) => set('insuranceMemberId', v)} editMode={editMode} />
              </div>
              <Note type="info" title="Insurance Coverage"
                message="Your insurance information is securely stored and encrypted." />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientProfile;