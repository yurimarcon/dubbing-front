import { defineStore } from "pinia";
import {useUserStore} from './user'

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
    target_lang: ""
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

        const url = `${this.url_base}storage/Get-GetPreSignedUrlRequest-Url?fileName=${this.fileInput.name}&userName=${storeUser.name}`;
        this.url_persigned_to_upload = await $fetch(url);

      } catch (error) {
        console.error("Error during file upload:", error);
      }
      this.changeLoadUpload();
    },
    async sendProcess(){
      this.changeLoadUpload();

      if (!this.fileInput || !this.source_lang || !this.target_lang) {
        this.changeLoadUpload();
        return;
      }

      this.videoUpload();
      this.createProcess();

      this.changeLoadUpload();
      this.changeDialogUpload();
      this.getVideos();
      
    },
    async videoUpload(){
      this.changeLoadUpload();

      if (!this.fileInput){
        this.changeLoadUpload();
        return;
      }

      try {
        await $fetch(this.url_persigned_to_upload ,{
          method: "PUT",
          body: fileInput,
        });
    
      } catch (error) {
        console.error("Error during file upload:", error);
      }
      this.changeLoadUpload();
    },
    async createProcess(){
      const storeUser = useUserStore(); 
      const data = {
        "pk": "process-dubbing-video",
        "sk": "admin 3",
        "source_language": this.source_lang,
        "dest_language": this.target_lang,
        "user_name": storeUser.name,
        "user_id": storeUser.id
      }
      
      try {
        await $fetch(`${this.url_base}process/createprocess`,{
          method: "POST",
          body: data,
        }).then(res=> console.log(res))
      } catch (error) {
        console.error("Erro:", error);
      }

    },
    start_interval() {
      this.intervalId = setInterval(this.listProcess, 5000);
    },
    change_load() {
      this.load_videos_screen = !this.load_videos_screen;
    },
    async listProcess() {
      this.change_load();
      
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
            console.log(res)
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
      this.change_load();
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
