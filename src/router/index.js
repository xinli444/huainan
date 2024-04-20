import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TraditionalQuyi from '@/views/heritage-appreciation/TraditionalQuyi.vue'
import TraditionalSkill from '@/views/heritage-appreciation/TraditionalSkill.vue'
import TraditionalDance from '@/views/heritage-appreciation/TraditionalDance.vue'
import VisitRecord from '@/views/VisitRecord.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/heritage-appreciation/traditional-quyi',
      name: 'TraditionalQuyi',
      component: TraditionalQuyi
    },
    {
      path: '/heritage-appreciation/traditional-skill',
      name: 'TraditionalSkill',
      component: TraditionalSkill
    },
    {
      path: '/heritage-appreciation/traditional-dance',
      name: 'TraditionalDance',
      component: TraditionalDance
    },
    {
      path: '/visit-record',
      name: 'VisitRecord',
      component: VisitRecord
    },
  ]
})

export default router
