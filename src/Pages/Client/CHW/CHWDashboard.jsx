import { 
  Users, 
  Calendar, 
  MapPin, 
  ClipboardList, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  Heart,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CHWDashboard = () => {
  // Sample data - replace with actual API data
  const stats = [
    {
      label: 'Total Patients',
      value: '142',
      change: '+12 this month',
      icon: Users,
      color: 'blue',
      trend: 'up'
    },
    {
      label: 'Pending Tasks',
      value: '8',
      change: '3 due today',
      icon: ClipboardList,
      color: 'yellow',
      trend: 'neutral'
    },
    {
      label: 'Home Visits',
      value: '5',
      change: 'This week',
      icon: MapPin,
      color: 'green',
      trend: 'up'
    },
    {
      label: 'Appointments',
      value: '12',
      change: 'Next 7 days',
      icon: Calendar,
      color: 'purple',
      trend: 'up'
    }
  ];

  const upcomingVisits = [
    {
      id: 1,
      patientName: 'Sarah Wanjiru',
      patientId: 'PT-2023-001',
      time: 'Today, 10:00 AM',
      location: 'Kibera, Plot 45',
      type: 'Follow-up',
      urgent: false
    },
    {
      id: 2,
      patientName: 'John Kamau',
      patientId: 'PT-2023-045',
      time: 'Today, 2:00 PM',
      location: 'Mathare, House 12',
      type: 'Initial Assessment',
      urgent: true
    },
    {
      id: 3,
      patientName: 'Mary Njoki',
      patientId: 'PT-2023-089',
      time: 'Tomorrow, 9:00 AM',
      location: 'Kawangware, Block C',
      type: 'Medication Review',
      urgent: false
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Completed home visit',
      patient: 'Jane Akinyi',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 2,
      action: 'New patient assigned',
      patient: 'David Omondi',
      time: '4 hours ago',
      icon: Users,
      color: 'blue'
    },
    {
      id: 3,
      action: 'Health assessment submitted',
      patient: 'Grace Wambui',
      time: '5 hours ago',
      icon: Activity,
      color: 'purple'
    },
    {
      id: 4,
      action: 'Follow-up task created',
      patient: 'Peter Mwangi',
      time: 'Yesterday',
      icon: ClipboardList,
      color: 'yellow'
    }
  ];

  const alerts = [
    {
      id: 1,
      message: 'Critical: Patient Sarah Wanjiru missed appointment',
      type: 'urgent',
      time: '1 hour ago'
    },
    {
      id: 2,
      message: 'Reminder: Submit weekly report by Friday',
      type: 'warning',
      time: '3 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">CHW Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Community Health Worker overview and daily activities
        </p>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'urgent'
                  ? 'bg-red-50 border-red-500'
                  : 'bg-yellow-50 border-yellow-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`w-5 h-5 mt-0.5 ${
                    alert.type === 'urgent' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <div>
                    <p className={`font-semibold ${
                      alert.type === 'urgent' ? 'text-red-900' : 'text-yellow-900'
                    }`}>
                      {alert.message}
                    </p>
                    <p className={`text-sm mt-1 ${
                      alert.type === 'urgent' ? 'text-red-700' : 'text-yellow-700'
                    }`}>
                      {alert.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600'
          };

          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {stat.trend === 'up' && (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Visits */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-blue-600" />
              Upcoming Home Visits
            </h2>
            <Link
              to="/client/chw/home-visits"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingVisits.map((visit) => (
              <div
                key={visit.id}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  visit.urgent
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{visit.patientName}</h3>
                      {visit.urgent && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">ID: {visit.patientId}</p>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {visit.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {visit.location}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {visit.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-blue-600" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              const colorClasses = {
                green: 'bg-green-100 text-green-600',
                blue: 'bg-blue-100 text-blue-600',
                purple: 'bg-purple-100 text-purple-600',
                yellow: 'bg-yellow-100 text-yellow-600'
              };

              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colorClasses[activity.color]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.patient}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/client/chw/patients"
            className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <Users className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            <span className="font-semibold text-gray-700 group-hover:text-blue-700">View Patients</span>
          </Link>
          <Link
            to="/client/chw/tasks"
            className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <ClipboardList className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            <span className="font-semibold text-gray-700 group-hover:text-blue-700">Add Task</span>
          </Link>
          <Link
            to="/client/chw/health-assessments"
            className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <Heart className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            <span className="font-semibold text-gray-700 group-hover:text-blue-700">New Assessment</span>
          </Link>
          <Link
            to="/client/chw/reports"
            className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <TrendingUp className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            <span className="font-semibold text-gray-700 group-hover:text-blue-700">View Reports</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CHWDashboard;
