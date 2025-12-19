import { User, Bell, Lock, CreditCard, Globe, Moon, Shield, Heart, Calendar } from 'lucide-react';

import SettingsBase from '../../../Components/SettingsBase';

const PatientSettings = () => {

  const settingsSections = [
    {
      icon: User,
      title: 'Account Settings',
      description: 'Manage your personal information',
      actions: [
        {
          label: 'Edit Profile Information',
          path: '/client/patient/profile',
        },
      ],
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure notification preferences',
      toggles: [
        {
          label: 'Email Notifications',
          defaultChecked: true,
          onChange: (e) => console.log('Email notifications:', e.target.checked),
        },
        {
          label: 'SMS Notifications',
          defaultChecked: true,
          onChange: (e) => console.log('SMS notifications:', e.target.checked),
        },
        {
          label: 'Appointment Reminders',
          defaultChecked: true,
          onChange: (e) => console.log('Appointment reminders:', e.target.checked),
        },
        {
          label: 'Prescription Refill Alerts',
          defaultChecked: true,
          onChange: (e) => console.log('Prescription alerts:', e.target.checked),
        },
        {
          label: 'Health Tips & Updates',
          defaultChecked: false,
          onChange: (e) => console.log('Health tips:', e.target.checked),
        },
      ],
    },
    {
      icon: Calendar,
      title: 'Appointment Preferences',
      description: 'Manage appointment settings',
      toggles: [
        {
          label: 'Send Reminder 24 Hours Before',
          defaultChecked: true,
          onChange: (e) => console.log('24h reminder:', e.target.checked),
        },
        {
          label: 'Send Reminder 1 Hour Before',
          defaultChecked: true,
          onChange: (e) => console.log('1h reminder:', e.target.checked),
        },
      ],
      selects: [
        {
          label: 'Preferred Appointment Time',
          defaultValue: 'morning',
          onChange: (e) => console.log('Preferred time:', e.target.value),
          options: [
            { value: 'morning', label: 'Morning (8AM - 12PM)' },
            { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
            { value: 'evening', label: 'Evening (5PM - 8PM)' },
          ],
        },
      ],
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Manage health tracking preferences',
      toggles: [
        {
          label: 'Track Health Metrics',
          defaultChecked: true,
          onChange: (e) => console.log('Track metrics:', e.target.checked),
        },
        {
          label: 'Share Health Data with Providers',
          defaultChecked: true,
          onChange: (e) => console.log('Share data:', e.target.checked),
        },
      ],
    },
    {
      icon: Lock,
      title: 'Security & Privacy',
      description: 'Password and security settings',
      actions: [
        {
          label: 'Change Password',
          onClick: () => console.log('Change password clicked'),
        },
        {
          label: 'Two-Factor Authentication',
          onClick: () => console.log('2FA clicked'),
        },
      ],
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Manage payment options',
      actions: [
        {
          label: 'Manage Payment Methods',
          path: '/client/patient/insurance',
        },
      ],
    },
    {
      icon: Globe,
      title: 'Language & Region',
      description: 'Language and timezone settings',
      selects: [
        {
          label: 'Language',
          defaultValue: 'en',
          onChange: (e) => console.log('Language:', e.target.value),
          options: [
            { value: 'en', label: 'English' },
            { value: 'sw', label: 'Swahili' },
          ],
        },
        {
          label: 'Timezone',
          defaultValue: 'eat',
          onChange: (e) => console.log('Timezone:', e.target.value),
          options: [
            { value: 'eat', label: 'East Africa Time (EAT)' },
          ],
        },
      ],
    },
    {
      icon: Moon,
      title: 'Appearance',
      description: 'Customize your display preferences',
      toggles: [
        {
          label: 'Dark Mode',
          defaultChecked: false,
          onChange: (e) => console.log('Dark mode:', e.target.checked),
        },
      ],
    },
    {
      icon: Shield,
      title: 'Legal & Privacy',
      description: 'Terms and privacy information',
      actions: [
        {
          label: 'Privacy Policy',
          path: '/privacy',
        },
        {
          label: 'Terms of Service',
          path: '/terms',
        },
      ],
    },
  ];

  return <SettingsBase settingsSections={settingsSections} />;
};

export default PatientSettings;
