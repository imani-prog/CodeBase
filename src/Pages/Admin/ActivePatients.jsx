
import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PatientDetailsModal from '../../Components/Admin/PatientDetailsModal';
import EditPatientModal from '../../Components/Admin/EditPatientModal';
import AddPatientModal from '../../Components/Admin/AddPatientModal';
import Pagination from '../../Components/Admin/Pagination';

const dummyPatients = [
  { 
    id: 1, 
    name: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com', 
    phone: '+254-712-345-678',
    nationalId: '28456123',
    bloodType: 'O_POS',
    city: 'Nairobi',
    status: 'ACTIVE', 
    lastVisit: '2025-08-20',
    age: 45,
    gender: 'MALE',
    chronicConditions: 'Hypertension',
    condition: 'Hypertension',
    nextAppointment: '2025-09-25',
    avatar: 'JD'
  },
  { 
    id: 2, 
    name: 'Mary Wambui',
    firstName: 'Mary',
    lastName: 'Wambui',
    email: 'maryw@example.com', 
    phone: '+254-723-456-789',
    nationalId: '31245678',
    bloodType: 'A_POS',
    city: 'Kisumu',
    status: 'ACTIVE', 
    lastVisit: '2025-08-21',
    age: 32,
    gender: 'FEMALE',
    chronicConditions: 'Diabetes',
    condition: 'Diabetes',
    nextAppointment: '2025-09-26',
    avatar: 'MW'
  },
  { 
    id: 3, 
    name: 'Ali Hassan',
    firstName: 'Ali',
    lastName: 'Hassan',
    email: 'alih@example.com', 
    phone: '+254-734-567-890',
    nationalId: '25789456',
    bloodType: 'B_POS',
    city: 'Mombasa',
    status: 'ACTIVE', 
    lastVisit: '2025-08-19',
    age: 28,
    gender: 'MALE',
    chronicConditions: 'Asthma',
    condition: 'Asthma',
    nextAppointment: '2025-09-24',
    avatar: 'AH'
  },
  { 
    id: 4, 
    name: 'Grace Achieng',
    firstName: 'Grace',
    lastName: 'Achieng',
    email: 'grace@example.com', 
    phone: '+254-745-678-901',
    nationalId: '29856743',
    bloodType: 'AB_POS',
    city: 'Nairobi',
    status: 'INACTIVE', 
    lastVisit: '2025-08-22',
    age: 67,
    gender: 'FEMALE',
    chronicConditions: 'Heart Disease',
    condition: 'Heart Disease',
    nextAppointment: '2025-09-25',
    avatar: 'GA'
  },
  { 
    id: 5, 
    name: 'Peter Njoroge',
    firstName: 'Peter',
    lastName: 'Njoroge',
    email: 'peter@example.com', 
    phone: '+254-756-789-012',
    nationalId: '32147896',
    bloodType: 'O_NEG',
    city: 'Nakuru',
    status: 'ACTIVE', 
    lastVisit: '2025-08-18',
    age: 39,
    gender: 'MALE',
    chronicConditions: 'Surgery Recovery',
    condition: 'Surgery Recovery',
    nextAppointment: '2025-09-27',
    avatar: 'PN'
  },
  {
    id: 6,
    name: 'Lilian Otieno',
    firstName: 'Lilian',
    lastName: 'Otieno',
    email: 'lilian@example.com',
    phone: '+254-767-890-123',
    nationalId: '33456789',
    bloodType: 'A_NEG',
    city: 'Eldoret',
    status: 'Critical',
    lastVisit: '2025-08-17',
    age: 52,
    gender: 'FEMALE',
    chronicConditions: 'Kidney Disease',
    condition: 'Kidney Disease',
    nextAppointment: '2025-09-28',
    avatar: 'LO'
  }
];

