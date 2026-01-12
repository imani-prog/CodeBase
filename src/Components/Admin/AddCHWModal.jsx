import React, { useState } from 'react';
import { X, Save, UserPlus, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const AddCHWModal = ({ showModal, setShowModal, onSaveCHW }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    secondaryPhone: '',
    
    // Address Information
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    
    // Professional Information
    specialization: '',
    startDate: '',
    patients: 0,
    status: 'AVAILABLE',
    
    // Hospital Assignment
    hospitalId: '',
    hospitalName: '',
    region: ''
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
    
    // Step 1 - Personal Information
    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    }
    
    // Step 2 - Address Information (Optional)
    // No required fields
    
    // Step 3 - Professional Information
    if (currentStep === 3) {
      if (!formData.region.trim()) newErrors.region = 'Region is required';
      if (!formData.status) newErrors.status = 'Status is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
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

    // Generate CHW code and avatar
    const chwCode = `CHW-${String(Date.now()).slice(-6)}`;
    const name = `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`;
    const avatar = formData.firstName[0] + formData.lastName[0];

    const newCHW = {
      id: Date.now(),
      code: chwCode,
      name,
      avatar: avatar.toUpperCase(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      monthlyVisits: 0,
      successRate: 0,
      responseTime: '0hrs',
      rating: 0,
      lastActivity: new Date().toISOString().split('T')[0],
      lastStatusUpdate: new Date().toISOString().split('T')[0]
    };

    onSaveCHW?.(newCHW);
    setShowModal(false);
    
    // Reset form
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      secondaryPhone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      specialization: '',
      startDate: '',
      patients: 0,
      status: 'AVAILABLE',
      hospitalId: '',
      hospitalName: '',
      region: ''
    });
    setCurrentStep(1);
    setErrors({});
  };

  if (!showModal) return null;

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)} />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-4xl w-full overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="relative px-8 py-5 bg-blue-950 text-white">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <UserPlus className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Add New CHW</h2>
                <p className="text-sm">Register a new Community Health Worker</p>
              </div>
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep >= step 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      currentStep >= step ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {step === 1 && 'Personal'}
                      {step === 2 && 'Address'}
                      {step === 3 && 'Professional'}
                    </span>
                  </div>
                  {step < 3 && (
                    <div className={`h-1 flex-1 mx-2 rounded transition-all ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Form Body - Scrollable */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="px-8 py-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          errors.firstName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="Enter middle name (optional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          errors.lastName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          errors.phone ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="+254 712 345 678"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary Phone
                      </label>
                      <input
                        type="tel"
                        name="secondaryPhone"
                        value={formData.secondaryPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="+254 712 345 678"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Address Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="Street address"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="Apartment, suite, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State/County
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="Enter state/county"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="Enter postal code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Professional Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Professional Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Region <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          errors.region ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter assigned region"
                      />
                      {errors.region && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.region}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialization
                      </label>
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="e.g., Maternal Health, Pediatrics"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Initial Patients Count
                      </label>
                      <input
                        type="number"
                        name="patients"
                        value={formData.patients}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent appearance-none ${
                          errors.status ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="AVAILABLE">Available</option>
                        <option value="BUSY">Busy</option>
                        <option value="ON_LEAVE">On Leave</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                      {errors.status && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.status}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hospital Name
                      </label>
                      <input
                        type="text"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="Enter hospital name"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center shadow-lg">
              <div className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </div>
              <div className="flex space-x-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex items-center px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                )}
                
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save CHW
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCHWModal;
