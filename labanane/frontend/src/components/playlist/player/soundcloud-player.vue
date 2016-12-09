<template>
  <div id='soundcloud-player' v-bind:style="{backgroundImage: 'url(' + track.artwork + ')'}">

  </div>
</template>

<script>
  import SC from 'soundcloud'

  export default {
    name: 'soundcloud-player',
    player: null,
    created () {
      this.initPlayer();
    },
    watch: {
      track () {
        if(this.track.provider === 'soundcloud'){
          this.play()
        }
        else {
          this.stop()
        }
      }
    },
    methods: {
      initPlayer () {
        SC.initialize({
          client_id: this.constants.SOUNDCLOUD_KEY
        });
      },
      play () {
        var that = this

        SC.stream('/tracks/'+this.track.id).then(function(player){
          that.player = player
          player.play()
        });
      },
      stop () {
        if(!this.player)
          return;
        this.player.stop()
      }
    },
    vuex: {
      getters: {
        constants: state => state.constants,
        track: state => state.track
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
    opacity: 0.2;
    filter: grayscale(100%);
    background-size: cover;
  }
</style>
