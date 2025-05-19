
import React, { useState, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, X } from 'lucide-react';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoaded } = useGoogleMaps({ libraries: ['places'] });
  const [searchTerm, setSearchTerm] = useState('');
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
      console.warn('Autocomplete is not loaded yet!');
      return;
    }

    const place = autocomplete.getPlace();
    
    if (!place || !place.geometry || !place.geometry.location) {
      console.warn('No place selected or invalid place');
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    console.log(`Navigating to: /spaces?lat=${lat}&lng=${lng}`);
    navigate(`/spaces?lat=${lat}&lng=${lng}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-md w-full mx-auto">
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {isLoaded ? (
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <Input
              type="text"
              placeholder="Digite um endereço ou local"
              className="pl-12 pr-24 py-6 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={inputRef}
            />
          </Autocomplete>
        ) : (
          <Input
            type="text"
            placeholder="Carregando..."
            className="pl-12 pr-24 py-6 rounded-full"
            disabled
          />
        )}
        
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        <Button 
          type="submit" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-primary hover:bg-primary-dark px-6"
        >
          <Search className="w-4 h-4 mr-2" /> Buscar
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
