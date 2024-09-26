require('dotenv').config()

const dbConfig ={
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || '1234',
  DB: process.env.DB_NAME || 'vocab',
  dialect: 'mysql',
  DBPORT:  process.env.DB_PORT || 3307,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: dbConfig.DBPORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

// Se definen las entidades.
db.user = require('./user.model.js')(sequelize, Sequelize)
db.core = require('./core.model.js')(sequelize, Sequelize)

// Definir las relaciones
db.user.hasMany(db.core, { foreignKey: 'userId', as: 'cores' }); // Un usuario tiene muchas mediciones
db.core.belongsTo(db.user, { foreignKey: 'userId', as: 'user' }); // Cada medición pertenece a un usuario

module.exports = db
