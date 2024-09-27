import { defineStore } from 'pinia'

export const useCustomAlertStore = defineStore('customAlert', {
  state: () => ({
    alertVisibility: false,
    message: "teste",
    type: "success"
  }),
  actions: {
    showAlert(message, type) {
        this.message = message;
        switch(type){
            case 1:
                this.type = "$success";
                break;
            case 2:
                this.type = "$info";
                break;
            case 3:
                this.type = "$warning";
                break;
            case 4:
                this.type = "$error";
                break;
            default:
                this.type = "$info"
        }
        this.alertVisibility = true;
        setTimeout(() => {
            this.alertVisibility = false;
        }, 3000);
    }
  }
})