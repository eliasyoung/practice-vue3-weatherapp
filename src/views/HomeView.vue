<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        placeholder="输入城市名并搜索"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
        v-model.trim="searchQuery"
        @keyup.enter="getSearchResult"
        @focus="clearSearchResult"
      />
      <ul
        v-if="amapSearchResult"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <p v-if="amapSearchResult.length === 0">没有找到合适的结果</p>
        <li
          class="py-2 cursor-pointer"
          v-for="result in amapSearchResult"
          :key="result.id"
          @click="previewCity(result)"
        >
          {{ result.name }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { initPlaceSearch } from "@/utils/amapHelper.js";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";

const router = useRouter();

const placeSearch = initPlaceSearch("全国", "zh_cn", "all");

const searchQuery = ref("");
const amapSearchResult = ref(null);
// const queryTimer = ref(null);

const getSearchResult = () => {
  // clearTimeout(queryTimer.value);
  // queryTimer.value = setTimeout(() => {
  //   if(searchQuery.value != '') {
  //   }
  // }, 3000);
  if (searchQuery.value != "") {
    placeSearch.search(searchQuery.value, function (status, result) {
      // 查询成功时，result即对应匹配的POI信息
      if (status === "complete" && result.info === "OK") {
        amapSearchResult.value = result.poiList.pois;
        return;
      }
      if (status === "no_data") {
      }
      amapSearchResult.value = [];
    });
  }
};

const clearSearchResult = () => {
  amapSearchResult.value = null;
};

const previewCity = (searchResult) => {
  console.log(searchResult);
  const { cityname: cityName, pname: pName, location, adcode } = searchResult;
  router.push({
    name: "cityView",
    params: {
      province: pName,
      city: cityName,
    },
    query: {
      lat: location.lat,
      lng: location.lng,
      adcode,
      preview: true,
    },
  });
};
</script>
