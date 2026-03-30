const STORAGE_KEY = 'medilink_home_visit_governance_v1';
const STORE_UPDATED_EVENT = 'home-visit-governance-store-updated';

const SEED_META = {
  chwId: 'CHW-001',
  chwName: 'Jane Wanjiru',
  serviceZone: 'Machakos',
};

const SEEDED_VISITS_STATE = {
  upcoming: [
    {
      id: 1,
      patientName: 'Sarah Wanjiru',
      patientId: 'PT-2023-001',
      phone: '+254790383295',
      date: '2024-10-25',
      time: '10:00 AM',
      location: 'Katoloni AIC Church, House 23',
      coordinates: { lat: -1.3139, lng: 36.789 },
      type: 'Follow-up Visit',
      priority: 'normal',
      notes: 'Check blood pressure and review medication',
    },
    {
      id: 2,
      patientName: 'John Kamau',
      patientId: 'PT-2023-045',
      phone: '+254723456789',
      date: '2024-10-25',
      time: '2:00 PM',
      location: 'Kathemboni Mosque',
      coordinates: { lat: -1.2627, lng: 36.8598 },
      type: 'Initial Assessment',
      priority: 'urgent',
      notes: 'New patient - comprehensive health assessment needed',
      rescheduleHistory: [
        {
          previousDate: '2024-10-24',
          previousTime: '11:00 AM',
          newDate: '2024-10-25',
          newTime: '2:00 PM',
          reason: 'Patient requested afternoon slot',
          changedAt: '2024-10-24T08:30:00.000Z',
        },
      ],
    },
  ],
  completed: [
    {
      id: 5,
      patientName: 'Grace Akinyi',
      patientId: 'PT-2023-156',
      phone: '+254756789012',
      date: '2024-10-22',
      time: '10:30 AM',
      location: 'Mathare, House 45',
      coordinates: { lat: -1.2572, lng: 36.8585 },
      type: 'Nutrition Assessment',
      status: 'completed',
      outcome: 'Patient improving - continue current plan',
      completionEvidence: {
        completedAt: '2024-10-22T10:52:00.000Z',
        notesQualityScore: 90,
        geoCheckPassed: true,
      },
    },
    {
      id: 6,
      patientName: 'David Mwangi',
      patientId: 'PT-2023-201',
      phone: '+254767890123',
      date: '2024-10-21',
      time: '2:00 PM',
      location: 'Kawangware, Block A',
      coordinates: { lat: -1.2833, lng: 36.75 },
      type: 'Follow-up Visit',
      status: 'completed',
      outcome: 'Blood pressure stable - medication working well',
      completionEvidence: {
        completedAt: '2024-10-21T14:35:00.000Z',
        notesQualityScore: 75,
        geoCheckPassed: false,
      },
    },
  ],
  cancelled: [
    {
      id: 7,
      patientName: 'Jane Wambui',
      patientId: 'PT-2023-178',
      phone: '+254778901234',
      date: '2024-10-20',
      time: '3:00 PM',
      location: 'Muthini Estate, House 5',
      coordinates: { lat: -1.31, lng: 36.791 },
      type: 'Follow-up Visit',
      status: 'cancelled',
      reason: 'Patient not available - rescheduled',
      reasonType: 'NO_SHOW',
    },
  ],
};

function buildSeededVisits() {
  return flattenVisits(SEEDED_VISITS_STATE, SEED_META);
}

const defaultStore = {
  visits: buildSeededVisits(),
  updatedAt: new Date().toISOString(),
};

function emitUpdate() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(STORE_UPDATED_EVENT));
}

function readStore() {
  if (typeof window === 'undefined') return defaultStore;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = {
        ...defaultStore,
        visits: buildSeededVisits(),
        updatedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.visits)) return defaultStore;
    if (parsed.visits.length === 0) {
      const seeded = {
        ...parsed,
        visits: buildSeededVisits(),
        updatedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return {
      ...defaultStore,
      ...parsed,
      visits: parsed.visits,
    };
  } catch {
    return defaultStore;
  }
}

