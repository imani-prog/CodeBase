import { NavLink } from 'react-router-dom';
import logo from '../assets/mediLink.png';
import {
  LayoutDashboard,
  Calendar,
  Video,
  FileText,
  Pill,
  Shield,
  AlertCircle,
  Heart,
  User,
  Settings,
} from 'lucide-react';

const sidebarLinks = [
  {
    to: '/client/patient/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
  },
  {
    to: '/client/patient/appointments',
    label: 'Appointments',
    icon: <Calendar className="w-5 h-5 mr-3" />,
    badge: 2,
  },
  {
    to: '/client/patient/telemedicine',
    label: 'Telemedicine',
    icon: <Video className="w-5 h-5 mr-3" />,
  },
  {
    to: '/client/patient/health-records',
    label: 'Health Records',
    icon: <FileText className="w-5 h-5 mr-3" />,
    badge: 1,
  },
  {
    to: '/client/patient/prescriptions',
    label: 'Prescriptions',
    icon: <Pill className="w-5 h-5 mr-3" />,
    badge: 3,
  },
  {
    to: '/client/patient/insurance',
    label: 'Insurance & Billing',
    icon: <Shield className="w-5 h-5 mr-3" />,
  },
  {
    to: '/client/patient/emergency',
    label: 'Emergency Services',
    icon: <AlertCircle className="w-5 h-5 mr-3" />,
    isEmergency: true,
  },
  {
    to: '/client/patient/wellness',
    label: 'Health & Wellness',
    icon: <Heart className="w-5 h-5 mr-3" />,
  },
  {
    to: '/client/patient/profile',
    label: 'Profile',
    icon: <User className="w-5 h-5 mr-3" />,
  },
  {
    to: '/client/patient/settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5 mr-3" />,
  },
];

const PatientSidebar = () => (
  
  <aside className="fixed top-0 left-0 w-64 bg-blue-950 text-white flex flex-col py-6 px-4 shadow-lg h-screen z-30">
    {/* Logo Section */}
    <div className="mb-6 flex items-center space-x-3 px-1">
      <img
        src={logo}
        alt="MediLink logo"
        className="w-10 h-10 rounded-full object-cover shadow-sm"
      />
      <div className="text-white">
        <div className="text-lg font-extrabold tracking-wide">MediLink</div>
        <div className="text-xs opacity-90">Patient Portal</div>
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
              link.isEmergency
                ? 'bg-red-600 hover:bg-red-700 font-semibold'
                : isActive
                ? 'bg-blue-800 text-yellow-300 shadow-md'
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
      <p className="mt-1 opacity-75">Patient Portal</p>
    </div>
  </aside>
);

export default PatientSidebar;
