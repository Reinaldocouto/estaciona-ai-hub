
import React from 'react';
import StepperSection from './StepperSection';
import AccordionSection from './AccordionSection';

interface TabContentProps {
  persona: 'locatario' | 'locador';
  steps: {
    label: string;
    description: string;
  }[];
}

const TabContent: React.FC<TabContentProps> = ({ persona, steps }) => {
  return (
    <div className="bg-card border border-primary/10 rounded-2xl p-8 relative overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute top-0 right-0 w-32 h-32 border border-primary/5 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border border-accent/5 rotate-45 translate-y-12 -translate-x-12" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-foreground mb-8 tracking-tight">
          {persona === 'locatario' ? 'Passo a passo para Motoristas' : 'Passo a passo para Proprietários'}
        </h2>
        
        <StepperSection steps={steps} />
        <AccordionSection persona={persona} />
      </div>
    </div>
  );
};

export default TabContent;
