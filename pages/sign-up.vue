<template>
  <v-container
    class="d-flex align-center justify-center fill-height full-width "
  >
  
    <sign-up></sign-up>
  </v-container>
</template>
  
  <script setup>
definePageMeta({
  layout: "nologed",
  middleware: 'guest'
});
</script>
  
<style scoped>
.v-container {
  height: 100%;
  max-width: 100%;
}

.fill-height {
  min-height: 100vh;
  /* background-color: #f3e5f5; Light purple background */
  background-color: #000000;
  background-image: url("img/cyber.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>