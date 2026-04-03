import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useGreeting } from '../../hooks/Usegreeting.js';
import { 
  Bell, Search, Settings, User, LogOut, Shield,
  ChevronDown, Menu, X, HelpCircle
} from 'lucide-react';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const greeting = useGreeting();            

  const [darkMode, setDarkMode] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => { 
    logout(); 
    navigate('/login'); 
  };

  
  const notifications = [
    { id: 1, message: 'New user registration pending approval', time: '5 min ago', unread: true },
    { id: 2, message: 'System backup completed successfully', time: '1 hour ago', unread: true },
    { id: 3, message: 'Failed login attempt detected', time: '2 hours ago', unread: false },
    { id: 4, message: 'Weekly report is ready for review', time: '1 day ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  
  const displayName = user?.name || user?.fullName || user?.username || 'User';

  const displayInitials =
    user?.initials ||
    displayName
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const displayTitle = user?.role || '';
  const displayEmail = user?.email || '';

  const firstName = displayName.split(' ')[0];

  const profileMenuItems = [
    { name: 'My Profile', icon: User, path: '/admin/profile' },
    { name: 'System Settings', icon: Settings, path: '/admin/system-settings' },
    { name: 'User Management', icon: Shield, path: '/admin/user-management' },
    { name: 'System Logs', icon: HelpCircle, path: '/admin/system-logs' },
    { name: 'Sign Out', icon: LogOut, isDanger: true },
  ];

 
  const handleProfileClick = () => {
    setProfileDropdownOpen(prev => !prev);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  const handleNotificationsClick = () => {
    setNotificationsOpen(prev => !prev);
    if (profileDropdownOpen) setProfileDropdownOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-64 right-0 z-40 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} border-b border-gray-200 h-16`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Greeting */}
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">
              {greeting.text},{' '}
              <span className="text-blue-600">{firstName}</span>
            </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">

            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationsClick}
                className="p-2 rounded-lg hover:bg-gray-100 relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                    <p className="text-sm text-gray-500">
                      You have {unreadCount} unread notifications
                    </p>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="p-4 border border-gray-200 hover:bg-gray-50">
                        <p className="text-sm">{n.message}</p>
                        <p className="text-xs text-gray-500">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {displayInitials}
                </div>

                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold">{displayName}</p>
                  <p className="text-xs text-gray-500">{displayTitle}</p>
                </div>

                <ChevronDown className="w-4 h-4" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  
                  {/* Profile Header */}
                  <div className="p-4 border-b">
                    <p className="font-semibold">{displayName}</p>
                    <p className="text-sm text-gray-500">{displayEmail}</p>
                  </div>

                  {/* Menu */}
                  <div className="py-2">
                    {profileMenuItems.map(item => {
                      const Icon = item.icon ;

                      if (item.isDanger) {
                        return (
                          <button
                            key={item.name}
                            onClick={handleSignOut}
                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Icon className="w-4 h-4 mr-3 text-blue-600" />
                            {item.name}
                          </button>
                        );
                      }

                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-sm hover:bg-gray-100"
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(p => !p)}
              className="lg:hidden p-2"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;