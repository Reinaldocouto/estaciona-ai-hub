
import React from 'react';
import { Car, Home } from 'lucide-react';

const QuickSummaryGrid = () => {
  // Dados para as cards de resumo
  const locatarioSteps = ['Encontre vaga', 'Reserve', 'Estacione & pague'];
  const locadorSteps = ['Cadastre vaga', 'Aprove reservas', 'Receba pagamento'];

  return (
    <section className="py-16 relative">
      {/* Geometric background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-primary/50 rounded-full" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card Motoristas */}
          <div className="relative bg-card border border-primary/20 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 group">
            <div className="absolute top-4 right-4">
              <Car className="w-6 h-6 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Para Motoristas (Locatários)
            </h3>
            
            <div className="space-y-4">
              {locatarioSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card Proprietários */}
          <div className="relative bg-card border border-accent/20 rounded-2xl p-8 hover:border-accent/40 transition-all duration-300 group">
            <div className="absolute top-4 right-4">
              <Home className="w-6 h-6 text-accent" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Para Proprietários (Locadores)
            </h3>
            
            <div className="space-y-4">
              {locadorSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickSummaryGrid;
