module.exports = {
  HOST: 'localhost',
  USER: 'pepe',
  PASSWORD: '1234',
  DB: 'vocab',
  dialect: 'mysql',
  DBPORT: 3307,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
