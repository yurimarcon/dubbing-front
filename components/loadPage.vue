<template>
    <v-container style="height: 400px;">
      <v-row
        align-content="center"
        class="fill-height"
        justify="center"
      >
        <v-col
          class="text-subtitle-1 text-center"
          cols="12"
        >
          Loading...
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="primary"
            height="6"
            indeterminate
            rounded
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
</template>