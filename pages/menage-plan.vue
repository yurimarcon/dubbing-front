<script setup>
import { useStripeStore } from "@/stores/stripe";
import { useUserStore } from "@/stores/user";
const storeStripe = useStripeStore();
const storeUser = useUserStore();

watchEffect(() => {
  if (storeUser?.user_db?.stripe_id)
    storeStripe.getSubscription(storeUser?.user_db?.stripe_id);
});

const formatCurrency = (amount) => {
  if (amount)
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: storeStripe.subscription_data?.currency.toUpperCase(),
    }).format(amount / 100);
  else return "R$ 0,00";
};

const subscribeToPro = () => {
  storeStripe.createPortalSession(storeUser?.user_db?.stripe_id);
};

const limit_usage = computed(()=>
  Math.round((storeUser?.user_db?.seconds_processed_in_month*100)/600)
);
</script>

<template>
  <v-container class="pa-4" fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <!-- Card com detalhes do plano atual -->
        <v-card class="pa-4 elevation-3 rounded-lg mt-10">
          <v-card-title>
            <v-icon class="mb-1" left>mdi-account-circle</v-icon>
            <span class="text-h6 ml-4">Your Current Plan</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-progress-linear
            v-if="storeStripe.loading_card_plan"
            color="primary"
            indeterminate
          ></v-progress-linear>

          <v-card-text class="mt-3">
            <v-row>
              <v-col>
                <p>
                  <strong>Plan:</strong>
                  {{ storeStripe.subscription_data?.name }}
                </p>
                <p>
                  <strong>Status:</strong>
                  {{ storeStripe.subscription_data?.status }}
                </p>
                <p>
                  <strong>Price:</strong>
                  {{ formatCurrency(storeStripe.subscription_data?.amount) }} /
                  {{ storeStripe.subscription_data?.interval }}
                </p>

                <v-card-text 
                class="text-medium-emphasis pa-6"
                v-if="!storeStripe.subscription_data?.amount"
                >
                  <v-progress-linear
                    bg-color="surface-variant"
                    class="mb-6"
                    color="primary"
                    height="10"
                    model-value="90"
                    rounded="pill"
                  ></v-progress-linear>
                  <div>Você usou {{ limit_usage }}% do seu limite grátis</div>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-row class="d-flex justify-space-between">
          <v-col>
            <v-card class="pa-4 elevation-3 rounded-lg mt-10" height="340">
              <v-card-title>
                <span class="text-h6 ml-4">Free</span>
              </v-card-title>
              <v-divider></v-divider>

              <v-card-text class="mt-3">
                <v-row>
                  <v-col>
                    <ul>
                      <li>10 min de videos por mês</li>
                      <li>Menor velocidade de processamento</li>
                      <li>Baixa prioridade em filas de processamento</li>
                      <li>Sem suporte técnico</li>
                    </ul>
                    <p class="text-h5 mt-4">
                      <strong>
                        {{ formatCurrency() }}
                        / Mês
                      </strong>
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-4 elevation-3 rounded-lg mt-10" height="340">
              <v-card-title>
                <span class="ml-2">🚀</span>
                <span class="text-h6 ml-2">Pro</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="mt-3">
                <v-row>
                  <v-col>
                    <ul>
                      <li>Videos ilimitados</li>
                      <li>Maior velocide de processamento</li>
                      <li>Prioridade em filas de processamento</li>
                      <li>Suporte técnico</li>
                    </ul>
                    <p class="text-h5 mt-4">
                      <strong> R$ 29,90 / Mês </strong>
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  variant="flat"
                  :text="
                    storeStripe.subscription_data?.amount
                      ? 'Gerenciar plano'
                      : 'Fazer upgrade'
                  "
                  color="primary"
                  class="rounded-pill"
                  @click="subscribeToPro"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>  

<style scoped>
.v-card {
  border-radius: 16px;
}
.v-btn {
  width: 100%;
}
</style>
  