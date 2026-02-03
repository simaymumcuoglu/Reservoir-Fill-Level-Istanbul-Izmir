#!/bin/bash
# Veritabanı ve kullanıcıyı oluşturur.
# PostgreSQL şifren sorulacak (macair kullanıcısı için).

cd "$(dirname "$0")/.."
SCRIPT_DIR="$(pwd)/scripts"

# Homebrew varsayılan port 5432
PORT="${DB_PORT:-5432}"

echo "PostgreSQL port: $PORT"
echo "Veritabanı ve kullanıcı oluşturuluyor..."
# Önce socket ile dene (şifre istemez); olmazsa TCP ile dene
psql -d postgres -f "$SCRIPT_DIR/create-database.sql" 2>/dev/null || \
psql -h localhost -p "$PORT" -U macair -d postgres -f "$SCRIPT_DIR/create-database.sql"

if [ $? -eq 0 ]; then
  echo "Tamamlandı: dam_datas veritabanı ve iz_ist_dam kullanıcısı oluşturuldu."
  echo ".env içinde DB_PORT=$PORT olduğundan emin ol."
else
  echo "Hata: psql çalıştırılamadı. PostgreSQL çalışıyor mu? Port doğru mu?"
fi
