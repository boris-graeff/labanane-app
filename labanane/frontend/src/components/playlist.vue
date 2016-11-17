<template>
  <div>
    <h1>Playlist</h1>
    <h2>{{ playlist.name }}</h2>
  </div>
</template>

<script>
  export default {
    name: 'playlist',
    vuex: {
      getters: {
        playlist: (state) => state.playlist
      }
    }
  }
</script>

<style>

</style>
