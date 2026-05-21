import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Download,
  Search,
  UserRound,
  UserRoundCheck,
  X,
  XCircle,
} from 'lucide-react';
import {
  getAppointmentGovernanceSnapshot,
  refreshAppointmentGovernanceSnapshot,
  rescheduleGovernanceAppointment,
  subscribeToAppointmentGovernanceUpdates,
  transitionGovernanceAppointment,
} from '../../Services/appointmentGovernanceStore';

function displayDateTime(iso) {
  if (!iso) return 'N/A';
  const ts = Date.parse(iso);
  if (Number.isNaN(ts)) return 'N/A';
  return new Date(ts).toLocaleString('en-KE', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function downloadCsv(rows, fileName) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escapeCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const csv = [
    headers.join(','),
    ...rows.map((row) => headers.map((key) => escapeCell(row[key])).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

const STATUS_OPTIONS = ['ALL', 'BOOKED', 'ARRIVED', 'COMPLETED', 'CANCELED'];
const PROVIDER_OPTIONS = ['ALL', 'CHW', 'DOCTOR'];
const CANCEL_REASON_OPTIONS = [
  { code: 'PATIENT_UNAVAILABLE', label: 'Patient unavailable at scheduled time' },
  { code: 'PROVIDER_UNAVAILABLE', label: 'Provider unavailable' },
  { code: 'TRANSPORT_BARRIER', label: 'Transport barrier' },
  { code: 'FINANCIAL_CONSTRAINT', label: 'Financial constraint' },
  { code: 'EMERGENCY_CONFLICT', label: 'Emergency conflict' },
  { code: 'OTHER_CANCELLATION', label: 'Other cancellation reason' },
];
const RESCHEDULE_REASON_OPTIONS = [
  { code: 'PATIENT_REQUESTED_TIME_CHANGE', label: 'Patient requested time change' },
  { code: 'PROVIDER_SCHEDULE_CONFLICT', label: 'Provider schedule conflict' },
  { code: 'FACILITY_CAPACITY_CONSTRAINT', label: 'Facility capacity constraint' },
  { code: 'TRANSPORT_DELAY', label: 'Transport delay' },
  { code: 'OTHER_RESCHEDULE', label: 'Other reschedule reason' },
];

const AdminAppointments = () => {
  const [snapshot, setSnapshot] = useState(getAppointmentGovernanceSnapshot());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [providerFilter, setProviderFilter] = useState('ALL');
  const [cancelModal, setCancelModal] = useState({
    open: false,
    appointment: null,
    reasonCode: 'PATIENT_UNAVAILABLE',
    details: '',
  });
  const [rescheduleModal, setRescheduleModal] = useState({
    open: false,
    appointment: null,
    date: '',
    time: '',
    reasonCode: 'PATIENT_REQUESTED_TIME_CHANGE',
    details: '',
  });

  useEffect(() => {
    let active = true;

    const loadSnapshot = async () => {
      try {
        const next = await refreshAppointmentGovernanceSnapshot();
        if (active) setSnapshot(next);
      } catch (error) {
        if (active) {
          window.alert(error?.message || 'Could not load appointments');
        }
      }
    };

    loadSnapshot();

    const unsubscribe = subscribeToAppointmentGovernanceUpdates((next) => {
      if (active) setSnapshot(next);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const filteredAppointments = useMemo(() => {
    return snapshot.appointments.filter((appointment) => {
      if (statusFilter !== 'ALL' && appointment.status !== statusFilter) return false;
      if (providerFilter !== 'ALL' && appointment.providerRole !== providerFilter) return false;

      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        String(appointment.patientName || '').toLowerCase().includes(q) ||
        String(appointment.providerName || '').toLowerCase().includes(q) ||
        String(appointment.facility || '').toLowerCase().includes(q) ||
        String(appointment.source || '').toLowerCase().includes(q)
      );
    });
  }, [snapshot.appointments, searchTerm, statusFilter, providerFilter]);

  const handleMarkArrived = async (appointment) => {
    const result = await transitionGovernanceAppointment(appointment.id, 'ARRIVED');
    if (!result.ok) {
      window.alert(result.reason || 'Could not mark as arrived');
    }
  };

  const handleMarkCompleted = async (appointment) => {
    const result = await transitionGovernanceAppointment(appointment.id, 'COMPLETED');
    if (!result.ok) {
      window.alert(result.reason || 'Could not mark as completed');
    }
  };

  const openCancelModal = (appointment) => {
    setCancelModal({
      open: true,
      appointment,
      reasonCode: 'PATIENT_UNAVAILABLE',
      details: '',
    });
  };

  const submitCancelModal = async () => {
    if (!cancelModal.appointment) return;
    const selected = CANCEL_REASON_OPTIONS.find((item) => item.code === cancelModal.reasonCode);
    const reasonText = cancelModal.details.trim()
      ? `${selected?.label || 'Cancellation'} - ${cancelModal.details.trim()}`
      : selected?.label || 'Cancellation';

    const result = await transitionGovernanceAppointment(cancelModal.appointment.id, 'CANCELED', reasonText);
    if (!result.ok) {
      window.alert(result.reason || 'Could not cancel appointment');
      return;
    }
    setCancelModal({ open: false, appointment: null, reasonCode: 'PATIENT_UNAVAILABLE', details: '' });
  };

  const openRescheduleModal = (appointment) => {
    const dt = appointment?.scheduledAt ? new Date(appointment.scheduledAt) : null;
    const defaultDate = dt && !Number.isNaN(dt.getTime()) ? dt.toISOString().slice(0, 10) : '';
    const defaultTime = dt && !Number.isNaN(dt.getTime())
      ? `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`
      : '';

    setRescheduleModal({
      open: true,
      appointment,
      date: defaultDate,
      time: defaultTime,
      reasonCode: 'PATIENT_REQUESTED_TIME_CHANGE',
      details: '',
    });
  };

  const submitRescheduleModal = async () => {
    if (!rescheduleModal.appointment) return;
    if (!rescheduleModal.date || !rescheduleModal.time) {
      window.alert('Date and time are required');
      return;
    }

    const result = await rescheduleGovernanceAppointment(
      rescheduleModal.appointment.id,
      rescheduleModal.date,
      rescheduleModal.time
    );
    if (!result.ok) {
      window.alert(result.reason || 'Could not reschedule appointment');
      return;
    }
    setRescheduleModal({
      open: false,
      appointment: null,
      date: '',
      time: '',
      reasonCode: 'PATIENT_REQUESTED_TIME_CHANGE',
      details: '',
    });
  };

  const handleExport = () => {
    const rows = filteredAppointments.map((appointment) => ({
      source: appointment.source,
      patientName: appointment.patientName,
      providerRole: appointment.providerRole,
      providerName: appointment.providerName,
      facility: appointment.facility,
      appointmentType: appointment.appointmentType,
      status: appointment.status,
      scheduledAt: appointment.scheduledAt,
      followUpRequired: appointment.followUpRequired,
      followUpDueAt: appointment.followUpDueAt,
      reasonCode: appointment.reasonCode || '',
    }));

    downloadCsv(rows, `admin-appointments-${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments Governance</h1>
          
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="bg-white border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Booked</p>
          <p className="text-2xl font-bold text-blue-700">{snapshot.pipeline.booked}</p>
          <CalendarClock className="w-5 h-5 text-blue-600 mt-2" />
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Arrived</p>
          <p className="text-2xl font-bold text-amber-700">{snapshot.pipeline.arrived}</p>
          <Clock3 className="w-5 h-5 text-amber-600 mt-2" />
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-700">{snapshot.pipeline.completed}</p>
          <CheckCircle2 className="w-5 h-5 text-green-600 mt-2" />
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Canceled</p>
          <p className="text-2xl font-bold text-red-700">{snapshot.pipeline.canceled}</p>
          <XCircle className="w-5 h-5 text-red-600 mt-2" />
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Overdue Follow-ups</p>
          <p className="text-2xl font-bold text-red-700">{snapshot.overdueFollowUps.length}</p>
          <AlertTriangle className="w-5 h-5 text-red-600 mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="bg-white border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <UserRound className="w-4 h-4 text-indigo-600" />
            <h2 className="font-semibold text-gray-900">Pipeline by Provider Type</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Provider</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Booked</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Arrived</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Completed</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Canceled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {snapshot.pipelineByProvider.map((row) => (
                  <tr key={row.role}>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.role}</td>
                    <td className="px-4 py-3 text-blue-700">{row.booked}</td>
                    <td className="px-4 py-3 text-amber-700">{row.arrived}</td>
                    <td className="px-4 py-3 text-green-700">{row.completed}</td>
                    <td className="px-4 py-3 text-red-700">{row.canceled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <UserRoundCheck className="w-4 h-4 text-cyan-600" />
            <h2 className="font-semibold text-gray-900">Reason Code Standardization</h2>
          </div>
          <div className="p-4 space-y-2">
            {snapshot.reasonAnalytics.length === 0 && (
              <p className="text-sm text-gray-500">No cancel/reschedule reasons recorded yet.</p>
            )}
            {snapshot.reasonAnalytics.map((row) => (
              <div key={row.reasonCode} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{row.reasonCode}</span>
                <span className="font-semibold text-gray-900">{row.count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">SLA Alerts: Overdue Follow-up Appointments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Provider</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Facility</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Due</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {snapshot.overdueFollowUps.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No overdue follow-up appointments right now.
                  </td>
                </tr>
              ) : (
                snapshot.overdueFollowUps.map((appointment) => (
                  <tr key={`sla-${appointment.id}`}>
                    <td className="px-4 py-3 font-medium text-gray-900">{appointment.patientName}</td>
                    <td className="px-4 py-3 text-gray-700">{appointment.providerName}</td>
                    <td className="px-4 py-3 text-gray-700">{appointment.facility}</td>
                    <td className="px-4 py-3 text-red-700 font-semibold">{displayDateTime(appointment.followUpDueAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleMarkArrived(appointment)}
                          className="px-2 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-50"
                        >
                          Mark Arrived
                        </button>
                        <button
                          type="button"
                          onClick={() => openRescheduleModal(appointment)}
                          className="px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                        >
                          Reschedule
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 space-y-3">
          <h2 className="font-semibold text-gray-900">Unified Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patient, provider, or facility"
                className="w-full pl-9 pr-3 py-2 border border-gray-300"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300"
            >
              {PROVIDER_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Source</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Provider</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Facility</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Scheduled</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Reason Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">No appointments match the filters.</td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => {
                  const canArrive = appointment.status === 'BOOKED';
                  const canComplete = appointment.status === 'ARRIVED' || appointment.status === 'BOOKED';
                  const canCancel = appointment.status !== 'COMPLETED' && appointment.status !== 'CANCELED';

                  return (
                    <tr key={appointment.id}>
                      <td className="px-4 py-3 text-gray-700">{appointment.source}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{appointment.patientName}</p>
                        <p className="text-xs text-gray-500">{appointment.patientId}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-gray-900 font-medium">{appointment.providerName}</p>
                        <p className="text-xs text-gray-500">{appointment.providerRole}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{appointment.facility}</td>
                      <td className="px-4 py-3 text-gray-700">{displayDateTime(appointment.scheduledAt)}</td>
                      <td className="px-4 py-3 text-gray-700 font-semibold">{appointment.status}</td>
                      <td className="px-4 py-3 text-gray-700">{appointment.reasonCode || 'N/A'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 flex-wrap">
                          {canArrive && (
                            <button
                              type="button"
                              onClick={() => handleMarkArrived(appointment)}
                              className="px-2 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-50"
                            >
                              Arrived
                            </button>
                          )}
                          {canComplete && (
                            <button
                              type="button"
                              onClick={() => handleMarkCompleted(appointment)}
                              className="px-2 py-1 text-xs font-semibold text-green-700 hover:bg-green-50"
                            >
                              Complete
                            </button>
                          )}
                          {canCancel && (
                            <button
                              type="button"
                              onClick={() => openCancelModal(appointment)}
                              className="px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => openRescheduleModal(appointment)}
                            className="px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                          >
                            Reschedule
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
      </section>

      {cancelModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white w-full max-w-lg border border-gray-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Cancel Appointment</h3>
              <button
                type="button"
                onClick={() => setCancelModal({ open: false, appointment: null, reasonCode: 'PATIENT_UNAVAILABLE', details: '' })}
                className="p-1.5 hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              <p className="text-sm text-gray-600">
                Canceling appointment for <span className="font-semibold text-gray-900">{cancelModal.appointment?.patientName}</span>.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Standard reason code</label>
                <select
                  value={cancelModal.reasonCode}
                  onChange={(e) => setCancelModal((prev) => ({ ...prev, reasonCode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300"
                >
                  {CANCEL_REASON_OPTIONS.map((option) => (
                    <option key={option.code} value={option.code}>{option.code}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional details (optional)</label>
                <textarea
                  rows={3}
                  value={cancelModal.details}
                  onChange={(e) => setCancelModal((prev) => ({ ...prev, details: e.target.value }))}
                  placeholder="Add context for operations and audit trail"
                  className="w-full px-3 py-2 border border-gray-300"
                />
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCancelModal({ open: false, appointment: null, reasonCode: 'PATIENT_UNAVAILABLE', details: '' })}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={submitCancelModal}
                className="px-4 py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-700"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {rescheduleModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white w-full max-w-xl border border-gray-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Reschedule Appointment</h3>
              <button
                type="button"
                onClick={() => setRescheduleModal({ open: false, appointment: null, date: '', time: '', reasonCode: 'PATIENT_REQUESTED_TIME_CHANGE', details: '' })}
                className="p-1.5 hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              <p className="text-sm text-gray-600">
                Rescheduling appointment for <span className="font-semibold text-gray-900">{rescheduleModal.appointment?.patientName}</span>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">New date</label>
                  <input
                    type="date"
                    value={rescheduleModal.date}
                    onChange={(e) => setRescheduleModal((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">New time</label>
                  <input
                    type="time"
                    value={rescheduleModal.time}
                    onChange={(e) => setRescheduleModal((prev) => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Standard reason code</label>
                <select
                  value={rescheduleModal.reasonCode}
                  onChange={(e) => setRescheduleModal((prev) => ({ ...prev, reasonCode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300"
                >
                  {RESCHEDULE_REASON_OPTIONS.map((option) => (
                    <option key={option.code} value={option.code}>{option.code}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional details (optional)</label>
                <textarea
                  rows={3}
                  value={rescheduleModal.details}
                  onChange={(e) => setRescheduleModal((prev) => ({ ...prev, details: e.target.value }))}
                  placeholder="Add context for operations and audit trail"
                  className="w-full px-3 py-2 border border-gray-300"
                />
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRescheduleModal({ open: false, appointment: null, date: '', time: '', reasonCode: 'PATIENT_REQUESTED_TIME_CHANGE', details: '' })}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={submitRescheduleModal}
                className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
