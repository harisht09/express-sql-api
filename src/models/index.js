const Sequelize = require('sequelize');
const config = require('../config');
const UserModel = require('./user');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  define: {
    paranoid: true,
    timestamps: true
  },
  dialect: config.dialect,
  host: config.host,
  logging: false,
  port: config.port,
  storage: config.storage
});

const User = UserModel(sequelize, Sequelize);

module.exports = {
  db: sequelize,
  User
};
