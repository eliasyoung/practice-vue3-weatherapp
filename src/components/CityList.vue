<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">订阅列表中没有城市。</p>
</template>

<script setup>
import CityCard from "./CityCard.vue";
import qweather from "@/utils/qweatherHelper.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);
const router = useRouter();

const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(qweather.getCurrentWeatherData(city.coords));
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.now;
    });
  }
};

await getCities();

const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: {
      province: city.province,
      city: city.city,
    },
    query: {
      lat: city.coords.lat,
      lng: city.coords.lng,
      id: city.id,
    },
  });
};
</script>
