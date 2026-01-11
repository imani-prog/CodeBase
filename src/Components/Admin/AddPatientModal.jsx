import React, { useState } from 'react';
import { X, Save, UserPlus, AlertCircle } from 'lucide-react';

const AddPatientModal = ({ showModal, setShowModal, onSavePatient }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    condition: '',
    status: 'Active',
    nextAppointment: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Generate avatar initials from name
    const nameParts = formData.name.split(' ');
    const avatar = nameParts.length >= 2 
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : formData.name.substring(0, 2).toUpperCase();

    const newPatient = {
      id: Date.now(),
      avatar,
      ...formData,
      lastVisit: new Date().toISOString().split('T')[0],
      registrationDate: new Date().toLocaleDateString()
    };

    onSavePatient(newPatient);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      condition: '',
      status: 'Active',
      nextAppointment: ''
    });
    setErrors({});
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-10 py-6 flex items-center justify-between z-10">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Add New Patient</h2>
              <p className="text-gray-600 mt-1">Enter patient information to create a new record</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="p-10 border-b border-gray-200">
            <h3 className="text-2xl font-semibold mb-8 flex items-center">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  className={`w-full px-5 py-4 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter age"
                />
                {errors.age && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.age}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.gender}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Contact & Medical Information Section */}
          <div className="p-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              Contact & Medical Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Primary Condition */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Primary Condition
                </label>
                <input
                  type="text"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
                  placeholder="Enter primary condition"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Critical">Critical</option>
                  <option value="Recovering">Recovering</option>
                </select>
              </div>

              {/* Next Appointment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Next Appointment
                </label>
                <input
                  type="date"
                  name="nextAppointment"
                  value={formData.nextAppointment}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-5 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-gray-50 px-10 py-8 flex justify-end space-x-4 rounded-b-2xl border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-colors text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-3 text-base shadow-lg hover:shadow-xl"
            >
              <Save className="w-5 h-5" />
              <span>Save Patient</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
