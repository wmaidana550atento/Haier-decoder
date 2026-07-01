-- ============================================================
-- Haier Serial Decoder - Schema + dados para Supabase
-- Colar e executar no SQL Editor do projeto Supabase
-- ============================================================

-- Tabelas
CREATE TABLE IF NOT EXISTS appliance_category (
  code TEXT PRIMARY KEY,
  name_pt TEXT NOT NULL,
  name_en TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS factory (
code TEXT PRIMARY KEY,
category TEXT NOT NULL,
name TEXT NOT NULL,
location_note TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS year_code (
code TEXT PRIMARY KEY,
year INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS month_code (
  code TEXT PRIMARY KEY,
  month_number INTEGER NOT NULL,
  name_pt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS day_code (
  code TEXT PRIMARY KEY,
  day INTEGER NOT NULL
);

-- ============================================================
-- Row Level Security: leitura pública (anon)
-- ============================================================
ALTER TABLE appliance_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE factory ENABLE ROW LEVEL SECURITY;
ALTER TABLE year_code ENABLE ROW LEVEL SECURITY;
ALTER TABLE month_code ENABLE ROW LEVEL SECURITY;
ALTER TABLE day_code ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Leitura pública" ON appliance_category;
DROP POLICY IF EXISTS "Leitura pública" ON factory;
DROP POLICY IF EXISTS "Leitura pública" ON year_code;
DROP POLICY IF EXISTS "Leitura pública" ON month_code;
DROP POLICY IF EXISTS "Leitura pública" ON day_code;

CREATE POLICY "Leitura pública" ON appliance_category FOR SELECT TO anon USING (true);
CREATE POLICY "Leitura pública" ON factory            FOR SELECT TO anon USING (true);
CREATE POLICY "Leitura pública" ON year_code          FOR SELECT TO anon USING (true);
CREATE POLICY "Leitura pública" ON month_code         FOR SELECT TO anon USING (true);
CREATE POLICY "Leitura pública" ON day_code           FOR SELECT TO anon USING (true);

-- ============================================================
-- Categorias de produto
-- ============================================================
INSERT INTO appliance_category (code, name_pt, name_en) VALUES
  ('A', 'Ar condicionado',          'Air Conditioner'),
  ('B', 'Frigorífico / Congelador', 'Refrigerator / Freezer'),
  ('C', 'Máquina de lavar roupa',   'Washing Machine'),
  ('D', 'Televisor',                'TV'),
  ('E', 'Telemóvel',                'Mobile Phone'),
  ('F', 'Máquina de lavar loiça',   'Dish Washer'),
  ('N', 'Ar condicionado',          'Air Conditioner')
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- Fábricas
-- ============================================================
INSERT INTO factory (code, category, name, location_note) VALUES
  -- Ar condicionado (A)
  ('AA','A','Fábrica de Ar Condicionado de Qingdao','Qingdao, China'),
  ('AB','A','Fábrica de Ar Condicionado de Qingdao','Qingdao, China'),
  ('AC','A','Fábrica de Ar Condicionado de Qingdao','Qingdao, China'),
  ('AD','A','Fábrica de Ar Condicionado de Qingdao','Qingdao, China'),
  ('AE','A','Fábrica de Ar Condicionado de Qingdao','Qingdao, China'),
  ('AF','A','Fábrica de Ar Condicionado de Qingdao','Qingdao, China'),
  ('AG','A','Fábrica de Ar Condicionado de Qingdao','Qingdao, China'),
  ('AH','A','Fábrica de Ar Condicionado de Qingdao','Qingdao, China'),
  ('AJ','A','Fábrica de Ar Condicionado de Wuhan','Wuhan, China'),
  ('AK','A','Fábrica de Ar Condicionado de Wuhan','Wuhan, China'),
  ('AL','A','Fábrica de Ar Condicionado de Wuhan','Wuhan, China'),
  ('AM','A','Fábrica de Ar Condicionado de Wuhan','Wuhan, China'),
  ('AN','A','Fábrica de Ar Condicionado de Hefei','Hefei, China'),
  ('AP','A','Fábrica de Ar Condicionado de Hefei','Hefei, China'),
  ('AQ','A','Fábrica de Ar Condicionado de Hefei','Hefei, China'),
  ('AR','A','Fábrica de Ar Condicionado de Hefei','Hefei, China'),
  ('AS','A','Fábrica de Ar Condicionado de Dalian','Dalian, China'),
  ('AT','A','Fábrica de Ar Condicionado Comercial','China (estimado)'),
  ('AU','A','Fábrica de Ar Condicionado Comercial','China (estimado)'),
  ('AV','A','Fábrica de Ar Condicionado Comercial','China (estimado)'),
  ('AW','A','Fábrica de Ar Condicionado Comercial','China (estimado)'),
  ('AX','A','Fábrica de Ar Condicionado Comercial','China (estimado)'),
  ('AY','A','Fábrica de Ar Condicionado Comercial','China (estimado)'),
  ('AZ','A','Fábrica de Ar Condicionado Comercial','China (estimado)'),
  ('A0','A','Fábrica de Ar Condicionado Comercial','China (estimado)'),
  ('A1','A','Fábrica de Ar Condicionado Comercial','China (estimado)'),
  ('A2','A','Fábrica de Ar Condicionado Comercial','China (estimado)'),
  ('A3','A','Fábrica de Ar Condicionado Comercial','China (estimado)'),
  ('A4','A','Fábrica MITSUBISHI-HAIER','China (joint venture, estimado)'),
  ('A5','A','Fábrica MITSUBISHI-HAIER','China (joint venture, estimado)'),
  ('A6','A','Fábrica MITSUBISHI-HAIER','China (joint venture, estimado)'),
  ('A7','A','Fábrica de Ar Condicionado de Wuhan','Wuhan, China'),
  ('A8','A','Fábrica de Ar Condicionado de Wuhan','Wuhan, China'),
  ('A9','A','Fábrica de Ar Condicionado de Dalian','Dalian, China'),
  ('NA','A','Fábrica de Ar Condicionado de Hefei','Hefei, China'),
  ('NB','A','Fábrica de Ar Condicionado de Hefei','Hefei, China'),
  ('NC','A','Fábrica de Ar Condicionado de Hefei','Hefei, China'),
  ('ND','A','Fábrica de Ar Condicionado de Wuhan','Wuhan, China'),
  ('NE','A','Fábrica de Ar Condicionado de Wuhan','Wuhan, China'),
  -- Frigorífico / Congelador (B)
  ('BA','B','Fábrica Especial de Refrigeração','China (estimado)'),
  ('BB','B','Fábrica Especial de Refrigeração','China (estimado)'),
  ('BC','B','Primeira Fábrica de Refrigeração','China (estimado)'),
  ('BD','B','Primeira Fábrica de Refrigeração','China (estimado)'),
  ('BE','B','Segunda Fábrica de Refrigeração','China (estimado)'),
  ('BF','B','Segunda Fábrica de Refrigeração','China (estimado)'),
  ('BG','B','Fábrica no Estrangeiro (Overseas)','Não especificado'),
  ('BH','B','Fábrica no Estrangeiro (Overseas)','Não especificado'),
  ('BJ','B','Fábrica de Refrigeração de Guizhou','Guizhou, China'),
  ('BK','B','Fábrica de Refrigeração de Dalian','Dalian, China'),
  ('BL','B','Fábrica de Refrigeração de Dalian','Dalian, China'),
  ('BM','B','Fábrica da América','Estados Unidos (estimado)'),
  ('BN','B','HAP','Hong Kong / Ásia-Pacífico (estimado)'),
  ('BP','B','Fábrica do Paquistão','Paquistão'),
  ('BQ','B','Primeira Fábrica de Congeladores','China (estimado)'),
  ('BR','B','Primeira Fábrica de Congeladores','China (estimado)'),
  ('BS','B','Segunda Fábrica de Congeladores','China (estimado)'),
  ('BT','B','Segunda Fábrica de Congeladores','China (estimado)'),
  ('BU','B','Fábrica Especial de Congeladores','China (estimado)'),
  ('BV','B','Fábrica de Supermercados','China (estimado)'),
  ('BW','B','Fábrica de Refrigeração de Guizhou','Guizhou, China'),
  ('BX','B','Fábrica de Congeladores','China (estimado)'),
  ('BY','B','Fábrica de Congeladores','China (estimado)'),
  ('BZ','B','Fábrica no Estrangeiro (Overseas)','Não especificado'),
  -- Máquina de lavar roupa (C)
  ('CA','C','Fábrica de Máquinas de Lavar Roupa de Qingdao','Qingdao, China'),
  ('CB','C','Fábrica de Máquinas de Lavar Roupa de Qingdao','Qingdao, China'),
  ('CC','C','Fábrica de Máquinas de Lavar Roupa de Qingdao','Qingdao, China'),
  ('CD','C','Fábrica de Máquinas de Lavar Roupa de Qingdao','Qingdao, China'),
  ('CE','C','Fábrica de Máquinas de Lavar Roupa de Shunde','Shunde (Foshan), China'),
  ('CF','C','Fábrica de Máquinas de Lavar Roupa de Hefei','Hefei, China'),
  ('CG','C','Fábrica do Paquistão','Paquistão'),
  ('CH','C','Fábrica do Irão','Irão'),
  ('CJ','C','Fábrica da Síria','Síria'),
  ('CK','C','Fábrica de Bengala','Bangladesh (estimado)'),
  ('CL','C','Fábrica da Malásia','Malásia'),
  ('CM','C','Fábrica da Jordânia','Jordânia'),
  ('CN','C','Fábrica da Tunísia','Tunísia'),
  ('CP','C','Fábrica Haier-Merloni','Itália / China (joint venture, estimado)'),
  ('CQ','C','Fábrica Haier-Merloni','Itália / China (joint venture, estimado)'),
  ('CR','C','Fábrica Haier-Merloni','Itália / China (joint venture, estimado)'),
  ('CS','C','Fábrica Haier-Merloni','Itália / China (joint venture, estimado)'),
  ('CT','C','Fábrica Haier-Merloni','Itália / China (joint venture, estimado)'),
  ('CU','C','Fábrica de Máquinas de Lavar Roupa de Hefei','Hefei, China'),
  ('CW','C','Fábrica de Máquinas de Lavar Roupa de Jiaonan','Jiaonan (Qingdao), China'),
  ('CX','C','Fábrica de Máquinas de Lavar Roupa de Jiaonan','Jiaonan (Qingdao), China'),
  ('CY','C','Fábrica de Máquinas de Lavar Roupa de Shunde','Shunde (Foshan), China'),
  ('CZ','C','Fábrica de Máquinas de Lavar Roupa de Shunde','Shunde (Foshan), China'),
  -- Televisor (D)
  ('DA','D','Fábrica Elétrica de Qingdao','Qingdao, China'),
  ('DB','D','Fábrica Elétrica de Qingdao','Qingdao, China'),
  ('DC','D','Fábrica Elétrica de Qingdao','Qingdao, China'),
  ('DE','D','Fábrica Elétrica de Qingdao','Qingdao, China'),
  ('DF','D','Fábrica Elétrica de Qingdao','Qingdao, China'),
  ('DG','D','Fábrica Elétrica de Qingdao','Qingdao, China'),
  ('DH','D','Fábrica Elétrica de Qingdao','Qingdao, China'),
  ('DN','D','Fábrica de TV Plana de Qingdao','Qingdao, China'),
  ('D0','D','Fábrica de TV Plana de Qingdao','Qingdao, China'),
  ('DP','D','Fábrica de TV Plana de Qingdao','Qingdao, China'),
  ('DQ','D','Fábrica de TV Plana de Qingdao','Qingdao, China'),
  ('DR','D','Fábrica de TV Plana de Qingdao','Qingdao, China'),
  -- Telemóvel (E)
  ('EA','E','Fábrica de Telemóveis','China (estimado)'),
  ('EB','E','Fábrica de Telemóveis','China (estimado)'),
  ('EC','E','Fábrica de Telemóveis','China (estimado)'),
  ('ED','E','Fábrica de Telemóveis','China (estimado)'),
  ('EE','E','Fábrica de Telemóveis','China (estimado)'),
  ('EF','E','Fábrica de Telemóveis','China (estimado)'),
  ('EG','E','Fábrica de Telemóveis','China (estimado)'),
  ('EH','E','Fábrica de Telemóveis','China (estimado)'),
  ('EJ','E','Fábrica de Telemóveis','China (estimado)'),
  ('EK','E','Fábrica de Telemóveis','China (estimado)'),
  -- Máquina de lavar loiça (F)
  ('FA','F','Fábrica de Máquinas de Lavar Loiça de Huangdao','Huangdao (Qingdao), China'),
  ('FB','F','Fábrica de Máquinas de Lavar Loiça de Huangdao','Huangdao (Qingdao), China')
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- Códigos de ano (posição 14)
-- ============================================================
INSERT INTO year_code (code, year) VALUES
  ('0',2000),('1',2001),('2',2002),('3',2003),('4',2004),
  ('5',2005),('6',2006),('7',2007),('8',2008),('9',2009),
  ('A',2010),('B',2011),('C',2012),('D',2013),('E',2014),
  ('F',2015),('G',2016),('H',2017),('J',2018),('K',2019),
  ('L',2020),('M',2021),('N',2022),('P',2023),('Q',2024),
  ('R',2025),('S',2026),('T',2027),('U',2028),('V',2029),
  ('W',2030),('X',2031),('Y',2032),('Z',2033)
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- Códigos de mês (posição 15)
-- ============================================================
INSERT INTO month_code (code, month_number, name_pt) VALUES
  ('1',1,'Janeiro'),('2',2,'Fevereiro'),('3',3,'Março'),
  ('4',4,'Abril'),('5',5,'Maio'),('6',6,'Junho'),
  ('7',7,'Julho'),('8',8,'Agosto'),('9',9,'Setembro'),
  ('A',10,'Outubro'),('B',11,'Novembro'),('C',12,'Dezembro')
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- Códigos de dia (posição 16) — sem I nem O
-- ============================================================
INSERT INTO day_code (code, day) VALUES
  ('1',1),('2',2),('3',3),('4',4),('5',5),
  ('6',6),('7',7),('8',8),('9',9),
  ('A',10),('B',11),('C',12),('D',13),('E',14),
  ('F',15),('G',16),('H',17),('J',18),('K',19),
  ('L',20),('M',21),('N',22),('P',23),('Q',24),
  ('R',25),('S',26),('T',27),('U',28),('V',29),
  ('W',30),('X',31)
ON CONFLICT (code) DO NOTHING;
