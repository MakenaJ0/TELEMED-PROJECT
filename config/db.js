//import
const mysql = require("mysql2");
require("dotenv").config();

// Create the database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Enable promise support
const promisePool = pool.promise();

// Export the promise-based pool- makes it available to other sections of the code
module.exports = pool.promise();
