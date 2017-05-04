var schedule = require('node-schedule'),
  Playlist = require('./models/playlist'),
  subWeeks = require('date-fns/sub_weeks'),
  getTime = require('date-fns/get_time')

// Clean old empty playlists each day at 4h30

schedule.scheduleJob('4 30 * * *', function () {
  var now = Date.now(),
    aWeekAgo = getTime(subWeeks(now, 1))

  Playlist.remove({timestamp: {$lt: aWeekAgo}, tracks: {$size: 0}}, (err) => {
    if (err) {
      console.error('*** Error during clean task execution ***')
    }
  })
})