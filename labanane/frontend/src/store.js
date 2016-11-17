import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playlists: ["1","2","3"],
    playlist: {
      name: 'Playlist name'
    }
  }
})

export default store