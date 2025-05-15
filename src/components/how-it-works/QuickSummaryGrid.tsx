
import React from 'react';
import { Grid } from '@mui/material';
import SummaryCard from './SummaryCard';
import { Car, Home } from 'lucide-react';

const QuickSummaryGrid: React.FC = () => {
  const locatarioSteps = ["Encontre vaga", "Reserve", "Estacione & pague"];
  const locadorSteps = ["Cadastre vaga", "Aprove vendas", "Receba pagamento"];

  return (
    <Grid container spacing={4} className="mb-12">
      <Grid item xs={12} md={6}>
        <SummaryCard 
          icon={Car}
          title="Locatário (Motorista)"
          borderColor="primary.main"
          steps={locatarioSteps}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <SummaryCard 
          icon={Home}
          title="Locador (Proprietário)"
          borderColor="secondary.main"
          steps={locadorSteps}
        />
      </Grid>
    </Grid>
  );
};

export default QuickSummaryGrid;
