
import ClientLayout from '../Layouts/ClientLayout';
import Dashboard from '../Pages/Client/Patient/Dashboard';
import Profile from '../Pages/Client/Profile';
import Settings from '../Pages/Client/Settings';
import PatientDashboard from '../Pages/Client/Patient/PatientDashboard';
import Appointments from '../Pages/Client/Patient/Appointments';
import Telemedicine from '../Pages/Client/Patient/Telemedicine';
import HealthRecords from '../Pages/Client/Patient/HealthRecords';
import Prescriptions from '../Pages/Client/Patient/Prescriptions';
import Insurance from '../Pages/Client/Patient/Insurance';
import Emergency from '../Pages/Client/Patient/Emergency';
import Wellness from '../Pages/Client/Patient/Wellness';
import CHWDashboard from '../Pages/Client/CHW/CHWDashboard';

export const clientRoutes = [
  {
    path: '/client',
    element: <ClientLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'settings', element: <Settings /> },
      { path: 'patient/dashboard', element: <PatientDashboard /> },
      { path: 'patient/appointments', element: <Appointments /> },
      { path: 'patient/telemedicine', element: <Telemedicine /> },
      { path: 'patient/health-records', element: <HealthRecords /> },
      { path: 'patient/prescriptions', element: <Prescriptions /> },
      { path: 'patient/insurance', element: <Insurance /> },
      { path: 'patient/emergency', element: <Emergency /> },
      { path: 'patient/wellness', element: <Wellness /> },
      { path: 'chw/dashboard', element: <CHWDashboard /> },
      // add more client routes here
    ],
  },
];
