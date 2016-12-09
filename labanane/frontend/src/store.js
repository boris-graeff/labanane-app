import Vue from 'vue';
import Vuex from 'vuex';
import constants from './constants';

Vue.use(Vuex);

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
    },
    SET_PREVIOUS_TRACK: state => {
      // fixme: set right previous track
      state.track = state.playlists[0];
    },
    SET_NEXT_TRACK: state => {
      // fixme: set right next track
      state.track = state.playlists[state.playlists.length - 1];
    },
    SET_YOUTUBE_READY: state => {
      state.providers.youtube.ready = true;
    }
  }
});

export default store;
