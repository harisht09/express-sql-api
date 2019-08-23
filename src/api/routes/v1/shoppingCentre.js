const router = require('express-promise-router')();
const httpError = require('http-errors');
const { Validator } = require('express-json-validator-middleware');
const authValidation = require('../../../middlewares/authValidation');

const {
  getAllShoppingCentres,
  getShoppingCentreById,
  createShoppingCentre,
  upsertShoppingCentre,
  removeShoppingCentre
} = require('../../../services/shoppingCentre');
const { bodySchema, paramsSchema } = require('../../../schemas/shoppingCentre');

const validator = new Validator({ allErrors: true });
const schemaValidation = validator.validate;

module.exports = app => {
  app.use('/shoppingCentres', router);

  /* PUBLIC ROUTES */
  router.get('/', async (req, res) => {
    let shoppingCentres = [];
    try {
      shoppingCentres = await getAllShoppingCentres();
    } catch (err) {
      const message = 'Could not get shopping centres';
      req.log.error(message);
      throw httpError.InternalServerError(message);
    }
    return res.json(shoppingCentres);
  });

  router.get(
    '/:id',
    schemaValidation({
      params: paramsSchema
    }),
    async (req, res) => {
      const shoppingCentre = await getShoppingCentreById(req.params.id);

      if (!shoppingCentre) {
        const message = 'Shopping centre not found';
        req.log.error(message);
        throw httpError.NotFound(message);
      }

      return res.json(shoppingCentre);
    }
  );

  /* PROTECTED ROUTES - all routes beyond this point will require a valid auth token */
  router.use(authValidation);

  router.post(
    '/',
    schemaValidation({
      body: bodySchema
    }),
    async (req, res) => {
      const shoppingCentre = await createShoppingCentre(req.body);

      if (!shoppingCentre) {
        const message = 'Could not create shopping centre';
        req.log.error(message);
        throw httpError.InternalServerError(message);
      }

      return res.json(shoppingCentre);
    }
  );

  router.put(
    '/:id',
    schemaValidation({
      body: bodySchema,
      params: paramsSchema
    }),
    async (req, res) => {
      const shoppingCentre = await upsertShoppingCentre(req.params.id, req.body);

      if (!shoppingCentre) {
        const message = 'Could not update shopping centre';
        req.log.error(message);
        throw httpError.InternalServerError(message);
      }

      return res.json(shoppingCentre);
    }
  );

  router.delete(
    '/:id',
    schemaValidation({
      params: paramsSchema
    }),
    async (req, res) => {
      const shoppingCentre = await getShoppingCentreById(req.params.id);

      if (!shoppingCentre) {
        const message = 'Could not find shopping centre to remove';
        req.log.error(message);
        throw httpError.NotFound(message);
      }

      try {
        await removeShoppingCentre(shoppingCentre);
      } catch (err) {
        const message = 'Could not remove shopping centre';
        req.log.error(message);
        throw httpError.InternalServerError(message);
      }

      return res.json({
        message: `Shopping centre: ${shoppingCentre.name} was removed successfully`
      });
    }
  );
};
