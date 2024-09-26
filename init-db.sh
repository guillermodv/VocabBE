#!/bin/bash
set -e

# Espera a que MariaDB esté disponible
until mysql -u root -p"1234" -e "SELECT 1" > /dev/null 2>&1; do
  echo "Esperando a que MariaDB esté disponible..."
  sleep 2
done

# Crear el usuario y la base de datos
mysql -u root -p"1234" <<-EOSQL
  CREATE USER 'pepe'@'%' IDENTIFIED BY '1234';
  GRANT ALL PRIVILEGES ON *.* TO 'pepe'@'%';
  FLUSH PRIVILEGES;
EOSQL

# Crear la base de datos
mysql -u root -p"1234" <<-EOSQL
  CREATE DATABASE IF NOT EXISTS vocab;
  CREATE USER 'usuarioTest'@'%' IDENTIFIED BY '1234';
  GRANT ALL PRIVILEGES ON vocab.* TO 'usuarioTest'@'%';
  FLUSH PRIVILEGES;
EOSQL