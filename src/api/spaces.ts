import { SpaceProps } from '@/components/ui-custom/SpaceCard';
import { supabase } from '@/integrations/supabase/client';

// Função para calcular distância entre dois pontos usando a fórmula de Haversine
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
}

// Função para formatar distância
function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
}

export async function fetchSpace(id: string): Promise<SpaceProps> {
  // Mock data - would be replaced with a real API call in production
  // This simulates the server response based on the space id
  const mockSpaces: Record<string, SpaceProps> = {
    '1': {
      id: '1',
      title: 'Estacionamento Seguro na Paulista',
      address: 'Av. Paulista, 1000 - São Paulo, SP',
      price: 15,
      priceHour: 15,
      priceDay: 90,
      rating: 4.8,
      reviewCount: 125,
      description: 'Vaga coberta e segura em estacionamento privativo. Localizada próxima à estação Trianon-Masp do metrô. Segurança 24h, câmeras de monitoramento e seguro incluso.',
      features: ['Coberto', 'Segurança 24h', 'Seguro', 'Carregador EV', 'Lavagem'],
      imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop',
      rules: [
        'Check-in a partir das 6h00',
        'Check-out até às 22h00',
        'Não é permitido pernoitar',
        'Apresente o QR code na entrada',
      ],
      owner: {
        name: 'Carlos Silva',
        joined: 'Março de 2022',
        responseTime: '15 min',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop',
      },
      images: [
        'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590674899484-13e8dc049dc9?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1470&auto=format&fit=crop',
      ],
      reviews: [
        {
          id: '1',
          user: 'Marina Costa',
          date: '12/04/2023',
          rating: 5,
          comment: 'Ótima localização e muito fácil de acessar. Estacionamento seguro e limpo.',
          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1470&auto=format&fit=crop',
        },
        {
          id: '2',
          user: 'Pedro Gomes',
          date: '29/03/2023',
          rating: 4,
          comment: 'Bom espaço e segurança, porém o acesso poderia ser mais rápido.',
          image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop',
        },
      ],
      lat: -23.5629,
      lng: -46.6544,
      location: {
        lat: -23.5629,
        lng: -46.6544,
        nearbyPlaces: ['Estação Trianon-Masp (350m)', 'MASP (400m)', 'Parque Trianon (450m)'],
      },
      availability: {
        monday: '06:00 - 22:00',
        tuesday: '06:00 - 22:00',
        wednesday: '06:00 - 22:00',
        thursday: '06:00 - 22:00',
        friday: '06:00 - 22:00',
        saturday: '08:00 - 20:00',
        sunday: '08:00 - 18:00',
      },
      type: 'Médio',
      available: true,
      distance: '300m',
    },
    '2': {
      id: '2',
      title: 'Vaga Residencial em Pinheiros',
      address: 'R. dos Pinheiros, 275 - São Paulo',
      price: 10,
      priceHour: 10,
      priceDay: 60,
      rating: 4.5,
      reviewCount: 87,
      description: 'Vaga residencial bem localizada no bairro de Pinheiros. Acesso fácil, ambiente seguro e monitorado por câmeras.',
      features: ['Privativo', 'Coberto', 'Segurança'],
      imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1565464027194-8cfe58927857?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5651,
      lng: -46.6911,
      location: {
        lat: -23.5651,
        lng: -46.6911,
        nearbyPlaces: ['Estação Faria Lima (450m)', 'Shopping Pátio Higienópolis (800m)'],
      },
      reviews: [
        {
          id: '1',
          user: 'João Silva',
          date: '01/03/2023',
          rating: 5,
          comment: 'Excelente localização, fácil acesso.',
          image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1374&auto=format&fit=crop',
        },
      ],
      owner: {
        name: 'Ana Martins',
        joined: 'Janeiro de 2023',
        responseTime: '30 min',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop',
      },
      rules: ['Check-in flexível', 'Aviso prévio de 1h para reservas'],
      availability: {
        monday: '07:00 - 22:00',
        tuesday: '07:00 - 22:00',
        wednesday: '07:00 - 22:00',
        thursday: '07:00 - 22:00',
        friday: '07:00 - 22:00',
        saturday: '09:00 - 18:00',
        sunday: '10:00 - 16:00',
      },
      type: 'Pequeno',
      available: true,
      distance: '1.2km',
    },
    '3': {
      id: '3',
      title: 'Estacionamento 24h Centro',
      address: 'R. 7 de Abril, 154 - São Paulo',
      price: 12,
      priceHour: 12,
      priceDay: 70,
      rating: 4.2,
      reviewCount: 63,
      description: 'Estacionamento no centro de São Paulo, aberto 24 horas. Equipe de segurança presente e monitoramento por câmeras.',
      features: ['24h', 'Segurança', 'Coberto'],
      imageUrl: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621610086071-19e66c96b07c?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5469,
      lng: -46.6389,
      type: 'Médio',
      available: true,
      distance: '2.5km',
    },
    '4': {
      id: '4',
      title: 'Vaga Coberta Vila Madalena',
      address: 'R. Fradique Coutinho, 320 - São Paulo',
      price: 18,
      priceHour: 18,
      priceDay: 100,
      rating: 4.7,
      reviewCount: 42,
      description: 'Vaga premium em condomínio fechado na Vila Madalena. Espaço amplo, ideal para SUVs. Próximo a bares e restaurantes.',
      features: ['Coberto', 'Privativo', 'Lavagem'],
      imageUrl: 'https://images.unsplash.com/photo-1590674899484-13e8dc049dc9?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1590674899484-13e8dc049dc9?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5557,
      lng: -46.6859,
      type: 'SUV',
      available: true,
      distance: '3.1km',
    },
    '5': {
      id: '5',
      title: 'Estacionamento Shopping Ibirapuera',
      address: 'Av. Ibirapuera, 3103 - São Paulo',
      price: 15,
      priceHour: 15,
      priceDay: 85,
      rating: 4.4,
      reviewCount: 128,
      description: 'Vagas cobertas próximas ao Shopping Ibirapuera. Segurança 24h e fácil acesso.',
      features: ['Shopping', 'Coberto', 'Segurança 24h'],
      imageUrl: 'https://images.unsplash.com/photo-1573348722427-f453d96540be?q=80&w=1476&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1573348722427-f453d96540be?q=80&w=1476&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1597047084993-bf337e09ede0?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.6081,
      lng: -46.6676,
      type: 'Médio',
      available: true,
      distance: '4.2km',
    },
    '6': {
      id: '6',
      title: 'Vaga Privativa Jardins',
      address: 'R. Oscar Freire, 725 - São Paulo',
      price: 25,
      priceHour: 25,
      priceDay: 150,
      rating: 4.9,
      reviewCount: 36,
      description: 'Vaga exclusiva em prédio de alto padrão nos Jardins. Acesso controlado, monitoramento 24h.',
      features: ['Premium', 'Segurança', 'Câmeras'],
      imageUrl: 'https://images.unsplash.com/photo-1621819783320-147734de70f8?q=80&w=1472&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1621819783320-147734de70f8?q=80&w=1472&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5623,
      lng: -46.6691,
      type: 'Pequeno',
      available: true,
      distance: '2.8km',
    },
    '7': {
      id: '7',
      title: 'Estacionamento Aeroporto Congonhas',
      address: 'Av. Washington Luís, s/n - São Paulo',
      price: 20,
      priceHour: 20,
      priceDay: 120,
      rating: 4.3,
      reviewCount: 215,
      description: 'Estacionamento próximo ao Aeroporto de Congonhas. Ideal para viagens curtas ou longas.',
      features: ['Aeroporto', 'Segurança', '24h'],
      imageUrl: 'https://images.unsplash.com/photo-1621610086071-19e66c96b07c?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1621610086071-19e66c96b07c?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1549295264-617241ca7360?q=80&w=1471&auto=format&fit=crop',
      ],
      lat: -23.6267,
      lng: -46.6559,
      type: 'Médio',
      available: true,
      distance: '7.5km',
    },
    '8': {
      id: '8',
      title: 'Vaga Rua Vergueiro',
      address: 'R. Vergueiro, 1421 - São Paulo',
      price: 10,
      priceHour: 10,
      priceDay: 60,
      rating: 4.1,
      reviewCount: 52,
      description: 'Vaga em edifício residencial na Rua Vergueiro. Próximo ao metrô Paraíso.',
      features: ['Residencial', 'Metrô', 'Coberto'],
      imageUrl: 'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1562191326-0168279a0e1d?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5725,
      lng: -46.6382,
      type: 'Pequeno',
      available: true,
      distance: '3.8km',
    },
    '9': {
      id: '9',
      title: 'Estacionamento Shopping Morumbi',
      address: 'Av. Roque Petroni Júnior, 1089 - São Paulo',
      price: 14,
      priceHour: 14,
      priceDay: 80,
      rating: 4.5,
      reviewCount: 167,
      description: 'Vagas amplas próximas ao Shopping Morumbi. Excelente para compras.',
      features: ['Shopping', 'Segurança', 'Coberto'],
      imageUrl: 'https://images.unsplash.com/photo-1545179605-1c19deb492d2?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1545179605-1c19deb492d2?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1573348722427-f453d96540be?q=80&w=1476&auto=format&fit=crop',
      ],
      lat: -23.6228,
      lng: -46.7016,
      type: 'Médio',
      available: true,
      distance: '8.3km',
    },
    '10': {
      id: '10',
      title: 'Vaga Residencial Itaim Bibi',
      address: 'R. João Cachoeira, 512 - São Paulo',
      price: 22,
      priceHour: 22,
      priceDay: 130,
      rating: 4.8,
      reviewCount: 47,
      description: 'Vaga em condomínio fechado no Itaim Bibi. Segurança 24h e fácil acesso.',
      features: ['Privativo', 'Condomínio', 'Segurança'],
      imageUrl: 'https://images.unsplash.com/photo-1562191326-0168279a0e1d?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1562191326-0168279a0e1d?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1617973427478-95abe1838deb?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5828,
      lng: -46.6764,
      type: 'SUV',
      available: false,
      distance: '4.7km',
    },
    '11': {
      id: '11',
      title: 'Estacionamento Hospital Albert Einstein',
      address: 'Av. Albert Einstein, 627 - São Paulo',
      price: 18,
      priceHour: 18,
      priceDay: 100,
      rating: 4.2,
      reviewCount: 89,
      description: 'Vagas de fácil acesso próximas ao Hospital Albert Einstein. Ideal para visitas médicas.',
      features: ['Hospital', '24h', 'Coberto'],
      imageUrl: 'https://images.unsplash.com/photo-1549295264-617241ca7360?q=80&w=1471&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1549295264-617241ca7360?q=80&w=1471&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5999,
      lng: -46.7151,
      type: 'Médio',
      available: true,
      distance: '7.9km',
    },
    '12': {
      id: '12',
      title: 'Vaga Privativa Perdizes',
      address: 'R. Bartira, 351 - São Paulo',
      price: 15,
      priceHour: 15,
      priceDay: 85,
      rating: 4.6,
      reviewCount: 38,
      description: 'Vaga em condomínio residencial nas Perdizes. Ambiente seguro e tranquilo.',
      features: ['Residencial', 'Privativo', 'Segurança'],
      imageUrl: 'https://images.unsplash.com/photo-1617973427478-95abe1838deb?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1617973427478-95abe1838deb?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1565464027194-8cfe58927857?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5373,
      lng: -46.6784,
      type: 'Pequeno',
      available: true,
      distance: '5.1km',
    },
    '13': {
      id: '13',
      title: 'Estacionamento UNINOVE',
      address: 'R. Vergueiro, 235 - São Paulo',
      price: 8,
      priceHour: 8,
      priceDay: 45,
      rating: 3.9,
      reviewCount: 112,
      description: 'Estacionamento próximo à Universidade Nove de Julho. Ideal para estudantes.',
      features: ['Universidade', 'Econômico'],
      imageUrl: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5515,
      lng: -46.6401,
      type: 'Pequeno',
      available: true,
      distance: '1.8km',
    },
    '14': {
      id: '14',
      title: 'Vaga Shopping Eldorado',
      address: 'Av. Rebouças, 3970 - São Paulo',
      price: 15,
      priceHour: 15,
      priceDay: 85,
      rating: 4.4,
      reviewCount: 143,
      description: 'Estacionamento fácil e seguro no Shopping Eldorado. Ideal para compras e lazer.',
      features: ['Shopping', 'Coberto', 'Segurança'],
      imageUrl: 'https://images.unsplash.com/photo-1597047084993-bf337e09ede0?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1597047084993-bf337e09ede0?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1545179605-1c19deb492d2?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5744,
      lng: -46.7013,
      type: 'Médio',
      available: true,
      distance: '6.2km',
    },
    '15': {
      id: '15',
      title: 'Estacionamento Centro Cultural São Paulo',
      address: 'R. Vergueiro, 1000 - São Paulo',
      price: 12,
      priceHour: 12,
      priceDay: 70,
      rating: 4.3,
      reviewCount: 76,
      description: 'Vagas próximas ao Centro Cultural São Paulo. Ideal para eventos culturais.',
      features: ['Cultural', 'Metrô', 'Coberto'],
      imageUrl: 'https://images.unsplash.com/photo-1567613714042-9db3fd443d5c?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1567613714042-9db3fd443d5c?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5717,
      lng: -46.6395,
      type: 'Pequeno',
      available: true,
      distance: '2.9km',
    },
    '16': {
      id: '16',
      title: 'Vaga Edifício Copan',
      address: 'Av. Ipiranga, 200 - São Paulo',
      price: 16,
      priceHour: 16,
      priceDay: 95,
      rating: 4.4,
      reviewCount: 58,
      description: 'Vaga no icônico Edifício Copan, no centro de São Paulo. Ótima localização.',
      features: ['Centro', 'Histórico', 'Segurança'],
      imageUrl: 'https://images.unsplash.com/photo-1606885118474-c8bea71dd452?q=80&w=1476&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1606885118474-c8bea71dd452?q=80&w=1476&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621819783320-147734de70f8?q=80&w=1472&auto=format&fit=crop',
      ],
      lat: -23.5469,
      lng: -46.6451,
      type: 'Médio',
      available: false,
      distance: '1.5km',
    },
    '17': {
      id: '17',
      title: 'Estacionamento Estação Sé',
      address: 'Praça da Sé - São Paulo',
      price: 10,
      priceHour: 10,
      priceDay: 60,
      rating: 4.0,
      reviewCount: 195,
      description: 'Estacionamento próximo à Estação Sé do Metrô. Localização central.',
      features: ['Metrô', 'Centro', 'Econômico'],
      imageUrl: 'https://images.unsplash.com/photo-1621949541108-1b5093a4b6ec?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1621949541108-1b5093a4b6ec?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1606885118474-c8bea71dd452?q=80&w=1476&auto=format&fit=crop',
      ],
      lat: -23.5504,
      lng: -46.6333,
      type: 'Pequeno',
      available: true,
      distance: '1.0km',
    },
    '18': {
      id: '18',
      title: 'Vaga USP',
      address: 'Av. Prof. Luciano Gualberto, 315 - São Paulo',
      price: 8,
      priceHour: 8,
      priceDay: 45,
      rating: 4.1,
      reviewCount: 87,
      description: 'Vaga próxima à Universidade de São Paulo. Ideal para estudantes e professores.',
      features: ['Universidade', 'Econômico'],
      imageUrl: 'https://images.unsplash.com/photo-1594074594651-25653c7a8b25?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1594074594651-25653c7a8b25?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1562079176-6729edba39ca?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5599,
      lng: -46.7308,
      type: 'Pequeno',
      available: true,
      distance: '9.5km',
    },
    '19': {
      id: '19',
      title: 'Estacionamento Parque Ibirapuera',
      address: 'Av. Pedro Álvares Cabral - São Paulo',
      price: 12,
      priceHour: 12,
      priceDay: 65,
      rating: 4.6,
      reviewCount: 225,
      description: 'Vagas próximas ao Parque Ibirapuera. Ideal para lazer e atividades ao ar livre.',
      features: ['Parque', 'Lazer', 'Segurança'],
      imageUrl: 'https://images.unsplash.com/photo-1588266458641-1c30f0a654e0?q=80&w=1476&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1588266458641-1c30f0a654e0?q=80&w=1476&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1565464027194-8cfe58927857?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5874,
      lng: -46.6576,
      type: 'Médio',
      available: true,
      distance: '5.4km',
    },
    '20': {
      id: '20',
      title: 'Vaga Terminal Tietê',
      address: 'Av. Cruzeiro do Sul, 1800 - São Paulo',
      price: 14,
      priceHour: 14,
      priceDay: 80,
      rating: 4.2,
      reviewCount: 178,
      description: 'Estacionamento próximo ao Terminal Tietê. Ideal para viagens de ônibus.',
      features: ['Terminal', '24h', 'Segurança'],
      imageUrl: 'https://images.unsplash.com/photo-1591161555818-7b9bebdfbe14?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1591161555818-7b9bebdfbe14?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621610086071-19e66c96b07c?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5162,
      lng: -46.6252,
      type: 'Médio',
      available: true,
      distance: '6.8km',
    },
    '21': {
      id: '21',
      title: 'Estacionamento Shopping Tatuapé',
      address: 'R. Domingos Agostim, 91 - São Paulo',
      price: 13,
      priceHour: 13,
      priceDay: 75,
      rating: 4.3,
      reviewCount: 156,
      description: 'Vagas amplas no Shopping Tatuapé. Ideal para compras e lazer na zona leste.',
      features: ['Shopping', 'Coberto', 'Segurança'],
      imageUrl: 'https://images.unsplash.com/photo-1616364851747-155b0801bad1?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1616364851747-155b0801bad1?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1597047084993-bf337e09ede0?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5376,
      lng: -46.5763,
      type: 'Médio',
      available: true,
      distance: '8.2km',
    },
    '22': {
      id: '22',
      title: 'Vaga Privativa Santana',
      address: 'R. Dr. César, 530 - São Paulo',
      price: 11,
      priceHour: 11,
      priceDay: 65,
      rating: 4.4,
      reviewCount: 42,
      description: 'Vaga em condomínio residencial em Santana. Acesso fácil e seguro.',
      features: ['Residencial', 'Privativo', 'Portaria'],
      imageUrl: 'https://images.unsplash.com/photo-1577496549804-8c49d8b9397b?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1577496549804-8c49d8b9397b?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1617973427478-95abe1838deb?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5045,
      lng: -46.6361,
      type: 'Pequeno',
      available: true,
      distance: '7.1km',
    },
    '23': {
      id: '23',
      title: 'Estacionamento Mercado Municipal',
      address: 'R. da Cantareira, 306 - São Paulo',
      price: 12,
      priceHour: 12,
      priceDay: 70,
      rating: 4.0,
      reviewCount: 132,
      description: 'Estacionamento próximo ao Mercado Municipal de São Paulo. Ideal para visitas gastronômicas.',
      features: ['Centro', 'Turístico', 'Segurança'],
      imageUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=1374&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=1374&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1567613714042-9db3fd443d5c?q=80&w=1470&auto=format&fit=crop',
      ],
      lat: -23.5418,
      lng: -46.6294,
      type: 'Médio',
      available: true,
      distance: '2.2km',
    },
    '24': {
      id: '24',
      title: 'Vaga Teatro Municipal',
      address: 'Praça Ramos de Azevedo - São Paulo',
      price: 20,
      priceHour: 20,
      priceDay: 120,
      rating: 4.7,
      reviewCount: 65,
      description: 'Vaga exclusiva próxima ao Teatro Municipal. Ideal para eventos culturais no centro.',
      features: ['Cultural', 'Centro', 'VIP'],
      imageUrl: 'https://images.unsplash.com/photo-1624696388970-35eecf37d212?q=80&w=1470&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1624696388970-35eecf37d212?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621819783320-147734de70f8?q=80&w=1472&auto=format&fit=crop',
      ],
      lat: -23.5453,
      lng: -46.6388,
      type: 'SUV',
      available: true,
      distance: '1.7km',
    },
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const space = mockSpaces[id];
  
  if (!space) {
    throw new Error('Vaga não encontrada');
  }
  
  return space;
}

