
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface AccordionSectionProps {
  persona: 'locatario' | 'locador';
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ persona }) => {
  return (
    <div className="mt-12 space-y-4">
      {persona === 'locatario' ? (
        <>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="taxas" className="bg-card/50 border border-primary/10 rounded-2xl px-6 py-2 hover:border-primary/20 transition-all duration-300">
              <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 [&[data-state=open]>svg]:rotate-180">
                Saiba mais sobre taxas
                <ChevronDown className="h-5 w-5 text-primary/60 transition-transform duration-300" />
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>O preço mostrado já inclui 15% de taxa do Estaciona Aí</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Cancelamentos com menos de 1 hora de antecedência podem ter taxa de 30%</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Atrasos são cobrados proporcionalmente ao tempo excedente</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Pagamentos são processados automaticamente ao final do período</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="direitos" className="bg-card/50 border border-accent/10 rounded-2xl px-6 py-2 hover:border-accent/20 transition-all duration-300">
              <AccordionTrigger className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-300 [&[data-state=open]>svg]:rotate-180">
                Direitos e Responsabilidades
                <ChevronDown className="h-5 w-5 text-accent/60 transition-transform duration-300" />
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <h5 className="font-bold text-foreground mb-4 text-base">Seus direitos:</h5>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Suporte disponível 24h por dia</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Seguro contra danos ao veículo durante a estadia</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Reembolso integral em caso de vaga indisponível</span>
                  </li>
                </ul>

                <h5 className="font-bold text-foreground mb-4 text-base">Suas responsabilidades:</h5>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Respeitar os horários reservados</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Seguir as regras do condomínio ou estabelecimento</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Multas por ultrapassar o tempo são cobradas automaticamente</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Danos ao espaço serão cobrados via caução pré-autorizado</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="pagamentos" className="bg-card/50 border border-primary/10 rounded-2xl px-6 py-2 hover:border-primary/20 transition-all duration-300">
              <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 [&[data-state=open]>svg]:rotate-180">
                Detalhes de pagamentos
                <ChevronDown className="h-5 w-5 text-primary/60 transition-transform duration-300" />
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Repasse feito via PIX em D+1 (dia útil seguinte)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>A taxa do Estaciona Aí é de 15% sobre o valor da reserva</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Impostos são calculados automaticamente conforme seu regime tributário</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Relatório fiscal mensal disponível para download</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="responsabilidades" className="bg-card/50 border border-accent/10 rounded-2xl px-6 py-2 hover:border-accent/20 transition-all duration-300">
              <AccordionTrigger className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-300 [&[data-state=open]>svg]:rotate-180">
                Direitos e Responsabilidades
                <ChevronDown className="h-5 w-5 text-accent/60 transition-transform duration-300" />
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <h5 className="font-bold text-foreground mb-4 text-base">Seus direitos:</h5>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Chat de suporte 24h</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Seguro opcional contra danos à propriedade</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Direito a solicitar ID do motorista</span>
                  </li>
                </ul>

                <h5 className="font-bold text-foreground mb-4 text-base">Suas responsabilidades:</h5>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>A vaga deve estar livre e acessível no horário reservado</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Manter fotos e descrição da vaga atualizadas</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Preços sempre visíveis e corretos</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Disponibilizar método de acesso (controle, chave, etc)</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default AccordionSection;
