import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "admin",
    id: "12522417-d30a-4163-ad20-92b344884b84",
    email: null,
  }),
  actions: {
    setUser(user_name, user_id, user_email) {
      this.name = user_name;
      this.id = user_id;
      this.email = user_email;
    },
  },
});
