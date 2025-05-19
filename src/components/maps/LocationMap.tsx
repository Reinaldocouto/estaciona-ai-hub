
import React, { useState, useMemo } from 'react';
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { Skeleton } from '@/components/ui/skeleton';

interface LocationMapProps {
  lat: number;
  lng: number;
  title: string;
  address: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ lat, lng, title, address }) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  // Memoize the center to prevent unnecessary re-renders
  const center = useMemo(() => ({ lat, lng }), [lat, lng]);
  
  // Map options with minimal UI
  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
  };

  const handleInfoWindowClose = () => {
    setShowInfoWindow(false);
  };

  // If maps API is still loading, show skeleton
  if (!isLoaded) {
    return <Skeleton className="w-full h-[260px] md:h-[320px] rounded-lg" />;
  }

  // If there was an error loading the map
  if (loadError) {
    return (
      <div className="w-full h-[260px] md:h-[320px] rounded-lg bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Erro ao carregar o mapa</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[260px] md:h-[320px] rounded-lg shadow-md overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={16}
        options={mapOptions}
      >
        <MarkerF
          position={center}
          onClick={handleMarkerClick}
          title={title}
          icon={{
            url: '/pin.svg',
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 40),
          }}
        />
        
        {showInfoWindow && (
          <InfoWindowF
            position={center}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="p-1">
              <h4 className="font-medium">{title}</h4>
              <p className="text-sm text-gray-600">{address}</p>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
};

export default LocationMap;
