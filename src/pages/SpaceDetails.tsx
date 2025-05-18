
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  MapPin, Star, Shield, Calendar, Clock, Info, Car, ChevronRight,
  CreditCard, MessageCircle, Check, X, AlertCircle, Loader2
} from 'lucide-react';
import DetailMap from '@/components/ui-custom/DetailMap';
import { fetchSpace } from '@/api/spaces';

const SpaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('10:00');
  const [activeTab, setActiveTab] = useState<string>('info');

  const { data: space, isLoading, error } = useQuery({
    queryKey: ['space', id],
    queryFn: () => fetchSpace(id as string),
    enabled: !!id,
    retry: 1,
  });

  const calculateTotalPrice = () => {
    if (!space?.priceHour) return 0;
    
    // Cálculo simplificado da duração em horas
    const start = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    
    return space.priceHour * durationHours;
  };

  const totalPrice = calculateTotalPrice();

  // Loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pb-12 pt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-medium">Carregando informações da vaga...</h2>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Error state
  if (error || !space) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pb-12 pt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-xl font-bold mb-4">Vaga não encontrada</h2>
              <p className="text-gray-500 mb-6">
                Não foi possível encontrar os detalhes desta vaga. Por favor, tente novamente mais tarde.
              </p>
              <Button onClick={() => navigate('/spaces')}>
                Voltar para pesquisa
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 pb-12">
        {/* Image Gallery */}
        <div className="relative w-full h-[400px] bg-gray-200">
          <div className="grid grid-cols-3 h-full gap-1">
            {space.images && space.images.length > 0 ? (
              space.images.map((image, index) => (
                <div
                  key={index}
                  className={`${index === 0 ? 'col-span-2 row-span-2' : ''} overflow-hidden`}
                >
                  <img
                    src={image}
                    alt={`${space.title} - imagem ${index + 1}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 flex items-center justify-center">
                <p className="text-gray-500">Sem imagens disponíveis</p>
              </div>
            )}
          </div>
          {space.images && space.images.length > 0 && (
            <Button
              variant="outline"
              className="absolute bottom-4 right-4 bg-white"
            >
              Ver todas as fotos
            </Button>
          )}
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{space.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{space.address}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-bold">{space.rating}</span>
                  <span className="text-gray-500 ml-1">({space.reviewCount})</span>
                </div>
              </div>

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
            </div>

            {/* Booking Card */}
            <div>
              <Card className="sticky top-24 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-2xl font-bold">
                      R$ {space.priceHour ? space.priceHour.toFixed(2) : space.price.toFixed(2)}
                      <span className="text-gray-500 text-sm font-normal">/hora</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-bold">{space.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Data</label>
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Check-in</label>
                        <Input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Check-out</label>
                        <Input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary-dark">
                      Reservar agora
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Falar com o proprietário
                    </Button>

                    <div className="mt-6 space-y-4">
                      <div className="flex justify-between">
                        <span>
                          R$ {(space.priceHour || space.price).toFixed(2)} x {(totalPrice / (space.priceHour || space.price)).toFixed(1)} horas
                        </span>
                        <span>R$ {totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxa de serviço</span>
                        <span>R$ {(totalPrice * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 font-semibold flex justify-between">
                        <span>Total</span>
                        <span>R$ {(totalPrice * 1.1).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm">
                    <div className="flex">
                      <Shield className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                      <p>Pagamento seguro e garantido com proteção ao consumidor.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default SpaceDetails;
