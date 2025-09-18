
import React from 'react';
import { InfoWindowF } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Car, Shield } from 'lucide-react';
import { MapInfoWindowProps } from './types';
import { useNavigate } from 'react-router-dom';

const MapInfoWindow: React.FC<MapInfoWindowProps> = ({ 
  space, 
  onClose,
  onReserve 
}) => {
  const navigate = useNavigate();
  
  if (!space.lat || !space.lng) return null;
  
  const handleReserveClick = () => {
    navigate(`/spaces/${space.id}`);
    onClose();
  };
  
  return (
    <InfoWindowF
      position={{ lat: space.lat, lng: space.lng }}
      onCloseClick={onClose}
      options={{
        pixelOffset: new google.maps.Size(0, -10),
        maxWidth: 420,
        disableAutoPan: false,
      }}
    >
      <div className="w-[360px] bg-white rounded-lg shadow-lg overflow-hidden" style={{ maxWidth: 'none' }}>
        {/* Image */}
        {space.images && space.images.length > 0 && (
          <div className="w-full h-36">
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
            <div className="flex-1 pr-2">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">
                {space.title}
              </h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="text-xs">{space.address}</span>
              </div>
            </div>
            {space.rating && (
              <div className="flex items-center flex-shrink-0">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium text-gray-900 text-sm">{space.rating}</span>
              </div>
            )}
          </div>

          {/* Price and availability */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-primary">
                R${space.price}
              </span>
              <span className="text-gray-600 text-sm ml-1">/hora</span>
            </div>
            <Badge variant={space.available ? "default" : "secondary"} className="text-xs">
              {space.available ? "Disponível" : "Ocupado"}
            </Badge>
          </div>

          {/* Features */}
          {space.features && space.features.length > 0 && (
            <div className="mb-4">
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

          {/* Action Button */}
          <Button
            className="w-full"
            onClick={handleReserveClick}
          >
            Reserve Agora
          </Button>
        </div>
      </div>
    </InfoWindowF>
  );
};

export default MapInfoWindow;
