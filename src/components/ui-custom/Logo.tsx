
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };
  
  return (
    <Link to="/" className={`font-bold ${sizeClasses[size]} ${className}`}>
      <span className="text-primary">Estaciona</span>
      <span className="text-secondary">Aí</span>
    </Link>
  );
};

export default Logo;
