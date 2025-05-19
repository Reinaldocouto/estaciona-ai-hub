
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  priceRange: number; // Alterado de [number, number] para number para simplificar
  features: string[];
  availability: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: 100, // Valor máximo inicial
    features: [],
    availability: true,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const featureOptions = [
    'Coberto', 
    'Seguro 24h', 
    'Carregador EV',
    'Lavagem',
    'Acessível'
  ];

  // Efeito para chamar onFilterChange sempre que os filtros mudarem
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      search: event.target.value,
    };
    setFilters(newFilters);
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature];

    const newFilters = {
      ...filters,
      features: newFeatures,
    };
    setFilters(newFilters);
  };

  const resetFilters = () => {
    const newFilters = {
      search: '',
      priceRange: 100,
      features: [],
      availability: true,
    };
    setFilters(newFilters);
    toast({
      title: "Filtros resetados",
      description: "Os filtros foram limpos com sucesso",
    });
  };

  return (
    <div className="sticky top-[72px] z-20 bg-white bg-opacity-95 backdrop-blur-md py-3 border-b">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar por endereço ou bairro"
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 rounded-lg w-full"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4" />
                  Filtrar
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-3">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Preço por hora</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">R$0</span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={filters.priceRange}
                        onChange={(e) => {
                          const newFilters = {
                            ...filters,
                            priceRange: parseInt(e.target.value),
                          };
                          setFilters(newFilters);
                        }}
                        className="flex-grow"
                      />
                      <span className="text-sm">R${filters.priceRange}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Características</h3>
                    <div className="flex flex-wrap gap-2">
                      {featureOptions.map((feature) => (
                        <Badge
                          key={feature}
                          variant={filters.features.includes(feature) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            filters.features.includes(feature) ? "bg-primary" : ""
                          }`}
                          onClick={() => toggleFeature(feature)}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Disponibilidade</h3>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="availability"
                        checked={filters.availability}
                        onChange={(e) => {
                          const newFilters = {
                            ...filters,
                            availability: e.target.checked,
                          };
                          setFilters(newFilters);
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="availability" className="text-sm">Mostrar apenas disponíveis</label>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline"
              onClick={resetFilters}
              title="Limpar filtros"
              className="px-3"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button className="bg-primary hover:bg-primary-dark">
              Buscar
            </Button>
          </div>
        </div>
        
        {/* Active filters display */}
        {filters.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {filters.features.map((feature) => (
              <Badge
                key={feature}
                variant="secondary"
                className="bg-gray-100 text-gray-700 flex items-center gap-1 cursor-pointer"
                onClick={() => toggleFeature(feature)}
              >
                {feature} 
                <span className="font-bold">×</span>
              </Badge>
            ))}
            {filters.features.length > 0 && (
              <button
                onClick={() => {
                  const newFilters = {
                    ...filters,
                    features: [],
                  };
                  setFilters(newFilters);
                }}
                className="text-sm text-primary hover:underline"
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
