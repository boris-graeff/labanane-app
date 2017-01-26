<template>
  <section class='home-page'>
    <create-playlist></create-playlist>
    <explore-playlists></explore-playlists>
  </section>
</template>

<script>
  import explorePlaylists from './home/explore_playlists.vue'
  import createPlaylist from './home/create_playlist.vue'

  export default {
    name: 'home',
    components: {
      'explore-playlists': explorePlaylists,
      'create-playlist': createPlaylist
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' type='text/css'>

  .home-page {
    height: 100vh;
    display: flex;
    overflow: hidden;
  }
</style>
