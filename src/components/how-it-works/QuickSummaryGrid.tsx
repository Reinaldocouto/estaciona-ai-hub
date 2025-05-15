
import React from 'react';
import { Car, Garage } from 'lucide-react';
import SummaryCard from './SummaryCard';

const QuickSummaryGrid = () => {
  // Dados para as cards de resumo
  const locatarioSteps = ['Encontre vaga', 'Reserve', 'Estacione & pague'];
  const locadorSteps = ['Cadastre vaga', 'Aprove reservas', 'Receba pagamento'];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          <SummaryCard 
            icon={Car}
            title="Para Motoristas (Locatários)" 
            borderColor="text-primary" 
            steps={locatarioSteps}
          />
          
          <SummaryCard 
            icon={Garage}
            title="Para Proprietários (Locadores)" 
            borderColor="text-secondary" 
            steps={locadorSteps}
          />
        </div>
      </div>
    </section>
  );
};

export default QuickSummaryGrid;
