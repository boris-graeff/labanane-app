import test from 'ava';
import nock from 'nock';

import helpers from './_helpers';
import HTTP from '../src/api/http';

const playlist = new HTTP('playlist');

test('should get all playlists', t => {
	nock(helpers.baseUrl, {}).get('services/playlist/all').reply(200, {});

	return playlist.all().then(response => {
		t.is(response.status, 200);
	});
});
