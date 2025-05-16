
import React from 'react';
import { Camera, CalendarDays, Banknote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StepCardProps {
  step: string;
  title: string;
  img: string;
  children: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, img, children }) => {
  const renderIcon = () => {
    switch (img) {
      case 'upload_photo':
        return <Camera className="h-12 w-12 text-primary" />;
      case 'calendar_month':
        return <CalendarDays className="h-12 w-12 text-primary" />;
      case 'attach_money':
        return <Banknote className="h-12 w-12 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-lg hover:border-primary">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            {renderIcon()}
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mb-2">
            {step}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{children}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const HowEasyGrid = () => {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">É muito fácil começar</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StepCard step="1" title="Cadastre sua vaga" img="upload_photo">
          Fotografe, descreva tamanho e preço/hora.
        </StepCard>
        <StepCard step="2" title="Defina disponibilidade" img="calendar_month">
          Escolha dias e horários.
        </StepCard>
        <StepCard step="3" title="Comece a lucrar" img="attach_money">
          Dinheiro cai direto no seu PIX.
        </StepCard>
      </div>
    </div>
  );
};

export default HowEasyGrid;
