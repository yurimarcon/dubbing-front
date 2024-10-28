<template>
  <v-app>
    <v-container class="fill-height d-flex justify-center align-center">
      <LandigPageMainSection />
      <v-divider id="comofunciona"/>
      <LandigPageHowitworks  />
      <v-divider id="precos"/>
      <LandigPagePrices  />
      <v-divider id="desenvolva-projetos"/>
      <LandigPageDevelopProjects  />
    </v-container>
  </v-app>
</template>
  
<script setup>

definePageMeta({
  layout: "landingpage",
  middleware: "guest",
});
</script>
