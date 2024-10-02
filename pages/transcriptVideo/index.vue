<template>
  <div class="d-flex flex-column align-center mt-10">
    <img src="/img/start.svg" width="300px" />
    <strong class="mx-auto mt-16 text-secondary"
      >You dont have any translation yet.</strong
    >
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  auth: {
    guestRedirectUrl: "/sign-in",
  },
});
</script>