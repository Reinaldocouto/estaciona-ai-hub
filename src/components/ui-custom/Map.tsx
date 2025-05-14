
import React from 'react';
import { SpaceProps } from './SpaceCard';

interface MapProps {
  spaces: SpaceProps[];
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

const Map: React.FC<MapProps> = ({ 
  spaces, 
  center = { lat: -23.5505, lng: -46.6333 }, // São Paulo
  zoom = 13,
  className = ''
}) => {
  // Em um projeto real, aqui seria implementada a integração com o Google Maps
  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      <div className="bg-gray-200 w-full h-full min-h-[400px] flex items-center justify-center">
        <div className="text-center p-6">
          <h3 className="text-lg font-medium mb-2">Mapa Interativo</h3>
          <p className="text-gray-500">
            Em um ambiente de produção, este componente integraria o Google Maps API<br />
            mostrando {spaces.length} vagas de estacionamento disponíveis na região selecionada.
          </p>
          <div className="mt-4 text-xs text-gray-400">
            Coordenadas centrais: {center.lat}, {center.lng} | Zoom: {zoom}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
