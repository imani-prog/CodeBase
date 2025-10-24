import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
  Users,
  Calendar,
  HelpCircle,
  FileText,
  Activity,
  Phone,
} from 'lucide-react';

const CHWNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample CHW data - replace with actual auth context
  const chw = {
    name: 'John Doe',
    email: 'john.doe@medilink.org',
    avatar: 'JD',
    role: 'Community Health Worker',
    employeeId: 'CHW-2023-001',
  };

  const notifications = [
    {
      id: 1,
      type: 'patient',
      message: 'New patient Sarah Wanjiru assigned to you',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 2,
      type: 'appointment',
      message: 'Upcoming home visit scheduled for 2:00 PM',
      time: '3 hours ago',
      unread: true,
    },
    {
      id: 3,
      type: 'task',
      message: 'Follow-up task for Patient ID: PT-1234 due today',
      time: '5 hours ago',
      unread: true,
    },
    {
      id: 4,
      type: 'training',
      message: 'New training module available: Maternal Health',
      time: '1 day ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const navLinks = [
    { name: 'My Patients', path: '/client/chw/patients', icon: Users },
    { name: 'Calendar', path: '/client/chw/appointments', icon: Calendar },
  ];

  const profileMenuItems = [
    { name: 'My Profile', icon: User, path: '/client/chw/profile' },
    { name: 'My Patients', icon: Users, path: '/client/chw/patients' },
    { name: 'Reports', icon: FileText, path: '/client/chw/reports' },
    { name: 'Settings', icon: Settings, path: '/client/chw/settings' },
    { name: 'Help & Support', icon: HelpCircle, path: '/support' },
    { name: 'Sign Out', icon: LogOut, path: '/', isDanger: true },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Add dark mode logic here
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
    // Fixed top navbar that starts after the sidebar (left-64)
    <nav
      className={`fixed top-0 left-64 right-0 z-40 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      } border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}
    >
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Welcome Message */}
          <div className="hidden md:block">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome back, <span className="text-blue-600">{chw.name}</span>! 👋
            </h2>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {link.name}
                </Link>
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
                  placeholder="Search patients, tasks..."
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
              className={`p-2 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'text-yellow-400 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationsClick}
                className={`relative p-2 rounded-lg transition-all duration-200 ${
                  darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div
                  className={`absolute right-0 mt-2 w-80 rounded-xl shadow-xl border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } z-50`}
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      You have {unreadCount} unread notifications
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? (darkMode ? 'bg-gray-750' : 'bg-blue-50') : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                              notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                          ></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.message}</p>
                            <p
                              className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
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
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {chw.avatar}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold">{chw.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    CHW
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    profileDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } z-50`}
                >
                  {/* Profile Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {chw.avatar}
                      </div>
                      <div>
                        <p className="font-semibold">{chw.name}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {chw.email}
                        </p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mt-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                          {chw.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {profileMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setProfileDropdownOpen(false)}
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
                        </Link>
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
          <div
            className={`lg:hidden border-t ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            } py-4`}
          >
            <div className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Search */}
            <div className="mt-4 px-4">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
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

export default CHWNavbar;
