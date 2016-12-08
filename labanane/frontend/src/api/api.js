import HTTP from './http';

const playlist = new HTTP('playlist');

export default {
	get_playlists: () => {
		return playlist.all();
	},
	get_playlist: id => {
		return playlist.get({id});
	}
};
