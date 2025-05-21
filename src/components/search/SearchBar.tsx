
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
  const { isLoaded, loadError } = useGoogleMaps({ libraries: ['places'] });
  
  // Initialize search term from URL query parameter if available
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  // Debounce the place changed function to avoid excessive API calls
  const debouncedPlaceChanged = useCallback(
    debounce(() => {
      if (autocomplete) {
        onPlaceChanged();
      }
    }, 400),
    [autocomplete]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast({
        title: "Digite um endereço",
        description: "Por favor, informe um endereço ou local para buscar",
        variant: "destructive",
      });
      return;
    }
    
    onPlaceChanged();
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const onPlaceChanged = () => {
    if (!autocomplete) {
      toast({
        title: "Serviço indisponível",
        description: "O serviço de busca de endereços não está disponível no momento",
        variant: "destructive",
      });
      return;
    }

    const place = autocomplete.getPlace();
    
    if (!place || !place.geometry || !place.geometry.location) {
      toast({
        title: "Endereço não encontrado",
        description: "Não foi possível localizar o endereço informado",
        variant: "destructive",
      });
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const query = searchTerm;

    console.log(`Navegando para: /spaces?lat=${lat}&lng=${lng}&q=${encodeURIComponent(query)}`);
    
    toast({
      title: "Buscando vagas",
      description: "Procurando vagas próximas ao endereço informado",
    });
    
    // Include the query in the URL for persistence
    navigate(`/spaces?lat=${lat}&lng=${lng}&q=${encodeURIComponent(query)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-md w-full mx-auto">
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {isLoaded ? (
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={debouncedPlaceChanged}
            options={{
              componentRestrictions: { country: 'br' },
              fields: ['geometry.location', 'formatted_address', 'name'],
              strictBounds: false,
            }}
          >
            <Input
              type="text"
              placeholder="Digite um endereço ou local"
              className="pl-12 pr-24 py-6 rounded-full"
              value={searchTerm}
              onChange={handleInputChange}
              ref={inputRef}
              aria-label="Buscar por endereço"
            />
          </Autocomplete>
        ) : (
          <Input
            type="text"
            placeholder={loadError ? "Erro ao carregar" : "Carregando..."}
            className="pl-12 pr-24 py-6 rounded-full"
            disabled
          />
        )}
        
        {searchTerm && (
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
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-primary hover:bg-primary-dark px-6"
          aria-label="Buscar"
        >
          <Search className="w-4 h-4 mr-2" /> Buscar
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
