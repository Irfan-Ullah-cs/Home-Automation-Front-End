<template>
  <v-card class="control-button-card">
    <v-card-title class="control-label">Combined Metrics</v-card-title>
    <v-card-text>
      <div class="chart-container">
        <Line :data="chartData" :options="options" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default {
  name: "CombinedMetricsChart",
  components: { Line },
  props: {
    temperature: {
      type: Array,
      required: true,
    },
    humidity: {
      type: Array,
      required: true,
    },
    light: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chartData() {
      return {
        labels: this.temperature.map((t) => new Date(t.timestamp).toLocaleTimeString()),
        datasets: [
          {
            label: "Temperature (°C)",
            data: this.temperature.map((t) => t.value),
            borderColor: "#FF9800",
            yAxisID: "y",
          },
          {
            label: "Humidity (%)",
            data: this.humidity.map((h) => h.value),
            borderColor: "#2196F3",
            yAxisID: "y",
          },
          {
            label: "Light (lux)",
            data: this.light.map((l) => l.value),
            borderColor: "#FFC107",
            yAxisID: "y1",
          },
        ],
      };
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            type: "linear",
            position: "left",
            grid: {
              color: "#e0e0e0",
            },
          },
          y1: {
            type: "linear",
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };
    },
  },
};
</script>

<style scoped>
/* Gradient styles for the card */
.control-button-card {
  max-width: 800px;
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #dafbd9, #fdeae3); /* Gradient background */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Hover and active effects */
.control-button-card:hover {
  transform: translateY(-4px);
}

.control-button-card.active {
  background: linear-gradient(135deg, #eeffed, #fdffdb, #ffd0f4);
  box-shadow: 0px 8px 20px rgba(0, 150, 0, 0.2);
}

.temperature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}

/* Card title styles */
.control-label {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #4caf50, #2196f3, #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: "Roboto", sans-serif;
}

/* Chart container styles for responsiveness */
.chart-container {
  height: 400px;
  width: 100%;
}
</style>
