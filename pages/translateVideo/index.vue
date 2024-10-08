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
      <v-col class="d-flex flex-column align-center">
        <img src="/img/start.svg" width="300px" />
        <strong class="mx-auto mt-16 text-secondary"
          >You dont have any translation yet.</strong
        >
      </v-col>
    </v-row>
    <v-row dense align="start" class="pa-4">
      <v-col
        v-for="p in storeVideo.videos"
        :key="p.download_file_name"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex pa-4"
      >
        <v-card
          width="100%"
          class="mx-auto my-2 rounded-xl hover-up"
          :class="p?.unify_audio_done != '100%' ? 'disabled-card' : ''"
        >
          <div class="image-container">
            <NuxtLink :to="'/translateVideo/' + p.process_id">
              <v-img
                class="align-end"
                :src="
                  p.unify_audio_done == '100%'
                    ? '/img/video.svg'
                    : '/img/cube-ai.gif'
                "
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="150px"
                cover
              >
                <v-card-title
                  class="text-white d-flex align-items-center"
                  :textContent="p.source_lang + ' ➡️ ' + p.target_lang"
                ></v-card-title>
              </v-img>
            </NuxtLink>

            <card-menu :processId="p.process_id" />
          </div>

          <v-card-title
            class="truncate-text text-subtitle-1 text-medium-emphasis mt-2"
          >
            {{ p.original_file_name }}
          </v-card-title>

          <v-card-subtitle class="mb-2">
            {{ p.start_time }}
          </v-card-subtitle>

          <v-card-text class="d-flex justify-space-between">
            <v-progress-circular
              color="deep-orange-lighten-2"
              :model-value="parseInt(p?.split_audio_done?.slice(0, -1))"
              size="50"
              >{{ p?.split_audio_done }}</v-progress-circular
            >

            <v-progress-circular
              color="lime"
              :model-value="parseInt(p?.transcript_audio_done?.slice(0, -1))"
              size="50"
              >{{ p?.transcript_audio_done }}</v-progress-circular
            >

            <v-progress-circular
              color="secondary"
              :model-value="parseInt(p?.create_audio_done?.slice(0, -1))"
              size="50"
              >{{ p?.create_audio_done }}</v-progress-circular
            >

            <v-progress-circular
              color="primary"
              :model-value="parseInt(p?.unify_audio_done?.slice(0, -1))"
              size="50"
              >{{ p?.unify_audio_done }}</v-progress-circular
            >
          </v-card-text>
        </v-card>
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