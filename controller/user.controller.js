const db = require('../models')
const User = db.user

exports.create = (req, res) => {
  // Validate request
  console.log('body-->', req.body)
  if (!req.body?.name) {
    res.status(400).send({
      message: 'name can not be empty!',
    })
    return
  }

  if (!req.body?.description) {
    res.status(400).send({
      message: 'description can not be empty!',
    })
    return
  }

  // Create a User
  const user = {
    name: req.body.name,
    description: req.body.description,
  }

  User.create(user)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message: 'Could not delete User with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message: 'Error updating User with id=' + id,
      })
    })
}

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const id = req.query.id

  User.findAll({ where: id })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message: 'Error retrieving User with id=' + id,
      })
    })
}
