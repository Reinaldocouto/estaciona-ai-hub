
import type { SpaceProps } from '@/components/ui-custom/SpaceCard';

export interface MapProps {
  spaces: SpaceProps[];
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  onSelect?: (id: string) => void;
  showCluster?: boolean;
  singleMarker?: boolean;
}

export interface MapMarkerProps {
  space: SpaceProps;
  onClick?: () => void;
}

export interface MapInfoWindowProps {
  space: SpaceProps;
  onClose: () => void;
  onReserve?: (id: string) => void;
}

export interface MapLoadingProps {
  loadError?: boolean;
  className?: string;
}

export interface ClusterMapProps {
  spaces: SpaceProps[];
  onClick: (space: SpaceProps) => void;
}
