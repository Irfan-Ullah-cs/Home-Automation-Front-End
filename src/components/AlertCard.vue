<template>
  <v-card class="alert-card">
    <v-card-title class="alert-card-title">Recent Alerts</v-card-title>
    <v-card-text>
      <v-list dense>
        <v-list-item
          v-for="alert in alerts"
          :key="alert.id"
          class="alert-item"
        >
          <v-list-item-content>
            <v-list-item-title :class="`alert-${alert.type}`">
              {{ alert.message }}
            </v-list-item-title>
            <v-list-item-subtitle class="alert-timestamp">
              {{ formatDate(alert.timestamp) }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
            icon
            @click="$emit('acknowledge', alert.id)"
            :color="alert.type === 'error' ? 'pink' : 'amber'"
            class="acknowledge-btn"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AlertCard",
  props: {
    alerts: { type: Array, required: true },
  },
  methods: {
    formatDate(timestamp) {
      const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
      return new Date(timestamp).toLocaleString(undefined, options);
    },
  },
};
</script>

<style scoped>
/* Base styles for the alert card */
.alert-card {
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #fcfcfc, #eef5ff, #fff3f2);;/* Soft gradient: white, light blue, light pink */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

/* Hover effect for the card */
.alert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #fcfcfc, #eef5ff, #fff3f2); /* Slightly darker gradient */
}

/* Title styles */
.alert-card-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 12px;
  font-family: "Roboto", sans-serif;
  background: linear-gradient(90deg, #74b9ff, #81ecec, #a29bfe); /* Light gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Alert item styles */
.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  background: #f8f9fa; /* Light grey */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 8px;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

/* Hover effect for alert items */
.alert-item:hover {
  background: #f1f3f5; /* Slightly darker grey */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Styles for alert types */
.alert-warning {
  color: #f9a825; /* Light amber */
  font-weight: 600;
}

.alert-error {
  color: #e57373; /* Light red */
  font-weight: 600;
}

/* Timestamp styling */
.alert-timestamp {
  font-size: 0.85rem;
  color: #757575; /* Muted grey */
}

/* Acknowledge button styling */
.acknowledge-btn {
  background-color: #fce4ec; /* Light pink for default state */
  border-radius: 50%;
  padding: 8px;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.acknowledge-btn:hover {
  transform: scale(1.1);
  background-color: #f8bbd0; /* Slightly darker pink on hover */
}
</style>
