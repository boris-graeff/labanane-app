<template>
  <div>
    <h1>Playlist</h1>
    <h2>{{ playlist.name }}</h2>
    <ul>
      <li v-for='track in playlist.tracks'>{{track.name}}</li>
    </ul>
  </div>
</template>

<script>
  import actions from '../actions'

  export default {
    name: 'playlist',
    data: () => {
      return {
        id: ''
      }
    },
    mounted: function () {
      this.id = this.$route.params.id;
      this.get_playlist(this.id);
    },
    vuex: {
      getters: {
        playlist: state => state.playlist
      },
      actions: {
        get_playlist: actions.get_playlist
      }
    }
  }
</script>

<style lang='sass' scoped>

</style>
