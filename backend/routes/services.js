var express = require('express'),
  Playlist = require('../models/playlist'),
  router = express.Router()

// CREATE

router.post('/playlists', (req, res) => {
  var params = req.body
  params.length = 0
  params.timestamp = Date.now()

  new Playlist(params).save((err) => {
    if (err) {
      res.status(500).send({ error: "Unexpected error" })
    }
    else {
      res.json(true)
    }
  })
})

// GET

router.get('/playlists/:name/:password', (req, res) => {
  Playlist.findOne({name: req.params.name}, (err, playlist) => {
    if (err) {
      res.status(500).send({ error: "Unexpected error" })
    }
    else if (!playlist){
      res.status(404).send({ error: "Playlist not found" })
    }
    else {
      res.json({
        tracks: playlist.tracks,
        isAuth: req.params.password === playlist.password
      })
    }
  })
})

// GET ALL

router.get('/playlists', (req, res) => {
  Playlist.find({}, (err, playlists) => {
    if (err) {
      res.status(500).send({ error: "Unexpected error" })
    }
    else {
      res.json(playlists.map(p => {
        return { name: p.name, length: p.length, timestamp: p.timestamp }
      }))
    }
  })
})

// UPDATE

router.put('/playlists', (req, res) => {
  var params = req.body,
    key = {
      name: params.name,
      password: params.password
    },
    content = {
      tracks: params.tracks,
      length: params.tracks.length,
      timestamp: Date.now()
    }

  Playlist.findOneAndUpdate(key, content, (err, playlist) => {
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
