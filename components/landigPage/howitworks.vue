<script setup>

</script>

<template>
  <v-row dense class="d-flex justify-center flex-row-reverse">
    <v-col
    cols="12"
    lg="6"
    >
    <v-responsive class="text-center mx-auto mb-2" max-width="700">
        <h1 class="text-lg-h3 font-weight-bold mb-4 text-h4 ">
          Como funciona
        </h1>

        <!-- <p class="text-subtitle-1 text-medium-emphasis"> -->
        <!-- <p class="text-sm-h5 text-subtitle-1 text-medium-emphasis mt-4 mb-6">
          Assista um video curto para entender melhor como a plataforma funciona.
        </p> -->
        <p class="text-sm-h5 text-subtitle-1 text-medium-emphasis mt-4 mb-6">
          Basta informar a url do vídeo ou fazer o upload de um arquivo MP4,
          dentro de alguns minutos sua aula estará traduzida.
        </p>

        <nuxt-link to="/sign-in">
        <v-btn
          append-icon="mdi-chevron-right"
          color="primary"
          variant="flat"
          class="ma-2 text-none rounded-pill btn-gradient"
          text="Acessar a plataforma"
        ></v-btn>
      </nuxt-link>
      </v-responsive>
    </v-col>
    <v-col
      cols="12"
      lg="6"
      class="d-flex justify-center flex-column text-center"
    >
      <v-card class="mx-auto rounded-xl">
        <v-card-media>
          <!-- Video Player -->
          <v-responsive :aspect-ratio="16 / 9">
            <!-- <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Oih5cphl3fo?si=TT5C1orymiXnqEHI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe> -->
            <video 
            width="560"
            height="315"
            controls
            >
                <source 
                    src="/demonstration.mp4" 
                    type="video/mp4" 
                    />
                Your browser does not support the video tag.
            </video>
          </v-responsive>
        </v-card-media>
        <v-card-subtitle class="text-center">
          <h3>Veja como funciona a plataforma</h3>
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