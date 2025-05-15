
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
    <div className="bg-gray-50 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">
        {persona === 'locatario' ? 'Passo a passo para Motoristas' : 'Passo a passo para Proprietários'}
      </h2>
      
      <StepperSection steps={steps} />
      <AccordionSection persona={persona} />
    </div>
  );
};

export default TabContent;
