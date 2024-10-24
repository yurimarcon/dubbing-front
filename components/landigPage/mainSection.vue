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
  <v-row dense class="">
    <v-col cols="12" md="8">
      <h1 class="display-2 font-weight-bold">
        <span>{{ tempText }}</span>
      </h1>
      <h1 class="display-2 font-weight-bold mb-4">
        ao ClassDub
      </h1>
      <p class="subtitle-1 mb-8">
        Traduza aulas com poucos cliques! Aulas do YouTube ou upload, depois
        basta baixar ou assistir pela plataforma.
      </p>

      <nuxt-link to="/sign-in">
        <v-btn 
        color="primary" 
        variant="flat"
        class="ma-2 rounded-pill"
        text="Entrar"
        ></v-btn>
      </nuxt-link>

      <nuxt-link to="#comofunciona">
        <v-btn 
        color="primary"
        variant="flat"
        class="ma-2 rounded-pill btn-entrar"
        text="Saiba mais"
        ></v-btn>
      </nuxt-link>

    </v-col>
    <v-col 
    cols="4"
    class="d-none d-md-block"
    >
      <v-img 
      src="/img/video-no-bg.png" 
      />
    </v-col>
  </v-row>
</template>

<style scoped>
.v-row{
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
  /* margin: 0 auto; */
}
p {
  font-size: 25px;
}

h1 span {
  display: inline-block;
  border-right: 2px solid;
  animation: blink 0.75s step-end infinite;
}
.btn-entrar{
  background: linear-gradient(#1a1a1a, #1a1a1a) padding-box,
    linear-gradient(300deg, rgb(0, 191, 143), rgb(117, 89, 255)) border-box;
  border: 2px solid transparent;
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
  /* Ajuste o valor conforme necessário */
  h1 {
    font-size: 32px; /* Tamanho da fonte menor para dispositivos móveis */
  }
}
</style>