import api from './api/api';

export default {
	get_playlists: ({dispatch}) => {
		return api.get_playlists()
			.then(response => {
				dispatch('SET_PLAYLISTS', response.data);
			})
			.catch(() => {
				console.error('Playlists request failed');
			});
	},
	get_playlist: ({dispatch}, id) => {
		return api.get_playlist(id)
			.then(response => {
				dispatch('SET_PLAYLIST', id, response.data);
			})
			.catch(() => {
				console.error('Playlist request failed');
			});
	},
	set_track: ({dispatch}, track) => {
		dispatch('SET_TRACK', track);
	},
	next_track: ({dispatch}) => {
		dispatch('SET_NEXT_TRACK');
	},
	prev_track: ({dispatch}) => {
		dispatch('SET_PREVIOUS_TRACK');
	},
	set_youtube_ready: ({dispatch}) => {
		dispatch('SET_YOUTUBE_READY', 'youtube');
	}
};