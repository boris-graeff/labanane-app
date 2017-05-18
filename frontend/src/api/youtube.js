import axios from 'axios'
import constants from '../constants'

const client = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3'
})

export default {
  search (keywords) {
    return client.get('/search', {
      params: {
        part: 'snippet',
        type: 'video',
        key: constants.YOUTUBE_KEY,
        q: keywords,
        maxResults: constants.MAX_RESULTS
      }
    })
  },

  getDetails (id) {
    return client.get('/videos', {
      params: {
        id: id,
        part: 'contentDetails',
        key: constants.YOUTUBE_KEY
      }
    })
  }
}
