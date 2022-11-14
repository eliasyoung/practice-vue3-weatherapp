<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing the city, click the "+" icon to start
        tracking this city.
      </p>
    </div>
    <!-- weather overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">{{ formatDate }}</p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;C
      </p>
      <p>体感温度 {{ Math.round(weatherData.current.feelsLike) }}&deg;C</p>
      <p class="capitalize">
        {{ weatherData.current.text }}
      </p>
      <i
        :class="'qi-' + weatherData.current.icon"
        class="text-[150px] leading-normal"
      ></i>
    </div>
    <hr class="border-white border-opacity-10 border w-full" />

    <!-- hourly weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">逐小时预报</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.fxTime"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.fxTime).toLocaleTimeString("zh-CN", {
                  hour: "numeric",
                })
              }}
            </p>
            <i
              :class="'qi-' + hourData.icon"
              class="text-[32px] leading-normal"
            ></i>
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;C</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-white border-opacity-10 border w-full" />

    <!-- weekly weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">未来7天预报</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.fxDate"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.fxDate).toLocaleDateString("zh-CN", {
                weekday: "long",
              })
            }}
          </p>
          <i
            :class="'qi-' + day.iconDay"
            class="text-[32px] leading-normal"
          ></i>
          <div class="flex gap-2 flex-1 justify-end">
            <p>{{ Math.round(day.tempMax) }}&deg;C~{{ Math.round(day.tempMin) }}&deg;C</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const qWeatherApiKey = "";

const getWeatherData = async () => {
  try {
    const qWeatherApiUrl = "https://devapi.qweather.com/v7/weather/";

    const getWeatherQuery = {
      location: `${route.query.lng},${route.query.lat}`,
      key: qWeatherApiKey,
    };

    const formatUrlParams = new URLSearchParams(getWeatherQuery).toString();

    const response = [
      //currentweather
      await fetch(qWeatherApiUrl + "now?" + formatUrlParams),
      //24hours hourly
      await fetch(qWeatherApiUrl + "24h?" + formatUrlParams),
      //7days daily
      await fetch(qWeatherApiUrl + "7d?" + formatUrlParams),
    ];

    const resData = await Promise.all(response.map((res) => res.json()));
    const weatherData = {
      current: resData[0].now,
      hourly: resData[1].hourly,
      daily: resData[2].daily,
      currentTime: Date.now(),
    };
    return weatherData;
  } catch (err) {
    console.log(err);
  }
};

const weatherData = await getWeatherData();
console.log(weatherData);

const formatDate = computed(() => {
  return `${new Date(weatherData.currentTime).toLocaleDateString("zh-CN", {
    weekday: "short",
    day: "2-digit",
    month: "long",
  })} ${new Date(weatherData.currentTime).toLocaleTimeString("zh-CN", {
    timeStyle: "short",
  })}`;
});
</script>
