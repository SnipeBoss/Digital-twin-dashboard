import { createRouter, createWebHistory } from 'vue-router'

/* USER PAGES */
import Dashboard from '@/views/DashboardView.vue'
import AnomalyDetection from '@/views/AnomalyDetectionView.vue'
import History from '@/views/HistoryView.vue'
import Chat from '@/views/ChatView.vue'
import TimeSeriesForecast from '@/views/TimeSeriesForecastView.vue'


// Define Page Router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/anomaly-detection',
      name: 'anomaly-detection',
      component: AnomalyDetection
    },
    {
      path: '/time-series-forecast',
      name: 'time-series-forecast',
      component: TimeSeriesForecast
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    }
  ]
})

export default router
