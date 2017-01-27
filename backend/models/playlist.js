var mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({
  id: String,
  name: String,
  provider: String,
  artwork: String
})

var PlaylistSchema = new mongoose.Schema({
  name: String,
  password: String,
  timestamp: Number,
  artwork: String,
  tracks: [TrackSchema],
  length: Number
})

module.exports = mongoose.model('Playlist', PlaylistSchema)