import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/DashboardView.vue';

import WeatherView from '@/views/WeatherView.vue';
// import Analytics from '@/views/Analytics.vue';
// import Alerts from '@/views/Alerts.vue';
// import Settings from '@/views/Settings.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/weather', name: 'weather', component: WeatherView },
  // { path: '/analytics', name: 'Analytics', component: Analytics },
  // { path: '/alerts', name: 'Alerts', component: Alerts },
  // { path: '/settings', name: 'Settings', component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
