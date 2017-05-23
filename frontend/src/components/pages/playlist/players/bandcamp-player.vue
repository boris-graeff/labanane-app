<template>
  <div id='bandcamp-player'
       :style="{backgroundImage: 'url(' + track.artwork + ')'}"
       :class='{"is-active": isActive, "video-mode-on": player.videoMode}' >
     <audio ref="audio">
     </audio>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'bandcamp-player',
    sound: null,
    data () {
      return {
        isActive: false
      }
    },
    watch: {
      'player.state' () {
        const { state, volume } = this.player
        const { provider } = this.track

        if (provider === 'bandcamp') {
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
      'track.provider' () {
        const {provider} = this.track

        if (provider !== 'bandcamp') {
          this.isActive = false
          this.stop()
        }
      }
    },
    methods: {
      ...mapActions(['setPlay', 'nextTrack', 'setCurrentTime', 'setTrackDuration', 'setTrackError', 'bancampTrack']),
      load () {
        const that = this

        this.bancampTrack(this.track.providerId)
            .then(response => {
              const sound = response.data
              that.sound = that.$refs.audio
              that.sound.src = sound.stream

              that.setTrackDuration(sound.duration)

              that.sound.addEventListener('timeupdate', function () {
                that.setCurrentTime(this.currentTime * 1000)
              })

              that.sound.addEventListener('ended', function () {
                that.nextTrack()
              })

              that.setPlay()
            })
            .catch(() => {
              this.setTrackError()
            })
      },
      play () {
        this.sound.play()
      },
      pause () {
        if (this.sound) {
          this.sound.pause()
        }
      },
      stop () {
        if (this.sound) {
          this.sound.pause()
        }
      },
      setVolume (volume) {
        if (this.sound) {
          this.sound.volume = volume / 100
        }
      },
      seekTo (time) {
        if (this.sound) {
          this.sound.currentTime = time / 1000
        }
      }
    },
    beforeDestroy () {
      if (this.sound) {
        this.sound.pause()
      }
    },
    computed: mapState(['constants', 'track', 'player'])
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import "~@/styles/constants";

  #bandcamp-player {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: $player-height;
    opacity: 0;
    z-index: -1;
    transition: opacity 300ms ease-in-out, filter 300ms ease-in-out;
    filter: grayscale(100%) blur(10px);

    &.is-active {
      opacity: 0.2;
      animation: zoom 60s infinite alternate linear;

      &.video-mode-on {
        opacity: 0.5;
        filter: grayscale(100%);
      }
    }

    @keyframes zoom {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(2) rotate(6deg);
      }
    }
  }
</style>
