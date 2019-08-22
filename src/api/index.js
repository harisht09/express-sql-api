const router = require('express').Router();
const user = require('./routes/v1/user');
const shoppingCentre = require('./routes/v1/shoppingCentre');
const asset = require('./routes/v1/asset');

module.exports = () => {
  user(router);
  shoppingCentre(router);
  asset(router);

  return router;
};
