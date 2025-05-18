
import React from 'react';
import { Button } from '@/components/ui/button';
import { SpaceProps } from '@/components/ui-custom/SpaceCard';

interface SpaceGalleryProps {
  space: SpaceProps;
}

const SpaceGallery: React.FC<SpaceGalleryProps> = ({ space }) => {
  return (
    <div className="relative w-full h-[400px] bg-gray-200">
      <div className="grid grid-cols-3 h-full gap-1">
        {space.images && space.images.length > 0 ? (
          space.images.map((image, index) => (
            <div
              key={index}
              className={`${index === 0 ? 'col-span-2 row-span-2' : ''} overflow-hidden`}
            >
              <img
                src={image}
                alt={`${space.title} - imagem ${index + 1}`}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
          ))
        ) : (
          <div className="col-span-3 flex items-center justify-center">
            <p className="text-gray-500">Sem imagens disponíveis</p>
          </div>
        )}
      </div>
      {space.images && space.images.length > 0 && (
        <Button
          variant="outline"
          className="absolute bottom-4 right-4 bg-white"
        >
          Ver todas as fotos
        </Button>
      )}
    </div>
  );
};

export default SpaceGallery;
