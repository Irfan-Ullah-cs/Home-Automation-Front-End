import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/DashboardView.vue';
import Controls from '@/views/WeatherView.vue';
// import Analytics from '@/views/Analytics.vue';
// import Alerts from '@/views/Alerts.vue';
// import Settings from '@/views/Settings.vue';

const routes = [
  { path: '/', redirect: '/sensors' },
  { path: '/sensors', name: 'Dashboard', component: Dashboard },
  { path: '/controls', name: 'Controls', component: Controls },
  // { path: '/analytics', name: 'Analytics', component: Analytics },
  // { path: '/alerts', name: 'Alerts', component: Alerts },
  // { path: '/settings', name: 'Settings', component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
