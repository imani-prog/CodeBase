import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { 
  Truck, 
  Users, 
  MapPin, 
  Phone, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  Plus,
  Edit3,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Navigation,
  Activity,
  Fuel,
  Settings,
  UserCheck,
  Star,
  Route,
  Timer,
  Heart,
  Shield,
  Download,
  RefreshCw,
  Send,
  Target,
  Zap,
  Globe,
  Compass,
  Radio,
  Crosshair,
  Play,
  Pause,
  Square,
  ArrowRight,
  AlertCircle,
  Info,
  Wifi,
  Signal,
  Battery,
  Navigation2,
  PhoneCall,
  MessageSquare,
  Video,
  Car,
  Siren,
  Stethoscope
} from 'lucide-react';

// Import modal components
import ViewAmbulanceModal from './AmbulanceManagement/modals/ViewAmbulanceModal';
import EditAmbulanceModal from './AmbulanceManagement/modals/EditAmbulanceModal';
import AddAmbulanceModal from './AmbulanceManagement/modals/AddAmbulanceModal';
import AddDriverModal from './AmbulanceManagement/modals/AddDriverModal';
import AddDispatchModal from './AmbulanceManagement/modals/AddDispatchModal';
import AddTrackingUnitModal from './AmbulanceManagement/modals/AddTrackingUnitModal';
import ViewDriverModal from './AmbulanceManagement/modals/ViewDriverModal';
import EditDriverModal from './AmbulanceManagement/modals/EditDriverModal';
import MoreOptionsDriverModal from './AmbulanceManagement/modals/MoreOptionsDriverModal';
import MoreOptionsModal from './AmbulanceManagement/modals/MoreOptionsModal';
import Pagination from '../../Components/Admin/Pagination';
import { Loader } from '@googlemaps/js-api-loader';
import { ambulanceService } from '../../Services/domain/ambulanceService.js';
import { hospitalService } from '../../Services/domain/hospitalService.js';

const toArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.content)) return payload.content;
  return [];
};

const toNumberOrNull = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toNumberFromTextOrNull = (value) => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const parsed = Number(String(value).replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
};

const toIsoDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
};

const toDateOrNow = (value) => {
  if (value instanceof Date) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString();
};

const formatFieldLabel = (key) => {
  const spaced = String(key)
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : key;
};

const formatFieldValue = (value) => {
  if (value === null || value === undefined || value === '') return 'N/A';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'N/A';
    const primitive = value.every((item) => ['string', 'number', 'boolean'].includes(typeof item));
    if (primitive) return value.join(', ');
    return value
      .map((item) => {
        if (!item || typeof item !== 'object') return String(item);
        return Object.entries(item)
          .filter(([, nestedValue]) => nestedValue !== null && nestedValue !== undefined && nestedValue !== '')
          .map(([nestedKey, nestedValue]) => `${formatFieldLabel(nestedKey)}: ${nestedValue}`)
          .join(' | ');
      })
      .filter(Boolean)
      .join(' ; ');
  }
  if (typeof value === 'object') {
    const parts = Object.entries(value)
      .filter(([, nestedValue]) => nestedValue !== null && nestedValue !== undefined && nestedValue !== '')
      .map(([nestedKey, nestedValue]) => `${formatFieldLabel(nestedKey)}: ${nestedValue}`);
    return parts.length > 0 ? parts.join(' | ') : 'N/A';
  }
  return String(value);
};

const getExtraFields = (payload, excludedKeys = []) => {
  if (!payload || typeof payload !== 'object') return [];
  const excluded = new Set(excludedKeys);
  return Object.entries(payload).filter(
    ([key, value]) => !excluded.has(key) && value !== null && value !== undefined && value !== ''
  );
};

const downloadTextFile = (filename, content, mimeType = 'text/plain;charset=utf-8') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

const toSafeFileSegment = (value) => String(value || 'record')
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  || 'record';

const buildCsv = (rows = []) => rows
  .map((row) => row.map((cell) => {
    const value = String(cell ?? '');
    if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
    return value;
  }).join(','))
  .join('\n');

let mapsLoaderInstance = null;
const getMapsLoader = (apiKey) => {
  if (!mapsLoaderInstance) {
    mapsLoaderInstance = new Loader({ apiKey, libraries: ['marker', 'geocoding'] });
  }
  return mapsLoaderInstance;
};

const AUTO_REFRESH_INTERVAL_MS = 60000;
const DEFAULT_TRACKING_CENTER = { lat: -1.5305180166278827, lng: 37.26242921919778 };

const toSignature = (value) => {
  try {
    return JSON.stringify(value);
  } catch {
    return String(Date.now());
  }
};

const mapTypeFromApi = (type) => String(type || '').trim().toLowerCase();
const mapTypeToApi = (type) => String(type || '').trim().replace(/\s+/g, '_').toUpperCase();

const mapFuelToApi = (fuelType) => {
  const normalized = String(fuelType || 'DIESEL').trim().toUpperCase();
  if (normalized === 'PETROL' || normalized === 'ELECTRIC') return normalized;
  return 'DIESEL';
};

const mapDriverStatusFromApi = (status) => {
  const normalized = String(status || '').trim().replace(/\s+/g, '_').toUpperCase();
  switch (normalized) {
    case 'ON_DUTY':
    case 'AVAILABLE':
      return 'on_duty';
    case 'ON_TRIP':
    case 'ON_CALL':
    case 'BUSY':
      return 'on_trip';
    case 'ON_BREAK':
      return 'on_break';
    default:
      return 'off_duty';
  }
};

const mapDriverStatusToApi = (status) => String(status || 'off_duty').trim().replace(/\s+/g, '_').toUpperCase();

const extractEquipment = (row = {}) => {
  if (Array.isArray(row.equipmentList)) return row.equipmentList;
  if (Array.isArray(row.equipment)) {
    return row.equipment.map((item) => item?.name || item?.equipmentName || String(item)).filter(Boolean);
  }
  if (typeof row.equipmentJson === 'string' && row.equipmentJson.trim()) {
    try {
      const parsed = JSON.parse(row.equipmentJson);
      if (Array.isArray(parsed)) return parsed.map((item) => String(item)).filter(Boolean);
    } catch {
      return [];
    }
  }
  return [];
};

const splitCertificationString = (value) => String(value)
  .split(/[;,|/]/)
  .map((item) => item.trim())
  .filter(Boolean);

const normalizeCertificationEntry = (entry) => {
  if (entry === null || entry === undefined) return '';
  if (typeof entry === 'string') return entry.trim();
  if (typeof entry === 'number') return String(entry);
  if (typeof entry === 'object') {
    return (
      entry.name
      || entry.certificationName
      || entry.title
      || entry.label
      || entry.type
      || entry.code
      || entry.value
      || ''
    );
  }
  return '';
};

const extractDriverCertifications = (row = {}) => {
  const sources = [
    row.certifications,
    row.certification,
    row.certificationName,
    row.certificate,
    row.certificates,
    row.certificateNames,
    row.driverCertifications,
    row.trainingCertifications,
    row.qualifications,
    row.skills,
    row.specializations,
    row.licenses,
  ];

  const collected = [];

  sources.forEach((source) => {
    if (!source) return;

    if (Array.isArray(source)) {
      source.forEach((item) => {
        if (typeof item === 'string') {
          collected.push(...splitCertificationString(item));
          return;
        }
        const normalized = normalizeCertificationEntry(item);
        if (normalized) collected.push(normalized);
      });
      return;
    }

    if (typeof source === 'string') {
      collected.push(...splitCertificationString(source));
      return;
    }

    if (typeof source === 'object') {
      const normalized = normalizeCertificationEntry(source);
      if (normalized) collected.push(normalized);
    }
  });

  return [...new Set(collected.map((item) => item.trim()).filter(Boolean))];
};

const normalizeAmbulance = (row = {}) => {
  const vehiclePlate = row.vehiclePlate || row.vehicleNumber || row.ambulanceUnitId || `AMB-${row.id ?? 'N/A'}`;
  const averageResponseMinutes = toNumberOrNull(row.averageResponseMinutes);
  return {
    id: row.id,
    vehiclePlate,
    vehicleNumber: vehiclePlate,
    registrationNumber: row.registrationNumber || '',
    model: row.model || '',
    year: toNumberOrNull(row.year) || '',
    type: mapTypeFromApi(row.type),
    status: String(row.status || 'AVAILABLE').toUpperCase(),
    fuelType: String(row.fuelType || 'DIESEL').toUpperCase(),
    capacity: toNumberOrNull(row.capacity) || 0,
    equippedForICU: Boolean(row.equippedForICU),
    gpsEnabled: Boolean(row.gpsEnabled),
    location: row.currentLocation || row.locationAddress || row.location || 'N/A',
    currentLocation: row.currentLocation || row.locationAddress || row.location || 'N/A',
    driverName: row.driverName || row.currentDriver?.name || row.currentDriverName || 'Unassigned',
    driverPhone: row.driverPhone || row.currentDriver?.phone || '',
    medicName: row.medicName || '',
    insurancePolicyNumber: row.insurancePolicyNumber || '',
    insuranceProvider: row.insuranceProvider || '',
    currentDriver: row.driverName || row.currentDriver?.name || row.currentDriverName || 'Unassigned',
    driverContact: row.driverPhone || row.currentDriver?.phone || '',
    lastMaintenance: toIsoDate(row.lastMaintenanceDate || row.lastMaintenance),
    nextMaintenance: toIsoDate(row.nextMaintenanceDate || row.nextMaintenance),
    mileage: toNumberOrNull(row.mileage) || 0,
    fuelLevel: toNumberOrNull(row.fuelLevel) || 0,
    equipment: extractEquipment(row),
    lastDispatch: row.lastDispatchTime || row.lastDispatch || '',
    totalDispatches: toNumberOrNull(row.totalDispatches) || 0,
    averageResponseTime: averageResponseMinutes !== null
      ? `${averageResponseMinutes} minutes`
      : (row.averageResponseTime || 'N/A'),
    createdAt: row.createdAt || '',
    updatedAt: row.updatedAt || '',
    notes: row.notes || '',
    image: row.imageUrl || '/src/assets/MedilinkAmbulance.png',
    backend: row,
  };
};

const normalizeDriver = (row = {}) => {
  const name = row.name
    || row.driverName
    || [row.firstName, row.lastName].filter(Boolean).join(' ')
    || `Driver ${row.id ?? ''}`.trim();
  const currentAmbulance = row.currentAmbulance || row.assignedAmbulance || row.ambulance || null;
  const yearsOfExperience = toNumberOrNull(
    row.yearsOfExperience ?? row.experienceYears ?? row.experience
  );
  const certifications = extractDriverCertifications(row);

  const normalizedCurrentAmbulance = currentAmbulance
    ? {
      id: currentAmbulance.id ?? null,
      vehiclePlate: currentAmbulance.vehiclePlate || currentAmbulance.vehicleNumber || '',
      status: currentAmbulance.status || '',
      currentLocation: currentAmbulance.currentLocation || currentAmbulance.location || '',
    }
    : null;

  return {
    id: row.id,
    name,
    licenseNumber: row.licenseNumber || '',
    phone: row.phone || row.driverPhone || '',
    email: row.email || '',
    status: mapDriverStatusFromApi(row.status),
    experience: yearsOfExperience !== null ? `${yearsOfExperience} years` : '',
    yearsOfExperience,
    experienceYears: yearsOfExperience,
    certifications,
    currentVehicle: row.vehiclePlate
      || row.currentVehicle
      || normalizedCurrentAmbulance?.vehiclePlate
      || '',
    currentAmbulance: normalizedCurrentAmbulance,
    currentAmbulanceId: normalizedCurrentAmbulance?.id || null,
    location: row.location || row.currentLocation || normalizedCurrentAmbulance?.currentLocation || 'N/A',
    shiftStart: row.shiftStart || '',
    shiftEnd: row.shiftEnd || '',
    totalTrips: toNumberOrNull(row.totalTrips || row.totalDispatches) || 0,
    rating: toNumberOrNull(row.rating || row.averageRating) || 0,
    lastTrip: row.lastTripTime || row.lastTrip || '',
    emergencyContact: row.emergencyContact || '',
    dateOfBirth: toIsoDate(row.dateOfBirth),
    hireDate: toIsoDate(row.hireDate),
    createdAt: row.createdAt || '',
    updatedAt: row.updatedAt || '',
    avatarUrl: row.avatarUrl || row.avatar || '',
    notes: row.notes || '',
    avatar: row.avatarUrl || row.avatar || '/src/assets/Timothy Imani.jpeg',
    backend: row,
  };
};

