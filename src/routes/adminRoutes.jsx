
import AdminLayout from '../Layouts/AdminLayout';
import AdminDashboard from '../Pages/Admin/AdminDashboard_Optimized';
import AdminProfile from '../Pages/Admin/AdminProfile';
import ActivePatients from '../Pages/Admin/ActivePatients';
import ActiveCHW from '../Pages/Admin/ActiveCHW';
import AddPatient from '../Pages/Admin/AddPatient';
import AddCHW from '../Pages/Admin/AddCHW';
import ApproveRequests from '../Pages/Admin/ApproveRequests';
import SystemLogs from '../Pages/Admin/SystemLogs';
import UserManagement from '../Pages/Admin/UserManagement';
import AmbulanceManagement from '../Pages/Admin/AmbulanceManagement';
import SystemSettings from '../Pages/Admin/SystemSettings';
import FinancialManagement from '../Pages/Admin/FinancialManagement';
import TelemedicineManagement from '../Pages/Admin/TelemedicineManagement';
import TrainingManagement from '../Pages/Admin/TrainingManagement';
import InsuranceManagement from '../Pages/Admin/InsuranceManagement';
import NotificationManagement from '../Pages/Admin/NotificationManagement';
import ReportsAnalytics from '../Pages/Admin/ReportsAnalytics';
import { Outlet } from 'react-router-dom';

export const adminRoutes = [
  {
    path: '/admin',
    element: <AdminLayout><Outlet /></AdminLayout>,
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'profile', element: <AdminProfile /> },
      { path: 'active-patients', element: <ActivePatients /> },
      { path: 'active-chw', element: <ActiveCHW /> },
      { path: 'add-patient', element: <AddPatient /> },
      { path: 'add-chw', element: <AddCHW /> },
      { path: 'ambulance-management', element: <AmbulanceManagement /> },
      { path: 'approve-requests', element: <ApproveRequests /> },
      { path: 'system-logs', element: <SystemLogs /> },
      { path: 'user-management', element: <UserManagement /> },
      { path: 'system-settings', element: <SystemSettings /> },
      { path: 'financial-management', element: <FinancialManagement /> },
      { path: 'telemedicine-management', element: <TelemedicineManagement /> },
      { path: 'training-management', element: <TrainingManagement /> },
      { path: 'insurance-management', element: <InsuranceManagement /> },
      { path: 'notifications', element: <NotificationManagement /> },
      { path: 'reports', element: <ReportsAnalytics /> },
      // add more admin routes here
    ],
  },
];
