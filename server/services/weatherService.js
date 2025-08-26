const axios = require("axios");
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const BASE_URL = "https://api.open-meteo.com/v1/forecast";


async function getCoordinatesByCity(cityName) {
  const params = {
    name: cityName,
    language: "uk",
  };
  const resp = await axios.get(GEO_URL, { params });
  const { latitude, longitude, name } = resp.data.results[0];
  return { latitude, longitude, name };
}

async function getWeather(latitude, longitude) {
  const params = {
    latitude,
    longitude,
    forecast_days: 7,
    daily: "weathercode,temperature_2m_max,temperature_2m_min",
    current_weather: true,
    timezone: "Europe/Kyiv",
  };
  const resp = await axios.get(BASE_URL, { params });
  const data = resp.data;
  return {
    dateTime: data.current_weather.time,
    temperature: data.current_weather.temperature,
    weathercode: data.current_weather.weathercode,
  };
}
module.exports = { getCoordinatesByCity, getWeather };
