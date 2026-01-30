import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  UserCheck,
  Phone,
  Mail,
  Shield,
  Clock,
  Award,
  FileText,
  Plus
} from 'lucide-react';

const EditDriverModal = ({ driver, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    phone: '',
    email: '',
    status: '',
    experience: '',
    certifications: [],
    currentVehicle: '',
    location: '',
    shiftStart: '',
    shiftEnd: '',
    emergencyContact: '',
    notes: ''
  });

  const [certificationInput, setCertificationInput] = useState('');

  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name || '',
        licenseNumber: driver.licenseNumber || '',
        phone: driver.phone || '',
        email: driver.email || '',
        status: driver.status || 'off_duty',
        experience: driver.experience || '',
        certifications: driver.certifications || [],
        currentVehicle: driver.currentVehicle || '',
        location: driver.location || '',
        shiftStart: driver.shiftStart || '',
        shiftEnd: driver.shiftEnd || '',
        emergencyContact: driver.emergencyContact || '',
        notes: driver.notes || ''
      });
    }
  }, [driver]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCertification = () => {
    if (certificationInput.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, certificationInput.trim()]
      }));
      setCertificationInput('');
    }
  };

  const handleRemoveCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...driver, ...formData });
  };

  if (!driver) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative px-8 py-6 bg-blue-950 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Edit Driver</h2>
              <p className="text-sm text-white/80">{driver.name}</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Number *
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g., 5 years"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            {/* Work Assignment Section */}
            <div className="col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Work Assignment
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              >
                <option value="on_duty">On Duty</option>
                <option value="off_duty">Off Duty</option>
                <option value="on_trip">On Trip</option>
                <option value="on_break">On Break</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Vehicle
              </label>
              <input
                type="text"
                name="currentVehicle"
                value={formData.currentVehicle}
                onChange={handleChange}
                placeholder="e.g., AMB-001-NB"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Nairobi Central Hospital"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift Start Time
              </label>
              <input
                type="time"
                name="shiftStart"
                value={formData.shiftStart}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift End Time
              </label>
              <input
                type="time"
                name="shiftEnd"
                value={formData.shiftEnd}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            {/* Certifications Section */}
            <div className="col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Certifications
              </h3>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Certifications
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={certificationInput}
                  onChange={(e) => setCertificationInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
                  placeholder="e.g., EMT-Basic, CPR Certified"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              {formData.certifications.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      <span>{cert}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCertification(index)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Notes */}
            <div className="col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Additional Information
              </h3>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Any additional notes or special instructions..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDriverModal;