function writeStore(nextStore) {
  if (typeof window === 'undefined') return nextStore;
  const payload = {
    ...nextStore,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  emitUpdate();
  return payload;
}

function parseTimeTo24h(timeText) {
  if (!timeText) return null;
  if (/^\d{2}:\d{2}$/.test(timeText)) return timeText;

  const match = String(timeText).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const suffix = match[3].toUpperCase();

  let converted = hour % 12;
  if (suffix === 'PM') converted += 12;

  return `${String(converted).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function toScheduledAt(date, time) {
  if (!date) return null;
  const h24 = parseTimeTo24h(time) || '09:00';
  const iso = new Date(`${date}T${h24}:00`).toISOString();
  return Number.isNaN(Date.parse(iso)) ? null : iso;
}

function haversineDistanceKm(a, b) {
  if (!a || !b) return 0;
  if (typeof a.lat !== 'number' || typeof a.lng !== 'number') return 0;
  if (typeof b.lat !== 'number' || typeof b.lng !== 'number') return 0;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const earthKm = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return earthKm * c;
}

function normalizeVisit(visit, status, meta) {
  const reasonType = visit.reasonType || (status === 'NO_SHOW' ? 'NO_SHOW' : null);
  const sourceVisitId = String(visit.id);
  const completionEvidence = visit.completionEvidence || null;
  const evidenceReview = visit.evidenceReview || (completionEvidence ? {
    status: 'PENDING',
    reviewedAt: null,
    reviewedBy: null,
    note: null,
  } : null);

  return {
    id: `${meta.chwId}:${sourceVisitId}`,
    sourceVisitId,
    source: 'CHW_HOME_VISITS',
    chwId: meta.chwId,
    chwName: meta.chwName,
    serviceZone: meta.serviceZone || 'Unspecified',
    patientName: visit.patientName || 'Unknown Patient',
    patientId: visit.patientId || 'N/A',
    phone: visit.phone || null,
    visitType: visit.type || 'Home Visit',
    priority: (visit.priority || 'normal').toUpperCase(),
    status,
    reason: visit.reason || null,
    reasonType,
    location: visit.location || 'Unknown location',
    coordinates: visit.coordinates || null,
    date: visit.date || null,
    time: visit.time || null,
    scheduledAt: visit.scheduledAt || toScheduledAt(visit.date, visit.time),
    outcome: visit.outcome || null,
    completionEvidence,
    evidenceReview,
    noShowResolution: visit.noShowResolution || null,
    reassignmentHistory: Array.isArray(visit.reassignmentHistory) ? visit.reassignmentHistory : [],
    rescheduleHistory: Array.isArray(visit.rescheduleHistory) ? visit.rescheduleHistory : [],
    updatedAt: new Date().toISOString(),
  };
}

function flattenVisits(visitsState, meta) {
  const upcoming = (visitsState?.upcoming || []).map((visit) => normalizeVisit(visit, 'SCHEDULED', meta));
  const completed = (visitsState?.completed || []).map((visit) => normalizeVisit(visit, 'COMPLETED', meta));
  const cancelled = (visitsState?.cancelled || []).map((visit) => {
    const derivedStatus = visit.reasonType === 'NO_SHOW' ? 'NO_SHOW' : 'CANCELED';
    return normalizeVisit(visit, derivedStatus, meta);
  });

  return [...upcoming, ...completed, ...cancelled];
}

function getCoverageByArea(visits) {
  const areaMap = new Map();

  visits.forEach((visit) => {
    const zone = String(visit.location || 'Unknown').split(',')[0].trim() || 'Unknown';
    if (!areaMap.has(zone)) {
      areaMap.set(zone, {
        area: zone,
        total: 0,
        completed: 0,
        noShow: 0,
        canceled: 0,
      });
    }

    const row = areaMap.get(zone);
    row.total += 1;
    if (visit.status === 'COMPLETED') row.completed += 1;
    if (visit.status === 'NO_SHOW') row.noShow += 1;
    if (visit.status === 'CANCELED') row.canceled += 1;
  });

  return Array.from(areaMap.values()).sort((a, b) => b.total - a.total);
}

function getRouteEfficiency(visits) {
  const completed = visits.filter((visit) => visit.status === 'COMPLETED');
  const grouped = new Map();

  completed.forEach((visit) => {
    if (!visit.scheduledAt) return;
    const day = visit.scheduledAt.slice(0, 10);
    const key = `${visit.chwId}:${day}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        key,
        chwId: visit.chwId,
        chwName: visit.chwName,
        day,
        visits: [],
      });
    }
    grouped.get(key).visits.push(visit);
  });

  return Array.from(grouped.values())
    .map((group) => {
      group.visits.sort((a, b) => Date.parse(a.scheduledAt || '') - Date.parse(b.scheduledAt || ''));

      let totalDistanceKm = 0;
      let geoChecksPassed = 0;
      let withCoordinates = 0;

      group.visits.forEach((visit, index) => {
        if (visit.completionEvidence?.geoCheckPassed) geoChecksPassed += 1;
        if (visit.coordinates) withCoordinates += 1;
        if (index === 0) return;
        totalDistanceKm += haversineDistanceKm(group.visits[index - 1].coordinates, visit.coordinates);
      });

      const visitCount = group.visits.length;
      const avgKmPerVisit = visitCount > 1 ? totalDistanceKm / visitCount : 0;

      return {
        key: group.key,
        chwId: group.chwId,
        chwName: group.chwName,
        day: group.day,
        visitCount,
        totalDistanceKm,
        avgKmPerVisit,
        geoChecksPassed,
        withCoordinates,
      };
    })
    .sort((a, b) => Date.parse(b.day) - Date.parse(a.day));
}

