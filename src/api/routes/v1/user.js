const router = require('express-promise-router')();
const httpError = require('http-errors');

const { getUserByUsername, authenticateUser } = require('../../../services/user');

module.exports = app => {
  app.use('/users', router);

  router.post('/authenticate', async (req, res) => {
    const user = await getUserByUsername(req.body.username);

    if (!user) {
      const message = 'User not found';
      req.log.error(message);
      throw httpError.NotFound(message);
    }

    const authenticated = await authenticateUser(user, req.body.password);

    if (!authenticated) {
      const message = 'Incorrect login details';
      req.log.error(message);
      throw httpError.Unauthorized(message);
    }

    return res.json(authenticated);
  });
};
