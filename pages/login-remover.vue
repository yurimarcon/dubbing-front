<template>
  <v-container
    class="d-flex align-center justify-center fill-height full-width "
  >
  
    <sign-in></sign-in>
    <!-- <sign-up></sign-up> -->
    <!-- <v-card class="elevation-12 card-custom bg-init" width="300">
      <v-card-title class="d-flex justify-center">Login</v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            label="Email"
            v-model="email"
            :rules="emailRules"
            prepend-icon="mdi-email"
            type="email"
            required
          />
          <v-text-field
            label="Password"
            v-model="password"
            :rules="passwordRules"
            prepend-icon="mdi-lock"
            type="password"
            required
          />

          <v-checkbox v-model="remember" label="Remember me"></v-checkbox>
        </v-form>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn 
        color="primary" 
        variant="flat"
        @click="login"
        >Login</v-btn>
      </v-card-actions>

      <v-card-actions class="d-flex justify-center">
        <v-btn 
        text
        color="primary" 
        @click="forgotPassword"
        >Forgot Password?</v-btn>
      </v-card-actions>
    </v-card> -->
  </v-container>
</template>
  
  <script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()

definePageMeta({
  layout: "nologed",
});

const email = ref("");
const password = ref("");
const remember = ref(false);

const emailRules = [
  (v) => !!v || "Email is required",
  //(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];
const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 4 || "Password must be at least 6 characters long",
];

const login = () => {
  if (email.value == "admin" && password.value == "1234") {
    setCookie('auth', 'token_value', 7);
    router.push('/translateVideo')
  }
};

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiração em dias
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const forgotPassword = () => {
  alert("In development...");
};
</script>
  
<style scoped>
.v-container {
  height: 100%;
  max-width: 100%;
}

.fill-height {
  min-height: 100vh;
  /* background-color: #f3e5f5; Light purple background */
  background-color: #000000;
  background-image: url('img/cyber.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.card-custom {
  border-radius: 16px; /* Rounded corners */
  background-color: white;
  padding: 16px;
}

.v-card-title {
  font-weight: bold;
}

</style>