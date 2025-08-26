import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Car } from 'lucide-react';
import { IAVaga } from '@/hooks/useIARecommendations';

interface SpaceCardIAProps {
  vaga: IAVaga;
  vagaDetails?: {
    titulo: string;
    endereco: string;
    image_url: string;
    rating?: number;
    recursos?: string[];
  };
  onClick?: () => void;
}

const SpaceCardIA: React.FC<SpaceCardIAProps> = ({ 
  vaga, 
  vagaDetails,
  onClick 
}) => {
  const formatScore = (score: number) => {
    return (score * 100).toFixed(0);
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'melhor preço na área':
        return 'default';
      case 'perto de você':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Imagem */}
        <div className="aspect-video mb-3 bg-muted rounded-lg overflow-hidden">
          {vagaDetails?.image_url ? (
            <img
              src={vagaDetails.image_url}
              alt={vagaDetails.titulo || 'Vaga de estacionamento'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Car className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Header com título e score */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-sm line-clamp-1">
            {vagaDetails?.titulo || `Vaga ${vaga.vaga_id.slice(0, 8)}`}
          </h3>
          <div className="text-right ml-2">
            <div className="text-xs text-muted-foreground">Score IA</div>
            <div className="text-sm font-bold text-primary">
              {formatScore(vaga.score)}
            </div>
          </div>
        </div>

        {/* Endereço */}
        {vagaDetails?.endereco && (
          <div className="flex items-center gap-1 mb-2">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground line-clamp-1">
              {vagaDetails.endereco}
            </span>
          </div>
        )}

        {/* Informações principais */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="text-xs text-muted-foreground">Preço/hora</div>
            <div className="font-semibold text-green-600">
              R$ {vaga.preco_hora.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Distância</div>
            <div className="font-medium">
              {vaga.dist_km.toFixed(1)} km
            </div>
          </div>
        </div>

        {/* Rating */}
        {vagaDetails?.rating && (
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">{vagaDetails.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Badges da IA */}
        {vaga.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {vaga.badges.map((badge, index) => (
              <Badge
                key={index}
                variant={getBadgeVariant(badge)}
                className="text-xs px-2 py-0.5"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {/* Recursos */}
        {vagaDetails?.recursos && vagaDetails.recursos.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {vagaDetails.recursos.slice(0, 3).map((recurso, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {recurso}
              </Badge>
            ))}
            {vagaDetails.recursos.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{vagaDetails.recursos.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpaceCardIA;