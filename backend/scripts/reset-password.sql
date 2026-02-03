-- iz_ist_dam kullanıcısının şifresini sıfırla
-- "password authentication failed" hatası alıyorsan bunu çalıştır.
-- Çalıştırmak (socket, şifresiz): psql -d postgres -f backend/scripts/reset-password.sql
-- Veya (port 5432): psql -h localhost -p 5432 -U macair -d postgres -f backend/scripts/reset-password.sql

ALTER USER iz_ist_dam WITH PASSWORD 'izmiristanbul@15032!!';
