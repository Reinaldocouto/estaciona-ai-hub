
import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Dados de localizações simuladas para demonstração (como na página de vagas)
  const mockLocations = [
    { address: 'Av. Paulista, 1000 - São Paulo', lat: -23.5613, lng: -46.6563 },
    { address: 'R. dos Pinheiros, 275 - São Paulo', lat: -23.5629, lng: -46.6944 },
    { address: 'R. 7 de Abril, 154 - São Paulo', lat: -23.5440, lng: -46.6396 },
    { address: 'R. Oscar Freire, 725 - São Paulo', lat: -23.5629, lng: -46.6731 },
    { address: 'Av. Roque Petroni Júnior, 1089 - São Paulo', lat: -23.6278, lng: -46.6975 },
    { address: 'Av. Pedro Álvares Cabral - São Paulo', lat: -23.5875, lng: -46.6577 },
    { address: 'paulista', lat: -23.5613, lng: -46.6563 },
    { address: 'pinheiros', lat: -23.5629, lng: -46.6944 },
    { address: 'centro', lat: -23.5440, lng: -46.6396 },
    { address: 'jardins', lat: -23.5629, lng: -46.6731 },
    { address: 'morumbi', lat: -23.6278, lng: -46.6975 },
    { address: 'ibirapuera', lat: -23.5875, lng: -46.6577 },
  ];

  const findLocation = (searchQuery: string) => {
    console.log('Procurando localização para:', searchQuery);
    
    const query = searchQuery.toLowerCase().trim();
    
    // Busca exata primeiro
    let location = mockLocations.find(loc => 
      loc.address.toLowerCase() === query
    );
    
    // Se não encontrou, busca parcial
    if (!location) {
      location = mockLocations.find(loc => 
        loc.address.toLowerCase().includes(query) || 
        query.includes(loc.address.toLowerCase())
      );
    }
    
    console.log('Localização encontrada:', location);
    return location;
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
      const location = findLocation(searchTerm);
      
      if (location) {
        console.log(`Coordenadas encontradas: lat=${location.lat}, lng=${location.lng}`);
        
        toast({
          title: "Endereço encontrado!",
          description: "Redirecionando para busca de vagas...",
        });
        
        navigate(`/spaces?lat=${location.lat}&lng=${location.lng}&q=${encodeURIComponent(searchTerm)}`);
      } else {
        console.log('Nenhuma localização encontrada para:', searchTerm);
        toast({
          title: "Endereço não encontrado",
          description: "Tente com: Paulista, Pinheiros, Centro, Jardins, Morumbi ou Ibirapuera",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      toast({
        title: "Erro na busca",
        description: "Ocorreu um erro ao processar sua busca. Tente novamente.",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Input alterado para:', value);
    setSearchTerm(value);
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-md w-full mx-auto">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Digite um endereço ou local (ex: Paulista, Centro)"
          className="pl-10 pr-24 py-6 h-14 rounded-lg"
          value={searchTerm}
          onChange={handleInputChange}
          ref={inputRef}
          aria-label="Buscar por endereço"
          disabled={isSearching}
        />
        
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
          disabled={isSearching}
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
