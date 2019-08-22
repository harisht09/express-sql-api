const { ShoppingCentre } = require('../models');

async function getAllShoppingCentres() {
  return ShoppingCentre.findAll();
}

async function getShoppingCentreById(id) {
  return ShoppingCentre.findByPk(id);
}

async function createShoppingCentre(properties) {
  return ShoppingCentre.create(properties);
}

module.exports = {
  getShoppingCentreById,
  getAllShoppingCentres,
  createShoppingCentre
};
