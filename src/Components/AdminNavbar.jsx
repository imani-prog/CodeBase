import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  LogOut, 
  Shield, 
  Activity, 
  Moon, 
  Sun, 
  ChevronDown,
  Menu,
  X,
  Home,
  Users,
  FileText,
  BarChart3,
  Calendar,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

const AdminNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, type: 'user', message: 'New user registration pending approval', time: '5 min ago', unread: true },
    { id: 2, type: 'system', message: 'System backup completed successfully', time: '1 hour ago', unread: true },
    { id: 3, type: 'security', message: 'Failed login attempt detected', time: '2 hours ago', unread: false },
    { id: 4, type: 'report', message: 'Weekly report is ready for review', time: '1 day ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const navLinks = [
    
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    
  ];

  const profileMenuItems = [
    { name: 'My Profile', icon: User, path: '/admin/profile' },
    { name: 'Account Settings', icon: Settings, path: '/admin/settings' },
    { name: 'Security', icon: Shield, path: '/admin/security' },
    { name: 'Help Center', icon: HelpCircle, path: '/admin/help' },
    { name: 'Sign Out', icon: LogOut, path: '/logout', isDanger: true }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Add your dark mode logic here
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  const handleNotificationsClick = () => {
    setNotificationsOpen(!notificationsOpen);
    if (profileDropdownOpen) setProfileDropdownOpen(false);
  };

  return (
    // fixed top navbar that starts after the sidebar (left-64) so it doesn't touch the left edge
    <nav className={`fixed top-0 left-64 right-0 z-40 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-lg border-b border-gray-200 h-16`}> 
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          {/* <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  MediLink
                </span>
                
              </div>
            </div>
          </div> */}

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.path}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <div className={`relative ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 w-64 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                darkMode 
                  ? 'text-yellow-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationsClick}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 relative ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-xl border ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } z-50`}>
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      You have {unreadCount} unread notifications
                    </p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          notification.unread ? (darkMode ? 'bg-gray-750' : 'bg-blue-50') : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                            notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.message}</p>
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4">
                    <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <img
                  src="https://ui-avatars.com/api/?name=Dr+Sarah+Mitchell&background=3B82F6&color=fff&size=40"
                  alt="Admin Avatar"
                  className="w-8 h-8 rounded-full border-2 border-blue-200 shadow-sm"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold">Dr. Sarah Mitchell</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Chief Administrator
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  profileDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl border ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } z-50`}>
                  {/* Profile Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://ui-avatars.com/api/?name=Dr+Sarah+Mitchell&background=3B82F6&color=fff&size=48"
                        alt="Admin Avatar"
                        className="w-12 h-12 rounded-full border-2 border-blue-200"
                      />
                      <div>
                        <p className="font-semibold">Dr. Sarah Mitchell</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          sarah.mitchell@medilink.com
                        </p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {profileMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.name}
                          href={item.path}
                          className={`flex items-center px-4 py-3 text-sm transition-colors ${
                            item.isDanger
                              ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                              : darkMode
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {item.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} py-4`}>
            <div className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      darkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {link.name}
                  </a>
                );
              })}
            </div>
            
            {/* Mobile Search */}
            <div className="mt-4 px-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;