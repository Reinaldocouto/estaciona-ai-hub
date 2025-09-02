# Multi-stage build para frontend React/Vite
FROM node:18-alpine AS build

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY bun.lockb ./

# Install dependencies
RUN npm ci

# Build args para variáveis VITE_*
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_GMAPS_KEY
ARG VITE_ML_RANK_URL

# Set environment variables para build
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_GMAPS_KEY=$VITE_GMAPS_KEY
ENV VITE_ML_RANK_URL=$VITE_ML_RANK_URL

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage de runtime com nginx
FROM nginx:alpine

# Copiar nginx.conf customizado
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar build do frontend
COPY --from=build /app/dist /usr/share/nginx/html

# Expor porta 80
EXPOSE 80

# Comando para rodar nginx
CMD ["nginx", "-g", "daemon off;"]