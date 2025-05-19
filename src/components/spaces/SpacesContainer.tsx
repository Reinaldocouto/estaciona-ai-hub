
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SpacesHeader from './SpacesHeader';
import SpacesList from './SpacesList';
import SpacesLoading from './SpacesLoading';
import Map from '@/components/ui-custom/Map';
import FilterBar from '@/components/ui-custom/FilterBar';
import { SpaceProps } from '@/components/ui-custom/SpaceCard';
import { fetchSpaces } from '@/api/spaces';

/* -------------------------------------------------------------------------- */
/* Tipagem dos filtros  ----------------------------------------------------- */
/* Obtém o tipo que <FilterBar /> realmente entrega, evitando duplicação.    */
type FilterBarProps = React.ComponentProps<typeof FilterBar>;
type FilterState = Parameters<
  NonNullable<FilterBarProps['onFilterChange']>
>[0];

/* -------------------------------------------------------------------------- */

const SpacesContainer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [loading, setLoading] = useState(false);
  const [spaces, setSpaces] = useState<SpaceProps[]>([]);
  const [searchParams] = useSearchParams();
  
  // Get search params for map center
  const searchLat = searchParams.get('lat');
  const searchLng = searchParams.get('lng');
  const mapCenter = searchLat && searchLng 
    ? { lat: parseFloat(searchLat), lng: parseFloat(searchLng) } 
    : undefined;

  // Handle search params for spaces
  useEffect(() => {
    setLoading(true);
    
    if (searchLat && searchLng) {
      console.log(`Searching spaces near: ${searchLat}, ${searchLng}`);
      
      // Call the API to fetch spaces near the location
      fetchSpaces(parseFloat(searchLat), parseFloat(searchLng), 2)
        .then((fetchedSpaces) => {
          setSpaces(fetchedSpaces);
          setLoading(false);
          
          // Auto-switch to map view when coming from search
          setViewMode('map');
        })
        .catch((error) => {
          console.error("Error fetching spaces:", error);
          setLoading(false);
        });
    } else {
      // If no specific location, fetch all spaces
      fetchSpaces(-23.5505, -46.6333, 5) // Default to São Paulo center
        .then((fetchedSpaces) => {
          setSpaces(fetchedSpaces);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching spaces:", error);
          setLoading(false);
        });
    }
  }, [searchLat, searchLng]);

  /* --------------------------- Filtro aplicado --------------------------- */
  const handleFilterChange = (filters: FilterState) => {
    console.log('Filtros alterados:', filters);
    setLoading(true);
    
    // Here we would fetch filtered spaces
    // For now, we'll just simulate a delay
    setTimeout(() => setLoading(false), 800);
  };

  /* ------------------------ Toggle list / map ---------------------------- */
  const toggleViewMode = () => setViewMode((m) => (m === 'list' ? 'map' : 'list'));

  /* ------------------------- Selecionar vaga ----------------------------- */
  const handleSpaceSelect = (id: string) => {
    window.location.href = `/spaces/${id}`;
  };

  return (
    <div className="container mx-auto px-4 pt-6">
      <FilterBar onFilterChange={handleFilterChange} />
      
      <SpacesHeader 
        spacesCount={spaces.length} 
        viewMode={viewMode} 
        toggleViewMode={toggleViewMode} 
        showLocationText={!!searchLat && !!searchLng}
      />

      {loading ? (
        <SpacesLoading />
      ) : viewMode === 'list' ? (
        <SpacesList spaces={spaces} />
      ) : (
        <div className="h-[calc(100vh-220px)]">
          <Map
            spaces={spaces}
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