function getReasonAnalytics(visits) {
  const noShowReasons = new Map();
  const rescheduleReasons = new Map();

  visits.forEach((visit) => {
    if (visit.status === 'NO_SHOW' && visit.reason) {
      noShowReasons.set(visit.reason, (noShowReasons.get(visit.reason) || 0) + 1);
    }

    (visit.rescheduleHistory || []).forEach((entry) => {
      if (!entry?.reason) return;
      rescheduleReasons.set(entry.reason, (rescheduleReasons.get(entry.reason) || 0) + 1);
    });
  });

  const toSortedRows = (map) =>
    Array.from(map.entries())
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count);

  return {
    noShowReasons: toSortedRows(noShowReasons),
    rescheduleReasons: toSortedRows(rescheduleReasons),
  };
}

function getEvidenceMetrics(visits) {
  const completed = visits.filter((visit) => visit.status === 'COMPLETED');
  const withEvidence = completed.filter((visit) => Boolean(visit.completionEvidence));
  const geoChecked = completed.filter((visit) => visit.completionEvidence?.geoCheckPassed).length;
  const noteQualityAverage =
    withEvidence.length > 0
      ? withEvidence.reduce((sum, visit) => sum + Number(visit.completionEvidence?.notesQualityScore || 0), 0) /
        withEvidence.length
      : 0;

  return {
    completedCount: completed.length,
    withEvidenceCount: withEvidence.length,
    evidenceRate: completed.length > 0 ? (withEvidence.length / completed.length) * 100 : 0,
    geoChecked,
    noteQualityAverage,
  };
}

