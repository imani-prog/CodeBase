import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ClipboardList,
  Home,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Calendar,
} from 'lucide-react';
import {
  getChwAssignmentsSnapshot,
  subscribeToChwAssignmentUpdates,
  transitionWorkItemStatus,
  approveWorkItem,
  reassignAssignment as reassignLocalAssignment,
} from '../../Services/chwAssignmentsStore';
import { assignmentService } from '../../Services/domain/assignmentService.js';

const WORK_TYPE_OPTIONS = ['ALL', 'TASK', 'HOME_VISIT', 'APPOINTMENT'];
const STATUS_OPTIONS = ['ALL', 'ASSIGNED', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'];
const PRIORITY_OPTIONS = ['ALL', 'URGENT', 'HIGH', 'NORMAL'];
const TAB_OPTIONS = [
  { id: 'all', label: 'All Work Items' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'home_visits', label: 'Home Visits' },
];

function badgeClassByStatus(status) {
  if (status === 'COMPLETED') return 'text-green-800';
  if (status === 'IN_PROGRESS') return 'text-blue-800';
  if (status === 'CANCELED') return 'text-red-800';
  return 'text-amber-800';
}

function badgeClassByPriority(priority) {
  if (priority === 'URGENT') return 'text-red-800';
  if (priority === 'HIGH') return 'text-orange-800';
  return 'text-blue-800';
}

function displayWorkType(type) {
  if (type === 'TASK') return 'TASK';
  if (type === 'APPOINTMENT') return 'APPOINTMENT';
  return 'HOME_VISIT';
}

function displayDate(isoDate) {
  if (!isoDate) return 'N/A';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString('en-KE', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function inferIsOverdue(item) {
  if (item.source === 'BACKEND_ASSIGNMENT') return false;
  if (!item.dueAt) return false;
  if (['COMPLETED', 'CANCELED'].includes(item.status)) return false;
  const dueTs = Date.parse(item.dueAt);
  if (Number.isNaN(dueTs)) return false;
  return dueTs < Date.now();
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function toAssignmentStatus(workItemStatus) {
  if (workItemStatus === 'ASSIGNED' || workItemStatus === 'PENDING') return 'ASSIGNED';
  if (workItemStatus === 'IN_PROGRESS') return 'IN_PROGRESS';
  if (workItemStatus === 'COMPLETED') return 'COMPLETED';
  if (workItemStatus === 'CANCELED') return 'CANCELED';
  return 'ASSIGNED';
}

function toWorkItemStatus(assignmentStatus) {
  const value = String(assignmentStatus || '').toUpperCase();
  if (value === 'ASSIGNED') return 'ASSIGNED';
  if (value === 'IN_PROGRESS') return 'IN_PROGRESS';
  if (value === 'COMPLETED') return 'COMPLETED';
  if (value === 'CANCELED' || value === 'CANCELLED') return 'CANCELED';
  return 'PENDING';
}

function toWorkItemType(assignmentType) {
  const value = String(assignmentType || '').toUpperCase();
  if (value === 'HOME_VISIT') return 'HOME_VISIT';
  if (value === 'APPOINTMENT') return 'APPOINTMENT';
  return 'TASK';
}

function extractAssignmentLocation(assignment) {
  const raw = assignment?.raw || {};
  const appointment = raw.appointment || {};
  const patient = raw.patient || {};

  const patientAddressParts = [
    patient.addressLine1,
    patient.addressLine2,
    patient.city,
    patient.state,
  ]
    .filter(Boolean)
    .map((part) => String(part).trim())
    .filter(Boolean);

  const candidates = [
    raw.location,
    raw.facility,
    raw.address,
    raw.addressLine1,
    raw.visitLocation,
    appointment.location,
    appointment.facility,
    appointment.address,
    appointment.addressLine1,
    appointment.hospitalName,
    appointment.hospital?.name,
    appointment.clinicName,
    patient.address,
    patientAddressParts.length > 0 ? patientAddressParts.join(', ') : null,
  ];

  const valid = candidates
    .map((value) => String(value || '').trim())
    .find((value) => value.length > 0);

  return valid || null;
}

function toDisplayAssignment(row = {}) {
  const raw = row.raw || {};
  const patientRaw = raw.patient || {};
  const assignmentType = (row.assignmentType || raw.assignmentType || 'TASK').toUpperCase();
  return {
    ...row,
    dataSource: 'BACKEND',
    assignmentCode: row.assignmentCode || raw.assignmentCode || `ASG-${String(row.id || '').padStart(3, '0')}`,
    patientIdText:
      raw.patientIdText ||
      patientRaw.patientId ||
      patientRaw.code ||
      (row.patientId ? `PT-${row.patientId}` : ''),
    patientName: row.patientName || patientRaw.fullName || patientRaw.name || '',
    chwCode: raw.chwCode || raw.chw?.code || (row.chwId ? `CHW-${row.chwId}` : ''),
    chwName: row.chwName || raw.chw?.fullName || raw.chw?.name || '',
    assignmentType,
  };
}

const CHWAssignments = () => {
  const [snapshot, setSnapshot] = useState(getChwAssignmentsSnapshot());
  const [backendAssignments, setBackendAssignments] = useState([]);
  const [_isBackendLoading, setIsBackendLoading] = useState(true);
  const [backendError, setBackendError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkType,] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');

  useEffect(() => {
    setSnapshot(getChwAssignmentsSnapshot());
    return subscribeToChwAssignmentUpdates((nextSnapshot) => {
      setSnapshot(nextSnapshot);
    });
  }, []);

  const loadBackendAssignments = useCallback(async () => {
    setIsBackendLoading(true);
    setBackendError('');
    try {
      const list = await assignmentService.listAssignments();
      setBackendAssignments(list.map(toDisplayAssignment));
    } catch (error) {
      setBackendError(error?.message || 'Failed to fetch CHW assignments from backend.');
    } finally {
      setIsBackendLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBackendAssignments();
    const timer = window.setInterval(loadBackendAssignments, 30000);
    return () => window.clearInterval(timer);
  }, [loadBackendAssignments]);

  const localAssignmentIndex = useMemo(() => {
    const index = new Map();
    snapshot.assignments.forEach((assignment) => {
      index.set(assignment.id, assignment);
    });
    return index;
  }, [snapshot.assignments]);

  const backendAssignmentIndex = useMemo(() => {
    const index = new Map();
    backendAssignments.forEach((assignment) => {
      if (assignment?.id == null) return;
      index.set(assignment.id, assignment);
    });
    return index;
  }, [backendAssignments]);

  const resolveAssignmentForItem = useCallback((item) => {
    const backendById = backendAssignmentIndex.get(item.assignmentId);
    if (backendById) return backendById;

    const itemPatientId = normalizeText(item.patientIdText);
    const itemPatientName = normalizeText(item.patientName);

    const backendByPatient = backendAssignments.find((assignment) => {
      if (itemPatientId && normalizeText(assignment.patientIdText) === itemPatientId) return true;
      if (itemPatientName && normalizeText(assignment.patientName) === itemPatientName) return true;
      return false;
    });
    if (backendByPatient) return backendByPatient;

    return localAssignmentIndex.get(item.assignmentId);
  }, [backendAssignmentIndex, backendAssignments, localAssignmentIndex]);

  const backendWorkItems = useMemo(() => {
    const locationByPatientAndType = new Map();
    snapshot.workItems.forEach((workItem) => {
      if (!workItem?.location) return;
      const key = `${normalizeText(workItem.patientIdText)}|${workItem.workType}`;
      if (!locationByPatientAndType.has(key)) {
        locationByPatientAndType.set(key, workItem.location);
      }
    });

    return backendAssignments.map((assignment) => ({
      location:
        extractAssignmentLocation(assignment) ||
        locationByPatientAndType.get(`${normalizeText(assignment.patientIdText)}|${toWorkItemType(assignment.assignmentType)}`) ||
        null,
      id: `BACKEND-ASG-${assignment.id}`,
      assignmentId: assignment.id,
      workType: toWorkItemType(assignment.assignmentType),
      source: 'BACKEND_ASSIGNMENT',
      sourceId: assignment.id,
      title: assignment.assignmentCode || 'Assignment',
      patientName: assignment.patientName || 'Unknown Patient',
      patientIdText: assignment.patientIdText || '',
      category: assignment.assignmentType || 'TASK',
      priority: 'NORMAL',
      status: toWorkItemStatus(assignment.status),
      dueAt: assignment.raw?.dueAt || assignment.raw?.deadlineAt || null,
      scheduledAt: assignment.assignedAt || assignment.startedAt || assignment.completedAt || assignment.createdAt || null,
      completedAt: assignment.completedAt || null,
      notes: assignment.notes || '',
      visitType: assignment.assignmentType || 'TASK',
      approvalStatus: 'NOT_REQUIRED',
      updatedAt: assignment.updatedAt || assignment.raw?.updatedAt || null,
    }));
  }, [backendAssignments, snapshot.workItems]);

  const activeWorkItems = useMemo(() => {
    if (backendError) return snapshot.workItems;
    return backendWorkItems;
  }, [backendError, snapshot.workItems, backendWorkItems]);

  const filteredItems = useMemo(() => {
    return activeWorkItems.filter((item) => {
      if (activeTab === 'tasks' && item.workType !== 'TASK') return false;
      if (activeTab === 'home_visits' && item.workType !== 'HOME_VISIT') return false;

      if (selectedWorkType !== 'ALL' && item.workType !== selectedWorkType) return false;
      if (selectedStatus !== 'ALL' && item.status !== selectedStatus) return false;
      if (selectedPriority !== 'ALL' && item.priority !== selectedPriority) return false;

      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      const assignment = resolveAssignmentForItem(item);

      return (
        String(item.title || '').toLowerCase().includes(q) ||
        String(item.patientName || '').toLowerCase().includes(q) ||
        String(item.patientIdText || '').toLowerCase().includes(q) ||
        String(item.location || '').toLowerCase().includes(q) ||
        String(item.category || '').toLowerCase().includes(q) ||
        String(assignment?.assignmentCode || '').toLowerCase().includes(q) ||
        String(assignment?.chwName || '').toLowerCase().includes(q)
      );
    });
  }, [
    activeWorkItems,
    activeTab,
    selectedWorkType,
    selectedStatus,
    selectedPriority,
    searchTerm,
    resolveAssignmentForItem,
  ]);

  const metrics = useMemo(() => {
    const total = activeWorkItems.length;
    const tasks = activeWorkItems.filter((item) => item.workType === 'TASK').length;
    const visits = activeWorkItems.filter((item) => item.workType === 'HOME_VISIT').length;
    const overdue = activeWorkItems.filter((item) => inferIsOverdue(item)).length;

    return { total, tasks, visits, overdue };
  }, [activeWorkItems]);

  const refreshSnapshot = () => setSnapshot(getChwAssignmentsSnapshot());

  const handleStatusAction = async (item, nextStatus) => {
    if (item.source === 'BACKEND_ASSIGNMENT') {
      const assignment = resolveAssignmentForItem(item);
      if (assignment?.id == null) return;
      try {
        await assignmentService.updateAssignmentStatus(assignment.id, toAssignmentStatus(nextStatus));
        await loadBackendAssignments();
      } catch (error) {
        setBackendError(error?.message || 'Backend assignment status sync failed.');
        window.alert(error?.message || 'Backend assignment status sync failed.');
      }
      return;
    }

    const result = transitionWorkItemStatus(item.id, nextStatus);
    if (!result.ok) {
      window.alert(result.reason || 'Status update failed.');
      return;
    }
    refreshSnapshot();

    const assignment = resolveAssignmentForItem(item);
    if (assignment?.dataSource !== 'BACKEND' || assignment?.id == null) return;

    try {
      await assignmentService.updateAssignmentStatus(assignment.id, toAssignmentStatus(nextStatus));
      loadBackendAssignments();
    } catch (error) {
      setBackendError(error?.message || 'Backend assignment status sync failed.');
    }
  };

  const handleApprove = (item) => {
    const result = approveWorkItem(item.id);
    if (!result.ok) {
      window.alert(result.reason || 'Approval failed.');
      return;
    }
    refreshSnapshot();
  };

  const handleReassign = async (item, assignment) => {
    if (assignment?.dataSource === 'BACKEND') {
      const nextChwId = window.prompt('Reassign to CHW id', String(assignment?.chwId || ''));
      if (nextChwId === null) return;
      const reason = window.prompt('Reassignment reason', 'Coverage balancing');
      if (reason === null) return;

      try {
        await assignmentService.reassignAssignment(assignment.id, {
          chwId: nextChwId,
          reason,
        });
        await loadBackendAssignments();
      } catch (error) {
        setBackendError(error?.message || 'Backend reassignment failed.');
        window.alert(error?.message || 'Backend reassignment failed.');
      }
      return;
    }

    const assignmentId = item.assignmentId;
    const currentChwName = assignment?.chwName;
    const currentChwCode = assignment?.chwCode;
    const nextName = window.prompt('Reassign to CHW name', currentChwName || '');
    if (nextName === null) return;
    const nextCode = window.prompt('Reassign to CHW code', currentChwCode || '');
    if (nextCode === null) return;
    reassignLocalAssignment(assignmentId, nextName.trim() || currentChwName, nextCode.trim() || currentChwCode);
    refreshSnapshot();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">CHW Assignments</h1>
        {/* <p className="text-sm text-gray-600">
          {isBackendLoading ? 'Syncing assignments from backend...' : `Backend assignments loaded: ${backendAssignments.length}`}
        </p> */}
        {backendError && (
          <p className="text-sm text-red-700">{backendError}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-800">Total Work Items</p>
              <p className="text-2xl font-bold">{metrics.total}</p>
            </div>
            <ClipboardList className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-800">Tasks</p>
              <p className="text-2xl font-bold">{metrics.tasks}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-800">Home Visits</p>
              <p className="text-2xl font-bold">{metrics.visits}</p>
            </div>
            <Home className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-800">Overdue</p>
              <p className="text-2xl font-bold">{metrics.overdue}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex overflow-x-auto mb-6">
          {TAB_OPTIONS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patient, assignment, CHW, or title"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
         
          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Assignment</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Work Item</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">CHW</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Due/Scheduled</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Approval</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center text-gray-500">
                    No work items match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const assignment = resolveAssignmentForItem(item);
                  const isOverdue = inferIsOverdue(item);
                  const showStart = ['PENDING', 'ASSIGNED'].includes(item.status);
                  const showComplete = item.status === 'IN_PROGRESS';
                  const canApprove = item.status === 'COMPLETED' && item.approvalStatus === 'PENDING_REVIEW';
                  return (
                    <tr key={item.id} className={isOverdue ? 'bg-red-50/40' : ''}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="font-semibold text-gray-900">{assignment?.assignmentCode || 'N/A'}</p>
                        <p className="text-xs text-gray-500">{assignment?.status || 'ASSIGNED'}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-blue-800">
                          {displayWorkType(item.workType)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="font-medium text-gray-900">{item.patientName}</p>
                        <p className="text-xs text-gray-500">{item.patientIdText}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-gray-700">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-gray-400" />
                            <span>{assignment?.chwName || 'Unassigned'}</span>
                          </div>
                          <p className="text-xs text-gray-500 ml-5">
                            {assignment?.chwCode || (assignment?.chwId ? `CHW-${assignment.chwId}` : '')}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-700">
                          {item.location || 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{displayDate(item.scheduledAt || item.dueAt)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${badgeClassByStatus(item.status)}`}>
                          <Clock className="w-3 h-3" />
                          {isOverdue ? 'OVERDUE' : item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${badgeClassByPriority(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold text-blue-800">
                          {item.approvalStatus || 'NOT_REQUIRED'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {showStart && (
                            <button
                              onClick={() => handleStatusAction(item, 'IN_PROGRESS')}
                              className="px-2 py-1 text-xs font-semibold text-blue-800 hover:bg-blue-50 rounded"
                            >
                              Start
                            </button>
                          )}
                          {showComplete && (
                            <button
                              onClick={() => handleStatusAction(item, 'COMPLETED')}
                              className="px-2 py-1 text-xs font-semibold text-green-800 hover:bg-green-50 rounded"
                            >
                              Complete
                            </button>
                          )}
                          {canApprove && (
                            <button
                              onClick={() => handleApprove(item)}
                              className="px-2 py-1 text-xs font-semibold text-indigo-800 hover:bg-indigo-50 rounded"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleReassign(item, assignment)}
                            className="px-2 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded"
                          >
                            Reassign
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CHWAssignments;
