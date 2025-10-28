import { useState, useEffect } from 'react';
import {
  X, User, Mail, Phone, Calendar, Activity, AlertCircle, CheckCircle2, Edit3
} from 'lucide-react';

const InputField = ({
  label, name, type = 'text', value, onChange, icon: Icon,
  required = false, error, placeholder, min, max, options
}) => (
  <div className="relative">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}

      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? 'pl-10' : 'px-4'} py-3 border ${
            error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          } rounded-lg focus:ring-2 focus:border-transparent transition-all appearance-none bg-white`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          className={`w-full ${Icon ? 'pl-10' : 'px-4'} pr-4 py-3 border ${
            error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          } rounded-lg focus:ring-2 focus:border-transparent transition-all`}
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

const EditPatientModal = ({ patient, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', age: '', gender: '',
    condition: '', status: '', nextAppointment: ''
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (patient) setFormData(prev => ({ ...prev, ...patient }));
  }, [patient]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validateForm = () => {
    const req = ['name', 'email', 'age', 'gender', 'status'];
    const newErr = {};
    req.forEach(f => {
      const v = formData[f];
      if (v === undefined || v === null || String(v).trim() === '') {
        newErr[f] = `${f.charAt(0).toUpperCase() + f.slice(1)} is required`;
      }
    });
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = async () => {
    // Prevent double click
    if (isSaving) return;

    if (!validateForm()) {
      console.warn('Validation failed', errors);
      return;
    }

    setIsSaving(true);
    try {
      // Give visual feedback (simulate server)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Defensive: ensure onSave exists and is a function
      if (typeof onSave !== 'function') {
        console.warn('EditPatientModal: onSave prop is not a function or missing', onSave);
      } else {
        // Wrap in try/catch so errors in onSave don't leave UI stuck
        try {
          await onSave({ ...patient, ...formData });
        } catch (err) {
          console.error('Error inside onSave:', err);
          // optionally set an error state here to show user
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-3xl w-full overflow-hidden">
          <div className="relative px-8 py-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:rotate-90"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <Edit3 className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Edit Patient Information</h2>
                <p className="text-sm">Update patient details and medical records</p>
              </div>
            </div>
          </div>

          <div className="p-8 max-h-[calc(100vh-300px)] overflow-y-auto">
            <div className="shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" name="name" required value={formData.name}
                  onChange={handleChange} error={errors.name} placeholder="John Doe" />
                <InputField label="Age" name="age" type="number" required value={formData.age}
                  onChange={handleChange} error={errors.age} min="1" max="120" placeholder="25" />
                <InputField label="Gender" name="gender" type="select" required
                  options={['Male', 'Female', 'Other']} value={formData.gender} onChange={handleChange} error={errors.gender} />
                <InputField label="Email Address" name="email" type="email" required
                  icon={Mail} value={formData.email} onChange={handleChange} error={errors.email} placeholder="john@example.com" />
                <InputField label="Phone Number" name="phone" type="tel"
                  icon={Phone} value={formData.phone} onChange={handleChange} placeholder="+254 712 345 678" />
              </div>
            </div>

            <div className="shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Primary Condition" name="condition" value={formData.condition}
                  onChange={handleChange} placeholder="e.g., Hypertension" />
                <InputField label="Patient Status" name="status" type="select" required
                  options={['Active', 'Critical', 'Recovering']} value={formData.status}
                  onChange={handleChange} error={errors.status} />
                <InputField label="Next Appointment" name="nextAppointment" type="date"
                  icon={Calendar} value={formData.nextAppointment} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span className="text-red-500">*</span> Required fields
            </div>
            <div className="flex space-x-3">
              <button onClick={onClose} disabled={isSaving}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors">
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
