<template>
  <div class='youtube-player' :class='{"is-active": isActive, "video-mode-on": videoMode}'>
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
      state () {
        if (this.provider === 'youtube') {
          this.isActive = true
          if (this.state === 'loading') {
            this.load()
          }
          else if (this.state === 'playing') {
            this.play()
            this.setVolume(this.volume)
          }
          else if (this.state === 'paused') {
            this.pause()
          }
          else if (this.state === 'stopped') {
            this.stop()
          }
        }
      },
      volume () {
        this.setVolume(this.volume)
      },
      seekPosition () {
        if (this.provider === 'youtube') {
          this.seekTo(this.seekPosition)
        }
      },
      provider () {
        if (this.provider !== 'youtube') {
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
        if (this.track.provider !== 'youtube') {
          this.resetTimer()
        }

        const that = this
        const YT = window.YT

        if (event.data === YT.PlayerState.PLAYING) { // Playing
          this.setPlay()

          this.timer = setInterval(function () {
            Promise.all([that.ytbPlayer.getCurrentTime(), that.ytbPlayer.getDuration()])
                .then((values) => {
                  that.setProgression(values[0] / values[1] * 100)
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

    computed: mapState(['constants', 'track', 'provider', 'seekPosition', 'state', 'volume', 'videoMode'])
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
