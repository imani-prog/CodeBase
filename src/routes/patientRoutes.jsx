import ClientLayout from '../Layouts/ClientLayout';
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

export const patientRoutes = [
  {
    path: '/client/patient',
    element: <ClientLayout />,
    children: [
      { path: 'dashboard', element: <PatientDashboard /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'telemedicine', element: <Telemedicine /> },
      { path: 'health-records', element: <HealthRecords /> },
      { path: 'prescriptions', element: <Prescriptions /> },
      { path: 'insurance', element: <Insurance /> },
      { path: 'emergency', element: <Emergency /> },
      { path: 'wellness', element: <Wellness /> },
      { path: 'profile', element: <Profile /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
];
