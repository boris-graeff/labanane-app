import moment from 'moment'

export default function formatDuration (duration) {
  if (!duration) {
    return '-'
  }

  const momentDuration = moment.duration(duration)
  let hours = momentDuration.hours()
  let minutes = momentDuration.minutes()
  let seconds = momentDuration.seconds()
  hours = (hours) ? `${hours}:` : ''
  minutes = (minutes < 10) ? `0${minutes}:` : `${minutes}:`
  seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`
  return hours + minutes + seconds
}
