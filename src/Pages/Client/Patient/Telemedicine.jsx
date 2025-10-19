import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  FileText,
  Plus,
  X,
  ChevronRight,
  Shield,
  Wifi,
  Monitor,
  Mic,
  Camera,
  Settings,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const Telemedicine = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  // Mock data for consultations
  const consultations = {
    upcoming: [
      {
        id: 1,
        doctor: 'Dr. Sarah Kamau',
        specialty: 'General Physician',
        date: '2024-10-22',
        time: '10:00 AM',
        duration: '30 min',
        status: 'confirmed',
        type: 'video',
        reason: 'Follow-up consultation',
        prescription: false,
        meetingLink: 'https://meet.medilink.com/abc123',
      },
      {
        id: 2,
        doctor: 'Dr. James Ochieng',
        specialty: 'Cardiologist',
        date: '2024-10-24',
        time: '2:00 PM',
        duration: '45 min',
        status: 'pending',
        type: 'video',
        reason: 'Heart checkup',
        prescription: false,
        meetingLink: null,
      },
    ],
    past: [
      {
        id: 3,
        doctor: 'Dr. Mary Wanjiku',
        specialty: 'Dermatologist',
        date: '2024-10-15',
        time: '11:00 AM',
        duration: '30 min',
        status: 'completed',
        type: 'video',
        reason: 'Skin consultation',
        prescription: true,
        recording: true,
      },
    ],
  };

  const handleJoinCall = (consultation) => {
    setSelectedConsultation(consultation);
    setShowConsultationModal(true);
  };

  const handleStartConsultation = () => {
    // In a real app, this would launch the video call
    window.open(selectedConsultation.meetingLink, '_blank');
    setShowConsultationModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Telemedicine</h1>
        <p className="text-gray-600 mt-2">
          Connect with healthcare providers through secure video consultations
        </p>
      </div>

      {/* System Requirements Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900">Secure & Private</h3>
            <p className="text-sm text-blue-700 mt-1">
              All video consultations are encrypted and HIPAA compliant. Make sure you have a stable
              internet connection and allow camera/microphone access.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setShowBookingModal(true)}
          className="flex items-center justify-center space-x-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Book Consultation</span>
        </button>
        <Link
          to="/client/patient/appointments"
          className="flex items-center justify-center space-x-2 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600"
        >
          <Calendar className="w-5 h-5" />
          <span className="font-medium">View All Appointments</span>
        </Link>
        <button className="flex items-center justify-center space-x-2 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Test Equipment</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'upcoming'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming ({consultations.upcoming.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'past'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past Consultations ({consultations.past.length})
          </button>
        </nav>
      </div>

      {/* Consultations List */}
      <div className="space-y-4">
        {activeTab === 'upcoming' && (
          <>
            {consultations.upcoming.length > 0 ? (
              consultations.upcoming.map((consultation) => (
                <div
                  key={consultation.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Video className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">{consultation.doctor}</h3>
                        <p className="text-sm text-gray-600">{consultation.specialty}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(consultation.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {consultation.time} ({consultation.duration})
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">Reason:</span> {consultation.reason}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          consultation.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                      </span>
                      {consultation.status === 'confirmed' && (
                        <button
                          onClick={() => handleJoinCall(consultation)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Call</span>
                        </button>
                      )}
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm">
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Consultations</h3>
                <p className="text-gray-600 mb-6">Schedule a video consultation with a healthcare provider</p>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === 'past' && (
          <>
            {consultations.past.length > 0 ? (
              consultations.past.map((consultation) => (
                <div
                  key={consultation.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">{consultation.doctor}</h3>
                        <p className="text-sm text-gray-600">{consultation.specialty}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(consultation.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{consultation.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          {consultation.prescription && (
                            <span className="flex items-center space-x-1 text-sm text-blue-600">
                              <FileText className="w-4 h-4" />
                              <span>Prescription Available</span>
                            </span>
                          )}
                          {consultation.recording && (
                            <span className="flex items-center space-x-1 text-sm text-purple-600">
                              <Video className="w-4 h-4" />
                              <span>Recording Available</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <FileText className="w-4 h-4" />
                        <span>View Summary</span>
                      </button>
                      {consultation.prescription && (
                        <Link
                          to="/client/patient/prescriptions"
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                        >
                          <span>View Prescription</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Past Consultations</h3>
                <p className="text-gray-600">Your consultation history will appear here</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How Video Consultations Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-3">
              <span className="text-lg font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Book Consultation</h3>
            <p className="text-sm text-gray-600">
              Choose your preferred doctor and schedule a convenient time
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-3">
              <span className="text-lg font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Join Video Call</h3>
            <p className="text-sm text-gray-600">
              Click "Join Call" when it's time and connect with your doctor
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-3">
              <span className="text-lg font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Prescription</h3>
            <p className="text-sm text-gray-600">
              Receive prescriptions and follow-up instructions digitally
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Book Video Consultation</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <form className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Specialty
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Choose a specialty...</option>
                  <option value="general">General Physician</option>
                  <option value="cardiology">Cardiologist</option>
                  <option value="dermatology">Dermatologist</option>
                  <option value="pediatrics">Pediatrician</option>
                  <option value="mental">Mental Health</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select time...</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Type
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <label className="flex items-center p-4 border-2 border-blue-600 bg-blue-50 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="consultationType"
                      value="video"
                      defaultChecked
                      className="w-4 h-4 text-blue-600"
                    />
                    <Video className="w-5 h-5 text-blue-600 ml-3" />
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">Video Consultation</span>
                      <p className="text-sm text-gray-600">Face-to-face consultation via video call</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Consultation
                </label>
                <textarea
                  rows="4"
                  placeholder="Please describe your symptoms or reason for consultation..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Coverage
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select insurance...</option>
                  <option value="nhif">NHIF</option>
                  <option value="sha">SHA</option>
                  <option value="private">Private Insurance</option>
                  <option value="none">Self Pay</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Consultation Fee: KES 1,500</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Subject to insurance coverage. You'll receive confirmation within 2 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Book Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pre-Call Check Modal */}
      {showConsultationModal && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Pre-Call System Check</h2>
              <button
                onClick={() => setShowConsultationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-600">
                Please verify that your system is ready for the video call with {selectedConsultation.doctor}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Internet Connection</span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Camera Access</span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mic className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Microphone Access</span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Monitor className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Browser Compatible</span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> Find a quiet, well-lit space for your consultation. Have your
                  insurance card and ID ready.
                </p>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setShowConsultationModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartConsultation}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Video className="w-5 h-5" />
                  <span>Start Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Telemedicine;
