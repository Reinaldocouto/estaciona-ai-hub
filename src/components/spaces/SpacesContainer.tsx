import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SpacesHeader from './SpacesHeader';
import SpacesList from './SpacesList';
import SpacesLoading from './SpacesLoading';
import Map from '@/components/ui-custom/Map';
import FilterBar from '@/components/ui-custom/FilterBar';
import IAControls from '@/components/ia/IAControls';
import SpaceCardIA from './SpaceCardIA';
import { SpaceProps } from '@/components/ui-custom/SpaceCard';
import { fetchSpaces } from '@/api/spaces';
import { useToast } from '@/hooks/use-toast';
import { useIARecommendations } from '@/hooks/useIARecommendations';
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

  // Estados da IA
  const [iaEnabled, setIaEnabled] = useState(false);
  const [pesoPreco, setPesoPreco] = useState(0.6);
  const [pesoDistancia, setPesoDistancia] = useState(0.4);
  const [raioKm, setRaioKm] = useState(3);
  const [recursosDesejados, setRecursosDesejados] = useState<string[]>([]);
  const { isLoading: iaLoading, data: iaData, fetchRecommendations, clearRecommendations } = useIARecommendations();
  
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

  // Handler para toggle da IA
  const handleIAToggle = async (enabled: boolean) => {
    setIaEnabled(enabled);
    
    if (!enabled) {
      clearRecommendations();
      return;
    }

    // Tentar usar coordenadas da URL ou default para São Paulo
    const lat = parseFloat(searchLat || '-23.5505');
    const lng = parseFloat(searchLng || '-46.6333');
    
    await fetchRecommendations({
      lat,
      lng,
      radius_km: raioKm,
      peso_preco: pesoPreco,
      peso_dist: pesoDistancia,
      recursos: recursosDesejados
    });
  };

  // Atualizar recomendações quando parâmetros mudarem
  useEffect(() => {
    if (iaEnabled) {
      const lat = parseFloat(searchLat || '-23.5505');
      const lng = parseFloat(searchLng || '-46.6333');
      
      fetchRecommendations({
        lat,
        lng,
        radius_km: raioKm,
        peso_preco: pesoPreco,
        peso_dist: pesoDistancia,
        recursos: recursosDesejados
      });
    }
  }, [iaEnabled, raioKm, pesoPreco, pesoDistancia, recursosDesejados, fetchRecommendations, searchLat, searchLng]);

  // Determinar quais espaços mostrar (IA ou filtrados)
  const displaySpaces = iaEnabled && iaData.length > 0 ? iaData : filteredSpaces;
  const showingIA = iaEnabled && iaData.length > 0;

  return (
    <div className="container mx-auto px-4 pt-6 space-y-6">
      {/* Controles da IA */}
      <IAControls
        enabled={iaEnabled}
        onEnabledChange={handleIAToggle}
        pesoPreco={pesoPreco}
        onPesoPrecoChange={setPesoPreco}
        pesoDistancia={pesoDistancia}
        onPesoDistanciaChange={setPesoDistancia}
        raioKm={raioKm}
        onRaioChange={setRaioKm}
        recursos={recursosDesejados}
        onRecursosChange={setRecursosDesejados}
        isLoading={iaLoading}
      />
      
      {/* Filtros tradicionais quando IA está desabilitada */}
      {!iaEnabled && (
        <FilterBar 
          onFilterChange={handleFilterChange} 
          initialSearch={searchQuery}
        />
      )}
      
      {/* Header com contador e toggle de visualização */}
      <SpacesHeader 
        spacesCount={showingIA ? iaData.length : filteredSpaces.length} 
        viewMode={viewMode} 
        toggleViewMode={toggleViewMode} 
        showLocationText={!!searchLat && !!searchLng}
      />

      {/* Conteúdo principal */}
      {(loading || iaLoading) ? (
        <SpacesLoading />
      ) : viewMode === 'list' ? (
        showingIA ? (
          // Lista com IA
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {iaData.map((vaga) => {
              // Encontrar detalhes da vaga nos dados originais
              const vagaDetails = spaces.find(s => s.id === vaga.vaga_id);
              return (
                <SpaceCardIA
                  key={vaga.vaga_id}
                  vaga={vaga}
                  vagaDetails={vagaDetails ? {
                    titulo: vagaDetails.title,
                    endereco: vagaDetails.address,
                    image_url: vagaDetails.imageUrl,
                    rating: 4.0 + Math.random(), // Placeholder rating
                    recursos: vagaDetails.features || []
                  } : undefined}
                  onClick={() => handleSpaceSelect(vaga.vaga_id)}
                />
              );
            })}
          </div>
        ) : (
          // Lista tradicional
          <SpacesList spaces={filteredSpaces} />
        )
      ) : (
        // Mapa
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
      
      {/* Status da IA */}
      {showingIA && (
        <div className="text-center text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg">
          🤖 Mostrando {iaData.length} vagas ranqueadas por IA • 
          Peso preço: {Math.round(pesoPreco * 100)}% • 
          Peso distância: {Math.round(pesoDistancia * 100)}% • 
          Raio: {raioKm}km
          {recursosDesejados.length > 0 && ` • Recursos: ${recursosDesejados.join(', ')}`}
        </div>
      )}
    </div>
  );
};

export default SpacesContainer;