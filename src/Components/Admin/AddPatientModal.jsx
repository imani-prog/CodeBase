import React, { useState } from 'react';
import { X, Save, UserPlus, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const AddPatientModal = ({ showModal, setShowModal, onSavePatient }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    nationalId: '',
    maritalStatus: '',
    preferredLanguage: '',
    
    // Contact Information
    email: '',
    phone: '',
    secondaryPhone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    
    // Medical Information
    bloodType: '',
    allergies: '',
    medications: '',
    chronicConditions: '',
    
    // Insurance
    insuranceMemberId: '',
    insuranceProviderName: '',
    
    // Status and Preferences
    status: 'ACTIVE',
    consentToShareData: true,
    smsOptIn: false,
    emailOptIn: true,
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Step 1 - Personal Information (Required fields)
    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    // Step 2 - Contact Information (Required fields)
    if (currentStep === 2) {
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Calculate age from dateOfBirth for display purposes
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear() - 
                (today.getMonth() < birthDate.getMonth() || 
                 (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);

    // Generate avatar initials from name
    const avatar = (formData.firstName[0] + formData.lastName[0]).toUpperCase();

    const newPatient = {
      id: Date.now(),
      avatar,
      ...formData,
      age, // Calculated for display
      lastVisit: new Date().toISOString().split('T')[0],
      registrationDate: new Date().toLocaleDateString()
    };

    onSavePatient(newPatient);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
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
    setErrors({});
    setCurrentStep(1);
    setShowModal(false);
  };

  if (!showModal) return null;

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Basic details' },
    { number: 2, title: 'Contact', description: 'Contact information' },
    { number: 3, title: 'Emergency', description: 'Emergency contact' },
    { number: 4, title: 'Medical', description: 'Medical information' },
    { number: 5, title: 'Insurance', description: 'Insurance details' },
    { number: 6, title: 'Preferences', description: 'Preferences & notes' }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white shadow-2xl max-w-5xl w-full h-full sm:h-auto sm:max-h-[90vh] flex flex-col rounded-none sm:rounded-2xl">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-8 sm:py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Add New Patient</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="font-bold hover:text-red-600 hover:bg-red-300 rounded-full transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Progress Steps */}
        {/* Desktop: full step bar */}
        <div className="hidden sm:block px-8 py-3 bg-gray-50 border-b overflow-x-auto">
          <div className="flex items-center justify-between min-w-max">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    currentStep === step.number 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : currentStep > step.number 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  <p className="text-xs font-medium text-gray-900 mt-1">{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-16 mx-2 rounded transition-all ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Mobile: compact dot progress + progress bar */}
        <div className="sm:hidden px-4 py-3 bg-gray-50 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700">{steps[currentStep - 1].title}</span>
            <span className="text-xs text-gray-500">{currentStep} / {steps.length}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  currentStep > step.number
                    ? 'bg-green-500'
                    : currentStep === step.number
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={currentStep === 6 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="p-4 sm:p-8">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Enter middle name (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                        errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.dateOfBirth}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                        errors.gender ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                    {errors.gender && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.gender}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      National ID
                    </label>
                    <input
                      type="text"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Enter national ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Marital Status
                    </label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      <option value="SINGLE">Single</option>
                      <option value="MARRIED">Married</option>
                      <option value="DIVORCED">Divorced</option>
                      <option value="WIDOWED">Widowed</option>
                      <option value="SEPARATED">Separated</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Language
                    </label>
                    <input
                      type="text"
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="e.g., English, Swahili"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+254 712 345 678"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Secondary Phone
                    </label>
                    <input
                      type="tel"
                      name="secondaryPhone"
                      value={formData.secondaryPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="+254 712 345 678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Enter city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State/County
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Enter state/county"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Enter postal code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Enter country"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Emergency Contact */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Enter contact name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Relationship
                    </label>
                    <input
                      type="text"
                      name="emergencyContactRelation"
                      value={formData.emergencyContactRelation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="e.g., Spouse, Parent, Sibling"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="+254 712 345 678"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Medical Information */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Blood Type
                    </label>
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    >
                      <option value="">Select blood type</option>
                      <option value="A_POS">A+</option>
                      <option value="A_NEG">A-</option>
                      <option value="B_POS">B+</option>
                      <option value="B_NEG">B-</option>
                      <option value="AB_POS">AB+</option>
                      <option value="AB_NEG">AB-</option>
                      <option value="O_POS">O+</option>
                      <option value="O_NEG">O-</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Allergies
                    </label>
                    <textarea
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="List any known allergies (medications, food, environmental)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Medications
                    </label>
                    <textarea
                      name="medications"
                      value={formData.medications}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="List current medications and dosages"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chronic Conditions
                    </label>
                    <textarea
                      name="chronicConditions"
                      value={formData.chronicConditions}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="List any chronic conditions (e.g., Hypertension, Diabetes)"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Insurance Information */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Insurance Provider Name
                    </label>
                    <input
                      type="text"
                      name="insuranceProviderName"
                      value={formData.insuranceProviderName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Enter insurance provider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Insurance Member ID
                    </label>
                    <input
                      type="text"
                      name="insuranceMemberId"
                      value={formData.insuranceMemberId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Enter member ID"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Preferences & Notes */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Patient Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="consentToShareData"
                        checked={formData.consentToShareData}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Consent to share data with healthcare providers</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="smsOptIn"
                        checked={formData.smsOptIn}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Opt-in for SMS notifications</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="emailOptIn"
                        checked={formData.emailOptIn}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Opt-in for email notifications</span>
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      placeholder="Any additional information or notes about the patient"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="bg-gray-50 px-4 py-3 sm:px-8 sm:py-4 border-t border-gray-200 flex justify-between items-center gap-2">
          <button
            type="button"
            onClick={currentStep === 1 ? handleClose : handlePrevious}
            className="px-6 py-2.5 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            {currentStep === 1 ? (
              <>
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </>
            )}
          </button>

          <div className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </div>

          <button
            type="button"
            onClick={currentStep === 6 ? handleSubmit : handleNext}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            {currentStep === 6 ? (
              <>
                <Save className="w-4 h-4" />
                <span>Save Patient</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;
