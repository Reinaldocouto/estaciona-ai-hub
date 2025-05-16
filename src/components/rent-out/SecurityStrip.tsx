
import React from 'react';
import { Shield, BadgeCheck, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SecurityBadgeProps {
  icon: 'shield' | 'verified_user' | 'lock';
  children: React.ReactNode;
}

const SecurityBadge: React.FC<SecurityBadgeProps> = ({ icon, children }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'shield':
        return <Shield className="h-8 w-8 text-accent" />;
      case 'verified_user':
        return <BadgeCheck className="h-8 w-8 text-accent" />;
      case 'lock':
        return <Lock className="h-8 w-8 text-accent" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center p-4 text-center">
      <div className="mb-3">
        {renderIcon()}
      </div>
      <p className="font-medium">{children}</p>
    </div>
  );
};

const SecurityStrip = () => {
  return (
    <Card className="mb-16 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <SecurityBadge icon="shield">
          Seguro AC R$50k
        </SecurityBadge>
        <SecurityBadge icon="verified_user">
          Verificação de CPF/CNPJ
        </SecurityBadge>
        <SecurityBadge icon="lock">
          Pagamentos D+1 via PIX
        </SecurityBadge>
      </div>
    </Card>
  );
};

export default SecurityStrip;
