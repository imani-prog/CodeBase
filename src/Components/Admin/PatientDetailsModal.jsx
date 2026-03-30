import { X, Mail, Phone, Calendar, User, MapPin, Heart, Activity, Clock, FileText, Video, MessageSquare, CreditCard, AlertCircle, Users, Droplet, Shield } from 'lucide-react';
import { useMemo } from 'react';

const InfoBlock = ({ label, value, icon: Icon, link }) => (
  <div className="group">
    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
    <div className="mt-1 flex items-center text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
      {Icon && <Icon className="w-4 h-4 mr-2 text-gray-400" />}
      {link ? <a href={link} className="hover:underline">{value || 'N/A'}</a> : <span>{value || 'N/A'}</span>}
    </div>
  </div>
);

const Card = ({ title, icon: Icon, children, badge }) => (
  <div className="shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow bg-white">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        {Icon && (
          <div className="w-8 h-8 flex items-center justify-center mr-3">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
        {title}
      </h3>
      {badge && (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {badge}
        </span>
      )}
    </div>
    {children}
  </div>
);

const formatBloodType = (bloodType) => {
  if (!bloodType) return 'Not specified';
  return bloodType.replace('_POS', '+').replace('_NEG', '-');
};

const formatGender = (gender) => {
  if (!gender) return 'Not specified';
  if (gender === 'MALE') return 'Male';
  if (gender === 'FEMALE') return 'Female';
  if (gender === 'OTHER') return 'Other';
  return gender;
};

const formatStatus = (status) => {
  if (!status) return 'Unknown';
  if (status === 'ACTIVE') return 'Active';
  if (status === 'INACTIVE') return 'Inactive';
  if (status === 'DECEASED') return 'Deceased';
  return status;
};

const formatMaritalStatus = (status) => {
  if (!status) return 'Not specified';
  const map = {
    'SINGLE': 'Single',
    'MARRIED': 'Married',
    'DIVORCED': 'Divorced',
    'WIDOWED': 'Widowed',
    'SEPARATED': 'Separated',
    'OTHER': 'Other'
  };
  return map[status] || status;
};

const PatientDetailsModal = ({ patient, isOpen, onClose, onEdit }) => {
  if (!isOpen || !patient) return null;

  const formattedId = useMemo(() => `#${String(patient.id).padStart(6, '0')}`, [patient.id]);
  
  const statusColor = {
    'ACTIVE': 'bg-green-500',
    'Active': 'bg-green-500',
    'INACTIVE': 'bg-gray-500',
    'Inactive': 'bg-gray-500',
    'DECEASED': 'bg-red-900',
    'Critical': 'bg-red-500',
    'Recovering': 'bg-yellow-500'
  }[patient.status] || 'bg-gray-500';

  const sendEmail = () => {
    const subject = encodeURIComponent(`MediLink - Follow-up for ${patient.firstName || patient.name}`);
    const body = encodeURIComponent(`Dear ${patient.firstName || patient.name},\n\nWe hope this message finds you well.\n\nBest regards,\nMediLink Team`);
    window.open(`mailto:${patient.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const fullName = patient.name || `${patient.firstName || ''} ${patient.middleName || ''} ${patient.lastName || ''}`.trim();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen p-0 sm:p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-6xl w-full overflow-hidden h-screen sm:h-auto sm:max-h-[90vh] flex flex-col">
          
          {/* Header */}
          <div className="relative px-4 py-4 sm:px-8 sm:py-5 bg-blue-950 text-white">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start sm:items-center gap-3 sm:gap-4 pr-10">
              <div className="relative flex-shrink-0">
                <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                  <span className="text-2xl sm:text-3xl font-bold">{patient.avatar}</span>
                </div>
                <div className={`absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-4 border-white ${statusColor}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-lg sm:text-2xl font-bold">{fullName}</h2>
                  <span className={`inline-flex px-2.5 py-0.5 text-xs sm:text-sm font-semibold rounded-full ${statusColor}`}>
                    {formatStatus(patient.status)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                  <span className="flex items-center">
                    <User className="w-3.5 h-3.5 mr-1" /> {patient.age} years
                  </span>
                  <span className="flex items-center">
                    <Activity className="w-3.5 h-3.5 mr-1" /> {formatGender(patient.gender)}
                  </span>
                  <span className="flex items-center">
                    <FileText className="w-3.5 h-3.5 mr-1" /> ID: {formattedId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50">
            <div className="space-y-6">
              
              {/* Personal Information Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Personal Information" icon={User}>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoBlock label="First Name" value={patient.firstName} />
                    <InfoBlock label="Middle Name" value={patient.middleName} />
                    <InfoBlock label="Last Name" value={patient.lastName} />
                    <InfoBlock label="Date of Birth" value={patient.dateOfBirth} icon={Calendar} />
                    <InfoBlock label="Gender" value={formatGender(patient.gender)} />
                    <InfoBlock label="National ID" value={patient.nationalId} icon={CreditCard} />
                    <InfoBlock label="Marital Status" value={formatMaritalStatus(patient.maritalStatus)} />
                    <InfoBlock label="Preferred Language" value={patient.preferredLanguage} />
                  </div>
                </Card>

                <Card title="Contact Information" icon={Phone}>
                  <div className="grid grid-cols-1 gap-4">
                    <InfoBlock label="Email" value={patient.email} icon={Mail} link={`mailto:${patient.email}`} />
                    <InfoBlock label="Primary Phone" value={patient.phone} icon={Phone} link={`tel:${patient.phone}`} />
                    <InfoBlock label="Secondary Phone" value={patient.secondaryPhone} icon={Phone} link={`tel:${patient.secondaryPhone}`} />
                  </div>
                </Card>
              </div>

              {/* Address Section */}
              <Card title="Address Information" icon={MapPin}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <InfoBlock label="Address Line 1" value={patient.addressLine1} />
                  </div>
                  <div className="col-span-2">
                    <InfoBlock label="Address Line 2" value={patient.addressLine2} />
                  </div>
                  <InfoBlock label="City" value={patient.city} />
                  <InfoBlock label="State/County" value={patient.state} />
                  <InfoBlock label="Postal Code" value={patient.postalCode} />
                  <InfoBlock label="Country" value={patient.country} />
                </div>
              </Card>

              {/* Emergency Contact Section */}
              <Card title="Emergency Contact" icon={AlertCircle}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <InfoBlock label="Contact Name" value={patient.emergencyContactName} icon={Users} />
                  <InfoBlock label="Relationship" value={patient.emergencyContactRelation} />
                  <InfoBlock label="Phone Number" value={patient.emergencyContactPhone} icon={Phone} link={`tel:${patient.emergencyContactPhone}`} />
                </div>
              </Card>

              {/* Medical Information Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Medical Information" icon={Heart} badge={formatBloodType(patient.bloodType)}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</label>
                      <div className="mt-1 flex items-center">
                        <Droplet className="w-5 h-5 mr-2 text-red-500" />
                        <span className="text-lg font-semibold text-gray-900">{formatBloodType(patient.bloodType)}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Allergies</label>
                      <p className="text-sm text-gray-900 mt-1 whitespace-pre-line">{patient.allergies || 'None reported'}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Current Medications</label>
                      <p className="text-sm text-gray-900 mt-1 whitespace-pre-line">{patient.medications || 'None reported'}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Chronic Conditions</label>
                      <p className="text-sm text-gray-900 mt-1 whitespace-pre-line">{patient.chronicConditions || patient.condition || 'None reported'}</p>
                    </div>
                  </div>
                </Card>

                <Card title="Insurance Information" icon={Shield}>
                  <div className="space-y-4">
                    <InfoBlock label="Insurance Provider" value={patient.insuranceProviderName} icon={CreditCard} />
                    <InfoBlock label="Member ID" value={patient.insuranceMemberId} />
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 block">Preferences</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded border-2 mr-2 flex items-center justify-center ${patient.consentToShareData ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                            {patient.consentToShareData && <span className="text-white text-xs">✓</span>}
                          </div>
                          <span className="text-sm text-gray-700">Consent to share data</span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded border-2 mr-2 flex items-center justify-center ${patient.smsOptIn ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                            {patient.smsOptIn && <span className="text-white text-xs">✓</span>}
                          </div>
                          <span className="text-sm text-gray-700">SMS notifications</span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded border-2 mr-2 flex items-center justify-center ${patient.emailOptIn ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                            {patient.emailOptIn && <span className="text-white text-xs">✓</span>}
                          </div>
                          <span className="text-sm text-gray-700">Email notifications</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Appointment Timeline */}
              {(patient.lastVisit || patient.nextAppointment) && (
                <Card title="Appointment Timeline" icon={Calendar}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {patient.lastVisit && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-2">
                          <Clock className="w-5 h-5 text-gray-400 mr-2" />
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</label>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          {new Date(patient.lastVisit).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    )}
                    {patient.nextAppointment && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                          <label className="text-xs font-medium text-blue-600 uppercase tracking-wider">Next Appointment</label>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          {new Date(patient.nextAppointment).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          {Math.ceil((new Date(patient.nextAppointment) - new Date()) / (1000 * 60 * 60 * 24))} days remaining
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Additional Notes */}
              {patient.notes && (
                <Card title="Additional Notes" icon={FileText}>
                  <p className="text-sm text-gray-900 whitespace-pre-line">{patient.notes}</p>
                </Card>
              )}

              {/* Quick Actions */}
              <Card title="Quick Actions">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md">
                    <Video className="w-4 h-4 mr-2" /> Start Video Call
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageSquare className="w-4 h-4 mr-2" /> Send Message
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="w-4 h-4 mr-2" /> Schedule Appointment
                  </button>
                  <button 
                    onClick={sendEmail}
                    className="flex items-center justify-center px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Mail className="w-4 h-4 mr-2" /> Send Email
                  </button>
                </div>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 px-4 py-3 sm:px-8 sm:py-4 flex justify-between items-center gap-3">
            <div className="text-sm text-gray-500">
              Last updated: {patient.updatedAt ? new Date(patient.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()}
            </div>
            <div className="flex items-center gap-3">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  Edit Patient
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
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
