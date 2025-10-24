import CHWLayout from '../Layouts/CHWLayout';
import CHWDashboard from '../Pages/Client/CHW/CHWDashboard';
import MyPatients from '../Pages/Client/CHW/MyPatients';
import HomeVisits from '../Pages/Client/CHW/HomeVisits';
import CHWAppointments from '../Pages/Client/CHW/CHWAppointments';
import TasksFollowups from '../Pages/Client/CHW/TasksFollowups';
import HealthAssessments from '../Pages/Client/CHW/HealthAssessments';
import CHWMessages from '../Pages/Client/CHW/CHWMessages';
import ReportsAnalytics from '../Pages/Client/CHW/ReportsAnalytics';
import ResourcesTraining from '../Pages/Client/CHW/ResourcesTraining';
import Profile from '../Pages/Client/Profile';
import Settings from '../Pages/Client/Settings';

export const chwRoutes = [
  {
    path: '/client/chw',
    element: <CHWLayout />,
    children: [
      { index: true, element: <CHWDashboard /> },
      { path: 'dashboard', element: <CHWDashboard /> },
      { path: 'patients', element: <MyPatients /> },
      { path: 'appointments', element: <CHWAppointments /> },
      { path: 'home-visits', element: <HomeVisits /> },
      { path: 'tasks', element: <TasksFollowups /> },
      { path: 'health-assessments', element: <HealthAssessments /> },
      { path: 'messages', element: <CHWMessages /> },
      { path: 'reports', element: <ReportsAnalytics /> },
      { path: 'resources', element: <ResourcesTraining /> },
      { path: 'profile', element: <Profile /> },
      { path: 'settings', element: <Settings /> }
    ]
  },
];
