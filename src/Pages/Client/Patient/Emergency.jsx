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
import EmergencyFeatures from '../../../Components/Client/EmergencyFeatures';
import { ambulanceApi } from '../../../API/endpoints/ambulanceApi.js';
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
  } catch { return []; }
};

const writePersistedEmergencyOrders = (rows = []) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      PATIENT_EMERGENCY_ORDERS_STORAGE_KEY,
      JSON.stringify(Array.isArray(rows) ? rows.slice(0, 100) : [])
    );
  } catch { /* ignore */ }
};

const mergeDispatchRows = (primaryRows = [], secondaryRows = []) => {
  const byKey = new Map();
  [...toArray(secondaryRows), ...toArray(primaryRows)].forEach((row) => {
    if (!row || typeof row !== 'object') return;
    const key = String(row.id ?? row.incidentId ?? row.backendId ?? `${row.patientId || ''}-${row.createdAt || row.requestTime || ''}`);
    if (!key) return;
    byKey.set(key, row);
  });
  return Array.from(byKey.values());
};

const isPermissionDeniedError = (error) => {
  const status = Number(error?.status || 0);
  if (status === 401 || status === 403) return true;
  const message = String(error?.message || '').toLowerCase();
  return message.includes('access denied') || message.includes('forbidden') || message.includes('unauthorized');
};

