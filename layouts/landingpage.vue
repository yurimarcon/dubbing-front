<script setup>
const drawer = shallowRef(false);

const items = [
  { title: "Como funciona", to: "#comofunciona" },
  { title: "Preços", to: "#precos" },
];
</script>

<template>
  <v-app id="inspire">
    <ClerkLoading>
      <LoadPage></LoadPage>
    </ClerkLoading>
    <ClerkLoaded></ClerkLoaded>
    <ClerkLoaded>
      <v-layout> 
        <v-navigation-drawer
          v-model="drawer"
          color="primary"
          disable-resize-watcher
        >
          <v-list nav id="btn-navbar">
            <NuxtLink v-for="item in items" :key="item.title" :to="item.to">
              <v-list-item link :title="item.title" />
            </NuxtLink>
          </v-list>
        </v-navigation-drawer>

        <v-app-bar color="transparent" flat>
          <template #prepend>
            <v-app-bar-nav-icon
              v-if="$vuetify.display.smAndDown"
              @click="drawer = !drawer"
            />
          </template>

          <div class="d-flex flex-1-1-0 ps-md-4">
            <NuxtLink to="/" class="d-flex align-center ml-4">
              <v-avatar
                style="width: 30px; height: 30px"
                image="/web-app-manifest-512x512.png"
              />
            </NuxtLink>
          </div>

          <div class="d-md-flex d-none ga-4 mx-auto">
            <v-btn
              v-for="item in items"
              :key="item.title"
              class="text-none"
              :text="item.title"
              @click="$router.push(item.to)"
            />
          </div>

          <div class="d-flex flex-1-1-0 pe-3">
              <v-btn
                append-icon="mdi-chevron-right"
                class="ms-auto text-none rounded-pill"
                variant="flat"
                color="primary"
                slim
                text="Entrar"
                @click="$router.push('/sign-in')"
              >
            </v-btn>
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

<style>
#btn-navbar .v-list-item-title {
  color: #e9e9e9 !important;
}

footer {
  opacity: 0.8 !important;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
