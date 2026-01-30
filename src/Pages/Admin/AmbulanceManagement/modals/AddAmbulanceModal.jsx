import React, { useState } from 'react';
import {
  X,
  Save,
  Truck,
  MapPin,
  Phone,
  Shield,
  Fuel,
  Users,
  Calendar,
  FileText,
  Plus
} from 'lucide-react';

const AddAmbulanceModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    vehiclePlate: '',
    registrationNumber: '',
    model: '',
    year: '',
    type: 'basic_life_support',
    status: 'AVAILABLE',
    fuelType: 'DIESEL',
    capacity: '',
    equippedForICU: false,
    gpsEnabled: true,
    location: '',
    driverName: '',
    driverPhone: '',
    medicName: '',
    insurancePolicyNumber: '',
    insuranceProvider: '',
    lastMaintenance: '',
    nextMaintenance: '',
    mileage: '',
    fuelLevel: '100',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.vehiclePlate.trim()) newErrors.vehiclePlate = 'Vehicle plate is required';
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.capacity) newErrors.capacity = 'Capacity is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Generate new ambulance object
    const newAmbulance = {
      id: Date.now(),
      ...formData,
      totalTrips: 0,
      avgResponseTime: '0 min',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(newAmbulance);
    onClose();
  };

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
                <Plus className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Add New Ambulance</h2>
              <p className="text-sm text-white/80">Register a new ambulance to the fleet</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vehicle Information Section */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-blue-600" />
                Vehicle Information
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Plate *
              </label>
              <input
                type="text"
                name="vehiclePlate"
                value={formData.vehiclePlate}
                onChange={handleChange}
                placeholder="e.g., AMB-001-NB"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
              {errors.vehiclePlate && <p className="text-red-500 text-xs mt-1">{errors.vehiclePlate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Number *
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="e.g., KCB 123A"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
              {errors.registrationNumber && <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g., Toyota Hiace"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
              {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g., 2023"
                min="2000"
                max="2030"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
              {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              >
                <option value="advanced_life_support">Advanced Life Support</option>
                <option value="basic_life_support">Basic Life Support</option>
                <option value="critical_care">Critical Care</option>
                <option value="patient_transport">Patient Transport</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              >
                <option value="AVAILABLE">Available</option>
                <option value="BUSY">Busy</option>
                <option value="MAINTENANCE">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type *
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              >
                <option value="DIESEL">Diesel</option>
                <option value="PETROL">Petrol</option>
                <option value="ELECTRIC">Electric</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity (Patients) *
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g., 2"
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
              {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>}
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="equippedForICU"
                  checked={formData.equippedForICU}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-700"
                />
                <span className="text-sm font-medium text-gray-700">ICU Equipped</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="gpsEnabled"
                  checked={formData.gpsEnabled}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-700"
                />
                <span className="text-sm font-medium text-gray-700">GPS Enabled</span>
              </label>
            </div>

            {/* Current Assignment Section */}
            <div className="col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Initial Assignment (Optional)
              </h3>
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
                placeholder="e.g., Nairobi Central Station"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Driver Name
              </label>
              <input
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                placeholder="e.g., John Kamau"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Driver Phone
              </label>
              <input
                type="tel"
                name="driverPhone"
                value={formData.driverPhone}
                onChange={handleChange}
                placeholder="e.g., +254700123456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medic/Paramedic Name
              </label>
              <input
                type="text"
                name="medicName"
                value={formData.medicName}
                onChange={handleChange}
                placeholder="e.g., Dr. Sarah Kimani"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            {/* Insurance Details Section */}
            <div className="col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Insurance Details
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Provider
              </label>
              <input
                type="text"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
                placeholder="e.g., AAR Insurance"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Policy Number
              </label>
              <input
                type="text"
                name="insurancePolicyNumber"
                value={formData.insurancePolicyNumber}
                onChange={handleChange}
                placeholder="e.g., POL-2024-001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            {/* Maintenance Information Section */}
            <div className="col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Maintenance Information
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Maintenance Date
              </label>
              <input
                type="date"
                name="lastMaintenance"
                value={formData.lastMaintenance}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Maintenance Date
              </label>
              <input
                type="date"
                name="nextMaintenance"
                value={formData.nextMaintenance}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Mileage (km)
              </label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                placeholder="e.g., 45000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Level (%)
              </label>
              <input
                type="number"
                name="fuelLevel"
                value={formData.fuelLevel}
                onChange={handleChange}
                min="0"
                max="100"
                placeholder="e.g., 85"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
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
              Add Ambulance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAmbulanceModal;
