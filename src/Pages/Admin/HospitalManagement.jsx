import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2,
  MoreHorizontal,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Bed,
  Truck,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload,
  Settings,
  TrendingUp,
  Shield,
  Clock,
  Calendar,
  Star,
  Target,
  Stethoscope,
  Heart,
  Pill,
  TestTube,
  Microscope,
  Syringe,
  Ambulance
} from 'lucide-react';
import HospitalFormModal from '../../Components/Admin/EditHospitalModal';

const HospitalManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  // Hospital types matching backend enum
  const hospitalTypes = ['PUBLIC', 'PRIVATE', 'FAITH_BASED', 'NGO'];
  const hospitalStatuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED'];
  
  // Facility types matching backend
  const facilityTypes = [
    'LABORATORY',
    'PHARMACY',
    'RADIOLOGY',
    'ICU',
    'EMERGENCY',
    'MATERNITY',
    'SURGERY',
    'PEDIATRICS',
    'OUTPATIENT',
    'INPATIENT'
  ];

  // Sample hospitals data matching backend structure exactly
  const hospitals = [
    {
      id: 1,
      code: 'HS001',
      name: 'Kenyatta National Hospital',
      type: 'PUBLIC',
      registrationNumber: 'KNH-REG-2001',
      taxId: 'TAX-KNH-001',
      phone: '+254-20-2726300',
      email: 'info@knh.or.ke',
      website: 'www.knh.or.ke',
      fax: '+254-20-2725272',
      addressLine1: 'Hospital Road, Upper Hill',
      addressLine2: 'P.O. Box 20723-00202',
      city: 'Nairobi',
      state: 'Nairobi County',
      postalCode: '00202',
      country: 'Kenya',
      latitude: -1.3018,
      longitude: 36.8073,
      numberOfBeds: 1800,
      numberOfICUBeds: 80,
      numberOfAmbulances: 15,
      servicesOffered: [
        'Emergency Care',
        'Surgery',
        'Maternity',
        'Pediatrics',
        'Oncology',
        'Cardiology',
        'Neurology',
        'Orthopedics'
      ],
      facilities: [
        'LABORATORY',
        'PHARMACY',
        'RADIOLOGY',
        'ICU',
        'EMERGENCY',
        'MATERNITY',
        'SURGERY',
        'PEDIATRICS',
        'OUTPATIENT',
        'INPATIENT'
      ],
      insuranceProvidersAccepted: [
        'NHIF',
        'SHA',
        'AAR',
        'Jubilee',
        'Britam',
        'Madison',
        'CIC'
      ],
      status: 'ACTIVE',
      createdAt: '2020-01-15T08:00:00',
      updatedAt: '2025-12-15T10:30:00'
    },
    {
      id: 2,
      code: 'HS002',
      name: 'Aga Khan University Hospital',
      type: 'PRIVATE',
      registrationNumber: 'AKUH-REG-1998',
      taxId: 'TAX-AKUH-002',
      phone: '+254-20-3662000',
      email: 'info@aku.edu',
      website: 'www.aku.edu/nairobi',
      fax: '+254-20-3740917',
      addressLine1: '3rd Parklands Avenue',
      addressLine2: 'P.O. Box 30270-00100',
      city: 'Nairobi',
      state: 'Nairobi County',
      postalCode: '00100',
      country: 'Kenya',
      latitude: -1.2626,
      longitude: 36.8070,
      numberOfBeds: 254,
      numberOfICUBeds: 24,
      numberOfAmbulances: 8,
      servicesOffered: [
        'Emergency Care',
        'Surgery',
        'Maternity',
        'Cardiology',
        'Oncology',
        'Diagnostics',
        'Wellness Center'
      ],
      facilities: [
        'LABORATORY',
        'PHARMACY',
        'RADIOLOGY',
        'ICU',
        'EMERGENCY',
        'MATERNITY',
        'SURGERY',
        'OUTPATIENT',
        'INPATIENT'
      ],
      insuranceProvidersAccepted: [
        'NHIF',
        'AAR',
        'Jubilee',
        'Britam',
        'Madison',
        'CIC',
        'Resolution'
      ],
      status: 'ACTIVE',
      createdAt: '2019-05-10T09:00:00',
      updatedAt: '2025-12-18T14:20:00'
    },
    {
      id: 3,
      code: 'HS003',
      name: 'Mombasa General Hospital',
      type: 'PUBLIC',
      registrationNumber: 'MGH-REG-2003',
      taxId: 'TAX-MGH-003',
      phone: '+254-41-2314201',
      email: 'info@mombasahospital.go.ke',
      website: 'www.mombasahospital.go.ke',
      fax: '+254-41-2225792',
      addressLine1: 'Nyerere Avenue',
      addressLine2: 'P.O. Box 90114-80100',
      city: 'Mombasa',
      state: 'Mombasa County',
      postalCode: '80100',
      country: 'Kenya',
      latitude: -4.0435,
      longitude: 39.6682,
      numberOfBeds: 650,
      numberOfICUBeds: 30,
      numberOfAmbulances: 6,
      servicesOffered: [
        'Emergency Care',
        'Surgery',
        'Maternity',
        'Pediatrics',
        'General Medicine'
      ],
      facilities: [
        'LABORATORY',
        'PHARMACY',
        'RADIOLOGY',
        'ICU',
        'EMERGENCY',
        'MATERNITY',
        'SURGERY',
        'PEDIATRICS',
        'OUTPATIENT',
        'INPATIENT'
      ],
      insuranceProvidersAccepted: [
        'NHIF',
        'SHA',
        'AAR',
        'Jubilee'
      ],
      status: 'ACTIVE',
      createdAt: '2020-03-20T10:00:00',
      updatedAt: '2025-12-10T09:15:00'
    },
    {
      id: 4,
      code: 'HS004',
      name: 'Kisumu County Hospital',
      type: 'PUBLIC',
      registrationNumber: 'KCH-REG-2005',
      taxId: 'TAX-KCH-004',
      phone: '+254-57-2020333',
      email: 'info@kisumuhospital.go.ke',
      website: null,
      fax: null,
      addressLine1: 'Oginga Odinga Street',
      addressLine2: 'P.O. Box 612-40100',
      city: 'Kisumu',
      state: 'Kisumu County',
      postalCode: '40100',
      country: 'Kenya',
      latitude: -0.0917,
      longitude: 34.7680,
      numberOfBeds: 420,
      numberOfICUBeds: 18,
      numberOfAmbulances: 4,
      servicesOffered: [
        'Emergency Care',
        'Surgery',
        'Maternity',
        'Pediatrics',
        'HIV/AIDS Care'
      ],
      facilities: [
        'LABORATORY',
        'PHARMACY',
        'RADIOLOGY',
        'ICU',
        'EMERGENCY',
        'MATERNITY',
        'OUTPATIENT',
        'INPATIENT'
      ],
      insuranceProvidersAccepted: [
        'NHIF',
        'SHA'
      ],
      status: 'ACTIVE',
      createdAt: '2020-06-12T11:30:00',
      updatedAt: '2025-12-05T16:45:00'
    },
    {
      id: 5,
      code: 'HS005',
      name: "St. Mary's Mission Hospital",
      type: 'FAITH_BASED',
      registrationNumber: 'STMH-REG-1995',
      taxId: 'TAX-STMH-005',
      phone: '+254-45-31234',
      email: 'info@stmarysmission.org',
      website: 'www.stmarysmission.org',
      fax: '+254-45-31235',
      addressLine1: 'Catholic Diocese Road',
      addressLine2: 'P.O. Box 134-60400',
      city: 'Mumias',
      state: 'Kakamega County',
      postalCode: '60400',
      country: 'Kenya',
      latitude: 0.3348,
      longitude: 34.4877,
      numberOfBeds: 180,
      numberOfICUBeds: 8,
      numberOfAmbulances: 2,
      servicesOffered: [
        'General Medicine',
        'Maternity',
        'Surgery',
        'HIV/AIDS Care',
        'TB Treatment'
      ],
      facilities: [
        'LABORATORY',
        'PHARMACY',
        'MATERNITY',
        'SURGERY',
        'OUTPATIENT',
        'INPATIENT'
      ],
      insuranceProvidersAccepted: [
        'NHIF',
        'SHA'
      ],
      status: 'ACTIVE',
      createdAt: '2019-11-08T08:00:00',
      updatedAt: '2025-12-12T13:00:00'
    },
    {
      id: 6,
      code: 'HS006',
      name: 'Nairobi Women\'s Hospital',
      type: 'PRIVATE',
      registrationNumber: 'NWH-REG-2001',
      taxId: 'TAX-NWH-006',
      phone: '+254-20-7202000',
      email: 'info@nwch.co.ke',
      website: 'www.nwch.co.ke',
      fax: '+254-20-3870219',
      addressLine1: 'Adams Arcade, Ngong Road',
      addressLine2: 'P.O. Box 10552-00100',
      city: 'Nairobi',
      state: 'Nairobi County',
      postalCode: '00100',
      country: 'Kenya',
      latitude: -1.3027,
      longitude: 36.7693,
      numberOfBeds: 120,
      numberOfICUBeds: 12,
      numberOfAmbulances: 5,
      servicesOffered: [
        'Maternity',
        'Gynecology',
        'Pediatrics',
        'Fertility Clinic',
        'Well Woman Clinic'
      ],
      facilities: [
        'LABORATORY',
        'PHARMACY',
        'RADIOLOGY',
        'ICU',
        'MATERNITY',
        'SURGERY',
        'PEDIATRICS',
        'OUTPATIENT'
      ],
      insuranceProvidersAccepted: [
        'NHIF',
        'AAR',
        'Jubilee',
        'Britam',
        'Madison',
        'CIC',
        'APA'
      ],
      status: 'ACTIVE',
      createdAt: '2019-08-22T10:00:00',
      updatedAt: '2025-12-19T11:30:00'
    },
    {
      id: 7,
      code: 'HS007',
      name: 'Gertrude\'s Children Hospital',
      type: 'NGO',
      registrationNumber: 'GCH-REG-1999',
      taxId: 'TAX-GCH-007',
      phone: '+254-20-7206000',
      email: 'info@gerties.org',
      website: 'www.gerties.org',
      fax: '+254-20-2721175',
      addressLine1: 'Muthaiga Road',
      addressLine2: 'P.O. Box 42325-00100',
      city: 'Nairobi',
      state: 'Nairobi County',
      postalCode: '00100',
      country: 'Kenya',
      latitude: -1.2571,
      longitude: 36.8267,
      numberOfBeds: 85,
      numberOfICUBeds: 15,
      numberOfAmbulances: 3,
      servicesOffered: [
        'Pediatrics',
        'Neonatal Care',
        'Pediatric Surgery',
        'Child Vaccination',
        'Child Nutrition'
      ],
      facilities: [
        'LABORATORY',
        'PHARMACY',
        'RADIOLOGY',
        'ICU',
        'EMERGENCY',
        'SURGERY',
        'PEDIATRICS',
        'OUTPATIENT',
        'INPATIENT'
      ],
      insuranceProvidersAccepted: [
        'NHIF',
        'AAR',
        'Jubilee',
        'Britam',
        'Madison'
      ],
      status: 'ACTIVE',
      createdAt: '2019-04-18T09:00:00',
      updatedAt: '2025-12-17T15:20:00'
    },
    {
      id: 8,
      code: 'HS008',
      name: 'Nakuru Level 5 Hospital',
      type: 'PUBLIC',
      registrationNumber: 'NKR-REG-2004',
      taxId: 'TAX-NKR-008',
      phone: '+254-51-2212995',
      email: 'info@nakuruhospital.go.ke',
      website: null,
      fax: null,
      addressLine1: 'Hospital Road',
      addressLine2: 'P.O. Box 851-20100',
      city: 'Nakuru',
      state: 'Nakuru County',
      postalCode: '20100',
      country: 'Kenya',
      latitude: -0.2827,
      longitude: 36.0667,
      numberOfBeds: 380,
      numberOfICUBeds: 16,
      numberOfAmbulances: 5,
      servicesOffered: [
        'Emergency Care',
        'Surgery',
        'Maternity',
        'Pediatrics',
        'General Medicine'
      ],
      facilities: [
        'LABORATORY',
        'PHARMACY',
        'RADIOLOGY',
        'ICU',
        'EMERGENCY',
        'MATERNITY',
        'SURGERY',
        'OUTPATIENT',
        'INPATIENT'
      ],
      insuranceProvidersAccepted: [
        'NHIF',
        'SHA',
        'AAR'
      ],
      status: 'ACTIVE',
      createdAt: '2020-02-10T10:30:00',
      updatedAt: '2025-12-14T12:00:00'
    }
  ];

  // Filter hospitals
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = 
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || hospital.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || hospital.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: hospitals.length,
    active: hospitals.filter(h => h.status === 'ACTIVE').length,
    totalBeds: hospitals.reduce((sum, h) => sum + h.numberOfBeds, 0),
    totalAmbulances: hospitals.reduce((sum, h) => sum + h.numberOfAmbulances, 0),
    public: hospitals.filter(h => h.type === 'PUBLIC').length,
    private: hospitals.filter(h => h.type === 'PRIVATE').length,
    faithBased: hospitals.filter(h => h.type === 'FAITH_BASED').length,
    ngo: hospitals.filter(h => h.type === 'NGO').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-800';
      case 'INACTIVE': return 'text-gray-800';
      case 'SUSPENDED': return 'text-red-800';
      default: return 'text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'PUBLIC': return 'text-blue-800';
      case 'PRIVATE': return 'text-blue-800';
      case 'FAITH_BASED': return 'text-blue-800';
      case 'NGO': return 'text-tblue-800';
      default: return 'text-blue-800';
    }
  };

  const handleViewHospital = (hospital) => {
    setSelectedHospital(hospital);
    setShowViewModal(true);
  };

  const handleEditHospital = (hospital) => {
    setSelectedHospital(hospital);
    setShowEditModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              
              <div>
                <h1 className="text-3xl font-bold">Hospital Management</h1>
                <p className="mt-1">Manage healthcare facilities and hospital information</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Hospital</span>
            </button>
          </div>
        </div>
      </div>

      <div className="">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">


          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Total Hospitals</p>
                <p className="text-3xl font-bold ">{stats.total}</p>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stats.active} Active
                </p>
              </div>
              <div className="h-14 w-14 rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Total Beds</p>
                <p className="text-3xl font-bold ">{stats.totalBeds.toLocaleString()}</p>
                <p className="text-sm mt-2">Across all facilities</p>
              </div>
              <div className="h-14 w-14 flex items-center justify-center">
                <Bed className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Ambulances</p>
                <p className="text-3xl font-bold ">{stats.totalAmbulances}</p>
                <p className="text-sm mt-2">Fleet vehicles</p>
              </div>
              <div className="h-14 w-14  flex items-center justify-center">
                <Truck className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1">Hospital Types</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-sm font-medium text-blue-600">{stats.public} Public</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm font-medium text-blue-600">{stats.private} Private</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm font-medium text-blue-600">{stats.faithBased} Faith</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm font-medium text-blue-600">{stats.ngo} NGO</span>
                </div>
              </div>
              <div className="h-14 w-14  flex items-center justify-center">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by hospital name, code, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  {hospitalTypes.map(type => (
                    <option key={type} value={type}>{type.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2  focus:border-transparent"
              >
                <option value="all">All Status</option>
                {hospitalStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
            <span>Showing {filteredHospitals.length} of {hospitals.length} hospitals</span>
          </div>
        </div>

        {/* Hospitals Table */}
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-bold  uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-6 py-3 text-left font-bold  uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left font-bold  uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left font-bold  uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left font-bold  uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left font-bold  uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right font-bold  uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredHospitals.map((hospital) => (
                  <tr key={hospital.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {/* <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div> */}
                        <div>
                          <p className="font-semibold ">{hospital.name}</p>
                          <p className="text-sm text-gray-500">{hospital.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(hospital.type)}`}>
                        {hospital.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{hospital.city}</p>
                          <p className="text-xs text-gray-500">{hospital.state}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Bed className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{hospital.numberOfBeds} beds</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{hospital.numberOfAmbulances} ambulances</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{hospital.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{hospital.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(hospital.status)}`}>
                        {hospital.status === 'ACTIVE' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {hospital.status === 'INACTIVE' && <XCircle className="w-3 h-3 mr-1" />}
                        {hospital.status === 'SUSPENDED' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {hospital.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleViewHospital(hospital)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleEditHospital(hospital)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Modal */}
        {showViewModal && selectedHospital && (
          <div className="flex items-center justify-center z-50 p-4 fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="relative bg-white shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-white" />
                    </div> */}
                    <div>
                      <h2 className="text-2xl font-bold">{selectedHospital.name}</h2>
                      <p className="text-sm mt-1">{selectedHospital.code}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowViewModal(false)}
                    className="font-bold hover:text-red-600 cursor-pointer transition-colors "
                  >
                    <XCircle className="w-8 h-8" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold  mb-4">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-bold">Type</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedHospital.type)} mt-1`}>
                        {selectedHospital.type.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold">Status</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedHospital.status)} mt-1`}>
                        {selectedHospital.status}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold">Registration Number</p>
                      <p className="text-sm font-medium mt-1">{selectedHospital.registrationNumber}</p>
                    </div>
                    <div>
                      <p className="font-bold">Tax ID</p>
                      <p className="text-sm font-medium mt-1">{selectedHospital.taxId}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold  mb-4">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 " />
                      <div>
                        <p className="font-bold">Phone</p>
                        <p className="text-sm font-medium mt-1">{selectedHospital.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 " />
                      <div>
                        <p className="font-bold">Email</p>
                        <p className="text-sm font-medium mt-1">{selectedHospital.email}</p>
                      </div>
                    </div>
                    {selectedHospital.website && (
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 " />
                        <div>
                          <p className="font-bold">Website</p>
                          <p className="text-sm font-medium text-blue-600">{selectedHospital.website}</p>
                        </div>
                      </div>
                    )}
                    {selectedHospital.fax && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 " />
                        <div>
                          <p className="font-bold">Fax</p>
                          <p className="text-sm font-medium mt-1">{selectedHospital.fax}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-lg font-semibold  mb-4">Address</h3>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-1" />
                    <div>
                      <p className="text-sm font-medium ">{selectedHospital.addressLine1}</p>
                      {selectedHospital.addressLine2 && (
                        <p className="text-sm ">{selectedHospital.addressLine2}</p>
                      )}
                      <p className="text-sm ">
                        {selectedHospital.city}, {selectedHospital.state} {selectedHospital.postalCode}
                      </p>
                      <p className="text-sm ">{selectedHospital.country}</p>
                      <p className="text-xs mt-2">
                        Coordinates: {selectedHospital.latitude}, {selectedHospital.longitude}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <h3 className="text-lg font-semibold  mb-4">Capacity</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border border-gray-200 shadow-md p-4">
                      <Bed className="w-8 h-8 text-blue-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{selectedHospital.numberOfBeds}</p>
                      <p className="text-sm text-gray-600">Total Beds</p>
                    </div>
                    <div className="border border-gray-200 shadow-md p-4">
                      <Heart className="w-8 h-8 text-blue-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{selectedHospital.numberOfICUBeds}</p>
                      <p className="text-sm text-gray-600">ICU Beds</p>
                    </div>
                    <div className="border border-gray-200 shadow-md p-4">
                      <Truck className="w-8 h-8 text-blue-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{selectedHospital.numberOfAmbulances}</p>
                      <p className="text-sm text-gray-600">Ambulances</p>
                    </div>
                  </div>
                </div>

                {/* Services Offered */}
                <div>
                  <h3 className="text-lg font-semibold  mb-4">Services Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHospital.servicesOffered.map((service, index) => (
                      <span key={index} className="px-3 py-1  border border-blue-200 text-blue-800 rounded-full font-medium">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="text-lg font-semibold  mb-4">Facilities Available</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedHospital.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insurance Providers */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Providers Accepted</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHospital.insuranceProvidersAccepted.map((provider, index) => (
                      <span key={index} className="px-3 py-1 border border-blue-200 text-blue-800 rounded-full font-medium flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>{provider}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditHospital(selectedHospital);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Edit Hospital
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {(showAddModal || showEditModal) && (
          <HospitalFormModal
            hospital={showEditModal ? selectedHospital : null}
            isOpen={showAddModal || showEditModal}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setSelectedHospital(null);
            }}
            onSave={(hospitalData) => {
              
              console.log('Saving hospital:', hospitalData);
             
            }}
            facilityTypes={facilityTypes}
          />
        )}
      </div>
    </div>
  );
};

export default HospitalManagement;
