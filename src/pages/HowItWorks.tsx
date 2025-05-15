
import React, { useState } from 'react';
import { Container } from '@mui/material';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HeroSection, 
  QuickSummaryGrid, 
  TabContent, 
  CTASection 
} from '@/components/how-it-works';

const HowItWorks: React.FC = () => {
  const [perfilTab, setPerfilTab] = useState<string>("locatario");

  // Stepper steps for Locatário (Tenant)
  const locatarioSteps = [
    {
      label: 'Busca & Filtros',
      description: 'Digite um endereço ou use seu GPS. Nosso algoritmo SmartMatch™ ordena as vagas por distância e preço, apresentando as melhores opções para você.',
    },
    {
      label: 'Reserva Instantânea',
      description: 'Selecione o horário desejado e confirme sua reserva. A vaga ficará bloqueada por 15 minutos aguardando sua chegada.',
    },
    {
      label: 'Check-in via QR',
      description: 'Ao chegar, escaneie o QR code do totem ou tire uma foto da placa para iniciar o período de estacionamento.',
    },
    {
      label: 'Pagamento PIX/cartão',
      description: 'Realize o pagamento via PIX ou cartão de crédito através do Pagar.me. Um recibo em PDF será enviado para seu e-mail.',
    },
  ];

  // Stepper steps for Locador (Owner)
  const locadorSteps = [
    {
      label: 'Cadastro de vaga',
      description: 'Adicione fotos, dimensões, preço por hora e disponibilidade da sua vaga. Quanto mais detalhes, mais atrativa será para os motoristas.',
    },
    {
      label: 'Aprovação rápida',
      description: 'Nosso sistema verifica seu CPF/CNPJ e a documentação do imóvel para garantir segurança a todos os usuários.',
    },
    {
      label: 'Gestão de reservas',
      description: 'Use nosso painel web ou aplicativo para gerenciar suas reservas. Cancele com até 2 horas de antecedência sem penalidades.',
    },
    {
      label: 'Receba pagamentos',
      description: 'Receba seus pagamentos via PIX em até um dia útil após o uso da vaga. A taxa do Estaciona Aí é de apenas 15%.',
    },
  ];

  return (
    <>
      <head>
        <title>Como Funciona | Estaciona Aí</title>
        <meta name="description" content="Entenda como o Estaciona Aí funciona para motoristas e proprietários de vagas. Reserve ou alugue vagas de estacionamento em apenas 3 etapas simples." />
      </head>

      <Container maxWidth="lg" className="py-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Quick Summary Grid */}
        <QuickSummaryGrid />

        {/* Tabs Section */}
        <Tabs defaultValue="locatario" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger 
              value="locatario" 
              onClick={() => setPerfilTab("locatario")}
            >
              Sou Motorista (Locatário)
            </TabsTrigger>
            <TabsTrigger 
              value="locador" 
              onClick={() => setPerfilTab("locador")}
            >
              Sou Proprietário (Locador)
            </TabsTrigger>
          </TabsList>

          {/* Tab Content for Locatário */}
          <TabsContent value="locatario">
            <TabContent persona="locatario" steps={locatarioSteps} />
          </TabsContent>

          {/* Tab Content for Locador */}
          <TabsContent value="locador">
            <TabContent persona="locador" steps={locadorSteps} />
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <CTASection />
      </Container>
    </>
  );
};

export default HowItWorks;
