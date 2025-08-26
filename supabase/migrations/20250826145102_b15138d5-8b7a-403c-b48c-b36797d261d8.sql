-- Atualizar tabela vagas para incluir colunas necessárias para IA
ALTER TABLE vagas ADD COLUMN IF NOT EXISTS owner_id uuid;
ALTER TABLE vagas ADD COLUMN IF NOT EXISTS lat numeric;
ALTER TABLE vagas ADD COLUMN IF NOT EXISTS lng numeric;
ALTER TABLE vagas ADD COLUMN IF NOT EXISTS bairro text;
ALTER TABLE vagas ADD COLUMN IF NOT EXISTS cidade text DEFAULT 'São Paulo';
ALTER TABLE vagas ADD COLUMN IF NOT EXISTS preco_hora numeric;
ALTER TABLE vagas ADD COLUMN IF NOT EXISTS preco_dia numeric;
ALTER TABLE vagas ADD COLUMN IF NOT EXISTS preco_mes numeric;
ALTER TABLE vagas ADD COLUMN IF NOT EXISTS recursos text[];
ALTER TABLE vagas ADD COLUMN IF NOT EXISTS rating numeric DEFAULT 4.0;
ALTER TABLE vagas ADD COLUMN IF NOT EXISTS disponibilidade jsonb DEFAULT '{"24h": true}';

-- Atualizar dados existentes com valores padrão se necessário
UPDATE vagas SET 
  preco_hora = price WHERE preco_hora IS NULL AND price IS NOT NULL;

UPDATE vagas SET 
  recursos = COALESCE(features, ARRAY[]::text[]) WHERE recursos IS NULL;

-- Criar materialized view para percentis de preços
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_price_benchmarks AS
SELECT
  COALESCE(cidade, 'São Paulo') as cidade,
  COALESCE(bairro, 'Centro') as bairro,
  percentile_cont(0.05) WITHIN GROUP (ORDER BY preco_hora) AS p5_hora,
  percentile_cont(0.25) WITHIN GROUP (ORDER BY preco_hora) AS p25_hora,
  percentile_cont(0.50) WITHIN GROUP (ORDER BY preco_hora) AS p50_hora,
  percentile_cont(0.75) WITHIN GROUP (ORDER BY preco_hora) AS p75_hora,
  percentile_cont(0.95) WITHIN GROUP (ORDER BY preco_hora) AS p95_hora,
  COUNT(*) FILTER (WHERE preco_hora IS NOT NULL) AS amostra_hora,
  percentile_cont(0.05) WITHIN GROUP (ORDER BY preco_dia) AS p5_dia,
  percentile_cont(0.25) WITHIN GROUP (ORDER BY preco_dia) AS p25_dia,
  percentile_cont(0.50) WITHIN GROUP (ORDER BY preco_dia) AS p50_dia,
  percentile_cont(0.75) WITHIN GROUP (ORDER BY preco_dia) AS p75_dia,
  percentile_cont(0.95) WITHIN GROUP (ORDER BY preco_dia) AS p95_dia,
  COUNT(*) FILTER (WHERE preco_dia IS NOT NULL) AS amostra_dia,
  percentile_cont(0.05) WITHIN GROUP (ORDER BY preco_mes) AS p5_mes,
  percentile_cont(0.25) WITHIN GROUP (ORDER BY preco_mes) AS p25_mes,
  percentile_cont(0.50) WITHIN GROUP (ORDER BY preco_mes) AS p50_mes,
  percentile_cont(0.75) WITHIN GROUP (ORDER BY preco_mes) AS p75_mes,
  percentile_cont(0.95) WITHIN GROUP (ORDER BY preco_mes) AS p95_mes,
  COUNT(*) FILTER (WHERE preco_mes IS NOT NULL) AS amostra_mes
FROM vagas
WHERE preco_hora IS NOT NULL OR preco_dia IS NOT NULL OR preco_mes IS NOT NULL
GROUP BY cidade, bairro;

-- Índice para lookup rápido
CREATE INDEX IF NOT EXISTS idx_mv_bench_cidade_bairro
  ON mv_price_benchmarks (cidade, bairro);

-- Função para refresh da materialized view
CREATE OR REPLACE FUNCTION refresh_price_benchmarks()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_price_benchmarks;
END;
$$ LANGUAGE plpgsql;