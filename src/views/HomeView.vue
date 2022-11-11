<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        placeholder="Search for a city or state"
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
        >
          {{ result.name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { initPlaceSearch } from "@/utils/amapHelper.js";

const placeSearch = initPlaceSearch();

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
</script>
