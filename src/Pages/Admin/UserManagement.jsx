import React, { useState,useEffect } from 'react';
 import { userApi } from '../../API/endpoints/userApi.js';
import { LoadingSpinner, ErrorMessage } from '../../Components/Admin/DataState.jsx';

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

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [_viewMode, _setViewMode] = useState('table'); // 'table' or 'cards'


// Replace hardcoded users array with:
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const fetchUsers = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await userApi.list();

    const normalized = (Array.isArray(data) ? data : []).map(user => ({
      ...user,
      patientsManaged: user.patients ?? user.patientsManaged ?? 0
    }));

    setUsers(normalized);
  } catch (err) {
    setError(err.message || 'Failed to load users');
  } finally {
    setLoading(false);
  }
};

useEffect(() => { fetchUsers(); }, []);

  const roleOptions = [
    { value: 'all', label: 'All Roles', count: users.length },
    { value: 'admin', label: 'Administrators', count: users.filter(user => user.role === 'admin').length },
    { value: 'doctor', label: 'Doctors', count: users.filter(user => user.role === 'doctor').length },
    { value: 'chw', label: 'CHWs', count: users.filter(user => user.role === 'chw').length },
    { value: 'patient', label: 'Patients', count: users.filter(user => user.role === 'patient').length }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', count: users.length },
    { value: 'active', label: 'Active', count: users.filter(user => user.status === 'active').length },
    { value: 'inactive', label: 'Inactive', count: users.filter(user => user.status === 'inactive').length },
    { value: 'pending', label: 'Pending', count: users.filter(user => user.status === 'pending').length }
  ];

  const filteredUsers = users.filter(user => {
  const matchesSearch =
    (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.department || "").toLowerCase().includes(searchTerm.toLowerCase());

  const matchesRole = selectedRole === 'all' || user.role === selectedRole;
  const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

  return matchesSearch && matchesRole && matchesStatus;
});

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Shield className="w-5 h-5 text-blue-600" />;
      case 'doctor': return <Stethoscope className="w-5 h-5 text-blue-600" />;
      case 'nurse': return <UserCheck className="w-5 h-5 text-blue-600" />;
      case 'chw': return <Users className="w-5 h-5 text-blue-600" />;
      case 'technician': return <Settings className="w-5 h-5 text-blue-600" />;
      case 'patient': return <Activity className="w-5 h-5 text-blue-600" />;
      default: return <Users className="w-5 h-5 text-blue-600" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return ' text-blue-800 border-blue-200';
      case 'doctor': return ' text-blue-800 border-blue-200';
      case 'nurse': return ' text-blue-800 border-blue-200';
      case 'chw': return ' text-blue-800 border-blue-200';
      case 'technician': return ' text-blue-800 border-blue-200';
      case 'patient': return ' text-blue-800 border-blue-200';
      default: return ' text-gray-800 border-gray-200';
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
      case 'active': return 'text-green-800 border-green-200';
      case 'inactive': return 'text-red-800 border-red-200';
      case 'pending': return 'text-yellow-800 border-yellow-200';
      default: return 'text-gray-800 border-gray-200';
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
    <div className="min-h-screen bg-gray-50 p-4 lg:p-5">
      {/* Header Section */}
      <div className="mb-4">
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <div className="items-center space-x-4">
              <h1 className="text-2xl font-bold mb-1">User Management</h1>
              
              <div className="">
                  </div>
                </div>
              </div>
            </div>
          </div>

           {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-sm text-blue-600 mt-1">All registered users</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Healthcare Staff</p>
                  <p className="text-2xl font-bold">
                    {users.filter(u => ['doctor', 'nurse', 'chw'].includes(u.role)).length}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">Active healthcare workers</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Patients Managed</p>
                  <p className="text-2xl font-bold">
                    {users.reduce((total, user) => total + user.patientsManaged, 0)}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">Total patient interactions</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Pending Approvals</p>
                  <p className="text-2xl font-bold">
                    {users.filter(u => u.status === 'pending').length}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">Awaiting approval</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="mb-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users, emails, or departments..."
                    className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  {/* Role Filter */}
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
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
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
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
                      className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Activate
                    </button>
                    <button
                      onClick={() => handleBulkAction('deactivate')}
                      className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Deactivate
                    </button>
                  </>
                )}
                
                <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                
                <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </button>
                
                <button className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2.5 text-left">
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
                    <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">
                      Role & Department
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">
                      Patients
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleSelectUser(user.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff&size=40`;
                            }}
                          /> */}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-xs text-gray-400 flex items-center mt-1">
                              <Phone className="w-3 h-3 mr-1" />
                              {user.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <div className="flex items-center mb-2">
                          {getRoleIcon(user.role)}
                          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                            {user.role.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">{user.department}</div>
                        <div className="text-xs text-gray-500">{user.specialization}</div>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(user.status)}
                          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                            {user.status.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" />
                          {user.location}
                        </div>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-600">
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
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.patientsManaged}
                        </div>
                        <div className="text-xs text-gray-500">managed</div>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 transition-colors">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-3.5 h-3.5" />
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
              <div className="text-center py-10">
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
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="shadow-sm border border-gray-200 p-6">
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

            <div className="shadow-sm border border-gray-200 p-6">
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

            <div className="shadow-sm border border-gray-200 p-6">
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

            <div className="shadow-sm border border-gray-200 p-6">
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
          </div> */}

    </div>
  );
};

export default UserManagement;