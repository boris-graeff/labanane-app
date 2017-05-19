const express = require('express')
const router = express.Router()
const bandcamp = require('../providers/bandcamp')

// bandcamp

router.get('/bandcamp/search/:q', (req, res) => {
  bandcamp.trackSearch(req.params.q).then(tracks => {
    res.json(tracks)
  }).catch(err => {
    res.status(500).send({ error: 'Unexpected error' })
  })
})

router.get('/bandcamp/track/:id', (req, res) => {
  bandcamp.getTrack(req.params.id).then(track => {
    res.json(track)
  }).catch(err => {
    res.status(500).send({ error: 'Unexpected error' })
  })
})

module.exports = router
