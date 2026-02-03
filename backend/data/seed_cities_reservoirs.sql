-- Şehirler: nüfus ve kişi başı günlük tüketim (L) — id otomatik artar
INSERT INTO cities (name, population, daily_consumption_per_capita_l)
VALUES
  ('istanbul', 15840000, 195),
  ('izmir', 4430000, 180);

-- İstanbul barajları: kapasite (m³)
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'ALIBEY', 36000000 FROM cities c WHERE c.name = 'istanbul';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'BUYUKCEKMECE', 160000000 FROM cities c WHERE c.name = 'istanbul';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'DARLIK', 107000000 FROM cities c WHERE c.name = 'istanbul';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'ELMALI', 55000000 FROM cities c WHERE c.name = 'istanbul';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'ISTRANCALAR', 40000000 FROM cities c WHERE c.name = 'istanbul';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'KAZANDERE', 18000000 FROM cities c WHERE c.name = 'istanbul';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'PABUCDERE', 45000000 FROM cities c WHERE c.name = 'istanbul';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'SAZLIDERE', 88000000 FROM cities c WHERE c.name = 'istanbul';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'TERKOS', 162000000 FROM cities c WHERE c.name = 'istanbul';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'OMERLI', 300000000 FROM cities c WHERE c.name = 'istanbul';

-- İzmir barajları: kapasite (m³)
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'TAHTALI', 320000000 FROM cities c WHERE c.name = 'izmir';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'BALCOVA', 15000000 FROM cities c WHERE c.name = 'izmir';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'URKMEZ', 80000000 FROM cities c WHERE c.name = 'izmir';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'GUZELHISAR', 45000000 FROM cities c WHERE c.name = 'izmir';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'GORDES', 90000000 FROM cities c WHERE c.name = 'izmir';
INSERT INTO reservoirs (city_id, name, capacity_m3)
SELECT c.id, 'ALACATI KUTLU', 30000000 FROM cities c WHERE c.name = 'izmir';
