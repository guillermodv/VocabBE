# Backend

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

# Error message from gmail use

As mentioned in the comments and directly quoted from Google:

On May 30 2022, you may lose access to apps that are using less secure sign-in technology

So the bottom code will probably stop working with Gmail. The solution is to enable 2-Step Verification and generate Application password, then you can use the generated password to send emails using nodemailer.To do so you need to do the following:

Go to your Google account at https://myaccount.google.com/
Go to Security
Choose 2-Step Verification - here you have to verify yourself, in my case it was with phone number and a confirmation code send as text message. After that you will be able to enabled 2-Step Verification
Visit https://myaccount.google.com/apppasswords to create your app.
Put a name e.g. nodemailer to your app and create it.
A modal dialog will appear with the password. Get that password and use it in your code.
