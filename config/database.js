const mysql = require('mysql2/promise');

const config = {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 50
}

const pool = mysql.createPool(config);

module.exports = pool;