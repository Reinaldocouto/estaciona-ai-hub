
import React from 'react';
import { InfoWindowF } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Car, Shield } from 'lucide-react';
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
      options={{
        pixelOffset: new google.maps.Size(0, -10),
        maxWidth: 320,
        disableAutoPan: false,
      }}
    >
      <div className="p-0 w-80 max-w-none overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Image */}
        {space.images && space.images.length > 0 && (
          <div className="w-full h-32 overflow-hidden">
            <img 
              src={space.images[0]} 
              alt={space.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">
                {space.title}
              </h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{space.address}</span>
              </div>
            </div>
            {space.rating && (
              <div className="flex items-center ml-2 flex-shrink-0">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium text-gray-900">{space.rating}</span>
              </div>
            )}
          </div>

          {/* Price and availability */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">
                R${space.price}
              </span>
              <span className="text-gray-600">/hora</span>
            </div>
            <Badge variant={space.available ? "default" : "secondary"}>
              {space.available ? "Disponível" : "Ocupado"}
            </Badge>
          </div>

          {/* Features */}
          {space.features && space.features.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {space.features.slice(0, 3).map((feature, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {feature === 'Coberto' && <Shield className="w-3 h-3 mr-1" />}
                    {feature === '24h' && <Clock className="w-3 h-3 mr-1" />}
                    {feature === 'Carro Grande' && <Car className="w-3 h-3 mr-1" />}
                    {feature}
                  </span>
                ))}
                {space.features.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{space.features.length - 3} mais
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onReserve && onReserve(space.id)}
            >
              Reservar Agora
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="px-3"
              onClick={() => window.open(`/spaces/${space.id}`, '_blank')}
            >
              Ver Detalhes
            </Button>
          </div>
        </div>
      </div>
    </InfoWindowF>
  );
};

export default MapInfoWindow;
