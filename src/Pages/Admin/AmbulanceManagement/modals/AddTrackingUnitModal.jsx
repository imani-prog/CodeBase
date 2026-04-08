import React, { useState } from 'react';
import {
  X,
  Navigation,
  MapPin,
  Truck,
  AlertCircle,
  Target
} from 'lucide-react';

const AddTrackingUnitModal = ({ ambulances, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    vehicleId: '',
    latitude: '',
    longitude: '',
    speed: '0',
    heading: '0'
  });

  const [errors, setErrors] = useState({});

  // Filter available ambulances (those that are busy/dispatched but not already being tracked)
  const availableAmbulances = ambulances.filter(
    a => (a.status === 'BUSY' || a.status === 'ON_CALL' || a.status === 'DISPATCHED')
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.vehicleId) newErrors.vehicleId = 'Please select an ambulance';
    if (!formData.latitude || isNaN(formData.latitude)) newErrors.latitude = 'Valid latitude required';
    if (!formData.longitude || isNaN(formData.longitude)) newErrors.longitude = 'Valid longitude required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    onSave({
      vehicleId: formData.vehicleId,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      speed: parseFloat(formData.speed),
      heading: parseFloat(formData.heading),
    });
    onClose();
  };

  // Get current location using browser geolocation
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get current location. Please enter coordinates manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
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
                <Navigation className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Add Unit to Live Tracking</h2>
              <p className="text-sm text-white/80">Start tracking a dispatched ambulance</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {availableAmbulances.length === 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-yellow-800">No Available Ambulances</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    No ambulances are currently dispatched or busy. Only ambulances with BUSY or ON_CALL status can be added to live tracking.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ambulance Selection */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-blue-600" />
                Select Ambulance
              </h3>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ambulance Unit *
              </label>
              <select
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                <option value="">Select an ambulance...</option>
                {availableAmbulances.map(ambulance => (
                  <option key={ambulance.vehicleNumber || ambulance.id} value={ambulance.vehicleNumber}>
                    {ambulance.vehiclePlate} - {ambulance.vehicleNumber} ({ambulance.currentDriver || 'No driver'})
                  </option>
                ))}
              </select>
              {errors.vehicleId && <p className="text-red-500 text-xs mt-1">{errors.vehicleId}</p>}
            </div>

            {/* Location Information */}
            <div className="col-span-2 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Current Location
                </h3>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Use Current Location
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude *
              </label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="e.g., -1.2921"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              {errors.latitude && <p className="text-red-500 text-xs mt-1">{errors.latitude}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude *
              </label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="e.g., 36.8219"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              {errors.longitude && <p className="text-red-500 text-xs mt-1">{errors.longitude}</p>}
            </div>

            {/* Vehicle Status Information */}
            <div className="col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Vehicle Status (Optional)
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speed (km/h)
              </label>
              <input
                type="number"
                name="speed"
                value={formData.speed}
                onChange={handleChange}
                min="0"
                max="200"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading (degrees)
              </label>
              <input
                type="number"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                min="0"
                max="359"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
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
              disabled={availableAmbulances.length === 0}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Start Tracking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrackingUnitModal;
