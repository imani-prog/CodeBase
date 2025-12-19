import React, { useState } from 'react';
import { 
  UserCheck, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Square,
  AlertCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  Activity,
  FileText,
  Download,
  Upload,
  ArrowRight,
  User,
  Stethoscope,
  Target,
  BarChart3,
  Timer,
  Award
} from 'lucide-react';

const CHWAssignments = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Assignment statuses matching backend enum
  const assignmentStatuses = ['ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'];

  // Sample CHWs data (would come from backend)
  const chws = [
    {
      id: 1,
      code: 'CHW-001',
      name: 'Grace Akinyi Achieng',
      email: 'grace.achieng@medilink.com',
      phone: '+254712345678',
      specialization: 'Maternal Health',
      status: 'AVAILABLE',
      region: 'Nairobi',
      currentPatients: 32
    },
    {
      id: 2,
      code: 'CHW-002',
      name: 'Peter Kamau Njoroge',
      email: 'peter.njoroge@medilink.com',
      phone: '+254723456789',
      specialization: 'General Health',
      status: 'AVAILABLE',
      region: 'Mombasa',
      currentPatients: 18
    },
    {
      id: 3,
      code: 'CHW-003',
      name: 'Lucy Nyambura Wanjiku',
      email: 'lucy.wanjiku@medilink.com',
      phone: '+254734567890',
      specialization: 'Child Health',
      status: 'AVAILABLE',
      region: 'Kisumu',
      currentPatients: 25
    }
  ];

  // Sample patients data (would come from backend)
  const patients = [
    {
      id: 1,
      name: 'John Doe',
      nationalId: 'ID-12345678',
      phone: '+254712345678',
      condition: 'Hypertension',
      city: 'Nairobi'
    },
    {
      id: 2,
      name: 'Mary Wambui',
      nationalId: 'ID-23456789',
      phone: '+254723456789',
      condition: 'Diabetes',
      city: 'Nairobi'
    },
    {
      id: 3,
      name: 'Ali Hassan',
      nationalId: 'ID-34567890',
      phone: '+254734567890',
      condition: 'Asthma',
      city: 'Mombasa'
    }
  ];

  // Sample assignments matching backend CommunityHealthWorkerAssignment entity
  const assignments = [
    {
      id: 1,
      patientId: 1,
      patientName: 'John Doe',
      patientPhone: '+254712345678',
      patientCondition: 'Hypertension',
      patientCity: 'Nairobi',
      chwId: 1,
      chwCode: 'CHW-001',
      chwName: 'Grace Akinyi Achieng',
      chwPhone: '+254712345678',
      chwSpecialization: 'Maternal Health',
      status: 'IN_PROGRESS',
      assignedAt: '2025-12-10T08:30:00',
      startedAt: '2025-12-10T09:15:00',
      completedAt: null,
      notes: 'Regular home visits for blood pressure monitoring. Patient responding well to medication.',
      priority: 'HIGH',
      visitFrequency: 'Weekly',
      nextVisit: '2025-12-23T10:00:00'
    },
    {
      id: 2,
      patientId: 2,
      patientName: 'Mary Wambui',
      patientPhone: '+254723456789',
      patientCondition: 'Diabetes',
      patientCity: 'Nairobi',
      chwId: 1,
      chwCode: 'CHW-001',
      chwName: 'Grace Akinyi Achieng',
      chwPhone: '+254712345678',
      chwSpecialization: 'Maternal Health',
      status: 'ASSIGNED',
      assignedAt: '2025-12-18T10:00:00',
      startedAt: null,
      completedAt: null,
      notes: 'New assignment. Patient needs diabetes education and glucose monitoring.',
      priority: 'MEDIUM',
      visitFrequency: 'Bi-weekly',
      nextVisit: '2025-12-21T14:00:00'
    },
    {
      id: 3,
      patientId: 3,
      patientName: 'Ali Hassan',
      patientPhone: '+254734567890',
      patientCondition: 'Asthma',
      patientCity: 'Mombasa',
      chwId: 2,
      chwCode: 'CHW-002',
      chwName: 'Peter Kamau Njoroge',
      chwPhone: '+254723456789',
      chwSpecialization: 'General Health',
      status: 'COMPLETED',
      assignedAt: '2025-11-15T09:00:00',
      startedAt: '2025-11-15T10:30:00',
      completedAt: '2025-12-15T16:00:00',
      notes: 'Successfully completed 4-week asthma management program. Patient symptoms improved significantly.',
      priority: 'LOW',
      visitFrequency: 'Weekly',
      nextVisit: null
    },
    {
      id: 4,
      patientId: 1,
      patientName: 'Grace Achieng',
      patientPhone: '+254745678901',
      patientCondition: 'Heart Disease',
      patientCity: 'Nairobi',
      chwId: 1,
      chwCode: 'CHW-001',
      chwName: 'Grace Akinyi Achieng',
      chwPhone: '+254712345678',
      chwSpecialization: 'Maternal Health',
      status: 'IN_PROGRESS',
      assignedAt: '2025-12-05T11:00:00',
      startedAt: '2025-12-06T08:00:00',
      completedAt: null,
      notes: 'Critical patient requiring daily monitoring. Coordinating with cardiologist.',
      priority: 'CRITICAL',
      visitFrequency: 'Daily',
      nextVisit: '2025-12-21T08:00:00'
    },
    {
      id: 5,
      patientId: 2,
      patientName: 'Peter Njoroge',
      patientPhone: '+254756789012',
      patientCondition: 'Surgery Recovery',
      patientCity: 'Kisumu',
      chwId: 3,
      chwCode: 'CHW-003',
      chwName: 'Lucy Nyambura Wanjiku',
      chwPhone: '+254734567890',
      chwSpecialization: 'Child Health',
      status: 'CANCELED',
      assignedAt: '2025-12-12T13:00:00',
      startedAt: null,
      completedAt: null,
      notes: 'Assignment canceled - patient relocated to another region.',
      priority: 'MEDIUM',
      visitFrequency: 'Bi-weekly',
      nextVisit: null
    },
    {
      id: 6,
      patientId: 3,
      patientName: 'Sarah Wanjiru',
      patientPhone: '+254767890123',
      patientCondition: 'Maternal Care',
      patientCity: 'Nairobi',
      chwId: 1,
      chwCode: 'CHW-001',
      chwName: 'Grace Akinyi Achieng',
      chwPhone: '+254712345678',
      chwSpecialization: 'Maternal Health',
      status: 'IN_PROGRESS',
      assignedAt: '2025-11-28T09:30:00',
      startedAt: '2025-11-29T10:00:00',
      completedAt: null,
      notes: 'Prenatal care visits. Expected delivery in 6 weeks.',
      priority: 'HIGH',
      visitFrequency: 'Weekly',
      nextVisit: '2025-12-22T11:00:00'
    }
  ];

  // Filter assignments
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = 
      assignment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.chwName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.chwCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.patientCondition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: assignments.length,
    assigned: assignments.filter(a => a.status === 'ASSIGNED').length,
    inProgress: assignments.filter(a => a.status === 'IN_PROGRESS').length,
    completed: assignments.filter(a => a.status === 'COMPLETED').length,
    canceled: assignments.filter(a => a.status === 'CANCELED').length,
    activeCHWs: new Set(assignments.filter(a => a.status === 'IN_PROGRESS' || a.status === 'ASSIGNED').map(a => a.chwId)).size,
    activePatients: new Set(assignments.filter(a => a.status === 'IN_PROGRESS' || a.status === 'ASSIGNED').map(a => a.patientId)).size
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ASSIGNED': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-green-100 text-green-800';
      case 'COMPLETED': return 'bg-gray-100 text-gray-800';
      case 'CANCELED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ASSIGNED': return <Clock className="w-4 h-4" />;
      case 'IN_PROGRESS': return <Play className="w-4 h-4" />;
      case 'COMPLETED': return <CheckCircle className="w-4 h-4" />;
      case 'CANCELED': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowViewModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-8">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CHW Assignments</h1>
                <p className="text-gray-600 mt-1">Manage Community Health Worker patient assignments</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">New Assignment</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Assignments</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-blue-600 mt-2 flex items-center">
                  <Activity className="w-4 h-4 mr-1" />
                  {stats.assigned + stats.inProgress} Active
                </p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-green-600">{stats.inProgress}</p>
                <p className="text-sm text-gray-500 mt-2">Active care plans</p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center">
                <Play className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Successfully finished
                </p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-gray-100 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active CHWs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeCHWs}</p>
                <p className="text-sm text-gray-500 mt-2">{stats.activePatients} patients</p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center space-x-1 p-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab('assigned')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'assigned'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Assigned ({stats.assigned})
            </button>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'in-progress'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              In Progress ({stats.inProgress})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'completed'
                  ? 'bg-gray-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Completed ({stats.completed})
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by patient name, CHW name, code, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  {assignmentStatuses.map(status => (
                    <option key={status} value={status}>{status.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>

              <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
            <span>Showing {filteredAssignments.length} of {assignments.length} assignments</span>
          </div>
        </div>

        {/* Assignments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    CHW Assigned
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Timeline
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Next Visit
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{assignment.patientName}</p>
                          <p className="text-sm text-gray-500">{assignment.patientCondition}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{assignment.patientCity}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{assignment.chwName}</p>
                          <p className="text-xs text-gray-500">{assignment.chwCode}</p>
                          <p className="text-xs text-green-600">{assignment.chwSpecialization}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        {getStatusIcon(assignment.status)}
                        <span>{assignment.status.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                        {assignment.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Assigned:</span>
                          <span className="text-gray-900">{formatDate(assignment.assignedAt).split(',')[0]}</span>
                        </div>
                        {assignment.startedAt && (
                          <div className="flex items-center space-x-2">
                            <Play className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">Started:</span>
                            <span className="text-gray-900">{formatDate(assignment.startedAt).split(',')[0]}</span>
                          </div>
                        )}
                        {assignment.completedAt && (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">Completed:</span>
                            <span className="text-gray-900">{formatDate(assignment.completedAt).split(',')[0]}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {assignment.nextVisit ? (
                        <div>
                          <p className="text-sm font-medium text-gray-900">{formatDate(assignment.nextVisit).split(',')[0]}</p>
                          <p className="text-xs text-gray-500">{assignment.visitFrequency}</p>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleViewAssignment(assignment)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        {assignment.status === 'ASSIGNED' && (
                          <button 
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Start Assignment"
                          >
                            <Play className="w-5 h-5" />
                          </button>
                        )}
                        {assignment.status === 'IN_PROGRESS' && (
                          <button 
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            title="Complete Assignment"
                          >
                            <Square className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Modal */}
        {showViewModal && selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Assignment Details</h2>
                    <p className="text-sm text-gray-500 mt-1">Assignment ID: #{selectedAssignment.id}</p>
                  </div>
                  <button 
                    onClick={() => setShowViewModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Status and Priority */}
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(selectedAssignment.status)}`}>
                    {getStatusIcon(selectedAssignment.status)}
                    <span>{selectedAssignment.status.replace('_', ' ')}</span>
                  </span>
                  <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${getPriorityColor(selectedAssignment.priority)}`}>
                    {selectedAssignment.priority} Priority
                  </span>
                </div>

                {/* Patient Information */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Patient Information</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{selectedAssignment.patientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Condition</p>
                      <p className="font-medium text-gray-900">{selectedAssignment.patientCondition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{selectedAssignment.patientPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{selectedAssignment.patientCity}</p>
                    </div>
                  </div>
                </div>

                {/* CHW Information */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <UserCheck className="w-5 h-5" />
                    <span>Assigned CHW</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{selectedAssignment.chwName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">CHW Code</p>
                      <p className="font-medium text-gray-900">{selectedAssignment.chwCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Specialization</p>
                      <p className="font-medium text-gray-900">{selectedAssignment.chwSpecialization}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{selectedAssignment.chwPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Assigned</p>
                        <p className="text-sm text-gray-600">{formatDate(selectedAssignment.assignedAt)}</p>
                      </div>
                    </div>
                    {selectedAssignment.startedAt && (
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Play className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Started</p>
                          <p className="text-sm text-gray-600">{formatDate(selectedAssignment.startedAt)}</p>
                        </div>
                      </div>
                    )}
                    {selectedAssignment.completedAt && (
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Completed</p>
                          <p className="text-sm text-gray-600">{formatDate(selectedAssignment.completedAt)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visit Schedule */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Visit Schedule</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Frequency</p>
                      <p className="font-medium text-gray-900">{selectedAssignment.visitFrequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Visit</p>
                      <p className="font-medium text-gray-900">
                        {selectedAssignment.nextVisit ? formatDate(selectedAssignment.nextVisit) : 'Not scheduled'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700">{selectedAssignment.notes}</p>
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
                  className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  Edit Assignment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Assignment Modal */}
        {showAddModal && <AddAssignmentModal 
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          patients={patients}
          chws={chws}
        />}
      </div>
    </div>
  );
};

// Add Assignment Modal Component
const AddAssignmentModal = ({ showModal, setShowModal, patients, chws }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    chwId: '',
    priority: 'MEDIUM',
    visitFrequency: 'Weekly',
    nextVisitDate: '',
    nextVisitTime: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [searchPatient, setSearchPatient] = useState('');
  const [searchCHW, setSearchCHW] = useState('');
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [showCHWDropdown, setShowCHWDropdown] = useState(false);

  const priorityLevels = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  const visitFrequencies = ['Daily', 'Every 2 Days', 'Every 3 Days', 'Weekly', 'Bi-weekly', 'Monthly'];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
    patient.nationalId.toLowerCase().includes(searchPatient.toLowerCase())
  );

  const filteredCHWs = chws.filter(chw =>
    chw.name.toLowerCase().includes(searchCHW.toLowerCase()) ||
    chw.code.toLowerCase().includes(searchCHW.toLowerCase()) ||
    chw.specialization.toLowerCase().includes(searchCHW.toLowerCase())
  );

  const selectedPatient = patients.find(p => p.id === formData.patientId);
  const selectedCHW = chws.find(c => c.id === formData.chwId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePatientSelect = (patient) => {
    setFormData(prev => ({ ...prev, patientId: patient.id }));
    setSearchPatient(patient.name);
    setShowPatientDropdown(false);
    if (errors.patientId) {
      setErrors(prev => ({ ...prev, patientId: '' }));
    }
  };

  const handleCHWSelect = (chw) => {
    setFormData(prev => ({ ...prev, chwId: chw.id }));
    setSearchCHW(chw.name);
    setShowCHWDropdown(false);
    if (errors.chwId) {
      setErrors(prev => ({ ...prev, chwId: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = 'Please select a patient';
    if (!formData.chwId) newErrors.chwId = 'Please select a CHW';
    if (!formData.nextVisitDate) newErrors.nextVisitDate = 'Next visit date is required';
    if (!formData.nextVisitTime) newErrors.nextVisitTime = 'Next visit time is required';
    if (!formData.notes.trim()) newErrors.notes = 'Please add initial notes and care plan';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Create new assignment object matching backend structure
    const newAssignment = {
      id: Date.now(),
      patientId: formData.patientId,
      patientName: selectedPatient.name,
      patientPhone: selectedPatient.phone,
      patientCondition: selectedPatient.condition,
      patientCity: selectedPatient.city,
      chwId: formData.chwId,
      chwCode: selectedCHW.code,
      chwName: selectedCHW.name,
      chwPhone: selectedCHW.phone,
      chwSpecialization: selectedCHW.specialization,
      status: 'ASSIGNED',
      assignedAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      notes: formData.notes,
      priority: formData.priority,
      visitFrequency: formData.visitFrequency,
      nextVisit: `${formData.nextVisitDate}T${formData.nextVisitTime}:00`
    };

    console.log('New assignment created:', newAssignment);
    // Here you would typically send to backend via API
    
    // Reset form and close modal
    setFormData({
      patientId: '',
      chwId: '',
      priority: 'MEDIUM',
      visitFrequency: 'Weekly',
      nextVisitDate: '',
      nextVisitTime: '',
      notes: ''
    });
    setSearchPatient('');
    setSearchCHW('');
    setShowModal(false);
    
    // Show success message (you can implement a toast notification)
    alert('Assignment created successfully!');
  };

  const handleCancel = () => {
    setFormData({
      patientId: '',
      chwId: '',
      priority: 'MEDIUM',
      visitFrequency: 'Weekly',
      nextVisitDate: '',
      nextVisitTime: '',
      notes: ''
    });
    setSearchPatient('');
    setSearchCHW('');
    setErrors({});
    setShowModal(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-300';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Create New Assignment</h2>
                <p className="text-sm text-gray-600 mt-1">Assign a Community Health Worker to a patient</p>
              </div>
            </div>
            <button 
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Select Patient <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by patient name or National ID..."
                  value={searchPatient}
                  onChange={(e) => {
                    setSearchPatient(e.target.value);
                    setShowPatientDropdown(true);
                  }}
                  onFocus={() => setShowPatientDropdown(true)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.patientId ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              
              {showPatientDropdown && searchPatient && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map(patient => (
                      <button
                        key={patient.id}
                        type="button"
                        onClick={() => handlePatientSelect(patient)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{patient.name}</p>
                            <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                              <span>{patient.nationalId}</span>
                              <span>•</span>
                              <span>{patient.condition}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {patient.city}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No patients found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors.patientId && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.patientId}
              </p>
            )}
            
            {selectedPatient && (
              <div className="mt-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm font-medium text-gray-900 mb-2">Selected Patient:</p>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedPatient.name}</p>
                    <p className="text-sm text-gray-600">{selectedPatient.condition}</p>
                    <p className="text-xs text-gray-500">{selectedPatient.phone} • {selectedPatient.city}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CHW Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Assign CHW <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="relative">
                <UserCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by CHW name, code, or specialization..."
                  value={searchCHW}
                  onChange={(e) => {
                    setSearchCHW(e.target.value);
                    setShowCHWDropdown(true);
                  }}
                  onFocus={() => setShowCHWDropdown(true)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.chwId ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              
              {showCHWDropdown && searchCHW && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                  {filteredCHWs.length > 0 ? (
                    filteredCHWs.map(chw => (
                      <button
                        key={chw.id}
                        type="button"
                        onClick={() => handleCHWSelect(chw)}
                        className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                            <UserCheck className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold text-gray-900">{chw.name}</p>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                chw.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {chw.status}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                              <span>{chw.code}</span>
                              <span>•</span>
                              <span>{chw.specialization}</span>
                              <span>•</span>
                              <span>{chw.currentPatients} patients</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {chw.region}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <UserCheck className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No CHWs found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors.chwId && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.chwId}
              </p>
            )}
            
            {selectedCHW && (
              <div className="mt-3 p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-sm font-medium text-gray-900 mb-2">Selected CHW:</p>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedCHW.name}</p>
                    <p className="text-sm text-gray-600">{selectedCHW.specialization}</p>
                    <p className="text-xs text-gray-500">{selectedCHW.code} • {selectedCHW.currentPatients} current patients • {selectedCHW.region}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Priority Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Priority Level <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {priorityLevels.map(priority => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, priority }))}
                  className={`px-4 py-3 rounded-xl font-medium text-sm transition-all border-2 ${
                    formData.priority === priority
                      ? getPriorityColor(priority) + ' border-current'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          {/* Visit Frequency */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Visit Frequency <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                name="visitFrequency"
                value={formData.visitFrequency}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {visitFrequencies.map(freq => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Next Visit Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Next Visit Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="nextVisitDate"
                  value={formData.nextVisitDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.nextVisitDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.nextVisitDate && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.nextVisitDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Next Visit Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="time"
                  name="nextVisitTime"
                  value={formData.nextVisitTime}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.nextVisitTime ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.nextVisitTime && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.nextVisitTime}
                </p>
              )}
            </div>
          </div>

          {/* Notes / Care Plan */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Initial Notes & Care Plan <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="5"
                placeholder="Enter initial assessment, care plan, and any relevant medical information..."
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none ${
                  errors.notes ? 'border-red-300' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.notes && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.notes}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Provide detailed information about the patient's condition, treatment plan, and specific care instructions for the CHW.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            <span className="text-red-500">*</span> Required fields
          </p>
          <div className="flex space-x-3">
            <button 
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Create Assignment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CHWAssignments;
