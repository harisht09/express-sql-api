module.exports = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  const { name, message, status } = err;
  if (!status) {
    return res.status(500).json({
      statusCode: '500',
      error: 'Internal Server Error'
    });
  }

  return res.status(status).json({
    statusCode: status,
    error: name,
    message
  });
};
