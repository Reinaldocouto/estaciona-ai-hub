import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VagaCandidate {
  id: string;
  lat: number;
  lng: number;
  preco_hora: number;
  bairro: string;
  cidade: string;
  rating: number;
  recursos: string[];
}

interface RankRequest {
  user_lat: number;
  user_lng: number;
  radius_km: number;
  peso_preco: number;
  peso_dist: number;
  p5: number;
  p95: number;
  p25?: number;
  recursos_desejados: string[];
  candidates: VagaCandidate[];
}

interface RankResponse {
  items: Array<{
    id: string;
    dist_km: number;
    preco_hora: number;
    score: number;
    badges: string[];
  }>;
}

// Função Haversine para cálculo de distância
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Fallback local quando ML service falha
function localFallbackRanking(candidates: VagaCandidate[], userLat: number, userLng: number): RankResponse {
  console.log('🔄 Using local fallback ranking');
  
  const rankedItems = candidates
    .map(candidate => {
      const dist_km = haversineDistance(userLat, userLng, candidate.lat, candidate.lng);
      return {
        id: candidate.id,
        dist_km: Number(dist_km.toFixed(2)),
        preco_hora: candidate.preco_hora,
        score: dist_km + candidate.preco_hora * 0.1, // Score simples: distância + preço normalizado
        badges: candidate.preco_hora <= 10 ? ['preço baixo'] : []
      };
    })
    .sort((a, b) => a.score - b.score);

  return { items: rankedItems };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🤖 IA Recommendations function started');
    
    // Criar cliente Supabase com service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const mlRankUrl = Deno.env.get('ML_RANK_URL');
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse query parameters
    const url = new URL(req.url);
    const lat = parseFloat(url.searchParams.get('lat') || '0');
    const lng = parseFloat(url.searchParams.get('lng') || '0');
    const radius_km = parseFloat(url.searchParams.get('radius_km') || '3');
    const max_results = parseInt(url.searchParams.get('max_results') || '20');
    const peso_preco = parseFloat(url.searchParams.get('peso_preco') || '0.6');
    const peso_dist = parseFloat(url.searchParams.get('peso_dist') || '0.4');
    const recursos_param = url.searchParams.get('recursos') || '';
    const recursos_desejados = recursos_param ? recursos_param.split(',').map(r => r.trim()) : [];

    console.log(`📍 Buscando vagas: lat=${lat}, lng=${lng}, radius=${radius_km}km`);

    // Buscar vagas candidatas usando Haversine em SQL
    const { data: vagas, error: vagasError } = await supabase
      .from('vagas')
      .select('id, lat, lng, preco_hora, bairro, cidade, rating, recursos')
      .not('lat', 'is', null)
      .not('lng', 'is', null)
      .not('preco_hora', 'is', null)
      .eq('available', true)
      .limit(200);

    if (vagasError) {
      console.error('❌ Erro ao buscar vagas:', vagasError);
      throw new Error(`Erro ao buscar vagas: ${vagasError.message}`);
    }

    if (!vagas || vagas.length === 0) {
      console.log('⚠️ Nenhuma vaga encontrada');
      return new Response(JSON.stringify({ items: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Filtrar por distância e preparar candidatos
    const candidates: VagaCandidate[] = vagas
      .map(vaga => ({
        ...vaga,
        dist_km: haversineDistance(lat, lng, vaga.lat, vaga.lng)
      }))
      .filter(vaga => vaga.dist_km <= radius_km)
      .map(({ dist_km, ...vaga }) => vaga);

    console.log(`🎯 ${candidates.length} vagas dentro do raio de ${radius_km}km`);

    if (candidates.length === 0) {
      return new Response(JSON.stringify({ items: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Buscar percentis de preços (fallback para valores padrão se não houver dados)
    const { data: benchmarks } = await supabase
      .from('mv_price_benchmarks')
      .select('p5_hora, p25_hora, p50_hora, p75_hora, p95_hora')
      .limit(1)
      .maybeSingle();

    const precos = candidates.map(c => c.preco_hora).sort((a, b) => a - b);
    const p5 = benchmarks?.p5_hora || precos[Math.floor(precos.length * 0.05)] || precos[0] || 5;
    const p25 = benchmarks?.p25_hora || precos[Math.floor(precos.length * 0.25)] || precos[0] || 8;
    const p95 = benchmarks?.p95_hora || precos[Math.floor(precos.length * 0.95)] || precos[precos.length - 1] || 20;

    console.log(`📊 Percentis de preço: p5=${p5}, p25=${p25}, p95=${p95}`);

    // Tentar chamar o microserviço ML ou usar fallback
    let rankResponse: RankResponse;

    if (mlRankUrl) {
      try {
        console.log(`🔗 Chamando ML service: ${mlRankUrl}`);
        
        const mlPayload: RankRequest = {
          user_lat: lat,
          user_lng: lng,
          radius_km,
          peso_preco,
          peso_dist,
          p5,
          p95,
          p25,
          recursos_desejados,
          candidates
        };

        const mlResponse = await fetch(`${mlRankUrl}/rank`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mlPayload),
        });

        if (!mlResponse.ok) {
          throw new Error(`ML service error: ${mlResponse.status}`);
        }

        rankResponse = await mlResponse.json();
        console.log(`✅ ML service retornou ${rankResponse.items.length} itens`);
        
      } catch (error) {
        console.error('⚠️ ML service falhou, usando fallback:', error);
        rankResponse = localFallbackRanking(candidates, lat, lng);
      }
    } else {
      console.log('⚠️ ML_RANK_URL não configurado, usando fallback');
      rankResponse = localFallbackRanking(candidates, lat, lng);
    }

    // Limitar resultados e adicionar badges
    const finalItems = rankResponse.items
      .slice(0, max_results)
      .map(item => ({
        ...item,
        vaga_id: item.id,
        badges: [
          ...(item.badges || []),
          ...(item.preco_hora <= p25 ? ['melhor preço na área'] : []),
          ...(item.dist_km <= 0.8 ? ['perto de você'] : [])
        ]
      }));

    console.log(`🎉 Retornando ${finalItems.length} vagas ranqueadas`);

    return new Response(JSON.stringify({ items: finalItems }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Erro na função ia-recommendations:', error);
    return new Response(JSON.stringify({ 
      error: 'Erro interno do servidor',
      message: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
