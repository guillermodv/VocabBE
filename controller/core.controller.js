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
  const { id, measurement } = req.params;

  console.log('core-->', { id, measurement });

  // Parameter validation
  if (!id || isNaN(id) || !measurement) {
    return res.status(400).send({
      error: 'ID must be a number and Measurement is required.',
    });
  }

  try {
    const existingUser = await User.findOne({ where: { id: id } });

    if (!existingUser) {
      return res.status(400).send({
        message: 'No user exists with this ID.',
      });
    }

    // Create new measurement
    const core = {
      userId: id,
      measurement: measurement,
    };

    const data = await Core.create(core);
    return res.send(data); // Single response
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error occurred while creating the measurement.',
    });
  }
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