<template>
  <div id='soundcloud-player'
       v-bind:style="{backgroundImage: 'url(' + track.artwork + ')'}"
       v-bind:class='{"is_active": is_active}' >

  </div>
</template>

<script>
  import SC from 'soundcloud'
  import actions from '../../../actions'

  export default {
    name: 'soundcloud-player',
    sound: null,
    data: function(){
      return {
        is_active: false
      }
    },
    created () {
      this.initPlayer();
    },
    watch: {
      player: {
        handler: function(){
          if(this.track.provider === 'soundcloud'){
            this.is_active = true

            if(this.player.state === 'loading'){
              this.load()
            }
            else if(this.player.state === 'playing'){
              this.play()
            }
            else if(this.player.state === 'paused'){
              this.pause()
            }

            this.setVolume(this.player.volume)
          }
          else {
            this.is_active = false
            this.stop()
          }
        },
        deep: true
      }
    },
    methods: {
      initPlayer () {
        SC.initialize({
          client_id: this.constants.SOUNDCLOUD_KEY
        });
      },
      load () {
        var that = this
        SC.stream('/tracks/' + this.track.id)
            .then(sound => {
              // Fixes chrome issue  https://github.com/soundcloud/soundcloud-javascript/issues/39
              if (sound.options.protocols[0] === 'rtmp') {
                sound.options.protocols.splice(0, 1);
              }

              that.sound = sound

              sound.setVolume(that.player.volume)

              sound.on('time', function(){
                that.setTrackProgression(this.currentTime() / sound.streamInfo.duration * 100)
              })

              sound.on('finish', function(){
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
        if (!this.sound)
          return;
        this.sound.pause()
      },
      stop () {
        if (!this.sound)
          return;
        this.sound.dispose()
      },
      setVolume (volume) {
        if (!this.sound)
          return;

        this.sound.setVolume(volume/100)
      }
    },
    beforeDestroy(){
      if (!this.sound)
        return;
      this.sound.dispose()
    },
    vuex: {
      getters: {
        constants: state => state.constants,
        track: state => state.track,
        player: state => state.player
      },
      actions: {
        setPlay: actions.setPlay,
        nextTrack: actions.nextTrack,
        setTrackProgression: actions.setTrackProgression,
        setTrackError: actions.setTrackError
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
