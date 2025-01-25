<!-- SensorCard.vue -->
<template>
  <v-card class="sensor-stat-card" :style="`background: linear-gradient(45deg, ${gradient[0]}, ${gradient[1]})`">
    <v-card-title class="d-flex justify-space-between align-center">
      <v-icon :color="color" size="36">{{ icon }}</v-icon>
      <span class="stat-title">{{ title }}</span>
    </v-card-title>
    <v-card-text class="d-flex align-center justify-space-between">
      <span class="stat-value">{{ value }}<small>{{ unit }}</small></span>
      <span class="stat-trend" :class="trend > 0 ? 'trend-positive' : 'trend-negative'">
        {{ trend > 0 ? '+' : '' }}{{ trend }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SensorStatCard',
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    value: { type: Number, required: true },
    unit: { type: String, required: true },
    trend: { type: String, required: true },
    color: { type: String, default: 'blue' },
    gradient: { type: Array, default: () => ['#FFFFFF', '#CCCCCC'] },
  },
};
</script>

<style scoped>
.sensor-stat-card {
  padding: 16px;
  color: #ffffff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  border-radius: 12px;
}

.stat-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.stat-value {
  font-size: 2.4rem;
  font-weight: bold;
}

.stat-trend {
  font-size: 1.2rem;
}

.trend-positive {
  color: #4caf50;
}

.trend-negative {
  color: #f44336;
}
</style>
