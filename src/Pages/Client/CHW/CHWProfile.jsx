import { useState } from 'react';
import ProfileBase from '../../../Components/ProfileBase';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Users,
  MapPinned,
  Shield,
  Calendar,
  Activity,
} from 'lucide-react';

const CHWProfile = () => {
  // CHW-specific profile data
  const [profileData] = useState({
    // Personal Information
    firstName: 'Jane',
    lastName: 'Wanjiru',
    email: 'jane.wanjiru@medilink.co.ke',
    phone: '+254 712 345 678',
    dateOfBirth: '1988-03-20',
    gender: 'Female',
    
    // Address
    street: '45 Kenyatta Avenue',
    city: 'Nairobi',
    state: 'Nairobi County',
    zipCode: '00100',
    country: 'Kenya',
    
    // Work Information
    userId: 'CHW-2023-001856',
    chwLevel: 'Level 2 Community Health Worker',
    specialization: 'Maternal & Child Health',
    yearsOfExperience: '5 years',
    coverageArea: 'Kibera Sub-County',
    assignedFacility: 'Kibera Health Centre',
    
    // Certifications
    certifications: 'Basic Life Support (BLS), First Aid, Maternal Health',
    trainingCompleted: '15 courses',
    lastTraining: '2024-11-15',
    
    // Supervisor Information
    supervisorName: 'Dr. Peter Kamau',
    supervisorPhone: '+254 722 123 456',
    supervisorEmail: 'p.kamau@health.go.ke',
    
    // Performance Metrics
    totalPatients: '142',
    homeVisitsCompleted: '87',
    activePatients: '65',
    
    // Account
    memberSince: '2023-01-15',
    status: 'Active',
  });

  const handleSave = (updatedData) => {
    console.log('Saving CHW profile data:', updatedData);
    // TODO: Add API call to save CHW profile data
    // Example: await updateCHWProfile(updatedData);
  };

  // Define tabs with CHW-specific fields
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
        { label: 'County', field: 'state' },
        { label: 'Postal Code', field: 'zipCode' },
        { label: 'Country', field: 'country' },
      ],
    },
    {
      id: 'work',
      label: 'Work Information',
      icon: Briefcase,
      description: 'Your professional work details',
      fields: [
        { label: 'CHW ID', field: 'userId', disabled: true, icon: User },
        { label: 'CHW Level', field: 'chwLevel', icon: Award },
        { label: 'Specialization', field: 'specialization', icon: Activity },
        { label: 'Years of Experience', field: 'yearsOfExperience' },
        { label: 'Coverage Area', field: 'coverageArea', icon: MapPinned },
        { label: 'Assigned Facility', field: 'assignedFacility' },
      ],
    },
    {
      id: 'certifications',
      label: 'Certifications & Training',
      icon: Award,
      description: 'Your certifications and training history',
      fields: [
        { label: 'Certifications', field: 'certifications' },
        { label: 'Training Completed', field: 'trainingCompleted' },
        { label: 'Last Training Date', field: 'lastTraining', type: 'date' },
      ],
      note: {
        type: 'info',
        title: 'Continue Learning',
        message: 'Keep your certifications up to date by completing training courses regularly. Visit the Resources & Training page to access new courses.',
      },
    },
    {
      id: 'supervisor',
      label: 'Supervisor Contact',
      icon: Users,
      description: 'Your supervisor and emergency contact',
      fields: [
        { label: 'Supervisor Name', field: 'supervisorName', icon: User },
        { label: 'Supervisor Phone', field: 'supervisorPhone', type: 'tel', icon: Phone },
        { label: 'Supervisor Email', field: 'supervisorEmail', type: 'email', icon: Mail },
      ],
      note: {
        type: 'info',
        title: 'Support Available',
        message: 'Contact your supervisor for any work-related concerns, emergencies, or support needed during field visits.',
      },
    },
    {
      id: 'performance',
      label: 'Performance Overview',
      icon: Activity,
      description: 'Your performance statistics',
      fields: [
        { label: 'Total Patients', field: 'totalPatients', disabled: true },
        { label: 'Home Visits Completed', field: 'homeVisitsCompleted', disabled: true },
        { label: 'Active Patients', field: 'activePatients', disabled: true },
      ],
      note: {
        type: 'info',
        title: 'Track Your Progress',
        message: 'View detailed performance reports and analytics in the Reports & Analytics section.',
      },
    },
  ];

  return <ProfileBase userType="chw" profileData={profileData} tabs={tabs} onSave={handleSave} />;
};

export default CHWProfile;
