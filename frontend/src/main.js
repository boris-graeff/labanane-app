import Vue from 'vue';
import store from './store';
import router from './router';
import app from './components/app.vue';

// eslint-disable-next-line no-new
new Vue({
	el: '#app',
	store,
	router,
	render: h => h(app)
});
