
import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CHWDetailsModal from '../../Components/Admin/CHWDetailsModal';
import EditCHWModal from '../../Components/Admin/EditCHWModal';
import AddCHWModal from '../../Components/Admin/AddCHWModal';
import Pagination from '../../Components/Admin/Pagination';
import { chwApi } from '../../API/endpoints/chwApi.js';


import { LoadingSpinner, ErrorMessage } from '../../Components/Admin/DataState.jsx';

const CHW_DIRECTORY_STORAGE_KEY = 'medilink_admin_chw_directory_v1';

const normalizeCHWStatus = (status) => {
  if (status === 'ON_LEAVE' || status === 'INACTIVE') return 'OFFLINE';
  if (status === 'Active') return 'AVAILABLE';
  if (status === 'On Leave') return 'OFFLINE';
  return status || 'AVAILABLE';
};

const normalizeCHWRecord = (record) => {
  const firstName = String(record.firstName || '').trim();
  const middleName = String(record.middleName || '').trim();
  const lastName = String(record.lastName || '').trim();
  const name = [firstName, middleName, lastName].filter(Boolean).join(' ').trim() || record.name;
  const avatar = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || record.avatar || 'CH';

  return {
    ...record,
    firstName,
    middleName,
    lastName,
    name,
    avatar,
    status: normalizeCHWStatus(record.status),
    coverageArea: record.coverageArea || record.region || 'Unassigned Coverage Area',
    assignedFacility: record.assignedFacility || record.hospitalName || 'Unassigned Facility',
    supervisorName: record.supervisorName || 'Not Assigned',
    supervisorPhone: record.supervisorPhone || 'N/A',
  };
};



const ActiveCHW = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedCHW, setSelectedCHW] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
 

// Replace the state initialization block with this:
const [chws, setCHWs] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Replace the useEffect for localStorage with this:
const fetchCHWs = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await chwApi.list();
    const list = Array.isArray(data?.content) ? data.content
      : Array.isArray(data) ? data : [];
    setCHWs(list.map(normalizeCHWRecord));
  } catch (err) {
    setError(err.message || 'Failed to load CHWs');
  } finally {
    setLoading(false);
  }
};

