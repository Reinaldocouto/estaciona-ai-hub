/// <reference types="google.maps" />

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  InfoWindowF,
  MarkerClustererF,
} from '@react-google-maps/api';
import isEqual from 'react-fast-compare';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Types -------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Constantes ---------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Componente ---------------------------------------------------------------- */

const Map: React.FC<MapProps> = ({
  spaces = [],
  center,
  zoom = DEFAULT_ZOOM,
  className = '',
  onSelect,
}) => {
  /* ---------------------------- Estado local ----------------------------- */
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(
    center ?? DEFAULT_CENTER,
  );
  const [mapZoom, setMapZoom] = useState<number>(zoom);
  const [selectedSpace, setSelectedSpace] = useState<SpaceProps | null>(null);
  const [loadError, setLoadError] = useState(false);

  const mapRef = useRef<google.maps.Map | null>(null);

  /* ------------------------- Carrega Google Maps ------------------------- */
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    libraries: ['places'],
    googleMapsApiKey: import.meta.env.VITE_GMAPS_KEY ?? '',
  });

  /* ----------------------- Geolocalização inicial ------------------------ */
  useEffect(() => {
    if (!center && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          setMapCenter({ lat: coords.latitude, lng: coords.longitude }),
        (error) => console.warn('Geolocation error:', error),
      );
    }
  }, [center]);

  /* ----------------------- Timeout p/ falha de API ----------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) setLoadError(true);
    }, 5_000);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  /* --------------- Atualiza center/zoom quando props mudam --------------- */
  useEffect(() => {
    if (center) {
      setMapCenter(center);
      if (mapRef.current) mapRef.current.panTo(center);
    }
    setMapZoom(zoom);
  }, [center, zoom]);

  /* --------------------------- Callbacks Mapa ---------------------------- */
  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleMapUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleMarkerClick = useCallback((space: SpaceProps) => {
    setSelectedSpace(space);
  }, []);

  const handleInfoClose = useCallback(() => setSelectedSpace(null), []);

  const handleReserve = useCallback(
    (id: string) => {
      onSelect?.(id);
      setSelectedSpace(null);
    },
    [onSelect],
  );

  const handleZoomChanged = () => {
    const z = mapRef.current?.getZoom();
    if (z) setMapZoom(z);
  };

  const handleCenterChanged = () => {
    const c = mapRef.current?.getCenter();
    if (c) setMapCenter({ lat: c.lat(), lng: c.lng() });
  };

  /* --------------------------- Memo Markers ------------------------------ */
  const markers = useMemo(() => {
    if (!isLoaded) return null;

    return spaces
      .filter((s) => s.lat !== undefined && s.lng !== undefined)
      .map((s) => (
        <MarkerF
          key={s.id}
          position={{ lat: s.lat as number, lng: s.lng as number }}
          onClick={() => handleMarkerClick(s)}
          icon={{
            url: '/pin.svg',
            scaledSize: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(16, 32),
          }}
          animation={google.maps.Animation.DROP}
          aria-label={s.title}
          title={`${s.title} – R$${s.price}/h`}
        />
      ));
  }, [isLoaded, spaces, handleMarkerClick]);

  /* --------------------------- Skeleton / Erro --------------------------- */
  if (!isLoaded) {
    return (
      <div
        className={`rounded-xl overflow-hidden w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-gray-100 ${className}`}
      >
        {loadError ? (
          <div className="text-center p-6">
            <MapPin className="h-12 w-12 text-gray-400 mb-2 mx-auto" />
            <h3 className="text-lg font-medium mb-2">Erro ao carregar mapa</h3>
            <p className="text-gray-500">Tente novamente mais tarde.</p>
          </div>
        ) : (
          <>
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-2" />
            <p className="text-gray-500 mb-4">Carregando mapa…</p>
            <Skeleton className="w-full h-[160px] max-w-md" />
          </>
        )}
      </div>
    );
  }

  /* ----------------------------- Render Mapa ----------------------------- */
  return (
    <div
      className={`relative rounded-xl overflow-hidden w-full h-full min-h-[400px] ${className}`}
    >
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
        {mapZoom < 12 ? (
          <MarkerClustererF>
             {(clusterer) => (
    <>
      {spaces
        .filter((s) => s.lat && s.lng)
        .map((s) => (
          <MarkerF
            key={s.id}
            position={{ lat: s.lat!, lng: s.lng! }}
            onClick={() => handleMarkerClick(s)}
            clusterer={clusterer}
            icon={{
              url: '/pin.svg',
              scaledSize: new google.maps.Size(32, 32),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(16, 32),
            }}
            aria-label={s.title}
            title={`${s.title} – R$${s.price}/h`}
          />
        ))}
    </>
  )}
          </MarkerClustererF>
        ) : (
          markers
        )}

        {selectedSpace && selectedSpace.lat && selectedSpace.lng && (
          <InfoWindowF
            position={{ lat: selectedSpace.lat, lng: selectedSpace.lng }}
            onCloseClick={handleInfoClose}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-gray-900">{selectedSpace.title}</h3>
              <p className="text-primary-700 font-medium my-1">
                R${selectedSpace.price}/hora
              </p>
              {selectedSpace.type && (
                <p className="text-sm text-gray-600 mb-2">
                  Tipo: {selectedSpace.type}
                </p>
              )}
              <Button
                size="sm"
                className="w-full mt-2"
                onClick={() => handleReserve(selectedSpace.id)}
              >
                Reservar
              </Button>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>

      {/* Debug info (escondido no mobile) */}
      <div className="hidden md:block absolute bottom-1 right-1 bg-white/80 px-2 py-1 text-xs text-gray-500 rounded-md">
        Lat: {mapCenter.lat.toFixed(6)}, Lng: {mapCenter.lng.toFixed(6)}, Zoom:{' '}
        {mapZoom}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Memoization ----------------------------------------------------------------*/

export default React.memo(
  Map,
  (prev, next) =>
    prev.className === next.className &&
    prev.zoom === next.zoom &&
    isEqual(prev.center, next.center) &&
    isEqual(prev.spaces, next.spaces) &&
    prev.onSelect === next.onSelect,
);
