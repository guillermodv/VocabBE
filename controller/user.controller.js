require('dotenv').config();
const db = require('../models')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');

const User = db.user
// eslint-disable-next-line no-undef
const EMAIL_SECRET = process.env.EMAIL_SECRET || 'secret';
// eslint-disable-next-line no-undef
const URL_FRONT = process.env.URL_FRONT_RECOVERY || 'http://localhost:3000/resetpassword';

const transporter = nodemailer.createTransport({
  service: 'gmail', // o el servicio que estés usando
  auth: {
    // eslint-disable-next-line no-undef
    user:  process.env.EMAIL_USER || 'guillermo.dv@gmail.com' ,
    // eslint-disable-next-line no-undef
    pass:  process.env.EMAIL_PASSWORD || 'Zawadsky28!', 
  },
});


exports.create = async (req, res) => {
  console.log('body-->', req.body);
  if (!req.body?.name) {
    return res.status(400).send({
      message: 'The name cannot be empty!',
    });
  }

  if (!req.body?.email) {
    return res.status(400).send({
      message: 'The email cannot be empty!',
    });
  }

  if (!req.body?.password) {
    return res.status(400).send({
      message: 'The password cannot be empty!',
    });
  }

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ where: { email: req.body.email } });

    if (existingUser) {
      return res.status(400).send({
        message: 'The email is already registered.',
      });
    }

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const data = await User.create(user);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'An error occurred while creating the user.',
    });
  }
};

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
        });
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        message: 'Error retrieving User with id=' + id,
      })
    })
}

exports.login = async (req, res) => {
  if (!req.body?.email || !req.body?.password) {
    return res.status(401).send({
      message: 'Email and password are required.',
    });
  }

  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).send({
        message: 'User not found.',
      });
    }

    if (user.password !== req.body.password) {
      return res.status(401).send({
        message: 'Incorrect password.',
      });
    }

    res.send({
      message: 'Login successful.',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: 'Error during login.',
    });
  }
};


exports.requestPasswordReset = (req, res) => {
  const email = req.body.email;

  if (!req.body?.email) {
    return res.status(400).send({
      message: 'Email are required.',
    });
  }

  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      const token = jwt.sign({ id: user.id }, EMAIL_SECRET, { expiresIn: '1h' });

      const url = `${URL_FRONT}?token=${token}`; // Cambia esto por la URL real
      

      //TODO: MAIL DIDNT WORK
      // transporter.sendMail({
      //   to: email,
      //   subject: 'Password Reset',
      //   html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
      // });

      console.log("TOKEN ENVIADO", url);

      res.send({ message: 'Password reset link sent to your email.' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Error sending email.' });
    });
};

exports.resetPassword = (req, res) => { 
  if (!req.body?.token && !req.body?.newPassword) {
    return res.status(400).send({
      message: 'token and newPassword are required.',
    });
  }

  const { token, newPassword } = req.body; 

  jwt.verify(token, EMAIL_SECRET, (err, decoded) => { 
      if (err) { 
          return res.status(401).send({ message: 'Invalid or expired token.' }); 
      } 

      const userId = decoded.id;
      //const hashedPassword = bcrypt.hashSync(newPassword, 8);

      User.update({ password: newPassword }, { where: { id: userId } })
          .then((num) => {
              if (num[0] === 1) { 
                  res.send({ message: 'Password updated successfully.' }); 
              } else { 
                  res.status(404).send({ message: 'User not found.' }); 
              } 
          })
          .catch((err) => { 
              console.error(err); 
              res.status(500).send({ message: 'Error updating password.' }); 
          }); 
  }); 
};
