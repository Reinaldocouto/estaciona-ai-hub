
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { X, Search, Filter } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';

export interface FilterState {
  search: string;
  priceRange: number;
  features: string[];
  availability: boolean;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  initialSearch?: string;
}

const availableFeatures = [
  'Coberto', 'Privativo', 'Segurança', '24h', 'Segurança 24h', 
  'Carregador EV', 'Lavagem'
];

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, initialSearch = '' }) => {
  const [search, setSearch] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState<number>(100);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showAvailable, setShowAvailable] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Apply filters whenever they change
  useEffect(() => {
    onFilterChange({
      search,
      priceRange,
      features: selectedFeatures,
      availability: showAvailable,
    });
  }, [search, priceRange, selectedFeatures, showAvailable, onFilterChange]);

  // Update search if initialSearch changes (e.g. from URL)
  useEffect(() => {
    if (initialSearch !== search) {
      setSearch(initialSearch);
    }
  }, [initialSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch('');
  };

  const clearFilters = () => {
    setPriceRange(100);
    setSelectedFeatures([]);
    setShowAvailable(true);
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const onMobileFilterClose = () => {
    setIsMobileFilterOpen(false);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-xl border border-gray-700 p-6 mb-6">
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          type="text"
          placeholder="Buscar por nome, endereço ou características"
          value={search}
          onChange={handleSearchChange}
          className="pl-10 pr-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-primary focus:ring-primary"
        />
        {search && (
          <button 
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            aria-label="Limpar busca"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Desktop filters */}
      <div className="hidden md:flex flex-wrap items-center gap-6">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-gray-300 mb-2 font-medium">
            Preço máximo: <span className="text-primary">R${priceRange}/hora</span>
          </label>
          <div className="px-2">
            <Slider 
              value={[priceRange]} 
              min={5}
              max={100}
              step={5}
              onValueChange={(values) => setPriceRange(values[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>R$5</span>
              <span>R$100</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-gray-300 mb-3 font-medium">Características</label>
          <div className="flex flex-wrap gap-2">
            {availableFeatures.slice(0, 5).map((feature) => (
              <Badge 
                key={feature}
                variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  selectedFeatures.includes(feature) 
                    ? 'bg-primary hover:bg-primary/90 text-white' 
                    : 'border-gray-600 text-gray-300 hover:border-primary hover:text-primary'
                }`}
                onClick={() => toggleFeature(feature)}
              >
                {feature}
              </Badge>
            ))}
            {availableFeatures.length > 5 && (
              <Sheet>
                <SheetTrigger asChild>
                  <Badge variant="outline" className="cursor-pointer border-gray-600 text-gray-300 hover:border-primary hover:text-primary">
                    +{availableFeatures.length - 5} mais
                  </Badge>
                </SheetTrigger>
                <SheetContent className="bg-gray-900 border-gray-700">
                  <SheetHeader>
                    <SheetTitle className="text-white">Todas as características</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {availableFeatures.map((feature) => (
                      <Badge 
                        key={feature}
                        variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                        className={`cursor-pointer transition-all ${
                          selectedFeatures.includes(feature) 
                            ? 'bg-primary hover:bg-primary/90 text-white' 
                            : 'border-gray-600 text-gray-300 hover:border-primary hover:text-primary'
                        }`}
                        onClick={() => toggleFeature(feature)}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 ml-auto">
          <Switch 
            id="available-only"
            checked={showAvailable}
            onCheckedChange={setShowAvailable}
          />
          <label htmlFor="available-only" className="text-sm cursor-pointer text-gray-300 font-medium">
            Somente disponíveis
          </label>
          
          {(search || priceRange < 100 || selectedFeatures.length > 0 || !showAvailable) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="ml-4 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Limpar filtros
            </Button>
          )}
        </div>
      </div>

      {/* Mobile filter button */}
      <div className="flex md:hidden justify-end">
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-600 text-gray-300 hover:border-primary hover:text-primary bg-gray-800">
              <Filter size={16} />
              Filtros
              {(selectedFeatures.length > 0 || priceRange < 100 || !showAvailable) && (
                <Badge className="ml-1 bg-primary h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {selectedFeatures.length + (priceRange < 100 ? 1 : 0) + (!showAvailable ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gray-900 border-gray-700">
            <SheetHeader>
              <SheetTitle className="text-white">Filtros</SheetTitle>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-300">
                  Preço máximo: <span className="text-primary">R${priceRange}/hora</span>
                </h3>
                <div className="px-2">
                  <Slider 
                    value={[priceRange]} 
                    min={5}
                    max={100}
                    step={5}
                    onValueChange={(values) => setPriceRange(values[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>R$5</span>
                    <span>R$100</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-300">Características</h3>
                <div className="flex flex-wrap gap-2">
                  {availableFeatures.map((feature) => (
                    <Badge 
                      key={feature}
                      variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        selectedFeatures.includes(feature) 
                          ? 'bg-primary hover:bg-primary/90 text-white' 
                          : 'border-gray-600 text-gray-300 hover:border-primary hover:text-primary'
                      }`}
                      onClick={() => toggleFeature(feature)}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch 
                  id="available-only-mobile"
                  checked={showAvailable}
                  onCheckedChange={setShowAvailable}
                />
                <label htmlFor="available-only-mobile" className="text-sm cursor-pointer text-gray-300 font-medium">
                  Somente disponíveis
                </label>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="border-gray-600 text-gray-300 hover:border-primary hover:text-primary bg-gray-800"
                >
                  Limpar filtros
                </Button>
                <Button 
                  onClick={onMobileFilterClose}
                  className="bg-primary hover:bg-primary/90"
                >
                  Aplicar
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FilterBar;
