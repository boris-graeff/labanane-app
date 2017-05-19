import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import formatDuration from './filters/format-duration'

Vue.config.productionTip = false

Vue.filter('formatDuration', formatDuration)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
