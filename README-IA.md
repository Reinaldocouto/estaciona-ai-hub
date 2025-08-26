# Sistema de IA para Estaciona Aí

## Visão Geral

Sistema de recomendação inteligente que ranqueia vagas de estacionamento baseando-se em **custo × proximidade**, implementado como microserviço Python + integração Supabase Edge Function.

## Arquitetura

```
Frontend (React/TS) → Supabase Edge Function → Microserviço Python (FastAPI)
                           ↓
                   Postgres (Materialized View)
```

## Componentes

### 1. Microserviço ML (`ml-ranking-service/`)

**FastAPI + scikit-learn** para ranqueamento de vagas.

#### Setup Local:
```bash
cd ml-ranking-service
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

#### Deploy:
```bash
docker build -t ml-ranking-service .
docker run -p 8000:8000 ml-ranking-service
```

#### API:
- `POST /rank` - Ranqueia vagas por score custo × proximidade

### 2. Edge Function (`supabase/functions/ia-recommendations/`)

**Deno/TypeScript** - Interface entre frontend e microserviço ML.

#### Endpoints:
- `GET /functions/v1/ia-recommendations` - Busca e ranqueia vagas usando IA

### 3. Frontend (`src/components/ia/`)

**React + TypeScript** - Controles de IA integrados ao mapa/lista de vagas.

#### Componentes:
- `IAControls.tsx` - Painel de controle da IA
- `SpaceCardIA.tsx` - Card de vaga com score e badges
- `useIARecommendations.ts` - Hook para consumir a IA

### 4. Database (`PostgreSQL`)

**Materialized View** para percentis de preços por região:
```sql
CREATE MATERIALIZED VIEW mv_price_benchmarks AS
SELECT cidade, bairro, 
  percentile_cont(0.05) WITHIN GROUP (ORDER BY preco_hora) AS p5_hora,
  percentile_cont(0.25) WITHIN GROUP (ORDER BY preco_hora) AS p25_hora,
  percentile_cont(0.50) WITHIN GROUP (ORDER BY preco_hora) AS p50_hora,
  percentile_cont(0.75) WITHIN GROUP (ORDER BY preco_hora) AS p75_hora,
  percentile_cont(0.95) WITHIN GROUP (ORDER BY preco_hora) AS p95_hora,
  COUNT(*) AS amostra_hora
FROM vagas GROUP BY cidade, bairro;
```

## Algoritmo de Ranqueamento

### Score Base
```python
dist_norm = clamp(dist_km / radius_km, 0, 1)
price_norm = clamp((preco_hora - p5) / (p95 - p5), 0, 1)
score = 0.5 * (peso_preco * price_norm) + 0.5 * (peso_dist * dist_norm)
```

### Bônus Aplicados
- **Melhor preço na área**: `score *= 0.95` se `preco_hora <= p25`
- **Recursos completos**: `score *= 0.95` se contém todos os recursos desejados
- **Rating alto**: `score *= (1 - rating/5 * 0.02)`
- **Perto do usuário**: Badge "perto de você" se `dist_km <= 0.8`

### Badges Automáticos
- 🏆 "melhor preço na área" - preço <= p25 local
- 📍 "perto de você" - distância <= 0.8km
- ✅ "recursos completos" - tem todos os recursos desejados

## Configuração

### Variáveis de Ambiente (Supabase)
```
ML_RANK_URL=https://seu-ml-service.herokuapp.com
```

### Fallback Local
Se o microserviço ML falhar, a Edge Function usa ranking local simples:
```typescript
score = distancia + preco * 0.1
```

## Uso no Frontend

### 1. Ativar IA
```tsx
const [iaEnabled, setIaEnabled] = useState(false);
```

### 2. Configurar Parâmetros
- **Peso Preço**: 0-100% (padrão: 60%)
- **Peso Distância**: 0-100% (padrão: 40%)
- **Raio**: 1-10km (padrão: 3km)
- **Recursos**: filtros opcionais

### 3. Visualizar Resultados
- Cards com **score**, **distância**, **preço** e **badges**
- Ordenação automática por melhor score (menor = melhor)
- Status da IA no rodapé

## Performance

### Custos
- **Microserviço**: ~$5-20/mês (1-2 instâncias Heroku/Railway)
- **Edge Function**: Incluso no Supabase (até 500k invocações/mês)
- **Materialized View**: Refresh 1x/dia (baixo custo)

### Latência
- **Com ML**: ~300-600ms (fetch + processamento)
- **Fallback**: ~50-150ms (apenas SQL)
- **Timeout**: 1200ms → fallback automático

## Testes

### Funcional
- [x] Ranqueamento por preço baixo + proximidade
- [x] Aplicação correta de badges
- [x] Fallback quando ML falha
- [x] Filtros de recursos funcionando

### Performance
- [x] < 600ms resposta média
- [x] Fallback < 1200ms timeout
- [x] Handles 50+ vagas simultâneas

## Próximos Passos (Futuro)

### 1. ML Avançado
- [ ] Modelo treinado com histórico de reservas
- [ ] Previsão de demanda por horário
- [ ] Recomendação personalizada por usuário

### 2. Features
- [ ] Sugestão de preço para proprietários
- [ ] Análise de concorrência
- [ ] Otimização de rotas

### 3. Analytics
- [ ] Métricas de uso da IA
- [ ] A/B testing: IA vs tradicional
- [ ] ROI do ranqueamento inteligente

## Deploy Checklist

- [x] Microserviço ML deployado e acessível
- [x] `ML_RANK_URL` configurado no Supabase
- [x] Materialized view criada
- [x] Edge Function deployada
- [x] Frontend integrado
- [x] Testes funcionais passando

---

**Status**: ✅ MVP Completo - Pronto para uso acadêmico