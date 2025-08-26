# ML Ranking Service

Microserviço Python para ranqueamento inteligente de vagas por custo × proximidade.

## Setup Local

```bash
# Instalar dependências
pip install -r requirements.txt

# Rodar o serviço
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API

### POST /rank

Ranqueia vagas por score de custo × proximidade.

**Request:**
```json
{
  "user_lat": -23.56,
  "user_lng": -46.64,
  "radius_km": 3,
  "peso_preco": 0.6,
  "peso_dist": 0.4,
  "p5": 5.0,
  "p95": 15.0,
  "p25": 8.0,
  "recursos_desejados": ["coberta","seguranca"],
  "candidates": [
    {
      "id": "uuid",
      "lat": -23.57,
      "lng": -46.65,
      "preco_hora": 7.5,
      "bairro": "Bela Vista",
      "cidade": "São Paulo",
      "rating": 4.6,
      "recursos": ["coberta","vigilancia"]
    }
  ]
}
```

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "dist_km": 1.24,
      "preco_hora": 7.5,
      "score": 0.3123,
      "badges": ["melhor preço na área", "perto de você"]
    }
  ]
}
```

## Docker

```bash
# Build
docker build -t ml-ranking-service .

# Run
docker run -p 8000:8000 ml-ranking-service
```

## Deploy

Configure a variável `ML_RANK_URL` no Supabase apontando para onde este serviço está rodando.

Exemplo: `https://ml-ranking-service.herokuapp.com`