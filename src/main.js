// main.js
import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vue Router
import router from './router';

// Initialize Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

// Create Vue App
const app = createApp(App);

// Use Vuetify and Router
app.use(vuetify);
app.use(router);

// Mount the App
app.mount('#app');

