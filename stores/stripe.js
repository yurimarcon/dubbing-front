import { defineStore } from 'pinia'

export const useStripeStore = defineStore('stripe', {
  state: () => ({
    url_base: "https://pky434u1q7.execute-api.us-east-1.amazonaws.com/Prod/api/payment/",
    loading_card_plan: false,
    subscription_data: null
  }),
  actions: {
    async createUser(name, email) {
        return await $fetch(this.url_base + "create-customer-and-subscription", {
            method: "POST",
            body: JSON.stringify({
                Name: name,
                Email: email 
            })
        })
    },
    async createPortalSession(user_stripe_id){
        const data = await $fetch(this.url_base + "create-portal-session", {
            method: "POST",
            body: JSON.stringify({
                customerId: user_stripe_id,
                returnUrl: window.location.href
            })
        })
        if(data?.url)
            window.location.href = data.url;
    },
    async getSubscription(user_stripe_id){
        this.loading_card_plan = true;
        const subscription = await $fetch(this.url_base + "subscriptions/" + user_stripe_id)
        this.subscription_data = subscription;
        this.loading_card_plan = false;
    }
  }
})