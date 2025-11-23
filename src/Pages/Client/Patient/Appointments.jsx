import { useState } from 'react';
import { Calendar, Clock, MapPin, Video, User, Search, Filter, Plus, X, Phone, Mail, AlertCircle, CheckCircle, ExternalLink, Download } from 'lucide-react';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showJoinCallModal, setShowJoinCallModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [bookingType, setBookingType] = useState('clinic');

  const appointments = {
    upcoming: [
      {
        id: 1,
        type: 'Clinic Visit',
        doctor: 'Dr. Sarah Kamau',
        specialty: 'General Practitioner',
        date: '2025-10-22',
        time: '10:00 AM',
        location: 'Nairobi Health Center',
        address: 'Kimathi Street, Nairobi CBD',
        status: 'confirmed',
        reason: 'Annual checkup',
        phone: '+254 712 345 678',
        email: 'info@nairobihealth.co.ke',
        instructions: 'Please arrive 15 minutes early. Bring your NHIF card and ID.',
        bookingRef: 'APT-2025-001234'
      },
      {
        id: 2,
        type: 'Telemedicine',
        doctor: 'Dr. John Mwangi',
        specialty: 'Cardiologist',
        date: '2025-10-25',
        time: '2:00 PM',
        location: 'Video Consultation',
        status: 'pending',
        reason: 'Follow-up consultation',
        phone: '+254 723 456 789',
        email: 'dr.mwangi@medilink.co.ke',
        meetingLink: 'https://medilink.zoom.us/j/1234567890',
        instructions: 'Ensure you have a stable internet connection. Have your recent test results ready.',
        bookingRef: 'APT-2025-001235'
      }
    ],
    past: [
      {
        id: 3,
        type: 'Home Visit',
        doctor: 'Nurse Jane Ochieng',
        specialty: 'Community Health Worker',
        date: '2025-10-10',
        time: '3:00 PM',
        location: 'Patient Home',
        status: 'completed',
        reason: 'Post-surgery care',
        bookingRef: 'APT-2025-001210'
      }
    ],
    cancelled: []
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleCancelAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleJoinCall = (appointment) => {
    setSelectedAppointment(appointment);
    setShowJoinCallModal(true);
  };

  const confirmCancellation = () => {
    // Here you would call your API to cancel the appointment
    console.log('Cancelling appointment:', selectedAppointment.id);
    setShowCancelModal(false);
    setSelectedAppointment(null);
    // Show success message or update appointments list
  };

  const joinVideoCall = () => {
    // Open the video call link
    if (selectedAppointment?.meetingLink) {
      window.open(selectedAppointment.meetingLink, '_blank');
      setShowJoinCallModal(false);
    }
  };

  const DetailsModal = () => (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
          <button
            onClick={() => setShowDetailsModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Booking Reference */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700 font-medium">Booking Reference</p>
            <p className="text-lg font-bold text-blue-900">{selectedAppointment?.bookingRef}</p>
          </div>

          {/* Doctor Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Healthcare Provider</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="font-semibold text-gray-900">{selectedAppointment?.doctor}</p>
              <p className="text-sm text-gray-600">{selectedAppointment?.specialty}</p>
              {selectedAppointment?.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>{selectedAppointment.phone}</span>
                </div>
              )}
              {selectedAppointment?.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>{selectedAppointment.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Appointment Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <p className="text-sm font-medium text-gray-700">Date</p>
                </div>
                <p className="text-gray-900">{new Date(selectedAppointment?.date).toLocaleDateString('en-KE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <p className="text-sm font-medium text-gray-700">Time</p>
                </div>
                <p className="text-gray-900">{selectedAppointment?.time}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 sm:col-span-2">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <p className="text-sm font-medium text-gray-700">Location</p>
                </div>
                <p className="text-gray-900">{selectedAppointment?.location}</p>
                {selectedAppointment?.address && (
                  <p className="text-sm text-gray-600 mt-1">{selectedAppointment.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Reason for Visit */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Reason for Visit</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">{selectedAppointment?.reason}</p>
            </div>
          </div>

          {/* Special Instructions */}
          {selectedAppointment?.instructions && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Instructions</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-yellow-900">{selectedAppointment.instructions}</p>
                </div>
              </div>
            </div>
          )}

          {/* Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Status</h3>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              selectedAppointment?.status === 'confirmed' ? 'bg-green-100 text-green-700' :
              selectedAppointment?.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              <CheckCircle className="w-4 h-4" />
              {selectedAppointment?.status.charAt(0).toUpperCase() + selectedAppointment?.status.slice(1)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {selectedAppointment?.type === 'Telemedicine' && (
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleJoinCall(selectedAppointment);
                }}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                Join Video Call
              </button>
            )}
            <button
              onClick={() => {
                setShowDetailsModal(false);
                handleCancelAppointment(selectedAppointment);
              }}
              className="flex-1 px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              Cancel Appointment
            </button>
            <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CancelModal = () => (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Cancel Appointment?</h2>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to cancel your appointment with {selectedAppointment?.doctor} on {new Date(selectedAppointment?.date).toLocaleDateString('en-KE')}?
          </p>

          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Appointment Type</p>
              <p className="font-medium text-gray-900">{selectedAppointment?.type}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Date & Time</p>
              <p className="font-medium text-gray-900">
                {new Date(selectedAppointment?.date).toLocaleDateString('en-KE')} at {selectedAppointment?.time}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-yellow-900">
              <strong>Note:</strong> Cancelling less than 24 hours before your appointment may incur a cancellation fee.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowCancelModal(false)}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Keep Appointment
            </button>
            <button
              onClick={confirmCancellation}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const JoinCallModal = () => (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4">
            <Video className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Join Video Consultation</h2>
          <p className="text-gray-600 text-center mb-6">
            You're about to join a video call with {selectedAppointment?.doctor}
          </p>

          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Doctor</p>
              <p className="font-medium text-gray-900">{selectedAppointment?.doctor}</p>
              <p className="text-sm text-gray-600">{selectedAppointment?.specialty}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Scheduled Time</p>
              <p className="font-medium text-gray-900">{selectedAppointment?.time}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-blue-900 mb-2">Before you join:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure you have a stable internet connection</li>
              <li>• Check your camera and microphone</li>
              <li>• Find a quiet, well-lit space</li>
              <li>• Have your medical records ready</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowJoinCallModal(false)}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={joinVideoCall}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const BookingModal = () => (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Book New Appointment</h2>
          <button
            onClick={() => setShowBookingModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Appointment Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Appointment Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'clinic', label: 'Clinic Visit', icon: MapPin },
                { id: 'home', label: 'Home Visit', icon: User },
                { id: 'telemedicine', label: 'Telemedicine', icon: Video }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setBookingType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    bookingType === type.id
                      ? 'border-blue-600'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <type.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">{type.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>General Practitioner</option>
                <option>Cardiologist</option>
                <option>Pediatrician</option>
                <option>Dentist</option>
                <option>Dermatologist</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Morning (8AM - 12PM)</option>
                  <option>Afternoon (12PM - 5PM)</option>
                  <option>Evening (5PM - 8PM)</option>
                </select>
              </div>
            </div>

            {bookingType !== 'telemedicine' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {bookingType === 'clinic' ? 'Select Clinic' : 'Your Location'}
                </label>
                {bookingType === 'clinic' ? (
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Nairobi Health Center</option>
                    <option>Mombasa Medical Clinic</option>
                    <option>Kisumu Health Facility</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit
              </label>
              <textarea
                rows="3"
                placeholder="Describe your symptoms or reason for appointment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>NHIF</option>
                <option>SHA</option>
                <option>Private Insurance</option>
                <option>Self Pay</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowBookingModal(false)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
            <p className="text-gray-600">Manage your healthcare appointments</p>
          </div>
          <button
            onClick={() => setShowBookingModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm border border-gray-100 mb-6">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'upcoming', label: 'Upcoming', count: appointments.upcoming.length },
            { id: 'past', label: 'Past', count: appointments.past.length },
            { id: 'cancelled', label: 'Cancelled', count: appointments.cancelled.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="p-6">
          {appointments[activeTab].length > 0 ? (
            <div className="space-y-4">
              {appointments[activeTab].map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div>
                          {appointment.type === 'Telemedicine' ? (
                            <Video className="w-5 h-5 text-blue-600" />
                          ) : appointment.type === 'Home Visit' ? (
                            <User className="w-5 h-5 text-blue-600" />
                          ) : (
                            <MapPin className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {appointment.doctor}
                          </h3>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>{new Date(appointment.date).toLocaleDateString('en-KE', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:col-span-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>{appointment.location}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-gray-500">Reason: </span>
                          <span className="text-gray-900">{appointment.reason}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      {activeTab === 'upcoming' && (
                        <>
                          <button 
                            onClick={() => appointment.type === 'Telemedicine' ? handleJoinCall(appointment) : handleViewDetails(appointment)}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            {appointment.type === 'Telemedicine' ? 'Join Call' : 'View Details'}
                          </button>
                          <button 
                            onClick={() => handleCancelAppointment(appointment)}
                            className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} appointments
              </h3>
              <p className="text-gray-600 mb-4">
                {activeTab === 'upcoming' && "You don't have any upcoming appointments"}
                {activeTab === 'past' && "No past appointments to show"}
                {activeTab === 'cancelled' && "No cancelled appointments"}
              </p>
              {activeTab === 'upcoming' && (
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Book Your First Appointment</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && <BookingModal />}
      
      {/* Details Modal */}
      {showDetailsModal && selectedAppointment && <DetailsModal />}
      
      {/* Cancel Modal */}
      {showCancelModal && selectedAppointment && <CancelModal />}
      
      {/* Join Call Modal */}
      {showJoinCallModal && selectedAppointment && <JoinCallModal />}
    </div>
  );
};

export default Appointments;
