
import React from 'react';
import { Box, Typography } from '@mui/material';
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
    <div className="bg-card rounded-xl p-6">
      <Typography variant="h6" className="mb-6">
        {persona === 'locatario' ? 'Passo a passo para Motoristas' : 'Passo a passo para Proprietários'}
      </Typography>
      
      <StepperSection steps={steps} />
      <AccordionSection persona={persona} />
    </div>
  );
};

export default TabContent;
