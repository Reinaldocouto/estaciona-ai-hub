-- Inserir as 16 novas vagas na região da Av. Paulista com UUIDs válidos
INSERT INTO public.vagas (
  titulo, endereco, price, preco_hora, preco_dia, preco_mes, lat, lng, 
  bairro, cidade, rating, available, features, recursos, image_url, discount_premium
) VALUES 
-- Vaga 1: Garagem Privativa Paulista Executive
('Garagem Privativa Paulista Executive', 'Av. Paulista, 854 - São Paulo, SP', 
 18, 18, 105, 2520, -23.5650, -46.6553, 'Bela Vista', 'São Paulo', 4.8, true, 
 ARRAY['Coberto', 'Segurança 24h', 'Automatizado', 'Executivo', 'Câmeras'], 
 ARRAY['Coberto', 'Segurança 24h', 'Automatizado', 'Executivo', 'Câmeras'], 
 '/src/assets/parking/garage-empty-2.jpg', false),

-- Vaga 2: Estacionamento Subsolo Augusta  
('Estacionamento Subsolo Augusta', 'R. Augusta, 2532 - São Paulo, SP', 
 14, 14, 85, 2040, -23.5587, -46.6632, 'Consolação', 'São Paulo', 4.6, true,
 ARRAY['Subsolo', 'Ventilado', 'Moderno', 'Lazer', '24h'], 
 ARRAY['Subsolo', 'Ventilado', 'Moderno', 'Lazer', '24h'], 
 '/src/assets/parking/underground-garage-1.jpg', false),

-- Vaga 3: Garagem Conjunto Nacional
('Garagem Conjunto Nacional', 'Av. Paulista, 2073 - São Paulo, SP', 
 16, 16, 95, 2280, -23.5613, -46.6563, 'Bela Vista', 'São Paulo', 4.7, true,
 ARRAY['Shopping', 'Centro', 'Histórico', 'Coberto', 'Elevador'], 
 ARRAY['Shopping', 'Centro', 'Histórico', 'Coberto', 'Elevador'], 
 '/src/assets/parking/shopping-garage-1.jpg', false),

-- Vaga 4: Vaga Privativa Bela Vista Premium
('Vaga Privativa Bela Vista Premium', 'R. Dr. Plínio Barreto, 285 - São Paulo, SP', 
 20, 20, 115, 2760, -23.5583, -46.6547, 'Bela Vista', 'São Paulo', 4.9, true,
 ARRAY['Premium', 'Demarcada', 'Lavagem', 'Manobrista', 'VIP'], 
 ARRAY['Premium', 'Demarcada', 'Lavagem', 'Manobrista', 'VIP'], 
 '/src/assets/parking/premium-ev-garage-1.jpg', false),

-- Vaga 5: Estacionamento Rotativo Paulista Center
('Estacionamento Rotativo Paulista Center', 'Av. Paulista, 1294 - São Paulo, SP', 
 12, 12, 72, 1728, -23.5634, -46.6589, 'Bela Vista', 'São Paulo', 4.4, true,
 ARRAY['Rotativo', 'Comercial', 'Médico', 'Elevador', 'Recepção'], 
 ARRAY['Rotativo', 'Comercial', 'Médico', 'Elevador', 'Recepção'], 
 '/src/assets/parking/garage-with-car-1.jpg', false),

-- Vaga 6: Garagem Subsolo Paulista Plaza
('Garagem Subsolo Paulista Plaza', 'Av. Paulista, 2064 - São Paulo, SP', 
 15, 15, 90, 2160, -23.5612, -46.6561, 'Bela Vista', 'São Paulo', 4.5, true,
 ARRAY['Subsolo', 'Amplo', 'LED', 'Ventilação', 'Moderno'], 
 ARRAY['Subsolo', 'Amplo', 'LED', 'Ventilação', 'Moderno'], 
 '/src/assets/parking/modern-garage-1.jpg', false),

-- Vaga 7: Vaga Corporativa Fiesp Tower
('Vaga Corporativa Fiesp Tower', 'Av. Paulista, 1313 - São Paulo, SP', 
 22, 22, 130, 3120, -23.5655, -46.6555, 'Bela Vista', 'São Paulo', 4.8, true,
 ARRAY['Corporativo', 'Executivo', 'Premium', 'Segurança++', 'Concierge'], 
 ARRAY['Corporativo', 'Executivo', 'Premium', 'Segurança++', 'Concierge'], 
 '/src/assets/parking/garage-ev-charger-1.jpg', false),

-- Vaga 8: Estacionamento Hospital Sírio Libanês
('Estacionamento Hospital Sírio Libanês', 'R. Dona Adma Jafet, 91 - São Paulo, SP', 
 17, 17, 100, 2400, -23.5631, -46.6591, 'Bela Vista', 'São Paulo', 4.6, true,
 ARRAY['Hospitalar', 'Acesso direto', 'Médico', 'Familiar', '24h'], 
 ARRAY['Hospitalar', 'Acesso direto', 'Médico', 'Familiar', '24h'], 
 '/src/assets/parking/covered-parking-1.jpg', false),

