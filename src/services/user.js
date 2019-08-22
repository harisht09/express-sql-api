const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');

async function getUserByUsername(username) {
  return User.findOne({ where: { username }, raw: true });
}

async function authenticateUser(user, password) {
  const authenticated = await bcrypt.compare(password, user.password);
  if (!authenticated) {
    throw new Error('Could not authenticate user');
  }

  const { id, username } = user;
  const token = jwt.sign({ id, username }, config.jwtSecret, {
    expiresIn: 60 * 60
  });

  return {
    id,
    username,
    token
  };
}

module.exports = {
  getUserByUsername,
  authenticateUser
};
