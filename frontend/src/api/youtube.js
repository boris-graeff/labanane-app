import axios from 'axios';
import constants from '../constants';

export default {
  get(keywords) {
    return axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        type: 'video',
        key: constants.YOUTUBE_KEY,
        q: keywords,
        maxResults: constants.MAX_RESULTS
      }
    })
  }
}