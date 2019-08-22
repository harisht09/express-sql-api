const jwt = require('jsonwebtoken');
const httpErrors = require('http-errors');
const config = require('../config');

module.exports = async (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await jwt.verify(token, config.jwtSecret);
      next();
    } catch (err) {
      return res.status(401).json(httpErrors.Unauthorized('Invalid token'));
    }
  } else {
    res.status(401).json(httpErrors.Unauthorized('No authorization token was found'));
  }
};
