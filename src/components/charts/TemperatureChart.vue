<template>
  <v-card class="temperature-card mx-auto my-5" elevation="3">
    <v-card-title class="temperature-card-title">
      Temperature Trends
    </v-card-title>
    <v-card-text class="temperature-card-text">
      <Line :data="chartData" :options="options" />
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
  name: "TemperatureChart",
  components: { Line },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    chartData() {
      return this.data;
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#424242", // Dark grey for legend text
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          tooltip: {
            backgroundColor: "#1e88e5", // Blue background for tooltips
            titleColor: "#ffffff", // White title text in tooltip
            bodyColor: "#ffffff", // White body text in tooltip
            cornerRadius: 8,
            padding: 10,
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#616161", // Grey color for x-axis labels
              font: {
                size: 12,
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)", // Light gridlines for x-axis
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "#616161", // Grey color for y-axis labels
              font: {
                size: 12,
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)", // Light gridlines for y-axis
            },
          },
        },
      };
    },
  },
};
</script>

<style scoped>
/* Card styling */
.temperature-card {
  max-width: 800px;
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #dafbd9, #fdeae3); /* Gradient background */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.temperature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}

.temperature-card.active {
  background: linear-gradient(135deg, #eeffed, #fdffdb, #ffd0f4);
  box-shadow: 0px 8px 20px rgba(0, 150, 0, 0.2);
}

/* Title styling */
.temperature-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e88e5; /* Primary blue color */
  text-align: center;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  margin-bottom: 16px;
}

/* Text area styling */
.temperature-card-text {
  height: 400px; /* Set height for chart container */
}


/* Tooltip customization */
.chartjs-tooltip {
  background-color: #cae51e;
  color: #ffffff;
  font-size: 14px;
  padding: 10px;
  border-radius: 8px;
}
</style>
