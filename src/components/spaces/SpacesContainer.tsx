import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Brain } from 'lucide-react';
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
import { useAuth } from '@/contexts/AuthContext';

const SpacesContainer: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [loading, setLoading] = useState(false);
  const [spaces, setSpaces] = useState<SpaceProps[]>([]);
  const [filteredSpaces, setFilteredSpaces] = useState<SpaceProps[]>([]);
  const [searchParams] = useSearchParams();
  const [hasUserLocation, setHasUserLocation] = useState(false);
  
  // Check if SmartMatch was activated
  const isSmartMatch = searchParams.get('smartmatch') === 'true';
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: 100,
    features: [],
    availability: false, // Não aplicar filtro automático
  });

  // Estados da IA
  const [iaEnabled, setIaEnabled] = useState(false);
  const [precoMin, setPrecoMin] = useState(5);
  const [precoMax, setPrecoMax] = useState(100); // Valor mais realista
  const [distanciaMin, setDistanciaMin] = useState(0); // Começar de 0km
  const [distanciaMax, setDistanciaMax] = useState(20); // Valor mais amplo
  const [raioKm, setRaioKm] = useState(5); // Raio maior
  const [recursosDesejados, setRecursosDesejados] = useState<string[]>([]);
  const { isLoading: iaLoading, data: iaData, fetchRecommendations, clearRecommendations } = useIARecommendations();
  
  // Get search params for map center
  const searchLat = searchParams.get('lat');
  const searchLng = searchParams.get('lng');
  const searchQuery = searchParams.get('q') || '';
  const mapCenter = searchLat && searchLng 
    ? { lat: parseFloat(searchLat), lng: parseFloat(searchLng) } 
    : undefined;

  // Check if user has location available (either from URL or manually set)
  useEffect(() => {
    if (searchLat && searchLng) {
      setHasUserLocation(true);
    }
  }, [searchLat, searchLng]);

  // Handle search params for spaces
  useEffect(() => {
    setLoading(true);
    
    // Não aplicar filtros automaticamente a partir de parâmetros da URL
    // 'q' serve apenas como rótulo da busca (toast/header), filtros são aplicados somente pelo usuário.
    
    if (searchLat && searchLng) {
      console.log(`Buscando vagas próximas a: ${searchLat}, ${searchLng} com termo: ${searchQuery}`);
      
      // Call the API to fetch spaces near the location with proximity calculation
      fetchSpaces(parseFloat(searchLat), parseFloat(searchLng), 10) // Raio de 10km
        .then((fetchedSpaces) => {
          console.log(`API retornou ${fetchedSpaces.length} vagas próximas`);
          setSpaces(fetchedSpaces);
          setFilteredSpaces(fetchedSpaces);
          setLoading(false);
          
          // Auto-activate AI for SmartMatch
          if (isSmartMatch) {
            console.log('🤖 SmartMatch detectado - ativando IA automaticamente');
            setIaEnabled(true);
          }
          
          // Auto-switch to map view when coming from search
          setViewMode('map');
          
          // Show results toast with correct count and grammar (skip for SmartMatch)
          // Não aplicar filtros automáticos no toast - mostrar total de vagas encontradas
          const filteredForToast = [...fetchedSpaces];
          
          if (!isSmartMatch) {
            const count = filteredForToast.length;
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
      // If no specific location, fetch ALL available spaces (much larger radius)
      fetchSpaces(-23.5505, -46.6333, 50) // Raio muito maior para mostrar todas as vagas
        .then((fetchedSpaces) => {
          console.log(`Mostrando todas as ${fetchedSpaces.length} vagas disponíveis`);
          setSpaces(fetchedSpaces);
          setFilteredSpaces(fetchedSpaces);
          setLoading(false);
          
          // Toast informando que está mostrando todas as vagas (sem filtros automáticos)
          const filteredForToast = fetchedSpaces;
          toast({
            title: `${filteredForToast.length} vagas disponíveis`,
            description: "Mostrando todas as vagas da plataforma. Use a busca para filtrar por localização.",
          });
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
  }, [searchLat, searchLng, searchQuery, isSmartMatch]); // Added isSmartMatch dependency

  // Filtrar espaços com base nos filtros definidos
  useEffect(() => {
    if (spaces.length === 0) return;
    
    let filtered = [...spaces];
    
    // Se IA está habilitada, não aplicar filtros tradicionais
    if (iaEnabled) {
      return; // IA controla os dados, não aplica filtros aqui
    }
    
    // Verificar se há filtros ativos
    const hasActiveFilters = filters.search || 
                           filters.priceRange < 100 || 
                           filters.features.length > 0 || 
                           filters.availability;
    
    // Se não há filtros ativos, mostrar todas as vagas
    if (!hasActiveFilters) {
      setFilteredSpaces(filtered);
      return;
    }
    
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
    
    // Filtrar por preço (apenas se menor que 100)
    if (filters.priceRange < 100) {
      filtered = filtered.filter(space => space.price <= filters.priceRange);
    }
    
    // Filtrar por características
    if (filters.features.length > 0) {
      filtered = filtered.filter(space => 
        space.features && 
        filters.features.every(feature => 
          space.features?.includes(feature)
        )
      );
    }
    
    // Filtrar por disponibilidade (apenas se explicitamente ativado)
    if (filters.availability) {
      filtered = filtered.filter(space => 
        space.available === true && 
        !space.title?.toLowerCase().includes('indisponível')
      );
    }
    
    setFilteredSpaces(filtered);
  }, [filters, spaces, iaEnabled]);

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
    // Verificar se o usuário está logado
    if (enabled && !user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para usar a busca por IA",
        variant: "destructive",
      });
      return;
    }

    // Verificar se há localização disponível
    if (enabled && !hasUserLocation) {
      toast({
        title: "Localização necessária",
        description: "A busca por IA precisa da sua localização. Use o SmartMatch para ativar automaticamente.",
        variant: "destructive",
      });
      return;
    }

    setIaEnabled(enabled);
    
    if (!enabled) {
      clearRecommendations();
      return;
    }

    // Tentar usar coordenadas da URL primeiro, senão usar default para São Paulo
    const lat = parseFloat(searchLat || '-23.5505');
    const lng = parseFloat(searchLng || '-46.6333');
    
    console.log(`🤖 Ativando IA com localização: lat=${lat}, lng=${lng}`);
    console.log(`🎯 Filtros: preço R$${precoMin}-R$${precoMax}, distância ${distanciaMin}-${distanciaMax}km, raio ${raioKm}km`);
    
    await fetchRecommendations({
      lat,
      lng,
      radius_km: raioKm,
      peso_preco: 0.5, // Valor fixo, agora usamos ranges
      peso_dist: 0.5, // Valor fixo, agora usamos ranges
      recursos: recursosDesejados,
      preco_min: precoMin,
      preco_max: precoMax,
      distancia_min: distanciaMin,
      distancia_max: distanciaMax
    });
  };

  // Atualizar recomendações quando parâmetros mudarem
  useEffect(() => {
    if (iaEnabled) {
      const lat = parseFloat(searchLat || '-23.5505');
      const lng = parseFloat(searchLng || '-46.6333');
      
      console.log(`🔄 Atualizando IA com: lat=${lat}, lng=${lng}, filtros: preço R$${precoMin}-R$${precoMax}, distância ${distanciaMin}-${distanciaMax}km`);
      
      fetchRecommendations({
        lat,
        lng,
        radius_km: raioKm,
        peso_preco: 0.5, // Valor fixo, agora usamos ranges
        peso_dist: 0.5, // Valor fixo, agora usamos ranges
        recursos: recursosDesejados,
        preco_min: precoMin,
        preco_max: precoMax,
        distancia_min: distanciaMin,
        distancia_max: distanciaMax
      });
    }
  }, [iaEnabled, raioKm, precoMin, precoMax, distanciaMin, distanciaMax, recursosDesejados, fetchRecommendations, searchLat, searchLng]);

  // Determinar quais espaços mostrar (IA ou filtrados)
  const showingIA = iaEnabled && iaData.length > 0;
  
  // Converter dados da IA para formato de espaços para o mapa
  const iaSpacesForMap = showingIA 
    ? iaData.map(vaga => {
        const originalSpace = spaces.find(s => s.id === vaga.vaga_id);
        return originalSpace || null;
      }).filter(Boolean) as SpaceProps[]
    : [];
  
  const displaySpaces = showingIA ? iaSpacesForMap : filteredSpaces;

  return (
    <div className="container mx-auto px-4 pt-6 space-y-6">
      {/* Controles da IA */}
      <IAControls
        enabled={iaEnabled}
        onEnabledChange={handleIAToggle}
        precoMin={precoMin}
        precoMax={precoMax}
        onPrecoChange={(min, max) => {
          setPrecoMin(min);
          setPrecoMax(max);
        }}
        distanciaMin={distanciaMin}
        distanciaMax={distanciaMax}
        onDistanciaChange={(min, max) => {
          setDistanciaMin(min);
          setDistanciaMax(max);
        }}
        raioKm={raioKm}
        onRaioChange={setRaioKm}
        recursos={recursosDesejados}
        onRecursosChange={setRecursosDesejados}
        isLoading={iaLoading}
        canUseIA={user !== null && hasUserLocation}
        iaDisabledReason={
          !user 
            ? "Faça login para usar a busca por IA" 
            : !hasUserLocation 
            ? "Use o SmartMatch para ativar a localização e acessar a IA"
            : ""
        }
      />
      
      {/* Filtros tradicionais quando IA está desabilitada */}
      {!iaEnabled && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-yellow-800">
            💡 <strong>Visualizando todas as vagas:</strong> Use os filtros abaixo para refinar sua busca ou ative a IA para recomendações personalizadas.
          </p>
        </div>
      )}
      
      {!iaEnabled && (
        <FilterBar 
          onFilterChange={handleFilterChange}
        />
      )}
      
      {/* Header com contador e toggle de visualização */}
      <SpacesHeader 
        spacesCount={displaySpaces.length} 
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
            spaces={displaySpaces}
            className="h-full"
            onSelect={handleSpaceSelect}
            center={mapCenter}
            zoom={mapCenter ? 14 : undefined}
          />
        </div>
      )}
      
      {/* Status da IA */}
      {showingIA && (
        <div className="text-center text-sm text-muted-foreground p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Brain className="h-4 w-4 text-primary" />
            <span className="font-medium">IA Ranqueamento Ativo</span>
          </div>
          <p>
            Mostrando {iaData.length} vagas otimizadas • 
            Preço: R${precoMin}-R${precoMax} • 
            Distância: {distanciaMin}-{distanciaMax}km • 
            Raio: {raioKm}km
            {recursosDesejados.length > 0 && ` • Recursos: ${recursosDesejados.join(', ')}`}
          </p>
        </div>
      )}
      
      {/* Status dos filtros tradicionais - apenas quando há filtros ativos */}
      {!iaEnabled && filteredSpaces.length !== spaces.length && (
        (filters.search || filters.priceRange < 100 || filters.features.length > 0 || filters.availability) && (
          <div className="text-center text-sm text-muted-foreground p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p>
              📊 Filtros aplicados: Mostrando {filteredSpaces.length} de {spaces.length} vagas
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default SpacesContainer;