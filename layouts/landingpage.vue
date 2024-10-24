<template>
  <v-app id="inspire">
    <ClerkLoading>
      <LoadPage></LoadPage>
    </ClerkLoading>
    <ClerkLoaded></ClerkLoaded>
    <ClerkLoaded>
      <v-app-bar color="primary" density="compact" class="app-bar">
        <template v-slot:prepend>
          <NuxtLink to="/" class="d-flex align-center ml-4">
            <v-img 
            style="width: 30px; height: 30px;"
            src="/web-app-manifest-512x512.png" 
            />
            <strong class="text-h5 ml-2">
              ClassDub
            </strong>
          </NuxtLink>
        </template>
        <NuxtLink to="#comofunciona">Como funciona</NuxtLink>
        <NuxtLink to="/#planos">Planos</NuxtLink>
        <NuxtLink to="/sign-in">
          <v-btn 
          color="secondary" 
          variant="flat" 
          elevated 
          text="Entrar"
          class="rounded-pill"
          ></v-btn>
        </NuxtLink>
        </v-app-bar>

      <v-main>
        <!-- O NuxtPage deve estar aqui -->
        <NuxtPage />
      </v-main>

      <v-footer app absolute color="primary" dark>
        <v-col class="text-center">
          <span>&copy; 2024 ClassDub - All rights reserved</span>
        </v-col>
      </v-footer>
    </ClerkLoaded>
  </v-app>
</template>

<style scoped>
.app-bar{
  opacity: 0.8;
}
.app-bar a{
  margin: 0 14px 0 14px;
  font-weight: 400;
  font-size: 22px;
  color: antiquewhite !important;
}
footer {
  opacity: 0.8 !important;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
