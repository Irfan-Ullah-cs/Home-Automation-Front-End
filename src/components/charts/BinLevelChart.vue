<template>
  <v-card class="bin-level-chart" elevation="3">
    <v-card-title class="chart-title">
      <v-icon color="cyan" size="28">mdi-chart-pie</v-icon>
      <span>Bin Level</span>
    </v-card-title>
    <v-card-text>
      <div class="chart-container">
        <PieChart :data="data" :options="options" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'BinLevelChart',
  components: { PieChart: Pie },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#37474F',
              font: { size: 14, family: 'Roboto, sans-serif' },
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const value = tooltipItem.raw;
                return `${value} %`;
              },
            },
          },
        },
      };
    },
  },
};
</script>

<style scoped>
/* Card Styles */
.bin-level-chart {
  background: linear-gradient(135deg, #fcfcfc, #eef5ff, #fff3f2);/* Light gradient */
  border-radius: 16px;
  padding: 16px;
  max-width: 450px; /* Increased width for balance */
  width: 100%; /* Ensure responsive layout */
  margin: 0 auto; /* Center align */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Subtle shadow */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bin-level-chart:hover {
  transform: translateY(-4px);
  
  background: linear-gradient(135deg, #fcfcfc, #eef5ff, #fff3f2);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* Deeper hover shadow */
}

/* Title Section */
.chart-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.4rem; /* Slightly larger for emphasis */
  font-weight: bold;
  color: #37474F; /* Dark grey for readability */
  margin-bottom: 20px; /* Add spacing below the title */
}

/* Chart Container */
.chart-container {
  position: relative;
  height: 180px; /* Larger height for better proportions */
  width: 100%;
  background: linear-gradient(135deg, #fcfcfc, #eef5ff, #fff3f2);
  border-radius: 12px; /* Rounded edges for the chart area */
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.05); /* Subtle inset shadow */
  padding: 10px; /* Add padding for spacing */
}

/* Icon Spacing */
.v-icon {
  margin-right: 8px;
  color: #26C6DA; /* Cyan for a fresh, vibrant look */
}
</style>
