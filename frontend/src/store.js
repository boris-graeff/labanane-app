import Vue from 'vue';
import Vuex from 'vuex';
import constants from './constants';

Vue.use(Vuex);

function getCurrentIndex (state) {
  return state.playlist.tracks.findIndex((t) => {
    return t.id === state.track.id
  })
}

function getRandomIndex (state) {
  return Math.floor(Math.random() * state.playlist.tracks.length)
}

function getNextIndex (state) {
  let index = getCurrentIndex(state) + 1
  return index >= state.playlist.tracks.length ? 0 : index
}

function getPreviousIndex (state) {
  let index = getCurrentIndex(state) -1
  return index < 0 ? (state.playlist.tracks.length - 1) : index
}

function setTrack (state, track) {
  for(let prop of Object.keys(track)) {
    state.track[prop] = track[prop]
  }
  state.player.progression = 0
  state.player.state = 'stopped'
  state.player.state = 'loading'
}

const store = new Vuex.Store({
  state: {
    constants,
    playlists: [],
    playlist: {
      name: '',
      tracks: [],
      password: '',
      canEdit: false
    },
    track: {
      id: '',
      name: '-',
      provider: '',
      artwork: ''
    },
    player: {
      shuffle: false,
      state: '',
      volume: 100,
      progression: 0,
      seekPosition: 0
    },
    providers: {
      youtube: {
        ready: false
      }
    }
  },
  mutations: {
    ADD_TRACK: (state, track) => {
      state.playlist.tracks.push(track)
    },
    SET_PLAYLISTS: (state, playlists) => {
      state.playlists = playlists.sort( (a, b) => b.timestamp - a.timestamp)
    },
    SET_PLAYLIST: (state, name, password, data) => {
      state.playlist.name = name;
      state.playlist.tracks = data.tracks
      state.playlist.canEdit = data.isAuth
      state.playlist.password = data.isAuth ? password : ''
    },
    SET_TRACK: (state, track) => {
      setTrack(state, track)
    },
    SET_PROGRESSION: (state, progression) => {
      state.player.progression = progression
    },
    SET_SEEK_POSITION: (state, position) => {
      state.player.seekPosition = position
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
        index = (state.player.shuffle) ? getRandomIndex(state) : getPreviousIndex(state)
      setTrack(state, tracks[index])
    },
    SET_VOLUME: (state, volume) => {
      state.player.volume = volume
    },
    TOGGLE_SHUFFLE: (state) => {
      state.player.shuffle = !state.player.shuffle
    },
    SET_NEXT_TRACK: state => {
      let tracks = state.playlist.tracks,
      index = (state.player.shuffle) ? getRandomIndex(state) : getNextIndex(state)
      setTrack(state, tracks[index])
    },
    SET_YOUTUBE_READY: state => {
      state.providers.youtube.ready = true;
    }
  }
});

export default store;
