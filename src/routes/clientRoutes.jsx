
import ClientLayout from '../Layouts/ClientLayout';
import Dashboard from '../Pages/Client/Patient/Dashboard';
import Profile from '../Pages/Client/Profile';
import PatientDashboard from '../Pages/Client/Patient/PatientDashboard';
import CHWDashboard from '../Pages/Client/CHW/CHWDashboard';

export const clientRoutes = [
  {
    path: '/client',
    element: <ClientLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'patient/dashboard', element: <PatientDashboard /> },
      { path: 'chw/dashboard', element: <CHWDashboard /> },
      // add more client routes here
    ],
  },
];
