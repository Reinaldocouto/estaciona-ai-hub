# 🐳 Containerização - Estaciona Aí

## Visão Geral

Este projeto implementa uma infraestrutura completa com contêineres Docker para:
- **Frontend React/Vite** (Nginx multi-stage)
- **Microserviço ML** (FastAPI + Python)
- **Orquestração** com Docker Compose
- **Deploy Kubernetes** (opcional)

## 🚀 Quick Start

```bash
# 1. Clonar e configurar
git clone https://github.com/Reinaldocouto/estaciona-ai-hub.git
cd estaciona-ai-hub
cp .env.example .env

# 2. Executar com Docker Compose
docker compose up --build

# 3. Acessar
# Frontend: http://localhost
# ML API: http://localhost:8000/health
```

## 📁 Estrutura Docker

```
estaciona-ai-hub/
├── Dockerfile              # Frontend React (multi-stage)
├── docker/
│   └── nginx.conf          # Configuração Nginx SPA
├── .dockerignore           # Exclusões do build
├── docker-compose.yml      # Orquestração local
├── .env.example           # Template variáveis
├── ml-ranking-service/
│   ├── Dockerfile         # Microserviço Python
│   └── main.py           # FastAPI + health check
└── k8s/
    └── deployment.yaml    # Manifests Kubernetes
```

## 🔧 Configuração Detalhada

### Frontend (React/Vite)

**Dockerfile multi-stage:**
- **Build**: `node:18-alpine` + npm ci + build
- **Runtime**: `nginx:alpine` + SPA fallback
- **Build args**: Injeta variáveis VITE_* no build
- **Nginx**: Cache otimizado + health check

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_GMAPS_KEY
ARG VITE_ML_RANK_URL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
# ... build process

# Runtime stage  
FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

### Microserviço ML (FastAPI)

**Dockerfile seguro:**
- Base: `python:3.10-slim`
- Usuário não-root (`app:1000`)
- Health check integrado
- Dependencies científicas otimizadas

```dockerfile
FROM python:3.10-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN useradd -m -u 1000 app && chown -R app:app /app
USER app
COPY main.py .
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8000/health || exit 1
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🐋 Docker Compose

**Orquestração completa:**

```yaml
version: "3.8"
services:
  frontend:
    build:
      context: .
      args:
        VITE_SUPABASE_URL: ${VITE_SUPABASE_URL}
        VITE_SUPABASE_ANON_KEY: ${VITE_SUPABASE_ANON_KEY}
        VITE_GMAPS_KEY: ${VITE_GMAPS_KEY}
        VITE_ML_RANK_URL: ${VITE_ML_RANK_URL}
    ports: ["80:80"]
    depends_on:
      ml-service:
        condition: service_healthy

  ml-service:
    build: ./ml-ranking-service
    ports: ["8000:8000"]
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 10s
      timeout: 3s
      retries: 5
```

## ⚙️ Comandos Essenciais

### Build individual
```bash
# Frontend apenas
docker build -t estaciona-frontend \
  --build-arg VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
  --build-arg VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY \
  --build-arg VITE_GMAPS_KEY=$VITE_GMAPS_KEY \
  --build-arg VITE_ML_RANK_URL=$VITE_ML_RANK_URL \
  .

docker run -p 80:80 estaciona-frontend

# ML Service apenas  
cd ml-ranking-service
docker build -t estaciona-ml .
docker run -p 8000:8000 estaciona-ml
```

### Operações Compose
```bash
# Start completo
docker compose up --build

# Rebuild serviço específico
docker compose up --build frontend

# Logs em tempo real
docker compose logs -f ml-service

# Parar e limpar
docker compose down --volumes --remove-orphans

# Verificar health
curl http://localhost/health        # Frontend
curl http://localhost:8000/health   # ML Service
```

## ☸️ Kubernetes (Produção)

### Manifests inclusos

**k8s/deployment.yaml** contém:
- 2x Deployments (frontend + ml-service)
- 2x Services ClusterIP
- 1x Ingress com roteamento
- Health checks (liveness/readiness)
- Resource limits
- ConfigMaps/Secrets suporte

### Deploy K8s

```bash
# 1. Build e push imagens
docker build -t ghcr.io/user/estaciona-frontend:latest .
docker push ghcr.io/user/estaciona-frontend:latest

docker build -t ghcr.io/user/estaciona-ml:latest ./ml-ranking-service
docker push ghcr.io/user/estaciona-ml:latest

# 2. Aplicar manifests
kubectl apply -f k8s/deployment.yaml

# 3. Verificar deploy
kubectl get pods -l app=estaciona-frontend
kubectl get services
kubectl logs -l app=estaciona-ml --tail=50

