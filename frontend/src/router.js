import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/components/home'
import playlist from '@/components/playlist'

Vue.use(VueRouter)

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
      path: '/playlist/:playlistId/:trackId?',
      props: true,
      component: playlist
    },
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ]
})

export default router
