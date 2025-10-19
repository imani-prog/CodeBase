import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Save,
  X,
  Camera,
  Heart,
  Activity,
  Weight,
  Ruler,
  Droplet,
  Thermometer,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  // Sample patient data - replace with actual data from auth context/API
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    bloodType: 'O+',
    
    // Address
    street: '123 Health Street',
    city: 'Boston',
    state: 'MA',
    zipCode: '02101',
    country: 'USA',
    
    // Emergency Contact
    emergencyName: 'Jane Doe',
    emergencyRelation: 'Spouse',
    emergencyPhone: '+1 (555) 987-6543',
    
    // Medical Information
    height: '5\'10"',
    weight: '175 lbs',
    allergies: 'Penicillin, Peanuts',
    medications: 'Lisinopril 10mg daily',
    conditions: 'Hypertension',
    
    // Insurance
    insuranceProvider: 'Blue Cross Blue Shield',
    policyNumber: 'BCBS-123456789',
    groupNumber: 'GRP-987654',
    
    // Account
    memberSince: '2023-01-15',
    patientId: 'PT-2023-001234',
    status: 'Active',
  });

  const [editedData, setEditedData] = useState(profileData);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'medical', label: 'Medical Info', icon: Heart },
    { id: 'emergency', label: 'Emergency Contact', icon: AlertCircle },
    { id: 'insurance', label: 'Insurance', icon: Shield },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(profileData);
  };

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
    // Add API call to save data here
  };

  const handleChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const InputField = ({ label, value, field, type = 'text', icon: Icon, disabled = false }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-1 text-blue-600" />}
        {label}
      </label>
      <input
        type={type}
        value={isEditing ? editedData[field] : value}
        onChange={(e) => handleChange(field, e.target.value)}
        disabled={!isEditing || disabled}
        className={`w-full px-4 py-2 border rounded-lg transition-all ${
          isEditing && !disabled
            ? 'border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white'
            : 'border-gray-300 bg-gray-50'
        }`}
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-bold shadow-lg">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 p-2 rounded-full shadow-lg transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            {/* User Info */}
            <div>
              <h1 className="text-3xl font-bold">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-blue-100 mt-1">Patient ID: {profileData.patientId}</p>
              <div className="flex items-center space-x-4 mt-3">
                <span className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {profileData.status}
                </span>
                <span className="text-blue-100 text-sm">
                  Member since {new Date(profileData.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-red-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-md"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md p-2">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-xl shadow-md p-8">
        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="First Name"
                value={profileData.firstName}
                field="firstName"
                icon={User}
              />
              <InputField
                label="Last Name"
                value={profileData.lastName}
                field="lastName"
                icon={User}
              />
              <InputField
                label="Email Address"
                value={profileData.email}
                field="email"
                type="email"
                icon={Mail}
              />
              <InputField
                label="Phone Number"
                value={profileData.phone}
                field="phone"
                type="tel"
                icon={Phone}
              />
              <InputField
                label="Date of Birth"
                value={profileData.dateOfBirth}
                field="dateOfBirth"
                type="date"
                icon={Calendar}
              />
              <InputField
                label="Gender"
                value={profileData.gender}
                field="gender"
              />
              <InputField
                label="Blood Type"
                value={profileData.bloodType}
                field="bloodType"
                icon={Droplet}
              />
              <InputField
                label="Patient ID"
                value={profileData.patientId}
                field="patientId"
                disabled={true}
              />
            </div>

            {/* Address Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <InputField
                    label="Street Address"
                    value={profileData.street}
                    field="street"
                    icon={MapPin}
                  />
                </div>
                <InputField
                  label="City"
                  value={profileData.city}
                  field="city"
                />
                <InputField
                  label="State/Province"
                  value={profileData.state}
                  field="state"
                />
                <InputField
                  label="ZIP/Postal Code"
                  value={profileData.zipCode}
                  field="zipCode"
                />
                <InputField
                  label="Country"
                  value={profileData.country}
                  field="country"
                />
              </div>
            </div>
          </div>
        )}

        {/* Medical Information Tab */}
        {activeTab === 'medical' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Medical Information</h2>
            
            {/* Vital Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Height</p>
                    <p className="text-2xl font-bold text-blue-600">{profileData.height}</p>
                  </div>
                  <Ruler className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="text-2xl font-bold text-green-600">{profileData.weight}</p>
                  </div>
                  <Weight className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Blood Type</p>
                    <p className="text-2xl font-bold text-red-600">{profileData.bloodType}</p>
                  </div>
                  <Droplet className="w-8 h-8 text-red-600" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-2xl font-bold text-purple-600">{profileData.status}</p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Medical Details */}
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1 text-red-600" />
                  Allergies
                </label>
                <textarea
                  value={isEditing ? editedData.allergies : profileData.allergies}
                  onChange={(e) => handleChange('allergies', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-lg transition-all ${
                    isEditing
                      ? 'border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Activity className="w-4 h-4 mr-1 text-blue-600" />
                  Current Medications
                </label>
                <textarea
                  value={isEditing ? editedData.medications : profileData.medications}
                  onChange={(e) => handleChange('medications', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-lg transition-all ${
                    isEditing
                      ? 'border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-red-600" />
                  Medical Conditions
                </label>
                <textarea
                  value={isEditing ? editedData.conditions : profileData.conditions}
                  onChange={(e) => handleChange('conditions', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-lg transition-all ${
                    isEditing
                      ? 'border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contact Tab */}
        {activeTab === 'emergency' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Emergency Contact</h2>
            <p className="text-gray-600">
              This person will be contacted in case of a medical emergency.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Contact Name"
                value={profileData.emergencyName}
                field="emergencyName"
                icon={User}
              />
              <InputField
                label="Relationship"
                value={profileData.emergencyRelation}
                field="emergencyRelation"
              />
              <InputField
                label="Phone Number"
                value={profileData.emergencyPhone}
                field="emergencyPhone"
                type="tel"
                icon={Phone}
              />
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Important</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Make sure your emergency contact information is always up to date. 
                    This person should be someone who can make medical decisions on your behalf if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insurance Tab */}
        {activeTab === 'insurance' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Insurance Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Insurance Provider"
                value={profileData.insuranceProvider}
                field="insuranceProvider"
                icon={Shield}
              />
              <InputField
                label="Policy Number"
                value={profileData.policyNumber}
                field="policyNumber"
              />
              <InputField
                label="Group Number"
                value={profileData.groupNumber}
                field="groupNumber"
              />
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Insurance Coverage</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your insurance information is securely stored and encrypted. 
                    Please verify this information with your insurance provider to ensure accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Account Information Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-semibold text-gray-800">
                {new Date(profileData.memberSince).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <User className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Patient ID</p>
              <p className="font-semibold text-gray-800">{profileData.patientId}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Account Status</p>
              <p className="font-semibold text-green-600">{profileData.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
