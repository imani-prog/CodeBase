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

// Import modal components
import ViewAmbulanceModal from './AmbulanceManagement/modals/ViewAmbulanceModal';
import EditAmbulanceModal from './AmbulanceManagement/modals/EditAmbulanceModal';
import AddAmbulanceModal from './AmbulanceManagement/modals/AddAmbulanceModal';
import AddDriverModal from './AmbulanceManagement/modals/AddDriverModal';
import ViewDriverModal from './AmbulanceManagement/modals/ViewDriverModal';
import EditDriverModal from './AmbulanceManagement/modals/EditDriverModal';
import MoreOptionsDriverModal from './AmbulanceManagement/modals/MoreOptionsDriverModal';
import MoreOptionsModal from './AmbulanceManagement/modals/MoreOptionsModal';
import Pagination from '../../Components/Admin/Pagination';

const AmbulanceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [activeTab, setActiveTab] = useState('ambulances'); 
  const [_selectedItems, _setSelectedItems] = useState([]);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  
  // Pagination states
  const [ambulancePage, setAmbulancePage] = useState(1);
  const [driverPage, setDriverPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [currentAmbulance, setCurrentAmbulance] = useState(null);
  
  // Driver modal states
  const [showViewDriverModal, setShowViewDriverModal] = useState(false);
  const [showEditDriverModal, setShowEditDriverModal] = useState(false);
  const [showMoreDriverModal, setShowMoreDriverModal] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);
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


  const ambulances = useMemo(() => [
    {
      id: 1,
      vehiclePlate: 'AMB-001-NB',
      vehicleNumber: 'AMB-001-NB',
      registrationNumber: 'KCB-001-2020',
      model: 'Toyota Land Cruiser',
      year: 2020,
      type: 'advanced_life_support',
      status: 'AVAILABLE',
      fuelType: 'DIESEL',
      capacity: 6,
      equippedForICU: true,
      gpsEnabled: true,
      location: 'Nairobi Central Hospital',
      driverName: 'John Kamau',
      driverPhone: '+254 712 345 678',
      medicName: 'Dr. Sarah Kimani',
      insurancePolicyNumber: 'INS-KE-2024-001',
      insuranceProvider: 'Jubilee Insurance', 
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
      status: 'BUSY',
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

  // Sample dispatch records
  const dispatches = [
    {
      id: 1,
      incidentId: 'INC-2024-1011-001',
      incidentType: 'CARDIAC_ARREST',
      callId: 'EMRG-2024-1011-001',
      ambulanceId: 'AMB-002-NB',
      ambulanceUnitId: 'UNIT-002',
      vehiclePlate: 'AMB-002-NB',
      driverId: 2,
      driverName: 'Mary Wanjiku',
      medicName: 'Nurse Peter Omondi',
      priority: 'CRITICAL',
      status: 'TRANSPORTING',
      
      // Caller information
      callerName: 'Dr. Susan Mwangi',
      callerPhone: '+254712890123',
      callerNotes: 'Patient is unconscious, CPR in progress by bystanders',
      
      // Patient information
      patientId: 'PAT-2024-045',
      patientName: 'Michael Ochieng',
      patientAge: 45,
      condition: 'Chest Pain - Suspected Myocardial Infarction',
      
      // Pickup location (structured address matching backend)
      pickupLocation: 'Mathare Shopping Center',
      pickupAddressLine1: 'Mathare Shopping Center',
      pickupAddressLine2: 'Juja Road',
      pickupCity: 'Nairobi',
      pickupState: 'Nairobi County',
      pickupPostalCode: '00100',
      pickupCountry: 'Kenya',
      pickupLatitude: -1.2541,
      pickupLongitude: 36.8749,
      
      // Dropoff location (structured address matching backend)
      destination: 'Kenyatta Hospital Emergency',
      hospitalId: 'HOSP-001',
      dropoffAddressLine1: 'Kenyatta National Hospital',
      dropoffAddressLine2: 'Hospital Road',
      dropoffCity: 'Nairobi',
      dropoffState: 'Nairobi County',
      dropoffPostalCode: '00202',
      dropoffCountry: 'Kenya',
      dropoffLatitude: -1.3018,
      dropoffLongitude: 36.8073,
      
      // Timestamps (matching backend)
      requestTime: '2024-10-11T16:15:00+03:00',
      dispatchTime: '2024-10-11T16:16:30+03:00', 
      enRouteTime: '2024-10-11T16:17:45+03:00', 
      onSceneTime: '2024-10-11T16:25:30+03:00', 
      departSceneTime: '2024-10-11T16:35:15+03:00',
      arrivalAtHospitalTime: null,
      completionTime: null, 
      
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
      callTime: new Date(Date.now() - 5 * 60000),
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
      callTime: new Date(Date.now() - 10 * 60000),
      estimatedResponse: '12 minutes',
      nearestAmbulances: ['AMB-002-NB', 'AMB-004-NB'],
      status: 'pending'
    },
    {
      id: 'EMG-003',
      priority: 'medium',
      patientName: 'Lucy Wambui',
      condition: 'Fall Injury - Possible Fracture',
      location: 'Karen Shopping Center, Near Entrance B',
      coordinates: { lat: -1.3521, lng: 36.7073 },
      callerName: 'Shop Owner',
      callerPhone: '+254 711 654 321',
      callTime: new Date(Date.now() - 15 * 60000),
      estimatedResponse: '10 minutes',
      nearestAmbulances: ['AMB-005-NB', 'AMB-006-NB'],
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
      case 'AVAILABLE': return 'text-green-800 border-green-200';
      case 'BUSY':
      case 'IN_TRANSIT':
      case 'TRANSPORTING':
      case 'EN_ROUTE':
      case 'ON_SCENE': return 'text-blue-800 border-blue-200';
      case 'MAINTENANCE': return 'text-yellow-800 border-yellow-200';
      case 'OUT_OF_SERVICE': return 'text-red-800 border-red-200';
      case 'ON_DUTY': return 'text-green-800 border-green-200';
      case 'ON_TRIP': return 'text-blue-800 border-blue-200';
      case 'OFF_DUTY': return 'text-gray-800 border-gray-200';
      case 'CRITICAL': return 'text-red-800 border-red-200';
      case 'HIGH': return 'text-orange-800 border-orange-200';
      case 'MEDIUM': return 'text-yellow-800 border-yellow-200';
      case 'LOW': return 'text-blue-800 border-blue-200';
      case 'IN_PROGRESS':
      case 'REQUESTED':
      case 'DISPATCHED': return 'text-blue-800 border-blue-200';
      case 'COMPLETED':
      case 'AT_HOSPITAL': return 'text-green-800 border-green-200';
      case 'CANCELED': return 'text-red-800 border-red-200';
      default: return 'text-gray-800 border-gray-200';
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

  // Paginated data
  const paginatedAmbulances = useMemo(() => {
    const startIndex = (ambulancePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAmbulances.slice(startIndex, endIndex);
  }, [filteredAmbulances, ambulancePage]);

  const paginatedDrivers = useMemo(() => {
    const startIndex = (driverPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredDrivers.slice(startIndex, endIndex);
  }, [filteredDrivers, driverPage]);

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

  // Modal handlers
  const handleEditSave = (updatedAmbulance) => {
    // TODO: Implement API call to update ambulance
    console.log('Saving updated ambulance:', updatedAmbulance);
    
  
    // Close modal
    setShowEditModal(false);
    setCurrentAmbulance(null);
    
    // Show success message
    alert('Ambulance updated successfully!');
  };

  const handleAddSave = (newAmbulance) => {
    // TODO: Implement API call to add new ambulance
    console.log('Adding new ambulance:', newAmbulance);
    
    // Close modal
    setShowAddModal(false);
    
    // Show success message
    alert('Ambulance added successfully!');
  };

  const handleAddDriverSave = (newDriver) => {
    // TODO: Implement API call to add new driver
    console.log('Adding new driver:', newDriver);
    
    // Close modal
    setShowAddDriverModal(false);
    
    // Show success message
    alert('Driver added successfully!');
  };

  const handleEditDriverSave = (updatedDriver) => {
    // TODO: Implement API call to update driver
    console.log('Updating driver:', updatedDriver);
    
    // Close modal
    setShowEditDriverModal(false);
    setCurrentDriver(null);
    
    // Show success message
    alert('Driver updated successfully!');
  };

  const handleMoreDriverAction = (action, driver) => {
    console.log(`Action: ${action} for driver:`, driver);
    
    switch(action) {
      case 'view-history':
        alert(`Loading trip history for ${driver.name}...`);
        break;
      case 'schedule':
        alert(`Opening schedule management for ${driver.name}...`);
        break;
      case 'location':
        alert(`Tracking location for ${driver.name}...`);
        break;
      case 'export':
        alert(`Exporting details for ${driver.name}...`);
        break;
      case 'suspend':
        if (confirm(`Are you sure you want to suspend ${driver.name}?`)) {
          alert(`${driver.name} has been suspended.`);
        }
        break;
      case 'deactivate':
        if (confirm(`Are you sure you want to deactivate ${driver.name}? This action cannot be undone.`)) {
          alert(`${driver.name} has been deactivated.`);
        }
        break;
      case 'delete':
        if (confirm(`Are you sure you want to permanently delete ${driver.name}? This action cannot be undone and all data will be lost.`)) {
          // TODO: Implement API call to delete driver
          alert(`${driver.name} has been deleted from the system.`);
          console.log('Deleting driver:', driver);
        }
        break;
      default:
        alert(`Action ${action} not implemented yet.`);
    }
    
    // Close the more options modal
    setShowMoreDriverModal(false);
    setCurrentDriver(null);
  };

  const handleMoreAction = (action, ambulance) => {
    console.log(`Action: ${action} for ambulance:`, ambulance);
    
    switch(action) {
      case 'track':
        // TODO: Implement tracking functionality
        alert(`Tracking ${ambulance.vehiclePlate}...`);
        break;
      case 'schedule':
        // TODO: Open maintenance scheduling
        alert(`Opening maintenance schedule for ${ambulance.vehiclePlate}...`);
        break;
      case 'history':
        // TODO: Show service history
        alert(`Loading service history for ${ambulance.vehiclePlate}...`);
        break;
      case 'export':
        // TODO: Export ambulance details
        alert(`Exporting details for ${ambulance.vehiclePlate}...`);
        break;
      case 'print':
        // TODO: Print report
        alert(`Printing report for ${ambulance.vehiclePlate}...`);
        break;
      case 'refresh':
        // TODO: Refresh ambulance status
        alert(`Refreshing status for ${ambulance.vehiclePlate}...`);
        break;
      case 'archive':
        if (confirm(`Are you sure you want to archive ${ambulance.vehiclePlate}?`)) {
          // TODO: Archive ambulance
          alert(`${ambulance.vehiclePlate} archived successfully`);
        }
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete ${ambulance.vehiclePlate}? This action cannot be undone.`)) {
          // TODO: Delete ambulance
          alert(`${ambulance.vehiclePlate} deleted successfully`);
        }
        break;
      default:
        console.log('Unknown action:', action);
    }
    
    // Close modal
    setShowMoreModal(false);
    setCurrentAmbulance(null);
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
      <div className="mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Ambulance Management</h1>
              <p className="text-gray-600">
                Manage ambulance fleet, drivers, dispatch operations, and emergency response
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Fleet</p>
                  <p className="text-2xl font-bold text-gray-900">{ambulances.length}</p>
                </div>
                <div className="p-3 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-600 flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                {ambulances.filter(a => a.status === 'AVAILABLE' || a.status === 'available').length} Available
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Drivers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {drivers.filter(d => d.status === 'on_duty').length}
                  </p>
                </div>
                <div className="p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-600">
                of {drivers.length} total drivers
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Emergency Calls</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {emergencyCalls.filter(c => c.status === 'pending').length}
                  </p>
                </div>
                <div className="p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-600">
                {emergencyCalls.length} total calls
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Tracking</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Object.keys(trackingData).length}
                  </p>
                </div>
                <div className="p-3 rounded-lg">
                  <Navigation className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-600 flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-pulse"></div>
                Live monitoring
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
            
            </div> 
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
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {activeTab === 'ambulances' && (
                    <div className="flex gap-3">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none "
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {typeOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex  space-x-3">
                  <button className="flex items-center px-4 py-2 border border-gray-300  text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button 
                    onClick={() => {
                      if (activeTab === 'ambulances') {
                        setShowAddModal(true);
                      } else if (activeTab === 'drivers') {
                        setShowAddDriverModal(true);
                      }
                    }}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add {activeTab === 'dispatch' ? 'dispatch' : activeTab === 'dispatches' ? 'dispatch' : activeTab === 'tracking' ? 'unit' : activeTab.slice(0, -1)}
                  </button>
                </div>
              </div>
            </div>

          {/* Ambulances Tab */}
              {activeTab === 'ambulances' && (
              <>
              <div className="bg-white shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 uppercase text-xs font-semibold">
              <tr>
                <th className="px-3 py-3 text-left">Vehicle Plate</th>
                <th className="px-3 py-3 text-left">Registration</th>
                <th className="px-3 py-3 text-left">Year</th>
                <th className="px-3 py-3 text-left">Type</th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-left">Driver</th>
                <th className="px-3 py-3 text-left">Medic</th>
                <th className="px-3 py-3 text-center">Trips</th>
                <th className="px-3 py-3 text-center">Avg Response</th>
                <th className="px-3 py-3 text-left">Insurance Provider</th>
                <th className="px-3 py-3 text-left">Policy Number</th>
                <th className="px-3 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAmbulances.map((a) => (
                <tr key={a.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  {/* Vehicle Plate */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{a.vehiclePlate}</p>
                  </td>

                  {/* Registration Number */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{a.registrationNumber}</p>
                  </td>

                  {/* Year */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{a.year}</p>
                  </td>

                  {/* Type */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm text-gray-700 capitalize">{a.type.replace("_", " ")}</p>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        a.status
                      )}`}
                    >
                      {a.status.replace("_", " ").toUpperCase()}
                    </span>
                  </td>

                  {/* Driver */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{a.driverName}</p>
                  </td>

                  {/* Medic */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{a.medicName}</p>
                  </td>

                  {/* Total Trips */}
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-900">{a.totalDispatches}</p>
                  </td>

                  {/* Avg Response */}
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <p className="text-sm text-gray-700">{a.averageResponseTime}</p>
                  </td>

                  {/* Insurance Provider */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{a.insuranceProvider}</p>
                  </td>

                  {/* Policy Number */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-xs text-gray-600">{a.insurancePolicyNumber}</p>
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => {
                          setCurrentAmbulance(a);
                          setShowViewModal(true);
                        }}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => {
                          setCurrentAmbulance(a);
                          setShowEditModal(true);
                        }}
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => {
                          setCurrentAmbulance(a);
                          setShowMoreModal(true);
                        }}
                        title="More Options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAmbulances.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              No ambulances found.
            </div>
          )}
        </div>
        
        {filteredAmbulances.length > 0 && (
          <Pagination
            currentPage={ambulancePage}
            totalItems={filteredAmbulances.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setAmbulancePage}
            itemName="ambulances"
          />
        )}
        </>
          )}

          {/* Drivers Tab */}
          {activeTab === 'drivers' && (
            <div className="shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Driver</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Email</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Phone</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Shift Time</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Vehicle</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Location</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Experience</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Certifications</th>
                      <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">Total Trips</th>
                      <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedDrivers.map((driver) => (
                      <tr key={driver.id} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                        <td className="px-3 py-3">
                          <div className="flex items-center whitespace-nowrap">
                            <img
                              src={driver.avatar}
                              alt={driver.name}
                              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver.name)}&background=3B82F6&color=fff&size=32`;
                              }}
                            />
                            <span className="ml-3 text-sm font-medium text-gray-900">{driver.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{driver.email}</span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{driver.phone}</span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(driver.status)}
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(driver.status)}`}>
                              {driver.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-600">
                            {driver.shiftStart} - {driver.shiftEnd}
                          </span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{driver.currentVehicle}</span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{driver.location}</span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{driver.experience}</span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-600">
                            {driver.certifications.slice(0, 2).join(', ')}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-center whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{driver.totalTrips}</span>
                        </td>
                        <td className="px-3 py-3 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center space-x-2">
                            <button 
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              onClick={() => {
                                setCurrentDriver(driver);
                                setShowViewDriverModal(true);
                              }}
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              onClick={() => {
                                setCurrentDriver(driver);
                                setShowEditDriverModal(true);
                              }}
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                              onClick={() => {
                                setCurrentDriver(driver);
                                setShowMoreDriverModal(true);
                              }}
                              title="More Options"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredDrivers.length > 0 && (
                <Pagination
                  currentPage={driverPage}
                  totalItems={filteredDrivers.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setDriverPage}
                  itemName="drivers"
                />
              )}
            </div>
          )}

          {/* Emergency Dispatch Tab */}
          {activeTab === 'dispatch' && (
            <div className="bg-white shadow overflow-x-auto">
              {emergencyCalls.length === 0 ? (
                <div className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Emergency Calls</h3>
                  <p className="text-gray-500">All emergency calls have been handled. Great work!</p>
                </div>
              ) : (
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-4 py-3 text-left">Call ID</th>
                      <th className="px-4 py-3 text-left">Priority</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Patient Info</th>
                      <th className="px-4 py-3 text-left">Location</th>
                      <th className="px-4 py-3 text-left">Caller Details</th>
                      <th className="px-4 py-3 text-left">Time Info</th>
                      <th className="px-4 py-3 text-left">Nearest Units</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emergencyCalls.map((call) => (
                      <tr key={call.id} className="border-b hover:bg-gray-50 transition-colors">
                        {/* Call ID */}
                        <td className="px-4 py-4">
                          <div className="font-semibold text-gray-900">{call.id}</div>
                        </td>

                        {/* Priority */}
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
                            call.priority === 'critical' ? 'text-red-800 bg-red-50 border-red-200' :
                            call.priority === 'high' ? 'text-orange-800 bg-orange-50 border-orange-200' :
                            'text-yellow-800 bg-yellow-50 border-yellow-200'
                          }`}>
                            {call.priority.toUpperCase()}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(call.status)}`}>
                            {call.status.toUpperCase()}
                          </span>
                        </td>

                        {/* Patient Info */}
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">{call.patientName}</div>
                            <div className="text-xs text-gray-600">{call.condition}</div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-4 py-4">
                          <div className="flex items-start max-w-xs">
                            <MapPin className="w-4 h-4 mr-1 mt-0.5 text-gray-400 flex-shrink-0" />
                            <span className="text-gray-700">{call.location}</span>
                          </div>
                        </td>

                        {/* Caller Details */}
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="text-gray-900">{call.callerName}</div>
                            <div className="flex items-center text-xs text-gray-600">
                              <Phone className="w-3 h-3 mr-1" />
                              {call.callerPhone}
                            </div>
                          </div>
                        </td>

                        {/* Time Info */}
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-xs text-gray-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {call.callTime.toLocaleTimeString()}
                            </div>
                            <div className="text-xs text-gray-600">
                              Est: {call.estimatedResponse}
                            </div>
                            <div className="text-xs font-medium text-red-600">
                              Elapsed: {Math.floor((Date.now() - call.callTime.getTime()) / 60000)} min
                            </div>
                          </div>
                        </td>

                        {/* Nearest Units */}
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            {call.nearestAmbulances.slice(0, 2).map((ambulanceId) => {
                              const ambulance = ambulances.find(a => a.vehicleNumber === ambulanceId);
                              const isAvailable = ambulance?.status === 'available';
                              
                              return (
                                <div key={ambulanceId} className="flex items-center text-xs">
                                  <div className={`w-2 h-2 rounded-full mr-1 ${isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                  <span className={isAvailable ? 'text-green-700 font-medium' : 'text-gray-500'}>
                                    {ambulanceId}
                                  </span>
                                </div>
                              );
                            })}
                            {call.nearestAmbulances.length > 2 && (
                              <div className="text-xs text-gray-500">+{call.nearestAmbulances.length - 2} more</div>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            {call.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => handleQuickDispatch(call)}
                                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-xs whitespace-nowrap"
                                  title="Quick Dispatch"
                                >
                                  <Zap className="w-3 h-3 mr-1" />
                                  Quick
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
                                  className="bg-gray-600 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors flex items-center text-xs whitespace-nowrap"
                                  title="Manual Dispatch"
                                >
                                  <Send className="w-3 h-3 mr-1" />
                                  Manual
                                </button>
                                <button 
                                  className="text-gray-400 hover:text-gray-600 transition-colors"
                                  title="More Options"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <span className="text-xs text-gray-500">Dispatched</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Live Tracking Tab */}
          {activeTab === 'tracking' && (
            <div className="space-y-6">
              {/* Map Container */}
              <div className="border border-gray-200 bg-white">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-base font-semibold">Live Ambulance Tracking</h3>
                      <div className="flex items-center text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                        Real-time Updates
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm">
                      <RefreshCw className="w-3 h-3 mr-1.5" />
                      Refresh Map
                    </button>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="h-64 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <Map className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-base font-medium mb-1">Interactive Map View</h3>
                    <p className="text-sm text-gray-600">Integration with Google Maps/Mapbox for live tracking</p>
                    <div className="mt-3 flex justify-center space-x-4">
                      <div className="flex items-center text-xs text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        Available
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                        In Transit
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                        Emergency
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Tracking Table */}
              <div className="bg-white shadow overflow-x-auto">
                {Object.keys(trackingData).length === 0 ? (
                  <div className="p-12 text-center">
                    <Navigation className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Tracking</h3>
                    <p className="text-gray-500">No ambulances are currently being tracked</p>
                  </div>
                ) : (
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 uppercase text-xs font-semibold">
                      <tr>
                        <th className="px-4 py-3 text-left">Vehicle ID</th>
                        <th className="px-4 py-3 text-left">Driver</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Current Location</th>
                        <th className="px-4 py-3 text-left">Speed & Heading</th>
                        <th className="px-4 py-3 text-center">Signal</th>
                        <th className="px-4 py-3 text-left">Last Update</th>
                        <th className="px-4 py-3 text-left">Recent Route</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(trackingData).map(([vehicleId, data]) => {
                        const ambulance = ambulances.find(a => a.vehicleNumber === vehicleId);
                        if (!ambulance) return null;

                        return (
                          <tr key={vehicleId} className="border-b hover:bg-gray-50 transition-colors">
                            {/* Vehicle ID */}
                            <td className="px-4 py-4">
                              <div className="font-semibold text-gray-900">{vehicleId}</div>
                              <div className="text-xs text-gray-500">{ambulance.vehiclePlate}</div>
                            </td>

                            {/* Driver */}
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                <UserCheck className="w-4 h-4 mr-1.5 text-gray-400" />
                                <span className="text-gray-700">{ambulance.currentDriver}</span>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                {getStatusIcon(ambulance.status)}
                                <span className={`ml-1.5 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ambulance.status)}`}>
                                  {ambulance.status.replace('_', ' ').toUpperCase()}
                                </span>
                              </div>
                            </td>

                            {/* Current Location */}
                            <td className="px-4 py-4">
                              <div className="flex items-start">
                                <MapPin className="w-4 h-4 mr-1.5 mt-0.5 text-gray-400 flex-shrink-0" />
                                <div>
                                  <div className="text-xs text-gray-700 font-medium">
                                    {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {ambulance.location}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Speed & Heading */}
                            <td className="px-4 py-4">
                              <div className="space-y-1">
                                <div className="flex items-center text-xs">
                                  <Zap className="w-3 h-3 mr-1 text-blue-500" />
                                  <span className="font-medium text-gray-900">{data.speed.toFixed(0)} km/h</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Compass className="w-3 h-3 mr-1 text-gray-400" />
                                  <span>{data.heading.toFixed(0)}°</span>
                                </div>
                              </div>
                            </td>

                            {/* Signal Strength */}
                            <td className="px-4 py-4">
                              <div className="flex flex-col items-center space-y-1">
                                <div className="flex items-center space-x-0.5">
                                  {[1,2,3,4].map(bar => (
                                    <div 
                                      key={bar}
                                      className={`w-1 h-3 rounded ${bar <= data.signalStrength ? 'bg-green-500' : 'bg-gray-300'}`}
                                    ></div>
                                  ))}
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Wifi className="w-3 h-3 mr-1" />
                                  Connected
                                </div>
                              </div>
                            </td>

                            {/* Last Update */}
                            <td className="px-4 py-4">
                              <div className="flex items-center text-xs text-gray-600">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{data.lastUpdate.toLocaleTimeString()}</span>
                              </div>
                            </td>

                            {/* Recent Route */}
                            <td className="px-4 py-4">
                              <div className="space-y-1 max-w-xs">
                                {data.route.slice(-3).map((point, index) => (
                                  <div key={index} className="flex items-center text-xs text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 flex-shrink-0"></div>
                                    <span className="truncate">{point.timestamp} - {point.lat.toFixed(4)}, {point.lng.toFixed(4)}</span>
                                  </div>
                                ))}
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-4">
                              <div className="flex items-center justify-center space-x-2">
                                <button 
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                  title="Call Driver"
                                >
                                  <PhoneCall className="w-4 h-4" />
                                </button>
                                <button 
                                  className="text-green-600 hover:text-green-800 transition-colors"
                                  title="Send Message"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </button>
                                <button 
                                  className="text-purple-600 hover:text-purple-800 transition-colors"
                                  title="View Route"
                                >
                                  <Navigation2 className="w-4 h-4" />
                                </button>
                                <button 
                                  className="text-gray-400 hover:text-gray-600 transition-colors"
                                  title="More Options"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

      {/* Dispatch Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Dispatch Ambulance</h3>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="PAT-2024-XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
                    <input
                      type="text"
                      value={dispatchForm.patientName}
                      onChange={(e) => setDispatchForm({...dispatchForm, patientName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Age *</label>
                    <input
                      type="number"
                      value={dispatchForm.patientAge}
                      onChange={(e) => setDispatchForm({...dispatchForm, patientAge: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                    placeholder="Describe the medical condition"
                  />
                </div>
              </div>

              {/* Pickup Location */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Pickup Location
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupAddressLine1}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupAddressLine1: e.target.value, pickupLocation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="Street address, building name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupAddressLine2}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupAddressLine2: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="Apartment, floor, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupCity}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupCity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State/County *</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupState}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupState: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="State/County"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupPostalCode}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupPostalCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="00100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupCountry}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupCountry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="-1.2921"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupLongitude}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupLongitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="36.8219"
                    />
                  </div>
                </div>
              </div>

              {/* Destination/Dropoff Location */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Navigation className="w-5 h-5 mr-2 text-blue-600" />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="Hospital address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffAddressLine2}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffAddressLine2: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="Department, wing, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffCity}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffCity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State/County</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffState}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffState: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="State/County"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffPostalCode}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffPostalCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="00100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffCountry}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffCountry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="-1.3018"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffLongitude}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffLongitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="36.8073"
                    />
                  </div>
                </div>
              </div>

              {/* Caller Information */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  Caller Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Caller Name *</label>
                    <input
                      type="text"
                      value={dispatchForm.callerName}
                      onChange={(e) => setDispatchForm({...dispatchForm, callerName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="Who is calling?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Caller Phone *</label>
                    <input
                      type="tel"
                      value={dispatchForm.callerPhone}
                      onChange={(e) => setDispatchForm({...dispatchForm, callerPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                    placeholder="Additional information from the caller..."
                  />
                </div>
              </div>

              {/* Clinical/Operational Notes */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Clinical & Operational Notes
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions / Notes</label>
                  <textarea
                    value={dispatchForm.notes}
                    onChange={(e) => setDispatchForm({...dispatchForm, notes: e.target.value, specialInstructions: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                      placeholder="e.g., 12.5 km"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time</label>
                    <input
                      type="text"
                      value={dispatchForm.estimatedTime}
                      onChange={(e) => setDispatchForm({...dispatchForm, estimatedTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
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
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Dispatch Ambulance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showViewModal && currentAmbulance && (
        <ViewAmbulanceModal
          ambulance={currentAmbulance}
          onClose={() => {
            setShowViewModal(false);
            setCurrentAmbulance(null);
          }}
          getStatusColor={getStatusColor}
          getTypeIcon={getTypeIcon}
        />
      )}

      {showEditModal && currentAmbulance && (
        <EditAmbulanceModal
          ambulance={currentAmbulance}
          onClose={() => {
            setShowEditModal(false);
            setCurrentAmbulance(null);
          }}
          onSave={handleEditSave}
        />
      )}

      {showMoreModal && currentAmbulance && (
        <MoreOptionsModal
          ambulance={currentAmbulance}
          onClose={() => {
            setShowMoreModal(false);
            setCurrentAmbulance(null);
          }}
          onAction={handleMoreAction}
        />
      )}

      {showAddModal && (
        <AddAmbulanceModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {showAddDriverModal && (
        <AddDriverModal
          onClose={() => setShowAddDriverModal(false)}
          onSave={handleAddDriverSave}
        />
      )}

      {/* Driver Modals */}
      {showViewDriverModal && currentDriver && (
        <ViewDriverModal
          driver={currentDriver}
          onClose={() => {
            setShowViewDriverModal(false);
            setCurrentDriver(null);
          }}
          getStatusColor={getStatusColor}
        />
      )}

      {showEditDriverModal && currentDriver && (
        <EditDriverModal
          driver={currentDriver}
          onClose={() => {
            setShowEditDriverModal(false);
            setCurrentDriver(null);
          }}
          onSave={handleEditDriverSave}
        />
      )}

      {showMoreDriverModal && currentDriver && (
        <MoreOptionsDriverModal
          driver={currentDriver}
          onClose={() => {
            setShowMoreDriverModal(false);
            setCurrentDriver(null);
          }}
          onAction={handleMoreDriverAction}
        />
      )}
    </div>
  );
};

export default AmbulanceManagement;