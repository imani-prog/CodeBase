import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Search,
  RefreshCw,
  Download,
  Clock,
  User,
  Server,
  Database,
  Shield,
  HardDrive,
  Cpu,
  Monitor,
  Eye,
  MoreHorizontal,
  Edit,
  Trash2,
  LogIn,
  LogOut,
  FileText,
  Upload,
  Link,
  Filter,
  Calendar,
  Globe,
  Smartphone,
  MapPin,
  Plus,
  Hash,
  Key
} from 'lucide-react';
import Pagination from '../../Components/Admin/Pagination';

const SystemLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [selectedEntityType, setSelectedEntityType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const refreshInterval = 30; // seconds
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Event types 
  const eventTypes = ['LOGIN', 'LOGOUT', 'READ', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT', 'INTEGRATION'];
  
  // Entity types that can be audited
  const entityTypes = ['PATIENT', 'CHW', 'HOSPITAL', 'APPOINTMENT', 'INSURANCE_CLAIM', 'USER', 'REPORT', 'AMBULANCE_DISPATCH'];
  
  // Status types 
  const statusTypes = ['SUCCESS', 'FAILURE'];

  // Comprehensive audit logs
  const auditLogs = [
    {
      id: 1,
      eventType: 'LOGIN',
      entityType: 'USER',
      entityId: 'USR-001',
      userId: 1,
      userName: 'Dr. Sarah Mitchell',
      userRole: 'ADMIN',
      ipAddress: '192.168.1.100',
      sessionId: 'sess_abc123xyz',
      correlationId: 'corr_login_001',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'User authentication',
        location: 'Nairobi, Kenya',
        deviceType: 'Desktop',
        browser: 'Chrome 120'
      }),
      performedAt: '2025-12-27T09:15:32+03:00'
    },
    {
      id: 2,
      eventType: 'UPDATE',
      entityType: 'PATIENT',
      entityId: 'PT-2023-001234',
      userId: 2,
      userName: 'Dr. Kevin Murage',
      userRole: 'DOCTOR',
      ipAddress: '192.168.1.105',
      sessionId: 'sess_def456uvw',
      correlationId: 'corr_update_pat_001',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.2',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Updated patient medical records',
        changedFields: ['bloodPressure', 'medications', 'lastVisitDate'],
        previousValues: { bloodPressure: '140/90', medications: 'Amlodipine 5mg' },
        newValues: { bloodPressure: '130/85', medications: 'Amlodipine 10mg' },
        sensitiveDataRedacted: true
      }),
      performedAt: '2025-12-27T09:45:18+03:00'
    },
    {
      id: 3,
      eventType: 'CREATE',
      entityType: 'APPOINTMENT',
      entityId: 'APT-2025-00456',
      userId: 3,
      userName: 'Grace Achieng',
      userRole: 'CHW',
      ipAddress: '10.0.0.45',
      sessionId: 'sess_ghi789rst',
      correlationId: 'corr_create_apt_001',
      userAgent: 'MediLink Mobile App/2.1.0 (Android 13)',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Created new appointment',
        appointmentType: 'CONSULTATION',
        patientId: 'PT-2023-005678',
        hospitalId: 'HS001',
        scheduledTime: '2025-12-28T14:00:00'
      }),
      performedAt: '2025-12-27T10:12:45+03:00'
    },
    {
      id: 4,
      eventType: 'DELETE',
      entityType: 'USER',
      entityId: 'USR-045',
      userId: 1,
      userName: 'Dr. Sarah Mitchell',
      userRole: 'ADMIN',
      ipAddress: '192.168.1.100',
      sessionId: 'sess_abc123xyz',
      correlationId: 'corr_delete_usr_001',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Deleted inactive user account',
        reason: 'Account termination requested',
        dataRetentionApplied: true
      }),
      performedAt: '2025-12-27T10:30:22+03:00'
    },
    {
      id: 5,
      eventType: 'EXPORT',
      entityType: 'REPORT',
      entityId: 'RPT-FIN-2025-12',
      userId: 1,
      userName: 'Dr. Sarah Mitchell',
      userRole: 'ADMIN',
      ipAddress: '192.168.1.100',
      sessionId: 'sess_abc123xyz',
      correlationId: 'corr_export_rpt_001',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Exported financial report',
        reportType: 'FINANCIAL',
        format: 'PDF',
        recordCount: 1847,
        fileSize: '2.3MB',
        periodStart: '2025-12-01',
        periodEnd: '2025-12-27'
      }),
      performedAt: '2025-12-27T11:05:10+03:00'
    },
    {
      id: 6,
      eventType: 'UPDATE',
      entityType: 'INSURANCE_CLAIM',
      entityId: 'CLM-2025-08923',
      userId: 4,
      userName: 'Peter Njoroge',
      userRole: 'INSURANCE_OFFICER',
      ipAddress: '172.16.0.88',
      sessionId: 'sess_jkl012mno',
      correlationId: 'corr_update_clm_001',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/120.0.0.0',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Updated claim status',
        previousStatus: 'UNDER_REVIEW',
        newStatus: 'APPROVED',
        approvedAmount: 45000,
        claimAmount: 50000,
        denialReason: null
      }),
      performedAt: '2025-12-27T11:20:35+03:00'
    },
    {
      id: 7,
      eventType: 'READ',
      entityType: 'PATIENT',
      entityId: 'PT-2023-001234',
      userId: 2,
      userName: 'Dr. Kevin Murage',
      userRole: 'DOCTOR',
      ipAddress: '192.168.1.105',
      sessionId: 'sess_def456uvw',
      correlationId: 'corr_read_pat_001',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.2',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Accessed patient medical records',
        accessReason: 'Scheduled consultation',
        viewedSections: ['demographics', 'medicalHistory', 'prescriptions']
      }),
      performedAt: '2025-12-27T12:15:08+03:00'
    },
    {
      id: 8,
      eventType: 'INTEGRATION',
      entityType: 'INSURANCE_CLAIM',
      entityId: 'CLM-2025-08924',
      userId: null,
      userName: 'System Integration',
      userRole: 'SYSTEM',
      ipAddress: '10.10.10.5',
      sessionId: 'sess_integration_001',
      correlationId: 'corr_int_nhif_001',
      userAgent: 'MediLink Integration Service/1.0',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Synchronized claim with NHIF',
        integrationPartner: 'NHIF',
        apiEndpoint: '/api/v1/claims/submit',
        responseCode: 200,
        claimNumber: 'NHIF-2025-123456',
        syncDuration: '1.2s'
      }),
      performedAt: '2025-12-27T12:45:55+03:00'
    },
    {
      id: 9,
      eventType: 'LOGIN',
      entityType: 'USER',
      entityId: 'USR-012',
      userId: 5,
      userName: 'Lucy Wanjiku',
      userRole: 'CHW',
      ipAddress: '10.0.0.67',
      sessionId: 'sess_pqr345stu',
      correlationId: 'corr_login_002',
      userAgent: 'MediLink Mobile App/2.1.0 (iOS 17.2)',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Mobile app login',
        location: 'Kisumu, Kenya',
        deviceType: 'Mobile',
        deviceModel: 'iPhone 14'
      }),
      performedAt: '2025-12-27T13:10:22+03:00'
    },
    {
      id: 10,
      eventType: 'CREATE',
      entityType: 'AMBULANCE_DISPATCH',
      entityId: 'AMD-2025-00178',
      userId: 6,
      userName: 'Emergency Dispatcher',
      userRole: 'DISPATCHER',
      ipAddress: '192.168.1.120',
      sessionId: 'sess_vwx678yza',
      correlationId: 'corr_dispatch_001',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/121.0',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Created emergency ambulance dispatch',
        priority: 'CRITICAL',
        patientLocation: 'Kibera, Nairobi',
        hospitalDestination: 'HS001',
        estimatedArrival: '15 minutes',
        incidentType: 'CARDIAC_EMERGENCY'
      }),
      performedAt: '2025-12-27T13:35:40+03:00'
    },
    {
      id: 11,
      eventType: 'UPDATE',
      entityType: 'HOSPITAL',
      entityId: 'HS003',
      userId: 1,
      userName: 'Dr. Sarah Mitchell',
      userRole: 'ADMIN',
      ipAddress: '192.168.1.100',
      sessionId: 'sess_abc123xyz',
      correlationId: 'corr_update_hos_001',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Updated hospital capacity information',
        changedFields: ['numberOfBeds', 'numberOfICUBeds', 'numberOfAmbulances'],
        previousValues: { numberOfBeds: 420, numberOfICUBeds: 18, numberOfAmbulances: 4 },
        newValues: { numberOfBeds: 450, numberOfICUBeds: 22, numberOfAmbulances: 5 }
      }),
      performedAt: '2025-12-27T14:05:15+03:00'
    },
    {
      id: 12,
      eventType: 'DELETE',
      entityType: 'APPOINTMENT',
      entityId: 'APT-2025-00345',
      userId: 3,
      userName: 'Grace Achieng',
      userRole: 'CHW',
      ipAddress: '10.0.0.45',
      sessionId: 'sess_ghi789rst',
      correlationId: 'corr_delete_apt_001',
      userAgent: 'MediLink Mobile App/2.1.0 (Android 13)',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Canceled appointment',
        reason: 'Patient rescheduled',
        cancellationBy: 'CHW',
        refundApplicable: false
      }),
      performedAt: '2025-12-27T14:30:50+03:00'
    },
    {
      id: 13,
      eventType: 'LOGIN',
      entityType: 'USER',
      entityId: 'USR-099',
      userId: 99,
      userName: 'Unknown User',
      userRole: 'UNKNOWN',
      ipAddress: '203.0.113.45',
      sessionId: 'sess_failed_001',
      correlationId: 'corr_login_fail_001',
      userAgent: 'curl/7.68.0',
      status: 'FAILURE',
      failureReason: 'Invalid credentials - multiple failed login attempts',
      details: JSON.stringify({
        action: 'Failed login attempt',
        attemptCount: 5,
        accountLocked: true,
        suspiciousActivity: true,
        ipBlacklisted: false
      }),
      performedAt: '2025-12-27T15:02:33+03:00'
    },
    {
      id: 14,
      eventType: 'EXPORT',
      entityType: 'PATIENT',
      entityId: 'BULK-EXPORT-2025-12-27',
      userId: 1,
      userName: 'Dr. Sarah Mitchell',
      userRole: 'ADMIN',
      ipAddress: '192.168.1.100',
      sessionId: 'sess_abc123xyz',
      correlationId: 'corr_export_bulk_001',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Bulk patient data export',
        format: 'CSV',
        recordCount: 2847,
        fileSize: '15.8MB',
        dataFields: ['demographics', 'contactInfo', 'insuranceInfo'],
        sensitiveDataRedacted: true,
        exportReason: 'Monthly reporting'
      }),
      performedAt: '2025-12-27T15:25:12+03:00'
    },
    {
      id: 15,
      eventType: 'INTEGRATION',
      entityType: 'INSURANCE_CLAIM',
      entityId: 'CLM-2025-08925',
      userId: null,
      userName: 'System Integration',
      userRole: 'SYSTEM',
      ipAddress: '10.10.10.5',
      sessionId: 'sess_integration_002',
      correlationId: 'corr_int_sha_001',
      userAgent: 'MediLink Integration Service/1.0',
      status: 'FAILURE',
      failureReason: 'Connection timeout to SHA API - Service unavailable',
      details: JSON.stringify({
        action: 'Failed claim synchronization with SHA',
        integrationPartner: 'SHA',
        apiEndpoint: '/api/v2/claims/submit',
        errorCode: 'TIMEOUT',
        retryScheduled: true,
        retryAttempt: 1,
        maxRetries: 3
      }),
      performedAt: '2025-12-27T16:10:45+03:00'
    },
    {
      id: 16,
      eventType: 'UPDATE',
      entityType: 'CHW',
      entityId: 'CHW-001',
      userId: 1,
      userName: 'Dr. Sarah Mitchell',
      userRole: 'ADMIN',
      ipAddress: '192.168.1.100',
      sessionId: 'sess_abc123xyz',
      correlationId: 'corr_update_chw_001',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'Updated CHW status and location',
        changedFields: ['status', 'latitude', 'longitude'],
        previousValues: { status: 'BUSY', latitude: -1.286389, longitude: 36.817223 },
        newValues: { status: 'AVAILABLE', latitude: -1.289234, longitude: 36.821456 }
      }),
      performedAt: '2025-12-27T16:45:20+03:00'
    },
    {
      id: 17,
      eventType: 'LOGOUT',
      entityType: 'USER',
      entityId: 'USR-001',
      userId: 1,
      userName: 'Dr. Sarah Mitchell',
      userRole: 'ADMIN',
      ipAddress: '192.168.1.100',
      sessionId: 'sess_abc123xyz',
      correlationId: 'corr_logout_001',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      status: 'SUCCESS',
      failureReason: null,
      details: JSON.stringify({
        action: 'User logout',
        sessionDuration: '8h 32m',
        actionsPerformed: 47,
        dataAccessCount: 12
      }),
      performedAt: '2025-12-27T17:47:15+03:00'
    }
  ];

  // Filtering
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm) ||
      (log.failureReason && log.failureReason.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesEventType = selectedEventType === 'all' || log.eventType === selectedEventType;
    const matchesEntityType = selectedEntityType === 'all' || log.entityType === selectedEntityType;
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    
    return matchesSearch && matchesEventType && matchesEntityType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = {
    total: auditLogs.length,
    success: auditLogs.filter(l => l.status === 'SUCCESS').length,
    failure: auditLogs.filter(l => l.status === 'FAILURE').length,
    loginAttempts: auditLogs.filter(l => l.eventType === 'LOGIN').length,
    dataExports: auditLogs.filter(l => l.eventType === 'EXPORT').length,
    uniqueUsers: new Set(auditLogs.map(l => l.userId).filter(Boolean)).size
  };

  // const getEventIcon = (eventType) => {
  //   switch (eventType) {
  //     case 'LOGIN': return <LogIn className="w-5 h-5 text-blue-600" />;
  //     case 'LOGOUT': return <LogOut className="w-5 h-5 text-gray-600" />;
  //     case 'CREATE': return <Plus className="w-5 h-5 text-green-600" />;
  //     case 'UPDATE': return <Edit className="w-5 h-5 text-blue-600" />;
  //     case 'DELETE': return <Trash2 className="w-5 h-5 text-red-600" />;
  //     case 'READ': return <Eye className="w-5 h-5 text-blue-500" />;
  //     case 'EXPORT': return <Download className="w-5 h-5 text-blue-600" />;
  //     case 'INTEGRATION': return <Link className="w-5 h-5 text-blue-600" />;
  //     default: return <Activity className="w-5 h-5 text-gray-500" />;
  //   }
  // };

  const getStatusBadge = (status) => {
    if (status === 'SUCCESS') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Success
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-red-800">
        <XCircle className="w-3 h-3 mr-1" />
        Failure
      </span>
    );
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  const refreshLogs = () => {
    console.log('Refreshing audit logs...');
    
  };

  const exportLogs = () => {
    console.log('Exporting audit logs...');
    
  };

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(refreshLogs, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <div className="">
             
              <div>
                <h1 className="text-3xl font-bold">Audit Logs</h1>
                <p className="mt-1">Comprehensive system audit trail and activity monitoring</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
            <div className="border border-gray-200 bg-white p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Total Events</span>
              </div>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>

            <div className="border border-gray-200 bg-white p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Success</span>
              </div>
              <p className="text-2xl font-bold">{stats.success}</p>
            </div>
            <div className="border border-gray-200 bg-white p-4">
              <div className="flex items-center space-x-2 mb-2">
                <XCircle className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Failures</span>
              </div>
              <p className="text-2xl font-bold">{stats.failure}</p>
            </div>
            <div className="border border-gray-200 bg-white p-4">
              <div className="flex items-center space-x-2 mb-2">
                <LogIn className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Logins</span>
              </div>
              <p className="text-2xl font-bold">{stats.loginAttempts}</p>
            </div>
            <div className="border border-gray-200 bg-white p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Download className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Exports</span>
              </div>
              <p className="text-2xl font-bold">{stats.dataExports}</p>
            </div>
            <div className="border border-gray-200 bg-white p-4">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Active Users</span>
              </div>
              <p className="text-2xl font-bold">{stats.uniqueUsers}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {/* Filters */}
        <div className=" p-6 mb-8">
          <div className="flex flex-col space-y-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by user, event type, entity, IP address, or failure reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent "
              />
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedEventType}
                  onChange={(e) => setSelectedEventType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                >
                  <option value="all">All Events ({auditLogs.length})</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>
                      {type} ({auditLogs.filter(l => l.eventType === type).length})
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={selectedEntityType}
                onChange={(e) => setSelectedEntityType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparentfocus:outline-none focus:ring-2"
              >
                <option value="all">All Entities</option>
                {entityTypes.map(type => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              >
                <option value="all">All Status</option>
                {statusTypes.map(status => (
                  <option key={status} value={status}>
                    {status} ({auditLogs.filter(l => l.status === status).length})
                  </option>
                ))}
              </select>

              <div className="flex-1"></div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="autoRefresh"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="autoRefresh" className="text-sm text-gray-600">
                    Auto ({refreshInterval}s)
                  </label>
                </div>
                <button
                  onClick={refreshLogs}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                </button>
                <button
                  onClick={exportLogs}
                  className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" /> Export
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Showing {paginatedLogs.length} of {filteredLogs.length} audit logs
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Event
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Entity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    IP Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Session
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {paginatedLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {/* {getEventIcon(log.eventType)} */}
                        <div>
                          <p className="text-sm font-bold">{log.eventType}</p>
                          <p className="text-xs text-gray-500">{log.userRole}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDateTime(log.performedAt)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-bold">{log.userName}</p>
                          <p className="text-xs text-gray-500">ID: {log.userId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold">{log.entityType}</p>
                        <p className="text-xs text-gray-500">ID: {log.entityId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm font-semibold">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span>{log.ipAddress}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm font-bold">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <span className="truncate max-w-[100px]" title={log.sessionId}>
                          {log.sessionId}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(log.status)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetails(log)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium mb-2">No audit logs match your filters</p>
              <p className="text-gray-400 text-sm mb-6">Try adjusting your search criteria or clear all filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedEventType('all');
                  setSelectedEntityType('all');
                  setSelectedStatus('all');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredLogs.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalItems={filteredLogs.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            itemName="audit logs"
          />
        )}

        {/* Detail Modal */}
        {showDetailsModal && selectedLog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="top-0 px-8 py-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* {getEventIcon(selectedLog.eventType)} */}
                  <div>
                    <h2 className="text-2xl font-bold">{selectedLog.eventType} Event</h2>
                    <p className="text-sm mt-1">Audit Log Details - ID: {selectedLog.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className=" font-bold hover:text-red-600 cursor-pointer"
                >
                  <XCircle className="w-8 h-8" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Status Banner */}
                <div className={`p-4 mb-6 ${
                  selectedLog.status === 'SUCCESS' 
                    ? 'border-green-200' 
                    : 'border border-red-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(selectedLog.status)}
                      <span className={`text-lg font-semibold ${
                        selectedLog.status === 'SUCCESS' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {selectedLog.status === 'SUCCESS' ? 'Operation Successful' : 'Operation Failed'}
                      </span>
                    </div>
                    <span className="">
                      {formatDateTime(selectedLog.performedAt)}
                    </span>
                  </div>
                  {selectedLog.failureReason && (
                    <div className="mt-3 pt-3 border-t border-red-200">
                      <p className="text-sm font-medium text-red-900 mb-1">Failure Reason:</p>
                      <p className="text-sm text-red-700">{selectedLog.failureReason}</p>
                    </div>
                  )}
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* User Information */}
                  <div className=" p-5 border border-gray-200 shadow-md">
                    <h3 className="text-sm font-semibold mb-4 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      User Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium">User Name</p>
                        <p className="text-sm  font-bold">{selectedLog.userName}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium">User ID</p>
                        <p className="text-sm">{selectedLog.userId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Role</p>
                        <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                          {selectedLog.userRole}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Entity Information */}
                  <div className="p-5 border border-gray-200 shadow-md">
                    <h3 className="text-sm font-semibold mb-4 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Entity Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium">Entity Type</p>
                        <p className="text-sm font-bold">{selectedLog.entityType}</p>
                      </div>
                      <div>
                        <p className="text-xs  font-medium">Entity ID</p>
                        <p className="text-sm font-bold">{selectedLog.entityId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Network Information */}
                  <div className=" p-5 border border-gray-200 shadow-md">
                    <h3 className="text-sm font-semibold mb-4 flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Network Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium">IP Address</p>
                        <p className="text-sm font-mono">{selectedLog.ipAddress}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium">Session ID</p>
                        <p className="text-sm font-mono truncate">{selectedLog.sessionId}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium">Correlation ID</p>
                        <p className="text-sm font-mono truncate">{selectedLog.correlationId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Device Information */}
                  <div className="p-5 border border-gray-200 shadow-md">
                    <h3 className="text-sm font-semibold mb-4 flex items-center">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Device Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium">User Agent</p>
                        <p className="text-sm text-gray-700 break-words">{selectedLog.userAgent}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                {selectedLog.details && (
                  <div className="bg-gray-50 p-5 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Event Details
                    </h3>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(JSON.parse(selectedLog.details), null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SystemLogs;
