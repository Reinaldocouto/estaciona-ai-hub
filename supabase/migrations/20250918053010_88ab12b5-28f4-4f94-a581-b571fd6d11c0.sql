-- Garantir que todas as vagas tenham status de disponibilidade definido
-- Atualizar vagas sem status explícito para available = true (assumindo que são disponíveis)
UPDATE public.vagas 
SET available = true 
WHERE available IS NULL;

-- Criar trigger para garantir que novas vagas sempre tenham available definido
CREATE OR REPLACE FUNCTION ensure_availability_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Se available não foi definido, definir como true por padrão
  IF NEW.available IS NULL THEN
    NEW.available := true;
  END IF;
  
  -- Garantir que vagas com título contendo 'indisponível' sejam marcadas como false
  IF NEW.titulo IS NOT NULL AND LOWER(NEW.titulo) LIKE '%indisponível%' THEN
    NEW.available := false;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em INSERT e UPDATE
DROP TRIGGER IF EXISTS trigger_ensure_availability ON public.vagas;
CREATE TRIGGER trigger_ensure_availability
  BEFORE INSERT OR UPDATE ON public.vagas
  FOR EACH ROW
  EXECUTE FUNCTION ensure_availability_status();

-- Garantir que não existam vagas com título 'Vaga Indisponível' marcadas como available = true
UPDATE public.vagas 
SET available = false 
WHERE LOWER(titulo) LIKE '%indisponível%' AND available = true;