<script setup>
import { useCustomAlertStore } from '~/stores/customAlert'
const alertStore = useCustomAlertStore();

</script>

<template>
    <transition name="fade">
        <v-alert
            v-if="alertStore.alertVisibility"
            class="my-alert mt-10"
            color="#2A3B4D"
            density="compact"
            :icon="alertStore.type"
            :text="alertStore.message"
            elevation="2"
        ></v-alert>
    </transition>
  </template>
  
  
<style scoped>
.my-alert {
    position: fixed; /* Para ficar por cima de todos os elementos */
    top: 20px; /* Alerta no topo */
    left: 50%;
    transform: translateX(-50%); /* Centraliza horizontalmente */
    z-index: 9999; /* Alta prioridade na pilha de elementos */
    width: 300px; /* Define uma largura agradável */
    text-align: center;
}
</style>