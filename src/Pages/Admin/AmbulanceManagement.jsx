import React, { useState, useEffect, useMemo } from 'react';
import { 
  Truck, 
  Users, 
  MapPin, 
  Phone, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  Plus,
  Edit3,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Navigation,
  Activity,
  Fuel,
  Settings,
  UserCheck,
  Star,
  Route,
  Timer,
  Heart,
  Shield,
  Download,
  RefreshCw,
  Send,
  Target,
  Zap,
  Globe,
  Compass,
  Radio,
  Map,
  Crosshair,
  Play,
  Pause,
  Square,
  ArrowRight,
  AlertCircle,
  Info,
  Wifi,
  Signal,
  Battery,
  Navigation2,
  PhoneCall,
  MessageSquare,
  Video,
  Car,
  Siren,
  Stethoscope
} from 'lucide-react';
import AdminNavbar from '../../Components/AdminNavbar';
import AdminSidebar from '../../Components/AdminSidebar';

const AmbulanceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [activeTab, setActiveTab] = useState('ambulances'); // 'ambulances', 'drivers', 'dispatches', 'dispatch', 'tracking'
  const [_selectedItems, _setSelectedItems] = useState([]);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [_liveTracking, _setLiveTracking] = useState({});
  const [dispatchForm, setDispatchForm] = useState({
    priority: 'high',
    patientName: '',
    patientAge: '',
    condition: '',
    pickupLocation: '',
    destination: '',
    callerName: '',
    callerPhone: '',
    specialInstructions: '',
    estimatedDistance: '',
    estimatedTime: ''
  });

  // Sample ambulances data
  const ambulances = useMemo(() => [
    {
      id: 1,
      vehicleNumber: 'AMB-001-NB',
      type: 'advanced_life_support',
      status: 'available',
      location: 'Nairobi Central Hospital',
      currentDriver: 'John Kamau',
      driverContact: '+254 712 345 678',
      lastMaintenance: '2024-10-05',
      nextMaintenance: '2024-12-05',
      mileage: 45230,
      fuelLevel: 85,
      equipment: ['Defibrillator', 'Oxygen Tank', 'Ventilator', 'ECG Monitor'],
      lastDispatch: '2024-10-11 14:30:00',
      totalDispatches: 187,
      averageResponseTime: '8.5 minutes',
      image: '/src/assets/MedilinkAmbulance.png'
    },
    {
      id: 2,
      vehicleNumber: 'AMB-002-NB',
      type: 'basic_life_support',
      status: 'in_transit',
      location: 'En route to Mathare',
      currentDriver: 'Mary Wanjiku',
      driverContact: '+254 723 456 789',
      lastMaintenance: '2024-09-20',
      nextMaintenance: '2024-11-20',
      mileage: 38940,
      fuelLevel: 65,
      equipment: ['First Aid Kit', 'Oxygen Tank', 'Stretcher', 'Basic Monitors'],
      lastDispatch: '2024-10-11 16:15:00',
      totalDispatches: 142,
      averageResponseTime: '12.3 minutes',
      image: '/src/assets/MedilinkAmbulance.png'
    },
    {
      id: 3,
      vehicleNumber: 'AMB-003-NB',
      type: 'critical_care',
      status: 'maintenance',
      location: 'Maintenance Garage',
      currentDriver: 'David Mwangi',
      driverContact: '+254 734 567 890',
      lastMaintenance: '2024-10-10',
      nextMaintenance: '2024-12-10',
      mileage: 52100,
      fuelLevel: 30,
      equipment: ['Advanced Ventilator', 'ECMO', 'Multiple IV Pumps', 'Cardiac Monitor'],
      lastDispatch: '2024-10-09 22:45:00',
      totalDispatches: 98,
      averageResponseTime: '15.2 minutes',
      image: '/src/assets/MedilinkAmbulance.png'
    },
    {
      id: 4,
      vehicleNumber: 'AMB-004-NB',
      type: 'patient_transport',
      status: 'available',
      location: 'Kenyatta Hospital',
      currentDriver: 'Grace Nyong\'o',
      driverContact: '+254 745 678 901',
      lastMaintenance: '2024-09-15',
      nextMaintenance: '2024-11-15',
      mileage: 29876,
      fuelLevel: 78,
      equipment: ['Wheelchair Lift', 'Patient Comfort Items', 'Basic First Aid'],
      lastDispatch: '2024-10-11 13:20:00',
      totalDispatches: 234,
      averageResponseTime: '18.7 minutes',
      image: '/src/assets/MedilinkAmbulance.png'
    }
  ], []);

  // Sample drivers data
  const drivers = [
    {
      id: 1,
      name: 'John Kamau',
      licenseNumber: 'DL-123456-KE',
      phone: '+254 712 345 678',
      email: 'john.kamau@medilink.com',
      status: 'on_duty',
      experience: '8 years',
      certifications: ['EMT-Basic', 'CPR Certified', 'Defensive Driving'],
      currentVehicle: 'AMB-001-NB',
      location: 'Nairobi Central Hospital',
      shiftStart: '06:00',
      shiftEnd: '18:00',
      totalTrips: 342,
      rating: 4.8,
      lastTrip: '2024-10-11 14:30:00',
      emergencyContact: '+254 701 234 567',
      avatar: '/src/assets/Timothy Imani.jpeg'
    },
    {
      id: 2,
      name: 'Mary Wanjiku',
      licenseNumber: 'DL-789012-KE',
      phone: '+254 723 456 789',
      email: 'mary.wanjiku@medilink.com',
      status: 'on_trip',
      experience: '5 years',
      certifications: ['EMT-Intermediate', 'CPR Certified', 'First Aid'],
      currentVehicle: 'AMB-002-NB',
      location: 'En route to Mathare',
      shiftStart: '18:00',
      shiftEnd: '06:00',
      totalTrips: 278,
      rating: 4.9,
      lastTrip: '2024-10-11 16:15:00',
      emergencyContact: '+254 712 345 678',
      avatar: '/src/assets/Grace Achieng.jpeg'
    },
    {
      id: 3,
      name: 'David Mwangi',
      licenseNumber: 'DL-345678-KE',
      phone: '+254 734 567 890',
      email: 'david.mwangi@medilink.com',
      status: 'off_duty',
      experience: '12 years',
      certifications: ['EMT-Paramedic', 'Advanced Life Support', 'Critical Care Transport'],
      currentVehicle: 'AMB-003-NB',
      location: 'Off Duty',
      shiftStart: '06:00',
      shiftEnd: '18:00',
      totalTrips: 456,
      rating: 4.7,
      lastTrip: '2024-10-09 22:45:00',
      emergencyContact: '+254 723 456 789',
      avatar: '/src/assets/Joseph Otieno.jpeg'
    },
    {
      id: 4,
      name: 'Grace Nyong\'o',
      licenseNumber: 'DL-901234-KE',
      phone: '+254 745 678 901',
      email: 'grace.nyongo@medilink.com',
      status: 'on_duty',
      experience: '3 years',
      certifications: ['EMT-Basic', 'Patient Transport', 'Customer Service'],
      currentVehicle: 'AMB-004-NB',
      location: 'Kenyatta Hospital',
      shiftStart: '12:00',
      shiftEnd: '00:00',
      totalTrips: 189,
      rating: 4.6,
      lastTrip: '2024-10-11 13:20:00',
      emergencyContact: '+254 734 567 890',
      avatar: '/src/assets/Susan Mwangi.jpeg'
    }
  ];

  // Sample dispatch records
  const dispatches = [
    {
      id: 1,
      callId: 'EMRG-2024-1011-001',
      ambulanceId: 'AMB-002-NB',
      driverId: 2,
      priority: 'critical',
      status: 'in_progress',
      callTime: '2024-10-11 16:15:00',
      dispatchTime: '2024-10-11 16:16:30',
      arrivalTime: null,
      completionTime: null,
      patientName: 'Michael Ochieng',
      patientAge: 45,
      condition: 'Chest Pain - Suspected MI',
      pickupLocation: 'Mathare Shopping Center',
      destination: 'Kenyatta Hospital Emergency',
      distance: '12.5 km',
      estimatedTime: '15 minutes',
      callerName: 'Dr. Susan Mwangi',
      callerPhone: '+254 712 890 123'
    },
    {
      id: 2,
      callId: 'EMRG-2024-1011-002',
      ambulanceId: 'AMB-001-NB',
      driverId: 1,
      priority: 'high',
      status: 'completed',
      callTime: '2024-10-11 14:30:00',
      dispatchTime: '2024-10-11 14:31:15',
      arrivalTime: '2024-10-11 14:38:45',
      completionTime: '2024-10-11 15:15:30',
      patientName: 'Sarah Wanjiku',
      patientAge: 32,
      condition: 'Motor Vehicle Accident',
      pickupLocation: 'Uhuru Highway Junction',
      destination: 'Nairobi Hospital Trauma Center',
      distance: '8.2 km',
      estimatedTime: '12 minutes',
      actualTime: '7.5 minutes',
      callerName: 'Traffic Police',
      callerPhone: '+254 700 123 456'
    },
    {
      id: 3,
      callId: 'EMRG-2024-1011-003',
      ambulanceId: 'AMB-004-NB',
      driverId: 4,
      priority: 'medium',
      status: 'completed',
      callTime: '2024-10-11 13:20:00',
      dispatchTime: '2024-10-11 13:22:30',
      arrivalTime: '2024-10-11 13:35:15',
      completionTime: '2024-10-11 14:20:45',
      patientName: 'Peter Kimani',
      patientAge: 67,
      condition: 'Scheduled Dialysis Transfer',
      pickupLocation: 'Patient Home - Dandora',
      destination: 'Nairobi Dialysis Center',
      distance: '15.3 km',
      estimatedTime: '25 minutes',
      actualTime: '12.75 minutes',
      callerName: 'Family Member',
      callerPhone: '+254 723 567 890'
    }
  ];

  // Live tracking data for active ambulances
  const [trackingData, setTrackingData] = useState({
    'AMB-001-NB': {
      latitude: -1.2921,
      longitude: 36.8219,
      speed: 0,
      heading: 180,
      batteryLevel: 85,
      signalStrength: 4,
      lastUpdate: new Date(),
      route: [
        { lat: -1.2921, lng: 36.8219, timestamp: '16:15:00' },
        { lat: -1.2925, lng: 36.8225, timestamp: '16:16:00' },
        { lat: -1.2930, lng: 36.8230, timestamp: '16:17:00' }
      ]
    },
    'AMB-002-NB': {
      latitude: -1.2541,
      longitude: 36.7749,
      speed: 45,
      heading: 90,
      batteryLevel: 72,
      signalStrength: 3,
      lastUpdate: new Date(),
      route: [
        { lat: -1.2541, lng: 36.7749, timestamp: '16:15:30' },
        { lat: -1.2545, lng: 36.7755, timestamp: '16:16:30' },
        { lat: -1.2548, lng: 36.7760, timestamp: '16:17:30' }
      ]
    }
  });

  // Active emergency calls queue
  const [emergencyCalls, setEmergencyCalls] = useState([
    {
      id: 'EMG-001',
      priority: 'critical',
      patientName: 'Jane Doe',
      condition: 'Cardiac Arrest',
      location: 'Westlands Shopping Mall, Parking Lot A',
      coordinates: { lat: -1.2676, lng: 36.8108 },
      callerName: 'Security Guard',
      callerPhone: '+254 722 123 456',
      callTime: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      estimatedResponse: '8 minutes',
      nearestAmbulances: ['AMB-001-NB', 'AMB-003-NB'],
      status: 'pending'
    },
    {
      id: 'EMG-002',
      priority: 'high',
      patientName: 'Peter Kiprotich',
      condition: 'Motor Vehicle Accident - Multiple Injuries',
      location: 'Thika Road, Near Githurai Roundabout',
      coordinates: { lat: -1.1838, lng: 36.9289 },
      callerName: 'Witness',
      callerPhone: '+254 733 987 654',
      callTime: new Date(Date.now() - 10 * 60000), // 10 minutes ago
      estimatedResponse: '12 minutes',
      nearestAmbulances: ['AMB-002-NB', 'AMB-004-NB'],
      status: 'pending'
    }
  ]);

  // Auto-update tracking data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackingData(prevData => {
        const updatedData = { ...prevData };
        
        Object.keys(updatedData).forEach(vehicleId => {
          const data = updatedData[vehicleId];
          // Simulate movement for ambulances in transit
          if (ambulances.find(a => a.vehicleNumber === vehicleId && a.status === 'in_transit')) {
            updatedData[vehicleId] = {
              ...data,
              latitude: data.latitude + (Math.random() - 0.5) * 0.001,
              longitude: data.longitude + (Math.random() - 0.5) * 0.001,
              speed: Math.max(0, data.speed + (Math.random() - 0.5) * 10),
              heading: (data.heading + (Math.random() - 0.5) * 20) % 360,
              lastUpdate: new Date()
            };
          }
        });
        
        return updatedData;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [ambulances]);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'out_of_service', label: 'Out of Service' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'advanced_life_support', label: 'Advanced Life Support' },
    { value: 'basic_life_support', label: 'Basic Life Support' },
    { value: 'critical_care', label: 'Critical Care' },
    { value: 'patient_transport', label: 'Patient Transport' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_transit': return <Navigation className="w-4 h-4 text-blue-500" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-yellow-500" />;
      case 'out_of_service': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'on_duty': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'on_trip': return <Navigation className="w-4 h-4 text-blue-500" />;
      case 'off_duty': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'in_progress': return <Timer className="w-4 h-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out_of_service': return 'bg-red-100 text-red-800 border-red-200';
      case 'on_duty': return 'bg-green-100 text-green-800 border-green-200';
      case 'on_trip': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'off_duty': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'advanced_life_support': return <Heart className="w-4 h-4 text-red-600" />;
      case 'basic_life_support': return <Activity className="w-4 h-4 text-blue-600" />;
      case 'critical_care': return <Shield className="w-4 h-4 text-purple-600" />;
      case 'patient_transport': return <Truck className="w-4 h-4 text-green-600" />;
      default: return <Truck className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredAmbulances = ambulances.filter(ambulance => {
    const matchesSearch = ambulance.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ambulance.currentDriver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ambulance.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || ambulance.status === selectedStatus;
    const matchesType = selectedType === 'all' || ambulance.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.currentVehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredDispatches = dispatches.filter(dispatch => {
    const matchesSearch = dispatch.callId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispatch.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispatch.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Dispatch handling functions
  const handleDispatch = (ambulanceId, callId) => {
    const call = emergencyCalls.find(c => c.id === callId);
    if (!call) return;

    const _newDispatch = {
      id: Date.now(),
      callId: `EMRG-2024-${new Date().getMonth() + 1}${new Date().getDate()}-${String(dispatches.length + 1).padStart(3, '0')}`,
      ambulanceId,
      driverId: ambulances.find(a => a.vehicleNumber === ambulanceId)?.currentDriver,
      priority: call.priority,
      status: 'dispatched',
      callTime: call.callTime.toISOString(),
      dispatchTime: new Date().toISOString(),
      arrivalTime: null,
      completionTime: null,
      patientName: call.patientName,
      condition: call.condition,
      pickupLocation: call.location,
      destination: dispatchForm.destination || 'Nearest Hospital',
      callerName: call.callerName,
      callerPhone: call.callerPhone,
      specialInstructions: dispatchForm.specialInstructions
    };

    // Update emergency calls
    setEmergencyCalls(prev => 
      prev.map(c => c.id === callId ? { ...c, status: 'dispatched', assignedAmbulance: ambulanceId } : c)
    );

    setShowDispatchModal(false);
    setDispatchForm({
      priority: 'high',
      patientName: '',
      patientAge: '',
      condition: '',
      pickupLocation: '',
      destination: '',
      callerName: '',
      callerPhone: '',
      specialInstructions: '',
      estimatedDistance: '',
      estimatedTime: ''
    });

    // Show success notification
    alert(`Ambulance ${ambulanceId} successfully dispatched to ${call.location}`);
  };

  const handleQuickDispatch = (call) => {
    const availableAmbulances = ambulances.filter(a => a.status === 'available');
    if (availableAmbulances.length === 0) {
      alert('No ambulances available for dispatch');
      return;
    }

    // Find nearest available ambulance (simplified logic)
    const nearestAmbulance = availableAmbulances[0];
    handleDispatch(nearestAmbulance.vehicleNumber, call.id);
  };

  const _calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 pl-64">
        <AdminNavbar />
        
        <div className="p-6 mt-16">
          {/* Header Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Ambulance Management</h1>
                  <p className="text-blue-200 text-lg">
                    Manage ambulance fleet, drivers, dispatch operations, and emergency response
                  </p>
                  <div className="mt-4 flex items-center space-x-6">
                    <div className="flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-blue-300" />
                      <span className="text-blue-200">
                        {ambulances.length} Fleet Vehicles
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-green-300" />
                      <span className="text-blue-200">
                        {drivers.filter(d => d.status === 'on_duty').length} Drivers On Duty
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-yellow-300" />
                      <span className="text-blue-200">
                        {dispatches.filter(d => d.status === 'in_progress').length} Active Dispatches
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                    <Truck className="w-16 h-16 text-blue-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab('ambulances')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'ambulances'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Truck className="w-4 h-4 inline mr-2" />
                Fleet ({ambulances.length})
              </button>
              <button
                onClick={() => setActiveTab('drivers')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'drivers'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Drivers ({drivers.length})
              </button>
              <button
                onClick={() => setActiveTab('dispatch')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'dispatch'
                    ? 'border-red-500 text-red-600 bg-red-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Send className="w-4 h-4 inline mr-2" />
                Emergency Dispatch ({emergencyCalls.filter(c => c.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('tracking')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'tracking'
                    ? 'border-green-500 text-green-600 bg-green-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Target className="w-4 h-4 inline mr-2" />
                Live Tracking ({Object.keys(trackingData).length})
              </button>
              <button
                onClick={() => setActiveTab('dispatches')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'dispatches'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Navigation className="w-4 h-4 inline mr-2" />
                History ({dispatches.length})
              </button>
            </div>

            {/* Controls */}
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {activeTab === 'ambulances' && (
                    <div className="flex gap-3">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {typeOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add {activeTab.slice(0, -1)}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Ambulances Tab */}
          {activeTab === 'ambulances' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAmbulances.map((ambulance) => (
                <div key={ambulance.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {ambulance.vehicleNumber}
                        </h3>
                        <div className="flex items-center mb-2">
                          {getTypeIcon(ambulance.type)}
                          <span className="ml-2 text-sm text-gray-600 capitalize">
                            {ambulance.type.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(ambulance.status)}
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(ambulance.status)}`}>
                          {ambulance.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {ambulance.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <UserCheck className="w-4 h-4 mr-2 text-gray-400" />
                        {ambulance.currentDriver}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {ambulance.driverContact}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900">{ambulance.totalDispatches}</div>
                        <div className="text-xs text-gray-500">Total Trips</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900">{ambulance.averageResponseTime}</div>
                        <div className="text-xs text-gray-500">Avg Response</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Fuel Level:</span>
                        <span className="font-medium">{ambulance.fuelLevel}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${ambulance.fuelLevel > 50 ? 'bg-green-500' : ambulance.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${ambulance.fuelLevel}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <button className="flex items-center text-blue-600 hover:text-blue-900 transition-colors">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                      <div className="flex items-center space-x-2">
                        <button className="text-green-600 hover:text-green-900 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Drivers Tab */}
          {activeTab === 'drivers' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Trips</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDrivers.map((driver) => (
                      <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={driver.avatar}
                              alt={driver.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver.name)}&background=3B82F6&color=fff&size=40`;
                              }}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                              <div className="text-sm text-gray-500">{driver.email}</div>
                              <div className="text-xs text-gray-400">{driver.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(driver.status)}
                            <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(driver.status)}`}>
                              {driver.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {driver.shiftStart} - {driver.shiftEnd}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{driver.currentVehicle}</div>
                          <div className="text-sm text-gray-500">{driver.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{driver.experience}</div>
                          <div className="text-xs text-gray-500">
                            {driver.certifications.slice(0, 2).join(', ')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium text-gray-900">{driver.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{driver.totalTrips}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900 transition-colors">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Dispatches Tab */}
          {activeTab === 'dispatches' && (
            <div className="space-y-4">
              {filteredDispatches.map((dispatch) => (
                <div key={dispatch.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {dispatch.callId}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          {getStatusIcon(dispatch.priority)}
                          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(dispatch.priority)}`}>
                            {dispatch.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <div className="flex items-center">
                          {getStatusIcon(dispatch.status)}
                          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(dispatch.status)}`}>
                            {dispatch.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{dispatch.ambulanceId}</div>
                      <div className="text-sm text-gray-500">
                        {drivers.find(d => d.id === dispatch.driverId)?.name}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Patient Information</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div><strong>Name:</strong> {dispatch.patientName}</div>
                        <div><strong>Age:</strong> {dispatch.patientAge} years</div>
                        <div><strong>Condition:</strong> {dispatch.condition}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Location Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div><strong>Pickup:</strong> {dispatch.pickupLocation}</div>
                        <div><strong>Destination:</strong> {dispatch.destination}</div>
                        <div><strong>Distance:</strong> {dispatch.distance}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Timing</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div><strong>Call Time:</strong> {new Date(dispatch.callTime).toLocaleTimeString()}</div>
                        <div><strong>Dispatch:</strong> {new Date(dispatch.dispatchTime).toLocaleTimeString()}</div>
                        {dispatch.arrivalTime && (
                          <div><strong>Arrival:</strong> {new Date(dispatch.arrivalTime).toLocaleTimeString()}</div>
                        )}
                        {dispatch.actualTime && (
                          <div><strong>Response Time:</strong> {dispatch.actualTime}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      <strong>Caller:</strong> {dispatch.callerName} ({dispatch.callerPhone})
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Emergency Dispatch Tab */}
          {activeTab === 'dispatch' && (
            <div className="space-y-6">
              {/* Emergency Calls Queue */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Emergency Calls Queue</h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                        Live Feed
                      </div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        New Emergency Call
                      </button>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {emergencyCalls.map((call) => (
                    <div key={call.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{call.id}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              call.priority === 'critical' ? 'bg-red-100 text-red-800 border border-red-200' :
                              call.priority === 'high' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                              'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}>
                              {call.priority.toUpperCase()} PRIORITY
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                              {call.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600"><strong>Patient:</strong> {call.patientName}</p>
                              <p className="text-gray-600"><strong>Condition:</strong> {call.condition}</p>
                              <p className="text-gray-600"><strong>Call Time:</strong> {call.callTime.toLocaleTimeString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-600"><strong>Location:</strong> {call.location}</p>
                              <p className="text-gray-600"><strong>Caller:</strong> {call.callerName}</p>
                              <p className="text-gray-600"><strong>Phone:</strong> {call.callerPhone}</p>
                            </div>
                            <div>
                              <p className="text-gray-600"><strong>Est. Response:</strong> {call.estimatedResponse}</p>
                              <p className="text-gray-600"><strong>Nearest Units:</strong> {call.nearestAmbulances.join(', ')}</p>
                              <p className="text-gray-600"><strong>Time Elapsed:</strong> {Math.floor((Date.now() - call.callTime.getTime()) / 60000)} min</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {call.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleQuickDispatch(call)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                              >
                                <Zap className="w-4 h-4 mr-2" />
                                Quick Dispatch
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedAmbulance(null);
                                  setDispatchForm({
                                    ...dispatchForm,
                                    patientName: call.patientName,
                                    condition: call.condition,
                                    pickupLocation: call.location,
                                    callerName: call.callerName,
                                    callerPhone: call.callerPhone,
                                    priority: call.priority
                                  });
                                  setShowDispatchModal(true);
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Manual Dispatch
                              </button>
                            </>
                          )}
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Available Ambulances for this call */}
                      {call.status === 'pending' && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Available Ambulances:</h5>
                          <div className="flex space-x-2">
                            {call.nearestAmbulances.map((ambulanceId) => {
                              const ambulance = ambulances.find(a => a.vehicleNumber === ambulanceId);
                              if (!ambulance || ambulance.status !== 'available') return null;
                              
                              return (
                                <button
                                  key={ambulanceId}
                                  onClick={() => handleDispatch(ambulanceId, call.id)}
                                  className="flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                                >
                                  <Truck className="w-4 h-4 mr-2" />
                                  {ambulanceId}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {emergencyCalls.length === 0 && (
                    <div className="p-12 text-center">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Emergency Calls</h3>
                      <p className="text-gray-500">All emergency calls have been handled. Great work!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Fleet Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Available Units</p>
                      <p className="text-2xl font-bold text-green-600">
                        {ambulances.filter(a => a.status === 'available').length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">In Transit</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {ambulances.filter(a => a.status === 'in_transit').length}
                      </p>
                    </div>
                    <Navigation className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Maintenance</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {ambulances.filter(a => a.status === 'maintenance').length}
                      </p>
                    </div>
                    <Settings className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Calls</p>
                      <p className="text-2xl font-bold text-red-600">
                        {emergencyCalls.filter(c => c.status === 'pending').length}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Live Tracking Tab */}
          {activeTab === 'tracking' && (
            <div className="space-y-6">
              {/* Map Container */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Live Ambulance Tracking</h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Real-time Updates
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Map
                      </button>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="h-96 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Interactive Map View</h3>
                    <p className="text-gray-500">Integration with Google Maps/Mapbox for live tracking</p>
                    <div className="mt-4 flex justify-center space-x-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        Available
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        In Transit
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        Emergency
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Tracking Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(trackingData).map(([vehicleId, data]) => {
                  const ambulance = ambulances.find(a => a.vehicleNumber === vehicleId);
                  if (!ambulance) return null;

                  return (
                    <div key={vehicleId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{vehicleId}</h4>
                            <p className="text-sm text-gray-600">{ambulance.currentDriver}</p>
                            <div className="flex items-center mt-1">
                              {getStatusIcon(ambulance.status)}
                              <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(ambulance.status)}`}>
                                {ambulance.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Last Update</div>
                            <div className="text-sm font-medium">{data.lastUpdate.toLocaleTimeString()}</div>
                          </div>
                        </div>

                        {/* Location & Navigation Info */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                              <div>
                                <div className="font-medium">Location</div>
                                <div className="text-xs">{data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}</div>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Compass className="w-4 h-4 mr-2 text-gray-400" />
                              <div>
                                <div className="font-medium">Heading</div>
                                <div className="text-xs">{data.heading.toFixed(0)}°</div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Zap className="w-4 h-4 mr-2 text-gray-400" />
                              <div>
                                <div className="font-medium">Speed</div>
                                <div className="text-xs">{data.speed.toFixed(0)} km/h</div>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Battery className="w-4 h-4 mr-2 text-gray-400" />
                              <div>
                                <div className="font-medium">Battery</div>
                                <div className="text-xs">{data.batteryLevel}%</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status Indicators */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm">
                              <Signal className="w-4 h-4 mr-1 text-gray-500" />
                              <div className="flex space-x-1">
                                {[1,2,3,4].map(bar => (
                                  <div 
                                    key={bar}
                                    className={`w-1 h-3 rounded ${bar <= data.signalStrength ? 'bg-green-500' : 'bg-gray-300'}`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Wifi className="w-4 h-4 mr-1" />
                              Connected
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                              <PhoneCall className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-800 transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="text-purple-600 hover:text-purple-800 transition-colors">
                              <Navigation2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Recent Route */}
                        <div className="border-t border-gray-100 pt-4">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Recent Route</h5>
                          <div className="space-y-1 max-h-20 overflow-y-auto">
                            {data.route.slice(-3).map((point, index) => (
                              <div key={index} className="flex items-center text-xs text-gray-600">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                <span>{point.timestamp}</span>
                                <span className="mx-2">-</span>
                                <span>{point.lat.toFixed(4)}, {point.lng.toFixed(4)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tracking Controls */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                    <Play className="w-5 h-5 mr-2" />
                    Start All Tracking
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
                    <Pause className="w-5 h-5 mr-2" />
                    Pause Tracking
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                    <Square className="w-5 h-5 mr-2" />
                    Emergency Stop
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Fleet Vehicles</p>
                  <p className="text-3xl font-bold text-blue-600">{ambulances.length}</p>
                  <p className="text-sm text-green-600 mt-2">
                    {ambulances.filter(a => a.status === 'available').length} Available
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Drivers</p>
                  <p className="text-3xl font-bold text-green-600">
                    {drivers.filter(d => d.status === 'on_duty' || d.status === 'on_trip').length}
                  </p>
                  <p className="text-sm text-green-600 mt-2">Out of {drivers.length} total</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Dispatches</p>
                  <p className="text-3xl font-bold text-purple-600">{dispatches.length}</p>
                  <p className="text-sm text-purple-600 mt-2">
                    {dispatches.filter(d => d.status === 'in_progress').length} In Progress
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className="text-3xl font-bold text-yellow-600">11.5 min</p>
                  <p className="text-sm text-yellow-600 mt-2">Target: &lt;15 min</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Timer className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatch Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Dispatch Ambulance</h3>
                <button
                  onClick={() => setShowDispatchModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <select
                    value={dispatchForm.priority}
                    onChange={(e) => setDispatchForm({...dispatchForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Ambulance</label>
                  <select
                    value={selectedAmbulance || ''}
                    onChange={(e) => setSelectedAmbulance(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Auto-Select Nearest</option>
                    {ambulances.filter(a => a.status === 'available').map(ambulance => (
                      <option key={ambulance.vehicleNumber} value={ambulance.vehicleNumber}>
                        {ambulance.vehicleNumber} - {ambulance.currentDriver}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                  <input
                    type="text"
                    value={dispatchForm.patientName}
                    onChange={(e) => setDispatchForm({...dispatchForm, patientName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter patient name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Age</label>
                  <input
                    type="number"
                    value={dispatchForm.patientAge}
                    onChange={(e) => setDispatchForm({...dispatchForm, patientAge: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Age"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical Condition</label>
                <input
                  type="text"
                  value={dispatchForm.condition}
                  onChange={(e) => setDispatchForm({...dispatchForm, condition: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the medical condition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                <input
                  type="text"
                  value={dispatchForm.pickupLocation}
                  onChange={(e) => setDispatchForm({...dispatchForm, pickupLocation: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter exact pickup address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination Hospital</label>
                <select
                  value={dispatchForm.destination}
                  onChange={(e) => setDispatchForm({...dispatchForm, destination: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select destination</option>
                  <option value="Kenyatta National Hospital">Kenyatta National Hospital</option>
                  <option value="Nairobi Hospital">Nairobi Hospital</option>
                  <option value="Aga Khan Hospital">Aga Khan Hospital</option>
                  <option value="Mater Hospital">Mater Hospital</option>
                  <option value="MP Shah Hospital">MP Shah Hospital</option>
                  <option value="Nearest Hospital">Nearest Hospital</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caller Name</label>
                  <input
                    type="text"
                    value={dispatchForm.callerName}
                    onChange={(e) => setDispatchForm({...dispatchForm, callerName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Who is calling?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caller Phone</label>
                  <input
                    type="tel"
                    value={dispatchForm.callerPhone}
                    onChange={(e) => setDispatchForm({...dispatchForm, callerPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+254 7xx xxx xxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                <textarea
                  value={dispatchForm.specialInstructions}
                  onChange={(e) => setDispatchForm({...dispatchForm, specialInstructions: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special instructions for the medical team..."
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDispatchModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const ambulanceToDispatch = selectedAmbulance || ambulances.find(a => a.status === 'available')?.vehicleNumber;
                    if (ambulanceToDispatch && dispatchForm.patientName && dispatchForm.pickupLocation) {
                      handleDispatch(ambulanceToDispatch, 'manual-dispatch');
                    } else {
                      alert('Please fill in all required fields');
                    }
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Dispatch Ambulance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmbulanceManagement;