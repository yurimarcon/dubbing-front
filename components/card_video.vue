<script setup>
const props = defineProps(['video'])

</script>

<template >

    <v-card
          width="100%"
          class="mx-auto my-2 rounded-xl hover-up"
          :class="
            props.video.statusDescription != 'Conclude' &&
            props.video.statusDescription != 'Error' &&
            props.video.statusDescription != 'ExidedLimit'
              ? 'disabled-card'
              : ''
          "
        >
          <div class="image-container">
            <NuxtLink :to="'/translateVideo/' + props.video.process_id">
              <v-img
                class="align-end"
                :src="
                  props.video.statusDescription == 'InQueue'
                    ? // ? '/img/load-fly.gif' // waiting to process
                      'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmVrazVqbGF3b2R4dXI3c2E1OWtndjRsOXBkcG91M3h4cjFwbmQ4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aRYSqeF1cTkl62iJjS/giphy.webp'
                    : props.video.statusDescription == 'Conclude'
                    ? '/img/video.jpg' // Done
                    : // ? '/img/video.svg' // Done
                    props.video.statusDescription == 'Error'
                    ? // ? '/img/cyber.png'
                      '/img/error.jpg'
                    : props.video.statusDescription == 'ExidedLimit'
                    ? '/img/limit.jpg'
                    : '/img/cube-ai.gif' // in process
                "
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="150px"
                cover
              >
                <v-card-title
                  class="text-white d-flex align-items-center"
                  :textContent="props.video.source_lang + ' ➡️ ' + props.video.target_lang"
                ></v-card-title>
              </v-img>
            </NuxtLink>

            <card-menu
              v-if="
                props.video.statusDescription == 'Conclude' ||
                props.video.statusDescription == 'Error' ||
                props.video.statusDescription == 'ExidedLimit'
              "
              :process="props.video"
            />
          </div>

          <v-card-title
            class="truncate-text text-subtitle-1 text-medium-emphasis"
          >
            {{ props.video.original_file_name }}
          </v-card-title>
          <v-progress-linear
            v-if="props.video.is_deleted"
            color="primary"
            indeterminate
          ></v-progress-linear>

          <v-card-subtitle class="">
            <small>
              {{ new Date(`${props.video.start_time} UTC`).toLocaleString() }}
            </small>
          </v-card-subtitle>
          <v-card-subtitle class="">
            {{ props.video.statusDescription }}
          </v-card-subtitle>

          <v-card-text class="d-flex justify-space-between">
            <v-progress-circular
              color="deep-orange-lighten-2"
              :model-value="parseInt(props.video?.split_audio_done?.slice(0, -1))"
              size="50"
              >{{ props.video?.split_audio_done }}</v-progress-circular
            >

            <v-progress-circular
              color="lime"
              :model-value="parseInt(props.video?.transcript_audio_done?.slice(0, -1))"
              size="50"
              >{{ props.video?.transcript_audio_done }}</v-progress-circular
            >

            <v-progress-circular
              color="secondary"
              :model-value="parseInt(props.video?.create_audio_done?.slice(0, -1))"
              size="50"
              >{{ props.video?.create_audio_done }}</v-progress-circular
            >

            <v-progress-circular
              color="primary"
              :model-value="parseInt(props.video?.unify_audio_done?.slice(0, -1))"
              size="50"
              >{{ props.video?.unify_audio_done }}</v-progress-circular
            >
          </v-card-text>
        </v-card>
</template>