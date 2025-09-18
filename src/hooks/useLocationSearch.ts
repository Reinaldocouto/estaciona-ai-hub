
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { findLocation } from '@/utils/mockLocations';

export const useLocationSearch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getGeocodeForAddress, isLoaded } = useGoogleMaps();
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      toast({
        title: "Digite um local",
        description: "Ex: Shopping Tatuapé, Paulista, Itaquera...",
        variant: "destructive",
      });
      return false;
    }

    if (isSearching) {
      console.log('Busca já em andamento, ignorando...');
      return false;
    }
    
    console.log('Iniciando busca para:', searchTerm);
    setIsSearching(true);
    
    try {
      // Small delay to prevent multiple rapid calls
      await new Promise(resolve => setTimeout(resolve, 100));
      
      let location = null;
      let searchMethod = '';
      
      // First try Google Maps geocoding if available
      if (isLoaded) {
        console.log('Tentando busca via Google Maps Geocoding...');
        location = await getGeocodeForAddress(searchTerm);
        
        if (location) {
          console.log(`Coordenadas encontradas via Geocoding: lat=${location.lat}, lng=${location.lng}`);
          searchMethod = 'geocoding';
        }
      }
      
      // Fallback to mock locations if geocoding didn't work
      if (!location) {
        console.log('Tentando busca via localizações de referência...');
        location = findLocation(searchTerm);
        
        if (location) {
          console.log(`Coordenadas encontradas via referência: lat=${location.lat}, lng=${location.lng}`);
          searchMethod = 'reference';
        }
      }
      
      if (location) {
        // Navigate directly without showing success toast here
        // The SpacesContainer will show the results toast
        navigate(`/spaces?lat=${location.lat}&lng=${location.lng}&q=${encodeURIComponent(searchTerm)}`);
        
        return true;
      } else {
        console.log('Nenhuma localização encontrada para:', searchTerm);
        toast({
          title: "Local não encontrado",
          description: "Tente: Shopping Tatuapé, Paulista, Itaquera ou um endereço completo",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      toast({
        title: "Erro na busca",
        description: "Ocorreu um erro ao processar sua busca. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSearching(false);
    }
  };

  return {
    isSearching,
    performSearch,
  };
};
