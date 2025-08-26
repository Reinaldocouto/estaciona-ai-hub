from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import math
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="ML Ranking Service", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class VagaCandidate(BaseModel):
    id: str
    lat: float
    lng: float
    preco_hora: float
    bairro: str
    cidade: str
    rating: float
    recursos: List[str] = []

class RankRequest(BaseModel):
    user_lat: float
    user_lng: float
    radius_km: float = Field(default=3, ge=0.1, le=50)
    peso_preco: float = Field(default=0.6, ge=0.0, le=1.0)
    peso_dist: float = Field(default=0.4, ge=0.0, le=1.0)
    p5: float
    p95: float
    p25: Optional[float] = None
    recursos_desejados: List[str] = []
    candidates: List[VagaCandidate]

class RankedItem(BaseModel):
    id: str
    dist_km: float
    preco_hora: float
    score: float
    badges: List[str] = []

class RankResponse(BaseModel):
    items: List[RankedItem]

# Utils
def haversine_distance(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Calcula distância usando fórmula de Haversine"""
    R = 6371  # Raio da Terra em km
    
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    
    a = (math.sin(dlat/2) * math.sin(dlat/2) + 
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * 
         math.sin(dlng/2) * math.sin(dlng/2))
    
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    
    return R * c

def clamp(value: float, min_val: float, max_val: float) -> float:
    """Limita valor entre min e max"""
    return max(min_val, min(value, max_val))

# Endpoints
@app.get("/")
async def root():
    return {"message": "ML Ranking Service", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/rank", response_model=RankResponse)
async def rank_vagas(request: RankRequest):
    """Ranqueia vagas por score de custo × proximidade"""
    
    logger.info(f"🤖 Ranking {len(request.candidates)} candidates")
    logger.info(f"📍 User: ({request.user_lat}, {request.user_lng})")
    logger.info(f"⚖️ Pesos: preço={request.peso_preco}, dist={request.peso_dist}")
    
    try:
        ranked_items = []
        
        for candidate in request.candidates:
            # Calcular distância
            dist_km = haversine_distance(
                request.user_lat, request.user_lng,
                candidate.lat, candidate.lng
            )
            
            # Filtrar por radius_km
            if dist_km > request.radius_km:
                continue
            
            # Normalizar distância (0-1)
            dist_norm = clamp(dist_km / request.radius_km, 0, 1)
            
            # Normalizar preço (0-1)
            price_range = max(request.p95 - request.p5, 1e-6)  # Evitar divisão por zero
            price_norm = clamp((candidate.preco_hora - request.p5) / price_range, 0, 1)
            
            # Calcular score base
            cost_component = request.peso_preco * price_norm
            dist_component = request.peso_dist * dist_norm
            score = 0.5 * cost_component + 0.5 * dist_component
            
            # Aplicar bônus
            badges = []
            
            # Bônus: melhor preço na área (p25)
            if request.p25 and candidate.preco_hora <= request.p25:
                score *= 0.95
                badges.append("melhor preço na área")
            
            # Bônus: contém recursos desejados
            if request.recursos_desejados:
                recursos_match = set(candidate.recursos) & set(request.recursos_desejados)
                if len(recursos_match) == len(request.recursos_desejados):
                    score *= 0.95
                    badges.append("recursos completos")
                elif recursos_match:
                    score *= 0.98
                    badges.append("recursos parciais")
            
            # Bônus pequeno por rating
            rating_bonus = 1 - min(candidate.rating, 5) / 5 * 0.02
            score *= rating_bonus
            
            # Adicionar badges adicionais
            if dist_km <= 0.8:
                badges.append("perto de você")
            
            if candidate.preco_hora <= request.p5 * 1.1:
                badges.append("preço baixo")
            
            ranked_items.append(RankedItem(
                id=candidate.id,
                dist_km=round(dist_km, 2),
                preco_hora=candidate.preco_hora,
                score=round(score, 4),
                badges=badges
            ))
        
        # Ordenar por score (menor é melhor)
        ranked_items.sort(key=lambda x: x.score)
        
        logger.info(f"✅ Ranked {len(ranked_items)} items successfully")
        
        return RankResponse(items=ranked_items)
        
    except Exception as e:
        logger.error(f"❌ Error ranking vagas: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error ranking vagas: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)