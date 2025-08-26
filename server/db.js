// db.js
const { Pool } = require("pg");

const pool = new Pool({
    user:     process.env.DB_USER     || "postgres",
    password: process.env.DB_PASSWORD || "root",
    host:     process.env.DB_HOST     || "localhost",
    port:     process.env.DB_PORT     ? parseInt(process.env.DB_PORT) : 5432,
    database: process.env.DB_NAME     || "drivers_db",
});

pool
    .connect()
    .then(client => {
        console.log(" Connected to Postgres:", client.connectionParameters.database);
        client.release();
    })
    .catch(err => console.error(" Connection error:", err));

module.exports = pool;
