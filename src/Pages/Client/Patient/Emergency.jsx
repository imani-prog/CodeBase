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
  const [activeTab, setActiveTab] = useState('ambulance');
  const [showMap, setShowMap] = useState(false);
  const [mapView, setMapView] = useState('chw');
  const [selectedCHW, setSelectedCHW] = useState(null);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [showCHWModal, setShowCHWModal] = useState(false);
  const [showAmbulanceModal, setShowAmbulanceModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: -1.286389, lng: 36.817223 }); // Default: Nairobi

  // Sample CHW data
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
      name: 'MediLink Ambulance KDH 556H',
      type: 'Advanced Life Support',
      distance: '2.3 km',
      eta: '8 minutes',
      available: true,
      location: { lat: -1.289389, lng: 36.818223 },
      equipment: ['Defibrillator', 'Oxygen', 'ECG Monitor'],
      cost: 'Ksh 300'
    },
    {
      id: 2,
      name: 'MediLink Ambulance KDE 223E',
      type: 'Basic Life Support',
      distance: '3.5 km',
      eta: '12 minutes',
      available: true,
      location: { lat: -1.292389, lng: 36.822223 },
      equipment: ['First Aid Kit', 'Oxygen', 'Stretcher'],
      cost: 'Ksh 350'
    },
    {
      id: 3,
      name: 'City Hospital KDB 456B',
      type: 'Critical Care',
      distance: '4.2 km',
      eta: '15 minutes',
      available: false,
      location: { lat: -1.296389, lng: 36.826223 },
      equipment: ['Ventilator', 'Defibrillator', 'IV Equipment'],
      cost: 'Ksh 400'
    },
    {
      id: 4,
      name: 'Rescue Unit KBX 456B',
      type: 'Advanced Life Support',
      distance: '1.8 km',
      eta: '6 minutes',
      available: true,
      location: { lat: -1.287389, lng: 36.816223 },
      equipment: ['Defibrillator', 'Oxygen', 'Trauma Kit'],
      cost: 'Ksh 150'
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
      { id: 'ambulance', label: 'Order Ambulance', icon: Ambulance },
      { id: 'chw', label: 'Community Health Workers', icon: Users }
  ];

  const openMapOverlay = (view) => {
    setMapView(view);
    setShowMap(true);
  };

  const mapMeta = {
    chw: {
      title: 'Nearby CHW Coverage Map',
      subtitle: 'Showing Community Health Workers around your area',
      badgeLabel: 'CHW Live View'
    },
    ambulance: {
      title: 'Live Ambulance Coverage Map',
      subtitle: 'Showing available ambulance coverage around your area',
      badgeLabel: 'Ambulance Live View'
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-lg p-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-gray-900">Emergency Services</h1>
            <p className="text-xs text-gray-600">24/7 Emergency support</p>
          </div>
        </div>
      </div>

      {/* Hotline summary */}
      <div className="px-2 w-full max-w-full overflow-hidden">
        <h2 className="text-base font-bold text-gray-900 mb-1.5 flex items-center">
          <Phone className="w-4 h-4 mr-2 text-blue-600" />
          Emergency Hotlines
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2">
          <a href="tel:999" className="min-w-0 w-full p-2.5 rounded-lg border border-gray-200 hover:border-red-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">National Emergency</p>
            <p className="text-sm sm:text-base font-bold text-red-600 break-all">999</p>
          </a>
          <a href="tel:+254743669252" className="min-w-0 w-full p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">MediLink Emergency</p>
            <p className="text-sm sm:text-base font-bold text-blue-600 break-all">0743669252</p>
          </a>
          <a href="tel:911" className="min-w-0 w-full p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">Ambulance</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 break-all">911</p>
          </a>
          <a href="tel:+254743669252" className="min-w-0 w-full p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">Poison Control</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 break-all">0743669252</p>
          </a>
          <a href="tel:1195" className="min-w-0 w-full p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">Mental Health</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 break-all">1195</p>
          </a>
        </div>
      </div>

      


      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-800 hover:text-gray-900 hover:border-gray-300'
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
        {/* Community Health Workers Tab */}
        {activeTab === 'chw' && (
          <div className="space-y-4">
            <div className="flex items-center justify-end lg:hidden">
              <button
                onClick={() => openMapOverlay('chw')}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                <MapIcon className="w-4 h-4 text-blue-600" />
                <span>Open Live Map</span>
              </button>
            </div>

            {/* Live map view — desktop only (lg+) */}
            <div className="hidden lg:block border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {mapMeta.chw.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">{mapMeta.chw.subtitle}</p>
                  </div>
                  <span className="text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {mapMeta.chw.badgeLabel}
                  </span>
                </div>
              </div>
              <iframe
                src={import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="460"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CHW Coverage Map"
                className="w-full h-[420px] xl:h-[500px]"
              />
            </div>

            {/* CHW List */}
            <div className="p-3">
              <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Available Community Health Workers Near You
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
                {communityHealthWorkers.map((chw) => (
                  <div
                    key={chw.id}
                    className={`p-2 border-2 rounded-lg transition-all ${
                      chw.available
                        ? 'border-gray-200 hover:border-gray-300'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {chw.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{chw.name}</h3>
                          <p className="text-xs text-gray-600">{chw.specialization}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="flex items-center text-xs">
                          <MapPin className="w-3 h-3 mr-0.5" />
                          {chw.distance}
                        </span>
                        <span className="flex items-center text-xs">
                          <Clock className="w-3 h-3 mr-0.5" />
                          {chw.responseTime}
                        </span>
                        <span className="flex items-center text-xs text-blue-600">
                          <Star className="w-3 h-3 mr-0.5 fill-current" />
                          {chw.rating}
                        </span>
                      </div>
                      <div className="mt-2">
                        {chw.available ? (
                          <div className="flex flex-col space-y-1 items-center">
                            <span className="px-2 py-0.5 text-green-800 text-xs font-bold">
                              Available
                            </span>
                            <a
                              href={`tel:${chw.phone}`}
                              className="px-1.5 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-colors flex items-center space-x-1"
                              onClick={() => handleCallCHW(chw)}
                            >
                              <Phone className="w-3 h-3" />
                              <span>Call</span>
                            </a>
                          </div>
                        ) : (
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full block text-center">
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
            <div className="flex items-center justify-end lg:hidden">
              <button
                onClick={() => openMapOverlay('ambulance')}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                <MapIcon className="w-4 h-4 text-blue-600" />
                <span>Open Live Map</span>
              </button>
            </div>

            {/* Live map view — desktop only (lg+) */}
            <div className="hidden lg:block border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {mapMeta.ambulance.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">{mapMeta.ambulance.subtitle}</p>
                  </div>
                  <span className="text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {mapMeta.ambulance.badgeLabel}
                  </span>
                </div>
              </div>
             <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d277.7549826743736!2d37.26242921919778!3d-1.5305180166278827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f87eeedd7e1cd%3A0x2bb0f6a2ec4c7859!2sMachakos%20University%20Administration!5e0!3m2!1sen!2ske!4v1774964157029!5m2!1sen!2ske"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Supervisor Coverage Map"
            />
            </div>

            {/* Ambulance List */}
            <div className="p-3">
              <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
                <Ambulance className="w-4 h-4 mr-2 text-blue-600" />
                Available Ambulances Near You
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
                {ambulances.map((ambulance) => (
                  <div
                    key={ambulance.id}
                    className={`p-2 border-2 rounded-lg transition-all ${
                      ambulance.available
                        ? 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-1 mb-1">
                        <Ambulance className={`w-4 h-4 ${ambulance.available ? 'text-blue-600' : 'text-gray-400'}`} />
                        <h3 className="text-xs font-bold text-gray-900">{ambulance.name}</h3>
                      </div>
                      {ambulance.available && (
                        <span className="px-1.5 py-0.5 text-green-700 text-xs font-semibold rounded-full text-center mb-1">
                          Available
                        </span>
                      )}
                      <p className="text-xs text-gray-600 mb-2">{ambulance.type}</p>
                      <div className="flex flex-col space-y-1 mb-2">
                        <div className="flex items-center text-xs">
                          <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                          <span className="font-semibold text-gray-700">{ambulance.distance}</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <Clock className="w-3 h-3 mr-1 text-blue-600" />
                          <span className="font-bold">ETA: {ambulance.eta}</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <Activity className="w-3 h-3 mr-1 text-gray-500" />
                          <span className="font-semibold text-gray-700">{ambulance.equipment.length} Equipment</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <span className="font-bold">{ambulance.cost}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {ambulance.equipment.map((item, index) => (
                          <span
                            key={index}
                            className="px-1.5 py-0.5  text-blue-600 text-xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-center">
                        {ambulance.available ? (
                          <button
                            onClick={() => handleOrderAmbulance(ambulance)}
                            className="px-1.5 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-all shadow-lg flex items-center space-x-1"
                          >
                            <Ambulance className="w-3 h-3" />
                            <span>Order</span>
                          </button>
                        ) : (
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs font-semibold">
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
            <div className="bg-yellow-50 w-full lg:w-3/4 xl:w-1/2 border border-yellow-200 rounded-lg p-3">
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

      {/* Emergency Features Component */}
      <EmergencyFeatures />

      {/* Full-screen map overlay — mobile/tablet only */}
      {showMap && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm shrink-0">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-sm font-semibold text-gray-900">{mapMeta[mapView].title}</h2>
                <p className="text-xs text-gray-500">{mapMeta[mapView].subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setShowMap(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close map"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-4 px-4 py-2 bg-white border-b border-gray-100 text-xs text-gray-500 shrink-0">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              Your location
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
              Active responders
            </span>
          </div>
          <iframe
            src={import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0, flex: 1, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Emergency Live Map"
            className="flex-1 w-full"
          />
        </div>
      )}

      {/* CHW Call Modal */}
      {showCHWModal && selectedCHW && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-2xl max-w-md w-full p-4">
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-2xl max-w-lg w-full p-4">
            {!orderConfirmed ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Confirm Ambulance Order</h3>
                  <button
                    onClick={() => setShowAmbulanceModal(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="p-3 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Ambulance className="w-5 h-5 text-blue-600" />
                      <h4 className="text-sm font-bold">{selectedAmbulance.name}</h4>
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
                        <span className="font-semibold ">{selectedAmbulance.eta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost:</span>
                        <span className="font-bold">{selectedAmbulance.cost}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="text-xs font-semibold text-blue-600 mb-1.5">Your Location</h5>
                    <div className="flex items-start space-x-1.5 text-xs text-blue-600">
                      <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>Lat: {userLocation.lat.toFixed(6)}, Lng: {userLocation.lng.toFixed(6)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={confirmAmbulanceOrder}
                    className="w-40 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm Order</span>
                  </button>
                  <button
                    onClick={() => setShowAmbulanceModal(false)}
                    className="w-40 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
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
          className="flex items-center justify-center space-x-2 p-3transition-colors"
        >
          <span className="hover:text-blue-600 font-bold">← Back to Dashboard</span>
        </Link>
        <Link
          to="/client/patient/health-records"
          className="flex items-center justify-center space-x-2 p-3 transition-colors"
        >
          <span className="hover:text-blue-600 font-bold">View Medical Records →</span>
        </Link>
      </div>
    </div>
  );
};

export default Emergency;
