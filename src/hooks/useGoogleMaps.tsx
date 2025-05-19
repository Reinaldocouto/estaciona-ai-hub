
import { useState, useEffect, useCallback } from 'react';
import { useJsApiLoader, LoadScriptProps } from '@react-google-maps/api';

interface UseGoogleMapsOptions {
  apiKey?: string;
  libraries?: LoadScriptProps['libraries'];
}

export function useGoogleMaps(options: UseGoogleMapsOptions = {}) {
  const apiKey = options.apiKey || import.meta.env.VITE_GMAPS_KEY || '';
  const libraries = options.libraries || ['places', 'geometry'];
  const [loadError, setLoadError] = useState<boolean>(false);

  const { isLoaded, loadError: apiLoadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries,
  });

  // Set an error timeout in case the API doesn't load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) setLoadError(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Set error if API load failed
  useEffect(() => {
    if (apiLoadError) {
      console.error('Google Maps API failed to load:', apiLoadError);
      setLoadError(true);
    }
  }, [apiLoadError]);

  const getGeocodeForAddress = useCallback(
    async (address: string): Promise<{lat: number; lng: number} | null> => {
      if (!isLoaded || !window.google) return null;

      try {
        const geocoder = new google.maps.Geocoder();
        const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status !== google.maps.GeocoderStatus.OK) {
              return reject(status);
            }
            resolve(results);
          });
        });

        if (result && result[0]?.geometry?.location) {
          const location = result[0].geometry.location;
          return { lat: location.lat(), lng: location.lng() };
        }
        return null;
      } catch (error) {
        console.error('Geocoding error:', error);
        return null;
      }
    },
    [isLoaded]
  );

  return { isLoaded, loadError, getGeocodeForAddress };
}
