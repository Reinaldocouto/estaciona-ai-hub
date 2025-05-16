
import React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  cta: string;
  onCtaClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, cta, onCtaClick }) => {
  return (
    <div className="relative bg-background py-16 md:py-24">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={onCtaClick}
              className="text-lg px-8 py-6 h-auto"
            >
              {cta}
            </Button>
            <p className="text-muted-foreground self-center">
              Ganhe até R$ 800 por mês com total segurança
            </p>
          </div>
        </div>
      </Container>
      <div className="absolute inset-0 z-[-1] opacity-10 bg-[url('/parking-hero-bg.jpg')] bg-cover bg-center"></div>
    </div>
  );
};

export default HeroSection;
