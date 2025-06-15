
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { findLocation } from '@/utils/mockLocations';

export const useLocationSearch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      toast({
        title: "Digite um endereço",
        description: "Por favor, informe um endereço ou local para buscar",
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
      
      const location = findLocation(searchTerm);
      
      if (location) {
        console.log(`Coordenadas encontradas: lat=${location.lat}, lng=${location.lng}`);
        
        // Navigate directly without showing success toast here
        // The SpacesContainer will show the results toast
        navigate(`/spaces?lat=${location.lat}&lng=${location.lng}&q=${encodeURIComponent(searchTerm)}`);
        
        return true;
      } else {
        console.log('Nenhuma localização encontrada para:', searchTerm);
        toast({
          title: "Endereço não encontrado",
          description: "Tente com: Paulista, Pinheiros, Centro, Jardins, Morumbi ou Ibirapuera",
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
