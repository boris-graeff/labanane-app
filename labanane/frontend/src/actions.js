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
			});
	},
	getPlaylist: ({dispatch}, id) => {
		return playlist.get({id})
			.then(response => {
				dispatch('SET_PLAYLIST', id, response.data);
			})
			.catch(() => {
				console.error('Playlist request failed');
			});
	},
	setTrack: ({dispatch}, track) => {
		dispatch('SET_TRACK', track);
	},
	nextTrack: ({dispatch}) => {
		dispatch('SET_NEXT_TRACK');
	},
	prevTrack: ({dispatch}) => {
		dispatch('SET_PREVIOUS_TRACK');
	},
	setYoutubeReady: ({dispatch}) => {
		dispatch('SET_YOUTUBE_READY', 'youtube');
	}
};
