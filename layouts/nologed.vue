<template>
  <v-app id="inspire">
    <ClerkLoading>
      <LoadPage></LoadPage>
    </ClerkLoading>
    <ClerkLoaded></ClerkLoaded>
    <ClerkLoaded>
      <v-layout>
      <v-app-bar color="transparent" flat>
        <div class="d-flex flex-1-1-0 ps-md-4">
            <NuxtLink to="/" class="d-flex align-center ml-4">
              <v-avatar
                style="width: 30px; height: 30px"
                image="/web-app-manifest-512x512.png"
              />
            </NuxtLink>
          </div>
      </v-app-bar>

      <v-main :min-height="$vuetify.display.mdAndUp ? 800 : 550">
        <!-- O NuxtPage deve estar aqui -->
        <NuxtPage />
      </v-main>

      <v-footer app absolute color="primary" dark>
        <v-col class="text-center">
          <span>&copy; 2024 ClassDub - All rights reserved</span>
        </v-col>
      </v-footer>
    </v-layout>
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
footer{
  opacity: 0.8 !important;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
