import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellRing, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Users, 
  Send, 
  Plus, 
  Edit, 
  Eye, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Calendar, 
  BarChart3, 
  PieChart, 
  Target, 
  Settings, 
  RefreshCw, 
  Zap, 
  Globe, 
  Megaphone, 
  Volume2, 
  VolumeX, 
  Star, 
  Heart, 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  Bookmark, 
  Archive, 
  Trash2, 
  MoreVertical, 
  Play, 
  Pause, 
  Activity,
  TrendingUp,
  TrendingDown,
  Radio,
  Wifi,
  Phone,
  UserCheck,
  UserPlus,
  AlertTriangle,
  Info,
  CheckCircle2,
  X,
  Shield,
  BookOpen,
  FileText
} from 'lucide-react';


const NotificationManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [_searchTerm, _setSearchTerm] = useState('');
  const [_selectedCategory, _setSelectedCategory] = useState('all');
  const [_selectedStatus, _setSelectedStatus] = useState('all');
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);

  // Real-time notification state
  const [liveNotifications, setLiveNotifications] = useState([]);

  // Simulate real-time notifications
  useEffect(() => {
    if (!realTimeEnabled) return;

    const interval = setInterval(() => {
      const notifications = [
        { type: 'emergency', message: 'Emergency ambulance request from Kiambu County', priority: 'high' },
        { type: 'appointment', message: 'New telemedicine appointment scheduled', priority: 'medium' },
        { type: 'insurance', message: 'NHIF claim approved for patient PT-2024-456', priority: 'low' },
        { type: 'system', message: 'System backup completed successfully', priority: 'low' },
        { type: 'training', message: 'CHW training session starting in 30 minutes', priority: 'medium' },
        { type: 'payment', message: 'Payment received: KES 15,500 from insurance claim', priority: 'medium' }
      ];

      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      const newNotification = {
        id: Date.now(),
        ...randomNotification,
        timestamp: new Date().toLocaleTimeString(),
        read: false
      };

      setLiveNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }, 8000); // New notification every 8 seconds

    return () => clearInterval(interval);
  }, [realTimeEnabled]);

  // Sample data for comprehensive notification system
  const notificationOverview = {
    totalSent: 12847,
    deliveryRate: 96.8,
    openRate: 72.3,
    clickRate: 18.5,
    unsubscribeRate: 0.8,
    activeUsers: 2847,
    pushEnabled: 2234,
    emailEnabled: 2598,
    smsEnabled: 1876
  };

  const notificationTemplates = [
    {
      id: 1,
      name: "Emergency Alert",
      type: "emergency",
      category: "System",
      channels: ["push", "sms", "email"],
      subject: "Emergency Medical Alert",
      content: "Urgent medical assistance required. Location: {location}. Patient: {patient_name}. ETA: {eta}",
      variables: ["location", "patient_name", "eta"],
      status: "Active",
      usage: 234,
      lastUsed: "2024-10-12T10:30:00",
      deliveryRate: 98.5,
      openRate: 95.2
    },
    {
      id: 2,
      name: "Appointment Reminder",
      type: "reminder",
      category: "Healthcare",
      channels: ["push", "email"],
      subject: "Upcoming Appointment Reminder",
      content: "Hello {patient_name}, you have an appointment with Dr. {doctor_name} on {date} at {time}. Location: {clinic_name}",
      variables: ["patient_name", "doctor_name", "date", "time", "clinic_name"],
      status: "Active",
      usage: 1567,
      lastUsed: "2024-10-12T09:15:00",
      deliveryRate: 97.2,
      openRate: 78.9
    },
    {
      id: 3,
      name: "Insurance Claim Update",
      type: "update",
      category: "Insurance",
      channels: ["push", "email", "sms"],
      subject: "Insurance Claim Status Update",
      content: "Your insurance claim #{claim_number} has been {status}. Amount: KES {amount}. Processing time: {processing_time}",
      variables: ["claim_number", "status", "amount", "processing_time"],
      status: "Active",
      usage: 456,
      lastUsed: "2024-10-12T08:45:00",
      deliveryRate: 96.8,
      openRate: 82.1
    },
    {
      id: 4,
      name: "Training Invitation",
      type: "invitation",
      category: "Training",
      channels: ["push", "email"],
      subject: "New Training Program Available",
      content: "You're invited to join our new training program: {course_name}. Duration: {duration}. Starting: {start_date}",
      variables: ["course_name", "duration", "start_date"],
      status: "Active",
      usage: 89,
      lastUsed: "2024-10-11T16:20:00",
      deliveryRate: 94.3,
      openRate: 71.5
    },
    {
      id: 5,
      name: "System Maintenance",
      type: "maintenance",
      category: "System",
      channels: ["push", "email"],
      subject: "Scheduled System Maintenance",
      content: "System maintenance scheduled for {maintenance_date} from {start_time} to {end_time}. Services affected: {affected_services}",
      variables: ["maintenance_date", "start_time", "end_time", "affected_services"],
      status: "Draft",
      usage: 12,
      lastUsed: "2024-10-10T14:30:00",
      deliveryRate: 99.1,
      openRate: 88.7
    }
  ];

  const notificationCampaigns = [
    {
      id: 1,
      name: "October Health Awareness Campaign",
      type: "marketing",
      status: "Active",
      targetAudience: "All Patients",
      recipients: 2847,
      sent: 2847,
      delivered: 2756,
      opened: 1987,
      clicked: 456,
      scheduledDate: "2024-10-01T08:00:00",
      completionDate: "2024-10-01T08:15:00",
      channels: ["email", "push"],
      budget: 15000,
      spent: 12340,
      roi: "234%"
    },
    {
      id: 2,
      name: "CHW Training Enrollment Drive",
      type: "educational",
      status: "Completed",
      targetAudience: "Community Health Workers",
      recipients: 456,
      sent: 456,
      delivered: 445,
      opened: 387,
      clicked: 123,
      scheduledDate: "2024-09-25T10:00:00",
      completionDate: "2024-09-25T10:08:00",
      channels: ["sms", "email"],
      budget: 8000,
      spent: 7200,
      roi: "187%"
    },
    {
      id: 3,
      name: "Insurance Policy Updates",
      type: "informational",
      status: "Scheduled",
      targetAudience: "Insured Patients",
      recipients: 1876,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      scheduledDate: "2024-10-15T14:00:00",
      completionDate: null,
      channels: ["email", "push", "sms"],
      budget: 12000,
      spent: 0,
      roi: "0%"
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      type: "emergency",
      title: "Emergency Ambulance Dispatch",
      message: "Ambulance KCA 001A dispatched to Kiambu County Hospital for cardiac emergency",
      timestamp: "2024-10-12T14:23:00",
      priority: "high",
      status: "delivered",
      recipient: "Emergency Response Team",
      channel: "push",
      read: true,
      category: "Emergency"
    },
    {
      id: 2,
      type: "appointment",
      title: "Telemedicine Session Started",
      message: "Dr. Sarah Mwangi has started telemedicine session with patient PT-456",
      timestamp: "2024-10-12T14:15:00",
      priority: "medium",
      status: "delivered",
      recipient: "Medical Staff",
      channel: "push",
      read: true,
      category: "Healthcare"
    },
    {
      id: 3,
      type: "insurance",
      title: "NHIF Claim Processed",
      message: "Insurance claim CLM-2024-789 approved for KES 25,000",
      timestamp: "2024-10-12T13:45:00",
      priority: "low",
      status: "delivered",
      recipient: "John Kamau (PT-789)",
      channel: "sms",
      read: false,
      category: "Insurance"
    },
    {
      id: 4,
      type: "training",
      title: "Training Session Reminder",
      message: "CHW Mental Health Training starts in 1 hour at Nairobi Training Center",
      timestamp: "2024-10-12T13:30:00",
      priority: "medium",
      status: "delivered",
      recipient: "CHW Group A (23 members)",
      channel: "email",
      read: true,
      category: "Training"
    },
    {
      id: 5,
      type: "system",
      title: "System Backup Completed",
      message: "Daily system backup completed successfully. Size: 2.3GB",
      timestamp: "2024-10-12T12:00:00",
      priority: "low",
      status: "delivered",
      recipient: "IT Administrators",
      channel: "email",
      read: false,
      category: "System"
    }
  ];

  const notificationChannels = [
    {
      id: 1,
      name: "Push Notifications",
      icon: Bell,
      enabled: true,
      users: 2234,
      deliveryRate: 98.2,
      avgOpenRate: 85.4,
      cost: "Free",
      status: "Active",
      lastTest: "2024-10-12T10:00:00",
      testResult: "Success"
    },
    {
      id: 2,
      name: "Email Notifications",
      icon: Mail,
      enabled: true,
      users: 2598,
      deliveryRate: 96.8,
      avgOpenRate: 72.3,
      cost: "KES 0.50/email",
      status: "Active",
      lastTest: "2024-10-12T09:30:00",
      testResult: "Success"
    },
    {
      id: 3,
      name: "SMS Notifications",
      icon: MessageSquare,
      enabled: true,
      users: 1876,
      deliveryRate: 99.1,
      avgOpenRate: 95.7,
      cost: "KES 2.00/SMS",
      status: "Active",
      lastTest: "2024-10-12T09:00:00",
      testResult: "Success"
    },
    {
      id: 4,
      name: "In-App Notifications",
      icon: Smartphone,
      enabled: true,
      users: 2847,
      deliveryRate: 100.0,
      avgOpenRate: 78.9,
      cost: "Free",
      status: "Active",
      lastTest: "2024-10-12T08:45:00",
      testResult: "Success"
    },
    {
      id: 5,
      name: "WhatsApp Business",
      icon: MessageCircle,
      enabled: false,
      users: 0,
      deliveryRate: 0,
      avgOpenRate: 0,
      cost: "KES 1.50/message",
      status: "Pending Setup",
      lastTest: null,
      testResult: null
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Bell },
    { id: 'live', label: 'Live Notifications', icon: Radio },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'channels', label: 'Channels', icon: Globe },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 border-red-200';
      case 'medium': return 'text-yellow-600 border-yellow-200';
      case 'low': return 'text-green-600 border-green-200';
      default: return 'text-gray-600 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 ';
      case 'delivered': return 'text-green-600';
      case 'sent': return 'text-blue-600 ';
      case 'scheduled': return 'text-yellow-600';
      case 'draft': return 'text-gray-600';
      case 'failed': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      case 'completed': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'emergency': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'appointment': return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'insurance': return <Shield className="w-4 h-4 text-purple-600" />;
      case 'training': return <BookOpen className="w-4 h-4 text-green-600" />;
      case 'system': return <Settings className="w-4 h-4 text-gray-600" />;
      case 'reminder': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'update': return <Info className="w-4 h-4 text-blue-600" />;
      case 'invitation': return <UserPlus className="w-4 h-4 text-green-600" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-orange-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  // Render Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Sent</p>
              <p className="text-3xl font-bold text-gray-900">{notificationOverview.totalSent.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12.5% this month</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Send className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Delivery Rate</p>
              <p className="text-3xl font-bold text-gray-900">{notificationOverview.deliveryRate}%</p>
              <p className="text-sm text-green-600 mt-1">+0.8% improvement</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Open Rate</p>
              <p className="text-3xl font-bold text-gray-900">{notificationOverview.openRate}%</p>
              <p className="text-sm text-yellow-600 mt-1">-2.1% from last month</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">{notificationOverview.activeUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+156 new users</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Channel Performance</h3>
          <div className="space-y-4">
            {notificationChannels.filter(channel => channel.enabled).map((channel) => {
              const Icon = channel.icon;
              return (
                <div key={channel.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Icon className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{channel.name}</p>
                      <p className="text-sm text-gray-500">{channel.users.toLocaleString()} users</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{channel.deliveryRate}%</p>
                    <p className="text-sm text-gray-500">delivery rate</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentNotifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-500 truncate">{notification.message}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}>
                      {notification.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
            <Plus className="w-5 h-5 text-blue-600 mr-2" />
            Create Template
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
            <Send className="w-5 h-5 text-green-600 mr-2" />
            Send Campaign
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
            View Analytics
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5 text-gray-600 mr-2" />
            Manage Settings
          </button>
        </div>
      </div>
    </div>
  );

  // Render Live Notifications Tab
  const renderLiveNotifications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Live Notification Feed</h3>
          <p className="text-sm text-gray-600">Real-time notifications across all MediLink systems</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Real-time updates</span>
            <button
              onClick={() => setRealTimeEnabled(!realTimeEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                realTimeEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  realTimeEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Live Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium text-gray-900">System Status</span>
            </div>
            <span className="text-sm text-green-600">Online</span>
          </div>
        </div>
        <div className="border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium text-gray-900">Push Service</span>
            </div>
            <span className="text-sm text-blue-600">Active</span>
          </div>
        </div>
        <div className="border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium text-gray-900">Email Service</span>
            </div>
            <span className="text-sm text-purple-600">Active</span>
          </div>
        </div>
        <div className="border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium text-gray-900">SMS Gateway</span>
            </div>
            <span className="text-sm text-yellow-600">Active</span>
          </div>
        </div>
      </div>

      {/* Live Notifications Stream */}
      <div className="shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">Live Notification Stream</h4>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {liveNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {liveNotifications.map((notification) => (
                <div key={notification.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 capitalize">{notification.type} Alert</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                          <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Radio className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No live notifications at the moment</p>
              <p className="text-sm text-gray-400 mt-1">Enable real-time updates to see notifications as they happen</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render Templates Tab
  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Notification Templates</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {notificationTemplates.map((template) => (
          <div key={template.id} className="shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {getTypeIcon(template.type)}
                <h4 className="font-semibold text-gray-900 ml-2">{template.name}</h4>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(template.status)}`}>
                {template.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Category:</p>
                <p className="text-sm font-medium text-gray-900">{template.category}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Channels:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {template.channels.map((channel) => (
                    <span key={channel} className="px-2 py-1 text-xs text-blue-800 rounded-full">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Subject:</p>
                <p className="text-sm font-medium text-gray-900">{template.subject}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Content Preview:</p>
                <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg mt-1 line-clamp-3">
                  {template.content}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-gray-900">{template.usage}</p>
                  <p className="text-xs text-gray-500">Times Used</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{template.deliveryRate}%</p>
                  <p className="text-xs text-gray-500">Delivery Rate</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
              <button className="text-blue-600 hover:text-blue-700 flex items-center text-sm">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </button>
              <button className="text-green-600 hover:text-green-700 flex items-center text-sm">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button className="text-purple-600 hover:text-purple-700 flex items-center text-sm">
                <Send className="w-4 h-4 mr-1" />
                Use
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Campaigns Tab
  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notification Campaigns</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </button>
      </div>

      <div className="space-y-6">
        {notificationCampaigns.map((campaign) => (
          <div key={campaign.id} className="border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                <p className="text-sm text-gray-600 capitalize">{campaign.type} • {campaign.targetAudience}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{campaign.recipients.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Recipients</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{campaign.delivered.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Delivered</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{campaign.opened.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Opened</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{campaign.clicked.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Clicked</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Performance Metrics</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Delivery Rate:</span>
                    <span className="text-sm font-medium">
                      {campaign.sent > 0 ? ((campaign.delivered / campaign.sent) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Open Rate:</span>
                    <span className="text-sm font-medium">
                      {campaign.delivered > 0 ? ((campaign.opened / campaign.delivered) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Click Rate:</span>
                    <span className="text-sm font-medium">
                      {campaign.opened > 0 ? ((campaign.clicked / campaign.opened) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Campaign Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Scheduled:</span>
                    <span className="text-sm font-medium">
                      {new Date(campaign.scheduledDate).toLocaleDateString()}
                    </span>
                  </div>
                  {campaign.completionDate && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Completed:</span>
                      <span className="text-sm font-medium">
                        {new Date(campaign.completionDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Channels:</span>
                    <div className="flex flex-wrap gap-1">
                      {campaign.channels.map((channel) => (
                        <span key={channel} className="px-1 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Budget & ROI</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Budget:</span>
                    <span className="text-sm font-medium">KES {campaign.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Spent:</span>
                    <span className="text-sm font-medium">KES {campaign.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ROI:</span>
                    <span className="text-sm font-medium text-green-600">{campaign.roi}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
              <button className="text-blue-600 hover:text-blue-700 flex items-center text-sm">
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </button>
              <button className="text-green-600 hover:text-green-700 flex items-center text-sm">
                <BarChart3 className="w-4 h-4 mr-1" />
                Analytics
              </button>
              {campaign.status === 'Active' && (
                <button className="text-red-600 hover:text-red-700 flex items-center text-sm">
                  <Pause className="w-4 h-4 mr-1" />
                  Pause
                </button>
              )}
              {campaign.status === 'Scheduled' && (
                <button className="text-purple-600 hover:text-purple-700 flex items-center text-sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Channels Tab
  const renderChannels = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Notification Channels</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Channel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {notificationChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <div key={channel.id} className="border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Icon className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{channel.name}</h4>
                    <p className="text-sm text-gray-500">{channel.users.toLocaleString()} active users</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(channel.status)}`}>
                    {channel.status}
                  </span>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      channel.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        channel.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{channel.deliveryRate}%</p>
                  <p className="text-sm text-gray-600">Delivery Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{channel.avgOpenRate}%</p>
                  <p className="text-sm text-gray-600">Avg Open Rate</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cost per message:</span>
                  <span className="text-sm font-medium">{channel.cost}</span>
                </div>
                {channel.lastTest && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last test:</span>
                    <span className="text-sm font-medium">
                      {new Date(channel.lastTest).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {channel.testResult && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Test result:</span>
                    <span className={`text-sm font-medium ${channel.testResult === 'Success' ? 'text-green-600' : 'text-red-600'}`}>
                      {channel.testResult}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                <button className="text-blue-600 hover:text-blue-700 flex items-center text-sm">
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </button>
                <button className="text-green-600 hover:text-green-700 flex items-center text-sm">
                  <Zap className="w-4 h-4 mr-1" />
                  Test
                </button>
                <button className="text-purple-600 hover:text-purple-700 flex items-center text-sm">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Analytics
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Render Analytics Tab (placeholder)
  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Notification Analytics</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Delivery Trends</h4>
          <div className="text-center py-12 text-gray-500">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p>Analytics chart placeholder</p>
            <p className="text-sm">Integration with chart library needed</p>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Channel Performance</h4>
          <div className="text-center py-12 text-gray-500">
            <PieChart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p>Channel performance chart</p>
            <p className="text-sm">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Automation Tab (placeholder)
  const renderAutomation = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Notification Automation</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <Zap className="w-8 h-8 text-blue-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Emergency Alerts</h4>
          <p className="text-sm text-gray-600 mb-4">Automatically send emergency notifications based on system triggers</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600">Active</span>
            <button className="text-blue-600 hover:text-blue-700 text-sm">Configure</button>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <Calendar className="w-8 h-8 text-green-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Appointment Reminders</h4>
          <p className="text-sm text-gray-600 mb-4">Send automated reminders 24h and 2h before appointments</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600">Active</span>
            <button className="text-blue-600 hover:text-blue-700 text-sm">Configure</button>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <UserPlus className="w-8 h-8 text-purple-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Welcome Series</h4>
          <p className="text-sm text-gray-600 mb-4">Onboard new patients with a series of welcome messages</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-yellow-600">Draft</span>
            <button className="text-blue-600 hover:text-blue-700 text-sm">Configure</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Settings Tab (placeholder)
  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Enable Push Notifications</p>
                <p className="text-sm text-gray-500">Allow push notifications to be sent</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Send notifications via email</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Send notifications via SMS</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" defaultChecked />
            </div>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Delivery Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Send Time</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>8:00 AM</option>
                <option>9:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Retry Attempts</label>
              <input
                type="number"
                min="1"
                max="5"
                defaultValue="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limit (per minute)</label>
              <input
                type="number"
                defaultValue="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="">
        
        <main className="">
          <div className="">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Management</h1>
              <p className="text-gray-600">Comprehensive notification system for MediLink healthcare platform</p>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'live' && renderLiveNotifications()}
            {activeTab === 'templates' && renderTemplates()}
            {activeTab === 'campaigns' && renderCampaigns()}
            {activeTab === 'channels' && renderChannels()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'automation' && renderAutomation()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationManagement;