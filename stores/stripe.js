import { defineStore } from 'pinia'

export const useStripeStore = defineStore('stripe', {
  state: () => ({
    url_base: "https://pky434u1q7.execute-api.us-east-1.amazonaws.com/Prod/api/payment/",
  }),
  actions: {
    async createUser(name, email) {
        return await $fetch(this.url_base + "create-customer", {
            method: "POST",
            body: JSON.stringify({
                Name: name,
                Email: email,
                Description: ""
            })
        })
    },
    async createPortalSession(user_stripe_id){
        console.log(user_stripe_id)
        const data = await $fetch(this.url_base + "create-portal-session", {
            method: "POST",
            body: JSON.stringify(user_stripe_id)
        })
        if(data?.url)
            window.location.href = data.url;
    }
  }
})