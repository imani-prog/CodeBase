import CHWLayout from '../Layouts/CHWLayout';
import CHWDashboard from '../Pages/Client/CHW/CHWDashboard';
import Profile from '../Pages/Client/Profile';
import Settings from '../Pages/Client/Settings';

export const chwRoutes = [
  {
    path: '/client/chw',
    element: <CHWLayout />,
    children: [
      { path: 'dashboard', element: <CHWDashboard /> },
      { path: 'patients', element: <div><h1>My Patients</h1><p>List of patients assigned to this CHW.</p></div> },
      { path: 'appointments', element: <div><h1>CHW Appointments</h1><p>Scheduled appointments and visits.</p></div> },
      { path: 'home-visits', element: <div><h1>Home Visits</h1><p>Scheduled home visits.</p></div> },
      { path: 'tasks', element: <div><h1>Tasks & Follow-ups</h1><p>Tasks and patient follow-ups.</p></div> },
      { path: 'health-assessments', element: <div><h1>Health Assessments</h1><p>Conduct and view health assessments.</p></div> },
      { path: 'messages', element: <div><h1>Messages</h1><p>Messages from patients and staff.</p></div> },
      { path: 'reports', element: <div><h1>Reports & Analytics</h1><p>View reports and analytics.</p></div> },
      { path: 'resources', element: <div><h1>Resources & Training</h1><p>Training materials and resources.</p></div> },
      { path: 'profile', element: <Profile /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
];
