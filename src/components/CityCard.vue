<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.province }}</h3>
    </div>
    <div class="flex flex-col gap-2 justify-center">
      <p class="text-3xl">{{ Math.round(city.weather.temp) }}&deg;C</p>
      <div class=""></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    required: true,
  },
});
</script>
