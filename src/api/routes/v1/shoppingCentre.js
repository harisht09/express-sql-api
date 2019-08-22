const router = require('express').Router();
const httpError = require('http-errors');
const asyncHandler = require('express-async-handler');

const {
  getAllShoppingCentres,
  getShoppingCentreById
} = require('../../../services/shoppingCentre');

module.exports = app => {
  app.use('/shoppingCentres', router);

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      let shoppingCentres = [];
      try {
        shoppingCentres = await getAllShoppingCentres();
      } catch (err) {
        throw httpError.InternalServerError(err);
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
};
