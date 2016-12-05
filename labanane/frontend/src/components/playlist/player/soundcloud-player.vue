<template>

</template>

<script>
  import SC from 'soundcloud'

  export default {
    name: 'soundcloud-player',
    data: function () {
      return {
        player: ''
      }
    },
    created () {
      this.init_player();
    },
    methods: {
      init_player () {
        SC.initialize({
          client_id: this.constants.SOUNDCLOUD_KEY
        });
      },
      stream (track_id) {
        var that = this

        SC.stream('/tracks/'+track_id).then(function(player){
          that.player = player
          player.play()
        });
      }
    },
    vuex: {
      getters: {
        constants: state => state.constants
      }
    }
  }
</script>

<style lang='sass'>

</style>
