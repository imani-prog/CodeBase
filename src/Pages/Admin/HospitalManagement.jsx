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
  User,
  Syringe,
  Ambulance
} from 'lucide-react';
import HospitalFormModal from '../../Components/Admin/EditHospitalModal';
import Pagination from '../../Components/Admin/Pagination';

const HospitalManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
      type: 'GENERAL',
      registrationNumber: 'KNH-REG-2001',
      taxId: 'TAX-KNH-001',
      mainPhone: '+254-20-2726300',
      altPhone: '+254-20-2726301',
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
      adminContactName: 'Dr. Sarah Kamau',
      adminContactEmail: 'admin@knh.or.ke',
      adminContactPhone: '+254-20-2726302',
      numberOfBeds: 1800,
      numberOfIcuBeds: 80,
      numberOfAmbulances: 15,
      servicesOffered: 'Emergency Care, Surgery, Maternity, Pediatrics, Oncology, Cardiology, Neurology, Orthopedics',
      departments: 'Cardiology, Oncology, Neurology, Orthopedics, Pediatrics, Maternity',
      operatingHours: '24/7 Emergency, Mon-Fri 8AM-5PM Outpatient',
      facilities: 'LABORATORY, PHARMACY, RADIOLOGY, ICU, EMERGENCY, MATERNITY, SURGERY, PEDIATRICS, OUTPATIENT, INPATIENT',
      acceptedInsurance: 'NHIF, SHA, AAR, Jubilee, Britam, Madison, CIC',
      notes: 'National referral and teaching hospital',
      status: 'ACTIVE',
      createdAt: '2020-01-15T08:00:00',
      updatedAt: '2025-12-15T10:30:00'
    },
    {
      id: 2,
      code: 'HS002',
      name: 'Aga Khan University Hospital',
      type: 'SPECIALTY',
      registrationNumber: 'AKUH-REG-1998',
      taxId: 'TAX-AKUH-002',
      mainPhone: '+254-20-3662000',
      altPhone: '+254-20-3662001',
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
      adminContactName: 'Dr. James Orwa',
      adminContactEmail: 'j.orwa@aku.edu',
      adminContactPhone: '+254-20-3662002',
      numberOfBeds: 254,
      numberOfIcuBeds: 24,
      numberOfAmbulances: 8,
      servicesOffered: 'Emergency Care, Surgery, Maternity, Cardiology, Oncology, Diagnostics, Wellness Center',
      departments: 'Cardiology, Oncology, Surgery, Maternity, Diagnostics, Emergency Medicine',
      operatingHours: '24/7 Emergency and Critical Care, Mon-Sat 8AM-8PM Outpatient',
      facilities: 'LABORATORY, PHARMACY, RADIOLOGY, ICU, EMERGENCY, MATERNITY, SURGERY, OUTPATIENT, INPATIENT',
      acceptedInsurance: 'NHIF, AAR, Jubilee, Britam, Madison, CIC, Resolution',
      notes: 'Leading private teaching hospital with international accreditation',
      status: 'ACTIVE',
      createdAt: '2019-05-10T09:00:00',
      updatedAt: '2025-12-18T14:20:00'
    },
    {
      id: 3,
      code: 'HS003',
      name: 'Mombasa General Hospital',
      type: 'GENERAL',
      registrationNumber: 'MGH-REG-2003',
      taxId: 'TAX-MGH-003',
      mainPhone: '+254-41-2314201',
      altPhone: '+254-41-2314202',
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
      adminContactName: 'Dr. Fatuma Hassan',
      adminContactEmail: 'f.hassan@mombasahospital.go.ke',
      adminContactPhone: '+254-41-2314203',
      numberOfBeds: 650,
      numberOfIcuBeds: 30,
      numberOfAmbulances: 6,
      servicesOffered: 'Emergency Care, Surgery, Maternity, Pediatrics, General Medicine, Orthopedics',
      departments: 'Emergency Medicine, Surgery, Maternity, Pediatrics, Internal Medicine, Orthopedics',
      operatingHours: '24/7 Emergency Services, Mon-Fri 8AM-6PM Outpatient',
      facilities: 'LABORATORY, PHARMACY, RADIOLOGY, ICU, EMERGENCY, MATERNITY, SURGERY, PEDIATRICS, OUTPATIENT, INPATIENT',
      acceptedInsurance: 'NHIF, SHA, AAR, Jubilee',
      notes: 'Main referral hospital for Coast region',
      status: 'ACTIVE',
      createdAt: '2020-03-20T10:00:00',
      updatedAt: '2025-12-10T09:15:00'
    },
    {
      id: 4,
      code: 'HS004',
      name: 'Kisumu County Hospital',
      type: 'GENERAL',
      registrationNumber: 'KCH-REG-2005',
      taxId: 'TAX-KCH-004',
      mainPhone: '+254-57-2020333',
      altPhone: '+254-57-2020334',
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
      adminContactName: 'Dr. Peter Odhiambo',
      adminContactEmail: 'p.odhiambo@kisumuhospital.go.ke',
      adminContactPhone: '+254-57-2020335',
      numberOfBeds: 420,
      numberOfIcuBeds: 18,
      numberOfAmbulances: 4,
      servicesOffered: 'Emergency Care, Surgery, Maternity, Pediatrics, HIV/AIDS Care, TB Treatment',
      departments: 'Emergency Medicine, Surgery, Maternity, Pediatrics, Infectious Diseases',
      operatingHours: '24/7 Emergency, Mon-Fri 8AM-5PM Outpatient',
      facilities: 'LABORATORY, PHARMACY, RADIOLOGY, ICU, EMERGENCY, MATERNITY, OUTPATIENT, INPATIENT',
      acceptedInsurance: 'NHIF, SHA',
      notes: 'County referral hospital serving Nyanza region',
      status: 'ACTIVE',
      createdAt: '2020-06-12T11:30:00',
      updatedAt: '2025-12-05T16:45:00'
    },
    {
      id: 5,
      code: 'HS005',
      name: "St. Mary's Mission Hospital",
      type: 'CLINIC',
      registrationNumber: 'STMH-REG-1995',
      taxId: 'TAX-STMH-005',
      mainPhone: '+254-45-31234',
      altPhone: '+254-45-31236',
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
      adminContactName: 'Sr. Mary Wanjiru',
      adminContactEmail: 'm.wanjiru@stmarysmission.org',
      adminContactPhone: '+254-45-31237',
      numberOfBeds: 180,
      numberOfIcuBeds: 8,
      numberOfAmbulances: 2,
      servicesOffered: 'General Medicine, Maternity, Surgery, HIV/AIDS Care, TB Treatment, Community Health',
      departments: 'General Medicine, Maternity, Surgery, Infectious Diseases, Outpatient Services',
      operatingHours: '24/7 Emergency and Maternity, Mon-Sat 8AM-5PM Outpatient',
      facilities: 'LABORATORY, PHARMACY, MATERNITY, SURGERY, OUTPATIENT, INPATIENT',
      acceptedInsurance: 'NHIF, SHA',
      notes: 'Faith-based mission hospital serving rural community',
      status: 'ACTIVE',
      createdAt: '2019-11-08T08:00:00',
      updatedAt: '2025-12-12T13:00:00'
    },
    {
      id: 6,
      code: 'HS006',
      name: 'Nairobi Women\'s Hospital',
      type: 'SPECIALTY',
      registrationNumber: 'NWH-REG-2001',
      taxId: 'TAX-NWH-006',
      mainPhone: '+254-20-7202000',
      altPhone: '+254-20-7202001',
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
      adminContactName: 'Dr. Lucy Mwangi',
      adminContactEmail: 'l.mwangi@nwch.co.ke',
      adminContactPhone: '+254-20-7202002',
      numberOfBeds: 120,
      numberOfIcuBeds: 12,
      numberOfAmbulances: 5,
      servicesOffered: 'Maternity, Gynecology, Pediatrics, Fertility Clinic, Well Woman Clinic, Neonatal Care',
      departments: 'Maternity, Gynecology, Pediatrics, Fertility, Neonatal ICU',
      operatingHours: '24/7 Emergency Maternity Services, Mon-Sat 8AM-8PM Outpatient',
      facilities: 'LABORATORY, PHARMACY, RADIOLOGY, ICU, MATERNITY, SURGERY, PEDIATRICS, OUTPATIENT',
      acceptedInsurance: 'NHIF, AAR, Jubilee, Britam, Madison, CIC, APA',
      notes: 'Specialized women and children healthcare facility',
      status: 'ACTIVE',
      createdAt: '2019-08-22T10:00:00',
      updatedAt: '2025-12-19T11:30:00'
    },
    {
      id: 7,
      code: 'HS007',
      name: 'Gertrude\'s Children Hospital',
      type: 'SPECIALTY',
      registrationNumber: 'GCH-REG-1999',
      taxId: 'TAX-GCH-007',
      mainPhone: '+254-20-7206000',
      altPhone: '+254-20-7206001',
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
      adminContactName: 'Dr. Robert Nyarango',
      adminContactEmail: 'r.nyarango@gerties.org',
      adminContactPhone: '+254-20-7206002',
      numberOfBeds: 85,
      numberOfIcuBeds: 15,
      numberOfAmbulances: 3,
      servicesOffered: 'Pediatrics, Neonatal Care, Pediatric Surgery, Child Vaccination, Child Nutrition, Child Development',
      departments: 'Pediatrics, Neonatology, Pediatric Surgery, Pediatric ICU, Immunization',
      operatingHours: '24/7 Emergency Pediatric Care, Mon-Sun 8AM-8PM Outpatient',
      facilities: 'LABORATORY, PHARMACY, RADIOLOGY, ICU, EMERGENCY, SURGERY, PEDIATRICS, OUTPATIENT, INPATIENT',
      acceptedInsurance: 'NHIF, AAR, Jubilee, Britam, Madison',
      notes: 'Leading pediatric specialty hospital',
      status: 'ACTIVE',
      createdAt: '2019-04-18T09:00:00',
      updatedAt: '2025-12-17T15:20:00'
    },
    {
      id: 8,
      code: 'HS008',
      name: 'Nakuru Level 5 Hospital',
      type: 'GENERAL',
      registrationNumber: 'NKR-REG-2004',
      taxId: 'TAX-NKR-008',
      mainPhone: '+254-51-2212995',
      altPhone: '+254-51-2212996',
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
      adminContactName: 'Dr. Jane Kiplagat',
      adminContactEmail: 'j.kiplagat@nakuruhospital.go.ke',
      adminContactPhone: '+254-51-2212997',
      numberOfBeds: 380,
      numberOfIcuBeds: 16,
      numberOfAmbulances: 5,
      servicesOffered: 'Emergency Care, Surgery, Maternity, Pediatrics, General Medicine, Orthopedics',
      departments: 'Emergency Medicine, Surgery, Maternity, Pediatrics, Internal Medicine, Orthopedics',
      operatingHours: '24/7 Emergency Services, Mon-Fri 8AM-5PM Outpatient',
      facilities: 'LABORATORY, PHARMACY, RADIOLOGY, ICU, EMERGENCY, MATERNITY, SURGERY, OUTPATIENT, INPATIENT',
      acceptedInsurance: 'NHIF, SHA, AAR',
      notes: 'County referral hospital for Rift Valley region',
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHospitals = filteredHospitals.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedStatus]);

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
              className="px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
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


          <div className="bg-white border border-gray-200 p-6">
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

          <div className="bg-white border border-gray-200 p-6">
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

          <div className="bg-white border border-gray-200 p-6">
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

          <div className="bg-white border border-gray-200 p-6">
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
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-600 focus:ring-2 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-600 focus:ring-2 focus:border-transparent"
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
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-600 focus:ring-2 focus:border-transparent"
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
        <div className="bg-white border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Hospital Name
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">
                    Beds
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">
                    Ambulances
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentHospitals.map((hospital) => (
                  <tr key={hospital.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs font-bold text-gray-900">{hospital.code}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs font-medium text-gray-900">{hospital.name}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(hospital.type)}`}>
                        {hospital.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs text-gray-900">{hospital.city}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs text-gray-600">{hospital.state}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      <span className="text-xs font-semibold text-gray-900">{hospital.numberOfBeds}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      <span className="text-xs font-semibold text-gray-900">{hospital.numberOfAmbulances}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs text-gray-900">{hospital.mainPhone}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs text-gray-900">{hospital.email}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hospital.status)}`}>
                        {hospital.status === 'ACTIVE' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {hospital.status === 'INACTIVE' && <XCircle className="w-3 h-3 mr-1" />}
                        {hospital.status === 'SUSPENDED' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {hospital.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => handleViewHospital(hospital)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditHospital(hospital)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredHospitals.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          itemName="hospitals"
        />

        {/* /* View Modal */ }
        {showViewModal && selectedHospital && (
          <div className="flex items-center justify-center z-50 p-4 fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="relative bg-white shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              <div className="relative px-8 py-6 bg-blue-950 text-white">
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
                >
                  <XCircle className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-2xl font-bold">{selectedHospital.name}</h2>
                      <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full border border-white/30">
                        {selectedHospital.code}
                      </span>
                    </div>
                    <p className="text-sm text-white/80">{selectedHospital.type.replace('_', ' ')} • {selectedHospital.city}</p>
                  </div>
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
                        <p className="font-bold">Main Phone</p>
                        <p className="text-sm font-medium mt-1">{selectedHospital.mainPhone}</p>
                      </div>
                    </div>
                    {selectedHospital.altPhone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 " />
                        <div>
                          <p className="font-bold">Alternative Phone</p>
                          <p className="text-sm font-medium mt-1">{selectedHospital.altPhone}</p>
                        </div>
                      </div>
                    )}
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

                {/* Administrative Contact */}
                {(selectedHospital.adminContactName || selectedHospital.adminContactEmail || selectedHospital.adminContactPhone) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Administrative Contact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedHospital.adminContactName && (
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 " />
                          <div>
                            <p className="font-bold">Contact Name</p>
                            <p className="text-sm font-medium mt-1">{selectedHospital.adminContactName}</p>
                          </div>
                        </div>
                      )}
                      {selectedHospital.adminContactEmail && (
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 " />
                          <div>
                            <p className="font-bold">Contact Email</p>
                            <p className="text-sm font-medium mt-1">{selectedHospital.adminContactEmail}</p>
                          </div>
                        </div>
                      )}
                      {selectedHospital.adminContactPhone && (
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 " />
                          <div>
                            <p className="font-bold">Contact Phone</p>
                            <p className="text-sm font-medium mt-1">{selectedHospital.adminContactPhone}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

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
                      <p className="text-2xl font-bold text-gray-900">{selectedHospital.numberOfIcuBeds}</p>
                      <p className="text-sm text-gray-600">ICU Beds</p>
                    </div>
                    <div className="border border-gray-200 shadow-md p-4">
                      <Truck className="w-8 h-8 text-blue-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{selectedHospital.numberOfAmbulances}</p>
                      <p className="text-sm text-gray-600">Ambulances</p>
                    </div>
                  </div>
                  {selectedHospital.operatingHours && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="font-bold text-gray-900 mb-1">Operating Hours</p>
                      <p className="text-sm text-gray-700">{selectedHospital.operatingHours}</p>
                    </div>
                  )}
                </div>

                {/* Departments */}
                {selectedHospital.departments && selectedHospital.departments.trim() && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Hospital Departments</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedHospital.departments.split(', ').map((department, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-50 border border-purple-200 text-purple-800 rounded-full font-medium">
                          {department}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services Offered */}
                <div>
                  <h3 className="text-lg font-semibold  mb-4">Services Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHospital.servicesOffered.split(', ').map((service, index) => (
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
                    {selectedHospital.facilities.split(', ').map((facility, index) => (
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
                    {selectedHospital.acceptedInsurance.split(', ').map((provider, index) => (
                      <span key={index} className="px-3 py-1 border border-blue-200 text-blue-800 rounded-full font-medium flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>{provider}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedHospital.notes && selectedHospital.notes.trim() && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedHospital.notes}</p>
                    </div>
                  </div>
                )}
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
