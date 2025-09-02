
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SpaceProps } from '@/components/ui-custom/SpaceCard';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  InfoIcon, 
  Star, 
  MapPin,
  Car,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import LocationMap from '@/components/maps/LocationMap';

interface SpaceInfoTabsProps {
  space: SpaceProps;
  activeTab?: string;
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
}

const SpaceInfoTabs: React.FC<SpaceInfoTabsProps> = ({ space, activeTab = "details", setActiveTab }) => {
  const handleTabChange = (value: string) => {
    if (setActiveTab) {
      setActiveTab(value);
    }
  };

  return (
    <Tabs 
      defaultValue="details" 
      value={activeTab}
      onValueChange={handleTabChange}
      className="mt-6"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">
          <InfoIcon className="mr-2 h-4 w-4" />
          Detalhes
        </TabsTrigger>
        <TabsTrigger value="reviews">
          <Star className="mr-2 h-4 w-4" />
          Avaliações
        </TabsTrigger>
        <TabsTrigger value="location">
          <MapPin className="mr-2 h-4 w-4" />
          Localização
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="p-4 mt-4">
        <div className="space-y-4">
          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Sobre esta vaga</h3>
            <p className="text-gray-700">
              {space.description || "Esta vaga de estacionamento está situada em uma localização privilegiada, oferecendo fácil acesso e ótima segurança."}
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Características</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" />
                <span className="text-gray-800">Vaga coberta</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-gray-800">Monitoramento 24h</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-gray-800">Fácil acesso</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-gray-800">Disponível 24h</span>
              </li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Regras</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Entre em contato com o proprietário antes de chegar</li>
              <li>Respeite o horário de permanência contratado</li>
              <li>Não obstrua outras vagas ao estacionar</li>
              <li>Deixe a vaga limpa após o uso</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Horários</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-800">Segunda - Sexta:</span>
                <span className="text-gray-700">07:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-800">Sábado:</span>
                <span className="text-gray-700">08:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-800">Domingo:</span>
                <span className="text-gray-700">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-800">Feriados:</span>
                <span className="text-gray-700">09:00 - 18:00</span>
              </div>
            </div>
          </section>
        </div>
      </TabsContent>
      
      <TabsContent value="reviews" className="p-4 mt-4">
        <div className="space-y-4">
          <section className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Avaliações</h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-lg text-gray-900">{space.rating}</span>
                <span className="text-gray-600">({space.reviewCount} avaliações)</span>
              </div>
            </div>
            <Button variant="outline">Deixar avaliação</Button>
          </section>
          
          {/* Reviews List */}
          <div className="space-y-4 mt-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b pb-4 last:border-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Usuário {review}</h4>
                      <p className="text-xs text-gray-600">Abril 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-gray-800">{4 + (review % 2) / 2}</span>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">
                  Ótima vaga, limpa e segura. Fácil de encontrar e o proprietário foi muito atencioso.
                  {review === 1 ? " Recomendo!" : review === 2 ? " Voltarei outras vezes!" : " Local bem localizado e seguro."}
                </p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="ghost">Ver mais avaliações</Button>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="location" className="mt-4">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Endereço</h3>
          <p className="text-gray-700 mb-4">{space.address}</p>
          
          {/* Integrated LocationMap component */}
          {space.lat && space.lng && (
            <LocationMap
              lat={space.lat}
              lng={space.lng}
              title={space.title}
              address={space.address}
            />
          )}
          
          <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">Como chegar</h3>
          <p className="text-gray-700">
            A vaga fica a 5 minutos a pé da estação de metrô. Ao chegar no local,
            entre pelo portão principal e a vaga estará identificada com o número 42.
          </p>
          
          <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">Pontos próximos</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Shopping Center (300m)</li>
            <li>Supermercado (150m)</li>
            <li>Estação de Metrô (400m)</li>
            <li>Parque Municipal (600m)</li>
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SpaceInfoTabs;
