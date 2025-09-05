
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SpaceProps } from '@/components/ui-custom/SpaceCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SpaceGalleryProps {
  space: SpaceProps;
}

const SpaceGallery: React.FC<SpaceGalleryProps> = ({ space }) => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const images = space.images || [];
  const imagesPerView = 3; // Number of images to show at once

  if (images.length === 0) {
    return (
      <div className="relative w-full h-[400px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Sem imagens disponíveis</p>
      </div>
    );
  }

  const canScrollPrev = currentStartIndex > 0;
  const canScrollNext = currentStartIndex + imagesPerView < images.length;

  const scrollPrev = () => {
    if (canScrollPrev) {
      setCurrentStartIndex(Math.max(0, currentStartIndex - 1));
    }
  };

  const scrollNext = () => {
    if (canScrollNext) {
      setCurrentStartIndex(Math.min(images.length - imagesPerView, currentStartIndex + 1));
    }
  };

  return (
    <div className="relative w-full h-[400px] bg-gray-900 overflow-hidden">
      {/* Main carousel container */}
      <div className="relative w-full h-full">
        <div className="flex h-full gap-2 p-2">
          {images.slice(currentStartIndex, currentStartIndex + imagesPerView).map((image, index) => {
            const actualIndex = currentStartIndex + index;
            return (
              <div
                key={actualIndex}
                className={`relative overflow-hidden flex-1 ${
                  index === 0 && images.length > 1 ? 'flex-[2]' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${space.title} - imagem ${actualIndex + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
                />
                {/* Image counter overlay */}
                <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded-md text-sm">
                  {actualIndex + 1}/{images.length}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        {images.length > imagesPerView && (
          <>
            <Button
              variant="outline"
              size="icon"
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white z-10 ${
                !canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white z-10 ${
                !canScrollNext ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Scroll indicators */}
        {images.length > imagesPerView && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {Array.from({ length: Math.ceil(images.length / imagesPerView) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentStartIndex / imagesPerView) === index
                    ? 'bg-white scale-125' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                onClick={() => setCurrentStartIndex(index * imagesPerView)}
              />
            ))}
          </div>
        )}

        {/* View all photos button */}
        <Button
          variant="outline"
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white z-10 text-sm"
        >
          Ver todas as fotos ({images.length})
        </Button>
      </div>
    </div>
  );
};

export default SpaceGallery;
