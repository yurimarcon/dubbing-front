<template>
  <v-app class="bg-init">
    <v-container class="fill-height d-flex justify-center align-center">
      <v-row class="text-center">

        <v-col cols="12">
          <h1 class="display-2 font-weight-bold mb-4">
            <span >{{ tempText }}</span> to ClassDub
          </h1>
          <p class="subtitle-1 mb-8">
            Translate your classes seamlessly in just a few clicks. From YouTube or Upload,
            translate, and download!
          </p>

          <nuxt-link to="/sign-in">
            <v-btn 
            color="primary" 
            variant="outlined" 
            class="ma-2"
            > 
              Login 
            </v-btn>
          </nuxt-link>

          <!-- <nuxt-link to="/sign-in">
            <v-btn color="secondary" outlined class="ma-2"> Learn More </v-btn>
          </nuxt-link> -->

        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
  
<script setup>

definePageMeta({
  layout: 'nologed',
  middleware: 'guest'
})

// Lista de palavras "Bem-vindo" em diferentes idiomas
const languages = ["Welcome", "Bienvenido", "Bienvenue", "Willkommen", "Benvenuto", "Bem-vindo", "欢迎", "ようこそ"];
let tempText = ref("")

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

onMounted(()=>{
  typeEffect()
})

</script>
  
<style scoped>
.bg-init{
  /* background-image: url("/img/brain-ai.png") !important;  */
  background-color: #1a1a1a;
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  height: 100vh; 
  color: white; 
}
h1 {
  font-size: 68px;
  background: linear-gradient(300deg, rgb(0, 191, 143),  rgb(117, 89, 255)); /* Gradiente horizontal */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* Faz o texto ficar transparente, exibindo o gradiente */

  font-family: 'Arial', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  width: fit-content;
  margin: 0 auto;
}
p{
  font-size: 20px;
}

h1 span {
  display: inline-block;
  border-right: 2px solid;
  animation: blink 0.75s step-end infinite;
}

/* Animação do cursor piscando */
@keyframes blink {
  from, to { border-color: transparent; }
  50% { border-color: rgb(180, 180, 180); }
}

@media (max-width: 600px) { /* Ajuste o valor conforme necessário */
  h1 {
    font-size: 32px; /* Tamanho da fonte menor para dispositivos móveis */
  }
}
</style>
  