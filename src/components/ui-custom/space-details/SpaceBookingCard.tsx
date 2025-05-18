
import React, { useState, useEffect } from 'react';
import { SpaceProps } from '@/components/ui-custom/SpaceCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, MessageCircle, Shield } from 'lucide-react';

interface SpaceBookingCardProps {
  space: SpaceProps;
}

const SpaceBookingCard: React.FC<SpaceBookingCardProps> = ({ space }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('10:00');
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Calcular o preço total com base na duração
    const start = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    
    const hourlyPrice = space.priceHour || space.price;
    setTotalPrice(hourlyPrice * durationHours);
  }, [startTime, endTime, space.priceHour, space.price]);

  return (
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
  );
};

export default SpaceBookingCard;
