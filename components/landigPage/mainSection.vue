<script setup>
// Lista de palavras "Bem-vindo" em diferentes idiomas
const languages = [
  "Bem-vindo",
  "Bienvenido",
  "Welcome",
  "Bienvenuto",
  "Willkommen",
  "Benvenue",
  "欢迎",
  "ようこそ",
];
let tempText = ref("");

// Configurações da animação de digitação
let currentIndex = 0;
let currentText = "";
let isDeleting = false;
let typingSpeed = 150;
let delayAfterComplete = 2000;

// Função para digitar e apagar o texto
function typeEffect() {
  let currentLang = languages[currentIndex];

  if (isDeleting) {
    currentText = currentLang.substring(0, currentText.length - 1);
  } else {
    currentText = currentLang.substring(0, currentText.length + 1);
  }

  tempText.value = currentText;

  if (!isDeleting && currentText === currentLang) {
    setTimeout(() => {
      isDeleting = true;
    }, delayAfterComplete);
  } else if (isDeleting && currentText === "") {
    isDeleting = false;
    currentIndex = (currentIndex + 1) % languages.length;
  }

  setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed);
}

onMounted(() => {
  typeEffect();
});
</script>

<template>
  <v-row dense id="description-main">
    <div class="blur-background"></div> <!-- Div para o blur de fundo -->
    <v-col cols="12" md="8" >
      <div class="w-100 w-md-75" >
        
        <h1 class="display-2 font-weight-bold" style="margin-bottom: -20px">
          <span>{{ tempText }}</span>
        </h1>
        <h1 class="text-h4 text-md-h2 font-weight-bold my-6">ao ClassDub-AI</h1>
        <!-- <div class="text-body-1 text-medium-emphasis mb-10"> -->
        <div class="text-sm-h5 text-subtitle-1 text-medium-emphasis mt-4 mb-6">
          Traduza videos com poucos cliques! Aulas online ou upload, faça download ou assista pela plataforma.
        </div>
        
      </div>

      <nuxt-link to="/sign-in">
        <v-btn
          color="primary"
          variant="flat"
          class="ma-2 text-none rounded-pill"
          text="Entrar"
        ></v-btn>
      </nuxt-link>

      <nuxt-link to="#comofunciona">
        <v-btn
          append-icon="mdi-chevron-right"
          color="primary"
          variant="flat"
          class="ma-2 text-none rounded-pill btn-gradient"
          text="Saiba mais"
        ></v-btn>
      </nuxt-link>
    </v-col>
    <v-col cols="4" class="d-none d-md-block">
      <v-img src="/img/video-no-bg.png" style="z-index: 2;" />
    </v-col>
  </v-row>
</template>

<style scoped>
.v-row {
  margin: 50px 0 50px 0;
}

h1 {
  font-size: 68px;
  background: linear-gradient(
    300deg,
    rgb(0, 191, 143),
    rgb(117, 89, 255)
  ); /* Gradiente horizontal */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* Faz o texto ficar transparente, exibindo o gradiente */

  font-family: "Arial", sans-serif;
  white-space: nowrap;
  overflow: hidden;
  width: fit-content;
}

#description-main {
  position: relative;
}

.blur-background {
  position: absolute;
  top: 150px;
  right: 0;
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

h1 span {
  display: inline-block;
  border-right: 2px solid;
  animation: blink 0.75s step-end infinite;
}

/* Animação do cursor piscando */
@keyframes blink {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: rgb(180, 180, 180);
  }
}

@media (max-width: 600px) {
  h1 {
    font-size: 32px;
  }
}
@media (max-width: 960px) {
  .blur-background {
    width: 100%;
    height: 80px;
  }
}
</style>