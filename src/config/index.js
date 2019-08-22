const dotenv = require('dotenv');

const envConfig = dotenv.config();
if (envConfig.error) {
  throw new Error('Could not find .env file');
}

const env = process.env.NODE_ENV || 'development';

const defaults = {
  port: process.env.PORT || 4000,
  logLevel: process.env.LOG_LEVEL || 'info',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  dialect: process.env.DB_DIALECT
};

const config = {
  development: {
    ...defaults,
    dialect: 'sqlite',
    storage: '../db.sqlite'
  },
  test: {
    ...defaults
  },
  production: {
    ...defaults
  }
};

module.exports = config[env];
