<script setup>
import { useCustomAlertStore } from "@/stores/customAlert";
const alertStore = useCustomAlertStore();

const valid = ref(false)
const subject = ref("")
const description = ref("");
const subjects = ['Bug', 'Sugestão', 'Dúvida', 'Outros']
const submitForm = ()=>{
      if (valid.value) {
        alertStore.showAlert("Em desenvolvimento...", 4)
      }
      return;
}
</script>

<template>
  <v-container class="pa-4">
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <v-card class="pa-4 elevation-3 rounded-lg mt-10">
          <v-card-title>
            <v-icon class="mb-1" left>mdi-message-reply-text</v-icon>
            <span class="text-h6 ml-4">Atendimento</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-form 
          class="mt-4"
          v-model="valid"
          >
            <v-select
              v-model="subject"
              :items="subjects"
              label="Assunto"
              variant="outlined"
              :rules="[v => !!v || 'Assunto é obrigatório']"
              required
            ></v-select>

            <v-textarea
              v-model="description"
              label="Descrição"
              variant="outlined"
              counter="200"
              :rules="[v => !!v || 'Descrição é obrigatória']"
              required
            ></v-textarea>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn 
              :disabled="!valid" 
              color="primary" 
              variant="flat"
              class="rounded-pill"
              @click="submitForm"
              >Enviar</v-btn>

            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

