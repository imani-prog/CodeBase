import React, { useMemo, useState } from 'react';
import { X, Calendar, Clock, Video, Phone, MessageSquare, User, Stethoscope, AlertCircle, FileText } from 'lucide-react';

const ScheduleSessionModal = ({ isOpen, onClose, onSchedule, patients = [], doctors = [], patientsLoading = false }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    doctorId: '',
    doctorName: '',
    sessionType: 'consultation',
    platform: 'video',
    date: '',
    time: '',
    duration: '30',
    priority: 'normal',
    symptoms: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const sessionTypes = [
    { value: 'consultation', label: 'Initial Consultation' },
    { value: 'follow-up', label: 'Follow-up Visit' },
    { value: 'emergency', label: 'Emergency Consultation' },
    { value: 'prescription', label: 'Prescription Renewal' },
    { value: 'test-review', label: 'Test Result Review' }
  ];

  const platforms = [
    { value: 'video', label: 'Video Call', icon: Video },
    { value: 'audio', label: 'Audio Call', icon: Phone },
    { value: 'messaging', label: 'Messaging', icon: MessageSquare }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'normal', label: 'Normal', color: 'text-blue-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' }
  ];

  const durations = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' }
  ];

  const fallbackDoctors = useMemo(() => ([
    { id: 'DOC-001', name: 'Dr. Sarah Mitchell', specialty: 'General Medicine' },
    { id: 'DOC-002', name: 'Dr. James Mwangi', specialty: 'Cardiology' },
    { id: 'DOC-003', name: 'Dr. Linda Chen', specialty: 'Pediatrics' },
    { id: 'DOC-004', name: 'Dr. Peter Njoroge', specialty: 'Dermatology' },
    { id: 'DOC-005', name: 'Dr. Grace Kamau', specialty: 'Psychiatry' }
  ]), []);

  const resolvedDoctors = doctors.length > 0 ? doctors : fallbackDoctors;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const doctor = resolvedDoctors.find((d) => String(d.id) === String(doctorId));
    setFormData(prev => ({
      ...prev,
      doctorId: doctorId,
      doctorName: doctor ? doctor.name : ''
    }));
    if (errors.doctorId) {
      setErrors(prev => ({ ...prev, doctorId: '' }));
    }
  };

  const handlePatientChange = (e) => {
    const patientId = e.target.value;
    const patient = patients.find((p) => String(p.id) === String(patientId));
    setFormData(prev => ({
      ...prev,
      patientId,
      patientName: patient ? patient.name : ''
    }));
    if (errors.patientId) {
      setErrors(prev => ({ ...prev, patientId: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.patientId) {
      newErrors.patientId = 'Please select a patient';
    }
    if (!formData.doctorId) {
      newErrors.doctorId = 'Please select a doctor';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    if (!formData.sessionType) {
      newErrors.sessionType = 'Session type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSchedule(formData);
      onClose();
      // Reset form
      setFormData({
        patientId: '',
        patientName: '',
        doctorId: '',
        doctorName: '',
        sessionType: 'consultation',
        platform: 'video',
        date: '',
        time: '',
        duration: '30',
        priority: 'normal',
        symptoms: '',
        notes: ''
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-4xl w-full overflow-hidden max-h-[90vh] flex flex-col">
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
                <Calendar className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Schedule Telemedicine Session</h2>
                <p className="text-sm">Create a new virtual healthcare appointment</p>
              </div>
            </div>
          </div>

          {/* Form - Scrollable */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 bg-white">
            <div className="space-y-5">
          {/* Patient Information */}
          <div className="pb-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Patient <span className="text-red-500">*</span>
                </label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handlePatientChange}
                  disabled={patientsLoading}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.patientId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{patientsLoading ? 'Loading patients…' : 'Choose a patient…'}</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} · {patient.patientId || patient.id}
                    </option>
                  ))}
                </select>
                {errors.patientId && (
                  <p className="text-red-500 text-xs mt-1">{errors.patientId}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  readOnly
                  placeholder="Auto-filled from selection"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Doctor Selection */}
          <div className="pb-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
              <Stethoscope className="w-5 h-5 text-blue-600 mr-2" />
              Doctor Assignment
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor <span className="text-red-500">*</span>
              </label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleDoctorChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.doctorId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Choose a doctor...</option>
                {resolvedDoctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
              {errors.doctorId && (
                <p className="text-red-500 text-xs mt-1">{errors.doctorId}</p>
              )}
            </div>
          </div>

          {/* Session Details */}
          <div className="pb-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
              <Video className="w-5 h-5 text-blue-600 mr-2" />
              Session Configuration
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sessionTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {durations.map(duration => (
                      <option key={duration.value} value={duration.value}>
                        {duration.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Communication Platform
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {platforms.map(platform => {
                    const Icon = platform.icon;
                    return (
                      <button
                        key={platform.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, platform: platform.value }))}
                        className={`flex flex-col items-center justify-center p-3 border-2 rounded-lg transition-all ${
                          formData.platform === platform.value
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-5 h-5 mb-1" />
                        <span className="text-xs font-medium">{platform.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule & Priority */}
          <div className="pb-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              Date & Time
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="pb-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              Additional Details
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms / Reason for Visit
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Describe symptoms or reason for consultation..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Any additional information..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Alert */}
          <div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 flex items-start rounded-r\">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Patient will receive confirmation email and SMS. Doctor will be notified 15 minutes before the session.
              </p>
            </div>
          </div>
            </div>
          </form>

          {/* Footer Actions */}
          <div className="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center font-medium shadow-sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSessionModal;
