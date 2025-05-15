
import React from 'react';
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  return (
    <section className="py-12 bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <Button 
              variant="default" 
              size="lg"
              className="w-full sm:w-auto"
            >
              Baixar o app
            </Button>
          </div>
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
            >
              Começar a anunciar vaga
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
