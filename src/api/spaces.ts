
import { SpaceProps } from '@/components/ui-custom/SpaceCard';

export async function fetchSpace(id: string): Promise<SpaceProps> {
  // Mock data - would be replaced with a real API call in production
  // This simulates the server response based on the space id
  const mockSpaces = {
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
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const space = mockSpaces[id as keyof typeof mockSpaces];
  
  if (!space) {
    throw new Error('Vaga não encontrada');
  }
  
  return space;
}
