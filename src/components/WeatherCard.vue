<template>
    <v-card>
      <v-card-title>
        <v-icon :color="iconColor" size="32">{{ icon }}</v-icon>
        <span class="ml-3">{{ title }}</span>
      </v-card-title>
      <v-card-subtitle>
        Temperature: {{ temperature }}°C
      </v-card-subtitle>
      <v-card-subtitle>
        Condition: {{ condition }}
      </v-card-subtitle>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'WeatherCard',
    props: {
      icon: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      temperature: {
        type: Number,
        required: true,
      },
      condition: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .ml-3 {
    margin-left: 1rem;
  }
  </style>
  