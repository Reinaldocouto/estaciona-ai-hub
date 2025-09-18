-- Fix coordinate synchronization for parking spaces on Paulista Avenue
-- Update coordinates to better match actual addresses

-- Estacionamento Paulista Innovation Hub - Av. Paulista, 2300
UPDATE vagas 
SET lat = -23.5590, lng = -46.6520
WHERE id = '84ea003c-7ec7-41b5-8a7f-d8c7bdd374d7';

-- Garagem Subsolo Paulista Plaza - Av. Paulista, 2064
UPDATE vagas 
SET lat = -23.5601, lng = -46.6545
WHERE id = '2d45cf4c-6b1e-4d99-9501-b336cc67197c';

-- Garagem Conjunto Nacional - Av. Paulista, 2073  
UPDATE vagas 
SET lat = -23.5600, lng = -46.6542
WHERE id = '16a355dc-0a37-4e68-8524-0034f056c3d3';

-- Estacionamento Rotativo Paulista Center - Av. Paulista, 1294
UPDATE vagas 
SET lat = -23.5621, lng = -46.6598
WHERE id = 'd082c5b0-8161-45af-92f6-2c6c853fc6d3';

-- Vaga Corporativa Fiesp Tower - Av. Paulista, 1313
UPDATE vagas 
SET lat = -23.5618, lng = -46.6595
WHERE id = 'd2fbbf17-bd39-4c9c-9be4-f8a870900696';

-- Garagem Privativa Paulista Executive - Av. Paulista, 854
UPDATE vagas 
SET lat = -23.5640, lng = -46.6625
WHERE id = '72486f50-6047-4a2f-91d5-ad91d6fa683b';