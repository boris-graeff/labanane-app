import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './components/home.vue'
import playlist from './components/playlist.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '',
      component: home
    },
    {
      path: '/playlist/:id',
      component: playlist
    }
  ]
})

export default router