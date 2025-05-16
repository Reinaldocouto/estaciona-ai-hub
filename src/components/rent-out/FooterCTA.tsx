
import React from 'react';
import { Button } from '@/components/ui/button';

const FooterCTA = () => {
  const scrollToForm = () => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-6">Comece a lucrar hoje mesmo</h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Sua vaga de garagem pode gerar até R$ 800 por mês com total segurança e sem complicações.
      </p>
      <Button 
        size="lg" 
        onClick={scrollToForm}
        className="text-lg px-8 py-6 h-auto"
      >
        Publicar minha vaga agora
      </Button>
    </section>
  );
};

export default FooterCTA;
