<script setup>
const { id } = useRoute().params;
let video_path = "http://127.0.0.1:5000/";
const { data: process } = await useFetch(
  "http://127.0.0.1:5000/process-by-id?process_id=" + id
);
video_path +=
  process.value.relative_path + "/" + process.value.download_file_name;

import { useTranslateVideoStore } from '@/stores/translate_video'
const videoStore = useTranslateVideoStore()

</script>

<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" class="d-flex justify-center">
        <v-card class="mx-auto" max-width="1200">
          <v-card-media>
            <!-- Video Player -->
            <v-responsive :aspect-ratio="16 / 9">
              <video controls>
                <source :src="video_path" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </v-responsive>
          </v-card-media>
          <v-card-subtitle class="text-center">
            <h3>{{ process.original_file_name }}</h3>
          </v-card-subtitle>
          <v-card-text class="text-center">
            <v-btn 
            color="primary" 
            text="Download" 
            variant="outlined"
            @click="videoStore.downloadVideo(process.relative_path + '/' +process.download_file_name)"
            ></v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <style scoped>
.v-card-media {
  margin-bottom: 1rem;
}

video {
  width: 100%;
  height: auto;
}
</style>