
import React from 'react';
import { Button } from '@/components/ui/button';
import { List, MapIcon } from 'lucide-react';

interface SpacesHeaderProps {
  spacesCount: number;
  viewMode: 'list' | 'map';
  toggleViewMode: () => void;
  showLocationText?: boolean;
}

const SpacesHeader: React.FC<SpacesHeaderProps> = ({
  spacesCount,
  viewMode,
  toggleViewMode,
  showLocationText = false,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">
        {spacesCount} vagas disponíveis
        {showLocationText && (
          <span className="text-sm font-normal text-gray-500 block">
            Resultados para a localização pesquisada
          </span>
        )}
      </h1>

      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={toggleViewMode}
      >
        {viewMode === 'list' ? (
          <>
            <MapIcon className="h-4 w-4" />
            Ver no mapa
          </>
        ) : (
          <>
            <List className="h-4 w-4" />
            Ver em lista
          </>
        )}
      </Button>
    </div>
  );
};

export default SpacesHeader;
