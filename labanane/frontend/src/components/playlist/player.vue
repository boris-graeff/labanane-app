<template>
  <div>
    <youtube-player></youtube-player>
    <soundcloud-player></soundcloud-player>
  </div>
</template>

<script>
  import youtube_player from './player/youtube-player.vue'
  import soundcloud_player from './player/soundcloud-player.vue'

  export default {
    name: 'player',
    components: {
      'youtube-player': youtube_player,
      'soundcloud-player': soundcloud_player
    },
    watch: {
      track () {
        console.log(this.track.id)
      }
    },
    vuex: {
      getters: {
        track: state => state.track
      }
    }
  }
</script>

<style lang='sass'>

</style>
