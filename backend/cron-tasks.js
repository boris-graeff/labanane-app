var schedule = require('node-schedule'),
  Playlist = require('./models/playlist'),
  subWeeks = require('date-fns/sub_weeks'),
  getTime = require('date-fns/get_time'),
  format = require('date-fns/format'),
  exec = require('child_process').exec,
  path = require('path')

var backupCmd = 'mongodump --db LaBanane --gzip --out '
var backupFolder = path.join(__dirname, 'backup')

// Each day at 4:30 am :
// - Make a daily DB backup
// - Clean old empty playlists

schedule.scheduleJob('30 4 * * *', function () {
  var now = Date.now()
  var aWeekAgo = getTime(subWeeks(now, 1))
  var backupPath = path.join(backupFolder, 'daily')

  exec(backupCmd + backupPath, function(error, stdout, stderr) {
    console.log('stdout: ', stdout)
    console.log('stderr: ', stderr)
    if (error !== null) {
      console.log('exec error: ', error)
    }
  })

  Playlist.remove({timestamp: {$lt: aWeekAgo}, tracks: {$size: 0}}, (err) => {
    if (err) {
      console.error('*** Error during clean task execution ***')
    }
  })
})

// Each first day of the month at 5am :
// - Make a monthly DB backup

schedule.scheduleJob('0 5 1 * *', function () {
  var now = Date.now()
  var backupPath = path.join(backupFolder, format(now, 'YYYY-MM'))

  exec(backupCmd + backupPath, function(error, stdout, stderr) {
    console.log('stdout: ', stdout)
    console.log('stderr: ', stderr)
    if (error !== null) {
      console.log('exec error: ', error)
    }
  })
})