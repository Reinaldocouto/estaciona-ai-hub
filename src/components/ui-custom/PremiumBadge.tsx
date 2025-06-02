
import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PremiumBadgeProps {
  className?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ className = "" }) => {
  return (
    <Badge className={`bg-gradient-to-r from-yellow-400 to-yellow-600 text-white ${className}`}>
      <Star className="h-3 w-3 mr-1" />
      Premium
    </Badge>
  );
};

export default PremiumBadge;
