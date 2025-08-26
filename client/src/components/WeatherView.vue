
<template>
  <b-container class="mt-3">
    <h5 class="mt-3">Погода в {{ cityName }}</h5>
    <b-button type="submit" variant="primary" class="mt-3" @click="onFetch">
      Оновити дані
    </b-button>

    <div v-if="current">
      <b-row class="mt-4 justify-content-center">
        <b-img
          class="weather-image--preview"
          :src="mapIcon(current.weathercode)"
        ></b-img>
        <h4 class="mt-1 ml-2">{{ current.temperature }}°C</h4></b-row
      >

      <h4>Прогноз на {{ forecast.length }} днів:</h4>
    </div>

    <b-table hover :items="forecast" :fields="fields" v-if="current">
      <template #cell(weathercode)="row">
        <b-img
          class="weather-image"
          :src="mapIcon(row.item.weathercode)"
        ></b-img>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapWeatherCodeToIcon } from "@/store/Weather/weatherIcons";

export default {
  data() {
    return {
      cityName: "Вінниця",
      fields: [
        { key: "date", label: "Дата" },
        { key: "tempMin", label: "Мін °C" },
        { key: "tempMax", label: "Макс °C" },
        { key: "weathercode", label: "Іконка" },
      ],
    };
  },
  computed: {
    ...mapGetters("weather", {
      forecast: "getForecast",
      current: "getCurrentWeather",
    }),
  },
  methods: {
    ...mapActions("weather", ["fetchWeatherByCity", "loadLocalForecast"]),
    mapIcon(code) {
      return mapWeatherCodeToIcon(code);
    },
    async onFetch() {
      await this.fetchWeatherByCity(this.cityName);
    },
  },
  mounted() {
    this.loadLocalForecast();
  },
};
</script>

<style scoped>
.weather-image--preview {
  width: 48px;
  height: 48px;
}
.weather-image {
  width: 36px;
  height: 36px;
}
</style>
