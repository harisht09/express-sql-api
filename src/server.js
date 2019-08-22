const express = require('express');
const expressPino = require('express-pino-logger');
const bodyParser = require('body-parser');

const routes = require('./api');
const errorHandler = require('./middlewares/errorHandler');
const schemaErrorHandler = require('./middlewares/schemaErrorHandler');

const API_VERSION = 1;

module.exports = logger => {
  const app = express();

  // logging
  app.use(expressPino({ logger }));

  // parse req.body into json
  app.use(bodyParser.json());

  // load api routes
  app.use(`/api/v${API_VERSION}`, routes());

  // schema error handler
  app.use(schemaErrorHandler);

  // general error handler
  app.use(errorHandler);

  return app;
};
