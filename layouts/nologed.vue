<template>
  <v-app id="inspire">
    <ClerkLoading>
      <LoadPage></LoadPage>
    </ClerkLoading>
    <ClerkLoaded></ClerkLoaded>
    <ClerkLoaded>
      <v-app-bar color="primary" density="compact" class="app-bar">
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
          <span>&copy; 2024 Class Translator - All rights reserved</span>
        </v-col>
      </v-footer>
    </ClerkLoaded>
  </v-app>
</template>

<style scoped>
.app-bar{
  opacity: 0.8;
}
footer{
  opacity: 0.8 !important;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
