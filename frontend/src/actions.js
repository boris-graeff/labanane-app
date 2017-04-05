import appAPI from './api/app'
import youtubeAPI from './api/youtube'

const playlists = new appAPI('playlists')

export default {
  getAllPlaylists: ({dispatch}) => {
    return playlists.all()
      .then(response => {
        dispatch('SET_PLAYLISTS', response.data)
      })
      .catch(() => {
        console.error("Playlists request failed")
      })
  },
  getPlaylist: ({dispatch}, id, password) => {
    return playlists.get({id, password})
      .then(response => {
        dispatch('SET_PLAYLIST', id, password, response.data)
        return response.data
      })
      .catch(() => {
        console.error("Playlist request failed")
      })
  },
  createPlaylist: ({dispatch}, name, password) => {
    return playlists.create({name, password})
  },
  savePlaylist: (store) => {
    return playlists.update(store.state.playlist)
      .catch(() => {
        console.error("Playlist saving request failed")
      })
  },

  getYoutubeList: ({dispatch}, keywords) => {
    return youtubeAPI.get(keywords)
  },

  setTrack: ({dispatch}, track) => {
    dispatch('SET_TRACK', track)
  },
  setPlay: ({dispatch}) => {
    dispatch('SET_PLAY')
  },
  setPause: ({dispatch}) => {
    dispatch('SET_PAUSE')
  },
  setVolume: ({dispatch}, volume) => {
    dispatch('SET_VOLUME', volume)
  },
  nextTrack: ({dispatch}) => {
    dispatch('SET_NEXT_TRACK')
  },
  toggleShuffle: ({dispatch}) => {
    dispatch('TOGGLE_SHUFFLE')
  },
  toggleVideoMode: ({dispatch}) => {
    dispatch('TOGGLE_VIDEO_MODE')
  },
  resetVideoMode: ({dispatch}) => {
    dispatch('RESET_VIDEO_MODE')
  },
  prevTrack: ({dispatch}) => {
    dispatch('SET_PREVIOUS_TRACK')
  },
  setYoutubeReady: ({dispatch}) => {
    dispatch('SET_YOUTUBE_READY', 'youtube')
  },
  setProgression: ({dispatch}, progression) => {
    dispatch('SET_PROGRESSION', progression)
  },
  setSeekPosition: ({dispatch}, position) => {
    dispatch('SET_SEEK_POSITION', position)
  },
  setTrackError: ({dispatch}) => {
    dispatch('SET_TRACK_ERROR')
    dispatch('SET_NEXT_TRACK')
  },
  addTrack: ({dispatch}, track, index) => {
    dispatch('ADD_TRACK', track, index)
  },
  moveTrack: ({dispatch}, track, index) => {
    dispatch('MOVE_TRACK', track, index)
  },
  removeTrack: ({dispatch}, index) => {
    dispatch('REMOVE_TRACK', index)
  },
  initPlaylist: ({dispatch}, id) => {
    dispatch('INIT_PLAYLIST', id)
  }
}
