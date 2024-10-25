<script setup>
import 'animate.css'
import { useUserStore } from '@/stores/user'
const storeUser = useUserStore();

// definePageMeta({
//   middleware: "auth",
//   auth: {
//     guestRedirectUrl: "/sign-in",
//   },
// });

// Clerk user
const { user } = useUser();

watchEffect(() => {
  if (user.value) {
    storeUser.setUser(
      user.value.fullName, 
      user.value.id, 
      user.value.primaryEmailAddress?.emailAddress
    );
    storeUser.getUserOnDatabase();
  }
});

const drawer = ref(null);

const items = [
  { text: "Traduzir Video", icon: "mdi-video-vintage", to: "/translateVideo" },
  { text: "Contato", icon: "mdi-message-reply-text", to: "/contact-us" },
  { text: "Plano", icon: "mdi-cash-multiple", to: "/menage-plan" },
];

</script>

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

        <v-app-bar-title>ClassDub</v-app-bar-title>

        <v-spacer></v-spacer>

        <ChooseTheme class="mr-4"></ChooseTheme>
      </v-app-bar>

      <v-main>
        <NuxtPage></NuxtPage>
      </v-main>
    </ClerkLoaded>
  </v-app>
</template>

<style>
.cl-internal-1j7ahlv{
  width: 2.5rem !important;
  height: 2.5rem !important;
}
</style>
