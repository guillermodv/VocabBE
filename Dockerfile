# Usa la imagen oficial de MariaDB como base
FROM mariadb:latest

# Copia el script de inicialización en el contenedor
COPY ./init-db.sh /docker-entrypoint-initdb.d/

# Da permisos de ejecución al script
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh
