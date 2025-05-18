
/// <reference types="google.maps" />

import React from 'react';
import isEqual from 'react-fast-compare';
import { GoogleMap } from '@/components/maps';
import { SpaceProps } from './SpaceCard';

export type { SpaceProps };

interface MapProps {
  spaces: SpaceProps[];
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  onSelect?: (id: string) => void;
}

const Map: React.FC<MapProps> = (props) => {
  return <GoogleMap {...props} showCluster={true} />;
};

export default React.memo(
  Map,
  (prev, next) =>
    prev.className === next.className &&
    prev.zoom === next.zoom &&
    isEqual(prev.center, next.center) &&
    isEqual(prev.spaces, next.spaces) &&
    prev.onSelect === next.onSelect,
);
