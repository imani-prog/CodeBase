import React, { useState, useEffect } from 'react';
import { userApi } from '../../API/endpoints/userApi.js';
import { LoadingSpinner, ErrorMessage } from '../../Components/Admin/DataState.jsx';

import {
  Users,
  UserPlus,
  Search,
  MoreHorizontal,
  Edit3,
  Shield,
  Eye,
  Phone,
  MapPin,
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
} from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [_viewMode, _setViewMode] = useState('table');

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
        name: user.fullName ?? user.username ?? '—',
        status: (user.status ?? 'ACTIVE').toLowerCase(),
        role: (user.role ?? 'PATIENT').toLowerCase(),
        lastLogin: user.lastLoginAt ?? null,
        patientsManaged: user.patientsManaged ?? 0,
        department: user.department ?? null,
        specialization: user.specialization ?? null,
        location: user.location ?? null,
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
    { value: 'all',     label: 'All Roles',       count: users.length },
    { value: 'admin',   label: 'Administrators',   count: users.filter(u => u.role === 'admin').length },
    { value: 'doctor',  label: 'Doctors',          count: users.filter(u => u.role === 'doctor').length },
    { value: 'chw',     label: 'CHWs',             count: users.filter(u => u.role === 'chw').length },
    { value: 'patient', label: 'Patients',         count: users.filter(u => u.role === 'patient').length },
  ];

  const statusOptions = [
    { value: 'all',      label: 'All Status', count: users.length },
    { value: 'active',   label: 'Active',     count: users.filter(u => u.status === 'active').length },
    { value: 'inactive', label: 'Inactive',   count: users.filter(u => u.status === 'inactive').length },
    { value: 'pending',  label: 'Pending',    count: users.filter(u => u.status === 'pending').length },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      (user.name        || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email       || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.username    || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone       || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole   = selectedRole   === 'all' || user.role   === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':      return <Shield      className="w-5 h-5 text-blue-600" />;
      case 'doctor':     return <Stethoscope className="w-5 h-5 text-blue-600" />;
      case 'nurse':      return <UserCheck   className="w-5 h-5 text-blue-600" />;
      case 'chw':        return <Users       className="w-5 h-5 text-blue-600" />;
      case 'technician': return <Settings    className="w-5 h-5 text-blue-600" />;
      case 'patient':    return <Activity    className="w-5 h-5 text-blue-600" />;
      default:           return <Users       className="w-5 h-5 text-blue-600" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
      case 'doctor':
      case 'nurse':
      case 'chw':
      case 'technician':
      case 'patient':    return 'text-blue-800 border-blue-200';
      default:           return 'text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':   return <CheckCircle  className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle      className="w-4 h-4 text-red-500" />;
      case 'pending':  return <Clock        className="w-4 h-4 text-yellow-500" />;
      default:         return <AlertCircle  className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':   return 'text-green-800 border-green-200';
      case 'inactive': return 'text-red-800 border-red-200';
      case 'pending':  return 'text-yellow-800 border-yellow-200';
      default:         return 'text-gray-800 border-gray-200';
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

  if (loading) return <LoadingSpinner />;
  if (error)   return <ErrorMessage message={error} onRetry={fetchUsers} />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-5">
      {/* Header Section */}
      <div className="mb-4">
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <div className="items-center space-x-4">
              <h1 className="text-2xl font-bold mb-1">User Management</h1>
              <div className=""></div>
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
              <p className="text-xs uppercase tracking-wide text-gray-500">Admins</p>
              <p className="text-2xl font-bold">
                {users.filter(u => u.role === 'admin').length}
              </p>
              <p className="text-sm text-blue-600 mt-1">System administrators</p>
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
                placeholder="Search users, emails, or phone..."
                className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
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
                <span className="text-sm text-gray-600">{selectedUsers.length} selected</span>
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
            <thead className="bg-gray-100 border-b border-gray-200">
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
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">User</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">Username</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">Role</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">Phone</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">Last Login</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">Member Since</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">

                  {/* Checkbox */}
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>

                  {/* User */}
                  <td className="px-3 py-2.5">
                    <div className="">
                      <div className="">
                        
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Username */}
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span className="text-xs text-gray-600">@{user.username}</span>
                  </td>

                  {/* Role */}
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRoleIcon(user.role)}
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(user.status)}
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                        {user.status.toUpperCase()}
                      </span>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-3 h-3 mr-1 text-gray-400" />
                      {user.phone ?? '—'}
                    </div>
                  </td>

                  {/* Last Login */}
                  <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-600">
                    {(() => {
                      const raw = user.lastLogin;
                      if (!raw) return <span className="text-gray-400 text-xs">Never</span>;
                      const d = new Date(raw);
                      if (isNaN(d.getTime())) return <span className="text-gray-400 text-xs">Never</span>;
                      return (
                        <div className="flex flex-col">
                          <span>{d.toLocaleDateString()}</span>
                          <span className="text-xs text-gray-400">{d.toLocaleTimeString()}</span>
                        </div>
                      );
                    })()}
                  </td>

                  {/* Member Since */}
                  <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-500">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : '—'}
                  </td>

                  {/* Actions */}
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
                : 'No users are available in the system'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;