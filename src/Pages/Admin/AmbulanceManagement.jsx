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
    priority: 'HIGH', // matches backend DispatchPriority enum
    incidentType: 'TRAFFIC_ACCIDENT',
    patientName: '',
    patientId: '',
    patientAge: '',
    condition: '',
    // Pickup location fields (structured address)
    pickupLocation: '', // legacy
    pickupAddressLine1: '',
    pickupAddressLine2: '',
    pickupCity: '',
    pickupState: '',
    pickupPostalCode: '',
    pickupCountry: 'Kenya',
    pickupLatitude: '',
    pickupLongitude: '',
    // Dropoff location fields
    destination: '', // legacy
    hospitalId: '',
    dropoffAddressLine1: '',
    dropoffAddressLine2: '',
    dropoffCity: '',
    dropoffState: '',
    dropoffPostalCode: '',
    dropoffCountry: 'Kenya',
    dropoffLatitude: '',
    dropoffLongitude: '',
    // Caller information
    callerName: '',
    callerPhone: '',
    callerNotes: '',
    // Additional fields
    specialInstructions: '',
    notes: '',
    estimatedDistance: '',
    estimatedTime: ''
  });

  // Sample ambulances data - matches backend Ambulances entity
  const ambulances = useMemo(() => [
    {
      id: 1,
      vehiclePlate: 'AMB-001-NB', // matches backend vehiclePlate field
      vehicleNumber: 'AMB-001-NB', // keeping for backward compatibility
      registrationNumber: 'KCB-001-2020', // unique registration
      model: 'Toyota Land Cruiser', // vehicle model
      year: 2020, // manufacture year
      type: 'advanced_life_support',
      status: 'AVAILABLE', // matches backend AmbulanceStatus enum
      fuelType: 'DIESEL', // matches backend FuelType enum
      capacity: 6, // passenger/patient capacity
      equippedForICU: true, // ICU capability
      gpsEnabled: true, // GPS tracking capability
      location: 'Nairobi Central Hospital',
      driverName: 'John Kamau', // matches backend driverName
      driverPhone: '+254 712 345 678', // matches backend driverPhone
      medicName: 'Dr. Sarah Kimani', // assigned medic
      insurancePolicyNumber: 'INS-KE-2024-001', // insurance policy
      insuranceProvider: 'Jubilee Insurance', // insurance company
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
      notes: 'Primary emergency response unit for Nairobi Central',
      image: '/src/assets/MedilinkAmbulance.png'
    },
    {
      id: 2,
      vehiclePlate: 'AMB-002-NB',
      vehicleNumber: 'AMB-002-NB',
      registrationNumber: 'KCB-002-2021',
      model: 'Mercedes-Benz Sprinter',
      year: 2021,
      type: 'basic_life_support',
      status: 'BUSY', // in transit
      fuelType: 'DIESEL',
      capacity: 4,
      equippedForICU: false,
      gpsEnabled: true,
      location: 'En route to Mathare',
      driverName: 'Mary Wanjiku',
      driverPhone: '+254 723 456 789',
      medicName: 'Nurse Peter Omondi',
      insurancePolicyNumber: 'INS-KE-2024-002',
      insuranceProvider: 'AAR Insurance',
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
      notes: 'Specialized for non-critical patient transfers',
      image: '/src/assets/MedilinkAmbulance.png'
    },
    {
      id: 3,
      vehiclePlate: 'AMB-003-NB',
      vehicleNumber: 'AMB-003-NB',
      registrationNumber: 'KCB-003-2019',
      model: 'Ford Transit Custom',
      year: 2019,
      type: 'critical_care',
      status: 'MAINTENANCE',
      fuelType: 'DIESEL',
      capacity: 4,
      equippedForICU: true,
      gpsEnabled: true,
      location: 'Maintenance Garage',
      driverName: 'David Mwangi',
      driverPhone: '+254 734 567 890',
      medicName: 'Dr. Elizabeth Wangari',
      insurancePolicyNumber: 'INS-KE-2024-003',
      insuranceProvider: 'CIC Insurance',
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
      notes: 'Critical care unit undergoing routine maintenance',
      image: '/src/assets/MedilinkAmbulance.png'
    },
    {
      id: 4,
      vehiclePlate: 'AMB-004-NB',
      vehicleNumber: 'AMB-004-NB',
      registrationNumber: 'KCB-004-2022',
      model: 'Volkswagen Crafter',
      year: 2022,
      type: 'patient_transport',
      status: 'AVAILABLE',
      fuelType: 'PETROL',
      capacity: 8,
      equippedForICU: false,
      gpsEnabled: true,
      location: 'Kenyatta Hospital',
      driverName: 'Grace Nyong\'o',
      driverPhone: '+254 745 678 901',
      medicName: 'Nurse James Mutua',
      insurancePolicyNumber: 'INS-KE-2024-004',
      insuranceProvider: 'ICEA Lion',
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
      notes: 'Wheelchair accessible vehicle for scheduled transfers',
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

  // Sample dispatch records - matches backend AmbulanceDispatch entity
  const dispatches = [
    {
      id: 1,
      incidentId: 'INC-2024-1011-001', // unique incident identifier (backend: incidentId)
      incidentType: 'CARDIAC_ARREST', // incident category (backend: incidentType)
      callId: 'EMRG-2024-1011-001', // legacy field
      ambulanceId: 'AMB-002-NB',
      ambulanceUnitId: 'UNIT-002', // internal unit identifier (backend: ambulanceUnitId)
      vehiclePlate: 'AMB-002-NB', // matches backend vehiclePlate
      driverId: 2,
      driverName: 'Mary Wanjiku', // matches backend driverName
      medicName: 'Nurse Peter Omondi', // matches backend medicName
      priority: 'CRITICAL', // matches backend DispatchPriority enum: LOW, MEDIUM, HIGH, CRITICAL
      status: 'TRANSPORTING', // matches backend DispatchStatus enum: REQUESTED, DISPATCHED, EN_ROUTE, ON_SCENE, TRANSPORTING, AT_HOSPITAL, COMPLETED, CANCELED
      
      // Caller information
      callerName: 'Dr. Susan Mwangi',
      callerPhone: '+254712890123',
      callerNotes: 'Patient is unconscious, CPR in progress by bystanders',
      
      // Patient information
      patientId: 'PAT-2024-045', // reference to Patient entity (backend: patient)
      patientName: 'Michael Ochieng',
      patientAge: 45,
      condition: 'Chest Pain - Suspected Myocardial Infarction',
      
      // Pickup location (structured address matching backend)
      pickupLocation: 'Mathare Shopping Center', // legacy field
      pickupAddressLine1: 'Mathare Shopping Center',
      pickupAddressLine2: 'Juja Road',
      pickupCity: 'Nairobi',
      pickupState: 'Nairobi County',
      pickupPostalCode: '00100',
      pickupCountry: 'Kenya',
      pickupLatitude: -1.2541,
      pickupLongitude: 36.8749,
      
      // Dropoff location (structured address matching backend)
      destination: 'Kenyatta Hospital Emergency', // legacy field
      hospitalId: 'HOSP-001', // reference to Hospital entity (backend: hospital)
      dropoffAddressLine1: 'Kenyatta National Hospital',
      dropoffAddressLine2: 'Hospital Road',
      dropoffCity: 'Nairobi',
      dropoffState: 'Nairobi County',
      dropoffPostalCode: '00202',
      dropoffCountry: 'Kenya',
      dropoffLatitude: -1.3018,
      dropoffLongitude: 36.8073,
      
      // Timestamps (matching backend)
      requestTime: '2024-10-11T16:15:00+03:00', // when call received (backend: requestTime)
      dispatchTime: '2024-10-11T16:16:30+03:00', // crew dispatched (backend: dispatchTime)
      enRouteTime: '2024-10-11T16:17:45+03:00', // wheels rolling (backend: enRouteTime)
      onSceneTime: '2024-10-11T16:25:30+03:00', // arrived at scene (backend: onSceneTime)
      departSceneTime: '2024-10-11T16:35:15+03:00', // left scene (backend: departSceneTime)
      arrivalAtHospitalTime: null, // reached hospital (backend: arrivalAtHospitalTime)
      completionTime: null, // case closed (backend: completionTime)
      
      // Legacy fields
      callTime: '2024-10-11 16:15:00',
      arrivalTime: null,
      
      distance: '12.5 km',
      estimatedTime: '15 minutes',
      notes: 'Patient stabilized on scene, transported with ALS support, IV access established'
    },
    {
      id: 2,
      incidentId: 'INC-2024-1011-002',
      incidentType: 'TRAFFIC_ACCIDENT',
      callId: 'EMRG-2024-1011-002',
      ambulanceId: 'AMB-001-NB',
      ambulanceUnitId: 'UNIT-001',
      vehiclePlate: 'AMB-001-NB',
      driverId: 1,
      driverName: 'John Kamau',
      medicName: 'Dr. Sarah Kimani',
      priority: 'HIGH',
      status: 'COMPLETED',
      
      callerName: 'Traffic Police',
      callerPhone: '+254700123456',
      callerNotes: 'Two vehicle collision, multiple casualties, ambulance requested for one critical patient',
      
      patientId: 'PAT-2024-032',
      patientName: 'Sarah Wanjiku',
      patientAge: 32,
      condition: 'Motor Vehicle Accident - Multiple Trauma',
      
      pickupLocation: 'Uhuru Highway Junction',
      pickupAddressLine1: 'Uhuru Highway',
      pickupAddressLine2: 'Near Nyayo Stadium',
      pickupCity: 'Nairobi',
      pickupState: 'Nairobi County',
      pickupPostalCode: '00100',
      pickupCountry: 'Kenya',
      pickupLatitude: -1.3019,
      pickupLongitude: 36.8267,
      
      destination: 'Nairobi Hospital Trauma Center',
      hospitalId: 'HOSP-002',
      dropoffAddressLine1: 'Nairobi Hospital',
      dropoffAddressLine2: 'Argwings Kodhek Road',
      dropoffCity: 'Nairobi',
      dropoffState: 'Nairobi County',
      dropoffPostalCode: '00506',
      dropoffCountry: 'Kenya',
      dropoffLatitude: -1.2884,
      dropoffLongitude: 36.8082,
      
      requestTime: '2024-10-11T14:30:00+03:00',
      dispatchTime: '2024-10-11T14:31:15+03:00',
      enRouteTime: '2024-10-11T14:32:00+03:00',
      onSceneTime: '2024-10-11T14:38:45+03:00',
      departSceneTime: '2024-10-11T14:52:30+03:00',
      arrivalAtHospitalTime: '2024-10-11T15:05:15+03:00',
      completionTime: '2024-10-11T15:15:30+03:00',
      
      callTime: '2024-10-11 14:30:00',
      arrivalTime: '2024-10-11 14:38:45',
      
      distance: '8.2 km',
      estimatedTime: '12 minutes',
      actualTime: '7.5 minutes',
      notes: 'Patient extracted from vehicle, C-spine immobilization, rapid transport to trauma center. GCS 13 on scene.'
    },
    {
      id: 3,
      incidentId: 'INC-2024-1011-003',
      incidentType: 'SCHEDULED_TRANSPORT',
      callId: 'EMRG-2024-1011-003',
      ambulanceId: 'AMB-004-NB',
      ambulanceUnitId: 'UNIT-004',
      vehiclePlate: 'AMB-004-NB',
      driverId: 4,
      driverName: 'Grace Nyong\'o',
      medicName: 'Nurse James Mutua',
      priority: 'MEDIUM',
      status: 'COMPLETED',
      
      callerName: 'Family Member',
      callerPhone: '+254723567890',
      callerNotes: 'Scheduled dialysis appointment, patient has mobility issues, wheelchair required',
      
      patientId: 'PAT-2024-067',
      patientName: 'Peter Kimani',
      patientAge: 67,
      condition: 'Scheduled Dialysis Transfer - ESRD Patient',
      
      pickupLocation: 'Patient Home - Dandora',
      pickupAddressLine1: 'House No. 45',
      pickupAddressLine2: 'Phase 4, Dandora',
      pickupCity: 'Nairobi',
      pickupState: 'Nairobi County',
      pickupPostalCode: '00100',
      pickupCountry: 'Kenya',
      pickupLatitude: -1.2574,
      pickupLongitude: 36.8969,
      
      destination: 'Nairobi Dialysis Center',
      hospitalId: 'HOSP-003',
      dropoffAddressLine1: 'Nairobi Dialysis Center',
      dropoffAddressLine2: 'Ngong Road',
      dropoffCity: 'Nairobi',
      dropoffState: 'Nairobi County',
      dropoffPostalCode: '00100',
      dropoffCountry: 'Kenya',
      dropoffLatitude: -1.2921,
      dropoffLongitude: 36.7820,
      
      requestTime: '2024-10-11T13:20:00+03:00',
      dispatchTime: '2024-10-11T13:22:30+03:00',
      enRouteTime: '2024-10-11T13:25:00+03:00',
      onSceneTime: '2024-10-11T13:35:15+03:00',
      departSceneTime: '2024-10-11T13:45:30+03:00',
      arrivalAtHospitalTime: '2024-10-11T14:05:00+03:00',
      completionTime: '2024-10-11T14:20:45+03:00',
      
      callTime: '2024-10-11 13:20:00',
      arrivalTime: '2024-10-11 13:35:15',
      
      distance: '15.3 km',
      estimatedTime: '25 minutes',
      actualTime: '12.75 minutes',
      notes: 'Routine dialysis transport, patient stable, vitals monitored throughout transport. Family notified of safe arrival.'
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
          // Simulate movement for ambulances in transit (BUSY status or in_transit)
          const ambulance = ambulances.find(a => a.vehicleNumber === vehicleId);
          if (ambulance && (ambulance.status === 'BUSY' || ambulance.status === 'in_transit' || ambulance.status === 'TRANSPORTING')) {
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
    { value: 'AVAILABLE', label: 'Available' },
    { value: 'BUSY', label: 'Busy' },
    { value: 'MAINTENANCE', label: 'Maintenance' },
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
    const normalizedStatus = typeof status === 'string' ? status.toUpperCase() : status;
    switch (normalizedStatus) {
      case 'AVAILABLE': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'BUSY': 
      case 'IN_TRANSIT': 
      case 'TRANSPORTING':
      case 'EN_ROUTE':
      case 'ON_SCENE': return <Navigation className="w-4 h-4 text-blue-500" />;
      case 'MAINTENANCE': return <Settings className="w-4 h-4 text-yellow-500" />;
      case 'OUT_OF_SERVICE': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'ON_DUTY': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'ON_TRIP': return <Navigation className="w-4 h-4 text-blue-500" />;
      case 'OFF_DUTY': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'CRITICAL': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'HIGH': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'MEDIUM': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'LOW': return <Info className="w-4 h-4 text-blue-500" />;
      case 'IN_PROGRESS':
      case 'REQUESTED':
      case 'DISPATCHED': return <Timer className="w-4 h-4 text-blue-500" />;
      case 'COMPLETED':
      case 'AT_HOSPITAL': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'CANCELED': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    const normalizedStatus = typeof status === 'string' ? status.toUpperCase() : status;
    switch (normalizedStatus) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 border-green-200';
      case 'BUSY':
      case 'IN_TRANSIT':
      case 'TRANSPORTING':
      case 'EN_ROUTE':
      case 'ON_SCENE': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'MAINTENANCE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'OUT_OF_SERVICE': return 'bg-red-100 text-red-800 border-red-200';
      case 'ON_DUTY': return 'bg-green-100 text-green-800 border-green-200';
      case 'ON_TRIP': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'OFF_DUTY': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'IN_PROGRESS':
      case 'REQUESTED':
      case 'DISPATCHED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'COMPLETED':
      case 'AT_HOSPITAL': return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELED': return 'bg-red-100 text-red-800 border-red-200';
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
                         ambulance.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ambulance.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ambulance.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ambulance.currentDriver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ambulance.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ambulance.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || ambulance.status === selectedStatus || ambulance.status.toLowerCase() === selectedStatus.toLowerCase();
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
      priority: 'HIGH',
      incidentType: 'TRAFFIC_ACCIDENT',
      patientName: '',
      patientId: '',
      patientAge: '',
      condition: '',
      pickupLocation: '',
      pickupAddressLine1: '',
      pickupAddressLine2: '',
      pickupCity: '',
      pickupState: '',
      pickupPostalCode: '',
      pickupCountry: 'Kenya',
      pickupLatitude: '',
      pickupLongitude: '',
      destination: '',
      hospitalId: '',
      dropoffAddressLine1: '',
      dropoffAddressLine2: '',
      dropoffCity: '',
      dropoffState: '',
      dropoffPostalCode: '',
      dropoffCountry: 'Kenya',
      dropoffLatitude: '',
      dropoffLongitude: '',
      callerName: '',
      callerPhone: '',
      callerNotes: '',
      specialInstructions: '',
      notes: '',
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="mb-8">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Ambulance Management</h1>
              <p className="text-lg">
                Manage ambulance fleet, drivers, dispatch operations, and emergency response
              </p>
              <div className="mt-4 flex items-center space-x-6 text-blue-600">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  <span className="">
                    {ambulances.length} Fleet Vehicles
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      <span className="">
                        {drivers.filter(d => d.status === 'on_duty').length} Drivers On Duty
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      <span className="">
                        {dispatches.filter(d => d.status === 'in_progress').length} Active Dispatches
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border border-gray-200 mb-6">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab('ambulances')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'ambulances'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
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
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Drivers ({drivers.length})
              </button>
              <button
                onClick={() => setActiveTab('dispatch')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'dispatch'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Send className="w-4 h-4 inline mr-2" />
                Emergency Dispatch ({emergencyCalls.filter(c => c.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('tracking')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'tracking'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
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
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
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
                <div key={ambulance.id} className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {ambulance.vehiclePlate}
                        </h3>
                        <p className="text-xs text-gray-500 mb-1">Reg: {ambulance.registrationNumber}</p>
                        <p className="text-xs text-gray-500 mb-2">{ambulance.model} ({ambulance.year})</p>
                        <div className="flex items-center mb-2">
                          {getTypeIcon(ambulance.type)}
                          <span className="ml-2 text-sm capitalize">
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
                        Driver: {ambulance.driverName}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Stethoscope className="w-4 h-4 mr-2 text-gray-400" />
                        Medic: {ambulance.medicName}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {ambulance.driverPhone}
                      </div>
                    </div>

                    {/* Vehicle Specifications */}
                    <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-xs text-gray-600">
                        <Fuel className="w-3 h-3 mr-1 text-gray-400" />
                        {ambulance.fuelType}
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Users className="w-3 h-3 mr-1 text-gray-400" />
                        Cap: {ambulance.capacity}
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        {ambulance.gpsEnabled ? (
                          <>
                            <Globe className="w-3 h-3 mr-1 text-green-500" />
                            GPS Enabled
                          </>
                        ) : (
                          <>
                            <Globe className="w-3 h-3 mr-1 text-gray-400" />
                            No GPS
                          </>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        {ambulance.equippedForICU ? (
                          <>
                            <Heart className="w-3 h-3 mr-1 text-red-500" />
                            ICU Ready
                          </>
                        ) : (
                          <>
                            <Heart className="w-3 h-3 mr-1 text-gray-400" />
                            No ICU
                          </>
                        )}
                      </div>
                    </div>

                    {/* Insurance Information */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center text-xs text-gray-700 mb-1">
                        <Shield className="w-3 h-3 mr-1 text-blue-500" />
                        <span className="font-medium">Insurance:</span>
                      </div>
                      <p className="text-xs text-gray-600 ml-4">{ambulance.insuranceProvider}</p>
                      <p className="text-xs text-gray-500 ml-4">Policy: {ambulance.insurancePolicyNumber}</p>
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

                    {ambulance.notes && (
                      <div className="mb-4 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-xs text-gray-700">
                        <strong>Note:</strong> {ambulance.notes}
                      </div>
                    )}

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
                        {dispatch.incidentId}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">Legacy Call ID: {dispatch.callId}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          {getStatusIcon(dispatch.priority)}
                          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(dispatch.priority)}`}>
                            {dispatch.priority} PRIORITY
                          </span>
                        </div>
                        <div className="flex items-center">
                          {getStatusIcon(dispatch.status)}
                          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(dispatch.status)}`}>
                            {dispatch.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium border border-purple-200">
                          {dispatch.incidentType.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{dispatch.vehiclePlate}</div>
                      <div className="text-xs text-gray-500">Unit: {dispatch.ambulanceUnitId}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Driver: {dispatch.driverName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Medic: {dispatch.medicName}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Patient Information
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div><strong>Name:</strong> {dispatch.patientName}</div>
                        <div><strong>Age:</strong> {dispatch.patientAge} years</div>
                        <div><strong>Patient ID:</strong> {dispatch.patientId}</div>
                        <div><strong>Condition:</strong> {dispatch.condition}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Pickup Location
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>{dispatch.pickupAddressLine1}</div>
                        {dispatch.pickupAddressLine2 && <div>{dispatch.pickupAddressLine2}</div>}
                        <div>{dispatch.pickupCity}, {dispatch.pickupState}</div>
                        <div>{dispatch.pickupPostalCode}, {dispatch.pickupCountry}</div>
                        <div className="text-xs text-gray-500">
                          📍 {dispatch.pickupLatitude}, {dispatch.pickupLongitude}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <Navigation className="w-4 h-4 mr-1" />
                        Destination
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div><strong>Hospital ID:</strong> {dispatch.hospitalId}</div>
                        <div>{dispatch.dropoffAddressLine1}</div>
                        {dispatch.dropoffAddressLine2 && <div>{dispatch.dropoffAddressLine2}</div>}
                        <div>{dispatch.dropoffCity}, {dispatch.dropoffState}</div>
                        <div>{dispatch.dropoffPostalCode}, {dispatch.dropoffCountry}</div>
                        <div className="text-xs text-gray-500">
                          📍 {dispatch.dropoffLatitude}, {dispatch.dropoffLongitude}
                        </div>
                        <div><strong>Distance:</strong> {dispatch.distance}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Timeline
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div><strong>Request:</strong> {new Date(dispatch.requestTime).toLocaleTimeString()}</div>
                        <div><strong>Dispatch:</strong> {new Date(dispatch.dispatchTime).toLocaleTimeString()}</div>
                        {dispatch.enRouteTime && (
                          <div><strong>En Route:</strong> {new Date(dispatch.enRouteTime).toLocaleTimeString()}</div>
                        )}
                        {dispatch.onSceneTime && (
                          <div><strong>On Scene:</strong> {new Date(dispatch.onSceneTime).toLocaleTimeString()}</div>
                        )}
                        {dispatch.departSceneTime && (
                          <div><strong>Left Scene:</strong> {new Date(dispatch.departSceneTime).toLocaleTimeString()}</div>
                        )}
                        {dispatch.arrivalAtHospitalTime && (
                          <div><strong>At Hospital:</strong> {new Date(dispatch.arrivalAtHospitalTime).toLocaleTimeString()}</div>
                        )}
                        {dispatch.completionTime && (
                          <div><strong>Completed:</strong> {new Date(dispatch.completionTime).toLocaleTimeString()}</div>
                        )}
                        {dispatch.actualTime && (
                          <div className="text-green-600"><strong>Response Time:</strong> {dispatch.actualTime}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Caller Information */}
                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Caller Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <strong>Name:</strong> {dispatch.callerName} | <strong>Phone:</strong> {dispatch.callerPhone}
                      </div>
                      {dispatch.callerNotes && (
                        <div className="col-span-2 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <strong>Caller Notes:</strong> {dispatch.callerNotes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Clinical Notes */}
                  {dispatch.notes && (
                    <div className="border-t border-gray-100 pt-4 mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <Activity className="w-4 h-4 mr-1" />
                        Clinical/Operational Notes
                      </h4>
                      <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400 text-sm text-gray-700">
                        {dispatch.notes}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Estimated Time: {dispatch.estimatedTime}
                      {dispatch.actualTime && ` | Actual: ${dispatch.actualTime}`}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors flex items-center text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Full Details
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors">
                        <Download className="w-4 h-4" />
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
                        {ambulances.filter(a => a.status === 'AVAILABLE' || a.status === 'available').length}
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
                        {ambulances.filter(a => a.status === 'BUSY' || a.status === 'in_transit').length}
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
                        {ambulances.filter(a => a.status === 'MAINTENANCE' || a.status === 'maintenance').length}
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
                    {ambulances.filter(a => a.status === 'AVAILABLE' || a.status === 'available').length} Available
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
                    {dispatches.filter(d => 
                      d.status === 'in_progress' || 
                      d.status === 'DISPATCHED' || 
                      d.status === 'EN_ROUTE' || 
                      d.status === 'ON_SCENE' || 
                      d.status === 'TRANSPORTING'
                    ).length} In Progress
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

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Priority and Incident Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level *</label>
                  <select
                    value={dispatchForm.priority}
                    onChange={(e) => setDispatchForm({...dispatchForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type *</label>
                  <select
                    value={dispatchForm.incidentType}
                    onChange={(e) => setDispatchForm({...dispatchForm, incidentType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="TRAFFIC_ACCIDENT">Traffic Accident</option>
                    <option value="CARDIAC_ARREST">Cardiac Arrest</option>
                    <option value="RESPIRATORY_DISTRESS">Respiratory Distress</option>
                    <option value="STROKE">Stroke</option>
                    <option value="TRAUMA">Trauma</option>
                    <option value="OBSTETRIC_EMERGENCY">Obstetric Emergency</option>
                    <option value="SCHEDULED_TRANSPORT">Scheduled Transport</option>
                    <option value="OTHER">Other</option>
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
                    {ambulances.filter(a => a.status === 'AVAILABLE' || a.status === 'available').map(ambulance => (
                      <option key={ambulance.vehicleNumber} value={ambulance.vehicleNumber}>
                        {ambulance.vehiclePlate} - {ambulance.driverName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Information */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Patient Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
                    <input
                      type="text"
                      value={dispatchForm.patientId}
                      onChange={(e) => setDispatchForm({...dispatchForm, patientId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="PAT-2024-XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
                    <input
                      type="text"
                      value={dispatchForm.patientName}
                      onChange={(e) => setDispatchForm({...dispatchForm, patientName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Age *</label>
                    <input
                      type="number"
                      value={dispatchForm.patientAge}
                      onChange={(e) => setDispatchForm({...dispatchForm, patientAge: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Age"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical Condition *</label>
                  <input
                    type="text"
                    value={dispatchForm.condition}
                    onChange={(e) => setDispatchForm({...dispatchForm, condition: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the medical condition"
                  />
                </div>
              </div>

              {/* Pickup Location */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  Pickup Location
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupAddressLine1}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupAddressLine1: e.target.value, pickupLocation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Street address, building name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupAddressLine2}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupAddressLine2: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Apartment, floor, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupCity}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupCity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State/County *</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupState}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupState: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="State/County"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupPostalCode}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupPostalCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="00100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupCountry}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupCountry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Kenya"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupLatitude}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupLatitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="-1.2921"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupLongitude}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupLongitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="36.8219"
                    />
                  </div>
                </div>
              </div>

              {/* Destination/Dropoff Location */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Navigation className="w-5 h-5 mr-2 text-purple-600" />
                  Destination Hospital
                </h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hospital ID</label>
                  <select
                    value={dispatchForm.hospitalId}
                    onChange={(e) => {
                      const hospitalId = e.target.value;
                      setDispatchForm({...dispatchForm, hospitalId, destination: e.target.options[e.target.selectedIndex].text});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select destination hospital</option>
                    <option value="HOSP-001">Kenyatta National Hospital</option>
                    <option value="HOSP-002">Nairobi Hospital</option>
                    <option value="HOSP-003">Aga Khan Hospital</option>
                    <option value="HOSP-004">Mater Hospital</option>
                    <option value="HOSP-005">MP Shah Hospital</option>
                    <option value="HOSP-999">Nearest Hospital</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffAddressLine1}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffAddressLine1: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Hospital address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffAddressLine2}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffAddressLine2: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Department, wing, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffCity}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffCity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State/County</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffState}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffState: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="State/County"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffPostalCode}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffPostalCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="00100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffCountry}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffCountry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Kenya"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffLatitude}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffLatitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="-1.3018"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffLongitude}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffLongitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="36.8073"
                    />
                  </div>
                </div>
              </div>

              {/* Caller Information */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-orange-600" />
                  Caller Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Caller Name *</label>
                    <input
                      type="text"
                      value={dispatchForm.callerName}
                      onChange={(e) => setDispatchForm({...dispatchForm, callerName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Who is calling?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Caller Phone *</label>
                    <input
                      type="tel"
                      value={dispatchForm.callerPhone}
                      onChange={(e) => setDispatchForm({...dispatchForm, callerPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+254 7xx xxx xxx"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caller Notes</label>
                  <textarea
                    value={dispatchForm.callerNotes}
                    onChange={(e) => setDispatchForm({...dispatchForm, callerNotes: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional information from the caller..."
                  />
                </div>
              </div>

              {/* Clinical/Operational Notes */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-red-600" />
                  Clinical & Operational Notes
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions / Notes</label>
                  <textarea
                    value={dispatchForm.notes}
                    onChange={(e) => setDispatchForm({...dispatchForm, notes: e.target.value, specialInstructions: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special instructions for the medical team, clinical observations, operational notes..."
                  />
                </div>
              </div>

              {/* Estimates */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Estimates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Distance</label>
                    <input
                      type="text"
                      value={dispatchForm.estimatedDistance}
                      onChange={(e) => setDispatchForm({...dispatchForm, estimatedDistance: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 12.5 km"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time</label>
                    <input
                      type="text"
                      value={dispatchForm.estimatedTime}
                      onChange={(e) => setDispatchForm({...dispatchForm, estimatedTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 15 minutes"
                    />
                  </div>
                </div>
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
                    const ambulanceToDispatch = selectedAmbulance || ambulances.find(a => a.status === 'AVAILABLE' || a.status === 'available')?.vehicleNumber;
                    
                    // Validate required fields
                    if (!ambulanceToDispatch) {
                      alert('No ambulance available for dispatch');
                      return;
                    }
                    if (!dispatchForm.patientName || !dispatchForm.pickupAddressLine1 || !dispatchForm.callerName) {
                      alert('Please fill in all required fields (Patient Name, Pickup Address, Caller Name)');
                      return;
                    }
                    
                    handleDispatch(ambulanceToDispatch, 'manual-dispatch');
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