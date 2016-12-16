<template>
  <div id='soundcloud-player'
       v-bind:style="{backgroundImage: 'url(' + track.artwork + ')'}"
       v-bind:class='{"is_active": is_active}' >

  </div>
</template>

<script>
  import SC from 'soundcloud'

  export default {
    name: 'soundcloud-player',
    sound: null,
    created () {
      this.initPlayer();
    },
    watch: {
      track () {
        if (this.track.provider === 'soundcloud') {
          this.play()
        }
        else {
          this.stop()
        }
      },
      player: {
        handler () {
          if (!this.player.playing) {
            this.stop()
          }
        },
        deep: true
      }
    },
    computed: {
      is_active () {
        return this.track.provider === 'soundcloud'
      }
    },
    methods: {
      initPlayer () {
        SC.initialize({
          client_id: this.constants.SOUNDCLOUD_KEY
        });
      },
      play () {
        this.stop()

        var that = this
        SC.stream('/tracks/' + this.track.id).then(function (sound) {
          // Fixes chrome issue  https://github.com/soundcloud/soundcloud-javascript/issues/39
          if (sound.options.protocols[0] === 'rtmp') {
            sound.options.protocols.splice(0, 1);
          }

          that.sound = sound
          sound.play()
        });
      },
      stop () {
        if (!this.sound)
          return;
        this.sound.pause()
      }
    },
    beforeDestroy(){
      this.stop()
    },
    vuex: {
      getters: {
        constants: state => state.constants,
        track: state => state.track,
        player: state => state.player
      }
    }
  }
</script>

<style lang='sass'>
  #soundcloud-player {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    filter: grayscale(100%);
    background-size: cover;
    opacity: 0;
    transition: opacity 300ms ease-in-out;

    &.is_active {
       opacity: 0.2;
    }
  }
</style>
