<template>
  <section class='home-page'>
    <create-playlist></create-playlist>
    <explore-playlists></explore-playlists>
  </section>
</template>

<script>
  import explorePlaylists from '@/components/home/explore-playlists.vue'
  import createPlaylist from '@/components/home/create-playlist.vue'

  export default {
    name: 'home',
    components: {
      'explore-playlists': explorePlaylists,
      'create-playlist': createPlaylist
    }
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss' type='text/css'>

  .home-page {
    height: 100vh;
    display: flex;
    overflow: hidden;

    @media screen and (max-width: 800px){
      height: auto;
      flex-direction: column;
    }
  }
</style>
