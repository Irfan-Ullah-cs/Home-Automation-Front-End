<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <weather-card
            icon="mdi-weather-sunny"
            title="Current Weather"
            :temperature="weatherData.temperature"
            :condition="weatherData.condition"
          />
        </v-col>
        <v-col cols="12" md="6">
          <sensor-chart
            title="Temperature Trends"
            :data="weatherHistory"
          />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import WeatherCard from '@/components/WeatherCard.vue';
  import SensorChart from '@/components/charts/SensorChart.vue';
  
  export default {
    name: 'WeatherView',
    components: {
      WeatherCard,
      SensorChart,
    },
    data() {
      return {
        weatherData: {
          temperature: 24.5,
          condition: 'Sunny',
        },
        weatherHistory: Array(24)
          .fill()
          .map((_, i) => ({
            timestamp: new Date(Date.now() - i * 3600000).toISOString(),
            value: 20 + Math.random() * 5,
          }))
          .reverse(),
      };
    },
  };
  </script>
  