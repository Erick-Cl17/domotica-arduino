// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// Ahora lee las credenciales desde variables de entorno (.env) en vez de tenerlas escritas directamente en el código.
require('dotenv').config();

module.exports = {

  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "./migrations"
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: 'knex_migrations' }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: 'knex_migrations' }
  }

};
