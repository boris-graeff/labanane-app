var express = require('express'),
  Playlist = require('../models/playlist'),
  router = express.Router()

// CREATE

router.post('/playlists', (req, res) => {
  var params = req.body,
    id = params.name.toLowerCase()

  params.length = 0
  params.timestamp = Date.now()
  params.tracks = []
  params.id = id

  new Playlist(params).save((err) => {
    if (err) {
      res.status(422).send({ error: "Playlist name already exists" })
    }
    else {
      res.json({
        id: id
      })
    }
  })
})

// GET

router.get('/playlists/:id', (req, res) => {
  Playlist.findOne({id: req.params.id}, (err, playlist) => {
    if (err) {
      res.status(500).send({ error: "Unexpected error" })
    }
    else if (!playlist){
      res.status(404).send({ error: "Playlist not found" })
    }
    else {
      res.json({
        name: playlist.name,
        tracks: playlist.tracks
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
        return {
          id: p.id,
          name: p.name,
          length: p.length,
          timestamp: p.timestamp
        }
      }))
    }
  })
})

// UPDATE

router.put('/playlists', (req, res) => {
  var params = req.body,
    key = {
      id: params.id,
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

// AUTH

router.post('/playlists/auth', (req, res) => {
  var params = req.body

  Playlist.findOne({id: params.id, password: params.password}, (err, playlist) => {
    if (err) {
      res.status(500).send({ error: "Unexpected error" })
    }
    else if (!playlist){
      res.status(422).send({ error: "Bad password" })
    }
    else {
      res.json('ok')
    }
  })
})

module.exports = router
