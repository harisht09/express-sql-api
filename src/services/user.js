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
    return false;
  }

  const { id, username } = user;
  const token = jwt.sign({ id, username }, config.jwtSecret, {
    expiresIn: '1h'
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
