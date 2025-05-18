
import React from 'react';
import { InfoWindowF } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { MapInfoWindowProps } from './types';

const MapInfoWindow: React.FC<MapInfoWindowProps> = ({ 
  space, 
  onClose,
  onReserve 
}) => {
  if (!space.lat || !space.lng) return null;
  
  return (
    <InfoWindowF
      position={{ lat: space.lat, lng: space.lng }}
      onCloseClick={onClose}
    >
      <div className="p-2 max-w-xs">
        <h3 className="font-bold text-gray-900">{space.title}</h3>
        <p className="text-primary-700 font-medium my-1">
          R${space.price}/hora
        </p>
        {space.type && (
          <p className="text-sm text-gray-600 mb-2">
            Tipo: {space.type}
          </p>
        )}
        <Button
          size="sm"
          className="w-full mt-2"
          onClick={() => onReserve && onReserve(space.id)}
        >
          Reservar
        </Button>
      </div>
    </InfoWindowF>
  );
};

export default MapInfoWindow;
