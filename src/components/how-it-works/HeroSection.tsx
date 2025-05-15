
import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <div 
      className="py-16 px-4 rounded-xl mb-12 bg-gradient-to-tr from-primary/10 to-transparent"
      style={{
        backgroundColor: 'rgba(255, 0, 87, 0.15)',
        backgroundImage: 'radial-gradient(at top right, rgba(255, 0, 87, 0.2), transparent)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        {title}
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto text-center text-lg">
        {subtitle}
      </p>
    </div>
  );
};

export default HeroSection;
