
import React from 'react';
import { MarkerF, MarkerClustererF } from '@react-google-maps/api';
import { ClusterMapProps } from './types';

const ClusterMap: React.FC<ClusterMapProps> = ({ spaces, onClick }) => {
  return (
    <MarkerClustererF>
      {(clusterer) => (
        <>
          {spaces
            .filter((space) => space.lat && space.lng)
            .map((space) => (
              <MarkerF
                key={space.id}
                position={{ lat: space.lat!, lng: space.lng! }}
                onClick={() => onClick(space)}
                clusterer={clusterer}
                icon={{
                  url: '/pin.svg',
                  scaledSize: new window.google.maps.Size(32, 32),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(16, 32),
                }}
                aria-label={space.title}
                title={`${space.title} – R$${space.price}/h`}
              />
            ))}
        </>
      )}
    </MarkerClustererF>
  );
};

export default React.memo(ClusterMap);
