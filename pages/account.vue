<script setup>
import { useStripeStore } from '@/stores/stripe'
import { useUserStore } from '@/stores/user'
const storeStripe = useStripeStore();
const storeUser = useUserStore()

watchEffect(()=>{
    if(storeUser?.user_db?.stripe_id)
        storeStripe.getSubscription(storeUser?.user_db?.stripe_id);
})

const formatCurrency = (amount) => {
    if(amount)
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: storeStripe.subscription_data?.currency.toUpperCase(),
        }).format(amount/100);
    else
        return "R$ 0,00"
};

const subscribeToPro = () => {
    storeStripe.createPortalSession(storeUser?.user_db?.stripe_id)
};

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
                  <p><strong>Plan:</strong> {{ storeStripe.subscription_data?.name }}</p>
                  <p><strong>Status:</strong> {{ storeStripe.subscription_data?.status }}</p>
                <p>
                  <strong>Price:</strong> {{ formatCurrency(storeStripe.subscription_data?.amount) }} /
                  {{ storeStripe.subscription_data?.interval }}
                </p>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn
              variant="flat"
              :text=" storeStripe.subscription_data?.name == 'Pro' ? 'Change plan' : 'Upgrade to Pro'"
              color="primary"
              class="rounded-pill"
              @click="subscribeToPro"
              ></v-btn>
              <!-- :disabled="userPlan.isPro" -->
          </v-card-actions>
        </v-card>
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
  