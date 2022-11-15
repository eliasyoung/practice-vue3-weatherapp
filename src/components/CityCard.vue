<template>
  <div></div>
</template>

<script setup>
const savedCities = ref([]);

const getCities = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const requests = [];
  savedCities.value.forEach(city => {
    requests.push()
    
  });
};
</script>