// Nova função para buscar vagas por proximidade integrada com Supabase
export async function fetchSpaces(lat: number, lng: number, radius: number = 10): Promise<SpaceProps[]> {
  console.log(`Buscando vagas próximas a ${lat}, ${lng} em um raio de ${radius}km`);
  
  let allSpaces: SpaceProps[] = [];
  
  try {
    // Buscar vagas do Supabase
    const { data: vagasFromDB, error } = await supabase
      .from('vagas')
      .select('*');
    
    if (error) {
      console.error('Erro ao buscar vagas do Supabase:', error);
      throw error;
    }
    
    console.log(`Encontradas ${vagasFromDB?.length || 0} vagas no banco de dados`);
    
    // Converter vagas do banco para o formato SpaceProps
    const spacesFromDB: SpaceProps[] = (vagasFromDB || []).map(vaga => ({
      id: vaga.id,
      title: vaga.titulo,
      address: vaga.endereco || `${vaga.bairro}, ${vaga.cidade}`,
      price: Number(vaga.price) || Number(vaga.preco_hora) || 10,
      rating: Number(vaga.rating) || 4.0,
      reviewCount: Math.floor(Math.random() * 200) + 20,
      imageUrl: vaga.image_url || 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop',
      features: vaga.features || vaga.recursos || ['Básico'],
      available: vaga.available !== false,
      lat: Number(vaga.lat),
      lng: Number(vaga.lng),
      type: 'Médio' as const,
      distance: '0km',
      discount_premium: vaga.discount_premium || false
    }));
    
    // Vagas mocadas originais (fallback)
    const mockSpaces: SpaceProps[] = [
      {
        id: 'mock1',
        title: 'Estacionamento Seguro na Paulista',
        address: 'Av. Paulista, 1000 - São Paulo',
        price: 15,
        rating: 4.8,
        reviewCount: 125,
        imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop',
        features: ['Coberto', 'Segurança 24h', 'Carregador EV'],
        available: true,
        lat: -23.5613,
        lng: -46.6558,
        type: 'Médio',
        distance: '0km'
      },
      {
        id: 'mock2',
        title: 'Vaga Residencial em Pinheiros',
        address: 'R. dos Pinheiros, 275 - São Paulo',
        price: 10,
        rating: 4.5,
        reviewCount: 87,
        imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop',
        features: ['Privativo', 'Coberto'],
        available: true,
        lat: -23.5651,
        lng: -46.6911,
        type: 'Pequeno',
        distance: '0km'
      }
    ];
    
    // Função para gerar vagas em cluster
    const generateCluster = (
      prefix: string,
      name: string,
      city: string,
      baseLat: number,
      baseLng: number,
      count: number
    ): SpaceProps[] => {
      const types: SpaceProps['type'][] = ['Pequeno', 'Médio', 'SUV'];
      const imgs = [
        'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590674899484-13e8dc049dc9?q=80&w=1470&auto=format&fit=crop'
      ];
      const feats = [
        ['Coberto', 'Segurança 24h'],
        ['Residencial', 'Privativo'],
        ['WIFI', 'Coberto'],
        ['Próximo ao comércio']
      ];
      return Array.from({ length: count }).map((_, i) => {
        const jitterLat = (Math.random() - 0.5) * 0.02; // ~2km
        const jitterLng = (Math.random() - 0.5) * 0.02;
        const price = 5 + Math.floor(Math.random() * 16); // 5-20
        return {
          id: `${prefix}-${String(i + 1).padStart(3, '0')}`,
          title: `Vaga ${name} #${i + 1}`,
          address: `${name}, ${city} - SP`,
          price,
          rating: +(3.8 + Math.random() * 1.2).toFixed(1),
          reviewCount: 20 + Math.floor(Math.random() * 180),
          imageUrl: imgs[i % imgs.length],
          features: feats[i % feats.length],
          available: true,
          lat: +(baseLat + jitterLat).toFixed(6),
          lng: +(baseLng + jitterLng).toFixed(6),
          type: types[i % types.length],
          distance: '0km'
        };
      });
    };

    // Adicionar vagas extras para as regiões solicitadas
    const extraSpaces: SpaceProps[] = [
      // Mogi das Cruzes – Centro
      ...generateCluster('mogi-centro', 'Centro', 'Mogi das Cruzes', -23.5224, -46.1857, 30),
      // Mogi das Cruzes – Vila Mogilar  
      ...generateCluster('mogi-mogilar', 'Vila Mogilar', 'Mogi das Cruzes', -23.5334, -46.1864, 20),
      // Mogi das Cruzes – Parque Centenário
      ...generateCluster('mogi-parque-centenario', 'Parque Centenário', 'Mogi das Cruzes', -23.5195, -46.1812, 30),
      // Mogi das Cruzes – Supermercado Alabarce (região)
      ...generateCluster('mogi-alabarce', 'Alabarce', 'Mogi das Cruzes', -23.5360, -46.1827, 20),
      // Ferraz de Vasconcelos – Rua Serrana 380 (região)
      ...generateCluster('ferraz-rua-serrana', 'Rua Serrana', 'Ferraz de Vasconcelos', -23.5407, -46.3692, 25)
    ];
    
    // Mesclar todas as vagas: banco + mockadas + extras
    allSpaces = [...spacesFromDB, ...mockSpaces, ...extraSpaces];
    console.log(`Total de vagas disponíveis: ${allSpaces.length}`);
    
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    // Em caso de erro, usar apenas dados mocados como fallback
    allSpaces = [
      {
        id: 'fallback1',
        title: 'Vaga Fallback - Centro SP',
        address: 'Centro, São Paulo - SP',
        price: 10,
        rating: 4.0,
        reviewCount: 50,
        imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop',
        features: ['Básico'],
        available: true,
        lat: -23.5505,
        lng: -46.6333,
        type: 'Médio',
        distance: '0km'
      }
    ];
  }
  
  // Simular delay da API
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Calcular distância para cada vaga e filtrar por raio
  const spacesWithDistance = allSpaces
    .filter(space => space.lat && space.lng) // Garantir que tem coordenadas
    .map(space => {
      const distance = calculateDistance(lat, lng, space.lat!, space.lng!);
      return {
        ...space,
        distance: formatDistance(distance),
        distanceKm: distance
      };
    })
    .filter(space => space.distanceKm <= radius) // Filtrar por raio
    .sort((a, b) => a.distanceKm - b.distanceKm); // Ordenar por proximidade
  
  console.log(`Encontradas ${spacesWithDistance.length} vagas em um raio de ${radius}km`);
  
  return spacesWithDistance;
}
