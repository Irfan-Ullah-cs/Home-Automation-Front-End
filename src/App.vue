<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar app color="#f5f7fa" elevation="1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="app-title">Monitoring System</v-toolbar-title>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app color="#ffffff" elevation="2">
      <!-- Status Cards -->
      <v-row dense class="ma-3 status-cards">
        <v-col cols="6">
          <v-card elevation="2" class="status-card temperature-card">
            <div class="d-flex align-center">
              <v-icon color="orange">mdi-thermometer</v-icon>
              <span class="status-text ml-2">{{ currentTemp }}°C</span>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card elevation="2" class="status-card humidity-card">
            <div class="d-flex align-center">
              <v-icon color="blue">mdi-water-percent</v-icon>
              <span class="status-text ml-2">{{ currentHumidity }}%</span>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Navigation List -->
      <v-list nav>
        <v-subheader class="nav-subheader">Monitoring</v-subheader>

        <v-list-item to="/sensors">
          <v-list-item-icon>
            <v-icon color="#4caf50">mdi-grid</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-item to="/controls">
          <v-list-item-icon>
            <v-icon color="#673ab7">mdi-tune</v-icon>
          </v-list-item-icon>
          <v-list-item-title>System Controls</v-list-item-title>
        </v-list-item>

        <v-list-item to="/analytics">
          <v-list-item-icon>
            <v-icon color="#03a9f4">mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Analytics</v-list-item-title>
        </v-list-item>

        <v-list-item to="/alerts">
          <v-list-item-icon>
            <v-icon color="#f44336">mdi-alert-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="d-flex align-center">
            Alerts
            <v-chip x-small color="error" class="ml-2" v-if="alertCount > 0">
              {{ alertCount }}
            </v-chip>
          </v-list-item-title>
        </v-list-item>

        <v-list-item to="/settings">
          <v-list-item-icon>
            <v-icon color="#607d8b">mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
      </v-list>

      <!-- Bottom Actions -->
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list-item @click="logout" link>
          <v-list-item-icon>
            <v-icon color="#f44336">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="logout-text">Logout</v-list-item-title>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      currentTemp: "21.8",
      currentHumidity: "44",
      alertCount: 2,
    };
  },
  methods: {
    logout() {
      console.log("Logging out...");
    },
  },
};
</script>

<style scoped>
/* App Title */
.app-title {
  font-weight: bold;
  font-size: 1.4rem;
  color: #37474f;
}

/* Status Cards */
.status-cards {
  gap: 12px;
}

.status-card {
  padding: 12px;
  border-radius: 12px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.status-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.temperature-card {
  background: linear-gradient(135deg, #fff4e6, #ffe0b2);
}

.humidity-card {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
}

.status-text {
  font-size: 1.1rem;
  font-weight: bold;
  color: #424242;
}

/* Navigation Drawer */
.nav-subheader {
  font-size: 1rem;
  font-weight: bold;
  color: #37474f;
  margin-top: 8px;
}

.v-list-item-title {
  font-size: 1rem;
  color: #424242;
}

.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

/* Logout Text */
.logout-text {
  font-weight: bold;
  color: #f44336;
}
</style>
