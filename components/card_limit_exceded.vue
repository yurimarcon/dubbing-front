<script setup>
import { useUserStore } from "@/stores/user";
const storeUser = useUserStore();

onMounted(async () => await storeUser.getUserOnDatabase());

const timeMask = (value) => {
  const seconds = value;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes} minutos e ${remainingSeconds} segundos`;
};

import { useStripeStore } from "@/stores/stripe";
const storeStripe = useStripeStore();
const subscribeToPro = () => {
  storeStripe.createPortalSession(storeUser?.user_db?.stripe_id);
  load_subscribe.value = true;
  setTimeout(()=>{
    load_subscribe.value = false;
  }, 3000)
};

const load_subscribe = ref(false);
</script>

<template>
  <v-card class="pa-4 elevation-3 rounded-lg mt-10">
    <v-card-title>
      <v-icon class="mb-1" left>mdi-alert</v-icon>
      <span class="text-h6 ml-4">Atenção</span>
    </v-card-title>
    <v-progress-linear
      v-if="load_subscribe"
      color="primary"
      indeterminate
    ></v-progress-linear>
    <v-divider></v-divider>

    <v-card-text class="mt-3">
      <v-row>
        <v-col>
          <v-card-text class="text-medium-emphasis pa-6">
            <p>
              Esse video não pode ser processado devido a duração do vídeo
              ultrapassar o seu limite gratuito!
            </p>
            <p class="mt-2">
              Você possui <strong class="text-primary">10 minutos</strong> de
              vídeos grátis por mês e já usou
              <strong class="text-primary">{{
                timeMask(storeUser.user_db.seconds_processed_in_month)
              }}</strong
              >.
            </p>
            <p class="mt-2">
              Você ainda pode processar vídeos de no máximo
              <strong class="text-primary">{{
                timeMask(600 - storeUser.user_db.seconds_processed_in_month)
              }}</strong
              >, faça upgrade no seu plano para continuar aproveirando de forma
              <strong class="text-primary">ILIMITADA</strong>!
            </p>
          </v-card-text>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-btn
          variant="flat"
          text="Fazer upgrade"
          color="primary"
          class="rounded-pill"
          block
          @click="subscribeToPro"
        ></v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>