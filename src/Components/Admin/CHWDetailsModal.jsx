/* eslint-disable no-unused-vars */
import { X, Mail, Phone, MapPin, Users, CheckCircle, Clock, Star, TrendingUp, Calendar, Activity, Badge, MessageSquare, Video } from 'lucide-react';

const InfoRow = ({ icon: Icon, label, value, link }) => (
  <div className="group">
    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
    <div className="mt-1 flex items-center text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
      <Icon className="w-4 h-4 mr-2 text-gray-400" />
      {link ? <a href={link} className="break-all">{value}</a> : <span>{value}</span>}
    </div>
  </div>
);

const MetricCard = ({ icon: Icon, value, label }) => (
  <div className="p-4 border border-gray-200 hover:shadow-md transition-shadow text-center">
    <div className="p-3 mb-3 mx-auto">
      <Icon className="w-6 h-6 text-blue-600 mx-auto" />
    </div>
    <p className="text-2xl font-bold mb-1">{value}</p>
    <p className="text-xs font-medium">{label}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const color =
    status === 'Active'
      ? 'bg-green-500'
      : status === 'On Leave'
      ? 'bg-yellow-500'
      : 'bg-red-500';
  return (
    <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${color} text-white`}>
      {status}
    </span>
  );
};

const CHWDetailsModal = ({ chw, isOpen, onClose }) => {
  if (!isOpen || !chw) return null;

  const metrics = [
    { icon: Users, value: chw.monthlyVisits, label: 'Visits This Month' },
    { icon: CheckCircle, value: `${chw.successRate}%`, label: 'Success Rate' },
    { icon: Clock, value: chw.responseTime, label: 'Response Time' },
    { icon: Star, value: `${chw.rating}/5`, label: 'Rating' },
  ];

  const statusColor =
    chw.status === 'Active'
      ? 'bg-green-500'
      : chw.status === 'On Leave'
      ? 'bg-yellow-500'
      : 'bg-red-500';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-5xl w-full overflow-hidden transform transition-all">
          {/* Header */}
          <div className="relative px-8 py-8">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:rotate-90">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                  <span className="text-3xl font-bold">{chw.avatar}</span>
                </div>
                {chw.status === 'Active' && (
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-400 border-4 border-white animate-pulse" />
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{chw.name}</h2>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center"><Badge className="w-4 h-4 mr-1" />CHW-{String(chw.id).padStart(4, '0')}</span>
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{chw.region}</span>
                  <span className="flex items-center"><Users className="w-4 h-4 mr-1" />{chw.patients} Patients</span>
                </div>
              </div>

              <div className="hidden md:block"><StatusBadge status={chw.status} /></div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 bg-gray-50 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Contact */}
              <div className="shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Phone className="w-6 h-6 text-blue-600 mr-3" /> Contact Information
                </h3>
                <div className="space-y-4">
                  <InfoRow icon={Mail} label="Email" value={chw.email} link={`mailto:${chw.email}`} />
                  <InfoRow icon={Phone} label="Phone" value={chw.phone} link={`tel:${chw.phone}`} />
                  <InfoRow icon={MapPin} label="Region" value={chw.region} />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
                    <Video className="w-4 h-4 mr-2" /> Start Video Call
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageSquare className="w-4 h-4 mr-2" /> Send Message
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div className="shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="w-8 h-8 text-blue-600 mr-3" /> Timeline
                </h3>
                {['Start Date', 'Last Activity', 'Status Updated'].map((label, i) => (
                  <div key={i}>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {label === 'Start Date' ? chw.startDate : label === 'Last Activity' ? chw.lastActivity : chw.lastStatusUpdate}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Metrics */}
              <div className="p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-8 h-8 text-blue-600 mr-3" /> Performance Metrics
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {metrics.map((m, i) => <MetricCard key={i} {...m} />)}
                </div>
              </div>

              {/* Status */}
              <div className="shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Activity className="w-8 h-8 text-blue-600 mr-3" /> Current Status
                </h3>
                <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100/50 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <StatusBadge status={chw.status} />
                    <div>
                      <p className="text-sm font-semibold">Status: {chw.status}</p>
                      <p className="text-xs text-gray-500 mt-1">Last updated: {chw.lastStatusUpdate}</p>
                    </div>
                  </div>
                  {chw.status === 'Active' && (
                    <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-green-700">Online Now</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Work Stats */}
              <div className="shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Activity className="w-6 h-6 text-blue-600 mr-3" /> Work Statistics
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { v: chw.patients, l: 'Assigned Patients' },
                    { v: chw.monthlyVisits, l: 'Monthly Visits' },
                    { v: Math.round(chw.monthlyVisits / 30), l: 'Daily Average' },
                  ].map((s, i) => (
                    <div key={i} className="p-4 border border-gray-200">
                      <div className="text-2xl font-bold">{s.v}</div>
                      <div className="text-xs mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">CHW Profile • Last updated: {new Date().toLocaleDateString()}</div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  const subject = encodeURIComponent('MediLink - CHW Communication');
                  const body = encodeURIComponent(`Dear ${chw.name},\n\nI hope this message finds you well.\n\nBest regards,\nMediLink Admin Team`);
                  window.open(`mailto:${chw.email}?subject=${subject}&body=${body}`, '_blank');
                }}
                className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
              >
                <Mail className="w-4 h-4 mr-2" /> Contact CHW
              </button>
              <button onClick={onClose} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CHWDetailsModal;
