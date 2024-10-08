<script setup>

definePageMeta({
  // layout: "nologed",
  // middleware: "guest"
});

</script>
  
<template>
  <div>

    <stripe-pricing-table
      pricing-table-id="prctbl_1Q7eHv2LFse3T3TcsJPHBkRg"
      publishable-key="pk_test_51Q7JpK2LFse3T3Tc3kh62gZZrKav1aG8kt17UzHBgchvUWlakXsMaxpLb1O4UfMMUXAlm1jaJNMHrtTEJYSLeeL300z2dr14gb"
    >
    </stripe-pricing-table>
  </div>
</template>
  

<style>
.PricingTable-grid{
  height: 100vh !important;
}
</style>