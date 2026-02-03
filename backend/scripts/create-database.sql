-- Veritabanı ve kullanıcı oluşturma
-- Çalıştırmak (şifre istemez, socket ile): psql -d postgres -f backend/scripts/create-database.sql
-- Veya (port 5432): psql -h localhost -p 5432 -U macair -d postgres -f backend/scripts/create-database.sql

CREATE USER iz_ist_dam WITH PASSWORD 'izmiristanbul@15032!!';

CREATE DATABASE dam_datas OWNER iz_ist_dam;
