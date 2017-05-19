<template>
  <div class='youtube-player' :class='{"is-active": isActive, "video-mode-on": player.videoMode}'>
    <div id='youtube-player'></div>
  </div>
</template>

<script>
  import YtbPlayer from 'youtube-player'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'youtube-player',
    ytbPlayer: null,
    timer: null,
    data () {
      return {
        isActive: false
      }
    },
    mounted () {
      this.loadPlayer()
    },
    watch: {
      'player.state' () {
        const {state, volume} = this.player
        const {provider} = this.track

        if (provider === 'youtube') {
          this.isActive = true
          if (state === 'loading') {
            this.load()
          }
          else if (state === 'playing') {
            this.play()
            this.setVolume(volume)
          }
          else if (state === 'paused') {
            this.pause()
          }
          else if (state === 'stopped') {
            this.stop()
          }
        }
      },
      'player.volume' () {
        const {volume} = this.player
        this.setVolume(volume)
      },
      'player.seekPosition' () {
        const {provider} = this.track
        const {seekPosition} = this.player

        if (provider === 'youtube') {
          this.seekTo(seekPosition)
        }
      },
      'track.provider' () {
        const {provider} = this.track
        if (provider !== 'youtube') {
          this.isActive = false
          this.stop()
        }
      }
    },
    methods: {
      ...mapActions(['setPlay', 'nextTrack', 'setYoutubeReady', 'setProgression', 'setTrackError']),
      loadPlayer () {
        this.ytbPlayer = YtbPlayer('youtube-player', {
          height: '100%',
          width: '100%',
          playerVars: {
            modestbranding: 1,
            showinfo: 0,
            controls: 0
          }
        })
        this.ytbPlayer.on('stateChange', this.onStateChange)
        this.ytbPlayer.on('ready', this.onPlayerReady)
        this.ytbPlayer.on('error', this.onError)
      },

      onPlayerReady () {
        this.setYoutubeReady()
      },

      onStateChange (event) {
        const {provider} = this.track

        if (provider !== 'youtube') {
          this.resetTimer()
        }

        const YT = window.YT

        if (event.data === YT.PlayerState.PLAYING) { // Playing
          this.setPlay()

          this.timer = setInterval(() => {
            Promise.all([this.ytbPlayer.getCurrentTime(), this.ytbPlayer.getDuration()])
                .then((values) => {
                  this.setProgression(values[0] / values[1] * 100)
                })
          }, 1000)
        }
        else {
          this.resetTimer()

          if (event.data === 0) {
            this.nextTrack()
          }
        }
      },

      onError () {
        this.setTrackError()
      },

      load () {
        this.stop()
        this.ytbPlayer.loadVideoById({'videoId': this.track.providerId})
      },

      play () {
        this.ytbPlayer.playVideo()
      },

      pause () {
        this.ytbPlayer.pauseVideo()
      },

      stop () {
        if (this.ytbPlayer) {
          this.ytbPlayer.stopVideo()
        }
      },

      setVolume (volume) {
        this.ytbPlayer.setVolume(volume)
      },

      seekTo (percent) {
        const allowSeekAhead = true
        this.ytbPlayer.getDuration()
            .then(duration => {
              this.ytbPlayer.seekTo(percent * duration / 100, allowSeekAhead)
            })
      },

      resetTimer () {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    beforeDestroy () {
      this.resetTimer()
    },

    computed: mapState(['constants', 'track', 'player'])
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import "~@/styles/constants";

  .youtube-player {
    iframe {
      position: fixed;
      top: 0;
      left: 0;
      height: calc(100% - #{$player-height});
      z-index: -1;
      opacity: 0;
      filter: blur(30px);
      transition: opacity 300ms ease-in-out, filter 300ms ease-in-out;
    }

    &.is-active {
      iframe {
        opacity: 0.2;
      }

      &.video-mode-on iframe {
        filter: none;
        opacity: 0.8;
      }
    }
  }
</style>
