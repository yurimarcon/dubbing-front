<script setup>
import { useTranslateVideoStore } from '@/stores/translate_video'
const videoStore = useTranslateVideoStore()

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
              label="Input your .mp4"
              chips
              accept="video/mp4"
              variant="outlined"
              required
              clearable
              show-size
              @change="videoStore.getPresignedUrl()"
              v-model="videoStore.fileInput"
            ></v-file-input>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-select
                :items="['en', 'es', 'fr', 'pt']"
                label="Source Language"
                required
                variant="outlined"
                v-model="videoStore.source_lang"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="['en', 'es', 'fr', 'pt']"
                label="Target Language"
                required
                variant="outlined"
                v-model="videoStore.target_lang"
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
            @click="videoStore.sendProcess()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>