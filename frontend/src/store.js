import Vue from 'vue'
import Vuex from 'vuex'
import constants from './constants'
import actions from './actions'

Vue.use(Vuex)

const getCurrentIndex = (state) => state.playlist.tracks.findIndex((t) => t.id === state.track.id)

const findTrackById = (state, trackId) => state.playlist.tracks.find(track => track.id === trackId)

const getRandomIndex = (state) => Math.floor(Math.random() * state.playlist.tracks.length)

const getNextIndex = (state) => {
  const index = getCurrentIndex(state) + 1
  return index >= state.playlist.tracks.length ? 0 : index
}

const getPreviousIndex = (state) => {
  let index = getCurrentIndex(state) - 1
  return index < 0 ? (state.playlist.tracks.length - 1) : index
}

const setNextTrack = (state) => {
  const tracks = state.playlist.tracks
  const index = (state.player.shuffle) ? getRandomIndex(state) : getNextIndex(state)
  setTrack(state, tracks[index])
}

const setTrack = (state, track) => {
  for (let prop of Object.keys(track)) {
    state.track[prop] = track[prop]
  }
  state.player.progression = 0
  state.player.state = 'stopped'
  state.player.state = 'loading'
}

export default new Vuex.Store({
  state: {
    constants: constants,
    playlists: [],
    playlist: {
      id: '',
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
      videoMode: false,
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
  actions: actions,
  mutations: {
    INIT_PLAYLIST (state, id) {
      state.playlist.id = id
      state.playlist.tracks.length = 0
      state.playlist.canEdit = false
    },
    ADD_TRACK (state, track, index) {
      track.id = Date.now()

      if (index !== undefined) {
        state.playlist.tracks.splice(index, 0, track)
      }
      else {
        state.playlist.tracks.push(track)
      }
    },
    MOVE_TRACK (state, track, index) {
      state.playlist.tracks.splice(track.index, 1)

      if (index !== undefined) {
        state.playlist.tracks.splice(index, 0, track)
      }
      else {
        state.playlist.tracks.push(track)
      }
    },
    REMOVE_TRACK (state, index) {
      state.playlist.tracks.splice(index, 1)
      if (state.playlist.tracks.length) {
        setNextTrack(state)
      }
      else {
        state.player.state = 'stopped'
      }
    },
    SET_PLAYLISTS (state, playlists) {
      state.playlists = playlists.sort((a, b) => b.timestamp - a.timestamp)
    },
    SET_PLAYLIST (state, {id, password, data}) {
      state.playlist.id = id
      state.playlist.name = data.name
      state.playlist.tracks = data.tracks
    },
    SET_PLAYLIST_AUTH (state, {isAuth, password}) {
      state.playlist.canEdit = isAuth
      state.playlist.password = isAuth ? password : ''
    },
    SET_TRACK (state, trackId) {
      const track = findTrackById(state, trackId)
      setTrack(state, track)
    },
    SET_PROGRESSION (state, progression) {
      state.player.progression = progression
    },
    SET_SEEK_POSITION (state, position) {
      state.player.seekPosition = position
    },
    SET_TRACK_ERROR (state) {
      state.player.state = 'stopped'
      state.playlist.tracks[getCurrentIndex(state)].error = true
      setNextTrack(state)
    },
    SET_PLAY (state) {
      if (state.playlist.tracks.length) {
        if (!state.track.id) {
          const tracks = state.playlist.tracks
          const index = (state.player.shuffle) ? getRandomIndex(state) : 0
          setTrack(state, tracks[index])
        }
        else {
          state.player.state = 'playing'
        }
      }
    },
    SET_PAUSE (state) {
      state.player.state = 'paused'
    },
    SET_PREVIOUS_TRACK (state) {
      const tracks = state.playlist.tracks
      const index = (state.player.shuffle) ? getRandomIndex(state) : getPreviousIndex(state)
      setTrack(state, tracks[index])
    },
    SET_VOLUME (state, volume) {
      state.player.volume = volume
    },
    TOGGLE_SHUFFLE (state) {
      state.player.shuffle = !state.player.shuffle
    },
    TOGGLE_VIDEO_MODE (state) {
      state.player.videoMode = !state.player.videoMode
    },
    RESET_VIDEO_MODE (state) {
      state.player.videoMode = false
    },
    SET_NEXT_TRACK (state) {
      setNextTrack(state)
    },
    SET_YOUTUBE_READY (state) {
      state.providers.youtube.ready = true
    }
  }
})
