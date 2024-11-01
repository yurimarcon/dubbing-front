<script setup>
import Card_limit_exceded from "~/components/card_limit_exceded.vue";

const { id } = useRoute().params;
// let base_url = "http://localhost:49988/";
let base_url = "https://pky434u1q7.execute-api.us-east-1.amazonaws.com/Prod/";

const { data: process } = await useFetch(
  base_url + "api/process/get-by-process-id?processId=" + id
);

const preUrlVideo =
  base_url +
  "api/storage/GetPreSignedUrlToWatchVideoByProcessId?processId=" +
  id;
const { data: urlPreSigned } = await useFetch(preUrlVideo);
</script>

<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col
        v-if="process.statusDescription == 'ExidedLimit'"
        cols="12"
        md="8"
        class="d-flex justify-center"
      >
        <card_limit_exceded></card_limit_exceded>
      </v-col>

      <v-col
        v-else-if="process.statusDescription == 'Error'"
        cols="12"
        md="8"
        class="d-flex justify-center"
      >
        <card-process-error></card-process-error>
      </v-col>

      <v-col v-else cols="12" class="d-flex justify-center">
        <v-row>
          <v-col cols="12" sm="8"> 
            <v-card class="mx-auto rounded-xl animate__animated animate__fadeIn">
              <v-card-media>
                <v-responsive :aspect-ratio="16 / 9">
                  <video controls>
                    <source :src="urlPreSigned" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </v-responsive>
              </v-card-media>
              <v-card-subtitle class="text-center">
                <h3>{{ process.original_file_name }}</h3>
              </v-card-subtitle>
              <v-card-text class="text-center">
                <v-btn
                class="rounded-xl "
                  color="primary"
                  text="Download"
                  variant="flat"
                  :href="urlPreSigned"
                  download
                ></v-btn>
              </v-card-text>
            </v-card>
          </v-col>
  
          <v-col cols="12" sm="4">
            <TranslateVideoViewVueCardInfo :process="process"/>

            <v-btn
            class="mt-6 rounded-xl btn-gradient"
            color="primary"
            variant="flat"
            block
            to="/contact-us"
            text="Envie um feedback"
            ></v-btn>
          </v-col>
        </v-row>
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
  height: 70vh;
}
</style>
