
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Car, Shield, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface SpaceProps {
  id: string;
  title: string;
  address: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  distance?: string;
  features: string[];
  available: boolean;
}

const SpaceCard: React.FC<{ space: SpaceProps; className?: string }> = ({
  space,
  className = ''
}) => {
  return (
    <Link to={`/spaces/${space.id}`} className={`block ${className}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={space.imageUrl}
            alt={space.title}
            className="w-full h-48 object-cover"
          />
          {space.available ? (
            <Badge className="absolute top-3 right-3 bg-green-500 text-white border-none">
              Disponível
            </Badge>
          ) : (
            <Badge className="absolute top-3 right-3 bg-red-500 text-white border-none">
              Indisponível
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium truncate">{space.title}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
              <span className="text-sm font-medium">{space.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({space.reviewCount})</span>
            </div>
          </div>
          
          <div className="flex items-center mt-2 text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{space.address}</span>
          </div>
          
          {space.distance && (
            <div className="flex items-center mt-1 text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{space.distance}</span>
            </div>
          )}
          
          <div className="mt-3 flex flex-wrap gap-1">
            {space.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 border-none">
                {feature}
              </Badge>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-primary font-bold">
              R$ {space.price.toFixed(2)}
              <span className="text-gray-500 font-normal text-sm">/hora</span>
            </div>
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-1 rounded-lg text-sm transition-colors">
              Reservar
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpaceCard;
