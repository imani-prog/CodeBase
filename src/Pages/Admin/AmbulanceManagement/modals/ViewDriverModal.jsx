import React from 'react';
import {
  X,
  UserCheck,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Award,
  Briefcase,
  Star,
  Route,
  Shield,
  FileText
} from 'lucide-react';

const ViewDriverModal = ({ driver, onClose, getStatusColor }) => {
  if (!driver) return null;

  const experienceText = driver.experience
    || (driver.yearsOfExperience !== null && driver.yearsOfExperience !== undefined
      ? `${driver.yearsOfExperience} years`
      : 'Not set');

  const formatDateTime = (value) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'N/A';
    return date.toLocaleString();
  };

  const formatLabel = (key) => {
    const spaced = String(key)
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : key;
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || value === '') return 'N/A';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'N/A';
      const isPrimitiveList = value.every((item) => ['string', 'number', 'boolean'].includes(typeof item));
      return isPrimitiveList ? value.join(', ') : JSON.stringify(value, null, 2);
    }
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const renderedKeys = new Set([
    'id',
    'name',
    'driverName',
    'firstName',
    'lastName',
    'licenseNumber',
    'phone',
    'driverPhone',
    'email',
    'status',
    'yearsOfExperience',
    'experienceYears',
    'experience',
    'certifications',
    'currentVehicle',
    'vehiclePlate',
    'currentLocation',
    'location',
    'shiftStart',
    'shiftEnd',
    'totalTrips',
    'totalDispatches',
    'rating',
    'averageRating',
    'lastTrip',
    'lastTripTime',
    'emergencyContact',
    'dateOfBirth',
    'hireDate',
    'createdAt',
    'updatedAt',
    'notes',
    'avatar',
    'avatarUrl',
    'currentAmbulance',
    'assignedAmbulance',
    'ambulance',
  ]);

  const currentAmbulanceDetails = driver.backend?.currentAmbulance && typeof driver.backend.currentAmbulance === 'object'
    ? Object.entries(driver.backend.currentAmbulance)
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
    : [];

  const extraBackendFields = driver.backend
    ? Object.entries(driver.backend)
      .filter(([key, value]) => !renderedKeys.has(key) && value !== null && value !== undefined && value !== '')
    : [];

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
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30 overflow-hidden">
                {driver.avatar ? (
                  <img
                    src={driver.avatar}
                    alt={driver.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver.name)}&background=3B82F6&color=fff&size=64`;
                    }}
                  />
                ) : (
                  <UserCheck className="w-8 h-8 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{driver.name}</h2>
              <p className="text-sm text-white/80">License: {driver.licenseNumber} • {experienceText} experience</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Status Badge */}
          <div className="mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(driver.status)}`}>
              {driver.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="text-sm font-medium">{driver.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {driver.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {driver.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">License Number</p>
                  <p className="text-sm font-medium flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    {driver.licenseNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Emergency Contact</p>
                  <p className="text-sm font-medium">{driver.emergencyContact}</p>
                </div>
              </div>
            </div>

            {/* Current Assignment */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                Current Assignment
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Assigned Vehicle</p>
                  <p className="text-sm font-medium">{driver.currentVehicle || 'Not assigned'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Assigned Ambulance ID</p>
                  <p className="text-sm font-medium">{driver.currentAmbulance?.id ?? 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Assigned Ambulance Status</p>
                  <p className="text-sm font-medium">{driver.currentAmbulance?.status || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Base Location</p>
                  <p className="text-sm font-medium flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {driver.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Shift Schedule</p>
                  <p className="text-sm font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {driver.shiftStart} - {driver.shiftEnd}
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Professional Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="text-sm font-medium">{experienceText}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Certifications</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {driver.certifications && driver.certifications.length > 0 ? (
                      driver.certifications.map((cert, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {cert}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">No certifications listed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Statistics */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-600" />
                Performance
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Trips</span>
                  <span className="text-sm font-medium flex items-center">
                    <Route className="w-4 h-4 mr-1" />
                    {driver.totalTrips}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <span className="text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {driver.rating || 'N/A'}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Trip</p>
                  <p className="text-sm font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {driver.lastTrip || 'No trips yet'}
                  </p>
                </div>
              </div>
            </div>

            {/* Backend Fields */}
            <div className="border border-gray-200 p-4 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Additional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Driver ID</p>
                  <p className="text-sm font-medium">{driver.id ?? 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date of Birth</p>
                  <p className="text-sm font-medium">{driver.dateOfBirth || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hire Date</p>
                  <p className="text-sm font-medium">{driver.hireDate || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Years of Experience</p>
                  <p className="text-sm font-medium">{driver.yearsOfExperience ?? 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Record Created</p>
                  <p className="text-sm font-medium">{formatDateTime(driver.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="text-sm font-medium">{formatDateTime(driver.updatedAt)}</p>
                </div>
              </div>

              {currentAmbulanceDetails.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Current Ambulance Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentAmbulanceDetails.map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-gray-500">{formatLabel(key)}</p>
                        <p className="text-sm font-medium whitespace-pre-wrap break-words">{formatValue(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {extraBackendFields.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">More Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {extraBackendFields.map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-gray-500">{formatLabel(key)}</p>
                        <p className="text-sm font-medium whitespace-pre-wrap break-words">{formatValue(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {driver.notes && (
            <div className="mt-6 border-l-4 border-blue-500 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Notes
              </h3>
              <p className="text-sm text-gray-700">{driver.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 flex justify-end space-x-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDriverModal;
