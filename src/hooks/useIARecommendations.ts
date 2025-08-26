import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface IAVaga {
  vaga_id: string;
  dist_km: number;
  preco_hora: number;
  score: number;
  badges: string[];
}

export interface IAParams {
  lat: number;
  lng: number;
  radius_km?: number;
  max_results?: number;
  peso_preco?: number;
  peso_dist?: number;
  recursos?: string[];
}

export interface IAResponse {
  items: IAVaga[];
}

export const useIARecommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IAVaga[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRecommendations = useCallback(async (params: IAParams) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🤖 Buscando recomendações IA:', params);
      
      // Construir query parameters
      const queryParams = new URLSearchParams({
        lat: params.lat.toString(),
        lng: params.lng.toString(),
        radius_km: (params.radius_km || 3).toString(),
        max_results: (params.max_results || 20).toString(),
        peso_preco: (params.peso_preco || 0.6).toString(),
        peso_dist: (params.peso_dist || 0.4).toString(),
      });

      if (params.recursos && params.recursos.length > 0) {
        queryParams.append('recursos', params.recursos.join(','));
      }

      // Chamar a Edge Function
      const { data: response, error: functionError } = await supabase.functions.invoke(
        'ia-recommendations',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (functionError) {
        console.error('❌ Erro na função IA:', functionError);
        throw new Error(functionError.message || 'Erro ao buscar recomendações');
      }

      if (!response || !response.items) {
        console.warn('⚠️ Resposta inválida da IA:', response);
        throw new Error('Resposta inválida do serviço de IA');
      }

      console.log(`✅ IA retornou ${response.items.length} recomendações`);
      setData(response.items);

      // Toast de sucesso
      toast({
        title: "🤖 IA Ativada",
        description: `${response.items.length} vagas ranqueadas por custo × proximidade`,
      });

      return response.items;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('❌ Erro ao buscar recomendações IA:', errorMessage);
      
      setError(errorMessage);
      setData([]);

      // Toast de erro
      toast({
        title: "Erro na IA",
        description: "Voltando para ordenação padrão por distância",
        variant: "destructive",
      });

      return [];
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const clearRecommendations = useCallback(() => {
    setData([]);
    setError(null);
  }, []);

  return {
    isLoading,
    data,
    error,
    fetchRecommendations,
    clearRecommendations,
  };
};