-- Vaga 9: Garagem Residencial Jardins Elite
('Garagem Residencial Jardins Elite', 'R. Augusta, 1508 - São Paulo, SP', 
 25, 25, 145, 3480, -23.5576, -46.6615, 'Jardins', 'São Paulo', 4.9, true,
 ARRAY['Exclusivo', 'Alto padrão', 'Jardins', 'Luxo', 'Ampla'], 
 ARRAY['Exclusivo', 'Alto padrão', 'Jardins', 'Luxo', 'Ampla'], 
 '/src/assets/parking/garage-with-car-2.jpg', false),

-- Vaga 10: Estacionamento Bela Vista Business
('Estacionamento Bela Vista Business', 'R. Treze de Maio, 1947 - São Paulo, SP', 
 13, 13, 78, 1872, -23.5562, -46.6523, 'Bela Vista', 'São Paulo', 4.3, true,
 ARRAY['Comercial', 'Centro', 'Acesso fácil', 'Empresarial', 'Econômico'], 
 ARRAY['Comercial', 'Centro', 'Acesso fácil', 'Empresarial', 'Econômico'], 
 '/src/assets/parking/garage-empty-3.jpg', false),

-- Vaga 11: Garagem Shopping Center 3
('Garagem Shopping Center 3', 'Av. Paulista, 2064 - São Paulo, SP', 
 14, 14, 84, 2016, -23.5612, -46.6561, 'Bela Vista', 'São Paulo', 4.5, true,
 ARRAY['Shopping', 'Amplo', 'Desconto compras', 'Moderno', 'Food court'], 
 ARRAY['Shopping', 'Amplo', 'Desconto compras', 'Moderno', 'Food court'], 
 '/src/assets/parking/covered-parking-2.jpg', false),

-- Vaga 12: Vaga Privativa Consolação Premium
('Vaga Privativa Consolação Premium', 'Av. Consolação, 3811 - São Paulo, SP', 
 19, 19, 110, 2640, -23.5569, -46.6594, 'Consolação', 'São Paulo', 4.7, true,
 ARRAY['Privativa', 'Premium', 'Metrô próximo', 'Elevador', 'Portaria 24h'], 
 ARRAY['Privativa', 'Premium', 'Metrô próximo', 'Elevador', 'Portaria 24h'], 
 '/src/assets/parking/garage-with-car-3.jpg', false),

-- Vaga 13: Estacionamento Banco Central Tower
('Estacionamento Banco Central Tower', 'Av. Paulista, 1776 - São Paulo, SP', 
 21, 21, 125, 3000, -23.5623, -46.6542, 'Bela Vista', 'São Paulo', 4.8, true,
 ARRAY['Corporativo', 'Torre', 'Tecnologia', 'Executivo', 'Segurança máxima'], 
 ARRAY['Corporativo', 'Torre', 'Tecnologia', 'Executivo', 'Segurança máxima'], 
 '/src/assets/parking/garage-ev-charger-2.jpg', false),

-- Vaga 14: Garagem Cultural Sesc Paulista
('Garagem Cultural Sesc Paulista', 'Av. Paulista, 119 - São Paulo, SP', 
 11, 11, 66, 1584, -23.5707, -46.6490, 'Bela Vista', 'São Paulo', 4.4, true,
 ARRAY['Cultural', 'Sesc', 'Desconto associados', 'Lazer', 'Acessível'], 
 ARRAY['Cultural', 'Sesc', 'Desconto associados', 'Lazer', 'Acessível'], 
 '/src/assets/parking/covered-parking-3.jpg', false),

-- Vaga 15: Vaga Exclusiva Jardins Medical Center
('Vaga Exclusiva Jardins Medical Center', 'R. Pamplona, 518 - São Paulo, SP', 
 18, 18, 105, 2520, -23.5651, -46.6611, 'Jardins', 'São Paulo', 4.6, true,
 ARRAY['Médico', 'Exclusivo', 'Jardins', 'Pacientes', 'Especializado'], 
 ARRAY['Médico', 'Exclusivo', 'Jardins', 'Pacientes', 'Especializado'], 
 '/src/assets/parking/garage-with-car-4.jpg', false),

-- Vaga 16: Estacionamento Paulista Innovation Hub
('Estacionamento Paulista Innovation Hub', 'Av. Paulista, 2300 - São Paulo, SP', 
 16, 16, 95, 2280, -23.5590, -46.6502, 'Bela Vista', 'São Paulo', 4.7, true,
 ARRAY['Innovation', 'Tech', 'Carregadores EV', 'Colaborativo', 'Moderno'], 
 ARRAY['Innovation', 'Tech', 'Carregadores EV', 'Colaborativo', 'Moderno'], 
 '/src/assets/parking/garage-ev-charger-3.jpg', false);