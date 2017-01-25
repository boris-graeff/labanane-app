var express = require('express'),
  Playlist = require('../models/playlist'),
  router = express.Router()

router.post('/playlist', (req, res) => {
  var params = {}
  new Playlist(params).save((err, playlist) => {
    if (err) {
      res.status(500).send({ error: "Unexpected error" })
    }
    else {
      res.json(playlist)
    }
  })
})

router.get('/playlist/:id/', (req, res) => {
  Playlist.findOne({id: req.params.id}, (err, playlist) => {
    if (err) {
      res.status(500).send({ error: "Unexpected error" })
    }
    else if (!playlist){
      res.status(404).send({ error: "Playlist not found" })
    }
    else {
      res.json({
        content: playlist.content,
        is_auth: false
      })
    }
  })
})

router.get('/playlists', (req, res) => {
  Playlist.find({}, (err, playlists) => {
    if (err) {
      res.status(500).send({ error: "Unexpected error" })
    }
    else {
      res.json(playlists.map(p => {
        return { name: p.name, length: p.length }
      }))
    }
  })
})

router.put('/playlist', (req, res) => {
  var params = req.params

  Playlist.findOneAndUpdate({id: params.id, password: params.password}, {content: params.content}, (err, playlist) => {
    if (err) {
      res.status(500).send({ error: "Unexpected error" })
    }
    else if(!playlist){
      res.status(422).send({ error: "Bad password" })
    }
    else {
      res.json(playlist)
    }
  })
})

module.exports = router
