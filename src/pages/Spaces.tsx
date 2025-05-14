
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SpaceCard, { SpaceProps } from '@/components/ui-custom/SpaceCard';
import FilterBar from '@/components/ui-custom/FilterBar';
import Map from '@/components/ui-custom/Map';
import { Button } from '@/components/ui/button';
import { List, MapIcon, Loader2 } from 'lucide-react';

const Spaces = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [loading, setLoading] = useState(false);

  // Dados fictícios para as vagas
  const [spaces, setSpaces] = useState<SpaceProps[]>([
    {
      id: '1',
      title: 'Estacionamento Seguro na Paulista',
      address: 'Av. Paulista, 1000 - São Paulo',
      price: 15,
      rating: 4.8,
      reviewCount: 125,
      imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop',
      distance: '300m',
      features: ['Coberto', 'Segurança 24h', 'Carregador EV'],
      available: true,
    },
    {
      id: '2',
      title: 'Vaga Residencial em Pinheiros',
      address: 'R. dos Pinheiros, 275 - São Paulo',
      price: 10,
      rating: 4.5,
      reviewCount: 87,
      imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop',
      distance: '1.2km',
      features: ['Privativo', 'Coberto'],
      available: true,
    },
    {
      id: '3',
      title: 'Estacionamento 24h Centro',
      address: 'R. 7 de Abril, 154 - São Paulo',
      price: 12,
      rating: 4.2,
      reviewCount: 63,
      imageUrl: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop',
      distance: '2.5km',
      features: ['24h', 'Segurança'],
      available: true,
    },
    {
      id: '4',
      title: 'Vaga Coberta Vila Madalena',
      address: 'R. Fradique Coutinho, 320 - São Paulo',
      price: 18,
      rating: 4.7,
      reviewCount: 42,
      imageUrl: 'https://images.unsplash.com/photo-1590674899484-13e8dc049dc9?q=80&w=1470&auto=format&fit=crop',
      distance: '3.1km',
      features: ['Coberto', 'Privativo'],
      available: true,
    },
    {
      id: '5',
      title: 'Estacionamento Shopping Anália Franco',
      address: 'Av. Regente Feijó, 1739 - São Paulo',
      price: 14,
      rating: 4.3,
      reviewCount: 78,
      imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1470&auto=format&fit=crop',
      distance: '5.7km',
      features: ['Coberto', 'Shopping', 'Segurança'],
      available: true,
    },
    {
      id: '6',
      title: 'Vaga em Condomínio Fechado',
      address: 'R. Oscar Freire, 724 - São Paulo',
      price: 20,
      rating: 4.9,
      reviewCount: 36,
      imageUrl: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1470&auto=format&fit=crop',
      distance: '1.8km',
      features: ['Condomínio', 'Segurança 24h', 'Coberto'],
      available: true,
    },
  ]);

  const handleFilterChange = (filters: any) => {
    console.log('Filtros alterados:', filters);
    // Em um cenário real, aqui faria uma chamada à API para filtrar as vagas
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'map' : 'list');
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 pb-12">
        <FilterBar onFilterChange={handleFilterChange} />
        
        <div className="container mx-auto px-4 pt-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {spaces.length} vagas disponíveis
            </h1>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={toggleViewMode}
            >
              {viewMode === 'list' ? (
                <>
                  <MapIcon className="h-4 w-4" /> Ver no mapa
                </>
              ) : (
                <>
                  <List className="h-4 w-4" /> Ver em lista
                </>
              )}
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Carregando vagas...</span>
            </div>
          ) : (
            <>
              {viewMode === 'list' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {spaces.map((space) => (
                    <SpaceCard key={space.id} space={space} />
                  ))}
                </div>
              ) : (
                <div className="h-[calc(100vh-220px)]">
                  <Map spaces={spaces} className="h-full" />
                </div>
              )}
            </>
          )}
          
          {viewMode === 'list' && spaces.length === 0 && !loading && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Nenhuma vaga encontrada</h3>
              <p className="text-gray-500">Tente ajustar seus filtros para encontrar mais opções.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Spaces;
