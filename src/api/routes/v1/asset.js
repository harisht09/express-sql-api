const router = require('express-promise-router')();
const httpError = require('http-errors');
const authValidation = require('../../../middlewares/authValidation');
const { Validator } = require('express-json-validator-middleware');

const {
  getAllAssets,
  getAssetById,
  createAsset,
  upsertAsset,
  removeAsset
} = require('../../../services/asset');
const { bodySchema, paramsSchema } = require('../../../schemas/asset');

const validator = new Validator({ allErrors: true });
const schemaValidation = validator.validate;

module.exports = app => {
  app.use('/assets', router);

  /* PUBLIC ROUTES */
  router.get('/', async (req, res) => {
    let assets = [];
    try {
      assets = await getAllAssets();
    } catch (err) {
      const message = 'Could not get assets';
      req.log.error(message);
      throw httpError.InternalServerError(message);
    }
    return res.json(assets);
  });

  router.get(
    '/:id',
    schemaValidation({
      params: paramsSchema
    }),
    async (req, res) => {
      const assets = await getAssetById(req.params.id);

      if (!assets) {
        const message = 'Asset not found';
        req.log.error(message);
        throw httpError.NotFound(message);
      }

      return res.json(assets);
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
      const assets = await createAsset(req.body);

      if (!assets) {
        const message = 'Could not create asset';
        req.log.error(message);
        throw httpError.InternalServerError('Could not create asset');
      }

      return res.json(assets);
    }
  );

  router.put(
    '/:id',
    schemaValidation({
      body: bodySchema,
      params: paramsSchema
    }),
    async (req, res) => {
      const assets = await upsertAsset(req.params.id, req.body);

      if (!assets) {
        const message = 'Could not update asset';
        req.log.error(message);
        throw httpError.InternalServerError(message);
      }

      return res.json(assets);
    }
  );

  router.delete(
    '/:id',
    schemaValidation({
      params: paramsSchema
    }),
    async (req, res) => {
      const assets = await getAssetById(req.params.id);

      if (!assets) {
        const message = 'Could not find asset to remove';
        req.log.error(message);
        throw httpError.NotFound(message);
      }

      try {
        await removeAsset(assets);
      } catch (err) {
        const message = 'Could not remove asset';
        req.log.error(message);
        throw httpError.InternalServerError(message);
      }

      return res.json({
        message: `Asset: ${assets.name} was removed successfully`
      });
    }
  );
};
