const config = require('./config');
const logger = require('./utils/logger');
const server = require('./server')(logger);

server.listen(config.port, err => {
  if (err) {
    logger.error(err);
    process.exit(1);
    return;
  }
  logger.info(`Server listening on port: ${config.port}`);
});
