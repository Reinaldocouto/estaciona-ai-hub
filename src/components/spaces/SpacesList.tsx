
import React from 'react';
import SpaceCard, { SpaceProps } from '@/components/ui-custom/SpaceCard';

interface SpacesListProps {
  spaces: SpaceProps[];
}

const SpacesList: React.FC<SpacesListProps> = ({ spaces }) => {
  if (spaces.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">
          Nenhuma vaga encontrada
        </h3>
        <p className="text-gray-500">
          Tente ajustar seus filtros para encontrar mais opções.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {spaces.map((space) => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </div>
  );
};

export default SpacesList;
