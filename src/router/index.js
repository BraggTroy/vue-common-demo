import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home.vue'
import Survey from '@/view/survey/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/survey',
      name: 'survey',
      component: Survey
    }
  ]
})
