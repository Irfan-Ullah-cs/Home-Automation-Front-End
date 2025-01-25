<template>
  <v-card class="ma-2 pa-3" elevation="4">
    <v-card-title class="text-h6 font-weight-bold">{{ title }}</v-card-title>
    <v-card-text>
      <Line :data="chartData" :options="chartOptions" />
    </v-card-text>
  </v-card>
</template>

<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: 'SensorChart',
  components: { Line },
  props: {
    title: String,
    data: Array
  },
  computed: {
    chartData() {
      return {
        labels: this.data.map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [
          {
            label: this.title,
            data: this.data.map(d => d.value),
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            pointBackgroundColor: '#1E88E5',
            tension: 0.4,
            fill: true
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: context => `Value: ${context.raw}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#e0e0e0'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      };
    }
  }
};
</script>

<style>
.chart-container {
  height: 400px;
}
</style>
