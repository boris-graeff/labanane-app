import test from 'ava';
import nock from 'nock';

import helpers from './_helpers';
import api from '../src/api/api';

test('should get all playlists', t => {
	nock(helpers.baseUrl, {}).get('services/playlist/all').reply(200, {});

	return api.get_playlists().then(response => {
		t.is(response.status, 200);
	});
});