const normalizeDispatch = (row = {}) => {
  const pickupLocation = [
    row.pickupAddressLine1,
    row.pickupAddressLine2,
    row.pickupCity,
  ].filter(Boolean).join(', ') || row.pickupLocation || row.location || '';
  const destination = row.dropoffAddressLine1 || row.hospitalName || row.destination || 'Nearest Hospital';
  const assignedAmbulance = row.vehiclePlate || row.ambulance?.vehiclePlate || row.ambulanceUnitId || '';
  return {
    id: row.incidentId || `EMG-${row.id}`,
    backendId: row.id,
    incidentId: row.incidentId,
    incidentType: row.incidentType || 'TRAFFIC_ACCIDENT',
    callId: row.incidentId || `EMG-${row.id}`,
    ambulanceId: assignedAmbulance,
    ambulanceUnitId: row.ambulanceUnitId || assignedAmbulance,
    vehiclePlate: assignedAmbulance,
    priority: String(row.priority || 'MEDIUM').toUpperCase(),
    status: String(row.status || 'REQUESTED').toUpperCase(),
    callerName: row.callerName || 'Unknown Caller',
    callerPhone: row.callerPhone || '',
    callerNotes: row.callerNotes || '',
    patientId: row.patientId || '',
    patientName: row.patientName || 'Unknown Patient',
    patientAge: row.patientAge || '',
    patientGender: row.patientGender || '',
    condition: row.patientCondition || row.condition || 'Not specified',
    location: pickupLocation || 'N/A',
    pickupLocation,
    pickupAddressLine1: row.pickupAddressLine1 || '',
    pickupAddressLine2: row.pickupAddressLine2 || '',
    pickupCity: row.pickupCity || '',
    pickupState: row.pickupState || '',
    pickupPostalCode: row.pickupPostalCode || '',
    pickupCountry: row.pickupCountry || 'Kenya',
    pickupLatitude: row.pickupLatitude || '',
    pickupLongitude: row.pickupLongitude || '',
    destination,
    hospitalId: row.hospitalId || '',
    dropoffAddressLine1: row.dropoffAddressLine1 || '',
    dropoffAddressLine2: row.dropoffAddressLine2 || '',
    dropoffCity: row.dropoffCity || '',
    dropoffState: row.dropoffState || '',
    dropoffPostalCode: row.dropoffPostalCode || '',
    dropoffCountry: row.dropoffCountry || 'Kenya',
    dropoffLatitude: row.dropoffLatitude || '',
    dropoffLongitude: row.dropoffLongitude || '',
    callTime: toDateOrNow(row.requestTime || row.createdAt),
    requestTime: row.requestTime,
    dispatchTime: row.dispatchTime,
    onSceneTime: row.onSceneTime || null,
    arrivalTime: row.onSceneTime || row.arrivalAtHospitalTime || null,
    completionTime: row.completionTime || null,
    estimatedResponse: row.estimatedResponseTime || 'N/A',
    estimatedDistance: row.estimatedDistance || '',
    requiresICU: Boolean(row.requiresICU),
    requiresOxygen: Boolean(row.requiresOxygen),
    requiresStretcher: row.requiresStretcher === undefined ? null : Boolean(row.requiresStretcher),
    nearestAmbulances: assignedAmbulance ? [assignedAmbulance] : [],
    assignedAmbulance,
    specialInstructions: row.specialInstructions || '',
    notes: row.notes || '',
    backend: row,
  };
};

const normalizeTrackingRoute = (row, latitude, longitude) => {
  const source = Array.isArray(row.route)
    ? row.route
    : Array.isArray(row.routeHistory)
      ? row.routeHistory
      : [];

  const normalized = source
    .map((point) => {
      const lat = toNumberOrNull(point?.lat ?? point?.latitude);
      const lng = toNumberOrNull(point?.lng ?? point?.longitude);
      if (lat === null || lng === null) return null;
      return {
        lat,
        lng,
        timestamp: toDateOrNow(point?.timestamp || point?.updatedAt || point?.createdAt).toLocaleTimeString(),
        speed: toNumberOrNull(point?.speed) || 0,
      };
    })
    .filter(Boolean);

  if (normalized.length > 0) return normalized;

  return [
    {
      lat: latitude,
      lng: longitude,
      timestamp: toDateOrNow(row.timestamp || row.updatedAt || row.createdAt).toLocaleTimeString(),
      speed: toNumberOrNull(row.speed) || 0,
    },
  ];
};

const normalizeTrackingMap = (payload = [], ambulances = []) => {
  const trackingMap = {};
  payload.forEach((row) => {
    const ambulanceFromId = ambulances.find((item) => Number(item.id) === Number(row.ambulanceId));
    const vehicleId = row.vehiclePlate
      || row.ambulanceVehiclePlate
      || row.ambulance?.vehiclePlate
      || ambulanceFromId?.vehiclePlate;
    if (!vehicleId) return;
    const latitude = toNumberOrNull(row.latitude ?? row.currentLatitude);
    const longitude = toNumberOrNull(row.longitude ?? row.currentLongitude);
    if (latitude === null || longitude === null) return;

    trackingMap[vehicleId] = {
      vehicleId,
      ambulanceId: row.ambulanceId ?? ambulanceFromId?.id ?? null,
      latitude,
      longitude,
      speed: toNumberOrNull(row.speed) || 0,
      heading: toNumberOrNull(row.heading) || 0,
      batteryLevel: toNumberOrNull(row.batteryLevel) || 100,
      signalStrength: toNumberOrNull(row.signalStrength) || 4,
      locationAddress: row.locationAddress || row.currentLocation || ambulanceFromId?.location || '',
      connectionStatus: row.connectionStatus || row.networkStatus || 'CONNECTED',
      lastUpdate: toDateOrNow(row.timestamp || row.updatedAt || row.createdAt),
      route: normalizeTrackingRoute(row, latitude, longitude),
      backend: row,
    };
  });
  return trackingMap;
};

const resolveAmbulanceCoords = (ambulance, trackingRow) => {
  const lat = toNumberOrNull(
    trackingRow?.latitude
    ?? trackingRow?.currentLatitude
    ?? ambulance?.currentLatitude
    ?? ambulance?.latitude
    ?? ambulance?.backend?.currentLatitude
    ?? ambulance?.backend?.latitude
    ?? ambulance?.backend?.locationLatitude
    ?? ambulance?.backend?.lat
  );
  const lng = toNumberOrNull(
    trackingRow?.longitude
    ?? trackingRow?.currentLongitude
    ?? ambulance?.currentLongitude
    ?? ambulance?.longitude
    ?? ambulance?.backend?.currentLongitude
    ?? ambulance?.backend?.longitude
    ?? ambulance?.backend?.locationLongitude
    ?? ambulance?.backend?.lng
  );
  if (lat === null || lng === null) return null;
  return { lat, lng };
};

const resolveAmbulanceLocationLabel = (ambulance, trackingRow, coords) => {
  const label = trackingRow?.locationAddress
    || ambulance?.locationAddress
    || ambulance?.currentLocation
    || ambulance?.location
    || ambulance?.backend?.locationAddress
    || ambulance?.backend?.currentLocation
    || ambulance?.backend?.location
    || '';
  if (label) return label;
  if (coords) return `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
  return '';
};

const AdminGoogleMap = ({ ambulances = [], className = '', style = {}, fallbackCenter = DEFAULT_TRACKING_CENTER }) => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const markersRef = useRef([]);
  const [mapReady, setMapReady] = useState(false);
  const [loadError, setLoadError] = useState('');

  const apiKey =
    import.meta?.env?.VITE_GOOGLE_CLOUD_MAPS_API_KEY ||
    document.querySelector('meta[name="google-maps-api-key"]')?.getAttribute('content') ||
    import.meta?.env?.GOOGLE_CLOUD_MAPS_API_KEY ||
    null;

  const rawMapId = import.meta?.env?.VITE_GOOGLE_MAPS_MAP_ID || null;
  const mapId = rawMapId && !/^%.*%$/.test(String(rawMapId).trim()) ? String(rawMapId).trim() : null;

  useEffect(() => {
    let cancelled = false;

    const initMap = async () => {
      if (typeof window === 'undefined') return;
      if (!containerRef.current) return;
      if (!apiKey) {
        setLoadError('Google Maps API key is not defined');
        return;
      }

      try {
        const loader = getMapsLoader(apiKey);
        await loader.load();
        if (cancelled) return;
        if (!window.google?.maps) {
          setLoadError('Google Maps loaded but window.google.maps is missing');
          return;
        }

        const maps = window.google.maps;
        mapRef.current = new maps.Map(containerRef.current, {
          center: fallbackCenter,
          zoom: 12,
          ...(mapId ? { mapId } : {}),
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        setLoadError('');
        setMapReady(true);
      } catch (err) {
        if (!cancelled) {
          console.error('AdminGoogleMap: init failed', err);
          setLoadError(String(err?.message || 'Failed to load Google Maps'));
        }
      }
    };

    initMap();
    return () => {
      cancelled = true;
    };
  }, [apiKey, fallbackCenter, mapId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    markersRef.current.forEach((marker) => {
      if (typeof marker?.setMap === 'function') marker.setMap(null);
      else if ('map' in (marker ?? {})) marker.map = null;
    });
    markersRef.current = [];

    const maps = window.google?.maps;
    if (!maps) return;

    const canUseAdvanced = Boolean(mapId && window.google?.maps?.marker?.AdvancedMarkerElement);
    const allPoints = [];

    const makeDomMarker = (bgColor, label) => {
      const el = document.createElement('div');
      el.style.cssText = [
        'width:40px',
        'height:40px',
        'border-radius:50%',
        `background:${bgColor}`,
        'display:flex',
        'align-items:center',
        'justify-content:center',
        'color:#fff',
        'font-weight:900',
        'font-size:14px',
        'border:2px solid #fff',
        'box-shadow:0 2px 8px rgba(0,0,0,.30)',
        'cursor:pointer',
      ].join(';');
      el.textContent = label;
      return el;
    };

    const makeSvgUrl = (label, color) => {
      const safeColor = String(color || '#dc2626').startsWith('#')
        ? String(color || '#dc2626')
        : `#${String(color || 'dc2626').replace(/^%23/, '')}`;
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'><circle cx='28' cy='28' r='24' fill='${safeColor}' stroke='%23fff' stroke-width='3'/><text x='28' y='36' font-size='22' text-anchor='middle' fill='%23fff' font-family='Arial' font-weight='900'>${label}</text></svg>`;
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    };

    const placeMarker = ({ lat, lng, title, infoHtml, color, label = 'A' }) => {
      const infoWindow = new maps.InfoWindow({ content: infoHtml });
      const domEl = makeDomMarker(color, label);

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
          icon: { url: makeSvgUrl(label, color), scaledSize: new maps.Size(56, 56) },
          title,
        });
        marker.addListener('click', () => infoWindow.open({ anchor: marker, map }));
        markersRef.current.push(marker);
      }
    };

    ambulances.forEach((ambulance) => {
      const lat = toNumberOrNull(ambulance?.location?.lat);
      const lng = toNumberOrNull(ambulance?.location?.lng);
      if (lat === null || lng === null) return;

      allPoints.push({ lat, lng });
      const isAvailable = ambulance.available ?? (String(ambulance.status || '').toUpperCase() === 'AVAILABLE');
      const color = isAvailable ? '#dc2626' : '#9ca3af';
      const locationLabel = ambulance.locationLabel
        || ambulance.locationAddress
        || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      const typeLabel = String(ambulance.type || 'Ambulance').replace(/_/g, ' ');
      const distanceLabel = ambulance.distance || 'N/A';
      const etaLabel = ambulance.eta || 'N/A';
      const infoHtml = `
        <div style="padding:6px 8px;min-width:220px;max-width:320px;font-family:Arial,Helvetica,sans-serif;">
          <p style="font-weight:700;margin:0 0 6px">${ambulance.vehicleId || ambulance.name || 'Ambulance'}</p>
          <p style="margin:0 0 4px;color:#444;font-size:13px">${typeLabel}</p>
          <p style="margin:0 0 4px;color:#444;font-size:13px">Location: ${locationLabel || 'Unknown location'}</p>
          <p style="margin:0 0 4px;color:#444;font-size:13px">Distance: ${distanceLabel}</p>
          <p style="margin:0 0 4px;color:#444;font-size:13px">ETA: ${etaLabel}</p>
          <p style="margin:0;font-weight:600;color:${isAvailable ? '#16a34a' : '#9ca3af'}">
            ${isAvailable ? '● Available' : '● Unavailable'}
          </p>
        </div>`;

      placeMarker({
        lat,
        lng,
        title: ambulance.vehicleId || ambulance.name || 'Ambulance',
        infoHtml,
        color,
        label: 'A',
      });
    });

    if (allPoints.length === 1) {
      map.setCenter({ lat: allPoints[0].lat, lng: allPoints[0].lng });
      map.setZoom(13);
    } else if (allPoints.length > 1) {
      const bounds = new maps.LatLngBounds();
      allPoints.forEach((point) => bounds.extend(new maps.LatLng(point.lat, point.lng)));
      map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
    } else {
      map.setCenter(fallbackCenter);
      map.setZoom(12);
    }

    return () => {
      markersRef.current.forEach((marker) => {
        if (typeof marker?.setMap === 'function') marker.setMap(null);
        else if ('map' in (marker ?? {})) marker.map = null;
      });
      markersRef.current = [];
    };
  }, [ambulances, fallbackCenter, mapId, mapReady]);

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      <div ref={containerRef} style={{ height: '100%', width: '100%', background: '#f0f4f8' }} />
      {loadError && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div className="bg-white/90 border border-gray-200 px-4 py-2 text-sm text-red-600 pointer-events-auto shadow">
            <div className="font-semibold">Map error</div>
            <div>{loadError}</div>
            <div className="text-xs text-gray-500 mt-1">Ensure <code>VITE_GOOGLE_CLOUD_MAPS_API_KEY</code> is set and the dev server was restarted.</div>
          </div>
        </div>
      )}
    </div>
  );
};

