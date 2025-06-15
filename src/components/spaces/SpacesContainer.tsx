
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SpacesHeader from './SpacesHeader';
import SpacesList from './SpacesList';
import SpacesLoading from './SpacesLoading';
import Map from '@/components/ui-custom/Map';
import FilterBar from '@/components/ui-custom/FilterBar';
import { SpaceProps } from '@/components/ui-custom/SpaceCard';
import { fetchSpaces } from '@/api/spaces';
import { useToast } from '@/hooks/use-toast';
import { FilterState } from '@/components/ui-custom/FilterBar';

const SpacesContainer: React.FC = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [loading, setLoading] = useState(false);
  const [spaces, setSpaces] = useState<SpaceProps[]>([]);
  const [filteredSpaces, setFilteredSpaces] = useState<SpaceProps[]>([]);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: 100,
    features: [],
    availability: true,
  });
  
  // Get search params for map center
  const searchLat = searchParams.get('lat');
  const searchLng = searchParams.get('lng');
  const searchQuery = searchParams.get('q') || '';
  const mapCenter = searchLat && searchLng 
    ? { lat: parseFloat(searchLat), lng: parseFloat(searchLng) } 
    : undefined;

  // Handle search params for spaces
  useEffect(() => {
    setLoading(true);
    
    // Update search filter with the query from URL if available
    if (searchQuery && filters.search !== searchQuery) {
      setFilters(prev => ({
        ...prev,
        search: searchQuery
      }));
    }
    
    if (searchLat && searchLng) {
      console.log(`Buscando vagas próximas a: ${searchLat}, ${searchLng} com termo: ${searchQuery}`);
      
      // Call the API to fetch spaces near the location with proximity calculation
      fetchSpaces(parseFloat(searchLat), parseFloat(searchLng), 10) // Raio de 10km
        .then((fetchedSpaces) => {
          console.log(`API retornou ${fetchedSpaces.length} vagas próximas`);
          setSpaces(fetchedSpaces);
          setFilteredSpaces(fetchedSpaces);
          setLoading(false);
          
          // Auto-switch to map view when coming from search
          setViewMode('map');
          
          // Show results toast with correct count and grammar
          const count = fetchedSpaces.length;
          if (count > 0) {
            toast({
              title: `${count} vaga${count !== 1 ? 's' : ''} encontrada${count !== 1 ? 's' : ''}`,
              description: `Vagas próximas ao endereço "${searchQuery}"`,
            });
          } else {
            toast({
              title: "Nenhuma vaga encontrada",
              description: `Não foi possível encontrar vagas próximas ao endereço "${searchQuery}". Tente expandir a busca.`,
              variant: "destructive",
            });
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar vagas:", error);
          setLoading(false);
          
          toast({
            title: "Erro ao buscar vagas",
            description: "Não foi possível encontrar vagas nesta localização. Tente novamente.",
            variant: "destructive",
          });
        });
    } else {
      // If no specific location, fetch all spaces near São Paulo center
      fetchSpaces(-23.5505, -46.6333, 15) // Raio maior para São Paulo centro
        .then((fetchedSpaces) => {
          setSpaces(fetchedSpaces);
          setFilteredSpaces(fetchedSpaces);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching spaces:", error);
          setLoading(false);
          
          toast({
            title: "Erro ao buscar vagas",
            description: "Não foi possível carregar as vagas. Tente novamente mais tarde.",
            variant: "destructive",
          });
        });
    }
  }, [searchLat, searchLng, searchQuery]); // Removed toast from dependencies

  /* --------------------------- Aplicação de filtros --------------------------- */
  // Filtrar espaços com base nos filtros definidos
  useEffect(() => {
    if (spaces.length === 0) return;
    
    let filtered = [...spaces];
    
    // Filtrar por termo de busca
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (space) => 
          space.title.toLowerCase().includes(searchLower) || 
          space.address.toLowerCase().includes(searchLower) ||
          (space.features && space.features.some(f => f.toLowerCase().includes(searchLower)))
      );
    }
    
    // Filtrar por preço
    filtered = filtered.filter(space => space.price <= filters.priceRange);
    
    // Filtrar por características
    if (filters.features.length > 0) {
      filtered = filtered.filter(space => 
        space.features && 
        filters.features.every(feature => 
          space.features?.includes(feature)
        )
      );
    }
    
    // Filtrar por disponibilidade
    if (filters.availability) {
      filtered = filtered.filter(space => space.available !== false);
    }
    
    setFilteredSpaces(filtered);
  }, [filters, spaces]);

  const handleFilterChange = (newFilters: FilterState) => {
    console.log('Filtros alterados:', newFilters);
    setFilters(newFilters);
  };

  const toggleViewMode = () => setViewMode((m) => (m === 'list' ? 'map' : 'list'));

  const handleSpaceSelect = (id: string) => {
    window.location.href = `/spaces/${id}`;
  };

  return (
    <div className="container mx-auto px-4 pt-6">
      <FilterBar 
        onFilterChange={handleFilterChange} 
        initialSearch={searchQuery}
      />
      
      <SpacesHeader 
        spacesCount={filteredSpaces.length} 
        viewMode={viewMode} 
        toggleViewMode={toggleViewMode} 
        showLocationText={!!searchLat && !!searchLng}
      />

      {loading ? (
        <SpacesLoading />
      ) : viewMode === 'list' ? (
        <SpacesList spaces={filteredSpaces} />
      ) : (
        <div className="h-[calc(100vh-220px)]">
          <Map
            spaces={filteredSpaces}
            className="h-full"
            onSelect={handleSpaceSelect}
            center={mapCenter}
            zoom={mapCenter ? 14 : undefined}
          />
        </div>
      )}
    </div>
  );
};

export default SpacesContainer;
