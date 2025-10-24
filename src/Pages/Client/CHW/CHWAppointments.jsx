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
  Search
} from 'lucide-react';

const CHWAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample appointments data
  const appointments = {
    upcoming: [
      {
        id: 1,
        patientName: 'Sarah Wanjiru',
        patientId: 'PT-2023-001',
        date: '2024-10-25',
        time: '10:00 AM',
        duration: '30 min',
        type: 'In-Person',
        location: 'Community Health Center',
        reason: 'Blood Pressure Check',
        status: 'confirmed'
      },
      {
        id: 2,
        patientName: 'John Kamau',
        patientId: 'PT-2023-045',
        date: '2024-10-25',
        time: '2:00 PM',
        duration: '45 min',
        type: 'Video Call',
        location: 'Telemedicine',
        reason: 'Follow-up Consultation',
        status: 'pending'
      },
      {
        id: 3,
        patientName: 'Mary Njoki',
        patientId: 'PT-2023-089',
        date: '2024-10-26',
        time: '9:00 AM',
        duration: '60 min',
        type: 'In-Person',
        location: 'Community Health Center',
        reason: 'Prenatal Checkup',
        status: 'confirmed'
      },
      {
        id: 4,
        patientName: 'Peter Ochieng',
        patientId: 'PT-2023-112',
        date: '2024-10-27',
        time: '11:00 AM',
        duration: '30 min',
        type: 'Phone Call',
        location: 'Remote',
        reason: 'Medication Review',
        status: 'confirmed'
      }
    ],
    completed: [
      {
        id: 5,
        patientName: 'Grace Akinyi',
        patientId: 'PT-2023-156',
        date: '2024-10-22',
        time: '10:30 AM',
        duration: '30 min',
        type: 'In-Person',
        reason: 'Nutrition Counseling',
        notes: 'Patient showed improvement in diet adherence'
      },
      {
        id: 6,
        patientName: 'David Mwangi',
        patientId: 'PT-2023-201',
        date: '2024-10-21',
        time: '2:00 PM',
        duration: '45 min',
        type: 'Video Call',
        reason: 'Mental Health Screening',
        notes: 'Referred to counselor for additional support'
      }
    ],
    cancelled: [
      {
        id: 7,
        patientName: 'Jane Wambui',
        patientId: 'PT-2023-178',
        date: '2024-10-20',
        time: '3:00 PM',
        duration: '30 min',
        type: 'In-Person',
        reason: 'General Checkup',
        cancelReason: 'Patient requested reschedule'
      }
    ]
  };

  const stats = [
    { label: 'Today\'s Appointments', value: '2', color: 'blue' },
    { label: 'This Week', value: '7', color: 'green' },
    { label: 'Pending Confirmation', value: '1', color: 'yellow' },
    { label: 'Completed This Month', value: '24', color: 'purple' }
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: appointments.upcoming.length },
    { id: 'completed', label: 'Completed', count: appointments.completed.length },
    { id: 'cancelled', label: 'Cancelled', count: appointments.cancelled.length }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video Call':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'Phone Call':
        return <Phone className="w-5 h-5 text-green-600" />;
      default:
        return <MapPin className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-2">
            Manage patient appointments and consultations
          </p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md">
          <Plus className="w-5 h-5" />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md p-2">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {appointments.upcoming.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{appointment.patientName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Patient ID: {appointment.patientId}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-semibold">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-semibold">{appointment.time} ({appointment.duration})</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      {getTypeIcon(appointment.type)}
                      <span className="ml-2">{appointment.type} - {appointment.location}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Reason:</span> {appointment.reason}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {appointment.type === 'Video Call' && (
                      <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                        <Video className="w-4 h-4" />
                        <span>Join Call</span>
                      </button>
                    )}
                    {appointment.type === 'Phone Call' && (
                      <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                        <Phone className="w-4 h-4" />
                        <span>Call Patient</span>
                      </button>
                    )}
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-red-300 hover:bg-red-50 text-red-600 rounded-lg font-semibold transition-colors">
                      <XCircle className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Appointments */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {appointments.completed.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-900">{appointment.patientName}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Patient ID: {appointment.patientId}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{appointment.time} ({appointment.duration})</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      {getTypeIcon(appointment.type)}
                      <span className="ml-2">{appointment.type}</span>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Reason:</span> {appointment.reason}
                    </p>
                    {appointment.notes && (
                      <p className="text-sm text-gray-700 mt-2">
                        <span className="font-semibold">Notes:</span> {appointment.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancelled Appointments */}
      {activeTab === 'cancelled' && (
        <div className="space-y-4">
          {appointments.cancelled.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-400">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <XCircle className="w-6 h-6 text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-900">{appointment.patientName}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Patient ID: {appointment.patientId}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{appointment.time} ({appointment.duration})</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      {getTypeIcon(appointment.type)}
                      <span className="ml-2">{appointment.type}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Reason:</span> {appointment.cancelReason}
                    </p>
                  </div>

                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                    Reschedule Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CHWAppointments;
