var mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({
  id: String,
  name: String,
  provider: String,
  providerId: String,
  artwork: String,
  duration: Number
})

var PlaylistSchema = new mongoose.Schema({
  id: {type: String, unique: true, required: true},
  name: {type: String, required: true},
  password: {type: String, required: true},
  timestamp: {type: Number, required: true},
  tracks: [TrackSchema],
  length: {type: Number, required: true}
})

module.exports = mongoose.model('Playlist', PlaylistSchema)