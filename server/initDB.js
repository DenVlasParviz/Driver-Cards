const pool = require("./db");
async function initDb() {
  const createTable = `
    CREATE TABLE IF NOT EXISTS drivers (
      id             SERIAL PRIMARY KEY,
      driver_number  INTEGER    UNIQUE NOT NULL,
      driver_name    VARCHAR(100) NOT NULL,
      car_weight     INTEGER    NOT NULL,
      weather_temp   DOUBLE PRECISION NOT NULL DEFAULT 0,
      weather_code   INTEGER    NOT NULL DEFAULT 0
    );
  `;
  try {
    await pool.query(createTable);
    console.log("Таблиця створена");
  } catch (error) {
    console.log("Помилка:", error);
  }
}
module.exports = initDb;
