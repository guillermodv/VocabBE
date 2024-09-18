const express = require('express')
const router = express.Router()
const UserController = require('../controller/user.controller')
const CoreController = require('../controller/core.controller')

//ROUTES
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to BE application.' })
})

//USER
router.post('/user', UserController.create)
router.get('/users', UserController.findAll)
router.get('/users/:id', UserController.findOne)

//CORE
router.get('/core/:id/:measurement', CoreController.read)

router.get('*', (req, res) => {
  res.send('path do not exits')
})

module.exports = router
