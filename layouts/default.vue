<template>
  <v-app id="inspire">
    <ClerkLoading>
      <LoadPage></LoadPage>
    </ClerkLoading>
    <ClerkLoaded>
      <customAlert></customAlert>

      <v-navigation-drawer v-model="drawer">
        <v-layout>
          <v-navigation-drawer absolute permanent>
            <v-list>
              <v-row class="mt-2 mb-1">
                <v-col cols="3" class="d-flex align-center">
                  <button-profile class="ml-4 mt-1" />
                </v-col>
                <v-col cols="9">
                  <v-list-item-title>{{ user?.firstName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ user?.primaryEmailAddress?.emailAddress }}</v-list-item-subtitle>
                </v-col>
              </v-row>
              <!-- <v-list-item
              class="mt-6"
              prepend-avatar="https://raw.githubusercontent.com/yurimarcon/avatars/refs/heads/main/Colored/ToyFaces_Colored_BG_59.jpg"
              subtitle="admin@gmail.com"
              title="Admin"
            >
              <template v-slot:append>
                <v-btn
                  icon="mdi-translate-variant"
                  size="small"
                  variant="text"
                ></v-btn>
              </template>
            </v-list-item> -->
              <CreateProject />
            </v-list>

            <v-divider></v-divider>

            <v-list :lines="false" density="compact" nav>
              <NuxtLink
                v-for="(item, i) in items"
                :key="i"
                :value="item"
                :to="item.to"
              >
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title
                    :textContent="item.text"
                  ></v-list-item-title>
                </v-list-item>
              </NuxtLink>
            </v-list>
          </v-navigation-drawer>

          <v-main style="height: 354px"></v-main>
        </v-layout>
      </v-navigation-drawer>

      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title>Dubbing AI</v-app-bar-title>

        <v-spacer></v-spacer>

        <ChooseTheme class="mr-4"></ChooseTheme>
      </v-app-bar>

      <v-main>
        <NuxtPage></NuxtPage>
      </v-main>
    </ClerkLoaded>
  </v-app>
</template>
  
<script setup>
const { user } = useUser();

console.log("user =>", user?.value)

const drawer = ref(null);

const items = [
  { text: "Translate Video", icon: "mdi-folder", to: "/translateVideo" },
  { text: "Translate Voice", icon: "mdi-folder", to: "/translateVoice" },
  { text: "Transcript Video", icon: "mdi-folder", to: "/transcriptVideo" },
  { text: "Transcript Voice", icon: "mdi-folder", to: "/transcriptVoice" },
];
</script>

<style>
.cl-internal-1j7ahlv{
  width: 2.5rem !important;
  height: 2.5rem !important;
}
</style>