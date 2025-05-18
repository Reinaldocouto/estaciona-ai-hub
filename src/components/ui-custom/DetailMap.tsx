
/// <reference types="google.maps" />

import React from 'react';
import { GoogleMap } from '@/components/maps';
import type { SpaceProps } from './SpaceCard';

interface DetailMapProps {
  space: SpaceProps;
  className?: string;
}

const DetailMap: React.FC<DetailMapProps> = ({ space, className = '' }) => {
  if (!space.lat || !space.lng) {
    return (
      <div className={`rounded-xl overflow-hidden h-[300px] bg-gray-200 ${className}`}>
        <div className="h-full flex items-center justify-center">
          <p className="text-center text-gray-500">
            Localização indisponível para este endereço
          </p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      spaces={[space]}
      center={{ lat: space.lat, lng: space.lng }}
      zoom={18}
      className={`rounded-xl overflow-hidden h-[300px] ${className}`}
      singleMarker={true}
    />
  );
};

export default DetailMap;
