const router = require('express').Router();
const user = require('./routes/v1/user');

module.exports = () => {
  user(router);

  return router;
};
