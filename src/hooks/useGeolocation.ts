import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  latitude: number | null;
  longitude: number | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    latitude: null,
    longitude: null,
  });
  const { toast } = useToast();

  const getCurrentLocation = useCallback((): Promise<{lat: number, lng: number} | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        const error = 'Geolocalização não suportada pelo navegador';
        setState(prev => ({ ...prev, error, loading: false }));
        toast({
          title: "Erro de localização",
          description: error,
          variant: "destructive",
        });
        resolve(null);
        return;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setState({
            loading: false,
            error: null,
            latitude,
            longitude,
          });
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          let errorMessage = 'Erro ao obter localização';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permissão negada para acessar localização';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Localização indisponível';
              break;
            case error.TIMEOUT:
              errorMessage = 'Timeout ao obter localização';
              break;
          }

          setState({
            loading: false,
            error: errorMessage,
            latitude: null,
            longitude: null,
          });

          toast({
            title: "Erro de localização",
            description: errorMessage,
            variant: "destructive",
          });

          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }, [toast]);

  return {
    ...state,
    getCurrentLocation,
  };
};