exports.read = (req, res) => {
  const id = req.params.id
  const measurement = req.params.measurement

  console.log('core-->', { id, measurement })

  if (!id || !measurement) {
    return res.status(400).send({
      error: 'ID y Measurement son requeridos.',
    })
  }

  res.send({
    message: `ID ${id} y dato ${measurement}.`,
  })
}
