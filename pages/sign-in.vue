<template>
  <v-container
    class="d-flex align-center justify-center fill-height full-width animate__animated animate__fadeIn"
  >
    <sign-in></sign-in>
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
  background-color: #000000;
  background-image: url("/img/cyber.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.card-custom {
  border-radius: 16px; /* Rounded corners */
  background-color: white;
  padding: 16px;
}

.v-card-title {
  font-weight: bold;
}
</style>