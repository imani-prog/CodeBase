import { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Navigation, 
  Users, 
  Ambulance,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  Map as MapIcon,
  User,
  Star,
  Activity,
  Heart,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import EmergencyFeatures from '../../../Components/Client/EmergencyFeatures';

const Emergency = () => {
  const [activeTab, setActiveTab] = useState('hotline');
  const [selectedCHW, setSelectedCHW] = useState(null);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [showCHWModal, setShowCHWModal] = useState(false);
  const [showAmbulanceModal, setShowAmbulanceModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: -1.286389, lng: 36.817223 }); // Default: Nairobi

  // Sample CHW data - Replace with actual API data
  const communityHealthWorkers = [
    {
      id: 1,
      name: 'Sarah Kamau',
      phone: '+254712345678',
      specialization: 'General Health',
      distance: '0.5 km',
      rating: 4.8,
      available: true,
      location: { lat: -1.286389, lng: 36.817223 },
      responseTime: '5-10 min'
    },
    {
      id: 2,
      name: 'John Mwangi',
      phone: '+254723456789',
      specialization: 'First Aid',
      distance: '1.2 km',
      rating: 4.9,
      available: true,
      location: { lat: -1.290389, lng: 36.820223 },
      responseTime: '10-15 min'
    },
    {
      id: 3,
      name: 'Grace Njeri',
      phone: '+254734567890',
      specialization: 'Maternal Health',
      distance: '2.1 km',
      rating: 4.7,
      available: false,
      location: { lat: -1.295389, lng: 36.825223 },
      responseTime: '15-20 min'
    },
    {
      id: 4,
      name: 'David Ochieng',
      phone: '+254745678901',
      specialization: 'Emergency Response',
      distance: '0.8 km',
      rating: 5.0,
      available: true,
      location: { lat: -1.288389, lng: 36.819223 },
      responseTime: '5-10 min'
    }
  ];

  // Sample Ambulance data - Replace with actual API data
  const ambulances = [
    {
      id: 1,
      name: 'MediLink Ambulance A1',
      type: 'Advanced Life Support',
      distance: '2.3 km',
      eta: '8 minutes',
      available: true,
      location: { lat: -1.289389, lng: 36.818223 },
      equipment: ['Defibrillator', 'Oxygen', 'ECG Monitor'],
      cost: 'KES 5,000'
    },
    {
      id: 2,
      name: 'MediLink Ambulance B2',
      type: 'Basic Life Support',
      distance: '3.5 km',
      eta: '12 minutes',
      available: true,
      location: { lat: -1.292389, lng: 36.822223 },
      equipment: ['First Aid Kit', 'Oxygen', 'Stretcher'],
      cost: 'KES 3,000'
    },
    {
      id: 3,
      name: 'City Hospital Ambulance',
      type: 'Critical Care',
      distance: '4.2 km',
      eta: '15 minutes',
      available: false,
      location: { lat: -1.296389, lng: 36.826223 },
      equipment: ['Ventilator', 'Defibrillator', 'IV Equipment'],
      cost: 'KES 8,000'
    },
    {
      id: 4,
      name: 'Rescue Unit R5',
      type: 'Advanced Life Support',
      distance: '1.8 km',
      eta: '6 minutes',
      available: true,
      location: { lat: -1.287389, lng: 36.816223 },
      equipment: ['Defibrillator', 'Oxygen', 'Trauma Kit'],
      cost: 'KES 5,500'
    }
  ];

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleCallCHW = (chw) => {
    setSelectedCHW(chw);
    setShowCHWModal(true);
  };

  const handleOrderAmbulance = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setShowAmbulanceModal(true);
  };

  const confirmAmbulanceOrder = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      setShowAmbulanceModal(false);
      setOrderConfirmed(false);
    }, 3000);
  };

  const tabs = [
    { id: 'hotline', label: 'Emergency Hotlines', icon: Phone },
    { id: 'chw', label: 'Community Health Workers', icon: Users },
    { id: 'ambulance', label: 'Order Ambulance', icon: Ambulance }
  ];

  return (
    <div className="space-y-4">
      {/* Header and Notice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Header */}
        <div className="bg-white border-l-4 border-red-600 rounded-lg p-2.5 shadow-md">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">Emergency Services</h1>
              <p className="text-gray-600 text-xs">
                24/7 Emergency support
              </p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2.5 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-yellow-800">Life-Threatening Emergency?</h3>
              <p className="text-xs text-yellow-700 mt-0.5">
                Call <strong>999</strong> or <strong>0700 000 000</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Features Component */}
      <EmergencyFeatures />

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md p-2">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        {/* Emergency Hotlines Tab */}
        {activeTab === 'hotline' && (
          <div className="space-y-4">
            {/* Primary Emergency Numbers */}
            <div className="bg-white rounded-xl shadow-md p-3">
              <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-red-600" />
                Primary Emergency Contacts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <a
                  href="tel:999"
                  className="group flex flex-col items-center p-2 border-2 border-red-200 bg-red-50 hover:border-red-400 hover:bg-red-100 rounded-lg transition-all"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mb-1">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600">National</div>
                    <div className="text-base font-bold text-red-600">999</div>
                  </div>
                </a>

                <a
                  href="tel:+254700000000"
                  className="group flex flex-col items-center p-2 border-2 border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 rounded-lg transition-all"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-1">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600">MediLink</div>
                    <div className="text-sm font-bold text-blue-600">0700 000 000</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Additional Emergency Numbers */}
            <div className="bg-white rounded-xl shadow-md p-3">
              <h2 className="text-base font-bold text-gray-900 mb-2">Additional Emergency Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <a
                  href="tel:911"
                  className="flex items-center space-x-2 p-2 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all group"
                >
                  <Ambulance className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Ambulance</div>
                    <div className="text-base font-bold text-gray-700">911</div>
                  </div>
                </a>

                <a
                  href="tel:+254722123456"
                  className="flex items-center space-x-2 p-2 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <Heart className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Poison Control</div>
                    <div className="text-base font-bold text-gray-700">0722 123 456</div>
                  </div>
                </a>

                <a
                  href="tel:1195"
                  className="flex items-center space-x-2 p-2 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
                >
                  <Activity className="w-4 h-4 text-gray-600 group-hover:text-purple-600" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Mental Health</div>
                    <div className="text-base font-bold text-gray-700">1195</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Community Health Workers Tab */}
        {activeTab === 'chw' && (
          <div className="space-y-4">
            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-64 flex items-center justify-center relative">
                <MapIcon className="w-16 h-16 text-blue-600 opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-blue-900 font-semibold">Google Maps Integration</p>
                    <p className="text-sm text-blue-700 mt-1">Showing CHWs near your location</p>
                  </div>
                </div>
                {/* Simulated markers */}
                {communityHealthWorkers.filter(chw => chw.available).map((chw, index) => (
                  <div
                    key={chw.id}
                    className="absolute w-8 h-8 bg-green-500 border-4 border-white rounded-full shadow-lg animate-pulse"
                    style={{
                      top: `${30 + index * 20}%`,
                      left: `${25 + index * 15}%`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* CHW List */}
            <div className="bg-white rounded-xl shadow-md p-3">
              <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Available Community Health Workers Near You
              </h2>
              <div className="space-y-2">
                {communityHealthWorkers.map((chw) => (
                  <div
                    key={chw.id}
                    className={`p-2 border-2 rounded-lg transition-all ${
                      chw.available
                        ? 'border-green-200 bg-green-50 hover:border-green-400'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {chw.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{chw.name}</h3>
                          <p className="text-xs text-gray-600">{chw.specialization}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="flex items-center text-xs text-gray-500">
                              <MapPin className="w-3 h-3 mr-0.5" />
                              {chw.distance}
                            </span>
                            <span className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-0.5" />
                              {chw.responseTime}
                            </span>
                            <span className="flex items-center text-xs text-yellow-600">
                              <Star className="w-3 h-3 mr-0.5 fill-current" />
                              {chw.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {chw.available ? (
                          <>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              Available
                            </span>
                            <a
                              href={`tel:${chw.phone}`}
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-colors flex items-center space-x-1"
                              onClick={() => handleCallCHW(chw)}
                            >
                              <Phone className="w-3 h-3" />
                              <span>Call</span>
                            </a>
                          </>
                        ) : (
                          <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Order Ambulance Tab */}
        {activeTab === 'ambulance' && (
          <div className="space-y-4">
            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-br from-red-100 to-red-200 h-64 flex items-center justify-center relative">
                <MapIcon className="w-16 h-16 text-red-600 opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Ambulance className="w-12 h-12 text-red-600 mx-auto mb-2" />
                    <p className="text-red-900 font-semibold">Real-Time Ambulance Tracking</p>
                    <p className="text-sm text-red-700 mt-1">Showing available ambulances near you</p>
                  </div>
                </div>
                {/* Simulated ambulance markers */}
                {ambulances.filter(amb => amb.available).map((amb, index) => (
                  <div
                    key={amb.id}
                    className="absolute"
                    style={{
                      top: `${25 + index * 18}%`,
                      left: `${30 + index * 20}%`
                    }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-red-500 border-4 border-white rounded-lg shadow-lg flex items-center justify-center animate-bounce">
                        <Ambulance className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ambulance List */}
            <div className="bg-white rounded-xl shadow-md p-3">
              <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
                <Ambulance className="w-4 h-4 mr-2 text-red-600" />
                Available Ambulances Near You
              </h2>
              <div className="space-y-2">
                {ambulances.map((ambulance) => (
                  <div
                    key={ambulance.id}
                    className={`p-2 border-2 rounded-lg transition-all ${
                      ambulance.available
                        ? 'border-green-200 bg-gradient-to-r from-white to-green-50 hover:border-green-400 hover:shadow-lg'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Ambulance className={`w-5 h-5 ${ambulance.available ? 'text-red-600' : 'text-gray-400'}`} />
                          <h3 className="text-sm font-bold text-gray-900">{ambulance.name}</h3>
                          {ambulance.available && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              Available
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{ambulance.type}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                          <div className="flex items-center text-xs">
                            <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                            <span className="font-semibold text-gray-700">{ambulance.distance}</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <Clock className="w-3 h-3 mr-1 text-gray-500" />
                            <span className="font-semibold text-blue-600">ETA: {ambulance.eta}</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <Activity className="w-3 h-3 mr-1 text-gray-500" />
                            <span className="font-semibold text-gray-700">{ambulance.equipment.length} Equipment</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <span className="font-semibold text-green-600">{ambulance.cost}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {ambulance.equipment.map((item, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-2">
                        {ambulance.available ? (
                          <button
                            onClick={() => handleOrderAmbulance(ambulance)}
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold transition-all shadow-lg flex items-center space-x-1"
                          >
                            <Ambulance className="w-3 h-3" />
                            <span>Order</span>
                          </button>
                        ) : (
                          <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs font-semibold">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <h3 className="text-sm font-bold text-yellow-900 mb-1.5 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5" />
                While waiting for the ambulance:
              </h3>
              <ul className="space-y-1.5 text-xs text-yellow-800">
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 mr-1.5 mt-0.5 text-yellow-600" />
                  <span>Stay calm and keep the patient comfortable</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 mr-1.5 mt-0.5 text-yellow-600" />
                  <span>Keep your phone nearby for communication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 mr-1.5 mt-0.5 text-yellow-600" />
                  <span>Have someone wait outside to guide the ambulance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 mr-1.5 mt-0.5 text-yellow-600" />
                  <span>Gather any relevant medical documents or medications</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* CHW Call Modal */}
      {showCHWModal && selectedCHW && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Calling CHW</h3>
              <button
                onClick={() => setShowCHWModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                {selectedCHW.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4 className="text-base font-semibold text-gray-900">{selectedCHW.name}</h4>
              <p className="text-sm text-gray-600">{selectedCHW.specialization}</p>
              <p className="text-xl font-bold text-blue-600 mt-2">{selectedCHW.phone}</p>
            </div>
            <div className="space-y-2">
              <a
                href={`tel:${selectedCHW.phone}`}
                className="block w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold text-center transition-colors"
              >
                Call Now
              </a>
              <button
                onClick={() => setShowCHWModal(false)}
                className="block w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ambulance Order Modal */}
      {showAmbulanceModal && selectedAmbulance && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-4">
            {!orderConfirmed ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Confirm Ambulance Order</h3>
                  <button
                    onClick={() => setShowAmbulanceModal(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Ambulance className="w-5 h-5 text-red-600" />
                      <h4 className="text-sm font-bold text-gray-900">{selectedAmbulance.name}</h4>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-semibold">{selectedAmbulance.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance:</span>
                        <span className="font-semibold">{selectedAmbulance.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ETA:</span>
                        <span className="font-semibold text-blue-600">{selectedAmbulance.eta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost:</span>
                        <span className="font-semibold text-green-600">{selectedAmbulance.cost}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="text-xs font-semibold text-gray-900 mb-1.5">Your Location</h5>
                    <div className="flex items-start space-x-1.5 text-xs text-gray-600">
                      <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>Lat: {userLocation.lat.toFixed(6)}, Lng: {userLocation.lng.toFixed(6)}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={confirmAmbulanceOrder}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm Order</span>
                  </button>
                  <button
                    onClick={() => setShowAmbulanceModal(false)}
                    className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {selectedAmbulance.name} is on the way
                </p>
                <p className="text-xs text-gray-500">
                  ETA: <span className="font-semibold text-blue-600">{selectedAmbulance.eta}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Link
          to="/client/patient/dashboard"
          className="flex items-center justify-center space-x-2 p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
        >
          <span className="text-sm text-gray-700 hover:text-blue-600 font-medium">← Back to Dashboard</span>
        </Link>
        <Link
          to="/client/patient/health-records"
          className="flex items-center justify-center space-x-2 p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
        >
          <span className="text-sm text-gray-700 hover:text-blue-600 font-medium">View Medical Records →</span>
        </Link>
      </div>
    </div>
  );
};

export default Emergency;
