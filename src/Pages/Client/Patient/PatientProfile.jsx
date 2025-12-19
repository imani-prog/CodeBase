import { useState } from 'react';
import ProfileBase from '../../../Components/ProfileBase';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Heart,
  Droplet,
  Weight,
  Ruler,
  AlertCircle,
} from 'lucide-react';

const PatientProfile = () => {
  // Patient-specific profile data
  const [profileData] = useState({
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
    userId: 'PT-2023-001234',
    status: 'Active',
  });

  const handleSave = (updatedData) => {
    console.log('Saving patient profile data:', updatedData);
    // TODO: Add API call to save patient profile data
    // Example: await updatePatientProfile(updatedData);
  };

  // Define tabs with patient-specific fields
  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: User,
      description: 'Your personal contact information',
      fields: [
        { label: 'First Name', field: 'firstName', icon: User },
        { label: 'Last Name', field: 'lastName', icon: User },
        { label: 'Email Address', field: 'email', type: 'email', icon: Mail },
        { label: 'Phone Number', field: 'phone', type: 'tel', icon: Phone },
        { label: 'Date of Birth', field: 'dateOfBirth', type: 'date', icon: Calendar },
        { label: 'Gender', field: 'gender' },
        { label: 'Blood Type', field: 'bloodType', icon: Droplet },
      ],
    },
    {
      id: 'address',
      label: 'Address',
      icon: MapPin,
      description: 'Your residential address',
      fields: [
        { label: 'Street Address', field: 'street', icon: MapPin },
        { label: 'City', field: 'city' },
        { label: 'State', field: 'state' },
        { label: 'Zip Code', field: 'zipCode' },
        { label: 'Country', field: 'country' },
      ],
    },
    {
      id: 'medical',
      label: 'Medical Info',
      icon: Heart,
      description: 'Your medical and health information',
      fields: [
        { label: 'Height', field: 'height', icon: Ruler },
        { label: 'Weight', field: 'weight', icon: Weight },
        { label: 'Allergies', field: 'allergies' },
        { label: 'Current Medications', field: 'medications' },
        { label: 'Medical Conditions', field: 'conditions' },
      ],
      note: {
        type: 'info',
        title: 'Keep Information Current',
        message: 'Accurate medical information helps healthcare providers deliver better care. Please update any changes to your medications or conditions.',
      },
    },
    {
      id: 'emergency',
      label: 'Emergency Contact',
      icon: AlertCircle,
      description: 'This person will be contacted in case of a medical emergency',
      fields: [
        { label: 'Contact Name', field: 'emergencyName', icon: User },
        { label: 'Relationship', field: 'emergencyRelation' },
        { label: 'Phone Number', field: 'emergencyPhone', type: 'tel', icon: Phone },
      ],
      note: {
        type: 'warning',
        title: 'Important',
        message: 'Make sure your emergency contact information is always up to date. This person should be someone who can make medical decisions on your behalf if needed.',
      },
    },
    {
      id: 'insurance',
      label: 'Insurance',
      icon: Shield,
      description: 'Your insurance information',
      fields: [
        { label: 'Insurance Provider', field: 'insuranceProvider', icon: Shield },
        { label: 'Policy Number', field: 'policyNumber' },
        { label: 'Group Number', field: 'groupNumber' },
      ],
      note: {
        type: 'info',
        title: 'Insurance Coverage',
        message: 'Your insurance information is securely stored and encrypted. Please verify this information with your insurance provider to ensure accuracy.',
      },
    },
  ];

  return <ProfileBase userType="patient" profileData={profileData} tabs={tabs} onSave={handleSave} />;
};

export default PatientProfile;
