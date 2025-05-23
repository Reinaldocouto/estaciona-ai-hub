
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, GoogleMapProps } from '@react-google-maps/api';
import isEqual from 'react-fast-compare';
import MapLoading from './MapLoading';
import SpaceMarker from './SpaceMarker';
import MapInfoWindow from './MapInfoWindow';
import ClusterMap from './ClusterMap';
import { MapProps } from './types';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';

const DEFAULT_CENTER: google.maps.LatLngLiteral = {
  lat: -23.5505,
  lng: -46.6333, // São Paulo
};

const DEFAULT_ZOOM = 13;

const MAP_CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

const MAP_OPTIONS: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
};

const GoogleMapComponent: React.FC<MapProps> = ({
  spaces = [],
  center,
  zoom = DEFAULT_ZOOM,
  className = '',
  onSelect,
  showCluster = false,
  singleMarker = false,
}) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(
    center ?? DEFAULT_CENTER
  );
  const [mapZoom, setMapZoom] = useState<number>(zoom);
  const [selectedSpace, setSelectedSpace] = useState<typeof spaces[0] | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  // Ref to track if center was set from props
  const centerSetFromProps = useRef<boolean>(false);

  // Geolocation init
  useEffect(() => {
    if (!center && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          setMapCenter({ lat: coords.latitude, lng: coords.longitude }),
        (error) => console.warn('Geolocation error:', error)
      );
    }
  }, [center]);

  // Update center when props change - Fixed to prevent infinite loop
  useEffect(() => {
    if (center && (center.lat !== mapCenter.lat || center.lng !== mapCenter.lng)) {
      setMapCenter(center);
      centerSetFromProps.current = true;
      if (mapRef.current) mapRef.current.panTo(center);
    }
    setMapZoom(zoom);
  }, [center, zoom]); // Don't include mapCenter in dependencies

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleMapUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleMarkerClick = useCallback((space: typeof spaces[0]) => {
    setSelectedSpace(space);
  }, []);

  const handleInfoClose = useCallback(() => setSelectedSpace(null), []);

  const handleReserve = useCallback(
    (id: string) => {
      onSelect?.(id);
      setSelectedSpace(null);
    },
    [onSelect]
  );

  const handleZoomChanged = () => {
    const z = mapRef.current?.getZoom();
    if (z) setMapZoom(z);
  };

  // Fixed to prevent infinite loop
  const handleCenterChanged = () => {
    if (!mapRef.current) return;
    
    // Only update center state if the change wasn't triggered by props
    if (!centerSetFromProps.current) {
      const c = mapRef.current.getCenter();
      if (!c) return;
      
      const newCenter = { lat: c.lat(), lng: c.lng() };
      
      // Avoid setState if nothing changed
      if (newCenter.lat !== mapCenter.lat || newCenter.lng !== mapCenter.lng) {
        setMapCenter(newCenter);
      }
    }
    // Reset the flag after handling the center change
    centerSetFromProps.current = false;
  };

  if (!isLoaded) {
    return <MapLoading loadError={!!loadError} className={className} />;
  }

  return (
    <div className={`relative rounded-xl overflow-hidden w-full h-full min-h-[400px] ${className}`}>
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={mapCenter}
        zoom={mapZoom}
        onLoad={handleMapLoad}
        onUnmount={handleMapUnmount}
        options={MAP_OPTIONS}
        onZoomChanged={handleZoomChanged}
        onCenterChanged={handleCenterChanged}
      >
        {showCluster && mapZoom < 12 ? (
          <ClusterMap 
            spaces={spaces} 
            onClick={handleMarkerClick}
          />
        ) : (
          spaces.map((space) => (
            <SpaceMarker
              key={space.id}
              space={space}
              onClick={() => handleMarkerClick(space)}
            />
          ))
        )}

        {selectedSpace && (
          <MapInfoWindow
            space={selectedSpace}
            onClose={handleInfoClose}
            onReserve={handleReserve}
          />
        )}
      </GoogleMap>

      {/* Debug info (hidden on mobile) */}
      <div className="hidden md:block absolute bottom-1 right-1 bg-white/80 px-2 py-1 text-xs text-gray-500 rounded-md">
        Lat: {mapCenter.lat.toFixed(6)}, Lng: {mapCenter.lng.toFixed(6)}, Zoom: {mapZoom}
      </div>
    </div>
  );
};

export default React.memo(
  GoogleMapComponent,
  (prev, next) =>
    prev.className === next.className &&
    prev.zoom === next.zoom &&
    prev.singleMarker === next.singleMarker &&
    prev.showCluster === next.showCluster &&
    isEqual(prev.center, next.center) &&
    isEqual(prev.spaces, next.spaces) &&
    prev.onSelect === next.onSelect
);
