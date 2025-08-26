-- Inserir vagas na região leste de São Paulo, próximo ao estádio do Corinthians em Itaquera
INSERT INTO public.vagas (
  titulo, endereco, bairro, cidade, lat, lng, price, preco_hora, preco_dia, preco_mes,
  recursos, features, discount_premium, available, rating, image_url
) VALUES
-- Vagas próximas ao estádio do Corinthians
('Estacionamento Arena Corinthians', 'Av. Miguel Ignácio Curi, 111 - Itaquera', 'Itaquera', 'São Paulo', -23.5456, -46.4731, 18, 18, 120, 2500, 
 ARRAY['Coberto', 'Segurança 24h', 'Próximo ao estádio'], ARRAY['Coberto', 'Segurança', 'Estádio'], true, true, 4.7, 
 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop'),

('Vaga Residencial Itaquera Centro', 'R. Augusto Carlos Bauman, 240 - Itaquera', 'Itaquera', 'São Paulo', -23.5398, -46.4625, 12, 12, 80, 1800,
 ARRAY['Privativo', 'Portão automático'], ARRAY['Privativo', 'Segurança'], false, true, 4.3,
 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop'),

('Estacionamento Shopping Metrô Itaquera', 'Av. José Pinheiro Borges, s/n - Itaquera', 'Itaquera', 'São Paulo', -23.5385, -46.4584, 15, 15, 100, 2200,
 ARRAY['Shopping', 'Metrô', 'Coberto'], ARRAY['Shopping', 'Coberto', 'Metrô'], true, true, 4.5,
 'https://images.unsplash.com/photo-1545179605-1c19deb492d2?q=80&w=1470&auto=format&fit=crop'),

('Vaga Comercial Av. Radial Leste', 'Av. Radial Leste, 1500 - Itaquera', 'Itaquera', 'São Paulo', -23.5412, -46.4692, 10, 10, 70, 1500,
 ARRAY['Comercial', 'Fácil acesso'], ARRAY['Comercial', 'Acesso'], false, true, 4.1,
 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop'),

-- Vagas na região de Cidade Tiradentes
('Estacionamento Cidade Tiradentes', 'Estrada do Iguatemi, 3000 - Cidade Tiradentes', 'Cidade Tiradentes', 'São Paulo', -23.5892, -46.4012, 8, 8, 50, 1200,
 ARRAY['Descoberto', 'Vigilância'], ARRAY['Vigilância', 'Econômico'], false, true, 4.0,
 'https://images.unsplash.com/photo-1588266458641-1c30f0a654e0?q=80&w=1476&auto=format&fit=crop'),

('Vaga Residencial José Bonifácio', 'R. Virgílio Várzea, 125 - José Bonifácio', 'José Bonifácio', 'São Paulo', -23.5623, -46.4156, 9, 9, 60, 1350,
 ARRAY['Residencial', 'Portão'], ARRAY['Residencial', 'Portão'], true, true, 4.2,
 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop'),

-- Vagas na região de Guaianases
('Estacionamento Guaianases Shopping', 'Estrada de Guaianases, 1000 - Guaianases', 'Guaianases', 'São Paulo', -23.5398, -46.4128, 11, 11, 75, 1650,
 ARRAY['Shopping', 'Coberto', 'Segurança'], ARRAY['Shopping', 'Coberto', 'Segurança'], false, true, 4.4,
 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop'),

('Vaga Igreja Guaianases', 'R. Inácio Monteiro, 456 - Guaianases', 'Guaianases', 'São Paulo', -23.5445, -46.4089, 7, 7, 45, 1000,
 ARRAY['Igreja', 'Fins de semana'], ARRAY['Igreja', 'Econômico'], false, true, 4.3,
 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop'),

-- Vagas na região de São Miguel Paulista
('Estacionamento São Miguel Center', 'Av. São Miguel, 7000 - São Miguel Paulista', 'São Miguel Paulista', 'São Paulo', -23.4985, -46.4425, 13, 13, 85, 1900,
 ARRAY['Centro comercial', 'Coberto'], ARRAY['Comercial', 'Coberto'], true, true, 4.6,
 'https://images.unsplash.com/photo-1545179605-1c19deb492d2?q=80&w=1470&auto=format&fit=crop'),

('Vaga Residencial Vila Jacuí', 'R. Cabo Diogo Oliver, 89 - Vila Jacuí', 'São Miguel Paulista', 'São Paulo', -23.5012, -46.4389, 10, 10, 65, 1450,
 ARRAY['Residencial', 'Noturna'], ARRAY['Residencial', 'Noturna'], false, true, 4.1,
 'https://images.unsplash.com/photo-1588266458641-1c30f0a654e0?q=80&w=1476&auto=format&fit=crop'),

-- Vagas na região de Ermelino Matarazzo
('Estacionamento Ermelino Shopping', 'Av. Ermelino Matarazzo, 2500 - Ermelino Matarazzo', 'Ermelino Matarazzo', 'São Paulo', -23.5156, -46.4698, 14, 14, 90, 2000,
 ARRAY['Shopping', 'Segurança', 'Câmeras'], ARRAY['Shopping', 'Segurança', 'Câmeras'], true, true, 4.5,
 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop'),

('Vaga Ponte Rasa Metro', 'R. Conselheiro Carrão, 1800 - Ponte Rasa', 'Ermelino Matarazzo', 'São Paulo', -23.5198, -46.4756, 16, 16, 105, 2300,
 ARRAY['Metrô', 'Coberto', 'Transporte público'], ARRAY['Metrô', 'Coberto', 'Transporte'], false, true, 4.7,
 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop'),

-- Vagas na região de Vila Matilde
('Estacionamento Vila Matilde', 'Av. Mateo Bei, 1200 - Vila Matilde', 'Vila Matilde', 'São Paulo', -23.5342, -46.4889, 17, 17, 110, 2400,
 ARRAY['Comercial', 'Coberto', 'Lavagem'], ARRAY['Comercial', 'Coberto', 'Lavagem'], true, true, 4.8,
 'https://images.unsplash.com/photo-1621819783320-147734de70f8?q=80&w=1472&auto=format&fit=crop'),

('Vaga Residencial Patriarca', 'R. Domingos Agostim, 567 - Patriarca', 'Vila Matilde', 'São Paulo', -23.5298, -46.4912, 11, 11, 72, 1600,
 ARRAY['Residencial', 'Portão eletrônico'], ARRAY['Residencial', 'Portão'], false, true, 4.2,
 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop'),

-- Vagas na região de Penha
('Estacionamento Shopping Penha', 'R. Dr. João Ribeiro, 304 - Penha', 'Penha', 'São Paulo', -23.5245, -46.5012, 19, 19, 125, 2700,
 ARRAY['Shopping', 'Premium', 'Valet'], ARRAY['Shopping', 'Premium', 'Valet'], true, true, 4.9,
 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop'),

('Vaga Igreja Penha de França', 'Largo da Penha, 1 - Penha de França', 'Penha', 'São Paulo', -23.5289, -46.5067, 8, 8, 50, 1100,
 ARRAY['Igreja', 'Histórico', 'Fins de semana'], ARRAY['Igreja', 'Histórico'], false, true, 4.4,
 'https://images.unsplash.com/photo-1588266458641-1c30f0a654e0?q=80&w=1476&auto=format&fit=crop'),

-- Vagas na região de Cangaíba
('Estacionamento Cangaíba Center', 'Av. Cangaíba, 2890 - Cangaíba', 'Cangaíba', 'São Paulo', -23.4856, -46.4198, 12, 12, 78, 1700,
 ARRAY['Centro comercial', 'Segurança'], ARRAY['Comercial', 'Segurança'], false, true, 4.3,
 'https://images.unsplash.com/photo-1545179605-1c19deb492d2?q=80&w=1470&auto=format&fit=crop'),

('Vaga Residencial Vila Mara', 'R. Mara Rubia, 445 - Vila Mara', 'Cangaíba', 'São Paulo', -23.4912, -46.4256, 9, 9, 58, 1300,
 ARRAY['Residencial', 'Tranquila'], ARRAY['Residencial', 'Tranquila'], true, true, 4.1,
 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop'),

-- Vagas na região de Arthur Alvim
('Estacionamento Arthur Alvim', 'Av. Nordestina, 4500 - Arthur Alvim', 'Arthur Alvim', 'São Paulo', -23.5398, -46.4598, 13, 13, 82, 1850,
 ARRAY['Avenida principal', 'Movimento'], ARRAY['Movimento', 'Principal'], false, true, 4.2,
 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop'),

('Vaga Residencial Cidade Líder', 'R. Inácio Monteiro, 1230 - Cidade Líder', 'Cidade Líder', 'São Paulo', -23.5623, -46.4289, 10, 10, 68, 1550,
 ARRAY['Residencial', 'Noturna', 'Segura'], ARRAY['Residencial', 'Noturna', 'Segura'], true, true, 4.4,
 'https://images.unsplash.com/photo-1621819783320-147734de70f8?q=80&w=1472&auto=format&fit=crop'),

-- Vagas adicionais diversificadas na zona leste
('Estacionamento 24h Itaim Paulista', 'Av. Marechal Tito, 5000 - Itaim Paulista', 'Itaim Paulista', 'São Paulo', -23.5456, -46.4125, 15, 15, 95, 2100,
 ARRAY['24h', 'Segurança', 'Iluminado'], ARRAY['24h', 'Segurança', 'Iluminado'], false, true, 4.6,
 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop'),

('Vaga Premium Vila Curuçá', 'R. Particular, 890 - Vila Curuçá', 'Vila Curuçá', 'São Paulo', -23.4789, -46.4356, 20, 20, 135, 2900,
 ARRAY['Premium', 'Privativo', 'Carregador EV'], ARRAY['Premium', 'Privativo', 'Carregador EV'], true, true, 4.8,
 'https://images.unsplash.com/photo-1621819783320-147734de70f8?q=80&w=1472&auto=format&fit=crop'),

('Estacionamento Hospital São Miguel', 'Av. Antônio Agu, 1000 - São Miguel Paulista', 'São Miguel Paulista', 'São Paulo', -23.4945, -46.4398, 14, 14, 88, 1950,
 ARRAY['Hospital', 'Coberto', 'Visitantes'], ARRAY['Hospital', 'Coberto', 'Visitantes'], false, true, 4.3,
 'https://images.unsplash.com/photo-1588266458641-1c30f0a654e0?q=80&w=1476&auto=format&fit=crop'),

('Vaga Escola Técnica Itaquera', 'R. Fontoura Xavier, 700 - Itaquera', 'Itaquera', 'São Paulo', -23.5389, -46.4712, 8, 8, 52, 1150,
 ARRAY['Escola', 'Horário comercial', 'Estudantes'], ARRAY['Escola', 'Comercial'], false, true, 4.0,
 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop'),

('Estacionamento Parque do Carmo', 'Av. Afonso de Sampaio e Sousa, s/n - Itaquera', 'Itaquera', 'São Paulo', -23.5698, -46.4589, 12, 12, 75, 1650,
 ARRAY['Parque', 'Lazer', 'Família'], ARRAY['Parque', 'Lazer', 'Família'], true, true, 4.5,
 'https://images.unsplash.com/photo-1588266458641-1c30f0a654e0?q=80&w=1476&auto=format&fit=crop');