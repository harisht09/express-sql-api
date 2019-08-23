const pino = require('pino');
const config = require('../config');

const logger = pino({ level: config.logLevel, prettyPrint: true });

module.exports = logger;
