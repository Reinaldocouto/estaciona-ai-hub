FROM python:3.10-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Instalar dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Criar usuário não-root para segurança
RUN useradd -m -u 1000 app && chown -R app:app /app
USER app

# Copiar código
COPY main.py .

# Expor porta
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Comando para rodar
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]