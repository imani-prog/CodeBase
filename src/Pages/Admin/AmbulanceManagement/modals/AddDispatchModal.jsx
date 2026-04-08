import React, { useState } from 'react';
import {
  X,
  Save,
  Siren,
  MapPin,
  Users,
  Phone,
  AlertTriangle,
  Clock,
  FileText,
  Plus,
  Truck
} from 'lucide-react';

const AddDispatchModal = ({ ambulances, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    priority: 'HIGH',
    incidentType: 'TRAFFIC_ACCIDENT',
    patientName: '',
    patientId: '',
    patientAge: '',
    patientGender: 'MALE',
    condition: '',
    pickupLocation: '',
    pickupAddressLine1: '',
    pickupAddressLine2: '',
    pickupCity: '',
    pickupState: '',
    pickupPostalCode: '',
    pickupLatitude: '',
    pickupLongitude: '',
    destinationHospital: '',
    destinationAddress: '',
    destinationCity: '',
    callerName: '',
    callerPhone: '',
    callerRelation: '',
    selectedAmbulance: '',
    specialInstructions: '',
    requiresICU: false,
    requiresOxygen: false,
    requiresStretcher: true
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
    
    if (!formData.patientName.trim()) newErrors.patientName = 'Patient name is required';
    if (!formData.patientAge) newErrors.patientAge = 'Patient age is required';
    if (!formData.condition.trim()) newErrors.condition = 'Medical condition is required';
    if (!formData.pickupAddressLine1.trim()) newErrors.pickupAddressLine1 = 'Pickup address is required';
    if (!formData.pickupCity.trim()) newErrors.pickupCity = 'City is required';
    if (!formData.callerName.trim()) newErrors.callerName = 'Caller name is required';
    if (!formData.callerPhone.trim()) newErrors.callerPhone = 'Caller phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
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
                <Siren className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Create New Emergency Dispatch</h2>
              <p className="text-sm text-white/80">Register and dispatch an emergency call</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Priority and Incident Type Section */}
            <div className="col-span-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                Emergency Details
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level *
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Type *
              </label>
              <select
                name="incidentType"
                value={formData.incidentType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                <option value="TRAFFIC_ACCIDENT">Traffic Accident</option>
                <option value="CARDIAC_ARREST">Cardiac Arrest</option>
                <option value="RESPIRATORY_DISTRESS">Respiratory Distress</option>
                <option value="STROKE">Stroke</option>
                <option value="TRAUMA">Trauma</option>
                <option value="OBSTETRIC_EMERGENCY">Obstetric Emergency</option>
                <option value="BURN_INJURY">Burn Injury</option>
                <option value="POISONING">Poisoning</option>
                <option value="SCHEDULED_TRANSPORT">Scheduled Transport</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Ambulance
              </label>
              <select
                name="selectedAmbulance"
                value={formData.selectedAmbulance}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                <option value="">Auto-Select Nearest</option>
                {ambulances?.filter(a => a.status === 'AVAILABLE' || a.status === 'available').map(ambulance => (
                  <option key={ambulance.vehicleNumber || ambulance.id} value={ambulance.vehicleNumber || ambulance.vehiclePlate}>
                    {ambulance.vehiclePlate} - {ambulance.driverName || ambulance.currentDriver}
                  </option>
                ))}
              </select>
            </div>

            {/* Patient Information Section */}
            <div className="col-span-3 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Patient Information
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient ID
              </label>
              <input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                placeholder="PAT-2024-XXX (Optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name *
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleChange}
                placeholder="Age in years"
                min="0"
                max="150"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              {errors.patientAge && <p className="text-red-500 text-xs mt-1">{errors.patientAge}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                name="patientGender"
                value={formData.patientGender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Condition / Symptoms *
              </label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                placeholder="Describe the medical condition or symptoms"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition}</p>}
            </div>

            {/* Special Requirements */}
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Special Requirements
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="requiresICU"
                    checked={formData.requiresICU}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-700"
                  />
                  <span className="text-sm text-gray-700">ICU Equipment</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="requiresOxygen"
                    checked={formData.requiresOxygen}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-700"
                  />
                  <span className="text-sm text-gray-700">Oxygen Support</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="requiresStretcher"
                    checked={formData.requiresStretcher}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-700"
                  />
                  <span className="text-sm text-gray-700">Stretcher</span>
                </label>
              </div>
            </div>

            {/* Pickup Location Section */}
            <div className="col-span-3 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Pickup Location
              </h3>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 1 *
              </label>
              <input
                type="text"
                name="pickupAddressLine1"
                value={formData.pickupAddressLine1}
                onChange={handleChange}
                placeholder="Street address, building name, landmark"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              {errors.pickupAddressLine1 && <p className="text-red-500 text-xs mt-1">{errors.pickupAddressLine1}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 2
              </label>
              <input
                type="text"
                name="pickupAddressLine2"
                value={formData.pickupAddressLine2}
                onChange={handleChange}
                placeholder="Apartment, floor, unit"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="pickupCity"
                value={formData.pickupCity}
                onChange={handleChange}
                placeholder="City"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              {errors.pickupCity && <p className="text-red-500 text-xs mt-1">{errors.pickupCity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/County
              </label>
              <input
                type="text"
                name="pickupState"
                value={formData.pickupState}
                onChange={handleChange}
                placeholder="State or County"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="pickupPostalCode"
                value={formData.pickupPostalCode}
                onChange={handleChange}
                placeholder="Postal code"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* Destination Section */}
            <div className="col-span-3 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-blue-600" />
                Destination (Optional)
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hospital/Facility Name
              </label>
              <input
                type="text"
                name="destinationHospital"
                value={formData.destinationHospital}
                onChange={handleChange}
                placeholder="e.g., Kenyatta National Hospital"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination Address
              </label>
              <input
                type="text"
                name="destinationAddress"
                value={formData.destinationAddress}
                onChange={handleChange}
                placeholder="Full address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination City
              </label>
              <input
                type="text"
                name="destinationCity"
                value={formData.destinationCity}
                onChange={handleChange}
                placeholder="City"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* Caller Information Section */}
            <div className="col-span-3 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-600" />
                Caller Information
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caller Name *
              </label>
              <input
                type="text"
                name="callerName"
                value={formData.callerName}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              {errors.callerName && <p className="text-red-500 text-xs mt-1">{errors.callerName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caller Phone *
              </label>
              <input
                type="tel"
                name="callerPhone"
                value={formData.callerPhone}
                onChange={handleChange}
                placeholder="+254700123456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              {errors.callerPhone && <p className="text-red-500 text-xs mt-1">{errors.callerPhone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relation to Patient
              </label>
              <input
                type="text"
                name="callerRelation"
                value={formData.callerRelation}
                onChange={handleChange}
                placeholder="e.g., Family member, Witness"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* Special Instructions */}
            <div className="col-span-3 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Additional Information
              </h3>
            </div>

            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions / Notes
              </label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                rows="3"
                placeholder="Any special instructions, landmarks, access codes, or important notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
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
              className="flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Siren className="w-4 h-4 mr-2" />
              Create Dispatch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDispatchModal;
