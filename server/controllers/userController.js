const db = require("../db");
const weatherService = require("../services/weatherService");

const city = "Вінниця";

class DriverController {
  // POST /api/info/card
  async createDriver(req, res) {
    try {
      const { driver_number, driver_name, car_weight } = req.body;

      // отримуємо кординати та погоду
      const { latitude, longitude } =
        await weatherService.getCoordinatesByCity(city);
      const { temperature, weathercode } = await weatherService.getWeather(
        latitude,
        longitude,
      );

      // вставляємо в базу даних з карткою дані про погоду
      const result = await db.query(
        `INSERT INTO drivers
           (driver_number, driver_name, car_weight, weather_temp, weather_code)
         VALUES ($1,$2,$3,$4,$5)
         RETURNING *`,
        [driver_number, driver_name, car_weight, temperature, weathercode],
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
    }
  }

  // GET /api/info/card
  async getDrivers(req, res) {
    try {
      const result = await db.query("SELECT * FROM drivers ORDER BY id");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch drivers" });
    }
  }

  // GET /api/info/card/{id}
  async getDriverById(req, res) {
    try {
      const id = req.params.id;
      const result = await db.query("SELECT * FROM drivers WHERE id = $1", [
        id,
      ]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
    }
  }

  // DELETE /api/info/card/{id}
  async deleteDriver(req, res) {
    try {
      const id = req.params.id;
      const drivers = await db.query("DELETE FROM drivers WHERE id = $1", [id]);
      res.json(drivers.rows[0]);
    } catch (error) {
      console.error(error);
    }
  }

  // GET /api/weather
  async getWeather(req, res) {
    try {
      const { latitude, longitude } =
        await weatherService.getCoordinatesByCity(city);
      const { temperature, weathercode } = await weatherService.getWeather(
        latitude,
        longitude,
      );
      res.json({ temperature, weathercode });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new DriverController();
