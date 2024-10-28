<template>
  <v-row>
    <v-col cols="12" md="8" >
      <div class="w-100 w-md-75" >
        <h1 class="text-h4 text-md-h2 font-weight-bold my-6 mt-md-14 h1-landing-page">
            Tradução para diversas<br>
            finalidades!
        </h1>
        <div class="text-sm-h5 text-subtitle-1 text-medium-emphasis mt-4 mb-6">
          Traduza vídeos do YouTube, TikTok ou faça o upload de um arquivo MP4.
        </div>
        
      </div>

      <nuxt-link to="/sign-in">
          <v-btn
            append-icon="mdi-chevron-right"
            color="primary"
            variant="flat"
            class="ma-2 text-none rounded-pill btn-gradient"
            text="Conhecer a plataforma"
          ></v-btn>

      </nuxt-link>
    </v-col>
    <v-col cols="12" md="4" id="description-develop-projects"> 
        <div class="blur-background"></div> <!-- Div para o blur de fundo -->
        <v-img class="mt-md-4" src="/img/maintenance.svg" />
    </v-col>
  </v-row>
</template>

<style scoped>

#description-develop-projects {
  position: relative;
}

.blur-background {
  position: absolute;
  top: 200px;
  right: 100px;
  width: 45%;
  height: 150px; /* Ajuste conforme necessário para cobrir a altura do h1 */
  filter: blur(100px);
  background: linear-gradient(
    to bottom right,
    rgb(var(--v-theme-primary)),
    rgb(var(--v-theme-error))
  );
  z-index: 1; /* Coloca o blur atrás do conteúdo */
}

</style>