export function syncHomeVisitGovernance(visitsState, meta = {}) {
  const chwMeta = {
    chwId: meta.chwId || 'CHW-001',
    chwName: meta.chwName || 'CHW User',
    serviceZone: meta.serviceZone || 'Machakos',
  };

  const normalized = flattenVisits(visitsState, chwMeta);
  const store = readStore();

  const remaining = store.visits.filter((visit) => {
    return !(visit.source === 'CHW_HOME_VISITS' && visit.chwId === chwMeta.chwId);
  });

  writeStore({
    ...store,
    visits: [...remaining, ...normalized],
  });
}

export function getHomeVisitGovernanceSnapshot() {
  const store = readStore();
  const visits = [...store.visits].sort((a, b) => Date.parse(b.updatedAt || 0) - Date.parse(a.updatedAt || 0));

  const metrics = {
    total: visits.length,
    scheduled: visits.filter((visit) => visit.status === 'SCHEDULED').length,
    completed: visits.filter((visit) => visit.status === 'COMPLETED').length,
    noShow: visits.filter((visit) => visit.status === 'NO_SHOW').length,
    canceled: visits.filter((visit) => visit.status === 'CANCELED').length,
  };

  return {
    visits,
    metrics,
    evidence: getEvidenceMetrics(visits),
    reasonAnalytics: getReasonAnalytics(visits),
    coverageByArea: getCoverageByArea(visits),
    routeEfficiency: getRouteEfficiency(visits),
    updatedAt: store.updatedAt,
  };
}

export function subscribeToHomeVisitGovernanceUpdates(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback(getHomeVisitGovernanceSnapshot());
  window.addEventListener(STORE_UPDATED_EVENT, handler);
  return () => window.removeEventListener(STORE_UPDATED_EVENT, handler);
}

function updateVisitById(visitId, updater) {
  const store = readStore();
  const nextVisits = store.visits.map((visit) => {
    if (visit.id !== visitId) return visit;
    const updated = updater(visit);
    return {
      ...updated,
      updatedAt: new Date().toISOString(),
    };
  });

  const changed = nextVisits.some((visit, index) => visit !== store.visits[index]);
  if (!changed) return { ok: false, reason: 'Visit not found' };

  writeStore({
    ...store,
    visits: nextVisits,
  });

  return { ok: true };
}

export function reviewCompletionEvidence(visitId, decision, reviewerName, note) {
  if (!['VERIFIED', 'REJECTED'].includes(decision)) {
    return { ok: false, reason: 'Invalid decision' };
  }

  return updateVisitById(visitId, (visit) => {
    if (visit.status !== 'COMPLETED') return visit;
    return {
      ...visit,
      evidenceReview: {
        status: decision,
        reviewedAt: new Date().toISOString(),
        reviewedBy: reviewerName || 'Admin Supervisor',
        note: note || null,
      },
    };
  });
}

export function resolveNoShowVisit(visitId, resolution, comment, followUpDueAt) {
  if (!resolution) {
    return { ok: false, reason: 'Resolution is required' };
  }

  return updateVisitById(visitId, (visit) => {
    if (visit.status !== 'NO_SHOW') return visit;
    return {
      ...visit,
      noShowResolution: {
        resolution,
        comment: comment || null,
        followUpDueAt: followUpDueAt || null,
        resolvedAt: new Date().toISOString(),
      },
    };
  });
}

export function reassignHomeVisitOwner(visitId, nextChwId, nextChwName, reason) {
  if (!nextChwName) {
    return { ok: false, reason: 'CHW name is required' };
  }

  return updateVisitById(visitId, (visit) => {
    const history = Array.isArray(visit.reassignmentHistory) ? [...visit.reassignmentHistory] : [];
    history.push({
      fromChwId: visit.chwId,
      fromChwName: visit.chwName,
      toChwId: nextChwId || visit.chwId,
      toChwName: nextChwName,
      reason: reason || 'Workload balancing',
      changedAt: new Date().toISOString(),
    });

    return {
      ...visit,
      chwId: nextChwId || visit.chwId,
      chwName: nextChwName,
      reassignmentHistory: history,
    };
  });
}
