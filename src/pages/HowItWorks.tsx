
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
import ChatWidgetHowItWorks from '@/components/how-it-works/ChatWidgetHowItWorks';

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
        className="font-roboto min-h-screen bg-background"
      >
        <Container className="py-12 md:py-16">
          <HeroSection 
            title="Como o Estaciona Aí funciona?"
            subtitle="Reserve ou alugue vagas em 3 etapas simples."
          />
          
          <QuickSummaryGrid />
          
          <section className="py-16 relative">
            {/* Background geometric elements */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full" />
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-accent rounded-full" />
              <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-primary rounded-full" />
            </div>

            <div className="w-full relative z-10">
              <Tabs 
                defaultValue="locatario" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-card border border-primary/20 rounded-2xl p-1 max-w-2xl mx-auto">
                  <TabsTrigger 
                    value="locatario" 
                    className="flex-1 text-center text-muted-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/10 data-[state=active]:border data-[state=active]:border-primary/20 rounded-xl transition-all duration-300 py-3 px-4 font-medium m-0.5"
                  >
                    Sou Motorista (Locatário)
                  </TabsTrigger>
                  <TabsTrigger 
                    value="locador"
                    className="flex-1 text-center text-muted-foreground data-[state=active]:text-accent data-[state=active]:bg-accent/10 data-[state=active]:border data-[state=active]:border-accent/20 rounded-xl transition-all duration-300 py-3 px-4 font-medium m-0.5"
                  >
                    Sou Proprietário (Locador)
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="locatario" className="mt-8">
                  <TabContent 
                    persona="locatario"
                    steps={locatarioSteps}
                  />
                </TabsContent>
                
                <TabsContent value="locador" className="mt-8">
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
      
      {/* Chat Widget for How It Works help */}
      <ChatWidgetHowItWorks />
    </>
  );
};

export default HowItWorks;
