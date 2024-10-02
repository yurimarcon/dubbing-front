<template>
  <v-app id="inspire">
  <ClerkLoaded>
    <v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
        <NuxtLink to="/">
          <v-btn color="white" icon="mdi-translate-variant"></v-btn>
        </NuxtLink>
      </template>
    </v-app-bar>

    <v-main>
      <!-- O NuxtPage deve estar aqui -->
      <NuxtPage />
    </v-main>

    <v-footer app absolute color="primary" dark>
      <v-col class="text-center">
        <span>&copy; 2024 Video Translator - All rights reserved</span>
      </v-col>
    </v-footer>
  </ClerkLoaded>
  </v-app>
</template>

<style scoped>
v-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
