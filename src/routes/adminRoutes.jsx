
import AdminLayout from '../Layouts/AdminLayout';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import AdminProfile from '../Pages/Admin/AdminProfile';
import ActivePatients from '../Pages/Admin/ActivePatients';
import ActiveCHW from '../Pages/Admin/ActiveCHW';
import ApproveRequests from '../Pages/Admin/ApproveRequests';
import SystemLogs from '../Pages/Admin/SystemLogs';
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
      { path: 'approve-requests', element: <ApproveRequests /> },
      { path: 'system-logs', element: <SystemLogs /> },
      // add more admin routes here
    ],
  },
];
