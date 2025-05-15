
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface StepperProps {
  steps: {
    label: string;
    description: string;
  }[];
}

const StepperSection: React.FC<StepperProps> = ({ steps }) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="border-l-2 border-primary pl-4 ml-4 pb-6 relative">
          <div className="absolute -left-2 top-0 bg-background p-1">
            <CheckCircle size={16} className="text-primary" />
          </div>
          <h4 className="font-bold mb-1">{step.label}</h4>
          <p className="text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default StepperSection;
