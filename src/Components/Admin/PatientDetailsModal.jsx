/* eslint-disable no-unused-vars */
import { useState } from 'react';

const PatientDetailsModal = ({ patient, isOpen, onClose }) => {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        {/* <div 
          className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div> */}

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-lg font-medium text-blue-800">{patient.avatar}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.age} years • {patient.gender}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-sm text-gray-900 mt-1">{patient.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="text-sm text-gray-900 mt-1">{patient.age} years old</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-sm text-gray-900 mt-1">{patient.gender}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Patient ID</label>
                    <p className="text-sm text-gray-900 mt-1">#{String(patient.id).padStart(6, '0')}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Information</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                    <p className="text-sm text-gray-900 mt-1">{patient.email}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                    <p className="text-sm text-gray-900 mt-1">{patient.phone}</p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-4 md:col-span-2">
                <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Medical Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Primary Condition</label>
                    <p className="text-sm text-gray-900 mt-1">{patient.condition}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                        patient.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' :
                        patient.status === 'Critical' ? 'bg-red-100 text-red-800 border-red-200' :
                        'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Visit</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {new Date(patient.lastVisit).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Appointment Information */}
              <div className="space-y-4 md:col-span-2">
                <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Appointment Information</h4>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-900">Next Appointment</p>
                      <p className="text-sm text-blue-700">
                        {new Date(patient.nextAppointment).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={() => {
                const subject = encodeURIComponent(`MediLink - Follow-up for ${patient.name}`);
                const body = encodeURIComponent(`Dear ${patient.name},\n\nWe hope this message finds you well.\n\nBest regards,\nMediLink Team`);
                window.open(`mailto:${patient.email}?subject=${subject}&body=${body}`, '_blank');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact Patient</span>
            </button>
            <button
              onClick={onClose}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;