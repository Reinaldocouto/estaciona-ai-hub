import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PremiumDiscountBadge from './PremiumDiscountBadge';

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
  discount_premium?: boolean;
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
  const { isPremium } = useAuth();
  
  // Set default image if not provided
  const imageUrl = space.imageUrl || 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop';
  
  // Calculate discounted price
  const discountedPrice = space.discount_premium && isPremium 
    ? space.price * 0.9 // 10% discount for premium users
    : space.price;
  
  return (
    <Card className="glass-effect transition-transform hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="relative">
          <img
            src={imageUrl}
            alt={space.title}
            className="rounded-md w-full h-40 object-cover mb-3"
          />
          
          {!space.available && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              Indisponível
            </Badge>
          )}
          
          {space.discount_premium && isPremium && (
            <PremiumDiscountBadge 
              discount={10} 
              className="absolute top-2 left-2" 
            />
          )}
          
          {space.type && (
            <Badge className="absolute top-2 right-2 bg-primary">
              {space.type}
            </Badge>
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{space.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{space.address}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            {space.discount_premium && isPremium ? (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 line-through">R$ {space.price.toFixed(2)}</span>
                <span className="text-xl font-bold text-green-600">R$ {discountedPrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-primary">R$ {space.price.toFixed(2)}</span>
            )}
            <span className="text-gray-500">/hora</span>
          </div>
          {space.rating && space.reviewCount && (
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="font-medium">{space.rating}</span>
              <span className="text-gray-500 ml-1">({space.reviewCount})</span>
            </div>
          )}
        </div>
        
        {space.features && space.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {space.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">{feature}</Badge>
            ))}
            {space.features.length > 3 && (
              <Badge variant="outline" className="text-xs">+{space.features.length - 3}</Badge>
            )}
          </div>
        )}
        
        {space.distance && (
          <div className="text-sm text-gray-500">
            Distância: {space.distance}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/spaces/${space.id}`}>Ver detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SpaceCard;
