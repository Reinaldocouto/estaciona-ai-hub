
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Percent } from 'lucide-react';

interface PremiumDiscountBadgeProps {
  discount: number;
  className?: string;
}

const PremiumDiscountBadge: React.FC<PremiumDiscountBadgeProps> = ({ 
  discount, 
  className = "" 
}) => {
  return (
    <Badge className={`bg-green-500 text-white ${className}`}>
      <Percent className="h-3 w-3 mr-1" />
      {discount}% OFF Premium
    </Badge>
  );
};

export default PremiumDiscountBadge;
