import axios from 'axios'

const client = axios.create({
  baseURL: '/services'
})

export default {
  create (params) {
    return client.post('/playlists', params)
  },

  all () {
    return client.get('/playlists')
  },

  get (params) {
    return client.get(`/playlists/${params.id}`)
  },

  update (params) {
    return client.put('/playlists', params)
  },

  auth (params) {
    return client.post('/playlists/auth', params)
  }
}
