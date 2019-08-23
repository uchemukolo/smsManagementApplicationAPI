require('dotenv').config();

const defaultConfig = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dialect: 'postgres'
};

const testConfig = {
  url: process.env.TEST_DATABASE_URL,
  dialect: 'postgres'
};

module.exports = {
  test: testConfig,
  development: defaultConfig,
  production: defaultConfig
};

