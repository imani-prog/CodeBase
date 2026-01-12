import { useState, useEffect } from 'react';
import {
  X, User, Mail, Phone, Calendar, Activity, AlertCircle, CheckCircle2, Edit3, MapPin, Heart, Users, CreditCard, Droplet, Shield
} from 'lucide-react';

const InputField = ({
  label, name, type = 'text', value, onChange, icon: Icon,
  required = false, error, placeholder, min, max, options, rows
}) => (
  <div className="relative">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative">
      {Icon && type !== 'textarea' && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}

      {type === 'select' ? (
        <select
          name={name}
          value={value || ''}
          onChange={onChange}
          className={`w-full ${Icon ? 'pl-10' : 'px-4'} py-3 border ${
            error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-700'
          } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none bg-white`}
        >
          <option value="">Select {label?.toLowerCase() || ''}</option>
          {options?.map(opt => <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 3}
          className={`w-full px-4 py-3 border ${
            error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-700'
          } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
        />
      ) : type === 'checkbox' ? (
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name={name}
            checked={value || false}
            onChange={onChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{placeholder}</span>
        </label>
      ) : (
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          className={`w-full ${Icon ? 'pl-10' : 'px-4'} pr-4 py-3 border ${
            error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-700'
          } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
        />
      )}

      {error && (
        <div className="absolute -bottom-5 left-0 flex items-center text-xs text-red-600">
          <AlertCircle className="w-3 h-3 mr-1" /> {error}
        </div>
      )}
    </div>
  </div>
);

const Section = ({ title, icon: Icon, children }) => (
  <div className="shadow-sm border border-gray-200 p-6 mb-6 bg-white">
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 flex items-center justify-center mr-3">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

const EditPatientModal = ({ patient, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    nationalId: '',
    maritalStatus: '',
    preferredLanguage: '',
    email: '',
    phone: '',
    secondaryPhone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    bloodType: '',
    allergies: '',
    medications: '',
    chronicConditions: '',
    insuranceMemberId: '',
    insuranceProviderName: '',
    status: 'ACTIVE',
    consentToShareData: true,
    smsOptIn: false,
    emailOptIn: true,
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    if (patient) {
      setFormData(prev => ({ ...prev, ...patient }));
    }
  }, [patient]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validateForm = () => {
    const req = ['firstName', 'lastName', 'email', 'gender', 'status'];
    const newErr = {};
    req.forEach(f => {
      const v = formData[f];
      if (v === undefined || v === null || String(v).trim() === '') {
        newErr[f] = `${f.charAt(0).toUpperCase() + f.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = async () => {
    if (isSaving) return;

    if (!validateForm()) {
      console.warn('Validation failed', errors);
      return;
    }

    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (typeof onSave !== 'function') {
        console.warn('EditPatientModal: onSave prop is not a function or missing', onSave);
      } else {
        try {
          await onSave({ ...patient, ...formData });
        } catch (err) {
          console.error('Error inside onSave:', err);
        }
      }
      setIsSaving(false);
      onClose?.();
    } catch (err) {
      console.error('Save flow error:', err);
      setIsSaving(false);
    }
  };

  if (!isOpen || !patient) return null;

  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'emergency', label: 'Emergency', icon: AlertCircle },
    { id: 'medical', label: 'Medical', icon: Heart },
    { id: 'insurance', label: 'Insurance', icon: Shield }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-5xl w-full overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="relative px-8 py-5 bg-blue-950 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <Edit3 className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Edit Patient Information</h2>
                <p className="text-sm ">Update patient details and medical records</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b border-gray-200 px-8">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <Section title="Personal Information" icon={User}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="First Name" name="firstName" required value={formData.firstName}
                    onChange={handleChange} error={errors.firstName} placeholder="Enter first name" />
                  <InputField label="Middle Name" name="middleName" value={formData.middleName}
                    onChange={handleChange} placeholder="Enter middle name (optional)" />
                  <InputField label="Last Name" name="lastName" required value={formData.lastName}
                    onChange={handleChange} error={errors.lastName} placeholder="Enter last name" />
                  <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth}
                    onChange={handleChange} max={new Date().toISOString().split('T')[0]} icon={Calendar} />
                  <InputField label="Gender" name="gender" type="select" required value={formData.gender}
                    options={[
                      { value: 'MALE', label: 'Male' },
                      { value: 'FEMALE', label: 'Female' },
                      { value: 'OTHER', label: 'Other' }
                    ]} onChange={handleChange} error={errors.gender} />
                  <InputField label="National ID" name="nationalId" value={formData.nationalId}
                    onChange={handleChange} placeholder="Enter national ID" icon={CreditCard} />
                  <InputField label="Marital Status" name="maritalStatus" type="select" value={formData.maritalStatus}
                    options={[
                      { value: 'SINGLE', label: 'Single' },
                      { value: 'MARRIED', label: 'Married' },
                      { value: 'DIVORCED', label: 'Divorced' },
                      { value: 'WIDOWED', label: 'Widowed' },
                      { value: 'SEPARATED', label: 'Separated' },
                      { value: 'OTHER', label: 'Other' }
                    ]} onChange={handleChange} />
                  <InputField label="Preferred Language" name="preferredLanguage" value={formData.preferredLanguage}
                    onChange={handleChange} placeholder="e.g., English, Swahili" />
                </div>
              </Section>
            )}

            {/* Contact Information Tab */}
            {activeTab === 'contact' && (
              <>
                <Section title="Contact Details" icon={Phone}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Email Address" name="email" type="email" required value={formData.email}
                      onChange={handleChange} error={errors.email} placeholder="john@example.com" icon={Mail} />
                    <InputField label="Primary Phone" name="phone" type="tel" value={formData.phone}
                      onChange={handleChange} placeholder="+254 712 345 678" icon={Phone} />
                    <InputField label="Secondary Phone" name="secondaryPhone" type="tel" value={formData.secondaryPhone}
                      onChange={handleChange} placeholder="+254 712 345 678" icon={Phone} />
                  </div>
                </Section>

                <Section title="Address Information" icon={MapPin}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <InputField label="Address Line 1" name="addressLine1" value={formData.addressLine1}
                        onChange={handleChange} placeholder="Street address" />
                    </div>
                    <div className="md:col-span-2">
                      <InputField label="Address Line 2" name="addressLine2" value={formData.addressLine2}
                        onChange={handleChange} placeholder="Apartment, suite, etc." />
                    </div>
                    <InputField label="City" name="city" value={formData.city}
                      onChange={handleChange} placeholder="Enter city" />
                    <InputField label="State/County" name="state" value={formData.state}
                      onChange={handleChange} placeholder="Enter state/county" />
                    <InputField label="Postal Code" name="postalCode" value={formData.postalCode}
                      onChange={handleChange} placeholder="Enter postal code" />
                    <InputField label="Country" name="country" value={formData.country}
                      onChange={handleChange} placeholder="Enter country" />
                  </div>
                </Section>
              </>
            )}

            {/* Emergency Contact Tab */}
            {activeTab === 'emergency' && (
              <Section title="Emergency Contact Information" icon={Users}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Contact Name" name="emergencyContactName" value={formData.emergencyContactName}
                    onChange={handleChange} placeholder="Enter emergency contact name" icon={User} />
                  <InputField label="Relationship" name="emergencyContactRelation" value={formData.emergencyContactRelation}
                    onChange={handleChange} placeholder="e.g., Spouse, Parent, Sibling" />
                  <InputField label="Contact Phone" name="emergencyContactPhone" type="tel" value={formData.emergencyContactPhone}
                    onChange={handleChange} placeholder="+254 712 345 678" icon={Phone} />
                </div>
              </Section>
            )}

            {/* Medical Information Tab */}
            {activeTab === 'medical' && (
              <Section title="Medical Information" icon={Heart}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Blood Type" name="bloodType" type="select" value={formData.bloodType}
                    options={[
                      { value: 'A_POS', label: 'A+' },
                      { value: 'A_NEG', label: 'A-' },
                      { value: 'B_POS', label: 'B+' },
                      { value: 'B_NEG', label: 'B-' },
                      { value: 'AB_POS', label: 'AB+' },
                      { value: 'AB_NEG', label: 'AB-' },
                      { value: 'O_POS', label: 'O+' },
                      { value: 'O_NEG', label: 'O-' }
                    ]} onChange={handleChange} icon={Droplet} />
                  <InputField label="Patient Status" name="status" type="select" required value={formData.status}
                    options={[
                      { value: 'ACTIVE', label: 'Active' },
                      { value: 'INACTIVE', label: 'Inactive' }
                    ]} onChange={handleChange} error={errors.status} icon={Activity} />
                  <div className="md:col-span-2">
                    <InputField label="Allergies" name="allergies" type="textarea" value={formData.allergies}
                      onChange={handleChange} placeholder="List any known allergies" rows={3} />
                  </div>
                  <div className="md:col-span-2">
                    <InputField label="Current Medications" name="medications" type="textarea" value={formData.medications}
                      onChange={handleChange} placeholder="List current medications and dosages" rows={3} />
                  </div>
                  <div className="md:col-span-2">
                    <InputField label="Chronic Conditions" name="chronicConditions" type="textarea" value={formData.chronicConditions}
                      onChange={handleChange} placeholder="List any chronic conditions" rows={3} />
                  </div>
                </div>
              </Section>
            )}

            {/* Insurance & Preferences Tab */}
            {activeTab === 'insurance' && (
              <>
                <Section title="Insurance Information" icon={CreditCard}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Insurance Provider" name="insuranceProviderName" value={formData.insuranceProviderName}
                      onChange={handleChange} placeholder="Enter insurance provider" />
                    <InputField label="Member ID" name="insuranceMemberId" value={formData.insuranceMemberId}
                      onChange={handleChange} placeholder="Enter member ID" />
                  </div>
                </Section>

                <Section title="Preferences & Notes" icon={Activity}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <InputField name="consentToShareData" type="checkbox" value={formData.consentToShareData}
                        onChange={handleChange} placeholder="Consent to share data with healthcare providers" />
                      <InputField name="smsOptIn" type="checkbox" value={formData.smsOptIn}
                        onChange={handleChange} placeholder="Opt-in for SMS notifications" />
                      <InputField name="emailOptIn" type="checkbox" value={formData.emailOptIn}
                        onChange={handleChange} placeholder="Opt-in for email notifications" />
                    </div>
                    <div className="mt-4">
                      <InputField label="Additional Notes" name="notes" type="textarea" value={formData.notes}
                        onChange={handleChange} placeholder="Any additional information or notes" rows={4} />
                    </div>
                  </div>
                </Section>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span className="text-red-500">*</span> Required fields
            </div>
            <div className="flex space-x-3">
              <button onClick={onClose} disabled={isSaving}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors disabled:opacity-50">
                Cancel
              </button>

              <button onClick={handleSubmit} disabled={isSaving}
                className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPatientModal;
