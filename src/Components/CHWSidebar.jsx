import { NavLink } from 'react-router-dom';
import logo from '../assets/mediLink.png';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MapPin,
  ClipboardList,
  Activity,
  MessageSquare,
  TrendingUp,
  FileText,
  User,
  Settings,
} from 'lucide-react';

const sidebarLinks = [
  {
    to: '/client/chw/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
  },
  {
    to: '/client/chw/patients',
    label: 'My Patients',
    icon: <Users className="w-5 h-5 mr-3" />,
    badge: 12,
  },
  {
    to: '/client/chw/appointments',
    label: 'Appointments',
    icon: <Calendar className="w-5 h-5 mr-3" />,
    badge: 5,
  },
  {
    to: '/client/chw/home-visits',
    label: 'Home Visits',
    icon: <MapPin className="w-5 h-5 mr-3" />,
    badge: 3,
  },
  {
    to: '/client/chw/tasks',
    label: 'Tasks & Follow-ups',
    icon: <ClipboardList className="w-5 h-5 mr-3" />,
    badge: 8,
  },
  {
    to: '/client/chw/health-assessments',
    label: 'Health Assessments',
    icon: <Activity className="w-5 h-5 mr-3" />,
  },
  {
    to: '/client/chw/messages',
    label: 'Messages',
    icon: <MessageSquare className="w-5 h-5 mr-3" />,
    badge: 4,
  },
  {
    to: '/client/chw/reports',
    label: 'Reports & Analytics',
    icon: <TrendingUp className="w-5 h-5 mr-3" />,
  },
  {
    to: '/client/chw/resources',
    label: 'Resources & Training',
    icon: <FileText className="w-5 h-5 mr-3" />,
  },
  {
    to: '/client/chw/profile',
    label: 'Profile',
    icon: <User className="w-5 h-5 mr-3" />,
  },
  {
    to: '/client/chw/settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5 mr-3" />,
  },
];

const CHWSidebar = () => (
  // Fixed sidebar with blue theme for CHW
  <aside className="fixed top-0 left-0 w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col py-6 px-4 shadow-lg h-screen z-30">
    {/* Logo Section */}
    <div className="mb-6 flex items-center space-x-3 px-1">
      <img
        src={logo}
        alt="MediLink logo"
        className="w-10 h-10 rounded-full object-cover shadow-sm"
      />
      <div className="text-white">
        <div className="text-lg font-extrabold tracking-wide">MediLink</div>
        <div className="text-xs opacity-90">CHW Portal</div>
      </div>
    </div>

    {/* Navigation Links */}
    <nav className="flex-1 space-y-2 overflow-y-auto">
      {sidebarLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-blue-700 text-yellow-300 shadow-md'
                : 'hover:bg-blue-700/50'
            }`
          }
          end
        >
          <div className="flex items-center">
            {link.icon}
            <span className="text-sm">{link.label}</span>
          </div>
          {link.badge && (
            <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-full">
              {link.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Footer */}
    <div className="mt-8 text-xs text-center text-blue-200 border-t border-blue-700 pt-4">
      <p>&copy; {new Date().getFullYear()} MediLink</p>
      <p className="mt-1 opacity-75">Community Health Worker</p>
    </div>
  </aside>
);

export default CHWSidebar;
