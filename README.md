# DetectGas Backend

npm install

docker build -t mi-maria-db-detect .
docker run --name mi-mariadb -e MYSQL_ROOT_PASSWORD=1234 -p 3306:3306 -d mi-mariadb-detect

npm run dev to start back listening on 3001

API listening at the same path.

// notas para instalar mysql
docker pull mysql
docker images
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=1234  -p 3306:3306  -d mysql:tag 
docker inspect database
sudo mysql -u root -p1234

CREATE USER 'pepe'@'%' IDENTIFIED BY '1234';
  GRANT ALL PRIVILEGES ON *.* TO 'pepe'@'%';
  FLUSH PRIVILEGES;

create database XXXXX 