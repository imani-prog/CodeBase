/* eslint-disable no-unused-vars */
import { User, Bell, Lock, CreditCard, Globe, Moon, Shield, MapPin, Briefcase, Activity, Users, Radio, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SettingsBase from '../../../Components/SettingsBase';

const CHWSettings = () => {
  const navigate = useNavigate();

  const settingsSections = [
    {
      icon: User,
      title: 'Account Settings',
      description: 'Manage your personal information',
      actions: [
        {
          label: 'Edit Profile Information',
          path: '/client/chw/profile',
        },
      ],
    },
    {
      icon: MapPin,
      title: 'GPS & Location Settings',
      description: 'Manage location tracking preferences',
      toggles: [
        {
          label: 'Enable GPS Tracking',
          defaultChecked: true,
          onChange: (e) => console.log('GPS tracking:', e.target.checked),
        },
        {
          label: 'Share Location with Supervisor',
          defaultChecked: true,
          onChange: (e) => console.log('Share location:', e.target.checked),
        },
        {
          label: 'Auto-Log Mileage',
          defaultChecked: true,
          onChange: (e) => console.log('Auto-log mileage:', e.target.checked),
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
          label: 'New Patient Assignments',
          defaultChecked: true,
          onChange: (e) => console.log('Patient assignments:', e.target.checked),
        },
        {
          label: 'Visit Reminders',
          defaultChecked: true,
          onChange: (e) => console.log('Visit reminders:', e.target.checked),
        },
        {
          label: 'Training Updates',
          defaultChecked: true,
          onChange: (e) => console.log('Training updates:', e.target.checked),
        },
        {
          label: 'Performance Reports',
          defaultChecked: true,
          onChange: (e) => console.log('Performance reports:', e.target.checked),
        },
      ],
    },
    {
      icon: Briefcase,
      title: 'Work Preferences',
      description: 'Configure your work settings',
      toggles: [
        {
          label: 'Accept New Assignments',
          defaultChecked: true,
          onChange: (e) => console.log('Accept assignments:', e.target.checked),
        },
        {
          label: 'Available for Emergency Calls',
          defaultChecked: true,
          onChange: (e) => console.log('Emergency calls:', e.target.checked),
        },
      ],
      selects: [
        {
          label: 'Preferred Working Hours',
          defaultValue: 'flexible',
          onChange: (e) => console.log('Working hours:', e.target.value),
          options: [
            { value: 'morning', label: 'Morning (6AM - 12PM)' },
            { value: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
            { value: 'evening', label: 'Evening (6PM - 10PM)' },
            { value: 'flexible', label: 'Flexible' },
          ],
        },
        {
          label: 'Maximum Daily Visits',
          defaultValue: '10',
          onChange: (e) => console.log('Max visits:', e.target.value),
          options: [
            { value: '5', label: '5 visits' },
            { value: '10', label: '10 visits' },
            { value: '15', label: '15 visits' },
            { value: '20', label: '20 visits' },
          ],
        },
      ],
    },
    {
      icon: Activity,
      title: 'Performance Tracking',
      description: 'Manage performance settings',
      actions: [
        {
          label: 'View Performance Reports',
          path: '/client/chw/reports',
        },
      ],
      toggles: [
        {
          label: 'Auto-Generate Monthly Reports',
          defaultChecked: true,
          onChange: (e) => console.log('Auto reports:', e.target.checked),
        },
        {
          label: 'Share Performance with Supervisor',
          defaultChecked: true,
          onChange: (e) => console.log('Share performance:', e.target.checked),
        },
      ],
    },
    {
      icon: Users,
      title: 'Communication Preferences',
      description: 'Manage how you communicate',
      toggles: [
        {
          label: 'Receive Messages from Patients',
          defaultChecked: true,
          onChange: (e) => console.log('Patient messages:', e.target.checked),
        },
        {
          label: 'Receive Messages from Supervisor',
          defaultChecked: true,
          onChange: (e) => console.log('Supervisor messages:', e.target.checked),
        },
        {
          label: 'Auto-Reply When Offline',
          defaultChecked: false,
          onChange: (e) => console.log('Auto-reply:', e.target.checked),
        },
      ],
    },
    {
      icon: Radio,
      title: 'Field Visit Settings',
      description: 'Configure field visit preferences',
      toggles: [
        {
          label: 'Auto-Check In at Locations',
          defaultChecked: true,
          onChange: (e) => console.log('Auto check-in:', e.target.checked),
        },
        {
          label: 'Enable Offline Mode',
          defaultChecked: true,
          onChange: (e) => console.log('Offline mode:', e.target.checked),
        },
        {
          label: 'Save Visit Photos',
          defaultChecked: true,
          onChange: (e) => console.log('Save photos:', e.target.checked),
        },
      ],
      selects: [
        {
          label: 'Default Visit Duration',
          defaultValue: '30',
          onChange: (e) => console.log('Visit duration:', e.target.value),
          options: [
            { value: '15', label: '15 minutes' },
            { value: '30', label: '30 minutes' },
            { value: '45', label: '45 minutes' },
            { value: '60', label: '60 minutes' },
          ],
        },
      ],
    },
    {
      icon: CreditCard,
      title: 'Earnings & Payments',
      description: 'View salary and payment history',
      actions: [
        {
          label: 'View Payment Reports',
          path: '/client/chw/reports',
        },
      ],
      selects: [
        {
          label: 'Payment Method',
          defaultValue: 'mpesa',
          onChange: (e) => console.log('Payment method:', e.target.value),
          options: [
            { value: 'mpesa', label: 'M-Pesa' },
            { value: 'bank', label: 'Bank Transfer' },
            { value: 'airtel', label: 'Airtel Money' },
          ],
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
      icon: Smartphone,
      title: 'Device & App Settings',
      description: 'Manage device preferences',
      toggles: [
        {
          label: 'Enable Biometric Login',
          defaultChecked: false,
          onChange: (e) => console.log('Biometric:', e.target.checked),
        },
        {
          label: 'Auto-Sync Data',
          defaultChecked: true,
          onChange: (e) => console.log('Auto-sync:', e.target.checked),
        },
      ],
      selects: [
        {
          label: 'Data Usage',
          defaultValue: 'wifi',
          onChange: (e) => console.log('Data usage:', e.target.value),
          options: [
            { value: 'wifi', label: 'Wi-Fi Only' },
            { value: 'mobile', label: 'Mobile Data' },
            { value: 'both', label: 'Wi-Fi & Mobile Data' },
          ],
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

export default CHWSettings;
