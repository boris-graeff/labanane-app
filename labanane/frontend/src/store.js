import Vue from 'vue';
import Vuex from 'vuex';
import constants from './constants';

Vue.use(Vuex);

function getCurrentIndex (state) {
  return state.playlist.tracks.findIndex((t) => {
    return t.id === state.track.id
  })
}

function setTrack (state, track) {
  for(let prop of Object.keys(track)) {
    state.track[prop] = track[prop]
  }
  state.track.progression = 0
  state.player.state = 'stopped'
  state.player.state = 'loading'
}

const store = new Vuex.Store({
  state: {
    constants,
    playlists: [],
    playlist: {
      name: '',
      tracks: []
    },
    track: {
      id: '',
      name: '-',
      provider: '',
      artwork: '',
      progression: 0
    },
    player: {
      shuffle: false,
      state: ''
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
      setTrack(state, track)
    },
    SET_TRACK_PROGRESSION: (state, progression) => {
      state.track.progression = progression
    },
    SET_TRACK_ERROR: (state) => {
      state.player.state = 'stopped'
      state.playlist.tracks[ getCurrentIndex(state)].error = true
    },
    SET_PLAY: (state) => {
      if(state.track){
        state.player.state = 'playing'
      }
    },
    SET_PAUSE: (state) => {
      state.player.state = 'paused'
    },
    SET_PREVIOUS_TRACK: state => {
      let tracks = state.playlist.tracks,
        index = getCurrentIndex(state) -1

      index = index < 0 ? (tracks.length - 1) : index
      setTrack(state, tracks[index])
    },
    SET_NEXT_TRACK: state => {
      let tracks = state.playlist.tracks,
        index = getCurrentIndex(state) + 1

      index = index >= tracks.length ? 0 : index
      setTrack(state, tracks[index])
    },
    SET_YOUTUBE_READY: state => {
      state.providers.youtube.ready = true;
    }
  }
});

export default store;
