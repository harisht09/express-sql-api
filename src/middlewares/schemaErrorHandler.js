const { ValidationError } = require('express-json-validator-middleware');

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const { name, validationErrors } = err;
    return res.status(400).json({
      statusCode: 400,
      error: name,
      validationErrors
    });
  } else {
    next(err);
  }
};
