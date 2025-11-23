import { useState } from 'react';
import { 
  Calendar, 
  Video, 
  FileText, 
  Pill, 
  Heart, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const [upcomingAppointments] = useState([
    {
      id: 1,
      type: 'Clinic Visit',
      doctor: 'Dr. Sarah Kamau',
      specialty: 'General Practitioner',
      date: '2025-10-22',
      time: '10:00 AM',
      location: 'Nairobi Health Center',
      status: 'confirmed'
    },
    {
      id: 2,
      type: 'Telemedicine',
      doctor: 'Dr. John Mwangi',
      specialty: 'Cardiologist',
      date: '2025-10-25',
      time: '2:00 PM',
      location: 'Video Consultation',
      status: 'pending'
    }
  ]);

  const [recentActivities] = useState([
    { id: 1, icon: CheckCircle, text: 'Lab results uploaded', time: '2 hours ago', color: 'text-blue-600' },
    { id: 2, icon: Pill, text: 'Prescription refilled', time: '1 day ago', color: 'text-blue-600' },
    { id: 3, icon: Calendar, text: 'Appointment booked', time: '3 days ago', color: 'text-blue-600' },
    { id: 4, icon: FileText, text: 'Medical record updated', time: '5 days ago', color: 'text-blue-600' }
  ]);

  const quickActions = [
    {
      title: 'Book Appointment',
      description: 'Schedule a clinic visit or home care',
      icon: Calendar,
      link: '/client/patient/appointments',
      iconColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-50'
    },
    {
      title: 'Telemedicine',
      description: 'Connect with a doctor online',
      icon: Video,
      link: '/client/patient/telemedicine',
      iconColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-50'
    },
    {
      title: 'Health Records',
      description: 'View your medical history',
      icon: FileText,
      link: '/client/patient/health-records',
      iconColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-50'
    },
    {
      title: 'Prescriptions',
      description: 'Manage your medications',
      icon: Pill,
      link: '/client/patient/prescriptions',
      iconColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-50'
    },
    {
      title: 'Emergency',
      description: 'Request ambulance service',
      icon: Phone,
      link: '/client/patient/emergency',
      iconColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-50'
    },
    {
      title: 'Wellness',
      description: 'Health tips & community',
      icon: Heart,
      link: '/client/patient/wellness',
      iconColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-50'
    }
  ];

  const healthStats = [
    { label: 'Upcoming Visits', value: '2', icon: Calendar, color: 'text-blue-600'},
    { label: 'Active Prescriptions', value: '3', icon: Pill, color: 'text-blue-600'},
    { label: 'Pending Results', value: '1', icon: Clock, color: 'text-blue-600'},
    { label: 'Health Score', value: '85%', icon: TrendingUp, color: 'text-blue-600'}
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Welcome Back, Patient!
        </h1>
        <p className="text-sm sm:text-base">
          Here's an overview of your health journey
        </p>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
        {healthStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.bg} mb-3 sm:mb-4`}>
              <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Quick Actions & Appointments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.bgColor} ${action.hoverColor} rounded-xl p-4 sm:p-5 transition-all duration-200 group border border-transparent hover:border-gray-200`}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${action.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white not-odd:p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold">Upcoming Appointments</h2>
              <Link
                to="/client/patient/appointments"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                          {appointment.doctor}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(appointment.date).toLocaleDateString('en-KE', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                    {appointment.type === 'Telemedicine' ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    <span>{appointment.location}</span>
                  </div>
                </div>
              ))}
              {upcomingAppointments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No upcoming appointments</p>
                  <Link
                    to="/client/patient/appointments"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block"
                  >
                    Book Your First Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activity & Health Alert */}
        <div className="space-y-6">
          {/* Health Alert */}
          <div className="bg-blue-500 p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg">Health Reminder</h3>
            </div>
            <p className="text-sm sm:text-base mb-4 text-blue-50">
              You have a pending lab result. Check your health records for details.
            </p>
            <Link
              to="/client/patient/health-records"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors inline-block"
            >
              View Results
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg mt-0.5">
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact */}
          <div className="p-4 sm:p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold mb-4">Need Help?</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call Support: +254 700 000 000
              </button>
              <Link
                to="/client/patient/emergency"
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                Emergency Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// MapPin icon component (missing from imports)
const MapPin = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default PatientDashboard;
