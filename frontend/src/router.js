import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import(/* webpackChunkName: "home" */ '@/pages/home')
const playlist = () => import(/* webpackChunkName: "playlist" */ '@/pages/playlist')

Vue.use(VueRouter)

export default new VueRouter({
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
