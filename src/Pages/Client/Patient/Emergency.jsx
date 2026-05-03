import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Phone,
  MapPin,
  Users,
  Ambulance,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  Map as MapIcon,
  Star,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Loader } from '@googlemaps/js-api-loader';
import { ambulanceApi } from '../../../API/endpoints/ambulanceApi.js';
import { ambulanceService } from '../../../Services/domain/ambulanceService.js';
import { chwApi } from '../../../API/endpoints/chwApi.js';
import { patientApi } from '../../../API/endpoints/patientApi.js';
import { useAuth } from '../../../hooks/useAuth.jsx';

// ─── Constants ─────────────────────────────────────────────────────────────────
const DEFAULT_LOCATION = { lat: -1.286389, lng: 36.817223 };
const EMERGENCY_ORDERS_UPDATED_EVENT = 'patient-emergency-orders-updated';
const PATIENT_EMERGENCY_ORDERS_STORAGE_KEY = 'patient-emergency-orders-v1';
const ACTIVE_EMERGENCY_STATUSES = new Set([
  'REQUESTED', 'ASSIGNED', 'DISPATCHED', 'EN_ROUTE',
  'ON_SCENE', 'IN_PROGRESS', 'ACCEPTED',
]);

const EMERGENCY_TIPS = [
  {
    title: 'Stay calm and keep the patient comfortable',
    detail: 'A calm patient is easier to monitor. Keep them seated or lying down and avoid sudden movement.',
  },
  {
    title: 'Keep your phone nearby for communication',
    detail: 'Stay reachable for updates from the ambulance team or for urgent guidance from the portal.',
  },
  {
    title: 'Have someone wait outside to guide the ambulance',
    detail: 'A clear guide reduces response time and helps the crew find you faster.',
  },
  {
    title: 'Gather any relevant medical documents or medications',
    detail: 'Bring prescriptions, allergy details, and any medication the patient is currently taking.',
  },
];

// ─── Singleton Loader (same pattern as HomeVisits) ─────────────────────────────
let _mapsLoaderInstance = null;
const getMapsLoader = (apiKey) => {
  if (!_mapsLoaderInstance) {
    _mapsLoaderInstance = new Loader({ apiKey, libraries: ['marker'] });
  }
  return _mapsLoaderInstance;
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
const toArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  if (payload?.data && typeof payload.data === 'object') return toArray(payload.data);
  return [];
};

const readPersistedEmergencyOrders = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PATIENT_EMERGENCY_ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writePersistedEmergencyOrders = (rows = []) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      PATIENT_EMERGENCY_ORDERS_STORAGE_KEY,
      JSON.stringify(Array.isArray(rows) ? rows.slice(0, 100) : [])
    );
  } catch {
    // ignore storage failures
  }
};

const toNumberOrNull = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const titleCase = (value, fallback = '') => {
  const text = String(value || '').trim();
  if (!text) return fallback;
  return text
    .toLowerCase()
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getLocationFromRow = (row = {}) => {
  const lat = toNumberOrNull(
    row.latitude ?? row.lat ?? row.currentLatitude ?? row.locationLatitude ?? row.location?.lat ?? row.coordinates?.lat
  );
  const lng = toNumberOrNull(
    row.longitude ?? row.lng ?? row.currentLongitude ?? row.locationLongitude ?? row.location?.lng ?? row.coordinates?.lng
  );
  if (lat === null || lng === null) return null;
  return { lat, lng };
};

const mergeDispatchRows = (primaryRows = [], secondaryRows = []) => {
  const byKey = new Map();
  [...toArray(secondaryRows), ...toArray(primaryRows)].forEach((row) => {
    if (!row || typeof row !== 'object') return;
    const key = String(row.id ?? row.incidentId ?? `${row.patientId || ''}-${row.createdAt || row.requestTime || ''}`);
    if (!key) return;
    byKey.set(key, row);
  });
  return Array.from(byKey.values());
};

const mergeAmbulanceTracking = (ambulanceRows = [], trackingRows = []) => {
  const trackingByKey = new Map();
  toArray(trackingRows).forEach((trackingRow) => {
    if (!trackingRow || typeof trackingRow !== 'object') return;
    const key = String(
      trackingRow.ambulanceId ?? trackingRow.unitId ?? trackingRow.ambulanceUnitId ?? trackingRow.id ?? trackingRow.vehiclePlate ?? ''
    ).trim().toUpperCase();
    if (!key) return;
    trackingByKey.set(key, trackingRow);
  });

  return toArray(ambulanceRows).map((ambulanceRow) => {
    if (!ambulanceRow || typeof ambulanceRow !== 'object') return ambulanceRow;
    const key = String(
      ambulanceRow.id ?? ambulanceRow.ambulanceId ?? ambulanceRow.unitId ?? ambulanceRow.vehiclePlate ?? ''
    ).trim().toUpperCase();
    const trackingRow = trackingByKey.get(key) || null;
    if (!trackingRow) return ambulanceRow;

    return {
      ...ambulanceRow,
      tracking: trackingRow,
      currentLatitude: toNumberOrNull(trackingRow.currentLatitude ?? trackingRow.latitude ?? trackingRow.lat),
      currentLongitude: toNumberOrNull(trackingRow.currentLongitude ?? trackingRow.longitude ?? trackingRow.lng),
      currentLocation: trackingRow.locationAddress || trackingRow.currentLocation || ambulanceRow.currentLocation,
    };
  });
};

const isPermissionDeniedError = (err) => {
  const status = Number(err?.status || err?.response?.status || err?.code || 0);
  const message = String(err?.message || err?.response?.data?.message || '').toLowerCase();
  return status === 401 || status === 403 || message.includes('permission') || message.includes('forbidden') || message.includes('unauthorized');
};

const distanceKm = (a, b) => {
  if (!a || !b) return null;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const hav = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 6371 * (2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav)));
};

const formatDistance = (rawDistance, userLocation, responderLocation) => {
  const explicitDistance = toNumberOrNull(rawDistance);
  if (explicitDistance !== null) return `${explicitDistance.toFixed(1)} km`;
  const computed = distanceKm(userLocation, responderLocation);
  if (computed === null) return 'Distance unavailable';
  return `${computed.toFixed(1)} km`;
};

const normalizeChwStatus = (status) => String(status || '').trim().toUpperCase();
const isChwAvailable = (status) => !['OFFLINE', 'ON_LEAVE', 'INACTIVE'].includes(normalizeChwStatus(status));

