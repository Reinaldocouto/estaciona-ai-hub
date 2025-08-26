import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface IAControlsProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  precoMin: number;
  precoMax: number;
  onPrecoChange: (min: number, max: number) => void;
  distanciaMin: number;
  distanciaMax: number;
  onDistanciaChange: (min: number, max: number) => void;
  raioKm: number;
  onRaioChange: (value: number) => void;
  recursos: string[];
  onRecursosChange: (recursos: string[]) => void;
  isLoading?: boolean;
}

const recursosDisponiveis = [
  'coberta',
  'seguranca',
  'vigilancia',
  'cameras',
  'iluminacao',
  'eletrico',
  'lavagem'
];

const IAControls: React.FC<IAControlsProps> = ({
  enabled,
  onEnabledChange,
  precoMin,
  precoMax,
  onPrecoChange,
  distanciaMin,
  distanciaMax,
  onDistanciaChange,
  raioKm,
  onRaioChange,
  recursos,
  onRecursosChange,
  isLoading = false
}) => {
  const handleRecursoToggle = (recurso: string) => {
    const newRecursos = recursos.includes(recurso)
      ? recursos.filter(r => r !== recurso)
      : [...recursos, recurso];
    onRecursosChange(newRecursos);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          IA: Custo × Proximidade
          {isLoading && <Zap className="h-4 w-4 animate-pulse text-yellow-500" />}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Toggle Principal */}
        <div className="flex items-center justify-between">
          <Label htmlFor="ia-toggle" className="text-sm font-medium">
            Ativar ranqueamento inteligente
          </Label>
          <Switch
            id="ia-toggle"
            checked={enabled}
            onCheckedChange={onEnabledChange}
            disabled={isLoading}
          />
        </div>

        {enabled && (
          <>
            {/* Raio de Busca */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Raio de busca</Label>
              <Select 
                value={raioKm.toString()} 
                onValueChange={(value) => onRaioChange(Number(value))}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 km</SelectItem>
                  <SelectItem value="2">2 km</SelectItem>
                  <SelectItem value="3">3 km</SelectItem>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ranges de Preço e Distância */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium">Preço</Label>
                  <span className="text-sm text-muted-foreground">R${precoMin} - R${precoMax}</span>
                </div>
                <Slider
                  value={[precoMin, precoMax]}
                  onValueChange={([min, max]) => onPrecoChange(min, max)}
                  max={100}
                  min={5}
                  step={5}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium">Distância</Label>
                  <span className="text-sm text-muted-foreground">{distanciaMin}km - {distanciaMax}km</span>
                </div>
                <Slider
                  value={[distanciaMin, distanciaMax]}
                  onValueChange={([min, max]) => onDistanciaChange(min, max)}
                  max={20}
                  min={1}
                  step={1}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>
            </div>

            {/* Recursos Desejados */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Recursos desejados</Label>
              <div className="flex flex-wrap gap-2">
                {recursosDisponiveis.map((recurso) => (
                  <Badge
                    key={recurso}
                    variant={recursos.includes(recurso) ? "default" : "outline"}
                    className="cursor-pointer transition-colors"
                    onClick={() => !isLoading && handleRecursoToggle(recurso)}
                  >
                    {recurso}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Indicador de Status */}
            {enabled && (
              <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
                <p>
                  🤖 IA ativa: buscando vagas em {raioKm}km • Preço: R${precoMin}-R${precoMax} • Distância: {distanciaMin}-{distanciaMax}km
                  {recursos.length > 0 && ` • Filtros: ${recursos.join(', ')}`}
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default IAControls;