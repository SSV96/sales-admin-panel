require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'password',
    database: process.env.PG_DATABASE || 'wholesaler',
    host: process.env.PG_HOST || '127.0.0.1',
    dialect: 'postgres',
    port: process.env.PG_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Use false only for local development with SSL
      },
    },
  },
  test: {
    username: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'password',
    database: process.env.PG_DATABASE_TEST || 'wholesaler_test',
    host: process.env.PG_HOST || '127.0.0.1',
    dialect: 'postgres',
    port: process.env.PG_PORT || 5432,
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Use false only for local development with SSL
      },
    },
  },
};
