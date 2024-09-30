<script setup>
const { id } = useRoute().params;
let base_url = "http://localhost:49988/";

const { data: process } = await useFetch(
  base_url + "api/process/get-by-process-id?processId=" + id
);

// import { useTranslateVideoStore } from '@/stores/translate_video'
// const videoStore = useTranslateVideoStore()

const preUrlVideo = base_url + "api/storage/GetPreSignedUrlToWatchVideoByProcessId?processId=" + id
const {data : urlPreSigned } = await useFetch(preUrlVideo)
</script>

<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" class="d-flex justify-center">
        <v-card class="mx-auto" max-width="1200" max-height="100vh">
          <v-card-media>
            <!-- Video Player -->
            <v-responsive :aspect-ratio="16 / 9">
              <video controls>
                <source 
                :src="urlPreSigned" 
                type="video/mp4" 
                />
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
            :href="urlPreSigned"
            download
            ></v-btn>
            <!-- @click="videoStore.downloadVideo(process.relative_path + '/' +process.download_file_name)" -->
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