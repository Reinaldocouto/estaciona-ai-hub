
import React from 'react';
import { SpaceProps } from '@/components/ui-custom/SpaceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Check, Info, Clock } from 'lucide-react';
import DetailMap from '@/components/ui-custom/DetailMap';

interface SpaceInfoTabsProps {
  space: SpaceProps;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const SpaceInfoTabs: React.FC<SpaceInfoTabsProps> = ({ 
  space, 
  activeTab,
  setActiveTab
}) => {
  return (
    <div className="mb-8">
      <Tabs defaultValue="info" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          <TabsTrigger value="location">Localização</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="pt-6">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">Sobre esta vaga</h2>
              <p className="text-gray-600">{space.description || 'Sem descrição disponível'}</p>
            </div>

            {space.features && space.features.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Características</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                  {space.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {space.rules && space.rules.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Regras</h2>
                <ul className="space-y-2">
                  {space.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <Info className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {space.availability && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Horários de Funcionamento</h2>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="flex justify-between pr-4">
                    <span className="font-medium">Segunda-feira:</span>
                    <span>{space.availability.monday}</span>
                  </div>
                  <div className="flex justify-between pr-4">
                    <span className="font-medium">Terça-feira:</span>
                    <span>{space.availability.tuesday}</span>
                  </div>
                  <div className="flex justify-between pr-4">
                    <span className="font-medium">Quarta-feira:</span>
                    <span>{space.availability.wednesday}</span>
                  </div>
                  <div className="flex justify-between pr-4">
                    <span className="font-medium">Quinta-feira:</span>
                    <span>{space.availability.thursday}</span>
                  </div>
                  <div className="flex justify-between pr-4">
                    <span className="font-medium">Sexta-feira:</span>
                    <span>{space.availability.friday}</span>
                  </div>
                  <div className="flex justify-between pr-4">
                    <span className="font-medium">Sábado:</span>
                    <span>{space.availability.saturday}</span>
                  </div>
                  <div className="flex justify-between pr-4">
                    <span className="font-medium">Domingo:</span>
                    <span>{space.availability.sunday}</span>
                  </div>
                </div>
              </div>
            )}

            {space.owner && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Proprietário</h2>
                <div className="flex items-center">
                  <img 
                    src={space.owner.image}
                    alt={space.owner.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{space.owner.name}</h3>
                    <p className="text-gray-500">Membro desde {space.owner.joined}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{space.owner.rating}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-500">Responde em {space.owner.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="pt-6">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold">Avaliações</h2>
            <div className="ml-auto flex items-center">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-bold">{space.rating}</span>
              <span className="text-gray-500 ml-1">({space.reviewCount} avaliações)</span>
            </div>
          </div>

          <div className="space-y-6">
            {space.reviews && space.reviews.length > 0 ? (
              space.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center mb-3">
                    <img
                      src={review.image}
                      alt={review.user}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-semibold">{review.user}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{review.date}</span>
                        <span className="mx-2">•</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Esta vaga ainda não possui avaliações.</p>
            )}
            
            {space.reviews && space.reviews.length > 0 && (
              <Button variant="outline" className="w-full">
                Ver todas as avaliações
              </Button>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="location" className="pt-6">
          <h2 className="text-xl font-semibold mb-3">Localização</h2>
          <DetailMap space={space} className="mb-4" />
          <p className="text-gray-600 mb-4">
            {space.address}
          </p>
          {space.location?.nearbyPlaces && space.location.nearbyPlaces.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Locais próximos:</h3>
              <ul className="space-y-2">
                {space.location.nearbyPlaces.map((place, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpaceInfoTabs;
