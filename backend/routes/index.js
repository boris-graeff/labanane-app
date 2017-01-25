var express = require('express'),
  router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/playlist/:id', function(req, res, next) {
  res.render('index', { title: 'Playlist' })
})

router.get('*', function(req, res, next) {
  res.redirect('/')
})

module.exports = router
