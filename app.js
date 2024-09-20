require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/routes.js')
const cors = require('cors')
var bodyParser = require('body-parser')

async function syncDatabase(db) {
  await db.sequelize.sync({ force: false }); // Crea las tablas
  console.log("Base de datos sincronizada");
}

var app = express()
// eslint-disable-next-line no-undef
var port = process.env.APP_PORT

// var corsOptions = {
//   origin: 'http://localhost:3000',
// }

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//MIDDLEWARE
app.use(morgan('dev'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

//ROUTES
app.use(routes)

//DB
try {
  console.log('Conectando la base de datos')
  const db = require('./models')
  syncDatabase(db);
} catch (error) {
  console.log('problemas con la base de datos', error)
}

app.listen(port, () => {
  console.log('Server Listen at:', port)
})

module.exports = app
