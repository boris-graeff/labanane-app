<template>
  <div id='soundcloud-player'
       :style="{backgroundImage: 'url(' + track.artwork + ')'}"
       :class='{"is-active": isActive, "video-mode-on": videoMode}' >
  </div>
</template>

<script>
  import SC from 'soundcloud'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'soundcloud-player',
    sound: null,
    data () {
      return {
        isActive: false
      }
    },
    created () {
      this.initPlayer()
    },
    watch: {
      state () {
        if (this.provider === 'soundcloud') {
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
      seekPosition () {
        if (this.provider === 'soundcloud') {
          this.seekTo(this.seekPosition)
        }
      },
      volume () {
        this.setVolume(this.volume)
      },
      provider () {
        if (this.provider !== 'soundcloud') {
          this.isActive = false
          this.stop()
        }
      }
    },
    methods: {
      ...mapActions(['setPlay', 'nextTrack', 'setProgression', 'setTrackError']),
      initPlayer () {
        SC.initialize({
          client_id: this.constants.SOUNDCLOUD_KEY
        })
      },
      load () {
        const that = this
        SC.stream('/tracks/' + this.track.providerId)
            .then(sound => {
              // Fixes chrome issue  https://github.com/soundcloud/soundcloud-javascript/issues/39
              if (sound.options.protocols[0] === 'rtmp') {
                sound.options.protocols.splice(0, 1)
              }

              that.sound = sound

              sound.setVolume(that.volume)

              sound.on('time', function () {
                that.setProgression(this.currentTime() / sound.streamInfo.duration * 100)
              })

              sound.on('finish', function () {
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
          this.sound.dispose()
        }
      },
      setVolume (volume) {
        if (this.sound) {
          this.sound.setVolume(volume / 100)
        }
      },
      seekTo (percent) {
        if (this.sound) {
          this.sound.seek(percent * this.sound.streamInfo.duration / 100)
        }
      }
    },
    beforeDestroy () {
      if (this.sound) {
        this.sound.dispose()
      }
    },
    computed: mapState(['constants', 'track', 'provider', 'seekPosition', 'state', 'volume', 'videoMode'])
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>
  @import "~@/styles/constants";

  #soundcloud-player {
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
