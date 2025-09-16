
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Car, Clock, Shield, Star, Zap, Crown } from 'lucide-react';
import SpaceCard, { SpaceProps } from '@/components/ui-custom/SpaceCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/search/SearchBar';
import SmartMatchButton from '@/components/search/SmartMatchButton';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isPremium } = useAuth();

  // Dados fictícios para as vagas em destaque - agora com discount_premium
  const featuredSpaces: SpaceProps[] = [
    {
      id: '1',
      title: 'Estacionamento Seguro na Paulista',
      address: 'Av. Paulista, 1000 - São Paulo',
      price: 15,
      rating: 4.8,
      reviewCount: 125,
      imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop',
      features: ['Coberto', 'Segurança 24h', 'Carregador EV'],
      available: true,
      discount_premium: true,
    },
    {
      id: '2',
      title: 'Vaga Residencial em Pinheiros',
      address: 'R. dos Pinheiros, 275 - São Paulo',
      price: 10,
      rating: 4.5,
      reviewCount: 87,
      imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop',
      features: ['Privativo', 'Coberto'],
      available: true,
      discount_premium: false,
    },
    {
      id: '3',
      title: 'Estacionamento 24h Centro',
      address: 'R. 7 de Abril, 154 - São Paulo',
      price: 12,
      rating: 4.2,
      reviewCount: 63,
      imageUrl: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop',
      features: ['24h', 'Segurança'],
      available: true,
      discount_premium: false,
    },
    {
      id: '6',
      title: 'Vaga Privativa Jardins',
      address: 'R. Oscar Freire, 725 - São Paulo',
      price: 25,
      rating: 4.9,
      reviewCount: 36,
      imageUrl: 'https://images.unsplash.com/photo-1621819783320-147734de70f8?q=80&w=1472&auto=format&fit=crop',
      features: ['Premium', 'Segurança', 'Câmeras'],
      available: true,
      discount_premium: true,
    },
    {
      id: '9',
      title: 'Estacionamento Shopping Morumbi',
      address: 'Av. Roque Petroni Júnior, 1089 - São Paulo',
      price: 14,
      rating: 4.5,
      reviewCount: 167,
      imageUrl: 'https://images.unsplash.com/photo-1545179605-1c19deb492d2?q=80&w=1470&auto=format&fit=crop',
      features: ['Shopping', 'Segurança', 'Coberto'],
      available: true,
      discount_premium: false,
    },
    {
      id: '19',
      title: 'Estacionamento Parque Ibirapuera',
      address: 'Av. Pedro Álvares Cabral - São Paulo',
      price: 12,
      rating: 4.6,
      reviewCount: 225,
      imageUrl: 'https://images.unsplash.com/photo-1588266458641-1c30f0a654e0?q=80&w=1476&auto=format&fit=crop',
      features: ['Parque', 'Lazer', 'Segurança'],
      available: true,
      discount_premium: true,
    },
  ];

  // SmartMatch: Sort spaces to prioritize premium discounts for premium users
  const sortedSpaces = React.useMemo(() => {
    return [...featuredSpaces].sort((a, b) => {
      if (isPremium) {
        // Premium users see discount spaces first
        const aScore = a.discount_premium ? 1 : 0;
        const bScore = b.discount_premium ? 1 : 0;
        return bScore - aScore;
      }
      return 0; // No sorting for non-premium users
    });
  }, [featuredSpaces, isPremium]);

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1597007030739-6d2e7172ee0e?q=80&w=1470&auto=format&fit=crop"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
          
          <div className="container relative z-10 mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Encontre vagas de estacionamento<br />Fácil e Rápido
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              O jeito mais fácil de encontrar e reservar vagas de estacionamento em sua cidade
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <div className="flex-1 max-w-md">
                  <SearchBar />
                </div>
                <SmartMatchButton />
              </div>
            </div>
          </div>
        </section>
        
        {/* Como Funciona Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">Encontre</h3>
                <p className="text-gray-600">Busque vagas de estacionamento próximas ao seu destino através do mapa ou endereço.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">Reserve</h3>
                <p className="text-gray-600">Escolha o horário que você precisa e faça sua reserva em segundos.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">Estacione</h3>
                <p className="text-gray-600">Apenas siga até o local escolhido e aproveite sua vaga garantida.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Spaces Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                Vagas em Destaque
                {isPremium && <span className="text-sm text-green-600 ml-2">(Ordenação Premium ativa)</span>}
              </h2>
              <Link to="/spaces" className="text-primary hover:underline flex items-center">
                Ver todas <span className="ml-1">→</span>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Por que usar o Estaciona Aí</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Segurança</h3>
                <p className="text-gray-400">Todas as vagas são verificadas e os pagamentos protegidos.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <Zap className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Praticidade</h3>
                <p className="text-gray-400">Reserve em segundos e tenha sua vaga garantida.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <Star className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Avaliações</h3>
                <p className="text-gray-400">Confira experiências reais de outros usuários antes de reservar.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <MapPin className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Localização</h3>
                <p className="text-gray-400">Encontre vagas perto de qualquer lugar da cidade.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Tem uma vaga ociosa?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Transforme seu espaço vazio em renda extra. Anuncie sua vaga no Estaciona Aí e comece a ganhar.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/rent-out-spot">Anunciar minha vaga</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
