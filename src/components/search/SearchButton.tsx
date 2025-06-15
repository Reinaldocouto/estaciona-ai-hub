
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchButtonProps {
  isSearching: boolean;
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ isSearching, onClick }) => {
  return (
    <Button 
      type="submit" 
      disabled={isSearching}
      className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-md bg-primary hover:bg-primary-dark px-6 h-12 disabled:opacity-50"
      aria-label="Buscar"
      onClick={onClick}
    >
      <Search className="w-4 h-4 mr-2" /> 
      {isSearching ? 'Buscando...' : 'Buscar'}
    </Button>
  );
};

export default SearchButton;
