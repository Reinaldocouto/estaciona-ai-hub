
import React from 'react';
import { SpaceProps } from '@/components/ui-custom/SpaceCard';
import { MapPin, Star } from 'lucide-react';

interface SpaceHeaderProps {
  space: SpaceProps;
}

const SpaceHeader: React.FC<SpaceHeaderProps> = ({ space }) => {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{space.title}</h1>
        <div className="flex items-center text-gray-700">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{space.address}</span>
        </div>
      </div>
      <div className="flex items-center">
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
        <span className="font-bold text-gray-900">{space.rating}</span>
        <span className="text-gray-600 ml-1">({space.reviewCount})</span>
      </div>
    </div>
  );
};

export default SpaceHeader;
