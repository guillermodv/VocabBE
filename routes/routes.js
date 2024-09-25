const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const coreController = require('../controller/core.controller')

//ROUTES
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to BE application.' })
})

//USER
router.post('/user', userController.create)
router.post('/login', userController.login)
router.get('/users', userController.findAll)
router.get('/users/:id', userController.findOne)
router.post('/request-password-reset', userController.requestPasswordReset)
router.post('/reset-password', userController.resetPassword)

//CORE
router.get('/core/:id/:measurement', coreController.saveMeasurement)
router.get('/cores', coreController.findAll)
router.get('/top', coreController.findAllWithMail)

router.get('*', (req, res) => {
  res.send('path do not exits')
})

module.exports = router
