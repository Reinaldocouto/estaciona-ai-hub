-- Fix coordinates for Garagem Cultural Sesc Paulista to match the actual address
UPDATE vagas 
SET lat = -23.5616, lng = -46.6565 
WHERE id = '1c2d4ec1-3f06-41de-aec8-492c2da7a155' AND titulo = 'Garagem Cultural Sesc Paulista';

-- Verify the update
SELECT titulo, endereco, lat, lng FROM vagas WHERE id = '1c2d4ec1-3f06-41de-aec8-492c2da7a155';