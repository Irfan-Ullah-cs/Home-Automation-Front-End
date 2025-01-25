<!-- Dashboard.vue -->
<template>
  <v-container fluid class="dashboard">
    <!-- Summary Stats Cards -->
    <v-row>
      <v-col v-for="(stat, index) in summaryStats" :key="index" cols="12" sm="6" md="3">
        <sensor-stat-card v-bind="stat" />
      </v-col>
    </v-row>

    <!-- Controls Row -->
    <!-- Controls Row -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card class="control-card">
          <v-card-title>System Controls</v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="(control, index) in controls" :key="index" cols="12" sm="4">
                <control-switch
                  v-model="control.value"
                  :label="control.label"
                  :color="control.color"
                  @change="handleControlChange(control, index)"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Alerts, Humidity Gauge, and Bin Level Chart -->
    <v-container>
      <v-row class="mt-4 equal-height-row">
        <v-col cols="12" md="3">
          <alert-card
            class="equal-height"
            :alerts="recentAlerts"
            @acknowledge="handleAlertAcknowledge"
          />
        </v-col>
        <v-col cols="12" md="4">
          <humidity-gauge class="equal-height" :value="currentHumidity" />
        </v-col>
        <v-col cols="12" md="5">
          <bin-level-chart class="equal-height" :data="binLevelData" />
        </v-col>
      </v-row>
    </v-container>

    <!-- Line Charts: Temperature and Combined Metrics -->
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <temperature-chart :data="temperatureData" />
      </v-col>
      <v-col cols="12" md="6">
        <combined-metrics-chart
          :temperature="temperatureHistory"
          :humidity="humidityHistory"
          :light="lightHistory"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { fetchAllSensorsDataApi, fetchAllLEDsApi, updateLEDStatusApi } from '../api/dashboardApi';
import SensorStatCard from '../components/SensorCard.vue';
import ControlSwitch from '../components/ControlButton.vue';
import AlertCard from '../components/AlertCard.vue';
import TemperatureChart from '../components/charts/TemperatureChart.vue';
import HumidityGauge from '../components/HumidityGauge.vue';
import CombinedMetricsChart from '../components/charts/CombinedMetricsChart.vue';
import BinLevelChart from '../components/charts/BinLevelChart.vue';

