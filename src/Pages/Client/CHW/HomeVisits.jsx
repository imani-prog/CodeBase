import { useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Navigation,
  Phone,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Home,
  Filter,
  Plus
} from 'lucide-react';

const HomeVisits = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Sample home visits data
  const homeVisits = {
    upcoming: [
      {
        id: 1,
        patientName: 'Sarah Wanjiru',
        patientId: 'PT-2023-001',
        date: '2024-10-25',
        time: '10:00 AM',
        location: 'Kibera, Plot 45',
        coordinates: { lat: -1.3139, lng: 36.7890 },
        type: 'Follow-up Visit',
        priority: 'normal',
        notes: 'Check blood pressure and review medication'
      },
      {
        id: 2,
        patientName: 'John Kamau',
        patientId: 'PT-2023-045',
        date: '2024-10-25',
        time: '2:00 PM',
        location: 'Mathare, House 12',
        coordinates: { lat: -1.2627, lng: 36.8598 },
        type: 'Initial Assessment',
        priority: 'urgent',
        notes: 'New patient - comprehensive health assessment needed'
      },
      {
        id: 3,
        patientName: 'Mary Njoki',
        patientId: 'PT-2023-089',
        date: '2024-10-26',
        time: '9:00 AM',
        location: 'Kawangware, Block C',
        coordinates: { lat: -1.2921, lng: 36.7561 },
        type: 'Prenatal Checkup',
        priority: 'high',
        notes: 'Second trimester checkup - monitor fetal development'
      },
      {
        id: 4,
        patientName: 'Peter Ochieng',
        patientId: 'PT-2023-112',
        date: '2024-10-27',
        time: '11:00 AM',
        location: 'Kibera, Plot 78',
        coordinates: { lat: -1.3158, lng: 36.7923 },
        type: 'Medication Review',
        priority: 'normal',
        notes: 'Review diabetes medication and diet plan'
      }
    ],
    completed: [
      {
        id: 5,
        patientName: 'Grace Akinyi',
        patientId: 'PT-2023-156',
        date: '2024-10-22',
        time: '10:30 AM',
        location: 'Mathare, House 45',
        type: 'Nutrition Assessment',
        status: 'completed',
        outcome: 'Patient improving - continue current plan'
      },
      {
        id: 6,
        patientName: 'David Mwangi',
        patientId: 'PT-2023-201',
        date: '2024-10-21',
        time: '2:00 PM',
        location: 'Kawangware, Block A',
        type: 'Follow-up Visit',
        status: 'completed',
        outcome: 'Blood pressure stable - medication working well'
      }
    ],
    cancelled: [
      {
        id: 7,
        patientName: 'Jane Wambui',
        patientId: 'PT-2023-178',
        date: '2024-10-20',
        time: '3:00 PM',
        location: 'Kibera, Plot 23',
        type: 'Follow-up Visit',
        status: 'cancelled',
        reason: 'Patient not available - rescheduled'
      }
    ]
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: homeVisits.upcoming.length, icon: Calendar },
    { id: 'completed', label: 'Completed', count: homeVisits.completed.length, icon: CheckCircle },
    { id: 'cancelled', label: 'Cancelled', count: homeVisits.cancelled.length, icon: XCircle }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-800 border-red-300';
      case 'high':
        return 'text-orange-800 border-orange-300';
      default:
        return 'text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Home Visits</h1>
          <p className="text-gray-600 mt-2">
            Manage and track scheduled home visits
          </p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md">
          <Plus className="w-5 h-5" />
          <span>Schedule Visit</span>
        </button>
      </div>

      {/* Map View */}
      <div className=" border border-gray-200 overflow-hidden">
        {/* Map Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                Coverage Area Map
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Showing your assigned service zone — Machakos &amp; surrounding regions. Use this map to plan efficient routes between patient home visits.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 shrink-0">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                Upcoming visits
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
                Completed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
                Cancelled
              </span>
            </div>
          </div>
        </div>
        <iframe
          src={import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL}
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Home Visits Map"
          className="w-full h-48 sm:h-64 md:h-80 lg:h-[600px]"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Visits */}
      {activeTab === 'upcoming' && (
        <>
          {/* Desktop Table — lg and above */}
          <div className="hidden lg:block bg-white shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-800">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-800">Date &amp; Time</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-800">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-800">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-00">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Notes</th>
                    <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {homeVisits.upcoming.map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{visit.patientName}</p>
                        <p className="text-xs text-gray-500">{visit.patientId}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center text-gray-700 text-sm">
                          <Calendar className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                          <span>{new Date(visit.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-gray-700 text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                          <span>{visit.time}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center text-gray-700 text-sm">
                          <MapPin className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                          <span>{visit.location}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{visit.type}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getPriorityColor(visit.priority)}`}>
                          {visit.priority.charAt(0).toUpperCase() + visit.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">{visit.notes}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                            <Navigation className="w-3 h-3" />
                            <span>Directions</span>
                          </button>
                          <button className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                            <Phone className="w-3 h-3" />
                            <span>Call</span>
                          </button>
                          <button className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors">
                            <CheckCircle className="w-3 h-3" />
                            <span>Complete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile / Tablet Cards — below lg */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {homeVisits.upcoming.map((visit) => (
              <div key={visit.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-gray-900">{visit.patientName}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getPriorityColor(visit.priority)}`}>
                    {visit.priority.charAt(0).toUpperCase() + visit.priority.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{visit.patientId}</p>
                <div className="space-y-1.5 mb-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span>{new Date(visit.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {visit.time}</span>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{visit.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Home className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span>{visit.type}</span>
                  </div>
                </div>
                {visit.notes && (
                  <p className="text-xs text-gray-600 mb-3 bg-gray-50 rounded p-2">
                    <span className="font-semibold">Notes:</span> {visit.notes}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors">
                    <CheckCircle className="w-3 h-3" />
                    <span>Complete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Completed Visits */}
      {activeTab === 'completed' && (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Date &amp; Time</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {homeVisits.completed.map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900">{visit.patientName}</p>
                            <p className="text-xs text-gray-500">{visit.patientId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center text-gray-700 text-sm">
                          <Calendar className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span>{new Date(visit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-gray-700 text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span>{visit.time}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{visit.location}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{visit.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{visit.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {homeVisits.completed.map((visit) => (
              <div key={visit.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <h3 className="text-base font-bold text-gray-900">{visit.patientName}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-3">{visit.patientId}</p>
                <div className="space-y-1.5 mb-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{new Date(visit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {visit.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{visit.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Home className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{visit.type}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 bg-green-50 rounded p-2">
                  <span className="font-semibold">Outcome:</span> {visit.outcome}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Cancelled Visits */}
      {activeTab === 'cancelled' && (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Date &amp; Time</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Reason</th>
                    <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {homeVisits.cancelled.map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900">{visit.patientName}</p>
                            <p className="text-xs text-gray-500">{visit.patientId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center text-gray-700 text-sm">
                          <Calendar className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span>{new Date(visit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-gray-700 text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span>{visit.time}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{visit.location}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{visit.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{visit.reason}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                          Reschedule
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {homeVisits.cancelled.map((visit) => (
              <div key={visit.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <h3 className="text-base font-bold text-gray-900">{visit.patientName}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-3">{visit.patientId}</p>
                <div className="space-y-1.5 mb-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{new Date(visit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {visit.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{visit.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Home className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{visit.type}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 bg-red-50 rounded p-2 mb-3">
                  <span className="font-semibold">Reason:</span> {visit.reason}
                </p>
                <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                  Reschedule Visit
                </button>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default HomeVisits;
