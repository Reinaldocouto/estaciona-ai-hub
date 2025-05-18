
import React from 'react';
import { MarkerF } from '@react-google-maps/api';
import { MapMarkerProps } from './types';

const SpaceMarker: React.FC<MapMarkerProps> = ({ space, onClick }) => {
  if (!space.lat || !space.lng) return null;

  return (
    <MarkerF
      position={{ lat: space.lat, lng: space.lng }}
      onClick={onClick}
      icon={{
        url: '/pin.svg',
        scaledSize: new window.google.maps.Size(32, 32),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(16, 32),
      }}
      animation={window.google.maps.Animation.DROP}
      aria-label={space.title}
      title={`${space.title} – R$${space.price}/h`}
    />
  );
};

export default React.memo(SpaceMarker);
