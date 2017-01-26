<template>
  <div>
    <youtube-player></youtube-player>
    <soundcloud-player></soundcloud-player>
  </div>
</template>

<script>
  import youtubePlayer from './player/youtube-player.vue'
  import soundcloudPlayer from './player/soundcloud-player.vue'

  export default {
    name: 'player',
    components: {
      'youtube-player': youtubePlayer,
      'soundcloud-player': soundcloudPlayer
    },
    self: {
      player: null
    },
    vuex: {
      getters: {
        track: state => state.track
      }
    }
  }
</script>