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
  Mail,
  MapPin,
  Download,
} from 'lucide-react';

const Telemedicine = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    specialty: '',
    date: '',
    time: '',
    reason: '',
    insurance: ''
  });

  // Mock data for consultations - now using state
  const [consultations, setConsultations] = useState({
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
        meetingLink: 'https://app.zoom.us/wc/88034100679/start?fromPWA=1&pwd=pVmy08XQyh0Ef3gWCFLCCikrXuW6o1.1',
        phone: '+254 712 345 678',
        email: 'dr.kamau@medilink.co.ke',
        location: 'Video Consultation',
        instructions: 'Ensure you have a stable internet connection. Have your recent medical records ready.',
        bookingRef: 'TLM-2024-001234',
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
        meetingLink: 'https://app.zoom.us/wc/88034100679/start?fromPWA=1&pwd=pVmy08XQyh0Ef3gWCFLCCikrXuW6o1.1',
        phone: '+254 723 456 789',
        email: 'dr.ochieng@medilink.co.ke',
        location: 'Video Consultation',
        instructions: 'Please have your previous heart test results available during the consultation.',
        bookingRef: 'TLM-2024-001235',
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
        phone: '+254 734 567 890',
        email: 'dr.wanjiku@medilink.co.ke',
        location: 'Video Consultation',
        bookingRef: 'TLM-2024-001210',
      },
    ],
  });

  const handleJoinCall = (consultation) => {
    setSelectedConsultation(consultation);
    setShowConsultationModal(true);
  };

  const handleStartConsultation = () => {
    
    window.open(selectedConsultation.meetingLink, '_blank');
    setShowConsultationModal(false);
  };

  const handleViewDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setShowDetailsModal(true);
  };

  const handleBookingFormChange = (field, value) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBookConsultation = (e) => {
    e.preventDefault();
    
    // Generate booking reference
    const bookingRef = `TLM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
    
    // Map specialty to doctor (in real app, this would come from API)
    const specialtyDoctors = {
      'general': { name: 'Dr. Peter Njoroge', specialty: 'General Physician', email: 'dr.njoroge@medilink.co.ke', phone: '+254 745 678 901' },
      'cardiology': { name: 'Dr. James Ochieng', specialty: 'Cardiologist', email: 'dr.ochieng@medilink.co.ke', phone: '+254 723 456 789' },
      'dermatology': { name: 'Dr. Mary Wanjiku', specialty: 'Dermatologist', email: 'dr.wanjiku@medilink.co.ke', phone: '+254 734 567 890' },
      'pediatrics': { name: 'Dr. Grace Akinyi', specialty: 'Pediatrician', email: 'dr.akinyi@medilink.co.ke', phone: '+254 756 789 012' },
      'mental': { name: 'Dr. David Kamau', specialty: 'Mental Health Specialist', email: 'dr.kamau@medilink.co.ke', phone: '+254 767 890 123' }
    };

    const doctor = specialtyDoctors[bookingForm.specialty] || specialtyDoctors['general'];

    // Create new consultation object
    const newConsultation = {
      id: Date.now(),
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: bookingForm.date,
      time: bookingForm.time,
      duration: '30 min',
      status: 'pending',
      type: 'video',
      reason: bookingForm.reason,
      prescription: false,
      meetingLink: 'https://app.zoom.us/wc/88034100679/start?fromPWA=1&pwd=pVmy08XQyh0Ef3gWCFLCCikrXuW6o1.1',
      phone: doctor.phone,
      email: doctor.email,
      location: 'Video Consultation',
      instructions: 'Ensure you have a stable internet connection. You will receive a confirmation email with additional details.',
      bookingRef: bookingRef,
      insurance: bookingForm.insurance
    };

    // Add to consultations list
    setConsultations(prev => ({
      ...prev,
      upcoming: [...prev.upcoming, newConsultation]
    }));

    // Reset form
    setBookingForm({
      specialty: '',
      date: '',
      time: '',
      reason: '',
      insurance: ''
    });

    // Close modal and show success message
    setShowBookingModal(false);
    setShowSuccessMessage(true);

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border-2 border-green-500 rounded-lg shadow-lg p-4 max-w-md animate-slide-in">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-green-900">Consultation Booked Successfully!</h3>
              <p className="text-sm text-green-700 mt-1">
                Your video consultation has been scheduled. You'll receive a confirmation email within 2 hours.
              </p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="flex-shrink-0 text-green-600 hover:text-green-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold ">Telemedicine</h1>
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
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowBookingModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Book Consultation</span>
        </button>
        <Link
          to="/client/patient/appointments"
          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded hover:border-blue-600 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 text-sm"
        >
          <Calendar className="w-4 h-4" />
          <span>All Appointments</span>
        </Link>
        <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded hover:border-blue-600 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 text-sm">
          <Settings className="w-4 h-4" />
          <span>Test Equipment</span>
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
      <div>
        {activeTab === 'upcoming' && (
          <>
            {consultations.upcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {consultations.upcoming.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="bg-white shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center flex-shrink-0">
                        <Video className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 truncate">{consultation.doctor}</h3>
                        <p className="text-sm text-gray-600 truncate">{consultation.specialty}</p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          consultation.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-1 mb-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(consultation.date).toLocaleDateString()}</span>
                        <Clock className="w-3.5 h-3.5 ml-2" />
                        <span>{consultation.time} ({consultation.duration})</span>
                      </div>
                      <p className="text-gray-600 line-clamp-1">
                        <span className="font-medium">Reason:</span> {consultation.reason}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      {consultation.status === 'confirmed' && (
                        <button
                          onClick={() => handleJoinCall(consultation)}
                          className="flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join</span>
                        </button>
                      )}
                      <button 
                        onClick={() => handleViewDetails(consultation)}
                        className="flex items-center justify-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {consultations.past.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="bg-white shadow-sm border border-gray-200 p-3 rounded-lg"
                  >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 truncate">{consultation.doctor}</h3>
                      <p className="text-sm text-gray-600 truncate">{consultation.specialty}</p>
                    </div>
                  </div>
                  <div className="space-y-1 mb-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(consultation.date).toLocaleDateString()}</span>
                      <Clock className="w-3.5 h-3.5 ml-2" />
                      <span>{consultation.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {consultation.prescription && (
                        <span className="flex items-center space-x-1 text-sm text-blue-600">
                          <FileText className="w-3.5 h-3.5" />
                          <span>Prescription</span>
                        </span>
                      )}
                      {consultation.recording && (
                        <span className="flex items-center space-x-1 text-sm text-purple-600">
                          <Video className="w-3.5 h-3.5" />
                          <span>Recording</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <button className="flex items-center justify-center gap-1 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Summary</span>
                    </button>
                    {consultation.prescription && (
                      <Link
                        to="/client/patient/prescriptions"
                        className="flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors text-sm"
                      >
                        <span>Prescription</span>
                      </Link>
                    )}
                  </div>
                </div>
                ))}\n              </div>
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
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">How Video Consultations Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-3">
              <span className="text-lg font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Book Consultation</h3>
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
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
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
            <form className="p-6 space-y-6" onSubmit={handleBookConsultation}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Specialty
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={bookingForm.specialty}
                  onChange={(e) => handleBookingFormChange('specialty', e.target.value)}
                  required
                >
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
                    value={bookingForm.date}
                    onChange={(e) => handleBookingFormChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={bookingForm.time}
                    onChange={(e) => handleBookingFormChange('time', e.target.value)}
                    required
                  >
                    <option value="">Select time...</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
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
                  value={bookingForm.reason}
                  onChange={(e) => handleBookingFormChange('reason', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Coverage
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={bookingForm.insurance}
                  onChange={(e) => handleBookingFormChange('insurance', e.target.value)}
                  required
                >
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

      {/* Details Modal */}
      {showDetailsModal && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Consultation Details</h2>
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
                <p className="text-lg font-bold text-blue-900">{selectedConsultation?.bookingRef}</p>
              </div>

              {/* Doctor Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Healthcare Provider</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="font-semibold text-gray-900">{selectedConsultation?.doctor}</p>
                  <p className="text-sm text-gray-600">{selectedConsultation?.specialty}</p>
                  {selectedConsultation?.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>{selectedConsultation.phone}</span>
                    </div>
                  )}
                  {selectedConsultation?.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>{selectedConsultation.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Consultation Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Consultation Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-gray-700">Date</p>
                    </div>
                    <p className="text-gray-900">{new Date(selectedConsultation?.date).toLocaleDateString('en-KE', {
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
                    <p className="text-gray-900">{selectedConsultation?.time} {selectedConsultation?.duration && `(${selectedConsultation.duration})`}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 sm:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Video className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-gray-700">Type</p>
                    </div>
                    <p className="text-gray-900">{selectedConsultation?.location || 'Video Consultation'}</p>
                  </div>
                </div>
              </div>

              {/* Reason for Consultation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Reason for Consultation</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900">{selectedConsultation?.reason}</p>
                </div>
              </div>

              {/* Special Instructions */}
              {selectedConsultation?.instructions && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Instructions</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-900">{selectedConsultation.instructions}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Status</h3>
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  selectedConsultation?.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  selectedConsultation?.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  selectedConsultation?.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  <CheckCircle className="w-4 h-4" />
                  {selectedConsultation?.status.charAt(0).toUpperCase() + selectedConsultation?.status.slice(1)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {selectedConsultation?.status === 'confirmed' && selectedConsultation?.meetingLink && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleJoinCall(selectedConsultation);
                    }}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    Join Video Call
                  </button>
                )}
                {selectedConsultation?.prescription && (
                  <Link
                    to="/client/patient/prescriptions"
                    className="flex-1 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    View Prescription
                  </Link>
                )}
                {selectedConsultation?.recording && (
                  <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Recording
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Telemedicine;
