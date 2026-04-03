import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { hospitalService } from '../../Services/domain/hospitalService.js';

const HospitalManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

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

  // Local fallback sample data used only if API loading fails.
  const sampleHospitals = useMemo(() => [
    
  ], []);

  const normalizeHospital = useCallback((row = {}) => ({
    id: row.id ?? null,
    code: row.code || '',
    name: row.name || 'Unnamed Hospital',
    type: row.type || 'GENERAL',
    registrationNumber: row.registrationNumber || '',
    taxId: row.taxId || '',
    mainPhone: row.mainPhone || row.phone || '',
    altPhone: row.altPhone || '',
    email: row.email || '',
    website: row.website || '',
    fax: row.fax || '',
    addressLine1: row.addressLine1 || '',
    addressLine2: row.addressLine2 || '',
    city: row.city || '',
    state: row.state || '',
    postalCode: row.postalCode || '',
    country: row.country || 'Kenya',
    latitude: row.latitude ?? '',
    longitude: row.longitude ?? '',
    adminContactName: row.adminContactName || '',
    adminContactEmail: row.adminContactEmail || '',
    adminContactPhone: row.adminContactPhone || '',
    numberOfBeds: Number(row.numberOfBeds) || 0,
    numberOfIcuBeds: Number(row.numberOfIcuBeds) || 0,
    numberOfAmbulances: Number(row.numberOfAmbulances) || 0,
    servicesOffered: Array.isArray(row.servicesOffered)
      ? row.servicesOffered.join(', ')
      : (row.servicesOffered || ''),
    departments: Array.isArray(row.departments)
      ? row.departments.join(', ')
      : (row.departments || ''),
    operatingHours: row.operatingHours || '',
    facilities: Array.isArray(row.facilities)
      ? row.facilities.join(', ')
      : (row.facilities || ''),
    acceptedInsurance: Array.isArray(row.acceptedInsurance)
      ? row.acceptedInsurance.join(', ')
      : (row.acceptedInsurance || ''),
    notes: row.notes || '',
    status: row.status || 'ACTIVE',
    createdAt: row.createdAt || '',
    updatedAt: row.updatedAt || '',
  }), []);

  const fetchHospitals = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const payload = await hospitalService.listHospitals();
      const rows = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.items)
          ? payload.items
          : Array.isArray(payload?.content)
            ? payload.content
            : [];
      setHospitals(rows.map(normalizeHospital));
    } catch (error) {
      setLoadError(error?.message || 'Failed to load hospitals from API.');
      setHospitals(sampleHospitals.map(normalizeHospital));
    } finally {
      setIsLoading(false);
    }
  }, [normalizeHospital, sampleHospitals]);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  // Filter hospitals
  const filteredHospitals = useMemo(() => hospitals.filter((hospital) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      (hospital.name || '').toLowerCase().includes(query) ||
      (hospital.code || '').toLowerCase().includes(query) ||
      (hospital.city || '').toLowerCase().includes(query);

    const matchesType = selectedType === 'all' || hospital.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || hospital.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  }), [hospitals, searchTerm, selectedType, selectedStatus]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHospitals = filteredHospitals.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedStatus]);

  // Calculate statistics
  const stats = useMemo(() => ({
    total: hospitals.length,
    active: hospitals.filter(h => h.status === 'ACTIVE').length,
    totalBeds: hospitals.reduce((sum, h) => sum + h.numberOfBeds, 0),
    totalAmbulances: hospitals.reduce((sum, h) => sum + h.numberOfAmbulances, 0),
  }), [hospitals]);

  const hospitalTypes = useMemo(() => {
    const uniqueTypes = new Set(
      hospitals
        .map((hospital) => hospital.type)
        .filter(Boolean)
    );
    return Array.from(uniqueTypes).sort();
  }, [hospitals]);

  const hospitalTypeStats = useMemo(() => {
    const counts = hospitals.reduce((acc, hospital) => {
      const type = hospital.type || 'UNKNOWN';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [hospitals]);

  const topTypeRowOne = hospitalTypeStats.slice(0, 2);
  const topTypeRowTwo = hospitalTypeStats.slice(2, 4);

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
      case 'NGO': return 'text-blue-800';
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

  const handleDeleteHospital = async (hospital) => {
    if (!hospital?.id) return;
    const confirmed = window.confirm(`Delete ${hospital.name}? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      await hospitalService.deleteHospital(hospital.id);
      await fetchHospitals();
    } catch (error) {
      setLoadError(error?.message || 'Failed to delete hospital.');
    }
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
                {hospitalTypeStats.length > 0 ? (
                  <>
                    <div className="flex items-center space-x-2 mt-2">
                      {topTypeRowOne.map(([type, count], index) => (
                        <span key={type} className="text-sm font-medium text-blue-600">
                          {index > 0 && <span className="text-gray-300 mr-2">•</span>}
                          {count} {type.replaceAll('_', ' ')}
                        </span>
                      ))}
                    </div>
                    {topTypeRowTwo.length > 0 && (
                      <div className="flex items-center space-x-2 mt-1">
                        {topTypeRowTwo.map(([type, count], index) => (
                          <span key={type} className="text-sm font-medium text-blue-600">
                            {index > 0 && <span className="text-gray-300 mr-2">•</span>}
                            {count} {type.replaceAll('_', ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm mt-2 text-gray-500">No type data</p>
                )}
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

          {loadError && (
            <div className="mt-3 p-3 border border-red-200 bg-red-50 text-red-700 text-sm rounded-lg">
              {loadError}
            </div>
          )}
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
                {isLoading ? (
                  <tr>
                    <td colSpan={11} className="px-3 py-10 text-center text-sm text-gray-600">
                      Loading hospitals...
                    </td>
                  </tr>
                ) : currentHospitals.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-3 py-10 text-center text-sm text-gray-600">
                      No hospitals found for the selected filters.
                    </td>
                  </tr>
                ) : currentHospitals.map((hospital) => (
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
                          onClick={() => handleDeleteHospital(hospital)}
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
            onSave={async (hospitalData) => {
              try {
                if (showEditModal && selectedHospital?.id) {
                  await hospitalService.updateHospital(selectedHospital.id, hospitalData);
                } else {
                  await hospitalService.createHospital(hospitalData);
                }
                await fetchHospitals();
                setLoadError('');
              } catch (error) {
                setLoadError(error?.message || 'Failed to save hospital.');
                throw error;
              }
            }}
            facilityTypes={facilityTypes}
          />
        )}
      </div>
    </div>
  );
};

export default HospitalManagement;
