import { useState } from 'react';
import { Calendar, Clock, MapPin, Video, User, Search, Filter, Plus, X } from 'lucide-react';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
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
        status: 'confirmed',
        reason: 'Annual checkup'
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
        reason: 'Follow-up consultation'
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
        reason: 'Post-surgery care'
      }
    ],
    cancelled: []
  };

  const BookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                    bookingType === type.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
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
                        <div className={`p-2 rounded-lg ${
                          appointment.type === 'Telemedicine' ? 'bg-green-100' :
                          appointment.type === 'Home Visit' ? 'bg-purple-100' :
                          'bg-blue-100'
                        }`}>
                          {appointment.type === 'Telemedicine' ? (
                            <Video className="w-5 h-5 text-green-600" />
                          ) : appointment.type === 'Home Visit' ? (
                            <User className="w-5 h-5 text-purple-600" />
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

                      <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600 ml-14">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.date).toLocaleDateString('en-KE', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:col-span-2">
                          <MapPin className="w-4 h-4" />
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
                          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            {appointment.type === 'Telemedicine' ? 'Join Call' : 'View Details'}
                          </button>
                          <button className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
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
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
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
    </div>
  );
};

export default Appointments;
