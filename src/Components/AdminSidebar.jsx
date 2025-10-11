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
