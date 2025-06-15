
import React from 'react';
import { Input } from '@/components/ui/input';
import { MapPin, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  disabled = false,
  inputRef
}) => {
  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Digite um endereço ou local (ex: Paulista, Centro)"
        className="pl-10 pr-24 py-6 h-14 rounded-lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={inputRef}
        aria-label="Buscar por endereço"
        disabled={disabled}
      />
      
      {value && !disabled && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Limpar busca"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
