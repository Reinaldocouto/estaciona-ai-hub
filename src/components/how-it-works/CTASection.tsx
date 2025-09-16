
import React from 'react';
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 relative">
      {/* Geometric background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 tracking-tight">
            Pronto para começar?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex justify-center">
              <Button 
                variant="default" 
                size="lg"
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary hover:border-primary/90 transition-all duration-300 font-medium text-lg"
              >
                Baixar o app
              </Button>
            </div>
            <div className="flex justify-center">
              <Button 
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium text-lg"
              >
                Começar a anunciar vaga
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
