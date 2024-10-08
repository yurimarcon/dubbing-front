<script setup>
import { loadStripe } from "@stripe/stripe-js";

definePageMeta({
  layout: "nologed",
  middleware: "guest",
});

const startCheckout = async () => {
  const stripe = await loadStripe(
    "pk_test_51Q7JpK2LFse3T3Tc3kh62gZZrKav1aG8kt17UzHBgchvUWlakXsMaxpLb1O4UfMMUXAlm1jaJNMHrtTEJYSLeeL300z2dr14gb"
  );

  // Chamar seu back-end para criar a sessão de pagamento
  const response = await $fetch("http://localhost:49988/api/payment/create-checkout-session", {
    method: "POST",
    data: {
      amount: 5000, // Valor em centavos, 50.00 USD
      productName: "Produto Exemplo",
    },
  });

  // Redirecionar o usuário para o checkout do Stripe
  const { sessionId } = response;
  stripe.redirectToCheckout({ sessionId });
  return;
};
</script>
  
<template>
  <div>
    <button @click="startCheckout()">Pagar agora</button>
  </div>
</template>
  