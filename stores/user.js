import { defineStore } from "pinia";
import { useStripeStore } from './stripe' 

export const useUserStore = defineStore("user", {
  state: () => ({
    url_base: "https://pky434u1q7.execute-api.us-east-1.amazonaws.com/Prod/api/user/",
    name: null,
    id: null,
    email: null,
    user_db: null
  }),
  actions: {
    // Grava o usuário do Clerk no store
    // assim que faz o login
    setUser(user_name, user_id, user_email) {
      this.name = user_name;
      this.id = user_id;
      this.email = user_email;
    },
    // Busca o usuário na base e se não existir
    // cria o usuário na base e na Stripe.
    async getUserOnDatabase(){
      if(this.id){
        this.user_db = await $fetch(this.url_base + this.id)
        if(!this.user_db)
          this.createUserOnDatabase()
      }
    },
    async updateDatabaseUser(){
      await $fetch(this.url_base, {
        method: "PUT",
        body: JSON.stringify(this.user_db)
      })
    },
    async createUserOnDatabase(){
      await $fetch(this.url_base, {
        method: "POST",
        body: JSON.stringify({
          PK: "",
          SK: "",
          name: this.name,
          email: this.email,
          user_id: this.id,
          stripe_id: ""
        })
      })
      .then(async(res)=>{
        this.user_db = res;
        const storeStripe = useStripeStore();
        const data = await storeStripe.createUser(this.name, this.email);
        this.user_db.stripe_id = data.customerId
        await this.updateDatabaseUser();
        return;
      })
    }
  },
});
