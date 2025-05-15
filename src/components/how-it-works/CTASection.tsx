
import React from 'react';
import { Button, Grid } from '@mui/material';

const CTASection: React.FC = () => {
  return (
    <Grid container spacing={3} className="mt-10">
      <Grid item xs={12} sm={6} className="flex justify-center">
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          className="w-full sm:w-auto btn-primary py-1.5 px-4"
        >
          Baixar o app
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} className="flex justify-center">
        <Button 
          variant="outlined" 
          size="large"
          className="w-full sm:w-auto py-1.5 px-4"
        >
          Começar a anunciar vaga
        </Button>
      </Grid>
    </Grid>
  );
};

export default CTASection;
