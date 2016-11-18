import api from './api/api'

export default {
  get_playlists: ({dispatch}) => {

    return api.get_playlists()
      .then(response => {
        dispatch('SET_PLAYLISTS', response.data);
      })
      .catch(response => {
        console.error('Playlists request failed')
      });
  },

  get_playlist: ({dispatch}, id) => {

    return api.get_playlist(id)
      .then(response => {
        dispatch('SET_PLAYLIST', id, response.data);
      })
      .catch(response => {
        console.error('Playlist request failed')
      });
  }
}