
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface AccordionSectionProps {
  persona: 'locatario' | 'locador';
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ persona }) => {
  return (
    <div className="mt-8 space-y-4">
      {persona === 'locatario' ? (
        <>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="taxas">
              <AccordionTrigger className="text-lg font-medium">
                Saiba mais sobre taxas
                <ChevronDown className="h-5 w-5" />
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>O preço mostrado já inclui 15% de taxa do Estaciona Aí</li>
                  <li>Cancelamentos com menos de 1 hora de antecedência podem ter taxa de 30%</li>
                  <li>Atrasos são cobrados proporcionalmente ao tempo excedente</li>
                  <li>Pagamentos são processados automaticamente ao final do período</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="direitos">
              <AccordionTrigger className="text-lg font-medium">
                Direitos e Responsabilidades
                <ChevronDown className="h-5 w-5" />
              </AccordionTrigger>
              <AccordionContent>
                <h5 className="font-medium mb-2">Seus direitos:</h5>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Suporte disponível 24h por dia</li>
                  <li>Seguro contra danos ao veículo durante a estadia</li>
                  <li>Reembolso integral em caso de vaga indisponível</li>
                </ul>

                <h5 className="font-medium mb-2">Suas responsabilidades:</h5>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Respeitar os horários reservados</li>
                  <li>Seguir as regras do condomínio ou estabelecimento</li>
                  <li>Multas por ultrapassar o tempo são cobradas automaticamente</li>
                  <li>Danos ao espaço serão cobrados via caução pré-autorizado</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="pagamentos">
              <AccordionTrigger className="text-lg font-medium">
                Detalhes de pagamentos
                <ChevronDown className="h-5 w-5" />
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Repasse feito via PIX em D+1 (dia útil seguinte)</li>
                  <li>A taxa do Estaciona Aí é de 15% sobre o valor da reserva</li>
                  <li>Impostos são calculados automaticamente conforme seu regime tributário</li>
                  <li>Relatório fiscal mensal disponível para download</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="responsabilidades">
              <AccordionTrigger className="text-lg font-medium">
                Direitos e Responsabilidades
                <ChevronDown className="h-5 w-5" />
              </AccordionTrigger>
              <AccordionContent>
                <h5 className="font-medium mb-2">Seus direitos:</h5>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Chat de suporte 24h</li>
                  <li>Seguro opcional contra danos à propriedade</li>
                  <li>Direito a solicitar ID do motorista</li>
                </ul>

                <h5 className="font-medium mb-2">Suas responsabilidades:</h5>
                <ul className="list-disc pl-5 space-y-2">
                  <li>A vaga deve estar livre e acessível no horário reservado</li>
                  <li>Manter fotos e descrição da vaga atualizadas</li>
                  <li>Preços sempre visíveis e corretos</li>
                  <li>Disponibilizar método de acesso (controle, chave, etc)</li>
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
