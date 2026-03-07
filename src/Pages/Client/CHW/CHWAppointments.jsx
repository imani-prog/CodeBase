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
    { label: 'This Week', value: '7', color: 'blue' },
    { label: 'Pending Confirmation', value: '1', color: 'blue' },
    { label: 'Completed This Month', value: '24', color: 'blue' }
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: appointments.upcoming.length },
    { id: 'completed', label: 'Completed', count: appointments.completed.length },
    { id: 'cancelled', label: 'Cancelled', count: appointments.cancelled.length }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video Call':
        return <Video className="w-5 h-5 text-blue-600" />;
      case 'Phone Call':
        return <Phone className="w-5 h-5 text-blue-600" />;
      default:
        return <MapPin className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-800';
      case 'pending':
        return 'text-yellow-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Appointments</h1>
          <p className="mt-1 text-sm sm:text-base">
            Manage patient appointments and consultations
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md flex-shrink-0">
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New Appointment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white shadow-md p-4 sm:p-6 border border-gray-200">
            <p className="text-xs sm:text-sm mb-1 text-gray-600">{stat.label}</p>
            <p className={`text-2xl sm:text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="">
        <div className="flex space-x-6 sm:space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-800 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      {activeTab === 'upcoming' && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700">Patient</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Date & Time</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Duration</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Reason</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.upcoming.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{appt.patientName}</p>
                      <p className="text-xs text-gray-500">{appt.patientId}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>{appt.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{appt.duration}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        {getTypeIcon(appt.type)}
                        <span>{appt.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 max-w-[180px]">
                      <span className="line-clamp-2">{appt.reason}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(appt.status)}`}>
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {appt.type === 'Video Call' && (
                          <button className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium">
                            <Video className="w-3 h-3" />Join
                          </button>
                        )}
                        {appt.type === 'Phone Call' && (
                          <button className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium">
                            <Phone className="w-3 h-3" />Call
                          </button>
                        )}
                        <button className="flex items-center gap-1 px-2.5 py-1 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium">
                          <Edit className="w-3 h-3" />Edit
                        </button>
                        <button className="flex items-center gap-1 px-2.5 py-1 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded text-xs font-medium transition-colors">
                          <XCircle className="w-3 h-3" />Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {appointments.upcoming.map((appt) => (
              <div key={appt.id} className={`bg-white rounded-xl shadow-sm border p-4 ${
                appt.status === 'pending' ? 'border-yellow-200 bg-yellow-50/30' : 'border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{appt.patientName}</h3>
                    <p className="text-xs text-gray-500">{appt.patientId}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(appt.status)}`}>
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{appt.time} · {appt.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    {getTypeIcon(appt.type)}
                    <span className="text-xs text-gray-700">{appt.type}</span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg px-3 py-2 mb-3">
                  <p className="text-xs text-gray-700"><span className="font-semibold">Reason:</span> {appt.reason}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {appt.type === 'Video Call' && (
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">
                      <Video className="w-3.5 h-3.5" />Join Call
                    </button>
                  )}
                  {appt.type === 'Phone Call' && (
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold">
                      <Phone className="w-3.5 h-3.5" />Call
                    </button>
                  )}
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold">
                    <Edit className="w-3.5 h-3.5" />Edit
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-xs font-semibold transition-colors">
                    <XCircle className="w-3.5 h-3.5" />Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Completed Appointments */}
      {activeTab === 'completed' && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700">Patient</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Date & Time</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Duration</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Reason</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.completed.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">{appt.patientName}</p>
                          <p className="text-xs text-gray-500">{appt.patientId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{appt.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{appt.duration}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        {getTypeIcon(appt.type)}
                        <span>{appt.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{appt.reason}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs max-w-[200px]">
                      <span className="line-clamp-2">{appt.notes || '—'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {appointments.completed.map((appt) => (
              <div key={appt.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">{appt.patientName}</h3>
                    <p className="text-xs text-gray-500">{appt.patientId}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{appt.time} · {appt.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    {getTypeIcon(appt.type)}
                    <span className="text-xs text-gray-700">{appt.type}</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-700"><span className="font-semibold">Reason:</span> {appt.reason}</p>
                  {appt.notes && (
                    <p className="text-xs text-gray-600 mt-1"><span className="font-semibold">Notes:</span> {appt.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Cancelled Appointments */}
      {activeTab === 'cancelled' && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700">Patient</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Date & Time</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Duration</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Cancellation Reason</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.cancelled.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">{appt.patientName}</p>
                          <p className="text-xs text-gray-500">{appt.patientId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{appt.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{appt.duration}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        {getTypeIcon(appt.type)}
                        <span>{appt.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs max-w-[200px]">
                      <span className="line-clamp-2">{appt.cancelReason}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-colors">
                        Reschedule
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {appointments.cancelled.map((appt) => (
              <div key={appt.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">{appt.patientName}</h3>
                    <p className="text-xs text-gray-500">{appt.patientId}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{appt.time} · {appt.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    {getTypeIcon(appt.type)}
                    <span className="text-xs text-gray-700">{appt.type}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2 mb-3">
                  <p className="text-xs text-gray-700"><span className="font-semibold">Cancellation Reason:</span> {appt.cancelReason}</p>
                </div>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors">
                  Reschedule Appointment
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CHWAppointments;
