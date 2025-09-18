
export interface MockLocation {
  address: string;
  lat: number;
  lng: number;
}

export const mockLocations: MockLocation[] = [
  { address: 'Av. Paulista, 1000 - São Paulo', lat: -23.5613, lng: -46.6563 },
  { address: 'R. dos Pinheiros, 275 - São Paulo', lat: -23.5629, lng: -46.6944 },
  { address: 'R. 7 de Abril, 154 - São Paulo', lat: -23.5440, lng: -46.6396 },
  { address: 'R. Oscar Freire, 725 - São Paulo', lat: -23.5629, lng: -46.6731 },
  { address: 'Av. Roque Petroni Júnior, 1089 - São Paulo', lat: -23.6278, lng: -46.6975 },
  { address: 'Av. Pedro Álvares Cabral - São Paulo', lat: -23.5875, lng: -46.6577 },
  
  // Bairros
  { address: 'paulista', lat: -23.5613, lng: -46.6563 },
  { address: 'pinheiros', lat: -23.5629, lng: -46.6944 },
  { address: 'centro', lat: -23.5440, lng: -46.6396 },
  { address: 'jardins', lat: -23.5629, lng: -46.6731 },
  { address: 'morumbi', lat: -23.6278, lng: -46.6975 },
  { address: 'ibirapuera', lat: -23.5875, lng: -46.6577 },
  { address: 'itaquera', lat: -23.5456, lng: -46.4731 },
  { address: 'tatuapé', lat: -23.5406, lng: -46.5772 },
  { address: 'vila madalena', lat: -23.5544, lng: -46.6916 },
  { address: 'santana', lat: -23.5071, lng: -46.6249 },
  { address: 'liberdade', lat: -23.5583, lng: -46.6347 },
  { address: 'bela vista', lat: -23.5594, lng: -46.6528 },
  { address: 'consolação', lat: -23.5569, lng: -46.6594 },
  { address: 'higienópolis', lat: -23.5472, lng: -46.6528 },
  
  // Shopping Centers
  { address: 'Shopping Tatuapé', lat: -23.5406, lng: -46.5772 },
  { address: 'shopping tatuapé', lat: -23.5406, lng: -46.5772 },
  { address: 'tatuapé shopping', lat: -23.5406, lng: -46.5772 },
  { address: 'Shopping Iguatemi', lat: -23.5658, lng: -46.6881 },
  { address: 'shopping iguatemi', lat: -23.5658, lng: -46.6881 },
  { address: 'iguatemi', lat: -23.5658, lng: -46.6881 },
  { address: 'Shopping Eldorado', lat: -23.5658, lng: -46.6941 },
  { address: 'shopping eldorado', lat: -23.5658, lng: -46.6941 },
  { address: 'eldorado', lat: -23.5658, lng: -46.6941 },
  { address: 'Shopping Ibirapuera', lat: -23.6097, lng: -46.6519 },
  { address: 'shopping ibirapuera', lat: -23.6097, lng: -46.6519 },
  { address: 'Shopping JK Iguatemi', lat: -23.5903, lng: -46.6850 },
  { address: 'shopping jk', lat: -23.5903, lng: -46.6850 },
  { address: 'jk iguatemi', lat: -23.5903, lng: -46.6850 },
  { address: 'Shopping Morumbi', lat: -23.6278, lng: -46.6975 },
  { address: 'shopping morumbi', lat: -23.6278, lng: -46.6975 },
  { address: 'Shopping Villa-Lobos', lat: -23.5472, lng: -46.7236 },
  { address: 'shopping villa lobos', lat: -23.5472, lng: -46.7236 },
  { address: 'villa lobos', lat: -23.5472, lng: -46.7236 },
  { address: 'Shopping Anália Franco', lat: -23.5594, lng: -46.5658 },
  { address: 'shopping analia franco', lat: -23.5594, lng: -46.5658 },
  { address: 'analia franco', lat: -23.5594, lng: -46.5658 },
  { address: 'Shopping Metrô Itaquera', lat: -23.5385, lng: -46.4584 },
  { address: 'shopping metro itaquera', lat: -23.5385, lng: -46.4584 },
  { address: 'metro itaquera', lat: -23.5385, lng: -46.4584 },
  { address: 'Shopping Aricanduva', lat: -23.5558, lng: -46.5081 },
  { address: 'shopping aricanduva', lat: -23.5558, lng: -46.5081 },
  { address: 'aricanduva', lat: -23.5558, lng: -46.5081 },
  { address: 'Shopping Penha', lat: -23.5245, lng: -46.5012 },
  { address: 'shopping penha', lat: -23.5245, lng: -46.5012 },
  
  // Estações de Metrô
  { address: 'estação paulista', lat: -23.5613, lng: -46.6563 },
  { address: 'estação tatuapé', lat: -23.5406, lng: -46.5772 },
  { address: 'estação itaquera', lat: -23.5385, lng: -46.4584 },
  { address: 'estação sé', lat: -23.5507, lng: -46.6342 },
  { address: 'estação república', lat: -23.5440, lng: -46.6396 },
  { address: 'estação consolação', lat: -23.5569, lng: -46.6594 },
  
  // Localizações existentes para testes
  { address: 'Mogi das Cruzes', lat: -23.5224, lng: -46.1857 },
  { address: 'Centro - Mogi das Cruzes', lat: -23.5224, lng: -46.1857 },
  { address: 'Vila Mogilar - Mogi das Cruzes', lat: -23.5334, lng: -46.1864 },
  { address: 'Parque Centenário - Mogi das Cruzes', lat: -23.5195, lng: -46.1812 },
  { address: 'Supermercado Alabarce - Mogi das Cruzes', lat: -23.5360, lng: -46.1827 },
  { address: 'mogi', lat: -23.5224, lng: -46.1857 },
  { address: 'alabarce', lat: -23.5360, lng: -46.1827 },
  { address: 'parque centenário', lat: -23.5195, lng: -46.1812 },
  { address: 'Ferraz de Vasconcelos - Rua Serrana', lat: -23.5407, lng: -46.3692 },
  { address: 'rua serrana', lat: -23.5407, lng: -46.3692 },
  { address: 'ferraz', lat: -23.5407, lng: -46.3692 },
];

export const findLocation = (searchQuery: string) => {
  console.log('Procurando localização para:', searchQuery);
  
  const query = searchQuery.toLowerCase().trim();
  
  // Remove palavras comuns para melhorar a busca
  const cleanQuery = query
    .replace(/\b(shopping|estação|metro|metrô)\b/g, '')
    .trim();
  
  // Busca exata primeiro
  let location = mockLocations.find(loc => 
    loc.address.toLowerCase() === query
  );
  
  // Se não encontrou, busca por termos que contenham a consulta
  if (!location) {
    location = mockLocations.find(loc => 
      loc.address.toLowerCase().includes(query)
    );
  }
  
  // Busca por consulta limpa (sem palavras comuns)
  if (!location && cleanQuery && cleanQuery !== query) {
    location = mockLocations.find(loc => 
      loc.address.toLowerCase().includes(cleanQuery)
    );
  }
  
  // Busca mais flexível - palavras individuais
  if (!location) {
    const queryWords = query.split(/\s+/).filter(word => word.length > 2);
    location = mockLocations.find(loc => {
      const addressLower = loc.address.toLowerCase();
      return queryWords.some(word => addressLower.includes(word));
    });
  }
  
  console.log('Localização encontrada:', location);
  return location;
};