export default {
  name: 'DashboardView',
  components: {
    SensorStatCard,
    ControlSwitch,
    AlertCard,
    TemperatureChart,
    HumidityGauge,
    CombinedMetricsChart,
    BinLevelChart,
  },
  data() {
    return {
      summaryStats: [
        {
          icon: 'mdi-thermometer',
          title: 'Temperature',
          value: 0,
          unit: '°C',
          trend: '+0.0',
          color: 'orange',
          gradient: ['#FFEDCC', '#FFDD78'],
        },
        {
          icon: 'mdi-water-percent',
          title: 'Humidity',
          value: 0,
          unit: '%',
          trend: '+0.0',
          color: 'blue',
          gradient: ['#E0F7FA', '#B2EBF2'],
        },
        {
          icon: 'mdi-white-balance-sunny',
          title: 'Light Level',
          value: 0,
          unit: 'lux',
          trend: '+0.0',
          color: 'amber',
          gradient: ['#FFFDE7', '#FFE082'],
        },
        {
          icon: 'mdi-delete',
          title: 'Bin Level',
          value: 0,
          unit: '%',
          trend: '+0.0',
          color: 'green',
          gradient: ['#E8F5E9', '#C8E6C9'],
        },
      ],
      controls: [],
      recentAlerts: [],
      currentHumidity: 0,
      temperatureData: {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
          {
            label: 'Temperature',
            data: Array.from({ length: 24 }, () => 0),
            borderColor: '#FF9800',
            tension: 0.4,
          },
        ],
      },
      temperatureHistory: [],
      humidityHistory: [],
      lightHistory: [],
      binLevelData: {
        labels: ['Empty', 'Used'],
        datasets: [
          {
            data: [100, 0],
            backgroundColor: ['#4CAF50', '#F44336'],
          },
        ],
      },
      
      isUpdatingLED: null,
    };
  },
  methods: {
    async fetchSensorData() {
      try {
        const data = await fetchAllSensorsDataApi();
        const sortedData = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        const latestReading = sortedData[0];
        this.updateSummaryStats(latestReading, sortedData[1]);
        this.currentHumidity = latestReading.humidity;
        this.binLevelData.datasets[0].data = [
          100 - latestReading.binLevel,
          latestReading.binLevel,
        ];
        this.updateHistoricalData(sortedData);
        this.checkAlerts(latestReading);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        this.addAlert({
          type: 'error',
          message: 'Failed to fetch sensor data',
          timestamp: new Date().toISOString(),
        });
      }
    },
    async fetchLEDsData() {
      try {
        const ledsData = await fetchAllLEDsApi();
        this.controls = ledsData.map((led) => ({
          label: `LED ${led.ledNumber}`,
          value: led.on,
          color: led.on ? 'success' : 'grey',
          isDisabled: false,
          ledNumber: led.ledNumber
        }));
      } catch (error) {
        console.error('Error fetching LED statuses:', error);
        this.addAlert({
          type: 'error',
          message: 'Failed to fetch LED statuses',
          timestamp: new Date().toISOString(),
        });
      }
    },
    async handleControlChange(control, index) {
    if (this.isUpdatingLED === index) return; // Prevent simultaneous updates

    console.log(`Toggling LED ${control.ledNumber}, current value: ${control.value}`);

    try {
      this.isUpdatingLED = index; // Track the index being updated
      const newValue = control.value; // Explicitly calculate the new toggle state
      console.log(`New value for LED ${control.ledNumber}: ${newValue}`);

      control.isDisabled = true; // Temporarily disable the control

      // Send the API request with the calculated new state
      const updatedLed = await updateLEDStatusApi(control.ledNumber, newValue);
      console.log(`API Response for LED ${control.ledNumber}:`, updatedLed);

      // Update the control with the new state
      this.$set(this.controls, index, {
        ...control,
        value: updatedLed.on, // Use the backend response to ensure state sync
        color: updatedLed.on ? 'success' : 'grey',
        isDisabled: false,
      });

      // Display success alert
      this.addAlert({
        type: 'success',
        message: `LED ${control.ledNumber} ${updatedLed.on ? 'turned on' : 'turned off'} successfully.`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error(`Failed to update LED ${control.ledNumber}:`, error);

      // Restore control state on failure
      control.isDisabled = false;

      // Display error alert
      this.addAlert({
        type: 'error',
        message: `Failed to update LED ${control.ledNumber}: ${error.message || 'Unknown error'}.`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      this.isUpdatingLED = null; // Reset updating index
      console.log(`Update complete for LED ${control.ledNumber}`);
    }
  }


    ,
    updateSummaryStats(current, previous) {
      const metrics = [
        { key: 'temperature', index: 0 },
        { key: 'humidity', index: 1 },
        { key: 'lightLevel', index: 2 },
        { key: 'binLevel', index: 3 },
      ];
      metrics.forEach(({ key, index }) => {
        const trend = previous
          ? (current[key] - previous[key]).toFixed(1)
          : '+0.0';
        this.summaryStats[index].value = current[key];
        this.summaryStats[index].trend = trend > 0 ? `+${trend}` : trend;
      });
    },
    updateHistoricalData(sortedData) {
      this.temperatureHistory = sortedData.map((reading) => ({
        timestamp: reading.timestamp,
        value: reading.temperature,
      }));
      
      this.humidityHistory = sortedData.map((reading) => ({
        timestamp: reading.timestamp,
        value: reading.humidity,
      }));
      
      this.lightHistory = sortedData.map((reading) => ({
        timestamp: reading.timestamp,
        value: reading.lightLevel,
      }));

      const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
      };

      this.temperatureData = {
        labels: sortedData.slice(-24).map((reading) => formatTime(reading.timestamp)),
        datasets: [
          {
            label: 'Temperature',
            data: sortedData.slice(-24).map((reading) => reading.temperature),
            borderColor: '#FF9800',
            tension: 0.4,
          },
        ],
      };
    },
    addAlert(alert) {
      const alertWithId = {
        ...alert,
        id: Date.now(),
      };
      this.recentAlerts.unshift(alertWithId);
      if (this.recentAlerts.length > 5) {
        this.recentAlerts.pop();
      }
    },
    checkAlerts(latestReading) {
      // Temperature alerts
      if (latestReading.temperature > 30) {
        this.addAlert({
          type: 'warning',
          message: `High temperature detected: ${latestReading.temperature}°C`,
          timestamp: new Date().toISOString(),
        });
      }
      
      // Humidity alerts
      if (latestReading.humidity > 80) {
        this.addAlert({
          type: 'warning',
          message: `High humidity detected: ${latestReading.humidity}%`,
          timestamp: new Date().toISOString(),
        });
      }
      
      // Bin level alerts
      if (latestReading.binLevel > 90) {
        this.addAlert({
          type: 'warning',
          message: `Bin nearly full: ${latestReading.binLevel}%`,
          timestamp: new Date().toISOString(),
        });
      }
    }
  },
  async mounted() {
    await this.fetchSensorData();
    await this.fetchLEDsData();
    this.interval = setInterval(async () => {
      await this.fetchSensorData();
      await this.fetchLEDsData();
    }, 5000);
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
};
</script>


<style scoped>
.dashboard {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
}

.control-card {
  background-color: #FFF8E1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sensor-stat-card {
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.alert-card {
  background-color: #FFCCBC;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.sensor-stat-card:hover,
.control-card:hover,
.alert-card:hover {
  transform: scale(1.02);
  transition: transform 0.2s;
}

.equal-height-row {
  display: flex;
  align-items: stretch;
}

.equal-height {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  overflow: hidden;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>