# 4. Port forward para teste
kubectl port-forward svc/estaciona-frontend-svc 8080:80
```

### Fluxo Deploy Produção

1. **CI/CD Pipeline** → Build automático das imagens
2. **Container Registry** → Push para ghcr.io/DockerHub  
3. **GitOps** → `kubectl apply` ou ArgoCD/Flux
4. **Ingress Controller** → Nginx/Traefik roteamento
5. **Monitoring** → Prometheus/Grafana observabilidade

## 🔍 Verificação e Troubleshooting

### Health Checks
```bash
# Frontend Nginx
curl -I http://localhost/health
# Response: 200 OK

# ML Service FastAPI
curl http://localhost:8000/health
# Response: {"status":"healthy","service":"ml-ranking-service"}

# Docker Compose status
docker compose ps
#      NAME                    STATE    PORTS
# frontend-1                  Up       0.0.0.0:80->80/tcp
# ml-service-1               Up       0.0.0.0:8000->8000/tcp
```

### Problemas Comuns

**1. Build falha no frontend:**
```bash
# Verificar variáveis
echo $VITE_SUPABASE_URL
echo $VITE_GMAPS_KEY

# Rebuild com logs
docker compose build --no-cache frontend
```

**2. ML Service não responde:**
```bash
# Aguardar health check (30s)
docker compose logs ml-service

# Verificar conectividade
docker compose exec frontend curl http://ml-service:8000/health
```

**3. Nginx 404 em rotas SPA:**
```bash
# Verificar nginx.conf
docker compose exec frontend cat /etc/nginx/conf.d/default.conf

# Reload config
docker compose restart frontend
```

## 📊 Demonstração FIAP

### Capturas Funcionamento

**1. Docker Compose execução:**
```bash
$ docker compose up --build
[+] Running 2/2
 ✔ Container estaciona-ai-hub-ml-service-1  Started  
 ✔ Container estaciona-ai-hub-frontend-1     Started
 
$ docker compose ps
NAME                           STATE    PORTS
estaciona-ai-hub-frontend-1    Up       0.0.0.0:80->80/tcp
estaciona-ai-hub-ml-service-1  Up       0.0.0.0:8000->8000/tcp
```

**2. Health checks ativos:**
```bash
$ curl http://localhost/health
healthy

$ curl http://localhost:8000/health  
{"status":"healthy","service":"ml-ranking-service"}
```

**3. Aplicação funcional:**
- ✅ **Frontend**: http://localhost - Interface completa
- ✅ **ML API**: http://localhost:8000/docs - Swagger UI
- ✅ **Integração**: Busca IA funcionando end-to-end
- ✅ **Google Maps**: Mapas interativos carregando
- ✅ **Supabase**: Auth e database conectados

### Arquitetura de Rede

```
┌─────────────────┐    ┌──────────────────┐
│   Frontend      │    │   ML Service     │
│   (nginx:80)    │◄──►│   (uvicorn:8000) │
│                 │    │                  │
│ React SPA       │    │ FastAPI + ML     │
│ + Asset Cache   │    │ + Health Check   │
└─────────────────┘    └──────────────────┘
         │                        │
         ▼                        ▼
┌─────────────────────────────────────┐
│        estaciona-ai-net             │
│        (Docker Bridge)              │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│     Serviços Externos               │
│ • Supabase (Auth + DB)              │
│ • Google Maps API                   │  
│ • Stripe (Pagamentos)               │
└─────────────────────────────────────┘
```

## ✅ Checklist FIAP Concluído

| Requisito | Status | Evidência |
|-----------|--------|-----------|
| Dockerfile funcional | ✅ | Frontend + ML Service |
| Documentação execução | ✅ | README + DOCKER_DEPLOYMENT.md |
| Demonstração funcionando | ✅ | URLs + health checks |
| Docker Compose | ✅ | Orquestração completa |
| Kubernetes (opcional) | ✅ | k8s/deployment.yaml |
| Segurança | ✅ | User não-root + secrets |
| Multi-stage builds | ✅ | Frontend otimizado |
| Health checks | ✅ | Ambos serviços |

## 📚 Próximos Passos

1. **CI/CD**: GitHub Actions para build automático
2. **Registry**: Configurar ghcr.io ou DockerHub
3. **Monitoring**: Prometheus + Grafana + Jaeger
4. **Secrets**: Vault ou K8s Secrets externos
5. **Scaling**: HPA (Horizontal Pod Autoscaler)
6. **Service Mesh**: Istio para observabilidade avançada

---

**Nota**: Este setup demonstra uma arquitetura híbrida moderna, onde componentes críticos (frontend + ML) são containerizados, enquanto serviços gerenciados (Supabase, Google Maps, Stripe) permanecem externos, otimizando custos e manutenibilidade.