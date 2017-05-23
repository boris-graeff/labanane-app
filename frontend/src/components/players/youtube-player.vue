<template>
  <div class='youtube-player'>
    <div id='youtube-player'></div>
  </div>
</template>

<script>
  import YtbPlayer from 'youtube-player'

  export default {
    name: 'youtube-player',
    player: null,
    timer: null,
    mounted () {
      this.loadPlayer()
    },
    methods: {
      loadPlayer () {
        this.player = YtbPlayer('youtube-player', {
          height: '100%',
          width: '100%',
          playerVars: {
            modestbranding: 1,
            showinfo: 0,
            controls: 0
          }
        })
        this.player.on('stateChange', this.onStateChange)
        this.player.on('ready', this.onPlayerReady)
        this.player.on('error', this.onError)
      },

      onPlayerReady () {
        this.$emit('ready')
      },

      onStateChange (event) {
        const YT = window.YT

        if (event.data === YT.PlayerState.PLAYING) { // Playing
          this.play()

          this.player.getDuration()
            .then(value => this.$emit('trackDuration', value * 1000))

          this.timer = setInterval(() => {
            this.player.getCurrentTime()
              .then(value => this.$emit('currentTime', value * 1000))
          }, 1000)
        }
        else {
          this.resetTimer()

          if (event.data === 0) {
            this.$emit('trackEnd')
          }
        }
      },

      onError () {
        this.$emit('error')
      },

      loadAndPlay (id, volume) {
        this.player.loadVideoById({'videoId': id})
        this.player.setVolume(volume)
      },

      play () {
        this.player.playVideo()
      },

      pause () {
        this.player.pauseVideo()
      },

      stop () {
        this.player.stopVideo()
      },

      setVolume (volume) {
        this.player.setVolume(volume)
      },

      seekTo (time) {
        const allowSeekAhead = true
        this.player.seekTo(time / 1000, allowSeekAhead)
        this.$emit('currentTime', time)
      },

      resetTimer () {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    beforeDestroy () {
      this.resetTimer()
    }
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

    &.is-active iframe {
      opacity: 0.2;
    }
  }

  .video-mode-on .youtube-player.is-active iframe {
    filter: none;
    opacity: 0.8;
  }
</style>
