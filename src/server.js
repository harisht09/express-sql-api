const express = require('express');
const expressPino = require('express-pino-logger');

module.exports = logger => {
  const app = express();

  app.use(expressPino({ logger }));

  return app;
};
