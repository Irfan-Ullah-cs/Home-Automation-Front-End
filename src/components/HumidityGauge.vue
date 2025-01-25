<template>
  <v-card class="humidity-gauge" elevation="3">
    <v-card-title class="gauge-title">
      <v-icon color="blue" size="32">mdi-water-percent</v-icon>
      Humidity Level
    </v-card-title>
    <v-card-text>
      <div class="gauge-container">
        <div class="gauge-background">
          <div class="gauge-indicator" :style="gaugeIndicatorStyle"></div>
        </div>
        <div class="gauge-value">
          <span class="value">{{ value }}%</span>
          <span class="label">Humidity</span>
        </div>
        <div class="gauge-markers">
          <div
            v-for="n in 11"
            :key="n"
            class="marker"
            :style="{ transform: `rotate(${(n - 1) * 18 - 90}deg)` }"
          >
            <span class="marker-value">{{ (n - 1) * 10 }}</span>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "HumidityGauge",
  props: {
    value: {
      type: Number,
      default: 45,
      validator(value) {
        return value >= 0 && value <= 100;
      },
    },
  },
  computed: {
    gaugeIndicatorStyle() {
      const rotation = (this.value / 100) * 180 - 90;
      return {
        transform: `rotate(${rotation}deg)`,
        background: `linear-gradient(to top, #4FC3F7, #1E88E5)`,
      };
    },
  },
};
</script>

<style scoped>
/* General styles for the humidity gauge card */
.humidity-gauge {
  background: linear-gradient(135deg, #fcfcfc, #eef5ff, #fff3f2);
  border-radius: 16px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.humidity-gauge:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Title section of the card */
.gauge-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.4rem;
  font-weight: bold;
  color: #3949ab;
}

/* Container for the gauge */
.gauge-container {
  position: relative;
  width: 180px;
  height: 100%;
  margin: 20px auto;
}

/* Gauge background */
.gauge-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #fcfcfc, #eef5ff, #fff3f2);
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Gauge indicator needle */
.gauge-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 50%;
  background: linear-gradient(to top, #4fc3f7, #2196f3);
  border-radius: 3px;
  transform-origin: bottom center;
  transition: transform 0.4s ease-out;
}

/* Gauge value text */
.gauge-value {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.value {
  font-size: 1rem;
  font-weight: bold;
  color: #212121;
}

.label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #616161;
}

/* Marker and scale around the gauge */
.gauge-markers {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.marker {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: center;
}

.marker::after {
  content: '';
  position: absolute;
  top: 8%;
  left: 49%;
  width: 2px;
  height: 14px;
  background: #cfd8dc;
  border-radius: 1px;
}

.marker-value {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: #757575;
}
</style>
