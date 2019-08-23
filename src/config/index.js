const path = require('path');
const dotenv = require('dotenv');

const envConfig = dotenv.config();
if (envConfig.error) {
  throw new Error('Could not find .env file');
}

const env = process.env.NODE_ENV || 'development';

const defaults = {
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  dialect: process.env.DB_DIALECT,
  jwtSecret: process.env.JWT_SECRET
};

const config = {
  development: {
    ...defaults,
    logLevel: 'debug',
    dialect: 'sqlite',
    storage: path.resolve('db.sqlite')
  },
  test: {
    ...defaults
  },
  production: {
    ...defaults
  }
};

module.exports = config[env];
