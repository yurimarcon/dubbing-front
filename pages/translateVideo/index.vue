<script setup>
import { useTranslateVideoStore } from '~/stores/translate_video'
const storeVideo = useTranslateVideoStore()

onMounted(()=>{
  storeVideo.listProcess()
})

onUnmounted(()=>
  clearInterval(storeVideo.intervalId)
)

</script>

<template>
  <v-container fluid>
      <load-page v-if="storeVideo.load_videos_screen && storeVideo.videos.length == 0"></load-page>
      <div 
      v-if="!storeVideo.load_videos_screen && storeVideo.videos.length == 0"
      class="d-flex flex-column align-center mt-10"
      >
          <img 
          src="/img/start.svg" 
          width="300px"
          />
          <strong class="mx-auto mt-16 text-secondary">You dont have any translation yet.</strong>
      </div>
      <v-row dense>
        <v-card
        v-for="p in storeVideo.videos"
        :key="p.download_file_name"
        width="300px"
        class="mx-2 my-2 rounded-xl hover-up"
        :class="p?.unify_audio_done != '100%' ? 'disabled-card' : ''"
        >
        <NuxtLink 
        :to="'/projects/' + p.process_id"
        >
        <v-img
        class="align-end"
              :src="p.img ? 'http://127.0.0.1:5000/'+p.img : '/img/video.svg'"
              :class="p?.unify_audio_done != '100%' ? 'disabled-card-image' : ''"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="150px"
              cover
              >
              <v-card-title
                class="text-white d-flex aling-itens-center"
                :textContent="p.source_lang + ' ➡️ ' + p.target_lang"
              ></v-card-title>
            </v-img>

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
              :model-value="parseInt(p?.split_audio_done?.slice(0,-1))"
              size="50"
              >{{ p?.split_audio_done }}</v-progress-circular>
              
              <v-progress-circular
              color="lime"
              :model-value="parseInt(p?.transcript_audio_done?.slice(0,-1))"
              size="50"
            >{{ p?.transcript_audio_done }}</v-progress-circular>
 
            <v-progress-circular
              color="secondary"
              :model-value="parseInt(p?.create_audio_done?.slice(0,-1))"
              size="50"
            >{{ p?.create_audio_done }}</v-progress-circular>

            <v-progress-circular
              color="primary"
              :model-value="parseInt(p?.unify_audio_done?.slice(0,-1))"
              size="50"
            >{{ p?.unify_audio_done }}</v-progress-circular>
          </v-card-text>

        </NuxtLink>
          </v-card>
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
.disabled-card-image {
  opacity: 0.5;
}
</style>