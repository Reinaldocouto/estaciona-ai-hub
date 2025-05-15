
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SummaryCardProps {
  icon: LucideIcon;
  title: string;
  borderColor: string;
  steps: string[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon: Icon, title, borderColor, steps }) => {
  return (
    <Card className={`border-t-4 ${borderColor === 'text-primary' ? 'border-t-primary' : 'border-t-secondary'} shadow-md h-full`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon size={32} className={borderColor} />
          <h3 className="text-xl font-bold">
            {title}
          </h3>
        </div>
        <div className="pl-4">
          {steps.map((step, index) => (
            <p key={index} className="flex items-center gap-2 mb-2 last:mb-0">
              <span className={`w-2 h-2 rounded-full ${borderColor === 'text-primary' ? 'bg-primary' : 'bg-secondary'} inline-block`}></span>
              {step}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
