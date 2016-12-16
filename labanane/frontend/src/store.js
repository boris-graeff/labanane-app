import Vue from 'vue';
import Vuex from 'vuex';
import constants from './constants';

Vue.use(Vuex);

function get_current_index (state) {
  return state.playlist.tracks.findIndex((t) => {
    return t.id === state.track.id
  })
}

const store = new Vuex.Store({
  state: {
    constants,
    playlists: [],
    playlist: {
      name: '',
      tracks: []
    },
    track: {},
    player: {
      shuffle: false,
      playing: false
    },
    providers: {
      youtube: {
        ready: false
      }
    }
  },
  mutations: {
    SET_PLAYLISTS: (state, playlists) => {
      state.playlists = playlists;
    },
    SET_PLAYLIST: (state, id, data) => {
      state.playlist.name = id;
      state.playlist.tracks = data.playlist;
      state.isAuth = data.auth;
    },
    SET_TRACK: (state, track) => {
      state.track = track;
      state.player.playing = true
    },
    SET_PLAY: (state) => {
      if(state.track){
        state.player.playing = true
      }
    },
    SET_PAUSE: (state) => {
      state.player.playing = false
    },
    SET_PREVIOUS_TRACK: state => {
      state.track = state.playlist.tracks[ get_current_index(state) - 1];
    },
    SET_NEXT_TRACK: state => {
      state.track = state.playlist.tracks[ get_current_index(state) + 1];
    },
    SET_YOUTUBE_READY: state => {
      state.providers.youtube.ready = true;
    }
  }
});

export default store;
