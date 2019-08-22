const router = require('express').Router();
const user = require('./routes/v1/user');
const shoppingCentre = require('./routes/v1/shoppingCentre');

module.exports = () => {
  user(router);
  shoppingCentre(router);

  return router;
};
