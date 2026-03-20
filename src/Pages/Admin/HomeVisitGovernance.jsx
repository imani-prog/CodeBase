import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  CalendarClock,
  CheckCircle2,
  Compass,
  MapPin,
  Route,
  TriangleAlert,
} from 'lucide-react';
import {
  getHomeVisitGovernanceSnapshot,
  reassignHomeVisitOwner,
  resolveNoShowVisit,
  reviewCompletionEvidence,
  subscribeToHomeVisitGovernanceUpdates,
} from '../../Services/homeVisitGovernanceStore';

function percent(value) {
  return `${Math.round(value)}%`;
}

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

function scoreTone(score) {
  if (score >= 80) return 'text-green-700';
  if (score >= 50) return 'text-amber-700';
  return 'text-red-700';
}

function reviewTone(reviewStatus) {
  if (reviewStatus === 'VERIFIED') return 'text-green-700';
  if (reviewStatus === 'REJECTED') return 'text-red-700';
  return 'text-amber-700';
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

const HomeVisitGovernance = () => {
  const [snapshot, setSnapshot] = useState(getHomeVisitGovernanceSnapshot());

  useEffect(() => {
    setSnapshot(getHomeVisitGovernanceSnapshot());
    return subscribeToHomeVisitGovernanceUpdates((next) => setSnapshot(next));
  }, []);

  const recentCompleted = useMemo(() => {
    return snapshot.visits
      .filter((visit) => visit.status === 'COMPLETED')
      .slice(0, 8);
  }, [snapshot.visits]);

  const noShowQueue = useMemo(() => {
    return snapshot.visits.filter((visit) => visit.status === 'NO_SHOW');
  }, [snapshot.visits]);

  const operationsQueue = useMemo(() => {
    return snapshot.visits
      .filter((visit) => visit.status === 'SCHEDULED' || visit.status === 'NO_SHOW')
      .slice(0, 12);
  }, [snapshot.visits]);

  const maxReasonCount = useMemo(() => {
    const all = [
      ...snapshot.reasonAnalytics.noShowReasons,
      ...snapshot.reasonAnalytics.rescheduleReasons,
    ];
    return all.reduce((max, row) => Math.max(max, row.count), 1);
  }, [snapshot.reasonAnalytics]);

  const refreshSnapshot = () => setSnapshot(getHomeVisitGovernanceSnapshot());

  const handleEvidenceReview = (visit, decision) => {
    const note = window.prompt(
      decision === 'VERIFIED' ? 'Verification note (optional)' : 'Rejection reason',
      decision === 'VERIFIED' ? 'Evidence reviewed and accepted' : 'Incomplete documentation'
    );
    if (note === null) return;

    const result = reviewCompletionEvidence(
      visit.id,
      decision,
      'Dr. Timothy Imani',
      note.trim()
    );

    if (!result.ok) {
      window.alert(result.reason || 'Could not update evidence review');
      return;
    }

    refreshSnapshot();
  };

  const handleResolveNoShow = (visit) => {
    const resolution = window.prompt('No-show resolution', 'FOLLOW_UP_SCHEDULED');
    if (resolution === null) return;
    const comment = window.prompt('Supervisor comment', 'Patient to be contacted within 24 hours');
    if (comment === null) return;
    const followUpDueAt = window.prompt('Follow-up due date (YYYY-MM-DD)', '2026-03-25');
    if (followUpDueAt === null) return;

    const result = resolveNoShowVisit(visit.id, resolution.trim(), comment.trim(), followUpDueAt.trim());
    if (!result.ok) {
      window.alert(result.reason || 'Could not resolve no-show visit');
      return;
    }

    refreshSnapshot();
  };

  const handleReassignVisit = (visit) => {
    const nextChwName = window.prompt('Reassign to CHW name', visit.chwName || '');
    if (nextChwName === null) return;
    const nextChwId = window.prompt('Reassign to CHW ID', visit.chwId || 'CHW-001');
    if (nextChwId === null) return;
    const reason = window.prompt('Reassignment reason', 'Coverage balancing');
    if (reason === null) return;

    const result = reassignHomeVisitOwner(
      visit.id,
      nextChwId.trim() || visit.chwId,
      nextChwName.trim() || visit.chwName,
      reason.trim() || 'Coverage balancing'
    );

    if (!result.ok) {
      window.alert(result.reason || 'Could not reassign visit');
      return;
    }

    refreshSnapshot();
  };

  const handleExportCsv = () => {
    const rows = snapshot.visits.map((visit) => ({
      patientName: visit.patientName,
      patientId: visit.patientId,
      chwName: visit.chwName,
      status: visit.status,
      location: visit.location,
      scheduledAt: visit.scheduledAt,
      completedAt: visit.completionEvidence?.completedAt || '',
      notesQuality: visit.completionEvidence?.notesQualityScore || '',
      evidenceReview: visit.evidenceReview?.status || '',
      noShowResolution: visit.noShowResolution?.resolution || '',
    }));

    downloadCsv(rows, `home-visit-governance-${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Home Visit Governance</h1>
          <p className="text-gray-600 mt-1">
            Supervisor oversight for completion evidence, no-show/reschedule reasons, and coverage-route efficiency.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportCsv}
          className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
        >
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="bg-white border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Visits</p>
          <p className="text-2xl font-bold text-gray-900">{snapshot.metrics.total}</p>
          <Activity className="w-5 h-5 text-blue-600 mt-2" />
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-700">{snapshot.metrics.completed}</p>
          <CheckCircle2 className="w-5 h-5 text-green-600 mt-2" />
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Evidence Coverage</p>
          <p className="text-2xl font-bold text-indigo-700">{percent(snapshot.evidence.evidenceRate)}</p>
          <p className="text-xs text-gray-500 mt-1">
            {snapshot.evidence.withEvidenceCount} of {snapshot.evidence.completedCount} completed visits
          </p>
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <p className="text-sm text-gray-500">No-Shows</p>
          <p className="text-2xl font-bold text-red-700">{snapshot.metrics.noShow}</p>
          <TriangleAlert className="w-5 h-5 text-red-600 mt-2" />
        </div>
        <div className="bg-white border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Geo Checks</p>
          <p className="text-2xl font-bold text-cyan-700">{snapshot.evidence.geoChecked}</p>
          <Compass className="w-5 h-5 text-cyan-600 mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-white border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Visit Completion Evidence</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">CHW</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Scheduled</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Completed At</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Notes Quality</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Geo Check</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Review</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentCompleted.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-gray-500">
                      No completed home visits yet.
                    </td>
                  </tr>
                ) : (
                  recentCompleted.map((visit) => {
                    const evidence = visit.completionEvidence;
                    const score = Number(evidence?.notesQualityScore || 0);
                    const reviewStatus = visit.evidenceReview?.status || 'PENDING';
                    return (
                      <tr key={visit.id}>
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900">{visit.patientName}</p>
                          <p className="text-xs text-gray-500">{visit.patientId}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{visit.chwName}</td>
                        <td className="px-4 py-3 text-gray-700">{displayDateTime(visit.scheduledAt)}</td>
                        <td className="px-4 py-3 text-gray-700">{displayDateTime(evidence?.completedAt)}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold ${scoreTone(score)}`}>
                            {score}%
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold ${evidence?.geoCheckPassed ? 'text-green-700' : 'text-gray-500'}`}>
                            {evidence?.geoCheckPassed ? 'PASS' : 'NOT VERIFIED'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold ${reviewTone(reviewStatus)}`}>
                            {reviewStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => handleEvidenceReview(visit, 'VERIFIED')}
                              className="px-2 py-1 text-xs font-semibold text-green-700 hover:bg-green-50"
                            >
                              Verify
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEvidenceReview(visit, 'REJECTED')}
                              className="px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                            >
                              Reject
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

        <section className="bg-white border border-gray-200 p-4 space-y-4">
          <h2 className="font-semibold text-gray-900">Reason Analytics</h2>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">No-Show Reasons</h3>
            <div className="space-y-2">
              {snapshot.reasonAnalytics.noShowReasons.length === 0 && (
                <p className="text-sm text-gray-500">No no-show reasons captured yet.</p>
              )}
              {snapshot.reasonAnalytics.noShowReasons.map((row) => (
                <div key={`no-show-${row.reason}`}>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>{row.reason}</span>
                    <span>{row.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100">
                    <div
                      className="h-2 bg-red-500"
                      style={{ width: `${(row.count / maxReasonCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Reschedule Reasons</h3>
            <div className="space-y-2">
              {snapshot.reasonAnalytics.rescheduleReasons.length === 0 && (
                <p className="text-sm text-gray-500">No reschedule reasons captured yet.</p>
              )}
              {snapshot.reasonAnalytics.rescheduleReasons.map((row) => (
                <div key={`reschedule-${row.reason}`}>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>{row.reason}</span>
                    <span>{row.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100">
                    <div
                      className="h-2 bg-amber-500"
                      style={{ width: `${(row.count / maxReasonCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="bg-white border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">No-Show Resolution Queue</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Reason</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Resolution</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {noShowQueue.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No no-show visits pending resolution.</td>
                  </tr>
                ) : (
                  noShowQueue.map((visit) => (
                    <tr key={`no-show-${visit.id}`}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{visit.patientName}</p>
                        <p className="text-xs text-gray-500">{visit.patientId}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{visit.reason || 'No reason provided'}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {visit.noShowResolution?.resolution || 'UNRESOLVED'}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleResolveNoShow(visit)}
                          className="px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                        >
                          Resolve
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Visit Reassignment Queue</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Current CHW</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {operationsQueue.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No visits available for reassignment.</td>
                  </tr>
                ) : (
                  operationsQueue.map((visit) => (
                    <tr key={`ops-${visit.id}`}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{visit.patientName}</p>
                        <p className="text-xs text-gray-500">{visit.patientId}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{visit.chwName}</td>
                      <td className="px-4 py-3 text-gray-700">{visit.status}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleReassignVisit(visit)}
                          className="px-2 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-50"
                        >
                          Reassign
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="bg-white border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <h2 className="font-semibold text-gray-900">Coverage Areas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Area</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Completed</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No-Show</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {snapshot.coverageByArea.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-gray-500">No coverage data yet.</td>
                  </tr>
                ) : (
                  snapshot.coverageByArea.map((row) => (
                    <tr key={row.area}>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.area}</td>
                      <td className="px-4 py-3 text-gray-700">{row.total}</td>
                      <td className="px-4 py-3 text-green-700">{row.completed}</td>
                      <td className="px-4 py-3 text-red-700">{row.noShow}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100">
            <iframe
              src={import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL}
              width="100%"
              height="260"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Supervisor Coverage Map"
            />
          </div>
        </section>

        <section className="bg-white border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <Route className="w-4 h-4 text-indigo-600" />
            <h2 className="font-semibold text-gray-900">Route Efficiency</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">CHW</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Day</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Visits</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Distance</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Avg km/Visit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {snapshot.routeEfficiency.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-gray-500">
                      Route efficiency will appear after completed visits with coordinates.
                    </td>
                  </tr>
                ) : (
                  snapshot.routeEfficiency.map((row) => (
                    <tr key={row.key}>
                      <td className="px-4 py-3 text-gray-900 font-medium">{row.chwName}</td>
                      <td className="px-4 py-3 text-gray-700">{displayDateTime(`${row.day}T00:00:00Z`).split(',')[0]}</td>
                      <td className="px-4 py-3 text-gray-700">{row.visitCount}</td>
                      <td className="px-4 py-3 text-gray-700">{row.totalDistanceKm.toFixed(2)} km</td>
                      <td className="px-4 py-3 text-indigo-700 font-semibold">{row.avgKmPerVisit.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-2">
            <CalendarClock className="w-3.5 h-3.5" />
            Updated {displayDateTime(snapshot.updatedAt)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeVisitGovernance;
