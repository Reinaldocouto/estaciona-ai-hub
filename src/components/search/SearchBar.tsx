
import React, { useState, useRef, useCallback } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, X } from 'lucide-react';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { useToast } from '@/hooks/use-toast';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const { isLoaded, loadError, getGeocodeForAddress } = useGoogleMaps({ libraries: ['places'] });
  
  // Initialize search term from URL query parameter if available
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    console.log('Autocomplete carregado com sucesso');
    setAutocomplete(autocompleteInstance);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast({
        title: "Digite um endereço",
        description: "Por favor, informe um endereço ou local para buscar",
        variant: "destructive",
      });
      return;
    }

    if (isSearching) {
      console.log('Busca já em andamento, ignorando...');
      return;
    }
    
    console.log('Iniciando busca para:', searchTerm);
    setIsSearching(true);
    
    try {
      // Primeiro tenta usar o place do autocomplete se disponível
      if (autocomplete && isLoaded) {
        const place = autocomplete.getPlace();
        if (place && place.geometry && place.geometry.location) {
          console.log('Usando place do autocomplete:', place);
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          
          toast({
            title: "Buscando vagas",
            description: "Procurando vagas próximas ao endereço informado",
          });
          
          navigate(`/spaces?lat=${lat}&lng=${lng}&q=${encodeURIComponent(searchTerm)}`);
          setIsSearching(false);
          return;
        }
      }
      
      // Se não tem place ou autocomplete, usa geocoding direto
      await handleDirectSearch();
    } catch (error) {
      console.error('Erro na busca:', error);
      toast({
        title: "Erro na busca",
        description: "Ocorreu um erro ao processar sua busca. Tente novamente.",
        variant: "destructive",
      });
      setIsSearching(false);
    }
  };

  // Função para busca direta usando geocoding
  const handleDirectSearch = async () => {
    console.log('Iniciando busca direta para:', searchTerm);
    
    if (!isLoaded) {
      console.log('Google Maps ainda não carregou');
      toast({
        title: "Carregando",
        description: "Aguarde o Google Maps carregar...",
        variant: "destructive",
      });
      setIsSearching(false);
      return;
    }

    if (loadError) {
      console.log('Erro no carregamento do Google Maps');
      toast({
        title: "Erro de carregamento",
        description: "Erro ao carregar o Google Maps. Verifique sua conexão.",
        variant: "destructive",
      });
      setIsSearching(false);
      return;
    }
    
    toast({
      title: "Buscando localização",
      description: "Procurando pelo endereço informado...",
    });
    
    try {
      console.log('Chamando getGeocodeForAddress com:', searchTerm);
      const location = await getGeocodeForAddress(searchTerm);
      console.log('Resultado do geocoding:', location);
      
      if (location && location.lat && location.lng) {
        console.log(`Coordenadas encontradas: lat=${location.lat}, lng=${location.lng}`);
        
        toast({
          title: "Endereço encontrado!",
          description: "Redirecionando para busca de vagas...",
        });
        
        navigate(`/spaces?lat=${location.lat}&lng=${location.lng}&q=${encodeURIComponent(searchTerm)}`);
      } else {
        console.log('Nenhuma coordenada retornada pelo geocoding');
        toast({
          title: "Endereço não encontrado",
          description: "Tente ser mais específico com o endereço (inclua cidade, bairro, etc.)",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro detalhado no geocoding:', error);
      toast({
        title: "Erro na busca",
        description: "Não foi possível processar o endereço. Tente novamente com um endereço mais específico.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const onPlaceChanged = async () => {
    console.log('onPlaceChanged chamado');
    
    if (!autocomplete) {
      console.log('Autocomplete não disponível, usando busca direta');
      await handleDirectSearch();
      return;
    }

    const place = autocomplete.getPlace();
    console.log('Place selecionado:', place);
    
    if (!place || !place.geometry || !place.geometry.location) {
      console.log('Place sem geometria, usando busca direta');
      await handleDirectSearch();
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    console.log(`Place com coordenadas: lat=${lat}, lng=${lng}`);

    toast({
      title: "Local selecionado",
      description: "Buscando vagas próximas...",
    });
    
    navigate(`/spaces?lat=${lat}&lng=${lng}&q=${encodeURIComponent(searchTerm)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Input alterado para:', value);
    setSearchTerm(value);
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-md w-full mx-auto">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {isLoaded ? (
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            options={{
              componentRestrictions: { country: 'br' },
              fields: ['geometry.location', 'formatted_address', 'name'],
              strictBounds: false,
            }}
          >
            <Input
              type="text"
              placeholder="Digite um endereço ou local"
              className="pl-10 pr-24 py-6 h-14 rounded-lg"
              value={searchTerm}
              onChange={handleInputChange}
              ref={inputRef}
              aria-label="Buscar por endereço"
              disabled={isSearching}
            />
          </Autocomplete>
        ) : (
          <Input
            type="text"
            placeholder={loadError ? "Erro ao carregar Google Maps" : "Carregando Google Maps..."}
            className="pl-10 pr-24 py-6 h-14 rounded-lg"
            disabled
          />
        )}
        
        {searchTerm && !isSearching && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Limpar busca"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        <Button 
          type="submit" 
          disabled={isSearching || !isLoaded}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-md bg-primary hover:bg-primary-dark px-6 h-12 disabled:opacity-50"
          aria-label="Buscar"
        >
          <Search className="w-4 h-4 mr-2" /> 
          {isSearching ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
