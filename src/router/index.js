import Vue from 'vue'
import Router from 'vue-router'

import DefaultLayout from '@/layouts/default.vue'
import IndexPage from '@/pages/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', name: 'IndexPage', component: IndexPage }
      ]
    }
  ]
})
