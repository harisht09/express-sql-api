const jwt = require('jsonwebtoken');
const httpError = require('http-errors');
const config = require('../config');

module.exports = async (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await jwt.verify(token, config.jwtSecret);
      return next();
    } catch (err) {
      return next(httpError.Unauthorized('Invalid authorization token'));
    }
  }

  return next(httpError.Unauthorized('No authorization token found'));
};
