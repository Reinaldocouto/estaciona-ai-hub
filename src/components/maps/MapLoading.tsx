
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Loader2 } from 'lucide-react';
import { MapLoadingProps } from './types';

const MapLoading: React.FC<MapLoadingProps> = ({ loadError, className = '' }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-gray-100 ${className}`}
    >
      {loadError ? (
        <div className="text-center p-6">
          <MapPin className="h-12 w-12 text-gray-400 mb-2 mx-auto" />
          <h3 className="text-lg font-medium mb-2">Erro ao carregar mapa</h3>
          <p className="text-gray-500">Verifique sua chave de API ou tente novamente mais tarde.</p>
        </div>
      ) : (
        <>
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-2" />
          <p className="text-gray-500 mb-4">Carregando mapa…</p>
          <Skeleton className="w-full h-[160px] max-w-md" />
        </>
      )}
    </div>
  );
};

export default MapLoading;
