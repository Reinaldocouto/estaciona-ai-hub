
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Container, Box } from '@/components/ui/container';
import {
  HeroSection,
  QuickSummaryGrid,
  StepperSection,
  AccordionSection,
  TabContent,
  CTASection
} from '@/components/how-it-works';

// Dados para os passos do Locatário
const locatarioSteps = [
  {
    label: "Busca inteligente",
    description: "Digite endereço ou use GPS; algoritmo SmartMatch ordena por distância/preço."
  },
  {
    label: "Reserva instantânea",
    description: "Confirme horário; vaga fica bloqueada 15 min aguardando chegada."
  },
  {
    label: "Check-in/out",
    description: "Leia QR code do totem ou foto da placa."
  },
  {
    label: "Pagamento",
    description: "PIX ou cartão via Pagar.me; recibo em PDF."
  }
];

// Dados para os passos do Locador
const locadorSteps = [
  {
    label: "Cadastro de vaga",
    description: "Fotos, dimensões, preço/hora, disponibilidade."
  },
  {
    label: "Aprovação rápida",
    description: "Sistema verifica CPF/CNPJ e documentação do imóvel."
  },
  {
    label: "Gestão de reservas",
    description: "Painel web ou app; pode recusar até 2h antes sem multa."
  },
  {
    label: "Pagamentos",
    description: "Repasse D+1 via PIX; taxa Estaciona Aí 15%."
  }
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('locatario');

  return (
    <>
      <Helmet>
        <title>Como Funciona | Estaciona Aí</title>
        <meta name="description" content="Entenda como funciona o Estaciona Aí. Reserve ou alugue vagas em 3 etapas simples." />
      </Helmet>
      
      <Navbar />
      
      <Box 
        as="main"
        className="font-roboto min-h-screen"
      >
        <Container className="py-12 md:py-16">
          <HeroSection 
            title="Como o Estaciona Aí funciona?"
            subtitle="Reserve ou alugue vagas em 3 etapas simples."
          />
          
          <QuickSummaryGrid />
          
          <section className="py-12">
            <div className="w-full">
              <Tabs 
                defaultValue="locatario" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="locatario">Sou Motorista (Locatário)</TabsTrigger>
                  <TabsTrigger value="locador">Sou Proprietário (Locador)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="locatario" className="mt-6">
                  <TabContent 
                    persona="locatario"
                    steps={locatarioSteps}
                  />
                </TabsContent>
                
                <TabsContent value="locador" className="mt-6">
                  <TabContent 
                    persona="locador"
                    steps={locadorSteps}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          <CTASection />
        </Container>
      </Box>
      
      <Footer />
    </>
  );
};

export default HowItWorks;
