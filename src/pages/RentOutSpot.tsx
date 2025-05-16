
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/rent-out/HeroSection';
import SecurityStrip from '@/components/rent-out/SecurityStrip';
import HowEasyGrid from '@/components/rent-out/HowEasyGrid';
import FormSection from '@/components/rent-out/FormSection';
import FAQAccordion from '@/components/rent-out/FAQAccordion';
import ChatWidgetIA from '@/components/rent-out/ChatWidgetIA';
import FooterCTA from '@/components/rent-out/FooterCTA';
import { Container, Box } from '@/components/ui/container';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const RentOutSpot = () => {
  const [fontSize, setFontSize] = useState(16);
  
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24)); // Limit to max 24px
  };
  
  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 16)); // Minimum 16px
  };
  
  return (
    <>
      <Helmet>
        <title>Anuncie sua Vaga | Estaciona Aí</title>
        <meta name="description" content="Ganhe dinheiro com sua vaga de estacionamento ociosa. Segurança total, pagamento garantido e cadastro em 3 minutos." />
        <style>{`body { font-size: ${fontSize}px; }`}</style>
      </Helmet>
      
      <Navbar />
      
      <Box 
        component="main"
        className="font-roboto"
      >
        <HeroSection 
          title="Ganhe dinheiro com sua vaga ociosa"
          subtitle="Segurança total • Pagamento garantido • Cadastro em 3 min"
          cta="Começar cadastro"
          onCtaClick={() => {
            document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        
        <Container className="py-12 md:py-16">
          <SecurityStrip />
          
          <HowEasyGrid />
          
          <FormSection 
            id="form" 
            title="Formulário rápido"
          />
          
          <FAQAccordion />
          
          <FooterCTA />
          
          <Box className="fixed bottom-24 right-6 flex flex-col gap-2">
            <button 
              onClick={increaseFontSize}
              className="bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
              aria-label="Aumentar tamanho da fonte"
            >
              A+
            </button>
            <button 
              onClick={decreaseFontSize}
              className="bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
              aria-label="Diminuir tamanho da fonte"
            >
              A-
            </button>
          </Box>
        </Container>
        
        <ChatWidgetIA 
          botName="Gepeto-IA"
          greeting="Olá! Posso ajudar a anunciar sua vaga?"
          themeColor="#CC0033"
        />
      </Box>
      
      <Footer />
    </>
  );
};

export default RentOutSpot;