const normalizeChw = (row = {}, userLocation) => {
  const firstName = String(row.firstName || '').trim();
  const middleName = String(row.middleName || '').trim();
  const lastName = String(row.lastName || '').trim();
  const fullName =
    String(row.fullName || row.name || '').trim() ||
    [firstName, middleName, lastName].filter(Boolean).join(' ').trim() ||
    'Unknown CHW';
  const status = normalizeChwStatus(row.status);
  const ratingNumber = toNumberOrNull(row.rating ?? row.averageRating);
  return {
    id: row.id,
    name: fullName,
    phone: row.phone || row.phoneNumber || row.contactPhone || 'N/A',
    specialization: row.specialization || 'Community Health Worker',
    distance: formatDistance(row.distanceKm ?? row.distance, userLocation, getLocationFromRow(row)),
    rating: ratingNumber !== null ? ratingNumber.toFixed(1) : 'N/A',
    available: isChwAvailable(status),
    location: getLocationFromRow(row),
    responseTime: row.responseTime || row.averageResponseTime || (status === 'BUSY' ? '10-20 min' : '5-15 min'),
    status,
  };
};

const normalizeAmbulanceStatus = (status) => String(status || '').trim().toUpperCase();
const isAmbulanceAvailable = (status) => ['AVAILABLE', 'ACTIVE', 'READY', 'IDLE'].includes(normalizeAmbulanceStatus(status));

const extractEquipment = (row = {}) => {
  if (Array.isArray(row.equipmentList)) return row.equipmentList.map(String);
  if (Array.isArray(row.equipment)) {
    return row.equipment.map((item) => item?.name || item?.equipmentName || String(item || '')).filter(Boolean);
  }
  return [];
};

const normalizeAmbulance = (row = {}, userLocation) => {
  const status = normalizeAmbulanceStatus(row.status);
  const vehiclePlate = row.vehiclePlate || row.vehicleNumber || row.registrationNumber || `AMB-${row.id ?? 'N/A'}`;
  const type = titleCase(row.type, 'Ambulance');
  const equipment = extractEquipment(row);
  const etaMinutes = toNumberOrNull(row.averageResponseMinutes);
  const formattedEta = row.estimatedResponseTime || row.eta || row.averageResponseTime || (etaMinutes !== null ? `${etaMinutes} minutes` : 'Pending dispatch');
  const numericCost = toNumberOrNull(row.cost ?? row.estimatedCost);
  // Estimate numeric distance (km)
  const loc = getLocationFromRow(row);
    const locationLabel = row.currentLocation || row.locationAddress || row.location || row.locationName || (loc ? `${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}` : 'Unknown location') + ' Area';
  let numericDistanceKm = null;
  const explicitDistance = toNumberOrNull(row.estimatedDistance ?? row.distanceKm ?? row.distance);
  if (explicitDistance !== null) numericDistanceKm = explicitDistance;
  else {
    try {
      const dKm = distanceKm(userLocation, loc);
      if (dKm !== null) numericDistanceKm = Number(dKm.toFixed(2));
    } catch {
      numericDistanceKm = null;
    }
  }

  // Pricing strategy
  const baseRatePerKm = 50; // Ksh per km
  const minFare = 500; // minimum charge in Ksh
  const eqCount = Array.isArray(equipment) ? equipment.length : 0;
  const advancedKeywords = ['ICU','VENTILATOR','DEFIBRILLATOR','OXYGEN','SPINAL','TRAUMA','CARDIAC','MONITOR','INTUBATION'];
  const advancedCount = equipment.filter((e) => advancedKeywords.some((k) => String(e || '').toUpperCase().includes(k))).length;
  const equipmentSurcharge = eqCount * 30 + advancedCount * 150;
  const distanceForCalc = numericDistanceKm !== null ? numericDistanceKm : 3; // fallback 3 km
  const estimatedNumericCost = Math.max(minFare, Math.round(baseRatePerKm * distanceForCalc + equipmentSurcharge));

  const displayCost = numericCost !== null ? `Ksh ${numericCost}` : `Ksh ${estimatedNumericCost}`;

  return {
    id: row.id,
    backendId: row.id,
    vehiclePlate,
    name: row.name || `MediLink Ambulance ${vehiclePlate}`,
    type,
    distance: formatDistance(row.estimatedDistance ?? row.distanceKm ?? row.distance, userLocation, getLocationFromRow(row)),
    eta: formattedEta,
    available: isAmbulanceAvailable(status),
    status,
    location: loc,
    locationLabel,
    equipment,
    cost: displayCost,
    driverName: row.driverName || row.currentDriver?.name || row.currentDriverName || 'Unassigned',
    driverPhone: row.driverPhone || row.currentDriver?.phone || row.driverContact || '',
  };
};

const extractPatientName = (patient) => {
  if (!patient) return '';
  const fullName = String(patient.fullName || patient.name || '').trim();
  if (fullName) return fullName;
  return [patient.firstName, patient.middleName, patient.lastName]
    .map((part) => String(part || '').trim()).filter(Boolean).join(' ').trim();
};