const toNumberOrNull = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const titleCase = (value, fallback = 'N/A') => {
  const text = String(value || '').trim();
  if (!text) return fallback;
  return text.toLowerCase().split(/[_\s-]+/).filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const getVehicleIdentity = (row = {}) => {
  const plate = String(
    row.vehiclePlate || row.vehicleNumber || row.ambulanceVehiclePlate ||
    row.ambulance?.vehiclePlate || ''
  ).trim();
  if (plate) return plate.toUpperCase();
  if (row.id != null) return `ID:${row.id}`;
  if (row.ambulanceId != null) return `ID:${row.ambulanceId}`;
  return '';
};

const getLocationFromRow = (row = {}) => {
  const source = row.location || row.currentLocation || row.coordinates || null;
  if (source && typeof source === 'object') {
    const lat = toNumberOrNull(source.lat ?? source.latitude ?? source.currentLatitude);
    const lng = toNumberOrNull(source.lng ?? source.longitude ?? source.lon ?? source.currentLongitude);
    if (lat !== null && lng !== null) return { lat, lng };
  }
  const lat = toNumberOrNull(row.latitude ?? row.lat ?? row.currentLatitude ?? row.currentLat ?? row.pickupLatitude ?? row.gpsLatitude);
  const lng = toNumberOrNull(row.longitude ?? row.lng ?? row.lon ?? row.currentLongitude ?? row.currentLng ?? row.pickupLongitude ?? row.gpsLongitude);
  if (lat !== null && lng !== null) return { lat, lng };
  if (row.tracking && typeof row.tracking === 'object') {
    const tLat = toNumberOrNull(row.tracking.latitude ?? row.tracking.lat ?? row.tracking.currentLatitude);
    const tLng = toNumberOrNull(row.tracking.longitude ?? row.tracking.lng ?? row.tracking.currentLongitude);
    if (tLat !== null && tLng !== null) return { lat: tLat, lng: tLng };
  }
  return null;
};

const mergeAmbulanceTracking = (ambulanceRows = [], trackingRows = []) => {
  if (!Array.isArray(ambulanceRows) || ambulanceRows.length === 0) return [];
  if (!Array.isArray(trackingRows) || trackingRows.length === 0) return ambulanceRows;
  const trackingByVehicle = new Map();
  trackingRows.forEach((row) => {
    const vehicleKey = getVehicleIdentity(row);
    if (vehicleKey) trackingByVehicle.set(vehicleKey, row);
  });
  return ambulanceRows.map((ambulanceRow) => {
    const existingCoords = getLocationFromRow(ambulanceRow);
    if (existingCoords) return ambulanceRow;
    const vehicleKey = getVehicleIdentity(ambulanceRow);
    const trackingRow = vehicleKey ? trackingByVehicle.get(vehicleKey) : null;
    if (!trackingRow) return ambulanceRow;
    const trackingCoords = getLocationFromRow(trackingRow);
    if (!trackingCoords) return ambulanceRow;
    return {
      ...ambulanceRow,
      currentLatitude: trackingCoords.lat,
      currentLongitude: trackingCoords.lng,
      currentLocation: trackingRow.locationAddress || trackingRow.currentLocation || ambulanceRow.currentLocation,
      tracking: trackingRow,
    };
  });
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
    location: getLocationFromRow(row),
    equipment,
    cost: numericCost !== null ? `Ksh ${numericCost}` : 'Ksh --',
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
const isActiveDispatch = (status) => ACTIVE_EMERGENCY_STATUSES.has(normalizeDispatchStatus(status));
const dispatchStatusTone = (status) => {
  const n = normalizeDispatchStatus(status);
  if (['DISPATCHED', 'EN_ROUTE', 'ON_SCENE', 'IN_PROGRESS', 'ACCEPTED', 'ASSIGNED'].includes(n)) return 'bg-blue-50 text-blue-700 border border-blue-200';
  if (['COMPLETED', 'RESOLVED', 'CLOSED'].includes(n)) return 'bg-green-50 text-green-700 border border-green-200';
  if (['CANCELLED', 'REJECTED', 'FAILED'].includes(n)) return 'bg-red-50 text-red-700 border border-red-200';
  return 'bg-amber-50 text-amber-700 border border-amber-200';
};

// ─── EmergencyGoogleMap ────────────────────────────────────────────────────────
// Replaces LiveMap. Renders:
//   - A "You" pin for the user's current location (blue pulsing circle)
//   - CHW pins  (green = available, gray = unavailable) when view='chw'
//   - Ambulance pins (red = available, gray = unavailable) when view='ambulance'
//
// Uses the same three-fix pattern as HomeVisits:
//   Fix 1 – mapReady state  → markers fire immediately after init
//   Fix 2 – Singleton Loader → no duplicate script construction
//   Fix 3 – Init effect deps = [apiKey, mapId] only → no map re-init on data load
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

  // ── Effect 1: init map once ──────────────────────────────────────────────────
  // Deps: [apiKey, mapId] only — not userLocation, not view.
  // Prevents full map re-init when live data arrives.
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
  }, [apiKey, mapId]);  // Fix 3 – no location/view dependency

  // ── Effect 2: add/update markers ────────────────────────────────────────────
  // Rebuilds all markers whenever data, view, mapReady, or userLocation changes.
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

    // ── helper: create SVG icon URL for legacy Marker ──
    const makeSvgUrl = (label, color) => {
      // Accept either raw hex colors like '#2563eb' or percent-encoded values
      // like '%232563eb' (some call sites currently pass encoded values).
      // Normalize to a raw hex like '#2563eb' before embedding in the SVG.
      try {
        let normalized = String(color || '') || '#000000';
        // If value looks percent-encoded, decode it repeatedly up to 3x
        // (handles accidentally double-encoded values).
        for (let i = 0; i < 3 && !normalized.startsWith('#'); i += 1) {
          try { normalized = decodeURIComponent(normalized); } catch (_) { break; }
        }
        if (!normalized.startsWith('#')) normalized = `#${normalized.replace(/^%23/, '')}`;

        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'><circle cx='28' cy='28' r='24' fill='${normalized}' stroke='%23fff' stroke-width='3'/><text x='28' y='36' font-size='22' text-anchor='middle' fill='%23fff' font-family='Arial' font-weight='900'>${label}</text></svg>`;
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
      } catch (err) {
        // Fallback to a simple black circle if something goes wrong
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
          <div style="padding:4px 2px;min-width:170px">
            <p style="font-weight:700;margin:0 0 3px">🚑 ${amb.name}</p>
            <p style="margin:0 0 2px;color:#444">${amb.type}</p>
            <p style="margin:0 0 2px">Distance: ${amb.distance}</p>
            <p style="margin:0 0 2px">ETA: ${amb.eta}</p>
            <p style="margin:0;font-weight:600;color:${amb.available ? '#16a34a' : '#9ca3af'}">
              ${amb.available ? '● Available' : '○ Unavailable'}
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
            <p style="font-weight:700;margin:0 0 3px">👤 ${chw.name}</p>
            <p style="margin:0 0 2px;color:#444">${chw.specialization}</p>
            <p style="margin:0 0 2px">Distance: ${chw.distance}</p>
            <p style="margin:0 0 2px">Response: ${chw.responseTime}</p>
            <p style="margin:0 0 2px">Rating: ⭐ ${chw.rating}</p>
            <p style="margin:0;font-weight:600;color:${chw.available ? '#16a34a' : '#9ca3af'}">
              ${chw.available ? '● Available' : '○ Unavailable'}
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
          <div className="bg-white/90 border border-gray-200 rounded px-4 py-2 text-sm text-red-600 pointer-events-auto shadow">
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
  const [dispatchPermissionDenied, setDispatchPermissionDenied] = useState(false);

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

  const activeDispatches = useMemo(
    () => patientDispatches.filter((item) => isActiveDispatch(item.status)),
    [patientDispatches]
  );

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
      setAmbulanceRows(mergeAmbulanceTracking(toArray(payload), toArray(trackingPayload)));
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
      setDispatchPermissionDenied(false);
    } catch (err) {
      if (isPermissionDeniedError(err)) {
        setDispatchRows(readPersistedEmergencyOrders());
        setDispatchPermissionDenied(true); setDispatchError('');
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
  const handleCallCHW = (chw) => { setSelectedCHW(chw); setShowCHWModal(true); };

  const handleOrderAmbulance = (ambulance) => {
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

  const openMapOverlay = (view) => { setMapView(view); setShowMap(true); };

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
          <a href="tel:999" className="min-w-0 w-full p-2.5 rounded-lg border border-gray-200 hover:border-red-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">National Emergency</p>
            <p className="text-sm sm:text-base font-bold text-red-600 break-all">999</p>
          </a>
          <a href="tel:+254743669252" className="min-w-0 w-full p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">MediLink Emergency</p>
            <p className="text-sm sm:text-base font-bold text-blue-600 break-all">0743669252</p>
          </a>
          <a href="tel:911" className="min-w-0 w-full p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">Ambulance</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 break-all">911</p>
          </a>
          <a href="tel:+254743669252" className="min-w-0 w-full p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">Poison Control</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 break-all">0743669252</p>
          </a>
          <a href="tel:1195" className="min-w-0 w-full p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <p className="text-[11px] sm:text-xs text-gray-600 leading-tight">Mental Health</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 break-all">1195</p>
          </a>
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
            <div className="hidden lg:block border border-gray-200 overflow-hidden relative z-0 rounded-lg">
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
                className="w-full h-[420px] xl:h-[500px]"
              />
            </div>

            {/* CHW List */}
            <div className="p-3 border border-gray-200 rounded-lg bg-white">
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
                    <div key={chw.id} className={`p-2 border-2 rounded-lg transition-all ${chw.available ? 'border-gray-200 hover:border-gray-300' : 'border-gray-200 bg-gray-50 opacity-60'}`}>
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
            {/* Emergency orders section */}
            <section className="p-4 grid grid-cols-1 gap-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Your Emergency Orders</h3>
                  <p className="text-xs text-gray-500">Track active and recent requests in one place.</p>
                </div>
                <button onClick={() => fetchDispatchData()}
                  className="px-2.5 py-1.5 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-700 rounded border border-gray-200">
                  Refresh
                </button>
              </div>
              {!dispatchLoading && !dispatchError && dispatchPermissionDenied && (
                <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
                  Live history access is restricted for this role. Showing your recently ordered ambulances.
                </div>
              )}
              {dispatchLoading ? (
                <div className="text-sm text-gray-500">Loading your emergency requests...</div>
              ) : dispatchError ? (
                <div className="text-sm text-red-600">{dispatchError}</div>
              ) : patientDispatches.length === 0 ? (
                <div className="text-sm text-gray-500">No emergency orders yet.</div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <section className="space-y-2">
                    <p className="text-xs uppercase tracking-wide font-semibold text-blue-700">Active Requests</p>
                    {activeDispatches.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeDispatches.slice(0, 4).map((order, index) => (
                          <article key={`active-${order.backendId || order.incidentId || index}`} className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold text-gray-900 leading-tight">{order.ambulanceName}</p>
                              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${dispatchStatusTone(order.status)}`}>{order.statusLabel}</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{order.incidentType}</p>
                            <div className="mt-2 space-y-1 text-xs text-gray-700">
                              <p>ETA: {order.estimatedResponse}</p>
                              <p>{order.requestedAtLabel}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-500">No active requests right now.</div>
                    )}
                  </section>
                  <section className="space-y-2">
                    <p className="text-xs uppercase tracking-wide font-semibold text-gray-600">Recent Requests</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {patientDispatches.slice(0, 4).map((order, index) => (
                        <article key={`history-${order.backendId || order.incidentId || index}`} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-gray-900 leading-tight">{order.ambulanceName}</p>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${dispatchStatusTone(order.status)}`}>{order.statusLabel}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{order.incidentType}</p>
                          <div className="mt-2 space-y-1 text-xs text-gray-700">
                            <p>{order.requestedAtLabel}</p>
                            <p className="truncate">Unit: {order.vehiclePlate || 'Pending assignment'}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div className="xl:col-span-8 space-y-4">
                <div className="flex items-center justify-end lg:hidden">
                  <button onClick={() => openMapOverlay('ambulance')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <MapIcon className="w-4 h-4 text-blue-600" /><span>Open Live Map</span>
                  </button>
                </div>

                {/* Desktop ambulance map */}
                <div className="hidden lg:block border border-gray-200 overflow-hidden rounded-lg relative z-0">
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
                    className="w-full h-[420px] xl:h-[500px]"
                  />
                </div>
              </div>

              <aside className="xl:col-span-4 space-y-4">
                <EmergencyFeatures
                  dispatchHistory={patientDispatches}
                  activeDispatches={activeDispatches}
                  userLocation={userLocation}
                />
                {/* Emergency Tips */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h3 className="text-sm font-bold text-yellow-900 mb-1.5 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1.5" />While waiting for the ambulance:
                  </h3>
                  <ul className="space-y-1.5 text-xs text-yellow-800">
                    {[
                      'Stay calm and keep the patient comfortable',
                      'Keep your phone nearby for communication',
                      'Have someone wait outside to guide the ambulance',
                      'Gather any relevant medical documents or medications',
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-3 h-3 mr-1.5 mt-0.5 text-yellow-600" /><span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>

            {/* Ambulance List */}
            <div className="p-3 border border-gray-200 rounded-lg">
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
                    <div key={ambulance.id} className={`p-2 border-2 rounded-lg transition-all ${ambulance.available ? 'border-gray-200 hover:border-gray-300 hover:shadow-lg' : 'border-gray-200 bg-gray-50 opacity-60'}`}>
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
                        <div className="flex justify-center">
                          {ambulance.available ? (
                            <button onClick={() => handleOrderAmbulance(ambulance)}
                              className="px-1.5 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-all shadow-lg flex items-center space-x-1">
                              <Ambulance className="w-3 h-3" /><span>Order</span>
                            </button>
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

      {/* Full-screen map overlay — mobile/tablet only */}
      {showMap && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 top-16 z-30 flex flex-col bg-white">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shadow-sm shrink-0">
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
          {/* Legend */}
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
          <EmergencyGoogleMap
            userLocation={userLocation}
            ambulances={ambulances}
            chws={communityHealthWorkers}
            view={mapView}
            className="flex-1 min-h-0 w-full"
          />
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