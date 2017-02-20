var mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({
  id: String,
  name: String,
  provider: String,
  providerId: String,
  artwork: String
})

var PlaylistSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  password: {type: String, unique: true, required: true},
  timestamp: {type: Number, required: true},
  tracks: [TrackSchema],
  length: {type: Number, required: true}
})

module.exports = mongoose.model('Playlist', PlaylistSchema)