
import React from 'react';
import { Box, Typography } from '@mui/material';

const HeroSection: React.FC = () => {
  return (
    <Box 
      className="py-16 px-4 rounded-xl mb-12"
      sx={{
        backgroundColor: 'rgba(255, 0, 87, 0.15)',
        backgroundImage: 'radial-gradient(at top right, rgba(255, 0, 87, 0.2), transparent)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Typography 
        variant="h2" 
        component="h1" 
        align="center" 
        gutterBottom
        className="text-4xl md:text-5xl font-bold"
      >
        Como o Estaciona Aí funciona?
      </Typography>
      <Typography 
        variant="h5" 
        align="center" 
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        Reserve ou alugue vagas em 3 etapas simples.
      </Typography>
    </Box>
  );
};

export default HeroSection;
