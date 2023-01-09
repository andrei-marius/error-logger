const config = require('./config');

const Pool = require('pg').Pool;

const pool = new Pool(config.postgresConfig);

module.exports = pool;