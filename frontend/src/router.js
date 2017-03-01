import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './components/home.vue'
import playlist from './components/playlist.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '',
      component: home
    },
    {
      name: 'playlist',
      path: '/playlist/:name',
      component: playlist
    },
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ]
})

export default router
