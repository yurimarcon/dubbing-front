<script setup>
import { useTranslateVideoStore } from "~/stores/translate_video";
const storeVideo = useTranslateVideoStore();

definePageMeta({
  middleware: "auth",
  auth: {
    guestRedirectUrl: "/sign-in",
  },
});

onMounted(() => {
  storeVideo.listProcess();
});

onUnmounted(() => clearInterval(storeVideo.intervalId));
</script>

<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <CreateProject />
      </v-col>
      <v-divider class="mb-4" />
    </v-row>
    <load-page
      v-if="storeVideo.load_videos_screen && storeVideo.videos.length == 0"
    ></load-page>
    <v-row
      v-if="!storeVideo.load_videos_screen && storeVideo.videos.length == 0"
    >
      <v-col class="d-flex flex-column align-center animate__animated animate__fadeIn">
        <img  src="/img/start.svg" width="300px" />
        <strong class="mx-auto mt-16 text-secondary"
          >You dont have any translation yet.</strong
        >
      </v-col>
    </v-row>
    <v-row dense align="start" class="pa-4">
      <v-col
        v-for="video in storeVideo.videos"
        :key="video.processId"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex pa-4"
      >
      <card-video
      class=" animate__animated animate__fadeIn"
      :video="video"
      ></card-video>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.hover-up {
  transition: transform 0.3s ease;
}
.hover-up:hover {
  transform: translateY(-5px);
}
.disabled-card {
  pointer-events: none;
  cursor: wait;
}
</style>
