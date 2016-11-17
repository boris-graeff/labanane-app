import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './App.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  root: '/',
  linkActiveClass: 'active-link',
  routes: [
    {
      path: '',
      component: home
    }
  ]
})

export default router