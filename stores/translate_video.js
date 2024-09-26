import { defineStore } from "pinia";

export const useTranslateVideoStore = defineStore("translate", {
  state: () => ({
    // url_base: "http://127.0.0.1:5000/",
    url_base: "https://pky434u1q7.execute-api.us-east-1.amazonaws.com/Prod/api/",
    intervalId: null,
    videos: [],
    load_videos_screen: true,
    dialog_upload: false,
    load_upload: false,
  }),
  actions: {
    changeDialogUpload() {
      this.dialog_upload = !this.dialog_upload;
    },
    changeLoadUpload() {
      this.load_upload = !this.load_upload;
    },
    async uploadVideo(fileInput, source_lang, target_lang, user) {
      this.changeLoadUpload();

      if (!fileInput || !source_lang || !target_lang) {
        this.changeLoadUpload();
        return;
      }

      const formData = new FormData();
      formData.append("file", fileInput);
      formData.append("source_language", source_lang);
      formData.append("dest_language", target_lang);
      formData.append("user_name", user);

      try {
        await $fetch(this.url_base + "upload", {
          method: "POST",
          body: formData,
        }).then(res=> console.log(res))
      } catch (error) {
        console.error("Erro:", error);
      }
      this.change_load();
      this.changeDialogUpload();
      this.getVideos();
    },
    start_interval() {
      this.intervalId = setInterval(this.getVideos, 5000);
    },
    change_load() {
      this.load_videos_screen = !this.load_videos_screen;
    },
    async getVideos() {
      this.change_load();
      try {
        await fetch(this.url_base + "/process-by-user?user_id=1")
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
              console.log("sdsd");
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
