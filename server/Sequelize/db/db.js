// db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME     || "drivers_db",
    process.env.DB_USER     || "postgres",
    process.env.DB_PASSWORD || "root",
    {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      dialect: "postgres",
      dialectOptions: {
        ssl: false,
      },
      logging: false,
    }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(" Sequelize підключився до бази");
  })
  .catch((err) => {
    console.error(" Помилка :", err.message);
  });

module.exports = sequelize;
