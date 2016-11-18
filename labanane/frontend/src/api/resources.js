import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

export default {

  playlists: Vue.resource('http://labanane.no-ip.info/services/playlist/all'),

  playlist: Vue.resource('http://labanane.no-ip.info/services/playlist/content/{id}/undefined') // TODO fix route

};