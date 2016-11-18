import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playlists: [],
    playlist: {
      name: ''
    }
  },

  mutations: {
    SET_PLAYLISTS: (state, playlists) => {
      state.playlists = playlists
    },

    SET_PLAYLIST: (state, id, data) => {
      state.playlist.name = id;
      state.playlist.tracks = data.playlist;
      state.is_auth = data.auth;
    }
  }
})

export default store