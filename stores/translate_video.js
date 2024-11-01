import { defineStore } from "pinia";
import {useUserStore} from './user'
import { useCustomAlertStore } from '@/stores/customAlert'
import { toHandlerKey } from "vue";

const ProcessType = {
  YouTube: 1,
  Upload: 2
};

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
    progress_upload: 0,
    fileInput: null,
    link_web_media: null,
    source_lang: "",
    target_lang: "",
    storage_file_name: "",
    process_type: 1,
    original_file_name: ""
  }),
  actions: {
    changeDialogUpload() {
      this.dialog_upload = !this.dialog_upload;
      this.fileInput = null;
      this.source_lang = "";
      this.target_lang = "";
      this.link_web_media = "";
      this.progress_upload = 0;
      this.original_file_name = "";
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
        const urlPresigned = `${this.url_base}storage/Get-GetPreSignedUrlRequest-Url?fileName=${encodeURIComponent(this.fileInput.name)}&userName=${encodeURIComponent(storeUser.name)}`;
        const {url, fileName} = await $fetch(urlPresigned);
        this.url_persigned_to_upload = url;
        this.storage_file_name = fileName;

      } catch (error) {
        console.error("Error during file upload:", error);
      }
      this.changeLoadUpload();
    },
    async sendProcess(process_type){
      this.changeLoadUpload();
      const alertStore = useCustomAlertStore();
      this.process_type = process_type

      if(process_type == ProcessType.YouTube && !this.link_web_media){
        alertStore.showAlert("Web media link is required!!!", 4)
        this.changeLoadUpload();
        return false;
      }else if(process_type == ProcessType.Upload && !this.fileInput){
        alertStore.showAlert("File is required!!!", 4)
        this.changeLoadUpload();
        return false;
      }
      if (!this.original_file_name || this.original_file_name.length < 3){
        alertStore.showAlert("File name is required and need be more then 3 characters.", 4)
        this.changeLoadUpload();
        return false;
      }
      if (!this.source_lang || !this.target_lang) {
        alertStore.showAlert("Every field is required!!!", 4)
        this.changeLoadUpload();
        return false;
      }
      if(process_type == ProcessType.Upload)
        await this.videoUpload();
      
      await this.createProcess();

      this.changeDialogUpload();
      this.listProcess();
      this.changeLoadUpload();
      return true;
    },
    async resendProcess(processInput){
      this.fileInput = {
        name: processInput.original_file_name
      }
      this.storage_file_name = processInput.original_file_path
      this.original_file_name = processInput.original_file_name;
      this.source_lang = processInput.source_lang;
      this.target_lang = processInput.target_lang;
      this.process_type = processInput.process_type;
      this.link_web_midea = processInput.link_web_midea;

      await this.createProcess();

      this.listProcess();
      return true;
    },
    async videoUpload(){
      return new Promise(async(resolve, reject)=>{
  
        if (!this.fileInput){
          return;
        }

        // request with XMLHttpRequest to watch progress upload
        try{
          const xhr = new XMLHttpRequest();
          xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
              this.progress_upload = (e.loaded / e.total) * 100;
            }
          });
          xhr.open("PUT", this.url_persigned_to_upload, true);
          xhr.setRequestHeader("Content-Type", this.fileInput.type);
          xhr.onload = () => {
            if (xhr.status === 200) {
              resolve();
            } else {
              reject();
            }
          };
          xhr.onerror = () => {
            console.error('Erro de rede');
            reject();
          };
          xhr.send(this.fileInput);
        }
        catch(error){
          console.error("Error during file upload:", error);
          reject();
        } 
    })
    },
    async createProcess(){
      return new Promise(async(resolve, reject)=>{

        let original_file_name = this.fileInput?.name
        let original_file_path = this.storage_file_name
        if(this.process_type == ProcessType.YouTube){
          original_file_name = this.original_file_name
          original_file_path = ""
        }
        
        const storeUser = useUserStore(); 
        const data = {
          "pk": "process-dubbing-video",
          "sk": storeUser.name,
          "source_lang": this.source_lang,
          "target_lang": this.target_lang,
          "user_name": storeUser.name,
          "user_id": storeUser.id,
          "original_file_name": original_file_name,
          "original_file_path": original_file_path,
          "type": this.process_type,
          "link_web_midea": this.link_web_media
        }
        
        try {
          await $fetch(`${this.url_base}process/createprocess`,{
            method: "POST",
            body: data
          }).then(()=> resolve())
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
        const userId = storeUser.id;
        
        await fetch(`${this.url_base}process/process-by-user?userId=${userId}`)
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

            // this.videos = res;
            this.videos = res.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
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
    async deleteProcess(processId){

      var url = this.url_base + "process/delete-process-by-process-id?processId=" + processId
      await $fetch(url,{
        method: "DELETE"
      });
      this.listProcess();
    }
  },
});
