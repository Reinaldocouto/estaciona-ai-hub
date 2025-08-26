-- Inserir novas vagas próximas à Rua Serrana, 380 (aprox. Ferraz de Vasconcelos/Itaquaquecetuba)
INSERT INTO public.vagas (
  titulo, endereco, bairro, cidade, lat, lng, price, preco_hora, preco_dia, preco_mes,
  recursos, features, discount_premium, available, rating, image_url
) VALUES
('Vaga Residencial Rua Serrana 1', 'Rua Serrana, 380 - Ferraz de Vasconcelos', 'Ferraz de Vasconcelos', 'Ferraz de Vasconcelos', -23.5408, -46.3687, 9, 9, 60, 1400,
 ARRAY['Residencial','Portão eletrônico'], ARRAY['Residencial','Portão'], false, true, 4.2,
 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop'),
('Vaga Coberta Rua Serrana 2', 'Rua Serrana, 410 - Ferraz de Vasconcelos', 'Ferraz de Vasconcelos', 'Ferraz de Vasconcelos', -23.5414, -46.3695, 11, 11, 75, 1650,
 ARRAY['Coberto','Câmeras'], ARRAY['Coberto','Segurança'], true, true, 4.5,
 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop'),
('Estacionamento Comércio Serrana', 'Rua Serrana, 350 - Ferraz de Vasconcelos', 'Ferraz de Vasconcelos', 'Ferraz de Vasconcelos', -23.5401, -46.3679, 8, 8, 55, 1250,
 ARRAY['Comercial','Iluminado'], ARRAY['Comercial','Iluminado'], false, true, 4.0,
 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop'),
('Estacionamento 24h Serrana', 'Rua Serrana, 300 - Ferraz de Vasconcelos', 'Ferraz de Vasconcelos', 'Ferraz de Vasconcelos', -23.5396, -46.3698, 12, 12, 85, 1900,
 ARRAY['24h','Segurança'], ARRAY['24h','Segurança'], true, true, 4.6,
 'https://images.unsplash.com/photo-1545179605-1c19deb492d2?q=80&w=1470&auto=format&fit=crop');

-- Inserir vagas em Mogi das Cruzes próximo ao Supermercado Alabarce
INSERT INTO public.vagas (
  titulo, endereco, bairro, cidade, lat, lng, price, preco_hora, preco_dia, preco_mes,
  recursos, features, discount_premium, available, rating, image_url
) VALUES
('Estacionamento Alabarce I', 'Av. Voluntário Fernando Pinheiro Franco, 800 - Centro', 'Centro', 'Mogi das Cruzes', -23.5221, -46.1884, 14, 14, 95, 2100,
 ARRAY['Comercial','Coberto'], ARRAY['Comercial','Coberto'], true, true, 4.6,
 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop'),
('Estacionamento Alabarce II', 'Rua Coronel Souza Franco, 120 - Centro', 'Centro', 'Mogi das Cruzes', -23.5234, -46.1862, 12, 12, 80, 1850,
 ARRAY['Comercial','Câmeras'], ARRAY['Comercial','Segurança'], false, true, 4.3,
 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1470&auto=format&fit=crop'),
('Vaga Noturna Alabarce', 'Rua Otto Unger, 55 - Centro', 'Centro', 'Mogi das Cruzes', -23.5212, -46.1896, 9, 9, 60, 1400,
 ARRAY['Noturno','Iluminado'], ARRAY['Noturno','Iluminado'], false, true, 4.1,
 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop'),
('Premium Próx. Alabarce', 'Rua Dr. Deodato Wertheimer, 200 - Centro', 'Centro', 'Mogi das Cruzes', -23.5248, -46.1851, 18, 18, 125, 2700,
 ARRAY['Premium','Valet','Coberto'], ARRAY['Premium','Valet','Coberto'], true, true, 4.8,
 'https://images.unsplash.com/photo-1621819783320-147734de70f8?q=80&w=1472&auto=format&fit=crop');

-- Inserir vagas em Mogi das Cruzes próximo ao Parque Centenário
INSERT INTO public.vagas (
  titulo, endereco, bairro, cidade, lat, lng, price, preco_hora, preco_dia, preco_mes,
  recursos, features, discount_premium, available, rating, image_url
) VALUES
('Estacionamento Parque Centenário I', 'Av. Francisco Rodrigues Filho, 4700 - Mogilar', 'Mogilar', 'Mogi das Cruzes', -23.5296, -46.1712, 10, 10, 70, 1500,
 ARRAY['Parque','Família'], ARRAY['Parque','Família'], false, true, 4.2,
 'https://images.unsplash.com/photo-1588266458641-1c30f0a654e0?q=80&w=1476&auto=format&fit=crop'),
('Parque Centenário II - Coberto', 'Av. Francisco Rodrigues Filho, 4800 - Mogilar', 'Mogilar', 'Mogi das Cruzes', -23.5303, -46.1705, 13, 13, 85, 1950,
 ARRAY['Coberto','Segurança'], ARRAY['Coberto','Segurança'], true, true, 4.5,
 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1470&auto=format&fit=crop'),
('Vaga Próx. Parque Centenário', 'Rua Hakone, 60 - Porteira Preta', 'Porteira Preta', 'Mogi das Cruzes', -23.5328, -46.1689, 9, 9, 60, 1400,
 ARRAY['Residencial','Iluminado'], ARRAY['Residencial','Iluminado'], false, true, 4.1,
 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1470&auto=format&fit=crop'),
('Premium Vista Parque', 'Rua Manoel Andrade, 150 - Mogilar', 'Mogilar', 'Mogi das Cruzes', -23.5288, -46.1724, 19, 19, 130, 2850,
 ARRAY['Premium','Privativo','Carregador EV'], ARRAY['Premium','Privativo','Carregador EV'], true, true, 4.9,
 'https://images.unsplash.com/photo-1621819783320-147734de70f8?q=80&w=1472&auto=format&fit=crop');