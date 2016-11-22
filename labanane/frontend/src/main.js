import Vue from 'vue'

import store from './store'
import router from './router'
import app from './components/app.vue'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(app)
})
