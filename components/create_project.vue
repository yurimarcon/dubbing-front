<script setup>
import { useTranslateVideoStore } from "@/stores/translate_video";
const videoStore = useTranslateVideoStore();

import { useCustomAlertStore } from "@/stores/customAlert";
const alertStore = useCustomAlertStore();

const tab = ref(null);

const send = () => {
  // if not change the tab did mean is first tab
  if(!tab) tab.value = 1
  const process_type = tab.value 
  videoStore.sendProcess(process_type).then((res) => {
    if (res) alertStore.showAlert("Process Created success!!!", 1);
  });
};
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
      <v-card :disabled="videoStore.load_upload">
        <!-- prepend-icon="mdi-translate-variant"
      title="Upload video" -->
        <v-progress-linear
          v-if="videoStore.load_upload"
          color="primary"
          indeterminate
        ></v-progress-linear>

        <v-tabs v-model="tab" align-tabs="center" color="primary">
          <v-tab value="1">Upload Video</v-tab>
          <v-tab value="2">YouTube video</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="1">
            <v-container fluid>
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
              </v-card-text>
            </v-container>
          </v-tabs-window-item>
          <v-tabs-window-item value="2">
            <v-container>
              <v-row>
                <v-card-text>
                  <v-text-field
                  label="Media link" 
                  variant="outlined"
                  v-model="videoStore.link_web_media" 
                  ></v-text-field>
                </v-card-text>
              </v-row>
            </v-container>
          </v-tabs-window-item>
        </v-tabs-window>

        <v-card-text>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-select
                :items="['en', 'es', 'fr', 'pt', 'ar']"
                label="Source Language"
                required
                variant="outlined"
                v-model="videoStore.source_lang"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="['en', 'es', 'fr', 'pt', 'ar']"
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
            @click="send()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>