useEffect(() => { fetchCHWs(); }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CHW_DIRECTORY_STORAGE_KEY, JSON.stringify(chws));
  }, [chws]);

  useEffect(() => {
    if (location.state?.openAddModal) {
      setShowAddModal(true);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  // Filter and sort CHWs
  const filteredAndSortedCHWs = useMemo(() => {
    let filtered = chws.filter(chw => {
      const matchesSearch = chw.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chw.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chw.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chw.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chw.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chw.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chw.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (chw.specialization && chw.specialization.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || chw.status === statusFilter || chw.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesRegion = regionFilter === 'all' || chw.region === regionFilter;
      return matchesSearch && matchesStatus && matchesRegion;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'patients' || sortField === 'monthlyVisits' || sortField === 'rating') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection, statusFilter, regionFilter, chws]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCHWs.length / itemsPerPage);
  const paginatedCHWs = filteredAndSortedCHWs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status) => {
    // Map backend enum status to display status and colors
    const statusMap = {
      'AVAILABLE': { display: 'Active', color: 'text-green-800 border-green-200' },
      'BUSY': { display: 'Busy', color: 'text-blue-800 border-blue-200' },
      'OFFLINE': { display: 'On Leave', color: 'text-yellow-800 border-yellow-200' },
      // Support legacy frontend status for backward compatibility
      'Active': { display: 'Active', color: 'text-green-800 border-green-200' },
      'On Leave': { display: 'On Leave', color: 'text-yellow-800 border-yellow-200' },
      'Inactive': { display: 'Inactive', color: 'text-red-800 border-red-200' }
    };
    return statusMap[status]?.color || 'bg-gray-100 text-gray-800 border-gray-200';
  };
  
  const getDisplayStatus = (status) => {
    const statusMap = {
      'AVAILABLE': 'Active',
      'BUSY': 'Busy',
      'OFFLINE': 'On Leave',
      'Active': 'Active',
      'On Leave': 'On Leave',
      'Inactive': 'Inactive'
    };
    return statusMap[status] || status;
  };

  // Button handlers
  const handleAddCHW = () => {
    setShowAddModal(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Region', 'Patients', 'Status', 'Specialization'],
      ...filteredAndSortedCHWs.map(c => [
        c.name, c.email, c.phone, c.region, c.patients, c.status, c.specialization || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `active-chws-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewCHW = (chw) => {
    setSelectedCHW(chw);
    setShowViewModal(true);
  };

  const handleEditCHW = (chw) => {
    setSelectedCHW(chw);
    setShowEditModal(true);
  };

  const handleContactCHW = (chw) => {
    const subject = encodeURIComponent(`MediLink - CHW Communication`);
    const body = encodeURIComponent(`Dear ${chw.name},\n\nI hope this message finds you well.\n\nBest regards,\nMediLink Admin Team`);
    window.open(`mailto:${chw.email}?subject=${subject}&body=${body}`, '_blank');
  };

const handleSaveCHW = async (updatedCHW) => {
  try {
    await chwApi.update(updatedCHW.id, updatedCHW);
    fetchCHWs();
    setShowEditModal(false);
  } catch (err) {
    alert('Failed to update CHW: ' + err.message);
  }
};

const handleAddNewCHW = async (newCHW) => {
  try {
    await chwApi.create(newCHW);
    fetchCHWs();
    setShowAddModal(false);
  } catch (err) {
    alert('Failed to add CHW: ' + err.message);
  }
};

const handleDeleteCHW = async (chw) => {
  if (!window.confirm(`Delete ${chw.name}?`)) return;
  try {
    await chwApi.delete(chw.id);
    fetchCHWs();
  } catch (err) {
    alert('Failed to delete CHW: ' + err.message);
  }
};


  // Get unique regions for filter
  const uniqueRegions = [...new Set(chws.map(chw => chw.region))];

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCHWs} />;

  return (
    <div className=" bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Health Workers</h1>
            
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleAddCHW}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center space-x-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add CHW</span>
            </button>
            <button 
              onClick={handleExport}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 flex items-center space-x-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white border border-gray-200">
            <div className="flex items-center">
              <div className="p-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Active CHWs</p>
                <p className="text-2xl font-bold text-gray-900">{chws.filter(c => c.status === 'AVAILABLE' || c.status === 'Active').length}</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-gray-200">
            <div className="flex items-center">
              <div className="p-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Regions Covered</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueRegions.length}</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-gray-200">
            <div className="flex items-center">
              <div className="p-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{chws.reduce((sum, chw) => sum + chw.patients, 0)}</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-gray-200">
            <div className="flex items-center">
              <div className="p-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">On Leave</p>
                <p className="text-2xl font-bold text-gray-900">{chws.filter(c => c.status === 'OFFLINE' || c.status === 'On Leave').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search CHWs by name, email, region, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="AVAILABLE">Active</option>
                <option value="BUSY">Busy</option>
                <option value="OFFLINE">On Leave / Offline</option>
              </select>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
              >
                <option value="all">All Regions</option>
                {uniqueRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CHWs Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-bold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('code')}>
                  <div className="flex items-center space-x-1">
                    <span>Code</span>
                    {sortField === 'code' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    {sortField === 'name' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Specialization</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Email</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Phone</th>
                <th className="px-3 py-3 text-left text-xs font-bold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('city')}>
                  <div className="flex items-center space-x-1">
                    <span>City</span>
                    {sortField === 'city' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('region')}>
                  <div className="flex items-center space-x-1">
                    <span>Region</span>
                    {sortField === 'region' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Hospital</th>
                <th className="px-3 py-3 text-center text-xs font-bold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('patients')}>
                  <div className="flex items-center justify-center space-x-1">
                    <span>Patients</span>
                    {sortField === 'patients' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}>
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {sortField === 'status' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-3 py-3 text-center text-xs font-bold text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCHWs.map((chw) => (
                <tr key={chw.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-xs font-bold text-gray-900">{chw.code}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-900">{chw.name}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-600">{chw.specialization}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900">{chw.email}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-600">{chw.phone}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900">{chw.city}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-600">{chw.region}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900">{chw.hospitalName}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-center">
                    <span className="text-xs font-semibold text-gray-900">{chw.patients}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(chw.status)}`}>
                      {getDisplayStatus(chw.status)}
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => handleViewCHW(chw)}
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="View Full Details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleEditCHW(chw)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Edit CHW"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleContactCHW(chw)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Contact CHW"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteCHW(chw)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete CHW"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
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
      {filteredAndSortedCHWs.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredAndSortedCHWs.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          itemName="CHWs"
        />
      )}

      {/* Empty State */}
      {filteredAndSortedCHWs.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No CHWs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all' || regionFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.' 
              : 'Get started by adding your first Community Health Worker.'}
          </p>
          {(!searchTerm && statusFilter === 'all' && regionFilter === 'all') && (
            <div className="mt-6">
              <button 
                onClick={handleAddCHW}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Add CHW
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <CHWDetailsModal 
        chw={selectedCHW}
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
      />
      
      <EditCHWModal 
        chw={selectedCHW}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveCHW}
      />

      <AddCHWModal 
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        onSaveCHW={handleAddNewCHW}
      />
    </div>
  );
};

export default ActiveCHW;
