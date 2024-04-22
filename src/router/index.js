import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TraditionalQuyi from '@/views/heritage-appreciation/TraditionalQuyi.vue'
import TraditionalSkill from '@/views/heritage-appreciation/TraditionalSkill.vue'
import TraditionalSkillOne from '@/views/heritage-appreciation/TraditionalSkillOne.vue'
import TraditionalDance from '@/views/heritage-appreciation/TraditionalDance.vue'
import VisitRecord from '@/views/VisitRecord.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      meta: { title: '首页' },
      component: HomeView
    },
    {
      path: '/heritage-appreciation/traditional-quyi',
      name: 'TraditionalQuyi',
      meta: { title: '传统曲艺' },
      component: TraditionalQuyi
    },
    {
      path: '/heritage-appreciation/traditional-skill',
      name: 'TraditionalSkill',
      meta: { title: '传统技艺' },
      component: TraditionalSkill
    },
    {
      path: '/heritage-appreciation/traditional-skill/1',
      name: 'TraditionalSkillOne',
      meta: { title: '淮南牛肉汤' },
      component: TraditionalSkillOne
    },
    {
      path: '/heritage-appreciation/traditional-dance',
      name: 'TraditionalDance',
      meta: { title: '传统舞蹈' },
      component: TraditionalDance
    },
    {
      path: '/visit-record',
      name: 'VisitRecord',
      meta: { title: '参观纪念' },
      component: VisitRecord
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta?.title || ''
})

export default router
