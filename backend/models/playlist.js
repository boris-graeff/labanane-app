var mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({
  id: String,
  name: String,
  provider: String,
  artwork: String
})

var PlaylistSchema = new mongoose.Schema({
  id: String,
  name: String,
  password: String,
  timestamp: Number,
  artwork: String,
  content: [TrackSchema],
  length: Number
})

PlaylistSchema.pre('update', function(next) {
  this.length = this.content.length
  this.timestamp = Date.now()
  next()
})

module.exports = mongoose.model('Playlist', PlaylistSchema)