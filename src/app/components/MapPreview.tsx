import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPreviewProps {
  location: { lat: number; lng: number } | null;
  className?: string;
}

export function MapPreview({ location, className = '' }: MapPreviewProps) {
  if (!location) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center h-48 ${className}`}>
        <p className="text-muted-foreground">Location not available</p>
      </div>
    );
  }

  return (
    <div className={`h-48 rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            Your location<br />
            Lat: {location.lat.toFixed(6)}<br />
            Lng: {location.lng.toFixed(6)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}