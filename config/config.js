const { DB_HOST,DB_PORT,DB_PASSWORD,DB_USERNAME,DB_NAME } = require('./env.config');

module.exports = {
  // Development environment configuration
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
  },
  // Test environment configuration (optional)
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
  },
  // Production environment configuration (optional)
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
  },
};
