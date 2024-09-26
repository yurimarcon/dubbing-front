<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
  <v-switch
    v-model="theme.global.current.value.dark"
    color="indigo"
    :label="theme.global.current.value.dark ? '🌙' : '🌤️'"
    hide-details
    @click="toggleTheme"
  ></v-switch>
</template>
  