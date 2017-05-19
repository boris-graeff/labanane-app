import axios from 'axios'

const client = axios.create({
  baseURL: '/providers'
})

export default {
  bandcamp: {
    search (params) {
      return client.get(`/bandcamp/search/${params.q}`)
    },

    track (params) {
      return client.get(`/bandcamp/track/${encodeURIComponent(params.id)}`)
    }
  }
}
