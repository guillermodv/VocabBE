const db = require('../models')
const Core = db.core
const User = db.user

exports.read = (req, res) => {
  const id = req.params.id
  const measurement = req.params.measurement

  console.log('core measurement-->', { id, measurement })

  if (!id || !measurement) {
    return res.status(400).send({
      error: 'ID y Measurement son requeridos.',
    })
  }

  res.send({
    message: `ID ${id} y dato ${measurement}.`,
  })
}

exports.saveMeasurement = async (req, res) => {
  const id = req.params.id
  const measurement = req.params.measurement

  console.log('core-->', { id, measurement })

  if (!id || !measurement) {
    return res.status(400).send({
      error: 'ID y Measurement are required.',
    })
  }

  try {
    const existingUser = await User.findOne({ where: { userId: id } });

    if (!existingUser) {
      return res.status(400).send({
        message: 'There is no user with this id.',
      });
    }

    const core = {
      userId: id,
      measurement: measurement,
    };

    const data = await Core.create(core);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'An error occurred while creating measurement.',
    });
  }

  res.send({
    message: `ID ${id} and data ${measurement}.`,
  })
}

exports.findAll = (req, res) => {
  const id = req.query.id

  Core.findAll({ where: id })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving cores.',
      })
    })
}
User