<script setup>
import { useTranslateVideoStore } from "~/stores/translate_video";
const storeVideo = useTranslateVideoStore();
const props = defineProps(['process']);

const deleteItem = () => {
  props.process.is_deleted = true;
  storeVideo.deleteProcess(props.process.process_id);
};
const cancelProcessing = (item) => {
  // Lógica para cancelar processamento
  console.log("Cancelando processamento do item:", item);
};
</script>


<template>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" class="menu-button">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item @click="deleteItem()">
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
      <v-list-item disabled @click="cancelProcessing(p)">
        <v-list-item-title>Cancel process</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.menu-button {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.3); /* Fundo escuro semi-transparente */
}
</style>