<template>
  <v-app class="bg-init">
    <v-container class="fill-height d-flex justify-center align-center">
      <LandigPageMainSection />
      <v-divider id="comofunciona"/>
      <LandigPageHowitworks  />
      <v-divider id="planos"/>
      <LandigPagePrices  />
    </v-container>
  </v-app>
</template>
  
<script setup>
definePageMeta({
  layout: "landingpage",
  middleware: "guest",
});
</script>
  
<style scoped>
.bg-init {
  /* background-image: url("/img/brain-ai.png") !important;  */
  background-color: #1a1a1a;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* height: 86vh; */
  color: white;
}
</style>
  