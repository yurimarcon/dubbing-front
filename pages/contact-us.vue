<script setup>
import { useCustomAlertStore } from "@/stores/customAlert";
import { useUserStore } from "@/stores/user";
const alertStore = useCustomAlertStore();
const userStore = useUserStore();

const valid = computed(()=>{
  if (form.subject == "" || form.description == "" || form.description.length > 199)
    return false
  return true
})
const form = reactive({
  subject: "",
  description: "",
  user: userStore.name,
  email: userStore.email
})
const subjects = ['Erro ou Problema', 'Dúvida', 'Sugestão', 'Outros']
const submitForm = ()=>{
      if (valid) {
        // const url = "https://pky434u1q7.execute-api.us-east-1.amazonaws.com/Prod/api/ticket/new-ticket"
        const url = "http://localhost:49988/api/ticket/new-ticket"
        let res = $fetch(url, {
          method: "POST",
          body: JSON.stringify(form)
        })
        .then(res=>{
          alertStore.showAlert("Obrigado por entrar em contato!", 1)
          form.subject = ""
          form.description = ""
          valid.value = false
        })

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
          <v-row class="my-4 d-flex justify-center">
            <p>
                Iremos responder o seu contato por e-mail.
            </p>

            <p>
                Fique a vontade para reportar erros, 
            </p>
            <p>
                problemas ou nos enviar sugestões.
            </p>
            <p>
                🤓✌️
            </p>
          </v-row>
          <v-divider></v-divider>
          <v-form 
          class="mt-4"
          >
            <v-select
              v-model="form.subject"
              :items="subjects"
              label="Assunto"
              variant="outlined"
              required
            ></v-select>

            <v-textarea
              v-model="form.description"
              label="Descrição"
              variant="outlined"
              counter="200"
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

