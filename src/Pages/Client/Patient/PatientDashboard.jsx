import { useState } from 'react';
import { 
  Calendar, 
  Video, 
  FileText, 
  Pill, 
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Settings,
  MapPin
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
    { title: 'Book Appointment', description: 'Schedule a clinic or home visit', icon: Calendar, link: '/client/patient/appointments' },
    { title: 'Telemedicine', description: 'Connect with a doctor online', icon: Video, link: '/client/patient/telemedicine' },
    { title: 'Health Records', description: 'View your medical history', icon: FileText, link: '/client/patient/health-records' },
    { title: 'Prescriptions', description: 'Manage your medications', icon: Pill, link: '/client/patient/prescriptions' },
    { title: 'Emergency', description: 'Request ambulance service', icon: Phone, link: '/client/patient/emergency' },
    { title: 'Settings', description: 'Manage account & preferences', icon: Settings, link: '/client/patient/settings' }
  ];

  const healthStats = [
    { label: 'Upcoming Visits', value: '2', icon: Calendar },
    { label: 'Active Prescriptions', value: '3', icon: Pill },
    { label: 'Pending Results', value: '1', icon: Clock },
    { label: 'Emergency Orders', value: '0', icon: AlertCircle }
  ];

  return (
    <div className="w-full px-0.5 sm:px-0">
      {/* Header */}
      <div className="mb-5 sm:mb-8">
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
          Dashboard
        </h1>
        
      </div>

      {/* Health Stats — 2-col on mobile, 4-col on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-5 sm:mb-8">
        {healthStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-3 sm:p-5 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] sm:text-sm text-gray-600 leading-tight">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 leading-tight">{stat.value}</p>
              </div>
              <div className="shrink-0 mt-0.5">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

          {/* Quick Actions */}
          <div className="bg-white p-3 sm:p-6 border border-gray-200">
            <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-3 sm:mb-6">Quick Actions</h2>
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="hover:bg-blue-50 rounded-xl p-2.5 sm:p-5 transition-all duration-200 group border border-transparent hover:border-gray-200"
                >
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-blue-50 shadow-sm mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                    <action.icon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-base mb-0.5 sm:mb-1 leading-tight">
                    {action.title}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-gray-500 leading-tight hidden sm:block">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white p-3 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3 sm:mb-6">
              <h2 className="text-base sm:text-xl font-bold">Upcoming Appointments</h2>
              <Link
                to="/client/patient/appointments"
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {appointment.doctor}
                        </h3>
                        <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full shrink-0 ${
                          appointment.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">{appointment.specialty}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="truncate">{new Date(appointment.date).toLocaleDateString('en-KE', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-600 flex items-center gap-1.5">
                    {appointment.type === 'Telemedicine' ? (
                      <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    )}
                    <span className="truncate">{appointment.location}</span>
                  </div>
                </div>
              ))}
              {upcomingAppointments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm sm:text-base">No upcoming appointments</p>
                  <Link
                    to="/client/patient/appointments"
                    className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium mt-2 inline-block"
                  >
                    Book Your First Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">

          {/* Health Alert */}
          <div className="bg-blue-500 p-3 sm:p-6 text-white">
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg shrink-0">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-semibold text-sm sm:text-lg">Health Reminder</h3>
            </div>
            <p className="text-xs sm:text-base mb-3 sm:mb-4 text-blue-50 leading-relaxed">
              You have a pending lab result. Check your health records for details.
            </p>
            <Link
              to="/client/patient/health-records"
              className="bg-white text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-50 transition-colors inline-block"
            >
              View Results
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="p-3 sm:p-6 border border-gray-200 bg-white">
            <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-6">Recent Activity</h2>
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-2.5 sm:gap-3">
                  <div className="bg-gray-50 p-1.5 sm:p-2 rounded-lg mt-0.5 shrink-0">
                    <activity.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 leading-tight">{activity.text}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact */}
          <div className="p-3 sm:p-6 border border-gray-200 bg-white">
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Need Help?</h3>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Call Support: +254 700 000 000</span>
              </button>
              <Link
                to="/client/patient/emergency"
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                Emergency Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;