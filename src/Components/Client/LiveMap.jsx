import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createPinIcon = (label, color) =>
  L.divIcon({
    className: 'leaflet-custom-pin',
    html: `<div style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:${color};color:#fff;font-weight:700;font-size:12px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.25)">${label}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -12],
  });

const patientIcon = createPinIcon('P', '#1d4ed8');
const ambulanceIcon = createPinIcon('A', '#dc2626');
const chwIcon = createPinIcon('C', '#16a34a');

const toPoint = (location = {}) => {
  const lat = Number(location?.lat ?? location?.latitude);
  const lng = Number(location?.lng ?? location?.longitude ?? location?.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
};

const formatPoint = (point) => `${point.lat.toFixed(6)}, ${point.lng.toFixed(6)}`;

const FitToMarkers = ({ points = [] }) => {
  const map = useMap();

  useEffect(() => {
    if (!Array.isArray(points) || points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 14, { animate: true });
      return;
    }

    const bounds = L.latLngBounds(points.map((point) => [point.lat, point.lng]));
    map.fitBounds(bounds, { padding: [35, 35], maxZoom: 15, animate: true });
  }, [map, points]);

  return null;
};

const LiveMap = ({
  userLocation,
  ambulances = [],
  chws = [],
  view = 'all',
  className = '',
  primaryLabel = 'Patient Location',
  primaryIcon = patientIcon,
  showPrimaryMarker = true,
  fallbackCenter = null,
}) => {
  const patientPoint = toPoint(userLocation);
  const fallbackPoint = toPoint(fallbackCenter);

  const validAmbulances = ambulances
    .map((ambulance) => ({
      ...ambulance,
      point: toPoint(ambulance?.location),
    }))
    .filter((ambulance) => Boolean(ambulance.point));

  const validChws = chws
    .map((chw) => ({
      ...chw,
      point: toPoint(chw?.location),
    }))
    .filter((chw) => Boolean(chw.point));

  const showAmbulances = view === 'all' || view === 'ambulance' || !view;
  const showChws = view === 'all' || view === 'chw' || !view;

  const mapPoints = [];
  if (showPrimaryMarker && patientPoint) mapPoints.push(patientPoint);
  if (showAmbulances) mapPoints.push(...validAmbulances.map((row) => row.point));
  if (showChws) mapPoints.push(...validChws.map((row) => row.point));

  const initialCenter = patientPoint || fallbackPoint || mapPoints[0] || null;

  if (!initialCenter) {
    return (
      <div className={`flex items-center justify-center h-full text-gray-500 ${className}`}>
        Loading map...
      </div>
    );
  }

  return (
    <div className={`live-map-shell relative z-0 ${className}`}>
      <MapContainer
        center={[initialCenter.lat, initialCenter.lng]}
        zoom={13}
        className="z-0"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FitToMarkers points={mapPoints} />

        {showPrimaryMarker && patientPoint && (
          <Marker position={[patientPoint.lat, patientPoint.lng]} icon={primaryIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{primaryLabel}</p>
                <p>{formatPoint(patientPoint)}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {showAmbulances &&
          validAmbulances.map((ambulance) => (
            <Marker
              key={`ambulance-${ambulance.id}`}
              position={[ambulance.point.lat, ambulance.point.lng]}
              icon={ambulanceIcon}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{ambulance.name || 'Ambulance'}</p>
                  <p>Status: {ambulance.status || 'N/A'}</p>
                  <p>ETA: {ambulance.eta || 'N/A'}</p>
                  <p>{formatPoint(ambulance.point)}</p>
                </div>
              </Popup>
            </Marker>
          ))}

        {showChws &&
          validChws.map((chw) => (
            <Marker
              key={`chw-${chw.id}`}
              position={[chw.point.lat, chw.point.lng]}
              icon={chwIcon}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{chw.name || 'CHW'}</p>
                  <p>{chw.specialization || 'Community Health Worker'}</p>
                  <p>{formatPoint(chw.point)}</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default LiveMap;