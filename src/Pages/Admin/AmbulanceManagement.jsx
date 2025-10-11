import React, { useState } from 'react';
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
  RefreshCw
} from 'lucide-react';
import AdminNavbar from '../../Components/AdminNavbar';
import AdminSidebar from '../../Components/AdminSidebar';

const AmbulanceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [activeTab, setActiveTab] = useState('ambulances'); // 'ambulances', 'drivers', 'dispatches'
  const [selectedItems, setSelectedItems] = useState([]);

  // Sample ambulances data
  const ambulances = [
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
  ];

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
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('ambulances')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'ambulances'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Truck className="w-4 h-4 inline mr-2" />
                Ambulances ({ambulances.length})
              </button>
              <button
                onClick={() => setActiveTab('drivers')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'drivers'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Drivers ({drivers.length})
              </button>
              <button
                onClick={() => setActiveTab('dispatches')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'dispatches'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Navigation className="w-4 h-4 inline mr-2" />
                Dispatches ({dispatches.length})
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
    </div>
  );
};

export default AmbulanceManagement;