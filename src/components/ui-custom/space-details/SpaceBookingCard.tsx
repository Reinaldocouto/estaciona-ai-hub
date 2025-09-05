
import React, { useState, useEffect } from 'react';
import { SpaceProps } from '@/components/ui-custom/SpaceCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, MessageCircle, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface SpaceBookingCardProps {
  space: SpaceProps;
}

const SpaceBookingCard: React.FC<SpaceBookingCardProps> = ({ space }) => {
  const { user, isPremium } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('10:00');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isBooking, setIsBooking] = useState<boolean>(false);

  useEffect(() => {
    // Calcular o preço total com base na duração
    const start = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    
    const hourlyPrice = space.priceHour || space.price;
    setTotalPrice(hourlyPrice * durationHours);
  }, [startTime, endTime, space.priceHour, space.price]);

  const handleReservation = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para fazer uma reserva.",
        variant: "destructive",
      });
      return;
    }

    if (endTime <= startTime) {
      toast({
        title: "Horário inválido",
        description: "O horário de saída deve ser posterior ao horário de entrada.",
        variant: "destructive",
      });
      return;
    }

    // Se não for premium, redirecionar para pagamento do adiantamento
    if (!isPremium) {
      handleAdvancePayment();
      return;
    }

    // Se for premium, fazer reserva direta
    await createReservation();
  };

  const handleAdvancePayment = async () => {
    setIsBooking(true);
    
    try {
      const finalPrice = totalPrice * 1.1; // Incluindo taxa de serviço
      const advanceAmount = finalPrice * 0.4; // 40% de adiantamento

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          amount: Math.round(advanceAmount * 100), // Convert to cents
          description: `Adiantamento para reserva - ${space.title}`,
          metadata: {
            type: 'advance_payment',
            space_id: space.id,
            selected_date: selectedDate,
            start_time: startTime,
            end_time: endTime,
            total_price: finalPrice
          }
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível processar o pagamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const createReservation = async () => {
    setIsBooking(true);

    try {
      const startDateTime = new Date(`${selectedDate}T${startTime}:00`);
      const endDateTime = new Date(`${selectedDate}T${endTime}:00`);
      const finalPrice = totalPrice * 1.1; // Incluindo taxa de serviço

      const { error } = await supabase
        .from('reservas')
        .insert({
          user_id: user.id,
          vaga_id: space.id,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
          total_price: finalPrice,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Reserva confirmada!",
        description: `Sua reserva foi criada para ${selectedDate} das ${startTime} às ${endTime}.`,
        variant: "default",
      });

    } catch (error) {
      console.error('Erro ao fazer reserva:', error);
      toast({
        title: "Erro na reserva",
        description: "Não foi possível criar sua reserva. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Card className="sticky top-24 shadow-lg rounded-xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold text-gray-900">
            R$ {space.priceHour ? space.priceHour.toFixed(2) : space.price.toFixed(2)}
            <span className="text-gray-600 text-sm font-normal">/hora</span>
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-bold text-gray-900">{space.rating}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Data</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Check-in</label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Check-out</label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <Button 
            className="w-full bg-primary hover:bg-primary-dark" 
            onClick={handleReservation}
            disabled={isBooking}
          >
            {isBooking ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : isPremium ? (
              'Reservar agora'
            ) : (
              `Pagar adiantamento R$ ${((totalPrice * 1.1) * 0.4).toFixed(2)}`
            )}
          </Button>
          <Button variant="outline" className="w-full">
            <MessageCircle className="w-4 h-4 mr-2" />
            Falar com o proprietário
          </Button>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-gray-900">
              <span>
                R$ {(space.priceHour || space.price).toFixed(2)} x {(totalPrice / (space.priceHour || space.price)).toFixed(1)} horas
              </span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-900">
              <span>Taxa de serviço</span>
              <span>R$ {(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 font-semibold flex justify-between text-gray-900">
              <span>Total</span>
              <span>R$ {(totalPrice * 1.1).toFixed(2)}</span>
            </div>
            {!isPremium && (
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                <div className="flex justify-between text-orange-800 text-sm">
                  <span>Adiantamento (40%)</span>
                  <span className="font-semibold">R$ {((totalPrice * 1.1) * 0.4).toFixed(2)}</span>
                </div>
                <p className="text-xs text-orange-600 mt-1">
                  Usuários premium não pagam adiantamento
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm">
          <div className="flex">
            <Shield className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
            <p className="text-gray-800">Pagamento seguro e garantido com proteção ao consumidor.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceBookingCard;
