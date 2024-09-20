<script setup>
import { ref } from "vue";

// const dialog = ref(false);
// const load = ref(false)

const fileInput = ref();
const source_lang = ref("");
const target_lang = ref("");
const user = ref("admin");

import { useTranslateVideoStore } from '@/stores/translate_video'

const videoStore = useTranslateVideoStore()

// const change_load = ()=> load.value = !load.value

// const uploadFile = async () => {
//   change_load()
  
//   if (!fileInput.value || !source_lang.value || !target_lang.value){    
//     change_load()
//     return;
//   } 

//   const formData = new FormData();
//   formData.append("file", fileInput.value); // Adiciona o arquivo
//   formData.append("source_language", source_lang.value);
//   formData.append("dest_language", target_lang.value);
//   formData.append("user_name", user.value);

//   try {
//     await $fetch("http://127.0.0.1:5000/upload", {
//       method: "POST",
//       body: formData, // Envia o FormData com o arquivo e os dados do formulário
//     })
//       .then((res) => res.json())
//       .then((res) => console.log(res));
//   } catch (error) {
//     console.error("Erro:", error); 
//   }
//   change_load()
//   dialog.value = !dialog.value
// };
</script>

<template>
  <div class="pa-4 text-center">
    <v-btn
      class="flax-grow-1"
      prepend-icon="mdi-translate-variant"
      rounded="lg"
      variant="flat"
      text="Translate"
      color="primary"
      @click="videoStore.changeDialogUpload()"
    ></v-btn>

    <v-dialog v-model="videoStore.dialog_upload" max-width="600">
      <v-card prepend-icon="mdi-translate-variant" title="Upload video">

        <v-progress-linear
        v-if="videoStore.load_upload" 
        color="primary" 
        indeterminate
        ></v-progress-linear>

        <v-card-text>
          <v-row dense>
            <v-file-input
              label="File input w/ chips"
              chips
              variant="outlined"
              clearable
              v-model="fileInput"
            ></v-file-input>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-select
                :items="['en', 'es', 'fr', 'pt']"
                label="Source Language"
                required
                variant="outlined"
                v-model="source_lang"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="['en', 'es', 'fr', 'pt']"
                label="Target Language"
                required
                variant="outlined"
                v-model="target_lang"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="outlined"
            color="primary"
            @click="videoStore.changeDialogUpload()"
          ></v-btn>

          <v-btn
            color="primary"
            variant="flat"
            text="Send"
            @click="videoStore.uploadVideo(fileInput, source_lang, target_lang, user)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>