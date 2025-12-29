import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Clock, 
  AlertTriangle, 
  Users, 
  FileText, 
  Shield, 
  Search, 
  Filter, 
  ChevronDown,
  Eye,
  Calendar,
  Mail,
  Phone,
  MapPin,
  UserCheck,
  Hospital,
  Stethoscope
} from 'lucide-react';

const ApproveRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Sample requests data
  const requests = [
    {
      id: 1,
      type: 'chw_application',
      title: 'Community Health Worker Application',
      applicant: {
        name: 'Grace Achieng',
        email: 'grace.achieng@email.com',
        phone: '+254 712 345 678',
        location: 'Kibera, Nairobi',
        avatar: '/src/assets/Grace Achieng.jpeg'
      },
      submittedDate: '2024-10-10',
      priority: 'high',
      status: 'pending',
      description: 'Application for CHW certification with 3 years community health experience',
      documents: ['Certificate', 'ID Copy', 'Recommendation Letter'],
      experience: '3 years',
      certifications: ['Basic Life Support', 'Community Health']
    },
    {
      id: 2,
      type: 'patient_registration',
      title: 'Patient Registration Request',
      applicant: {
        name: 'Peter Njoroge',
        email: 'peter.njoroge@email.com',
        phone: '+254 723 456 789',
        location: 'Mathare, Nairobi',
        avatar: '/src/assets/PeterNjoroge.jpeg'
      },
      submittedDate: '2024-10-09',
      priority: 'medium',
      status: 'pending',
      description: 'New patient registration for diabetes management program',
      documents: ['Medical History', 'Insurance Card', 'ID Copy'],
      medicalCondition: 'Type 2 Diabetes',
      referredBy: 'Dr. Sarah Mitchell'
    },
    {
      id: 3,
      type: 'system_access',
      title: 'System Access Request',
      applicant: {
        name: 'Dr. Kevin Murage',
        email: 'kevin.murage@medlink.com',
        phone: '+254 734 567 890',
        location: 'Kenyatta Hospital',
        avatar: '/src/assets/Kevin Murage.jpeg'
      },
      submittedDate: '2024-10-09',
      priority: 'urgent',
      status: 'pending',
      description: 'Requesting admin access to patient management system',
      documents: ['Employment Letter', 'Medical License', 'Security Clearance'],
      department: 'Internal Medicine',
      accessLevel: 'Administrator'
    },
    {
      id: 4,
      type: 'clinic_partnership',
      title: 'Clinic Partnership Request',
      applicant: {
        name: "St. Mary's Health Center",
        email: 'admin@stmarys.co.ke',
        phone: '+254 745 678 901',
        location: 'Westlands, Nairobi',
        avatar: '/src/assets/StMarys.png'
      },
      submittedDate: '2024-10-08',
      priority: 'medium',
      status: 'pending',
      description: 'Request to join MediLink network as partner clinic',
      documents: ['License', 'Accreditation', 'Partnership Agreement'],
      clinicType: 'Private Hospital',
      services: ['General Medicine', 'Pediatrics', 'Maternity']
    },
    {
      id: 5,
      type: 'training_enrollment',
      title: 'Training Program Enrollment',
      applicant: {
        name: 'Susan Mwangi',
        email: 'susan.mwangi@email.com',
        phone: '+254 756 789 012',
        location: 'Dandora, Nairobi',
        avatar: '/src/assets/Susan Mwangi.jpeg'
      },
      submittedDate: '2024-10-07',
      priority: 'low',
      status: 'pending',
      description: 'Enrollment request for Digital Health Technology Training',
      documents: ['Application Form', 'Educational Certificates', 'Work Experience'],
      course: 'Digital Health Technology Training',
      preferredStartDate: '2024-11-01'
    },
    {
      id: 6,
      type: 'equipment_request',
      title: 'Medical Equipment Request',
      applicant: {
        name: 'Mathare Health Center',
        email: 'admin@matharehealth.org',
        phone: '+254 767 890 123',
        location: 'Mathare, Nairobi',
        avatar: '/src/assets/Kenyatta hospital.jpeg'
      },
      submittedDate: '2024-10-06',
      priority: 'high',
      status: 'pending',
      description: 'Request for telemedicine equipment for remote consultations',
      documents: ['Facility License', 'Equipment Specifications', 'Budget Proposal'],
      equipmentType: 'Telemedicine Setup',
      quantity: '5 units'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Requests', count: requests.length },
    { value: 'chw_application', label: 'CHW Applications', count: requests.filter(r => r.type === 'chw_application').length },
    { value: 'patient_registration', label: 'Patient Registrations', count: requests.filter(r => r.type === 'patient_registration').length },
    { value: 'system_access', label: 'System Access', count: requests.filter(r => r.type === 'system_access').length },
    { value: 'clinic_partnership', label: 'Clinic Partnerships', count: requests.filter(r => r.type === 'clinic_partnership').length },
    { value: 'training_enrollment', label: 'Training Enrollments', count: requests.filter(r => r.type === 'training_enrollment').length },
    { value: 'equipment_request', label: 'Equipment Requests', count: requests.filter(r => r.type === 'equipment_request').length }
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.applicant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || request.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-800 border-red-200';
      case 'high': return 'text-orange-800 border-orange-200';
      case 'medium': return 'text-yellow-800 border-yellow-200';
      case 'low': return 'text-green-800 border-green-200';
      default: return 'text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'chw_application': return <UserCheck className="w-5 h-5 text-blue-600" />;
      case 'patient_registration': return <Users className="w-5 h-5 text-blue-600" />;
      case 'system_access': return <Shield className="w-5 h-5 text-blue-600" />;
      case 'clinic_partnership': return <Hospital className="w-5 h-5 text-blue-600" />;
      case 'training_enrollment': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'equipment_request': return <Stethoscope className="w-5 h-5 text-blue-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };


  const handleApprove = (id) => console.log('Approving request:', id);
  const handleReject = (id) => console.log('Rejecting request:', id);

  const toggleSelectRequest = (id) => {
    setSelectedRequests(prev =>
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const handleBulkApprove = () => {
    console.log('Bulk approving requests:', selectedRequests);
    setSelectedRequests([]);
  };

  const handleBulkReject = () => {
    console.log('Bulk rejecting requests:', selectedRequests);
    setSelectedRequests([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Approve Requests</h1>
            <p className="mt-1">
              Review and manage all pending requests in the MediLink system
            </p>
            {/* <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span className="">{filteredRequests.length} Pending Requests</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="">
                  {requests.filter(r => r.priority === 'urgent' || r.priority === 'high').length} High Priority
                </span>
              </div>
            </div> */}
          </div>
          
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests, names, or types..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-100 focus:border-transparent"
              >
                <Filter className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-gray-700">
                  {filterOptions.find(opt => opt.value === selectedFilter)?.label}
                </span>
                <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
              </button>

              {showFilterDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {filterOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedFilter(option.value);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between ${
                        selectedFilter === option.value ? 'bg-blue-50 font-bold' : ''
                      }`}
                    >
                      <span>{option.label}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          selectedFilter === option.value ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedRequests.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">{selectedRequests.length} selected</span>
              <button
                onClick={handleBulkApprove}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Check className="w-4 h-4 mr-2" /> Bulk Approve
              </button>
              <button
                onClick={handleBulkReject}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <X className="w-4 h-4 mr-2" /> Bulk Reject
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Requests Grid */}
      <div className="bg-white shadow overflow-x-auto">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'There are no pending requests at the moment'}
            </p>
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRequests(filteredRequests.map(r => r.id));
                      } else {
                        setSelectedRequests([]);
                      }
                    }}
                    checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                  />
                </th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Request Title</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Applicant</th>
                <th className="px-4 py-3 text-left">Contact Info</th>
                <th className="px-4 py-3 text-left">Submitted Date</th>
                <th className="px-4 py-3 text-left">Details</th>
                <th className="px-4 py-3 text-left">Documents</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(request => (
                <tr key={request.id} className="border-b hover:bg-gray-50 transition-colors">
                  {/* Checkbox */}
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRequests.includes(request.id)}
                      onChange={() => toggleSelectRequest(request.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>

                  {/* Type Icon */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center">
                      {getTypeIcon(request.type)}
                    </div>
                  </td>

                  {/* Request Title & Description */}
                  <td className="px-4 py-4">
                    <div className="max-w-xs">
                      <div className="font-semibold text-gray-900 mb-1">{request.title}</div>
                      <div className="text-xs text-gray-600 line-clamp-2">{request.description}</div>
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getPriorityColor(request.priority)}`}>
                      {request.priority.toUpperCase()}
                    </span>
                  </td>

                  {/* Applicant Info */}
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={request.applicant.avatar}
                        alt={request.applicant.name}
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(request.applicant.name)}&background=3B82F6&color=fff&size=32`;
                        }}
                      />
                      <div>
                        <div className="font-medium text-gray-900">{request.applicant.name}</div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {request.applicant.location}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-gray-600">
                        <Mail className="w-3 h-3 mr-1 text-gray-400" />
                        <span className="truncate max-w-[150px]">{request.applicant.email}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Phone className="w-3 h-3 mr-1 text-gray-400" />
                        {request.applicant.phone}
                      </div>
                    </div>
                  </td>

                  {/* Submitted Date */}
                  <td className="px-4 py-4">
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(request.submittedDate).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Additional Details */}
                  <td className="px-4 py-4">
                    <div className="space-y-1 text-xs">
                      {request.experience && (
                        <div className="text-gray-600">
                          <span className="font-medium">Exp:</span> {request.experience}
                        </div>
                      )}
                      {request.medicalCondition && (
                        <div className="text-gray-600">
                          <span className="font-medium">Condition:</span> {request.medicalCondition}
                        </div>
                      )}
                      {request.department && (
                        <div className="text-gray-600">
                          <span className="font-medium">Dept:</span> {request.department}
                        </div>
                      )}
                      {request.course && (
                        <div className="text-gray-600">
                          <span className="font-medium">Course:</span> {request.course}
                        </div>
                      )}
                      {request.equipmentType && (
                        <div className="text-gray-600">
                          <span className="font-medium">Equipment:</span> {request.equipmentType}
                        </div>
                      )}
                      {request.referredBy && (
                        <div className="text-gray-600">
                          <span className="font-medium">Referred:</span> {request.referredBy}
                        </div>
                      )}
                      {request.accessLevel && (
                        <div className="text-gray-600">
                          <span className="font-medium">Access:</span> {request.accessLevel}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Documents */}
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-blue-600 mb-1">
                        {request.documents.length} files
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {request.documents.slice(0, 2).map((doc, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {doc}
                          </span>
                        ))}
                        {request.documents.length > 2 && (
                          <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            +{request.documents.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs whitespace-nowrap"
                        title="Approve Request"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex items-center px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs whitespace-nowrap"
                        title="Reject Request"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Reject
                      </button>
                      <button 
                        className="p-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApproveRequests;
