const router = require('express').Router();
const httpError = require('http-errors');
const asyncHandler = require('express-async-handler');
const schemaValidation = require('express-jsonschema').validate;
const authValidation = require('../../../middlewares/authValidation');

const {
  getAllShoppingCentres,
  getShoppingCentreById,
  createShoppingCentre
} = require('../../../services/shoppingCentre');
const SHOPPING_CENTRE_SCHEMA = require('../../../schemas/shoppingCentre');

module.exports = app => {
  app.use('/shoppingCentres', router);

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      let shoppingCentres = [];
      try {
        shoppingCentres = await getAllShoppingCentres();
      } catch (err) {
        throw httpError.InternalServerError('Could not get shopping centres');
      }
      return res.json(shoppingCentres);
    })
  );

  router.get(
    '/:id',
    asyncHandler(async (req, res) => {
      const shoppingCentre = await getShoppingCentreById(req.params.id);

      if (!shoppingCentre) {
        throw httpError.NotFound('Shopping centre not found');
      }

      return res.json(shoppingCentre);
    })
  );

  router.post(
    '/',
    authValidation,
    schemaValidation(SHOPPING_CENTRE_SCHEMA),
    asyncHandler(async (req, res) => {
      const shoppingCentre = await createShoppingCentre(req.body);

      if (!shoppingCentre) {
        throw httpError.InternalServerError('Could not create shopping centre');
      }

      return res.json(shoppingCentre);
    })
  );
};
