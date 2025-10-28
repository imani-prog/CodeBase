/* eslint-disable no-unused-vars */
import { X, Mail, Phone, Calendar, User, MapPin, Heart, Activity, Clock, FileText, Video, MessageSquare } from 'lucide-react';
import { useMemo } from 'react';

const InfoBlock = ({ label, value, icon: Icon, link }) => (
  <div className="group">
    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
    <div className="mt-1 flex items-center text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
      {Icon && <Icon className="w-4 h-4 mr-2 text-gray-400" />}
      {link ? <a href={link}>{value}</a> : <span>{value}</span>}
    </div>
  </div>
);

const Card = ({ title, icon: Icon, children }) => (
  <div className="shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      {Icon && (
        <div className="w-8 h-8 flex items-center justify-center mr-3">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      )}
      {title}
    </h3>
    {children}
  </div>
);

const TimelineItem = ({ label, date, icon: Icon, active }) => (
  <div className="relative pl-8 pb-4 border-l-2 border-gray-200">
    <div
      className={`absolute left-0 top-0 w-4 h-4 -ml-[9px] rounded-full border-4 border-white shadow ${
        active ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
      }`}
    />
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-gray-900 mt-1">
          {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        {active && (
          <p className="text-xs text-blue-600 mt-1">
            {Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24))} days remaining
          </p>
        )}
      </div>
      {Icon && <Icon className="w-5 h-5 text-gray-400" />}
    </div>
  </div>
);

const StatBox = ({ label, value }) => (
  <div className="text-center p-4 border border-gray-200">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-xs mt-1">{label}</div>
  </div>
);

const PatientDetailsModal = ({ patient, isOpen, onClose }) => {
  if (!isOpen || !patient) return null;

  const formattedId = useMemo(() => `#${String(patient.id).padStart(6, '0')}`, [patient.id]);

  const sendEmail = () => {
    const subject = encodeURIComponent(`MediLink - Follow-up for ${patient.name}`);
    const body = encodeURIComponent(`Dear ${patient.name},\n\nWe hope this message finds you well.\n\nBest regards,\nMediLink Team`);
    window.open(`mailto:${patient.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const statusColor =
    patient.status === 'Active' ? 'bg-green-500' : patient.status === 'Critical' ? 'bg-red-500' : 'bg-yellow-500';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-4xl w-full overflow-hidden">
          {/* Header */}
          <div className="relative px-8 py-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:rotate-90"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                  <span className="text-3xl font-bold">{patient.avatar}</span>
                </div>
                <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${statusColor}`} />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{patient.name}</h2>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" /> {patient.age} years
                  </span>
                  <span className="flex items-center">
                    <Activity className="w-4 h-4 mr-1" /> {patient.gender}
                  </span>
                  <span className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" /> ID: {formattedId}
                  </span>
                </div>
              </div>

              <div className="hidden md:block">
                <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full text-white ${statusColor}`}>
                  {patient.status}
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left */}
              <div className="space-y-4">
                <Card title="Contact Details" icon={Phone}>
                  <div className="space-y-4">
                    <InfoBlock label="Email" value={patient.email} icon={Mail} link={`mailto:${patient.email}`} />
                    <InfoBlock label="Phone" value={patient.phone} icon={Phone} link={`tel:${patient.phone}`} />
                  </div>
                </Card>

                <Card title="Quick Actions">
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md">
                      <Video className="w-4 h-4 mr-2" /> Start Video Call
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <MessageSquare className="w-4 h-4 mr-2" /> Send Message
                    </button>
                  </div>
                </Card>
              </div>

              {/* Right */}
              <div className="lg:col-span-2 space-y-4">
                <Card title="Medical Information" icon={Heart}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200">
                      <label className="text-xs font-medium uppercase tracking-wider">Primary Condition</label>
                      <p className="text-lg font-semibold mt-1">{patient.condition}</p>
                    </div>
                    <div className="p-4 border border-gray-200">
                      <label className="text-xs font-medium uppercase tracking-wider">Patient Status</label>
                      <p className="text-lg font-semibold text-blue-900 mt-1">{patient.status}</p>
                    </div>
                  </div>
                </Card>

                <Card title="Appointment Timeline" icon={Calendar}>
                  <TimelineItem label="Last Visit" date={patient.lastVisit} icon={Clock} />
                  <TimelineItem label="Next Appointment" date={patient.nextAppointment} icon={Calendar} active />
                </Card>

                <Card title="Recent Activity" icon={Activity}>
                  <div className="grid grid-cols-3 gap-4">
                    <StatBox label="Visits" value="8" />
                    <StatBox label="Reports" value="12" />
                    <StatBox label="Prescriptions" value="5" />
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
            <div className="flex space-x-3">
              <button
                onClick={sendEmail}
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
              >
                <Mail className="w-4 h-4 mr-2" /> Contact Patient
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;
