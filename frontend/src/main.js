import Vue from 'vue';
import store from './store';
import app from './components/app.vue';
import router from './router';

// eslint-disable-next-line no-new
new Vue({
	store,
	router: router,
	el: '#app',
	render: h => h(app)
});
