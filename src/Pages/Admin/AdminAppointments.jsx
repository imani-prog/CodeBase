import { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Video,
  Plus,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Search,
  Eye,
  Download,
  Building2,
  Users,
  X,
  Mail,
  FileText
} from 'lucide-react';
import Pagination from '../../Components/Admin/Pagination';

const AdminAppointments = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample appointments data - this will come from your backend API
  const appointments = {
    all: [
      {
        id: 1,
        appointmentCode: 'APT-2024-001234',
        // Patient Info
        patientId: 'PT-2023-001',
        patientName: 'Sarah Wanjiru',
        phone: '+254 712 345 678',
        email: 'sarah.wanjiru@example.com',
        // Hospital Info
        hospitalId: 1,
        hospital: 'Nairobi Health Center',
        // Scheduling
        scheduledStart: '2024-10-25T10:00:00',
        scheduledEnd: '2024-10-25T10:30:00',
        checkInTime: null,
        checkOutTime: null,
        // Classification
        status: 'SCHEDULED',
        type: 'CONSULTATION',
        // Details
        providerName: 'Dr. John Kamau',
        room: '204',
        location: 'Outpatient Department',
        reason: 'Annual checkup',
        notes: 'Patient requested morning slot',
        reminderSent: true,
        // Audit
        createdAt: '2024-10-20T08:00:00',
        updatedAt: '2024-10-20T08:00:00'
      },
      {
        id: 2,
        appointmentCode: 'APT-2024-001235',
        patientId: 'PT-2023-045',
        patientName: 'John Mwangi',
        phone: '+254 723 456 789',
        email: 'john.mwangi@example.com',
        hospitalId: 2,
        hospital: 'Kiambu Medical Center',
        scheduledStart: '2024-10-25T14:00:00',
        scheduledEnd: '2024-10-25T14:45:00',
        checkInTime: null,
        checkOutTime: null,
        status: 'CONFIRMED',
        type: 'FOLLOW_UP',
        providerName: 'Dr. Mary Ochieng',
        room: 'Ward B',
        location: 'Cardiology Dept',
        reason: 'Follow-up consultation',
        notes: 'Review test results',
        reminderSent: true,
        createdAt: '2024-10-21T09:30:00',
        updatedAt: '2024-10-21T10:00:00'
      },
      {
        id: 3,
        appointmentCode: 'APT-2024-001236',
        patientId: 'PT-2023-089',
        patientName: 'Grace Akinyi',
        phone: '+254 734 567 890',
        email: 'grace.akinyi@example.com',
        hospitalId: 3,
        hospital: 'Virtual Clinic',
        scheduledStart: '2024-10-26T09:00:00',
        scheduledEnd: '2024-10-26T09:30:00',
        checkInTime: '2024-10-26T08:55:00',
        checkOutTime: null,
        status: 'IN_PROGRESS',
        type: 'TELEHEALTH',
        providerName: 'Nurse Jane Ochieng',
        room: 'Virtual',
        location: 'Telehealth Department',
        reason: 'Prenatal checkup',
        notes: 'Third trimester follow-up',
        reminderSent: true,
        createdAt: '2024-10-22T11:00:00',
        updatedAt: '2024-10-26T08:55:00'
      },
      {
        id: 4,
        appointmentCode: 'APT-2024-001237',
        patientId: 'PT-2023-112',
        patientName: 'Peter Odhiambo',
        phone: '+254 745 678 901',
        email: 'peter.odhiambo@example.com',
        hospitalId: 1,
        hospital: 'Nairobi Health Center',
        scheduledStart: '2024-10-27T11:00:00',
        scheduledEnd: '2024-10-27T11:30:00',
        checkInTime: '2024-10-27T10:50:00',
        checkOutTime: null,
        status: 'CHECKED_IN',
        type: 'LAB_TEST',
        providerName: 'Dr. Sarah Kamau',
        room: 'Lab 1',
        location: 'Laboratory',
        reason: 'Blood test',
        notes: 'Fasting required',
        reminderSent: true,
        createdAt: '2024-10-23T14:20:00',
        updatedAt: '2024-10-27T10:50:00'
      },
      {
        id: 5,
        appointmentCode: 'APT-2024-001238',
        patientId: 'PT-2023-156',
        patientName: 'Mary Njoki',
        phone: '+254 756 789 012',
        email: 'mary.njoki@example.com',
        hospitalId: 4,
        hospital: 'Machakos County Hospital',
        scheduledStart: '2024-10-22T10:30:00',
        scheduledEnd: '2024-10-22T11:00:00',
        checkInTime: '2024-10-22T10:25:00',
        checkOutTime: '2024-10-22T10:55:00',
        status: 'COMPLETED',
        type: 'CONSULTATION',
        providerName: 'Dr. David Kibet',
        room: '301',
        location: 'General Medicine',
        reason: 'General checkup',
        notes: 'Patient satisfied with consultation',
        reminderSent: true,
        createdAt: '2024-10-18T09:00:00',
        updatedAt: '2024-10-22T10:55:00'
      },
      {
        id: 6,
        appointmentCode: 'APT-2024-001239',
        patientId: 'PT-2023-201',
        patientName: 'James Otieno',
        phone: '+254 767 890 123',
        email: 'james.otieno@example.com',
        hospitalId: 5,
        hospital: 'Kenyatta National Hospital',
        scheduledStart: '2024-10-28T08:00:00',
        scheduledEnd: '2024-10-28T10:00:00',
        checkInTime: null,
        checkOutTime: null,
        status: 'SCHEDULED',
        type: 'SURGERY',
        providerName: 'Dr. Anne Wambui',
        room: 'Theater 2',
        location: 'Operating Theater',
        reason: 'Minor surgery',
        notes: 'Pre-op completed',
        reminderSent: false,
        createdAt: '2024-10-15T16:00:00',
        updatedAt: '2024-10-15T16:00:00'
      },
      {
        id: 7,
        appointmentCode: 'APT-2024-001240',
        patientId: 'PT-2023-178',
        patientName: 'Lucy Wambui',
        phone: '+254 778 901 234',
        email: 'lucy.wambui@example.com',
        hospitalId: 6,
        hospital: 'Nakuru General Hospital',
        scheduledStart: '2024-10-20T15:00:00',
        scheduledEnd: '2024-10-20T15:30:00',
        checkInTime: null,
        checkOutTime: null,
        status: 'CANCELED',
        type: 'CONSULTATION',
        providerName: 'Dr. Michael Njoroge',
        room: '105',
        location: 'Outpatient Department',
        reason: 'General checkup',
        notes: 'Patient requested reschedule due to work emergency',
        reminderSent: true,
        createdAt: '2024-10-17T12:00:00',
        updatedAt: '2024-10-19T14:00:00'
      },
      {
        id: 8,
        appointmentCode: 'APT-2024-001241',
        patientId: 'PT-2023-234',
        patientName: 'Robert Kimani',
        phone: '+254 789 012 345',
        email: 'robert.kimani@example.com',
        hospitalId: 7,
        hospital: 'Mombasa Medical Center',
        scheduledStart: '2024-10-24T13:00:00',
        scheduledEnd: '2024-10-24T13:15:00',
        checkInTime: '2024-10-24T12:55:00',
        checkOutTime: '2024-10-24T13:10:00',
        status: 'COMPLETED',
        type: 'VACCINATION',
        providerName: 'Dr. Elizabeth Nyambura',
        room: 'Vacc 1',
        location: 'Vaccination Room',
        reason: 'COVID-19 booster',
        notes: 'No adverse reactions',
        reminderSent: true,
        createdAt: '2024-10-20T10:00:00',
        updatedAt: '2024-10-24T13:10:00'
      }
    ]
  };

  // Statistics
  const stats = [
    { label: 'Total Appointments', value: appointments.all.length, color: 'blue', icon: Calendar },
    { label: 'Scheduled Today', value: appointments.all.filter(a => 
      new Date(a.scheduledStart).toDateString() === new Date().toDateString() && 
      ['SCHEDULED', 'CONFIRMED'].includes(a.status)
    ).length, color: 'blue', icon: CheckCircle },
    { label: 'In Progress', value: appointments.all.filter(a => a.status === 'IN_PROGRESS').length, color: 'blue', icon: Clock },
    { label: 'Pending Approval', value: appointments.all.filter(a => a.status === 'SCHEDULED').length, color: 'blue', icon: AlertCircle }
  ];

  const tabs = [
    { id: 'all', label: 'All Appointments', count: appointments.all.length },
    { id: 'scheduled', label: 'Scheduled', count: appointments.all.filter(a => ['SCHEDULED', 'CONFIRMED'].includes(a.status)).length },
    { id: 'in-progress', label: 'In Progress', count: appointments.all.filter(a => a.status === 'IN_PROGRESS').length },
    { id: 'completed', label: 'Completed', count: appointments.all.filter(a => a.status === 'COMPLETED').length },
    { id: 'canceled', label: 'Canceled', count: appointments.all.filter(a => a.status === 'CANCELED').length }
  ];

  const statusTypes = ['all', 'SCHEDULED', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED', 'CANCELED', 'NO_SHOW', 'RESCHEDULED'];
  const appointmentTypes = ['all', 'CONSULTATION', 'FOLLOW_UP', 'SURGERY', 'LAB_TEST', 'IMAGING', 'VACCINATION', 'TELEHEALTH', 'OTHER'];

  const getStatusColor = (status) => {
    const colors = {
      SCHEDULED: 'text-blue-800',
      CONFIRMED: 'text-green-800',
      CHECKED_IN: 'text-blue-800',
      IN_PROGRESS: 'text-yellow-800',
      COMPLETED: 'text-green-800',
      CANCELED: 'text-red-800',
      NO_SHOW: 'text-gray-800',
      RESCHEDULED: 'text-orange-800'
    };
    return colors[status] || 'text-gray-800';
  };

  const getTypeIcon = (type) => {
    const icons = {
      CONSULTATION: <User className="w-4 h-4" />,
      FOLLOW_UP: <FileText className="w-4 h-4" />,
      SURGERY: <Building2 className="w-4 h-4" />,
      LAB_TEST: <FileText className="w-4 h-4" />,
      IMAGING: <FileText className="w-4 h-4" />,
      VACCINATION: <User className="w-4 h-4" />,
      TELEHEALTH: <Video className="w-4 h-4" />,
      OTHER: <FileText className="w-4 h-4" />
    };
    return icons[type] || <FileText className="w-4 h-4" />;
  };

  const filteredAppointments = appointments.all.filter(appointment => {
    const matchesSearch = searchTerm === '' || 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.appointmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.providerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesType = filterType === 'all' || appointment.type === filterType;
    
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'scheduled' && ['SCHEDULED', 'CONFIRMED'].includes(appointment.status)) ||
      (activeTab === 'in-progress' && appointment.status === 'IN_PROGRESS') ||
      (activeTab === 'completed' && appointment.status === 'COMPLETED') ||
      (activeTab === 'canceled' && appointment.status === 'CANCELED');

    return matchesSearch && matchesStatus && matchesType && matchesTab;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleAssignProvider = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAssignModal(true);
  };

  const handleCancelAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-KE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const DetailsModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative px-8 py-6 bg-blue-950 text-white">
          <button
            onClick={() => setShowDetailsModal(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{selectedAppointment?.appointmentCode}</h2>
              <p className="text-sm text-white/80">{selectedAppointment?.patientName} • {formatDateTime(selectedAppointment?.scheduledStart).date}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Status Badge */}
          <div className="mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedAppointment?.status)}`}>
              {selectedAppointment?.status?.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Patient Information */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Patient Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium">{selectedAppointment?.patientName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Patient ID</p>
                  <p className="text-sm font-medium">{selectedAppointment?.patientId}</p>
                </div>
                {selectedAppointment?.phone && (
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {selectedAppointment.phone}
                    </p>
                  </div>
                )}
                {selectedAppointment?.email && (
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {selectedAppointment.email}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Appointment Type */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Appointment Type
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(selectedAppointment?.type)}
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-medium capitalize">{selectedAppointment?.type?.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Information */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Provider Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Provider</p>
                  <p className="text-sm font-medium">{selectedAppointment?.providerName}</p>
                </div>
              </div>
            </div>

            {/* Schedule Information */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Schedule Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Start Time</p>
                  <p className="text-sm font-medium">{formatDateTime(selectedAppointment?.scheduledStart).date}</p>
                  <p className="text-sm font-medium text-blue-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDateTime(selectedAppointment?.scheduledStart).time}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">End Time</p>
                  <p className="text-sm font-medium">{formatDateTime(selectedAppointment?.scheduledEnd).date}</p>
                  <p className="text-sm font-medium text-blue-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDateTime(selectedAppointment?.scheduledEnd).time}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Location Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Hospital</p>
                  <p className="text-sm font-medium">{selectedAppointment?.hospital}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Department/Location</p>
                  <p className="text-sm font-medium">{selectedAppointment?.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Room</p>
                  <p className="text-sm font-medium">{selectedAppointment?.room || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Check-in/Check-out Information */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Attendance
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Check-in Time</p>
                  <p className="text-sm font-medium">
                    {selectedAppointment?.checkInTime 
                      ? formatDateTime(selectedAppointment.checkInTime).time
                      : 'Not checked in'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Check-out Time</p>
                  <p className="text-sm font-medium">
                    {selectedAppointment?.checkOutTime 
                      ? formatDateTime(selectedAppointment.checkOutTime).time
                      : 'Not checked out'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Reminder Sent</p>
                  <p className="text-sm font-medium">
                    {selectedAppointment?.reminderSent ? (
                      <span className="text-green-600">✓ Yes</span>
                    ) : (
                      <span className="text-gray-400">✗ No</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Audit Information */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Timeline
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Created At</p>
                  <p className="text-sm font-medium">
                    {selectedAppointment?.createdAt 
                      ? formatDateTime(selectedAppointment.createdAt).date + ' ' + formatDateTime(selectedAppointment.createdAt).time
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="text-sm font-medium">
                    {selectedAppointment?.updatedAt 
                      ? formatDateTime(selectedAppointment.updatedAt).date + ' ' + formatDateTime(selectedAppointment.updatedAt).time
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reason for Visit */}
          {selectedAppointment?.reason && (
            <div className="mt-6 border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Reason for Visit
              </h3>
              <p className="text-sm text-gray-700">{selectedAppointment.reason}</p>
            </div>
          )}

          {/* Notes */}
          {selectedAppointment?.notes && (
            <div className="mt-6 border-l-4 border-blue-500 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Notes
              </h3>
              <p className="text-sm text-gray-700">{selectedAppointment.notes}</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 flex justify-end space-x-3 border-t">
          {['SCHEDULED', 'CONFIRMED'].includes(selectedAppointment?.status) && (
            <button
              onClick={() => {
                setShowDetailsModal(false);
                handleCancelAppointment(selectedAppointment);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          )}
          <button
            onClick={() => {
              setShowDetailsModal(false);
              handleAssignProvider(selectedAppointment);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Assign/Update
          </button>
          <button
            onClick={() => setShowDetailsModal(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const AssignModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative px-6 py-4 bg-blue-950 text-white">
          <button
            onClick={() => setShowAssignModal(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">Edit Appointment</h2>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Patient Information */}
          <div className="border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                <input
                  type="text"
                  defaultValue={selectedAppointment?.patientName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
                <input
                  type="text"
                  defaultValue={selectedAppointment?.patientId}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue={selectedAppointment?.phone}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={selectedAppointment?.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                <select
                  defaultValue={selectedAppointment?.type}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {appointmentTypes.filter(t => t !== 'all').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  defaultValue={selectedAppointment?.status}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {statusTypes.filter(s => s !== 'all').map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</label>
                <input
                  type="datetime-local"
                  defaultValue={selectedAppointment?.scheduledStart?.substring(0, 16)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time</label>
                <input
                  type="datetime-local"
                  defaultValue={selectedAppointment?.scheduledEnd?.substring(0, 16)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Provider & Location */}
          <div className="border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Provider & Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Provider Name</label>
                <input
                  type="text"
                  defaultValue={selectedAppointment?.providerName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital/Facility</label>
                <input
                  type="text"
                  defaultValue={selectedAppointment?.hospital}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department/Location</label>
                <input
                  type="text"
                  defaultValue={selectedAppointment?.location}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                <input
                  type="text"
                  defaultValue={selectedAppointment?.room}
                  placeholder="e.g., 204"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
            <textarea
              defaultValue={selectedAppointment?.reason}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              defaultValue={selectedAppointment?.notes}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Reminder Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="reminderSentEdit"
              defaultChecked={selectedAppointment?.reminderSent}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="reminderSentEdit" className="text-sm text-gray-700">
              Reminder sent to patient
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 flex justify-end space-x-3 border-t">
          <button
            onClick={() => setShowAssignModal(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // API call to update appointment
              console.log('Updating appointment:', selectedAppointment.id);
              setShowAssignModal(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const CancelModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="relative px-6 py-4 bg-blue-950 text-white">
          <button
            onClick={() => setShowCancelModal(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">Cancel Appointment</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              Are you sure you want to cancel this appointment for <strong>{selectedAppointment?.patientName}</strong>?
            </p>
          </div>

          {/* Appointment Details Summary */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Appointment Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Code:</span>
                <span className="font-medium">{selectedAppointment?.appointmentCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{selectedAppointment?.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{formatDateTime(selectedAppointment?.scheduledStart).date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{formatDateTime(selectedAppointment?.scheduledStart).time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Provider:</span>
                <span className="font-medium">{selectedAppointment?.providerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{selectedAppointment?.hospital}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Reason *</label>
            <textarea
              rows={3}
              placeholder="Enter reason for cancellation..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 flex justify-end space-x-3 border-t">
          <button
            onClick={() => setShowCancelModal(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Keep Appointment
          </button>
          <button
            onClick={() => {
              // API call to cancel appointment
              console.log('Cancelling appointment:', selectedAppointment.id);
              setShowCancelModal(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const CreateAppointmentModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative px-8 py-6 bg-blue-950 text-white">
          <button
            onClick={() => setShowCreateModal(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <Plus className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Create New Appointment</h2>
              <p className="text-sm text-white/80">Schedule a new appointment for a patient</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Patient Information */}
          <div className="border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID *</label>
                <input
                  type="text"
                  placeholder="PT-2023-001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+254 712 345 678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type *</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select Type</option>
                  {appointmentTypes.filter(t => t !== 'all').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  defaultValue="SCHEDULED"
                >
                  {statusTypes.filter(s => s !== 'all').map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time *</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time *</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Provider & Location */}
          <div className="border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Provider & Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Provider Name *</label>
                <input
                  type="text"
                  placeholder="Dr. John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital/Facility</label>
                <input
                  type="text"
                  placeholder="Nairobi Health Center"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department/Location</label>
                <input
                  type="text"
                  placeholder="Outpatient Department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                <input
                  type="text"
                  placeholder="204"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital ID</label>
                <input
                  type="number"
                  placeholder="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit *</label>
            <textarea
              rows={2}
              placeholder="Describe the reason for the appointment..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              rows={3}
              placeholder="Any additional information or special instructions..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Reminder */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="reminderSent"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="reminderSent" className="text-sm text-gray-700">
              Send appointment reminder to patient
            </label>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 flex justify-end space-x-3 border-t">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // API call to create appointment
              console.log('Creating new appointment');
              setShowCreateModal(false);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Create Appointment
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Appointments Management</h1>
        <p className="text-gray-600">Manage, approve, and assign all patient appointments</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">{stat.label}</p>
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      
        {/* Filters and Search */}
        <div className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              {statusTypes.filter(s => s !== 'all').map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg  focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              {appointmentTypes.filter(t => t !== 'all').map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Wrap both buttons in a container aligned to the right */}
            <div className="md:col-span-2 flex gap-2 justify-end items-center">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-1.5 text-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                New Appointment
              </button>

              <button className="bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition inline-flex items-center gap-1.5 text-sm whitespace-nowrap">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[150px] px-6 py-4 font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No appointments found</p>
                    <p className="text-sm">Try adjusting your filters or search terms</p>
                  </td>
                </tr>
              ) : (
                currentAppointments.map((appointment) => {
                  const { date, time } = formatDateTime(appointment.scheduledStart);
                  return (
                    <tr key={appointment.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-semibold">{appointment.appointmentCode}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-semibold">{appointment.patientName}</p>
                          <p className="text-xs text-gray-500">{appointment.patientId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-semibold">{appointment.providerName}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-semibold flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {date}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            {time}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(appointment.type)}
                          <span className="text-sm">{appointment.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium border rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium">{appointment.hospital}</p>
                          <p className="text-xs text-gray-500">{appointment.location} {appointment.room ? `• Room ${appointment.room}` : ''}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(appointment)}
                            className="text-blue-600 hover:text-blue-800 transition"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleAssignProvider(appointment)}
                            className="text-green-600 hover:text-green-800 transition"
                            title="Assign/Update"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          {['SCHEDULED', 'CONFIRMED'].includes(appointment.status) && (
                            <button
                              onClick={() => handleCancelAppointment(appointment)}
                              className="text-red-600 hover:text-red-800 transition"
                              title="Cancel"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredAppointments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        itemName="appointments"
      />

      {/* Modals */}
      {showDetailsModal && <DetailsModal />}
      {showAssignModal && <AssignModal />}
      {showCancelModal && <CancelModal />}
      {showCreateModal && <CreateAppointmentModal />}
    </div>
  );
};

export default AdminAppointments;
