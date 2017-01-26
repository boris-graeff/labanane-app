import HTTP from './api/http'
import youtubeVideos from './api/youtube-api'

const playlists = new HTTP('playlists')

export default {
  getAllPlaylists: ({dispatch}) => {
    return playlists.all()
      .then(response => {
        dispatch('SET_PLAYLISTS', response.data)
      })
      .catch(() => {
        console.error('Playlists request failed')
      })
  },
  getPlaylist: ({dispatch}, id) => {
    return playlists.get({id})
      .then(response => {
        dispatch('SET_PLAYLIST', id, response.data)
      })
      .catch(() => {
        console.error('Playlist request failed')
      })
  },
  createPlaylist: ({dispatch}, name, password) => {
    return playlists.create({name, password})
      .catch(() => {
        console.error('Playlist creation request failed')
      })
  },

  getYoutubeList: ({dispatch}, keywords) => {
    return youtubeVideos.get(keywords)
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
  }
}
