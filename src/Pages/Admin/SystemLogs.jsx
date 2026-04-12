import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Activity,
  CheckCircle,
  XCircle,
  Search,
  RefreshCw,
  Download,
  User,
  LogIn,
  Filter,
  Calendar,
  Globe,
  Smartphone,
  Eye,
  FileText
} from 'lucide-react';
import Pagination from '../../Components/Admin/Pagination';
import { auditLogService } from '../../Services/domain/auditLogService.js';

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

  const [auditLogs, setAuditLogs] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);


  // Event types
  const eventTypes = ['LOGIN', 'LOGOUT', 'READ', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT', 'INTEGRATION'];

  // Entity types that can be audited
  const entityTypes = ['PATIENT', 'CHW', 'HOSPITAL', 'APPOINTMENT', 'INSURANCE_CLAIM', 'USER', 'REPORT', 'AMBULANCE_DISPATCH'];

  // Status types
  const statusTypes = ['SUCCESS', 'FAILURE'];

  const fetchLogs = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setErrorMessage('');

      const params = {
        page: Math.max(0, currentPage - 1),
        size: itemsPerPage,
        sort: 'eventTime,desc',
      };

      if (selectedEventType !== 'all') params.eventType = selectedEventType;
      if (selectedEntityType !== 'all') params.entityType = selectedEntityType;
      if (selectedStatus !== 'all') params.status = selectedStatus;
      if (searchTerm.trim()) params.searchTerm = searchTerm.trim();

      const data = await auditLogService.listAuditLogs(params);
      setAuditLogs(data.items || []);
      setTotalItems(Number.isFinite(data?.totalElements) ? data.totalElements : (data.items || []).length);
      setLastUpdatedAt(new Date().toISOString());
    } catch (error) {
      if (error?.status === 403) {
        setErrorMessage('Access denied to audit logs. Your account lacks permission for /api/audit-logs.');
      } else {
        setErrorMessage(error?.message || 'Unable to load audit logs');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, selectedEventType, selectedEntityType, selectedStatus]);

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedEventType, selectedEntityType, selectedStatus]);

  useEffect(() => {
    fetchLogs(false);
  }, [fetchLogs]);

  const refreshLogs = () => {
    fetchLogs(false);
  };

  useEffect(() => {
    if (!autoRefresh) return undefined;
    const interval = setInterval(() => {
      fetchLogs(true);
    }, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchLogs]);

  const exportLogs = () => {
    if (!auditLogs.length) return;

    const headers = [
      'id',
      'eventType',
      'entityType',
      'entityId',
      'userId',
      'username',
      'fullName',
      'userName',
      'userRole',
      'ipAddress',
      'correlationId',
      'integrationPartnerId',
      'status',
      'failureReason',
      'performedAt',
      'updatedAt'
    ];

    const escapeCsv = (value) => {
      if (value === null || value === undefined) return '';
      return `"${String(value).replace(/"/g, '""')}"`;
    };

    const rows = auditLogs.map((log) =>
      [
        log.id,
        log.eventType,
        log.entityType,
        log.entityId,
        log.userId,
        log.username,
        log.fullName,
        log.userName,
        log.userRole,
        log.ipAddress,
        log.correlationId,
        log.integrationPartnerId,
        log.status,
        log.failureReason,
        log.performedAt,
        log.updatedAt
      ]
        .map(escapeCsv)
        .join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `audit-logs-page-${currentPage}-${new Date().toISOString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  // Backend already returns filtered + paginated results
  const filteredLogs = auditLogs;
  const paginatedLogs = auditLogs;

  // Statistics (computed from loaded page; total comes from backend)
  const stats = useMemo(() => {
    return {
      total: totalItems,
      success: auditLogs.filter((l) => l.status === 'SUCCESS').length,
      failure: auditLogs.filter((l) => l.status === 'FAILURE').length,
      loginAttempts: auditLogs.filter((l) => l.eventType === 'LOGIN').length,
      dataExports: auditLogs.filter((l) => l.eventType === 'EXPORT').length,
      uniqueUsers: new Set(auditLogs.map((l) => l.userId).filter(Boolean)).size
    };
  }, [auditLogs, totalItems]);

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
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return String(dateString);
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

  const formatDetails = (details) => {
    if (!details) return '';
    try {
      return JSON.stringify(JSON.parse(details), null, 2);
    } catch {
      return String(details);
    }
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <div className="">
              <div>
                <h1 className="text-3xl font-bold">System Logs</h1>
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
                  <option value="all">All Events ({totalItems})</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type} ({auditLogs.filter((l) => l.eventType === type).length})
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={selectedEntityType}
                onChange={(e) => setSelectedEntityType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              >
                <option value="all">All Entities</option>
                {entityTypes.map((type) => (
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
                {statusTypes.map((status) => (
                  <option key={status} value={status}>
                    {status} ({auditLogs.filter((l) => l.status === status).length})
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
              Showing {paginatedLogs.length} of {totalItems} audit logs
              {lastUpdatedAt ? ` | Last updated ${formatDateTime(lastUpdatedAt)}` : ''}
            </div>
            {loading && <div className="text-sm text-gray-500">Loading audit logs...</div>}
            {errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">Event</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">Timestamp</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">Entity</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">IP Address</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
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
                          <p className="text-xs text-gray-500">username: {log.username || '-'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold">{log.entityType}</p>
                        <p className="text-xs text-gray-500">ID: {log.entityId || '-'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm font-semibold">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span>{log.ipAddress}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(log.status)}</td>
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

          {filteredLogs.length === 0 && !loading && (
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
        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
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
                <div
                  className={`p-4 mb-6 ${
                    selectedLog.status === 'SUCCESS' ? 'border-green-200' : 'border border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(selectedLog.status)}
                      <span
                        className={`text-lg font-semibold ${
                          selectedLog.status === 'SUCCESS' ? 'text-green-700' : 'text-red-700'
                        }`}
                      >
                        {selectedLog.status === 'SUCCESS' ? 'Operation Successful' : 'Operation Failed'}
                      </span>
                    </div>
                    <span className="">{formatDateTime(selectedLog.performedAt)}</span>
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
                        <p className="text-sm">{selectedLog.userId ?? '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium">Username</p>
                        <p className="text-sm font-bold">{selectedLog.username || '-'}</p>
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
                        <p className="text-xs font-medium">Correlation ID</p>
                        <p className="text-sm font-mono truncate">{selectedLog.correlationId || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium">Integration Partner ID</p>
                        <p className="text-sm font-mono truncate">{selectedLog.integrationPartnerId || '-'}</p>
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
                        {formatDetails(selectedLog.details)}
                      </pre>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 p-5 border border-gray-200 mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Complete Backend Payload
                  </h3>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(selectedLog, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={exportLogs}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
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
};

export default SystemLogs;
