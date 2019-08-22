const router = require('express').Router();
const httpError = require('http-errors');
const asyncHandler = require('express-async-handler');
const authValidation = require('../../../middlewares/authValidation');
const { Validator } = require('express-json-validator-middleware');

const {
  getAllShoppingCentres,
  getShoppingCentreById,
  createShoppingCentre,
  upsertShoppingCentre
} = require('../../../services/shoppingCentre');
const { bodySchema, paramsSchema } = require('../../../schemas/shoppingCentre');

const validator = new Validator({ allErrors: true });
const schemaValidation = validator.validate;

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
    authValidation, // protected route
    schemaValidation({
      body: bodySchema
    }),
    asyncHandler(async (req, res) => {
      const shoppingCentre = await createShoppingCentre(req.body);

      if (!shoppingCentre) {
        throw httpError.InternalServerError('Could not create shopping centre');
      }

      return res.json(shoppingCentre);
    })
  );

  router.put(
    '/:id',
    authValidation, // protected route
    schemaValidation({
      body: bodySchema,
      params: paramsSchema
    }),
    asyncHandler(async (req, res) => {
      const shoppingCentre = await upsertShoppingCentre(req.params.id, req.body);

      if (!shoppingCentre) {
        throw httpError.InternalServerError('Could not update shopping centre');
      }

      return res.json(shoppingCentre);
    })
  );
};
