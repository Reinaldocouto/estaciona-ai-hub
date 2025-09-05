
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SpaceProps } from '@/components/ui-custom/SpaceCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SpaceGalleryProps {
  space: SpaceProps;
}

const SpaceGallery: React.FC<SpaceGalleryProps> = ({ space }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = space.images || [];

  if (images.length === 0) {
    return (
      <div className="relative w-full h-[400px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Sem imagens disponíveis</p>
      </div>
    );
  }

  // Calculate how many images to show per view based on screen size
  const getImagesPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg screens
      if (window.innerWidth >= 768) return 2;  // md screens
      return 1; // sm screens
    }
    return 3;
  };

  const imagesPerView = getImagesPerView();
  const totalSlides = Math.ceil(images.length / imagesPerView);
  
  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < totalSlides - 1;

  const scrollPrev = () => {
    if (canScrollPrev) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const scrollNext = () => {
    if (canScrollNext) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full h-[400px] bg-gray-900 overflow-hidden rounded-lg">
      {/* Main carousel container */}
      <div className="relative w-full h-full">
        {/* Images container with smooth transition */}
        <div 
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
            width: `${totalSlides * 100}%`
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div 
              key={slideIndex} 
              className="flex gap-2 p-2"
              style={{ width: `${100 / totalSlides}%` }}
            >
              {images
                .slice(slideIndex * imagesPerView, (slideIndex + 1) * imagesPerView)
                .map((image, imageIndex) => {
                  const actualIndex = slideIndex * imagesPerView + imageIndex;
                  return (
                    <div
                      key={actualIndex}
                      className="relative overflow-hidden flex-1 min-w-0"
                    >
                      <img
                        src={image}
                        alt={`${space.title} - imagem ${actualIndex + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
                      />
                      {/* Image counter overlay */}
                      <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-medium">
                        {actualIndex + 1}/{images.length}
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>

        {/* Navigation arrows - always visible when needed */}
        {totalSlides > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg z-20 transition-opacity ${
                !canScrollPrev ? 'opacity-40 cursor-not-allowed' : 'opacity-90 hover:opacity-100'
              }`}
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg z-20 transition-opacity ${
                !canScrollNext ? 'opacity-40 cursor-not-allowed' : 'opacity-90 hover:opacity-100'
              }`}
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </Button>
          </>
        )}

        {/* Slide indicators */}
        {totalSlides > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-110 shadow-lg' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* View all photos button */}
        <Button
          variant="outline"
          className="absolute bottom-4 right-4 bg-white/95 hover:bg-white shadow-lg z-10 text-sm font-medium"
        >
          Ver todas as fotos ({images.length})
        </Button>
      </div>
    </div>
  );
};

export default SpaceGallery;
