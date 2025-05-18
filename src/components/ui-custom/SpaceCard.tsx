
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface SpaceProps {
  id: string;
  title: string;
  address: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  distance?: string;
  features?: string[];
  available?: boolean;
  lat?: number;
  lng?: number;
  type?: 'Pequeno' | 'Médio' | 'SUV';
  // Extended properties for detail view
  priceHour?: number;
  priceDay?: number;
  description?: string;
  rules?: string[];
  owner?: {
    name: string;
    joined: string;
    responseTime: string;
    rating: number;
    image: string;
  };
  images?: string[];
  reviews?: {
    id: string;
    user: string;
    date: string;
    rating: number;
    comment: string;
    image: string;
  }[];
  location?: {
    lat: number;
    lng: number;
    nearbyPlaces?: string[];
  };
  availability?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

interface SpaceCardProps {
  space: SpaceProps;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  return (
    <Card className="glass-effect">
      <CardContent className="p-4">
        <div className="relative">
          {space.imageUrl && (
            <img
              src={space.imageUrl}
              alt={space.title}
              className="rounded-md w-full h-40 object-cover mb-3"
            />
          )}
          {!space.available && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              Indisponível
            </Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{space.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{space.address}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-primary">R$ {space.price}</span>
            <span className="text-gray-500">/hora</span>
          </div>
          {space.rating && space.reviewCount && (
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="font-medium">{space.rating}</span>
              <span className="text-gray-500">({space.reviewCount})</span>
            </div>
          )}
        </div>
        {space.features && (
          <div className="flex flex-wrap gap-2 mb-3">
            {space.features.map((feature, index) => (
              <Badge key={index} variant="secondary">{feature}</Badge>
            ))}
          </div>
        )}
        {space.distance && (
          <div className="text-sm text-gray-500">
            Distância: {space.distance}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <Button asChild>
          <Link to={`/spaces/${space.id}`}>Ver detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SpaceCard;
