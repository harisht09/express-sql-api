const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const httpError = require('http-errors');

const { getUserByUsername, authenticateUser } = require('../../../services/user');

module.exports = app => {
  app.use('/users', router);

  router.post(
    '/authenticate',
    asyncHandler(async (req, res) => {
      const user = await getUserByUsername(req.body.username);

      if (!user) {
        throw httpError.NotFound('User not found');
      }

      const authenticated = await authenticateUser(user, req.body.password);

      if (!authenticated) {
        throw httpError.Unauthorized('Incorrect login details');
      }

      return res.json(authenticated);
    })
  );
};
