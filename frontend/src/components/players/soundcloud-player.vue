<template>
  <div id='soundcloud-player' class='soundcloud-player'>
  </div>
</template>

<script>
  import SC from 'soundcloud'

  export default {
    name: 'soundcloud-player',
    player: null,
    created () {
      this.initPlayer()
    },
    props: ['apiKey'],
    methods: {
      initPlayer () {
        SC.initialize({
          client_id: this.apiKey
        })
        this.$emit('ready')
      },
      loadAndPlay (id, volume) {
        const that = this
        SC.stream('/tracks/' + id)
          .then(sound => {
            // Fixes chrome issue  https://github.com/soundcloud/soundcloud-javascript/issues/39
            if (sound.options.protocols[0] === 'rtmp') {
              sound.options.protocols.splice(0, 1)
            }

            that.player = sound

            that.setVolume(volume)
            that.$emit('trackDuration', sound.options.duration)

            sound.on('time', function () {
              that.$emit('currentTime', this.currentTime())
            })

            sound.on('finish', function () {
              that.$emit('trackEnd')
            })

            that.play()
          })
          .catch(() => {
            this.$emit('error')
          })
      },
      play () {
        this.player.play()
      },
      pause () {
        this.player.pause()
      },
      stop () {
        this.player.dispose()
      },
      setVolume (volume) {
        this.player.setVolume(volume / 100)
      },
      seekTo (time) {
        this.player.seek(time)
      }
    },
    beforeDestroy () {
      this.player && this.player.dispose()
    }
  }
</script>

<style scoped lang='scss' rel='stylesheet/scss' type='text/css'>
  @import "~@/styles/constants";

  .soundcloud-player {
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
    }
  }

  .video-mode-on .soundcloud-player.is-active  {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  @keyframes zoom {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(2) rotate(6deg);
    }
  }
</style>
