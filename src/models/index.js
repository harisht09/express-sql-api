const Sequelize = require('sequelize');
const config = require('../config');
const UserModel = require('./user');
const ShoppingCentreModel = require('./shoppingCentre');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  define: {
    paranoid: false,
    timestamps: true
  },
  dialect: config.dialect,
  host: config.host,
  logging: false,
  port: config.port,
  storage: config.storage
});

const User = UserModel(sequelize, Sequelize);
const ShoppingCentre = ShoppingCentreModel(sequelize, Sequelize);

module.exports = {
  db: sequelize,
  User,
  ShoppingCentre
};
