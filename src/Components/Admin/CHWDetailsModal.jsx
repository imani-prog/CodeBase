/* eslint-disable no-unused-vars */
import { X, Mail, Phone, MapPin, Users, CheckCircle, Clock, Star, TrendingUp, Calendar, Activity, Badge, MessageSquare, Video, Home, Globe, Navigation, Building2, Award } from 'lucide-react';

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
  const statusMap = {
    'AVAILABLE': { display: 'Active', color: 'bg-green-500' },
    'BUSY': { display: 'Busy', color: 'bg-blue-500' },
    'OFFLINE': { display: 'On Leave', color: 'bg-yellow-500' },
    'Active': { display: 'Active', color: 'bg-green-500' },
    'On Leave': { display: 'On Leave', color: 'bg-yellow-500' },
    'Inactive': { display: 'Inactive', color: 'bg-red-500' }
  };
  
  const { display, color } = statusMap[status] || { display: status, color: 'bg-gray-500' };
  
  return (
    <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${color} text-white`}>
      {display}
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
    chw.status === 'AVAILABLE' || chw.status === 'Active'
      ? 'bg-green-500'
      : chw.status === 'BUSY'
      ? 'bg-blue-500'
      : chw.status === 'OFFLINE' || chw.status === 'On Leave'
      ? 'bg-yellow-500'
      : 'bg-red-500';
  
  const getStatusDisplay = (status) => {
    const statusMap = {
      'AVAILABLE': 'Active',
      'BUSY': 'Busy',
      'OFFLINE': 'On Leave'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-5xl w-full overflow-hidden transform transition-all">
          {/* Header */}
          <div className="relative px-8 py-6 bg-blue-950 text-white">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                  <span className="text-3xl font-bold">{chw.avatar}</span>
                </div>
                {(chw.status === 'AVAILABLE' || chw.status === 'Active') && (
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-400 border-4 border-blue-950 animate-pulse" />
                )}
              </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold">{chw.name}</h2>
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full border border-white/30">
                  {chw.code}
                </span>
                <span className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded">
                  ID: {chw.id}
                </span>
              </div>
              <div className="text-sm text-white/90 mb-2">
                {chw.firstName} {chw.middleName && chw.middleName + ' '}{chw.lastName}
              </div>
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{chw.city}, {chw.state}</span>
                <span className="flex items-center"><Users className="w-4 h-4 mr-1" />{chw.patients} Patients</span>
              </div>
            </div>

            <div className="hidden md:block">
              <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${
                chw.status === 'AVAILABLE' || chw.status === 'Active'
                  ? 'bg-green-500 text-white'
                  : chw.status === 'BUSY'
                  ? 'bg-blue-500 text-white'
                  : chw.status === 'OFFLINE' || chw.status === 'On Leave'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-red-500 text-white'
              }`}>
                {getStatusDisplay(chw.status)}
              </span>
            </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 bg-gray-50 max-h-[calc(100vh-250px)] overflow-y-auto">
            {/* Performance Metrics - Full Width */}
            <div className="mb-6 bg-white shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 text-blue-600 mr-3" /> Performance Metrics
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m, i) => <MetricCard key={i} {...m} />)}
              </div>
            </div>

            {/* Work Statistics - Full Width */}
            <div className="mb-6 bg-white shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Activity className="w-6 h-6 text-blue-600 mr-3" /> Work Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { v: chw.patients, l: 'Assigned Patients', icon: Users },
                  { v: chw.monthlyVisits, l: 'Monthly Visits', icon: Calendar },
                  { v: Math.round(chw.monthlyVisits / 30), l: 'Daily Average', icon: TrendingUp },
                ].map((s, i) => (
                  <div key={i} className="p-6 border border-gray-200 hover:shadow-md transition-shadow text-center">
                    <div className="p-3 mb-3 mx-auto">
                      <s.icon className="w-6 h-6 text-blue-600 mx-auto" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{s.v}</div>
                    <div className="text-sm font-medium text-gray-600 mt-2">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
              {/* Personal Information */}
              <div className="shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow bg-white">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Badge className="w-6 h-6 text-blue-600 mr-3" /> Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">CHW Code</label>
                    <p className="mt-1 text-sm font-bold text-blue-600">{chw.code}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Record ID</label>
                    <p className="mt-1 text-xs font-mono text-gray-600">{chw.id}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</label>
                    <p className="mt-1 text-sm text-gray-900">{chw.firstName}</p>
                  </div>
                  {chw.middleName && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Middle Name</label>
                      <p className="mt-1 text-sm text-gray-900">{chw.middleName}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</label>
                    <p className="mt-1 text-sm text-gray-900">{chw.lastName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</label>
                    <p className="mt-1 text-sm font-medium text-gray-900">{chw.name}</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow bg-white">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Phone className="w-6 h-6 text-blue-600 mr-3" /> Contact Information
                </h3>
                <div className="space-y-4">
                  <InfoRow icon={Mail} label="Email" value={chw.email} link={`mailto:${chw.email}`} />
                  <InfoRow icon={Phone} label="Phone" value={chw.phone} link={`tel:${chw.phone}`} />
                </div>
              </div>

              {/* Hospital Affiliation & Specialization */}
              {(chw.hospitalId || chw.specialization) && (
                <div className="shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow bg-white">
                  {chw.hospitalId && (
                    <>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Building2 className="w-6 h-6 text-blue-600 mr-3" /> Hospital Affiliation
                      </h3>
                      <div className="space-y-3 mb-4">
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital Name</label>
                          <p className="mt-1 text-sm font-medium text-gray-900">{chw.hospitalName}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital ID</label>
                          <p className="mt-1 text-xs font-mono text-gray-600">{chw.hospitalId}</p>
                        </div>
                      </div>
                    </>
                  )}
                  {chw.hospitalId && chw.specialization && <div className="border-t border-gray-200 my-4"></div>}
                  {chw.specialization && (
                    <>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Award className="w-6 h-6 text-blue-600 mr-3" /> Specialization
                      </h3>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Area of Expertise</label>
                        <p className="mt-1 text-sm font-medium text-gray-900">{chw.specialization}</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">

              {/* Status */}
              <div className="shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow bg-white">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Activity className="w-6 h-6 text-blue-600 mr-3" /> Current Status
                </h3>
                <div className="flex items-center justify-between">
                  <StatusBadge status={chw.status} />
                  {(chw.status === 'AVAILABLE' || chw.status === 'Active') && (
                    <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-green-700">Online Now</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-3">Last updated: {chw.lastStatusUpdate}</p>
              </div>

              {/* Full Address */}
              <div className="shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow bg-white">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Home className="w-6 h-6 text-blue-600 mr-3" /> Complete Address
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Address Line 1</label>
                    <p className="mt-1 text-sm text-gray-900">{chw.addressLine1 || 'N/A'}</p>
                  </div>
                  {chw.addressLine2 && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Address Line 2</label>
                      <p className="mt-1 text-sm text-gray-900">{chw.addressLine2}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">City</label>
                      <p className="mt-1 text-sm text-gray-900">{chw.city}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">State</label>
                      <p className="mt-1 text-sm text-gray-900">{chw.state}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Postal Code</label>
                      <p className="mt-1 text-sm text-gray-900">{chw.postalCode}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Country</label>
                      <p className="mt-1 text-sm text-gray-900">{chw.country}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Region</label>
                    <p className="mt-1 text-sm text-gray-900">{chw.region}</p>
                  </div>
                  {chw.latitude && chw.longitude && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">GPS Coordinates</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Navigation className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-xs text-gray-600 mr-2">Latitude:</span>
                          <span className="text-sm font-mono text-gray-900">{chw.latitude}</span>
                        </div>
                        <div className="flex items-center">
                          <Navigation className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-xs text-gray-600 mr-2">Longitude:</span>
                          <span className="text-sm font-mono text-gray-900">{chw.longitude}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <span className="font-medium">CHW Code:</span> {chw.code} • 
              <span className="font-medium ml-2">Record ID:</span> {chw.id} • 
              Last updated: {new Date(chw.updatedAt).toLocaleDateString()}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  const subject = encodeURIComponent('MediLink - CHW Communication');
                  const body = encodeURIComponent(`Dear ${chw.name},\n\nI hope this message finds you well.\n\nBest regards,\nMediLink Admin Team`);
                  window.open(`mailto:${chw.email}?subject=${subject}&body=${body}`, '_blank');
                }}
                className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md hover:bg-blue-700"
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
  </div>
  );
};

export default CHWDetailsModal;
