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
  Briefcase,
  Award,
  Users,
  MapPinned,
} from 'lucide-react';

// InputField component
const InputField = ({ label, value, field, type = 'text', icon: Icon, disabled = false, isEditing, editedData, handleChange }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-700 flex items-center">
      {Icon && <Icon className="w-3.5 h-3.5 mr-1 text-blue-600" />}
      {label}
    </label>
    <input
      type={type}
      value={isEditing ? editedData[field] : value}
      onChange={(e) => handleChange(field, e.target.value)}
      disabled={!isEditing || disabled}
      className={`w-full max-w-md px-3 py-2 text-sm border rounded-md transition-all ${
        isEditing && !disabled
          ? 'border-blue-500 focus:ring-1 focus:ring-blue-200 bg-white'
          : 'border-gray-300 bg-gray-50'
      }`}
    />
  </div>
);

const ProfileBase = ({ userType, profileData, tabs, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(profileData);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editedData);
    }
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-white shadow-md p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-blue-600 text-white border rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                {profileData.firstName?.[0]}{profileData.lastName?.[0]}
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            {/* User Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-600 mt-1">
                {userType === 'chw' ? 'Community Health Worker' : 'Patient'} ID: {profileData.userId}
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <span className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {profileData.status}
                </span>
                <span className="text-sm text-gray-600">
                  Member since {new Date(profileData.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Edit/Save/Cancel Buttons */}
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* All Sections on One Page */}
      <div className="space-y-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <div key={tab.id} className="bg-white shadow-md p-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Icon className="w-6 h-6 mr-2 text-blue-600" />
                  {tab.label}
                </h2>
                {tab.description && (
                  <p className="text-gray-600">{tab.description}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tab.fields.map((field) => (
                    <InputField
                      key={field.field}
                      label={field.label}
                      value={profileData[field.field]}
                      field={field.field}
                      type={field.type || 'text'}
                      icon={field.icon}
                      disabled={field.disabled}
                      isEditing={isEditing}
                      editedData={editedData}
                      handleChange={handleChange}
                    />
                  ))}
                </div>

                {tab.note && (
                  <div className={`mt-6 border rounded-lg p-4 ${tab.note.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="flex items-start space-x-3">
                      {tab.note.type === 'warning' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      ) : (
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      )}
                      <div>
                        <h4 className={`font-semibold ${tab.note.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'}`}>
                          {tab.note.title}
                        </h4>
                        <p className={`text-sm mt-1 ${tab.note.type === 'warning' ? 'text-yellow-700' : 'text-blue-700'}`}>
                          {tab.note.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Account Information Card */}
      <div className="bg-white shadow-md p-6">
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
              <p className="text-sm text-gray-600">{userType === 'chw' ? 'CHW ID' : 'Patient ID'}</p>
              <p className="font-semibold text-gray-800">{profileData.userId}</p>
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

export default ProfileBase;
