
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SpacesContainer from '@/components/spaces/SpacesContainer';
import { Container, Box } from '@/components/ui/container';

const Spaces = () => {
  return (
    <>
      <Helmet>
        <title>Encontrar Vagas | Estaciona Aí</title>
        <meta name="description" content="Encontre vagas de estacionamento próximas a você. Busca inteligente, reserva instantânea e pagamento seguro." />
      </Helmet>
      
      <Navbar />

      <Box 
        as="main"
        className="font-roboto min-h-screen"
      >
        <Container className="py-12 md:py-16">
          <SpacesContainer />
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Spaces;
