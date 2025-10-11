import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit3,
  Trash2,
  Shield,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  UserCheck,
  Settings,
  Download,
  Upload,
  Stethoscope,
  Activity,
  Star
} from 'lucide-react';
import AdminNavbar from '../../Components/AdminNavbar';
import AdminSidebar from '../../Components/AdminSidebar';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'

  // Sample users data - MediLink specific
  const users = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      email: 'sarah.mitchell@medilink.com',
      phone: '+254 701 123 456',
      role: 'admin',
      status: 'active',
      department: 'Administration',
      location: 'Nairobi HQ',
      avatar: '/src/assets/StaffMembersTeam.jpeg',
      lastLogin: '2024-10-11 16:45:32',
      joinDate: '2023-01-15',
      permissions: ['full_access', 'user_management', 'system_config'],
      patientsManaged: 0,
      specialization: 'Chief Administrator'
    },
    {
      id: 2,
      name: 'Dr. Kevin Murage',
      email: 'kevin.murage@medilink.com',
      phone: '+254 712 345 678',
      role: 'doctor',
      status: 'active',
      department: 'Internal Medicine',
      location: 'Kenyatta Hospital',
      avatar: '/src/assets/Kevin Murage.jpeg',
      lastLogin: '2024-10-11 15:23:12',
      joinDate: '2023-03-10',
      permissions: ['patient_access', 'medical_records', 'prescriptions'],
      patientsManaged: 145,
      specialization: 'Internal Medicine'
    },
    {
      id: 3,
      name: 'Grace Achieng',
      email: 'grace.achieng@medilink.com',
      phone: '+254 723 456 789',
      role: 'chw',
      status: 'active',
      department: 'Community Health',
      location: 'Kibera, Nairobi',
      avatar: '/src/assets/Grace Achieng.jpeg',
      lastLogin: '2024-10-11 14:10:45',
      joinDate: '2023-06-20',
      permissions: ['patient_reports', 'health_education', 'referrals'],
      patientsManaged: 78,
      specialization: 'Community Health Worker'
    },
    {
      id: 4,
      name: 'Peter Njoroge',
      email: 'peter.njoroge@email.com',
      phone: '+254 734 567 890',
      role: 'patient',
      status: 'active',
      department: 'N/A',
      location: 'Mathare, Nairobi',
      avatar: '/src/assets/PeterNjoroge.jpeg',
      lastLogin: '2024-10-11 12:30:15',
      joinDate: '2024-02-14',
      permissions: ['view_records', 'book_appointments'],
      patientsManaged: 0,
      specialization: 'Diabetes Management'
    },
    {
      id: 5,
      name: 'Susan Mwangi',
      email: 'susan.mwangi@medilink.com',
      phone: '+254 745 678 901',
      role: 'nurse',
      status: 'active',
      department: 'General Care',
      location: 'Mathare Health Center',
      avatar: '/src/assets/Susan Mwangi.jpeg',
      lastLogin: '2024-10-11 13:45:20',
      joinDate: '2023-09-05',
      permissions: ['patient_care', 'vital_signs', 'medication_admin'],
      patientsManaged: 89,
      specialization: 'General Nursing'
    },
    {
      id: 6,
      name: 'Linda Wambui',
      email: 'linda.wambui@medilink.com',
      phone: '+254 756 789 012',
      role: 'chw',
      status: 'inactive',
      department: 'Community Health',
      location: 'Dandora, Nairobi',
      avatar: '/src/assets/LindaWambui.jpeg',
      lastLogin: '2024-10-08 09:15:33',
      joinDate: '2023-11-12',
      permissions: ['patient_reports', 'health_education'],
      patientsManaged: 45,
      specialization: 'Maternal Health'
    },
    {
      id: 7,
      name: 'Joseph Otieno',
      email: 'joseph.otieno@medilink.com',
      phone: '+254 767 890 123',
      role: 'technician',
      status: 'active',
      department: 'IT Support',
      location: 'Nairobi HQ',
      avatar: '/src/assets/Joseph Otieno.jpeg',
      lastLogin: '2024-10-11 16:20:44',
      joinDate: '2023-05-18',
      permissions: ['system_maintenance', 'technical_support'],
      patientsManaged: 0,
      specialization: 'Medical IT Systems'
    },
    {
      id: 8,
      name: 'Esther Nyambura',
      email: 'esther.nyambura@medilink.com',
      phone: '+254 778 901 234',
      role: 'chw',
      status: 'pending',
      department: 'Community Health',
      location: 'Eastlands, Nairobi',
      avatar: '/src/assets/Esther Nyambura.jpeg',
      lastLogin: 'Never',
      joinDate: '2024-10-10',
      permissions: [],
      patientsManaged: 0,
      specialization: 'Pediatric Care'
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles', count: users.length },
    { value: 'admin', label: 'Administrators', count: users.filter(user => user.role === 'admin').length },
    { value: 'doctor', label: 'Doctors', count: users.filter(user => user.role === 'doctor').length },
    { value: 'nurse', label: 'Nurses', count: users.filter(user => user.role === 'nurse').length },
    { value: 'chw', label: 'CHWs', count: users.filter(user => user.role === 'chw').length },
    { value: 'technician', label: 'Technicians', count: users.filter(user => user.role === 'technician').length },
    { value: 'patient', label: 'Patients', count: users.filter(user => user.role === 'patient').length }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', count: users.length },
    { value: 'active', label: 'Active', count: users.filter(user => user.status === 'active').length },
    { value: 'inactive', label: 'Inactive', count: users.filter(user => user.status === 'inactive').length },
    { value: 'pending', label: 'Pending', count: users.filter(user => user.status === 'pending').length }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Shield className="w-5 h-5 text-purple-600" />;
      case 'doctor': return <Stethoscope className="w-5 h-5 text-blue-600" />;
      case 'nurse': return <UserCheck className="w-5 h-5 text-green-600" />;
      case 'chw': return <Users className="w-5 h-5 text-orange-600" />;
      case 'technician': return <Settings className="w-5 h-5 text-gray-600" />;
      case 'patient': return <Activity className="w-5 h-5 text-indigo-600" />;
      default: return <Users className="w-5 h-5 text-gray-600" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'doctor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'nurse': return 'bg-green-100 text-green-800 border-green-200';
      case 'chw': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'technician': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'patient': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for users:`, selectedUsers);
    setSelectedUsers([]);
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
                  <h1 className="text-4xl font-bold mb-2">User Management</h1>
                  <p className="text-blue-200 text-lg">
                    Manage user accounts, roles, permissions, and access control across MediLink
                  </p>
                  <div className="mt-4 flex items-center space-x-6">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-300" />
                      <span className="text-blue-200">
                        {filteredUsers.length} Total Users
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                      <span className="text-blue-200">
                        {users.filter(u => u.status === 'active').length} Active
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-yellow-300" />
                      <span className="text-blue-200">
                        {users.filter(u => u.status === 'pending').length} Pending
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                    <Users className="w-16 h-16 text-blue-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users, emails, or departments..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  {/* Role Filter */}
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {roleOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} ({option.count})
                      </option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} ({option.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {selectedUsers.length > 0 && (
                  <>
                    <span className="text-sm text-gray-600">
                      {selectedUsers.length} selected
                    </span>
                    <button
                      onClick={() => handleBulkAction('activate')}
                      className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Activate
                    </button>
                    <button
                      onClick={() => handleBulkAction('deactivate')}
                      className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Deactivate
                    </button>
                  </>
                )}
                
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </button>
                
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers(filteredUsers.map(user => user.id));
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role & Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patients
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleSelectUser(user.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff&size=40`;
                            }}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-xs text-gray-400 flex items-center mt-1">
                              <Phone className="w-3 h-3 mr-1" />
                              {user.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center mb-2">
                          {getRoleIcon(user.role)}
                          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                            {user.role.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">{user.department}</div>
                        <div className="text-xs text-gray-500">{user.specialization}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(user.status)}
                          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                            {user.status.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {user.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex flex-col">
                          {user.lastLogin === 'Never' ? (
                            <span className="text-gray-400">Never</span>
                          ) : (
                            <>
                              <span>{new Date(user.lastLogin).toLocaleDateString()}</span>
                              <span className="text-xs text-gray-400">
                                {new Date(user.lastLogin).toLocaleTimeString()}
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.patientsManaged}
                        </div>
                        <div className="text-xs text-gray-500">managed</div>
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

            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">
                  {searchTerm || selectedRole !== 'all' || selectedStatus !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'No users are available in the system'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                  <p className="text-sm text-blue-600 mt-2">All registered users</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Healthcare Staff</p>
                  <p className="text-3xl font-bold text-green-600">
                    {users.filter(u => ['doctor', 'nurse', 'chw'].includes(u.role)).length}
                  </p>
                  <p className="text-sm text-green-600 mt-2">Active healthcare workers</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Patients Managed</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {users.reduce((total, user) => total + user.patientsManaged, 0)}
                  </p>
                  <p className="text-sm text-purple-600 mt-2">Total patient interactions</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {users.filter(u => u.status === 'pending').length}
                  </p>
                  <p className="text-sm text-yellow-600 mt-2">Awaiting approval</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;