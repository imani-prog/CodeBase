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
import Pagination from '../../Components/Admin/Pagination';

const CHWAssignments = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  
  const assignmentStatuses = ['ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'];

  // Sample CHWs data
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

  // Sample patients data
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

  // Sample assignments
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

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssignments = filteredAssignments.slice(indexOfFirstItem, indexOfLastItem);

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
      case 'ASSIGNED': return 'text-blue-800';
      case 'IN_PROGRESS': return 'text-green-800';
      case 'COMPLETED': return 'text-gray-800';
      case 'CANCELED': return 'text-red-800';
      default: return 'text-gray-800';
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
    return 'text-blue-800';
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <div className="">
              
              <div>
                <h1 className="text-3xl font-bold ">CHW Assignments</h1>
                <p className="mt-1">Manage Community Health Worker patient assignments</p>
              </div>
            </div>

            <div className="flex space-x-3">
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-2 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">New Assignment</span>
            </button>
            </div>

          </div>
        </div>
      </div>
      

      <div className="">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          
          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm  mb-1">Total Assignments</p>
                <p className="text-3xl font-bold ">{stats.total}</p>
                <p className="text-sm text-blue-600 mt-2 flex items-center">
                  <Activity className="w-4 h-4 mr-1" />
                  {stats.assigned + stats.inProgress} Active
                </p>
              </div>
              <div className="h-14 w-14 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm  mb-1">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
                <p className="text-sm text-gray-500 mt-2">Active care plans</p>
              </div>
              <div className="h-14 w-14 rounded-xl flex items-center justify-center">
                <Play className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm  mb-1">Completed</p>
                <p className="text-3xl font-bold ">{stats.completed}</p>
                <p className="text-sm text-blue-600 mt-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Successfully finished
                </p>
              </div>
              <div className="h-14 w-14 rounded-xl  flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm  mb-1">Active CHWs</p>
                <p className="text-3xl font-bold ">{stats.activeCHWs}</p>
                <p className="text-sm  mt-2">{stats.activePatients} patients</p>
              </div>
              <div className="h-14 w-14 rounded-xlflex items-center justify-center">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
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
        </div> */}

        {/* Filters and Search */}
        <div className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by patient name, CHW name, code, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
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
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    CHW Name
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    CHW Code
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Assigned
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Started
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Completed
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Next Visit
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 whitespace-nowrap">
                      <p className="text-sm font-semibold text-gray-900">{assignment.patientName}</p>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <p className="text-sm text-gray-700">{assignment.patientCondition}</p>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{assignment.patientCity}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <p className="text-sm font-semibold text-gray-900">{assignment.chwName}</p>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <p className="text-xs text-gray-600">{assignment.chwCode}</p>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <p className="text-xs text-blue-600 font-medium">{assignment.chwSpecialization}</p>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        {getStatusIcon(assignment.status)}
                        <span>{assignment.status.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                        {assignment.priority}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs text-gray-900">{formatDate(assignment.assignedAt).split(',')[0]}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      {assignment.startedAt ? (
                        <span className="text-xs text-gray-900">{formatDate(assignment.startedAt).split(',')[0]}</span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      {assignment.completedAt ? (
                        <span className="text-xs text-gray-900">{formatDate(assignment.completedAt).split(',')[0]}</span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      {assignment.nextVisit ? (
                        <div>
                          <p className="text-xs font-medium text-gray-900">{formatDate(assignment.nextVisit).split(',')[0]}</p>
                          <p className="text-xs text-gray-500">{assignment.visitFrequency}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-1">
                        <button 
                          onClick={() => handleViewAssignment(assignment)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedAssignment(assignment);
                            setShowEditModal(true);
                          }}
                          className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete assignment for ${assignment.patientName}?`)) {
                              console.log('Deleting assignment:', assignment.id);
                              // Add delete logic here
                            }
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {assignment.status === 'ASSIGNED' && (
                          <button 
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Start Assignment"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        {assignment.status === 'IN_PROGRESS' && (
                          <button 
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Complete Assignment"
                          >
                            <CheckCircle className="w-4 h-4" />
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

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredAssignments.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          itemName="assignments"
        />

        {/* View Modal */}
        {showViewModal && selectedAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-4">
            <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
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
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">Assignment Details</h2>
                    <p className="text-sm text-white/80">Assignment ID: #{selectedAssignment.id}</p>
                  </div>
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
                <div className="border border-gray-200 bg-white shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
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
                <div className="border border-gray-200 bg-white shadow-md p-6">
                  <h3 className="text-lg font-semibold  mb-4 flex items-center space-x-2">
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
                  <h3 className="text-lg font-semibold  mb-4">Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Assigned</p>
                        <p className="text-sm text-gray-600">{formatDate(selectedAssignment.assignedAt)}</p>
                      </div>
                    </div>
                    {selectedAssignment.startedAt && (
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Play className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Started</p>
                          <p className="text-sm text-gray-600">{formatDate(selectedAssignment.startedAt)}</p>
                        </div>
                      </div>
                    )}
                    {selectedAssignment.completedAt && (
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0">
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
                  onClick={() => {
                    setShowViewModal(false);
                    setShowEditModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
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

        {/* Edit Assignment Modal */}
        {showEditModal && <EditAssignmentModal 
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          assignment={selectedAssignment}
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

    // Create new assignment object
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
    
    // Show success message
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
    return 'text-blue-800';
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-4">
      <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative px-8 py-6 bg-blue-950 text-white">
          <button 
            onClick={handleCancel}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <XCircle className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <Plus className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Create New Assignment</h2>
              <p className="text-sm text-white/80">Assign a Community Health Worker to a patient</p>
            </div>
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
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
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
                        className="w-full text-left px-4 py-3 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          
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
              <div className="mt-3 p-4 rounded-xl border border-blue-200">
                <p className="text-sm font-medium text-gray-900 mb-2">Selected Patient:</p>
                <div className="flex items-center space-x-3">
                  
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
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
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
                        className="w-full text-left px-4 py-3  transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <UserCheck className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold text-gray-900">{chw.name}</p>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                chw.status === 'AVAILABLE' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
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
              <div className="mt-3 p-4 rounded-xl border border-blue-200">
                <p className="text-sm font-medium text-gray-900 mb-2">Selected CHW:</p>
                <div className="flex items-center space-x-3">
                  
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
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
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
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
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
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
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
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent resize-none ${
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
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl"
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

// Edit Assignment Modal Component
const EditAssignmentModal = ({ showModal, setShowModal, assignment, patients, chws }) => {
  const [formData, setFormData] = useState({
    patientId: assignment?.patientId || '',
    chwId: assignment?.chwId || '',
    priority: assignment?.priority || 'MEDIUM',
    visitFrequency: assignment?.visitFrequency || 'Weekly',
    nextVisitDate: assignment?.nextVisit ? assignment.nextVisit.split('T')[0] : '',
    nextVisitTime: assignment?.nextVisit ? assignment.nextVisit.split('T')[1].substring(0, 5) : '',
    notes: assignment?.notes || '',
    status: assignment?.status || 'ASSIGNED'
  });

  const [errors, setErrors] = useState({});
  const [searchPatient, setSearchPatient] = useState(assignment?.patientName || '');
  const [searchCHW, setSearchCHW] = useState(assignment?.chwName || '');
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [showCHWDropdown, setShowCHWDropdown] = useState(false);

  const priorityLevels = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  const visitFrequencies = ['Daily', 'Every 2 Days', 'Every 3 Days', 'Weekly', 'Bi-weekly', 'Monthly'];
  const statusOptions = ['ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'];

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
    if (!formData.notes.trim()) newErrors.notes = 'Please add notes and care plan';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const updatedAssignment = {
      ...assignment,
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
      status: formData.status,
      notes: formData.notes,
      priority: formData.priority,
      visitFrequency: formData.visitFrequency,
      nextVisit: `${formData.nextVisitDate}T${formData.nextVisitTime}:00`
    };

    console.log('Updated assignment:', updatedAssignment);
    
    setShowModal(false);
    alert('Assignment updated successfully!');
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const getPriorityColor = (priority) => {
    return 'bg-blue-100 text-blue-800 border-blue-300';
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-4">
      <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative px-8 py-6 bg-blue-950 text-white">
          <button 
            onClick={handleCancel}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <XCircle className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <Edit className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Edit Assignment</h2>
              <p className="text-sm text-white/80">Update assignment details and care plan</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Activity className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
          </div>

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
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
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
                        className="w-full text-left px-4 py-3 transition-colors border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
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
              <div className="mt-3 p-4 rounded-xl border border-blue-200 bg-blue-50">
                <p className="text-sm font-medium text-gray-900 mb-2">Selected Patient:</p>
                <div className="flex items-center space-x-3">
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
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
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
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold text-gray-900">{chw.name}</p>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                chw.status === 'AVAILABLE' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
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
              <div className="mt-3 p-4 rounded-xl border border-blue-200 bg-blue-50">
                <p className="text-sm font-medium text-gray-900 mb-2">Selected CHW:</p>
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-semibold text-gray-900">{selectedCHW.name}</p>
                    <p className="text-sm text-gray-600">{selectedCHW.specialization}</p>
                    <p className="text-xs text-gray-500">{selectedCHW.code} • {selectedCHW.currentPatients} current patients</p>
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
                      ? getPriorityColor(priority)
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
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
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
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
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
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
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
              Notes & Care Plan <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="5"
                placeholder="Update assessment, care plan, and any relevant medical information..."
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent resize-none ${
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
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CHWAssignments;
