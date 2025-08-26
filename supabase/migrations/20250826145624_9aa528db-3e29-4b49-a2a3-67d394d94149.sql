-- Corrigir warnings de segurança

-- 1. Corrigir Function Search Path Mutable
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION refresh_price_benchmarks()
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_price_benchmarks;
END;
$$;

-- 2. Tornar materialized view não acessível via API
REVOKE ALL ON mv_price_benchmarks FROM anon, authenticated;
GRANT SELECT ON mv_price_benchmarks TO service_role;