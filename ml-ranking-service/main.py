from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import math
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="ML Ranking Service - Algoritmo Refinado", version="2.0.0")

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

# Utils - Algoritmo Refinado Conforme Especificação
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

def normalize_price(preco: float, p_min: float, p_max: float) -> float:
    """Normaliza preço conforme especificação: (preco - P_min) / (P_max - P_min)"""
    if p_max == p_min:
        return 0.0
    return max(0.0, min(1.0, (preco - p_min) / (p_max - p_min)))

def normalize_distance(dist: float, d_min: float, d_max: float) -> float:
    """Normaliza distância conforme especificação: (dist - D_min) / (D_max - D_min)"""
    if d_max == d_min:
        return 0.0
    return max(0.0, min(1.0, (dist - d_min) / (d_max - d_min)))

def calculate_score(p_norm: float, d_norm: float, peso_preco: float, peso_dist: float) -> float:
    """Calcula score conforme especificação: peso_preco * (1 - p_norm) + peso_dist * (1 - d_norm)"""
    return peso_preco * (1 - p_norm) + peso_dist * (1 - d_norm)

def apply_bonuses_penalties(score: float, candidate: VagaCandidate, dist_km: float, 
                          p25: Optional[float], recursos_desejados: List[str]) -> tuple[float, List[str]]:
    """Aplica bônus e penalidades conforme especificação"""
    badges = []
    
    # Bônus "melhor preço da área": +0.03 se preço ≤ percentil 25 (p25)
    if p25 and candidate.preco_hora <= p25:
        score += 0.03
        badges.append("melhor preço na área")
    
    # Bônus de proximidade: +0.02 se distância ≤ 300m (0.3km)
    if dist_km <= 0.3:
        score += 0.02
        badges.append("perto de você")
    elif dist_km <= 0.8:
        badges.append("próximo")
    
    # Bônus de qualidade: +0.01 se rating ≥ 4.5
    if candidate.rating >= 4.5:
        score += 0.01
        badges.append("alta qualidade")
    
    # Bônus recursos desejados
    if recursos_desejados:
        recursos_match = set(candidate.recursos) & set(recursos_desejados)
        if len(recursos_match) == len(recursos_desejados):
            score += 0.02
            badges.append("recursos completos")
        elif recursos_match:
            score += 0.01
            badges.append("recursos parciais")
    
    # Badges adicionais (sem bônus de score)
    if candidate.preco_hora <= (p25 or 0) * 1.2:
        badges.append("preço baixo")
    
    # Garantir que o score final fique entre 0 e 1
    score = max(0.0, min(1.0, score))
    
    return score, badges

def tie_breaker_key(item: RankedItem) -> tuple:
    """Critérios de desempate conforme especificação:
    1. Menor distância absoluta
    2. Menor preço absoluto  
    3. Maior rating (simulado)
    4. ID crescente (determinístico)
    """
    return (
        item.dist_km,           # Menor distância
        item.preco_hora,        # Menor preço
        -4.0,                   # Maior rating (simulado como -rating para ordem crescente)
        item.id                 # ID determinístico
    )

# Endpoints
@app.get("/")
async def root():
    return {"message": "ML Ranking Service - Algoritmo Refinado", "status": "running", "version": "2.0.0"}

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "ml-ranking-service", "algorithm": "refined-60-40"}

@app.post("/rank", response_model=RankResponse)
async def rank_vagas(request: RankRequest):
    """
    Ranqueia vagas usando algoritmo refinado 60% preço / 40% distância
    Implementa normalização, bônus/penalidades e critérios de desempate conforme especificação
    """
    
    logger.info(f"🤖 Ranking {len(request.candidates)} candidates com algoritmo refinado")
    logger.info(f"📍 User: ({request.user_lat}, {request.user_lng})")
    logger.info(f"⚖️ Pesos: preço={request.peso_preco}, distância={request.peso_dist}")
    logger.info(f"📊 Percentis: p5={request.p5}, p25={request.p25}, p95={request.p95}")
    
    try:
        # Passo 1: Filtrar candidatos elegíveis e calcular distâncias
        eligible_candidates = []
        
        for candidate in request.candidates:
            dist_km = haversine_distance(
                request.user_lat, request.user_lng,
                candidate.lat, candidate.lng
            )
            
            # Elegibilidade: dentro do raio máximo
            if dist_km <= request.radius_km:
                eligible_candidates.append({
                    'candidate': candidate,
                    'dist_km': dist_km
                })
        
        logger.info(f"🎯 {len(eligible_candidates)} vagas elegíveis (raio: {request.radius_km}km)")
        
        if not eligible_candidates:
            return RankResponse(items=[])
        
        # Passo 2: Calcular min/max para normalização
        precos = [item['candidate'].preco_hora for item in eligible_candidates]
        distancias = [item['dist_km'] for item in eligible_candidates]
        
        p_min, p_max = min(precos), max(precos)
        d_min, d_max = min(distancias), max(distancias)
        
        logger.info(f"📏 Ranges: preço R${p_min:.2f}-R${p_max:.2f}, distância {d_min:.2f}km-{d_max:.2f}km")
        
        # Passo 3: Calcular scores
        ranked_items = []
        
        for item in eligible_candidates:
            candidate = item['candidate']
            dist_km = item['dist_km']
            
            # Normalização conforme especificação
            p_norm = normalize_price(candidate.preco_hora, p_min, p_max)
            d_norm = normalize_distance(dist_km, d_min, d_max)
            
            # Score base (60% preço, 40% distância)
            base_score = calculate_score(p_norm, d_norm, request.peso_preco, request.peso_dist)
            
            # Aplicar bônus e penalidades
            final_score, badges = apply_bonuses_penalties(
                base_score, candidate, dist_km, request.p25, request.recursos_desejados
            )
            
            ranked_items.append(RankedItem(
                id=candidate.id,
                dist_km=round(dist_km, 2),
                preco_hora=candidate.preco_hora,
                score=round(final_score, 4),
                badges=badges
            ))
        
        # Passo 4: Ordenação por score (maior é melhor) + critérios de desempate
        ranked_items.sort(key=lambda x: (-x.score, *tie_breaker_key(x)))
        
        logger.info(f"✅ Ranked {len(ranked_items)} vagas successfully")
        logger.info(f"🏆 Top 3 scores: {[item.score for item in ranked_items[:3]]}")
        
        return RankResponse(items=ranked_items)
        
    except Exception as e:
        logger.error(f"❌ Error ranking vagas: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error ranking vagas: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)