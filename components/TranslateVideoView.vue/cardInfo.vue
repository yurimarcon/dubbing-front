<script setup>
const props = defineProps(['process'])

const calculateDurationTime = (startTime, endTime) =>{
    const data1 = new Date(startTime);
    const data2 = new Date(endTime);

    const diferencaEmMilissegundos = data2 - data1;

    const segundos = Math.floor((diferencaEmMilissegundos / 1000) % 60);
    const minutos = Math.floor((diferencaEmMilissegundos / (1000 * 60)) % 60);
    const horas = Math.floor((diferencaEmMilissegundos / (1000 * 60 * 60)) % 24);

    return `${horas < 10 ? '0'+horas : horas}:${minutos < 10 ? '0'+minutos : minutos}:${segundos < 10 ? '0'+segundos : segundos}`
}
</script>

<template>
  <v-card class="mx-auto rounded-xl animate__animated animate__fadeIn">
    <v-card-title>Informações do processamento</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="">
      <p>
        <strong>Nome: </strong>
        <span>{{ props.process.original_file_name }}</span>
      </p>
      <p>
        <strong>Data de envio: </strong>
        <span>{{ new Date(props.process.created_date).toLocaleString() }}</span>
      </p>
      <p>
        <strong>Inicio: </strong>
        <span>{{ new Date(props.process.start_time).toLocaleString() }}</span>
      </p>
      <p>
        <strong>Fim: </strong>
        <span>{{ new Date(props.process.last_updated).toLocaleString() }}</span>
      </p>
      <p>
        <strong>Tempo de processamento: </strong>
        <span>{{ calculateDurationTime(new Date(props.process.start_time), new Date(props.process.last_updated)) }}</span>
      </p>
      <p>
        <strong>Idioma origem: </strong>
        <span>{{ props.process.source_lang }}</span>
      </p>
      <p>
        <strong>Idioma destino: </strong>
        <span>{{ props.process.target_lang }}</span>
      </p>

      <v-card-actions
      v-if="props.process.link_web_midea"
      >
          <v-btn
          class="mx-auto rounded-xl"
          color="primary"
          variant="flat"
          text="Assistir video original"
          target="_blanc"
          :href="props.process.link_web_midea"
          >
    
          </v-btn>

      </v-card-actions>

    </v-card-text>
  </v-card>
</template>