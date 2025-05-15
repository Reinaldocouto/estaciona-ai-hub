
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  icon: LucideIcon;
  title: string;
  borderColor: string;
  steps: string[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon: Icon, title, borderColor, steps }) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        borderTop: '4px solid', 
        borderColor: borderColor,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }} 
      className="p-6 rounded-xl"
    >
      <Box className="flex items-center gap-3 mb-4">
        <Icon size={32} className={borderColor === 'primary.main' ? 'text-primary' : 'text-secondary'} />
        <Typography variant="h5" component="h3" className="font-bold">
          {title}
        </Typography>
      </Box>
      <Box className="pl-4">
        {steps.map((step, index) => (
          <Typography key={index} variant="body1" className="flex items-center gap-2 mb-2 last:mb-0">
            <span className={`w-2 h-2 rounded-full ${borderColor === 'primary.main' ? 'bg-primary' : 'bg-secondary'} inline-block`}></span>
            {step}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default SummaryCard;
