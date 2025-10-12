import { NavLink } from 'react-router-dom';
import logo from '../assets/mediLink.png';

const sidebarLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0v6m0 0H7m6 0h6" /></svg>
  ) },

  { to: '/admin/active-patients', label: 'Active Patients', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7.13A4 4 0 0016 4a4 4 0 00-4 4v1a4 4 0 01-4 4H4a4 4 0 00-4 4v2a4 4 0 004 4h16a4 4 0 004-4v-2a4 4 0 00-4-4z" /></svg>
  ) },
  { to: '/admin/active-chw', label: 'Active CHWs', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7.13A4 4 0 0016 4a4 4 0 00-4 4v1a4 4 0 01-4 4H4a4 4 0 00-4 4v2a4 4 0 004 4h16a4 4 0 004-4v-2a4 4 0 00-4-4z" /></svg>
  ) },
  { to: '/admin/ambulance-management', label: 'Ambulance Management', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ) },
  { to: '/admin/approve-requests', label: 'Approve Requests', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ) },
  { to: '/admin/system-logs', label: 'System Logs', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4a4 4 0 014 4v2" /></svg>
  ) },
  { to: '/admin/user-management', label: 'User Management', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7.13A4 4 0 0016 4a4 4 0 00-4 4v1a4 4 0 01-4 4H4a4 4 0 00-4 4v2a4 4 0 004 4h16a4 4 0 004-4v-2a4 4 0 00-4-4z" /></svg>
  ) },
  { to: '/admin/system-settings', label: 'System Settings', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ) },
  { to: '/admin/financial-management', label: 'Financial Management', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ) },
  { to: '/admin/telemedicine-management', label: 'Telemedicine Management', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  ) },
  { to: '/admin/training-management', label: 'Training Management', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ) },
  { to: '/admin/insurance-management', label: 'Insurance Management', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ) },
  { to: '/admin/notifications', label: 'Notifications', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
  ) },
  { to: '/admin/reports', label: 'Reports & Analytics', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4a4 4 0 014 4v2" /></svg>
  ) },

    { to: '/admin/profile', label: 'Profile', icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.847.657 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ) },
];

const AdminSidebar = () => (
  // fixed sidebar so its top aligns with viewport top and covers the area under the navbar
  <aside className="fixed top-0 left-0 w-64 bg-blue-950 text-white flex flex-col py-6 px-4 shadow-lg h-screen z-30">
    <div className="mb-6 flex items-center space-x-3 px-1">
      <img src={logo} alt="MediLink logo" className="w-10 h-10 rounded-full object-cover shadow-sm" />
      <div className="text-white">
        <div className="text-lg font-extrabold tracking-wide">MediLink</div>
        <div className="text-xs opacity-90">Admin Panel</div>
      </div>
    </div>
    <nav className="flex-1 space-y-2">
      {sidebarLinks.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-800 text-yellow-300' : 'hover:bg-blue-900'}`
          }
          end
        >
          {link.icon}
          {link.label}
        </NavLink>
      ))}
    </nav>
    <div className="mt-8 text-xs text-center text-blue-200">&copy; {new Date().getFullYear()} MediLink Admin</div>
  </aside>
);

export default AdminSidebar;
