
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

interface TooltipInfoProps {
  text: string;
  link: string;
}

const TooltipInfo: React.FC<TooltipInfoProps> = ({ text, link }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 -mt-1 rounded-full">
          <Info className="h-4 w-4" />
          <span className="sr-only">Informações</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <p className="text-sm">{text}</p>
            <a href={`/${link}`} className="text-xs text-primary underline hover:text-primary/80">
              Saiba mais
            </a>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TooltipInfo;
