<template>
  <v-row dense class="d-flex justify-center">
    <v-col
      cols="12"
      md="8"
      class="d-flex justify-center flex-column text-center"
    >
      <v-responsive class="text-center mx-auto mb-2" max-width="700">
        <h1 class="text-md-h4 font-weight-bold mb-4 text-sm-h5">
          Como funciona
        </h1>

        <p class="text-subtitle-1 text-medium-emphasis">
          Assista um video curto para entender melhor como a plataforma.
        </p>
      </v-responsive>
      <v-card class="mx-auto rounded-xl">
        <v-card-media>
          <!-- Video Player -->
          <v-responsive :aspect-ratio="16 / 9">
            <iframe
              width="660"
              height="415"
              src="https://www.youtube.com/embed/Oih5cphl3fo?si=TT5C1orymiXnqEHI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <!-- <video controls>
                <source 
                    :src="urlPreSigned" 
                    type="video/mp4" 
                    />
                Your browser does not support the video tag.
            </video> -->
          </v-responsive>
        </v-card-media>
        <v-card-subtitle class="text-center">
          <h3>Esse video será substituído...</h3>
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.v-row {
  margin: 50px 0 50px 0;
}
</style>