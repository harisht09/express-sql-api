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

async function upsertShoppingCentre(id, properties) {
  const shoppingCentre = await ShoppingCentre.findByPk(id);

  if (!shoppingCentre) {
    return createShoppingCentre(properties);
  }

  for (const [key, value] of Object.entries(properties)) {
    shoppingCentre[key] = value;
  }

  await shoppingCentre.save();

  return shoppingCentre;
}

module.exports = {
  getShoppingCentreById,
  getAllShoppingCentres,
  createShoppingCentre,
  upsertShoppingCentre
};
