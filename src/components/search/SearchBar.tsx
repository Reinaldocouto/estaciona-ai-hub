
import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

const SearchBar: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isSearching, performSearch } = useLocationSearch();
  
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const handleInputChange = (value: string) => {
    console.log('Input alterado para:', value);
    setSearchTerm(value);
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-md w-full mx-auto">
      <SearchInput
        value={searchTerm}
        onChange={handleInputChange}
        onClear={clearSearch}
        disabled={isSearching}
        inputRef={inputRef}
      />
      <SearchButton
        isSearching={isSearching}
        onClick={() => performSearch(searchTerm)}
      />
    </form>
  );
};

export default SearchBar;
