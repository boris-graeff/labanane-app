import HTTP from './api/http';

const playlist = new HTTP('playlist');

export default {
  getAllPlaylists: ({dispatch}) => {
    return playlist.all()
      .then(response => {
        dispatch('SET_PLAYLISTS', response.data);
      })
      .catch(() => {
        console.error('Playlists request failed');
      })
  },
  getPlaylist: ({dispatch}, id) => {
    return playlist.get({id})
      .then(response => {
        dispatch('SET_PLAYLIST', id, response.data);
      })
      .catch(() => {
        console.error('Playlist request failed');
      })
  },
  createPlaylist: ({dispatch}, name, password) => {
    return playlist.create({name, password})
      .then(response => {

      })
      .catch(() => {
        console.error('Playlist creation request failed');
      })
  },


  setTrack: ({dispatch}, track) => {
    dispatch('SET_TRACK', track);
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
    dispatch('SET_NEXT_TRACK');
  },
  prevTrack: ({dispatch}) => {
    dispatch('SET_PREVIOUS_TRACK');
  },
  setYoutubeReady: ({dispatch}) => {
    dispatch('SET_YOUTUBE_READY', 'youtube');
  },
  setTrackProgression: ({dispatch}, progression) => {
    dispatch('SET_TRACK_PROGRESSION', progression)
  },
  setTrackError: ({dispatch}) => {
    dispatch('SET_TRACK_ERROR')
    dispatch('SET_NEXT_TRACK')
  }
};
