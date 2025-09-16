
import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="relative py-20 px-4 mb-16 overflow-hidden">
      {/* FIAP-style Background with geometric elements */}
      <div className="absolute inset-0 bg-background">
        {/* Geometric dots pattern */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Large geometric shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-primary/20 rounded-full opacity-30" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border border-accent/20 rotate-45 opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto text-xl md:text-2xl font-light leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
