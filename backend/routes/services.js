var express = require('express'),
  router = express.Router()

router.post('/playlist', function(req, res, next) {
  res.send('create playlist')
})

router.get('/playlist/:id/', function(req, res, next) {
  res.send('get playlist')
})

router.get('/playlists', function(req, res, next) {
  res.send('get playlists')
})

router.put('/playlist/:id', function(req, res, next) {
  res.send('update playlists')
})

module.exports = router
