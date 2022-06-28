// Update with your config settings.
const path = require('path');
// const conn = require('./db/connection');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'knexdb',
      user:     'root',
      password: 'root',
      host:     'localhost',
      port : '3306',
      insecureAuth : true
    },
    migrations: {
      directory: path.join(__dirname, './db/migrations'),
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'knexdb',
      user:     'knexuser',
      password: '',
      host:     'localhost',
      port : '3306',
      insecureAuth : true
    },
    migrations: {
      directory: path.join(__dirname, './db/migrations'),
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'knexdb',
      user:     'root',
      password: 'test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, './db/migrations'),
    }
  }

};
