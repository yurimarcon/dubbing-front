<template>
  <v-app class="bg-init">
    <v-container class="fill-height d-flex justify-center align-center">
      <v-row class="text-center">

        <v-col cols="12">
          <h1 class="display-2 font-weight-bold mb-4">
            Welcome to Video Translator
          </h1>
          <p class="subtitle-1 mb-8">
            Translate your videos seamlessly in just a few clicks. Upload,
            translate, and download!
          </p>

          <nuxt-link to="/sign-in">
            <v-btn color="primary" class="ma-2"> Login </v-btn>
          </nuxt-link>

          <nuxt-link to="/sign-in">
            <v-btn color="secondary" outlined class="ma-2"> Learn More </v-btn>
          </nuxt-link>

        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
  
<script setup>

definePageMeta({
  layout: 'nologed',
  middleware: 'guest', 
  auth: { 
    authenticatedRedirectUrl: '/sign-in' 
  } 
})

</script>
  
<style scoped>
.bg-init{
  background-image: url("img/brain-ai.png") !important; 
  background-color: black;
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  height: 100vh; 
  color: white; 
}
</style>
  