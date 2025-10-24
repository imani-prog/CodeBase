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
  Plus,
  Map as MapIcon
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
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
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
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-64 flex items-center justify-center relative">
          <MapIcon className="w-16 h-16 text-blue-600 opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-blue-900 font-semibold">Interactive Map View</p>
              <p className="text-sm text-blue-700 mt-1">Showing all scheduled home visits</p>
            </div>
          </div>
          {/* Simulated location markers */}
          {homeVisits.upcoming.slice(0, 3).map((visit, index) => (
            <div
              key={visit.id}
              className="absolute w-10 h-10 bg-red-500 border-4 border-white rounded-full shadow-lg flex items-center justify-center animate-pulse"
              style={{
                top: `${30 + index * 20}%`,
                left: `${25 + index * 20}%`
              }}
            >
              <Home className="w-5 h-5 text-white" />
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md p-2">
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
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
        <div className="space-y-4">
          {homeVisits.upcoming.map((visit) => (
            <div
              key={visit.id}
              className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                visit.priority === 'urgent'
                  ? 'border-red-500'
                  : visit.priority === 'high'
                  ? 'border-orange-500'
                  : 'border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{visit.patientName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(visit.priority)}`}>
                      {visit.priority.charAt(0).toUpperCase() + visit.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Patient ID: {visit.patientId}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-semibold">{new Date(visit.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-semibold">{visit.time}</span>
                    </div>
                    <div className="flex items-start text-gray-700">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600 mt-0.5" />
                      <span>{visit.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Home className="w-5 h-5 mr-2 text-blue-600" />
                      <span>{visit.type}</span>
                    </div>
                  </div>

                  {visit.notes && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Notes:</span> {visit.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                      <Navigation className="w-4 h-4" />
                      <span>Get Directions</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                      <Phone className="w-4 h-4" />
                      <span>Call Patient</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark Complete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Visits */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {homeVisits.completed.map((visit) => (
            <div key={visit.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-900">{visit.patientName}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Patient ID: {visit.patientId}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{new Date(visit.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{visit.time}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Home className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{visit.type}</span>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-green-900">
                      <span className="font-semibold">Outcome:</span> {visit.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancelled Visits */}
      {activeTab === 'cancelled' && (
        <div className="space-y-4">
          {homeVisits.cancelled.map((visit) => (
            <div key={visit.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-400">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <XCircle className="w-6 h-6 text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-900">{visit.patientName}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Patient ID: {visit.patientId}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{new Date(visit.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{visit.time}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Home className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{visit.type}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Reason:</span> {visit.reason}
                    </p>
                  </div>

                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                    Reschedule Visit
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

export default HomeVisits;
