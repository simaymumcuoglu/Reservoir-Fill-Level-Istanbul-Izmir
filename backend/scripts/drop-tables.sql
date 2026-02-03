-- Eski şemayı (UUID id'ler) temizler; backend yeniden başlayınca TypeORM integer id ile tabloları oluşturur.
-- Çalıştırmak: docker exec -i barajlar-db psql -U iz_ist_dam -d dam_datas -f - < backend/scripts/drop-tables.sql
-- Veya: psql -h localhost -p 5431 -U iz_ist_dam -d dam_datas -f backend/scripts/drop-tables.sql

DROP TABLE IF EXISTS dam_records CASCADE;
DROP TABLE IF EXISTS reservoirs CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