const ActivePatients = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [patients, setPatients] = useState(dummyPatients);

  useEffect(() => {
    if (location.state?.openAddModal) {
      setShowAddModal(true);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  // Filter and sort patients
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || patient.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'lastVisit' || sortField === 'nextAppointment') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection, statusFilter, patients]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);
  const paginatedPatients = filteredAndSortedPatients.slice(
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
    const statusStyles = {
      Active: 'text-green-800 border-green-200',
      ACTIVE: 'text-green-800 border-green-200',
      Critical: 'text-red-800 border-red-200',
      INACTIVE: 'text-gray-800 border-gray-200',
      Inactive: 'text-gray-800 border-gray-200',
      Recovering: 'text-yellow-800 border-yellow-200',
      DECEASED: 'text-red-900 border-red-300 bg-red-50',
    };
    return statusStyles[status] || 'text-gray-800 border-gray-200';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatBloodType = (bloodType) => {
    if (!bloodType) return 'N/A';
    return bloodType.replace('_POS', '+').replace('_NEG', '-');
  };

  // Button handlers
  const handleAddPatient = () => {
    setShowAddModal(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Status', 'Last Visit', 'Next Appointment'],
      ...filteredAndSortedPatients.map(p => [
        p.name, p.email, p.phone, p.status, p.lastVisit, p.nextAppointment
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `active-patients-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowViewModal(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  const handleContactPatient = (patient) => {
    const subject = encodeURIComponent(`MediLink - Follow-up for ${patient.name}`);
    const body = encodeURIComponent(`Dear ${patient.name},\n\nWe hope this message finds you well.\n\nBest regards,\nMediLink Team`);
    window.open(`mailto:${patient.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleSavePatient = (updatedPatient) => {
    setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
  };

  const handleAddNewPatient = (newPatient) => {
    setPatients(prev => [...prev, newPatient]);
    setShowAddModal(false);
  };

  const handleDeletePatient = (patient) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${patient.name}?\n\nThis action cannot be undone.`
    );
    if (confirmDelete) {
      setPatients(prev => prev.filter(p => p.id !== patient.id));
    }
  };

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Active Patients</h1>
            <p className="mt-1">Manage and monitor your active patient base</p>
          </div>

          <div className="flex space-x-3">
            <button 
              onClick={handleAddPatient}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center space-x-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Patient</span>
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

          <div className="p-2 bg-white border border-gray-200">
            <div className="flex items-center">
              <div className="p-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Active</p>
                <p className="text-2xl font-bold text-gray-900">{patients.filter(p => p.status === 'ACTIVE' || p.status === 'Active').length}</p>
              </div>
            </div>
          </div>

          <div className="p-2 bg-white border border-gray-200">
            <div className="flex items-center">
              <div className="p-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Critical/Inactive</p>
                <p className="text-2xl font-bold text-gray-900">{patients.filter(p => p.status === 'INACTIVE' || p.status === 'Critical').length}</p>
              </div>
            </div>
          </div>


          <div className="p-2 bg-white border border-gray-200">
            <div className="flex items-center">
              <div className="p-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200">
            <div className="flex items-center">
              <div className="p-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
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
                  placeholder="Search patients by name, email, or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="critical">Critical</option>
                <option value="recovering">Recovering</option>
              </select>
              <button className="px-4 rounded-lg py-2 text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Patient</span>
                    {sortField === 'name' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('age')}>
                  <div className="flex items-center space-x-1">
                    <span>Age</span>
                    {sortField === 'age' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('gender')}>
                  <div className="flex items-center space-x-1">
                    <span>Gender</span>
                    {sortField === 'gender' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">National ID</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Blood Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('condition')}>
                  <div className="flex items-center space-x-1">
                    <span>Condition</span>
                    {sortField === 'condition' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">City</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-black">Status</span>
                    {sortField === 'status' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('lastVisit')}>
                  <div className="flex items-center space-x-1">
                    <span>Last Visit</span>
                    {sortField === 'lastVisit' && (
                      <svg className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Next Appointment</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-800">{patient.avatar}</span>
                        </div>
                      </div> */}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.age} years</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.gender === 'MALE' ? 'Male' : patient.gender === 'FEMALE' ? 'Female' : patient.gender === 'OTHER' ? 'Other' : patient.gender}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 font-mono">{patient.nationalId || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-700">
                      {patient.bloodType ? patient.bloodType.replace('_POS', '+').replace('_NEG', '-') : 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.condition || patient.chronicConditions || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.city || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.phone}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(patient.status)}`}>
                      {patient.status === 'ACTIVE' ? 'Active' : patient.status === 'INACTIVE' ? 'Inactive' : patient.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(patient.lastVisit)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(patient.nextAppointment)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewPatient(patient)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="View Patient Details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleEditPatient(patient)}
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="Edit Patient"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleContactPatient(patient)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Contact Patient"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDeletePatient(patient)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete Patient"
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
      {filteredAndSortedPatients.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredAndSortedPatients.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          itemName="patients"
        />
      )}

      {/* Empty State */}
      {filteredAndSortedPatients.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No patients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Get started by adding your first patient.'}
          </p>
          {(!searchTerm && statusFilter === 'all') && (
            <div className="mt-6">
              <button 
                onClick={handleAddPatient}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Add Patient
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <PatientDetailsModal 
        patient={selectedPatient}
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
      />
      
      <EditPatientModal 
        patient={selectedPatient}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSavePatient}
      />

      <AddPatientModal 
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        onSavePatient={handleAddNewPatient}
      />
    </div>
  );
};

export default ActivePatients;
