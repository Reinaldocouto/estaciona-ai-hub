import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  useJsApiLoader, 
  GoogleMap, 
  MarkerF, 
  InfoWindowF, 
  MarkerClustererF 
} from '@react-google-maps/api';
import isEqual from 'react-fast-compare';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';

export interface SpaceProps {
  id: string;
  title: string;
  address?: string;
  lat?: number;
  lng?: number;
  price: number;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  distance?: string;
  features?: string[];
  available?: boolean;
  type?: 'Pequeno' | 'Médio' | 'SUV';
}

interface MapProps {
  spaces: SpaceProps[];
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  onSelect?: (id: string) => void;
}

// Default settings for the map
const DEFAULT_CENTER = { lat: -23.5505, lng: -46.6333 }; // São Paulo
const DEFAULT_ZOOM = 13;
const MAP_CONTAINER_STYLE = { width: '100%', height: '100%' };

// Default map options
const defaultOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
};

const Map: React.FC<MapProps> = ({ 
  spaces = [], 
  center,
  zoom = DEFAULT_ZOOM,
  className = '',
  onSelect
}) => {
  const [mapCenter, setMapCenter] = useState(center || DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(zoom);
  const [selectedSpace, setSelectedSpace] = useState<SpaceProps | null>(null);
  const [loadError, setLoadError] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  
  // Load the Google Maps JS API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GMAPS_KEY || '',
  });

  // Try to get user's location if no center was provided
  useEffect(() => {
    if (!center && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Error getting geolocation:", error);
          // Keep the default center if geolocation fails
        }
      );
    }
  }, [center]);

  // Handle API load timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setLoadError(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Update map center and zoom when props change
  useEffect(() => {
    if (center) {
      setMapCenter(center);
      
      // Smoothly pan to new center if map is already loaded
      if (mapRef.current) {
        mapRef.current.panTo(center);
      }
    }
    
    if (zoom !== undefined) {
      setMapZoom(zoom);
    }
  }, [center, zoom]);

  // Store map instance on load
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Clear reference on unmount
  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Handle marker click
  const handleMarkerClick = useCallback((space: SpaceProps) => {
    setSelectedSpace(space);
  }, []);

  // Handle info window close
  const handleInfoWindowClose = useCallback(() => {
    setSelectedSpace(null);
  }, []);

  // Handle reservation button click
  const handleReserveClick = useCallback((id: string) => {
    if (onSelect) {
      onSelect(id);
      setSelectedSpace(null);
    }
  }, [onSelect]);

  // Handle map zoom change
  const handleZoomChanged = () => {
    if (mapRef.current) {
      setMapZoom(mapRef.current.getZoom() || DEFAULT_ZOOM);
    }
  };

  // Handle map center change
  const handleCenterChanged = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      if (newCenter) {
        setMapCenter({
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        });
      }
    }
  };

  // Memoize markers to prevent unnecessary re-renders
  const markers = useMemo(() => {
    return spaces
      .filter(space => space.lat !== undefined && space.lng !== undefined)
      .map(space => (
        <MarkerF
          key={space.id}
          position={{ lat: space.lat as number, lng: space.lng as number }}
          onClick={() => handleMarkerClick(space)}
          icon={{
            url: '/pin.svg',
            scaledSize: new window.google.maps.Size(32, 32),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(16, 32),
          }}
          animation={window.google.maps.Animation.DROP}
          aria-label={space.title}
          title={`${space.title} - R$${space.price}/h`}
        />
      ));
  }, [spaces, handleMarkerClick]);

  // If API is still loading, show skeleton
  if (!isLoaded) {
    return (
      <div className={`rounded-xl overflow-hidden w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-gray-100 ${className}`}>
        {loadError ? (
          <div className="text-center p-6">
            <MapPin className="h-12 w-12 text-gray-400 mb-2 mx-auto" />
            <h3 className="text-lg font-medium mb-2">Erro ao carregar mapa</h3>
            <p className="text-gray-500">Tente novamente mais tarde.</p>
          </div>
        ) : (
          <>
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-2" />
            <p className="text-gray-500 mb-4">Carregando mapa...</p>
            <Skeleton className="w-full h-[160px] max-w-md" />
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden w-full h-full min-h-[400px] ${className}`}>
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={mapCenter}
        zoom={mapZoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
        onZoomChanged={handleZoomChanged}
        onCenterChanged={handleCenterChanged}
      >
        {mapZoom < 12 ? (
          <MarkerClustererF>
            {(clusterer) => (
              <div>
                {spaces
                  .filter(space => space.lat !== undefined && space.lng !== undefined)
                  .map(space => (
                    <MarkerF
                      key={space.id}
                      position={{ lat: space.lat as number, lng: space.lng as number }}
                      onClick={() => handleMarkerClick(space)}
                      clusterer={clusterer}
                      icon={{
                        url: '/pin.svg',
                        scaledSize: new window.google.maps.Size(32, 32),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(16, 32),
                      }}
                      aria-label={space.title}
                      title={`${space.title} - R$${space.price}/h`}
                    />
                  ))}
              </div>
            )}
          </MarkerClustererF>
        ) : (
          markers
        )}

        {selectedSpace && selectedSpace.lat !== undefined && selectedSpace.lng !== undefined && (
          <InfoWindowF
            position={{ lat: selectedSpace.lat, lng: selectedSpace.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-gray-900">{selectedSpace.title}</h3>
              <p className="text-primary-700 font-medium my-1">R${selectedSpace.price}/hora</p>
              {selectedSpace.type && (
                <p className="text-sm text-gray-600 mb-2">Tipo: {selectedSpace.type}</p>
              )}
              <Button 
                size="sm" 
                className="w-full mt-2" 
                onClick={() => handleReserveClick(selectedSpace.id)}
              >
                Reservar
              </Button>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>

      {/* Debug info - hidden on mobile */}
      <div className="hidden md:block absolute bottom-1 right-1 bg-white/80 px-2 py-1 text-xs text-gray-500 rounded-md">
        Lat: {mapCenter.lat.toFixed(6)}, Lng: {mapCenter.lng.toFixed(6)}, Zoom: {mapZoom}
      </div>
    </div>
  );
};

// Use React.memo with custom comparison to prevent unnecessary re-renders
export default React.memo(Map, (prevProps, nextProps) => {
  // Only re-render if these props change
  return (
    prevProps.className === nextProps.className &&
    prevProps.zoom === nextProps.zoom &&
    isEqual(prevProps.center, nextProps.center) &&
    isEqual(prevProps.spaces, nextProps.spaces) &&
    prevProps.onSelect === nextProps.onSelect
  );
});
