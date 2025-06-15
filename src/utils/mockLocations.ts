
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
  { address: 'paulista', lat: -23.5613, lng: -46.6563 },
  { address: 'pinheiros', lat: -23.5629, lng: -46.6944 },
  { address: 'centro', lat: -23.5440, lng: -46.6396 },
  { address: 'jardins', lat: -23.5629, lng: -46.6731 },
  { address: 'morumbi', lat: -23.6278, lng: -46.6975 },
  { address: 'ibirapuera', lat: -23.5875, lng: -46.6577 },
];

export const findLocation = (searchQuery: string) => {
  console.log('Procurando localização para:', searchQuery);
  
  const query = searchQuery.toLowerCase().trim();
  
  // Busca exata primeiro
  let location = mockLocations.find(loc => 
    loc.address.toLowerCase() === query
  );
  
  // Se não encontrou, busca parcial
  if (!location) {
    location = mockLocations.find(loc => 
      loc.address.toLowerCase().includes(query) || 
      query.includes(loc.address.toLowerCase())
    );
  }
  
  console.log('Localização encontrada:', location);
  return location;
};