const normalizeHospitalOption = (row = {}) => ({
  id: row.id,
  name: row.name || row.hospitalName || row.code || `Hospital ${row.id || ''}`.trim(),
});

const buildAmbulancePayload = (ambulance = {}) => ({
  vehiclePlate: ambulance.vehiclePlate,
  driverName: ambulance.driverName || 'Unassigned',
  driverPhone: ambulance.driverPhone || 'N/A',
  status: String(ambulance.status || 'AVAILABLE').toUpperCase(),
  medicName: ambulance.medicName || null,
  notes: ambulance.notes || null,
  registrationNumber: ambulance.registrationNumber || null,
  model: ambulance.model || null,
  year: Number(ambulance.year || new Date().getFullYear()),
  fuelType: mapFuelToApi(ambulance.fuelType),
  capacity: Number(ambulance.capacity || 1),
  equippedForICU: Boolean(ambulance.equippedForICU),
  gpsEnabled: Boolean(ambulance.gpsEnabled),
  insurancePolicyNumber: ambulance.insurancePolicyNumber || null,
  insuranceProvider: ambulance.insuranceProvider || null,
  type: mapTypeToApi(ambulance.type || 'basic_life_support'),
  currentLocation: ambulance.location || ambulance.currentLocation || null,
  lastMaintenanceDate: ambulance.lastMaintenance || null,
  nextMaintenanceDate: ambulance.nextMaintenance || null,
  mileage: Number(ambulance.mileage || 0),
  fuelLevel: toNumberOrNull(ambulance.fuelLevel),
  equipmentList: Array.isArray(ambulance.equipment) ? ambulance.equipment : [],
});

const buildDriverPayload = (driver = {}) => ({
  name: driver.name,
  licenseNumber: driver.licenseNumber || null,
  phone: driver.phone || null,
  email: driver.email || null,
  status: mapDriverStatusToApi(driver.status),
  yearsOfExperience: toNumberFromTextOrNull(
    driver.yearsOfExperience ?? driver.experienceYears ?? driver.experience
  ),
  shiftStart: driver.shiftStart || null,
  shiftEnd: driver.shiftEnd || null,
  totalTrips: toNumberOrNull(driver.totalTrips),
  rating: toNumberOrNull(driver.rating),
  emergencyContact: driver.emergencyContact || null,
  avatarUrl: driver.avatarUrl || driver.avatar || null,
  dateOfBirth: driver.dateOfBirth || null,
  hireDate: driver.hireDate || null,
  certifications: Array.isArray(driver.certifications) ? driver.certifications : [],
  notes: driver.notes || null,
});

const buildDispatchPayload = (form = {}, ambulanceId = null) => ({
  incidentType: String(form.incidentType || 'TRAFFIC_ACCIDENT').toUpperCase(),
  priority: String(form.priority || 'MEDIUM').toUpperCase(),
  patientId: form.patientId || null,
  patientName: form.patientName || 'Unknown Patient',
  patientAge: toNumberOrNull(form.patientAge),
  patientGender: form.patientGender ? String(form.patientGender).toUpperCase() : null,
  patientCondition: form.condition || form.patientCondition || null,
  callerName: form.callerName || null,
  callerPhone: form.callerPhone || null,
  callerNotes: form.callerNotes || null,
  pickupAddressLine1: form.pickupAddressLine1 || form.pickupLocation || null,
  pickupAddressLine2: form.pickupAddressLine2 || null,
  pickupCity: form.pickupCity || null,
  pickupState: form.pickupState || null,
  pickupPostalCode: form.pickupPostalCode || null,
  pickupCountry: form.pickupCountry || 'Kenya',
  pickupLatitude: toNumberOrNull(form.pickupLatitude),
  pickupLongitude: toNumberOrNull(form.pickupLongitude),
  dropoffAddressLine1: form.dropoffAddressLine1 || form.destination || null,
  dropoffAddressLine2: form.dropoffAddressLine2 || null,
  dropoffCity: form.dropoffCity || null,
  dropoffState: form.dropoffState || null,
  dropoffPostalCode: form.dropoffPostalCode || null,
  dropoffCountry: form.dropoffCountry || 'Kenya',
  dropoffLatitude: toNumberOrNull(form.dropoffLatitude),
  dropoffLongitude: toNumberOrNull(form.dropoffLongitude),
  hospitalId: /^\d+$/.test(String(form.hospitalId || '')) ? Number(form.hospitalId) : null,
  specialInstructions: form.specialInstructions || form.notes || null,
  estimatedResponseTime: form.estimatedTime || null,
  estimatedDistance: toNumberOrNull(
    typeof form.estimatedDistance === 'string'
      ? form.estimatedDistance.replace(/[^\d.-]/g, '')
      : form.estimatedDistance
  ),
  requiresICU: Boolean(form.requiresICU),
  requiresOxygen: Boolean(form.requiresOxygen),
  requiresStretcher: form.requiresStretcher === undefined ? true : Boolean(form.requiresStretcher),
  ambulanceId: ambulanceId || null,
});

const AmbulanceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [activeTab, setActiveTab] = useState('ambulances'); 
  const [_selectedItems, _setSelectedItems] = useState([]);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  
  // Pagination states
  const [ambulancePage, setAmbulancePage] = useState(1);
  const [driverPage, setDriverPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [showAddDispatchModal, setShowAddDispatchModal] = useState(false);
  const [showAddTrackingModal, setShowAddTrackingModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [currentAmbulance, setCurrentAmbulance] = useState(null);
  
  // Driver modal states
  const [showViewDriverModal, setShowViewDriverModal] = useState(false);
  const [showEditDriverModal, setShowEditDriverModal] = useState(false);
  const [showMoreDriverModal, setShowMoreDriverModal] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);
  const [_liveTracking, _setLiveTracking] = useState({});
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchForm, setDispatchForm] = useState({
    priority: 'HIGH', 
    incidentType: 'TRAFFIC_ACCIDENT',
    patientName: '',
    patientId: '',
    patientAge: '',
    condition: '',
    
    pickupLocation: '',
    pickupAddressLine1: '',
    pickupAddressLine2: '',
    pickupCity: '',
    pickupState: '',
    pickupPostalCode: '',
    pickupCountry: 'Kenya',
    pickupLatitude: '',
    pickupLongitude: '',
    
    destination: '',
    hospitalId: '',
    dropoffAddressLine1: '',
    dropoffAddressLine2: '',
    dropoffCity: '',
    dropoffState: '',
    dropoffPostalCode: '',
    dropoffCountry: 'Kenya',
    dropoffLatitude: '',
    dropoffLongitude: '',
    
    callerName: '',
    callerPhone: '',
    callerNotes: '',
   
    specialInstructions: '',
    notes: '',
    estimatedDistance: '',
    estimatedTime: ''
  });
  const [ambulances, setAmbulances] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);
  const [trackingData, setTrackingData] = useState({});
  const [emergencyCalls, setEmergencyCalls] = useState([]);
  const dataSignatureRef = useRef({
    ambulances: '',
    drivers: '',
    dispatches: '',
    tracking: '',
    hospitals: '',
  });

  const trackedAmbulances = useMemo(() => (
    ambulances
      .map((ambulance) => {
        const vehicleKey = ambulance.vehicleNumber || ambulance.vehiclePlate || ambulance.id;
        const trackingRow =
          trackingData[vehicleKey]
          || trackingData[ambulance.vehiclePlate]
          || trackingData[String(ambulance.id || '')];
        const coords = resolveAmbulanceCoords(ambulance, trackingRow);
        if (!coords) return null;

        const typeLabel = String(ambulance.type || 'Ambulance').replace(/_/g, ' ');
        const locationLabel = resolveAmbulanceLocationLabel(ambulance, trackingRow, coords);
        const available = String(ambulance.status || '').toUpperCase() === 'AVAILABLE';
        const eta = trackingRow?.speed > 0
          ? `${Math.max(1, Math.round(60 / Math.max(trackingRow.speed, 1)))} min`
          : (ambulance.averageResponseTime || 'N/A');

        return {
          id: vehicleKey,
          vehicleId: vehicleKey,
          name: ambulance.vehiclePlate || vehicleKey,
          driverName: ambulance.currentDriver || ambulance.driverName || 'Unassigned',
          status: ambulance.status,
          available,
          type: typeLabel,
          distance: 'N/A',
          speed: trackingRow?.speed,
          heading: trackingRow?.heading,
          batteryLevel: trackingRow?.batteryLevel,
          signalStrength: trackingRow?.signalStrength,
          eta,
          locationAddress: locationLabel,
          locationLabel,
          lastUpdate: trackingRow?.lastUpdate,
          location: coords,
        };
      })
      .filter(Boolean)
  ), [ambulances, trackingData]);

  const resetDispatchForm = useCallback(() => {
    setDispatchForm({
      priority: 'HIGH',
      incidentType: 'TRAFFIC_ACCIDENT',
      patientName: '',
      patientId: '',
      patientAge: '',
      condition: '',
      pickupLocation: '',
      pickupAddressLine1: '',
      pickupAddressLine2: '',
      pickupCity: '',
      pickupState: '',
      pickupPostalCode: '',
      pickupCountry: 'Kenya',
      pickupLatitude: '',
      pickupLongitude: '',
      destination: '',
      hospitalId: '',
      dropoffAddressLine1: '',
      dropoffAddressLine2: '',
      dropoffCity: '',
      dropoffState: '',
      dropoffPostalCode: '',
      dropoffCountry: 'Kenya',
      dropoffLatitude: '',
      dropoffLongitude: '',
      callerName: '',
      callerPhone: '',
      callerNotes: '',
      specialInstructions: '',
      notes: '',
      estimatedDistance: '',
      estimatedTime: '',
    });
  }, []);

  const refreshDashboardData = useCallback(async ({ silent = false } = {}) => {
    if (!silent) {
      setIsLoading(true);
      setLoadError('');
    }

    try {
      const [ambulancePayload, driverPayload, dispatchPayload, trackingPayload, hospitalPayload] = await Promise.all([
        ambulanceService.getAllAmbulances(),
        ambulanceService.getAllDrivers(),
        ambulanceService.getAllDispatches(),
        ambulanceService.getAllActiveTracking(),
        hospitalService.listHospitals().catch((error) => {
          console.error('Hospital list sync failed:', error);
          return [];
        }),
      ]);

      const nextAmbulances = toArray(ambulancePayload).map(normalizeAmbulance);
      const rawDrivers = toArray(driverPayload);
      const shouldHydrateDriverDetails = rawDrivers.length > 0
        && rawDrivers.every((driver) => extractDriverCertifications(driver).length === 0);

      let mergedDrivers = rawDrivers;
      if (shouldHydrateDriverDetails) {
        const detailedDrivers = await Promise.all(
          rawDrivers.map(async (driver) => {
            if (!driver?.id) return null;
            try {
              return await ambulanceService.getDriverById(driver.id);
            } catch (error) {
              console.warn(`Driver detail sync failed for id ${driver.id}:`, error);
              return null;
            }
          })
        );

        const driverDetailMap = new globalThis.Map(
          detailedDrivers
            .filter((driver) => driver && driver.id !== undefined && driver.id !== null)
            .map((driver) => [Number(driver.id), driver])
        );

        mergedDrivers = rawDrivers.map((driver) => ({
          ...driver,
          ...(driverDetailMap.get(Number(driver.id)) || {}),
        }));
      }

      const nextDrivers = mergedDrivers.map(normalizeDriver);
      const nextDispatches = toArray(dispatchPayload).map(normalizeDispatch);
      const nextTrackingMap = normalizeTrackingMap(toArray(trackingPayload), nextAmbulances);
      const nextHospitals = toArray(hospitalPayload).map(normalizeHospitalOption);

      const nextSignatures = {
        ambulances: toSignature(nextAmbulances),
        drivers: toSignature(nextDrivers),
        dispatches: toSignature(nextDispatches),
        tracking: toSignature(nextTrackingMap),
        hospitals: toSignature(nextHospitals),
      };

      if (dataSignatureRef.current.ambulances !== nextSignatures.ambulances) {
        setAmbulances(nextAmbulances);
        dataSignatureRef.current.ambulances = nextSignatures.ambulances;
      }

      if (dataSignatureRef.current.drivers !== nextSignatures.drivers) {
        setDrivers(nextDrivers);
        dataSignatureRef.current.drivers = nextSignatures.drivers;
      }

      if (dataSignatureRef.current.dispatches !== nextSignatures.dispatches) {
        setEmergencyCalls(nextDispatches);
        dataSignatureRef.current.dispatches = nextSignatures.dispatches;
      }

      if (dataSignatureRef.current.tracking !== nextSignatures.tracking) {
        setTrackingData(nextTrackingMap);
        dataSignatureRef.current.tracking = nextSignatures.tracking;
      }

      if (dataSignatureRef.current.hospitals !== nextSignatures.hospitals) {
        setHospitals(nextHospitals);
        dataSignatureRef.current.hospitals = nextSignatures.hospitals;
      }
    } catch (error) {
      console.error('Ambulance dashboard sync failed:', error);
      setLoadError(error?.message || 'Failed to load ambulance data from backend.');
      if (!silent) {
        setAmbulances([]);
        setDrivers([]);
        setEmergencyCalls([]);
        setTrackingData({});
        setHospitals([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshDashboardData();
  }, [refreshDashboardData]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshDashboardData({ silent: true });
    }, AUTO_REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refreshDashboardData]);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'AVAILABLE', label: 'Available' },
    { value: 'BUSY', label: 'Busy' },
    { value: 'MAINTENANCE', label: 'Maintenance' },
    { value: 'out_of_service', label: 'Out of Service' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'advanced_life_support', label: 'Advanced Life Support' },
    { value: 'basic_life_support', label: 'Basic Life Support' },
    { value: 'critical_care', label: 'Critical Care' },
    { value: 'patient_transport', label: 'Patient Transport' }
  ];

  const getStatusIcon = (status) => {
    const normalizedStatus = typeof status === 'string' ? status.toUpperCase() : status;
    switch (normalizedStatus) {
      case 'AVAILABLE': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'BUSY': 
      case 'IN_TRANSIT': 
      case 'TRANSPORTING':
      case 'EN_ROUTE':
      case 'ON_SCENE': return <Navigation className="w-4 h-4 text-blue-500" />;
      case 'MAINTENANCE': return <Settings className="w-4 h-4 text-blue-500" />;
      case 'OUT_OF_SERVICE': return <XCircle className="w-4 h-4 text-blue-500" />;
      case 'ON_DUTY': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'ON_TRIP': return <Navigation className="w-4 h-4 text-blue-500" />;
      case 'OFF_DUTY': return <XCircle className="w-4 h-4 text-blue-500" />;
      case 'CRITICAL': return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      case 'HIGH': return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      case 'MEDIUM': return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      case 'LOW': return <Info className="w-4 h-4 text-blue-500" />;
      case 'IN_PROGRESS':
      case 'REQUESTED':
      case 'DISPATCHED': return <Timer className="w-4 h-4 text-blue-500" />;
      case 'COMPLETED':
      case 'AT_HOSPITAL': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'CANCELED': return <XCircle className="w-4 h-4 text-blue-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    const normalizedStatus = typeof status === 'string' ? status.toUpperCase() : status;
    switch (normalizedStatus) {
      case 'AVAILABLE': return 'text-green-800';
      case 'BUSY':
      case 'IN_TRANSIT':
      case 'TRANSPORTING':
      case 'EN_ROUTE':
      case 'ON_SCENE': return 'text-blue-800';
      case 'MAINTENANCE': return 'text-yellow-800';
      case 'OUT_OF_SERVICE': return 'text-red-800';
      case 'ON_DUTY': return 'text-green-800';
      case 'ON_TRIP': return 'text-blue-800';
      case 'OFF_DUTY': return 'text-gray-800';
      case 'CRITICAL': return 'text-red-800';
      case 'HIGH': return 'text-orange-800';
      case 'MEDIUM': return 'text-yellow-800';
      case 'LOW': return 'text-blue-800';
      case 'IN_PROGRESS':
      case 'REQUESTED':
      case 'DISPATCHED': return 'text-blue-800';
      case 'COMPLETED':
      case 'AT_HOSPITAL': return 'text-green-800';
      case 'CANCELED': return 'text-red-800';
      default: return 'text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'advanced_life_support': return <Heart className="w-4 h-4 text-red-600" />;
      case 'basic_life_support': return <Activity className="w-4 h-4 text-blue-600" />;
      case 'critical_care': return <Shield className="w-4 h-4 text-purple-600" />;
      case 'patient_transport': return <Truck className="w-4 h-4 text-green-600" />;
      default: return <Truck className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredAmbulances = ambulances.filter((ambulance) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      (ambulance.vehicleNumber || '').toLowerCase().includes(query)
      || (ambulance.vehiclePlate || '').toLowerCase().includes(query)
      || (ambulance.registrationNumber || '').toLowerCase().includes(query)
      || (ambulance.model || '').toLowerCase().includes(query)
      || (ambulance.currentDriver || '').toLowerCase().includes(query)
      || (ambulance.driverName || '').toLowerCase().includes(query)
      || (ambulance.location || '').toLowerCase().includes(query);
    const matchesStatus = selectedStatus === 'all'
      || ambulance.status === selectedStatus
      || String(ambulance.status || '').toLowerCase() === selectedStatus.toLowerCase();
    const matchesType = selectedType === 'all' || ambulance.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredDrivers = drivers.filter((driver) => {
    const query = searchTerm.toLowerCase();
    return (driver.name || '').toLowerCase().includes(query)
      || (driver.currentVehicle || '').toLowerCase().includes(query)
      || (driver.location || '').toLowerCase().includes(query);
  });

  const filteredDispatches = emergencyCalls.filter((dispatch) => {
    const query = searchTerm.toLowerCase();
    return (dispatch.callId || dispatch.id || '').toLowerCase().includes(query)
      || (dispatch.patientName || '').toLowerCase().includes(query)
      || (dispatch.pickupLocation || dispatch.location || '').toLowerCase().includes(query);
  });

  const filteredTracking = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return Object.values(trackingData).filter((unit) => {
      if (!query) return true;
      return (unit.vehicleId || '').toLowerCase().includes(query)
        || (unit.locationAddress || '').toLowerCase().includes(query)
        || String(unit.connectionStatus || '').toLowerCase().includes(query);
    });
  }, [searchTerm, trackingData]);

  const handleExport = useCallback(() => {
    const exportDate = new Date().toISOString().slice(0, 10);
    let rows = [];
    let filename = '';

    if (activeTab === 'ambulances') {
      if (filteredAmbulances.length === 0) {
        window.alert('No ambulance records available to export.');
        return;
      }

      rows = [
        [
          'Vehicle Plate',
          'Registration Number',
          'Year',
          'Type',
          'Status',
          'Driver',
          'Medic',
          'Trips',
          'Average Response',
          'Insurance Provider',
          'Policy Number',
        ],
        ...filteredAmbulances.map((item) => [
          item.vehiclePlate,
          item.registrationNumber,
          item.year,
          item.type,
          item.status,
          item.driverName,
          item.medicName,
          item.totalDispatches,
          item.averageResponseTime,
          item.insuranceProvider,
          item.insurancePolicyNumber,
        ]),
      ];
      filename = `ambulances-${exportDate}.csv`;
    } else if (activeTab === 'drivers') {
      if (filteredDrivers.length === 0) {
        window.alert('No driver records available to export.');
        return;
      }

      rows = [
        ['Name', 'License Number', 'Phone', 'Email', 'Status', 'Current Vehicle', 'Experience', 'Total Trips', 'Rating'],
        ...filteredDrivers.map((item) => [
          item.name,
          item.licenseNumber,
          item.phone,
          item.email,
          String(item.status || '').replace(/_/g, ' ').toUpperCase(),
          item.currentVehicle,
          item.experience,
          item.totalTrips,
          item.rating,
        ]),
      ];
      filename = `drivers-${exportDate}.csv`;
    } else if (activeTab === 'dispatch') {
      if (filteredDispatches.length === 0) {
        window.alert('No dispatch records available to export.');
        return;
      }

      rows = [
        ['Call ID', 'Patient Name', 'Priority', 'Status', 'Ambulance', 'Pickup Location', 'Destination', 'Requested At'],
        ...filteredDispatches.map((item) => [
          item.callId || item.id,
          item.patientName,
          item.priority,
          item.status,
          item.assignedAmbulance || item.vehiclePlate,
          item.pickupLocation || item.location,
          item.destination,
          formatDateTime(item.requestTime || item.callTime),
        ]),
      ];
      filename = `dispatches-${exportDate}.csv`;
    } else if (activeTab === 'tracking') {
      if (filteredTracking.length === 0) {
        window.alert('No tracking records available to export.');
        return;
      }

      rows = [
        ['Vehicle', 'Latitude', 'Longitude', 'Speed', 'Heading', 'Battery Level', 'Signal Strength', 'Status', 'Last Update'],
        ...filteredTracking.map((item) => [
          item.vehicleId,
          item.latitude,
          item.longitude,
          item.speed,
          item.heading,
          item.batteryLevel,
          item.signalStrength,
          item.connectionStatus,
          formatDateTime(item.lastUpdate),
        ]),
      ];
      filename = `tracking-${exportDate}.csv`;
    }

    if (rows.length === 0 || !filename) {
      window.alert('No records available to export.');
      return;
    }

    const csv = buildCsv(rows);
    downloadTextFile(filename, `\uFEFF${csv}`, 'text/csv;charset=utf-8');
  }, [
    activeTab,
    filteredAmbulances,
    filteredDispatches,
    filteredDrivers,
    filteredTracking,
  ]);

  // Paginated data
  const paginatedAmbulances = useMemo(() => {
    const startIndex = (ambulancePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAmbulances.slice(startIndex, endIndex);
  }, [filteredAmbulances, ambulancePage]);

  const paginatedDrivers = useMemo(() => {
    const startIndex = (driverPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredDrivers.slice(startIndex, endIndex);
  }, [filteredDrivers, driverPage]);

  // Dispatch handling functions
  const handleDispatch = async (ambulancePlate, callId) => {
    const call = emergencyCalls.find((item) => item.id === callId);
    if (!call) return;

    const selectedUnit = ambulances.find(
      (item) => item.vehiclePlate === ambulancePlate || item.vehicleNumber === ambulancePlate
    );
    if (!selectedUnit?.id) {
      window.alert('Selected ambulance was not found in backend records.');
      return;
    }

    try {
      setIsDispatching(true);
      const payload = buildDispatchPayload(
        {
          incidentType: call.incidentType || dispatchForm.incidentType,
          priority: call.priority || dispatchForm.priority,
          patientName: call.patientName || dispatchForm.patientName,
          patientAge: call.patientAge || dispatchForm.patientAge,
          condition: call.condition || dispatchForm.condition,
          pickupAddressLine1: call.pickupAddressLine1 || call.pickupLocation || call.location,
          pickupAddressLine2: call.pickupAddressLine2 || '',
          pickupCity: call.pickupCity || '',
          pickupState: call.pickupState || '',
          pickupPostalCode: call.pickupPostalCode || '',
          pickupCountry: call.pickupCountry || 'Kenya',
          pickupLatitude: call.pickupLatitude,
          pickupLongitude: call.pickupLongitude,
          callerName: call.callerName,
          callerPhone: call.callerPhone,
          callerNotes: call.callerNotes,
          destination: call.destination || dispatchForm.destination,
          specialInstructions: call.specialInstructions || dispatchForm.specialInstructions,
          estimatedTime: call.estimatedResponse,
        },
        selectedUnit.id
      );

      if (call.backendId) {
        await ambulanceService.updateDispatch(call.backendId, payload);
      } else {
        await ambulanceService.createDispatch(payload);
      }

      await ambulanceService.updateStatus(selectedUnit.id, 'DISPATCHED');
      await refreshDashboardData({ silent: true });

      setShowDispatchModal(false);
      resetDispatchForm();
      setSelectedAmbulance(null);
      window.alert(`Ambulance ${selectedUnit.vehiclePlate} dispatched successfully.`);
    } catch (error) {
      window.alert(error?.message || 'Failed to dispatch ambulance.');
    } finally {
      setIsDispatching(false);
    }
  };

  const handleQuickDispatch = async (call) => {
    const availableAmbulances = ambulances.filter((item) => item.status === 'AVAILABLE');
    if (availableAmbulances.length === 0) {
      window.alert('No ambulances available for dispatch');
      return;
    }
    const nearestAmbulance = availableAmbulances[0];
    await handleDispatch(nearestAmbulance.vehiclePlate, call.id);
  };

  const handleEditSave = async (updatedAmbulance) => {
    if (!updatedAmbulance?.id) {
      window.alert('Cannot update ambulance without backend id.');
      return;
    }

    try {
      await ambulanceService.updateAmbulance(updatedAmbulance.id, buildAmbulancePayload(updatedAmbulance));
      await refreshDashboardData({ silent: true });
      setShowEditModal(false);
      setCurrentAmbulance(null);
      window.alert('Ambulance updated successfully.');
    } catch (error) {
      window.alert(error?.message || 'Failed to update ambulance.');
    }
  };

  const handleAddSave = async (newAmbulance) => {
    try {
      await ambulanceService.addAmbulance(buildAmbulancePayload(newAmbulance));
      await refreshDashboardData({ silent: true });
      setShowAddModal(false);
      window.alert('Ambulance added successfully.');
    } catch (error) {
      window.alert(error?.message || 'Failed to add ambulance.');
    }
  };

  const handleAddDriverSave = async (newDriver) => {
    try {
      const createdDriver = await ambulanceService.addDriver(buildDriverPayload(newDriver));

      if (newDriver.currentVehicle && createdDriver?.id) {
        const matchedAmbulance = ambulances.find(
          (item) => item.vehiclePlate === newDriver.currentVehicle || item.vehicleNumber === newDriver.currentVehicle
        );
        if (matchedAmbulance?.id) {
          await ambulanceService.assignToAmbulance(createdDriver.id, matchedAmbulance.id);
        }
      }

      await refreshDashboardData({ silent: true });
      setShowAddDriverModal(false);
      window.alert('Driver added successfully.');
    } catch (error) {
      window.alert(error?.message || 'Failed to add driver.');
    }
  };

  const handleAddTrackingSave = async (newTrackingData) => {
    try {
      const selectedUnit = ambulances.find(
        (item) => item.vehiclePlate === newTrackingData.vehicleId || item.vehicleNumber === newTrackingData.vehicleId
      );
      if (!selectedUnit?.id) {
        window.alert('Selected ambulance was not found in backend records.');
        return;
      }

      await ambulanceService.updateLocation(selectedUnit.id, {
        latitude: toNumberOrNull(newTrackingData.latitude),
        longitude: toNumberOrNull(newTrackingData.longitude),
        speed: toNumberOrNull(newTrackingData.speed),
        heading: toNumberOrNull(newTrackingData.heading),
        batteryLevel: toNumberOrNull(newTrackingData.batteryLevel),
        signalStrength: toNumberOrNull(newTrackingData.signalStrength),
        locationAddress: selectedUnit.location,
        timestamp: new Date().toISOString(),
      });

      await refreshDashboardData({ silent: true });
      setShowAddTrackingModal(false);
      window.alert(`${newTrackingData.vehicleId} added to live tracking.`);
    } catch (error) {
      window.alert(error?.message || 'Failed to add tracking unit.');
    }
  };

  const handleEditDriverSave = async (updatedDriver) => {
    if (!updatedDriver?.id) {
      window.alert('Cannot update driver without backend id.');
      return;
    }

    try {
      await ambulanceService.updateDriver(updatedDriver.id, buildDriverPayload(updatedDriver));

      const selectedVehicle = (updatedDriver.currentVehicle || '').trim();
      if (selectedVehicle) {
        const matchedAmbulance = ambulances.find(
          (item) => item.vehiclePlate === selectedVehicle || item.vehicleNumber === selectedVehicle
        );
        if (matchedAmbulance?.id) {
          await ambulanceService.assignToAmbulance(updatedDriver.id, matchedAmbulance.id);
        }
      } else {
        await ambulanceService.unassignFromAmbulance(updatedDriver.id);
      }

      await refreshDashboardData({ silent: true });
      setShowEditDriverModal(false);
      setCurrentDriver(null);
      window.alert('Driver updated successfully.');
    } catch (error) {
      window.alert(error?.message || 'Failed to update driver.');
    }
  };

  const handleMoreDriverAction = async (action, driver) => {
    try {
      switch (action) {
        case 'view-history': {
          const dispatchPayload = await ambulanceService.getAllDispatches();
          const dispatches = toArray(dispatchPayload).map(normalizeDispatch);
          const normalizedDriverName = String(driver.name || '').trim().toLowerCase();
          const normalizedVehicle = String(driver.currentVehicle || '').trim().toUpperCase();

          const driverTrips = dispatches.filter((trip) => {
            const backendDriverName = String(trip.backend?.driverName || trip.backend?.driver?.name || '').trim().toLowerCase();
            const tripVehicle = String(trip.vehiclePlate || trip.ambulanceUnitId || '').trim().toUpperCase();
            return (normalizedDriverName && backendDriverName === normalizedDriverName)
              || (normalizedVehicle && normalizedVehicle === tripVehicle);
          });

          return {
            type: 'info',
            message: `${driver.name} has ${driverTrips.length} dispatch records.`,
            details: driverTrips.slice(0, 5).map((trip) => ({
              callId: trip.callId || trip.id,
              patient: trip.patientName,
              status: trip.status,
              priority: trip.priority,
              requestedAt: formatDateTime(trip.requestTime || trip.callTime),
            })),
          };
        }
        case 'schedule': {
          const freshDriver = normalizeDriver(await ambulanceService.getDriverById(driver.id));
          return {
            type: 'info',
            message: `Current schedule for ${freshDriver.name}`,
            details: {
              shiftStart: freshDriver.shiftStart || 'N/A',
              shiftEnd: freshDriver.shiftEnd || 'N/A',
              status: String(freshDriver.status || 'off_duty').replace(/_/g, ' ').toUpperCase(),
            },
          };
        }
        case 'location': {
          const matchedAmbulance = ambulances.find(
            (unit) => unit.id === driver.currentAmbulanceId
              || unit.vehiclePlate === driver.currentVehicle
              || unit.vehicleNumber === driver.currentVehicle
          );

          if (!matchedAmbulance?.id) {
            return {
              type: 'info',
              message: `${driver.name} is not currently assigned to an ambulance with active GPS data.`,
            };
          }

          const location = await ambulanceService.getCurrentLocation(matchedAmbulance.id);
          return {
            type: 'success',
            message: `Live location fetched for ${driver.name}.`,
            details: {
              ambulance: matchedAmbulance.vehiclePlate,
              latitude: location?.latitude ?? location?.currentLatitude ?? 'N/A',
              longitude: location?.longitude ?? location?.currentLongitude ?? 'N/A',
              speed: location?.speed ?? 'N/A',
              timestamp: formatDateTime(location?.timestamp || location?.updatedAt || location?.createdAt),
            },
          };
        }
        case 'export': {
          const freshDriver = normalizeDriver(await ambulanceService.getDriverById(driver.id));
          const rows = [
            ['Field', 'Value'],
            ['Name', freshDriver.name],
            ['License Number', freshDriver.licenseNumber],
            ['Phone', freshDriver.phone],
            ['Email', freshDriver.email],
            ['Status', String(freshDriver.status || '').replace(/_/g, ' ').toUpperCase()],
            ['Assigned Vehicle', freshDriver.currentVehicle || 'N/A'],
            ['Experience', freshDriver.experience || 'N/A'],
            ['Certifications', freshDriver.certifications.join(', ') || 'N/A'],
            ['Total Trips', freshDriver.totalTrips],
            ['Rating', freshDriver.rating || 'N/A'],
          ];
          const csv = buildCsv(rows);
          const filename = `driver-${toSafeFileSegment(freshDriver.name)}-${new Date().toISOString().slice(0, 10)}.csv`;
          downloadTextFile(filename, csv, 'text/csv;charset=utf-8');

          return {
            type: 'success',
            message: `Driver export generated: ${filename}`,
          };
        }
        case 'suspend':
          await ambulanceService.updateDriverStatus(driver.id, 'OFF_DUTY');
          await refreshDashboardData({ silent: true });
          return {
            type: 'success',
            message: `${driver.name} has been suspended and set to OFF DUTY.`,
          };
        case 'deactivate':
          await ambulanceService.updateDriverStatus(driver.id, 'OFF_DUTY');
          await ambulanceService.unassignFromAmbulance(driver.id).catch(() => null);
          await refreshDashboardData({ silent: true });
          return {
            type: 'success',
            message: `${driver.name} has been deactivated and unassigned.`,
          };
        case 'delete':
          await ambulanceService.deleteDriver(driver.id);
          await refreshDashboardData({ silent: true });
          return {
            type: 'success',
            message: `${driver.name} has been deleted from the system.`,
            closeModal: true,
          };
        default:
          return {
            type: 'info',
            message: `Action ${action} is not supported.`,
          };
      }
    } catch (error) {
      return {
        type: 'error',
        message: error?.message || 'Driver action failed.',
      };
    }
  };

  const handleMoreAction = async (action, ambulance) => {
    try {
      switch (action) {
        case 'track': {
          const location = await ambulanceService.getCurrentLocation(ambulance.id);
          return {
            type: 'success',
            message: `Live location fetched for ${ambulance.vehiclePlate}.`,
            details: {
              latitude: location?.latitude ?? location?.currentLatitude ?? 'N/A',
              longitude: location?.longitude ?? location?.currentLongitude ?? 'N/A',
              speed: location?.speed ?? 'N/A',
              heading: location?.heading ?? 'N/A',
              timestamp: formatDateTime(location?.timestamp || location?.updatedAt || location?.createdAt),
            },
          };
        }
        case 'schedule': {
          const latest = normalizeAmbulance(await ambulanceService.getAmbulanceById(ambulance.id));
          return {
            type: 'info',
            message: `Maintenance schedule for ${latest.vehiclePlate}.`,
            details: {
              lastMaintenance: latest.lastMaintenance || 'N/A',
              nextMaintenance: latest.nextMaintenance || 'N/A',
              mileage: latest.mileage ? `${latest.mileage.toLocaleString()} km` : 'N/A',
            },
          };
        }
        case 'history': {
          const historyPayload = await ambulanceService.getDispatchHistory(ambulance.id);
          const historyItems = toArray(historyPayload).map(normalizeDispatch);
          return {
            type: 'info',
            message: `${ambulance.vehiclePlate} has ${historyItems.length} dispatch history records.`,
            details: historyItems.slice(0, 5).map((item) => ({
              callId: item.callId || item.id,
              patient: item.patientName,
              status: item.status,
              priority: item.priority,
              requestedAt: formatDateTime(item.requestTime || item.callTime),
            })),
          };
        }
        case 'export': {
          const latest = normalizeAmbulance(await ambulanceService.getAmbulanceById(ambulance.id));
          const rows = [
            ['Field', 'Value'],
            ['Vehicle Plate', latest.vehiclePlate],
            ['Registration Number', latest.registrationNumber],
            ['Model', latest.model],
            ['Year', latest.year],
            ['Status', latest.status],
            ['Type', latest.type],
            ['Fuel Type', latest.fuelType],
            ['Capacity', latest.capacity],
            ['Driver', latest.driverName],
            ['Driver Phone', latest.driverPhone || 'N/A'],
            ['Medic', latest.medicName || 'N/A'],
            ['Location', latest.location || 'N/A'],
            ['Insurance Provider', latest.insuranceProvider || 'N/A'],
            ['Policy Number', latest.insurancePolicyNumber || 'N/A'],
            ['Total Dispatches', latest.totalDispatches],
            ['Average Response', latest.averageResponseTime],
          ];
          const csv = buildCsv(rows);
          const filename = `ambulance-${toSafeFileSegment(latest.vehiclePlate)}-${new Date().toISOString().slice(0, 10)}.csv`;
          downloadTextFile(filename, csv, 'text/csv;charset=utf-8');
          return {
            type: 'success',
            message: `Ambulance export generated: ${filename}`,
          };
        }
        case 'print': {
          const latest = normalizeAmbulance(await ambulanceService.getAmbulanceById(ambulance.id));
          const iframe = document.createElement('iframe');
          iframe.style.position = 'fixed';
          iframe.style.right = '0';
          iframe.style.bottom = '0';
          iframe.style.width = '0';
          iframe.style.height = '0';
          iframe.style.border = '0';
          iframe.setAttribute('aria-hidden', 'true');
          document.body.appendChild(iframe);

          const printDoc = iframe.contentWindow?.document;
          if (!printDoc) {
            iframe.remove();
            return {
              type: 'error',
              message: 'Could not prepare print report. Please try again.',
            };
          }

          printDoc.open();
          printDoc.write(`
            <html>
              <head>
                <title>Ambulance Report - ${latest.vehiclePlate}</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
                  h1 { margin-bottom: 4px; }
                  p { margin: 0 0 12px 0; color: #4b5563; }
                  table { width: 100%; border-collapse: collapse; margin-top: 16px; }
                  th, td { border: 1px solid #e5e7eb; padding: 10px; text-align: left; }
                  th { background: #f9fafb; width: 35%; }
                </style>
              </head>
              <body>
                <h1>Ambulance Report</h1>
                <p>${latest.vehiclePlate} • Generated ${new Date().toLocaleString()}</p>
                <table>
                  <tr><th>Vehicle Plate</th><td>${latest.vehiclePlate}</td></tr>
                  <tr><th>Registration Number</th><td>${latest.registrationNumber || 'N/A'}</td></tr>
                  <tr><th>Model</th><td>${latest.model || 'N/A'}</td></tr>
                  <tr><th>Status</th><td>${latest.status || 'N/A'}</td></tr>
                  <tr><th>Driver</th><td>${latest.driverName || 'N/A'}</td></tr>
                  <tr><th>Medic</th><td>${latest.medicName || 'N/A'}</td></tr>
                  <tr><th>Current Location</th><td>${latest.location || 'N/A'}</td></tr>
                  <tr><th>Total Dispatches</th><td>${latest.totalDispatches ?? 0}</td></tr>
                  <tr><th>Average Response</th><td>${latest.averageResponseTime || 'N/A'}</td></tr>
                </table>
              </body>
            </html>
          `);
          printDoc.close();

          const runPrint = () => {
            try {
              iframe.contentWindow?.focus();
              iframe.contentWindow?.print();
            } finally {
              setTimeout(() => iframe.remove(), 1000);
            }
          };

          if (iframe.contentWindow?.document?.readyState === 'complete') {
            runPrint();
          } else {
            iframe.onload = runPrint;
          }

          return {
            type: 'success',
            message: `Print report opened for ${latest.vehiclePlate}.`,
          };
        }
        case 'refresh':
          await refreshDashboardData({ silent: true });
          return {
            type: 'success',
            message: `${ambulance.vehiclePlate} refreshed successfully.`,
          };
        case 'archive':
          await ambulanceService.updateStatus(ambulance.id, 'OUT_OF_SERVICE');
          await refreshDashboardData({ silent: true });
          return {
            type: 'success',
            message: `${ambulance.vehiclePlate} archived successfully.`,
          };
        case 'delete':
          await ambulanceService.deleteAmbulance(ambulance.id);
          await refreshDashboardData({ silent: true });
          return {
            type: 'success',
            message: `${ambulance.vehiclePlate} deleted successfully.`,
            closeModal: true,
          };
        default:
          return {
            type: 'info',
            message: `Action ${action} is not supported.`,
          };
      }
    } catch (error) {
      return {
        type: 'error',
        message: error?.message || 'Ambulance action failed.',
      };
    }
  };

  const _calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Ambulance Management</h1>
              {isLoading && <p className="text-sm text-gray-500">Loading backend ambulance data...</p>}
            </div>
          </div>

          {loadError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {loadError}
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Fleet</p>
                  <p className="text-2xl font-bold text-gray-900">{ambulances.length}</p>
                </div>
                <div className="p-3 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-600 flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                {ambulances.filter((a) => String(a.status || '').toUpperCase() === 'AVAILABLE').length} Available
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Drivers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {drivers.filter(d => d.status === 'on_duty').length}
                  </p>
                </div>
                <div className="p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-600">
                of {drivers.length} total drivers
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Emergency Calls</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {emergencyCalls.filter(c => {
                      const normalized = String(c.status || '').toUpperCase();
                      return normalized === 'REQUESTED' || normalized === 'PENDING';
                    }).length}
                  </p>
                </div>
                <div className="p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-600">
                {emergencyCalls.length} total calls
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Tracking</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Object.keys(trackingData).length}
                  </p>
                </div>
                <div className="p-3 rounded-lg">
                  <Navigation className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-600 flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-pulse"></div>
                Live monitoring
              </div>
            </div>
          </div>
        </div>
      </div>


          {/* Tabs */}
          <div className=" mb-6">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('ambulances')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'ambulances'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Truck className="w-4 h-4 inline mr-2" />
                Fleet ({ambulances.length})
              </button>
              <button
                onClick={() => setActiveTab('drivers')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'drivers'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Drivers ({drivers.length})
              </button>
              <button
                onClick={() => setActiveTab('dispatch')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'dispatch'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Send className="w-4 h-4 inline mr-2" />
                Emergency Dispatch ({emergencyCalls.filter(c => {
                  const normalized = String(c.status || '').toUpperCase();
                  return normalized === 'REQUESTED' || normalized === 'PENDING';
                }).length})
              </button>
              <button
                onClick={() => setActiveTab('tracking')}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'tracking'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Target className="w-4 h-4 inline mr-2" />
                Live Tracking ({trackedAmbulances.length})
              </button>
            
            </div> 
          </div>

          {/* Controls */}
          <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {activeTab === 'ambulances' && (
                    <div className="flex gap-3">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none "
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {typeOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex  space-x-3">
                  {/* <button
                    onClick={() => refreshDashboardData({ silent: true })}
                    className="flex items-center px-4 py-2 border border-gray-300  text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </button> */}
                  <button
                    onClick={handleExport}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button 
                    onClick={() => {
                      if (activeTab === 'ambulances') {
                        setShowAddModal(true);
                      } else if (activeTab === 'drivers') {
                        setShowAddDriverModal(true);
                      } else if (activeTab === 'dispatch') {
                        setShowAddDispatchModal(true);
                      } else if (activeTab === 'tracking') {
                        setShowAddTrackingModal(true);
                      }
                    }}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add {activeTab === 'dispatch' ? 'dispatch' : activeTab === 'dispatches' ? 'dispatch' : activeTab === 'tracking' ? 'unit' : activeTab.slice(0, -1)}
                  </button>
                </div>
              </div>
            </div>

          {/* Ambulances Tab */}
              {activeTab === 'ambulances' && (
              <>
              <div className="bg-white border border-gray-200 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 uppercase text-xs font-semibold">
              <tr>
                <th className="px-3 py-3 text-left">Vehicle Plate</th>
                <th className="px-3 py-3 text-left">Registration</th>
                <th className="px-3 py-3 text-left">Year</th>
                <th className="px-3 py-3 text-left">Type</th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-left">Driver</th>
                <th className="px-3 py-3 text-left">Medic</th>
                <th className="px-3 py-3 text-center">Trips</th>
                <th className="px-3 py-3 text-center">Avg Response</th>
                <th className="px-3 py-3 text-left">Insurance Provider</th>
                <th className="px-3 py-3 text-left">Policy Number</th>
                <th className="px-3 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAmbulances.map((a) => (
                <tr key={a.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{a.vehiclePlate}</p>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{a.registrationNumber}</p>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{a.year}</p>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm text-gray-700 capitalize">{a.type.replace("_", " ")}</p>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium ${getStatusColor(
                        a.status
                      )}`}
                    >
                      {a.status.replace("_", " ").toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{a.driverName}</p>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{a.medicName}</p>
                  </td>
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-900">{a.totalDispatches}</p>
                  </td>
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <p className="text-sm text-gray-700">{a.averageResponseTime}</p>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{a.insuranceProvider}</p>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-xs text-gray-600">{a.insurancePolicyNumber}</p>
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => {
                          setCurrentAmbulance(a);
                          setShowViewModal(true);
                        }}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => {
                          setCurrentAmbulance(a);
                          setShowEditModal(true);
                        }}
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => {
                          setCurrentAmbulance(a);
                          setShowMoreModal(true);
                        }}
                        title="More Options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAmbulances.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              No ambulances found.
            </div>
          )}
        </div>
        
        {filteredAmbulances.length > 0 && (
          <Pagination
            currentPage={ambulancePage}
            totalItems={filteredAmbulances.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setAmbulancePage}
            itemName="ambulances"
          />
        )}
        </>
          )}

          {/* Drivers Tab */}
          {activeTab === 'drivers' && (
            <div className="border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Driver</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Email</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Phone</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Shift Time</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Vehicle</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Location</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">Experience</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider">License Number</th>
                      <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">Total Trips</th>
                      <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedDrivers.map((driver) => (
                      <tr key={driver.id} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                        <td className="px-3 py-3">
                          <div className="whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">{driver.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{driver.email}</span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{driver.phone}</span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(driver.status)}
                            <span className={`ml-2 px-2 py-1 text-xs font-medium ${getStatusColor(driver.status)}`}>
                              {driver.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-600">
                            {driver.shiftStart} - {driver.shiftEnd}
                          </span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{driver.currentVehicle || 'Not assigned'}</span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{driver.location}</span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{driver.experience}</span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-600">
                            {driver.licenseNumber || 'N/A'}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-center whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{driver.totalTrips}</span>
                        </td>
                        <td className="px-3 py-3 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center space-x-2">
                            <button 
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              onClick={() => {
                                setCurrentDriver(driver);
                                setShowViewDriverModal(true);
                              }}
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              onClick={() => {
                                setCurrentDriver(driver);
                                setShowEditDriverModal(true);
                              }}
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                              onClick={() => {
                                setCurrentDriver(driver);
                                setShowMoreDriverModal(true);
                              }}
                              title="More Options"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredDrivers.length > 0 && (
                <Pagination
                  currentPage={driverPage}
                  totalItems={filteredDrivers.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setDriverPage}
                  itemName="drivers"
                />
              )}
            </div>
          )}

          {/* Emergency Dispatch Tab */}
          {activeTab === 'dispatch' && (
            <div className="bg-white border border-gray-200 overflow-x-auto">
              {emergencyCalls.length === 0 ? (
                <div className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Emergency Calls</h3>
                  <p className="text-gray-500">All emergency calls have been handled. Great work!</p>
                </div>
              ) : (
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-4 py-3 text-left">Call ID</th>
                      <th className="px-4 py-3 text-left">Priority</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Patient Info</th>
                      <th className="px-4 py-3 text-left">Location</th>
                      <th className="px-4 py-3 text-left">Caller Details</th>
                      <th className="px-4 py-3 text-left">Time Info</th>
                      <th className="px-4 py-3 text-left">Nearest Units</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emergencyCalls.map((call) => (
                      <tr key={call.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        {(() => {
                          const dispatchExtraFields = getExtraFields(call.backend, [
                            'id',
                            'incidentId',
                            'incidentType',
                            'priority',
                            'status',
                            'callerName',
                            'callerPhone',
                            'callerNotes',
                            'patientId',
                            'patientName',
                            'patientAge',
                            'patientGender',
                            'patientCondition',
                            'condition',
                            'pickupAddressLine1',
                            'pickupAddressLine2',
                            'pickupCity',
                            'pickupState',
                            'pickupPostalCode',
                            'pickupCountry',
                            'pickupLatitude',
                            'pickupLongitude',
                            'dropoffAddressLine1',
                            'dropoffAddressLine2',
                            'dropoffCity',
                            'dropoffState',
                            'dropoffPostalCode',
                            'dropoffCountry',
                            'dropoffLatitude',
                            'dropoffLongitude',
                            'hospitalId',
                            'vehiclePlate',
                            'ambulanceUnitId',
                            'ambulanceId',
                            'specialInstructions',
                            'notes',
                            'requestTime',
                            'dispatchTime',
                            'onSceneTime',
                            'arrivalAtHospitalTime',
                            'completionTime',
                            'estimatedResponseTime',
                            'estimatedDistance',
                            'requiresICU',
                            'requiresOxygen',
                            'requiresStretcher',
                            'createdAt',
                            'updatedAt',
                          ]);

                          return (
                            <>
                        <td className="px-4 py-4">
                          <div className="font-semibold text-gray-900">{call.id}</div>
                        </td>
                        <td className="px-4 py-4">
                          {(() => {
                            const normalizedPriority = String(call.priority || 'MEDIUM').toUpperCase();
                            return (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
                            normalizedPriority === 'CRITICAL' ? 'text-red-800 bg-red-50 border-red-200' :
                            normalizedPriority === 'HIGH' ? 'text-orange-800 bg-orange-50 border-orange-200' :
                            normalizedPriority === 'MEDIUM' ? 'text-yellow-800 bg-yellow-50 border-yellow-200' :
                            'text-blue-800 bg-blue-50 border-blue-200'
                          }`}>
                            {normalizedPriority}
                          </span>
                            );
                          })()}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(call.status)}`}>
                            {call.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">{call.patientName}</div>
                            <div className="text-xs text-gray-600">{call.condition}</div>
                            <div className="text-xs text-gray-500">
                              {call.patientId ? `ID: ${call.patientId}` : 'ID: N/A'}
                              {call.patientAge ? ` • Age: ${call.patientAge}` : ''}
                              {call.patientGender ? ` • ${String(call.patientGender).toUpperCase()}` : ''}
                            </div>
                            <div className="text-xs text-gray-500">
                              Incident: {String(call.incidentType || 'OTHER').replace(/_/g, ' ')}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-start max-w-xs">
                            <MapPin className="w-4 h-4 mr-1 mt-0.5 text-gray-400 flex-shrink-0" />
                            <div>
                              <div className="text-gray-700">{call.location}</div>
                              <div className="text-xs text-gray-500 mt-1">To: {call.destination || 'N/A'}</div>
                              <div className="text-xs text-gray-500">
                                {call.pickupLatitude && call.pickupLongitude
                                  ? `${call.pickupLatitude}, ${call.pickupLongitude}`
                                  : 'Coordinates: N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="text-gray-900">{call.callerName}</div>
                            <div className="flex items-center text-xs text-gray-600">
                              <Phone className="w-3 h-3 mr-1" />
                              {call.callerPhone}
                            </div>
                            {call.callerNotes && (
                              <div className="text-xs text-gray-500 max-w-xs truncate" title={call.callerNotes}>
                                Notes: {call.callerNotes}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-xs text-gray-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {call.callTime.toLocaleTimeString()}
                            </div>
                            <div className="text-xs text-gray-600">Requested: {formatDateTime(call.requestTime)}</div>
                            <div className="text-xs text-gray-600">Dispatched: {formatDateTime(call.dispatchTime)}</div>
                            <div className="text-xs text-gray-600">On Scene: {formatDateTime(call.onSceneTime)}</div>
                            <div className="text-xs text-gray-600">Completed: {formatDateTime(call.completionTime)}</div>
                            <div className="text-xs text-gray-600">
                              Est: {call.estimatedResponse}
                            </div>
                            {call.estimatedDistance && (
                              <div className="text-xs text-gray-600">Distance: {call.estimatedDistance}</div>
                            )}
                            <div className="text-xs font-medium text-red-600">
                              Elapsed: {Math.floor((Date.now() - call.callTime.getTime()) / 60000)} min
                            </div>
                            {dispatchExtraFields.length > 0 && (
                              <details className="mt-2">
                                <summary className="cursor-pointer text-xs text-blue-700">More details</summary>
                                <div className="mt-1 max-h-40 overflow-auto rounded bg-gray-50 p-2 text-[10px]">
                                  {dispatchExtraFields.map(([key, value]) => (
                                    <div key={key} className="mb-1 text-gray-700">
                                      <span className="font-semibold">{formatFieldLabel(key)}:</span>{' '}
                                      <span className="whitespace-pre-wrap break-words">{formatFieldValue(value)}</span>
                                    </div>
                                  ))}
                                </div>
                              </details>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            {call.nearestAmbulances.slice(0, 2).map((ambulanceId) => {
                              const ambulance = ambulances.find(a => a.vehicleNumber === ambulanceId);
                              const isAvailable = String(ambulance?.status || '').toUpperCase() === 'AVAILABLE';
                              
                              return (
                                <div key={ambulanceId} className="flex items-center text-xs">
                                  <div className={`w-2 h-2 rounded-full mr-1 ${isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                  <span className={isAvailable ? 'text-green-700 font-medium' : 'text-gray-500'}>
                                    {ambulanceId}
                                  </span>
                                </div>
                              );
                            })}
                            {call.nearestAmbulances.length > 2 && (
                              <div className="text-xs text-gray-500">+{call.nearestAmbulances.length - 2} more</div>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            {(() => {
                              const normalized = String(call.status || '').toUpperCase();
                              return normalized === 'REQUESTED' || normalized === 'PENDING';
                            })() ? (
                              <>
                                <button
                                  onClick={() => handleQuickDispatch(call)}
                                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-xs whitespace-nowrap"
                                  title="Quick Dispatch"
                                >
                                  <Zap className="w-3 h-3 mr-1" />
                                  Quick
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedAmbulance(null);
                                    setDispatchForm({
                                      ...dispatchForm,
                                      patientName: call.patientName,
                                      condition: call.condition,
                                      pickupLocation: call.pickupLocation || call.location || '',
                                      pickupAddressLine1: call.pickupAddressLine1 || call.pickupLocation || call.location || '',
                                      pickupCity: call.pickupCity || '',
                                      callerName: call.callerName,
                                      callerPhone: call.callerPhone,
                                      priority: String(call.priority || 'HIGH').toUpperCase()
                                    });
                                    setShowDispatchModal(true);
                                  }}
                                  className="bg-gray-600 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors flex items-center text-xs whitespace-nowrap"
                                  title="Manual Dispatch"
                                >
                                  <Send className="w-3 h-3 mr-1" />
                                  Manual
                                </button>
                                <button 
                                  className="text-gray-400 hover:text-gray-600 transition-colors"
                                  title="More Options"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <span className="text-xs text-gray-500">Dispatched</span>
                            )}
                          </div>
                        </td>
                            </>
                          );
                        })()}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Live Tracking Tab */}
          {activeTab === 'tracking' && (
            <div className="space-y-6">
              {/* Map Container */}
              <div className="border border-gray-200 bg-white">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-base font-semibold">Live Ambulance Tracking</h3>
                      <div className="flex items-center text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                        Real-time Updates
                      </div>
                    </div>
                    <button
                      onClick={() => refreshDashboardData({ silent: true })}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                    >
                      <RefreshCw className="w-3 h-3 mr-1.5" />
                      Refresh Map
                    </button>
                  </div>
                </div>
                <div className="h-[460px]">
                  <AdminGoogleMap
                    className="h-full w-full"
                    ambulances={trackedAmbulances}
                  />
                </div>
              </div>

              {/* Live Tracking Table */}
              <div className="bg-white shadow overflow-x-auto">
                {trackedAmbulances.length === 0 ? (
                  <div className="p-12 text-center">
                    <Navigation className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Tracking</h3>
                    <p className="text-gray-500">No ambulances are currently being tracked</p>
                  </div>
                ) : (
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 uppercase text-xs font-semibold">
                      <tr>
                        <th className="px-4 py-3 text-left">Vehicle ID</th>
                        <th className="px-4 py-3 text-left">Driver</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Current Location</th>
                        <th className="px-4 py-3 text-left">Speed & Heading</th>
                        <th className="px-4 py-3 text-center">Signal</th>
                        <th className="px-4 py-3 text-left">Last Update</th>
                        <th className="px-4 py-3 text-left">Recent Route</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trackedAmbulances.map((ambulance) => {
                        const vehicleId = ambulance.vehicleId || ambulance.name || 'N/A';
                        const speed = Number.isFinite(ambulance.speed) ? ambulance.speed : 0;
                        const heading = Number.isFinite(ambulance.heading) ? ambulance.heading : 0;
                        const signalStrength = Number.isFinite(ambulance.signalStrength)
                          ? ambulance.signalStrength
                          : 0;
                        const locationLabel = ambulance.locationLabel || ambulance.locationAddress || 'Location unavailable';
                        const coords = ambulance.location
                          ? `${ambulance.location.lat.toFixed(4)}, ${ambulance.location.lng.toFixed(4)}`
                          : 'N/A';
                        const lastUpdateLabel = ambulance.lastUpdate
                          ? formatDateTime(ambulance.lastUpdate)
                          : 'N/A';

                        return (
                          <tr key={ambulance.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            {/* Vehicle ID */}
                            <td className="px-4 py-4">
                              <div className="font-semibold text-gray-900">{vehicleId}</div>
                              <div className="text-xs text-gray-500">{ambulance.name || ambulance.vehicleId || 'Ambulance'}</div>
                            </td>

                            {/* Driver */}
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                <UserCheck className="w-4 h-4 mr-1.5 text-gray-400" />
                                <span className="text-gray-700">{ambulance.driverName || 'Unassigned'}</span>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                {getStatusIcon(ambulance.status)}
                                <span className={`ml-1.5 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ambulance.status)}`}>
                                  {String(ambulance.status || 'UNKNOWN').replace(/_/g, ' ').toUpperCase()}
                                </span>
                              </div>
                            </td>

                            {/* Current Location */}
                            <td className="px-4 py-4">
                              <div className="flex items-start">
                                <MapPin className="w-4 h-4 mr-1.5 mt-0.5 text-gray-400 flex-shrink-0" />
                                <div>
                                  <div className="text-xs text-gray-700 font-medium">
                                    {coords}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {locationLabel}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Speed & Heading */}
                            <td className="px-4 py-4">
                              <div className="space-y-1">
                                <div className="flex items-center text-xs">
                                  <Zap className="w-3 h-3 mr-1 text-blue-500" />
                                  <span className="font-medium text-gray-900">{speed.toFixed(0)} km/h</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Compass className="w-3 h-3 mr-1 text-gray-400" />
                                  <span>{heading.toFixed(0)}°</span>
                                </div>
                              </div>
                            </td>

                            {/* Signal Strength */}
                            <td className="px-4 py-4">
                              <div className="flex flex-col items-center space-y-1">
                                <div className="flex items-center space-x-0.5">
                                  {[1,2,3,4].map(bar => (
                                    <div 
                                      key={bar}
                                      className={`w-1 h-3 rounded ${bar <= signalStrength ? 'bg-green-500' : 'bg-gray-300'}`}
                                    ></div>
                                  ))}
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Wifi className="w-3 h-3 mr-1" />
                                  {signalStrength > 0 ? 'CONNECTED' : 'UNKNOWN'}
                                </div>
                              </div>
                            </td>

                            {/* Last Update */}
                            <td className="px-4 py-4">
                              <div className="flex items-center text-xs text-gray-600">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{lastUpdateLabel}</span>
                              </div>
                            </td>

                            {/* Recent Route */}
                            <td className="px-4 py-4">
                              <div className="space-y-1 max-w-xs text-xs text-gray-600">
                                N/A
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-4">
                              <div className="flex items-center justify-center space-x-2">
                                <button 
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                  title="Call Driver"
                                >
                                  <PhoneCall className="w-4 h-4" />
                                </button>
                                <button 
                                  className="text-green-600 hover:text-green-800 transition-colors"
                                  title="Send Message"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </button>
                                <button 
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                  title="View Route"
                                >
                                  <Navigation2 className="w-4 h-4" />
                                </button>
                                <button 
                                  className="text-gray-400 hover:text-gray-600 transition-colors"
                                  title="More Options"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

      {/* Dispatch Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Dispatch Ambulance</h3>
                <button
                  onClick={() => setShowDispatchModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Priority and Incident Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level *</label>
                  <select
                    value={dispatchForm.priority}
                    onChange={(e) => setDispatchForm({...dispatchForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  >
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type *</label>
                  <select
                    value={dispatchForm.incidentType}
                    onChange={(e) => setDispatchForm({...dispatchForm, incidentType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  >
                    <option value="TRAFFIC_ACCIDENT">Traffic Accident</option>
                    <option value="CARDIAC_ARREST">Cardiac Arrest</option>
                    <option value="RESPIRATORY_DISTRESS">Respiratory Distress</option>
                    <option value="STROKE">Stroke</option>
                    <option value="TRAUMA">Trauma</option>
                    <option value="OBSTETRIC_EMERGENCY">Obstetric Emergency</option>
                    <option value="SCHEDULED_TRANSPORT">Scheduled Transport</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Ambulance</label>
                  <select
                    value={selectedAmbulance || ''}
                    onChange={(e) => setSelectedAmbulance(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  >
                    <option value="">Auto-Select Nearest</option>
                    {ambulances.filter((a) => String(a.status || '').toUpperCase() === 'AVAILABLE').map(ambulance => (
                      <option key={ambulance.vehicleNumber} value={ambulance.vehicleNumber}>
                        {ambulance.vehiclePlate} - {ambulance.driverName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Information */}
              <div className="pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Patient Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
                    <input
                      type="text"
                      value={dispatchForm.patientId}
                      onChange={(e) => setDispatchForm({...dispatchForm, patientId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="PAT-2024-XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
                    <input
                      type="text"
                      value={dispatchForm.patientName}
                      onChange={(e) => setDispatchForm({...dispatchForm, patientName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Age *</label>
                    <input
                      type="number"
                      value={dispatchForm.patientAge}
                      onChange={(e) => setDispatchForm({...dispatchForm, patientAge: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Age"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical Condition *</label>
                  <input
                    type="text"
                    value={dispatchForm.condition}
                    onChange={(e) => setDispatchForm({...dispatchForm, condition: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="Describe the medical condition"
                  />
                </div>
              </div>

              {/* Pickup Location */}
              <div className="pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Pickup Location
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupAddressLine1}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupAddressLine1: e.target.value, pickupLocation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Street address, building name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupAddressLine2}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupAddressLine2: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Apartment, floor, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupCity}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupCity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State/County *</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupState}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupState: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="State/County"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupPostalCode}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupPostalCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="00100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupCountry}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupCountry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Kenya"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupLatitude}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupLatitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="-1.2921"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                    <input
                      type="text"
                      value={dispatchForm.pickupLongitude}
                      onChange={(e) => setDispatchForm({...dispatchForm, pickupLongitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="36.8219"
                    />
                  </div>
                </div>
              </div>

              {/* Destination/Dropoff Location */}
              <div className="pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Navigation className="w-5 h-5 mr-2 text-blue-600" />
                  Destination Hospital
                </h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hospital ID</label>
                  <select
                    value={dispatchForm.hospitalId}
                    onChange={(e) => {
                      const hospitalId = e.target.value;
                      setDispatchForm({...dispatchForm, hospitalId, destination: e.target.options[e.target.selectedIndex].text});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                  >
                    <option value="">Select destination hospital</option>
                    {hospitals.map((hospital) => (
                      <option key={hospital.id} value={String(hospital.id)}>{hospital.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffAddressLine1}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffAddressLine1: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Hospital address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffAddressLine2}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffAddressLine2: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Department, wing, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffCity}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffCity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State/County</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffState}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffState: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="State/County"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffPostalCode}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffPostalCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="00100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffCountry}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffCountry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Kenya"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffLatitude}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffLatitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="-1.3018"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                    <input
                      type="text"
                      value={dispatchForm.dropoffLongitude}
                      onChange={(e) => setDispatchForm({...dispatchForm, dropoffLongitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="36.8073"
                    />
                  </div>
                </div>
              </div>

              {/* Caller Information */}
              <div className="pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  Caller Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Caller Name *</label>
                    <input
                      type="text"
                      value={dispatchForm.callerName}
                      onChange={(e) => setDispatchForm({...dispatchForm, callerName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="Who is calling?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Caller Phone *</label>
                    <input
                      type="tel"
                      value={dispatchForm.callerPhone}
                      onChange={(e) => setDispatchForm({...dispatchForm, callerPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="+254 7xx xxx xxx"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caller Notes</label>
                  <textarea
                    value={dispatchForm.callerNotes}
                    onChange={(e) => setDispatchForm({...dispatchForm, callerNotes: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="Additional information from the caller..."
                  />
                </div>
              </div>

              {/* Clinical/Operational Notes */}
              <div className="pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Clinical & Operational Notes
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions / Notes</label>
                  <textarea
                    value={dispatchForm.notes}
                    onChange={(e) => setDispatchForm({...dispatchForm, notes: e.target.value, specialInstructions: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    placeholder="Any special instructions for the medical team, clinical observations, operational notes..."
                  />
                </div>
              </div>

              {/* Estimates */}
              <div className="pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Estimates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Distance</label>
                    <input
                      type="text"
                      value={dispatchForm.estimatedDistance}
                      onChange={(e) => setDispatchForm({...dispatchForm, estimatedDistance: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="e.g., 12.5 km"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time</label>
                    <input
                      type="text"
                      value={dispatchForm.estimatedTime}
                      onChange={(e) => setDispatchForm({...dispatchForm, estimatedTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                      placeholder="e.g., 15 minutes"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDispatchModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isDispatching}
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (isDispatching) return;

                    const ambulanceToDispatch = selectedAmbulance
                      || ambulances.find((a) => String(a.status || '').toUpperCase() === 'AVAILABLE')?.vehicleNumber;
                    if (!ambulanceToDispatch) {
                      window.alert('No ambulance available for dispatch');
                      return;
                    }
                    if (!dispatchForm.patientName || !dispatchForm.pickupAddressLine1 || !dispatchForm.callerName) {
                      window.alert('Please fill in all required fields:\n- Patient Name\n- Pickup Address\n- Caller Name');
                      return;
                    }

                    const selectedUnit = ambulances.find(
                      (item) => item.vehiclePlate === ambulanceToDispatch || item.vehicleNumber === ambulanceToDispatch
                    );
                    if (!selectedUnit?.id) {
                      window.alert('Selected ambulance was not found in backend records.');
                      return;
                    }

                    setIsDispatching(true);
                    try {
                      await ambulanceService.createDispatch(buildDispatchPayload(dispatchForm, selectedUnit.id));
                      await ambulanceService.updateStatus(selectedUnit.id, 'DISPATCHED');
                      await refreshDashboardData({ silent: true });

                      setShowDispatchModal(false);
                      resetDispatchForm();
                      setSelectedAmbulance(null);
                      window.alert(`Dispatch created for ${dispatchForm.patientName} with unit ${selectedUnit.vehiclePlate}.`);
                    } catch (error) {
                      window.alert(error?.message || 'Failed to dispatch ambulance. Please try again.');
                    } finally {
                      setIsDispatching(false);
                    }
                  }}
                  disabled={isDispatching}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center ${isDispatching ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isDispatching ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Dispatching...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Dispatch Ambulance
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showViewModal && currentAmbulance && (
        <ViewAmbulanceModal
          ambulance={currentAmbulance}
          onClose={() => {
            setShowViewModal(false);
            setCurrentAmbulance(null);
          }}
          getStatusColor={getStatusColor}
          getTypeIcon={getTypeIcon}
        />
      )}

      {showEditModal && currentAmbulance && (
        <EditAmbulanceModal
          ambulance={currentAmbulance}
          onClose={() => {
            setShowEditModal(false);
            setCurrentAmbulance(null);
          }}
          onSave={handleEditSave}
        />
      )}

      {showMoreModal && currentAmbulance && (
        <MoreOptionsModal
          ambulance={currentAmbulance}
          onClose={() => {
            setShowMoreModal(false);
            setCurrentAmbulance(null);
          }}
          onAction={handleMoreAction}
        />
      )}

      {showAddModal && (
        <AddAmbulanceModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {showAddDriverModal && (
        <AddDriverModal
          onClose={() => setShowAddDriverModal(false)}
          onSave={handleAddDriverSave}
        />
      )}

      {showAddDispatchModal && (
        <AddDispatchModal
          ambulances={ambulances}
          onClose={() => setShowAddDispatchModal(false)}
          onSave={async (newDispatch) => {
            try {
              const selectedUnit = ambulances.find(
                (item) => item.vehiclePlate === newDispatch.selectedAmbulance || item.vehicleNumber === newDispatch.selectedAmbulance
              ) || ambulances.find((item) => String(item.status || '').toUpperCase() === 'AVAILABLE');

              await ambulanceService.createDispatch(buildDispatchPayload(newDispatch, selectedUnit?.id || null));
              if (selectedUnit?.id) {
                await ambulanceService.updateStatus(selectedUnit.id, 'DISPATCHED');
              }

              await refreshDashboardData({ silent: true });
              setShowAddDispatchModal(false);
              window.alert(`Dispatch created for ${newDispatch.patientName || 'patient'} successfully.`);
            } catch (error) {
              window.alert(error?.message || 'Failed to create dispatch.');
            }
          }}
        />
      )}

      {/* Driver Modals */}
      {showViewDriverModal && currentDriver && (
        <ViewDriverModal
          driver={currentDriver}
          onClose={() => {
            setShowViewDriverModal(false);
            setCurrentDriver(null);
          }}
          getStatusColor={getStatusColor}
        />
      )}

      {showEditDriverModal && currentDriver && (
        <EditDriverModal
          driver={currentDriver}
          onClose={() => {
            setShowEditDriverModal(false);
            setCurrentDriver(null);
          }}
          onSave={handleEditDriverSave}
        />
      )}

      {showMoreDriverModal && currentDriver && (
        <MoreOptionsDriverModal
          driver={currentDriver}
          onClose={() => {
            setShowMoreDriverModal(false);
            setCurrentDriver(null);
          }}
          onAction={handleMoreDriverAction}
        />
      )}

      {showAddTrackingModal && (
        <AddTrackingUnitModal
          ambulances={ambulances}
          onClose={() => setShowAddTrackingModal(false)}
          onSave={handleAddTrackingSave}
        />
      )}
    </div>
  );
};

export default AmbulanceManagement;