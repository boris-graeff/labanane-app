import resources from './resources';

export default {

  get_playlists: () => {
    return resources.playlists.get();
  },

  get_playlist: (id) => {
    return resources.playlist.get({id: id});
  }

};