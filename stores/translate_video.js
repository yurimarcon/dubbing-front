import { defineStore } from "pinia";
import {useUserStore} from './user'
import { useCustomAlertStore } from '@/stores/customAlert'


export const useTranslateVideoStore = defineStore("translate", {
  state: () => ({
    // url_base: "http://127.0.0.1:5000/",
    url_base: "https://pky434u1q7.execute-api.us-east-1.amazonaws.com/Prod/api/",
    url_persigned_to_upload: "",
    intervalId: null,
    videos: [],
    load_videos_screen: true,
    dialog_upload: false,
    load_upload: false,
    fileInput: null,
    source_lang: "",
    target_lang: "",
    storage_file_name: "",
    process_type: "1"
  }),
  actions: {
    changeDialogUpload() {
      this.dialog_upload = !this.dialog_upload;
      this.fileInput = null;
      this.source_lang = "";
      this.target_lang = "";
    },
    changeLoadUpload() {
      this.load_upload = !this.load_upload;
    },
    async getPresignedUrl(){
      this.changeLoadUpload();
      const storeUser = useUserStore();

      if (!this.fileInput || !storeUser.name){
        this.changeLoadUpload();
        return;
      }

      try {

        const urlPresigned = `${this.url_base}storage/Get-GetPreSignedUrlRequest-Url?fileName=${this.fileInput.name}&userName=${storeUser.name}`;        
        const {url, fileName} = await $fetch(urlPresigned);
        this.url_persigned_to_upload = url;
        this.storage_file_name = fileName;

      } catch (error) {
        console.error("Error during file upload:", error);
      }
      this.changeLoadUpload();
    },
    async sendProcess(){
      this.changeLoadUpload();

      if (!this.fileInput || !this.source_lang || !this.target_lang) {
        this.changeLoadUpload();
        const alertStore = useCustomAlertStore();
        alertStore.showAlert("Every fieal is required!!!", 4)
        return false;
      }
      await this.videoUpload();
      await this.createProcess();

      this.changeDialogUpload();
      this.listProcess();
      this.changeLoadUpload();
      return true;
    },
    async videoUpload(){
      return new Promise(async(resolve, reject)=>{
  
        if (!this.fileInput){
          return;
        }
  
        try {
          await $fetch(this.url_persigned_to_upload ,{
            method: "PUT",
            body: this.fileInput
          });
          resolve();
        } catch (error) {
          console.error("Error during file upload:", error);
          reject();
        }
      })
    },
    async createProcess(){
      return new Promise(async(resolve, reject)=>{
        const storeUser = useUserStore(); 
        const data = {
          "pk": "process-dubbing-video",
          "sk": "admin 3",
          "source_lang": this.source_lang,
          "target_lang": this.target_lang,
          "user_name": storeUser.name,
          "user_id": storeUser.id,
          "original_file_name": this.fileInput.name,
          "original_file_path": this.storage_file_name,
          "process_type": this.process_type,
          "type": 1
        }
        
        try {
          await $fetch(`${this.url_base}process/createprocess`,{
            method: "POST",
            body: data
          }).then(res=> console.log(res))
          resolve()
        } catch (error) {
          console.error("Erro:", error);
          reject();
        }
      })
    },
    start_interval() {
      this.intervalId = setInterval(this.listProcess, 5000);
    },
    async listProcess() {
      this.load_videos_screen = true;
      
      const storeUser = useUserStore();
      
      try {
        await fetch(`${this.url_base}process/process-by-user?userId=${storeUser.id}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((res) => {
            let quantity_process_not_conclude = 0;
            res.forEach((p) => {
              if (p.unify_audio_done != "100%") quantity_process_not_conclude++;
            });

            if (res.length == 0) {
              clearInterval(this.intervalId);
            } else if (quantity_process_not_conclude == 0) {
              clearInterval(this.intervalId);
            } else {
              if (!this.intervalId) this.start_interval();
            }

            this.videos = res;
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            if (!this.intervalId) this.start_interval();
          });
      } catch (error) {
        if (!this.intervalId) this.start_interval();
        console.error("Failed to fetch data:", error);
      }
      this.load_videos_screen = false;
    },
    async downloadVideo(video_path) {
      await fetch(this.url_base + "/download?file_path=" + video_path)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao baixar o arquivo");
          }
          return response.blob(); // Obtém o arquivo como um blob
        })
        .then((blob) => {
          // Cria um link temporário para download
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "result.mp4"; // Nome do arquivo baixado
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url); // Libera o objeto URL
        })
        .catch((error) => {
          console.error("Erro ao baixar o arquivo:", error);
        });
    },
  },
});
