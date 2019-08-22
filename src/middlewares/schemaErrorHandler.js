module.exports = (err, req, res, next) => {
  if (err.name === 'JsonSchemaValidation') {
    return res.status(400).json({
      statusCode: 400,
      error: err.name,
      validations: err.validations
    });
  } else {
    next(err);
  }
};
