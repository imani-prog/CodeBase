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

  // Sample appointments data - this will come from your backend API
  const appointments = {
    all: [
      {
        id: 1,
        appointmentCode: 'APT-2024-001234',
        patientName: 'Sarah Wanjiru',
        patientId: 'PT-2023-001',
        providerName: 'Dr. John Kamau',
        type: 'CONSULTATION',
        scheduledStart: '2024-10-25T10:00:00',
        scheduledEnd: '2024-10-25T10:30:00',
        hospital: 'Nairobi Health Center',
        location: 'Room 204',
        status: 'SCHEDULED',
        reason: 'Annual checkup',
        notes: 'Patient requested morning slot',
        phone: '+254 712 345 678',
        email: 'sarah.wanjiru@example.com'
      },
      {
        id: 2,
        appointmentCode: 'APT-2024-001235',
        patientName: 'John Mwangi',
        patientId: 'PT-2023-045',
        providerName: 'Dr. Mary Ochieng',
        type: 'FOLLOW_UP',
        scheduledStart: '2024-10-25T14:00:00',
        scheduledEnd: '2024-10-25T14:45:00',
        hospital: 'Kiambu Medical Center',
        location: 'Cardiology Dept',
        status: 'CONFIRMED',
        reason: 'Follow-up consultation',
        notes: 'Review test results',
        phone: '+254 723 456 789',
        email: 'john.mwangi@example.com'
      },
      {
        id: 3,
        appointmentCode: 'APT-2024-001236',
        patientName: 'Grace Akinyi',
        patientId: 'PT-2023-089',
        providerName: 'Nurse Jane Ochieng',
        type: 'TELEHEALTH',
        scheduledStart: '2024-10-26T09:00:00',
        scheduledEnd: '2024-10-26T09:30:00',
        hospital: 'Virtual Clinic',
        location: 'Video Consultation',
        status: 'IN_PROGRESS',
        reason: 'Prenatal checkup',
        notes: 'Third trimester follow-up',
        phone: '+254 734 567 890',
        email: 'grace.akinyi@example.com'
      },
      {
        id: 4,
        appointmentCode: 'APT-2024-001237',
        patientName: 'Peter Odhiambo',
        patientId: 'PT-2023-112',
        providerName: 'Dr. Sarah Kamau',
        type: 'LAB_TEST',
        scheduledStart: '2024-10-27T11:00:00',
        scheduledEnd: '2024-10-27T11:30:00',
        hospital: 'Nairobi Health Center',
        location: 'Laboratory',
        status: 'CHECKED_IN',
        reason: 'Blood test',
        notes: 'Fasting required',
        phone: '+254 745 678 901',
        email: 'peter.odhiambo@example.com'
      },
      {
        id: 5,
        appointmentCode: 'APT-2024-001238',
        patientName: 'Mary Njoki',
        patientId: 'PT-2023-156',
        providerName: 'Dr. David Kibet',
        type: 'CONSULTATION',
        scheduledStart: '2024-10-22T10:30:00',
        scheduledEnd: '2024-10-22T11:00:00',
        hospital: 'Machakos County Hospital',
        location: 'Room 301',
        status: 'COMPLETED',
        reason: 'General checkup',
        notes: 'Patient satisfied with consultation',
        phone: '+254 756 789 012',
        email: 'mary.njoki@example.com'
      },
      {
        id: 6,
        appointmentCode: 'APT-2024-001239',
        patientName: 'James Otieno',
        patientId: 'PT-2023-201',
        providerName: 'Dr. Anne Wambui',
        type: 'SURGERY',
        scheduledStart: '2024-10-28T08:00:00',
        scheduledEnd: '2024-10-28T10:00:00',
        hospital: 'Kenyatta National Hospital',
        location: 'Operating Theater 2',
        status: 'SCHEDULED',
        reason: 'Minor surgery',
        notes: 'Pre-op completed',
        phone: '+254 767 890 123',
        email: 'james.otieno@example.com'
      },
      {
        id: 7,
        appointmentCode: 'APT-2024-001240',
        patientName: 'Lucy Wambui',
        patientId: 'PT-2023-178',
        providerName: 'Dr. Michael Njoroge',
        type: 'CONSULTATION',
        scheduledStart: '2024-10-20T15:00:00',
        scheduledEnd: '2024-10-20T15:30:00',
        hospital: 'Nakuru General Hospital',
        location: 'Room 105',
        status: 'CANCELED',
        reason: 'General checkup',
        notes: 'Patient requested reschedule due to work emergency',
        phone: '+254 778 901 234',
        email: 'lucy.wambui@example.com'
      },
      {
        id: 8,
        appointmentCode: 'APT-2024-001241',
        patientName: 'Robert Kimani',
        patientId: 'PT-2023-234',
        providerName: 'Dr. Elizabeth Nyambura',
        type: 'VACCINATION',
        scheduledStart: '2024-10-24T13:00:00',
        scheduledEnd: '2024-10-24T13:15:00',
        hospital: 'Mombasa Medical Center',
        location: 'Vaccination Room',
        status: 'COMPLETED',
        reason: 'COVID-19 booster',
        notes: 'No adverse reactions',
        phone: '+254 789 012 345',
        email: 'robert.kimani@example.com'
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Appointment Details</h2>
          <button
            onClick={() => setShowDetailsModal(false)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Appointment Code */}
          <div className="p-4">
            <p className="text-sm font-medium">Appointment Code</p>
            <p className="text-xl font-bold">{selectedAppointment?.appointmentCode}</p>
          </div>

          {/* Status & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Status</p>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAppointment?.status)}`}>
                {selectedAppointment?.status}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Type</p>
              <div className="flex items-center gap-2">
                {getTypeIcon(selectedAppointment?.type)}
                <span className="text-sm font-medium">{selectedAppointment?.type}</span>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="border border-gray-100 shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Patient Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-medium text-gray-900">{selectedAppointment?.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Patient ID:</span>
                <span className="text-sm font-medium text-gray-900">{selectedAppointment?.patientId}</span>
              </div>
              {selectedAppointment?.phone && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Phone:</span>
                  <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    <Phone className="w-4 h-4 text-blue-600" />
                    {selectedAppointment.phone}
                  </span>
                </div>
              )}
              {selectedAppointment?.email && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    <Mail className="w-4 h-4 text-blue-600" />
                    {selectedAppointment.email}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Provider Information */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Provider Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Provider:</span>
                <span className="text-sm font-medium">{selectedAppointment?.providerName}</span>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Schedule Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Start Time</p>
                <p className="text-sm font-medium">{formatDateTime(selectedAppointment?.scheduledStart).date}</p>
                <p className="text-sm font-medium text-blue-600">{formatDateTime(selectedAppointment?.scheduledStart).time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">End Time</p>
                <p className="text-sm font-medium">{formatDateTime(selectedAppointment?.scheduledEnd).date}</p>
                <p className="text-sm font-medium text-blue-600">{formatDateTime(selectedAppointment?.scheduledEnd).time}</p>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Location Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Hospital:</span>
                <span className="text-sm font-medium text-gray-900">{selectedAppointment?.hospital}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Location:</span>
                <span className="text-sm font-medium text-gray-900">{selectedAppointment?.location}</span>
              </div>
            </div>
          </div>

          {/* Reason & Notes */}
          {selectedAppointment?.reason && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Reason for Visit</h3>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedAppointment.reason}</p>
            </div>
          )}

          {selectedAppointment?.notes && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Additional Notes</h3>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedAppointment.notes}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => handleAssignProvider(selectedAppointment)}
              className="flex-1 w-1/2 ml-20 bg-blue-600 text-white px-1 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Assign/Update
            </button>
            {['SCHEDULED', 'CONFIRMED'].includes(selectedAppointment?.status) && (
              <button
                onClick={() => handleCancelAppointment(selectedAppointment)}
                className="flex-1 mr-20 bg-red-600 text-white px-1 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const AssignModal = () => (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Assign/Update Appointment</h2>
          <button
            onClick={() => setShowAssignModal(false)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Provider Name</label>
            <input
              type="text"
              defaultValue={selectedAppointment?.providerName}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              defaultValue={selectedAppointment?.status}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusTypes.filter(s => s !== 'all').map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location/Room</label>
            <input
              type="text"
              defaultValue={selectedAppointment?.location}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              defaultValue={selectedAppointment?.notes}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                // API call to update appointment
                console.log('Updating appointment:', selectedAppointment.id);
                setShowAssignModal(false);
              }}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => setShowAssignModal(false)}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CancelModal = () => (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Cancel Appointment</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              Are you sure you want to cancel this appointment for <strong>{selectedAppointment?.patientName}</strong>?
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Reason</label>
            <textarea
              rows={3}
              placeholder="Enter reason for cancellation..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                // API call to cancel appointment
                console.log('Cancelling appointment:', selectedAppointment.id);
                setShowCancelModal(false);
              }}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Confirm Cancel
            </button>
            <button
              onClick={() => setShowCancelModal(false)}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Keep Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CreateAppointmentModal = () => (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Create New Appointment</h2>
          <button
            onClick={() => setShowCreateModal(false)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Patient Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID *</label>
                <input
                  type="text"
                  placeholder="PT-2023-001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+254 712 345 678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type *</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time *</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Provider & Location */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Provider & Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Provider Name *</label>
                <input
                  type="text"
                  placeholder="Dr. John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital/Facility</label>
                <input
                  type="text"
                  placeholder="Nairobi Health Center"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location/Room</label>
                <input
                  type="text"
                  placeholder="Room 204"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital ID</label>
                <input
                  type="number"
                  placeholder="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              rows={3}
              placeholder="Any additional information or special instructions..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                // API call to create appointment
                console.log('Creating new appointment');
                setShowCreateModal(false);
              }}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Create Appointment
            </button>
            <button
              onClick={() => setShowCreateModal(false)}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
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
            <div key={index} className="bg-white shadow-sm border border-gray-200 p-6">
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
      <div className="bg-white p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            {statusTypes.filter(s => s !== 'all').map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {appointmentTypes.filter(t => t !== 'all').map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white ml-25 px-1 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Appointment
          </button>

          <button className="bg-gray-600 ml-20 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm border border-gray-200 mb-6">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[150px] px-6 py-4 font-medium border-b-2 transition ${
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
                filteredAppointments.map((appointment) => {
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
                          <p className="text-xs text-gray-500">{appointment.location}</p>
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

      {/* Modals */}
      {showDetailsModal && <DetailsModal />}
      {showAssignModal && <AssignModal />}
      {showCancelModal && <CancelModal />}
      {showCreateModal && <CreateAppointmentModal />}
    </div>
  );
};

export default AdminAppointments;
