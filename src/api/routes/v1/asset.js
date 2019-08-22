const router = require('express').Router();
const httpError = require('http-errors');
const asyncHandler = require('express-async-handler');
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
  router.get(
    '/',
    asyncHandler(async (req, res) => {
      let assets = [];
      try {
        assets = await getAllAssets();
      } catch (err) {
        throw httpError.InternalServerError('Could not get assets');
      }
      return res.json(assets);
    })
  );

  router.get(
    '/:id',
    schemaValidation({
      params: paramsSchema
    }),
    asyncHandler(async (req, res) => {
      const assets = await getAssetById(req.params.id);

      if (!assets) {
        throw httpError.NotFound('Asset not found');
      }

      return res.json(assets);
    })
  );

  /* PROTECTED ROUTES - all routes beyond this point will require a valid auth token */
  router.use(authValidation);

  router.post(
    '/',
    schemaValidation({
      body: bodySchema
    }),
    asyncHandler(async (req, res) => {
      const assets = await createAsset(req.body);

      if (!assets) {
        throw httpError.InternalServerError('Could not create asset');
      }

      return res.json(assets);
    })
  );

  router.put(
    '/:id',
    schemaValidation({
      body: bodySchema,
      params: paramsSchema
    }),
    asyncHandler(async (req, res) => {
      const assets = await upsertAsset(req.params.id, req.body);

      if (!assets) {
        throw httpError.InternalServerError('Could not update asset');
      }

      return res.json(assets);
    })
  );

  router.delete(
    '/:id',
    schemaValidation({
      params: paramsSchema
    }),
    asyncHandler(async (req, res) => {
      const assets = await getAssetById(req.params.id);

      if (!assets) {
        throw httpError.NotFound('Could not find asset to remove');
      }

      try {
        await removeAsset(assets);
      } catch (err) {
        throw httpError.InternalServerError('Could not remove asset');
      }

      return res.json({
        message: `Asset: ${assets.name} was removed successfully`
      });
    })
  );
};
