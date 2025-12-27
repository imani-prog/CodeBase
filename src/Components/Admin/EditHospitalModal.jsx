import { useState, useEffect } from 'react';
import {
  X, Building2, Phone, Mail, MapPin, Bed, Stethoscope, Activity,
  Shield, AlertCircle, CheckCircle2, Edit3, Plus, XCircle, Globe, Heart, Truck
} from 'lucide-react';

const InputField = ({
  label, name, type = 'text', value, onChange, icon: Icon,
  required = false, error, placeholder, min, max, options, step
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
            error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 '
          } rounded-lg transition-all appearance-none bg-white`}
        >
          {options?.map(opt => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
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
          step={step}
          className={`w-full ${Icon ? 'pl-10' : 'px-4'} pr-4 py-3 border ${
            error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 '
          } rounded-lg  transition-all`}
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

const HospitalFormModal = ({ hospital, isOpen, onClose, onSave, facilityTypes }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'PUBLIC',
    registrationNumber: '',
    taxId: '',
    phone: '',
    email: '',
    website: '',
    fax: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Kenya',
    latitude: '',
    longitude: '',
    numberOfBeds: '',
    numberOfICUBeds: '',
    numberOfAmbulances: '',
    servicesOffered: [],
    facilities: [],
    insuranceProvidersAccepted: [],
    status: 'ACTIVE'
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [newService, setNewService] = useState('');
  const [newInsurance, setNewInsurance] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const isEdit = !!hospital;

  useEffect(() => {
    if (hospital) {
      setFormData({
        name: hospital.name || '',
        code: hospital.code || '',
        type: hospital.type || 'PUBLIC',
        registrationNumber: hospital.registrationNumber || '',
        taxId: hospital.taxId || '',
        phone: hospital.phone || '',
        email: hospital.email || '',
        website: hospital.website || '',
        fax: hospital.fax || '',
        addressLine1: hospital.addressLine1 || '',
        addressLine2: hospital.addressLine2 || '',
        city: hospital.city || '',
        state: hospital.state || '',
        postalCode: hospital.postalCode || '',
        country: hospital.country || 'Kenya',
        latitude: hospital.latitude || '',
        longitude: hospital.longitude || '',
        numberOfBeds: hospital.numberOfBeds || '',
        numberOfICUBeds: hospital.numberOfICUBeds || '',
        numberOfAmbulances: hospital.numberOfAmbulances || '',
        servicesOffered: hospital.servicesOffered || [],
        facilities: hospital.facilities || [],
        insuranceProvidersAccepted: hospital.insuranceProvidersAccepted || [],
        status: hospital.status || 'ACTIVE'
      });
    }
  }, [hospital]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFacilityToggle = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const handleAddService = () => {
    if (newService.trim() && !formData.servicesOffered.includes(newService.trim())) {
      setFormData(prev => ({
        ...prev,
        servicesOffered: [...prev.servicesOffered, newService.trim()]
      }));
      setNewService('');
    }
  };

  const handleRemoveService = (service) => {
    setFormData(prev => ({
      ...prev,
      servicesOffered: prev.servicesOffered.filter(s => s !== service)
    }));
  };

  const handleAddInsurance = () => {
    if (newInsurance.trim() && !formData.insuranceProvidersAccepted.includes(newInsurance.trim())) {
      setFormData(prev => ({
        ...prev,
        insuranceProvidersAccepted: [...prev.insuranceProvidersAccepted, newInsurance.trim()]
      }));
      setNewInsurance('');
    }
  };

  const handleRemoveInsurance = (insurance) => {
    setFormData(prev => ({
      ...prev,
      insuranceProvidersAccepted: prev.insuranceProvidersAccepted.filter(i => i !== insurance)
    }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'phone', 'email'];
    const newErrors = {};
    
    requiredFields.forEach(field => {
      const value = formData[field];
      if (value === undefined || value === null || String(value).trim() === '') {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        console.warn('HospitalFormModal: onSave prop is not a function or missing', onSave);
      } else {
        try {
          await onSave({ ...hospital, ...formData });
          
          setShowSuccess(true);
          
          setTimeout(() => {
            setShowSuccess(false);
            onClose?.();
          }, 2000);
        } catch (err) {
          console.error('Error inside onSave:', err);
        }
      }
      setIsSaving(false);
    } catch (err) {
      console.error('Save flow error:', err);
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-[60] animate-slideIn">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 min-w-[300px]">
            <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">Success!</p>
              <p className="text-sm text-green-50">Hospital updated successfully</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-5xl w-full overflow-hidden">
          {/* Header */}
          <div className="relative px-8 py-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:rotate-90"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                {isEdit ? <Edit3 className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">
                  {isEdit ? 'Edit Hospital' : 'Add New Hospital'}
                </h2>
                <p className="text-sm">
                  {isEdit ? 'Update hospital information and details' : 'Fill in the details to add a new hospital'}
                </p>
              </div>
            </div>
          </div>

          {/* Body - Single Scrollable Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="p-8 max-h-[calc(100vh-250px)] overflow-y-auto">
              {/* Basic Information Section */}
              <div className="shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 flex items-center justify-center mr-3">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Hospital Name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="e.g., Kenyatta National Hospital"
                  />
                  <InputField
                    label="Hospital Code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g., HS001"
                  />
                  <InputField
                    label="Hospital Type"
                    name="type"
                    type="select"
                    required
                    value={formData.type}
                    onChange={handleChange}
                    options={[
                      { value: 'PUBLIC', label: 'Public' },
                      { value: 'PRIVATE', label: 'Private' },
                      { value: 'FAITH_BASED', label: 'Faith-Based' },
                      { value: 'NGO', label: 'NGO' }
                    ]}
                  />
                  <InputField
                    label="Status"
                    name="status"
                    type="select"
                    value={formData.status}
                    onChange={handleChange}
                    options={[
                      { value: 'ACTIVE', label: 'Active' },
                      { value: 'INACTIVE', label: 'Inactive' },
                      { value: 'SUSPENDED', label: 'Suspended' }
                    ]}
                  />
                  <InputField
                    label="Registration Number"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g., KNH-REG-2001"
                  />
                  <InputField
                    label="Tax ID"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    placeholder="e.g., TAX-KNH-001"
                  />
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 flex items-center justify-center mr-3">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    required
                    icon={Phone}
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+254-20-2726300"
                  />
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    icon={Mail}
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="info@hospital.com"
                  />
                  <InputField
                    label="Website"
                    name="website"
                    icon={Globe}
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="www.hospital.com"
                  />
                  <InputField
                    label="Fax Number"
                    name="fax"
                    type="tel"
                    value={formData.fax}
                    onChange={handleChange}
                    placeholder="+254-20-2725272"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 flex items-center justify-center mr-3">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
                </div>

                <div className="space-y-6">
                  <InputField
                    label="Address Line 1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="Street address"
                  />
                  <InputField
                    label="Address Line 2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="P.O. Box, Building, etc."
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g., Nairobi"
                    />
                    <InputField
                      label="State/County"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g., Nairobi County"
                    />
                    <InputField
                      label="Postal Code"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="e.g., 00202"
                    />
                    <InputField
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Kenya"
                    />
                    <InputField
                      label="Latitude"
                      name="latitude"
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={handleChange}
                      placeholder="e.g., -1.3018"
                    />
                    <InputField
                      label="Longitude"
                      name="longitude"
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={handleChange}
                      placeholder="e.g., 36.8073"
                    />
                  </div>
                </div>
              </div>

              {/* Capacity Section */}
              <div className="shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 flex items-center justify-center mr-3">
                    <Bed className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Capacity Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <InputField
                      label="Total Beds"
                      name="numberOfBeds"
                      type="number"
                      icon={Bed}
                      value={formData.numberOfBeds}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <InputField
                      label="ICU Beds"
                      name="numberOfICUBeds"
                      type="number"
                      icon={Heart}
                      value={formData.numberOfICUBeds}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <InputField
                      label="Ambulances"
                      name="numberOfAmbulances"
                      type="number"
                      icon={Truck}
                      value={formData.numberOfAmbulances}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 flex items-center justify-center mr-3">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Services Offered</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter service name and press Enter"
                    />
                    <button
                      type="button"
                      onClick={handleAddService}
                      className="px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-[60px]">
                    {formData.servicesOffered.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-blue-50 border border-blue-200 text-blue-800 font-medium flex items-center space-x-2"
                      >
                        <span>{service}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveService(service)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                    {formData.servicesOffered.length === 0 && (
                      <p className="text-sm text-gray-500 py-4">No services added yet. Add services above.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Facilities Section */}
              <div className="shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 flex items-center justify-center mr-3">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Available Facilities</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Select all facilities available at this hospital</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {facilityTypes?.map((facility) => (
                    <label
                      key={facility}
                      className="flex items-center space-x-3 p-3 border border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.facilities.includes(facility)}
                        onChange={() => handleFacilityToggle(facility)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{facility}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Insurance Section */}
              <div className="shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 flex items-center justify-center mr-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Insurance Providers Accepted</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newInsurance}
                      onChange={(e) => setNewInsurance(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInsurance())}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter insurance provider and press Enter"
                    />
                    <button
                      type="button"
                      onClick={handleAddInsurance}
                      className="px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-[60px]">
                    {formData.insuranceProvidersAccepted.map((insurance, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-blue-50 border border-blue-200 text-blue-800 font-medium flex items-center space-x-2"
                      >
                        <Shield className="w-3 h-3" />
                        <span>{insurance}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveInsurance(insurance)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                    {formData.insuranceProvidersAccepted.length === 0 && (
                      <p className="text-sm text-gray-500 py-4">No insurance providers added yet. Add providers above.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-red-500">*</span> Required fields
                </div>
              </div>
              <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSaving}
                className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
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
                    {isEdit ? 'Save Changes' : 'Add Hospital'}
                  </>
                )}
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HospitalFormModal;
