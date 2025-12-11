import { useState, useEffect } from 'react';
import {
  AlertCircle,
  Phone,
  Share2,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  X,
  MessageSquare,
  Send,
  Star,
  Check,
  Bell,
  Users,
  DollarSign,
  Heart,
  Siren,
  Navigation,
  Copy,
  FileText,
  Activity,
  Droplet
} from 'lucide-react';

const EmergencyFeatures = () => {
  // State management
  const [showSOSCountdown, setShowSOSCountdown] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(10);
  const [showLocationShare, setShowLocationShare] = useState(false);
  const [showMedicalSummary, setShowMedicalSummary] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showActiveTracking, setShowActiveTracking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCostCalculator, setShowCostCalculator] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [rating, setRating] = useState(0);
  const [autoNotify, setAutoNotify] = useState(false);
  const [locationCopied, setLocationCopied] = useState(false);
  const [emergencyTip, setEmergencyTip] = useState('');
  const [ambulanceOrdered, setAmbulanceOrdered] = useState(false);

  // Sample data
  const emergencyContacts = [
    { name: 'John Doe (Father)', phone: '+254712345678' },
    { name: 'Jane Doe (Mother)', phone: '+254723456789' }
  ];

  const medicalInfo = {
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    conditions: ['Hypertension', 'Diabetes Type 2'],
    medications: ['Metformin 500mg', 'Lisinopril 10mg'],
    emergencyNotes: 'Carries insulin pen. Check blood sugar if unresponsive.'
  };

  const emergencyHistory = [
    {
      id: 1,
      type: 'Ambulance',
      service: 'MediLink Ambulance A1',
      date: '2025-11-28',
      time: '14:30',
      status: 'Completed',
      rating: 5
    },
    {
      id: 2,
      type: 'CHW',
      service: 'Sarah Kamau',
      date: '2025-11-20',
      time: '09:15',
      status: 'Completed',
      rating: 4
    },
    {
      id: 3,
      type: 'Ambulance',
      service: 'City Hospital Ambulance',
      date: '2025-11-10',
      time: '22:45',
      status: 'Completed',
      rating: 5
    }
  ];

  const activeEmergency = {
    type: 'Ambulance',
    name: 'MediLink Ambulance A1',
    driver: 'James Omondi',
    phone: '+254756789012',
    license: 'KBZ 123A',
    eta: '5 minutes',
    distance: '1.2 km',
    status: 'En Route'
  };

  const emergencyTips = [
    'In case of severe bleeding, apply direct pressure and elevate the wound above the heart.',
    'For burns, cool the area with running water for at least 10 minutes. Do not apply ice.',
    'If someone is choking and cannot speak or cough, perform the Heimlich maneuver immediately.',
    'For cardiac arrest, start CPR immediately: 30 chest compressions followed by 2 rescue breaths.',
    'Keep emergency numbers saved in your phone and share them with family members.',
    'Always inform emergency responders about any allergies or medical conditions.',
    'For poisoning, call poison control immediately. Do not induce vomiting unless instructed.'
  ];

  // Get user location
  const [userLocation, setUserLocation] = useState({ lat: -1.286389, lng: 36.817223 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }
      );
    }
  }, []);

  // Random emergency tip on load
  useEffect(() => {
    const randomTip = emergencyTips[Math.floor(Math.random() * emergencyTips.length)];
    setEmergencyTip(randomTip);
  }, []);

  // SOS Countdown logic
  useEffect(() => {
    if (showSOSCountdown && sosCountdown > 0) {
      const timer = setTimeout(() => setSosCountdown(sosCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showSOSCountdown && sosCountdown === 0) {
      // Auto-call 999
      window.location.href = 'tel:999';
      setShowSOSCountdown(false);
      setSosCountdown(10);
    }
  }, [showSOSCountdown, sosCountdown]);

  const handleSOSActivate = () => {
    setShowSOSCountdown(true);
    setSosCountdown(10);
  };

  const handleSOSCancel = () => {
    setShowSOSCountdown(false);
    setSosCountdown(10);
  };

  const handleShareLocation = (method) => {
    const locationText = `Emergency! My location: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`;
    
    if (method === 'sms') {
      window.location.href = `sms:?body=${encodeURIComponent(locationText)}`;
    } else if (method === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(locationText)}`, '_blank');
    } else if (method === 'copy') {
      navigator.clipboard.writeText(locationText);
      setLocationCopied(true);
      setTimeout(() => setLocationCopied(false), 2000);
    }
  };

  const handleBroadcastToAllCHWs = () => {
    alert('Emergency broadcast sent to all nearby Community Health Workers!');
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: 'me', text: chatInput, time: new Date().toLocaleTimeString() }]);
      setChatInput('');
      // Simulate response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'driver', text: 'Received. On my way!', time: new Date().toLocaleTimeString() }]);
      }, 1000);
    }
  };

  const handleRatingSubmit = () => {
    alert(`Thank you for your ${rating}-star rating!`);
    setShowRating(false);
    setRating(0);
  };

  const calculateAmbulanceCost = () => {
    const baseFee = 2000;
    const perKmRate = 150;
    const equipmentFee = 1500;
    const distance = 2.3;
    const total = baseFee + (perKmRate * distance) + equipmentFee;
    
    return {
      baseFee,
      distance,
      distanceCost: perKmRate * distance,
      equipmentFee,
      total
    };
  };

  const costs = calculateAmbulanceCost();

  return (
    <>
      {/* Compact Horizontal Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
        {/* Emergency Tip Banner */}
        <div className="border-l-4 border-blue-400 p-2.5 rounded-lg sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-blue-800">Emergency Tip</h3>
              <p className="text-xs text-blue-700 mt-0.5">{emergencyTip}</p>
            </div>
          </div>
        </div>

        {/* Quick Medical Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-2 text-center">
            <button
              onClick={() => setShowMedicalSummary(true)}
              className="w-full flex items-center justify-between text-left hover:bg-gray-50 transition-colors p-1.5 rounded cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="text-sm font-bold text-gray-900">Quick Medical Summary</h3>
              </div>
              <ChevronDown className="w-6 h-6 font-bold" />
            </button>
          </div>


          {/* Cost Calculator */}
          {ambulanceOrdered && (
            <div className="bg-white rounded-lg shadow-md p-2">
              <button
                onClick={() => setShowCostCalculator(!showCostCalculator)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <h3 className="text-base font-bold text-gray-900">Order Cost Breakdown</h3>
                </div>
                {showCostCalculator ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {showCostCalculator && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center">
                      <span className="text-gray-600 w-32">Base Fee:</span>
                      <span className="font-semibold">KES {costs.baseFee.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 w-32">Distance ({costs.distance} km):</span>
                      <span className="font-semibold">KES {costs.distanceCost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 w-32">Equipment Fee:</span>
                      <span className="font-semibold">KES {costs.equipmentFee.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm font-bold pt-2 mt-2 border-t border-gray-300">
                    <span className="text-gray-900 w-32">Total Estimate:</span>
                    <span className="text-green-600">KES {costs.total.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">*Actual cost may vary</p>
                </div>
              )}
            </div>
          )}

          {/* Auto-Notify Emergency Contacts Toggle */}
          <div className="bg-white rounded-lg shadow-md p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Auto-Notify Emergency Contacts</h3>
                  <p className="text-xs text-gray-600">SMS family when ambulance ordered</p>
                </div>
              </div>
              <button
                onClick={() => setAutoNotify(!autoNotify)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  autoNotify ? 'bg-blue-500' : 'bg-gray-500'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  autoNotify ? 'transform translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>

        {/* Emergency Request History */}
        <div className="bg-white rounded-lg shadow-md p-2">
            <button
              onClick={() => setShowHistory(true)}
              className="w-full flex items-center justify-between text-left hover:bg-gray-50 transition-colors p-1.5 rounded cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="text-sm font-bold text-gray-900">Emergency Request History</h3>
              </div>
              <ChevronDown className="w-6 h-6 font-bold" />
            </button>
          </div>


          {/* Active Emergency Tracking - Shows when emergency is active */}
          {showActiveTracking && (
            <div className="bg-white rounded-lg shadow-md p-2 border-2 border-red-500 animate-pulse">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <h3 className="text-base font-bold text-red-600">Active Emergency</h3>
                </div>
                <button onClick={() => setShowActiveTracking(false)}>
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span className="text-xs text-gray-600">Status:</span>
                  <span className="text-sm font-bold text-red-600">{activeEmergency.status}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-xs text-gray-600">Ambulance:</span>
                  <span className="text-sm font-semibold text-gray-900">{activeEmergency.name}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-xs text-gray-600">Driver:</span>
                  <span className="text-sm font-semibold text-gray-900">{activeEmergency.driver}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-xs text-gray-600">License Plate:</span>
                  <span className="text-sm font-semibold text-gray-900">{activeEmergency.license}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span className="text-xs text-gray-600">ETA:</span>
                  <span className="text-lg font-bold text-blue-600">{activeEmergency.eta}</span>
                </div>
                <button
                  onClick={() => setShowChat(true)}
                  className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Driver</span>
                </button>
              </div>
            </div>
          )}

          {/* Broadcast to All CHWs */}
          <div className="bg-white rounded-lg shadow-md p-2">
            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              Emergency Broadcast
            </h3>
            <button
              onClick={handleBroadcastToAllCHWs}
              className="w-60 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold flex items-center justify-center space-x-2"
            >
              <Siren className="w-6 h-6" />
              <span>Alert ALL Nearby CHWs</span>
            </button>
            <p className="text-xs text-gray-500 mt-2">Send emergency alert to all community health workers in your area</p>
          </div>
      </div>

      {/* Medical Summary Modal */}
      {showMedicalSummary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Quick Medical Summary
              </h3>
              <button onClick={() => setShowMedicalSummary(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-1 mb-1">
                    <Droplet className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-gray-700">Blood Type</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{medicalInfo.bloodType}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-1 mb-1">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-gray-700">Allergies</span>
                  </div>
                  <p className="text-sm text-gray-900">{medicalInfo.allergies.join(', ')}</p>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Current Medications</p>
                <p className="text-sm text-gray-900">{medicalInfo.medications.join(', ')}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Emergency Notes</p>
                <p className="text-sm text-gray-900">{medicalInfo.emergencyNotes}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Emergency Request History
              </h3>
              <button onClick={() => setShowHistory(false)}>
                <X className="w-5 h-5 font-bold hover:text-gray-600" />
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {emergencyHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === 'Ambulance' ? '' : ''
                    }`}>
                      {item.type === 'Ambulance' ? 
                        <Siren className="w-5 h-5 text-blue-600" /> : 
                        <Users className="w-5 h-5 text-blue-600" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.service}</p>
                      <p className="text-xs text-gray-600">{item.date} at {item.time}</p>
                      <p className="text-xs text-gray-500">{item.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Share Location Modal */}
      {showLocationShare && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Share Your Location</h3>
              <button onClick={() => setShowLocationShare(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Your Coordinates:</p>
                <p className="text-sm font-mono text-gray-900">
                  {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                </p>
              </div>
              <p className="text-xs text-gray-600">Share with emergency contacts:</p>
              <button
                onClick={() => handleShareLocation('sms')}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Send SMS</span>
              </button>
              <button
                onClick={() => handleShareLocation('whatsapp')}
                className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-semibold flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Share via WhatsApp</span>
              </button>
              <button
                onClick={() => handleShareLocation('copy')}
                className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-semibold flex items-center justify-center space-x-2"
              >
                {locationCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{locationCopied ? 'Copied!' : 'Copy Location Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Chat with {activeEmergency.driver}</h3>
              <button onClick={() => setShowChat(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-64 overflow-y-auto mb-3 p-3 bg-gray-50 rounded space-y-2">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-2 rounded text-xs ${
                    msg.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Rate Your Experience</h3>
              <button onClick={() => setShowRating(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">How was your emergency service?</p>
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={handleRatingSubmit}
              disabled={rating === 0}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Rating
            </button>
          </div>
        </div>
      )}

      {/* SOS Countdown Modal */}
      {showSOSCountdown && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
              <Siren className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Emergency SOS Activated</h3>
            <p className="text-sm text-gray-600 mb-4">Calling 999 in...</p>
            <div className="text-6xl font-bold text-red-600 mb-6">{sosCountdown}</div>
            <button
              onClick={handleSOSCancel}
              className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Floating SOS Button */}
      <button
        onClick={handleSOSActivate}
        className="fixed bottom-6 right-6 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center z-40 animate-pulse transition-transform hover:scale-110"
        title="Emergency SOS - Calls 999"
      >
        <Siren className="w-8 h-8" />
      </button>

      {/* Floating Share Location Button */}
      <button
        onClick={() => setShowLocationShare(true)}
        className="fixed bottom-6 right-24 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-40 transition-transform hover:scale-110"
        title="Share Location"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {/* Test buttons for demos - Remove in production */}
      {/* <div className="fixed top-20 left-1/2 transform -translate-x-1/2 space-x-2 z-50 flex bg-white p-2 rounded-lg shadow-lg border-2 border-gray-200">
        <button
          onClick={() => {
            setShowActiveTracking(!showActiveTracking);
            setAmbulanceOrdered(!ambulanceOrdered);
          }}
          className="px-3 py-2 bg-green-600 text-white rounded text-xs shadow-lg hover:bg-green-700"
        >
          Toggle Tracking
        </button>
        <button
          onClick={() => setShowRating(true)}
          className="px-3 py-2 bg-yellow-600 text-white rounded text-xs shadow-lg hover:bg-yellow-700"
        >
          Rate Service
        </button>
      </div> */}
    </>
  );
};

export default EmergencyFeatures;