const normalizePhone = (value) => String(value || '').replace(/\D/g, '');
const normalizeName = (value) => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
const toTimestamp = (value) => { const d = new Date(value || ''); const ms = d.getTime(); return Number.isNaN(ms) ? 0 : ms; };
const formatDateTime = (value) => {
  const date = new Date(value || '');
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString('en-KE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};
const normalizeDispatchStatus = (status) => String(status || 'REQUESTED').trim().toUpperCase();
const dispatchStatusTone = (status) => {
  const n = normalizeDispatchStatus(status);
  if (['DISPATCHED', 'EN_ROUTE', 'ON_SCENE', 'IN_PROGRESS', 'ACCEPTED', 'ASSIGNED'].includes(n)) return 'bg-blue-50 text-blue-700 border border-blue-200';
  if (['COMPLETED', 'RESOLVED', 'CLOSED'].includes(n)) return 'bg-green-50 text-green-700 border border-green-200';
  if (['CANCELLED', 'REJECTED', 'FAILED'].includes(n)) return 'bg-red-50 text-red-700 border border-red-200';
  return 'bg-amber-50 text-amber-700 border border-amber-200';
};


const EmergencyGoogleMap = ({
  userLocation = DEFAULT_LOCATION,
  ambulances = [],
  chws = [],
  view = 'ambulance',
  className = '',
  style = {},
}) => {
  const mapRef        = useRef(null);
  const containerRef  = useRef(null);
  const markersRef    = useRef([]);
  const [mapReady, setMapReady]   = useState(false);   // Fix 1
  const [loadError, setLoadError] = useState('');

  const apiKey =
    (import.meta?.env?.VITE_GOOGLE_CLOUD_MAPS_API_KEY) ||
    document.querySelector('meta[name="google-maps-api-key"]')?.getAttribute('content') ||
    (import.meta?.env?.GOOGLE_CLOUD_MAPS_API_KEY) ||
    null;

  const rawMapId = import.meta?.env?.VITE_GOOGLE_MAPS_MAP_ID || null;
  const mapId = rawMapId && !/^%.*%$/.test(String(rawMapId).trim()) ? String(rawMapId).trim() : null;


  useEffect(() => {
    let cancelled = false;
    const initMap = async () => {
      if (typeof window === 'undefined') return;
      if (!apiKey) { setLoadError('Google Maps API key is not defined'); return; }
      if (!containerRef.current) return;
      try {
        const loader = getMapsLoader(apiKey);   // Fix 2 – singleton
        await loader.load();
        if (cancelled) return;
        if (!window.google?.maps) { setLoadError('Google Maps loaded but window.google.maps is missing'); return; }
        const maps = window.google.maps;
        const mapInstance = new maps.Map(containerRef.current, {
          center: DEFAULT_LOCATION,             // Fix 3 – fixed initial center
          zoom: 12,
          ...(mapId ? { mapId } : {}),
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        mapRef.current = mapInstance;
        setLoadError('');
        setMapReady(true);                      // Fix 1 – signal ready
      } catch (err) {
        if (!cancelled) {
          console.error('EmergencyGoogleMap: init failed', err);
          setLoadError(String(err?.message || 'Failed to load Google Maps'));
        }
      }
    };
    initMap();
    return () => { cancelled = true; };
  }, [apiKey, mapId]);  


  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear previous markers
    markersRef.current.forEach((m) => {
      if (typeof m?.setMap === 'function') m.setMap(null);
      else if ('map' in (m ?? {})) m.map = null;
    });
    markersRef.current = [];

    const maps = window.google?.maps;
    if (!maps) return;

    const canUseAdvanced = Boolean(mapId && window.google?.maps?.marker?.AdvancedMarkerElement);
    const allPoints = [];

    // ── helper: create a DOM element marker ──
    const makeDomMarker = (bgColor, label, size = 40) => {
      const el = document.createElement('div');
      el.style.cssText = [
        `width:${size}px`, `height:${size}px`, 'border-radius:50%',
        `background:${bgColor}`, 'display:flex', 'align-items:center',
        'justify-content:center', 'color:#fff', 'font-weight:900',
        `font-size:${Math.round(size * 0.45)}px`, 'border:2px solid #fff',
        'box-shadow:0 2px 8px rgba(0,0,0,.30)', 'cursor:pointer',
      ].join(';');
      el.textContent = label;
      return el;
    };

    const makeSvgUrl = (label, color) => {

      try {
        let normalized = String(color || '') || '#000000';

        for (let i = 0; i < 3 && !normalized.startsWith('#'); i += 1) {
          try { normalized = decodeURIComponent(normalized); } catch { break; }
        }
        if (!normalized.startsWith('#')) normalized = `#${normalized.replace(/^%23/, '')}`;

        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'><circle cx='28' cy='28' r='24' fill='${normalized}' stroke='%23fff' stroke-width='3'/><text x='28' y='36' font-size='22' text-anchor='middle' fill='%23fff' font-family='Arial' font-weight='900'>${label}</text></svg>`;
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
      } catch {
     
        const fallback = `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'><circle cx='28' cy='28' r='24' fill='#000' stroke='%23fff' stroke-width='3'/></svg>`;
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(fallback)}`;
      }
    };

    // ── helper: place one marker + info window ──
    const placeMarker = ({ lat, lng, domEl, svgUrl, infoHtml }) => {
      const infoWindow = new maps.InfoWindow({ content: infoHtml });

      if (canUseAdvanced) {
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat, lng },
          content: domEl,
        });
        marker.addEventListener('gmp-click', () => infoWindow.open({ anchor: marker, map }));
        markersRef.current.push(marker);
      } else {
        const marker = new maps.Marker({
          map,
          position: { lat, lng },
          icon: { url: svgUrl, scaledSize: new maps.Size(56, 56) },
        });
        marker.addListener('click', () => infoWindow.open({ anchor: marker, map }));
        markersRef.current.push(marker);
      }
    };

    // ── 1. User location pin ──
    const uLat = toNumberOrNull(userLocation?.lat);
    const uLng = toNumberOrNull(userLocation?.lng);
    if (uLat !== null && uLng !== null) {
      allPoints.push({ lat: uLat, lng: uLng });

      const domEl = document.createElement('div');
      domEl.style.cssText = [
        'width:20px', 'height:20px', 'border-radius:50%',
        'background:#2563eb', 'border:3px solid #fff',
        'box-shadow:0 0 0 5px rgba(37,99,235,0.3)',
        'cursor:default',
      ].join(';');

      const svgUrl = makeSvgUrl('U', '%232563eb');
      const infoHtml = `<div style="padding:4px 2px;min-width:110px"><p style="font-weight:700;margin:0">📍 Your Location</p></div>`;
      placeMarker({ lat: uLat, lng: uLng, domEl, svgUrl, infoHtml });
    }

    // ── 2. View-specific pins ──
    if (view === 'ambulance') {
      ambulances.forEach((amb) => {
        const loc = amb.location;
        if (!loc) return;
        const lat = toNumberOrNull(loc.lat);
        const lng = toNumberOrNull(loc.lng);
        if (lat === null || lng === null) return;
        allPoints.push({ lat, lng });

        const color   = amb.available ? '#dc2626' : '#9ca3af';  // red or gray
        const label   = 'A';
        const domEl   = makeDomMarker(color, label, 44);
        const svgUrl  = makeSvgUrl(label, amb.available ? '%23dc2626' : '%239ca3af');
        const infoHtml = `
          <div style="padding:6px 8px;min-width:200px;max-width:320px;font-family:Arial,Helvetica,sans-serif;">
            <p style="font-weight:700;margin:0 0 6px">${amb.name}</p>
            <p style="margin:0 0 4px;color:#444;font-size:13px">${amb.type}</p>
            <p style="margin:0 0 4px;color:#444;font-size:13px">Location: ${amb.locationLabel || 'Unknown location'}</p>
            <p style="margin:0 0 4px;color:#444;font-size:13px">Distance: ${amb.distance}</p>
            <p style="margin:0 0 4px;color:#444;font-size:13px">ETA: ${amb.eta}</p>
            <p style="margin:0;font-weight:600;color:${amb.available ? '#16a34a' : '#9ca3af'}">
              ${amb.available ? '● Available' : ' Unavailable'}
            </p>
          </div>`;
        placeMarker({ lat, lng, domEl, svgUrl, infoHtml });
      });

    }

    if (view === 'chw') {
      chws.forEach((chw) => {
        const loc = chw.location;
        if (!loc) return;
        const lat = toNumberOrNull(loc.lat);
        const lng = toNumberOrNull(loc.lng);
        if (lat === null || lng === null) return;
        allPoints.push({ lat, lng });

        const color  = chw.available ? '#16a34a' : '#9ca3af';  // green or gray
        const label  = 'C';
        const domEl  = makeDomMarker(color, label, 44);
        const svgUrl = makeSvgUrl(label, chw.available ? '%2316a34a' : '%239ca3af');
        const infoHtml = `
          <div style="padding:4px 2px;min-width:170px">
            <p style="font-weight:700;margin:0 0 3px"> ${chw.name}</p>
            <p style="margin:0 0 2px;color:#444">${chw.specialization}</p>
            <p style="margin:0 0 2px">Distance: ${chw.distance}</p>
            <p style="margin:0 0 2px">Response: ${chw.responseTime}</p>
            <p style="margin:0 0 2px">Rating:  ${chw.rating}</p>
            <p style="margin:0;font-weight:600;color:${chw.available ? '#16a34a' : '#9ca3af'}">
              ${chw.available ? '● Available' : ' Unavailable'}
            </p>
          </div>`;
        placeMarker({ lat, lng, domEl, svgUrl, infoHtml });
      });
    }

    // ── 3. Fit map to all visible points ──
    if (allPoints.length === 1) {
      map.setCenter({ lat: allPoints[0].lat, lng: allPoints[0].lng });
      map.setZoom(13);
    } else if (allPoints.length > 1) {
      const bounds = new maps.LatLngBounds();
      allPoints.forEach((p) => bounds.extend(new maps.LatLng(p.lat, p.lng)));
      map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
    }

    return () => {
      markersRef.current.forEach((m) => {
        if (typeof m?.setMap === 'function') m.setMap(null);
        else if ('map' in (m ?? {})) m.map = null;
      });
      markersRef.current = [];
    };
  }, [ambulances, chws, view, userLocation, mapId, mapReady]); // Fix 1 – mapReady in deps

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      <div ref={containerRef} style={{ height: '100%', width: '100%', background: '#f0f4f8' }} />
      {loadError && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div className="bg-white/90 border border-gray-200 px-4 py-2 text-sm text-red-600 pointer-events-auto shadow">
            <div className="font-semibold">Map error</div>
            <div>{loadError}</div>
            <div className="text-xs text-gray-500 mt-1">Ensure <code>VITE_GOOGLE_CLOUD_MAPS_API_KEY</code> is set and dev server was restarted.</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Emergency (main page) ─────────────────────────────────────────────────────
const Emergency = () => {
  const [activeTab, setActiveTab] = useState('ambulance');
  const [showMap, setShowMap] = useState(false);
  const [mapView, setMapView] = useState('chw');
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showRecentModal, setShowRecentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [selectedCHW, setSelectedCHW] = useState(null);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [showCHWModal, setShowCHWModal] = useState(false);
  const [showAmbulanceModal, setShowAmbulanceModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [chwRows, setChwRows] = useState([]);
  const [ambulanceRows, setAmbulanceRows] = useState([]);
  const { user } = useAuth();
  const [patientProfile, setPatientProfile] = useState(null);
  const [loadingChw, setLoadingChw] = useState(true);
  const [loadingAmbulances, setLoadingAmbulances] = useState(true);
  const [chwError, setChwError] = useState('');
  const [ambulanceError, setAmbulanceError] = useState('');
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [dispatchRows, setDispatchRows] = useState(() => readPersistedEmergencyOrders());
  const [dispatchLoading, setDispatchLoading] = useState(true);
  const [dispatchError, setDispatchError] = useState('');
  const communityHealthWorkers = useMemo(() =>
    toArray(chwRows).map((row) => normalizeChw(row, userLocation))
      .sort((a, b) => Number(b.available) - Number(a.available)),
    [chwRows, userLocation]
  );

  const ambulances = useMemo(() =>
    toArray(ambulanceRows).map((row) => normalizeAmbulance(row, userLocation))
      .sort((a, b) => Number(b.available) - Number(a.available)),
    [ambulanceRows, userLocation]
  );

  const patientDispatches = useMemo(() => {
    const profileId   = patientProfile?.id ? String(patientProfile.id) : '';
    const profilePhone = normalizePhone(patientProfile?.phone || patientProfile?.phoneNumber || '');
    const profileName  = normalizeName(extractPatientName(patientProfile));
    const ambulanceNameById   = new Map(ambulances.map((a) => [String(a.backendId), a.name]));
    const ambulanceStatusById = new Map(ambulances.map((a) => [String(a.backendId), normalizeDispatchStatus(a.status)]));
    const ambulanceStatusByPlate = new Map(ambulances.map((a) => [String(a.vehiclePlate || '').toUpperCase(), normalizeDispatchStatus(a.status)]));

    return toArray(dispatchRows)
      .map((row) => {
        const timestamp = row.requestTime || row.createdAt || row.updatedAt || row.dispatchTime;
        const dispatchStatus = normalizeDispatchStatus(row.status);
        const pickupAddress = [row.pickupAddressLine1, row.pickupAddressLine2, row.pickupCity]
          .filter(Boolean).join(', ') || row.pickupLocation || row.location || 'N/A';
        const vehiclePlate = row.vehiclePlate || row.ambulance?.vehiclePlate || row.ambulanceUnitId || 'Pending assignment';
        const hasAssignedVehicle = vehiclePlate !== 'Pending assignment';
        const matchedAmbulanceStatus =
          ambulanceStatusById.get(String(row.ambulanceId || '')) ||
          ambulanceStatusByPlate.get(String(vehiclePlate || '').toUpperCase()) || null;
        const status = matchedAmbulanceStatus && ['REQUESTED', 'PENDING'].includes(dispatchStatus)
          ? matchedAmbulanceStatus : dispatchStatus;
        return {
          backendId: row.id,
          incidentId: row.incidentId || `EMG-${row.id}`,
          status,
          statusLabel: titleCase(status, 'Requested'),
          priority: titleCase(row.priority || 'HIGH', 'High'),
          patientId: row.patientId,
          patientName: row.patientName || '',
          callerName: row.callerName || '',
          callerPhone: row.callerPhone || '',
          incidentType: titleCase(row.incidentType || 'MEDICAL_EMERGENCY', 'Medical Emergency'),
          requestedAt: timestamp,
          requestedAtMs: toTimestamp(timestamp),
          requestedAtLabel: formatDateTime(timestamp),
          pickupAddress,
          destination: row.dropoffAddressLine1 || row.hospitalName || row.destination || 'Nearest Hospital',
          vehiclePlate,
          ambulanceName:
            ambulanceNameById.get(String(row.ambulanceId || '')) ||
            row.ambulance?.name || row.ambulanceName ||
            (hasAssignedVehicle ? `Ambulance ${vehiclePlate}` : `Status: ${titleCase(status, 'Requested')}`),
          estimatedResponse: row.estimatedResponseTime || row.estimatedResponse || 'Pending',
          estimatedDistance: row.estimatedDistance || '',
          notes: row.specialInstructions || row.notes || '',
          raw: row,
        };
      })
      .filter((item) => {
        if (!patientProfile) return true;
        if (profileId && String(item.patientId || '') === profileId) return true;
        const callerPhone = normalizePhone(item.callerPhone);
        if (profilePhone && callerPhone && callerPhone.endsWith(profilePhone.slice(-9))) return true;
        const patientName = normalizeName(item.patientName);
        const callerName  = normalizeName(item.callerName);
        if (profileName && (patientName === profileName || callerName === profileName)) return true;
        return false;
      })
      .sort((a, b) => b.requestedAtMs - a.requestedAtMs);
  }, [dispatchRows, patientProfile, ambulances]);

  // ── data fetching ────────────────────────────────────────────────────────────
  const fetchPatientProfile = useCallback(async () => {
    try {
      const profile = await patientApi.me({ fallbackUserId: user?.id });
      setPatientProfile(profile || null);
    } catch { setPatientProfile(null); }
  }, [user?.id]);

  const fetchChwData = useCallback(async () => {
    setLoadingChw(true); setChwError('');
    try {
      const payload = await chwApi.list();
      setChwRows(toArray(payload));
    } catch (err) { setChwRows([]); setChwError(err?.message || 'Failed to load CHWs.'); }
    finally { setLoadingChw(false); }
  }, []);

  const fetchAmbulanceData = useCallback(async () => {
    setLoadingAmbulances(true); setAmbulanceError('');
    try {
      let payload;
      try { payload = await ambulanceApi.list(); }
      catch { payload = await ambulanceApi.listAvailable(); }

      let trackingPayload = [];
      try { trackingPayload = await ambulanceApi.listActiveTracking(); } catch { trackingPayload = []; }

      // Fetch drivers and map to ambulances (best-effort)
      let driversPayload = [];
      try { driversPayload = await ambulanceService.getAllDrivers(); } catch { driversPayload = []; }
      const drivers = toArray(driversPayload);

      const driverMap = new Map();
      drivers.forEach((d) => {
        try {
          const ambId = d.currentAmbulance?.id ?? d.assignedAmbulance?.id ?? d.ambulanceId ?? d.ambulance?.id ?? null;
          if (ambId !== null && ambId !== undefined) driverMap.set(String(ambId).toUpperCase(), d);
          const plate = (d.currentVehicle || d.vehiclePlate || d.vehicleNumber || d.vehicle || d.currentAmbulance?.vehiclePlate || d.ambulance?.vehiclePlate || '').toString().toUpperCase();
          if (plate) driverMap.set(plate, d);
        } catch (e) { /* ignore */ }
      });

      const ambulancesRaw = toArray(payload).map((r) => {
        if (!r || typeof r !== 'object') return r;
        const key = String(r.id ?? r.ambulanceId ?? r.unitId ?? r.vehiclePlate ?? '').toUpperCase();
        const driver = driverMap.get(key) || driverMap.get(String(r.vehiclePlate || '').toUpperCase()) || null;
        if (driver) {
          return {
            ...r,
            driverName: r.driverName || driver.name || r.driverName,
            driverPhone: r.driverPhone || driver.phone || driver.driverPhone || r.driverPhone,
            currentDriver: r.currentDriver || { id: driver.id, name: driver.name, phone: driver.phone },
          };
        }
        return r;
      });

      setAmbulanceRows(mergeAmbulanceTracking(ambulancesRaw, toArray(trackingPayload)));
    } catch (err) { setAmbulanceRows([]); setAmbulanceError(err?.message || 'Failed to load ambulances.'); }
    finally { setLoadingAmbulances(false); }
  }, []);

  const fetchDispatchData = useCallback(async ({ silent = false } = {}) => {
    if (!silent) { setDispatchLoading(true); setDispatchError(''); }
    try {
      const payload = await ambulanceApi.listDispatches();
      const mergedRows = mergeDispatchRows(toArray(payload), readPersistedEmergencyOrders());
      setDispatchRows(mergedRows);
      writePersistedEmergencyOrders(mergedRows);
    } catch (err) {
      if (isPermissionDeniedError(err)) {
        setDispatchRows(readPersistedEmergencyOrders());
        setDispatchError('');
      } else { setDispatchError(err?.message || 'Failed to load emergency requests.'); }
    } finally { if (!silent) setDispatchLoading(false); }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error('Geolocation error:', err)
      );
    }
  }, []);

  useEffect(() => {
    fetchPatientProfile();
    fetchChwData();
    fetchAmbulanceData();
    fetchDispatchData();
  }, [fetchPatientProfile, fetchChwData, fetchAmbulanceData, fetchDispatchData]);

  // ── handlers ─────────────────────────────────────────────────────────────────
  const handleCallCHW = (chw) => { closeAllModals(); setSelectedCHW(chw); setShowCHWModal(true); };

  const handleOrderAmbulance = (ambulance) => {
    closeAllModals();
    setSelectedAmbulance(ambulance); setOrderError(''); setOrderConfirmed(false); setShowAmbulanceModal(true);
  };

  const confirmAmbulanceOrder = async () => {
    if (!selectedAmbulance?.backendId || orderSubmitting) return;
    const patientName = extractPatientName(patientProfile);
    const payload = {
      incidentType: 'MEDICAL_EMERGENCY', priority: 'HIGH',
      patientId: patientProfile?.id || null,
      patientName: patientName || 'Portal Patient',
      patientCondition: 'Emergency assistance requested from patient portal',
      callerName: patientName || null,
      callerPhone: patientProfile?.phone || patientProfile?.phoneNumber || null,
      pickupAddressLine1: patientProfile?.addressLine1 || patientProfile?.address || 'Patient current location',
      pickupCity: patientProfile?.city || null, pickupCountry: patientProfile?.country || 'Kenya',
      pickupLatitude: userLocation.lat, pickupLongitude: userLocation.lng,
      specialInstructions: 'Requested directly via patient emergency page.',
      requiresStretcher: true, ambulanceId: selectedAmbulance.backendId,
    };
    setOrderSubmitting(true); setOrderError('');
    try {
      const createdDispatch = await ambulanceApi.requestAssistance(payload);
      const fallback = {
        id: createdDispatch?.id || `local-${Date.now()}`,
        incidentId: createdDispatch?.incidentId, status: createdDispatch?.status || 'REQUESTED',
        patientId: payload.patientId, patientName: payload.patientName,
        callerName: payload.callerName, callerPhone: payload.callerPhone,
        incidentType: payload.incidentType, vehiclePlate: selectedAmbulance.vehiclePlate || selectedAmbulance.backendId || 'Pending assignment',
        ambulanceId: selectedAmbulance.backendId, estimatedResponseTime: selectedAmbulance.eta,
        estimatedDistance: selectedAmbulance.distance, pickupAddressLine1: payload.pickupAddressLine1,
        pickupCity: payload.pickupCity, requestTime: createdDispatch?.requestTime || new Date().toISOString(),
        createdAt: createdDispatch?.createdAt || new Date().toISOString(),
      };
      const mergedRows = mergeDispatchRows([createdDispatch || fallback], dispatchRows);
      setDispatchRows(mergedRows); writePersistedEmergencyOrders(mergedRows);
      setOrderConfirmed(true);
      await fetchAmbulanceData();
      await fetchDispatchData({ silent: true });
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(EMERGENCY_ORDERS_UPDATED_EVENT));
      setTimeout(() => { setShowAmbulanceModal(false); setOrderConfirmed(false); }, 3000);
    } catch (err) { setOrderError(err?.message || 'Failed to submit ambulance request.'); }
    finally { setOrderSubmitting(false); }
  };

  const tabs = [
    { id: 'ambulance', label: 'Order Ambulance',            icon: Ambulance },
    { id: 'chw',       label: 'Community Health Workers',   icon: Users },
  ];

  const closeAllModals = () => {
    setShowMap(false);
    setShowOrdersModal(false);
    setShowRecentModal(false);
    setShowHistoryModal(false);
    setShowCHWModal(false);
    setShowAmbulanceModal(false);
  };

  const openMapOverlay = (view) => { closeAllModals(); setMapView(view); setShowMap(true); };
  const openOrdersModal = () => { closeAllModals(); setShowOrdersModal(true); };
  const openRecentModal = () => { closeAllModals(); setShowRecentModal(true); };
  const openHistoryModal = () => { closeAllModals(); setShowHistoryModal(true); };
  const openTipsModal = () => { closeAllModals(); setTipIndex(0); setShowTipsModal(true); };
  const closeTipsModal = () => { setShowTipsModal(false); setTipIndex(0); };
  const goToNextTip = () => {
    setTipIndex((current) => Math.min(current + 1, EMERGENCY_TIPS.length));
  };
  const goToPreviousTip = () => {
    setTipIndex((current) => Math.max(current - 1, 0));
  };

  const mapMeta = {
    chw: {
      title: 'Nearby CHW Coverage Map',
      subtitle: 'Showing Community Health Workers around your area',
      badgeLabel: 'CHW Live View',
    },
    ambulance: {
      title: 'Live Ambulance Coverage Map',
      subtitle: 'Showing available ambulance coverage around your area',
      badgeLabel: 'Ambulance Live View',
    },
  };

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4 bg-gray-50">
      {/* Header */}
      <div className="rounded-lg p-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-gray-900">Emergency Services</h1>
            <p className="text-xs text-gray-600">24/7 Emergency support</p>
          </div>
        </div>
      </div>

      {/* Hotline summary */}
      <div className="px-2 w-full max-w-full overflow-hidden">
        <h2 className="text-base font-bold text-gray-900 mb-1.5 flex items-center">
          <Phone className="w-4 h-4 mr-2 text-blue-600" />
          Emergency Hotlines
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2">
          <a href="tel:999" className="min-w-0 w-full p-2.5 border border-gray-200 hover:border-red-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">National Emergency</p>
            <p className="text-sm sm:text-base font-bold text-red-600 break-all">999</p>
          </a>
          <a href="tel:+254743669252" className="min-w-0 w-full p-2.5 border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">MediLink Emergency</p>
            <p className="text-sm sm:text-base font-bold text-blue-600 break-all">0743669252</p>
          </a>
          <a href="tel:911" className="min-w-0 w-full p-2.5 border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">Ambulance</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 break-all">911</p>
          </a>
          <a href="tel:+254743669252" className="min-w-0 w-full p-2.5 border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">Poison Control</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 break-all">0743669252</p>
          </a>
          <a href="tel:1195" className="min-w-0 w-full p-2.5 border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">Mental Health</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 break-all">1195</p>
          </a>
        </div>
        {/* Quick map launch buttons (summarize maps at top with hotlines) */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
         
          <button onClick={openOrdersModal}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors shadow-sm">
            <MapIcon className="w-4 h-4 text-blue-700" />
            <span>My Orders</span>
          </button>
          <button onClick={openRecentModal}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors shadow-sm">
            <MapIcon className="w-4 h-4 text-blue-700" />
            <span>Recent Requests</span>
          </button>
          <button onClick={openHistoryModal}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors shadow-sm">
            <MapIcon className="w-4 h-4 text-blue-700" />
            <span>Emergency History</span>
          </button>
          <button onClick={openTipsModal}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors shadow-sm">
            <MapIcon className="w-4 h-4 text-blue-600" />
            <span>Emergency Tips</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-800 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" /><span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="space-y-4">

        {/* ── CHW Tab ── */}
        {activeTab === 'chw' && (
          <div className="space-y-4">
            <div className="flex items-center justify-end lg:hidden">
              <button onClick={() => openMapOverlay('chw')}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
                <MapIcon className="w-4 h-4 text-blue-600" /><span>Open Live Map</span>
              </button>
            </div>

            {/* Desktop map */}
            <div className="hidden lg:block border border-gray-200 overflow-hidden relative z-0">
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />{mapMeta.chw.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">{mapMeta.chw.subtitle}</p>
                  </div>
                  <span className="text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">{mapMeta.chw.badgeLabel}</span>
                </div>
              </div>
              {/* Legend */}
              <div className="flex items-center gap-4 px-5 py-2 border-b border-gray-100 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>Your location</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block"></span>Available CHW</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block"></span>Unavailable CHW</span>
              </div>
              <EmergencyGoogleMap
                userLocation={userLocation}
                ambulances={ambulances}
                chws={communityHealthWorkers}
                view="chw"
                className="w-full h-[520px] xl:h-[620px]"
              />
            </div>

            {/* CHW List */}
            <div className="p-3 border border-gray-200 bg-white">
              <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Available Community Health Workers Near You
              </h2>
              {loadingChw ? (
                <div className="p-3 text-sm text-gray-500 border border-gray-200 rounded-lg">Loading active CHWs...</div>
              ) : chwError ? (
                <div className="p-3 text-sm text-red-600 border border-red-200 rounded-lg flex items-center justify-between gap-3">
                  <span>{chwError}</span>
                  <button onClick={fetchChwData} className="px-2.5 py-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-700 rounded">Retry</button>
                </div>
              ) : communityHealthWorkers.length === 0 ? (
                <div className="p-3 text-sm text-gray-500 border border-gray-200 rounded-lg">No CHWs are currently available.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
                  {communityHealthWorkers.map((chw) => (
                    <div key={chw.id} className={`p-2 border rounded-lg transition-all ${chw.available ? 'border-gray-200 hover:shadow-lg hover:border-gray-300' : 'border-gray-200 bg-gray-50 opacity-60'}`}>
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {chw.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{chw.name}</h3>
                            <p className="text-xs text-gray-600">{chw.specialization}</p>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="flex items-center text-xs"><MapPin className="w-3 h-3 mr-0.5" />{chw.distance}</span>
                          <span className="flex items-center text-xs"><Clock className="w-3 h-3 mr-0.5" />{chw.responseTime}</span>
                          <span className="flex items-center text-xs text-blue-600"><Star className="w-3 h-3 mr-0.5 fill-current" />{chw.rating}</span>
                        </div>
                        <div className="mt-2">
                          {chw.available ? (
                            <div className="flex flex-col space-y-1 items-center">
                              <span className="px-2 py-0.5 text-green-800 text-xs font-bold">Available</span>
                              <a href={`tel:${chw.phone}`} onClick={() => handleCallCHW(chw)}
                                className="px-1.5 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-colors flex items-center space-x-1">
                                <Phone className="w-3 h-3" /><span>Call</span>
                              </a>
                            </div>
                          ) : (
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full block text-center">Unavailable</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Ambulance Tab ── */}
        {activeTab === 'ambulance' && (
          <div className="space-y-4">
           

            <div className="space-y-4">
              <div className="flex items-center justify-end lg:hidden">
                <button onClick={() => openMapOverlay('ambulance')}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
                  <MapIcon className="w-4 h-4 text-blue-600" /><span>Open Live Map</span>
                </button>
              </div>

              {/* Desktop ambulance map */}
              <div className="border border-gray-200 overflow-hidden relative z-0">
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />{mapMeta.ambulance.title}
                      </h2>
                      <p className="text-sm text-gray-500 mt-0.5">{mapMeta.ambulance.subtitle}</p>
                    </div>
                    <span className="text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">{mapMeta.ambulance.badgeLabel}</span>
                  </div>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-4 px-5 py-2 border-b border-gray-100 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>Your location</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>Available ambulance</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block"></span>Unavailable</span>
                </div>
                <EmergencyGoogleMap
                  userLocation={userLocation}
                  ambulances={ambulances}
                  chws={communityHealthWorkers}
                  view="ambulance"
                  className="w-full h-[560px] xl:h-[700px]"
                />
              </div>

            </div>

            {/* Ambulance List */}
            <div className="p-3 border border-gray-200">
              <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
                <Ambulance className="w-4 h-4 mr-2 text-blue-600" />Available Ambulances Near You
              </h2>
              {loadingAmbulances ? (
                <div className="p-3 text-sm text-gray-500 border border-gray-200 rounded-lg">Loading ambulances...</div>
              ) : ambulanceError ? (
                <div className="p-3 text-sm text-red-600 border border-red-200 rounded-lg flex items-center justify-between gap-3">
                  <span>{ambulanceError}</span>
                  <button onClick={fetchAmbulanceData} className="px-2.5 py-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-700 rounded">Retry</button>
                </div>
              ) : ambulances.length === 0 ? (
                <div className="p-3 text-sm text-gray-500 border border-gray-200 rounded-lg">No ambulances are currently available.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
                  {ambulances.map((ambulance) => (
                    <div key={ambulance.id} className={`p-2 border rounded-lg transition-all ${ambulance.available ? 'border-gray-200 hover:border-gray-300 hover:shadow-lg' : 'border-gray-200 bg-gray-50 opacity-60'}`}>
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-1 mb-1">
                          <Ambulance className={`w-4 h-4 ${ambulance.available ? 'text-blue-600' : 'text-gray-400'}`} />
                          <h3 className="text-xs font-bold text-gray-900">{ambulance.name}</h3>
                        </div>
                        {ambulance.available ? (
                          <span className="px-1.5 py-0.5 text-green-700 text-xs font-semibold rounded-full text-center mb-1">Available</span>
                        ) : (
                          <span className="px-1.5 py-0.5 text-gray-600 text-xs font-semibold rounded-full text-center mb-1">{titleCase(ambulance.status, 'Unavailable')}</span>
                        )}
                        <p className="text-xs text-gray-600 mb-2">{ambulance.type}</p>
                        <div className="flex flex-col space-y-1 mb-2">
                          <div className="flex items-center text-xs"><MapPin className="w-3 h-3 mr-1 text-gray-500" /><span className="font-semibold text-gray-700">{ambulance.locationLabel}</span></div>
                          <div className="flex items-center text-xs"><MapPin className="w-3 h-3 mr-1 text-gray-500" /><span className="font-semibold text-gray-700">{ambulance.distance}</span></div>
                          <div className="flex items-center text-xs"><Clock className="w-3 h-3 mr-1 text-blue-600" /><span className="font-bold">ETA: {ambulance.eta}</span></div>
                          <div className="flex items-center text-xs"><Activity className="w-3 h-3 mr-1 text-gray-500" /><span className="font-semibold text-gray-700">{ambulance.equipment.length} Equipment</span></div>
                          <div className="flex items-center text-xs"><span className="font-bold">{ambulance.cost}</span></div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {ambulance.equipment.map((item, index) => (
                            <span key={index} className="px-1.5 py-0.5 text-blue-600 text-xs">{item}</span>
                          ))}
                        </div>

                        <div className="mb-2 text-xs text-gray-700">
                          <div className="text-[11px] text-gray-500">Driver</div>
                          <div className="font-semibold text-sm">{ambulance.driverName || 'Unassigned'}</div>
                          <div className="text-[11px] text-gray-700">{ambulance.driverPhone || 'No phone available'}</div>
                        </div>
                        <div className="flex justify-center gap-2">
                          {ambulance.available ? (
                            <>
                              <button onClick={() => handleOrderAmbulance(ambulance)}
                                className="px-1.5 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-all shadow-lg flex items-center space-x-1">
                                <Ambulance className="w-3 h-3" /><span>Order</span>
                              </button>

                              {ambulance.driverPhone ? (
                                <a href={`tel:${ambulance.driverPhone}`} className="px-2 py-0.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold transition-colors flex items-center gap-1">
                                  <Phone className="w-3 h-3" /> Call Driver
                                </a>
                              ) : (
                                <button disabled className="px-2 py-0.5 bg-gray-200 text-gray-500 rounded text-xs font-semibold opacity-60 cursor-not-allowed">No phone</button>
                              )}
                            </>
                          ) : (
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs font-semibold">Unavailable</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Responsive map modal — mobile uses full-screen, desktop uses centered modal */}
      {showMap && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMap(false)} />
          <div className="relative w-full h-full lg:h-[80vh] lg:max-h-[80vh] lg:max-w-full lg:mx-0 bg-white rounded-lg overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">{mapMeta[mapView].title}</h2>
                  <p className="text-xs text-gray-500">{mapMeta[mapView].subtitle}</p>
                </div>
              </div>
              <button onClick={() => setShowMap(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close map">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-4 px-4 py-2 bg-white border-b border-gray-100 text-xs text-gray-500 shrink-0">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>Your location</span>
              {mapView === 'chw' ? (
                <>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block"></span>Available CHW</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block"></span>Unavailable CHW</span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>Available ambulance</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block"></span>Unavailable</span>
                </>
              )}
            </div>
            <div className="w-full h-[calc(100%-88px)] lg:h-[calc(80vh-88px)]">
              <EmergencyGoogleMap
                userLocation={userLocation}
                ambulances={ambulances}
                chws={communityHealthWorkers}
                view={mapView}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* CHW Call Modal */}
      {showCHWModal && selectedCHW && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-2xl max-w-md w-full p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Calling CHW</h3>
              <button onClick={() => setShowCHWModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                {selectedCHW.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <h4 className="text-base font-semibold text-gray-900">{selectedCHW.name}</h4>
              <p className="text-sm text-gray-600">{selectedCHW.specialization}</p>
              <p className="text-xl font-bold text-blue-600 mt-2">{selectedCHW.phone}</p>
            </div>
            <div className="space-y-2">
              <a href={`tel:${selectedCHW.phone}`} className="block w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold text-center transition-colors">Call Now</a>
              <button onClick={() => setShowCHWModal(false)} className="block w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-semibold transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Ambulance Order Modal */}
      {showAmbulanceModal && selectedAmbulance && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-2xl max-w-lg w-full p-4">
            {!orderConfirmed ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Confirm Ambulance Order</h3>
                  <button onClick={() => setShowAmbulanceModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="p-3 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Ambulance className="w-5 h-5 text-blue-600" />
                      <h4 className="text-sm font-bold">{selectedAmbulance.name}</h4>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between"><span className="text-gray-600">Type:</span><span className="font-semibold">{selectedAmbulance.type}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Distance:</span><span className="font-semibold">{selectedAmbulance.distance}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">ETA:</span><span className="font-semibold">{selectedAmbulance.eta}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Cost:</span><span className="font-bold">{selectedAmbulance.cost}</span></div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="text-xs font-semibold text-blue-600 mb-1.5">Your Location</h5>
                    <div className="flex items-start space-x-1.5 text-xs text-blue-600">
                      <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>Lat: {userLocation.lat.toFixed(6)}, Lng: {userLocation.lng.toFixed(6)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <button onClick={confirmAmbulanceOrder} disabled={orderSubmitting}
                    className="w-40 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{orderSubmitting ? 'Submitting...' : 'Confirm Order'}</span>
                  </button>
                  <button onClick={() => setShowAmbulanceModal(false)} disabled={orderSubmitting}
                    className="w-40 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-semibold transition-colors">
                    Cancel
                  </button>
                </div>
                {orderError && <p className="mt-3 text-sm text-red-600 text-center">{orderError}</p>}
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                <p className="text-sm text-gray-600 mb-3">{selectedAmbulance.name} is on the way</p>
                <p className="text-xs text-gray-500">ETA: <span className="font-semibold text-blue-600">{selectedAmbulance.eta}</span></p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}

      {showOrdersModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Your Emergency Orders</h3>
              <button onClick={() => setShowOrdersModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Track active and recent requests in one place.</p>
                <button onClick={() => fetchDispatchData()} className="px-2.5 py-1.5 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-700 rounded border border-gray-200">Refresh</button>
              </div>
              {dispatchLoading ? (
                <div className="text-sm text-gray-500">Loading your emergency requests...</div>
              ) : dispatchError ? (
                <div className="text-sm text-red-600">{dispatchError}</div>
              ) : patientDispatches.length === 0 ? (
                <div className="text-sm text-gray-500">No emergency orders yet.</div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {patientDispatches.map((order, index) => (
                    <div key={`order-modal-${order.backendId || order.incidentId || index}`} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 leading-tight">{order.ambulanceName}</p>
                          <p className="text-xs text-gray-600 mt-1">{order.incidentType}</p>
                        </div>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${dispatchStatusTone(order.status)}`}>{order.statusLabel}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-700">
                        <p>ETA: {order.estimatedResponse}</p>
                        <p>{order.requestedAtLabel}</p>
                        <p className="truncate">Unit: {order.vehiclePlate || 'Pending assignment'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recent Requests Modal */}
      {showRecentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full p-4 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h3 className="text-lg font-bold text-gray-900">Recent Requests</h3>
              <button onClick={() => setShowRecentModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 overflow-y-auto pr-1">
              {patientDispatches.length === 0 ? (
                <p className="text-sm text-gray-500">No recent requests.</p>
              ) : (
                patientDispatches.map((order, index) => (
                  <div key={`recent-modal-${order.backendId || order.incidentId || index}`} className="rounded-lg border border-gray-200 bg-gray-50 p-3 flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{order.ambulanceName}</p>
                      <p className="text-xs text-gray-600">{order.requestedAtLabel}</p>
                      <p className="text-xs text-gray-500">Unit: {order.vehiclePlate || 'Pending assignment'}</p>
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${dispatchStatusTone(order.status)}`}>{order.statusLabel}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Emergency History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full p-4 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h3 className="text-lg font-bold text-gray-900">Emergency Request History</h3>
              <button onClick={() => setShowHistoryModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 overflow-y-auto pr-1">
              {patientDispatches.length === 0 ? (
                <p className="text-sm text-gray-500">No emergency history yet.</p>
              ) : (
                patientDispatches.map((order, index) => (
                  <div key={`history-modal-${order.backendId || order.incidentId || index}`} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{order.ambulanceName}</p>
                        <p className="text-xs text-gray-600 mt-1">{order.incidentType}</p>
                        <p className="text-xs text-gray-500 mt-1">{order.requestedAtLabel}</p>
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${dispatchStatusTone(order.status)}`}>{order.statusLabel}</span>
                    </div>
                    <p className="text-xs text-gray-700 mt-2 truncate">Unit: {order.vehiclePlate || 'Pending assignment'}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Emergency Tips Modal */}
      {showTipsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-4 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />Emergency Tips
              </h3>
              <button onClick={closeTipsModal} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 min-h-0 flex flex-col justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
              {tipIndex < EMERGENCY_TIPS.length ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Tip {tipIndex + 1} of {EMERGENCY_TIPS.length}
                    </span>
                    <span className="text-xs text-blue-700 bg-white border border-blue-200 rounded-full px-2 py-1">
                      Stay prepared
                    </span>
                  </div>
                  <div className="rounded-lg bg-white border border-blue-200 p-4 shadow-sm">
                    <h4 className="text-base sm:text-lg font-medium ">
                      {EMERGENCY_TIPS[tipIndex].title}
                    </h4>
                    <p className="mt-2 text-sm leading-6">
                      {EMERGENCY_TIPS[tipIndex].detail}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[260px] items-center justify-center text-center px-4">
                  <div className="space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white border border-blue-200 shadow-sm">
                      <CheckCircle className="h-7 w-7 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-blue-900">Come tomorrow for more tips</h4>
                    <p className="text-sm text-blue-800 max-w-sm mx-auto">
                      You have reached the end of today&apos;s emergency tips.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between gap-3 shrink-0">
                <button
                  onClick={goToPreviousTip}
                  disabled={tipIndex === 0}
                  className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm font-semibold text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-100 transition-colors"
                >
                  Previous
                </button>
                {tipIndex < EMERGENCY_TIPS.length ? (
                  <button
                    onClick={goToNextTip}
                    className="px-3 py-2 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={closeTipsModal}
                    className="px-3 py-2 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Link to="/client/patient/dashboard" className="flex items-center justify-center space-x-2 p-3 transition-colors">
          <span className="hover:text-blue-600 font-bold">← Back to Dashboard</span>
        </Link>
        <Link to="/client/patient/health-records" className="flex items-center justify-center space-x-2 p-3 transition-colors">
          <span className="hover:text-blue-600 font-bold">View Medical Records →</span>
        </Link>
      </div>
    </div>
  );
};

export default Emergency;