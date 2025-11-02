import React from 'react';
import {
  X,
  Truck,
  MapPin,
  Phone,
  Calendar,
  Fuel,
  Users,
  Shield,
  Activity,
  Clock,
  Route,
  Heart,
  Globe,
  Wrench,
  FileText
} from 'lucide-react';

const ViewAmbulanceModal = ({ ambulance, onClose, getStatusColor, getTypeIcon }) => {
  if (!ambulance) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <Truck className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{ambulance.vehiclePlate}</h2>
                <p className="">Registration: {ambulance.registrationNumber}</p>
                <p className="text-sm">{ambulance.model} ({ambulance.year})</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Status Badge */}
          <div className="mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(ambulance.status)}`}>
              {ambulance.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vehicle Information */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-blue-600" />
                Vehicle Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(ambulance.type)}
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-medium capitalize">{ambulance.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Model</p>
                  <p className="text-sm font-medium">{ambulance.model}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Year</p>
                  <p className="text-sm font-medium">{ambulance.year}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Registration Number</p>
                  <p className="text-sm font-medium">{ambulance.registrationNumber}</p>
                </div>
              </div>
            </div>

            {/* Capacity & Specifications */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Specifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Fuel Type</span>
                  <span className="text-sm font-medium">{ambulance.fuelType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Capacity</span>
                  <span className="text-sm font-medium flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {ambulance.capacity} persons
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ICU Equipped</span>
                  <span className={`text-sm font-medium ${ambulance.equippedForICU ? 'text-blue-600' : 'text-gray-400'}`}>
                    {ambulance.equippedForICU ? '✓ Yes' : '✗ No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">GPS Enabled</span>
                  <span className={`text-sm font-medium ${ambulance.gpsEnabled ? 'text-blue-600' : 'text-gray-400'}`}>
                    {ambulance.gpsEnabled ? '✓ Yes' : '✗ No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mileage</span>
                  <span className="text-sm font-medium">{ambulance.mileage.toLocaleString()} km</span>
                </div>
              </div>
            </div>

            {/* Current Location & Driver */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Current Assignment
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium">{ambulance.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Driver</p>
                  <p className="text-sm font-medium">{ambulance.driverName}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Phone className="w-3 h-3 mr-1" />
                    {ambulance.driverPhone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Medical Personnel</p>
                  <p className="text-sm font-medium">{ambulance.medicName}</p>
                </div>
              </div>
            </div>

            {/* Insurance Information */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Insurance Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Provider</p>
                  <p className="text-sm font-medium">{ambulance.insuranceProvider}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Policy Number</p>
                  <p className="text-sm font-medium">{ambulance.insurancePolicyNumber}</p>
                </div>
              </div>
            </div>

            {/* Maintenance Information */}
            <div className="border border-gray-200  p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Wrench className="w-5 h-5 mr-2 text-blue-600" />
                Maintenance
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Last Maintenance</p>
                  <p className="text-sm font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {ambulance.lastMaintenance}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Next Maintenance</p>
                  <p className="text-sm font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {ambulance.nextMaintenance}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Statistics */}
            <div className="border border-gray-200  p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                Performance
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Dispatches</span>
                  <span className="text-sm font-medium">{ambulance.totalDispatches}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Response Time</span>
                  <span className="text-sm font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {ambulance.averageResponseTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Dispatch</span>
                  <span className="text-sm font-medium">{ambulance.lastDispatch}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fuel Level */}
          <div className="mt-6 border border-gray-200  p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Fuel className="w-5 h-5 mr-2 text-blue-600" />
              Fuel Level
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current Level</span>
                <span className="font-medium">{ambulance.fuelLevel}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    ambulance.fuelLevel > 50
                      ? 'bg-green-500'
                      : ambulance.fuelLevel > 25
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${ambulance.fuelLevel}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Equipment List */}
          <div className="mt-6 border border-gray-200  p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-blue-600" />
              Medical Equipment
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {ambulance.equipment.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {ambulance.notes && (
            <div className="mt-6 border-l-4 border-blue-500 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Notes
              </h3>
              <p className="text-sm text-gray-700">{ambulance.notes}</p>
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

export default ViewAmbulanceModal;
