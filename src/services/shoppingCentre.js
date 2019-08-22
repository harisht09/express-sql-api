const { ShoppingCentre } = require('../models');

async function getAllShoppingCentres() {
  return ShoppingCentre.findAll();
}

async function getShoppingCentreById(id) {
  return ShoppingCentre.findByPk(id);
}

module.exports = {
  getShoppingCentreById,
  getAllShoppingCentres
};
