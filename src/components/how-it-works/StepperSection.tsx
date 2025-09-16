
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
    <div className="space-y-8 mb-12">
      {steps.map((step, index) => (
        <div key={index} className="relative flex items-start space-x-4 group">
          {/* Step number with FIAP style */}
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
            <span className="text-primary font-bold text-sm">{index + 1}</span>
          </div>
          
          {/* Content */}
          <div className="flex-1 pt-1">
            <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary/80 transition-colors duration-300">
              {step.label}
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Connecting line (except for the last item) */}
          {index < steps.length - 1 && (
            <div className="absolute left-5 top-10 w-0.5 h-8 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />
          )}

          {/* Decorative dot */}
          <div className="absolute -right-2 top-2 w-1 h-1 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
      ))}
    </div>
  );
};

export default StepperSection;
